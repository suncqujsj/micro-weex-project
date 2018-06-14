<template>
    <div class="order-block">
        <div class="order-block-header">
            <div class="order-block-icon">
                <image class="order-block-channel-icon" src="./assets/img/logo/OW.png" resize='contain'>
                </image>
                <image class="order-block-channel-icon" :src="formattedOrder.interfaceSourceIcon" resize='stretch'>
                </image>
            </div>
            <text class="order-block-channel">{{formattedOrder.interfaceSourceDesc}}</text>
            <text class="order-block-time">{{formattedOrder.contactTimeDesc}}</text>
            <text v-if="showStatus" v-bind:class="['order-block-status', formattedOrder.calcServiceOrderStatus=='3'?'order-block-status-gray':'']">{{formattedOrder.isFinished?'':formattedOrder.statusDesc}}</text>
        </div>
        <image v-if="showStatus && formattedOrder.isFinished" class="order-block-status-icon" src="./assets/img/service_ic_finish@3x.png" resize='contain'>
        </image>
        <div class="order-block-body">
            <image class="order-block-img" :src="formattedOrder.imageUrl" resize='contain'>
            </image>
            <div class="order-block-content">
                <text class="order-block-label">{{formattedOrder.orderDesc}}</text>
            </div>
            <text v-if="formattedOrder.price" class="order-block-price">{{formattedOrder.price}}元</text>
        </div>
        <slot name="action-bar">
        </slot>
    </div>
</template>

<script>
import orderBase from '../order-base'

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
        }
    },
    computed: {
    },
    methods: {
    },
    created() {

    }
}
</script>

<style>
.order-block {
  padding-bottom: 24px;
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
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  overflow: visible;
}

.order-block-icon {
  height: 40px;
  width: 40px;
  margin-left: 24px;
  margin-right: 8px;
}
.order-block-channel-icon {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 40px;
  width: 40px;
}
.order-block-channel {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  text-align: left;
  margin-right: 32px;
}
.order-block-time {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #8a8a8f;
  text-align: left;
  margin-right: 8px;
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
  font-size: 28px;
  color: #ff8f00;
  text-align: right;
  margin-right: 32px;
}
.order-block-status-gray {
  color: #666666;
}
.order-block-body {
  height: 200px;
  flex-direction: row;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
.order-block-img {
  height: 160px;
  width: 160px;
  border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  border-style: solid;
  margin-left: 24px;
  margin-right: 32px;
}
.order-block-content {
  flex: 1;
  justify-content: center;
}
.order-block-label {
  font-family: PingFangSC-Regular;
  font-size: 36px;
  color: #000000;
}
.order-block-desc {
  font-family: PingFangSC-Regular;
  font-size: 26px;
  color: #666666;
}
.order-block-price {
  width: 200px;
  font-size: 32px;
  text-align: right;
  color: #ff8f00;
  margin-right: 32px;
}
</style>
