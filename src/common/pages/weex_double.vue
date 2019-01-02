<style lang="less" type="text/less">
    @import "../less/weex.less";
</style>

<template>
    <div class="bg" @viewappear="viewappear()" @viewdisappear="viewdisappear">

          <sf-header leftImg="assets/img/header/public_ic_back@3x.png" title="蒸汽炉" titleText="white" :isImmersion="true"  :showLeftImg="true" @leftImgClick="back2Native" >
            <div slot="headerTitle">
                <sf-tab ref="mTab" :tabArray="pages" @tabClicked="tabClicked">
                </sf-tab>
            </div>
            <div slot="customerContent" class="header-top-wrapper">
                <div class="header-top-inner-wrapper">
                    <div class="header-right-image-wrapper" @click="openCloudRecipe">
                        <image class="header-right-image" :src="'assets/img/header/public_ic_cloud_recipe@3x.png'"></image>
                    </div>
                    <div class="header-right-image-wrapper" @click="childLock(true)">
                        <image class="header-right-image" :src="'img/header/public_ic_babylock@3x.png'"></image>
                    </div>
                    <div class="header-right-image-wrapper" @click="openMorePage">
                        <image class="header-right-image" :src="'img/header/public_ic_lots@3x.png'"></image>
                    </div>
                </div>
            </div>
        </sf-header>

         <!--测试查看指令-->
         <!--<div><text @click="setContent">下发指令:{{testCmd}}</text></div>-->


        <slider :index="index" @change="changeArea" class="slider" :style="{height: wrapHeight}" scrollable="false">
            <div v-for="(item,x) in pages" style="width: 750px;">
                <!--面板切换tabs-->
                <div class="panel"  @longpress="onlongpressQuery()"> <!--隐藏长按组件触发03查询，方便调试-->
                    <text class="panel-state">待机中</text>
                    <div v-if="item.tabs.length>1" class="tabs">
                        <template v-for="(tab, x) in item.tabs">
                            <div class="tab" @click="onPageTabClicked(x,y)">
                                <text class="tab-text" :class="[tab.active && 'tab-active' ]">{{tab.name}}</text>
                            </div>
                        </template>
                    </div>
                </div>

                <!--模式操作按钮-->
                <div v-for="(tab, x) in item.tabs"> <!--隐藏长按组件触发查看云菜谱，方便查看云菜谱-->
                    <scroller :class="[isAutoMenuStyle(tab) ?  'tab-content-gray' : 'tab-content-white' ]" v-if="tab.active" :style="{height: (wrapHeight - (item.tabs.length > 1 ? 204*2 : 174*2)),paddingBottom:srcollPaddingBottom}">
                        <div v-if="isAutoMenuStyle(tab)" class="bg-white" style="height: 20px"></div>
                        <div class="bg-white" :class="[tab.rows[0].title && 'auto_menu']" v-for="row in tab.rows">
                            <div v-if="isAutoMenuStyle(tab)" class="block-title-wrap row j-c a-c">
                                <div class="block-title row j-c a-c">
                                    <text class="block-title-text">{{row.title}}</text>
                                </div>
                            </div>
                            <slider v-if="tab.rows[0].title" infinite="false" style="height: 234px">
                                <div class="icon-buttons" v-for="items in row.iconButtons">
                                    <div class="icon-button column" v-for="item in items" @click="onIconButtonClicked(item)">
                                        <image v-if="item.icon" class="button-icon" :src="item.icon"></image>
                                        <div v-else class="button-icon row a-c j-c">
                                            <text>{{item.time.default}}'</text>
                                        </div>
                                        <!-- 不支持肉类探针的模式遮罩层 -->
                                        <div v-if="!item.probe && cmdObj.isProbe.value" class="button-icon a-c j-c probeClass"></div>
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
                                    <!-- 不支持肉类探针的模式遮罩层 -->
                                    <div v-if="!item.probe && cmdObj.isProbe.value" class='button-icon a-c j-c probeClass'></div>
                                    <text class="button-text">{{item.text}}</text>
                                </div>
                            </div>
                        </div>
                    </scroller>
                </div>
            </div>
        </slider>

        <!--模式参数设置弹窗-->
        <sf-dialog :show="show" :tabs="tabs" :device="constant.device" :isProbe="cmdObj.isProbe.value" mainBtnColor="#267AFF" secondBtnColor="#267AFF" confirmText="开始" @close="closeDialog" @mideaDialogCancelBtnClicked="closeDialog" @mideaDialogConfirmBtnClicked="closeDialog">
            <div slot="content">
                <!--<template v-for="tab in tabs">-->
                <!--<text v-if="tab.active" class="content-title">{{tab.name}}</text>-->
                <!--</template>-->
                <!--<text v-if="currentItem" class="content-title" @click="showDetailModal">{{currentItem.text}}</text>-->
                <modal-header style="margin:0 -36px;" v-if="currentItem" :showRightImg="!detailEmpty && currentItem.mode === 0xE0" rightImg="img/header/public_ic_help@3x.png" class="modal-header" :title="currentItem.text" titleText="#000000" :isImmersion="false"  :showLeftImg="false" @rightImgClick="showDetailModal"></modal-header>

                <div v-if="currentItem && currentItem.probe && cmdObj.isProbe.value">
                    <sf-accordion type="picker" :value="setValue('probeTemperature')" unit="°C" title="设置探针温度" isFolded="true"  @callback="updateAccordionFoldingStatus">
                        <div slot="content">
                            <wx-picker :data="range('probeTemperature')" target="probeTemperature" :visible="true" @wxChange="handlePickerChange"></wx-picker>
                        </div>
                    </sf-accordion>
                      <sf-accordion type="picker" :value="setValue('steamAmount')" unit="档" title="设置蒸汽量" isFolded="true"  @callback="updateAccordionFoldingStatus">
                        <div slot="content">
                            <wx-picker :data="range('steamAmount')" target="steamAmount" :visible="true" @wxChange="handlePickerChange"></wx-picker>
                        </div>
                    </sf-accordion>
                </div>
                <div v-else>
                    <div v-for="(item, index) in accordions">
                        <div v-if="item.type==='picker'">
                            <sf-accordion :type="item.type" v-if="currentItem && currentItem[item.key] && currentItem[item.key].set " :value="setValue(item.key)" :unit="item.unit" :index="index" :title="item.subtitle" :isFolded="item.isFolded"  @callback="updateAccordionFoldingStatus">
                                <div slot="content">
                                    <wx-picker  :data="range(item.key)" :target="item.key" :visible="true" @wxChange="handlePickerChange"></wx-picker>
                                </div>
                            </sf-accordion>
                        </div>
                        <div v-if="item.type==='switch'">
                            <sf-accordion :type="item.type" v-if="currentItem && currentItem[item.key] && currentItem[item.key].set " :title="item.subtitle" index="-1" :hideArrow="item.hideArrow">
                                <div slot="right">
                                    <midea-switch2 :itemKey="item.key" :checked="current[item.key]" @change="onPreheatChange" width="70" height="38" slot="value"></midea-switch2>
                                </div>
                            </sf-accordion>
                        </div>
                    </div>
                </div>

            </div>
        </sf-dialog>

        <detail-modal :show="showDetailVisibility" @close="closeDetailModal">
            <div slot="title">
                <modal-header leftImg="img/header/public_ic_gray@3x.png" class="modal-header" :title="modeText" titleText="#000000" :isImmersion="false"  :showLeftImg="true" @leftImgClick="closeDetailModal"></modal-header>
            </div>
            <div slot="content" class="content-wrap" :style="{'height':338*2 + 'px'}">
                <div class="content-block row" :style="{'padding-top':14*2-3+'px'}">
                    <text class="label">食材:</text>
                    <scroller class="food-material-items flex">
                        <div class="food-material-item row" v-for="item in foodMaterialItems">
                            <text class="food-material-item-left flex">{{item.name}}</text>
                            <text class="food-material-item-right">{{item.weight}}</text>
                        </div>
                    </scroller>
                </div>
                <div class="content-block row" :style="{'padding-top':20*2-3+'px'}">
                    <text class="label">处理:</text>
                    <scroller class="cooking-steps flex">
                        <text v-for="(item, index) in cookingSteps" class="cooking-step">{{index+1}}.{{item}}</text>
                    </scroller>
                </div>
            </div>
        </detail-modal>

        <!--童锁遮罩-->
        <modal :show="modalVisibility" @close="closeModal">
            <div slot="header">
                <modal-header leftImg="img/header/public_ic_home@3x.png" class="modal-header" :isImmersion="true"  :showLeftImg="true" @leftImgClick="back2Native"></modal-header>
            </div>
            <div class="a-c j-c" slot="content" :style="{height: wrapHeight+'px'}">
                <div class="child-lock">
                    <image class="child-lock-icon" src="img/childlock/large_childlock@3x.png"></image>
                    <text class="child-lock-text">童锁已开启</text>
                </div>

                <div class="child-lock-close" @click="childLock(false)">
                    <image class="child-lock-close-icon" src="img/childlock/mode_close@3x.png"></image>
                    <text class="child-lock-close-text">关闭童锁</text>
                </div>
            </div>
        </modal>

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
    import sfTab from '@/component/sf/custom/mTab.vue'
    import sfHeader from '@/component/sf/custom/header.vue'
    import MideaHeader from '@/midea-component/header.vue'
    import modalHeader from '@/component/sf/custom/modal-header.vue'
    import rowWrapItems from '@/component/sf/custom/row-wrap-items.vue'
    import sfAccordion from '@/component/sf/custom/accordion.vue'
    import detailModal from '@/component/sf/custom/detail-modal.vue'
    import modal from '@/component/sf/custom/modal.vue'
    import sfDialog from '@/component/sf/custom/dialog.vue'
    import nativeService from "@/common/services/nativeService";
    import query from "../../dummy/query";
    import mideaSwitch2 from '@/midea-component/switch2.vue'
    // import WxPicker from '@/component/sf/custom/picker.vue';
    import WxPicker from '@/component/sf/custom/picker_amui.vue';
    import mideaDialog from '@/component/dialog.vue';

    // config data
    // import modes from "./config/modes.js";
    // import autoMenu from "./config/auto-menu.js";

    import accordionMixin from  "@/common/util/mixins/accordions"
    import deviceMessageMixin from  "@/common/util/mixins/deviceMessage"
    import detailModalMixin from  "@/common/util/mixins/detailModal"
    import commonMixin from  "@/common/util/mixins/common"
    import copyMixin from  "@/common/util/mixins/copy"
    import modalMixin from  "@/common/util/mixins/modal"
    import weexData from  "@/common/util/mixins/weexData"

    // import constant from "./config/constant";

    export default {
        mixins: [commonMixin, deviceMessageMixin, accordionMixin, detailModalMixin,copyMixin,weexData,modalMixin],
        data(){
            return {
                index:0,
            }
        },
        computed:{

        },
        props: {
            pages:{
                type: Array,
                default: function(){
                    return []
                }
            },
            constant:{
                type: Object,
                default: () => ({})
            },
        },
        components: {sfTab,sfHeader,MideaHeader,sfDialog,WxPicker,sfAccordion,mideaSwitch2, mideaDialog, detailModal,modal,modalHeader,rowWrapItems},
        created(){
            let {constant,pages} = this;
            if(this.isipx()){
                this.srcollPaddingBottom = '80px';
            }
            //模拟设备数据
            nativeService.initMockData({
                query: query
            });
            let tabs = pages[this.index].tabs;
            this.queryStatus(tabs,constant.device);
            //this.queryRunTimer(20,tabs,constant.device);//20秒轮询 
            this.isIos = weex.config.env.platform == "iOS" ? true : false;
            if (this.isIos){
                this.listenerDeviceReiveMessage();
            }

            // nativeService.getDeviceInfo().then(function(data){
            //     nativeService.alert(data);
            // });

           // let context = this;
            // this.getDeviceInfo(constant.device.widget_name).then(function(dataSn){
            //     // nativeService.alert(typeof context.statisticsUpload);
            //     return context.statisticsUpload({...constant.device, iot_device_id:dataSn});
            // });
            this.statisticsUpload({...constant.device});

            //console.dir(JSON.stringify(this.foodMaterialItems));
        },
        methods: {
            isAutoMenuStyle: function(tab){
                return tab.rows[0].title && tab.rows[0].title !== 'mode'
            },
            openCloudRecipe: function(){
                nativeService.jumpNativePage({
                    "pageName": "CookbookHome",
                    "data": {}
                })
            },
            openMorePage: function(){
                nativeService.goTo('more.js', {animated: true});
            },
            initialIndex(){
                for(let i=0;i<this.pages.length;i++) {
                    if(this.pages[i].selected) {
                        this.index = i;
                        return;
                    }
                }
            },
            tabClicked(tabIndex) {
                this.index = tabIndex;
            },
            changeArea(sliObj) {
                var sliderIndex = sliObj.index;
                this.$refs.mTab.tabClicked(sliderIndex);
                // modal.toast({ message:'index:'+sliObj.index, duration: 1 })
            },
             onPageTabClicked: function(x,index){
                // debugger;
                // let tabs = JSON.parse(JSON.stringify(this.tabs));
                let tabs = this.pages[x].tabs;
                if(tabs[index].active) return;
                for(let i=0; i<tabs.length; i++) {
                    if(parseInt(i) === index) {
                        tabs[i].active = true;
                        continue;
                    }
                    tabs[i].active = false;
                }
                this.pages[x].tabs = tabs;
            },
            onIconButtonClicked: function(item){
                if(!item.probe && this.cmdObj.isProbe.value){
                    nativeService.toast("该模式不支持肉类探针");
                    return;
                }
                this.currentItem = item;
                // nativeService.alert(this.currentItem);
                this.modeText = item.text;
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
            knowClicked(){
                this.show = false;
                // nativeService.alert(typeof this.warningDialog.callback);
                this.warningDialog.callback && this.warningDialog.callback();
                this.warningDialog = this.initWarningDialog();
            }
        }
    }
</script>


