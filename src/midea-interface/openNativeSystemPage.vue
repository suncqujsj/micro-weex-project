<template>
    <div class="wrapper">
        <midea-header title="openNativeSystemPage" :isImmersion="false" @leftImgClick="back"></midea-header>
        <midea-button text="打开系统蓝牙设置页面" type="green" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <text>
            nativeService.openNativeSystemPage('bluetooth').then(
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
import base from './base'

import mideaHeader from '@/midea-component/header.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaHeader, mideaButton },
    mixins: [base],
    data() {
    },
    methods: {
        mideaButtonClicked() {
            nativeService.openNativeSystemPage('bluetooth').then(
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