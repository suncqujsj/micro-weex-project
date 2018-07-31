<template>
    <div class="wrapper" @viewappear="refreshPage">
        <!-- 不可删除此空div行，否则list会自动调整移动至状态栏下 -->
        <div style="height: 40px; background-color: #ffffff;"></div>
        <list class="list">
            <cell>
                <div class="service-header">
                    <div style="flex: 1;"> </div>
                    <div class="service-header-image-wrapper" @click="showHotLine">
                        <image class="header-left-image" src="./assets/img/service_ic_call@3x.png"></image>
                    </div>
                </div>
                <div class="service-desc-wrapper">
                    <text class="service-title">服务</text>
                    <text class="service-desc">随时随地为您提供贴心服务</text>
                    <div class="service-desc-img-wrapper">
                        <image class="service-desc-img" src="./assets/img/servie_pic_service@3x.png" resize='contain'></image>
                    </div>
                </div>
                <div class="navigation-list">
                    <div v-for="(item, index) in navList" :key="index" class="navigation-item">
                        <div class="navigation-inner-item" @click="itemClicked(item)">
                            <image class="navigation-img" :src="item.img" resize='contain'></image>
                            <text class="navigation-desc">{{item.title}}</text>
                        </div>
                    </div>
                </div>
            </cell>
            <template v-if="formattedOrder">
                <cell>
                    <div class="arraw-line">
                        <div class="arraw-triangle"></div>
                    </div>
                </cell>
                <midea-item height="150" :hasSubBottomBorder="false" @mideaCellClick="goToOrderDetail">
                    <image slot="itemImg" class="order-img" :src="formattedOrder.imageUrl" resize='contain'>
                    </image>
                    <div slot="title" class="order-content">
                        <text class="order-title">{{formattedOrder.orderDesc}}</text>
                        <text class="order-time">{{formattedOrder.contactTimeDesc}}</text>
                    </div>
                </midea-item>
            </template>
            <cell class="group-gap-top"></cell>
            <midea-item title="网点查询" @mideaCellClick="goTo('productSelection', {}, { from: 'rootView', to:'branchList' })">
                <image slot="itemImg" src="./assets/img/service_ic_location@3x.png" class="service-item-img" resize='contain'>
                </image>
            </midea-item>
            <midea-item title="服务与收费政策" @mideaCellClick="goTo('serviceList')">
                <image slot="itemImg" src="./assets/img/service_ic_policy@3x.png" class="service-item-img" resize='contain'>
                </image>
            </midea-item>
            <midea-item title="滤芯防伪" @mideaCellClick="goTo('antifake')" :hasSubBottomBorder="false">
                <image slot="itemImg" src="./assets/img/service_ic_fake@3x.png" class="service-item-img" resize='contain'>
                </image>
            </midea-item>

            <cell class="wrapper-gap"></cell>
        </list>

        <midea-actionsheet class="actionsheet-popup" :items="actionsheetItems" button="取消" :show="showBar" @close="closeActionsheet" @itemClick="actionsheetItemClick" @btnClick="actionsheetBtnClick" ref="actionsheet">
            <div slot="item-0" class="actionsheet-item">
                <text class="actionsheet-item-label">美的：</text>
                <text class="actionsheet-item-desc">400-889-9315</text>
            </div>
            <div slot="item-1" class="actionsheet-item">
                <text class="actionsheet-item-label">小天鹅：</text>
                <text class="actionsheet-item-desc">400-822-8228</text>
            </div>
        </midea-actionsheet>
    </div>
</template>

<script>
import base from './base'
import orderBase from './orderBase'
import nativeService from './settings/nativeService'
import debugUtil from '@/common/util/debugUtil'

import MideaActionsheet from '@/midea-component/actionsheet.vue'
import MideaItem from '@/midea-component/item2.vue'

export default {
    components: {
        MideaActionsheet,
        MideaItem
    },
    mixins: [base, orderBase],
    data() {
        return {
            title: '服务',
            navList: [{
                title: '进度查询',
                img: './assets/img/service_ic_schedule@3x.png',
                page: 'orderList'
            }, {
                title: '安装服务',
                img: './assets/img/service_ic_custom@3x.png',
                page: 'installation'
            }, {
                title: '维修服务',
                img: './assets/img/service_ic_repair@3x.png',
                page: 'maintenance'
            }],

            showBar: false,
            actionsheetItems: ['美的', '小天鹅'],
            actionsheetItemsValue: ['4008999315', '4008228228'],
            order: null
        }
    },
    computed: {
        formattedOrder() {
            let result
            if (this.order) {
                result = this.formatOrder(this.order)
            }
            return result
        }
    },
    methods: {
        refreshPage() {
            nativeService.getUserInfo().then((data) => {
                if (data.uid) {
                    this.getOrderList()
                } else {
                    this.order = null
                }
            })
        },
        getOrderList() {
            let param = {
                interfaceSource: "SMART",
                page: 0,
                resultNum: 1
            }
            nativeService.queryserviceorder(param, { isShowLoading: false }).then((data) => {
                if (data.list && data.list.length > 0) {
                    this.order = data.list[0]
                }
            }).catch((error) => {
                // nativeService.toast(nativeService.getErrorMessage(error))
            })
        },
        itemClicked(item) {
            nativeService.getUserInfo().then((data) => {
                if (data.uid) {
                    //已经登录
                    this.goTo(item.page)
                } else {
                    //未登录
                    nativeService.jumpNativePage({
                        "pageName": "login", //跳转到登录界面
                        "data": {}
                    })
                }
            })
        },
        showHotLine() {
            this.showBar = true;
            this.$nextTick(e => {
                this.$refs.actionsheet.open();
            });
        },
        closeActionsheet() {
            this.showBar = false
        },
        actionsheetItemClick(event) {
            this.showBar = false
            nativeService.callTel({
                tel: this.actionsheetItemsValue[event.index],
                title: '服务热线',
                desc: this.actionsheetItemsValue[event.index]
            }).then(
                (resp) => { }
            )
        },
        actionsheetBtnClick() {
            this.showBar = false
        },
        goToOrderDetail() {
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.currentOrder, this.order, () => {
                this.goTo("orderDetail", {}, { from: 'orderList', id: this.order.serviceOrderNo })
            })
        },
        resetStorage() {
            //清楚本地缓存数据
            for (const key in this.SERVICE_STORAGE_KEYS) {
                if (this.SERVICE_STORAGE_KEYS.hasOwnProperty(key)) {
                    if (['historyKeys'].indexOf(key) < 0) {
                        nativeService.removeItem(this.SERVICE_STORAGE_KEYS[key])
                    }
                }
            }
        }
    },
    created() {
        debugUtil.cleanDebugLog()
        this.resetStorage()
    }
}
</script>

<style src='./assets/css/base.css' />

<style>
.wrapper {
  background-color: #f2f2f2;
}
.list {
  flex: 1;
}
.service-header {
  background-color: #ffffff;
  height: 88px;
  display: flex;
  flex-direction: row;
}
.immersion {
  padding-top: 40px;
  height: 128px;
  /* background-color: blue; */
}
.service-header-image-wrapper {
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-right: 32px;
  /* background-color: red; */
}
.header-left-image {
  height: 56px;
  width: 56px;
}
.wrapper-gap {
  height: 250px;
}
.service-desc-wrapper {
  flex-direction: column;
  align-items: stretch;
  padding-right: 32px;
  padding-left: 32px;
  background-color: #ffffff;
}
.service-title {
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 56px;
  color: #000000;
  line-height: 68px;
}
.service-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #8a8a8f;
  letter-spacing: 0;
  line-height: 44px;
}
.service-desc-img-wrapper {
  margin-top: 38px;
  align-items: center;
  width: 686px;
}
.service-desc-img {
  width: 686px;
  height: 276px;
}
.navigation-list {
  flex-direction: row;
  justify-content: space-between;
  padding-top: 30px;
  padding-right: 72px;
  padding-bottom: 42px;
  padding-left: 72px;
  background-color: #ffffff;
}
.navigation-inner-item {
  flex-direction: column;
  align-content: center;
  align-items: center;
}
.navigation-img {
  height: 120px;
  width: 120px;
}
.navigation-desc {
  padding-top: 24px;
  font-size: 24px;
  color: #000000;
}
.arraw-line {
  width: 750px;
  height: 15px;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
  background-color: #ffffff;
  overflow: hidden;
}
.arraw-triangle {
  left: 120px;
  top: 4px;
  width: 22px;
  height: 22px;
  background-color: #ffffff;
  border-color: #e5e5e8;
  border-width: 1px;
  transform: rotate(45deg);
}
.order-img {
  height: 120px;
  width: 120px;
  /* border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  border-style: solid; */
  margin-right: 30px;
}
.order-content {
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
}
.order-title {
  font-family: PingFangSC-Semibold;
  font-size: 28px;
  color: #000000;
  line-height: 40px;
  padding-bottom: 4px;
}
.order-desc {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8a8a8f;
  padding-bottom: 4px;
}
.order-time {
  justify-self: flex-end;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8a8a8f;
  line-height: 38px;
}
.group-gap-top {
  height: 24px;
}
.service-item-img {
  height: 40px;
  width: 40px;
  margin-right: 24px;
}
.service-item-title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
.actionsheet-popup {
  /* margin-bottom: 98px; */
}
.actionsheet-item {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px;
}
.actionsheet-item-label {
  flex: 1;
  font-family: PingFangSC-Regular;
  text-align: right;
  font-size: 32px;
  color: #000000;
}
.actionsheet-item-desc {
  flex: 1.5;
  font-family: PingFangSC-Regular;
  text-align: left;
  font-size: 32px;
  color: #267aff;
}
</style>
