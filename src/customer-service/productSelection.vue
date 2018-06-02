<template>
    <div>
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <div class="search-bar">
            <div class="search-bar-content" @click="searchProduct">
                <image class="search-bar-img" :src="'./assets/img/service_ic_sreach@3x.png'" resize="contain"></image>
                <text class="search-bar-desc">请输入产品品类，如空调、洗衣机{{productData.length}}</text>
            </div>
        </div>
        <div class="product-content">
            <scroller class="product-content-left">
                <text v-for="(item,index) in productData" :key="index" v-bind:class="['product-brand',
                    index==selectedBrandIndex?'product-brand-selected':'']" @click="selectBrand(index)">{{item.brand}}</text>
            </scroller>
            <scroller class="product-content-right">
                <div class="product-group" v-for="(item,index) in selectedBranchProductData" :key="index">
                    <text class="product-group-title">{{item.prodName}}</text>
                    <div class="product-group-content">
                        <div class="product-appliance-wrapper" v-for="(childrenItem,childrenIndex) in item.children" :key="childrenIndex" @click="selectItem($event, childrenItem)">
                            <image class="appliance-img" :src="'./assets/img/service_midea@3x.png'" resize="contain"></image>
                            <text class="appliance-name">{{childrenItem.prodName}}</text>
                            <image v-if="isMultiMode && childrenItem.isSelected!=true" class="appliance-add-img" :src="'./assets/img/service_ic_addone@3x.png'" resize="contain"></image>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
        <div v-if="isShowAnimation" class="animation-outer" ref="outer">
            <div class="animation-inner" ref="inner" :style="{'left': animationConfig.startX,'top': animationConfig.startY}">
                <image class="animation-img" :src="'./assets/img/service_midea@3x.png'" resize="contain"></image>
            </div>
        </div>
        <div v-if="isMultiMode" class="action-bar">
            <div class="product-selected-items-wrapper">
                <scroller class="product-selected-items" scroll-direction="horizontal">
                    <div class="selected-action-wrapper" v-for="(item,index) in selectedProduct" :key="index" :ref="'selectedProduct'+index" @click="removeSelectedProduct(index)">
                        <text class="selected-action-desc">{{item.prodName}}</text>
                        <image class="selected-action-img" :src="'./assets/img/service_ic_delone@3x.png'" resize="contain"></image>
                    </div>
                </scroller>
            </div>
            <text v-bind:class="['action-btn',selectedProduct.length>0?'':'disable-btn']" @click="submit">完成</text>
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
            animationConfig: {
                startX: 0,
                startY: 0
            },
            selectedProduct: [],
        }
    },
    computed: {
        selectedBranchProductData() {
            let result
            if (this.productData && this.productData.length > 0) {
                result = this.productData[this.selectedBrandIndex].productTypeDTOList
            }
            return result
        }
    },
    methods: {
        searchProduct() {
            this.goTo("productSearch", {}, { from: this.fromPage })
        },
        selectBrand(index) {
            this.selectedBrandIndex = index
        },
        selectItem(event, item) {
            if (this.isMultiMode) {
                if (item.isSelected != true) {
                    if (this.selectedProduct.length < 5) {
                        this.$set(item, "isSelected", true)
                        if (this.enableAnimation) {
                            this.showSelectAnimation(event, () => {
                                this.selectedProduct.push(item)
                                this.$nextTick(() => {
                                    const el = this.$refs["selectedProduct" + (this.selectedProduct.length - 1)][0]
                                    dom.scrollToElement(el, {})
                                })
                            })
                        } else {
                            this.selectedProduct.push(item)
                            this.$nextTick(() => {
                                const el = this.$refs["selectedProduct" + (this.selectedProduct.length - 1)][0]
                                dom.scrollToElement(el, {})
                            })
                        }
                    } else {
                        nativeService.toast("最多只能选5个")
                    }
                }
            } else {
                this.selectedProduct.push(item)
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
            this.$set(this.selectedProduct[index], "isSelected", false)
            this.selectedProduct.splice(index, 1)
        },
        submit() {
            if (this.selectedProduct.length <= 0) return

            let result = this.selectedProduct
            if (this.toPage) {
                nativeService.setItem("SERVICE_STORAGE_selectedProduct", result,
                    () => {
                        this.goTo(this.toPage, {}, { from: this.fromPage })
                    })
            } else {
                this.appPageDataChannel.postMessage({ page: this.fromPage, key: "selectedProduct", data: result })
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
    beforeCreate: function () {
        //目前支持ttf、woff文件，不支持svg、eot类型,moreItem at http://www.iconfont.cn/
        var domModule = weex.requireModule('dom');
        try {
            nativeService.getPath((path) => {
                let fontUrl = path + 'assets/font/midea_font.ttf'
                domModule.addRule('fontFace', {
                    'fontFamily': "iconfont",
                    'src': "url('" + fontUrl + "')"
                });
            })
        } catch (error) { }

    },
    created() {
        this.isMultiMode = nativeService.getParameters('isMultiMode')
        if (this.isMultiMode) {
            nativeService.getItem("SERVICE_STORAGE_selectedProduct", (resp) => {
                if (resp.result == 'success') {
                    this.selectedProduct = JSON.parse(resp.data) || []
                }
            })
        }

        nativeService.searchProductType().then((data) => {
            this.productData = data
        })
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
