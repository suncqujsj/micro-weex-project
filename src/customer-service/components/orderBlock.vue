<template>
    <div class="order-block">
        <div class="order-block-header">
            <image class="order-block-channel-icon" :src="channelIconSrc" resize='contain'>
            </image>
            <text class="order-block-channel">{{data.type}}</text>
            <text class="order-block-time">{{data.time}}</text>
            <text v-if="data.status != 5" class="order-block-status">{{data.statusDesc}}</text>
        </div>
        <image v-if="data.status == 5" class="order-block-status-icon" src="./assets/img/service_ic_finish@3x.png" resize='contain'>
        </image>
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
    computed: {
        channelIconSrc() {
            let result = './assets/img/service_ic_JD@3x.png'
            switch (this.data.id) {
                case '1':
                    return './assets/img/service_ic_JD@3x.png'
                    break;
                case '2':
                    return './assets/img/service_ic_taobao@3x.png'
                    break;
                case '3':
                    return './assets/img/service_ic_call400@3x.png'
                    break;
                case '4':
                    return './assets/img/service_ic_meiju@3x.png'
                    break;
                case '5':
                    return './assets/img/service_midea@3x.png'
                    break;
            }
            return result
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
.order-block-channel-icon {
  height: 40px;
  width: 40px;
  margin-left: 24px;
  margin-right: 8px;
}
.order-block-channel {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  text-align: left;
  margin-right: 32px;
}
.order-block-time {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
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
  color: #666666;
  text-align: right;
  margin-right: 32px;
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
  color: #ff9500;
  margin-right: 32px;
}
</style>
