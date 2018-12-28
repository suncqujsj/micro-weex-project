<template>
    <div class="wrapper">
        <midea-header title="手势放缩" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="打开手势放缩" @mideaButtonClicked="isShowZoomImg=true"></midea-button>
        <midea-zoom :isShow="isShowZoomImg" :img="'https://vuejs.org/images/logo.png'" @mideaZoomOverlayClicked="isShowZoomImg=false"></midea-zoom>
    </div>
</template>
<script>  
import base from '../base'

const animation = weex.requireModule('animation')

import nativeService from '@/common/services/nativeService'

import { MideaButton, MideaZoom } from '@/index'

export default {
    components: { MideaButton, MideaZoom },
    mixins: [base],
    data() {
        return {
            isShowZoomImg: false
        }
    },
    computed: {
    },
    methods: {
    },
    created() {
        //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
};
</script>

<style scoped>
</style>