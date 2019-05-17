<template>
    <div>
        <midea-header title="subscribeMessage 订阅设备状态推送" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller>
            <midea-title-bar title="代码"></midea-title-bar>
            <text>
            nativeService.subscribeMessage({
                deviceId: deviceIdList
            }).then(()=>{ //成功回调
            }).catch(()=>{ //失败回调
            })
            </text>
            <midea-title-bar title="demo"></midea-title-bar>
            <div class="content">
                <text class="content-hd">当前家庭设备id如下：</text>
                <div class="grid">
                    <midea-grid-select :cols="2" :customStyles="{width:'300px',height:'54px'}" :list="deviceIdList" @select="setDeviceId"></midea-grid-select>
                </div>
            </div>
            <div class="content">
                <text class="content-desc">1.点击上方id选择想要订阅的设备，选择设备数量为0是清空之前订阅的设备状态推送。</text>
                <text class="content-desc">2.点击下方按钮发送对应请求</text>
            </div>
            <div class="content">
                <text>发送的订阅设备id请求数据：</text>
                <text>{{sendDeviceIdArray}}</text>
            </div>
            <midea-button text="订阅所选设备状态推送" @mideaButtonClicked="subscribeCheckedDevice"></midea-button>
            <midea-button text="订阅当前家庭下所有设备状态推送" @mideaButtonClicked="subscribeAllDevice"></midea-button>
        </scroller>
    </div>
</template>
<style>
    .deviceid-input{
        font-size: 28px;
        width: 700px;
        margin: 25px;
        padding: 12px;
    }
    .content{
        margin: 25px;
    }
    .grid{
        width: 650px;
        margin-left: 25px;
    }
    .content-hd{
        margin-bottom: 25px;
    }
    .content-desc{
        color: grey;
    }
</style>
<script>
import base from '../base'
import nativeService from '@/common/services/nativeService'

import mideaHeader from '@/midea-component/header.vue'
import mideaButton from '@/midea-component/button.vue'
import mideaGridSelect from '@/midea-component/optionList.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'

const globalEvent = weex.requireModule("globalEvent")

module.exports = {
    components: { mideaHeader, mideaButton, mideaGridSelect, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            deviceId: '',
            deviceIdList: [],
            checkedDeviceIds: [],
            sendDeviceIdArray: []
        }
    },
    methods: {
        subscribeCheckedDevice() {
            this.sendDeviceIdArray = []
            this.checkedDeviceIds.map(item =>{
                this.sendDeviceIdArray.push(item.title)
            })

            nativeService.subscribeMessage({//埋点客厅
                deviceId: this.sendDeviceIdArray
            }).then(()=>{
                if (this.sendDeviceIdArray.length == 0) {
                    nativeService.alert('清空订阅成功')
                }else{
                    nativeService.alert('订阅成功')
                }
            }).catch(()=>{
                nativeService.alert('订阅失败')
            })
        },
        subscribeAllDevice(){
            nativeService.subscribeMessage({
                deviceId: ['all']
            }).then(()=>{
                nativeService.alert('订阅所有设备推送成功')
            }).catch(()=>{
                nativeService.alert('订阅所有设备推送失败')
            })
        },
        setDeviceId(e){
            this.checkedDeviceIds = e.checkedList
        },
    },
    created() {
        nativeService.getCurrentHomeInfo().then(homeInfo => {
            let tmpList = []
            homeInfo.deviceList.map(item =>{
                tmpList.push({title: item.deviceId})
            })
            this.deviceIdList = tmpList
        })
        globalEvent.addEventListener("receiveMessage", (data) => {
            nativeService.alert("receiveMessage 触发:\n"+JSON.stringify(data))
        })
    }
};
</script>


