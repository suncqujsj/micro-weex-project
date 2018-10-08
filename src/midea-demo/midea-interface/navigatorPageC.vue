<template>
    <div class="wrapper">
        <midea-header title="页面C" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="返回至页面B" @mideaButtonClicked="backToPageB">
        </midea-button>
        <midea-button text="返回至页面A" @mideaButtonClicked="backToPageA">
        </midea-button>
        <midea-button text="返回至第一个页面" @mideaButtonClicked="backToRoot">
        </midea-button>
        <midea-button text="退出至主页面" @mideaButtonClicked="backToNative">
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
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton },
    mixins: [base],
    data() {
        return {
            result: ''
        }
    },
    methods: {
        backToPageA() {
            nativeService.goBack({ viewTag: 'navigatorPageA' })
        },
        backToPageB() {
            nativeService.goBack({ viewTag: 'navigatorPageB' })
        },
        backToRoot() {
            nativeService.goBack({ viewTag: 'rootView' })
        },
        backToNative(){
            nativeService.backToNative()
        }
    },
    created() {
    }
};
</script>