<template>
    <div class="wrapper">
        <midea-header title="searchMapAddress地图地址搜索" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="接口参数:"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" v-model="messageParamString" @input="dataChange" rows=2 />
        <midea-button text="搜索" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <midea-title-bar title="代码"></midea-title-bar>
        <text class="display-block">
            nativeService.searchMapAddress(messageParam).then( (resp) => { this.result = resp } )
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
            messageParam: {
                city: "", //需要查询的城市(范围)
                keyword: "美的" //需要查询的地址
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
        mideaButtonClicked() {
            nativeService.searchMapAddress(this.messageParam).then(
                (resp) => {
                    this.result = resp
                }
            ).catch((error) => {
                this.result = "error: " + JSON.stringify(error || {})
            })
        }
    },
    created() {
        this.result = "获取当前地址中..."
        nativeService.getGPSInfo({
            desiredAccuracy: "10",  //定位的精确度
            distanceFilter: "10", //移动多少米回调一次定位信息，
            alwaysAuthorization: "0" //是否需要一直定位, 0:不一直定位，1：一直定位
        }).then((resp) => {
            this.result = "当前位置" + JSON.stringify(resp)
            this.messageParam.city = resp.city
        }
        ).catch((error) => {
            this.result = error
            nativeService.toast(error)
        })
    }
};
</script>