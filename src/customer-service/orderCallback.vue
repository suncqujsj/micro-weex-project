<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./assets/img/public_ic_back@3x.png" titleText="#000000" @leftImgClick="back"></midea-header>
        <scroller class="scroller">
            <order-block class="order-block" :order="order" :showStatus="false">
                <div slot="action-bar">
                    <div class="service-status-bar">
                        <text v-bind:class="['service-status-action',serviceStatus==0?'service-status-action-selected':'']" @click="switchServiceStatus(0)">服务未完成</text>
                        <text v-bind:class="['service-status-action',serviceStatus==1?'service-status-action-selected':'']" @click="switchServiceStatus(1)">服务已完成</text>
                    </div>
                </div>
            </order-block>

            <div class="assess-block">
                <template v-if="serviceStatus==0">
                    <div class="callbacklist-block">
                        <text v-for="(item,index) in uncompletedList" :key="index" v-bind:class="['callback-item', item.isSelected?'callback-item-selected':'']" @click="selectUncompletedItem(index)">{{item.callbackResultName}}</text>
                    </div>
                </template>
                <template v-if="serviceStatus==1">
                    <div class="navigation-list">
                        <div v-for="(item, index) in callbackLevelList" :key="'level'+index" class="navigation-item">
                            <div class="navigation-inner-item" @click="selectLeve(item)">
                                <image class="navigation-img" :src="item.img + (serviceLevel==item.level?'on@3x.png':'off@3x.png')"></image>
                                <text v-bind:class="['navigation-desc',serviceLevel==item.level?'navigation-desc-selected':'']">{{item.title}}</text>
                            </div>
                        </div>
                    </div>
                    <div v-if="serviceLevel" class="callbacklist-block group-bottom-border">
                        <text v-if="serviceLevel=='unSatisfy'" v-for="(item,index) in unSatisfyList" :key="index" v-bind:class="['callback-item', item.isSelected?'callback-item-selected':'']" @click="selectCallback(serviceLevel, index)">{{item.customerLable}}</text>
                        <text v-if="serviceLevel=='normal'" v-for="(item,index) in normalList" :key="index" v-bind:class="['callback-item', item.isSelected?'callback-item-selected':'']" @click="selectCallback(serviceLevel, index)">{{item.customerLable}}</text>
                        <text v-if="serviceLevel=='satisfy'" v-for="(item,index) in satisfyList" :key="index" v-bind:class="['callback-item', item.isSelected?'callback-item-selected':'']" @click="selectCallback(serviceLevel, index)">{{item.customerLable}}</text>
                    </div>

                    <text v-if="serviceLevel=='unSatisfy' || serviceLevel=='normal'" class="callback-title">是否有以下行为</text>
                    <div v-if="serviceLevel=='unSatisfy'" class="callbacklist-block">
                        <text v-for="(item,index) in normalOtherList" :key="index" v-bind:class="['callback-item', item.isSelected?'callback-item-selected':'']" @click="selectNormalOtherCallback(index)">{{item.customerLable}}</text>
                    </div>
                    <div v-if="serviceLevel=='normal'" class="callbacklist-block">
                        <text v-for="(item,index) in normalOtherList" :key="index" v-bind:class="['callback-item', item.isSelected?'callback-item-selected':'']" @click="selectNormalOtherCallback(index)">{{item.customerLable}}</text>
                    </div>
                    <div v-if="serviceLevel" class="remark-group">
                        <textarea class="remark-textarea" placeholder="还想说点，将匿名并延迟告诉工程师" rows="4" v-model="remark" maxlength="250"></textarea>
                    </div>
                </template>

                <div v-if="isDataReady" class="action-bar">
                    <midea-button text="提交" :btnStyle="{width: '638px'}" @mideaButtonClicked="submit"></midea-button>
                </div>
            </div>
        </scroller>

    </div>
</template>

<script>
import base from './base'
import orderBase from './orderBase'
import nativeService from './settings/nativeService'
import util from '@/common/util/util'
import OrderBlock from '@/customer-service/components/orderBlock.vue'
import { MideaButton } from '@/index'

const clipboard = weex.requireModule('clipboard')

export default {
    components: {
        OrderBlock,
        MideaButton
    },
    mixins: [base, orderBase],
    data() {
        return {
            title: '评价服务',
            userInfo: null,
            order: null,
            callbackItemList: null,
            serviceStatus: null,
            serviceLevel: null,
            callbackLevelList: [{
                title: '不满意',
                img: './assets/img/service_ic_bad_',
                level: 'unSatisfy'
            }, {
                title: '一般',
                img: './assets/img/service_ic_nobad_',
                level: 'normal'
            }, {
                title: '满意',
                img: './assets/img/service_ic_ok_',
                level: 'satisfy'
            }],
            satisfyList: [],
            normalList: [],
            normalOtherList: [],
            unSatisfyList: [],
            unSatisfyOtherList: [],
            uncompletedList: [],
            remark: ""
        }
    },
    computed: {
        isDataReady() {
            let result = false

            this.satisfyList.forEach(item => { if (item.isSelected) result = true })
            this.normalList.forEach(item => { if (item.isSelected) result = true })
            this.normalOtherList.forEach(item => { if (item.isSelected) result = true })
            this.unSatisfyList.forEach(item => { if (item.isSelected) result = true })
            this.unSatisfyOtherList.forEach(item => { if (item.isSelected) result = true })
            this.uncompletedList.forEach(item => { if (item.isSelected) result = true })

            return result
        }
    },
    methods: {
        convertCallbackList() {
            //评价有礼
            for (let groupIndex = 0; groupIndex < this.callbackItemList.length; groupIndex++) {
                let groupItem = this.callbackItemList[groupIndex]
                let groupItemObj = {
                    "callbackTypeCode": groupItem.ccCallbackItemAndCtrlVO.callbackTypeCode,
                    "callbackTypeName": groupItem.ccCallbackItemAndCtrlVO.callbackTypeName,
                    "callbackItemId": groupItem.ccCallbackItemAndCtrlVO.callbackItemId,
                    "callbackItemCode": groupItem.ccCallbackItemAndCtrlVO.callbackItemCode,
                    "callbackItemName": groupItem.ccCallbackItemAndCtrlVO.callbackItemName,
                    isSelected: false
                }
                let groupItemList = groupItem.ccCallbackResultAndCtrlVOList
                let callbackTypeCode = groupItem.ccCallbackItemAndCtrlVO.callbackTypeCode
                for (let resultItemIndex = 0; resultItemIndex < groupItemList.length; resultItemIndex++) {
                    let resultItem = groupItemList[resultItemIndex]
                    let resultItemObj = {
                        "callbackResultId": resultItem.callbackResultId,
                        "callbackResultCode": resultItem.callbackResultCode,
                        "callbackResultName": resultItem.callbackResultName,
                    }
                    let reasonItemList = resultItem.oiCallbackResultUnsatisfyReasonVOList
                    if (callbackTypeCode == "FM" && [1, 0, -2].indexOf(resultItem.callbackResultScore) < 0) {
                        let reasonObj = Object.assign({}, groupItemObj, resultItemObj)
                        //未完成的评价
                        this.uncompletedList.push(reasonObj)
                    } else {
                        for (let reasonItemIndex = 0; reasonItemIndex < reasonItemList.length; reasonItemIndex++) {
                            let reasonItem = reasonItemList[reasonItemIndex]
                            let reasonObj = Object.assign({}, groupItemObj, resultItemObj, {
                                "unsatisfyReasonId": reasonItem.unsatisfyReasonId,
                                "customerLable": reasonItem.customerLable
                            })

                            if (callbackTypeCode == "FM") {
                                if (resultItem.callbackResultScore == 1) {
                                    //满意
                                    this.satisfyList.push(reasonObj)
                                } else if (resultItem.callbackResultScore == 0) {
                                    //一般
                                    this.normalList.push(reasonObj)
                                } else if (resultItem.callbackResultScore == -2) {
                                    //不满意
                                    this.unSatisfyList.push(reasonObj)
                                }
                            } else if (callbackTypeCode == "BZ" && resultItem.callbackResultScore == -2) {
                                //一般和不满意的其他行为
                                this.normalOtherList.push(reasonObj)
                                this.unSatisfyOtherList.push(reasonObj)
                            }
                        }
                    }
                }

            }
        },
        convertViewCallbackList() {
            //查看评价

            let oiCallbackDetailVOList = this.callbackItemList[0].oiCallbackDetailVOList
            for (let groupIndex = 0; groupIndex < oiCallbackDetailVOList.length; groupIndex++) {
                let callbackItem = oiCallbackDetailVOList[groupIndex]
                let groupItemObj = {
                    "callbackTypeCode": callbackItem.callbackTypeCode,
                    "callbackTypeName": callbackItem.callbackTypeName,
                    "callbackItemId": callbackItem.callbackItemId,
                    "callbackItemCode": callbackItem.callbackItemCode,
                    "callbackItemName": callbackItem.callbackItemName,
                    isSelected: true
                }
                let resultItemObj = {
                    "callbackResultId": callbackItem.callbackResultId,
                    "callbackResultCode": callbackItem.callbackResultCode,
                    "callbackResultName": callbackItem.callbackResultName
                }
                if (callbackItem.callbackTypeCode == "FM" && ["W11101", "W11102", "W11103"].indexOf(callbackItem.callbackResultCode) < 0) {
                    //未完成的评价
                    this.serviceStatus = 0
                    this.uncompletedList.push(Object.assign({}, groupItemObj, resultItemObj))
                } else if (callbackItem.callbackTypeCode == "FM") {
                    this.serviceStatus = 1
                    if (callbackItem.callbackResultCode == "W11101") {
                        //满意
                        this.serviceLevel = "satisfy"
                    } else if (callbackItem.callbackResultCode == "W11102") {
                        //一般
                        this.serviceLevel = "normal"
                    } else if (callbackItem.callbackResultCode == "W11103") {
                        //不满意
                        this.serviceLevel = "unSatisfy"
                    }
                    let reasonItemList = callbackItem.oiCallbackResultUnsatisfyReasonVOList
                    for (let reasonIndex = 0; reasonItemList && reasonIndex < reasonItemList.length; reasonIndex++) {
                        let reasonItem = reasonItemList[reasonIndex]
                        let reasonObj = Object.assign({}, groupItemObj, resultItemObj, {
                            "unsatisfyReasonId": reasonItem.unsatisfyReasonId,
                            "customerLable": reasonItem.customerLable
                        })
                        if (callbackItem.callbackResultCode == "W11101") {
                            //满意
                            this.satisfyList.push(reasonObj)
                        } else if (callbackItem.callbackResultCode == "W11102") {
                            //一般
                            this.normalList.push(reasonObj)
                        } else if (callbackItem.callbackResultCode == "W11103") {
                            //不满意
                            this.unSatisfyList.push(reasonObj)
                        }
                    }
                } else if (callbackItem.callbackTypeCode == "BZ") {
                    this.serviceStatus = 1
                    //一般和不满意的其他行为
                    // this.normalOtherList.push(reasonObj)
                    // this.unSatisfyOtherList.push(reasonObj)
                }

            }

            this.remark = this.callbackItemList[0].oiCallbackVO.remark
        },
        switchServiceStatus(type) {
            this.serviceStatus = type
            this.resetIsSelected()
        },
        selectLeve(item) {
            this.serviceLevel = item.level
            this.resetIsSelected()
        },
        resetIsSelected() {
            this.satisfyList.forEach(item => { item.isSelected = false })
            this.normalList.forEach(item => { item.isSelected = false })
            this.normalOtherList.forEach(item => { item.isSelected = false })
            this.unSatisfyList.forEach(item => { item.isSelected = false })
            this.unSatisfyOtherList.forEach(item => { item.isSelected = false })
            this.uncompletedList.forEach(item => { item.isSelected = false })
        },
        selectCallback(serviceLevel, index) {
            let targetList
            if (serviceLevel == 'satisfy') {
                targetList = this.satisfyList
            } else if (serviceLevel == 'normal') {
                targetList = this.normalList
            } else if (serviceLevel == 'unSatisfy') {
                targetList = this.unSatisfyList
            }
            if (targetList) {
                let item = targetList[index]
                item.isSelected = !item.isSelected
                this.$set(targetList, index, item)
            }
        },
        selectNormalOtherCallback(index) {
            let item = this.normalOtherList[index]
            item.isSelected = !item.isSelected
            this.$set(this.normalOtherList, index, item)
        },
        selectUnSatisfyOtherCallback(index) {
            let item = this.unSatisfyOtherList[index]
            item.isSelected = !item.isSelected
            this.$set(this.unSatisfyOtherList, index, item)
        },
        selectUncompletedItem(index) {
            let item = this.uncompletedList[index]
            item.isSelected = !item.isSelected
            this.$set(this.uncompletedList, index, item)
        },
        submit() {
            let param = {
                interfaceSource: this.order.interfaceSource,
                orgCode: this.order.orgCode,
                oiCallbackDetailVOList: [],
                oiCallbackInfoVO: {
                    serviceOrderNo: this.order.serviceOrderNo,
                    remark: this.remark,
                    webUserCode: this.userInfo.uid //"oFtQywGHyqrWbDvjVdRTeR9Ig3m0"
                }
            }
            if (this.serviceStatus == 0) {
                //未完成的评价
                let selectedList = this.uncompletedList.filter((item) => {
                    return item.isSelected
                })
                for (let index = 0; index < selectedList.length; index++) {
                    const uncompletedItem = selectedList[index]
                    param.oiCallbackDetailVOList.push({
                        callbackItemCode: uncompletedItem.callbackItemCode,
                        callbackItemId: uncompletedItem.callbackItemId,
                        callbackItemName: uncompletedItem.callbackItemName,
                        callbackTypeCode: uncompletedItem.callbackTypeCode,
                        callbackTypeName: uncompletedItem.callbackTypeName,
                        callbackResultId: uncompletedItem.callbackResultId,
                        callbackResultCode: uncompletedItem.callbackResultCode,
                        callbackResultName: uncompletedItem.callbackResultName,
                        brandCode: "",
                        brandName: "",
                        prodCode: "",
                        prodName: "",
                        oiCallbackResultUnsatisfyReasonVOList: []
                    })
                }
            } else {
                let targetList = []

                //一般标签
                if (this.serviceLevel == 'satisfy') {
                    //满意
                    targetList = this.satisfyList
                } else if (this.serviceLevel == 'normal') {
                    //一般
                    targetList = this.normalList
                } else if (this.serviceLevel == 'unSatisfy') {
                    //不满意
                    targetList = this.unSatisfyList
                }

                let selectedList = targetList.filter((item) => {
                    return item.isSelected
                })
                if (selectedList && selectedList.length > 0) {
                    let selectedObj = {
                        callbackItemCode: selectedList[0].callbackItemCode,
                        callbackItemId: selectedList[0].callbackItemId,
                        callbackItemName: selectedList[0].callbackItemName,
                        callbackTypeCode: selectedList[0].callbackTypeCode,
                        callbackTypeName: selectedList[0].callbackTypeName,
                        callbackResultId: selectedList[0].callbackResultId,
                        callbackResultCode: selectedList[0].callbackResultCode,
                        callbackResultName: selectedList[0].callbackResultName,
                        brandCode: "",
                        brandName: "",
                        prodCode: "",
                        prodName: "",
                        oiCallbackResultUnsatisfyReasonVOList: []
                    }
                    for (let index = 0; index < selectedList.length; index++) {
                        const satisfyItem = selectedList[index];
                        selectedObj.oiCallbackResultUnsatisfyReasonVOList.push({
                            unsatisfyReasonId: satisfyItem.unsatisfyReasonId,
                            customerLable: satisfyItem.customerLable
                        })
                    }
                    param.oiCallbackDetailVOList.push(selectedObj)
                }

                //其他行为标签（标准化标签）
                let targetOtherList = []
                if (this.serviceLevel == 'normal') {
                    //一般
                    targetOtherList = this.normalOtherList
                } else if (this.serviceLevel == 'unSatisfy') {
                    //不满意
                    targetOtherList = this.unSatisfyOtherList
                }
                let selectedOtherList = targetOtherList.filter((item) => {
                    return item.isSelected
                })
                if (selectedOtherList && selectedOtherList.length > 0) {
                    for (let index = 0; index < selectedOtherList.length; index++) {
                        const satisfyItem = selectedOtherList[index];
                        let selectedObj = {
                            callbackItemCode: satisfyItem.callbackItemCode,
                            callbackItemId: satisfyItem.callbackItemId,
                            callbackItemName: satisfyItem.callbackItemName,
                            callbackTypeCode: satisfyItem.callbackTypeCode,
                            callbackTypeName: satisfyItem.callbackTypeName,
                            callbackResultId: satisfyItem.callbackResultId,
                            callbackResultCode: satisfyItem.callbackResultCode,
                            callbackResultName: satisfyItem.callbackResultName,
                            brandCode: "",
                            brandName: "",
                            prodCode: "",
                            prodName: "",
                            oiCallbackResultUnsatisfyReasonVOList: []
                        }
                        selectedObj.oiCallbackResultUnsatisfyReasonVOList.push({
                            unsatisfyReasonId: satisfyItem.unsatisfyReasonId,
                            customerLable: satisfyItem.customerLable
                        })
                        param.oiCallbackDetailVOList.push(selectedObj)
                    }
                }
            }

            nativeService.createcallbackinfo(param).then((data) => {
                this.appPageDataChannel.postMessage({ page: this.fromPage, key: "createcallback", data: {} })
                this.back({ viewTag: "orderList" })
            }).catch((error) => {
                nativeService.toast(nativeService.getErrorMessage(error))
            })
        }
    },
    created() {
        nativeService.getItem(this.SERVICE_STORAGE_KEYS.currentOrder, (resp) => {
            if (resp.result == 'success') {
                this.order = JSON.parse(resp.data) || {}

                if (this.order.allowCallbackWX == "Y") {
                    //评价有礼
                    let param = {
                        interfaceSource: this.order.interfaceSource,
                        serviceOrderNo: this.order.serviceOrderNo,
                        orgCode: this.order.orgCode
                    }
                    nativeService.extractcallbackitem(param).then((data) => {
                        this.callbackItemList = data.list
                        this.convertCallbackList()
                    }).catch((error) => {
                        nativeService.toast(nativeService.getErrorMessage(error))
                    })
                }
            }
        })
        nativeService.getUserInfo().then((data) => {
            this.userInfo = data || {}
        })
    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
}
.scroller {
  background-color: #f2f2f2;
}

.order-block {
  margin-top: 24px;
  margin-right: 24px;
  margin-left: 24px;
}
.group-bottom-border {
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
.service-status-bar {
  /* width: 750px; */
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  padding-top: 32px;
  padding-left: 130px;
  padding-right: 130px;
}
.service-status-action {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  padding: 15px;
  width: 188px;
  text-align: center;
  border-radius: 80px;
  border-color: #c8c7cc;
  border-width: 1px;
}
.service-status-action-selected {
  color: #ffffff;
  background-color: #0078ff;
}
.assess-block {
  background-color: #ffffff;
  margin-top: 24px;
  margin-right: 24px;
  margin-left: 24px;
  margin-bottom: 48px;
  border-radius: 4px;
}
.navigation-list {
  flex-direction: row;
  justify-content: space-between;
  padding-top: 32px;
  padding-right: 130px;
  padding-left: 130px;
  padding-bottom: 32px;
}
.navigation-inner-item {
  flex-direction: column;
  align-content: center;
  align-items: center;
}
.navigation-img {
  height: 56px;
  width: 56px;
}
.navigation-desc {
  padding-top: 20px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #c8c7cc;
  text-align: center;
}
.navigation-desc-selected {
  color: #0078ff;
}

.callbacklist-block {
  padding-top: 32px;
  padding-right: 46px;
  padding-left: 46px;
  background-color: #ffffff;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.callback-title {
  padding-top: 32px;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  text-align: center;
}
.callback-item {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  background-color: #f6f6f6;
  text-align: center;
  padding-top: 8px;
  padding-right: 28px;
  padding-bottom: 8px;
  padding-left: 28px;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 32px;
  border-radius: 4px;
}
.callback-item-selected {
  background-color: #e8f1ff;
  color: #267aff;
}
.remark-group {
  padding-top: 16px;
  padding-right: 32px;
  padding-left: 32px;
  padding-bottom: 48px;
  background-color: #ffffff;
}
.remark-text {
  flex: 1;
  height: 150px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  border-radius: 6px;
  border-color: #e5e5e8;
  border-width: 1px;
  padding: 8px;
  background-color: #fafafa;
}
.remark-textarea {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  border-radius: 6px;
  border-color: #e5e5e8;
  border-width: 1px;
  padding: 8px;
  background-color: #fafafa;
}
.action-bar {
  background-color: #ffffff;
  text-align: center;
  padding-bottom: 50px;
  padding-left: 32px;
  padding-right: 32px;
}
</style>
