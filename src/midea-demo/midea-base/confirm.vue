<template>
    <div class="wrapper">
        <midea-header title="Confirm" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="点击弹出底部面板" @mideaButtonClicked="show=true">
        </midea-button>

        <midea-confirm :show="show" @mideaPopupOverlayClicked="popupOverlayBottomClick" :title="title" :content="content" :leftBtnText="leftBtnText" :rightBtnText="rightBtnText" @leftBtnClick="leftBtnClick" @rightBtnClick="rightBtnClick">
        </midea-confirm>
    </div>
</template>
<style scoped>
.wrapper {
  background-color: #f2f2f2;
}
.btn-grp {
  padding-left: 24px;
  padding-right: 24px;
  height: 72px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #f2f2f2;
}
.btn-grp-text {
  color: #00b9ef;
  font-size: 28px;
}
</style>
<script> 
import base from '../base'

import mideaButton from '@/midea-component/button.vue'
import mideaConfirm from '@/midea-component/confirm.vue'
import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal');

module.exports = {
    components: { mideaButton, mideaConfirm },
    mixins: [base],
    data() {
        return {
            show: false,
            title: '这是标题',
            content: '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容 ',
            leftBtnText: '取消',
            rightBtnText: '确定'
        }
    },
    methods: {
        leftBtnClick() {

        },
        rightBtnClick() {

        },
        popupOverlayBottomClick() {
            this.show = false;
        },
        mideaCheckBoxListChecked(e) {
            this.checkedList = e.checkedList;
        }
    },
    created() {
        //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
};
</script>