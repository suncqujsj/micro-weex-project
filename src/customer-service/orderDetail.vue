<template>
    <div>
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back"></midea-header>
        <scroller class="scroller" v-if="formattedOrder">
            <div class="order-detail-header">
                <div class="order-detail-background"></div>
                <image class="order-detail-img" :src="formattedOrder.statusIcon" resize='cover'>
                </image>
                <div class="order-detail-content">
                    <text class="order-detail-label">{{formattedOrder.statusDesc}}{{'('+formattedOrder.serviceSubTypeName+')'}}</text>
                </div>
            </div>
            <div v-if="progressList" class="order-detail-step">
                <div class="order-detail-step-row" v-for="(item, index) in progressList" :key="index">
                    <text class="order-step-label">{{convertProcessTime(item.processTime)}}</text>
                    <div class="order-detail-step-flow">
                        <div v-bind:class="['order-detail-step-line', index==0?'first-step-line':(index==progressList.length -1?'last-step-line':'')]"></div>
                        <div v-bind:class="['order-detail-step-dot', index==0?'current-step-dot':'']"></div>
                    </div>
                    <text v-bind:class="['order-step-desc', index==0?'current-step':'']">{{item.processDesc}}</text>
                </div>
            </div>
            <div class="order-detail-body">
                <div class="order-detail-body-row">
                    <text class="order-body-label">服务内容：</text>
                    <text class="order-body-desc">{{formattedOrder.orderDesc}}</text>
                </div>
                <div class="order-detail-body-row">
                    <text class="order-body-label">服务单号：</text>
                    <div class="order-copy-group">
                        <text class="order-body-desc">{{serviceOrderNo}}</text>
                        <text class="order-copy" @click="copyOrder(serviceOrderNo)">复制</text>
                    </div>
                </div>
                <div class="order-detail-body-row">
                    <text class="order-body-label">下单渠道：</text>
                    <text class="order-body-desc">{{formattedOrder.interfaceSourceDesc}}</text>
                </div>
                <div class="order-detail-body-row">
                    <text class="order-body-label">下单时间：</text>
                    <text class="order-body-desc">{{formattedOrder.contactTimeDesc}}</text>
                </div>
                <div class="order-detail-body-row">
                    <text class="order-body-label">服务地址：</text>
                    <text class="order-body-desc">{{formattedOrder.servCustomerAddress}}{{'\n'}}{{formattedOrder.servCustomerName}} {{formattedOrder.servCustomerMobilephone1}}</text>
                </div>
            </div>
        </scroller>
        <div class="action-bar" v-if="formattedOrder && hasAction">
            <text class="action" v-if="formattedOrder.calcServiceOrderStatus == 1" @click="checkBranch()">查看网点</text>
            <text class="action" v-if="[2, 6].indexOf(formattedOrder.calcServiceOrderStatus)>-1" @click="showDialog()">取消工单</text>
            <text class="action" v-if="formattedOrder.calcServiceOrderStatus == 2 && checkPassTime(formattedOrder)" @click="urgeOrder()">催办</text>
            <text class="action" v-if="formattedOrder.calcServiceOrderStatus == 3" @click="renewOrder()">重新报单</text>
            <text class="action primary-action" v-if="formattedOrder.allowCallbackWX == 'Y'" @click="assessService()">评价有礼</text>
            <text class="action" v-if="formattedOrder.callbackStatus == 12" @click="assessService()">查看评价</text>
            <text class="action" v-if="formattedOrder.calcServiceOrderStatus == 6" @click="callService()">联系网点</text>
        </div>

        <midea-actionsheet :items="urgeOrderItems" :show="isShowUrgeOrder" @close="closeUrgeOrderActionsheet" @itemClick="urgeOrdertItemClick" @btnClick="urgeOrderBtnClick" ref="urgeOrderActionsheet">
        </midea-actionsheet>

        <midea-dialog title="要取消此订单？" mainBtnColor="#267AFF" secondBtnColor="#267AFF" :show="dialogShow" cancelText="否" confirmText="是" @mideaDialogCancelBtnClicked="dialogCancel" @mideaDialogConfirmBtnClicked="cancelOrder">
        </midea-dialog>
    </div>
</template>

<script>
import base from './base'
import orderBase from './orderBase'
import nativeService from '@/common/services/nativeService'
import util from '@/common/util/util'
import { MideaDialog, MideaActionsheet } from '@/index'

const clipboard = weex.requireModule('clipboard')

export default {
    components: {
        MideaDialog,
        MideaActionsheet
    },
    mixins: [base, orderBase],
    data() {
        return {
            title: '订单详情',
            serviceOrderNo: '',
            progressList: null,
            order: null,
            dialogShow: false,
            isShowUrgeOrder: false,
            reminderOptions: [],
        }
    },
    computed: {
        formattedOrder() {
            let result
            if (this.order) {
                result = this.formatOrder(this.order)
            }

            return result
        },
        urgeOrderItems() {
            let result = []
            if (this.reminderOptions) {
                result = this.reminderOptions.map((item) => {
                    return item.customerDesc
                })
            }
            return result
        },
        hasAction() {
            let result = false
            if (this.formattedOrder.calcServiceOrderStatus == 1 ||
                [2, 6].indexOf(this.formattedOrder.calcServiceOrderStatus) > -1 ||
                (this.formattedOrder.calcServiceOrderStatus == 2 && checkPassTime(this.formattedOrder)) ||
                this.formattedOrder.calcServiceOrderStatus == 3 ||
                this.formattedOrder.allowCallbackWX == 'Y' ||
                this.formattedOrder.callbackStatus == 12 ||
                this.formattedOrder.calcServiceOrderStatus == 6) {
                result = true
            }

            return result
        }
    },
    methods: {
        convertProcessTime(time) {
            return util.dateFormat(new Date(time), "yyyy-MM-dd hh:mm")
        },
        copyOrder(orderNo) {
            clipboard.setString(orderNo)
            nativeService.toast("复制单号成功")
        },
        checkBranch() {
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.currentOrder, this.order, () => {
                this.goTo("branchList", {}, { from: 'orderDetail', id: this.order.serviceOrderNo })
            })
        },

        urgeOrder() {
            let order = this.order
            let param = {
                orgCode: order.orgCode,
                serviceOrderNo: order.serviceOrderNo,
                prodCode: order.serviceUserDemandVOs[0].prodCode,
                interfaceSource: "SMART"
            }
            nativeService.queryservicereqsrvprod(param).then((resp) => {
                this.reminderOptions = resp.data
                this.isShowUrgeOrder = true;
                this.$nextTick(e => {
                    this.$refs.urgeOrderActionsheet.open();
                });
            })
        },
        closeUrgeOrderActionsheet() {
            this.isShowUrgeOrder = false
        },
        urgeOrdertItemClick(event) {
            this.isShowUrgeOrder = false
            let order = this.order
            let reminderOption = this.reminderOptions[event.index]
            let param = {
                orgCode: order.orgCode,
                serviceOrderNo: order.serviceOrderNo,
                reminderReason: reminderOption.serviceRequireItemName,
                serviceRequireItem2Code: reminderOption.serviceRequireItemCode
            }
            nativeService.createserviceuserdemand(param).then(() => {
                nativeService.toast("催单成功")
            }).catch((error) => {
                nativeService.toast(nativeService.getErrorMessage(error))
            })
        },
        urgeOrderBtnClick() {
            this.isShowUrgeOrder = false
        },
        renewOrder() {
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.currentOrder, this.order, () => {
                if (this.order.serviceSubTypeCode == 1111) {
                    this.goTo("maintenance", {}, { from: "orderList", isRenew: true })
                } else {
                    this.goTo("installation", {}, { from: "orderList", isRenew: true })
                }
            })
        },
        showDialog() {
            this.dialogShow = true
        },
        dialogCancel() {
            this.dialogShow = false
        },
        cancelOrder() {
            this.dialogShow = false
            let param = {
                orgCode: this.order.orgCode,
                serviceOrderNo: this.order.serviceOrderNo,
                operator: nativeService.userInfo.userName
            }
            nativeService.cancelserviceorder(param).then(() => {
                this.order.serviceOrderStatus = '22'
                this.appPageDataChannel.postMessage({ page: this.fromPage, key: "cancelOrder", data: { id: this.order.serviceOrderNo } })
            })
        },
        assessService() {
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.currentOrder, this.order,
                () => {
                    this.goTo("orderCallback", {}, { from: 'orderList', id: this.order.serviceOrderNo })
                })
        },
        callService() {
            let order = this.order

            let param = {
                serviceOrderNo: order.serviceOrderNo,
                orgCode: order.orgCode,
                customerPhone: order.customerMobilephone1
            }
            nativeService.queryserviceuserdemanddispatch(param).then((data) => {
                if (data.unitTel) {
                    nativeService.callTel({
                        tel: data.unitTel,
                        title: '网点客户服务',
                        desc: '拨打网点热线电话：' + data.unitTel
                    }).then(
                        (resp) => { }
                    ).catch((error) => {
                        nativeService.toast(error)
                    })
                }
            }).catch((error) => {
                nativeService.toast(nativeService.getErrorMessage(error))
            })
        },
        checkPassTime(order) {
            let result = false
            let now = new Date()
            if (order.contactTime && new Date(order.contactTime) < now.setHours(now.getHours() - 1)) {
                result = true
            }
            return result
        }
    },
    created() {
        this.serviceOrderNo = nativeService.getParameters('id') || null

        let param = {
            serviceOrderCode: this.serviceOrderNo
        }
        nativeService.queryconsumerorderprogress(param).then((resp) => {
            this.progressList = resp.oiqueryConsumerOrderProgressVOList
        })

        if (this.fromPage == "orderList") {
            nativeService.getItem(this.SERVICE_STORAGE_KEYS.currentOrder, (resp) => {
                if (resp.result == 'success') {
                    this.order = JSON.parse(resp.data) || {}
                }
            })
        } else {
            param = {
                serviceOrderCode: this.serviceOrderNo
            }
            nativeService.queryserviceorder(param).then((data) => {
                this.order = data.list[0]
            })
        }
    }
}
</script>

<style>
.scroller {
  background-color: #f2f2f2;
}
.order-detail-header {
  width: 750px;
  height: 192px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 48px;
  margin-top: 22px;
}
.order-detail-content {
  flex: 1;
  justify-content: center;
}
.order-detail-label {
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 56px;
  color: #ffffff;
}
.order-detail-desc {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #ffffff;
}
.order-detail-background {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 750px;
  height: 192px;
  background-color: #0078ff;
  opacity: 0.6;
}
.order-detail-img {
  position: absolute;
  bottom: 0px;
  right: -10px;
  height: 192px;
  width: 320px;
}
.order-detail-step {
  width: 750px;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  padding: 32px;
  border-top-color: #e5e5e8;
  border-top-width: 1px;
  border-top-style: solid;
  overflow: hidden;
}
.order-detail-step-row {
  flex-direction: row;
  align-items: center;
}
.order-step-label {
  width: 150px;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  text-align: right;
}
.order-detail-step-flow {
  position: relative;
  width: 60px;
  height: 114px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.order-detail-step-line {
  position: absolute;
  top: 0px;
  left: 29px;
  width: 2px;
  height: 114px;
  background-color: #efeff4;
}
.first-step-line {
  top: 57px;
  height: 57px;
}
.last-step-line {
  height: 57px;
}
.order-detail-step-dot {
  margin-left: 9px;
  margin-right: 9px;
  width: 12px;
  height: 12px;
  background-color: #c8c7cc;
  border-radius: 25px;
}
.current-step-dot {
  background-color: #00de51;
}
.order-step-desc {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
}
.current-step {
  color: #000000;
}
.order-detail-body {
  width: 750px;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  padding: 32px;
  margin-top: 24px;
  margin-bottom: 150px;
}
.order-detail-body-row {
  flex-direction: row;
  align-items: flex-start;
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
.order-copy-group {
  flex-direction: row;
}
.order-copy {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #267aff;
  padding-left: 32px;
  padding-right: 32px;
  text-align: center;
}

.action-bar {
  position: fixed;
  bottom: 0px;
  width: 750px;
  height: 96px;
  text-align: left;
  background-color: #ffffff;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  padding-right: 32px;
  border-top-color: #e5e5e8;
  border-top-width: 1px;
  border-top-style: solid;
}
.action {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #000000;
  border-radius: 4px;
  padding-top: 14px;
  padding-right: 24px;
  padding-bottom: 14px;
  padding-left: 24px;
  margin-left: 32px;
  border-color: #e5e5e8;
  border-width: 1px;
  border-style: solid;
}
.primary-action {
  color: #0078ff;
  border-color: #0078ff;
}
</style>
