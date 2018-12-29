<style lang="less" type="text/less">
    @import "../less/working.less";
</style>
<template>
    <div  class="all_section" @viewappear="viewappear()" @viewdisappear="viewdisappear">
        <midea-header bgColor="transparent" leftImg="img/header/public_ic_white.png" :title="constant.device.page_title" titleText="white" :isImmersion="true" :showLeftImg="true" @leftImgClick="back2Native"></midea-header>
        <div class="progress_content"  @longpress="onlongpressQuery()"><!--隐藏长按组件触发03查询，方便调试-->
            <div class="progress_section" :style="progress_style" > 
                <!--<wxcProgress :percent="progress" :progressShow="progressShow"
                    :wxc_radius='progress_radius'>

                </wxcProgress>
               <div class="animate_section" v-if="isWorking" :style="{left:`${progress_radius-50}px`}">
                    <image class="animate_circle" src="img/ellipsis_px_2.gif"></image>
                </div>-->
                <div v-if="progressShow">
                    <midea-progresscycle-view class="circleprogress" :data="chartJson"></midea-progresscycle-view>
                </div>

                <div v-if="cmdObj.isProbe.value" class="time_section" :style="{ height: `${progress_radius*2}px`,width:`${progress_radius*2}px`}">
                    <div class="content_section">
                        <text :class="['number-text',timeShow && 'work_time',hasHour && 'hour_time']">{{probeProgress}}</text>
                    </div>
                    <div class="next_section">
                        <text class="number_next">{{probeTempText}}</text>
                    </div>
                </div>
               
                <div v-if="!cmdObj.isProbe.value" class="time_section" :style="{ height: `${progress_radius*2}px`,width:`${progress_radius*2}px`}">
                    <div class="center_section">
                        <!--<text class="number-text">{{progress}} {{timeRemain}}</text>-->
                        <div :class="['prev_section',hourMore10 && 'prev_section_more']">
                            <text class="number_prev" v-if="hasHour">时</text>
                        </div>
                        <div class="content_section">
                            <text :class="['number-text',timeShow && 'work_time',hasHour && 'hour_time']">{{workSpecialStatusText}}</text>
                        </div>
                        <div class="next_section">
                            <text class="number_next">{{tag_next}}</text>
                        </div>
                    </div>
                </div>
                <div class="cen status_tag_section" :style="{width:`${progress_radius*2}px`}">
                    <text class="status_tag">{{statusTag}}</text>
                </div>
               
            </div>
        </div>

        <div class="detail_section" v-if="!finishStatus" @click="setting">
            <text class="detail_text">{{cmdObj.mode.text}} {{cmdObj.temperature.upLowTemperature>0?cmdObj.temperature.upLowTemperature:''}}</text>
            <text class="temp_text">{{cmdObj.temperature.upLowTemperature>0?"°":''}}</text>
        </div>
        <div class="detail_section" v-if="hasSetting">
            <div class="edit_section" @click="setting">
                <image class="setting_icon" src="img/edit_icon@2x.png" ></image>
            </div>
        </div>
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
                            <div><text class="preheat_tig">放入食物</text></div>
                            <div><text class="preheat_tig" style="marginTop:10px">点击开始</text></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 炉灯 -->
        <!--<image :class="['light_icon',cmdObj.light.value && 'light_on']" :src="lightImg"  @click="sendLightCmd(cmdObj.light.value,tabs,constant.device)"></image>-->
        <light :lightValue="cmdObj.light.value" :event="sendLightCmd"></light>

         <!--模式参数设置弹窗-->
        <sf-dialog :show="show" :device="constant.device" :working="true"  :isProbe="cmdObj.isProbe.value" mainBtnColor="#267AFF" secondBtnColor="#267AFF" confirmText="开始" @close="closeDialog" @mideaDialogCancelBtnClicked="closeDialog" @mideaDialogConfirmBtnClicked="closeDialog">
            <div slot="content">
                <!--<template v-for="tab in tabs">-->
                <!--<text v-if="tab.active" class="content-title">{{tab.name}}</text>-->
                <!--</template>-->
                <!--<text v-if="currentItem" class="content-title" @click="showDetailModal">{{currentItem.text}}</text>-->
                <modal-header style="margin:0 -36px;" v-if="currentItem" :showRightImg="!detailEmpty && currentItem.mode === 0xE0" rightImg="img/header/public_ic_help@3x.png" class="modal-header" :title="currentItem.text" titleText="#666666" :isImmersion="false"  :showLeftImg="false" @rightImgClick="showDetailModal"></modal-header>

                <div v-if="currentItem && currentItem.probe && cmdObj.isProbe.value">
                    <sf-accordion :value="setValue('probeTemperature')" unit="°C" title="设置探针温度" isFolded="true"  @callback="updateAccordionFoldingStatus">
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
                        <div v-if="item.type==='picker' && (currentItem && currentItem[item.key] && !currentItem[item.key].hide)">
                            <sf-accordion :type="item.type" v-if="currentItem && currentItem[item.key] && currentItem[item.key].set" :value="setValue(item.key)" :unit="item.unit" :index="index" :title="item.subtitle" :isFolded="item.isFolded"  @callback="updateAccordionFoldingStatus">
                                <div slot="content">
                                    <wx-picker  :data="range(item.key)" :target="item.key" :visible="true" @wxChange="handlePickerChange"></wx-picker>
                                </div>
                            </sf-accordion>
                        </div>
                        <div v-if="item.type==='switch' && (currentItem && currentItem[item.key] && !currentItem[item.key].hide)">
                            <sf-accordion :type="item.type" v-if="currentItem && currentItem[item.key] && currentItem[item.key].set" :title="item.subtitle" index="-1" :hideArrow="item.hideArrow">
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
                <modal-header  leftImg="img/header/public_ic_gray@3x.png" class="modal-header" :title="modeText" titleText="#666666" :isImmersion="false"  :showLeftImg="true" @leftImgClick="closeDetailModal"></modal-header>
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
        <lock-modal :show="modalVisibility" @close="closeModal">
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
        </lock-modal>


        <!--故障提示弹窗-->
        <midea-dialog :title="warningDialogTitle"
                        :show="warningDialogShow"
                        :single="true"
                        noFooter="true"
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

<script>
    import MideaHeader from '@/midea-component/header.vue'
    import modalHeader from '@/component/sf/custom/modal-header.vue'
    // import mideaItem from '@/midea-component/item.vue'
    import nativeService from "@/common/services/nativeService";
    // import cmdFun from "./utils/util.js"; //解析指令
    import query from "../../dummy/query";
    import sfAccordion from '@/component/sf/custom/accordion.vue'
    import sfDialog from '@/component/sf/custom/dialog.vue'
    import detailModal from '@/component/sf/custom/detail-modal.vue'
    import lockModal from '@/component/sf/custom/modal.vue'
    import WxPicker from '@/component/sf/custom/picker_amui.vue';
    import mideaDialog from '@/component/dialog.vue';
    import mideaActionsheet from '@/midea-component/actionsheet.vue'
    import mideaSwitch2 from '@/midea-component/switch2.vue'
    import light from "@/component/sf/common/light.vue";
    import cmdFun from "../util/command/util.js"; //解析指令

    // config data
    // import modes from "./config/modes.js";
    // import autoMenu from "./config/auto-menu.js";

    import accordionMixin from  "@/common/util/mixins/accordions"
    import deviceMessageMixin from  "@/common/util/mixins/deviceMessage"
    import detailModalMixin from  "@/common/util/mixins/detailModal"
    import commonMixin from  "@/common/util/mixins/common"
    import workingData from  "@/common/util/mixins/workingData"
    import copyMixin from  "@/common/util/mixins/copy"
    import modalMixin from  "@/common/util/mixins/modal"

    const storage = weex.requireModule('storage')
    const platform = weex.config.env.platform;//weex没有window对象，调试需要区分下
    const globalEvent = weex.requireModule("globalEvent");
    // const animation = weex.requireModule('animation');
    // const modal = weex.requireModule('modal');
    export default {
        mixins: [commonMixin,deviceMessageMixin, accordionMixin, workingData,detailModalMixin,copyMixin,modalMixin],
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
        components: {MideaHeader, mideaDialog, mideaActionsheet,sfDialog,WxPicker,modalHeader,detailModal,lockModal,sfAccordion,mideaSwitch2,light},
        created(){
            var self = this;
            let {constant,tabs} = this;
           // 模拟设备数据,正式上线，可不注销
            nativeService.initMockData({
                query: query
            });
            this.queryStatus(tabs,constant.device);
            this.queryRunTimer(20);//20秒轮询 
            this.isIos = weex.config.env.platform == "iOS" ? true : false;
            if (this.isIos){
                this.listenerDeviceReiveMessage();
            }
            
            //安卓要加上这个方法，否则，工作页面，时间一直停留在一个状态，不会刷新
            if(!this.isIos){
                globalEvent.addEventListener("WXApplicationDidBecomeActiveEvent", (e) => {
                    //从后台转前台时触发
                    self.queryStatus(tabs);
                     this.queryRunTimer(20);//20秒轮询 
                });
            }
        },
        computed: {
            progress_style(){
                let {wrapHeight,progress_radius} = this;
                return{
                    height: `${progress_radius * 2}px`,
                    width: `${progress_radius * 2}px`,
                    marginTop: `${wrapHeight/2-progress_radius*2 -60}px`
                }
            }
        },
        mounted() {
            //this.moveTest();
        },
        methods: {    
            cancle(){
                var self = this;
                if(this.finishStatus){
                    this.cancleWorking();
                }else{
                    this.openActionsheet();            
                }
            },
            setting(){
                if(!this.hasSetting){
                    return;
                }
                var _isRecipe = false;
                let {constant,tabs} = this;
                
                if(this.cmdObj.mode.value == 0xE0){
                    _isRecipe = true;
                }
                var _item = cmdFun.getCurrentModeItem(tabs,this.cmdObj.recipeId.value,this.cmdObj.mode.value,_isRecipe);
                
                this.modeText = _item.text;
                this.currentItem = _item;
                // nativeService.alert(this.currentItem);
                var time = this.cmdObj.timeRemaining.hour*60+this.cmdObj.timeRemaining.minute;
                if(_item.time.range.length>0){
                    let leastTime = _item.time.range[0];
                    if(time<leastTime){
                        time = leastTime;
                    }
                }
                // nativeService.alert(time);
                this.current.time = time;
                this.current.temperature = this.cmdObj.temperature.upLowTemperature;
                this.currentItem.preheat.default = this.cmdObj.displaySign.preheat?true:false;
                this.current.fireAmount = this.cmdObj.fire.value;
                this.current.steamAmount = this.cmdObj.steam.value;
                // this.currentItem.steamSwitch.default = this.cmdObj.steam.value?true:false;
                this.current.weight = this.cmdObj.weight.value;
                this.current.probeTemperature = this.cmdObj.probeSetttingTemperature.value;
                // nativeService.toast(this.current,3);
                
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
                
                if(event.index == 0){
                   this.cancleWorking();
                }
               
            },
            //点击取消/确定按钮事件
            actionsheetBtnClick: function () {
                this.showBar = false;
            },
            //  moveTest(val = 0) {
            //     var self = this;
            //     var testEl = this.$refs.modeBox;
            //     animation.transition(
            //         testEl,
            //         {
            //             styles: {
            //                 transform: "rotate(" + val +"deg)",
            //             },
            //             duration: 3000, //ms
            //             timingFunction: "linear",
            //             delay: 0 //ms
            //         },
            //         function() {
            //            if(self.isTimerStop){
            //                val = val;
            //                self.moveTest(val);
            //            }else{
            //                 val = val + 360;
            //                 self.moveTest(val);
            //            }
                      
            //         }
            //     );
            // },
        }
    }
</script>


