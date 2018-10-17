<template>
    <scroller class="bg" :style="{height: wrapHeight}"  @viewappear="viewappear" @viewdisappear="viewdisappear">
        <midea-header class="bg"  leftImg="assets/img/header/icon_back_white@3x.png" title="烤箱" titleText="white" bgColor="red" :isImmersion="true"  :showLeftImg="true" @headerClick="backClick" @leftImgClick="goBack" ></midea-header>
        <div class="panel">
            <text class="panel-state">待机中</text>
            <div class="tabs">
                <div class="tab">
                    <text class="tab-text">自动菜单</text>
                </div>
                <div class="tab">
                    <text class="tab-text cur">加热模式</text>
                </div>
            </div>
        </div>
        <div class="area" :style="{height: wrapHeight - 224*2}">
            <div class="icon-buttons" v-for="rows in modes">
                <div class="icon-button column" v-for="item in rows" @click="onModeButtonClicked(item.mode)">
                    <image class="button-icon" :src="item.icon"></image>
                    <text class="button-text">{{item.text}}</text>
                </div>
            </div>
        </div>
        <!--<text class="r test" @click="doing">{{progress}}</text>-->
        <!--<wxProgress :percent='progress' :bar_width='650'></wxProgress>-->
        <!--<wxcProgress :percent="progress"-->
                     <!--:wxc_radius='200'>-->
            <!--<div class="cen">-->
                <!--<text class="demo-text">{{progress}}%</text>-->
            <!--</div>-->
        <!--</wxcProgress>-->
        <!--<midea-dialog title="使用协议"-->
                      <!--:show="show"-->
                      <!--@close="closeDialog"-->
                      <!--@mideaDialogCancelBtnClicked="mideaDialogCancelBtnClicked"-->
                      <!--@mideaDialogConfirmBtnClicked="mideaDialogCancelBtnClicked"-->
                      <!--content="美的智慧生活解决方案"-->
                      <!--:single="false" >-->
        <!--</midea-dialog>-->
        <sf-dialog :show="show" @close="closeDialog" @mideaDialogCancelBtnClicked="closeDialog" @mideaDialogConfirmBtnClicked="closeDialog">
            <div slot="content">
                <text class="content-title">加热模式</text>
                <sf-accordion :index="0" title="设置时间" :isFolded="accordionArr[0]" @callback="updateAccordionArr">
                    <div slot="content">
                        <wx-picker :data="timeRange" :visible="true" @wxChange="handleTimeChange"></wx-picker>
                    </div>
                </sf-accordion>
                <sf-accordion :index="1" title="设置温度" :isFolded="accordionArr[1]" @callback="updateAccordionArr">
                    <div slot="content">
                        <wx-picker :data="temperatureRange" :visible="true" @wxChange="handleTemperatureChange"></wx-picker>
                    </div>
                </sf-accordion>
                <sf-accordion title="设置预热" :hideIcon="true">
                    <div slot="right">
                        <midea-switch2 :checked="preheat" @change="onPreheatChange" width="70" height="38" slot="value"></midea-switch2>
                    </div>
                </sf-accordion>
            </div>
        </sf-dialog>
        <text @click="show=true">111111</text>
    </scroller>
</template>

<style lang="less" type="text/less">
@import "../common/less/common";
    .root{
        height: 100%;
    }
    .bg {
        background-image: linear-gradient(to bottom, #FFCD00, #FFB632);
    }
    .panel-state{
        @h:30*2px;
        .f(@h);
        .white;
        .ta;
        .lh(60px);
        .ma-t(36*2px);
        .ma-b(60*2px);
    }
    .tabs{
        .row;
    }
    .tab{
        .flex;
        .row;
        justify-content: center;
        align-items: flex-end;
        height: 18*2px;
        .ma-b(16*2px);

    }
    .tab-text{
        .f(14*2px);
        color:rgba(255,255,255,.8);
    }
    .cur{
        .f(18*2px);
        .white;
    }
    .area{
        .bg-white;
    }
    .icon-buttons{
        .row;
        padding: 0 3.5*2px;
    }
    .icon-button{
        .ma-t(25*2px);
        .ma-b(14*2px);
        .a-c;
        width: 92*2px;
        height: 78*2px;
    }
    .button-icon{
        .square(112px);
        .ma-b(10*2px);
    }
    .button-text{
        .f(12*2px);
        .lh(12*2px);
    }
    .content-title {
        color: #333333;
        font-size: 36px;
        text-align: center;
        margin-bottom: 24px;
    }
</style>

<script>
    import MideaHeader from '@/midea-component/header.vue'
    import sfAccordion from '@/component/sf/custom/accordion.vue'
    import sfDialog from '@/component/sf/custom/dialog.vue'
    import nativeService from "../common/services/nativeService";
    import cmdFun from "./util.js"; //解析指令
    import query from "../dummy/query";
    import {wxcProgress, wxProgress} from "@/component/sf/wx-progress";
    import mideaSwitch2 from '@/midea-component/switch2.vue'
    import { WxPicker } from 'weex-droplet-ui';
    const globalEvent = weex.requireModule("globalEvent");

    // Array.prototype.range = function(start, end){
    //     let length = end - start + 1;
    //     let step = start - 1;
    //     return Array.apply(null, {length:length}).map(function(){
    //         step++;
    //         return step;
    //     });
    // };
    var settingArrData = function(start,end){
        var arr=[];
        if(start > end){
            return arr;
        }
        for(var i=0;i <= end-start;i++){
            var value = start+i;
            if(value < 0){
                continue;
            }
            // value = value > 9 ? value:"0"+value;
            arr[i]=value;
        }
        return arr;
    };

    export default {
        data(){
            return {
                wrapHeight: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750,
                test:'123',
                progress:1,
                autoMenu: [],
                modes: [
                    [
                        {
                            'icon': 'assets/img/modes/steam@3x.png',
                            'text': '蒸汽',
                            'mode': 0x20
                        },
                        {
                            'icon': 'assets/img/modes/steam_and_hot_wind@3x.png',
                            'text': '蒸汽+热风',
                            'mode': 0x31
                        },
                        {
                            'icon': 'assets/img/modes/broil@3x.png',
                            'text': '烧烤',
                            'mode': 0x40
                        },
                        {
                            'icon': 'assets/img/modes/hot_wind@3x.png',
                            'text': '热风对流',
                            'mode': 0x41
                        },
                    ],[
                        {
                            'icon': 'assets/img/modes/hot_wind_and_broil@3x.png',
                            'text': '热风烧烤',
                            'mode': 0x43
                        },
                        {
                            'icon': 'assets/img/modes/clean@3x.png',
                            'text': '清洁',
                            'mode': 0xC1
                        },
                        {
                            'icon': 'assets/img/modes/heat_preservation@3x.png',
                            'text': '保温',
                            'mode': 0xD0
                        },
                        {
                            'icon': 'assets/img/modes/fermentation@3x.png',
                            'text': '发酵',
                            'mode': 0xB0
                        }
                    ]
                ],
                currentMode: 0x20,
                currentTime: null,
                currentTemperature:null,
                preheat:false,
                show: false,
                visible: false,
                accordionArr:[true, true]
            }
        },
        components: {MideaHeader,wxcProgress,wxProgress,sfDialog,WxPicker,sfAccordion,mideaSwitch2},
        created(){
            //模拟设备数据
            // nativeService.initMockData({
            //     query: query
            // });
            this.queryStatus();
            this.isIos = weex.config.env.platform == "iOS" ? true : false;
            if (this.isIos){
                this.listenerFun();
            }
        },
        computed:{
            timeRange: function(){
                let list = null;
                switch (this.currentMode) {
                    case 0x20: // 蒸汽
                    case 0x31: // 热风烧烤
                    case 0x40: // 烧烤
                    case 0x33: // 蒸汽+热风烧烤
                        list = settingArrData(1,90);
                        break;
                    case 0x41: // 热风
                    case 0x43: // 热风烧烤
                    case 0xD0: // 保温
                    case 0xB0: // 发酵
                        list = settingArrData(1,300);
                        break;
                    case 0xC1: // 清洁
                        break;
                    default:
                        break;
                }
                return {
                    list,
                    defaultValue: this.currentTime,
                    displayValue (item) {
                        return item;
                    }
                };
            },
            temperatureRange: function(){
                let list = null;
                switch (this.currentMode) {
                    case 0x20: // 蒸汽
                        list = settingArrData(50,100);
                        break;
                    case 0x31: // 热风烧烤
                        list = settingArrData(100,180);
                        break;
                    case 0x41: // 热风
                        list = settingArrData(100,230);
                        break;
                    case 0x33: // 蒸汽+热风烧烤
                        list = settingArrData(180,220);
                        break;
                    case 0x40: // 烧烤
                    case 0xC1: // 清洁
                    case 0xB0: // 发酵
                    case 0xD0: // 保温
                        break;
                    default:
                        break;
                }
                return {
                    list,
                    defaultValue: this.currentTemperature,
                    displayValue (item) {
                        return item;
                    }
                };
            },

        },
        methods: {
            analysisFun(analysisObj) {
                //nativeService.alert(JSON.stringify(analysisObj));
                if (analysisObj.workingState.value == 3 || analysisObj.workingState.value == 6) {
                    this.goTo("working");
                }
            },
            listenerFun(){
                var self = this;        
                globalEvent.addEventListener("receiveMessage", function(e) {//暂时发现失效了
                     nativeService.alert(e);
                    var str = e.data;
                    nativeService.alert(str);
                    var arr = str.split(",");
                    var analysisObj = cmdFun.analysisCmd(arr); //解析04上行指令
                    self.analysisFun(analysisObj);
                });
            },
            viewdisappear(){
                globalEvent.removeEventListener("receiveMessage");
            },
            viewappear(){
                this.listenerFun();
            },
            onModeButtonClicked: function(mode){
                console.log(mode);
                this.currentMode = mode;
                this.show = true;
            },
            updateAccordionArr: function(key, value){
                let accordionArr = JSON.parse(JSON.stringify(this.accordionArr));
                for(let index=0;index<this.accordionArr.length;index++) {
                    if (key === index) {
                        accordionArr[index] = value;
                    } else {
                        if (!value && !this.accordionArr[index]) {
                            accordionArr[index] = true;
                        }
                    }
                }
                this.accordionArr = accordionArr;
            },
            closeDialog(e) {
                var self = this;
                this.show = false;
                if (e.type === 'cancel'){
                    this.show = false;
                    return;
                } 

                let jsonCmd = {
                    mode: this.currentMode,
                    minute: this.currentTime,
                    temperature: this.currentTemperature,
                    preheat: this.preheat
                };
                let deviceCmd = cmdFun.createControlMessage(jsonCmd);
                //nativeService.alert(deviceCmd);
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
            goBack(){
                nativeService.goBack()
            },
            backClick(){
               this.goTo("working");
            },
            handleTimeChange (data) {
                this.currentTime = data;
                console.log('currentTime', this.currentTime);
            },
            handleTemperatureChange (data) {
                this.currentTemperature = data;
                console.log('currentTemperature', this.currentTemperature);
            },
            onPreheatChange(event) {
                this.preheat = event.value;
                console.log('preheat', this.preheat);
            },
            doing: function(){
                if(this.progress === 100) {
                    return;
                }
                ++this.progress;
                // this.progress += '1';
                let context = this;
                window.setTimeout(function () {
                    context.doing();
                }, 1000);
            },
            queryStatus() {
                var self = this;
                var sendCmd = cmdFun.createQueryMessage();
                //nativeService.showLoading();
                // debugger;
                nativeService.startCmdProcess(
                    "query",
                    sendCmd,
                    function (result) {
                        //nativeService.hideLoading();
                        //nativeService.alert(JSON.stringify(result));
                        var result_arr = result.replace(/\[|]/g, ""); //去掉中括号
                        var arr = result_arr.split(",");
                        var analysisObj = cmdFun.analysisCmd(arr);
                        self.analysisFun(analysisObj);
                    },
                    function (result) {
                        //nativeService.hideLoading();
                        // nativeService.toast("查询失败" + JSON.stringify(result));
                    }
                );
            },
            goTo(url){
                let path = url + '.js'
                nativeService.goTo(path,false, true)
            }
        }
    }
</script>


