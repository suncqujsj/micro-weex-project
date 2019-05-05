<template>
    <div>
        <midea-header title="subscribeMessage 订阅设备状态推送" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <input class="deviceid-input" type="text" placeholder="输入设备的deviceId, 多个用英文,分隔" @input="setDeviceId">
        <midea-button text="订阅设备状态推送" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        {{deviceIdArray}}
    </div>
</template>
<style>
    .deviceid-input{
        font-size: 28px;
        width: 700px;
        margin: 25px;
        padding: 12px;
    }
</style>
<script>
import base from '../base'
import mideaHeader from '@/midea-component/header.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'

const globalEvent = weex.requireModule("globalEvent")

module.exports = {
    components: { mideaHeader, mideaButton },
    mixins: [base],
    data() {
        return {
            deviceId: ''
        }
    },
    methods: {
        mideaButtonClicked() {
            let deviceIdArray = this.deviceId.length>0 ? this.deviceId.split(',') : []
            nativeService.subscribeMessage({//埋点客厅
                deviceId: deviceIdArray
            }).then(()=>{
                nativeService.alert('订阅成功')
            }).catch(()=>{
                nativeService.alert('订阅失败')
            })
        },
        setDeviceId(e){
            this.deviceId = e.value
        }
    },
    created() {
        globalEvent.addEventListener("receiveMessage", (data) => {
            nativeService.alert("receiveMessage 触发:\n"+JSON.stringify(data))
        })
    }
};
</script>


