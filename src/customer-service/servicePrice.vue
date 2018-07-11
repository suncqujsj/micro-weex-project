<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./assets/img/public_ic_back@3x.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller>
            <div class="base-group">
                <div class="item-group">
                    <scan-input placeholder="请输入或扫机身条码" v-model="barCode" @blur="checkBarCode" @scanCode="scanCode"></scan-input>
                </div>
                <div class="item-group">
                    <text v-if="!productModel" class="item-input-text placeholder" @click="goToSearch">请输入型号</text>
                    <text v-else class="item-input-text" @click="goToSearch">{{productModel}}</text>
                </div>

                <div class="item-group scan-group group-bottom-border">
                    <input class="item-input" placeholder="请输入配件名称" :autofocus=false v-model="materialName"  maxlength="50"/>
                </div>

                <div class="action-bar">
                    <div class="action-btn" v-bind:class="[isDataReady?'':'action-btn-disable']" @click="search">
                        <text class="action-btn-text" v-bind:class="[isDataReady?'':'action-btn-text-disable']">查询</text>
                    </div>
                </div>
            </div>

            <div class="base-group" v-for="(item, index) in materialList" :key="index">
                <div class="item-group result-header">
                    <text class="result-title">{{item.mobileDescribeMaterial}}</text>
                    <text class="result-price">指导价{{item.priceCustomer}}元</text>
                </div>
            </div>
            <div class="item-group" v-if="isLoaded && materialList.length > 0">
                <text class="result-desc">若本价格标准高于当地物价部门制定有关标准，请以当地物价部门标准为准</text>
            </div>
            <div class="empty-page" v-if="isLoaded && materialList.length == 0">
                <image class="empty-page-icon" src="./assets/img/default_ic_noresult@3x.png" resize='contain'>
                </image>
                <text class="empty-page-text">抱歉，没有找到相应的配件价格{{'\n'}}请重新搜索</text>
            </div>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService'
import util from '@/common/util/util'

import ScanInput from '@/customer-service/components/scanInput.vue'

export default {
    components: {
        ScanInput
    },
    mixins: [base],
    data() {
        return {
            title: '配件价格',
            barcode: '',
            orgCode: "",
            productCode: '',
            productModel: '',
            materialName: '',
            materialList: [],
            isLoaded: false
        }
    },
    computed: {
        isDataReady() {
            let result = false
            if (this.productModel && this.materialName) {
                result = true
            }

            return result
        }
    },
    methods: {
        handlePageData(data) {
            if (data.page == "servicePrice") {
                if (data.key == "selectedMachine") {
                    //条码解析选择
                    let machine = data.data
                    this.orgCode = machine.orgCode
                    this.productCode = machine.productCode
                    this.productModel = machine.productModel
                } else if (data.key == "serviceMachineSearch") {
                    //型号模糊查询选择
                    let machine = data.data
                    this.orgCode = machine.prodType.orgCode
                    this.productCode = machine.product.salesCode
                    this.productModel = machine.product.productModel
                }
            }
        },
        scanCode(result) {
            this.barCode = nativeService.convertScanResult(result).code
            this.checkBarCode()
        },
        checkBarCode() {
            if (!this.barCode) return
            let param = {
                "barCode": this.barCode
            }
            nativeService.queryproductinfobysn(param).then((resp) => {
                let machineList = resp.machineList
                if (machineList) {
                    if (machineList.length == 1) {
                        this.orgCode = machineList[0].orgCode
                        this.productCode = machineList[0].productCode
                        this.productModel = machineList[0].productModel
                    } else if (machineList.length > 1) {
                        nativeService.setItem(this.SERVICE_STORAGE_KEYS.machineList, JSON.stringify(machineList), () => {
                            this.goTo('serviceMachineList', {}, { from: 'servicePrice' })
                        })
                    }
                }
            })
        },
        goToSearch() {
            this.goTo('serviceMachineSearch', {}, { from: 'servicePrice', keyword: this.productModel })
        },
        search() {
            if (!this.isDataReady) return

            let param = {
                pageSize: 100,
                pageNum: 1,
                productCode: this.productCode,
                orgCode: this.orgCode,
                materialName: this.materialName

            }
            nativeService.getChargePriceForMaterial(param).then((data) => {
                this.materialList = data.data || []
                this.isLoaded = true
            }).catch((error) => {
                nativeService.toast(nativeService.getErrorMessage(error))
            })
        }
    },
    created() {
    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
}
.base-group {
  padding-top: 24px;
  background-color: #f2f2f2;
}
.cell-title {
  flex: 1;
  flex-direction: row;
}
.cell-label {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
.cell-label-star {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #ff3b30;
  padding-left: 5px;
}
.item-group {
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
  background-color: #ffffff;
}
.last-item-group {
  padding-bottom: 32px;
}
.item-input-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  height: 72px;
  padding-top: 16px;
  padding-left: 22px;
  padding-right: 50px;
  padding-bottom: 16px;
  background-color: #fafafa;
}
.placeholder {
  color: #9a9a9a;
}
.item-input {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  height: 72px;
  padding-left: 22px;
  padding-right: 50px;
  background-color: #fafafa;
}
.type-select-label {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
}
.search-history {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.search-history-item {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  background-color: #f6f6f6;
  text-align: center;
  padding-top: 8px;
  padding-right: 28px;
  padding-bottom: 8px;
  padding-left: 28px;
  margin-right: 24px;
  border-radius: 4px;
}
.search-history-item-selected {
  background-color: #e8f1ff;
  color: #267aff;
}
.search-mode {
  flex: 1;
  flex-direction: column;
}
.scroller {
  flex: 1;
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
.action-bar {
  background-color: #ffffff;
  width: 750px;
  text-align: center;
  padding-bottom: 50px;
  padding-left: 32px;
  padding-right: 32px;
}
.action-btn {
  flex: 1;
  border-radius: 4px;
  border-color: #267aff;
  border-width: 1px;
  justify-content: center;
  align-items: center;
  height: 84px;
  margin-top: 32px;
}
.action-btn-disable {
  border-color: #e5e5e8;
}
.action-btn-text {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #267aff;
  text-align: center;
}
.action-btn-text-disable {
  color: #e5e5e8;
}
.result-header {
  flex-direction: row;
  justify-content: space-between;
}
.result-title {
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 32px;
  color: #000000;
  padding-bottom: 24px;
  width: 500px;
}
.result-price {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #ff9500;
}
.result-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  padding-bottom: 32px;
}
.empty-page {
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  margin-top: 24px;
  padding-top: 60px;
  padding-bottom: 60px;
}
.empty-page-icon {
  width: 240px;
  height: 240px;
}
.empty-page-text {
  padding-top: 36px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #888888;
  text-align: center;
}
</style>
