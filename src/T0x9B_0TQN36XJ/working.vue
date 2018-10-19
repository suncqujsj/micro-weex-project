<template>
    <div class="all_section" :style="{height: wrapHeight}"  @viewappear="viewappear" @viewdisappear="viewdisappear">
        <midea-header class="bg"  leftImg="assets/img/header/icon_back_white@3x.png" title="烤箱" titleText="white" bgColor="" :isImmersion="true"  :showLeftImg="true" @leftImgClick="goBack" ></midea-header>
        <div class="progress_section" :style="progress_style">
            <wxcProgress :percent="progress"
                    :wxc_radius='progress_radius'>
               
            </wxcProgress>
              <div class="time_section" :style="{ height: `${progress_radius*2}px`}">
                <text class="number_prev" v-if="hasSplit">时</text>
                <div class="cen">
                    <!--<text class="number-text">{{progress}} {{timeRemain}}</text>-->
                    <text class="number-text">{{timeRemainHour}}{{hasSplit?':':''}}{{timeRemainMinute}}</text>
                    <text class="work_finish" v-if="workFinishStatus">工作完成</text>
                </div>
                <text class="number_next">{{tag_next}}</text>
            </div>
        
        </div>

       
        <div class="detail_section">
            <text class="detail_text">{{modeText}}{{modeTemperature}}°</text>
        </div>
        <div class="footer_section">
            <div class="btn_section" @click="cancle">
                <div class="image_section" >
                    <image class="icon_image" src="assets/img/footer/icon_cancle@2x.png"></image>
                </div>
                 <div class="decs_section">
                    <text class="decs_text">关闭</text>
                </div>
            </div>
             <div class="btn_section"  @click="startOrPause">
                <div class="image_section">
                    <image class="icon_image" :src="btnSrc"></image>
                </div>
                 <div class="decs_section" >
                    <text class="decs_text">{{btnText}}</text>
                </div>
            </div>
        </div>
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
    .progress_section{
        .pos(r);
    }
    .time_section{
        .pos(a);
        width: 750px;
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
    .number-text{
        .f(160px);
        .white;
    }
    .work_finish{
        .f(60px);
        .white;
    }
    .number_prev{
        .pos(a);
        top: 100px;
        left: 230px;
        .white;
        .f(32px);
    }
    .number_next{
        .pos(a);
        top: 100px;
        right: 230px;
        .white;
        .f(32px);
    }
    .detail_section{
        .flex;
        .row;
        .j-c;
    }
    .detail_text{
        .white;
        .f(36px);
        margin-top: 60px;
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
</style>

<script>
    const storage = weex.requireModule('storage')
    import MideaHeader from '@/midea-component/header.vue'
    // import mideaItem from '@/midea-component/item.vue'
    import nativeService from "../common/services/nativeService";
    import cmdFun from "./util.js"; //解析指令
    import query from "../dummy/query";
    import {wxcProgress, wxProgress} from "@/component/sf/wx-progress";
    const globalEvent = weex.requireModule("globalEvent");

    var numberRecord = 0; //记录跳页面的次数
    var timerRecord = 0;
    export default {
        data(){
            return {
                wrapHeight: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750,
                test:'123',
                progress:1,
                progress_radius: 250,
                tag_next: '分',
                btnText: "暂停",
                btnSrc: "assets/img/footer/icon_pause@2x.png",
                modeText: '',
                modeTemperature: null,
                timeRemainHour: null,
                timeRemainMinute: null,
                timeRemainSecond: null,
                hasSplit: false,
                workFinishStatus: false,
                queryTimer: null,
                countDownTimer: null,
                isTimerStop: false,
            }
        },
        components: {MideaHeader,wxcProgress,wxProgress},
        created(){
            var self = this;
           // 模拟设备数据
            nativeService.initMockData({
                query: query
            });
            this.queryStatus();
            this.queryRunTimer(20);//20秒轮询 
            // debugger;
             this.doing();

        },
        computed: {
            progress_style(){
                let {wrapHeight,progress_radius} = this;
                return{
                    marginTop: `${wrapHeight/2-progress_radius*2}px`
                }
            }
        },
        mounted() {
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
             countDownRunTimer(timeSet){
                var self = this;
                 this.countDownTimer = setInterval(function(){
                    self.queryStatus();
                },timeSet*1000);
            },
            // countDownRunTimer(minute,second,timeSet){
            //     var self = this;
            //     var allSeconds = minute*60+second;
            //     this.countDownTimer = setInterval(function(){
            //         if(self.isTimerStop){
            //             return;
            //         }
            //         allSeconds--;
            //         if(allSeconds<60){
            //              self.tag_next = '秒';
            //              self.timeRemainMinute = allSeconds;
            //         }
            //     },timeSet*1000);
            // },
            analysisFun(analysisObj) {
                var self = this , timer = null;
                clearInterval(this.countDownTimer);
                if (analysisObj.workingState.value == 2) {
                    numberRecord++;
                    if(numberRecord==1){ //防止多次获取设备状态，多次跳转
                        this.goTo("weex");
                    }
                }
                //nativeService.alert(analysisObj);
                console.log(1);
                this.tag_next = '分';
                this.isTimerStop = false;
                this.modeText = analysisObj.mode.text;
                this.modeTemperature = analysisObj.temperature.upLowTemperature;
                //倒计时按照设计来
                this.timeRemainHour = analysisObj.timeRemaining.hour>9?analysisObj.timeRemaining.hour:'0'+analysisObj.timeRemaining.hour;
                this.timeRemainMinute = analysisObj.timeRemaining.minute;
                if(analysisObj.timeRemaining.hour>0){
                    this.timeRemainMinute = analysisObj.timeRemaining.minute>9?analysisObj.timeRemaining.minute:'0'+analysisObj.timeRemaining.minute;
                }
                this.timeRemainSecond = analysisObj.timeRemaining.second;
                this.hasSplit = true;
                if(parseInt(self.timeRemainHour) == 0){
                    this.timeRemainHour = '';
                    this.hasSplit = false;
                }
                if(analysisObj.workingState.value == 3){
                    this.btnText = "暂停";
                    this.btnSrc = "assets/img/footer/icon_pause@2x.png";
                }
                 if(analysisObj.workingState.value == 6){
                    this.btnText = "继续";
                    this.btnSrc = "assets/img/footer/icon_start@2x.png";
                    this.isTimerStop = true;
                }

                if(analysisObj.timeRemaining.hour == 0 && analysisObj.timeRemaining.minute == 0 && analysisObj.timeRemaining.second > 0){
                    this.tag_next = '秒';
                    this.timeRemainMinute = analysisObj.timeRemaining.second;
                }
                if(analysisObj.workingState.value == 4){
                   this.workFinishStatus = true;
                   this.isTimerStop = true;
                   this.tag_next = '';
                   this.timeRemainMinute = '';
                  
                }
                if(analysisObj.timeRemaining.hour == 0 && analysisObj.timeRemaining.minute <= 2){
                    timerRecord++;
                   if(timerRecord){
                        //this.countDownRunTimer(analysisObj.timeRemaining.minute,analysisObj.timeRemaining.second,1);
                        this.countDownRunTimer(1);//1秒03轮询
                   }
                    
                }
               
                // nativeService.alert(self.timeRemain);
            },
            listenerFun(){
                var self = this;        
                globalEvent.addEventListener("receiveMessage", function(e) {
                    var str = e.data;
                    //nativeService.alert(str);
                    var arr = str.split(",");
                    var analysisObj = cmdFun.analysisCmd(arr); //解析04上行指令
                    self.analysisFun(analysisObj);
                });
            },
            viewdisappear(){
                globalEvent.removeEventListener("receiveMessage");
                clearInterval(this.queryTimer);
                clearInterval(this.countDownTimer);
            },
            viewappear(){
                this.listenerFun();
            },
            goBack(){
                 nativeService.backToNative()
            },
            goTo(url){
                let path = url + '.js'
                nativeService.goTo(path)
            },
            doing: function(){
                if(this.progress === 100) {
                    return;
                }
                ++this.progress;
                // this.progress += '1';
                let context = this;
                const platform = weex.config.env.platform;//weex没有window对象，调试需要区分下
                if (platform == 'Web') {
                     window.setTimeout(function () {
                        context.doing();
                    }, 1000);
                }else{
                    setTimeout(function () {
                        context.doing();
                    }, 1000);
                }
               
            },
            queryStatus() {
                var self = this;
                var sendCmd = cmdFun.createQueryMessage();
                nativeService.startCmdProcess(
                    "query",
                    sendCmd,
                    function (result) {
                       //nativeService.hideLoading();
                        var result_arr = result.replace(/\[|]/g, ""); //去掉中括号
                        var arr = result_arr.split(",");
                        var analysisObj = cmdFun.analysisCmd(arr);
                        self.analysisFun(analysisObj);
                    },
                    function (result) {
                        //nativeService.hideLoading();
                        //nativeService.toast(result);
                        // nativeService.toast("查询失败" + JSON.stringify(result));
                    }
                );
            },
            cancle(){
                var self = this;
                var deviceCmd = cmdFun.cmdCancelWork();
                nativeService.startCmdProcess(
                    "control",
                    deviceCmd,
                    function(result){
                       var result_arr = result.replace(/\[|]/g, ""); //去掉中括号
                        var arr = result_arr.split(",");
                        var analysisObj = cmdFun.analysisCmd(arr);
                        self.analysisFun(analysisObj);
                    },
                    function(result){
                        console.log('fail', result);
                    }
                )
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
                nativeService.alert(deviceCmd);
                nativeService.startCmdProcess(
                    "control",
                    deviceCmd,
                    function(result){
                        self.queryStatus();
                    },
                    function(result){
                        console.log('fail', result);
                    }
                )
            },
        }
    }
</script>


