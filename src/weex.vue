<template>
    <div class="wrapper" ref="wrapper">
        <midea-header title="跳转页" :isImmersion="false" @leftImgClick="leftImgClick"></midea-header>
        <midea-title-bar title="输入远端目标页面地址"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" :value="url" @input="urlChange" rows=3 />
        <midea-button text="进入远端目标页面" type="green" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
    </div>
</template>
<style scoped>
.wrapper {
  position: relative;
}
.textarea {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
<script>
import mideaHeader from '@/midea-component/header.vue'
import mideaTitleBar from '@/component/title-bar.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: {
        mideaHeader,
        mideaTitleBar,
        mideaButton
    },
    data: () => ({
        url: "http://10.8.81.38:8080/dist/midea-sample/weex.js?ip=10.8.81.38"
    }),
    methods: {
        leftImgClick() {
            nativeService.goBack()
        },
        urlChange(event) {
            this.url = event.value
        },
        mideaButtonClicked() {
            nativeService.setItem('demo_target_url', this.url, () => {
                nativeService.runGo(this.url)
            })
        }
    },
    created() {
        nativeService.getItem('demo_target_url', (resp) => {
            if (resp.result == 'success' && resp.data) {
                this.url = resp.data
            }
        })
    }
};
</script>