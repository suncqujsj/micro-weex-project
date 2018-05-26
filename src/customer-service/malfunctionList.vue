<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller class="scroller">
            <div class="top-gap">
            </div>
            <div class="scroller-item-wrapper" v-for="(item, index) in searchResult" @click="selectItem(item)" :key="index">
                <text class="scroller-item">{{item.desc}}</text>
            </div>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'

export default {
    components: {
    },
    mixins: [base],
    data() {
        return {
            title: '故障类型',
            fromPage: '',
            searchResult: null
        }
    },
    methods: {
        getMmalfunction(event) {
            this.searchResult = [
                { id: 1, desc: "清洁保养" },
                { id: 1, desc: "不制冷/制冷效果差" },
                { id: 1, desc: "不制热/制热效果差" },
                { id: 1, desc: "清洁保养" },
                { id: 1, desc: "不制冷/制冷效果差" },
                { id: 1, desc: "不制热/制热效果差" },
                { id: 1, desc: "清洁保养" },
                { id: 1, desc: "不制冷/制冷效果差" },
                { id: 1, desc: "不制热/制热效果差" },
                { id: 1, desc: "清洁保养" },
                { id: 1, desc: "不制冷/制冷效果差" },
                { id: 1, desc: "不制热/制热效果差" },
                { id: 1, desc: "清洁保养" },
                { id: 1, desc: "不制冷/制冷效果差" },
                { id: 1, desc: "不制热/制热效果差" },
                { id: 1, desc: "清洁保养" },
                { id: 1, desc: "不制冷/制冷效果差" },
                { id: 1, desc: "不制热/制热效果差" },
                { id: 1, desc: "清洁保养" },
                { id: 1, desc: "不制冷/制冷效果差" },
                { id: 1, desc: "不制热/制热效果差" },
                { id: 1, desc: "清洁保养" },
                { id: 1, desc: "不制冷/制冷效果差" },
                { id: 1, desc: "不制热/制热效果差" },
                { id: 1, desc: "清洁保养" },
                { id: 1, desc: "不制冷/制冷效果差" },
                { id: 1, desc: "不制热/制热效果差" },
                { id: 1, desc: "清洁保养" },
                { id: 1, desc: "不制冷/制冷效果差" },
                { id: 1, desc: "不制热/制热效果差" },
                { id: 1, desc: "清洁保养" },
                { id: 1, desc: "不制冷/制冷效果差" },
                { id: 1, desc: "不制热/制热效果差" },
                { id: 1, desc: "清洁保养" },
                { id: 1, desc: "不制冷/制冷效果差" },
                { id: 1, desc: "不制热/制热效果差" },
                { id: 1, desc: "清洁保养" },
                { id: 1, desc: "不制冷/制冷效果差" },
                { id: 1, desc: "不制热/制热效果差" }
            ]
        },
        selectItem(item) {
            this.back()
        }
    },
    beforeCreate: function () {
    },
    created() {
        this.fromPage = nativeService.getParameters('from')
        this.getMmalfunction()
    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
}
.top-gap {
  background-color: #f2f2f2;
  height: 28px;
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
