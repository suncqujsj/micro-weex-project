<template>
    <div class="wrapper">
        <midea-header title="showLoading" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="执行showLoading" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <midea-title-bar title="代码"></midea-title-bar>
        <text class="display-block">
            nativeService.showLoading()
            setTimeout(() => {
                nativeService.hideLoading()
            }, 2000);
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
            result: ''
        }
    },
    methods: {
        mideaButtonClicked() {
            nativeService.showLoading()
            setTimeout(() => {
                nativeService.hideLoading()
            }, 2000);
        }
    },
    created() {
    }
};
</script>