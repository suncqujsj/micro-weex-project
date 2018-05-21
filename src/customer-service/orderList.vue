<template>
    <div>
        <midea-header :title="title" @leftImgClick="back"></midea-header>
        <scroller>
            <div v-for="(order, index) in orderList" :key="index" @click="goToOrderDetail(order)">
                <order-block class="order-block" :data="order">
                    <div slot="action-bar" class="action-bar">
                        <text class="action" v-if="order.status == 1" @click="checkAddress()">查看网点</text>
                        <text class="action" v-if="order.status == 2 || order.status == 6" @click="showDialog(index)">取消工单</text>
                        <text class="action" v-if="order.status == 2 && checkPassTime(order.ceatetime)" @click="urgeOrder(index)">催办</text>
                        <text class="action" v-if="order.status == 3" @click="renewOrder(index)">重新报单</text>
                        <text class="action" v-if="order.status == 4" @click="assessService(index)">评价有礼</text>
                        <text class="action" v-if="order.status == 5" @click="checkAssess(index)">查看评价</text>
                        <text class="action" v-if="order.status == 6" @click="callService(index)">联系网点</text>
                    </div>
                </order-block>
            </div>
        </scroller>

        <midea-dialog title="要取消此订单？" :show="dialogShow" @mideaDialogCancelBtnClicked="dialogCancel" @mideaDialogConfirmBtnClicked="dialogConfirm">
        </midea-dialog>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'
import orderBlock from '@/customer-service/components/orderBlock.vue'

import { MideaDialog } from '@/index'

export default {
    components: {
        orderBlock,
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
                    imageUrl: './assets/img/progress.png'
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
                    imageUrl: './assets/img/progress.png'
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
                    imageUrl: './assets/img/progress.png'
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
                    imageUrl: './assets/img/progress.png'
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
                    price: '￥120.00',
                    imageUrl: './assets/img/progress.png'
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
                    imageUrl: './assets/img/progress.png'
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
                    imageUrl: './assets/img/progress.png',
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
                this.goTo("maintenance", {}, { id: order.id })
            } else {
                this.goTo("installation", {}, { id: order.id })
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
        checkPassTime(){
            
        }
    },
    created() {

    }
}
</script>

<style>
.order-block {
  margin-top: 10px;
  margin-bottom: 20px;
}
.action-bar {
  flex-direction: row;
  justify-content: flex-end;
  /* padding-right: 20px; */
  background-color: aliceblue;
  padding-top: 15px;
  padding-bottom: 15px;
}
.action {
  padding: 5px;
  margin-left: 40px;
  color: blue;
  font-size: 28px;
}
</style>
