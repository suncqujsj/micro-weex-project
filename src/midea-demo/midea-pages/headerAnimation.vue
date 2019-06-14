<template>
    <div class="wrapper">
    	<midea-header title="headerAnimation" :titleText="titleText"  :isImmersion="isImmersion" @leftImgClick="back"  :showRightImg="true" leftImg="./img/header/tab_back.png" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <header-animation :bgImg="bgImg" :animationImg="animationImg"></header-animation>
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
        	titleText:"black",
        	bgImg:"../assets/FB/blue_change.png",
        	animationImg:"../assets/FB/warm_img_circle_blue@3x.png"
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