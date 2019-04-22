<template>
    <div class="wrapper">
        <midea-header title="烤箱实时监控" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <midea-ppvideo-view v-if="deviceId && ppvideo_initdata.user" ref="ppvideo" class="video" :style="{height:videoHeight}" :data="ppvideo_initdata" @Login="event" @VideoStatus="event"></midea-ppvideo-view>
        <!--<midea-ppvideo-view ref="ppvideo" class="video" :ppvideo_initdata="ppvideo_initdata" @Login="event" @VideoStatus="event"></midea-ppvideo-view>-->
        <scroller class="scroller">
            <midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="开始" @mideaButtonClicked="start"/>
            <midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="停止" @mideaButtonClicked="stop"/>
            <midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="开始录像" @mideaButtonClicked="recordStart"/>
            <midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="停止录像" @mideaButtonClicked="recordStop"/>
            <midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="截图" @mideaButtonClicked="captureImage"/>
            <midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="查询权限" @mideaButtonClicked="getPhotoLibraryAuthorizationStatus"/>
            <midea-button :btnStyle="{'margin-top': '15px','margin-bottom': '15px'}" text="获取权限" @mideaButtonClicked="requestPhotoLibraryAuthorization"/>
        </scroller>
    </div>
</template>
<style lang="less" type="text/less" scoped>
    //@import (reference)
    .wrapper {
        background-color: #f2f2f2;
    }
    .video {
        width: 750px;
    }
    .scroller {
        padding-top: 20px;
        padding-bottom: 50px;
    }
</style>~
<script>
    import base from "@/midea-demo/base";
    import mideaButton from "@/midea-component/button.vue";
    import nativeService from "@/common/services/nativeService";
    const ppvideoModule = weex.requireModule("ppVideoModule");
    let [width, height] = [640, 360]; //config

    module.exports = {
        components: { mideaButton },
        mixins: [base],
        data() {
            return {
                ppvideo_initdata: {
                    user: 13631449763, // userId auth，必填3项字段之一
                    password: "",
                    serverAdd: "120.55.73.80:7781", // userId auth，必填3项字段之一
                    relayAddr: "",
                    iP2PTryTime: 1,
                    sInitParam: "(Debug){1}",
                    sVideoParam: "(MaxStream){0}",
                    sAudioParam: ""
                },
                deviceId: '0000B411108T7428E18A150000680000',
                uid: null
            };
        },
        computed:{
            videoHeight(){
                return 750*height/640 +'px' ;
            }
        },
        mounted(){
            // this.init();
            this.setVideoModeSize();
        },
        created(){
        },
        methods: {

            init(){
                let context = this;
                nativeService.getUserInfo().then((data)=>{
                    data.userId && (context.ppvideo_initdata.user = data.mobile);
                    nativeService.alert(data);
                    return nativeService.getDeviceInfo();
                }).then((data)=>{
                    if(data.result && data.result.deviceId) {
                        context.deviceId = data.result.deviceSn;
                    }
                    // nativeService.alert(context.deviceId);
                    context.setVideoModeSize();
                });
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
                        nativeService.alert('success');
                        // context.start();
                    } ,(result)=>{
                        nativeService.alert('error');
                    })
            },
            start() {
                // nativeService.alert(JSON.stringify(ppvideoModule) == '{}');
                // return;
                let context = this;
                ppvideoModule.ppvideoInterface(
                    context.$refs.ppvideo,
                    {
                        api: "startLive",
                        params: { captureId: context.deviceId } // device sn，必填3项字段之一
                    },
                    () => {
                        nativeService.toast("start 成功");
                        // context.setVideoModeSize();
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
            recordStart() {
                ppvideoModule.ppvideoInterface(
                    this.$refs.ppvideo,
                    {
                        api: "startRecord",
                        params:{}
                    },
                    () => {
                        nativeService.toast("RecordStart 成功");
                    },
                    () => {
                        nativeService.toast("RecordStart failed");
                    }
                );
            },
            recordStop() {
                ppvideoModule.ppvideoInterface(
                    this.$refs.ppvideo,
                    {
                        api: "stopRecord",
                        params:{}
                    },
                    () => {
                        nativeService.toast("RecordStop 成功");
                    },
                    () => {
                        nativeService.toast("RecordStop failed");
                    }
                );
            },
            captureImage() {
                ppvideoModule.ppvideoInterface(
                    this.$refs.ppvideo,
                    {
                        api: "captureImage",
                        params:{}
                    },
                    () => {
                        nativeService.toast("captureImage 成功");
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
                nativeService.toast('event sData:' +event.sData+",sRender:"+event.sRender);
            }
        }
    };
</script>