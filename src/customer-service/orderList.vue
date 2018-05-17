<template>
    <div>
        <midea-header :title="title" @leftImgClick="back"></midea-header>
        <scroller>
            <div v-for="(order, index) in orderList" :key="index" @click="goToOrderDetail(order)">
                <order-block class="order-block" :data="order">
                    <div slot="action-bar" class="action-bar">
                        <text class="action" v-if="order.status == 1" @click="proceedAction('check')">查看网点</text>
                        <text class="action" v-if="order.status == 2 || order.status == 6">取消工单</text>
                        <text class="action" v-if="order.status == 2">催办</text>
                        <text class="action" v-if="order.status == 3">重新报单</text>
                        <text class="action" v-if="order.status == 4">评价有礼</text>
                        <text class="action" v-if="order.status == 5">查看评价</text>
                        <text class="action" v-if="order.status == 6">联系网点</text>
                    </div>
                </order-block>
            </div>

        </scroller>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'
import orderBlock from '@/customer-service/components/orderBlock.vue'

export default {
    components: {
        orderBlock
    },
    mixins: [base],
    data() {
        return {
            title: '进度查询',
            orderList: [
                {
                    id: '1',
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
                    time: '8888-88-88',
                    type: '京东接入',
                    status: 2,
                    statusDesc: '已接单',
                    label: '安装家用空调',
                    desc: '工程师即将上门为您服务工程师即将上门为您服务工程师即将上门为您服务工程师即将上门',
                    price: '',
                    imageUrl: './assets/img/progress.png'
                },

                {
                    id: '3',
                    time: '2018-05-11',
                    type: '京东接入',
                    status: 3,
                    statusDesc: '已取消',
                    label: '安装家用空调',
                    desc: '工程师即将上门为您服务',
                    price: '',
                    imageUrl: './assets/img/progress.png'
                },

                {
                    id: '4',
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
                    time: '2018-05-11',
                    type: '京东接入',
                    status: 6,
                    statusDesc: '待服务',
                    label: '维修净水器',
                    desc: '工程师即将上门为您服务',
                    price: '',
                    imageUrl: './assets/img/progress.png'
                }
            ]
        }
    },
    methods: {
        goToOrderDetail(order) {
            this.goTo("orderDetail", {}, { id: order.id })
        },
        proceedAction() {
            this.goTo("orderDetail", {}, { id: order.id })
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
}
.action {
  margin-left: 40px;
  color: blue;
  font-size: 28px;
}
</style>
