<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back" :showRightImg="true" rightImg="./assets/img/home_ic_add@3x.png" @rightImgClick="addAddress">
        </midea-header>
        <scroller loadmoreoffset=750 @loadmore="loadmore">
            <div v-for="(item, index) in userAddressList" :key="index" class="address-block" @click="submit(item)">
                <div class="text-img">
                    <image v-if="selectedId==item.userAddrId" class="text-img" src="./assets/img/service_ic_checkbox@3x.png" resize='contain'></image>
                </div>
                <div class="text-content">
                    <div class="text-title-wrapper">
                        <text class="text-title">{{item.receiverName}} {{item.receiverMobile}}</text>
                        <text v-if="item.defaultAddr" class="text-tag">默认</text>
                    </div>
                    <text class="text-desc">{{item.provinceName}} {{item.cityName}} {{item.countyName}} {{item.streetName}} {{item.addr}}</text>
                </div>
                <image class="edit-img" src="./assets/img/service_ic_edit@3x.png" resize='contain' @click="goToAddressDetail(item)"></image>
            </div>
            <text class="loading-end" v-if="!loadingEnd">加载中...</text>
            <text class="loading-end" v-if="loadingEnd">———— 到底了 ————</text>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService';

import { MideaButton } from '@/index'

export default {
    components: {
        MideaButton
    },
    mixins: [base],
    data() {
        return {
            title: '我的地址',
            selectedId: null,
            userAddressList: [],
            addressListParam: null,
            addressListPage: 1,
            loadingEnd: false
        }
    },
    methods: {
        handlePageData(data) {
            if (data.page == "userAddressList") {
                if (data.key == "userAddress") {
                    this.reset()
                    this.getAddressList()
                }
            }
        },
        reset() {
            this.userAddressList = []
            this.addressListParam = null
            this.addressListPage = 1
            this.loadingEnd = false
        },
        getAddressList() {
            let param = {
                pageIndex: this.addressListPage,
                pageSize: 10
            }
            this.addressListParam = param
            nativeService.getUserAddrPageList(this.addressListParam).then((data) => {
                this.userAddressList = data.data.list
                if (data.data.isLastPage) {
                    this.$nextTick(e => {
                        this.loadingEnd = true
                    })
                }
            })
        },
        loadmore(event) {
            if (this.loadingEnd) return
            setTimeout(() => {
                this.addressListPage++
                this.addressListParam.pageIndex = this.addressListPage
                nativeService.getUserAddrPageList(this.addressListParam).then((data) => {
                    this.userAddressList = this.userAddressList.concat(data.data.list)
                    if (data.data.isLastPage) {
                        this.$nextTick(e => {
                            this.loadingEnd = true
                        });
                    }
                })
            }, 1500)
        },
        addAddress() {
            this.goTo('userAddress', {}, { from: "userAddressList" })
        },
        goToAddressDetail(item) {
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.userAddress, item, () => {
                this.goTo('userAddress', {}, { from: "userAddressList", id: item.userAddrId })
            })
        },
        submit(item) {
            this.appPageDataChannel.postMessage({ page: this.fromPage, key: "userAddressList", data: item })
            this.back()
        }
    },
    created() {
        this.selectedId = nativeService.getParameters('id') || null
        this.getAddressList()
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
  flex-direction: row;
  align-items: center;
}
.group-gap-top {
  height: 24px;
}
.text-img {
  width: 32px;
  height: 32px;
}
.text-content {
  flex: 1;
  flex-direction: column;
  margin-left: 25px;
  margin-right: 25px;
}
.text-title-wrapper {
  flex-direction: row;
  align-items: center;
}
.text-title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  padding-top: 6px;
  padding-right: 28px;
  padding-bottom: 6px;
  text-align: left;
}
.text-tag {
  background-color: #e8f1ff;
  border-radius: 100px;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #267aff;
  padding-top: 6px;
  padding-left: 28px;
  padding-right: 28px;
  padding-bottom: 6px;
  text-align: center;
}
.text-desc {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8a8a8f;
  text-align: left;
  padding-top: 12px;
}
.edit-img {
  width: 40px;
  height: 40px;
}

.loading-end {
  width: 750px;
  padding: 30px 0;
  background-color: #f2f2f2;
  color: #666666;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 24px;
}
</style>
