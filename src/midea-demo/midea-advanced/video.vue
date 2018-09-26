<template>
    <div class="wrapper" :style="{paddingTop:isIos?'0px':'0px'}">
        <midea-header title="视频" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="默认视频组件"></midea-title-bar>
        <video class="video" :src="src" autoplay controls @start="onstart" @pause="onpause" @finish="onfinish" @fail="onfail"></video>

        <midea-title-bar title="美居视频组件"></midea-title-bar>
        <midea-video class="video" :src="src" :autoplay="true" controls @start="onstart" @pause="onpause" @finish="onfinish" @fail="onfail"></midea-video>
    </div>
</template>

<style>
.video {
  width: 630px;
  height: 350px;
  margin-top: 60px;
  margin-left: 60px;
  margin-bottom: 60px;
}
</style>

<script>  
import base from '../base'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'
export default {
    components: { mideaTitleBar },
    mixins: [base],
    data() {
        return {
            src: 'http://flv2.bn.netease.com/videolib3/1611/01/XGqSL5981/SD/XGqSL5981-mobile.mp4',
            // src: 'http://midea-file.oss-cn-hangzhou.aliyuncs.com/meiju/meiju20171130.mp4',
            autoplay: true
        }
    },
    methods: {
        onstart() {

        },
        onpause() {

        },
        onfinish() {

        },
        onfail() {

        }
    },
    created() {
    }
}
</script>