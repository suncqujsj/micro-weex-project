<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./assets/img/public_ic_back@3x.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller class="scroller">
            <div class="top-gap"> </div>
            <div class="scroller-item-wrapper" v-for="(item, index) in machineList" @click="selectItem(item)" :key="index">
                <text class="scroller-item">{{item.productModel}}</text>
            </div>
            <div class="bottom-gap"> </div>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService'

export default {
    components: {
    },
    mixins: [base],
    data() {
        return {
            title: '选择查询产品型号',
            machineList: []
        }
    },
    methods: {
        selectItem(item) {
            this.appPageDataChannel.postMessage({ page: this.fromPage, key: "selectedMachine", data: item })
            this.back()
        }
    },
    created() {
        nativeService.getItem(this.SERVICE_STORAGE_KEYS.machineList, (resp) => {
            if (resp.result == 'success') {
                this.machineList = JSON.parse(resp.data) || []
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
