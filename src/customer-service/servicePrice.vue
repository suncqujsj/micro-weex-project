<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller v-if="!isSearchMode" class="content-wrapper">
            <div class="base-group">
                <div class="item-group">
                    <text class="type-select-label">以下为选填信息，有助于更快更好地为您服务 {{barCode}}
                    </text>
                </div>
                <div class="item-group">
                    <scan-input placeholder="请输入或扫机身条码" v-model="barCode" @scanCode="scanCode"></scan-input>
                </div>
                <div class="item-group">
                    <input class="item-input" placeholder="请输入型号" :autofocus=false v-model="productModel" @focus="isSearchMode=true" />
                </div>

                <div class="item-group scan-group group-bottom-border">
                    <input class="item-input" placeholder="请输入配件名称" :autofocus=false v-model="materialName" />
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
            <div class="empty-page" v-if="isLoaded && materialList.length == 0">
                <image class="empty-page-icon" src="./assets/img/default_ic_noresult@3x.png" resize='contain'>
                </image>
                <text class="empty-page-text">抱歉，没有找到相应的配件价格{{'\n'}}请重新搜索</text>
            </div>
        </scroller>

        <div v-if="isSearchMode">
            <div class="base-group">
                <div class="item-group">
                    <input class="item-input" placeholder="请输入型号" :autofocus=true v-model="searchModelKeyWord" @input="searchproductModel" />
                </div>
            </div>

            <scroller class="scroller" loadmoreoffset=50 @loadmore="loadmore">
                <div class="scroller-item-wrapper" v-for="(item, index) in productList" @click="selectProduct(item)" :key="index">
                    <text class="scroller-item">{{item.product.productModel}}</text>
                </div>
            </scroller>
        </div>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService'
import util from '@/common/util/util'

import { MideaButton, MideaSelect } from '@/index'
import ScanInput from '@/customer-service/components/scanInput.vue'

export default {
    components: {
        MideaButton,
        MideaSelect,
        ScanInput
    },
    mixins: [base],
    data() {
        return {
            title: '配件价格',
            typeSelectedIndex: 0,
            barcode: '',
            productCode: '',
            productModel: '',
            timeoutHandler: null,
            searchModelKeyWord: '',
            isSearchMode: false,
            searchPageIndex: 0,
            productList: null,
            selectedProduct: '',
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
        scanCode(result) {
            this.barCode = nativeService.convertScanResult(result).code
        },

        searchproductModel(event) {
            //产品型号模糊查询
            if (this.timeoutHandler) {
                clearTimeout(this.timeoutHandler)
            }
            this.timeoutHandler = setTimeout(() => {
                this.getProductList().then((list) => {
                    this.productList = list
                })
            }, 200)
        },
        loadmore() {
            if (this.searchModelKeyWord) {
                this.searchPageIndex++
                this.getProductList().then((list) => {
                    this.productList = this.productList.concat(this.productList, list)
                })
            }
        },
        getProductList() {
            return new Promise((resolve, reject) => {
                //产品型号模糊查询
                if (this.searchModelKeyWord) {
                    let param = {
                        version: "4.0",
                        code: this.searchModelKeyWord,
                        codeType: "10",
                        // dataSource: "CSS",
                        pageIndex: this.searchPageIndex + '',
                        pageSize: "20"
                    }
                    nativeService.getProdMessage(param).then((resp) => {
                        let result = resp.data.list.filter((item) => {
                            return item.prodType && item.prodType.orgCode && item.prodType.orgCode.length > 0
                        })
                        resolve(result)
                    }).catch((error) => {
                        nativeService.toast(nativeService.getErrorMessage(error))
                    })
                }
            })
        },
        selectProduct(product) {
            this.isSearchMode = false
            this.productModel = product.product.productModel
            this.productCode = product.product.salesCode
            this.orgCode = product.prodType.orgCode
        },
        search() {
            if (!this.isDataReady) return

            let param = {
                pageSize: 1,
                pageNum: 100,
                productCode: this.productCode,
                orgCode: this.orgCode,
                materialName: this.materialName

            }
            nativeService.getChargePriceForMaterial(param).then((data) => {
                this.materialList = data.date || []
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
  padding: 24px;
  background-color: #ffffff;
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
.scroller {
  flex: 1;
  height: 1000px;
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
