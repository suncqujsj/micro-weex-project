/**
 * Created by parker
 * 2018/11/1
 * 用于解析待机页面
 */
// var timerRecord = 0;
// var numberRecord = 0; //记录跳页面的次数
import cmdFun from "../../command/multiCavity/util.js"; //解析指令
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
            index:0,
            whichCavity: 0,
            workingAnalysisObj:cmdFun.initAnalysisObj(),
            warningDialog: this.initWarningDialog(),
            modeText:'',
            srcollPaddingBottom:'',
            cmdObj: {'down_cavity':cmdFun.initAnalysisObj(),'up_cavity':cmdFun.initAnalysisObj()},
            isCavityWorking:false,

            chartJson: {
                "completedColor":"#FFFFFF", //环形进度条未完成后的颜色默认#267AFF
                "incompletedColor":"#f5d5d5eb", //环形进度条未完成后的颜色，默认透明
                "thickness":2, //环形进度条宽度，默认4
                "cornerRadius" : isIosLess5_4?140:280,  //环形的半径，默认是width/2
                "totalCounter" : 360, //环形进度条的最大值，默认是360
                "progressCounter" : 0, //设置进度值，默认是从0-360, 默认为0
                "autoProgress" : false, //设置是否需要自动执行环形进度，默认false, 如果设置为true，则每秒进度值+1操作
                "clockwise" : true, //环形自动执行进度的方向，默认是true，即顺时针方向，false为逆时针方向
                "startingSlice" : 360, //环形进度开始的起始位置，当totalCounter为360的时候，0: 0点钟位置起点，90:3点钟位置起点 180:6点钟位置起点
                "pointShow" : false, //环形进度中的进度球是否需要显示，默认不显示
                "pointRadius" : 3, //默认是环形进度宽度的一半
                "pointColor" :  "#FFFFFF", //环形进度中的进度球颜色
                "pointImageBase64" :  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAERklEQVRYR82Yf2jUdRjHX5875137cbcfOF1Omfij1DDC3BKEWeCPUMERy2pgkQvBQUY5EfrB6AfIlrVFG4gYJWmaxASV/AHlQKptRTRSywyHu5oudttOt+623T3x3Pe8rbntbiTdvv99P5/n83ne3/fn/Tyf5/ka4nkqxObKJd3RS1Y/FCI8JpBnDLOATASvQJuBVoSvptpoCKTQ6fPQTYUJxXJhYhlkV8t0PxRjWIeQH3Ya6zF0As0IJ51wtOMlc2O8JWOD2CtJbj9FCK8KLACcsXyPMu83cBnDOz1O6tlqBkbbY1QQGXvFHQpQJiHeABy6cKodpiXD/AxYPxcezIbcVEh3QrcfPLfgpw448Tv81gV/9UF/MOoyYGy8aXNQ27XV9IwEcgcI13syDzsVwDMI4fn7MmHT/ZbzBZlYg2M8Alz2WmCO/AK/eiOGBp06RJAK38vmyvDl/9pPGQj6qUV4CrAbA88uhp0FMD0ZptjiP5DBENzog8pG+OQCiEKAIIbDdidlwxkZAqEaCFAuwtvKQHISlD0EryyDe6ZYznsH4JoPzrbC6Va42gNdfshwwhw3rMmDVXkw2wUpSdaavwdhTzPU/gh9qgiDGMNrPQ6qbmskCsJdI0+KcEA1oAzsWDYEICjw/XU4cAGOX4GewNiMuB2wYR5sXgwPz1A6h4C82xxlJGAMm3u2m891pzAIDcMAnBFYou/PPQC7C4cY+PIqlJ8Dz83oJuOei35EbhpUrYTH5wwxsqsBPv7ZejfQ4oDVGr4GTUSZbCNElYahirC+CGamgjJwphVKTkAwZsq5E5fdBgfXw+o8i5E/bkLRsahY/dgo93mpM2kfSpYJ8inCWg3DXQWwfaklwsZ22HIK2nzxC3Kk5SwX7F8LBTkwEIIPfoDdjZHwNZwiSImZViPzA8J3mglnpkH9RiskVYQ7G+DgxfiOYCyYejQli6Cy0BKrhqyyoawAXofhEeOukVIR9unIytlwrMgSyqVOWHN0fBHGy4+K9XQxLMwinCw21sO5axFtCC8Yd7UcEnhah/Y8CqVhaVq0vX4+Xjex7d5aAS8utez2tcCOr6MC/cy4quUbYLkOnd0E+TOsyXVfwHlP7M3jtViRCyefsKybrsOqI9GV3+pxtImQq0OXtsC9qdbkoo+i5xavn3HtVG8Xn7dM/rwFC/dHmDB4FESvCMk61F4GyZHsmFMXyXB3BQJoBm7fZm3WNwg5tVEQfaqJNiGBTIBnkmhiMkSH+30pFZPgPJHQjGnodMDyyXF3hG/RdDR4/v9bFMp93dRNknoikowSXlmFcUyGGlNxjFlt50N2CiRNoNrWAqajFyqbJlJtR44l4X3H7bsqVge2YS4siXRgWu5r2a8dWEsHHL8bHVj00kx0Lzr89g535TaKkQl05eDF0PTfu/LhSDShuUh32MnqD1GIGfF/ArwiI/5PBOn0+eL7P/EPYtpkF4ik2AkAAAAASUVORK5CYII=", //环形进度中的进度球的图片base64
            },
            progress:1,
            progress_radius: 280,
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
            allSeconds: null,

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

            warningDialogShow: false,
            warningDialogTitle: "温馨提示",
            warningDialogContent: "主人，您的水箱缺水了，要及时添加水哦",

            showBar:false,
            actionsheetItems:['确定关闭'],
            lightImg:"img/light_off@3x.png"
        };
    },
    methods: {
        dialogSetting(analysisObj){
            if(this.index==0){
                this.setWarningDialog("",null,false);
                this.modalVisibility = false;
                if(analysisObj.up_cavity.displaySign.isError){
                    this.setWarningDialog("设备故障，请联系售后人员");
                }
                if(analysisObj.up_cavity.displaySign.lackWater){
                    this.setWarningDialog("主人，您的水箱缺水了，要及时添加水哦");
                }
                if(analysisObj.up_cavity.displaySign.waterBox){
                    this.setWarningDialog("缺水盒");
    
                }
                if(analysisObj.up_cavity.displaySign.doorSwitch){
                    this.setWarningDialog("炉门开了");
                }
    
                if(analysisObj.up_cavity.displaySign.lock){
                    // let context = this;
                    // this.setWarningDialog("你需要关闭童锁吗？", function(){
                    //     context.childLock(false);
                    // });
                    !this.modalVisibility && this.showModal();
                }    
            }
            if(this.index==1){
                this.setWarningDialog("",null,false);
                this.modalVisibility = false;
                if(analysisObj.down_cavity.displaySign.isError){
                    this.setWarningDialog("设备故障，请联系售后人员");
                }
                if(analysisObj.down_cavity.displaySign.lackWater){
                    this.setWarningDialog("主人，您的水箱缺水了，要及时添加水哦");
                }
                if(analysisObj.down_cavity.displaySign.waterBox){
                    this.setWarningDialog("缺水盒");
    
                }
                if(analysisObj.down_cavity.displaySign.doorSwitch){
                    this.setWarningDialog("炉门开了");
                }
    
                if(analysisObj.down_cavity.displaySign.lock){
                    // let context = this;
                    // this.setWarningDialog("你需要关闭童锁吗？", function(){
                    //     context.childLock(false);
                    // });
                    !this.modalVisibility && this.showModal();
                }
    
            }
        },
        analysisFun(analysisObj) { 
            clearInterval(this.queryTimer);    
            this.cmdObj = analysisObj;
        //    nativeService.alert(analysisObj);

            this.dialogSetting(analysisObj);
           
            this.isCavityWorking = false;
            let downCavityStatus = analysisObj.down_cavity.workingState.value;
            let upCavityStatus = analysisObj.up_cavity.workingState.value;
            if(this.index==0 && (upCavityStatus==3||upCavityStatus==4||upCavityStatus==6)){
                this.isCavityWorking = true;
                this.analysisWorkingFun(analysisObj.up_cavity,this.pages[0].tabs);
            }
             if(this.index==1 && (downCavityStatus==3||downCavityStatus==4||downCavityStatus==6)){
                this.isCavityWorking = true;
                this.analysisWorkingFun(analysisObj.down_cavity,this.pages[1].tabs);
            }
            if(this.index==0 && upCavityStatus==3){
                var _hour = analysisObj.up_cavity.timeRemaining.hour, _minute = analysisObj.up_cavity.timeRemaining.minute, _second = analysisObj.up_cavity.timeRemaining.second;
                var allSeconds = _hour*60*60+_minute*60+_second;
                if(allSeconds<2*60){
                    this.queryRunTimer(1);//6秒轮询 
                }else{
                    this.queryRunTimer(6);//6秒轮询 
                }
            }
            if(this.index==1 && downCavityStatus==3){
                var _hour = analysisObj.down_cavity.timeRemaining.hour, _minute = analysisObj.down_cavity.timeRemaining.minute, _second = analysisObj.down_cavity.timeRemaining.second;
                var allSeconds = _hour*60*60+_minute*60+_second;
                if(allSeconds<2*60){
                    this.queryRunTimer(1);//6秒轮询 
                }else{
                    this.queryRunTimer(6);//6秒轮询 
                }
            }
        },
        //  countDownRunTimer(timeSet){
        //     var self = this;
        //      this.countDownTimer = setInterval(function(){
        //         self.queryStatus();
        //     },timeSet*1000);
        // },
        countDownRunTimer(allSeconds,timeSet){
            var self = this;
            var countDownTimer = setInterval(function(){
                if(self.isTimerStop||allSeconds<=0){
                    self.allSeconds = null;
                    clearInterval(countDownTimer);
                    return;
                }
                if(allSeconds<=60 && allSeconds>0){
                     allSeconds--;   
                     self.tag_next = '秒';
                     self.allSeconds = allSeconds;
                     self.workSpecialStatusText = allSeconds;
                }
            },timeSet*1000);
        },
        analysisWorkingFun(analysisObj,tabs) {
            this.workingAnalysisObj = analysisObj;
            // nativeService.alert(this.workingAnalysisObj);
            var self = this , timer = null;
            this.isWorking = false;
            this.isFooterShow = true;
            this.timeShow = false;
            this.hasHour = false;
            this.hourMore10 = false;
            this.warningDialogShow = false;
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
            var allSeconds = _hour*60*60+_minute*60+_second;
            var progress_step = (10*60-allSeconds)/(10*60)*360; //360度倒计时为例
            //this.chartJson.progressCounter = progress_step;


            //this.cmdObj = analysisObj;
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
            }

             if(analysisObj.workingState.value == 6){
                this.timeShow = true;
                this.hasSetting = true;
                this.btnText = "继续";
                this.btnSrc = "img/footer/icon_start@2x.png";
                this.isTimerStop = true;
                this.statusTag = '暂停中';
                this.hasStopOrContinueBtn = true;
            }
            if(analysisObj.isProbe.value){
                this.statusTag = '当前实时温度';
            }
            
            var _isRecipe = false;
            if(analysisObj.mode.value == 0xE0){
                _isRecipe = true;
            }
            var _item = cmdFun.getCurrentModeItem(tabs,analysisObj.recipeId.value,analysisObj.mode.value,_isRecipe);
            //this.currentItem = _item;
            //nativeService.alert(_item);
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
                analysisObj.mode.text = mode_text+"预热到";
                this.tag_next = '';
                this.statusTag = '';
                this.hasSetting = true;
                this.hasStopOrContinueBtn = true;
                if(_item.settingHide){
                    this.hasSetting = false;
                }
                
            }

            // 不是烹饪完成 ，并且处于预热温度到达
            if(analysisObj.workingState.value != 4 &&  analysisObj.displaySign.preheatTemperature == 1){
                this.timeShow = false;
                this.hasHour = false;
                this.workSpecialStatusText = "预热完成";
                // this.warningDialogShow = true;
                // this.warningDialogContent = "预热已完成，请放进食物再按'继续'，继续烹饪";
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

            //倒计时按照设计来
            if(this.timeShow&&allSeconds>0){
                if(allSeconds>=60*60){ //大于1小时，有‘时’显示
                    if(_hour>9){
                        this.hourMore10 = true;
                    }
                    this.workSpecialStatusText = _hour+"  "+(_minute>9?_minute:'0'+_minute);
                    this.tag_next = '分';
                    this.hasHour = true;
                }else if(allSeconds>2*60){//大于2分钟，小于1小时，只显示分
                    this.workSpecialStatusText = _minute;
                    this.tag_next = '分';
                    this.hasHour = false;
                }
                else{ //小于2分钟开始倒计时
                    this.hasHour = false;
                    // if(allSeconds<=60){
                    //     this.workSpecialStatusText = 1;
                    //     this.tag_next = '分';
                    // }
                    if(allSeconds>60){
                        this.workSpecialStatusText = 1;
                        this.tag_next = '分';
                    }else{
                        if(allSeconds==60){
                            allSeconds = allSeconds-1;
                        }
                        this.workSpecialStatusText = allSeconds;
                        this.tag_next = '秒';
                        // if(this.allSeconds){
                        //     this.countDownRunTimer(this.allSeconds,1);
                        // }else{
                        //     this.countDownRunTimer(allSeconds,1);
                        // }
                      
                    }
                    //this.countDownRunTimer(1);//1秒03轮询
                    
                }
            }

        },
        cancle(){
            if(this.finishStatus){
                this.cancleWorking();
            }else{
                this.openActionsheet();            
            }
        },
        knowClicked(){
            this.warningDialogShow = false;
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