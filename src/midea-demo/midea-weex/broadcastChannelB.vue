<template>
    <div class="wrapper">
        <midea-header title="页面B" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="需要传递的数据:"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" v-model="message" rows=3 />
        <midea-button text="发送消息并返回" @mideaButtonClicked="submit">
        </midea-button>
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
            message: '123456789',
            result: ''
        }
    },
    methods: {
        submit() {
            appPageDataChannel.postMessage({ data: this.message })
            nativeService.goBack()
        }
    },
    created() {
    }
};
</script>