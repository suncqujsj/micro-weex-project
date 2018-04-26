<template>
    <div class="wrapper">
        <midea-header title="getCurrentHomeInfo" :isImmersion="false" @leftImgClick="back"></midea-header>
        <midea-button text="执行getCurrentHomeInfo" type="green" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <midea-title-bar title="代码"></midea-title-bar>
        <text class="display-block">
            nativeService.getCurrentHomeInfo().then(
                (resp) => {
                    this.result = resp
                }
            ).catch((error) => {
                nativeService.toast(error)
            })
        </text>
        <midea-title-bar title="结果"></midea-title-bar>
        <text class="display-block">{{result}}</text>
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
import base from './base'

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
            nativeService.getCurrentHomeInfo().then(
                (resp) => {
                    this.result = resp
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