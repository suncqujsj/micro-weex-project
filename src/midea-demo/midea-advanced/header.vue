<template>
    <div class="wrapper">
        <midea-header title="Header" :isImmersion="false" @leftImgClick="back"></midea-header>
        <div style="height: 220px; margin-top: 20px;">
            <midea-header :title="title1" :isImmersion="isipx?false:true"></midea-header>
        </div>

        <div style="height: 220px;">
            <midea-header :title="title2" :isImmersion="isipx?false:true" :showRightImg="true" @leftImgClick="leftImgClick1" @rightImgClick="rightImgClick1"></midea-header>
        </div>

        <div style="height: 220px;">
            <midea-header :title="title3" :isImmersion="false"></midea-header>
        </div>

        <div style="height: 220px;">
            <midea-header :title="title4" :isImmersion="false" :showRightImg="true" @leftImgClick="leftImgClick2" @rightImgClick="rightImgClick2"></midea-header>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>  
import base from '../base'
import mideaHeader from '@/midea-component/header.vue'
import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal');

module.exports = {
    components: { mideaHeader },
    mixins: [base],
    data() {
        return {
            title1: '沉浸式（无右侧图标）',
            title2: '沉浸式（带右侧图标）',
            title3: '非沉浸式（无右侧图标）',
            title4: '非沉浸式（带右侧图标）',
        }
    },
    methods: {
        leftImgClick1() {
            this.title2 = "点击左边按钮"
        },
        rightImgClick1() {
            this.title2 = "点击右边按钮"
        },
        leftImgClick2() {
            this.title4 = "点击左边按钮"
        },
        rightImgClick2() {
            this.title4 = "点击右边按钮"
        }
    },
    created() {
        //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
};
</script>