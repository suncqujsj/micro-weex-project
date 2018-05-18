<template>
    <div class="order-block">
        <div class="order-block-header">
            <text class="order-block-time">{{data.time}}</text>
            <text class="order-block-channel">{{data.type}}</text>
            <text class="order-block-status">{{data.statusDesc}}</text>
        </div>
        <div class="order-block-body">
            <image class="order-block-img" :src="data.imageUrl" resize='contain'>
            </image>
            <div class="order-block-content">
                <text class="order-block-label">{{data.label}}</text>
                <text class="order-block-desc">{{data.desc}}</text>
            </div>
            <text v-if="data.price" class="order-block-price">{{data.price}}</text>
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
  padding: 20px;
  background-color: #fcfcfc;
}
.order-block-header {
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom-color: #666666;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
.order-block-time {
  width: 160px;
  text-align: left;
  font-size: 28px;
}
.order-block-channel {
  flex: 1;
  text-align: left;
  font-size: 28px;
}
.order-block-status {
  width: 200px;
  text-align: right;
  font-size: 28px;
}
.order-block-body {
  height: 150px;
  flex-direction: row;
  padding-top: 10px;
}
.order-block-img {
  height: 100px;
  width: 120px;
  margin: 20px;
}
.order-block-content {
  flex: 1;
  justify-content: center;
}
.order-block-label {
  font-size: 28px;
  margin-bottom: 8px;
}
.order-block-desc {
  color: #e2e2e2;
  font-size: 26px;
}
.order-block-price {
  width: 200px;
  justify-content: center;
  text-align: right;
  color: red;
}
</style>
