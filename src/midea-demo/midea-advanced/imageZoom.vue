<template>
    <div class="wrapper">
        <midea-header title="手势放缩" :isImmersion="isImmersion" @leftImgClick="back"></midea-header>
        <midea-button text="打开手势放缩" @mideaButtonClicked="isShowZoomImg=true"></midea-button>
        <midea-zoom :isShow="isShowZoomImg" :img="'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527764362689&di=5377539cc9446c8dc8e6a00a110b616a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01218759e6c5e0a80121bea5fc9b90.jpg%402o.jpg'" @mideaZoomOverlayClicked="isShowZoomImg=false"></midea-zoom>
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