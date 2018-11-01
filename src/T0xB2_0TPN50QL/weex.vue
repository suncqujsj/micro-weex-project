<style lang="less" type="text/less">
    @import "../common/less/common";
    .root{
        height: 100%;
    }
    .bg {
        background-image: linear-gradient(to bottom, #FFD321, #FFB632);
    }
    .panel-state{
        @h:30*2px;
        .f(@h);
        .white;
        .ta;
        .lh(60px);
        .ma-t(35*2px);
        .ma-b(45*2px);
    }
    .tabs{
        .row;
    }
    .tab{
        .flex;
        .row;
        justify-content: center;
        align-items: flex-end;
        height: (18+16)*2px;
        .bs(padding-box);
        padding-bottom: 16*2px;

    }
    .tab-text{
        .f(14*2px);
        color:rgba(255,255,255,.8);
    }
    .tab-active{
        .f(18*2px);
        .white;
    }
    .tab-content-gray{
        background-color: #F3F3F3;
    }
    .tab-content-white{
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
        width: 736px;
        /*overflow-x: scroll;*/
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
        .round(112px);
        .ma-b(10*2px);
        .bg-gray;
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

    .header-top-wrapper {
        position: absolute;
        right: 0px;
        bottom: 0px;
        height: 88px;
    }
    .header-top-inner-wrapper {
        position: relative;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        height: 88px;
    }
    .header-right{
        .pos(a);
        right: 0;
        top: 0;
        height: 88px;
    }
    .header-right-image-wrapper {
        width: 88px;
        height: 88px;
        display: flex;
        justify-content: center;
        align-items: center;
        /*padding-right: 32px;*/
    }
    .header-right-image {
        height: 44px;
        width: 44px;
    }
</style>

<template>
    <div class="bg" :style="{height: wrapHeight}"  @viewappear="viewappear" @viewdisappear="viewdisappear">

        <midea-header leftImg="assets/img/header/public_ic_back@3x.png" title="蒸汽炉" titleText="white" :isImmersion="true"  :showLeftImg="true" @leftImgClick="goBack" >
            <div slot="customerContent" class="header-top-wrapper">
                <div class="header-top-inner-wrapper">
                    <div class="header-right-image-wrapper" @click="openCloudRecipe">
                        <image class="header-right-image" :src="'assets/img/header/public_ic_cloud_recipe@3x.png'"></image>
                    </div>
                    <!--<div class="header-right-image-wrapper" @click="childLock(true)">
                        <image class="header-right-image" :src="'assets/img/header/public_ic_babylock@3x.png'"></image>
                    </div>-->
                    <!--<div class="header-right-image-wrapper" @click="openMorePage">
                        <image class="header-right-image" :src="'assets/img/header/public_ic_lots@3x.png'"></image>
                    </div>-->
                </div>
            </div>
        </midea-header>

        <!--面板切换tabs-->
        <div class="panel"  @longpress="onlongpressQuery"> <!--隐藏长按组件触发03查询，方便调试-->
            <text class="panel-state">待机中</text>
            <div v-if="tabs.length>1" class="tabs">
                <template v-for="(tab, x) in tabs">
                    <div class="tab" @click="onTabClicked(x)">
                        <text class="tab-text" :class="[tab.active && 'tab-active' ]">{{tab.name}}</text>
                    </div>
                </template>
            </div>
        </div>

        <!--模式操作按钮-->
        <div v-for="(tab, x) in tabs"  @longpress="onlongpressGoToMenu"> <!--隐藏长按组件触发查看云菜谱，方便查看云菜谱-->
            <scroller :class="[tab.rows[0].title ?  'tab-content-gray' : 'tab-content-white' ]" v-if="tab.active" :style="{height: wrapHeight - (tabs.length > 1 ? 204*2 : 174*2)}">
                <div class="bg-white" :class="[tab.rows[0].title && 'auto_menu']" v-for="row in tab.rows">
                    <text v-if="row.title" class="block-title">{{row.title}}</text>
                    <slider v-if="tab.rows[0].title" infinite="false" style="height: 234px">
                        <div class="icon-buttons" v-for="items in row.iconButtons">
                            <div class="icon-button column" v-for="item in items" @click="onIconButtonClicked(item)">
                                <image v-if="item.icon" class="button-icon" :src="item.icon"></image>
                                <div v-else class="button-icon row a-c j-c">
                                    <text>{{item.time.default}}'</text>
                                </div>
                                <text class="button-text">{{item.text}}</text>
                            </div>
                        </div>
                    </slider>
                    <div class="icon-buttons" v-else>
                        <div class="icon-button column" v-for="item in row.iconButtons" @click="onIconButtonClicked(item)">
                            <image v-if="item.icon" class="button-icon" :src="item.icon"></image>
                            <div v-else class="button-icon row a-c j-c">
                                <text>{{item.time.default}}'</text>
                            </div>
                            <text class="button-text">{{item.text}}</text>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>

        <!--<text class="r test" @click="doing">{{progress}}</text>-->
        <!--<wxProgress :percent='progress' :bar_width='650'></wxProgress>-->
        <!--<wxcProgress :percent="progress"-->
        <!--:wxc_radius='200'>-->
        <!--<div class="cen">-->
        <!--<text class="demo-text">{{progress}}%</text>-->
        <!--</div>-->
        <!--</wxcProgress>-->

        <!--模式参数设置弹窗-->
        <sf-dialog :show="show" confirmText="开始" @close="closeDialog" @mideaDialogCancelBtnClicked="closeDialog" @mideaDialogConfirmBtnClicked="closeDialog">
            <div slot="content">
                <!--<template v-for="tab in tabs">-->
                <!--<text v-if="tab.active" class="content-title">{{tab.name}}</text>-->
                <!--</template>-->
                <text v-if="currentItem" class="content-title">{{currentItem.text}}</text>
                <template v-for="(item, index) in accordions">
                    <template v-if="item.type==='picker'">
                        <sf-accordion v-if="currentItem && currentItem[item.key].set" :value="setValue(item.key)" :unit="item.unit" :index="index" :title="item.subtitle" :isFolded="item.isFolded"  @callback="updateAccordionFoldingStatus">
                            <div slot="content">
                                <wx-picker  :data="range(item.key)" :target="item.key" :visible="true" @wxChange="handlePickerChange"></wx-picker>
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

        <midea-dialog :title="warningDialog.title"
                      :show="warningDialog.show"
                      :single="true"
                      @mideaDialogConfirmBtnClicked="knowClicked"
                      :content="warningDialog.content"
                      mainBtnColor="#FFB632"
        >
        </midea-dialog>

    </div>
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
    import commonMixin from  "./utils/mixins/common"

    import mideaDialog from '@/component/dialog.vue';

    var numberRecord = 0; //记录跳页面的次数

    export default {
        mixins: [commonMixin, deviceMessageMixin, accordionMixin],
        data(){
            return {
                tabs:[
                    {
                        name:'自动菜单',
                        active:true,
                        rows:autoMenu
                    },
                    {
                        name:'加热模式',
                        active:false,
                        rows:modes
                    }
                ],
                warningDialog: this.initWarningDialog()
            }
        },
        components: {MideaHeader,wxcProgress,wxProgress,sfDialog,WxPicker,sfAccordion,mideaSwitch2, mideaDialog},
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
            openCloudRecipe: function(){
                nativeService.jumpNativePage({
                    "pageName": "CookbookHome",
                    "data": {}
                })
            },
            openMorePage: function(){
                nativeService.goTo('more.js', {animated: true});
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
                this.currentItem = item;
                this.openDialog();
            },
            initWarningDialog(){
                return {
                    show: false,
                    title: "温馨提示",
                    content: "主人，您的水箱缺水了，要及时添加水哦",
                    callback: null
                };
            },
            setWarningDialog(content, callback=null, show=true){
                this.warningDialog.show = show;
                this.warningDialog.content = content;
                this.warningDialog.callback = callback;
            },
            analysisFun(analysisObj) {
                // nativeService.alert(JSON.stringify(analysisObj));
                this.show = false;
                if(analysisObj.displaySign.isError){
                    this.setWarningDialog("设备故障，请联系售后人员");
                }
                if(analysisObj.displaySign.lackWater){
                    this.setWarningDialog("主人，您的水箱缺水了，要及时添加水哦");
                }
                if(analysisObj.displaySign.waterBox){
                    this.setWarningDialog("缺水盒");

                }
                if(analysisObj.displaySign.doorSwitch){
                    this.setWarningDialog("炉门开了");
                }

                if(analysisObj.displaySign.lock){
                    let context = this;
                    this.setWarningDialog("你需要关闭童锁吗？", function(){
                        context.childLock(false);
                    });
                }

                if (analysisObj.workingState.value == 3 || analysisObj.workingState.value == 4 || analysisObj.workingState.value == 6) {
                    numberRecord++;
                    if(numberRecord==1){ //防止多次获取设备状态，多次跳转
                        this.goTo("working");
                    }
                }
            },
            knowClicked(){
                this.show = false;
                // nativeService.alert(typeof this.warningDialog.callback);
                this.warningDialog.callback && this.warningDialog.callback();
                this.warningDialog = this.initWarningDialog();
            }
        }
    }
</script>


