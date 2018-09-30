<template>
    <div class="wrapper">
        <midea-header title="startCmdProcess" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="接口参数:"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" v-model="messageParam" rows=6 />
        <midea-button text="发送请求" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <midea-title-bar title="代码"></midea-title-bar>
        <text class="display-block">

        </text>
        <midea-title-bar title="结果"></midea-title-bar>

        <scroller>
            <text class="display-block">{{result?('返回类型:'+typeof result):''}}</text>
            <text class="display-block">{{result}}</text>
        </scroller>
    </div>
</template>
<style scoped>
.textarea {
  font-size: 30px;
  width: 750px;
  height: 250px;
  border-color: gray;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 100px;
}
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
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            messageParam: '[170,11,180,0,0,0,0,0,0,3,49,13]',
            result: ''
        }
    },
    computed: {
    },
    methods: {
        dataChange(event) {
            try {
                this.messageParam = JSON.parse(event.value)
            } catch (error) {
            }
        },
        mideaButtonClicked() {
            let param = this.messageParam
            try {
                param = JSON.parse(param)
            } catch (error) { }
                nativeService.toast("开始")
            nativeService.startCmdProcess("query", param, (resp) => {
                nativeService.toast("成功")
                this.result = resp
            }, (error) => {
                nativeService.toast("失败")
                this.result = "error: " + JSON.stringify(error || {})
            })
        }
    },
    created() {
    }
};
</script>