<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <div class="top-gap"></div>
        <list>
            <midea-item title="" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('productSelection', {}, { from: 'serviceAndCharge'})">
                <div slot="title">
                    <text class="cell-label">收费标准</text>
                </div>
            </midea-item>
            <midea-item title="" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('guaranteeRepair')">
                <div slot="title">
                    <text class="cell-label">包修政策</text>
                </div>
            </midea-item>
            <midea-item title="" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('priceOfParts')">
                <div slot="title">
                    <text class="cell-label">配件价格</text>
                </div>
            </midea-item>
        </list>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService';

import mideaItem from '@/midea-component/item.vue'

export default {
    components: {
        mideaItem,
    },
    mixins: [base],
    data() {
        return {
            title: '服务与收费政策'
        }
    },
    methods: {
        itemClicked(event) {
            this.goTo(event.item.page)
        }
    },
    created() {

    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
}
.top-gap {
  height: 28px;
}
.cell-label {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
</style>
