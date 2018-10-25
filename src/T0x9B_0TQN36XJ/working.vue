<template>
    <div class="all_section" :style="{height: wrapHeight}"  @viewappear="viewappear" @viewdisappear="viewdisappear">
        <midea-header leftImg="assets/img/header/public_ic_back_white@3x.png" title="烤箱" titleText="white" bgColor="" :isImmersion="true"  :showLeftImg="true" @leftImgClick="goBack" ></midea-header>
        <div class="progress_content">
            <div class="progress_section" :style="progress_style">
                <wxcProgress :percent="progress" :progressShow="progressShow"
                        :wxc_radius='progress_radius'>

                </wxcProgress>
                <div class="time_section" :style="{ height: `${progress_radius*2}px`,width:`${progress_radius*2}px`}">
                    <text class="number_prev" v-if="hasHour">时</text>
                    <div class="cen">
                        <!--<text class="number-text">{{progress}} {{timeRemain}}</text>-->
                        <text :class="['number-text',noTimeShow && 'work_finish']">{{workSpecialStatusText}}</text>
                    </div>
                    <text class="number_next">{{tag_next}}</text>
                </div>
                <div class="cen status_tag_section" :style="{width:`${progress_radius*2}px`}">
                        <text class="status_tag">{{statusTag}}</text>
                    </div>
            
            </div>
        </div>

       
        <div class="detail_section" v-if="!finishStatus">
            <text class="detail_text">{{cmdObj.mode.text}}{{cmdObj.temperature.upLowTemperature>0?cmdObj.temperature.upLowTemperature+'°':''}}</text>
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
        height: 36px;
    }
    .setting_icon{
        .row;
        .j-c;
        width: 32px;
        height: 18px;
        margin-top: 30px;
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
    import mideaSwitch2 from '@/midea-component/switch2.vue'

        // config data
    import modes from "./config/modes.js";
    import autoMenu from "./config/auto-menu.js";

    import accordionMixin from  "./utils/mixins/accordions"
    import deviceMessageMixin from  "./utils/mixins/deviceMessage"

    var numberRecord = 0; //记录跳页面的次数
    var timerRecord = 0;
    const platform = weex.config.env.platform;//weex没有window对象，调试需要区分下
    export default {
        mixins: [deviceMessageMixin, accordionMixin],
        data(){
            return {
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
              
                noTimeShow: false,
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

            // debugger;
             //this.doing();

        },
        computed: {
            progress_style(){
                let {wrapHeight,progress_radius} = this;
                return{
                    height: `${progress_radius * 2}px`,
                    width: `${progress_radius * 2}px`,
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
                    //nativeService.toast(self.workSpecialStatusText,4);
                    if(self.isTimerStop && allSeconds<60 && allSeconds>0){
                         self.tag_next = '秒';
                         self.workSpecialStatusText = allSeconds;
                         return;
                    }
                     if(self.isTimerStop && allSeconds<=0){
                         self.tag_next = '';
                         clearInterval(this.countDownTimer);
                         return;
                    }
                     allSeconds--;
                     if(allSeconds<60 && allSeconds>0){
                         self.tag_next = '秒';
                         self.workSpecialStatusText = allSeconds;
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
                //console.log(1);
                this.warningDialogShow = false;
                // this.tag_next = '分';
                this.noTimeShow = false;
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
               

                //特殊处理，其他型号要去掉
                if(analysisObj.temperature.upLowTemperature<100 && analysisObj.mode.value == 0x41){
                    this.cmdObj.mode.value = 0xD0;
                    this.cmdObj.mode.text = "保温";
                }
                 if(analysisObj.temperature.upLowTemperatur<100 && analysisObj.mode.value == 0x43){
                    this.cmdObj.mode.value = 0xB0;
                    this.cmdObj.mode.text = "发酵";
                }
                
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

              
                if(analysisObj.workingState.value == 3){
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

                if(analysisObj.workingState.value == 4){
                   this.noTimeShow = true;
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
                    this.noTimeShow = true;
                    this.workSpecialStatusText = "预热中";
                    this.tag_next = '';
                    this.statusTag = '';
                    this.hasSetting = false;
                    this.hasStopOrContinueBtn = true;
                    
                }
                if(analysisObj.displaySign.preheat == 1 && analysisObj.displaySign.preheatTemperature == 1){
                     this.noTimeShow = true;
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

                if(!this.noTimeShow){
                    if(allSeconds>60*60){ //大于1小时，有‘时’显示
                        this.workSpecialStatusText = (_hour>9?_hour:'0'+_hour)+":"+(_minute>9?_minute:'0'+_minute);
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


