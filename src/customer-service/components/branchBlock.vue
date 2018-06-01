<template>
    <div class="branch-block">
        <div class="branch-block-header">
            <text class="branch-block-label">{{data.label}}</text>
        </div>
        <div class="branch-block-body">
            <div class="branch-block-content">
                <text class="branch-block-desc">{{data.desc}}</text>
                <div class="address-bar">
                    <text class="address-distance">2.6km</text>
                    <text class="address-detail">{{data.address}}</text>
                </div>
            </div>
            <div class="branch-tel-wrapper" @click="makeCall">
                <image class="branch-tel-img" src="./assets/img/service_ic_phone@3x.png" resize='contain'>
                </image>
                <text class="branch-tel-desc">电话</text>
            </div>
            <div class="branch-tel-wrapper" @click="navigate">
                <image class="branch-map-img" src="./assets/img/service_ic_go@3x.png" resize='contain'>
                </image>
                <text class="branch-map-desc">到这去</text>
            </div>
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
        makeCall() {
            nativeService.callTel({
                tel: "10086",
                title: '服务热线'
            }).then(
                (resp) => { }
            )
        },
        navigate() {

        }
    },
    created() {

    }
}
</script>

<style>
.branch-block {
  background-color: #ffffff;
  padding: 32px;
}
.branch-block-header {
}
.branch-block-body {
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.branch-block-content {
  flex: 1;
  justify-content: center;
}
.branch-block-label {
  font-family: PingFangSC-Medium;
  font-size: 28px;
  color: #000000;
}
.branch-block-desc {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8a8a8f;
  margin-top: 16px;
}
.address-bar {
  margin-top: 32px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.address-distance {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #000000;
  margin-right: 10px;
}
.address-detail {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8a8a8f;
  border-left-color: #e2e2e2;
  border-left-width: 1px;
  padding-left: 10px;
}
.branch-tel-wrapper {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 24px;
}
.branch-tel-img {
  height: 48px;
  width: 48px;
}
.branch-tel-desc {
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #666666;
  text-align: center;
  padding-top: 16px;
}
.branch-map-wrapper {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 24px;
}
.branch-map-img {
  height: 48px;
  width: 48px;
}
.branch-map-desc {
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #666666;
  text-align: center;
  padding-top: 16px;
}
</style>
