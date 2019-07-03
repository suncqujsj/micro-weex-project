<template>
    <div class="wrapper">
        <header-animation :bgImg="bgImg" :animationImg="animationImg"></header-animation>
    	<midea-header bg-color="transparent" title="headerAnimation" :titleText="titleText"  :isImmersion="isImmersion" @leftImgClick="back"  :showRightImg="true" leftImg="./img/header/ic_back@3x.png" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
    </div>
</template>
<style scoped>
.wrapper {
	width:750px;
}
</style>
<script>  

import base from '../base'
import nativeService from '@/common/services/nativeService'
import headerAnimation from '@/midea-component/newComp/headerAnimation.vue'
const animation = weex.requireModule('animation')
module.exports = {
	components: {
        headerAnimation
    },
    mixins: [base],
    data() {
        return {
        	titleText:"#ffffff",
        	bgImg:"../assets/FB/blue_change.png",
        	animationImg:"/FB/warm_img_circle_blue@3x.png"
        }
    },
    methods: {
    },
    mounted() {
    },
    created() {
    }
};
</script>