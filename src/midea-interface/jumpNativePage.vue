<template>
    <div class="wrapper">
        <midea-header title="打开指定的原生页面" :isImmersion="false" @leftImgClick="back"></midea-header>
        <midea-title-bar title="'接口参数:（可修改）"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" :value="messageParamString" @input="dataChange" rows=3 />

        <midea-button text="打开指定的原生页面" type="green" @mideaButtonClicked="methodWithNoArg">
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

import base from './base'
import mideaButton from '@/midea-component/button.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            messageParam: {
                "pageName": "xxxx", //跳转的目标页面
                "data": {}
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
            nativeService.jumpNativePage(this.messageParam)
        }
    },
    created() {
    }
};
</script>