<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back"></midea-header>
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
                        <textarea class="remark-textarea" placeholder="还想说点，将匿名并延迟告诉工程师" rows="4" v-model="remark"></textarea>
                    </div>
                </template>
                <text v-if="isDataReady" class="action-button" @click="submit">提交</text>
            </div>
        </scroller>

    </div>
</template>

<script>
import base from './base'
import orderBase from './order-base'
import nativeService from './settings/nativeService'
import util from '@/common/util/util'
import OrderBlock from '@/customer-service/components/orderBlock.vue'
import { MideaDialog, MideaButton } from '@/index'

const clipboard = weex.requireModule('clipboard')

export default {
    components: {
        OrderBlock,
        MideaDialog,
        MideaButton
    },
    mixins: [base, orderBase],
    data() {
        return {
            title: '评价服务',
            userInfo: null,
            order: null,
            serviceStatus: 1,
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
                    if (callbackTypeCode == "FM" && resultItem.callbackResultScore == null) {
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
                                if (resultItem.callbackResultCode == "W11101") {
                                    //满意
                                    this.satisfyList.push(reasonObj)
                                } else if (resultItem.callbackResultCode == "W11102") {
                                    //一般
                                    this.normalList.push(reasonObj)
                                } else if (resultItem.callbackResultCode == "W11103") {
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
                orgCode: this.order.orgCode,
                oiCallbackDetailVOList: [],
                oiCallbackInfoVO: {
                    serviceOrderNo: this.order.serviceOrderNo,
                    remark: this.remark,
                    webUserCode: "oFtQywGHyqrWbDvjVdRTeR9Ig3m0" //this.userInfo.uid
                }
            }
            if (this.serviceStatus == 0) {
                //未完成的评价
                let selectedUncompletedList = this.uncompletedList.filter((item) => {
                    return item.isSelected
                })
                for (let index = 0; index < selectedUncompletedList.length; index++) {
                    const uncompletedItem = selectedUncompletedList[index];
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
                let targetList
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

                let selectedSatisfyList = targetList.filter((item) => {
                    return item.isSelected
                })
                let selectedSatisfyObj = {
                    callbackItemCode: selectedSatisfyList[0].callbackItemCode,
                    callbackItemId: selectedSatisfyList[0].callbackItemId,
                    callbackItemName: selectedSatisfyList[0].callbackItemName,
                    callbackTypeCode: selectedSatisfyList[0].callbackTypeCode,
                    callbackTypeName: selectedSatisfyList[0].callbackTypeName,
                    callbackResultId: selectedSatisfyList[0].callbackResultId,
                    callbackResultCode: selectedSatisfyList[0].callbackResultCode,
                    callbackResultName: selectedSatisfyList[0].callbackResultName,
                    brandCode: "",
                    brandName: "",
                    prodCode: "",
                    prodName: "",
                    oiCallbackResultUnsatisfyReasonVOList: []
                }
                for (let index = 0; index < selectedSatisfyList.length; index++) {
                    const satisfyItem = selectedSatisfyList[index];
                    selectedSatisfyObj.oiCallbackResultUnsatisfyReasonVOList.push({
                        unsatisfyReasonId: satisfyItem.unsatisfyReasonId,
                        customerLable: satisfyItem.customerLable
                    })
                }
                param.oiCallbackDetailVOList.push(selectedSatisfyObj)
            }

            nativeService.createcallbackinfo(param).then((data) => {
                this.back()
            }).catch((error) => {
                nativeService.toast(nativeService.getCssErrorMessage(error))
            })
        }
    },
    created() {
        nativeService.getItem(this.SERVICE_STORAGE_KEYS.currentOrder, (resp) => {
            if (resp.result == 'success') {
                this.order = JSON.parse(resp.data) || {}

                let param = {
                    serviceOrderNo: this.order.serviceOrderNo,
                    orgCode: this.order.orgCode
                }
                nativeService.extractcallbackitem(param).then((data) => {
                    this.callbackItemList = data.list
                    this.convertCallbackList()
                }).catch((error) => {
                    nativeService.toast(nativeService.getCssErrorMessage(error))
                })
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
.action-button {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #ffffff;
  text-align: center;
  background-color: #267aff;
  text-align: center;
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  margin-bottom: 48px;
  border-radius: 4px;
  padding-top: 22px;
  padding-bottom: 22px;
}
</style>
