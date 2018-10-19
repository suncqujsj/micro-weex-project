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
                        <div class="icon-button column" v-for="item in row.iconButtons" @click="onIconButtonClicked(item)">
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
                <!--<div class="icon-button column" v-for="item in rows" @click="onIconButtonClicked(item.mode)">-->
                    <!--<image class="button-icon" :src="item.icon"></image>-->
                    <!--<text class="button-text">{{item.text}}</text>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!--加热模式-->
        <!--<div class="tab-content-1" :style="{height: wrapHeight - 224*2}">-->
            <!--<div class="icon-buttons auto-menu" v-for="rows in modes">-->
                <!--<div class="icon-button column" v-for="item in rows" @click="onIconButtonClicked(item.mode)">-->
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
                <sf-accordion v-if="currentItem && currentItem.time.set" :value="setValue('time')" :index="0" title="设置时间" :isFolded="accordionArr[0]"  @callback="updateAccordionArr">
                    <div slot="content">
                        <wx-picker :data="range('time')" :visible="true" @wxChange="handleTimeChange"></wx-picker>
                    </div>
                </sf-accordion>
                <sf-accordion v-if="currentItem && currentItem.temperature.set" :value="setValue('temperature')" :index="1" title="设置温度" :isFolded="accordionArr[1]" @callback="updateAccordionArr">
                    <div slot="content">
                        <wx-picker :data="range('temperature')" :visible="true" @wxChange="handleTemperatureChange"></wx-picker>
                    </div>
                </sf-accordion>
                <sf-accordion v-if="currentItem && currentItem.steamAmount.set" :value="setValue('steamAmount')" :index="2" title="设置蒸汽量" :isFolded="accordionArr[2]" @callback="updateAccordionArr">
                    <div slot="content">
                        <wx-picker :data="range('steamAmount')" :visible="true" @wxChange="handleSteamAmountChange"></wx-picker>
                    </div>
                </sf-accordion>
                <sf-accordion v-if="currentItem && currentItem.fireAmount.set" :value="setValue('fireAmount')" :index="3" title="设置火力" :isFolded="accordionArr[3]" @callback="updateAccordionArr">
                    <div slot="content">
                        <wx-picker :data="range('fireAmount')" :visible="true" @wxChange="handleFireAmountChange"></wx-picker>
                    </div>
                </sf-accordion>
                <sf-accordion v-if="currentItem && currentItem.preheat.set" title="设置预热" :hideIcon="true">
                    <div slot="right">
                        <midea-switch2 :checked="current.preheat" @change="onPreheatChange" width="70" height="38" slot="value"></midea-switch2>
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
    var settingArrData = function(start,end,step){
        var arr=[];
        if(start > end){
            return arr;
        }
        for(var i=0;start+i*step <= end;i++){
            var value = start+step*i;
            if(value < 0){
                continue;
            }
            arr[i]=value;
        }
        console.log(arr.length);
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
                                            time:{
                                                set: true,
                                                default:90,
                                                range:[1,90,1]
                                            },
                                            temperature:{
                                                set: true,
                                                default:100,
                                                range:[50,100,10]
                                            },
                                            preheat:{
                                                set:false,
                                                default: false
                                            },
                                            steamAmount:{
                                                set:false,
                                                default:0
                                            },
                                            fireAmount:{
                                                set:false,
                                                default:0
                                            }
                                        },
                                        {
                                            'icon': 'assets/img/modes/steam_and_hot_wind@3x.png',
                                            'text': '蒸汽+热风对流',
                                            'mode': 0x31,
                                            time:{
                                                set: true,
                                                default:10,
                                                range:[1,90,1]
                                            },
                                            temperature:{
                                                set: true,
                                                default:180,
                                                range:[180,220,10]
                                            },
                                            preheat:{
                                                set:false,
                                                default: false
                                            },
                                            steamAmount:{
                                                set:true,
                                                default:3,
                                                range:[1,3,1]
                                            },
                                            fireAmount:{
                                                set:false,
                                                default:0
                                            }
                                        },
                                        {
                                            'icon': 'assets/img/modes/broil@3x.png',
                                            'text': '烧烤',
                                            'mode': 0x40,
                                            time:{
                                                set: true,
                                                default:10,
                                                range:[1,90,1]
                                            },
                                            temperature:{
                                                set: false,
                                                default:180,
                                                range:null
                                            },
                                            preheat:{
                                                set:false,
                                                default: false
                                            },
                                            steamAmount:{
                                                set:true,
                                                default:3,
                                                range:[1,3,1]
                                            },
                                            fireAmount:{
                                                set:false,
                                                default:0
                                            }
                                        },
                                        {
                                            'icon': 'assets/img/modes/hot_wind@3x.png',
                                            'text': '热风对流',
                                            'mode': 0x41,
                                            time:{
                                                set: true,
                                                default:10,
                                                range:[1,300,1]
                                            },
                                            temperature:{
                                                set: true,
                                                default:180,
                                                range:[100,230,5]
                                            },
                                            preheat:{
                                                set:false,
                                                default: false
                                            },
                                            steamAmount:{
                                                set:false,
                                                default:0,
                                                range:[1,3,1]
                                            },
                                            fireAmount:{
                                                set:false,
                                                default:0,
                                                range:null
                                            }
                                        }
                                    ]
                                },
                                {
                                    title: '',
                                    iconButtons: [
                                        {
                                            'icon': 'assets/img/modes/hot_wind_and_broil@3x.png',
                                            'text': '热风烧烤',
                                            'mode': 0x43,
                                            time:{
                                                set: true,
                                                default:90,
                                                range:[1,300,1]
                                            },
                                            temperature:{
                                                set: true,
                                                default:160,
                                                range:[100,180,5]
                                            },
                                            preheat:{
                                                set:false,
                                                default: false
                                            },
                                            steamAmount:{
                                                set:false,
                                                default:0
                                            },
                                            fireAmount:{
                                                set:false,
                                                default:0
                                            }
                                        },
                                        {
                                            'icon': 'assets/img/modes/clean@3x.png',
                                            'text': '清洁',
                                            'mode': 0xC1,
                                            time:{
                                                set: false,
                                                default:0,
                                                range:null
                                            },
                                            temperature:{
                                                set: false,
                                                default:0,
                                                range:null
                                            },
                                            preheat:{
                                                set:false,
                                                default: false
                                            },
                                            steamAmount:{
                                                set:false,
                                                default:0,
                                                range:null
                                            },
                                            fireAmount:{
                                                set:false,
                                                default:0,
                                                range:null
                                            }
                                        },
                                        {
                                            'icon': 'assets/img/modes/heat_preservation@3x.png',
                                            'text': '保温',
                                            'mode': 0xD0,
                                            time:{
                                                set: true,
                                                default:10,
                                                range:[1,300,1]
                                            },
                                            temperature:{
                                                set: false,
                                                default:50,
                                                range:null
                                            },
                                            preheat:{
                                                set:false,
                                                default: false
                                            },
                                            steamAmount:{
                                                set:false,
                                                default:0,
                                                range:null
                                            },
                                            fireAmount:{
                                                set:false,
                                                default:0,
                                                range:null
                                            }
                                        },
                                        {
                                            'icon': 'assets/img/modes/fermentation@3x.png',
                                            'text': '发酵',
                                            'mode': 0xB0,
                                            time:{
                                                set: true,
                                                default:10,
                                                range:[1,300,1]
                                            },
                                            temperature:{
                                                set: false,
                                                default:35,
                                                range:null
                                            },
                                            preheat:{
                                                set:false,
                                                default: false
                                            },
                                            steamAmount:{
                                                set:false,
                                                default:0,
                                                range:null
                                            },
                                            fireAmount:{
                                                set:false,
                                                default:0,
                                                range:null
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                currentItem:null,
                current:{
                    time: null,
                    temperature: null,
                    preheat:false,
                    steamAmount:0,
                    fireAmount:0
                },
                show: false,
                accordionArr:[true, true, true, true, true]
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
            // timeRange: function(){
            //     let currentItem = this.currentItem;
            //     let list = settingArrData(currentItem.time.range[0],currentItem.time.range[1]);
            //     return {
            //         list,
            //         defaultValue: this.current.time || currentItem.time.default,
            //         displayValue (item) {
            //             return item;
            //         }
            //     };
            // },
            // temperatureRange: function(){
            //     let list = null;
            //     let currentItem = this.currentItem;
            //     switch (currentItem.mode) {
            //         case 0x20: // 蒸汽
            //             list = settingArrData(50,100);
            //             break;
            //         case 0x31: // 热风烧烤
            //             list = settingArrData(100,180);
            //             break;
            //         case 0x41: // 热风
            //             list = settingArrData(100,230);
            //             break;
            //         case 0x33: // 蒸汽+热风烧烤
            //             list = settingArrData(180,220);
            //             break;
            //         case 0x40: // 烧烤
            //         case 0xC1: // 清洁
            //         case 0xB0: // 发酵
            //         case 0xD0: // 保温
            //             break;
            //         default:
            //             break;
            //     }
            //     return {
            //         list,
            //         defaultValue: this.currentTemperature,
            //         displayValue (item) {
            //             return item;
            //         }
            //     };
            // },

        },
        methods: {
            range: function(key){ // pick属性范围
                let currentItem = this.currentItem;
                // debugger;
                let list = settingArrData(currentItem[key].range[0],currentItem[key].range[1],currentItem[key].range[2]);
                return {
                    list,
                    defaultValue: this.setValue(key),
                    displayValue (item) {
                        return item;
                    }
                };
            },
            setValue: function(key){
                return this.current[key] || this.currentItem[key].default;
            },
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
            onIconButtonClicked: function(item){
                console.log('pressed', item);
                this.currentItem = item;
                this.show = true;
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
                    mode: this.currentItem.mode,
                    minute: this.setValue('time'),
                    temperature: this.setValue('temperature'),
                    preheat: this.setValue('preheat'),
                    steamAmount: this.setValue('steamAmount'),
                    fireAmount: this.setValue('fireAmount')
                };
                // debugger;
                // return;
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
                this.current.time = data;
                console.log('currentTime', this.current.time);
            },
            handleTemperatureChange (data) {
                this.currentTemperature = data;
                console.log('currentTemperature', this.currentTemperature);
            },
            onPreheatChange(event) {
                this.current.preheat = event.value;
                console.log('currentPreheat', this.current.preheat);
            },
            handleSteamAmountChange (data) {
                this.current.steamAmount = data;
                console.log('currentSteamAmount', this.current.steamAmount);
            },
            handleFireAmountChange (data) {
                this.current.fireAmount = data;
                console.log('currentFireAmount', this.current.fireAmount);
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


