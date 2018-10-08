<template>
    <div class="wrapper">
        <midea-header title="showLoadingWithMsg" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="显示文本"></midea-title-bar>

        <div style="background-color: #e2e2e2;">
            <input type="input" placeholder="请输入显示文本" class="input" :value="newValue" @input="oninput" />
        </div>
        <midea-button text="执行showLoadingWithMsg" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <midea-title-bar title="代码"></midea-title-bar>
        <text class="display-block">
            let param = {
                msg: this.newValue
            }
            nativeService.showLoadingWithMsg(param)
            setTimeout(() => {
                nativeService.hideLoading()
            }, 2000);
        </text>
    </div>
</template>
<style scoped>
.input {
  font-size: 30px;
  width: 750px;
  height: 60px;
  border-color: gray;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
  background-color: #fff;
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

import mideaButton from '@/midea-component/button.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            newValue: '加载中...',
            result: ''
        }
    },
    methods: {
        oninput(event) {
            this.newValue = event.value
        },
        mideaButtonClicked() {
            let param = {
                msg: this.newValue
            }
            nativeService.showLoadingWithMsg(param)
            setTimeout(() => {
                nativeService.hideLoading()
            }, 2000);
        }
    },
    created() {
    }
};
</script>