<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back" :showRightImg="true" rightImg="./assets/img/home_ic_add@3x.png" @rightImgClick="addAddress">
        </midea-header>
        <scroller>
            <div class="address-block" @click="goToAddressDetail">
                <text class="text-label">李小龙 13512341234</text>
                <text class="text-desc">广东省 广州市 荔湾区 红金南园801</text>
            </div>
            <div class="address-block" @click="goToAddressDetail">
                <text class="text-label">李小龙 13512341234</text>
                <text class="text-desc">广东省 广州市 荔湾区 红金南园801</text>
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
            userAddress: {
                customerName: '',
                customerMobilephone1: '',
                customerAddress: '',
                customerAddressDetail: ''
            }
        }
    },
    methods: {
        addAddress() {
            this.goTo('userAddress')
        },
        goToAddressDetail() {
            this.goTo('userAddress')
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
        nativeService.getItem(this.SERVICE_STORAGE_KEYS.userAddress, (resp) => {
            if (resp.result == 'success') {
                this.userAddress = Object.assign(this.userAddress, JSON.parse(resp.data) || {})
            }
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
