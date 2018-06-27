<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller class="content-wrapper">
            <div class="base-group">
                <div class="item-group">
                    <text class="type-select-label">以下为选填信息，有助于更快更好地为您服务</text>
                    <div class="search-history">
                        <text v-for="(item,index) in types" :key="index" v-bind:class="['search-history-item', typeSelectedIndex==index?'search-history-item-selected':'']" @click="typeSelected(index)">{{item.title}}</text>
                    </div>
                </div>

                <div class="item-group scan-group">
                    <input v-if="typeSelectedIndex==1" class="scan-input" placeholder="请输入型号或扫机身条码" :autofocus=false v-model="productCode" />
                    <input v-if="typeSelectedIndex==0" class="scan-input" placeholder="请输入型号或扫机身条码" :autofocus=false v-model="barCode" />
                    <image v-if="typeSelectedIndex==0" class="scan-icon" src="./assets/img/service_ic_scan@3x.png" resize='contain' @click="scanCode"></image>
                </div>

                <div class="item-group scan-group group-bottom-border">
                    <input class="scan-input" placeholder="请输入配件名称" :autofocus=false v-model="materialName" />
                </div>

                <div class="action-bar">
                    <midea-button text="查询" type="green" :btnStyle="{'background-color': '#267AFF','opacity':isDataReady?'1':'0.2','border-radius': '4px'}" @mideaButtonClicked="search">
                    </midea-button>
                </div>
            </div>

            <div class="base-group" v-for="(item, index) in materialList" :key="index">
                <div class="item-group result-header">
                    <text class="result-title">{{item.materialName}}</text>
                    <text class="result-price">指导价{{item.priceCustomer}}元</text>
                </div>
                <div class="item-group">
                    <text class="result-desc">若本价格标准高于当地物价部门制定有关标准，请以当地物价部门标准为准</text>
                </div>
            </div>
        </scroller>

        <midea-select :show="isShowProductList" title="选择产品" :items="formattedProductList" :index="0" @close="isShowProductList=false" @itemClick="selectProduct" :hideOnMask="false"></midea-select>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService'
import util from '@/common/util/util'

import { MideaButton, MideaSelect } from '@/index'

export default {
    components: {
        MideaButton,
        MideaSelect
    },
    mixins: [base],
    data() {
        return {
            title: '配件价格',
            types: [
                {
                    'title': '机身条码',
                    'checked': true
                },
                {
                    'title': '产品型号'
                }
            ],
            typeSelectedIndex: 0,
            barcode: '',
            productCode: '',
            productList: null,
            isShowProductList: false,
            selectedProduct: '',
            materialName: '',
            materialList: []
        }
    },
    computed: {
        formattedProductList() {
            let result
            if (this.productList) {
                result = this.productList.map((item) => {
                    return {
                        key: item.product.salesCode,
                        value: item.product.productModel,
                        orgCode: item.product.crmEntCode
                    }
                })
            }

            return result
        },
        isDataReady() {
            let result = false
            if (((this.typeSelectedIndex == 0 && this.barCode) || (this.typeSelectedIndex == 1 && this.productCode)) && this.materialName) {
                result = true
            }

            return result
        }
    },
    methods: {
        typeSelected(index) {
            this.typeSelectedIndex = index
        },
        scanCode() {
            nativeService.scanServiceCode().then(
                (result) => {
                    this.barcode = result.code
                }
            )
        },
        search() {
            if (!this.isDataReady) return

            if (this.typeSelectedIndex == 0) {
                //条码
            } else {
                //产品型号
                let param = {
                    version: "1.0",
                    code: this.barcode,
                    codeType: 10,
                    sourceTag: "3",
                    pageIndex: "1",
                    pageSize: "1000"
                }
                nativeService.getProdMessage(param).then((resp) => {
                    if (resp.code == 0) {
                        this.productList = resp.data.filter((item) => {
                            return item.product.orgCode
                        })
                        if (this.productList) {
                            if (this.productList.length == 1) {
                                this.selectedProduct = {
                                    salesCode: this.productList[0].product.salesCode,
                                    crmEntCode: this.productList[0].product.crmEntCode
                                }

                                this.getCharge()
                            } else if (this.productList.length > 1) {
                                this.isShowProductList = true
                            }
                        }
                    }
                }).catch((error) => {
                    nativeService.toast(nativeService.getErrorMessage(error))
                })
            }
        },
        selectProduct(event) {
            this.selectedProduct = {
                salesCode: event.key,
                crmEntCode: event.crmEntCode
            }
            this.getCharge()
        },
        getCharge() {
            let param = {
                pageSize: 1,
                pageNum: 100,
                productCode: this.selectedProduct.productCode,
                orgCode: this.selectedProduct.crmEntCode,
                materialName: this.materialName

            }
            nativeService.getChargePriceForMaterial(param).then((data) => {
                this.materialList = data.date || []
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
  padding: 24px;
  background-color: #ffffff;
}

.type-select-label {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  padding-bottom: 32px;
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
.scan-group {
  position: relative;
  padding-bottom: 32px;
}
.scan-input {
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
.scan-icon {
  position: absolute;
  top: 40px;
  right: 50px;
  height: 40px;
  width: 40px;
}
.action-bar {
  background-color: #ffffff;
  width: 750px;
  text-align: center;
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
</style>
