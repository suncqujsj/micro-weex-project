<template>
    <div>
        <midea-header v-if="!isIos" :title="title" :isImmersion="isipx?false:true" @headerClick="headerClick" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <div class="search-bar" :style="{'height':isIos?'136px':'96px','padding-top':isIos?'40px':'0px'}">
            <div class="search-bar-content" v-bind:class="[isIos?'':'search-bar-top']">
                <image class="search-bar-img" :src="'./assets/img/service_ic_sreach@3x.png'" resize="contain"></image>
                <input class="search-bar-input" placeholder="请输入产品品类，如空调、洗衣机" v-model="keyWord" maxlength="20" @return="keyBoardsearch" :autofocus=true return-key-type="search"></input>
                <image v-if="keyWord.length>0" class="search-bar-close" :src="'./assets/img/me_ic_return@3x.png'" resize="contain" @click="keyWord=''"></image>
            </div>
            <text v-if="isIos" class="search-action" @click="back">取消</text>
            <text v-if="!isIos" class="search-action" @click="searchProduct(keyWord)">搜索</text>
        </div>
        <scroller class="product-content">
            <template v-if="convertedProductList && convertedProductList.length>0">
                <div v-for="(item, index) in convertedProductList" @click="selectItem(item)" :key="index">
                    <div class="search-result-content">
                        <midea-rich-text class="search-result-desc" :hasTextMargin="false" :config-list="item.richDesc"></midea-rich-text>
                    </div>
                </div>
            </template>
            <div v-else class="search-history-block">
                <text class="search-history-title">历史记录</text>
                <div class="search-history">
                    <text class="search-history-item" v-for="(item,index) in historyKeys" :key="index" @click="searchProduct(item)">{{item}}</text>
                </div>
            </div>
            <div class="empty-page" v-if="isLoaded && convertedProductList.length == 0">
                <image class="empty-page-icon" src="./assets/img/default_ic_noresult@3x.png" resize='contain'>
                </image>
                <text class="empty-page-text">抱歉 {{'\n'}}没有找到“{{searchKeyWord}}”相关的产品</text>
            </div>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService'

import { MideaDialog, MideaGridSelect, MideaRichText } from '@/index'

export default {
    components: {
        MideaDialog,
        MideaGridSelect,
        MideaRichText
    },
    mixins: [base],
    data() {
        return {
            title: '产品搜索',
            keyWord: '',
            searchKeyWord: '',
            historyKeys: [],
            dialogShow: false,
            productList: []
        }
    },
    computed: {
        convertedProductList() {
            let result = []
            if (this.searchKeyWord && this.productList && this.productList.length > 0) {
                let reg = new RegExp(this.searchKeyWord, "gi")
                for (let index = 0; index < this.productList.length; index++) {
                    const brandItem = this.productList[index]
                    for (let indexChild = 0; indexChild < brandItem.productTypeDTOList.length; indexChild++) {
                        const productCategary = brandItem.productTypeDTOList[indexChild];
                        let matchProductArray = productCategary.children.filter((product) => {
                            return reg.test(brandItem.brand + product.prodName)
                        })
                        for (let indexMatch = 0; indexMatch < matchProductArray.length; indexMatch++) {
                            let product = matchProductArray[indexMatch];
                            let richDesc = []
                            let desc = (brandItem.brand + product.prodName).replace(reg, ",*,")
                            let descArray = desc.split(',')
                            for (let i = 0; i < descArray.length; i++) {
                                const descItem = descArray[i];
                                if (descItem == "*") {
                                    richDesc.push({
                                        type: 'text',
                                        value: this.searchKeyWord,
                                        style: {
                                            fontSize: 28,
                                            color: '#FF8F00'
                                        }
                                    })
                                } else if (descItem) {
                                    richDesc.push({
                                        type: 'text',
                                        value: descItem,
                                        style: {
                                            fontSize: 28,
                                            color: '#000000'
                                        }
                                    })
                                }
                            }
                            result.push({ 'product': product, 'richDesc': richDesc })
                        }
                    }
                }
            }
            return result
        }
    },
    methods: {
        keyBoardsearch(event) {
            this.searchProduct(event.value)
        },
        searchProduct(value) {
            if (!value) {
                nativeService.toast("请输入搜索关键字")
                return
            }
            this.keyWord = value

            this.searchKeyWord = this.keyWord
            this.isLoaded = true
            if (this.historyKeys.indexOf(this.searchKeyWord) < 0) {
                this.historyKeys.push(this.searchKeyWord)
                if (this.historyKeys.length > 8) {
                    this.historyKeys.shift()
                }
                nativeService.setItem(this.SERVICE_STORAGE_KEYS.historyKeys, this.historyKeys, () => { })
            }
        },
        selectItem(item) {
            if (this.toPage) {
                nativeService.setItem(this.SERVICE_STORAGE_KEYS.selectedProductArray, [item.product],
                    () => {
                        this.goTo(this.toPage, {}, { from: this.fromPage })
                    })
            } else {
                this.appPageDataChannel.postMessage({ page: this.fromPage, key: "selectedProduct", data: [item.product] })
                this.back({ viewTag: this.fromPage })
            }
        }
    },
    created() {
        nativeService.getItem(this.SERVICE_STORAGE_KEYS.historyKeys, (resp) => {
            if (resp.result == 'success') {
                this.historyKeys = JSON.parse(resp.data) || []
            }
        })
        this.isMultiMode = nativeService.getParameters('isMultiMode')
        if (this.isMultiMode) {
            //报装 - 支持安装的产品品类列表
            let param = {
                version: "1.0",
                codeType: "bzbx"
            }
            nativeService.getProdTypeForInstallation(param).then((data) => {
                this.productList = data
            }).catch((error) => {
                nativeService.toast(nativeService.getErrorMessage(error))
            })
        } else {
            //所有产品品类列表
            let param = {
                version: "1.0",
                codeType: ""
            }
            nativeService.getProdType(param).then((data) => {
                this.productList = data
            }).catch((error) => {
                nativeService.toast(nativeService.getErrorMessage(error))
            })
        }
    }
}
</script>

<style>
.search-bar {
  width: 750px;
  height: 96px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
  background-color: #ffffff;
}
.search-bar-content {
  flex: 1;
  width: 586px;
  height: 64px;
  border-radius: 4px;
  background-color: #f2f2f2;
  flex-direction: row;
  align-items: center;
  margin-left: 32px;
}
.search-bar-top {
  border-top-color: #e2e2e2;
  border-top-width: 1px;
}
.search-bar-img {
  height: 40px;
  width: 40px;
  margin-left: 8px;
  margin-right: 8px;
}
.search-bar-input {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  height: 40px;
}
.search-bar-close {
  height: 40px;
  width: 40px;
  margin-left: 10px;
  margin-right: 10px;
}
.search-action {
  width: 120px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  text-align: center;
}

.search-history-block {
  padding: 32px;
}
.search-history-title {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  margin-bottom: 34px;
}
.search-history {
  flex-direction: row;
  flex-wrap: wrap;
}
.search-history-item {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  padding-top: 10px;
  padding-right: 24px;
  padding-bottom: 10px;
  padding-left: 24px;
  margin-right: 30px;
  margin-bottom: 30px;
  border-radius: 4px;
  background-color: #f2f2f2;
}

.search-result-content {
  flex: 1;
  /* width: 586px; */
  height: 90px;
  border-radius: 4px;
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
  margin-left: 32px;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
.search-result-img {
  height: 40px;
  width: 40px;
  margin-left: 10px;
  margin-right: 10px;
}
.search-result-desc {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
}
.empty-page {
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 160px;
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
