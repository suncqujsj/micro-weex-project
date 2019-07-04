<template>
    <div class="wrapper">
        <div class="content" :style="{height: wrapHeight}">
            <midea-ppvideo-view v-if="ppvideo_initdata.user" ref="ppvideo" class="video" :style="{height:videoHeight}" :data="ppvideo_initdata" @Login="event" @VideoStatus="event"></midea-ppvideo-view>

            <!--录像按钮-->
            <image class="record-icon" :src="recordIcon" @click="record"></image>

            <!--拍照按钮-->
            <image class="camera-icon" :src="'img/particular/video_camera_icon.png'" @click="captureImage"></image>

        </div>

        <sf-state v-if="state" :display="state.display" :text="state.text" :type="state.type"></sf-state>

        <!--<scroller class="scroller">-->
            <!--<midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="开始" @mideaButtonClicked="start"/>-->
            <!--<midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="停止" @mideaButtonClicked="stop"/>-->
            <!--<midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="开始录像" @mideaButtonClicked="recordStart"/>-->
            <!--<midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="停止录像" @mideaButtonClicked="recordStop"/>-->
            <!--<midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="截图" @mideaButtonClicked="captureImage"/>-->
            <!--<midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="查询权限" @mideaButtonClicked="getPhotoLibraryAuthorizationStatus"/>-->
            <!--<midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="获取权限" @mideaButtonClicked="requestPhotoLibraryAuthorization"/>-->
        <!--</scroller>-->

        <midea-header class="fixed-top" titleText="white" :title="countingText" bgColor="transparent" leftImg="img/header/public_ic_back_white@3x.png"  @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png"></midea-header>

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

    </div>
</template>
<style lang="less" type="text/less" scoped>
    @import (reference) '../../less/common';
    .wrapper {
        background-color: #000000;
    }
    .content{
        width:750px;
        .row;
        .j-c;
        .a-c;
    }
    .video {
        width: 750px;
    }

    .record-icon{
        .square(56*2px);
        .pos(a);
        left: 319px;
        bottom:72px;
    }

    .camera-icon{
        width: 68px;
        height: 56px;
        .pos(a);
        right: 124px;
        bottom:100px;
    }

    .fixed-top{
        .fixed_top;
    }
    .scroller {
        padding-top: 20px;
        padding-bottom: 50px;
    }
</style>
<script>
    import base from "@/midea-demo/base";
    import mideaButton from "@/midea-component/button.vue";
    import sfState from "@/midea-component/sf/custom/state.vue";
    import mideaDialog from '@/midea-component/dialog.vue';


    import nativeService from "@/common/services/nativeService";
    const ppvideoModule = weex.requireModule("ppVideoModule");
    import commonMixin from  "@/common/util/mixins/common.js"
    var globalEvent = weex.requireModule('globalEvent');
    const modal = weex.requireModule('modal')

    let [width, height] = [640, 360]; //config
    const shortestVideoTime = 10;

    module.exports = {
        components: { mideaButton, sfState, mideaDialog},
        mixins: [base, commonMixin],
        data() {
            return {
                ppvideo_initdata: {
                    user: null, // userId auth，必填3项字段之一
                    password: "",
                    serverAdd: "120.55.73.80:7781", // userId auth，必填3项字段之一
                    relayAddr: "",
                    iP2PTryTime: 1,
                    sInitParam: "(Debug){1}",
                    sVideoParam: "(MaxStream){0}",
                    sAudioParam: ""
                },
                sn32: null,
                user: null,
                recording:false,
                t:null,
                second:0,
                frmplay:0,
                tt:null,
                loading:false,
                ttt: null,
                cooking:true,
                ground:'foreground'
            };
        },
        props:{
            constant:{
                type: Object,
                default: () => ({})
            }
        },
        computed:{
            countingText(){
                return this.second ? this.hms() : '';
            },
            videoHeight(){
                return 750*height/640 +'px' ;
            },
            recordIcon(){
                return `img/particular/video_${this.recording ? 'recording' : 'record'}_icon.png`
            },
        },
        mounted(){
            // this.setVideoModeSize();
            this.init();
            this.prePageName = this.getUrlParam(weex.config.bundleUrl, 'pageName');
        },
        created(){
            // nativeService.alert(weex.config.bundleUrl);
            this.initLoading();
            this.getPhotoLibraryAuthorizationStatus();
            this.requestPhotoLibraryAuthorization();

            this.timingQuery();
            this.onAppToggle();
        },
        methods: {
            foreground2backgroundCallback(){

            },

            background2foreground(){},

            getPageName(){
                return 'videoPage';
            },

            getPrePageName(){
                return this.prePageName;
            },

            hms(){
                let [h,m,s] = [0,0,0];
                h = Math.floor(this.second/3600);
                m = Math.floor(this.second/60);
                s = this.second%60;

                return `${this.addZero(h)}:${this.addZero(m)}:${this.addZero(s)}`
            },

            addZero(n){
                return n<10 ? ('0' + n) : n;
            },

            async init(){
                let userInfo = await nativeService.getUserInfo();
                userInfo.mobile && (this.ppvideo_initdata.user = userInfo.mobile);
                let deviceInfo = await nativeService.getDeviceInfo();
                if(deviceInfo.result && deviceInfo.result.deviceSn) {
                    this.sn32 = deviceInfo.result.deviceSn;
                }
                this.setVideoModeSize();
            },

            setVideoModeSize(){
                let param = {
                    api: "setVideoModeSize",
                    params: {
                        mode: 5,
                        width,
                        height
                    }
                };
                let context = this;
                ppvideoModule.ppvideoInterface(
                    context.$refs.ppvideo,
                    param, (result)=>{
                        // nativeService.alert('success');
                        context.start();
                    } ,(result)=>{
                        nativeService.alert('error');
                    })
            },
            start() {
                // nativeService.alert(this.sn32);
                // return;
                let context = this;
                ppvideoModule.ppvideoInterface(
                    context.$refs.ppvideo,
                    {
                        api: "startLive",
                        params: { captureId: context.sn32 } // device sn，必填3项字段之一
                    },
                    () => {
                        // nativeService.toast("start 成功");
                    },
                    () => {
                        nativeService.toast("初始化失败");
                    }
                );
            },
            stop() {

                ppvideoModule.ppvideoInterface(
                    this.$refs.ppvideo,
                    {
                        api: "stopLive",
                        params: {  }
                    },
                    () => {
                        nativeService.toast("stop 成功");
                    },
                    () => {
                        // nativeService.toast("stop failed");
                    }
                );
            },
            updateRecordState(){
                this.recording = !this.recording;
            },
            record(){
                let action_result = this.recording ? 0 : 1;
                this.statisticsUpload({subAction:'shoot_video_icon_click', action_result});
                if(!this.recording) {
                    this.recordStart();
                    return;
                }

                this.recordStop();
            },
            recordStart() {
                let context = this;
                ppvideoModule.ppvideoInterface(
                    this.$refs.ppvideo,
                    {
                        api: "startRecord",
                        params:{}
                    },
                    () => {
                        nativeService.toast("开始录屏");
                        context.updateRecordState();
                        context.startCounting();
                    },
                    () => {
                        nativeService.toast("开始录屏失败");
                    }
                );
            },
            startCounting(){
                this.t  = setInterval(
                    ()=>{
                        // nativeService.toast(this.countingText)
                        // !this.loading && ++this.second;
                        ++this.second;
                    }, 1000
                );
            },
            recordStop() {

                if(this.second< shortestVideoTime) {
                    nativeService.toast(`录屏最短时间为${shortestVideoTime}秒`);
                    return;
                }

                let context = this;
                ppvideoModule.ppvideoInterface(
                    this.$refs.ppvideo,
                    {
                        api: "stopRecord",
                        params:{}
                    },
                    () => {
                        nativeService.toast("视频保存成功");
                        context.updateRecordState();
                        context.stopCounting();
                    },
                    () => {
                        nativeService.toast("视频保存失败");
                    }
                );
            },
            stopCounting(){
                clearInterval(this.t);
                this.second = 0;
            },
            captureImage() {
                this.statisticsUpload({subAction:'take_picture_icon_click'});
                ppvideoModule.ppvideoInterface(
                    this.$refs.ppvideo,
                    {
                        api: "captureImage",
                        params:{}
                    },
                    () => {
                        nativeService.toast("拍照保存成功");
                    },
                    () => {
                        nativeService.toast("拍照保存失败");
                    }
                );
            },
            getPhotoLibraryAuthorizationStatus() {
                ppvideoModule.ppvideoInterface(
                    this.$refs.ppvideo,
                    {
                        api: "getPhotoLibraryAuthorizationStatus",
                        params:{}
                    },
                    (result) => {
                        nativeService.toast("getPhotoLibraryAuthorizationStatus 成功"+result.status);
                    },
                    (result) => {
                        nativeService.toast("getPhotoLibraryAuthorizationStatus failed");
                    }
                );
            },

            requestPhotoLibraryAuthorization() {
                ppvideoModule.ppvideoInterface(
                    this.$refs.ppvideo,
                    {
                        api: "requestPhotoLibraryAuthorization",
                        params:{}
                    },
                    (result) => {
                        nativeService.toast("requestPhotoLibraryAuthorization 成功"+result.status);
                    },
                    (result) => {
                        nativeService.toast("requestPhotoLibraryAuthorization failed");
                    }
                );
            },
            initLoading(){
                this.tt = setInterval(()=>{
                    if(!this.frmplay) {
                        this.showLoading();
                        return;
                    }
                    this.hideLoading();
                    clearInterval(this.tt);
                },1000);
            },
            event(event){

                if(!this.cooking) {
                    this.hideLoading();
                    return;
                }

                // nativeService.toast('event sData:' +event.sData+",sRender:"+event.sRender);
                let paramsArr = event.sData.split('&');
                for(let param of paramsArr) {
                    let pair = param.split('=');
                    if(pair[0] === 'frmplay') {
                        let frmplay = pair[1];
                        if(this.frmplay === frmplay) {
                            this.showLoading();
                            this.loading = true;
                            return;
                        }

                        if(!this.frmplay && frmplay) {
                            this.pageViewStatistics(); // 上报视频加载时间
                        }

                        this.frmplay = frmplay;
                        this.hideLoading();
                        this.loading = false;
                    }
                }
            },
            showLoading(){
                this.showState('加载中...');
            },
            hideLoading(){
                this.hideState();
            },

            timingQuery(){
                const TIME = 1000;
                let context = this;
                this.ttt = setInterval(function(){
                    context.getDeviceStatus(context.handleScreenRecord);
                }, TIME);
            },

            handleScreenRecord(statusArray){
                let byte11 = parseInt(statusArray[11]);
                // nativeService.toast(byte11);
                let ingArr = [3,6,7];
                if(ingArr.indexOf(byte11) > -1 ) {
                    return;
                }

                this.cooking = false;
                let doneArr = [1,2,4]; //非工作状态

                if(!this.recording){
                    this.setWarningDialog("视频直播已结束", this.back);
                  return;
                }

                this.recordStop();
                clearInterval(this.ttt);
                this.setWarningDialog("视频已自动保存", this.back);
            },

            knowClicked(){
                this.show = false;
                this.warningDialog.callback && this.warningDialog.callback();
                // this.warningDialog = this.initWarningDialog();
            }
        }
    };
</script>