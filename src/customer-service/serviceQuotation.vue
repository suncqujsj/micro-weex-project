<template>
    <div>
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./assets/img/public_ic_back@3x.png" titleText="#000000" @leftImgClick="back">
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

                <div v-if="chargeList">
                    <div class="charge-detail-item" v-for="(item, index) in chargeList" :key="index">
                        <div v-for="(detailItem, detailIndex) in item" :key="detailIndex">
                            <text class="charge-detail-label">{{detailItem.chargeCProject}}</text>
                            <div class="charge-detail-row-wrapper">
                                <text class="charge-detail-item-desc">{{detailItem.pubRemark}}</text>
                                <text class="charge-detail-item-price">{{detailItem.chargeStandard}}{{detailItem.chargeUnit}}</text>
                            </div>
                        </div>
                        <text class="charge-detail-item-sum">总价：{{item.chargeFee}}元</text>
                    </div>
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
                    <text class="order-body-desc">{{convertTimeDesc(formattedOrder.contactTime)}}</text>
                </div>
                <div class="charge-detail-body-row top-line">
                    <text class="order-customer">{{formattedOrder.servCustomerName}} {{formattedOrder.servCustomerMobilephone1}}</text>
                </div>
                <div class="charge-detail-body-row">
                    <text class="order-address">{{formattedOrder.servCustomerAddress}}</text>
                </div>
            </div>
            <text class="order-footer-label">未出现在报价单里的收费项，您有权拒绝付款</text>

            <div class="action-bar">
                <midea-button v-if="!isConfirmed" text="我确认收费内容和报价" type="green" :btnStyle="{'background-color': '#267AFF','border-radius': '4px'}" @mideaButtonClicked="submit">
                </midea-button>
                <midea-button v-if="isConfirmed" text="查看工单详情" type="green" :btnStyle="{'background-color': '#267AFF','border-radius': '4px'}" @mideaButtonClicked="goToOrderDetail">
                </midea-button>
            </div>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import orderBase from './orderBase'
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
            chargeList: [],
            isConfirmed: false
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
        convertTimeDesc(time) {
            return time ? util.dateFormat(new Date(time), "yyyy年MM月dd日 hh:mm") : ''
        },
        submit() {
            nativeService.getUserInfo().then((userInfo) => {
                let param = {
                    interfaceSource: this.order.interfaceSource,
                    webConfirmNo: userInfo.uid, //外部确认号码???
                    confirmIphone: userInfo.mobile,
                    archivesNo: this.chargeList[0].archivesNo,
                    serviceOrderNo: this.order.serviceOrderNo,
                    orgCode: this.order.orgCode
                }
                nativeService.dochargecomfirm(param).then((resp) => {
                    nativeService.toast("确认成功")
                    this.isConfirmed = true
                }).catch((error) => {
                    nativeService.toast(nativeService.getErrorMessage(error))
                })
            })
        },
        goToOrderDetail() {
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.currentOrder, this.order, () => {
                this.goTo("orderDetail", {}, { from: 'serviceQuotation', id: this.order.serviceOrderNo })
            })
        }
    },
    created() {
        this.serviceOrderNo = nativeService.getParameters('id') || null
        let param = {
            interfaceSource: "SMART",
            filterOrderNos: this.serviceOrderNo,
            page: 0,
            resultNum: 1
        }
        nativeService.queryserviceorder(param).then((data) => {
            if (data.list && data.list.length > 0) {
                this.order = data.list[0]
                let chargeDetailParam = {
                    interfaceSource: this.order.interfaceSource,
                    serviceOrderNo: this.order.serviceOrderNo,
                    orgCode: this.order.orgCode
                }
                nativeService.querychargedetails(chargeDetailParam).then((resp) => {
                    this.chargeList = resp.chargeList
                    if (this.chargeList && this.chargeList.length > 0) {
                        /*  收费状态	WOM_CHARGE_STATUS	待用户确认	10
                            收费状态	WOM_CHARGE_STATUS	用户确认	11
                            收费状态	WOM_CHARGE_STATUS	支付成功	14
                            收费状态	WOM_CHARGE_STATUS	支付失败	15 */
                        if (this.chargeList[0].chargeStatus == "10") {
                            this.isConfirmed = false
                        } else {
                            this.isConfirmed = true
                        }
                    }
                }).catch((error) => {
                    nativeService.toast(nativeService.getErrorMessage(error))
                })
            }
        }).catch((error) => {
            nativeService.toast(nativeService.getErrorMessage(error))
        })
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
  margin-bottom: 16px;
}
.charge-detail-title {
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 32px;
  color: #000000;
  margin-left: 128px;
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

.top-line {
  border-top-color: #e5e5e8;
  border-top-width: 1px;
  border-top-style: solid;
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
  font-weight: 600;
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
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  text-align: left;
  margin-right: 15px;
}
.order-body-desc {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
}
.order-customer {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  padding-top: 32px;
}
.order-address {
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
