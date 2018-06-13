<template>
    <div>
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <div class="search-bar">
            <div class="search-bar-content" @click="searchProduct">
                <image class="search-bar-img" :src="'./assets/img/service_ic_sreach@3x.png'" resize="contain"></image>
                <text class="search-bar-desc">请输入产品品类，如空调、洗衣机</text>
            </div>
        </div>
        <div class="product-content">
            <scroller class="product-content-left">
                <text v-for="(brandItem,brandIndex) in productData" :key="brandIndex" v-bind:class="['product-brand',
                    brandIndex==selectedBrandIndex?'product-brand-selected':'']" @click="selectBrand(brandIndex)">{{brandItem.brand}}</text>
            </scroller>
            <scroller class="product-content-right">
                <div class="product-group" v-for="(categaryItem,index) in selectedBrandProductData" :key="index" @appear="showImage($event, categaryItem)">
                    <text class="product-group-title">{{categaryItem.prodName}}</text>
                    <div class="product-group-content">
                        <div class="product-appliance-wrapper" v-for="(productItem,productIndex) in categaryItem.children" :key="productIndex" @click="selectProductItem($event, productItem)">
                            <image class="appliance-img" :src="categaryItem.isShowImage?productItem.imageUrl:''" resize="contain"></image>
                            <text class="appliance-name">{{productItem.prodName}}</text>
                            <image v-if="isMultiMode && !checkIsSelected(productItem)" class="appliance-add-img" src="./assets/img/service_ic_addone@3x.png" resize="contain"></image>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
        <div v-if="isShowAnimation" class="animation-outer" ref="outer">
            <div class="animation-inner" ref="inner" :style="{'left': animationConfig.startX,'top': animationConfig.startY}">
                <image class="animation-img" :src="'./assets/img/product/default.png'" resize="contain"></image>
            </div>
        </div>
        <div v-if="isMultiMode" class="action-bar">
            <div class="product-selected-items-wrapper">
                <scroller class="product-selected-items" scroll-direction="horizontal">
                    <div class="selected-action-wrapper" v-for="(item,index) in selectedProductArray" :key="index" :ref="'selectedProduct'+index" @click="removeSelectedProduct(index)">
                        <text class="selected-action-desc">{{item.prodName}}</text>
                        <image class="selected-action-img" :src="'./assets/img/service_ic_delone@3x.png'" resize="contain"></image>
                    </div>
                </scroller>
            </div>
            <text v-bind:class="['action-btn',selectedProductArray.length>0?'':'disable-btn']" @click="submit">完成</text>
        </div>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'
import { MideaDialog } from '@/index'

const animation = weex.requireModule('animation')
const dom = weex.requireModule('dom')

export default {
    components: {
        MideaDialog
    },
    mixins: [base],
    data() {
        return {
            title: '选择需服务产品',
            productData: [],
            selectedBrandIndex: 0,
            dialogShow: false,
            isMultiMode: false,
            enableAnimation: true,
            isShowAnimation: false,
            isProceedingSelection: false,
            animationConfig: {
                startX: 0,
                startY: 0
            },
            selectedProductArray: [],
        }
    },
    computed: {
        selectedBrandProductData() {
            let result
            if (this.productData && this.productData.length > 0) {
                result = this.productData[this.selectedBrandIndex].productTypeDTOList
            }
            return result
        }
    },
    methods: {
        handlePageData(data) {
            if (data.page == "productSelection") {
                if (data.key == "selectedProduct") {
                    this.selectProductItem(null, data.data[0])
                }
            }
        },
        searchProduct() {
            if (this.isMultiMode) {
                //选择后返回本页
                this.goTo("productSearch", {}, { from: 'productSelection' })
            } else {
                //选择后跳转到toPage页
                this.goTo("productSearch", {}, { from: this.fromPage, to: this.toPage })
            }
        },
        selectBrand(index) {
            this.selectedBrandIndex = index
        },
        showImage(event, item) {
            item.isShowImage = true
        },
        checkIsSelected(productItem) {
            let result = []
            if (this.selectedProductArray) {
                result = this.selectedProductArray.filter((item) => {
                    return item.brandCode == productItem.brandCode && item.prodCode == productItem.prodCode
                })
            }
            return result.length > 0 ? true : false
        },
        selectProductItem(event, productItem) {
            if (this.isProceedingSelection) return

            if (this.isMultiMode) {
                //多选模式
                if (!this.checkIsSelected(productItem)) {
                    //之前未被选中
                    if (this.selectedProductArray.length < 5) {
                        this.isProceedingSelection = true
                        if (event && this.enableAnimation) {
                            this.showSelectAnimation(event, () => {
                                this.selectedProductArray.push(productItem)
                                this.isProceedingSelection = false
                                this.$nextTick(() => {
                                    const el = this.$refs["selectedProduct" + (this.selectedProductArray.length - 1)][0]
                                    dom.scrollToElement(el, {})
                                })
                            })
                        } else {
                            this.selectedProductArray.push(productItem)
                            this.isProceedingSelection = false
                            this.$nextTick(() => {
                                const el = this.$refs["selectedProduct" + (this.selectedProductArray.length - 1)][0]
                                dom.scrollToElement(el, {})
                            })
                        }
                    } else {
                        nativeService.toast("最多只能选5个")
                    }
                }
            } else {
                this.selectedProductArray.splice(0, this.selectedProductArray.length, productItem)
                this.isProceedingSelection = false
                this.submit()
            }
        },
        showSelectAnimation(event, callback) {
            this.animationConfig.startX = event.position.x
            this.animationConfig.startY = event.position.y

            this.isShowAnimation = true
            this.$nextTick(() => {
                //清楚之前的效果
                var outerEl = this.$refs.outer;
                animation.transition(outerEl, {
                    styles: {
                        transform: 'translateX(0px)',
                        transformOrigin: 'center center'
                    },
                    duration: 0, //ms
                    timingFunction: 'linear',
                    delay: 0 //ms
                })
                var innerEl = this.$refs.inner;
                animation.transition(innerEl, {
                    styles: {
                        transform: 'translateY(0px)',
                        transformOrigin: 'center center'
                    },
                    duration: 0, //ms
                    timingFunction: 'linear',
                    delay: 0 //ms
                })
                //执行动画
                animation.transition(outerEl, {
                    styles: {
                        transform: 'translateX(' + (100 - event.position.x) + 'px)',
                        transformOrigin: 'center center'
                    },
                    duration: 800, //ms
                    timingFunction: 'linear',
                    delay: 0 //ms
                }, function () {
                })
                animation.transition(innerEl, {
                    styles: {
                        transform: 'translateY(' + (this.pageHeight - event.position.y - 100) + 'px) scale(0.5)',
                        transformOrigin: 'center center'
                    },
                    duration: 801, //ms
                    timingFunction: 'cubic-bezier(.38,-0.93,.66,.74)',
                    delay: 0 //ms
                }, function () {
                    callback()
                    this.isShowAnimation = false
                })
            })
        },
        removeSelectedProduct(index) {
            this.selectedProductArray.splice(index, 1)
        },
        submit() {
            if (this.selectedProductArray.length <= 0) return

            if (this.toPage) {
                nativeService.setItem(this.SERVICE_STORAGE_KEYS.selectedProductArray, this.selectedProductArray,
                    () => {
                        this.goTo(this.toPage, {}, { from: this.fromPage })
                    })
            } else {
                this.appPageDataChannel.postMessage({ page: this.fromPage, key: "selectedProduct", data: this.selectedProductArray })
                this.back()
            }
        },
        submitConfirm() {
            this.dialogShow = false;
        },
        submitOrderConfirm() {
            this.dialogShow = false;
        },
    },
    created() {
        nativeService.getProdType().then((data) => {
            this.productData = data
        })

        this.isMultiMode = nativeService.getParameters('isMultiMode')
        if (this.isMultiMode) {
            nativeService.getItem(this.SERVICE_STORAGE_KEYS.selectedProductArray, (resp) => {
                if (resp.result == 'success') {
                    this.selectedProductArray = JSON.parse(resp.data) || []
                }
            })
        }
    }
}
</script>

<style>
.search-bar {
  width: 750px;
  height: 96px;
  justify-content: center;
  align-items: center;
  padding-top: 16px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 16px;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
  background-color: #ffffff;
}
.search-bar-content {
  width: 686px;
  height: 64px;
  border-radius: 4px;
  background-color: #f2f2f2;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.search-bar-img {
  height: 40px;
  width: 40px;
  margin-right: 10px;
}
.search-bar-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #c8c7cc;
}
.product-content {
  flex: 1;
  flex-direction: row;
}
.product-content-left {
  flex: 1;
  align-content: center;
  align-items: center;
  border-right-color: #e5e5e8;
  border-right-width: 2px;
}
.product-brand {
  width: 200px;
  height: 96px;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  text-align: center;
  padding-top: 34px;
  padding-right: 16px;
  padding-bottom: 34px;
  padding-left: 16px;
}
.product-brand-selected {
  font-family: PingFangSC-Medium;
  font-weight: 600;
  color: #000000;
  background-color: #f2f2f2;
}
.product-content-right {
  flex: 2.75;
  justify-content: flex-start;
  align-items: center;
}
.product-group {
  margin-bottom: 30px;
}
.product-group-title {
  width: 550px;
  padding: 32px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
}
.product-group-content {
  width: 550px;
  padding-left: 32px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: wrap;
}
.product-appliance-wrapper {
  width: 144px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-color: #f2f2f2;
  border-width: 4px;
  margin-right: 24px;
  margin-bottom: 24px;
  padding: 10px;
}
.appliance-img {
  height: 124px;
  width: 124px;
}
.appliance-add-img {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 24px;
  width: 24px;
}
.appliance-name {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  text-align: center;
  padding-top: 5px;
}
.action-bar {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 750px;
  height: 96px;
  padding-right: 32px;
  padding-left: 40px;
  border-top-color: #e2e2e2;
  border-top-width: 1px;
  background-color: #ffffff;
}
.product-selected-items-wrapper {
  flex: 1;
  padding-right: 32px;
}
.product-selected-items {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}
.selected-action-wrapper {
  position: relative;
  margin-right: 20px;
  padding: 8px;
}

.selected-action-desc {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  text-align: center;
  background-color: #f6f6f6;
  border-radius: 4px;
  padding-top: 10px;
  padding-right: 16px;
  padding-bottom: 10px;
  padding-left: 16px;
}
.selected-action-img {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 24px;
  width: 24px;
}
.action-btn {
  width: 120px;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  background-color: #267aff;
  border-radius: 4px;
  padding-top: 10px;
  padding-right: 18px;
  padding-bottom: 10px;
  padding-left: 18px;
  opacity: 1;
}
.disable-btn {
  opacity: 0.2;
}
.animation-outer {
  position: absolute;
  width: 750px;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
.animation-inner {
  position: absolute;
  width: 124px;
  height: 124px;
}
.animation-img {
  height: 124px;
  width: 124px;
}
</style>
