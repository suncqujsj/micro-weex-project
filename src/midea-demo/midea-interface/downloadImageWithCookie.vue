<template>
    <div class="wrapper">
        <midea-header title="downloadImageWithCookie" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="下载" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <midea-title-bar title="结果"></midea-title-bar>

        <scroller>
            <image :src="result.data" class="photo"></image>
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
  margin-bottom: 30px;
}
.display-block {
  font-size: 30px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.photo {
  margin: 5px;
  width: 200px;
  height: 200px;
  border-color: #e2e2e2;
  border-width: 1px;
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
    computed: {
    },
    methods: {
        mideaButtonClicked() {
            let param = {
                url: 'http://wap.cjm.so/Common/ValidateCode.ashx?Type=&Demand=&w=&h=&r=' + + Math.random().toString().replace('.', '')
            }
            nativeService.downloadImageWithCookie(param).then(
                (resp) => {
                    this.result = resp
                }
            ).catch((error) => {
                this.result = "error: " + JSON.stringify(error || {})
            })
        }
    },
    created() {
    }
};
</script>