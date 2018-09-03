<template>
    <div>
        <midea-header :title="title" :isImmersion="isImmersion" @headerClick="headerClick" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <div class="search-bar">
            <div class="search-bar-content">
                <input class="search-bar-input" placeholder="请输入型号" :autofocus=true v-model="searchModelKeyWord" @return="true" @input="searchProduct" maxlength="100"></input>
                <image v-if="searchModelKeyWord.length>0" class="search-bar-close" :src="'./assets/img/me_ic_return@3x.png'" resize="contain" @click="searchModelKeyWord=''"></image>
            </div>
        </div>
        <scroller class="product-content" loadmoreoffset=50 @loadmore="loadmore">
            <div class="scroller-item-wrapper" v-for="(item, index) in productList" @click="selectItem(item)" :key="index">
                <text class="scroller-item">{{item.product.productModel}}</text>
            </div>
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
            title: '产品搜索',
            searchModelKeyWord: '',
            timeoutHandler: '',
            searchPageIndex: 0,
            productList: null
        }
    },
    computed: {
    },
    methods: {
        searchProduct(value) {
            //产品型号模糊查询
            if (this.timeoutHandler) {
                clearTimeout(this.timeoutHandler)
            }
            this.timeoutHandler = setTimeout(() => {
                this.getProductList().then((list) => {
                    this.productList = list
                })
            }, 500)
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
        selectItem(item) {
            this.appPageDataChannel.postMessage({ page: this.fromPage, key: "serviceMachineSearch", data: item })
            this.back()
        }
    },
    created() {
        this.searchModelKeyWord = nativeService.getParameters('keyword') || ""
        if (this.searchModelKeyWord) {
            this.getProductList().then((list) => {
                this.productList = list
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
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
  background-color: #ffffff;
}
.search-bar-content {
  flex: 1;
  height: 64px;
  border-radius: 4px;
  background-color: #f2f2f2;
  flex-direction: row;
  align-items: center;
  padding-left: 22px;
  padding-right: 22px;
  margin-left: 32px;
  margin-right: 32px;
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
</style>
