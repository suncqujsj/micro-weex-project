/**
 * Created by sf
 * 2018/11/1
 */

var numberRecord = 0; //记录跳页面的次数
var timerRecord = 0;
let workingModalMixin  = {
    data(){
        return {
            //   chartJson: {
            //     "completedColor":"#FFFFFF", //环形进度条未完成后的颜色默认#267AFF
            //     "incompletedColor":"#ffe0e0", //环形进度条未完成后的颜色，默认透明
            //     "thickness":6, //环形进度条宽度，默认4
            //     "cornerRadius" : 120,  //环形的半径，默认是width/2
            //     "totalCounter" : 360, //环形进度条的最大值，默认是360
            //     "progressCounter" : 0, //设置进度值，默认是从0-360, 默认为0
            //     "autoProgress" : false, //设置是否需要自动执行环形进度，默认false, 如果设置为true，则每秒进度值+1操作
            //     "clockwise" : true, //环形自动执行进度的方向，默认是true，即顺时针方向，false为逆时针方向
            //     "startingSlice" : 360, //环形进度开始的起始位置，当totalCounter为360的时候，0: 0点钟位置起点，90:3点钟位置起点 180:6点钟位置起点
            //     "pointShow" : true, //环形进度中的进度球是否需要显示，默认不显示
            //     "pointRadius" : 3, //默认是环形进度宽度的一半
            //     "pointColor" :  "#FFFFFF", //环形进度中的进度球颜色
            //     "pointImageBase64" :  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAERklEQVRYR82Yf2jUdRjHX5875137cbcfOF1Omfij1DDC3BKEWeCPUMERy2pgkQvBQUY5EfrB6AfIlrVFG4gYJWmaxASV/AHlQKptRTRSywyHu5oudttOt+623T3x3Pe8rbntbiTdvv99P5/n83ne3/fn/Tyf5/ka4nkqxObKJd3RS1Y/FCI8JpBnDLOATASvQJuBVoSvptpoCKTQ6fPQTYUJxXJhYhlkV8t0PxRjWIeQH3Ya6zF0As0IJ51wtOMlc2O8JWOD2CtJbj9FCK8KLACcsXyPMu83cBnDOz1O6tlqBkbbY1QQGXvFHQpQJiHeABy6cKodpiXD/AxYPxcezIbcVEh3QrcfPLfgpw448Tv81gV/9UF/MOoyYGy8aXNQ27XV9IwEcgcI13syDzsVwDMI4fn7MmHT/ZbzBZlYg2M8Alz2WmCO/AK/eiOGBp06RJAK38vmyvDl/9pPGQj6qUV4CrAbA88uhp0FMD0ZptjiP5DBENzog8pG+OQCiEKAIIbDdidlwxkZAqEaCFAuwtvKQHISlD0EryyDe6ZYznsH4JoPzrbC6Va42gNdfshwwhw3rMmDVXkw2wUpSdaavwdhTzPU/gh9qgiDGMNrPQ6qbmskCsJdI0+KcEA1oAzsWDYEICjw/XU4cAGOX4GewNiMuB2wYR5sXgwPz1A6h4C82xxlJGAMm3u2m891pzAIDcMAnBFYou/PPQC7C4cY+PIqlJ8Dz83oJuOei35EbhpUrYTH5wwxsqsBPv7ZejfQ4oDVGr4GTUSZbCNElYahirC+CGamgjJwphVKTkAwZsq5E5fdBgfXw+o8i5E/bkLRsahY/dgo93mpM2kfSpYJ8inCWg3DXQWwfaklwsZ22HIK2nzxC3Kk5SwX7F8LBTkwEIIPfoDdjZHwNZwiSImZViPzA8J3mglnpkH9RiskVYQ7G+DgxfiOYCyYejQli6Cy0BKrhqyyoawAXofhEeOukVIR9unIytlwrMgSyqVOWHN0fBHGy4+K9XQxLMwinCw21sO5axFtCC8Yd7UcEnhah/Y8CqVhaVq0vX4+Xjex7d5aAS8utez2tcCOr6MC/cy4quUbYLkOnd0E+TOsyXVfwHlP7M3jtViRCyefsKybrsOqI9GV3+pxtImQq0OXtsC9qdbkoo+i5xavn3HtVG8Xn7dM/rwFC/dHmDB4FESvCMk61F4GyZHsmFMXyXB3BQJoBm7fZm3WNwg5tVEQfaqJNiGBTIBnkmhiMkSH+30pFZPgPJHQjGnodMDyyXF3hG/RdDR4/v9bFMp93dRNknoikowSXlmFcUyGGlNxjFlt50N2CiRNoNrWAqajFyqbJlJtR44l4X3H7bsqVge2YS4siXRgWu5r2a8dWEsHHL8bHVj00kx0Lzr89g535TaKkQl05eDF0PTfu/LhSDShuUh32MnqD1GIGfF/ArwiI/5PBOn0+eL7P/EPYtpkF4ik2AkAAAAASUVORK5CYII=", //环形进度中的进度球的图片base64
            // },
            wrapHeight: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750,
            progress:1,
            progress_radius: 280,
            tag_next: '',
            btnText: "暂停",
            btnSrc: "assets/img/footer/icon_pause@2x.png",
            cancleBtnText: '关闭',
            cancleIcon: 'assets/img/footer/icon_cancle@2x.png',
            progressShow: true, //是否显示圆圈
            finishStatus: false, //完成状态
            preheatFinishTig: false, //预热完成指引

            cmdObj:{}, //指令解析对象
          
            timeShow: false, //是否显示时间
            workSpecialStatusText: '',  //显示当前状态
            queryTimer: null,  
            countDownTimer: null,
            isTimerStop: false,  //是否暂停
            statusTag: "剩余时间", 
            hasSetting: false, //是否有时间温度设置
            hasHour: false, //是否有小时
            hasStopOrContinueBtn: false,

            warningDialogShow: false,
            warningDialogTitle: "温馨提示",
            warningDialogContent: "主人，您的水箱缺水了，要及时添加水哦",

            showBar:false,
            actionsheetItems:['确定关闭']
        };
    },
    methods: {
        queryRunTimer(timeSet){
            var self = this;
            this.queryTimer = setInterval(function(){
                self.queryStatus();                
            },timeSet*1000);
        },
        //  countDownRunTimer(timeSet){
        //     var self = this;
        //      this.countDownTimer = setInterval(function(){
        //         self.queryStatus();
        //     },timeSet*1000);
        // },
        countDownRunTimer(minute,second,timeSet){
            var self = this;
            var allSeconds = minute*60+second;
            this.countDownTimer = setInterval(function(){
                // nativeService.toast(allSeconds,4);
                if(allSeconds<60 && allSeconds>0){
                     self.tag_next = '秒';
                     self.workSpecialStatusText = allSeconds;
                }else{
                     self.tag_next = '分';
                     self.workSpecialStatusText = minute;
                }
                if(self.isTimerStop ){
                     return;
                }
                if(self.isTimerStop && allSeconds<=0){
                     self.tag_next = '';
                     self.timeShow = false;
                     self.progressShow = false;
                     self.workSpecialStatusText = '';
                     clearInterval(this.countDownTimer);
                     return;
                }
                allSeconds--;
            },timeSet*1000);
        },
        analysisFun(analysisObj) {
            
            var self = this , timer = null;
            clearInterval(this.countDownTimer);
            if (analysisObj.workingState.value == 2) {
                numberRecord++;
                if(numberRecord==1){ //防止多次获取设备状态，多次跳转
                    this.goTo("weex");
                }
            }
            //nativeService.toast(analysisObj,5);
            //console.log(1);
            this.hasHour = false;
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
            this.cancleIcon = 'assets/img/footer/icon_cancle@2x.png';

            this.cmdObj = analysisObj;
            
             //特殊处理，其他型号要去掉
             if(analysisObj.temperature.upLowTemperature<100 && analysisObj.mode.value == 0x41){
                this.cmdObj.mode.value = 0xD0;
                this.cmdObj.mode.text = "保温";
            }
             if((analysisObj.temperature.upLowTemperature == 35) && (analysisObj.mode.value == 0x43)){
                this.cmdObj.mode.value = 0xB0;
                this.cmdObj.mode.text = "发酵";
            }
            if(analysisObj.mode.value == 0x40){//这款型号，烧烤模式要特殊处理，温度是显示档位的
                // this.cmdObj.mode.text = "烧烤 ";
                this.cmdObj.temperature.upLowTemperature = 0;
            }

            //提示
            if(analysisObj.displaySign.isError){
                this.warningDialogShow = true;
                this.warningDialogContent = "主人，您的设备发生故障了，请联系售后人员";
            }
             if(analysisObj.displaySign.lackWater){
                this.warningDialogShow = true;
                this.warningDialogContent = "主人，您的设备水箱缺水了，要及时添加水哦";
            }
            if(analysisObj.displaySign.waterBox){
                this.warningDialogShow = true;
                this.warningDialogContent = "主人，您的设备缺水盒了";
            }
            if(analysisObj.displaySign.doorSwitch){
                this.warningDialogShow = true;
                this.warningDialogContent = "主人，您的设备炉门开了";
            }


            if(analysisObj.workingState.value == 3){
                this.timeShow = true;
                this.btnText = "暂停";
                this.btnSrc = "assets/img/footer/icon_pause@2x.png";
                this.hasStopOrContinueBtn = true;
                 this.hasSetting = true;
                // if(analysisObj.mode.value == 0xE0){//云菜谱没有设置时间温度蒸汽那些
                //      this.hasSetting = false;
                // }
            }
             if(analysisObj.workingState.value == 6){
                this.timeShow = true;
                this.hasSetting = true;
                this.btnText = "继续";
                this.btnSrc = "assets/img/footer/icon_start@2x.png";
                this.isTimerStop = true;
                this.statusTag = '暂停中';
                this.hasStopOrContinueBtn = true;
                // if(analysisObj.mode.value == 0xE0){//云菜谱没有设置时间温度蒸汽那些
                //      this.hasSetting = false;
                // }
            }
            if(analysisObj.mode.value == 0xC1 || analysisObj.mode.value == 0xC6 || analysisObj.mode.value == 0x40){//清洁模式没有设置时间温度蒸汽那些
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
               this.cancleBtnText = '完成';
               this.cancleIcon = 'assets/img/finish_icon@2x.png';
              
            }
             if(analysisObj.displaySign.preheat == 1 && analysisObj.displaySign.preheatTemperature == 0){
                this.timeShow = false;
                this.hasHour = false;
                this.workSpecialStatusText = "预热中";
                this.cmdObj.mode.text = analysisObj.mode.text+"预热到";
                this.tag_next = '';
                this.statusTag = '';
                this.hasSetting = false;
                this.hasStopOrContinueBtn = true;
                
            }
            if(analysisObj.displaySign.preheat == 1 && analysisObj.displaySign.preheatTemperature == 1){
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
                this.btnSrc = "assets/img/footer/icon_start@2x.png";
               
            }
                  //倒计时按照设计来
            var _hour = analysisObj.timeRemaining.hour, _minute = analysisObj.timeRemaining.minute, _second = analysisObj.timeRemaining.second;
            var allSeconds = _hour*60*60+_minute*60+_second;
            var progress_step = (10*60-allSeconds)/(10*60)*360; //360度倒计时为例
            //this.chartJson.progressCounter = progress_step;

            if(this.timeShow){
                if(allSeconds>60*60){ //大于1小时，有‘时’显示
                    this.workSpecialStatusText = _hour+"  "+(_minute>9?_minute:'0'+_minute);
                    this.tag_next = '分';
                    this.hasHour = true;
                }else if(allSeconds>2*60){//大于2分钟，小于1小时，只显示分
                    this.workSpecialStatusText = _minute;
                    this.tag_next = '分';
                    this.hasHour = false;
                }else{ //小于2分钟开始倒计时
                    this.hasHour = false;
                    timerRecord++;
                    if(timerRecord){
                            this.countDownRunTimer(_minute,_second,1);
                            //this.countDownRunTimer(1);//1秒03轮询
                    }
                }
            }

        },
    }
};

export default workingModalMixin;