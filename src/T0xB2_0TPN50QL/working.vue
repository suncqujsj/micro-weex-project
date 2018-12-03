<template>
    <div class="all_section" :style="{height: wrapHeight}"  @viewappear="viewappear" @viewdisappear="viewdisappear">
        <midea-header leftImg="assets/img/header/public_ic_back@3x.png" title="蒸汽炉" titleText="white" bgColor="" :isImmersion="true"  :showLeftImg="true" @leftImgClick="goBack"></midea-header>
        <div class="progress_content"  @longpress="onlongpressQuery"><!--隐藏长按组件触发03查询，方便调试-->
            <div class="progress_section" :style="progress_style" > 
                <wxcProgress :percent="progress" :progressShow="progressShow"
                    :wxc_radius='progress_radius'>

                </wxcProgress>
                <!--<div class="animate_section" ref="modeBox" :style="{top:`${-progress_radius-9}px`}">
                    <image class="animate_circle" src="assets/img/oval_2@2x.png"></image>
                </div>-->
                <!--<midea-progresscycle-view class="circleprogress" :data="chartJson"></midea-progresscycle-view>-->
                <div class="time_section" :style="{ height: `${progress_radius*2}px`,width:`${progress_radius*2}px`}">
                  
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
                <image class="setting_icon" src="assets/img/edit_icon@2x.png" ></image>
            </div>
        </div>
        <div class="footer_section">
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
                    <div class="image_section" @click="startOrPause">
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

         <!--模式参数设置弹窗-->
        <sf-dialog :show="show" confirmText="开始" @close="closeDialog" @mideaDialogCancelBtnClicked="closeDialog" @mideaDialogConfirmBtnClicked="closeDialog">
            <div slot="content">
                <!--<template v-for="tab in tabs">-->
                <!--<text v-if="tab.active" class="content-title">{{tab.name}}</text>-->
                <!--</template>-->
                <!--<text v-if="currentItem" class="content-title" @click="showDetailModal">{{currentItem.text}}</text>-->
                <modal-header style="margin:0 -36px;" v-if="currentItem" :showRightImg="!detailEmpty && currentItem.mode === 0xE0" rightImg="assets/img/header/public_ic_help@3x.png" class="modal-header" :title="currentItem.text" titleText="#666666" :isImmersion="false"  :showLeftImg="false" @rightImgClick="showDetailModal"></modal-header>

                <template v-for="(item, index) in accordions">
                    <template v-if="item.type==='picker'">
                        <sf-accordion v-if="currentItem && currentItem[item.key].set" :value="setValue(item.key)" :unit="item.unit" :index="index" :title="item.subtitle" :isFolded="item.isFolded"  @callback="updateAccordionFoldingStatus">
                            <div slot="content">
                                <wx-picker  :data="range(item.key)" :target="item.key" :visible="true" @wxChange="handlePickerChange"></wx-picker>
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

        <detail-modal :show="showDetailVisibility" @close="closeDetailModal">
            <div slot="title">
                <modal-header  leftImg="assets/img/header/public_ic_gray@3x.png" class="modal-header" :title="modeText" titleText="#666666" :isImmersion="false"  :showLeftImg="true" @leftImgClick="closeDetailModal"></modal-header>
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

<style lang="less" type="text/less">
    @import "./assets/style/working.less";
</style>

<script>
    const storage = weex.requireModule('storage')
    import MideaHeader from '@/midea-component/header.vue'
    import modalHeader from '@/component/sf/custom/modal-header.vue'
    // import mideaItem from '@/midea-component/item.vue'
    import nativeService from "../common/services/nativeService";
    import cmdFun from "./utils/util.js"; //解析指令
    import query from "../dummy/query";
    import {wxcProgress, wxProgress} from "@/component/sf/wx-progress";
    import sfAccordion from '@/component/sf/custom/accordion.vue'
    import sfDialog from '@/component/sf/custom/dialog.vue'
    import detailModal from '@/component/sf/custom/detail-modal.vue'
    import WxPicker from '@/component/sf/custom/picker.vue';
    import mideaDialog from '@/component/dialog.vue';
    import mideaActionsheet from '@/midea-component/actionsheet.vue'
    import mideaSwitch2 from '@/midea-component/switch2.vue'

        // config data
    import modes from "./config/modes.js";
    import autoMenu from "./config/auto-menu.js";

    import accordionMixin from  "./utils/mixins/accordions"
    import deviceMessageMixin from  "./utils/mixins/deviceMessage"
    import workingData from  "./utils/mixins/workingData"
    import detailModalMixin from  "./utils/mixins/detailModal"

    const platform = weex.config.env.platform;//weex没有window对象，调试需要区分下
    const globalEvent = weex.requireModule("globalEvent");
    const animation = weex.requireModule('animation');
    const modal = weex.requireModule('modal');
    export default {
        mixins: [deviceMessageMixin, accordionMixin, workingData,detailModalMixin],
        data(){
            return {
              
               
            }
        },
        components: {MideaHeader,wxcProgress,wxProgress, mideaDialog, mideaActionsheet,sfDialog,WxPicker,modalHeader,detailModal,sfAccordion,mideaSwitch2},
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
            
            //安卓要加上这个方法，否则，工作页面，时间一直停留在一个状态，不会刷新
            if(!this.isIos){
                globalEvent.addEventListener("WXApplicationDidBecomeActiveEvent", (e) => {
                    //从后台转前台时触发
                    self.queryStatus();
                    self.queryRunTimer(20);//20秒轮询 
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
            startOrPause(){
                var self = this;
                var record = 3;
                if(this.btnText == "暂停"){
                    record = 6;
                }
                 if(this.btnText == "继续" || this.btnText == "开始"){
                    record = 3;
                }
                
                var deviceCmd = cmdFun.cmdStartOrPause(record);
                nativeService.showLoading();
                nativeService.startCmdProcess(
                    "control",
                    deviceCmd,
                    function(result){
                        nativeService.hideLoading();
                        self.queryStatus();
                    },
                    function(result){
                         nativeService.toast('控制失败，请检查网络或者设置的参数');
                        //console.log('fail', result);
                    }
                )
            },
            setting(){
                if(!this.hasSetting){
                    return;
                }
                var _isRecipe = false;
                if(this.cmdObj.mode.value == 0xE0){
                    _isRecipe = true;
                }
                var _item = this.getCurrentItem(_isRecipe);
                
                this.modeText = _item.text;
                this.currentItem = _item;
                // nativeService.alert(this.currentItem);
                var time = this.cmdObj.timeRemaining.hour*60+this.cmdObj.timeRemaining.minute;
                if(this.tag_next == '秒'){//倒计时为秒时，都设置1分钟
                    time = 1;
                }
                if(this.cmdObj.mode.value != 0x20){//因为除了蒸汽模式，时间范围1到300，其他模式都是最低值为5，所以最低值为5的模式，工作中设置时间，要强行最小值置为5
                    if(time<5){
                        time = 5;
                    }
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
                
                if(event.index == 0){
                   this.cancleWorking();
                }
               
            },
            cancleWorking(){
                var self = this;
                var deviceCmd = cmdFun.cmdCancelWork();
                nativeService.showLoading();
                nativeService.startCmdProcess(
                    "control",
                    deviceCmd,
                    function(result){
                      nativeService.hideLoading();
                      self.queryStatus();
                    },
                    function(result){
                        nativeService.toast('控制失败，请检查网络或者设置的参数');
                        //console.log('fail', result);
                    }
                )
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


