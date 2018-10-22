<template>
    <div class="wrapper">
        <midea-header title="killKeyboard(^5.2.0)" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <textarea type="text" placeholder="Input Text" class="textarea" rows=3 />
        <midea-button text="执行killKeyboard" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <midea-button text="其他按钮" @mideaButtonClicked="mideaButtonClicked1">
        </midea-button>
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
.displayBtnStyle {
  display: inline-flex;
  border-radius: 0px;
}
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

import mideaTitleBar from '@/midea-component/title-bar.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {

        }
    },
    methods: {
        mideaButtonClicked() {
            nativeService.killKeyboard()
        },
        mideaButtonClicked1() {
            // nativeService.toast("点击了按钮")
        }
    },
    created() {
    }
};
</script>