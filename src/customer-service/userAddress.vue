<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
            <div slot="customerContent" class="header-right">
                <text class="header-right-text" @click="deleteAddress">删除</text>
            </div>
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
                <text class="text-desc" @click="isShowAddressPicker=true">{{areaDesc}}</text>
                <image class="text-img" src="./assets/img/me_ic_area@3x.png" resize='contain'></image>
            </div>
            <div class="item-group">
                <text class="text-label">详细地址</text>
                <input class="text-input" type="text" placeholder="请输入详细地址" v-model="userAddress.addr" />
            </div>
            <div class="item-group">
                <text class="text-label">默认地址</text>
                <midea-switch :checked="userAddress.defaultAddr" @change="setDefaultAddr" width="70" height="38" slot="value"></midea-switch>
            </div>
        </scroller>

        <div class="action-bar">
            <midea-button :text="isCreate?'新增':'保存'" type="green" :btnStyle="{'background-color': '#267AFF','border-radius': '4px'}" @mideaButtonClicked="submit">
            </midea-button>
        </div>

        <address-picker :isShow="isShowAddressPicker" :data="userAddress" @oncancel="isShowAddressPicker=false" @onchanged="servieAddressSelected">
        </address-picker>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService';

import { MideaButton, MideaSwitch } from '@/index'

import AddressPicker from './components/addressPicker.vue'

export default {
    components: {
        MideaButton,
        AddressPicker,
        MideaSwitch
    },
    mixins: [base],
    data() {
        return {
            title: '我的地址',
            isCreate: true,
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
    computed: {
        areaDesc() {
            return this.userAddress.province ? (this.userAddress.provinceName + ' ' + this.userAddress.cityName + ' ' + this.userAddress.countyName + ' ' + this.userAddress.streetName) : '请选中所在区域'
        }
    },
    methods: {
        servieAddressSelected(event) {
            this.userAddress = Object.assign(this.userAddress, event)
        },
        setDefaultAddr(event) {
            nativeService.toast(event.value)
            this.userAddress.defaultAddr = event.value
        },
        deleteAddress() {
            nativeService.userAddrDelete({ userAddrId: this.userAddress.userAddrId }).then(() => {
                this.appPageDataChannel.postMessage({ page: this.fromPage, key: "userAddress" })
                this.back()
            })
        },
        submit() {
            if (this.userAddress.userAddrId) {
                //地址修改
                nativeService.userAddrUpdate(this.userAddress).then(() => {
                    this.appPageDataChannel.postMessage({ page: this.fromPage, key: "userAddress" })
                    this.back()
                })
            } else {
                //地址新增
                nativeService.userAddrAdd(this.userAddress).then(() => {
                    this.appPageDataChannel.postMessage({ page: this.fromPage, key: "userAddress" })
                    this.back()
                })
            }
        }
    },
    created() {
        this.userAddress.userAddrId = nativeService.getParameters('id') || null

        if (this.userAddress.userAddrId) {
            //地址修改
            this.isCreate = false
            nativeService.getItem(this.SERVICE_STORAGE_KEYS.userAddress, (resp) => {
                if (resp.result == 'success') {
                    this.userAddress = JSON.parse(resp.data)
                }
            })
        }
    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
}
.header-right {
  position: absolute;
  right: 0px;
  width: 160px;
  height: 88px;
  display: flex;
  justify-content: center;
}
.header-right-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  padding-left: 20px;
  padding-right: 20px;
  text-align: right;
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
  justify-content: space-between;
  align-items: center;
}
.text-label {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  width: 130px;
}
.text-input {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #333333;
  height: 72px;
  padding-left: 22px;
  padding-right: 50px;
}
.text-desc {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #333333;
  padding-left: 22px;
  padding-right: 50px;
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
