<template>
    <div>
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back"></midea-header>
        <scroller class="scroller">
            <div class="order-detail-header">
                <div class="order-detail-background"></div>
                <div class="order-detail-content">
                    <text class="order-detail-label">{{statusObj.desc}}</text>
                    <text class="order-detail-desc">订单已经收到，即将分配</text>
                </div>
                <image class="order-detail-img" :src="statusObj.icon" resize='cover'>
                </image>
            </div>
            <div class="order-detail-step">
                <div class="order-detail-step-row">
                    <text class="order-step-label">2018-12-12{{'\n'}}12:11:10</text>
                    <div class="order-detail-step-flow">
                        <div class="order-detail-step-line first-step-line"></div>
                        <div class="order-detail-step-dot current-step-dot"></div>
                    </div>
                    <text class="order-step-desc current-step">服务已经成功接收，服务已经成功接收，服务已经成功接收，服务已经成功接收，服务已经成功接收</text>
                </div>
                <div class="order-detail-step-row">
                    <text class="order-step-label">2018-12-12{{'\n'}}12:11:10</text>
                    <div class="order-detail-step-flow">
                        <div class="order-detail-step-line"></div>
                        <div class="order-detail-step-dot"></div>
                    </div>
                    <text class="order-step-desc">服务等待分配</text>
                </div>
                <div class="order-detail-step-row">
                    <text class="order-step-label">2018-12-12{{'\n'}}12:11:10</text>
                    <div class="order-detail-step-flow">
                        <div class="order-detail-step-line last-step-line"></div>
                        <div class="order-detail-step-dot"></div>
                    </div>
                    <text class="order-step-desc">服务等待分配</text>
                </div>
            </div>
            <div class="order-detail-body">
                <div class="order-detail-body-row">
                    <text class="order-body-label">服务内容：</text>
                    <text class="order-body-desc">安装空调</text>
                </div>
                <div class="order-detail-body-row">
                    <text class="order-body-label">服务单号：</text>
                    <div class="order-copy-group">
                        <text class="order-body-desc">FW123456789</text>
                        <text class="order-copy" @click="copyOrder('FW123456789')">复制</text>
                    </div>
                </div>
                <div class="order-detail-body-row">
                    <text class="order-body-label">下单渠道：</text>
                    <text class="order-body-desc">400客服</text>
                </div>
                <div class="order-detail-body-row">
                    <text class="order-body-label">下单时间：</text>
                    <text class="order-body-desc">2018-12-12 10:12</text>
                </div>
                <div class="order-detail-body-row">
                    <text class="order-body-label">服务地址：</text>
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

        <midea-dialog title="要取消此订单？" mainBtnColor="#267AFF" secondBtnColor="#267AFF" :show="dialogShow" cancelText="否" confirmText="是" @mideaDialogCancelBtnClicked="dialogCancel" @mideaDialogConfirmBtnClicked="dialogConfirm">
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
    computed: {
        statusObj() {
            let result = ""
            switch (this.order.status) {
                case 1:
                    //待接单
                    result = { desc: "待接单", icon: "./assets/img/service_ic_order_new@3x.png" }
                    break;
                case 2:
                    //已接单 - 上门
                    result = { desc: "待工程师上门", icon: "./assets/img/service_ic_order_ongoing@3x.png" }
                    break;
                case 3:
                    //已取消
                    result = { desc: "(已取消)" + this.order.label, icon: "./assets/img/service_ic_order_cancel@3x.png" }
                    break;
                case 4:
                    //已完成 - 待评价
                    result = { desc: "(已完成)" + this.order.label, icon: "./assets/img/service_ic_order_finish@3x.png" }
                    break;
                case 5:
                    //已完成 - 已评价
                    result = { desc: "(已完成)" + this.order.label, icon: "./assets/img/service_ic_order_finish@3x.png" }
                    break;
                case 6:
                    //待服务
                    result = { desc: "待接单", icon: "./assets/img/service_ic_order_new@3x.png" }
                    break;
            }
            return result
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
.scroller {
  background-color: #f2f2f2;
}
.order-detail-header {
  width: 750px;
  height: 192px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
  margin-top: 22px;
}
.order-detail-content {
  flex: 1;
  justify-content: center;
}
.order-detail-label {
  font-family: PingFangSC-Medium;
  font-size: 56px;
  color: #ffffff;
  margin-bottom: 24px;
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
  height: 192px;
  width: 320px;
  right: -10px;
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
  color: #ffffff;
  background-color: #267aff;
  border-color: #267aff;
}
</style>
