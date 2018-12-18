<template>
    <div class="wrapper">
        <midea-header title="checkBox" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div style="padding:24px">
            <text style="font-size:28px">当前选中 {{checkedList.toString()}}</text>
        </div>
        <midea-checkbox-list :list="list" :needShowTopBorder="true" @mideaCheckBoxListChecked="itemChecked"></midea-checkbox-list>

        <div style="padding:24px">
            <text style="font-size:28px">当前选中 {{imgCheckedList.toString()}}</text>
        </div>
        <midea-checkbox-list :list="list1" :needShowTopBorder="true" @mideaCheckBoxListChecked="imgItemChecked"></midea-checkbox-list>

        <midea-button text="点击弹出底部面板" @mideaButtonClicked="openBottomOverlay">
        </midea-button>
        <midea-popup :show="isBottomShow" @mideaPopupOverlayClicked="popupOverlayBottomClick" pos="bottom" height="514">
            <scroller class="demo-content">
                <midea-checkbox-list :list="list" :needShowTopBorder="true" @mideaCheckBoxListChecked="mideaCheckBoxListChecked">
                </midea-checkbox-list>
            </scroller>
            <div class="btn-grp">
                <div class="btn-item btn-cancel"><text class="btn-grp-text cancel-text" @click="cancel">取消</text></div>
                <div class="btn-item"><text class="btn-grp-text confirm-text" @click="confirm">确定</text></div>
            </div>
        </midea-popup>
    </div>
</template>
<style scoped>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
}
.demo-content {
    height: 418px;
    background-color: #f2f2f2;
}
.btn-grp {
  height: 96px;
  flex-direction: row;
  background-color: #ffffff;
}
.btn-item {
    flex: 1;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.btn-cancel {
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: #d7dde4;
}
.btn-grp-text {
  line-height: 96px;
  font-size: 32px;
}
.cancel-text {
    color: #666666;
}
.confirm-text {
    color: #000000;
}
</style>
<script>
import base from '../base'

import mideaButton from '@/midea-component/button.vue'
import mideaPopup from '@/midea-component/popup.vue'
import mideaCheckboxList from '@/midea-component/checkboxList.vue'
import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal');

module.exports = {
    components: { mideaButton, mideaPopup, mideaCheckboxList },
    mixins: [base],
    data() {
        return {
            isBottomShow: false,
            list: [
                { title: '选项1', value: 1 },
                { title: '选项2', value: 2, checked: true },
                { title: '选项3', value: 3 },
                { title: '选项4', value: 4 }
            ],
            list1: [
                { title: '一路开关面板', value: 1, itemImg: "http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.env.002.png" },
                { title: '二路开关面板', value: 2, checked: true, itemImg: "http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.001.png" },
                { title: '三路开关面板', value: 3, itemImg: "http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.env.002.png" },
                { title: '四路开关面板', value: 4, itemImg: "http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.001.png" }
            ],
            checkedList: [2],
            imgCheckedList: [2],
        }
    },
    methods: {
        openBottomOverlay() {
            this.isBottomShow = true;
        },
        popupOverlayBottomClick() {
            this.isBottomShow = false;
        },
        itemChecked(e) {
            this.checkedList = e.checkedList;
        },
        imgItemChecked(e) {
            this.imgCheckedList = e.checkedList;
        },
        confirm() {
            this.isBottomShow = false;
        },
        cancel() {
            this.isBottomShow = false;
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