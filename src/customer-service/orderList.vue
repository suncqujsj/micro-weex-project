<template>
    <div>
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back"></midea-header>
        <scroller class="scroller">
            <div v-for="(order, index) in orderList" :key="index" @click="goToOrderDetail(order)">
                <order-block class="order-block" :data="order">
                    <div slot="action-bar" class="action-bar">
                        <text class="action" v-if="order.status == 1" @click="checkAddress()">查看网点</text>
                        <text class="action" v-if="order.status == 2 || order.status == 6" @click="showDialog(index)">取消工单</text>
                        <text class="action" v-if="order.status == 2 && checkPassTime(order)" @click="urgeOrder(index)">催办</text>
                        <text class="action" v-if="order.status == 3" @click="renewOrder(index)">重新报单</text>
                        <text class="action" v-if="order.status == 4" @click="assessService(index)">评价有礼</text>
                        <text class="action primary-action" v-if="order.status == 5" @click="checkAssess(index)">查看评价</text>
                        <text class="action" v-if="order.status == 6" @click="callService(index)">联系网点</text>
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
import nativeService from '@/common/services/nativeService'
import OrderBlock from '@/customer-service/components/orderBlock.vue'

import { MideaDialog } from '@/index'

export default {
    components: {
        OrderBlock,
        MideaDialog
    },
    mixins: [base],
    data() {
        return {
            title: '进度查询',
            orderList: [
                {
                    id: '1',
                    orderType: 1,
                    time: '2018-05-11',
                    type: '京东接入',
                    status: 1,
                    statusDesc: '已接单',
                    label: '维修净水器',
                    desc: '工程师即将上门为您服务',
                    price: '',
                    imageUrl: './assets/img/service_midea@3x.png'
                },

                {
                    id: '2',
                    orderType: 0,
                    time: '8888-88-88',
                    type: '美的服务',
                    status: 2,
                    statusDesc: '已接单',
                    label: '安装家用空调',
                    desc: '工程师即将上门为您服务工程师即将上门为您服务工程师即将上门为您服务工程师即将上门',
                    price: '',
                    imageUrl: './assets/img/service_midea@3x.png',
                    createTime: '2017-12-12'
                },

                {
                    id: '3',
                    orderType: 0,
                    time: '2018-05-11',
                    type: '美的APP',
                    status: 3,
                    statusDesc: '已取消',
                    label: '安装家用空调',
                    desc: '工程师即将上门为您服务',
                    price: '',
                    imageUrl: './assets/img/service_midea@3x.png'
                },


                {
                    id: '3',
                    orderType: 1,
                    time: '2018-05-11',
                    type: '京东接入',
                    status: 3,
                    statusDesc: '已取消',
                    label: '维修家用空调',
                    desc: '工程师即将上门为您服务',
                    price: '',
                    imageUrl: './assets/img/service_midea@3x.png'
                },

                {
                    id: '4',
                    orderType: 3,
                    time: '2018-05-11',
                    type: '京东接入',
                    status: 4,
                    statusDesc: '待评价',
                    label: '清洗家用空调',
                    desc: '工程师即将上门为您服务',
                    price: '120.00',
                    imageUrl: './assets/img/service_midea@3x.png'
                },

                {
                    id: '5',
                    orderType: 1,
                    time: '2018-05-11',
                    type: '京东接入',
                    status: 5,
                    statusDesc: '已完成',
                    label: '维修净水器',
                    desc: '工程师即将上门为您服务',
                    price: '',
                    imageUrl: './assets/img/service_midea@3x.png'
                },

                {
                    id: '6',
                    orderType: 1,
                    time: '2018-05-11',
                    type: '京东接入',
                    status: 6,
                    statusDesc: '待服务',
                    label: '维修净水器',
                    desc: '工程师即将上门为您服务',
                    price: '',
                    imageUrl: './assets/img/service_midea@3x.png',
                    tel: '4008228228'
                }
            ],
            selectedOrderIndex: null,
            dialogShow: false
        }
    },
    methods: {
        goToOrderDetail(order) {
            this.goTo("orderDetail", {}, { id: order.id })
        },
        checkAddress() {
            this.goTo('productSelection', {}, { from: 'orderList' })
        },
        urgeOrder(index) {
            nativeService.toast("催单成功")
        },
        renewOrder(index) {
            let order = this.orderList[index]
            if (order.orderType == 1) {
                this.goTo("maintenance", {}, { from: "orderList", id: order.id })
            } else {
                this.goTo("installation", {}, { from: "orderList", id: order.id })
            }
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
            oldOrder.status = 3
            this.$set(this.orderList, this.selectedOrderIndex, oldOrder)
        },
        assessService(index) {
            let order = this.orderList[index]
            this.goTo("serviceAssessment", {}, { id: order.id })
        },
        checkAssess(index) {
            let order = this.orderList[index]
            this.goTo("serviceAssessment", {}, { id: order.id })
        },
        callService(index) {
            let order = this.orderList[index]
            nativeService.callTel({
                tel: order.tel,
                title: '网点客户服务',
                desc: '拨打网点热线电话：' + order.tel
            }).then(
                (resp) => { }
            ).catch((error) => {
                nativeService.toast(error)
            })
        },
        checkPassTime(order) {
            let result = false
            let now = new Date()
            if (order.createTime && new Date(order.createTime) < now.setHours(now.getHours() - 1)) {
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
        nativeService.sendMCloudRequest('queryserviceorder', param).then((data) => {
            // this.orderList = data.list
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
