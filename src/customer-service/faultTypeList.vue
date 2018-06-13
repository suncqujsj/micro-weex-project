<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller class="scroller">
            <div class="top-gap"> </div>
            <div class="scroller-item-wrapper" v-for="(item, index) in faultData" @click="selectItem(item)" :key="index">
                <text class="scroller-item">{{item.serviceRequireName}}</text>
            </div>
            <div class="bottom-gap"> </div>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'

export default {
    components: {
    },
    mixins: [base],
    data() {
        return {
            title: '故障类型',
            selectedProduct: null,
            faultData: []
        }
    },
    methods: {
        selectItem(item) {
            this.appPageDataChannel.postMessage({ page: this.fromPage, key: "selectedFault", data: item })
            this.back()
        }
    },
    beforeCreate: function () {
    },
    created() {
        nativeService.getItem(this.SERVICE_STORAGE_KEYS.selectedProductArray, (resp) => {
            if (resp.result == 'success') {
                this.selectedProduct = JSON.parse(resp.data)[0] || {}
                let param = {
                    depth: 3,
                    parentServiceRequireCode: "BX",
                    brandCode: this.selectedProduct.brandCode, //查询品牌
                    prodCode: this.selectedProduct.prodCode, //查询品类
                }
                nativeService.getFaultType(param).then((data) => {
                    this.faultData = data.data
                })
            }
        })
    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
}
.top-gap {
  background-color: #f2f2f2;
  height: 28px;
}
.bottom-gap {
  background-color: #f2f2f2;
  height: 128px;
}
.scroller-item-wrapper {
  padding-top: 28px;
  padding-left: 32px;
  padding-bottom: 28px;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
  background-color: #ffffff;
}
.scroller-item {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
</style>
