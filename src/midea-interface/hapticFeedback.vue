<template>
    <div class="wrapper">
        <midea-header title="hapticFeedback" :isImmersion="false" @leftImgClick="back"></midea-header>
        <midea-button text="执行hapticFeedback" type="green" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <text>
            nativeService.hapticFeedback().then(
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
            nativeService.hapticFeedback().then(
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