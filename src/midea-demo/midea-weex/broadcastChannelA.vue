<template>
    <div class="wrapper">
        <midea-header title="页面A" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="跳转至页面B" @mideaButtonClicked="goToPageB">
        </midea-button>
        <midea-title-bar title="结果"></midea-title-bar>
        <scroller>
            <text class="display-block">{{result?('返回类型:'+typeof result):''}}</text>
            <text class="display-block">{{result}}</text>
        </scroller>
    </div>
</template>
<style scoped>
.display-block {
  font-size: 30px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
<script>
import base from '../base'

import mideaButton from '@/midea-component/button.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'
const appPageDataChannel = new BroadcastChannel('appPageData')

module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            result: ''
        }
    },
    methods: {
        goToPageB() {
            nativeService.goTo('midea-weex/broadcastChannelB.js')
        }
    },
    created() {
        appPageDataChannel.onmessage = (event) => {
            nativeService.toast(event.data)
            this.result = event.data
        }
    }
};
</script>