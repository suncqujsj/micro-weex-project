<template>
    <div class="wrapper" :style="{paddingTop:isIos?'0px':'0px'}">
        <midea-title-bar title="默认视频"></midea-title-bar>
        <video class="video" :src="src" autoplay="true" controls @start="onstart" @pause="onpause" @finish="onfinish" @fail="onfail"></video>

        <midea-title-bar title="美居视频"></midea-title-bar>
        <midea-video class="video" :src="src" autoplay="true" controls @start="onstart" @pause="onpause" @finish="onfinish" @fail="onfail"></midea-video>
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
import mideaTitleBar from '../midea-component/title-bar.vue'
import nativeService from '../common/services/nativeService'
export default {
    components: { mideaTitleBar },
    data() {
        return {
            src: 'http://flv2.bn.netease.com/videolib3/1611/01/XGqSL5981/SD/XGqSL5981-mobile.mp4',
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