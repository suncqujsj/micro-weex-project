<template>
    <div class="wrapper">
        <midea-header title="Popup" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="点击弹出顶部面板" @mideaButtonClicked="openTopOverlay">
        </midea-button>

        <midea-button text="点击弹出底部面板" @mideaButtonClicked="openBottomOverlay">
        </midea-button>

        <midea-button text="点击弹出左侧面板" @mideaButtonClicked="openLeftOverlay">
        </midea-button>

        <midea-button text="点击弹出右侧面板" @mideaButtonClicked="openRightOverlay">
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
        <midea-popup :show="isTopShow" @mideaPopupOverlayClicked="popupOverlayBottomClick" pos="top" height="400">
            <div class="demo-content">
                这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            </div>
        </midea-popup>
        <midea-popup :show="isLeftShow" @mideaPopupOverlayClicked="popupOverlayBottomClick" pos="left" width="375">
            <div class="demo-content">
                这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            </div>
        </midea-popup>
        <midea-popup :show="isRightShow" @mideaPopupOverlayClicked="popupOverlayBottomClick" pos="right" width="375">
            <div class="demo-content">
                这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            </div>
        </midea-popup>
    </div>
</template>
<style scoped>
  .wrapper {
    background-color: #f2f2f2;
  }
  .demo-content {
    background-color: #f2f2f2;
    height: 418px;
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
            isTopShow: false,
            isLeftShow: false,
            isRightShow: false,
            list: [
                { title: '一路开关面板', value: 1 },
                { title: '二路开关面板', value: 2 },
                { title: '三路开关面板', value: 3 },
                { title: '四路开关面板', value: 4 }
            ],
            checkedList: [2]
        }
    },
    methods: {
        popupOverlayBottomClick() {
            this.isBottomShow = false;
            this.isTopShow = false;
            this.isLeftShow = false;
            this.isRightShow = false;
        },
        openBottomOverlay() {
            this.isBottomShow = true;
        },
        openTopOverlay() {
            this.isTopShow = true;
        },
        openLeftOverlay() {
            this.isLeftShow = true;
        },
        openRightOverlay() {
            this.isRightShow = true;
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