<template>
    <div class="branch-block">
        <div class="branch-block-header">
            <text class="branch-block-label">{{index+1}}.{{data.unitName}}</text>
        </div>
        <div class="branch-block-body">
            <div class="branch-block-content">
                <text v-bind:class="['branch-block-desc',ellipsis?'ellipsis-line':'']" lines="1">业务范围：{{data.businessScope}}</text>
                <div class="address-bar">
                    <text v-if="data.distanceDesc" class="address-distance">{{data.distanceDesc}}</text>
                    <text v-bind:class="['address-detail',ellipsis?'ellipsis-line':'']" lines="1">{{data.unitAddress}}</text>
                </div>
            </div>
            <div v-if="data.deliverTel" class="branch-tel-wrapper" @click="makeCall(data.deliverTel)">
                <image class="branch-tel-img" src="./assets/img/service_ic_phone@3x.png" resize='contain'>
                </image>
                <text class="branch-tel-desc">电话</text>
            </div>
            <div class="branch-tel-wrapper" @click="navigate()">
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
import nativeService from '../settings/nativeService';


export default {
    components: {
    },
    props: {
        ellipsis: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object
        },
        index: {
            type: Number
        }
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        makeCall(telNo) {
            nativeService.callTel({
                tel: telNo,
                title: '服务热线',
                desc: telNo
            }).then(
                (resp) => { }
            )
        },
        navigate(item) {
            this.$emit('navigate')
        }
    },
    created() {

    }
}
</script>

<style>
.branch-block {
  width: 750px;
  background-color: #ffffff;
  padding: 32px;
}
.branch-block-header {
}
.branch-block-body {
  margin-top: 24px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.branch-block-content {
  flex: 1;
  justify-content: center;
}
.ellipsis-line {
  lines: 1;
}
.branch-block-label {
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 28px;
  color: #000000;
}
.branch-block-desc {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8a8a8f;
  text-overflow: ellipsis;
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
  padding-right: 10px;
  border-right-color: #e2e2e2;
  border-right-width: 1px;
}
.address-detail {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8a8a8f;
  text-overflow: ellipsis;
}
.branch-tel-wrapper {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 24px;
}
.branch-tel-img {
  height: 60px;
  width: 60px;
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
  height: 60px;
  width: 60px;
}
.branch-map-desc {
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #666666;
  text-align: center;
  padding-top: 16px;
}
</style>
