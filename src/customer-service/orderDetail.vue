<template>
    <div>
        <midea-header :title="title" @leftImgClick="back"></midea-header>
        <scroller class="scroller">
            <div class="order-detail-header">
                <image class="order-detail-img" :src="order.imageUrl" resize='contain'>
                </image>
                <div class="order-detail-content">
                    <text class="order-detail-label">{{order.statusDesc}}</text>
                    <text class="order-detail-desc">订单已经收到，即将分配</text>
                </div>
            </div>
            <div class="order-detail-step">
                <div class="order-detail-step-row">
                    <text class="order-step-label">2018-12-12{{'\n'}}12:11:10</text>
                    <text class="order-step-desc current-step">服务已经成功接收，服务已经成功接收，服务已经成功接收，服务已经成功接收，服务已经成功接收</text>
                </div>
                <div class="order-detail-step-row">
                    <text class="order-step-label">2018-12-12{{'\n'}}12:11:10</text>
                    <text class="order-step-desc">服务等待分配</text>
                </div>
            </div>
            <div class="order-detail-body">
                <div class="order-detail-body-row">
                    <text class="order-body-label">服务内容:</text>
                    <text class="order-body-desc">安装空调</text>
                </div>
                <div class="order-detail-body-row">
                    <text class="order-body-label">服务单号:</text>
                    <div class="order-copy-group">
                        <text class="order-body-desc">FW123456789</text>
                        <text class="order-copy" @click="copyOrder('FW123456789')">复制</text>
                    </div>
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
            <text class="action" v-if="order.status == 1" @click="checkAddress()">查看网点</text>
            <text class="action" v-if="order.status == 2 || order.status == 6" @click="showDialog()">取消工单</text>
            <text class="action" v-if="order.status == 2" @click="urgeOrder()">催办</text>
            <text class="action" v-if="order.status == 3" @click="renewOrder()">重新报单</text>
            <text class="action" v-if="order.status == 4">评价有礼</text>
            <text class="action" v-if="order.status == 5">查看评价</text>
            <text class="action" v-if="order.status == 6" @click="callService()">联系网点</text>
        </div>

        <midea-dialog title="要取消此订单？" :show="dialogShow" @mideaDialogCancelBtnClicked="dialogCancel" @mideaDialogConfirmBtnClicked="dialogConfirm">
        </midea-dialog>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'
import { MideaDialog, MideaButton } from '@/index'

const clipboard = weex.requireModule('clipboard')

export default {
    components: {
        MideaDialog
    },
    mixins: [base],
    data() {
        return {
            title: '订单详情',
            order: {
                time: '2018-05-11',
                type: '京东接入',
                status: 6,
                statusDesc: '待服务',
                label: '维修净水器',
                desc: '工程师即将上门为您服务',
                price: '',
                imageUrl: './assets/img/progress.png'
            },
            dialogShow: false
        }
    },
    methods: {
        copyOrder(orderNo) {
            clipboard.setString(orderNo)
            nativeService.toast("复制单号成功")
        },
        checkAddress() {
            this.goTo('productSelection', {}, { from: 'orderList' })
        },
        urgeOrder(index) {
            nativeService.toast("催单成功")
        },
        renewOrder(index) {
            if (this.order.orderType == 1) {
                this.goTo("maintenance", {}, { id: this.order.id })
            } else {
                this.goTo("installation", {}, { id: this.order.id })
            }
        },
        showDialog(index) {
            this.dialogShow = true
        },
        dialogCancel() {
            this.dialogShow = false
        },
        dialogConfirm() {
            this.dialogShow = false
            this.order.status = 3
        },
        callService(index) {
            nativeService.callTel({
                tel: this.order.tel,
                title: '网点客户服务',
                desc: '拨打网点热线电话：' + this.order.tel
            }).then(
                (resp) => { }
            ).catch((error) => {
                nativeService.toast(error)
            })
        }
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
  text-align: right;
  padding-right: 15px;
}
.order-step-desc {
  flex: 1;
  font-size: 26px;
}
.current-step {
  color: cornflowerblue;
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
  text-align: right;
  padding-right: 15px;
}
.order-body-desc {
  flex: 1;
  font-size: 26px;
}
.order-copy-group {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.order-copy {
  width: 80px;
  background-color: gray;
  font-size: 26px;
  border-radius: 8px;
  padding: 5px;
  margin-left: 30px;
  text-align: center;
}

.action-bar {
  position: fixed;
  bottom: 0px;
  width: 750px;
  height: 88px;
  text-align: left;
  background-color: gray;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 20px;
}
.action {
  padding: 5px;
  color: blue;
  font-size: 28px;
}
</style>
