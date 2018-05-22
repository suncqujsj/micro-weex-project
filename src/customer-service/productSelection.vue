<template>
    <div>
        <midea-header :title="title" @leftImgClick="back"></midea-header>
        <div class="search-bar">
            <text class="search-bar-content" @click="searchProduct">&#xe606;Search</text>
        </div>
        <div class="product-content">
                <scroller class="product-content-left">
                    <text class="product-brand">我的家电</text>
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
                            <div class="product-appliance"  @click="selectItem">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">家用空调</text>
                            </div>
                            <div class="product-appliance">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">家用空调</text>
                            </div>
                            <div class="product-appliance">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">家用空调</text>
                            </div>
                            <div class="product-appliance">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">家用空调</text>
                            </div>
                        </div>
                    </div>
                    
                    <div class="product-group">
                        <text class="product-group-title">洗衣机</text>
                        <div class="product-group-content">
                            <div class="product-appliance">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">洗衣机</text>
                            </div>
                            <div class="product-appliance">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">洗衣机</text>
                            </div>
                            <div class="product-appliance">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">洗衣机</text>
                            </div>
                            <div class="product-appliance">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">洗衣机</text>
                            </div>
                        </div>
                    </div>
                    <div class="product-group">
                        <text class="product-group-title">洗衣机</text>
                        <div class="product-group-content">
                            <div class="product-appliance" @click="selectItem">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">洗衣机</text>
                            </div>
                            <div class="product-appliance">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">洗衣机</text>
                            </div>
                            <div class="product-appliance">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">洗衣机</text>
                            </div>
                            <div class="product-appliance">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">洗衣机</text>
                            </div>
                        </div>
                    </div>
                    <div class="product-group">
                        <text class="product-group-title">洗衣机</text>
                        <div class="product-group-content">
                            <div class="product-appliance">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">洗衣机</text>
                            </div>
                            <div class="product-appliance">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">洗衣机</text>
                            </div>
                            <div class="product-appliance">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">洗衣机</text>
                            </div>
                            <div class="product-appliance">
                                <image class="appliance-img" :src="'./assets/img/progress.png'"></image>
                                <text class="appliance-name">洗衣机</text>
                            </div>
                        </div>
                    </div>
                </scroller>
            </div>
        <div class="action-bar">
            <text class="action" @click="submit">完成</text>
        </div>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'
import {  MideaDialog } from '@/index'

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
            dialogShow: false
        }
    },
    methods: {
        searchProduct(){
            let fromPage = nativeService.getParameters('from')
            this.goTo("productSearch", {}, {from: fromPage})
        },
        selectItem(){
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
        } catch (error) {}

    },
    created() {

    }
}
</script>

<style>
.search-bar{
  width: 750px;
  height: 88px;
  justify-content: center;
  align-items: center;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
.search-bar-content{
  padding: 10px;
  font-size: 26px;
  text-align:center;
  font-family: iconfont;
}
.product-content{
    flex: 1;
    flex-direction: row;
}
.product-content-left{
    flex: 1;
  align-content: center;
  align-items: center;
}
.product-brand{
  text-align: center;
  font-size: 32px;
  padding-top: 20px;
  padding-right: 15px;
  padding-bottom: 20px;
  padding-left: 15px;
}
.product-content-right{
    flex: 3;
  justify-content: flex-start;
  align-items: center;
}
.product-group{
    margin-bottom: 30px;
}
.product-group-title{
  font-size: 28px;
  padding: 20px;
}
.product-group-content{
    width:562px;
    flex-direction: row;
  align-items: center;
    flex-wrap: wrap;
}
.product-appliance{
    width:187px;
    height:187px;
    flex-direction: column;
  align-items: center;
}
.appliance-img{
  height: 80px;
  width: 80px;
}
.appliance-name{
  font-size: 28px;
  padding-top: 15px;
}
.action-bar {
  position: fixed;
  bottom: 0px;
  width: 750px;
  height: 88px;
  text-align: right;
  background-color: gray;
  justify-content: center;
}
.action {
  margin-right: 40px;
  color: blue;
  font-size: 28px;
}
</style>
