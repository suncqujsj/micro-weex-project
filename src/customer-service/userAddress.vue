<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller>
            <cell class="group-gap-top"></cell>
            <div class="item-group">
                <text class="text-label">联系人</text>
                <input class="text-input" type="text" placeholder="请输入联系人" v-model="userAddress.customerName" />
            </div>
            <div class="item-group">
                <text class="text-label">联系电话</text>
                <input class="text-input" type="tel" placeholder="请输入联系电话" v-model="userAddress.customerMobilephone" />
            </div>
            <div class="item-group">
                <text class="text-label">服务地址</text>
                <input class="text-input" type="text" placeholder="请输入服务地址" v-model="userAddress.customerAddress" />
            </div>
            <div class="item-group">
                <text class="text-label">详细地址</text>
                <textarea class="info-textarea" placeholder="请输入详细地址" v-model="userAddress.customerAddressDetail" rows="5" maxlength="120"></textarea>
            </div>

            <div class="action-bar">
                <midea-button text="提交" type="green" :btnStyle="{'background-color': '#267AFF','border-radius': '4px'}" @mideaButtonClicked="submit">
                </midea-button>
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
            title: '服务地址',
            userAddress: {
                customerName: '',
                customerMobilephone: '',
                customerAddress: '',
                customerAddressDetail: ''
            }
        }
    },
    methods: {
        submit() {
            debugger
            if (this.toPage) {
                nativeService.setItem("SERVICE_STORAGE_userAddress", this.userAddress,
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
        nativeService.getItem("SERVICE_STORAGE_userAddress", (resp) => {
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
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
  background-color: #ffffff;
}
.text-label {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  padding-bottom: 16px;
}
.text-input {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  height: 72px;
  padding-left: 22px;
  padding-right: 50px;
  background-color: #fafafa;
}

.info-textarea {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  padding-top: 10px;
  padding-left: 22px;
  padding-right: 50px;
  background-color: #fafafa;
}
.action-bar {
  background-color: #ffffff;
  width: 750px;
  text-align: center;
  padding-bottom: 50px;
}
</style>
