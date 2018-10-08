<template>
    <div class="wrapper">
        <midea-header title="Button按钮" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller class="scroller">
            <midea-button text="按钮" type="primary" :btnStyle="{'width': '120px', 'height':'56px'}" @mideaButtonClicked="mideaButtonClicked">
            </midea-button>
            <midea-button text="按钮" type="primary" :btnStyle="{'width': '200px', 'height':'60px'}" @mideaButtonClicked="mideaButtonClicked">
            </midea-button>
            <midea-button text="按钮" type="primary" :btnStyle="{'width': '240px', 'height':'68px'}" @mideaButtonClicked="mideaButtonClicked">
            </midea-button>

            <midea-button text="重要按钮" type="primary" @mideaButtonClicked="mideaButtonClicked">
            </midea-button>
            <midea-button text="重要按钮不可点击" type="primary" :disabled="true" @mideaButtonClicked="mideaButtonClicked">
            </midea-button>

            <midea-button text="普通按钮" type="secondary" @mideaButtonClicked="mideaButtonClicked">
            </midea-button>
            <midea-button text="普通按钮不可点击" type="secondary" :disabled="true">
            </midea-button>

            <midea-button text="弱化按钮" type="normal" @mideaButtonClicked="mideaButtonClicked">
            </midea-button>
            <midea-button text="弱化按钮不可点击" type="normal" :disabled="true">
            </midea-button>
        </scroller>
    </div>
</template>
<style scoped>
.wrapper {
  background-color: #f2f2f2;
}
.scroller {
  padding-top: 20px;
  padding-bottom: 50px;
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