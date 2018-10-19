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
    .tab-active{
        .f(18*2px);
        .white;
    }
    .tab-content-0{
        background-color: #F3F3F3;
    }
    .tab-content-1{
        .bg-white;
    }
    .block-title{
        .f(12*2px);
        .black;
        .ta;
        .lh(12*2px);
        .ma-t(14*2px);
    }
    .icon-buttons{
        .row;
        padding: 0 3.5*2px;
    }
    .auto_menu{
        .ma-b(12px);
        //.bg-white;
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

<template>
    <scroller class="bg" :style="{height: wrapHeight}"  @viewappear="viewappear" @viewdisappear="viewdisappear">
        <midea-header class="bg"  leftImg="assets/img/header/icon_back_white@3x.png" title="烤箱" titleText="white" bgColor="red" :isImmersion="true"  :showLeftImg="true" @leftImgClick="goBack" ></midea-header>
        <div class="panel">
            <text class="panel-state">待机中</text>
            <div class="tabs">
                <div class="tab" v-for="(tab, x) in tabs">
                    <text class="tab-text" :class="[tab.active && 'tab-active' ]" @click="onTabClicked(x)">{{tab.name}}</text>
                </div>
            </div>
        </div>

        <template v-for="(tab, x) in tabs">
            <div :class="['tab-content-' + x]" v-if="tab.active" :style="{height: wrapHeight - 224*2}">
                <div class="bg-white" :class="[x=1 && 'auto_menu']" v-for="row in tab.rows">
                    <text v-if="row.title" class="block-title">{{row.title}}</text>
                    <div class="icon-buttons">
                        <div class="icon-button column" v-for="item in row.iconButtons" @click="onModeButtonClicked(item.mode)">
                            <image class="button-icon" :src="item.icon"></image>
                            <text class="button-text">{{item.text}}</text>
                        </div>
                    </div>
                </div>
            </div>
        </template>


        <!--自动菜单-->
        <!--<div class="tab-content-0" :style="{height: wrapHeight - 224*2}">-->
            <!--<text class="block-title">1-7岁儿童</text>-->
            <!--<div class="icon-buttons auto-menu" v-for="rows in modes">-->
                <!--<div class="icon-button column" v-for="item in rows" @click="onModeButtonClicked(item.mode)">-->
                    <!--<image class="button-icon" :src="item.icon"></image>-->
                    <!--<text class="button-text">{{item.text}}</text>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!--加热模式-->
        <!--<div class="tab-content-1" :style="{height: wrapHeight - 224*2}">-->
            <!--<div class="icon-buttons auto-menu" v-for="rows in modes">-->
                <!--<div class="icon-button column" v-for="item in rows" @click="onModeButtonClicked(item.mode)">-->
                    <!--<image class="button-icon" :src="item.icon"></image>-->
                    <!--<text class="button-text">{{item.text}}</text>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
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
    </scroller>
</template>

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

    var numberRecord = 0; //记录跳页面的次数

    export default {
        data(){
            return {
                wrapHeight: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750,
                test:'123',
                progress:1,
                tabs:[
                    {
                        name:'自动菜单',
                        active:false,
                        rows:[
                                {
                                    title: '1-7岁儿童',
                                    iconButtons: [
                                        {
                                            'icon': 'assets/img/modes/steam@3x.png',
                                            'text': '蒸汽',
                                            'mode': 0x20,
                                            pickTime: true,
                                            pickTemperature: true,
                                            switchPreheat:false,
                                            defaultTime: 10,
                                            defaultTemperature: 100
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
                                        }
                                    ]
                                },
                                {
                                    title: '1-8岁儿童',
                                    iconButtons: [
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
                                }
                            ]
                    },
                    {
                        name:'加热模式',
                        active:true,
                        rows:[
                                {
                                    title: '',
                                    iconButtons: [
                                        {
                                            'icon': 'assets/img/modes/steam@3x.png',
                                            'text': '蒸汽',
                                            'mode': 0x20,
                                            pickTime: true,
                                            pickTemperature: true,
                                            switchPreheat:false,
                                            defaultTime: 10,
                                            defaultTemperature: 100
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
                                        }
                                    ]
                                },
                                {
                                    title: '',
                                    iconButtons: [
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
                                }
                            ]
                        }
                    ],
                autoMenu: [],
                modes:[] ,
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
            nativeService.initMockData({
                query: query
            });
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
            onTabClicked: function(index){
                // debugger;
                // let tabs = JSON.parse(JSON.stringify(this.tabs));
                let tabs = this.tabs;
                if(tabs[index].active) return;
                for(let i=0; i<tabs.length; i++) {
                    if(parseInt(i) === index) {
                        tabs[i].active = true;
                        continue;
                    }
                    tabs[i].active = false;
                }
                this.tabs = tabs;
            },
            analysisFun(analysisObj) {
                // nativeService.alert(JSON.stringify(analysisObj));
                if (analysisObj.workingState.value == 3 || analysisObj.workingState.value == 4 || analysisObj.workingState.value == 6) {
                    numberRecord++;
                    if(numberRecord==1){ //防止多次获取设备状态，多次跳转
                        this.goTo("working");
                    }
                }
            },
            listenerFun(){
                var self = this;        
                globalEvent.addEventListener("receiveMessage", function(e) {
                    var str = e.data;
                    // nativeService.alert(str);
                    var arr = str.split(",");
                    var analysisObj = cmdFun.analysisCmd(arr); //解析04上行指令
                    self.analysisFun(analysisObj);
                });
            },
            viewdisappear(){
                globalEvent.removeEventListener("receiveMessage");
            },
            viewappear(){
                // this.listenerFun();
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
                nativeService.startCmdProcess(
                    "control",
                    deviceCmd,
                    function(result){
                        //nativeService.alert(result);
                       self.queryStatus();
                    },
                    function(result){
                        nativeService.alert(result);
                        console.log('fail', result);
                    }
                )
            },
            goBack(){
                nativeService.backToNative()
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


