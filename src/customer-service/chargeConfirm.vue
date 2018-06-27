<template>
    <div>
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
            <div slot="customerContent" class="header-right">
                <text class="header-right-text" @click="reset">清空</text>
            </div>
        </midea-header>
        <scroller class="scroller">
            <div class="charge-detail-header">
                <div class="charge-detail-title-wrapper">
                    <text class="charge-detail-title">安装服务收费报价单</text>
                    <text class="text-tag">官方认证</text>
                </div>
                <text class="charge-detail-desc">美的 燃气热水器</text>
                <div class="charge-detail-row-wrapper">
                    <text class="charge-detail-label">收费明细</text>
                    <text class="charge-detail-desc">美的集团官方收费标准</text>
                </div>

                <div v-if="chargeItemList">
                    <div class="charge-detail-item" v-for="(item, index) in chargeItemList" :key="index">
                        <text class="charge-detail-label">{{item.title}}</text>
                        <div class="charge-detail-row-wrapper">
                            <text class="charge-detail-item-desc">{{item.title}}</text>
                            <text class="charge-detail-item-price">{{item.title}}</text>
                        </div>
                    </div>
                    <text class="charge-detail-item-sum">总价：102元</text>
                </div>
            </div>
            <div class="charge-detail-body">
                <text class="charge-detail-body-label">工单信息</text>
                <text class="charge-detail-body-label">安装美的燃气热水器</text>
                <div class="charge-detail-body-row">
                    <text class="order-body-label">服务单号：</text>
                    <text class="order-body-desc">{{serviceOrderNo}}</text>
                </div>
                <div class="charge-detail-body-row">
                    <text class="order-body-label">请求时间：</text>
                    <text class="order-body-desc">{{formattedOrder.contactTimeDesc}}</text>
                </div>
                <div class="charge-detail-body-row">
                    <text class="order-body-desc">{{formattedOrder.servCustomerName}} {{formattedOrder.servCustomerMobilephone1}}{{'\n'}}{{formattedOrder.servCustomerAddress}}</text>
                </div>
            </div>
            <text class="order-footer-label">未出现在报价单里的收费项，您有权拒绝付款</text>

            <div class="action-bar">
                <midea-button text="我确认收费内容和报价" type="green" :btnStyle="{'background-color': '#267AFF','border-radius': '4px'}" @mideaButtonClicked="search">
                </midea-button>
            </div>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import orderBase from './order-base'
import nativeService from '@/common/services/nativeService'
import util from '@/common/util/util'

import { MideaButton } from '@/index'

export default {
    components: {
        MideaButton
    },
    mixins: [base, orderBase],
    data() {
        return {
            title: '服务报价单',
            serviceOrderNo: '',
            order: null,
            chargeItemList: [
                {
                    title: "测试测试测试测试"
                },
                {
                    title: "测试测试测试测试"
                },
                {
                    title: "测试测试测试测试"
                }
            ]
        }
    },
    computed: {
        formattedOrder() {
            let result = {}
            if (this.order) {
                result = this.formatOrder(this.order)
            }

            return result
        }
    },
    methods: {
        convertProcessTime(time) {
            return util.dateFormat(new Date(time), "yyyy-MM-dd hh:mm")
        },
        reset() {

        }
    },
    created() {
        this.serviceOrderNo = nativeService.getParameters('id') || null
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
.scroller {
  background-color: #f2f2f2;
}
.charge-detail-header {
  width: 750px;
  flex-direction: column;
  padding: 32px;
  background-color: #ffffff;
}
.charge-detail-title-wrapper {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.charge-detail-title {
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 32px;
  color: #000000;
  margin-left: 128px;
  margin-bottom: 16px;
}
.text-tag {
  margin-left: 15px;
  width: 128px;
  background-color: #e8f1ff;
  border-radius: 100px;
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #267aff;
  padding-top: 3px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 3px;
  text-align: center;
}
.charge-detail-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  text-align: center;
}
.charge-detail-row-wrapper {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
}
.charge-detail-label {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
}
.charge-detail-item {
  flex-direction: column;
  padding-top: 24px;
  padding-bottom: 24px;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
}
.charge-detail-item-desc {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8a8a8f;
}
.charge-detail-item-price {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #000000;
}
.charge-detail-item-sum {
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: #ff9500;
  text-align: right;
  padding-top: 24px;
  padding-bottom: 24px;
}

.charge-detail-body {
  width: 750px;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  padding: 32px;
  margin-top: 24px;
}
.charge-detail-body-row {
  flex-direction: row;
  align-items: flex-start;
  padding-bottom: 32px;
}
.charge-detail-body-label {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  padding-bottom: 32px;
}
.order-body-label {
  width: 160px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  text-align: right;
  margin-right: 15px;
}
.order-body-desc {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
}
.order-footer-label {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  text-align: center;
  margin-top: 26px;
}
.action-bar {
  width: 750px;
  text-align: center;
  margin-bottom: 150px;
}
</style>
