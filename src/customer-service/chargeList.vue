<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <div class="search-bar">
            <div class="search-bar-content">
                <image class="search-bar-img" :src="'./assets/img/service_ic_sreach@3x.png'" resize="contain"></image>
                <text class="search-bar-desc">查询关键字</text>
            </div>
        </div>
        <list>
            <cell>
                <div class="cell-item">
                    <div class="cell-sub-item level-one" @click="itemClicked">
                        <text class="cell-item-title">特殊环境（线下）</text>
                        <image class="cell-arrow-icon" :src="'./assets/img/service_ic_hide@3x.png'" resize="contain"></image>
                    </div>
                </div>
                <div class="cell-expand-item" v-if="isDisplay">
                    <div class="cell-sub-item level-two">
                        <text class="cell-item-sub-title">线上购买（非京东自营）</text>
                        <image class="cell-arrow-icon" :src="'./assets/img/service_ic_show_s@3x.png'" resize="contain"></image>
                    </div>
                    <div class="cell-sub-item level-two">
                        <text class="cell-item-sub-title">线上购买（京东自营）</text>
                        <image class="cell-arrow-icon" :src="'./assets/img/service_ic_hide_s@3x.png'" resize="contain"></image>
                    </div>
                    <div class="cell-sub-item level-three">
                        <text class="cell-item-sub-title">远程上门费</text>
                        <text class="cell-item-price">1.5元 / 公里</text>
                    </div>
                    <div class="level-three">
                        <text class="cell-item-desc" :style="{'width':'700px'}">远程上门费远程上门费远程上门费远程上门费远程上门费远程上门费远程上门费远程上门费远程上门费远程上门费远程上门费远程上门费远程上门费远程上门费远程上门费远程上门费</text>
                    </div>
                </div>
            </cell>

            <cell>
                <div class="cell-item">
                    <div class="cell-sub-item level-one">
                        <text class="cell-item-title">特殊环境（线下）</text>
                        <image class="cell-arrow-icon" :src="'./assets/img/service_ic_hide@3x.png'" resize="contain"></image>
                    </div>
                </div>
            </cell>
            <cell>
                <div class="cell-item">
                    <div class="cell-sub-item level-one">
                        <text class="cell-item-title">特殊环境（线下）</text>
                        <image class="cell-arrow-icon" :src="'./assets/img/service_ic_hide@3x.png'" resize="contain"></image>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService';

export default {
    components: {
    },
    mixins: [base],
    data() {
        return {
            title: '家用空调',
            isDisplay: true
        }
    },
    methods: {
        itemClicked(event) {
            this.isDisplay = !this.isDisplay
        }
    },
    created() {

    }
}
</script>

<style>
.wrapper {
  background-color: #f6f6f6;
  position: relative;
}

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
.cell-item {
  padding-left: 32px;
  padding-right: 24px;
  background-color: #ffffff;
}
.cell-expand-item {
  padding-left: 32px;
  padding-right: 24px;
  background-color: #f6f6f6;
  transition: 500ms;
}
.cell-item-title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
.cell-arrow-icon {
  height: 40px;
  width: 40px;
}
.cell-sub-item {
  height: 95px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.level-one {
  background-color: #ffffff;
  border-top-color: #e2e2e2;
  border-top-width: 1px;
}
.level-two {
  background-color: #f6f6f6;
  border-top-color: #e2e2e2;
  border-top-width: 1px;
}
.cell-item-sub-title {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
}
.cell-item-price {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #ff8f00;
}
.level-three {
  background-color: #f6f6f6;
}
.cell-item-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  margin-bottom: 24px;
}
</style>
