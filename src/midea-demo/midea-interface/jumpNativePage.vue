<template>
    <div class="wrapper">
        <midea-header title="打开指定的原生页面" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="接口参数:（可修改）"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" :value="messageParamString" @input="dataChange" rows=5 />

        <midea-button text="选择页面" @mideaButtonClicked="showPageList"></midea-button>
        <midea-title-bar title="代码"></midea-title-bar>
        <text class="display-block">
            nativeService.jumpNativePage({
                "pageName": "jumpToGatewayBindPage", //‘设置mini网关’原生页面
                "data": {}
            })
        </text>
        <midea-button text="打开指定原生页面" @mideaButtonClicked="methodWithNoArg">
        </midea-button>
        <text class="display-block">

        </text>
        <midea-select :show="isShowPageList" title="选择页面" :items="pageList" @close="isShowPageList=false" @itemClick="selectPage"></midea-select>
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
import MideaSelect from '@/midea-component/mSelect.vue'

import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaTitleBar,MideaSelect },
    mixins: [base],
    data() {
        return {
            messageParam: {
                "pageName": "login", //跳转的目标页面
                "data": {}
            },
            isShowPageList: false,
            pageList: [
                { key: 0, value: "login", desc: "login登录页面" },
                { key: 1, value: "CookbookHome", desc: "CookbookHome菜谱首页" },
                { key: 2, value: "CookbookDetail", desc: "CookbookDetail菜谱详情" },
                { key: 3, value: "jumpToGatewayBindPage", desc: "jumpToGatewayBindPage网关绑定" },
                { key: 4, value: "addDevice", desc: "addDevice添加设备" },
                { key: 5, value: "onlineService", desc: "onlineService在线客服" },
                { key: 6, value: "voiceControl", desc: "voiceControl语音控制" },
                { key: 7, value: "electronicBusinessPage", desc: "electronicBusinessPage跳转到电商页面" },
            ],
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
        },
        showPageList() {
            this.isShowPageList = true
        },
        selectPage(event) {
            this.messageParam.pageName = event.item.value
        }
    },
    created() {
    }
};
</script>