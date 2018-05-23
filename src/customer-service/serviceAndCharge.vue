<template>
    <div>
        <midea-header :title="title" @leftImgClick="back"></midea-header>
        <list>
            <midea-item title="收费标准" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('productSelection')">
            </midea-item>
            <midea-item title="包修政策" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('guaranteeRepair')">
            </midea-item>
            <midea-item title="配件价格" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('priceOfParts')">
            </midea-item>
        </list>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService';

import mideaNavList from '@/midea-component/mNavList.vue'
import mideaItem from '@/midea-component/item.vue'

export default {
    components: {
        mideaNavList,
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
.header-right {
  position: absolute;
  right: 50px;
  width: 100px;
  color: #ffffff;
  font-size: 32px;
}
.navigation-list {
  margin-top: 50px;
  margin-bottom: 50px;
}
.item-img {
  height: 80px;
  width: 80px;
  margin-right: 24px;
}
</style>
