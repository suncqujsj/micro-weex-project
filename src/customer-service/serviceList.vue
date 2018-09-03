<template>
    <div class="wrapper">
        <midea-header :title="title" :isImmersion="isImmersion" @headerClick="headerClick" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <list class="list-item">
            <cell>
                <image class="service_advertisement" src="./assets/img/service_img_cash@3x.png" resize='contain'></image>
            </cell>
            <midea-item height="96" :hasBottomBorder="false" :hasSubBottomBorder="false" @mideaCellClick="goTo('productSelection', {}, { from: 'serviceList', to:'serviceCharge'})">
                <text slot="title" class="service-item-title">收费标准</text>
            </midea-item>
            <cell class="gap"></cell>
            <midea-item height="96" :hasBottomBorder="false" :hasSubBottomBorder="false" @mideaCellClick="goTo('serviceWarranty')">
                <text slot="title" class="service-item-title">包修政策</text>
            </midea-item>
            <cell class="gap"></cell>
            <midea-item height="96" :hasBottomBorder="false" :hasSubBottomBorder="false" @mideaCellClick="goTo('servicePrice')">
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
        nativeService.burialPoint({
            pageName: 'serviceChargePolicyPage',
            actionType: 'view',
            subAction: 'page_view'
        })
    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
}
.list-item {

  border-radius: 6px;
}
.gap {
  height: 1px;
  margin-left: 38px;
  background-color: #E5E5E8;
}
.service-item-img {
  height: 60px;
  width: 60px;
  margin-right: 32px;
}
.service_advertisement {
  width: 750px;
  height: 420px;
  background-color: #ffffff;
}
.service-item-title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  
  color: #000000;
}
</style>
