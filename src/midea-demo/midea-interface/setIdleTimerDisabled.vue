<template>
    <div class="wrapper">
        <midea-header title="setIdleTimerDisabled" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="单次执行setIdleTimerDisabled" @mideaButtonClicked="mideaButtonClicked">
            <midea-button text="循环执行setIdleTimerDisabled" @mideaButtonClicked="mideaButtonClickedA">
            </midea-button>
            <midea-title-bar title="代码"></midea-title-bar>
            <text class="display-block">
                nativeService.setIdleTimerDisabled()
            </text>
    </div>
</template>
<style scoped>
.display-block {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>
<script>
import base from '../base'

import mideaButton from '@/midea-component/button.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            handler: null
        }
    },
    methods: {
        mideaButtonClicked() {
            nativeService.setIdleTimerDisabled()
        },
        mideaButtonClickedA() {
            if (this.handler) {
                clearInterval(this.handler)
            }
            this.handler = setInterval(() => {
                nativeService.setIdleTimerDisabled()
            }, 60 * 1000);
        },
        created() {
        }
    };
</script>