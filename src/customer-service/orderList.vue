<template>
    <div>
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back"></midea-header>
        <scroller class="scroller" loadmoreoffset=750 @loadmore="loadmore">
            <div class="empty-page" v-if="isLoaded && formattedOrderList.length == 0">
                <image class="empty-page-icon" src="./assets/img/default_ic_nolist@3x.png" resize='contain'>
                </image>
                <text class="empty-page-text">暂无订单</text>
            </div>
            <div v-else>
                <div v-for="(order, index) in formattedOrderList" :key="index" @click="goToOrderDetail(index)">
                    <order-block class="order-block" :order="order" :ref="'order'+index">
                        <div v-if="hasAction(order)" slot="action-bar" class="action-bar">
                            <text class="action" v-if="order.calcServiceOrderStatus == 1" @click="checkBranch(index)">查看网点</text>
                            <text class="action" v-if="[2, 6].indexOf(order.calcServiceOrderStatus)>-1" @click="showDialog(index)">取消工单</text>
                            <text class="action" v-if="order.calcServiceOrderStatus == 2 && checkPassTime(order)" @click="urgeOrder(index)">催办</text>
                            <text class="action" v-if="order.calcServiceOrderStatus == 3" @click="renewOrder(index)">重新报单</text>
                            <text class="action primary-action" v-if="order.allowCallbackWX == 'Y'" @click="goToCallback(index)">评价有礼</text>
                            <text class="action" v-if="order.callbackStatus == 12" @click="goToCallback(index)">查看评价</text>
                            <text class="action" v-if="order.calcServiceOrderStatus == 6" @click="callService(index)">联系网点</text>
                        </div>
                    </order-block>
                </div>
                <div class="list-end" v-if="isLoaded">
                    <text class="loading-end" v-if="hasNext && !loadingEnd">加载中...</text>
                    <!-- <text class="loading-end" v-if="loadingEnd">———— 到底了 ————</text> -->
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
            orderListParam: null,
            orderList: [],
            orderListPage: 0,
            isLoaded: false,
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
        //获取订单列表
        refreshOrderList() {
            this.orderListPage = 0
            this.getOrderList()
            this.$nextTick(() => {
                const el = this.$refs['order0'][0]
                dom.scrollToElement(el, { offset: -24 })
            })
        },
        getOrderList() {
            let status = []
            for (let index = 10; index < 35; index++) {
                status.push(index)
            }
            let param = {
                dispatchOrderStatus: status.join(","),  //派工单状态
                page: this.orderListPage,
                resultNum: 10
            }
            this.orderListParam = param
            nativeService.queryserviceorder(this.orderListParam).then((data) => {
                this.orderList = data.list
                this.hasNext = data.pageIndex * data.pageSize >= data.total ? false : true
                this.isLoaded = true
            }).catch((error) => {
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
                        this.loadingEnd = true
                    }
                }).catch((error) => {
                    nativeService.toast(nativeService.getErrorMessage(error))
                })
            }, 1500)
        },
        hasAction(formattedOrder) {
            let result = false
            if (formattedOrder.calcServiceOrderStatus == 1 ||
                [2, 6].indexOf(formattedOrder.calcServiceOrderStatus) > -1 ||
                (formattedOrder.calcServiceOrderStatus == 2 && checkPassTime(formattedOrder)) ||
                formattedOrder.calcServiceOrderStatus == 3 ||
                formattedOrder.allowCallbackWX == 'Y' ||
                formattedOrder.callbackStatus == 12 ||
                formattedOrder.calcServiceOrderStatus == 6) {
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
            let order = this.orderList[this.selectedOrderIndex]
            let param = {
                orgCode: order.orgCode,
                serviceOrderNo: order.serviceOrderNo,
                operator: nativeService.userInfo.userName
            }
            nativeService.cancelserviceorder(param).then(() => {
                order.serviceOrderStatus = '22'
                this.$set(this.orderList, this.selectedOrderIndex, order)
            }).catch((error) => {
                nativeService.toast(nativeService.getErrorMessage(error))
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
.list-end {
  margin-top: 20px;
  margin-bottom: 100px;
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
