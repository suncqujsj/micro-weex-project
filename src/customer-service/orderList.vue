<template>
    <div>
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back"></midea-header>
        <scroller class="scroller" loadmoreoffset=750 @loadmore="loadmore">
            <div class="empty-page" v-if="isOrderListLoaded && formattedOrderList.length == 0">
                <image class="empty-page-icon" src="./assets/img/default_ic_nolist@3x.png" resize='contain'>
                </image>
                <text class="empty-page-text">暂无订单</text>
            </div>
            <div v-else>
                <div v-for="(order, index) in formattedOrderList" :key="index" @click="goToOrderDetail(index)">
                    <order-block class="order-block" :order="order">
                        <div slot="action-bar" class="action-bar">
                            <text class="action" v-if="order.calcServiceOrderStatus == 1" @click="checkAddress()">查看网点</text>
                            <text class="action" v-if="[2, 6].indexOf(order.calcServiceOrderStatus)>-1" @click="showDialog(index)">取消工单</text>
                            <text class="action" v-if="order.calcServiceOrderStatus == 2 && checkPassTime(order)" @click="urgeOrder(index)">催办</text>
                            <text class="action" v-if="order.calcServiceOrderStatus == 3" @click="renewOrder(index)">重新报单</text>
                            <text class="action primary-action" v-if="order.calcServiceOrderStatus == 4" @click="assessService(index)">评价有礼</text>
                            <text class="action" v-if="order.calcServiceOrderStatus == 5" @click="assessService(index)">查看评价</text>
                            <text class="action" v-if="order.calcServiceOrderStatus == 6" @click="callService(index)">联系网点</text>
                        </div>
                    </order-block>
                </div>
                <div v-if="isOrderListLoaded">
                    <text class="loading-end" v-if="hasNext && !loadingEnd">加载中...</text>
                    <text class="loading-end" v-if="loadingEnd">———— 到底了 ————</text>
                </div>
                <!-- <loading class="loading" :display="showLoading" v-if="!loadingEnd">
                <loading-indicator class="indicator"></loading-indicator>
            </loading> -->
            </div>
        </scroller>

        <midea-actionsheet :items="urgeOrderItems" :show="isShowUrgeOrder" @close="closeUrgeOrderActionsheet" @itemClick="urgeOrdertItemClick" @btnClick="urgeOrderBtnClick" ref="urgeOrderActionsheet">
        </midea-actionsheet>

        <midea-dialog title="要取消此订单？" mainBtnColor="#267AFF" secondBtnColor="#267AFF" :show="dialogShow" cancelText="否" confirmText="是" @mideaDialogCancelBtnClicked="dialogCancel" @mideaDialogConfirmBtnClicked="cancelOrder">
        </midea-dialog>
    </div>
</template>

<script>
import base from './base'
import orderBase from './order-base'
import nativeService from '@/common/services/nativeService'
import OrderBlock from '@/customer-service/components/orderBlock.vue'

import { MideaDialog, MideaActionsheet } from '@/index'

export default {
    components: {
        OrderBlock,
        MideaDialog,
        MideaActionsheet
    },
    mixins: [base, orderBase],
    data() {
        return {
            title: '进度查询',
            orderListParam: null,
            orderList: [],
            orderListPage: 0,
            isOrderListLoaded: false,
            hasNext: false,
            selectedOrderIndex: null,
            dialogShow: false,
            showLoading: 'hide',
            loadingEnd: false,
            isShowUrgeOrder: false,
            reminderOptions: [],
        }
    },
    computed: {
        formattedOrderList() {
            //不可改变订单顺序
            return this.orderList.map((order) => {
                let calcServiceOrderStatus = this.calcServiceOrderStatus(order)

                return Object.assign(order, { calcServiceOrderStatus: calcServiceOrderStatus })
            })
        },
        urgeOrderItems() {
            let result = []
            if (this.reminderOptions) {
                result = this.reminderOptions.map((item) => {
                    return item.serviceRequireName
                })
            }
            return result
        }
    },
    methods: {
        handlePageData(data) {
            if (data.page == "orderList") {
                if (data.key == "cancelOrder") {
                    let id = data.data.id
                    if (this.selectedOrderIndex) {
                        let order = this.orderList[this.selectedOrderIndex]
                        if (id == order.serviceOrderNo) {
                            order.serviceOrderStatus = '22'
                            this.$set(this.orderList, this.selectedOrderIndex, order)
                        }
                    }
                }
            }
        },
        getOrderList() {
            let status = []
            for (let index = 10; index < 35; index++) {
                status.push(index)
            }
            let param = {
                dispatchOrderStatus: status.join(","),  //派工单状态
                orderColumn: "contactTime",
                page: this.orderListPage,
                resultNum: 10
            }
            this.orderListParam = param
            nativeService.queryserviceorder(this.orderListParam).then((data) => {
                this.orderList = data.list
                this.hasNext = data.pageIndex * data.pageSize >= data.total ? false : true
                this.isOrderListLoaded = true
            })
        },
        loadmore(event) {
            this.showLoading = 'show'
            setTimeout(() => {
                this.orderListPage++
                this.orderListParam.page = this.orderListPage
                nativeService.queryserviceorder(this.orderListParam).then((data) => {
                    this.showLoading = 'hide'
                    if (data.list && data.list.length > 0) {
                        this.orderList = this.orderList.concat(data.list)
                    } else {
                        this.loadingEnd = true
                    }
                })
            }, 1500)
        },
        goToOrderDetail(index) {
            this.selectedOrderIndex = index
            let order = this.orderList[index]
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.order, order, () => {
                this.goTo("orderDetail", {}, { from: 'orderList', id: order.serviceOrderNo })
            })
        },
        checkAddress() {
            this.goTo('productSelection', {}, { from: 'orderList' })
        },
        urgeOrder(index) {
            this.selectedOrderIndex = index
            let order = this.orderList[this.selectedOrderIndex]
            let param = {
                prodCode: order.serviceUserDemandVOs[0].prodCode,
                orgCode: order.orgCode,
                serviceOrderNO: order.serviceOrderNo,
                serviceMode: ""
            }
            nativeService.queryReminderOptions(param).then((resp) => {
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
            let order = this.orderList[this.selectedOrderIndex]
            let reminderOption = this.reminderOptions[event.index]
            let param = {
                orgCode: order.orgCode,
                serviceOrderNo: order.serviceOrderNo,
                // serviceRequireTypeCode: reminderOption.serviceRequireCode,
                reminderReason: reminderOption.serviceRequireName,
                serviceRequireItem2Code: reminderOption.serviceRequireCode
            }
            nativeService.createserviceuserdemand(param).then(() => {
                nativeService.toast("催单成功")
            }).catch((error) => {
                nativeService.toast(nativeService.getCssErrorMessage(error))
            })
        },
        urgeOrderBtnClick() {
            this.isShowUrgeOrder = false
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
        cancelOrder() {
            this.dialogShow = false
            let order = this.orderList[this.selectedOrderIndex]
            let param = {
                orgCode: order.orgCode,
                serviceOrderNo: order.serviceOrderNo,
                operator: nativeService.userInfo.userName
            }
            nativeService.cancelserviceorder(param).then(() => {
                order.serviceOrderStatus = '22'
                this.$set(this.orderList, this.selectedOrderIndex, order)
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
        this.getOrderList()
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
  color: #0078ff;
  border-color: #0078ff;
}
.loading-end {
  width: 750px;
  padding: 30px 0;
  background-color: #f2f2f2;
  color: #666666;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 24px;
}
.indicator-loading {
  width: 750px;
  height: 120px;
  color: #0e90ff;
  font-size: 42px;
  text-align: center;
}
.indicator-text {
  width: 750px;
  color: #5f5f5f;
  font-size: 28px;
  text-align: center;
}
.empty-page {
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.empty-page-icon {
  margin-top: 272px;
  width: 240px;
  height: 240px;
}
.empty-page-text {
  padding-top: 36px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #888888;
}
</style>
