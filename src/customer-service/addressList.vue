<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <list>
            <cell class="top-gap"></cell>
            <midea-item v-for="(item, index) in searchResult" :key="index" height="96" :hasArrow="true" :clickActivied="true" @mideaCellClick="back">
                <text slot="title" class="address-item-title">{{item.desc}}</text>
            </midea-item>
        </list>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'
import { MideaItem } from '@/index'

export default {
    components: {
        MideaItem
    },
    mixins: [base],
    data() {
        return {
            title: '选择地址',
            searchResult: null
        }
    },
    methods: {
        getAddressList(event) {
            this.searchResult = [
                { id: 1, desc: "北京" },
                { id: 1, desc: "上海" },
                { id: 1, desc: "广东" },
                { id: 1, desc: "北京" },
                { id: 1, desc: "上海" },
                { id: 1, desc: "广东" },
                { id: 1, desc: "北京" },
                { id: 1, desc: "上海" },
                { id: 1, desc: "广东" },
                { id: 1, desc: "北京" },
                { id: 1, desc: "上海" },
                { id: 1, desc: "广东" },
                { id: 1, desc: "北京" },
                { id: 1, desc: "上海" },
                { id: 1, desc: "广东" },
                { id: 1, desc: "北京" },
                { id: 1, desc: "上海" },
                { id: 1, desc: "广东" },
                { id: 1, desc: "北京" },
                { id: 1, desc: "上海" },
                { id: 1, desc: "广东" },
                { id: 1, desc: "北京" },
                { id: 1, desc: "上海" },
                { id: 1, desc: "广东" },
                { id: 1, desc: "北京" },
                { id: 1, desc: "上海" },
                { id: 1, desc: "广东" },
                { id: 1, desc: "北京" },
                { id: 1, desc: "上海" },
                { id: 1, desc: "广东" },
            ]
        },
        selectItem(item) {
            this.back()
        }
    },
    beforeCreate: function () {
    },
    created() {
        this.getAddressList()
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
.address-item-title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
</style>
