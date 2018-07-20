<template>
    <div>
        <midea-header :title="title" :isImmersion="isipx?false:true" @headerClick="headerClick" titleText="#000000" @leftImgClick="back">
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
                        <div v-for="(detailItem, detailIndex) in item.chargeDetail" :key="detailIndex">
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
                    <text class="order-body-desc">{{notificationData.cssInfoId}}</text>
                </div>
                <div class="charge-detail-body-row">
                    <text class="order-body-label">请求时间：</text>
                    <text class="order-body-desc">{{notificationData.pushTime}}</text>
                </div>
                <div class="charge-detail-body-row top-line">
                    <text class="order-customer">{{notificationData.customerName}} {{notificationData.mobile}}</text>
                </div>
                <div class="charge-detail-body-row">
                    <text class="order-address">{{notificationData.customerAddress}}</text>
                </div>
            </div>
            <text class="order-footer-label">未出现在报价单里的收费项，您有权拒绝付款</text>
            <div class="action-bar">
                <midea-button v-if="chargeStatus>'10'" text="查看工单详情" @mideaButtonClicked="goToOrderDetail"></midea-button>
                <midea-button v-if="chargeStatus=='10'" text="我确认收费内容和报价" @mideaButtonClicked="submit"></midea-button>
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
            notificationData: {
                "customerName": "",
                "pushTime": "",
                "archivesNo": "",
                "interfaceSource": "",
                "orgCode": "",
                "cssInfoId": "",
                "chargeFlag": "",
                "noticeType": "",
                "mobile": ""
            },
            serviceOrderNo: '',
            archivesNo: '',
            order: null,
            chargeList: null,
            chargeStatus: ''
        }
    },
    computed: {
    },
    methods: {
        convertTimeDesc(time) {
            return time ? util.dateFormat(new Date(time), "yyyy年MM月dd日 hh:mm") : ''
        },
        querychargedetails() {
            let chargeDetailParam = {
                interfaceSource: this.notificationData.interfaceSource,
                serviceOrderNo: this.notificationData.cssInfoId,
                archivesNo: this.notificationData.archivesNo,
                orgCode: this.notificationData.orgCode
            }
            nativeService.querychargedetails(chargeDetailParam).then((resp) => {
                this.chargeList = resp.chargeList
                if (this.chargeList && this.chargeList.length > 0) {
                    /*  收费状态	WOM_CHARGE_STATUS	待用户确认	10
                        收费状态	WOM_CHARGE_STATUS	用户确认	11
                        收费状态	WOM_CHARGE_STATUS	支付成功	14
                        收费状态	WOM_CHARGE_STATUS	支付失败	15 */
                    this.chargeStatus = this.chargeList[0].chargeStatus
                }
            }).catch((error) => {
                nativeService.toast(nativeService.getErrorMessage(error))
            })
        },
        submit() {
            nativeService.getUserInfo().then((userInfo) => {
                let param = {
                    interfaceSource: this.notificationData.interfaceSource,
                    serviceOrderNo: this.notificationData.cssInfoId,
                    archivesNo: this.notificationData.archivesNo,
                    orgCode: this.notificationData.orgCode,
                    webConfirmNo: userInfo.uid, //外部确认号码???
                    confirmIphone: userInfo.mobile
                }
                nativeService.dochargecomfirm(param).then((resp) => {
                    nativeService.toast("确认成功")
                    this.querychargedetails()
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
        //获取从APP传来的参数
        this.notificationData = this.getNativeParam()
        this.querychargedetails()

        // this.serviceOrderNo = nativeService.getParameters('id') || null
        // this.archivesNo = nativeService.getParameters('archivesNo') || null
        // let param = {
        //     interfaceSource: "SMART",
        //     filterOrderNos: this.serviceOrderNo,
        //     page: 0,
        //     resultNum: 1
        // }
        // nativeService.queryserviceorder(param).then((data) => {
        //     if (data.list && data.list.length > 0) {
        //         this.order = data.list[0]
        //         this.querychargedetails()
        //     }
        // }).catch((error) => {
        //     nativeService.toast(nativeService.getErrorMessage(error))
        // })
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
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8a8a8f;
}
.charge-detail-item-price {
  width: 130px;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #000000;
  text-align: right;
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
