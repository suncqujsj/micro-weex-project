<template>
    <div>
        <midea-header :title="title" @leftImgClick="back"></midea-header>
        <scroller class="scroller">
            <div class="order-detail-header">
                <image class="order-detail-img" src="./assets/img/progress.png" resize='contain'>
                </image>
                <div class="order-detail-content">
                    <text class="order-detail-label">待接单</text>
                    <text class="order-detail-desc">订单已经收到，即将分配</text>
                </div>
            </div>
            <div class="order-detail-step">
                <div class="order-detail-body-row">
                    <text class="order-body-label">2018-12-12{{'\n'}}12:11:10</text>
                    <text class="order-body-desc">服务已经成功接收，服务已经成功接收，服务已经成功接收，服务已经成功接收，服务已经成功接收</text>
                </div>
                <div class="order-detail-body-row">
                    <text class="order-body-label">2018-12-12{{'\n'}}12:11:10</text>
                    <text class="order-body-desc">服务等待分配</text>
                </div>
            </div>
            <div class="order-detail-body">
                <div class="order-detail-body-row">
                    <text class="order-body-label">服务内容:</text>
                    <text class="order-body-desc">安装空调</text>
                </div>
                <div class="order-detail-body-row">
                    <text class="order-body-label">服务单号:</text>
                    <text class="order-body-desc">FW123456789</text>
                    <text class="order-copy">复制</text>
                </div>
                <div class="order-detail-body-row">
                    <text class="order-body-label">下单渠道:</text>
                    <text class="order-body-desc">400客服</text>
                </div>
                <div class="order-detail-body-row">
                    <text class="order-body-label">下单时间:</text>
                    <text class="order-body-desc">2018-12-12 10:12</text>
                </div>
                <div class="order-detail-body-row">
                    <text class="order-body-label">服务地址:</text>
                    <text class="order-body-desc">广东阿斯蒂芬法师打发阿斯顿发阿斯顿发阿斯顿发阿斯顿发啊实打实啊{{'\n'}}张三 13512341234</text>
                </div>
            </div>
        </scroller>
        <div class="action-bar">
            <text class="action" @click="cancelOrder">取消工单</text>
        </div>

        <midea-dialog title="要取消此订单？" :show="dialogShow" @mideaDialogCancelBtnClicked="cancelOrderConfirm" @mideaDialogConfirmBtnClicked="submitOrderConfirm">
        </midea-dialog>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'
import mideaDialog from '@/component/dialog.vue';

export default {
    components: {
        mideaDialog
    },
    mixins: [base],
    data() {
        return {
            title: '订单详情',
            orderList: [
                {
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
                    time: '2018-05-11',
                    type: '京东接入',
                    status: 2,
                    statusDesc: '已接单',
                    label: '安装家用空调',
                    desc: '工程师即将上门为您服务工程师即将上门为您服务工程师即将上门为您服务工程师即将上门',
                    price: '',
                    imageUrl: './assets/img/progress.png'
                },

                {
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
                    time: '2018-05-11',
                    type: '京东接入',
                    status: 6,
                    statusDesc: '待服务',
                    label: '维修净水器',
                    desc: '工程师即将上门为您服务',
                    price: '',
                    imageUrl: './assets/img/progress.png'
                }
            ],
            dialogShow: false
        }
    },
    methods: {
        cancelOrder() {
            this.dialogShow = true;
        },
        cancelOrderConfirm() {
            this.dialogShow = false;
        },
        submitOrderConfirm() {
            this.dialogShow = false;
        },
    },
    created() {

    }
}
</script>

<style>
.order-detail-header {
  width: 750px;
  height: 200px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #e2e2e2;
}
.order-detail-img {
  flex: 1;
  height: 150px;
  width: 100px;
  margin: 20px;
}
.order-detail-content {
  flex: 2;
  justify-content: center;
}
.order-detail-label {
  font-size: 28px;
}
.order-detail-desc {
  color: gray;
  font-size: 26px;
}
.order-detail-step {
  width: 750px;
  flex-direction: column;
  justify-content: center;
  background-color: #e3e3e3;
  padding-top: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  padding-left: 50px;
}
.order-detail-step-row {
  flex-direction: row;
  padding-top: 8px;
  padding-bottom: 8px;
}
.order-step-label {
  width: 150px;
  font-size: 26px;
}
.order-step-desc {
  flex: 1;
  font-size: 26px;
}
.order-detail-body {
  width: 750px;
  flex-direction: column;
  justify-content: center;
  background-color: #e3e3e3;
  padding-top: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  padding-left: 50px;
  margin-top: 50px;
}
.order-detail-body-row {
  flex-direction: row;
  padding-top: 8px;
  padding-bottom: 8px;
}
.order-body-label {
  width: 150px;
  font-size: 26px;
}
.order-body-desc {
  flex: 1;
  font-size: 26px;
}
.order-copy {
  width: 80px;
  background-color: gray;
  font-size: 26px;
  border-radius: 8px;
  padding: 5px;
  text-align: center;
}

.action-bar {
  position: fixed;
  bottom: 0px;
  width: 750px;
  height: 88px;
  text-align: left;
  background-color: gray;
  justify-content: center;
}
.action {
  margin-left: 40px;
  color: blue;
  font-size: 28px;
}
</style>
