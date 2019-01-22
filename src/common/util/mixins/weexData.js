/**
 * Created by parker
 * 2018/11/1
 * 用于解析待机页面
 */
// var numberRecord = 0; //记录跳页面的次数
import cmdFun from "../command/util.js"; //解析指令
import nativeService  from '@/common/services/nativeService';
//ios5.4.0以下版本判断做兼容倒计时组件
let isIosLess5_4 = false;
let appVersion = weex.config.env.appVersion, platform = weex.config.env.platform;
let appVersionArr = appVersion.split('.');
if(platform=='iOS' && (parseInt(appVersionArr[0])==5 && parseInt(appVersionArr[1])<4)){
    isIosLess5_4 = true;
}
let workingModalMixin  = {
    data(){
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
                warningDialog: this.initWarningDialog(),
                modeText:'',
                srcollPaddingBottom:'',
                cmdObj: cmdFun.initAnalysisObj(),

                chartJson: {
                    "completedColor":"#FFFFFF", //环形进度条未完成后的颜色默认#267AFF
                    "incompletedColor":"#f5d5d5eb", //环形进度条未完成后的颜色，默认透明
                    "thickness":2, //环形进度条宽度，默认4
                    "cornerRadius" : isIosLess5_4?120: 240,  //环形的半径，默认是width/2
                    "totalCounter" : 360, //环形进度条的最大值，默认是360
                    "progressCounter" : 0, //设置进度值，默认是从0-360, 默认为0
                    "autoProgress" : false, //设置是否需要自动执行环形进度，默认false, 如果设置为true，则每秒进度值+1操作
                    "clockwise" : true, //环形自动执行进度的方向，默认是true，即顺时针方向，false为逆时针方向
                    "startingSlice" : 360, //环形进度开始的起始位置，当totalCounter为360的时候，0: 0点钟位置起点，90:3点钟位置起点 180:6点钟位置起点
                    "pointShow" : false, //环形进度中的进度球是否需要显示，默认不显示
                    "pointRadius" : 4, //默认是环形进度宽度的一半
                    "pointColor" :  "#FFFFFF", //环形进度中的进度球颜色
                    "pointImageBase64" :  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAA21BMVEUAAAD////t7e3i4uLf39/f39/f39/g4ODg4ODh4eHq6urq6urf39/g4ODg4ODm5ubg4ODj4+Pf39/g4ODg4ODg4OD5+fng4OD5+fnf39/e3t7f39/g4OD////u7u75+fn29vb5+fn4+Pj5+fnm5ub39/fx8fHf39/f39/7+/v19fXf39/f39/g4ODe3t7i4uL8/Pzg4OD6+vrn5+f6+vrv7+/6+vru7u7k5OT29vbp6en7+/v39/f6+vr6+vrz8/P29vbz8/Py8vL5+fn6+vrf39/u7u7i4uLq6uroWKUWAAAAQHRSTlMABA0I+NXvXzwvFgy5lEYdoiXosYVJjfPeyatnQiT58Oa+NzD++vrg3L+qjn5zVTQrIfPrlOvm3dPOzKt2ZkXCaN8LMwAAA3hJREFUSMeM0s2KwjAUBWBjN1pBcBO6UNtaHLArERHEn0mavP8zjTcnXm24HT2RxM3HKckdyVndjnVROlMW9fG2Gn2dRlfee+cd/SiVbr6Cm50HfGyMXb35CFcXj7iXM2Fr//9upV1gJKENQexbrYZlvkPhG4w8bKbOh+S+iBKO++hAir0s74fgwHyET+dMOMq72EmSMBa30kJrsEJvXhCDcYCQoe5lizyV6vmaXJpgTq0SqoNEaxRgDDk6mQRcKz8lOHSabX82LrjWAMFpSaXWmLY3tzyy/Vb6m0Da3ud5RwbhVu5LrLX2972UPxIn/goMvbZhesTwUIAfm9DHrVbzm576regTMJUGXKlIGzDEwLqUYVHoaGLpNSIsATJnfUVt1nIrmESwOG0W6PjcGx7gVEMyP49JqvwEykZojZBT5Yro4jB4PTCoJclZL4hmU8MwTWQJ7GzXTTOiE35MubWzwCyJTojOllsQIUA9h+1nOaMLnpdG/lgZU2e3no+J/hVaZyuuAkEYgIm96djtLqIO4VzkTALZCGGYYS4DGt//iU5p5XS79GBJjDcff3VZhOR/0FnGo4l2KB+fOdIvTa3bN6NDfSENflYPacbzqp/AGcaULiF+zfCIpsOYiKv+2pZnCgel7YdySU+97HOWimycCgod1j3zyLCI52/L4i1mO67vc7wZ1l/Ij0mkTkWDmePQrRSw/sOIo/s40/pGJqn3qB8wHpaZWKOMNKjtry3Do0LHoZCFcROt87SFTyFF+Ppdc1zFtgB7NWHzUKyOKRf6xdhbLXm7dkZsF25c1rchFGOPjD7AWfC8WsqOOnQ4bZo8Z2qa2P7PfCZpf1Jd/vVU8t1yC5aZO16err6RsBa5YsXz8RvDxD6zYCrHdTAtX6IDfbbWV9Lqh4Yeogu2a4rEotrTpusdXmOLvGvovhIxQWHK9+rqUDQYvFA9fDbFoao9f/nP0vFExHgD2DIdOGXTcBYJzzHtGuvHF1UmFHCnNWa2HUCalOoS+yAtRcLglDJOG9C7rm1Bwa3bNVCUs/QUhMTm8B1dxVEiNoVQHsXVvBVb06FbK8kSTunLwwNPmFS1G5pm7di5uSKLZMn2CYdK9qyUUSbcG85nBYdeIM6Ziqo0rSKVnUXghQjXMXHeYs99D/I8eHe9+M0hBq7rDSG+A+UTsvnF/QPk9EAXDmEvRAAAAABJRU5ErkJggg==", //环形进度中的进度球的图片base64
                },
                progress:1,
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
                isWorking: false,
    
                // cmdObj:cmdFun.initAnalysisObj(), //指令解析对象
              
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
                modeText:'',
                probeProgress: null, //探针工作倒计时
                probeTempText: "°C",
    
                showBar:false,
                actionsheetItems:['确定关闭'],
                lightImg:"img/light_off@3x.png",

                isWorkingPage:false,

                workingSettingRecord: false,
        };
    },
    methods: {
        analysisFun(analysisObj,tabs) {                
            //this.show = false;
            // nativeService.alert(analysisObj);
            clearInterval(this.queryTimer);
            // this.setWarningDialog("",null,false);
            this.modalVisibility = false;
            this.showDetailVisibility = false;
            this.show = false;    
            this.isWorkingPage = false;
            this.cmdObj = analysisObj;
            this.probeTempText = '°C';
            let chartJson = JSON.parse(JSON.stringify(this.chartJson));
            chartJson.pointShow = false;
            this.chartJson = chartJson;
               
            //提示
            let isLackWater = false , isWaterBox = false, isDoorSwitch = false, isError = false;
            if(analysisObj.workingState.value == 2 || analysisObj.workingState.value == 1 ){
                this.setWarningDialog("",null,false);
            }
            if(analysisObj.workingState.value == 3 || analysisObj.workingState.value == 4 || analysisObj.workingState.value == 6){
                if(analysisObj.displaySign.lackWater && analysisObj.mode.value!=0xC4){
                    isLackWater = true;
                    this.setWarningDialog("主人，您的水箱缺水了，要及时添加水哦");
                }
                if(analysisObj.displaySign.waterBox && analysisObj.mode.value!=0xC4){
                    isWaterBox = true;
                    this.setWarningDialog("主人，您的设备缺水盒了");
    
                }
                if(analysisObj.displaySign.doorSwitch){
                    isDoorSwitch = true;
                    this.setWarningDialog("主人，您的设备炉门开了");
                }
            }
            if(analysisObj.displaySign.isError){
                isError = true;
                this.setWarningDialog("主人，您的设备发生故障了，请联系售后人员");
            }
            if(!isLackWater && !isWaterBox && !isDoorSwitch && !isError){
                this.setWarningDialog("",null,false);
            }
           
            if(analysisObj.displaySign.lock){
                // let context = this;
                // this.setWarningDialog("你需要关闭童锁吗？", function(){
                //     context.childLock(false);
                // });
                !this.modalVisibility && this.showModal();
            } 
            // if(analysisObj.workingState.value == 3){
            //     this.queryRunTimer(6);//6秒轮询 
            // }
            if (analysisObj.workingState.value == 3 || analysisObj.workingState.value == 4 || analysisObj.workingState.value == 6) {
                this.isWorkingPage = true;
                this.analysisWorkingFun(analysisObj,tabs);
            }
            if(analysisObj.workingState.value == 3){
                var _hour = analysisObj.timeRemaining.hour, _minute = analysisObj.timeRemaining.minute, _second = analysisObj.timeRemaining.second;
                var allSeconds = _hour*60*60+_minute*60+_second;
                if(allSeconds<2*60){
                    this.queryRunTimer(1);//6秒轮询 
                }else{
                    this.queryRunTimer(6);//6秒轮询 
                }
            }
           
        },
        countDownRunTimer(minute,second,timeSet){
            var self = this;
            var allSeconds = minute*60+second;
            var countDownTimer = setInterval(function(){
                if(self.isTimerStop||allSeconds<=0){
                    clearInterval(countDownTimer);
                    return;
                }
                if(allSeconds<=60 && allSeconds>0){
                     allSeconds--;   
                     self.tag_next = '秒';
                     self.workSpecialStatusText = allSeconds;
                }
            },timeSet*1000);
        },
        analysisWorkingFun(analysisObj,tabs) {
            var self = this , timer = null;
            // clearInterval(this.countDownTimer);
            // nativeService.alert(analysisObj);
            if(this.workingSettingRecord){
                this.show = true;    
            }
            this.isWorking = false;
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
            this.statusTag = '剩余时间';
            this.hasStopOrContinueBtn = false;
            this.cancleBtnText = '关闭';
            this.cancleIcon = 'img/footer/icon_cancle@2x.png';

            var _hour = analysisObj.timeRemaining.hour, _minute = analysisObj.timeRemaining.minute, _second = analysisObj.timeRemaining.second;
            var allSettingSeconds = analysisObj.timeSetting.hour*60*60+analysisObj.timeSetting.minute*60+analysisObj.timeSetting.second;
            var allSeconds = _hour*60*60+_minute*60+_second;
            var progress_step = (allSettingSeconds-allSeconds)/allSettingSeconds*360; //360度倒计时为例
            let chartJson = JSON.parse(JSON.stringify(this.chartJson));
            chartJson.pointShow = true;
            chartJson.progressCounter = progress_step;
            this.chartJson = chartJson;

            if(analysisObj.probeRealTemperature.value>analysisObj.probeSetttingTemperature.value){
                analysisObj.probeRealTemperature.value = analysisObj.probeSetttingTemperature.value;
            }
            this.probeProgress =analysisObj.probeRealTemperature.value;

            if(analysisObj.light.value){
                this.lightImg = "img/light_on@3x.png";
            }else{
                this.lightImg = "img/light_off@3x.png";
            }
            
            if(analysisObj.workingState.value == 3){
                this.isWorking = true;
                this.timeShow = true;
                this.hasSetting = true;
                this.btnText = "暂停";
                this.btnSrc = "img/footer/icon_pause@2x.png";
                this.hasStopOrContinueBtn = true;
                // if(analysisObj.mode.value == 0xE0){//云菜谱没有设置时间温度蒸汽那些
                //      this.hasSetting = false;
                // }
            }
             if(analysisObj.workingState.value == 6){
                this.timeShow = true;
                this.hasSetting = true;
                this.btnText = "继续";
                this.btnSrc = "img/footer/icon_start@2x.png";
                this.isTimerStop = true;
                this.statusTag = '暂停中';
                this.hasStopOrContinueBtn = true;
                // if(analysisObj.mode.value == 0xE0){//云菜谱没有设置时间温度蒸汽那些
                //      this.hasSetting = false;
                // }
            }
            if(analysisObj.isProbe.value){
                this.statusTag = '当前实时温度';
            }
            
            var _isRecipe = false;
            if(this.cmdObj.mode.value == 0xE0){
                _isRecipe = true;
            }
            var _item = cmdFun.getCurrentModeItem(tabs,analysisObj.recipeId.value,analysisObj.mode.value,_isRecipe);
            //this.currentItem = _item;
            if(_item.settingHide){
                this.hasSetting = false;
            }

            if(analysisObj.workingState.value == 4){
               this.timeShow = false;
               this.hasHour = false;
               this.workSpecialStatusText = "烹饪完成";
               this.isTimerStop = true;
               this.tag_next = '';
               this.statusTag = '取出时小心烫手';
               this.progressShow = false;
               this.finishStatus = true;
               this.probeProgress = '烹饪完成';
               this.probeTempText = '';
               this.cancleBtnText = '完成';
               this.cancleIcon = 'img/finish_icon@2x.png';
            //    this.countDownRunTimer(0,0,1);
              
            }
            // 不是烹饪完成 ，并且处于预热中状态
             if(analysisObj.workingState.value != 4 && analysisObj.displaySign.preheat == 1){
                this.isWorking = true;
                this.timeShow = false;
                this.hasHour = false;
                this.workSpecialStatusText = "预热中";
                let mode_text = analysisObj.mode.text;
                if(analysisObj.mode.value == 0x4B){ //如果是快速预热，文案就变为快速
                    mode_text = "快速";
                }
                this.cmdObj.mode.text = mode_text+"预热到";
                this.tag_next = '';
                this.statusTag = '';
                this.hasSetting = true;
                this.hasStopOrContinueBtn = true;
                if(_item.settingHide){
                    this.hasSetting = false;
                }
                let chartJson = JSON.parse(JSON.stringify(this.chartJson));
                chartJson.pointShow = false;
                this.chartJson = chartJson;
                
            }

            // 不是烹饪完成 ，并且处于预热温度到达
            if(analysisObj.workingState.value != 4 &&  analysisObj.displaySign.preheatTemperature == 1){
                this.timeShow = false;
                this.hasHour = false;
                this.workSpecialStatusText = "预热完成";
                this.progressShow = false;
                this.finishStatus = true;
                this.preheatFinishTig = true;
                this.tag_next = '';
                this.statusTag = '已预热到'+analysisObj.temperature.upLowTemperature+'°';
                this.hasStopOrContinueBtn = true;
                this.hasSetting = false;
                this.btnText = "开始";
                this.btnSrc = "img/footer/icon_start@2x.png";
            }
            if(analysisObj.menuFeel.value){
                this.workSpecialStatusText = "感应中";
                this.hasStopOrContinueBtn = false;
            }

            if(_item.stopBtnHide){
                this.hasStopOrContinueBtn = false;
            }

            //倒计时按照设计来
            if(this.timeShow&&allSeconds>0){
                if(allSeconds>=60*60){ //大于1小时，有‘时’显示
                    if(_hour>9){
                        this.hourMore10 = true;
                    }
                    this.workSpecialStatusText = _hour+"  "+(_minute>9?_minute:'0'+_minute);
                    this.tag_next = '分';
                    this.hasHour = true;
                }
                else if(allSeconds<60*60 && allSeconds>2*60){//大于2分钟，小于1小时，只显示分
                    // if(allSeconds==60*60){_minute=59;}
                    this.workSpecialStatusText = _minute;
                    this.tag_next = '分';
                    this.hasHour = false;
                }else{ //小于2分钟开始倒计时
                    this.hasHour = false;
                    if(allSeconds>60){
                        this.workSpecialStatusText = 1;
                        this.tag_next = '分';
                    }else{
                        if(allSeconds==60){
                            allSeconds = allSeconds-1;
                        }
                        this.workSpecialStatusText = allSeconds;
                        this.tag_next = '秒';
                        // this.countDownRunTimer(_minute,_second,1);
                    
                    }
                }
            }

        },
        cancle(){
            var self = this;
            if(this.finishStatus){
                this.cancleWorking();
            }else{
                this.openActionsheet();            
            }
        },
         //打开上拉菜单
        openActionsheet: function () {
            this.showBar = true;
            this.$nextTick(e=>{
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
            if(event.index == 0){
               this.cancleWorking();
            }
           
        },
        //点击取消/确定按钮事件
        actionsheetBtnClick: function () {
            this.showBar = false;
        },
    }
};

export default workingModalMixin;