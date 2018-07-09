<template>
    <div>
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./assets/img/public_ic_back@3x.png" titleText="#000000" @leftImgClick="back"></midea-header>
        <scroller class="scroller" ref="orderListScroller" loadmoreoffset=300 @loadmore="loadmore">
            <refresh v-if="isLoaded" class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
                <text class="indicator-text">刷新列表 ...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </refresh>
            <div class="empty-page" v-if="isLoaded && formattedOrderList.length == 0">
                <image class="empty-page-icon" src="./assets/img/default_ic_nolist@3x.png" resize='contain'>
                </image>
                <text class="empty-page-text">暂无订单</text>
            </div>
            <div v-else>
                <div v-for="(formattedOrder, index) in formattedOrderList" :key="index" @click="goToOrderDetail(index)">
                    <order-block class="order-block" :order="formattedOrder" :ref="'order'+index">
                        <div v-if="hasAction(formattedOrder)" slot="action-bar" class="action-bar">
                            <text class="action" v-if="formattedOrder.isAbleToCheckBranch" @click="checkBranch(index)">查看网点</text>
                            <text class="action" v-if="formattedOrder.isAbleToCancel" @click="showDialog(index)">取消工单</text>
                            <text class="action" v-if="formattedOrder.isAbleToUrgeOrder" @click="urgeOrder(index)">催办</text>
                            <text class="action" v-if="formattedOrder.isAbleToRenew" @click="renewOrder(index)">重新报单</text>
                            <text class="action primary-action" v-if="formattedOrder.allowCallbackWX == 'Y'" @click="goToCallback(index)">评价有礼</text>
                            <text class="action" v-if="formattedOrder.isAbleToCallService" @click="callService(index)">联系网点</text>
                        </div>
                    </order-block>
                </div>
                <loading class="loading" :display="showLoading" v-if="hasNext">
                    <text class="indicator-text">加载中...</text>
                    <loading-indicator class="indicator"></loading-indicator>
                </loading>
                <text v-if="isLoaded && !hasNext && formattedOrderList.length>3" class="indicator-text">———— 到底了 ————</text>
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
import orderBase from './orderBase'
import nativeService from './settings/nativeService'
import OrderBlock from '@/customer-service/components/orderBlock.vue'

const dom = weex.requireModule('dom')

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
            refreshing: false,
            orderListParam: null,
            orderList: [],
            orderListPage: 0,
            isLoaded: false,
            hasNext: false,
            selectedOrderIndex: null,
            dialogShow: false,
            showLoading: 'hide',
            isShowUrgeOrder: false,
            reminderOptions: [],
        }
    },
    computed: {
        formattedOrderList() {
            //不可改变订单顺序
            return this.orderList.map((order) => {
                return this.formatOrder(order)
            })
        },
        urgeOrderItems() {
            let result = []
            if (this.reminderOptions) {
                result = this.reminderOptions.map((item) => {
                    return item.customerDesc
                })
            }
            return result
        }
    },
    methods: {
        handlePageData(data) {
            if (data.key == "createOrder") {
                this.refreshOrderList()
            } else if (data.page == "orderList") {
                if (data.key == "cancelOrder") {
                    let id = data.data.id
                    if (this.selectedOrderIndex) {
                        let order = this.orderList[this.selectedOrderIndex]
                        if (id == order.serviceOrderNo) {
                            order.serviceOrderStatus = '22'
                            this.$set(this.orderList, this.selectedOrderIndex, order)
                        }
                    }
                } else if (data.key == "createcallback") {
                    this.refreshOrderList()
                }
            }
        },
        //下拉刷新
        onrefresh(event) {
            this.refreshing = true
            this.refreshOrderList()
        },
        //获取订单列表
        refreshOrderList() {
            this.orderListPage = 0
            this.getOrderList()
            this.$nextTick(() => {
                const el = this.$refs['order0'][0]
                dom.scrollToElement(el, { offset: -24 })
                this.$refs.orderListScroller.resetLoadmore()
            })
        },
        getOrderList() {
            let param = {
                interfaceSource: "SMART",
                page: this.orderListPage,
                resultNum: 10
            }
            this.orderListParam = param
            nativeService.queryserviceorder(this.orderListParam).then((data) => {
                this.orderList = data.list
                this.hasNext = data.pageIndex * data.pageSize >= data.total ? false : true
                this.isLoaded = true
                this.refreshing = false
            }).catch((error) => {
                this.refreshing = false
                nativeService.toast(nativeService.getErrorMessage(error))
            })
        },
        //加载更多
        loadmore(event) {
            if (!this.hasNext) return
            this.showLoading = 'show'
            setTimeout(() => {
                this.orderListPage++
                this.orderListParam.page = this.orderListPage
                nativeService.queryserviceorder(this.orderListParam).then((data) => {
                    this.showLoading = 'hide'
                    if (data.list && data.list.length > 0) {
                        this.hasNext = data.pageIndex * data.pageSize >= data.total ? false : true
                        this.orderList = this.orderList.concat(data.list)
                    } else {
                        this.hasNext = false
                    }
                }).catch((error) => {
                    this.showLoading = 'hide'
                    this.$refs.orderListScroller.resetLoadmore()
                    nativeService.toast(nativeService.getErrorMessage(error))
                })
            }, 1500)
        },
        hasAction(formattedOrder) {
            let result = false
            if (formattedOrder.isAbleToCheckBranch ||
                formattedOrder.isAbleToCancel ||
                formattedOrder.isAbleToUrgeOrder ||
                formattedOrder.isAbleToRenew ||
                formattedOrder.isAbleToCallService ||
                formattedOrder.allowCallbackWX == 'Y') {
                result = true
            }

            return result
        },
        //查看详情
        goToOrderDetail(index) {
            this.selectedOrderIndex = index
            let order = this.orderList[index]
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.currentOrder, order, () => {
                this.goTo("orderDetail", {}, { from: 'orderList', id: order.serviceOrderNo })
            })
        },
        checkBranch(index) {
            this.selectedOrderIndex = index
            let order = this.orderList[index]
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.currentOrder, order, () => {
                this.goTo("branchList", {}, { from: 'orderList', id: order.serviceOrderNo })
            })
        },
        //催单
        checkPassTime(order) {
            let result = false
            let now = new Date()
            if (order.contactTime && new Date(order.contactTime) < now.setHours(now.getHours() - 1)) {
                result = true
            }
            return result
        },
        urgeOrder(index) {
            this.selectedOrderIndex = index
            let order = this.orderList[this.selectedOrderIndex]
            let param = {
                interfaceSource: order.interfaceSource,
                orgCode: order.orgCode,
                serviceOrderNo: order.serviceOrderNo,
                prodCode: order.serviceUserDemandVOs[0].prodCode
            }
            nativeService.queryservicereqsrvprod(param).then((resp) => {
                this.reminderOptions = resp.data
                this.isShowUrgeOrder = true;
                this.$nextTick(e => {
                    this.$refs.urgeOrderActionsheet.open()
                });
            }).catch((error) => {
                nativeService.toast(nativeService.getErrorMessage(error))
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
                interfaceSource: order.interfaceSource,
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

        //重新下单
        renewOrder(index) {
            let order = this.orderList[index]
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.currentOrder, order, () => {
                if (order.serviceSubTypeCode == 1111) {
                    this.goTo("maintenance", {}, { from: "orderList", isRenew: true })
                } else {
                    this.goTo("installation", {}, { from: "orderList", isRenew: true })
                }
            })
        },

        //取消工单
        showDialog(index) {
            this.dialogShow = true
            this.selectedOrderIndex = index
        },
        dialogCancel() {
            this.dialogShow = false
        },
        cancelOrder() {
            this.dialogShow = false
            nativeService.getUserInfo().then((data) => {
                let order = this.orderList[this.selectedOrderIndex]
                let param = {
                    interfaceSource: order.interfaceSource,
                    orgCode: order.orgCode,
                    serviceOrderNo: order.serviceOrderNo,
                    operator: data.nickName
                }
                nativeService.cancelserviceorder(param).then(() => {
                    order.serviceOrderStatus = '22'
                    this.$set(this.orderList, this.selectedOrderIndex, order)
                }).catch((error) => {
                    nativeService.toast(nativeService.getErrorMessage(error))
                })
            })
        },

        //评价有礼
        goToCallback(index) {
            let order = this.orderList[index]
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.currentOrder, order,
                () => {
                    this.goTo("orderCallback", {}, { from: 'orderList', id: order.serviceOrderNo })
                })
        },

        //联系网点
        callService(index) {
            let order = this.orderList[index]

            let param = {
                interfaceSource: order.interfaceSource,
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
.refresh {
  width: 750;
  display: -ms-flex;
  display: -webkit-flex;
  display: flex;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
}
.indicator {
  margin-top: 16px;
  height: 40px;
  width: 40px;
  color: #0078ff;
}
.indicator-text {
  font-family: PingFangSC-Regular;
  padding: 30px 0;
  width: 750px;
  color: #666666;
  font-size: 24px;
  text-align: center;
}

.loading {
  width: 750;
  display: -ms-flex;
  display: -webkit-flex;
  display: flex;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
  padding-bottom: 16px;
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
  padding-top: 10px;
  margin-right: 32px;
}
.action {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #000000;
  border-radius: 4px;
  padding-top: 10px;
  padding-right: 24px;
  padding-bottom: 10px;
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
.empty-page {
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 272px;
}
.empty-page-icon {
  width: 240px;
  height: 240px;
}
.empty-page-text {
  padding-top: 36px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #888888;
  text-align: center;
}
</style>
