<template>
    <div class="wrapper">
        <midea-header title="getApplianceID" :isImmersion="false" @leftImgClick="leftImgClick"></midea-header>
        <midea-button text="执行getApplianceID" type="green" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
    </div>
</template>
<style scoped>
.displayBtnStyle {
  display: inline-flex;
  border-radius: 0px;
}
</style>
<script>

import mideaHeader from '@/midea-component/header.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaHeader, mideaButton },
    data() {

    },
    methods: {
        mideaButtonClicked() {
            nativeService.getApplianceID().then(
                (resp) => {
                    nativeService.toast(resp)
                }
            ).catch((error) => {
                nativeService.toast(error)
            })
        },
        leftImgClick() {
            nativeService.goBack()
        }
    },
    created() {
    }
};
</script>