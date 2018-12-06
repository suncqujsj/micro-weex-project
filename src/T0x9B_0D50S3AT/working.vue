<template>
    <div class="all_section"  @viewappear="viewappear" @viewdisappear="viewdisappear">
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

         <!--模式参数设置弹窗 isWorkingPage是否为工作页面-->
         <!--1.show 是否显示组件 2.modeText 组件标题 3.accordions 弹窗参数初始设置 4.currentItem 当前选中的模式初始对象 5.current 当前变化的对象 
             6.handlePickerChange picker滑动选择的回调 7.foldCallback 是否收起 accordion组件 8.cancelCallback 取消按钮的回调  9.sureCallback 确定按钮的回调
         -->
        <setting-dialog 
            :isWorkingPage="true"
            :modeText="modeText"
            :show="showSettingDialog"  
            :accordions="accordions" 
            :currentItem="currentItem" 
            :current="current"
             @handlePickerChange="_handlePickerChange" 
             @foldCallback="_foldCallback"
             @cancelCallback="_cancelCallback"
            @sureCallback="_sureCallback"
        ></setting-dialog>



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
    @import "./assets/style/working.less";
</style>

<script>
    const storage = weex.requireModule('storage')
    import MideaHeader from '@/midea-component/header.vue'
   
    // import mideaItem from '@/midea-component/item.vue'
    import nativeService from "../common/services/nativeService";
    import cmdFun from "./utils/util.js"; //解析指令
    import query from "../dummy/query";
    import {wxcProgress, wxProgress} from "@/component/sf/wx-progress";
   
    import settingDialog from '@/component/sf/custom/settingDialog.vue'
    import mideaDialog from '@/component/dialog.vue';
    import mideaActionsheet from '@/midea-component/actionsheet.vue'

    // config data
    import modes from "./config/modes.js";
    import autoMenu from "./config/auto-menu.js";

    import deviceMessageMixin from  "./utils/mixins/deviceMessage"
    import workingData from  "./utils/mixins/workingData"
    import settingDialogMixin from  "./utils/mixins/settingDialogData"
    // import detailModalMixin from  "./utils/mixins/detailModal"

    const platform = weex.config.env.platform;//weex没有window对象，调试需要区分下
    const globalEvent = weex.requireModule("globalEvent");
    const animation = weex.requireModule('animation');
    const modal = weex.requireModule('modal');
    export default {
        mixins: [deviceMessageMixin, workingData,settingDialogMixin],
        data(){
            return {
            
            }
        },
        components: {MideaHeader,wxcProgress,wxProgress, mideaDialog,settingDialog, mideaActionsheet},
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
                nativeService.startCmdProcess(
                    "control",
                    deviceCmd,
                    function(result){
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
                this.current.time = time;
                this.current.temperature = this.cmdObj.temperature.upLowTemperature;
                this.currentItem.preheat.default = this.cmdObj.displaySign.preheat?true:false;
                this.current.fireAmount = this.cmdObj.fire.value;
                this.current.steamAmount = this.cmdObj.steam.value;
                //nativeService.toast(this.current,3);
                // this.accordions = accordions;
               // nativeService.alert(this.currentItem);
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
                        var _iconButtons = currentModes[i].iconButtons;
                        for(var m=0; m<_iconButtons.length; m++){
                           
                            if(this.cmdObj.mode.value == _iconButtons[m].mode){
                                _item = _iconButtons[m];
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
                //nativeService.alert(event);
                if(event.index == 0){
                   this.cancleWorking();
                }
               
            },
            cancleWorking(){
                var self = this;
                var deviceCmd = cmdFun.cmdCancelWork();
                nativeService.startCmdProcess(
                    "control",
                    deviceCmd,
                    function(result){
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
        }
    }
</script>


