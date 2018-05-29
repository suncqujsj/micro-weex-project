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
                <text class="product-brand product-brand-selected">我的家电</text>
                <text class="product-brand">美的</text>
                <text class="product-brand">小天鹅</text>
                <text class="product-brand">雪尔</text>
                <text class="product-brand">华凌</text>
                <text class="product-brand">美的</text>
                <text class="product-brand">美的</text>
                <text class="product-brand">美的</text>
                <text class="product-brand">美的</text>
                <text class="product-brand">美的</text>
                <text class="product-brand">美的</text>
                <text class="product-brand">美的</text>
                <text class="product-brand">美的</text>
                <text class="product-brand">美的</text>
                <text class="product-brand">美的</text>
                <text class="product-brand">美的</text>
                <text class="product-brand">美的</text>
                <text class="product-brand">美的</text>
                <text class="product-brand">美的</text>
            </scroller>
            <scroller class="product-content-right">
                <div class="product-group">
                    <text class="product-group-title">空调</text>
                    <div class="product-group-content">
                        <div class="product-appliance" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">家用空调家用空调</text>
                        </div>
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">家用空调</text>
                        </div>
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">家用空调</text>
                        </div>
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">家用空调</text>
                        </div>
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">家用空调</text>
                        </div>
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">家用空调</text>
                        </div>
                    </div>
                </div>

                <div class="product-group">
                    <text class="product-group-title">洗衣机</text>
                    <div class="product-group-content">
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                    </div>
                </div>
                <div class="product-group">
                    <text class="product-group-title">洗衣机</text>
                    <div class="product-group-content">
                        <div class="product-appliance" @click="selectItem">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                    </div>
                </div>
                <div class="product-group">
                    <text class="product-group-title">洗衣机</text>
                    <div class="product-group-content">
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                        <div class="product-appliance">
                            <image class="appliance-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                            <text class="appliance-name">洗衣机</text>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
        <div class="action-bar">
            <div class="product-selected-items">
                <text class="product-action">洗衣机</text>
                <text class="product-action">电冰箱</text>
                <text class="product-action">洗碗机</text>
            </div>
            <text class="action-btn" @click="submit">完成</text>
        </div>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'
import { MideaDialog } from '@/index'

export default {
    components: {
        MideaDialog
    },
    mixins: [base],
    data() {
        return {
            title: '选择需服务产品',
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
            fromPage: ''
        }
    },
    methods: {
        searchProduct() {
            this.goTo("productSearch", {}, { from: this.fromPage })
        },
        selectItem() {
            this.back()
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
.product-appliance {
  width: 144px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-color: #f2f2f2;
  border-width: 4px;
  margin-right: 24px;
  margin-bottom: 24px;
  padding: 16px;
}
.appliance-img {
  height: 124px;
  width: 124px;
}
.appliance-name {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  text-align: center;
  padding-top: 10px;
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
.product-selected-items {
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.product-action {
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
  margin-right: 32px;
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
</style>
