<template>
    <div class="wrapper">
        <midea-header title="getDeviceSN" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="执行getDeviceSN" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <text>
            nativeService.getDeviceSN().then(
                (resp) => {
                    nativeService.toast(resp)
                }
            ).catch((error) => {
                nativeService.toast(error)
            })
        </text>
    </div>
</template>
<style scoped>
.displayBtnStyle {
  display: inline-flex;
  border-radius: 0px;
}
</style>
<script>
import base from '../base'

import mideaHeader from '@/midea-component/header.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaHeader, mideaButton },
    mixins: [base],
    data() {
        return {}
    },
    methods: {
        mideaButtonClicked() {
            nativeService.getDeviceSN().then(
                (resp) => {
                    nativeService.toast(resp)
                }
            ).catch((error) => {
                nativeService.toast(error)
            })
        }
    },
    created() {
    }
};
</script>