<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller>
            <cell class="group-gap-top"></cell>
            <div class="item-group">
                <text class="text-label">姓名</text>
                <input class="text-input" type="text" placeholder="请输入姓名" v-model="userAddress.receiverName" />
                <image class="text-img" src="./assets/img/me_ic_addresslist@3x.png" resize='contain'></image>
            </div>
            <div class="item-group">
                <text class="text-label">手机号码</text>
                <input class="text-input" type="tel" placeholder="请输入手机号码" v-model="userAddress.receiverMobile" />
            </div>
            <div class="item-group">
                <text class="text-label">所在区域</text>
                <text class="text-desc" @click="isShowAddressPicker=true">请选中所在区域</text>
                <image class="text-img" src="./assets/img/me_ic_area@3x.png" resize='contain'></image>
            </div>
            <div class="item-group">
                <text class="text-label">详细地址</text>
                <input class="text-input" type="text" placeholder="请输入详细地址" v-model="userAddress.addr" />
                <!-- <textarea class="info-textarea" placeholder="请输入详细地址" v-model="userAddress.customerAddressDetail" rows="5" maxlength="120"></textarea> -->
            </div>
            <div class="item-group">
                <text class="text-label">默认地址</text>
            </div>
        </scroller>

        <div class="action-bar">
            <midea-button text="保存" type="green" :btnStyle="{'background-color': '#267AFF','border-radius': '4px'}" @mideaButtonClicked="submit">
            </midea-button>
        </div>

        <address-picker :isShow="isShowAddressPicker" :data="userAddress" @oncancel="isShowAddressPicker=false" @onchanged="servieAddressSelected">
        </address-picker>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService';

import { MideaButton } from '@/index'

import AddressPicker from './components/addressPicker.vue'

export default {
    components: {
        MideaButton,
        AddressPicker
    },
    mixins: [base],
    data() {
        return {
            title: '我的地址',
            userAddress: {
                receiverName: '',
                receiverMobile: '',
                province: '',
                provinceName: '',
                city: '',
                cityName: '',
                county: '',
                countyName: '',
                street: '',
                streetName: '',
                addr: '',
                defaultAddr: false
            },
            isShowAddressPicker: false
        }
    },
    methods: {
        servieAddressSelected() {

        },
        submit() {
            nativeService.userAddrAdd(this.userAddress).then(() => {
                this.back()
            })

            // if (this.toPage) {
            //     nativeService.setItem(this.SERVICE_STORAGE_KEYS.userAddress, this.userAddress,
            //         () => {
            //             this.goTo(this.toPage, {}, { from: this.fromPage })
            //         })
            // } else {
            //     this.appPageDataChannel.postMessage({ page: this.fromPage, key: "userAddress", data: this.userAddress })
            //     this.back()
            // }
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
.group-gap-top {
  height: 24px;
}
.item-group {
  padding-top: 30px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 30px;
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
}
.text-label {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  width: 130px;
  margin-right: 48px;
}
.text-input {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #333333;
}
.text-desc {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #c7c7cc;
}
.text-img {
  height: 40px;
  width: 40px;
}
.info-textarea {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #333333;
}
.action-bar {
  position: fixed;
  bottom: 0px;
  width: 750px;
  text-align: center;
  padding-bottom: 20px;
}
</style>
