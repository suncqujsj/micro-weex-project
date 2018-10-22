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
        .ma-b(44*2px);
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
        .bs(padding-box);
        padding: 16*2px 0;

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

        <midea-header class="bg"  leftImg="assets/img/header/icon_back_white@3x.jpg" title="烤箱" titleText="white" bgColor="red" :isImmersion="true"  :showLeftImg="true" @leftImgClick="goBack" ></midea-header>

        <!--面板切换tabs-->
        <div class="panel">
            <text class="panel-state">待机中</text>
            <div class="tabs">
                <template v-for="(tab, x) in tabs">
                    <div class="tab" @click="onTabClicked(x)">
                        <text class="tab-text" :class="[tab.active && 'tab-active' ]">{{tab.name}}</text>
                    </div>
                </template>
            </div>
        </div>

        <!--模式操作按钮-->
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

        <!--<text class="r test" @click="doing">{{progress}}</text>-->
        <!--<wxProgress :percent='progress' :bar_width='650'></wxProgress>-->
        <!--<wxcProgress :percent="progress"-->
                     <!--:wxc_radius='200'>-->
            <!--<div class="cen">-->
                <!--<text class="demo-text">{{progress}}%</text>-->
            <!--</div>-->
        <!--</wxcProgress>-->

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

    </scroller>
</template>

<script>
    import MideaHeader from '@/midea-component/header.vue'
    import sfAccordion from '@/component/sf/custom/accordion.vue'
    import sfDialog from '@/component/sf/custom/dialog.vue'
    import nativeService from "../common/services/nativeService";
    import query from "../dummy/query";
    import {wxcProgress, wxProgress} from "@/component/sf/wx-progress";
    import mideaSwitch2 from '@/midea-component/switch2.vue'
    import WxPicker from '@/component/sf/custom/picker.vue';

    // config data
    import modes from "./config/modes.js";
    import autoMenu from "./config/auto-menu.js";

    import accordionMixin from  "./utils/mixins/accordions"
    import deviceMessageMixin from  "./utils/mixins/deviceMessage"

    var numberRecord = 0; //记录跳页面的次数

    export default {
        mixins: [deviceMessageMixin, accordionMixin],
        data(){
            return {
                wrapHeight: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750,
                progress:1,
                tabs:[
                    {
                        name:'自动菜单',
                        active:false,
                        rows:autoMenu
                    },
                    {
                        name:'加热模式',
                        active:true,
                        rows:modes
                    }
                ],
                // accordions: this.initAccordions(),
                // currentItem:null,
                // current:this.initCurrentData(),
                // show: false
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
                this.listenerDeviceReiveMessage();
            }
        },
        computed:{
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
            onIconButtonClicked: function(item){
                this.currentItem = item;
                this.openDialog();
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
            }
        }
    }
</script>


