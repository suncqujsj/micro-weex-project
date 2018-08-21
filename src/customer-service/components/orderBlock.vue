<template>
    <div v-if="formattedOrder" class="order-block">
        <div class="order-block-header">
            <div class="order-block-icon">
                <image class="order-block-channel-icon" src="./assets/img/logo/OW.png" resize='contain'>
                </image>
                <image class="order-block-channel-icon" :src="formattedOrder.interfaceSourceIcon" resize='stretch'>
                </image>
            </div>
            <text class="order-block-channel">{{formattedOrder.interfaceSourceDesc}}接入</text>
            <text v-if="showStatus" v-bind:class="['order-block-status', formattedOrder.calcServiceOrderStatus=='3'?'order-block-status-gray':'']">{{formattedOrder.calcServiceOrderStatus==5?'':formattedOrder.statusDesc}}</text>
        </div>
        <div class="order-block-body">
            <image class="order-block-img" :src="formattedOrder.imageUrl" resize='contain'>
            </image>
            <div class="order-block-content">
                <text class="order-block-label">{{formattedOrder.orderDesc}}</text>
                <text class="order-block-desc">{{formattedOrder.contactTimeDesc}}</text>
            </div>
            <text v-if="formattedOrder.price" class="order-block-price">{{formattedOrder.price}}元</text>
        </div>
        <image v-if="showStatus && formattedOrder.calcServiceOrderStatus==5" class="order-block-status-icon" src="./assets/img/service_ic_finish@3x.png" resize='contain'> </image>
        <slot name="action-bar">
        </slot>
    </div>
</template>

<script>
import nativeService from '../settings/nativeService'
import orderBase from '../orderBase'

export default {
    components: {
    },
    mixins: [orderBase],
    props: {
        order: {
            type: Object
        },
        showStatus: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            productList: null
        }
    },
    computed: {
        formattedOrder() {
            let result
            if (this.order) {
                result = this.formatOrder(this.order)
            }
            if (this.productList && result) {
                let brandCode = this.order.serviceUserDemandVOs[0].brandCode
                let prodCode = this.order.serviceUserDemandVOs[0].prodCode
                for (let brandIndex = 0; brandIndex < this.productList.length; brandIndex++) {
                    const brandItem = this.productList[brandIndex]
                    if (brandCode == brandItem.brandCode && brandItem.productTypeDTOList) {
                        for (let categaryIndex = 0; categaryIndex < brandItem.productTypeDTOList.length; categaryIndex++) {
                            let categaryItem = brandItem.productTypeDTOList[categaryIndex]
                            if (categaryItem.children) {
                                for (let productIndex = 0; productIndex < categaryItem.children.length; productIndex++) {
                                    if (prodCode == categaryItem.children[productIndex].prodCode) {
                                        result.imageUrl = categaryItem.children[productIndex].prodImg
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return result
        },
    },
    methods: {
    },
    created() {
        //所有产品品类列表
        let param = {
            version: "1.0",
            codeType: ""
        }
        nativeService.getProdType(param).then((data) => {
            this.productList = data
        }).catch((error) => { })
    }
}
</script>

<style>
.order-block {
  /* padding-bottom: 14px; */
  border-radius: 8px;
  background-color: #ffffff;
  overflow: hidden;
}
.order-block-header {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 22px;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  overflow: visible;
}

.order-block-icon {
  height: 40px;
  width: 40px;
  margin-left: 24px;
  margin-right: 10px;
}
.order-block-channel-icon {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 40px;
  width: 40px;
}
.order-block-channel {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #000000;
  text-align: left;
  margin-right: 28px;
}
.order-block-status-icon {
  position: absolute;
  top: -8px;
  right: 8px;
  height: 116px;
  width: 116px;
}
.order-block-status {
  width: 90px;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #ff8f00;
  text-align: right;
  margin-right: 32px;
}
.order-block-status-gray {
  color: #666666;
}
.order-block-body {
  /* height: 200px; */
  flex-direction: row;
  justify-content: center;
  padding-top: 28px;
  padding-bottom: 28px;
  align-items: center;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
.order-block-img {
  height: 160px;
  width: 160px;
  /* border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  border-style: solid; */
  margin-left: 24px;
  margin-right: 24px;
}
.order-block-content {
  flex: 1;
  justify-content: center;
}
.order-block-label {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
}
.order-block-desc {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8a8a8f;
  margin-top: 10px;
}
.order-block-price {
  width: 200px;
  font-size: 28px;
  text-align: right;
  color: #ff8f00;
  margin-right: 32px;
}
</style>
