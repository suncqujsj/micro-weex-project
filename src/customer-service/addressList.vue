<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <list>
            <cell class="top-gap"></cell>
            <midea-item v-for="(item, index) in areaList" :key="index" height="96" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectItem(index)">
                <text slot="title" class="address-item-title">{{item.regionDesc}}</text>
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
            parentCode: '',
            areaList: []
        }
    },
    methods: {
        selectItem(index) {
            if (this.areaList[index].regionLevel == 3) {
                this.appPageDataChannel.postMessage({ page: this.fromPage, key: "areaList", data: this.areaList[index] })
                this.back({ viewTag: 'branchList' })
            } else {
                this.goTo('addressList', {}, { from: 'branchList', parentCode: this.areaList[index].regionCode })
            }
        }
    },
    created() {
        this.parentCode = nativeService.getParameters('parentCode')
        let param = {
            parentCode: this.parentCode
        }
        nativeService.getAreaList(param).then((data) => {
            this.areaList = data
        })
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
