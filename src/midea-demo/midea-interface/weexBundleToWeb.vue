<template>
    <div class="wrapper">
        <midea-header title="跳转H5页面" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="'接口参数:（可修改）"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" :value="messageParamString" @input="dataChange" rows=3 />

        <midea-title-bar title="代码"></midea-title-bar>
        <text class="display-block">
            nativeService.weexBundleToWeb({
                "url": "http://www.midea.com/cn/", //跳转的目标页面
                "title": "美的官网"
            })
        </text>
        <midea-button text="打开指定原生页面" @mideaButtonClicked="methodWithNoArg">
        </midea-button>
        <text class="display-block">

        </text>
        <!-- <midea-title-bar title="结果"></midea-title-bar>
        <text class="display-block">{{result}}</text> -->
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
.display-block {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
<script>

import base from '../base'
import mideaButton from '@/midea-component/button.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            messageParam: {
                "url": "http://www.midea.com/cn/", //跳转的目标页面
                "title": "美的官网"
            },
            result: ''
        }
    },
    computed: {
        messageParamString() {
            return JSON.stringify(this.messageParam)
        }
    },
    methods: {
        dataChange(event) {
            try {
                this.messageParam = JSON.parse(event.value)
            } catch (error) {
            }
        },
        methodWithNoArg() {
            nativeService.weexBundleToWeb(this.messageParam)
        }
    },
    created() {
    }
};
</script>