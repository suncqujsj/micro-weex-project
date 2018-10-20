<template>
    <div class="wrapper">
        <midea-header title="scanCode扫描" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="扫描" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <midea-button v-if="result" text="打开扫描结果weex连接" @mideaButtonClicked="mideaButtonClicked1">
        </midea-button>
        <midea-title-bar title="代码"></midea-title-bar>
        <text class="display-block">
            nativeService.scanCode().then(
            (resp) => {
            this.result = resp
            }
            )
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
            result: ''
        }
    },
    methods: {
        mideaButtonClicked() {
            nativeService.scanCode().then(
                (resp) => {
                    this.result = resp
                }
            ).catch((error) => {
                this.result = "error: " + JSON.stringify(error || {})
            })
        },

        mideaButtonClicked1() {
            if (this.result && this.result.data) {
                nativeService.goTo(this.result.data)
            }
        }
    },
    created() {
    }
};
</script>