<template>
    <div class="wrapper">
        <midea-header title="烤箱实时监控" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <midea-ppvideo-view ref="ppvideo" class="video" :data="ppvideo_initdata" @Login="event" @VideoStatus="event"></midea-ppvideo-view>
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
<style scoped>
    .wrapper {
        background-color: #f2f2f2;
    }
    .video {
        top: 20;
        left: 20;
        width: 640;
        height: 480;
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

    module.exports = {
        components: { mideaButton },
        mixins: [base],
        data() {
            return {
                ppvideo_initdata: {
                    user: this.uid, // userId auth，必填3项字段之一
                    password: "",
                    serverAdd: "120.55.73.80:7781", // userId auth，必填3项字段之一
                    relayAddr: "",
                    iP2PTryTime: 1,
                    sInitParam: "(Debug){1}",
                    sVideoParam: "(MaxStream){0}",
                    sAudioParam: ""
                },
                deviceId: null,
                uid: null
            };
        },
        created(){
            // this.init();
        },
        methods: {

            init(){
                nativeService.getUserInfo().then((data)=>{
                    data.uid && (this.uid = data.uid);
                    return nativeService.getDeviceInfo();
                }).then(()=>{
                    if(data.result && data.result.deviceId) {
                        this.deviceId = data.result.deviceId;
                    }
                });
            },

            start() {

                ppvideoModule.ppvideoInterface(
                    this.$refs.ppvideo,
                    {
                        api: "startLive",
                        params: { captureId: this.deviceId } // device sn，必填3项字段之一
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