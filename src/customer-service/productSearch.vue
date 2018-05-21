<template>
    <div>
        <midea-header :title="title" @leftImgClick="back"></midea-header>
        <div class="search-bar">
            <input class="search-bar-content" placeholder="Search" @return="searchProduct" return-key-type="search"></input>
        </div>
        <scroller class="product-content">
            <template v-if="searchResult">
                <div v-for="(item, index) in searchResult" @click="selectItem(item)" :key="index">
                    <text class="product-brand">{{item.desc}}</text>
                </div>
            </template>
            <div v-else class="search-history-block">
                <text class="search-history-title">历史记录</text>
                <div class="search-history">
                    <text class="search-history-item" v-for="(item,index) in historyKeys" :key="index" @click="itemSelected(item)">{{item.title}}</text>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'

import { MideaDialog, MideaGridSelect } from '@/index'

export default {
    components: {
        MideaDialog,
        MideaGridSelect
    },
    mixins: [base],
    data() {
        return {
            title: '产品搜索',
            fromPage: '',
            historyKeys: [
                {
                    'title': '洗衣机',
                    'index': 0
                },
                {
                    'title': '空调',
                    'index': 1

                }
            ],
            dialogShow: false,
            searchResult: null
        }
    },
    methods: {
        searchProduct(event) {
            this.searchResult = [
                { id: 1, desc: "美的洗衣机" },
                { id: 1, desc: "小天鹅洗衣机" },
                { id: 1, desc: "东芝洗衣机" }
            ]
        },
        itemSelected(item) {
            this.back({ viewTag: this.fromPage })
        },
        selectItem(item) {
            this.back({ viewTag: this.fromPage })
        }
    },
    beforeCreate: function () {
        //目前支持ttf、woff文件，不支持svg、eot类型,moreItem at http://www.iconfont.cn/
        var domModule = weex.requireModule('dom');
        try {
            nativeService.getPath((path) => {
                let fontUrl = path + 'assets/font/midea_font.ttf'
                domModule.addRule('fontFace', {
                    'fontFamily': "iconfont2",
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
  height: 88px;
  justify-content: center;
  align-items: center;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
.search-bar-content {
  padding: 10px;
  font-size: 26px;
}
.product-content-left {
  flex: 1;
  align-content: center;
  align-items: center;
}
.search-history-block {
  padding: 20px;
}
.search-history-title {
  font-size: 32px;
  padding-left: 18px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.search-history {
  flex-direction: row;
  flex-wrap: wrap;
}
.search-history-item {
  font-size: 32px;
  padding-top: 8px;
  padding-right: 18px;
  padding-bottom: 8px;
  padding-left: 18px;
  margin-right: 30px;
  margin-bottom: 30px;
  border-radius: 6px;
  border-color: #e2e2e2;
  border-width: 1px;
}
.product-brand {
  width: 750px;
  text-align: left;
  font-size: 32px;
  padding-top: 20px;
  padding-right: 15px;
  padding-bottom: 20px;
  padding-left: 15px;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
</style>
