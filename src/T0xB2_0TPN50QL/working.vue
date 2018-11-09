<template>
    <div class="all_section" :style="{height: wrapHeight}"  @viewappear="viewappear" @viewdisappear="viewdisappear">
        <midea-header leftImg="assets/img/header/public_ic_back@3x.png" title="蒸汽炉" titleText="white" bgColor="" :isImmersion="true"  :showLeftImg="true" @leftImgClick="goBack"></midea-header>
        <div class="progress_content"  @longpress="onlongpressQuery"><!--隐藏长按组件触发03查询，方便调试-->
            <div class="progress_section" :style="progress_style" > 
                <wxcProgress :percent="progress" :progressShow="progressShow"
                    :wxc_radius='progress_radius'>

                </wxcProgress>
                <!--<midea-progresscycle-view class="circleprogress" :data="chartJson"></midea-progresscycle-view>-->
                <div class="time_section" :style="{ height: `${progress_radius*2}px`,width:`${progress_radius*2}px`}">
                    <text class="number_prev" v-if="hasHour">时</text>
                    <div class="cen">
                        <!--<text class="number-text">{{progress}} {{timeRemain}}</text>-->
                        <text :class="['number-text',timeShow && 'work_time']">{{workSpecialStatusText}}</text>
                    </div>
                    <text class="number_next">{{tag_next}}</text>
                </div>
                <div class="cen status_tag_section" :style="{width:`${progress_radius*2}px`}">
                    <text class="status_tag">{{statusTag}}</text>
                </div>
                <!--<div class="animate_section" ref="modeBox">
                    <image class="animate_circle" src="assets/img/oval_2@2x.png"></image>
                </div>-->
            </div>
        </div>

       
        <div class="detail_section" v-if="!finishStatus">
            <text class="detail_text">{{cmdObj.mode.text}} {{cmdObj.temperature.upLowTemperature>0?cmdObj.temperature.upLowTemperature+'°':''}}</text>
        </div>
        <div class="detail_section" v-if="hasSetting">
            <div class="edit_section" @click="setting">
                <image class="setting_icon" src="assets/img/edit_icon@2x.png" ></image>
            </div>
        </div>
        <div class="footer_section">
            <div class="btn_section">
                <div class="image_section" @click="cancle">
                    <image class="icon_image" :src="cancleIcon"></image>
                </div>
                 <div class="decs_section">
                    <text class="decs_text">{{cancleBtnText}}</text>
                </div>
            </div>
             <div class="btn_section" v-if="hasStopOrContinueBtn" >
                <div class="image_section" @click="startOrPause">
                    <image class="icon_image" :src="btnSrc"></image>
                </div>
                 <div class="decs_section" >
                    <text class="decs_text">{{btnText}}</text>
                </div>
            </div>
        </div>

        <!--模式参数设置弹窗-->
        <sf-dialog :show="show" :working="true" @close="closeDialog" @mideaDialogCancelBtnClicked="closeDialog" @mideaDialogConfirmBtnClicked="closeDialog">
            <div slot="content">
                <text class="content-title">加热模式</text>
                <template v-for="(item, index) in accordions">
                    <template v-if="item.type==='picker'">
                        <sf-accordion v-if="currentItem && currentItem[item.key].set" :value="setValue(item.key)" :unit="item.unit" :index="index" :title="item.subtitle" :isFolded="item.isFolded"  @callback="updateAccordionFoldingStatus">
                            <div slot="content">
                                <wx-picker :data="range(item.key)" :target="item.key" :visible="true" @wxChange="handlePickerChange"></wx-picker>
                                <!--<wx-picker  :list="range(item.key).list" :defaultValue="range(item.key).defaultValue" :target="item.key" :visible="true" @wxChange="handlePickerChange"></wx-picker>-->
                            </div>
                        </sf-accordion>
                    </template>
                    <template v-if="item.type==='switch'">
                        <sf-accordion v-if="currentItem && currentItem[item.key].set" :title="item.subtitle" index="-1" :hideArrow="item.hideArrow">
                            <div slot="right">
                                <midea-switch2 :checked="current[item.key]" @change="onPreheatChange" width="70" height="38" slot="value"></midea-switch2>
                            </div>
                        </sf-accordion>
                    </template>
                </template>
            </div>
        </sf-dialog>

        <!--故障提示弹窗-->
        <midea-dialog :title="warningDialogTitle"
                        :show="warningDialogShow"
                        :single="true"
                        @mideaDialogConfirmBtnClicked="knowClicked"
                        :content="warningDialogContent"
                        mainBtnColor="#FFB632"
                        >
        </midea-dialog>

        <!--确定/取消弹窗-->
        <midea-actionsheet
            :items="actionsheetItems"
            :show="showBar"
            @close="closeActionsheet"
            @itemClick="actionsheetItemClick"
            @btnClick="actionsheetBtnClick"
            ref="actionsheet"
            button="我再想想"
        ></midea-actionsheet>
    </div>
</template>

<style lang="less" type="text/less">
@import "../common/less/common";
    .root{
        height: 100%;
    }
    .all_section{
        background-color: #FFCF23;
        width: 750px;
    }
    .bg {
        background-image: linear-gradient(to bottom, #FFCD00, #FF9217);
    }
    .progress_content{
        .row;
        .j-c;
    }
    .progress_section{
        .pos(r);
    }
    .circleprogress {
        width: 500px;
        height: 500px;
        }
    .time_section{
        .pos(a);
        top: 0px;
        left: 0px;
         .flex;
        .row;
        .j-c;
        .a-c;
    }
    .cen{
        .flex;
        .row;
        .j-c;
        .a-c;
    }
    .status_tag_section{
        .pos(a);
         bottom: 80px;

        .row;
        .j-c;
    }
    .number-text{
        .f(60px);
        .white;
    }
    .work_time{
        .f(160px);
        .white;
    }
    .status_tag{
        .f(32px);
        .white;
    }
    .number_prev{
        .pos(a);
        left: 100px;
        top: 100px;
        .white;
        .f(32px);
    }
    .number_next{
        .pos(a);
         right: 100px;
        top: 100px;
        .white;
        .f(32px);
    }
    .detail_section{
        .row;
        .j-c;
    }
    .detail_text{
        .white;
        .f(36px);
        margin-top: 40px;
    }
    .edit_section{
        width: 32px;
        height: 50px;
        margin-top: 30px;
    }
    .setting_icon{
        .row;
        .j-c;
        width: 32px;
        height: 18px;
    }
    .footer_section{
        .row;
        .pos(a);
        bottom: 0px;
        left: 0px;
        width: 750px;
        height: 400px;
    }
    .btn_section{
        .flex;
        .j-c;
        .a-c;
    }
    .icon_image{
        width: 108px;
        height: 108px;
    }
    .decs_section{
        margin-top: 24px;
    }
    .decs_text{
       .white; 
    }
    .animate_section{
        .pos(a);
        top: 0px;
        right: 250px;
    }
    .animate_circle{
        width: 18px;
        height: 18px;
    }
</style>

<script>
    const storage = weex.requireModule('storage')
    import MideaHeader from '@/midea-component/header.vue'
    // import mideaItem from '@/midea-component/item.vue'
    import nativeService from "../common/services/nativeService";
    import cmdFun from "./utils/util.js"; //解析指令
    import query from "../dummy/query";
    import {wxcProgress, wxProgress} from "@/component/sf/wx-progress";
    import sfAccordion from '@/component/sf/custom/accordion.vue'
    import sfDialog from '@/component/sf/custom/dialog.vue'
    import WxPicker from '@/component/sf/custom/picker.vue';
    import mideaDialog from '@/component/dialog.vue';
    import mideaActionsheet from '@/midea-component/actionsheet.vue'
    import mideaSwitch2 from '@/midea-component/switch2.vue'

        // config data
    import modes from "./config/modes.js";
    import autoMenu from "./config/auto-menu.js";

    import accordionMixin from  "./utils/mixins/accordions"
    import deviceMessageMixin from  "./utils/mixins/deviceMessage"

    var numberRecord = 0; //记录跳页面的次数
    var timerRecord = 0;
    const platform = weex.config.env.platform;//weex没有window对象，调试需要区分下
    const globalEvent = weex.requireModule("globalEvent");
    export default {
        mixins: [deviceMessageMixin, accordionMixin],
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
                progress_radius: 250,
                tag_next: '',
                btnText: "暂停",
                btnSrc: "assets/img/footer/icon_pause@2x.png",
                cancleBtnText: '关闭',
                cancleIcon: 'assets/img/footer/icon_cancle@2x.png',
                progressShow: true,
                finishStatus: false,

                cmdObj:{},
              
                timeShow: false,
                workSpecialStatusText: '',
                queryTimer: null,
                countDownTimer: null,
                isTimerStop: false,
                statusTag: "剩余时间",
                hasSetting: false, //是否有时间温度设置
                hasHour: false, //是否有小时
                hasStopOrContinueBtn: false,

                warningDialogShow: false,
                warningDialogTitle: "温馨提示",
                warningDialogContent: "主人，您的水箱缺水了，要及时添加水哦",

                showBar:false,
                actionsheetItems:['确定关闭']
            }
        },
        components: {MideaHeader,wxcProgress,wxProgress, mideaDialog, mideaActionsheet,sfDialog,WxPicker,sfAccordion,mideaSwitch2},
        created(){
            var self = this;
           // 模拟设备数据,正式上线，可不注销
            nativeService.initMockData({
                query: query
            });
            this.queryStatus();
            this.queryRunTimer(20);//20秒轮询 
            this.isIos = weex.config.env.platform == "iOS" ? true : false;
            if (this.isIos){
                this.listenerDeviceReiveMessage();
            }
            
            //安卓要加上这个方法，否则，工作页面，时间一直停留在一个状态，不会刷新
            if(!this.isIos){
                globalEvent.addEventListener("WXApplicationDidBecomeActiveEvent", (e) => {
                    //从后台转前台时触发
                    self.queryStatus();
                    self.queryRunTimer(20);//20秒轮询 
                });
            }
           

            // debugger;
             //this.doing();

        },
        computed: {
            progress_style(){
                let {wrapHeight,progress_radius} = this;
                return{
                    height: `${progress_radius * 2}px`,
                    width: `${progress_radius * 2}px`,
                    marginTop: `${wrapHeight/2-progress_radius*2 -60}px`
                }
            }
        },
        mounted() {
            //this.moveTest(0);
            //  nativeService.getDeviceInfo().then((resp)=>{
            //      nativeService.alert(resp);
            //  }).catch((error) => {
            //         nativeService.toast(error)
            //     })
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
                this.warningDialogShow = false;
                // this.tag_next = '分';
                this.progressShow = true;
                this.finishStatus = false;
                // this.workSpecialStatusText = "";
                this.hasSetting = false;
                this.isTimerStop = false;
                this.statusTag = '剩余时间';
                this.hasStopOrContinueBtn = false;
                this.cancleBtnText = '关闭';
                this.cancleIcon = 'assets/img/footer/icon_cancle@2x.png';

                this.cmdObj = analysisObj;
                
                
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
                    this.hasSetting = true;
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
                if(analysisObj.mode.value == 0xC1 || analysisObj.mode.value == 0xC6){//清洁模式没有设置时间温度蒸汽那些
                    this.hasSetting = false;
                }

                if(analysisObj.workingState.value == 4){
                   this.timeShow = false;
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
                    this.workSpecialStatusText = "预热中";
                    this.tag_next = '';
                    this.statusTag = '';
                    this.hasSetting = false;
                    this.hasStopOrContinueBtn = true;
                    
                }
                if(analysisObj.displaySign.preheat == 1 && analysisObj.displaySign.preheatTemperature == 1){
                     this.timeShow = false;
                    this.workSpecialStatusText = "预热完成";
                    this.warningDialogShow = true;
                    this.warningDialogContent = "预热已完成，请放进食物再按'继续'，继续烹饪";
                    this.tag_next = '';
                    this.statusTag = '';
                    this.hasStopOrContinueBtn = true;
                    this.hasSetting = false;
                    this.btnText = "继续";
                    this.btnSrc = "assets/img/footer/icon_start@2x.png";
                   
                }
                      //倒计时按照设计来
                var _hour = analysisObj.timeRemaining.hour, _minute = analysisObj.timeRemaining.minute, _second = analysisObj.timeRemaining.second;
                var allSeconds = _hour*60*60+_minute*60+_second;
                var progress_step = (10*60-allSeconds)/(10*60)*360; //360度倒计时为例
                //this.chartJson.progressCounter = progress_step;

                if(this.timeShow){
                    if(allSeconds>60*60){ //大于1小时，有‘时’显示
                        this.workSpecialStatusText = _hour+":"+(_minute>9?_minute:'0'+_minute);
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
            // doing: function(){
            //     if(this.progress === 100) {
            //         return;
            //     }
            //     ++this.progress;
            //     // this.progress += '1';
            //     let context = this;
            //     if (platform == 'Web') {
            //          window.setTimeout(function () {
            //             context.doing();
            //         }, 1000);
            //     }else{
            //         setTimeout(function () {
            //             context.doing();
            //         }, 1000);
            //     }

            // },
            cancle(){
                var self = this;
                if(this.finishStatus){
                    this.cancleWorking();
                }else{
                    this.openActionsheet();            
                }
            },
            startOrPause(){
                var self = this;
                var record = 3;
                if(this.btnText == "暂停"){
                    record = 6;
                }
                 if(this.btnText == "继续"){
                    record = 3;
                }
                
                var deviceCmd = cmdFun.cmdStartOrPause(record);
                nativeService.startCmdProcess(
                    "control",
                    deviceCmd,
                    function(result){
                        self.queryStatus();
                    },
                    function(result){
                         nativeService.toast('控制失败，请检查网络或者设置的参数');
                        //console.log('fail', result);
                    }
                )
            },
            setting(){
                var _isRecipe = false;
                if(this.cmdObj.mode.value == 0xE0){
                    _isRecipe = true;
                }
                var _item = this.getCurrentItem(_isRecipe);
                
                this.currentItem = _item;
                var time = this.cmdObj.timeRemaining.hour*60+this.cmdObj.timeRemaining.minute;
                if(this.tag_next == '秒'){//倒计时为秒时，都设置1分钟
                    time = 1;
                }
                this.current.time = time;
                this.current.temperature = this.cmdObj.temperature.upLowTemperature;
                this.currentItem.preheat.default = this.cmdObj.displaySign.preheat?true:false;
                this.current.fireAmount = this.cmdObj.fire.value;
                this.current.steamAmount = this.cmdObj.steam.value;
                //nativeService.toast(this.current,3);
                
                this.openDialog();
            },
            getCurrentItem(isRecipe){
                var  _item = {};
                
                if(isRecipe){
                    var  currentModes = autoMenu;
                     for(var i=0; i<currentModes.length; i++){
                         var iconButtonsArr = currentModes[i].iconButtons; 
                        for(var r=0; r<iconButtonsArr.length; r++){
                            var iconButtons = iconButtonsArr[r];
                             for(var m=0; m<iconButtons.length; m++){
                                if(this.cmdObj.recipeId.value == iconButtons[m].recipeId.default){
                                    _item = iconButtons[m];
                                    break;
                                }
                            }
                        }                      
                       
                    }
                }else{
                     var  currentModes = modes;
                     for(var i=0; i<currentModes.length; i++){
                        var iconButtons = currentModes[i].iconButtons;
                        for(var m=0; m<iconButtons.length; m++){
                           
                            if(this.cmdObj.mode.value == currentModes[i].iconButtons[m].mode){
                                _item = currentModes[i].iconButtons[m];
                                 break;
                            }
                        
                        }
                    }
                }
               
                return _item;
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
                
                if(event.index == 0){
                   this.cancleWorking();
                }
               
            },
            cancleWorking(){
                var self = this;
                var deviceCmd = cmdFun.cmdCancelWork();
                nativeService.startCmdProcess(
                    "control",
                    deviceCmd,
                    function(result){
                    var result_arr = result.replace(/\[|]/g, ""); //去掉中括号
                        var arr = result_arr.split(",");
                        var analysisObj = cmdFun.analysisCmd(arr);
                        this.showBar = false;
                        self.analysisFun(analysisObj);
                    },
                    function(result){
                        nativeService.toast('控制失败，请检查网络或者设置的参数');
                        //console.log('fail', result);
                    }
                )
            },
            //点击取消/确定按钮事件
            actionsheetBtnClick: function () {
                this.showBar = false;
            },
             moveTest(val) {
                var self = this;
                var testEl = this.$refs.modeBox;
                animation.transition(
                    testEl,
                    {
                    styles: {
                        // color: "#FF0000",
                        //transform: "translateY(" + val + "px)",
                        top: val+"px"
                    },
                    duration: 3000, //ms
                    timingFunction: "linear",
                    delay: 0 //ms
                    },
                    function() {
                    if (self.val <= 0) {
                        self.val = self.val + 60;
                    } else {
                        self.val = self.val - 80;
                    }

                    self.moveTest(self.val);
                    }
                );
                },
        }
    }
</script>


