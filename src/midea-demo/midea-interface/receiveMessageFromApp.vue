<template>
    <div class="wrapper">
        <midea-header title="receiveMessageFromApp（APP主动调用）" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar :title="receiveTIme"></midea-title-bar>
        <text class="display-block">{{result}}</text>
    </div>
</template>
<style scoped>
.textarea {
  font-size: 30px;
  width: 750px;
  border-color: gray;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 100px;
}
.display-block {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
<script>
import base from '../base'

import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'

const globalEvent = weex.requireModule('globalEvent')
module.exports = {
    components: {mideaTitleBar},
    mixins: [base],
    data() {
        return {
            receiveTIme: '',
            result: ''
        }
    },
    computed: {
    },
    methods: {

    },
    created() {
        //监听全局推送(native->weex)
        globalEvent.addEventListener("receiveMessageFromApp", (data) => {
            this.receiveTIme = new Date()
            nativeService.toast(data)
            this.result = data
            try {
                this.result = JSON.stringify(data)
            } catch (error) { }
        });
    }
};
</script>