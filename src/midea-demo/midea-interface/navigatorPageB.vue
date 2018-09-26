<template>
    <div class="wrapper">
        <midea-header title="页面B" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="跳转至页面C" @mideaButtonClicked="goToPageC">
        </midea-button>
        <midea-button text="返回至页面A" @mideaButtonClicked="backToPageA">
        </midea-button>
        <midea-button text="返回至第一个页面" @mideaButtonClicked="backToRoot">
        </midea-button>
        <midea-button text="退出至主页面" @mideaButtonClicked="backToNative">
        </midea-button>
        <text v-if="param">  url参数：{{param}}</text>
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
            result: '',
            param: null
        }
    },
    methods: {
        backToPageA() {
            nativeService.goBack({ viewTag: 'navigatorPageA' })
        },
        goToPageC() {
            nativeService.goTo('midea-interface/navigatorPageC.js', { viewTag: 'navigatorPageC' })
        },
        backToRoot() {
            nativeService.goBack({ viewTag: 'rootView' })
        },
        backToNative() {
            nativeService.backToNative()
        }
    },
    created() {
        this.param = nativeService.getParameters('param')
    }
};
</script>