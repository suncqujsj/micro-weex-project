<template>
    <div class="order-block">
        <div class="order-block-header">
            <text class="order-block-time">{{data.time}}</text>
            <text class="order-block-channel">{{data.type}}</text>
            <image class="order-block-status-icon" src="./assets/img/progress.png" resize='contain'>
            </image>
            <text class="order-block-status">{{data.statusDesc}}</text>
        </div>
        <div class="order-block-body">
            <image class="order-block-img" :src="data.imageUrl" resize='contain'>
            </image>
            <div class="order-block-content">
                <text class="order-block-label">{{data.label}}</text>
                <!-- <text v-if="data.desc" class="order-block-desc">{{data.desc}}</text> -->
            </div>
            <text v-if="data.price" class="order-block-price">{{data.price}}元</text>
        </div>
        <slot name="action-bar">
        </slot>
    </div>
</template>

<script>
import nativeService from '@/common/services/nativeService';


export default {
    components: {
    },
    props: {
        data: {
            type: Object
        }
    },
    data() {
        return {
        }
    },
    methods: {
    },
    created() {

    }
}
</script>

<style>
.order-block {
  padding: 32px;
  border-radius: 8px;
  background-color: #ffffff;
}
.order-block-header {
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 22px;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 2px;
  border-bottom-style: solid;
}
.order-block-time {
  width: 170px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  text-align: left;
}
.order-block-channel {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
}
.order-block-status-icon {
  height: 40px;
  width: 40px;
}
.order-block-status {
  width: 90px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  text-align: right;
}
.order-block-body {
  height: 200px;
  flex-direction: row;
  justify-content: center;
  padding-top: 10px;
  align-items: center;
}
.order-block-img {
  height: 160px;
  width: 160px;
  border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  border-style: solid;
  margin-right: 28px;
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
  color: #ff9500;
}
</style>
