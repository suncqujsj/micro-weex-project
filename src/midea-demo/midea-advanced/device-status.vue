<template>
    <div class="wrapper">
        <midea-header title="Device Status" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-device-status :mainStatus="mainStatus" :unit="unit" :showSubStatus="true" :deviceTip="deviceTip" @hideDeviceTip="hideDeviceTip" :mainStatusColor="mainStatusColor" :mainStatusFontSize="mainStatusFontSize" :unitColor="unitColor" :unitFontSize="unitFontSize">
            <text slot="line1" class="subStatus">{{substatus1}}</text>
            <text slot="line2" class="subStatus">{{substatus2}}</text>
        </midea-device-status>
    </div>
</template>
<style scoped>
.subStatus {
  color: #020f13;
  font-size: 24px;
  align-self: flex-start;
}
</style>
<script>  
import base from '../base'
import mideaDeviceStatus from '@/midea-component/device-status.vue'
const modal = weex.requireModule('modal');

module.exports = {
    components: { mideaDeviceStatus },
    mixins: [base],
    data() {
        return {
            mainStatus: '24',
            unit: "°",
            substatus1: '模式：热风模式',
            substatus2: '设定60°  当前125°',
            deviceTip: '水箱缺水',
            mainStatusColor: '#00b9ef',
            mainStatusFontSize: "86px",
            unitColor: '#00b9ef',
            unitFontSize: "30px",
        }
    },
    methods: {
        hideDeviceTip() {
            this.deviceTip = '';
        }
    },
};
</script>