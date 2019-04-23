<template>
    <div class="wrapper" >
        <midea-header class="fixed-top" titleText="white" :title="title" bgColor="transparent" leftImg="img/header/public_ic_back_white@3x.png"  @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <div class="content" :style="{height: wrapHeight}">
            <midea-ppvideo-view v-if="ppvideo_initdata.user" ref="ppvideo" class="video" :style="{height:videoHeight}" :data="ppvideo_initdata" @Login="event" @VideoStatus="event"></midea-ppvideo-view>

            <!--录像按钮-->
            <image class="record-icon" :src="recordIcon" @click="record"></image>

            <!--拍照按钮-->
            <image class="camera-icon" :src="'img/particular/video_camera_icon.png'" @click="captureImage"></image>

        </div>

        <!--<scroller class="scroller">-->
            <!--<midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="开始" @mideaButtonClicked="start"/>-->
            <!--<midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="停止" @mideaButtonClicked="stop"/>-->
            <!--<midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="开始录像" @mideaButtonClicked="recordStart"/>-->
            <!--<midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="停止录像" @mideaButtonClicked="recordStop"/>-->
            <!--<midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="截图" @mideaButtonClicked="captureImage"/>-->
            <!--<midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="查询权限" @mideaButtonClicked="getPhotoLibraryAuthorizationStatus"/>-->
            <!--<midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="获取权限" @mideaButtonClicked="requestPhotoLibraryAuthorization"/>-->
        <!--</scroller>-->
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
    import nativeService from "@/common/services/nativeService";
    const ppvideoModule = weex.requireModule("ppVideoModule");
    import commonMixin from  "@/common/util/mixins/common.js"

    let [width, height] = [640, 360]; //config

    module.exports = {
        components: { mideaButton },
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
                second:0
            };
        },
        computed:{
            title(){
                if(!this.second) {
                    return '';
                }
                return this.hms();
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
        },
        created(){
            this.getPhotoLibraryAuthorizationStatus();
            this.requestPhotoLibraryAuthorization();
        },
        methods: {

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
                        nativeService.toast("start 成功");
                    },
                    () => {
                        nativeService.toast("start failed");
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
                        nativeService.toast("stop failed");
                    }
                );
            },
            updateRecordState(){
                this.recording = !this.recording;
            },
            record(){
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
                        nativeService.toast("RecordStart 成功");
                        context.updateRecordState();
                        context.startCounting();
                    },
                    () => {
                        nativeService.toast("RecordStart failed");
                    }
                );
            },
            startCounting(){
                this.t  = setInterval(
                    ()=>{
                        ++this.second;
                    }, 1000
                );
            },
            recordStop() {
                let context = this;
                ppvideoModule.ppvideoInterface(
                    this.$refs.ppvideo,
                    {
                        api: "stopRecord",
                        params:{}
                    },
                    () => {
                        nativeService.toast("RecordStop 成功");
                        context.updateRecordState();
                        context.stopCounting();
                    },
                    () => {
                        nativeService.toast("RecordStop failed");
                    }
                );
            },
            stopCounting(){
                clearInterval(this.t);
                this.second = 0;
            },
            captureImage() {
                ppvideoModule.ppvideoInterface(
                    this.$refs.ppvideo,
                    {
                        api: "captureImage",
                        params:{}
                    },
                    () => {
                        nativeService.alert("captureImage 成功");
                    },
                    () => {
                        nativeService.toast("captureImage failed");
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
            event(event){
                // nativeService.toast('event sData:' +event.sData+",sRender:"+event.sRender);
            }
        }
    };
</script>