<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <list class="list-item">
            <midea-item height="160" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('productSelection', {}, { from: 'serviceAndCharge'})">
                <image slot="itemImg" src="./assets/img/service_ic_shoufei@3x.png" class="service-item-img" resize='contain'>
                </image>
                <text slot="title" class="service-item-title">收费标准</text>
            </midea-item>
        </list>
        <list class="list-item">
            <midea-item height="160" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('guaranteeRepair')">
                <image slot="itemImg" src="./assets/img/service_ic_baoxiu@3x.png" class="service-item-img" resize='contain'>
                </image>
                <text slot="title" class="service-item-title">包修政策</text>
            </midea-item>
        </list>
        <list class="list-item">
            <midea-item height="160" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('priceOfParts')">
                <image slot="itemImg" src="./assets/img/service_ic_charge@3x.png" class="service-item-img" resize='contain'>
                </image>
                <text slot="title" class="service-item-title">配件价格</text>
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
.list-item {
  margin-top: 24px;
  margin-right: 24px;
  margin-left: 24px;
  height: 160px;
  border-radius: 6px;
}
.service-item-img {
  height: 96px;
  width: 96px;
  margin-right: 32px;
}
.service-item-title {
  font-family: PingFangSC-Regular;
  font-size: 36px;
  color: #000000;
}
</style>
