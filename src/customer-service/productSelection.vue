<template>
    <div>
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <div class="search-bar">
            <div class="search-bar-content" @click="searchProduct">
                <image class="search-bar-img" :src="'./assets/img/service_ic_sreach@3x.png'" resize="contain"></image>
                <text class="search-bar-desc">请输入产品品类，如空调、洗衣机</text>
            </div>
        </div>
        <div class="product-content">
            <scroller class="">
                <text v-for="(item,index) in brandList" :key="index" v-bind:class="['product-brand',
                    index==selectedBrandIndex?'product-brand-selected':'']" @click="selectBrand(index)">{{item.name}}</text>
            </scroller>
            <scroller class="product-content-right">
                <div class="product-group">
                    <text class="product-group-title">空调</text>
                    <div class="product-group-content">
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">家用空调</text>
                            <image v-if="isMultiMode" class="appliance-add-img" :src="'./assets/img/service_ic_addone@3x.png'" resize="contain"></image>
                        </div>
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">家用空调</text>
                            <image v-if="isMultiMode" class="appliance-add-img" :src="'./assets/img/service_ic_addone@3x.png'" resize="contain"></image>
                        </div>
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">家用空调</text>
                        </div>
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">家用空调</text>
                        </div>
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">家用空调</text>
                        </div>
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">家用空调</text>
                        </div>
                    </div>
                </div>

                <div class="product-group">
                    <text class="product-group-title">洗衣机</text>
                    <div class="product-group-content">
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                    </div>
                </div>
                <div class="product-group">
                    <text class="product-group-title">洗衣机</text>
                    <div class="product-group-content">
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                    </div>
                </div>
                <div class="product-group">
                    <text class="product-group-title">洗衣机</text>
                    <div class="product-group-content">
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance-wrapper" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
        <div v-if="isShowAnimation" class="animation-outer" ref="outer">
            <div class="animation-inner" ref="inner" :style="{'left': animationConfig.startX,'top': animationConfig.startY}">
                <image class="animation-img" :src="'./assets/img/progress.png'" resize="contain"></image>
            </div>
        </div>
        <div v-if="isMultiMode" class="action-bar">
            <div class="product-selected-items-wrapper">
                <scroller class="product-selected-items" scroll-direction="horizontal">
                    <div class="selected-action-wrapper">
                        <text class="selected-action-desc">洗衣机</text>
                        <image class="selected-action-img" :src="'./assets/img/service_ic_delone@3x.png'" resize="contain"></image>
                    </div>
                    <div class="selected-action-wrapper">
                        <text class="selected-action-desc">洗衣机</text>
                        <image class="selected-action-img" :src="'./assets/img/service_ic_delone@3x.png'" resize="contain"></image>
                    </div>
                    <div class="selected-action-wrapper">
                        <text class="selected-action-desc">洗衣机</text>
                        <image class="selected-action-img" :src="'./assets/img/service_ic_delone@3x.png'" resize="contain"></image>
                    </div>
                    <div class="selected-action-wrapper">
                        <text class="selected-action-desc">洗衣机</text>
                        <image class="selected-action-img" :src="'./assets/img/service_ic_delone@3x.png'" resize="contain"></image>
                    </div>
                    <div class="selected-action-wrapper">
                        <text class="selected-action-desc">洗衣机</text>
                        <image class="selected-action-img" :src="'./assets/img/service_ic_delone@3x.png'" resize="contain"></image>
                    </div>
                    <div class="selected-action-wrapper">
                        <text class="selected-action-desc">洗衣机</text>
                        <image class="selected-action-img" :src="'./assets/img/service_ic_delone@3x.png'" resize="contain"></image>
                    </div>
                </scroller>
            </div>
            <text class="action-btn" @click="submit">完成</text>
        </div>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'
import { MideaDialog } from '@/index'

const animation = weex.requireModule('animation')

export default {
    components: {
        MideaDialog
    },
    mixins: [base],
    data() {
        return {
            title: '选择需服务产品',
            brandList: [
                { id: 0, name: '我的家电' },
                { id: 1, name: '美的' },
                { id: 2, name: '小天鹅' },
                { id: 3, name: '雪尔' },
                { id: 4, name: '华凌' }
            ],
            selectedBrandIndex: 0,
            productList: [
                {
                    category: '',
                    list: [
                        {
                            name: "家用空调",
                            imageUrl: './assets/img/progress.png'
                        }
                    ]
                }
            ],
            dialogShow: false,
            fromPage: '',
            toPage: '',
            isMultiMode: false,
            isShowAnimation: false,
            animationConfig: {
                startX: 0,
                startY: 0
            }
        }
    },
    methods: {
        searchProduct() {
            this.goTo("productSearch", {}, { from: this.fromPage })
        },
        selectBrand(index) {
            this.selectedBrandIndex = index
        },
        selectItem(event) {
            if (this.isMultiMode) {
                // nativeService.toast(event)
                this.showSelectAnimation(event)
            } else {
                if (this.toPage) {
                    this.goTo(this.toPage, {}, { from: this.fromPage })
                } else {
                    this.back()
                }
            }
        },
        showSelectAnimation(event) {
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
                    this.isShowAnimation = false
                })
                animation.transition(innerEl, {
                    styles: {
                        transform: 'translateY(' + (this.pageHeight - event.position.y) + 'px) scale(0.5)',
                        transformOrigin: 'center center'
                    },
                    duration: 800, //ms
                    timingFunction: 'cubic-bezier(.38,-0.93,.66,.74)',
                    delay: 0 //ms
                }, function () {
                })
            })
        },
        submit() {
            this.dialogShow = true;
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
        this.fromPage = nativeService.getParameters('from')
        this.toPage = nativeService.getParameters('to')
        this.isMultiMode = nativeService.getParameters('isMultiMode')
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
  color: #000000;
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
