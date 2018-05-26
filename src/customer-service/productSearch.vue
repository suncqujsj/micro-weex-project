<template>
    <div>
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <div class="search-bar">
            <div class="search-bar-content">
                <image class="search-bar-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                <input class="search-bar-input" placeholder="请输入产品品类，如空调、洗衣机" :value="keyWord" @input="oninput" @return="keyBoardsearch" return-key-type="search"></input>
            </div>
            <text class="search-action" @click="searchProduct()">搜索</text>
        </div>
        <scroller class="product-content">
            <template v-if="searchResult">
                <div v-for="(item, index) in convertedSearchResult" @click="selectItem(item)" :key="index">
                    <div class="search-result-content">
                        <image class="search-result-img" :src="'./assets/img/progress.png'" resize="contain"></image>
                        <midea-rich-text class="search-result-desc" :hasTextMargin="false" :config-list="item.richDesc"></midea-rich-text>
                    </div>
                </div>
            </template>
            <div v-else class="search-history-block">
                <text class="search-history-title">历史记录</text>
                <div class="search-history">
                    <text class="search-history-item" v-for="(item,index) in historyKeys" :key="index" @click="searchProduct(item.title)">{{item.title}}</text>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'

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
            fromPage: '',
            keyWord: '',
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
    computed: {
        convertedSearchResult() {
            let result = []
            let reg = new RegExp(this.keyWord, "gi")
            if (this.searchResult) {
                for (let index = 0; index < this.searchResult.length; index++) {
                    let item = this.searchResult[index]
                    item.richDesc = []
                    let desc = item.desc.replace(reg, ",*,")
                    let descArray = desc.split(',')
                    for (let i = 0; i < descArray.length; i++) {
                        const element = descArray[i];
                        if (element == "*") {
                            item.richDesc.push({
                                type: 'text',
                                value: this.keyWord,
                                style: {
                                    fontSize: 28,
                                    color: '#007AFF'
                                }
                            })
                        } else {
                            item.richDesc.push({
                                type: 'text',
                                value: element,
                                style: {
                                    fontSize: 28,
                                    color: '#000000'
                                }
                            })
                        }
                    }
                    result.push(item)
                }
            }
            return result
        }
    },
    methods: {
        oninput(event) {
            this.keyWord = event.value
        },
        keyBoardsearch(event) {
            this.searchProduct(event.value)
        },
        searchProduct(value) {
            if (!value && !this.keyWord) {
                nativeService.toast("请输入搜索关键字")
                return
            }
            if (!this.keyWord) {
                this.keyWord = value
            }
            this.searchResult = [
                { id: 1, desc: "美的洗衣机" },
                { id: 1, desc: "洗衣机-小天鹅" },
                { id: 1, desc: "洗衣机东芝" },
                { id: 1, desc: "洗衣机洗衣机" },
                { id: 1, desc: "小天鹅洗衣机小天鹅洗衣机小天鹅" }
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
  width: 586px;
  height: 64px;
  border-radius: 4px;
  background-color: #f2f2f2;
  flex-direction: row;
  align-items: center;
  margin-left: 32px;
}
.search-bar-img {
  height: 40px;
  width: 40px;
  margin-left: 10px;
  margin-right: 10px;
}
.search-bar-input {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  height: 40px;
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
  padding-top: 8px;
  padding-right: 18px;
  padding-bottom: 8px;
  padding-left: 18px;
  margin-right: 30px;
  margin-bottom: 30px;
  border-radius: 4px;
  background-color: #f2f2f2;
}

.search-result-content {
  flex: 1;
  width: 586px;
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
</style>
