<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back" :showRightImg="true" rightImg="./assets/img/home_ic_add@3x.png" @rightImgClick="addAddress">
        </midea-header>
        <scroller>
            <div v-for="(item, index) in userAddressList" :key="index" class="address-block" @click="goToAddressDetail(item)">
                <text class="text-label">{{item.receiverName}} {{item.receiverMobile}}</text>
                <text class="text-desc">{{item.provinceName}} {{item.cityName}} {{item.countyName}} {{item.addr}}</text>
            </div>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService';

import { MideaButton } from '@/index'

export default {
    components: {
        MideaButton
    },
    mixins: [base],
    data() {
        return {
            title: '我的地址',
            userAddressList: []
        }
    },
    methods: {
        addAddress() {
            this.goTo('userAddress')
        },
        goToAddressDetail(item) {
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.userAddress, item, () => {
                this.goTo('userAddress', {}, { id: item.userAddrId })
            })
        },
        submit() {
            if (this.toPage) {
                nativeService.setItem(this.SERVICE_STORAGE_KEYS.userAddress, this.userAddress,
                    () => {
                        this.goTo(this.toPage, {}, { from: this.fromPage })
                    })
            } else {
                this.appPageDataChannel.postMessage({ page: this.fromPage, key: "userAddress", data: this.userAddress })
                this.back()
            }
        }
    },
    created() {
        nativeService.getUserAddrPageList().then((data) => {
            this.userAddressList = data.data
        })
    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
}
.address-block {
  background-color: #ffffff;
  margin-top: 24px;
  padding-top: 38px;
  padding-right: 32px;
  padding-left: 32px;
  padding-bottom: 36px;
  flex-direction: column;
}
.group-gap-top {
  height: 24px;
}
.text-label {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  padding-bottom: 16px;
  text-align: left;
}
.text-desc {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8a8a8f;
  text-align: left;
}
</style>
