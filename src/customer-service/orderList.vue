<template>
    <div>
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back"></midea-header>
        <scroller class="scroller">
            <div v-for="(order, index) in formattedOrderList" :key="index" @click="goToOrderDetail(index)">
                <order-block class="order-block" :order="order">
                    <div slot="action-bar" class="action-bar">
                        <text class="action" v-if="order.calcServiceOrderStatus == 1" @click="checkAddress()">查看网点</text>
                        <text class="action" v-if="[2, 6].indexOf(order.calcServiceOrderStatus)>-1" @click="showDialog(index)">取消工单</text>
                        <text class="action" v-if="order.calcServiceOrderStatus == 2 && checkPassTime(order)" @click="urgeOrder(index)">催办</text>
                        <text class="action" v-if="order.calcServiceOrderStatus == 3" @click="renewOrder(index)">重新报单</text>
                        <text class="action" v-if="order.calcServiceOrderStatus == 4" @click="assessService(index)">评价有礼</text>
                        <text class="action primary-action" v-if="order.calcServiceOrderStatus == 5" @click="assessService(index)">查看评价</text>
                        <text class="action" v-if="order.calcServiceOrderStatus == 6" @click="callService(index)">联系网点</text>
                    </div>
                </order-block>
            </div>
            <div class="gap-bottom"></div>
        </scroller>

        <midea-dialog title="要取消此订单？" mainBtnColor="#267AFF" secondBtnColor="#267AFF" :show="dialogShow" cancelText="否" confirmText="是" @mideaDialogCancelBtnClicked="dialogCancel" @mideaDialogConfirmBtnClicked="dialogConfirm">
        </midea-dialog>
    </div>
</template>

<script>
import base from './base'
import orderBase from './order-base'
import nativeService from '@/common/services/nativeService'
import OrderBlock from '@/customer-service/components/orderBlock.vue'

import { MideaDialog } from '@/index'

export default {
    components: {
        OrderBlock,
        MideaDialog
    },
    mixins: [base, orderBase],
    data() {
        return {
            title: '进度查询',
            orderList: [],
            selectedOrderIndex: null,
            dialogShow: false
        }
    },
    computed: {
        formattedOrderList() {
            return this.orderList.map((order) => {
                let calcServiceOrderStatus = this.calcServiceOrderStatus(order)

                return Object.assign(order, { calcServiceOrderStatus: calcServiceOrderStatus })
            })
        }
    },
    methods: {
        goToOrderDetail(index) {
            let order = this.orderList[index]
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.order, order, () => {
                this.goTo("orderDetail", {}, { from: 'orderList', id: order.serviceOrderNo })
            })
        },
        checkAddress() {
            this.goTo('productSelection', {}, { from: 'orderList' })
        },
        urgeOrder(index) {
            let oldOrder = this.orderList[index]
            let param = {
                serviceOrderNo: oldOrder.serviceOrderNo
            }
            nativeService.createserviceuserdemand().then(() => {
                nativeService.toast("催单成功")
            })
        },
        renewOrder(index) {
            let order = this.orderList[index]
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.order, order, () => {
                if (order.serviceSubTypeCode == 1111) {
                    this.goTo("maintenance", {}, { from: "orderList", id: order.serviceOrderNo })
                } else {
                    this.goTo("installation", {}, { from: "orderList", id: order.serviceOrderNo })
                }
            })
        },
        showDialog(index) {
            this.dialogShow = true
            this.selectedOrderIndex = index
        },
        dialogCancel() {
            this.dialogShow = false
        },
        dialogConfirm() {
            this.dialogShow = false
            let oldOrder = this.orderList[this.selectedOrderIndex]
            let param = {
                serviceOrderNo: oldOrder.serviceOrderNo
            }
            nativeService.cancelserviceorder(param).then(() => {
                oldOrder.serviceOrderStatus = '22'
                this.$set(this.orderList, this.selectedOrderIndex, oldOrder)
            })
        },
        assessService(index) {
            let order = this.orderList[index]
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.order, order,
                () => {
                    this.goTo("serviceAssessment", {}, { from: 'orderList', id: order.serviceOrderNo })
                })
        },
        callService(index) {
            let order = this.orderList[index]
            nativeService.callTel({
                tel: order.unitTel,
                title: '网点客户服务',
                desc: '拨打网点热线电话：' + order.unitTel
            }).then(
                (resp) => { }
            ).catch((error) => {
                nativeService.toast(error)
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
        let param = {
            dispatchOrderStatus: "22",  //派工单状态
            orderColumn: "pubCreateDate"
        }
        nativeService.queryserviceorder(param).then((data) => {
            this.orderList = data.list
        })
    }
}
</script>

<style>
.scroller {
  background-color: #f2f2f2;
}
.order-block {
  margin-top: 24px;
  margin-right: 32px;
  margin-left: 32px;
}
.gap-bottom {
  margin-bottom: 80px;
}
.action-bar {
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 15px;
  margin-right: 32px;
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
  color: #ffffff;
  background-color: #267aff;
  border-color: #267aff;
}
</style>
