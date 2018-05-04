<template>
    <div class="wrapper">
        <midea-header title="Button按钮" :isImmersion="false" @leftImgClick="back"></midea-header>

        <midea-button text="默认按钮" type="green" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>

        <midea-button text="灰色按钮" type="gray" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>

        <midea-button text="删除按钮" type="delete" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>

        <midea-button text="刷新按钮" type="refresh" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>

        <midea-button text="按钮不可点击" type="disabled">
        </midea-button>

        <midea-dual-button leftBtnText="左边" rightBtnText="右边" leftBtnType="green" rightBtnType="green" defaultLeftBtnStyle="displayBtnStyle" defaultRightBtnStyle="displayBtnStyle" @leftBtnClicked="mideaButtonClicked" @rightBtnClicked="mideaButtonClicked">
        </midea-dual-button>

    </div>
</template>
<style scoped>
.displayBtnStyle {
  display: inline-flex;
  border-radius: 0px;
}
</style>
<script>  

import base from '../base'
import mideaButton from '@/midea-component/button.vue'
import mideaDualButton from '@/midea-component/dualButton.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaDualButton },
    mixins: [base],
    data() {
        return {}
    },
    methods: {
        mideaButtonClicked() {
            nativeService.toast("button clicked");
        }
    },
    created() {
        //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
};
</script>