/**
 * Created by parker
 * 2018/11/1
 * 用于解析待机页面
 */
// var numberRecord = 0; //记录跳页面的次数
import cmdFun from "../command/util.js"; //解析指令
const objectAssign = require('object-assign');

import nativeService from '@/common/services/nativeService';
//ios5.4.0以下版本判断做兼容倒计时组件
let isIosLess5_4 = false;
let appVersion = weex.config.env.appVersion, platform = weex.config.env.platform;
let appVersionArr = appVersion.split('.');
if (platform == 'iOS' && (parseInt(appVersionArr[0]) == 5 && parseInt(appVersionArr[1]) < 4)) {
    isIosLess5_4 = true;
}
let workingModalMixin = {
    data() {
        return {
            // tabs:[
            //     {
            //         name:'自动菜单',
            //         active:true,
            //         rows:autoMenu
            //     },
            //     {
            //         name:'加热模式',
            //         active:false,
            //         rows:modes
            //     }
            // ],
            srcollPaddingBottom: '',
            cmdObj: cmdFun.initAnalysisObj(),

            chartJson: {
                "completedColor": "#FFFFFF", //环形进度条未完成后的颜色默认#267AFF
                "incompletedColor": "#FFDB81", //环形进度条未完成后的颜色，默认透明
                "thickness": 2, //环形进度条宽度，默认4
                "cornerRadius": isIosLess5_4 ? 120 : 240,  //环形的半径，默认是width/2
                "totalCounter": 360, //环形进度条的最大值，默认是360
                "progressCounter": 0, //设置进度值，默认是从0-360, 默认为0
                "autoProgress": false, //设置是否需要自动执行环形进度，默认false, 如果设置为true，则每秒进度值+1操作
                "clockwise": true, //环形自动执行进度的方向，默认是true，即顺时针方向，false为逆时针方向
                "startingSlice": 360, //环形进度开始的起始位置，当totalCounter为360的时候，0: 0点钟位置起点，90:3点钟位置起点 180:6点钟位置起点
                "pointShow": false, //环形进度中的进度球是否需要显示，默认不显示
                "pointRadius": 4, //默认是环形进度宽度的一半
                "pointColor": "#FFFFFF", //环形进度中的进度球颜色
            },
            progress: 1,
            progress_radius: 240,
            tag_next: '',
            btnText: "暂停",
            btnSrc: "img/footer/icon_pause@2x.png",
            cancleBtnText: '关闭',
            cancleIcon: 'img/footer/icon_cancle@2x.png',
            progressShow: true, //是否显示圆圈
            finishStatus: false, //完成状态
            preheatFinishTig: false, //预热完成指引
            isFooterShow: false,
            timeShow: false, //是否显示时间
            workSpecialStatusText: '',  //显示当前状态
            queryTimer: null,
            countDownTimer: null,
            isTimerStop: false,  //是否暂停
            statusTag: "剩余时间",
            hasSetting: false, //是否有时间温度设置
            hasHour: false, //是否有小时
            hourMore10: false,//是否大于10小时
            hasStopOrContinueBtn: false,
            modeText: '',
            probeProgress: null, //探针工作倒计时
            probeTempText: "°C",

            showBar: false,
            actionsheetItems: [],
            lightImg: "img/light_off@3x.png",

            isWorkingPage: false,

            settingClickRecord: false,
        };
    },
    methods: {
        /**
         * 是否是蒸汽烤箱 0TQN36XJ判断
         */
        is9B_36XJ() {
            const sns = ['0TQN36XJ'];
            return sns.indexOf(this.device.extra1.sn8) > -1;
        },

        /**
         * 当前状态是否待机中
         */
        isStandby() {
            return !this.isWorkingPage
        },

        analysisFun(analysisObj, tabs) {
            clearInterval(this.queryTimer);
            this.initStandbyData(analysisObj);//初始待机页面数据

            analysisObj = this.formatCmdObj(analysisObj)
            this.cmdObj = analysisObj;

            /**
             * 倒计时组件进度条数据
             */
            let chartJson = JSON.parse(JSON.stringify(this.chartJson));
            chartJson.pointShow = false;
            this.chartJson = JSON.parse(JSON.stringify(chartJson));

            /**
             * 待机页面10s轮询
             */
            if (analysisObj.workingState.value == 2 || analysisObj.workingState.value == 1) {
                this.queryRunTimer(10);//10秒轮询 
                if (this.isProbeInserted(analysisObj) && !this.currentItem.probe && t) {//探针特殊处理
                    this.show = false;
                }
            }


            /**
             * 提示弹出框
            */
            this.getWarningDialog(analysisObj);


            /**
             * fun 二代特殊处理
             */
            if (analysisObj.workingState.value == 4 && this.getAllSeconds(analysisObj) > 0 && this.isFun2Oven(analysisObj)) {
                analysisObj.workingState.value = 3
            }

            /**
             * 微波炉X7 预热完成特殊处理
             */
            if (analysisObj.workingState.value == 2 && this.isX7Micro() && analysisObj.displaySign.preheatTemperature == 1) {
                analysisObj.workingState.value = 3
            }


            /**
             * 工作页面判断以及10s轮询
             */
            if (this.currentIsWorkingPage(analysisObj)) {
                this.isWorkingPage = true;
                this.analysisWorkingFun(analysisObj, tabs); //跳转到工作页面数据处理
                if (this.getAllSeconds(analysisObj) <= 60 && analysisObj.workingState.value == 3) {
                    this.queryRunTimer(1);//工作状态小于等于1分钟 1秒轮询 
                } else {
                    this.queryRunTimer(10);//10秒轮询 
                }
            }

        },

        /**
        * 初始化待机页面数据
        */
        initStandbyData(cmdObj) {

            this.modalVisibility = false;
            // if(cmdObj.workingState.value > 2) {
            //     this.showDetailVisibility = false;
            //     this.show = false;
            // }
            // if(this.settingClickRecord){
            //     this.show = true;
            // }


            // 关闭弹窗在错误场景的隐藏
            if (cmdObj.workingState.value < 4 && cmdObj.workingState.value !== 3 && this.showBar) {
                this.showBar = false;
            }

            this.isWorkingPage = false;
            this.fromStandBy = false;
            this.probeTempText = '°C';
        },

        /**
         * 提示弹出框判断
         */
        getWarningDialog(cmdObj) {
            let isLackWater = false, isWaterBox = false, isDoorSwitch = false, isError = false;
            if (cmdObj.workingState.value == 2 || cmdObj.workingState.value == 1) {
                this.setWarningDialog("", null, false);
            }
            if (cmdObj.workingState.value == 3 || cmdObj.workingState.value == 4 || cmdObj.workingState.value === 5 || this.periodPauseCondition(cmdObj)) {
                if (cmdObj.displaySign.lackWater && cmdObj.mode.value != 0xC4) {
                    isLackWater = true;
                    this.setWarningDialog("主人，您的水箱缺水了，要及时添加水哦");
                }
                if (cmdObj.displaySign.waterBox && cmdObj.mode.value != 0xC4) {
                    isWaterBox = true;
                    this.setWarningDialog("主人，您的设备缺水盒了");

                }
                if (cmdObj.displaySign.doorSwitch) {
                    isDoorSwitch = true;
                    this.setWarningDialog("主人，您的设备炉门开了");
                }
            }
            if (cmdObj.displaySign.isError) {
                isError = true;
                this.setWarningDialog("主人，您的设备发生故障了，请联系售后人员");
            }
            if (!isLackWater && !isWaterBox && !isDoorSwitch && !isError) {
                this.setWarningDialog("", null, false);
            }

            if (cmdObj.displaySign.lock) {
                !this.modalVisibility && this.showModal();
            }

            if (cmdObj.highClearLock.value == 1) {
                this.setWarningDialog("高温自清洁锁检查失效");
            }
        },


        /**
        * 获取当前上报的总时间秒
        */
        getAllSeconds(cmdObj) {
            var _hour = cmdObj.timeRemaining.hour, _minute = cmdObj.timeRemaining.minute, _second = cmdObj.timeRemaining.second;
            var allSeconds = _hour * 60 * 60 + _minute * 60 + _second;
            return allSeconds;
        },

        /**
         * 段间等待判断条件
         */
        periodPauseCondition(cmdObj) {
            let workingState = cmdObj.workingState.value;
            return workingState === 6 || workingState === 7;
        },

        /**
         * 处理 03，04 数据
         */
        formatCmdObj(cmdObj) {
            let customData = {
                temperatureText: null // 工作中显示的设定温度文案
            };
            // if(cmdObj.isProbe.value){ //如果是探针，则为显示为探针设定温度
            //     obj.temperature.upLowTemperature = parseInt(requestCmd[33]);
            //   }

            if (this.isProbeInserted(cmdObj) && !this.isCloudMenu(cmdObj)) { // 有探针显示探针温度
                customData.temperatureText = this.addTemperatureUnit(cmdObj, cmdObj.probeSetttingTemperature.value, cmdObj.temperature.unit);
            } else { // 非探针模式显示较大温度
                customData.temperatureText = this.getTemperatureTextWithoutProbe(cmdObj, cmdObj.temperature.unit);
            }

            if (this.isLargeOven1065()) { //大烤箱旧插件 0ET1065Q ，上报的温度问题，下管上报了错乱的温度...需要只读上管温度
                customData.temperatureText = this.addTemperatureUnit(cmdObj, cmdObj.temperature.upLowTemperature, cmdObj.temperature.unit);
            }

            if (this.is9B_36XJ()) {//9b 0TQN36XJ ,保温需要下发0x41，温度50； 发酵需要下发0x43，温度35
                if (cmdObj.mode.text === '热风对流' && cmdObj.temperature.upLowTemperature < 70) {
                    cmdObj.mode.text = '保温';
                }
                if (cmdObj.mode.text === '热风烧烤' && cmdObj.temperature.upLowTemperature < 50) {
                    cmdObj.mode.text = '发酵';
                }
            }

            if (this.isSteamOven36L()) {//如果是旧插件36L蒸汽烤箱0TQN36QL，探针模式下，强行转换为非探针模式，因为该型号，探针模式下，还可以启动所有的模式
                if (this.currentIsWorkingPage(cmdObj) && cmdObj.isProbe.value == 1) {
                    if (cmdObj.mode.value != 0x31 && cmdObj.mode.value != 0x33 && cmdObj.mode.value != 0x3A) {
                        cmdObj.isProbe.value = 0;
                        customData.temperatureText = this.addTemperatureUnit(cmdObj, cmdObj.temperature.upLowTemperature, 0);
                    } else {
                        customData.temperatureText = this.addTemperatureUnit(cmdObj, cmdObj.probeSetttingTemperature.value, 0);
                    }
                }
            }

            let buffer = objectAssign({}, cmdObj, customData);
            return buffer;
        },

        getTemperatureTextWithoutProbe(cmdObj, unit) { // 获取未插入探针时，工作中温度的显示文案
            if (!cmdObj.temperature.upLowTemperature && !cmdObj.temperature.downLowTemperature) {
                return '';
            }
            if (this.isNonCookingTypeComplete(cmdObj)) {
                return '';
            }

            // 温度非0时，返回上低、下低温度的较大值
            let temperature = cmdObj.temperature.upLowTemperature >= cmdObj.temperature.downLowTemperature ? cmdObj.temperature.upLowTemperature : cmdObj.temperature.downLowTemperature;

            if (temperature <= 10) { // 如果温度值为档位，作隐藏处理。 sf
                return '';
            }

            return this.addTemperatureUnit(cmdObj, temperature, unit);
        },

        addTemperatureUnit(cmdObj, temp, unitValue = 0) {

            if (cmdObj.cmdLength <= 34) {//parker: 现在的温度单位判断放在了byte34，以前旧插件会存在上报长度的指令小于或者等于34的情况例如蒸汽烤箱0TQN36QL
                unitValue = 0;
            }

            let unit = unitValue === 1 ? '℉' : '°';
            return temp + unit;
        },

        /**
         * 工作页面判断
         */
        currentIsWorkingPage(analysisObj) {
            return analysisObj.workingState.value == 3 || analysisObj.workingState.value == 4 || analysisObj.workingState.value === 5 || this.periodPauseCondition(analysisObj);
        },

        /**
         * 判断是否插入探针
         */
        isProbeInserted(cmdObj) {
            return cmdObj.isProbe.value;
        },

        /**
         * 判断当前是否云菜谱
         */
        isCloudMenu(obj) {
            return obj.recipeId.value > 0 && obj.mode.value !== 0xE0
        },

        /**
         * 是否是fun烤箱二代判断
         */
        isFun2Oven() {
            const sns = ['08T7428E', '0T7L421F'];
            return sns.indexOf(this.device.extra1.sn8) > -1;
        },

        isS20Oven() {

        },

        /**
         * 大烤箱 1065
         */
        isLargeOven1065() {
            return this.device.extra1.sn8 === '0ET1065Q';
        },

        /**
         * 蒸汽烤箱 36L  / TQN36FQL_SS
         */
        isSteamOven36L() {
            return this.device.extra1.sn8 === '0TQN36QL';
        },

        /**
         *  是否是小烤箱
         */
        isSmallOven() {
            return this.constant.device.type === 0xB4;
        },

        /**
        * 是否是X7微波炉判断
        */
        isX7Micro() {
            return this.device.extra1.sn8 === '09X7321D';
        },
        /**
       * 是否是非烹饪类模式
       */
        isNonCookingTypeComplete(cmdObj) {
            return (cmdObj.mode.value == 0xC0 || cmdObj.mode.value == 0xC1 || cmdObj.mode.value == 0xC2 ||
                cmdObj.mode.value == 0xC3 || cmdObj.mode.value == 0xC4 || cmdObj.mode.value == 0xC5 || cmdObj.mode.value == 0xC6 ||
                cmdObj.mode.value == 0xC7 || cmdObj.mode.value == 0xC8 || cmdObj.mode.value == 0xA1);
        },

        /**
         * 初始化工作页面数据
         */
        initWorkingData() {
            this.isFooterShow = true;
            this.timeShow = false;
            this.hasHour = false;
            this.hourMore10 = false;
            // this.tag_next = '分';
            this.progressShow = true;
            this.finishStatus = false;
            // this.workSpecialStatusText = "";
            this.hasSetting = false;
            this.isTimerStop = false;
            this.preheatFinishTig = false;
            this.statusTag = this.getLanguage('timeLeft');
            // this.statusTag = '剩余时间';
            this.hasStopOrContinueBtn = false;
            this.cancleBtnText = this.getLanguage('close');
            // this.cancleBtnText = '关闭';
            this.cancleIcon = 'img/footer/icon_cancle@2x.png';
        },

        /**
         * 工作状态判断以及数据处理
         */
        getWorkingStatusHandle(cmdObj, chartJson) {
            // nativeService.toast(cmdObj);
            if (cmdObj.workingState.value === 3) {
                this.timeShow = true;
                this.hasSetting = true;
                this.btnText = this.getLanguage("pause");
                this.btnSrc = "img/footer/icon_pause@2x.png";
                this.hasStopOrContinueBtn = true;
                if (cmdObj.light.value) {
                    this.lightImg = "img/light_on@3x.png";
                } else {
                    this.lightImg = "img/light_off@3x.png";
                }

                if (this.isProbeInserted(cmdObj) && this.isCloudMenu(cmdObj) && this.isFun2Oven()) {
                    cmdObj.isProbe.value = 0;
                    this.statusTag = this.getLanguage('timeLeft');
                }

                if (this.isProbeInserted(cmdObj) && !this.isCloudMenu(cmdObj) && this.isFun2Oven()) {
                    this.probeProgress = this.getLanguage('working');
                    this.timeShow = false;
                    this.hasHour = false;
                    this.probeTempText = '';
                    this.statusTag = this.getLanguage('probeMode');
                    // this.cmdObj.mode.text = '';
                    this.cmdObj.temperatureText = '';
                    chartJson.pointShow = false;
                }
            }

            if ((this.isLargeOven1065() || this.isSteamOven36L()) && cmdObj.mode.value == 0x4b) { //如果是大烤箱1065或者蒸汽烤箱，而且模式为快速预热，则修复该模式快速预热的兼容问题...
                cmdObj.displaySign.preheat = 1;
            }
        },

        /**
         * 暂停状态以及段间等待
         */
        getPauseStatusHandle(cmdObj) {
            if (this.periodPauseCondition(cmdObj)) {
                this.timeShow = true;
                this.hasSetting = true;
                this.btnText = this.getLanguage('resume');
                this.btnSrc = "img/footer/icon_start@2x.png";
                this.isTimerStop = true;
                this.statusTag = this.getLanguage('pausing');
                this.hasStopOrContinueBtn = true;
            }
        },

        /**
         * 预约状态
         */
        getOrderStatusHandle(cmdObj) {
            if (cmdObj.workingState.value == 5) {
                this.timeShow = false;
                this.hasSetting = false;
                this.workSpecialStatusText = "预约中";
                this.btnText = "";
                this.btnSrc = "img/footer/icon_start@2x.png";
                this.isTimerStop = true;
                this.statusTag = '';
                this.tag_next = '';
                this.hasStopOrContinueBtn = false;
            }
        },

        /**
         * 烹饪完成状态
         */
        getCookingFinishStatus(cmdObj) {
            if (cmdObj.workingState.value === 4) {
                this.timeShow = false;
                this.hasHour = false;
                this.workSpecialStatusText = this.getLanguages(['cookFinished']);
                this.isTimerStop = true;
                this.tag_next = '';
                this.statusTag = this.getLanguage('hotCaution');
                this.progressShow = false;
                this.finishStatus = true;
                this.probeProgress = '烹饪完成';
                this.probeTempText = '';
                this.cancleBtnText = this.getLanguage('finish');
                this.cancleIcon = 'img/finish_icon@2x.png';
                if (this.isNonCookingTypeComplete(cmdObj)) { //非烹饪类完成，显示工作完成
                    this.workSpecialStatusText = "工作完成";
                    this.statusTag = '';
                }

                if ((this.isLargeOven1065() || this.isSteamOven36L()) && cmdObj.mode.value == 0x4b) { //如果是大烤箱1065，而且模式为快速预热，则修复大烤箱1065该模式的兼容问题...
                    cmdObj.displaySign.preheatTemperature = 1;
                    cmdObj.workingState.value = 3;
                }

            }
        },

        /**
         * 不是烹饪完成 ，并且处于预热中状态
         */
        getPreheatStatusHandle(cmdObj, chartJson, _item) {
            if (cmdObj.workingState.value != 4 && cmdObj.displaySign.preheat == 1) {
                this.timeShow = false;
                this.hasHour = false;
                this.workSpecialStatusText = this.getLanguages(['preheating']);
                let mode_text = cmdObj.mode.text;
                if (cmdObj.mode.value == 0x4B) { //如果是快速预热，文案就变为快速
                    mode_text = "快速";
                }
                let preheatText = cmdObj.temperature.upLowTemperature ? this.getLanguages(['preheat', 'to']) : '';
                this.cmdObj.mode.text = mode_text + " " + preheatText;
                this.tag_next = '';
                this.statusTag = '';
                this.hasSetting = true;
                this.hasStopOrContinueBtn = true;
                this.settingHide(_item);
                chartJson.pointShow = false;
                if (this.constant.device.preheatingCanSetting) {
                    this.hasSetting = true;
                } else {
                    this.hasSetting = false;
                }
            }
        },

        /**
         * 不是烹饪完成 ，并且处于预热温度到达,预热完成
         */
        getPreheatFinishStatusHandle(cmdObj) {
            if (cmdObj.workingState.value != 4 && cmdObj.displaySign.preheatTemperature == 1) {
                this.timeShow = false;
                this.hasHour = false;
                this.workSpecialStatusText = this.getLanguages(['preheating', 'finish']);
                // this.workSpecialStatusText = '预热完成';
                this.progressShow = false;
                this.finishStatus = true;
                this.preheatFinishTig = true;
                this.tag_next = '';
                this.statusTag = this.getLanguages(['preheat', 'to']) + cmdObj.temperatureText;
                this.hasStopOrContinueBtn = true;
                this.hasSetting = false;
                // this.btnText = this.getLanguage('start');
                this.btnText = this.getLanguage('start');
                this.btnSrc = "img/footer/icon_start@2x.png";

                if ((this.isLargeOven1065() || this.isSteamOven36L()) && cmdObj.mode.value == 0x4b) { //如果是大烤箱1065，而且模式为快速预热，则修复大烤箱1065该模式的兼容问题...
                    this.hasStopOrContinueBtn = false;
                }
            }

        },

        /**
         * 菜单感应中
         */
        getMenuFeelStatusHandle(cmdObj, chartJson) {
            if (cmdObj.menuFeel.value) {
                this.hasHour = false;
                this.workSpecialStatusText = this.getLanguage('sensing');
                this.timeShow = false;
                this.tag_next = '';
                chartJson.pointShow = false;
                this.statusTag = '';
                this.hasSetting = false;
                this.hasStopOrContinueBtn = false;
            }

        },

        /**
         * 时间倒计时
         */
        getTimeGoingHandle(cmdObj) {
            var _hour = cmdObj.timeRemaining.hour, _minute = cmdObj.timeRemaining.minute, _second = cmdObj.timeRemaining.second;
            if (this.timeShow && this.getAllSeconds(cmdObj) > 0) {
                if (this.getAllSeconds(cmdObj) >= 60 * 60) { //大于1小时，有‘时’显示
                    if (_hour > 9) {
                        this.hourMore10 = true;
                    }
                    this.workSpecialStatusText = _hour + "  " + (_minute > 9 ? _minute : '0' + _minute);
                    this.tag_next = this.getLanguage('minute');;
                    this.hasHour = true;

                } else if (this.getAllSeconds(cmdObj) > 60) {//大于1分钟，小于1小时，只显示分
                    this.workSpecialStatusText = _minute;
                    this.tag_next = this.getLanguage('minute');
                    this.hasHour = false;
                }
                else { //小于1分钟开始倒计时
                    this.hasHour = false;
                    let allSeconds = this.getAllSeconds(cmdObj);
                    if (this.getAllSeconds(cmdObj) == 60) {
                        allSeconds = this.getAllSeconds(cmdObj) - 1;
                    }
                    this.workSpecialStatusText = allSeconds;
                    this.tag_next = this.getLanguage('second');
                }
            }
        },

        /**
         * 倒计时百分比数据处理
         */
        getProgressStepHandle(cmdObj, chartJson) {
            var allSettingSeconds = cmdObj.timeSetting.hour * 60 * 60 + cmdObj.timeSetting.minute * 60 + cmdObj.timeSetting.second;
            var progress_step = (allSettingSeconds - this.getAllSeconds(cmdObj)) / allSettingSeconds * 360; //360度倒计时为例
            chartJson.pointShow = true;
            if (!allSettingSeconds) { // 如果设置时间不上报，自动隐藏倒计时小球 sf
                chartJson.pointShow = false;
                // return;  //parker: 如果不上报总的设定时间，如果直接return，函数后面的语句都不执行了。
            }

            chartJson.progressCounter = parseInt(progress_step) || 0;

            if (cmdObj.probeRealTemperature.value > cmdObj.probeSetttingTemperature.value) {
                cmdObj.probeRealTemperature.value = cmdObj.probeSetttingTemperature.value;
            }
        },

        /**
         * 工作页面
         */
        analysisWorkingFun(analysisObj, tabs) {
            // nativeService.toast(analysisObj);
            var self = this, timer = null;
            this.initWorkingData();

            let chartJson = JSON.parse(JSON.stringify(this.chartJson));

            /**
             * 倒计时百分比数据处理
             */
            this.getProgressStepHandle(analysisObj, chartJson);

            /**
             * 探针特殊判断处理
             */
            this.probeProgress = analysisObj.probeRealTemperature.value;
            if (this.isProbeInserted(analysisObj)) {
                this.statusTag = '当前实时温度';
                chartJson.pointShow = false;
            }

            /**
             * 工作状态判断以及数据处理
             */
            this.getWorkingStatusHandle(analysisObj, chartJson);

            /**
             * 暂停状态以及段间等待
             */
            this.getPauseStatusHandle(analysisObj);

            /**
             * 预约状态
             */
            this.getOrderStatusHandle(analysisObj);

            /**
             * 获取配置文件mode.js或者auto-menu.js的对象
             */
            var _isRecipe = false;
            if (this.cmdObj.mode.value == 0xE0) {
                _isRecipe = true;
            }
            var _item = cmdFun.getCurrentModeItem(tabs, analysisObj.recipeId.value, analysisObj.mode.value, _isRecipe);
            // nativeService.alert(_item);
            this.settingHide(_item);
            if (_item.circleProgressPointHide) {
                chartJson.pointShow = false;
            }

            /**
             * 烹饪完成状态
             */
            this.getCookingFinishStatus(analysisObj);


            /**
             * 不是烹饪完成 ，并且处于预热中状态
             */
            this.getPreheatStatusHandle(analysisObj, chartJson, _item);


            /**
             * 不是烹饪完成 ，并且处于预热温度到达,预热完成
             */
            this.getPreheatFinishStatusHandle(analysisObj);

            /**
             * 菜单感应中
             */

            this.getMenuFeelStatusHandle(analysisObj, chartJson);

            /**
             * 是否有暂停，继续按钮
             */
            if (_item.stopBtnHide && (!this.constant.device.showPreheatContinueBtn || !analysisObj.displaySign.preheatTemperature)) {
                this.hasStopOrContinueBtn = false;
            }

            this.chartJson = JSON.parse(JSON.stringify(chartJson));

            /**
             * 倒计时
             */
            this.getTimeGoingHandle(analysisObj);
        },
        /**
         * 工作状态中 模式不可编辑设置
         */
        settingHide(item) {

            if (item.settingHide || item.standbyHide || (this.isCloudMenu(this.cmdObj) && !this.device.cloudMenuEditable)) { // 云菜谱默认不可修改参数 不过可配置
                // if(item.settingHide || item.standbyHide) { // 云菜谱可编辑 sf 杨工提的需求 后来黄蓉又在M3微波炉反对 修改如上
                this.hasSetting = false;
            }
        },
        cancle() {
            let subAction = this.cmdObj.workingState.value === 4 ? 'finish_mode_click' : 'close_mode_click';
            this.statisticsUpload({ subAction });
            var self = this;
            if (this.finishStatus) {
                this.cancleWorking();
            } else {
                this.openActionsheet();
            }
        },
        //打开上拉菜单
        openActionsheet: function () {
            this.showBar = true;
            this.$nextTick(e => {
                this.$refs.actionsheet.open();
            });
        },
        //关闭事件
        closeActionsheet: function () {
            this.showBar = false;
        },
        //点击某个item的事件
        actionsheetItemClick: function (event) {
            this.showBar = false;
            this.statisticsUpload({ subAction: 'confirm_close_click' });
            if (event.index == 0) {
                this.cancleWorking();
            }

        },
        //点击取消/确定按钮事件
        actionsheetBtnClick: function () {
            this.showBar = false;
            this.statisticsUpload({ subAction: 'cancel_close_click' });
        },
    }
};

export default workingModalMixin;