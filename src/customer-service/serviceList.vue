<template>
    <div class="wrapper">
        <midea-header :title="title" :isImmersion="isipx?false:true" @headerClick="headerClick" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <list class="list-item">
            <midea-item height="160" :hasBottomBorder="false" :hasSubBottomBorder="false" @mideaCellClick="goTo('productSelection', {}, { from: 'serviceList', to:'serviceCharge'})">
                <image slot="itemImg" src="./assets/img/service_ic_cash@3x.png" class="service-item-img" resize='contain'>
                </image>
                <text slot="title" class="service-item-title">收费标准</text>
            </midea-item>
            <cell class="gap"></cell>
            <midea-item height="160" :hasBottomBorder="false" :hasSubBottomBorder="false" @mideaCellClick="goTo('serviceWarranty')">
                <image slot="itemImg" src="./assets/img/service_ic_repair_1@3x.png" class="service-item-img" resize='contain'>
                </image>
                <text slot="title" class="service-item-title">包修政策</text>
            </midea-item>
            <cell class="gap"></cell>
            <midea-item height="160" :hasBottomBorder="false" :hasSubBottomBorder="false" @mideaCellClick="goTo('servicePrice')">
                <image slot="itemImg" src="./assets/img/service_ic_time@3x.png" class="service-item-img" resize='contain'>
                </image>
                <text slot="title" class="service-item-title">配件价格</text>
            </midea-item>
        </list>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService';

import MideaItem from '@/midea-component/item2.vue'

export default {
    components: {
        MideaItem
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
  margin-right: 32px;
  margin-left: 32px;
  border-radius: 6px;
}
.gap {
  height: 24px;
}
.service-item-img {
  height: 60px;
  width: 60px;
  margin-right: 32px;
}
.service-item-title {
  font-family: PingFangSC-Regular;
  font-size: 36px;
  color: #000000;
}
</style>
