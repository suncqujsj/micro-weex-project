<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller v-if="!isSearchMode" class="content-wrapper">
            <div class="base-group">
                <div class="item-group">
                    <text class="type-select-label">以下为选填信息，有助于更快更好地为您服务{{orgCode}}</text>
                </div>
                <div class="item-group">
                    <scan-input placeholder="请输入或扫机身条码" v-model="barCode" @input="resetData" @scanCode="scanCode"></scan-input>
                </div>
                <div class="item-group">
                    <input class="item-input" placeholder="请输入型号" :autofocus=false v-model="productModel" @focus="isSearchMode=true" />
                </div>
            </div>
            <div class="base-group">
                <midea-cell title="" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="pickDate">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">购买产品时间</text>
                        <text class="cell-label-star">*</text>
                    </div>
                    <div slot="rightText">
                        <text class="right-text">{{date?date:'请选择'}}</text>
                    </div>
                </midea-cell>
            </div>

            <div v-if="result" class="base-group">
                <div class="item-group">
                    <text class="result-title">{{result.warrantyStandardName}}</text>
                    <text class="result-desc">{{result.warrantyStandardDesc}}</text>
                </div>
            </div>
        </scroller>
        <div class="search-mode" v-if="isSearchMode">
            <div class="base-group">
                <div class="item-group">
                    <input class="item-input" placeholder="请输入型号" return-key-type="search" :autofocus=true v-model="searchModelKeyWord" @input="searchproductModel" />
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

import { MideaCell } from '@/index'
import ScanInput from '@/customer-service/components/scanInput.vue'

const picker = weex.requireModule('picker')

export default {
    components: {
        MideaCell,
        ScanInput
    },
    mixins: [base],
    data() {
        return {
            title: '包修政策',
            barCode: '',
            productCode: '',
            orgCode: "",
            productModel: '',
            timeoutHandler: null,
            searchModelKeyWord: '',
            isSearchMode: false,
            searchPageIndex: 0,
            date: null,
            productList: null,
            result: null
        }
    },
    computed: {
    },
    methods: {
        resetData(event) {
            this.date = null
            this.result = null
            this.searchPageIndex = 0
        },
        scanCode(result) {
            this.resetData()
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
                            return item.prodType.orgCode && item.prodType.orgCode.length > 0
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
            this.resetData()
        },
        pickDate() {
            if (!this.barCode && !this.productModel) {
                nativeService.toast('请输入型号或扫机身条码')
                return
            }
            picker.pickDate({
                'value': this.date,
                'max': util.dateFormat(new Date(), "yyyy-MM-dd"),
                'min': '2000-01-01',
                'title': '选择日期', //取消和确定中间那标题
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#000000', //取消颜色
                'confirmTxtColor': '#000000', //标题颜色
                'titleColor': '#000000', //标题颜色
                'titleBgColor': '#E5E5E8' //标题栏颜色
            }, event => {
                var result = event.result;
                if (result == 'success') {
                    this.date = event.data;
                    //条码
                    let param = {
                        barcode: this.barCode,
                        productCode: this.productCode,
                        orgCode: this.orgCode,
                        purchaseDate: util.dateFormat(new Date(this.date), "yyyy-MM-dd")
                    }
                    nativeService.querywarrantydescbycodeorsn(param).then((data) => {
                        this.result = data
                    }).catch((error) => {
                        nativeService.toast(nativeService.getErrorMessage(error))
                    })
                }
            });
        },
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
.content-wrapper {
  flex-direction: column;
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
.right-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  padding-right: 24px;
  text-align: right;
  width: 480px;
}
.item-group {
  padding: 24px;
  background-color: #ffffff;
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
.result-title {
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 32px;
  color: #000000;
  padding-bottom: 24px;
}
.result-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  padding-bottom: 32px;
}
</style>
