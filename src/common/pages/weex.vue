<style lang="less" type="text/less">
    @import "../less/working.less";
</style>
<template>
    <div @viewappear="viewappear" @viewdisappear="viewdisappeaar">
        <div class="bg" v-if="!isWorkingPage">
            <midea-header bgColor="transparent" leftImg="img/header/public_ic_back_white@3x.png" :title="constant.device.page_title" titleText="white" :isImmersion="true" :showLeftImg="true" @leftImgClick="back2Native" >
                <div slot="customerContent" class="header-top-wrapper">
                    <div class="header-top-inner-wrapper">
                        <div class="header-right-image-wrapper" @click="onCloudMenuIconClicked">
                            <image class="header-right-image" :src="'img/header/public_ic_cloud_recipe@3x.png'"></image>
                        </div>
                        <div v-if="childLockVisibility('standby')" class="header-right-image-wrapper" @click="childLock(true)">
                            <image class="header-right-image" :src="'img/header/public_ic_babylock@3x.png'"></image>
                        </div>
                        <div class="header-right-image-wrapper" @click="openMorePage">
                            <image class="header-right-image" :src="'img/header/public_ic_lots@3x.png'"></image>
                        </div>
                    </div>
                </div>
            </midea-header>

            <!--测试查看指令-->
            <!--<div><text @click="setContent">下发指令:{{testCmd}}</text></div>-->
            <div class="onlongpressQuery"  @longpress="onlongpressQuery()"></div><!--隐藏长按组件触发03查询，方便调试-->
            <!--面板切换tabs-->
            <div class="panel">
                <text class="panel-state">{{language.standbyState}}</text>
                <div v-if="tabs.length>1" class="tabs">
                    <template v-for="(tab, x) in tabs">
                        <div class="tab" @click="onTabClicked(x)">
                            <text class="tab-text" :class="[tab.active && 'tab-active' ]">{{language.tabs[x]}}</text>
                        </div>
                    </template>
                </div>
            </div>

            <!--模式操作按钮-->
            <div v-for="(tab, x) in tabs"> <!--隐藏长按组件触发查看云菜谱，方便查看云菜谱-->
                <scroller :class="[isAutoMenuStyle(tab) ?  'tab-content-gray' : 'tab-content-white' ]" v-if="tab.active" :style="{height: (wrapHeight - (tabs.length > 1 ? 204*2 : 174*2)),paddingBottom:srcollPaddingBottom}">
                    <div v-if="isAutoMenuStyle(tab)" class="bg-white" style="height: 20px"></div>
                    <div class="bg-white" :class="[tab.rows[0].title && 'auto_menu']" v-for="row in tab.rows">
                        <div v-if="isAutoMenuStyle(tab)" class="block-title-wrap row j-c a-c">
                            <div class="block-title row j-c a-c">
                                <text class="block-title-text">{{row.title}}</text>
                            </div>
                        </div>
                        <slider v-if="tab.rows[0].title" infinite="false" style="height: 234px">
                            <div class="icon-buttons" v-for="items in row.iconButtons">
                                <div class="icon-button column" v-for="item in items" @click="onIconButtonClicked(item)" v-if="!item.standbyHide">
                                    <image v-if="item.icon" class="button-icon" :src="item.icon"></image>
                                    <div v-else class="button-icon row a-c j-c">
                                        <text style="font-size: 30px;">{{item.time.default}}'</text>
                                    </div>
                                    <!-- 不支持肉类探针的模式遮罩层 -->
                                    <div v-if="!item.probe && cmdObj.isProbe.value" class="button-icon a-c j-c probeClass"></div>
                                    <text class="button-text" v-if="item.ellipsisText">{{item.ellipsisText}}</text>
                                    <text class="button-text" v-else>{{item.text}}</text>
                                </div>
                            </div>
                        </slider>
                        <div class="icon-buttons" v-else>
                            <div class="icon-button column" v-for="item in row.iconButtons" @click="onIconButtonClicked(item)"  v-if="!item.standbyHide">
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
        <!--模式参数设置弹窗-->
        <sf-dialog :show="show" :tabs="tabs" :device="constant.device" :working="isWorkingPage" :isProbe="cmdObj.isProbe.value" mainBtnColor="#267AFF" secondBtnColor="#267AFF" :confirmText="language.start" :cancelText="language.cancel" @close="closeDialog" @mideaDialogCancelBtnClicked="closeDialog" @mideaDialogConfirmBtnClicked="closeDialog">
            <div slot="content">
                <!--<template v-for="tab in tabs">-->
                <!--<text v-if="tab.active" class="content-title">{{tab.name}}</text>-->
                <!--</template>-->
                <!--<text v-if="currentItem" class="content-title" @click="showDetailModal">{{currentItem.text}}</text>-->
                <modal-header style="margin:0 -36px;" v-if="currentItem" :showRightImg="!detailEmpty && currentItem.mode === 0xE0" rightImg="img/header/public_ic_help@3x.png" class="modal-header b-b-1" :title="currentItem.text" titleText="#000000" :isImmersion="false"  :showLeftImg="false" @rightImgClick="showDetailModal"></modal-header>

                 <div v-for="(item, index) in accordions" class="modal-header">
                    <div v-if="item.type==='pickers'" >
                         <sf-accordion :type="item.type" v-if="currentItem && currentItem[item.key] && currentItem[item.key].set " :hms="setValue(item.key)" :unit="item.unit" :index="index" :title="item.subtitle" :isFolded="item.isFolded"  @callback="updateAccordionFoldingStatus">
                             <div slot="content">
                                 <!--<wx-picker :index="index" :data="range(item.key)" :target="item.key" :visible="true" @wxChange="handlePickerChange"></wx-picker>-->
                                 <time-picker :pickerIndex="index" :value="current[item.key]" :hms="constant.device.hms" @change="onChange"></time-picker>
                             </div>
                         </sf-accordion>
                    </div>
                    <div v-if="item.type==='picker' && (currentItem && currentItem[item.key] && (!currentItem[item.key].hide && isWorkingPage || !isWorkingPage))">
                        <sf-accordion :type="item.type" v-if="currentItem && currentItem[item.key] && currentItem[item.key].set && ((!cmdObj.isProbe.value && item.key!='probeTemperature') || (currentItem.probe && cmdObj.isProbe.value && !currentItem[item.key].isProbeThenThisHide)) " :value="setValue(item.key)" :unit="currentItem[item.key].unit||item.unit[constant.device.lang]||item.unit" :index="index" :title="language[item.key]" :isFolded="item.isFolded"  @callback="updateAccordionFoldingStatus">
                            <div slot="content">
                                <wx-picker :pickerIndex="index" :data="range(item.key)" :target="item.key" :visible="true" @wxChange="handlePickerChange"></wx-picker>
                            </div>
                        </sf-accordion>
                    </div>
                    <div v-if="item.type==='switch' && (currentItem && currentItem[item.key] && (!currentItem[item.key].hide && isWorkingPage || !isWorkingPage)) && !current.preheatHide">
                        <sf-accordion :type="item.type" v-if="currentItem && currentItem[item.key] && currentItem[item.key].set && ((!cmdObj.isProbe.value && item.key!='probeTemperature') || (currentItem.probe && cmdObj.isProbe.value && !currentItem[item.key].isProbeThenThisHide))  " :title="language[item.key]" index="-1" :hideArrow="item.hideArrow">
                            <div slot="right">
                                <midea-switch2 :itemKey="item.key" :checked="current[item.key]" @change="onPreheatChange" width="70" height="38" slot="value"></midea-switch2>
                            </div>
                        </sf-accordion>
                    </div>
                </div>
            </div>
        </sf-dialog>

        <detail-modal :show="showDetailVisibility" :showMask="false" @close="closeDetailModal">
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

        <!--警告弹窗-->
        <midea-dialog :title="warningDialog.title"
                      :show="warningDialog.show"
                      :single="true"
                      confirmText="我知道了"
                      @mideaDialogConfirmBtnClicked="knowClicked"
                      :content="warningDialog.content"
                      mainBtnColor="#FFB632"
        >
        </midea-dialog>

        <!--提示弹窗-->
        <midea-dialog :title="hintDialog.title"
                      :show="hintDialog.show"
                      :single="false"
                      :confirmText="hintDialog.confirmText"
                      :cancelText="hintDialog.cancelText"
                      @mideaDialogCancelBtnClicked="hintDialog.cancelCallback"
                      @mideaDialogConfirmBtnClicked="hintDialog.confirmCallback"
                      :content="hintDialog.content"
                      mainBtnColor="#FFB632"
        >
        </midea-dialog>

        <!--童锁遮罩-->
        <modal :show="modalVisibility">
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
        <!--<child-lock :modalVisibility="modalVisibility" :childLock="childLock" :closeModal="closeModal"></child-lock>-->
        
        <!--确定/取消弹窗-->
        <midea-actionsheet
            :items="[language.confirmClose]"
            :show="showBar"
            @close="closeActionsheet"
            @itemClick="actionsheetItemClick"
            @btnClick="actionsheetBtnClick"
            ref="actionsheet"
            :button="language.wait"
        ></midea-actionsheet>


         <!-- 工作页面 -->
        <div class="working_section all_section" v-if="isWorkingPage" :style="{height: wrapHeight}">
            <midea-header bgColor="transparent" leftImg="img/header/public_ic_back_white@3x.png" :title="constant.device.page_title" titleText="white" :isImmersion="true" :showLeftImg="true" @leftImgClick="back2Native">
                 <div slot="customerContent" class="header-top-wrapper">
                    <div class="header-top-inner-wrapper">
                        <!--<div class="header-right-image-wrapper" @click="openCloudRecipe">
                            <image class="header-right-image" :src="'img/header/public_ic_cloud_recipe@3x.png'"></image>
                        </div>-->
                        <div v-if="childLockVisibility('working')" class="header-right-image-wrapper" @click="childLock(true)">
                            <image class="header-right-image" :src="'img/header/public_ic_babylock@3x.png'"></image>
                        </div>
                        <!--<div class="header-right-image-wrapper" @click="openMorePage">
                            <image class="header-right-image" :src="'img/header/public_ic_lots@3x.png'"></image>
                        </div>-->
                    </div>
                </div>
            </midea-header>
             <!--测试copy指令-->
            <!--<div><text @click="setContent">下发指令:{{testCmd}}</text></div>-->
            <div class="onlongpressQuery"  @longpress="onlongpressQuery()"></div><!--隐藏长按组件触发03查询，方便调试-->
            <div class="progress_content">
                <div class="progress_section" :style="progress_style" > 
                    <!--倒计时组件-->
                    <div v-if="progressShow">
                        <midea-progresscycle-view class="circleprogress" :data="chartJson"></midea-progresscycle-view>
                    </div>
                    <!--探针模式-->
                    <div v-if="cmdObj.isProbe.value" class="time_section" :style="{ height: `${progress_radius*2}px`,width:`${progress_radius*2}px`}">
                        <div class="content_section">
                            <text :class="['number-text',timeShow && 'work_time',hasHour && 'hour_time']">{{probeProgress}}</text>
                        </div>
                        <div class="next_section">
                            <text class="number_next">{{probeTempText}}</text>
                        </div>
                    </div>
                    <!--非探针模式-->
                    <div v-if="!cmdObj.isProbe.value" class="time_section" :style="{ height: `${progress_radius*2}px`,width:`${progress_radius*2}px`}">
                        <div class="center_section">
                            <!--时tag-->
                            <div :class="['prev_section',hourMore10 && 'prev_section_more']">
                                <text class="number_prev" v-if="hasHour">{{language.hour}}</text>
                            </div>
                            <!--中间显示时分/预热完成/预热中/烹饪完成-->
                            <div class="content_section">
                                <text :class="['number-text',timeShow && 'work_time',hasHour && 'hour_time',hourMore10 && 'moreThen10Hour']">{{workSpecialStatusText}}</text>
                            </div>
                            <!--分tag-->
                            <div :class="['next_section',hourMore10 && 'next_section_more']">
                                <text class="number_next">{{tag_next}}</text>
                            </div>
                        </div>
                    </div>
                    <!--剩余时间文案-->
                    <div class="cen status_tag_section" :style="{width:`${progress_radius*2}px`}">
                        <text class="status_tag">{{statusTag}}</text>
                    </div>
                
                </div>
            </div>

            <!--设置参数-->
            <div class="detail_section" v-if="!finishStatus" @click="setting(cmdObj)">
                <div class="detail_item">
                    <text class="detail_text">{{cmdObj.mode.text}} {{cmdObj.temperatureText}}</text>
                </div>
                <div class="detail_item" v-if="hasSetting">
                    <div class="edit_section">
                        <image class="setting_icon" src="img/edit_icon@2x.png" ></image>
                    </div>
                </div>
            </div>
            <!--底部按钮-->
            <div class="footer_section" v-if="isFooterShow">
                <div class="btn_content">
                    <div class="btn_section">
                        <div class="image_section" @click="cancle">
                            <image class="icon_image" :src="cancleIcon"></image>
                        </div>
                        <div class="decs_section">
                            <text class="decs_text">{{cancleBtnText}}</text>
                        </div>
                    </div>
                    <div class="btn_section" v-if="hasStopOrContinueBtn" >
                        <div class="image_section" @click="startOrPause()">
                            <image class="icon_image" :src="btnSrc"></image>
                        </div>
                        <div class="decs_section" >
                            <text class="decs_text">{{btnText}}</text>
                        </div>

                        <!--预热完成引导-->
                        <div class="preheatFinishTig" v-if="preheatFinishTig">
                            <div class="preheat_tig_section">
                                <div><text class="preheat_tig">{{language.putIntoFoodMaterial}}</text></div>
                                <div><text class="preheat_tig" style="marginTop:10px">{{language.pressToStart}}</text></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  

            <!-- 炉灯 -->
            <!--<image :class="['light_icon',cmdObj.light.value && 'light_on']" :src="lightImg"  @click="sendLightCmd(cmdObj.light.value,tabs,constant.device)"></image>-->
            <light :hasLight="constant.device.hasLight" :lightValue="cmdObj.light.value" :event="sendLightCmd"></light>         
        </div>
    </div>
</template>

<script>
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
    import WxPicker from '@/component/sf/custom/picker_amui.vue';
    //  import WxPicker from '@/component/sf/custom/picker_time.vue';
    import timePicker from '@/component/sf/custom/timePicker.vue'
    import mideaDialog from '@/component/dialog.vue';
    import mideaActionsheet from '@/midea-component/actionsheet.vue'
    import light from "@/component/sf/common/light.vue";

    // config data
    // import modes from "./config/modes.js";
    // import autoMenu from "./config/auto-menu.js";

    import accordionMixin from "@/common/util/mixins/accordions"
    import deviceMessageMixin from "@/common/util/mixins/deviceMessage"
    import detailModalMixin from "@/common/util/mixins/detailModal"
    import commonMixin from "@/common/util/mixins/common"
    import copyMixin from "@/common/util/mixins/copy"
    import modalMixin from "@/common/util/mixins/modal"
    import weexData from "@/common/util/mixins/weexData"
    const globalEvent = weex.requireModule("globalEvent");


    // import constant from "./config/constant";
    import languages from '../mapping/_languages'

    export default {
        mixins: [commonMixin, deviceMessageMixin, accordionMixin, detailModalMixin,copyMixin,weexData,modalMixin],
        data(){
            return {
               
            }
        },
        props: {
            tabs:{
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
        components: {MideaHeader,sfDialog,mideaActionsheet,WxPicker,sfAccordion,mideaSwitch2, mideaDialog, detailModal,modal,modalHeader,rowWrapItems,light,timePicker},
        created(){
            this.isIos = weex.config.env.platform == "iOS" ? true : false;
            let self = this;
            let {constant,tabs} = this;
            this.srcollPaddingBottom = '80px';
            if(this.isip9()){
                this.srcollPaddingBottom = '50px';
            }
            if(this.isipx()){
                this.srcollPaddingBottom = '100px';
            }
            //模拟设备数据
            nativeService.initMockData({
                query: query
            });
            this.queryStatus(tabs,constant.device);
            // if(constant.device.standby03 && !this.isIos) {
            // if(!this.isIos) {
            //     this.queryRunTimer(10);//轮询 已放在解析指令那里处理
            // }
            if (this.isIos){
                this.listenerDeviceReiveMessage();
            }
            //安卓要加上这个方法，否则，工作页面，时间一直停留在一个状态，不会刷新
            if(!this.isIos){
                globalEvent.addEventListener("WXApplicationDidBecomeActiveEvent", (e) => {
                    //从后台转前台时触发
                    self.queryStatus(tabs,constant.device);
                    //  this.queryRunTimer(20);//20秒轮询 
                });
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
        computed: {
            progress_style(){
                let {wrapHeight,progress_radius} = this;
                return{
                    height: `${progress_radius * 2}px`,
                    width: `${progress_radius * 2}px`,
                    marginTop: `${wrapHeight/2-progress_radius*2-60}px`
                }
            },
            language(){
                return languages[this.getLang()];
            }
        },
        methods: {
            childLockVisibility(state){
                return !this.constant.device.hideChildLock || !this.constant.device.hideChildLock[state]
            },
            onChange(e){
                // nativeService.alert(e);
                this.$set(this.current, 'hms', JSON.parse(JSON.stringify(e.value)));
                // nativeService.alert(this.current['hms']);
            },
            isAutoMenuStyle: function(tab){
                return tab.rows[0].title && tab.rows[0].title !== 'mode'
            },
            onCloudMenuIconClicked(){
                if(this.isFun2Oven() && this.isProbeInserted(this.cmdObj)) {
                    this.setHintDialog({
                        show:true,
                        content: '主人，检测到烤箱插入了探针，云食谱目前不支持此功能，请取出探针后再操作。',
                        confirmText: '我知道了',
                        cancelText: '稍后再试',
                        cancelCallback: this.hideHintDialog,
                        confirmCallback: ()=>{
                            this.hideHintDialog();
                            this.openCloudMenuPage();
                        }
                    });
                    return;
                }

                this.openCloudMenuPage();
            },
            openCloudMenuPage: function(){
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
                if(!item.probe && this.cmdObj.isProbe.value){
                    nativeService.toast("主人，为了您的食物更美味，请在烤箱上操作探针模式。");
                    return;
                }
                this.currentItem = item;
                // nativeService.alert(this.currentItem);
                this.modeText = item.text;
                this.openDialog();
            },
            knowClicked(){
                this.show = false;
                // nativeService.alert(typeof this.warningDialog.callback);
                this.warningDialog.callback && this.warningDialog.callback();
                this.warningDialog = this.initWarningDialog();
                nativeService.backToNative();
            }
        }
    }
</script>


