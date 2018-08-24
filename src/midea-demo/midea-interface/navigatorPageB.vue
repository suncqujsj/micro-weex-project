<template>
    <div class="wrapper">
        <midea-header title="页面B" :isImmersion="isImmersion" @leftImgClick="back"></midea-header>
        <midea-button text="跳转至页面C" type="green" @mideaButtonClicked="goToPageC">
        </midea-button>
        <midea-button text="返回至页面A" type="green" @mideaButtonClicked="backToPageA">
        </midea-button>
        <midea-button text="返回至第一个页面" type="green" @mideaButtonClicked="backToRoot">
        </midea-button>
        <midea-button text="退出至主页面" type="green" @mideaButtonClicked="backToNative">
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
        goToPageC() {
            nativeService.goTo('midea-interface/navigatorPageC.js', {viewTag: 'navigatorPageC'})
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