<template>
    <div class="all_section" :style="{height: wrapHeight}"  @viewappear="viewappear" @viewdisappear="viewdisappear">
        <midea-header   leftImg="assets/img/header/icon_back_white@3x.png" title="烤箱" titleText="white" bgColor="" :isImmersion="true"  :showLeftImg="true" @leftImgClick="goBack" ></midea-header>
        <div class="progress_section" :style="progress_style">
            <wxcProgress :percent="progress"
                    :wxc_radius='progress_radius'>

            </wxcProgress>
              <div class="time_section" :style="{ height: `${progress_radius*2}px`}">
                <text class="number_prev" v-if="hasSplit">时</text>
                <div class="cen">
                    <!--<text class="number-text">{{progress}} {{timeRemain}}</text>-->
                    <text class="number-text">{{timeRemainHour}}{{hasSplit?':':''}}{{timeRemainMinute}}</text>
                    <text class="work_finish" v-if="workSpecialStatusText">{{workSpecialStatusText}}</text>
                </div>
                <text class="number_next">{{tag_next}}</text>
            </div>
               <div class="cen status_tag_section">
                    <text class="status_tag">{{statusTag}}</text>
                </div>
        
        </div>

       
        <div class="detail_section">
            <text class="detail_text">{{modeText}}{{modeTemperature}}°</text>
        </div>
        <div class="detail_section">
            <image class="setting_icon" src="assets/img/group_setting@3x.png" @click="setting"></image>
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
             <div class="btn_section" v-if="!workSpecialStatus"  @click="startOrPause">
                <div class="image_section">
                    <image class="icon_image" :src="btnSrc"></image>
                </div>
                 <div class="decs_section" >
                    <text class="decs_text">{{btnText}}</text>
                </div>
            </div>
        </div>

        <!--模式参数设置弹窗-->
        <sf-dialog :show="show" @close="closeDialog" @mideaDialogCancelBtnClicked="closeDialog" @mideaDialogConfirmBtnClicked="closeDialog">
            <div slot="content">
                <text class="content-title">加热模式</text>
                <template v-for="(item, index) in accordions">
                    <template v-if="item.type==='picker'">
                        <sf-accordion v-if="currentItem && currentItem[item.key].set" :value="setValue(item.key)" :unit="item.unit" :index="index" :title="item.subtitle" :isFolded="item.isFolded"  @callback="updateAccordionFoldingStatus">
                            <div slot="content">
                                <wx-picker :data="range(item.key)" :target="item.key" :visible="true" @wxChange="handlePickerChange"></wx-picker>
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
    .status_tag_section{
        .pos(r);
        top: -120px;
    }
    .number-text{
        .f(160px);
        .white;
    }
    .work_finish{
        .f(60px);
        .white;
    }
    .status_tag{
        .f(32px);
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
        .row;
        .j-c;
    }
    .detail_text{
        .white;
        .f(36px);
        margin-top: 30px;
    }
    .setting_icon{
        width: 48px;
        height: 48px;
        margin-top: 20px;
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
    import cmdFun from "./utils/util.js"; //解析指令
    import query from "../dummy/query";
    import {wxcProgress, wxProgress} from "@/component/sf/wx-progress";
    import sfAccordion from '@/component/sf/custom/accordion.vue'
    import sfDialog from '@/component/sf/custom/dialog.vue'
    import WxPicker from '@/component/sf/custom/picker.vue';
    import mideaDialog from '@/component/dialog.vue';
    import mideaActionsheet from '@/midea-component/actionsheet.vue'

        // config data
    import modes from "./config/modes.js";
    import autoMenu from "./config/auto-menu.js";

    import accordionMixin from  "./utils/mixins/accordions"
    import deviceMessageMixin from  "./utils/mixins/deviceMessage"

    var numberRecord = 0; //记录跳页面的次数
    var timerRecord = 0;
    export default {
        mixins: [deviceMessageMixin, accordionMixin],
        data(){
            return {
                wrapHeight: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750,
                test:'123',
                progress:1,
                progress_radius: 250,
                tag_next: '分',
                btnText: "暂停",
                btnSrc: "assets/img/footer/icon_pause@2x.png",
                mode: null,
                modeText: '',
                modeTemperature: null,
                timeRemainHour: null,
                timeRemainMinute: null,
                timeRemainSecond: null,
                hasSplit: false,
                workSpecialStatus: false,
                workSpecialStatusText: '',
                queryTimer: null,
                countDownTimer: null,
                isTimerStop: false,
                statusTag: "剩余时间",

                warningDialogShow: false,
                warningDialogTitle: "温馨提示",
                warningDialogContent: "主人，您的水箱缺水了，要及时添加水哦",

                showBar:false,
                actionsheetItems:['确定关闭']
            }
        },
        components: {MideaHeader,wxcProgress,wxProgress, mideaDialog, mideaActionsheet,sfDialog,WxPicker,sfAccordion},
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

            // debugger;
             //this.doing();

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
                    if(self.isTimerStop && allSeconds<60){
                         self.tag_next = '秒';
                         self.timeRemainMinute = allSeconds;
                        return;
                    }
                    allSeconds--;
                    if(allSeconds<60){
                         self.tag_next = '秒';
                         self.timeRemainMinute = allSeconds;
                    }
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
                // nativeService.toast(analysisObj,5);
                console.log(1);
                this.mode = analysisObj.mode.value;
                this.warningDialogShow = false;
                this.tag_next = '分';
                this.workSpecialStatus = false;
                this.workSpecialStatusText = "";
                this.isTimerStop = false;
                this.statusTag = '剩余时间';
                this.modeText = analysisObj.mode.text;
                this.modeTemperature = analysisObj.temperature.upLowTemperature;
                //提示
                if(analysisObj.displaySign.isError){
                    this.warningDialogShow = true;
                    this.warningDialogContent = "设备故障，请联系售后人员";
                }
                 if(analysisObj.displaySign.lackWater){
                    this.warningDialogShow = true;
                    this.warningDialogContent = "主人，您的水箱缺水了，要及时添加水哦";
                }
                if(analysisObj.displaySign.waterBox){
                    this.warningDialogShow = true;
                    this.warningDialogContent = "缺水盒";
                }
                if(analysisObj.displaySign.doorSwitch){
                    this.warningDialogShow = true;
                    this.warningDialogContent = "炉门开了";
                }

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
                    this.statusTag = '暂停中';
                }

                if(analysisObj.timeRemaining.hour == 0 && analysisObj.timeRemaining.minute == 0 && analysisObj.timeRemaining.second > 0){
                    this.tag_next = '秒';
                    this.timeRemainMinute = analysisObj.timeRemaining.second;
                }
                if(analysisObj.workingState.value == 4){
                   this.workSpecialStatus = true;
                   this.workSpecialStatusText = "工作完成";
                   this.isTimerStop = true;
                   this.tag_next = '';
                   this.timeRemainMinute = '';
                   this.statusTag = '';
                   return;
                  
                }
                 if(analysisObj.displaySign.preheat == 1 && analysisObj.displaySign.preheatTemperature == 0){
                    this.workSpecialStatus = false;
                    this.workSpecialStatusText = "预热中";
                    this.tag_next = '';
                    this.timeRemainMinute = '';
                    this.statusTag = '';
                    return;
                }
                if(analysisObj.displaySign.preheat == 1 && analysisObj.displaySign.preheatTemperature == 1){
                     this.workSpecialStatus = false;
                    this.workSpecialStatusText = "预热完成";
                    this.tag_next = '';
                    this.timeRemainMinute = '';
                    this.statusTag = '';
                    this.btnText = "继续";
                    this.btnSrc = "assets/img/footer/icon_start@2x.png";
                    return;
                }
                if(analysisObj.timeRemaining.hour == 0 && analysisObj.timeRemaining.minute <= 2){
                    timerRecord++;
                   if(timerRecord){
                        this.countDownRunTimer(analysisObj.timeRemaining.minute,analysisObj.timeRemaining.second,1);
                        //this.countDownRunTimer(1);//1秒03轮询
                   }
                    
                }
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
            cancle(){
                var self = this;
                this.openActionsheet();            
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
                        console.log('fail', result);
                    }
                )
            },
            setting(){
                var _item = {};
                for(var i=0; i<modes.length; i++){
                    var iconButtons = modes[i].iconButtons;
                    for(var m=0; m<iconButtons.length; m++){
                        if(this.mode == modes[i].iconButtons[m].mode){
                            _item = modes[i].iconButtons[m];
                        }
                    }
                }
                this.currentItem = _item;
                this.current.time = this.timeRemainMinute;
                this.openDialog();
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
                var self = this;
                if(event.index == 0){
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
                            console.log('fail', result);
                        }
                    )
                }
               
            },
            //点击取消/确定按钮事件
            actionsheetBtnClick: function () {
                this.showBar = false;
            }
        }
    }
</script>


