<template>
   <div class="wrap" :style="wrapStyle">
        <div class="row-sb hd">
            <text class="hd-text font-grey" @click="goBack">取消</text>
            <text class="hd-text">{{auto.name}}</text>
            <text class="hd-text font-grey"  @click="save">保存</text>
        </div>
        <div class="content">
            <div v-if="type != 'manual'">
                <midea-cell title="启用" @mideaCellClick="turnOn" :cellStyle="{paddingLeft: '30px'}">
                    <midea-switch></midea-switch>
                </midea-cell>
                <div>
                    <text class="sub-hd">当如下条件满足时</text>
                    <midea-cell :title="auto.name" height="146" :hasArrow="true" :clickActivied="true" :itemImg="auto.image" @mideaCellClick="goAutoTriggers" :cellStyle="{paddingLeft: '30px'}"></midea-cell>
                </div>
            </div>
            <div>
                <text class="sub-hd">设备</text>
                <div class="device-box row-sb"> 
                    <div class="device" v-for="(device, idx) in devices">
                        <div @click="setDevice(device)">
                            <image class="device-img" :src="device.img"></image>
                            <text class="device-name">{{device.name}}</text>
                            <text class="device-desc">{{device.desc}}</text>
                        </div>
                        <image class="check-icon" :src="icon[device.status]" @click="checkOn(device, idx)"></image>
                    </div>
                </div>
                <text class="select-btn" @click="goSelect">选择设备</text>
            </div>
        </div>
        <text class="delete" @click="deleteQuickStart">删除快捷操作</text>
   </div>
</template>

<style>
    .row-sb{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
     }
    .wrap{ background-color: #f2f2f2; }
    .hd{
        background-color: #fff;
        width: 750px;
        height: 88px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .hd-text{ font-size: 32px; }
    .font-grey {
        color: #666;
    }
    .content{
        margin-top: 16px;
    }
    .sub-hd{
        color: #666;
        font-size: 28px;
        margin-top: 33px;
        margin-left:30px;
        margin-bottom: 14px;
    }
    .device-box{
        padding-left: 32.25px;
        padding-right: 14.25px;
    }
    .device{
        width: 333.75px;
        padding: 20px;
        margin-right: 18px;
        margin-bottom: 14px;
        background-color: #fff;
        border-radius: 4px;
    }
    .device-img{
        width:82px;
        height: 82px;
        margin-bottom: 12px;
        position: relative;
    }
    .device-name{
        font-size: 32px;
        margin-bottom: 4px;
    }
    .device-desc{
        color:#c7c7c7;
        font-size: 24px;
    }
    .check-icon{
        position: absolute;
        top: 14px;
        right:14px;
        width: 40px;
        height: 40px;
    }
    .select-btn{
        width: 686px;
        margin-top: 48px;
        padding: 19px;
        border-width: 2px;
        border-color: #666;
        color: #666;
        border-style: solid;
        border-radius: 4px;
        margin-left: 32px;
        text-align: center;
    }
    .delete{
        width: 750px;
        position: fixed;
        bottom: 48px;
        padding: 27px;
        background-color: #fff;
        position: absolute;
        color: #FF3B30;
        text-align: center;
        font-size: 32px;
    }
</style>

<script>
    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import MideaCell from '@/midea-component/cell.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
    import mideaSwitch from '@/midea-rooms/components/switch.vue'
    export default {
        components:{ MideaHeader, MideaCell, mideaList, mideaSwitch },
        mixins: [base],
        data(){
            return {
                icon: {
                    check:  'assets/img/check_on.png',
                    uncheck: 'assets/img/check_off.png'
                },
                header: {
                    title: '设置',
                    bgColor: '#fff',
                    color: '#111',
                    leftImg: 'assets/img/b.png',
                    rightImg: 'assets/img/b.png'
                },
                auto: {
                    "sceneId":"31025465",
                    "name":"回家",
                    "homegroupId":"1452652",
                    "enable":"1",
                    "startTime":" 08:00",
                    "weekly":" 1111111",
                    "timeZone":" 00:00-10:30",
                    "location":{
                        "address":"A8音乐大厦",
                        "distance":"500",
                        "latitude":"23.56",
                        "longitude":"105.65",
                        "direction":"1",
                        "directionName":"接近位置"
                    },
                    "sceneType":"1",
                    "task": [{
                        " applianceCode":"4565215",
                        " applianceType":"0xAC",
                        " modelNum":"456",
                        " command":{
                        " mode ":" auto ",
                        " power ":" on ",
                        " wind_speed":" 20 "
                        }
                    }]
                },
                devices: [
                    {
                        name: '空调',
                        desc: '开机 制冷 26℃',
                        img: 'assets/img/stop_on.png',
                        status: 'uncheck'
                    },
                    {
                        name: '空调',
                        desc: '开机 制冷 26℃',
                        img: 'assets/img/stop_on.png',
                        status: 'check'
                    }
                ]
            }
        },
        computed: {
            wrapStyle(){
                let tmp = {
                    height: this.pageHeight+'px'
                }
                return tmp
            },
            condition(){
                return this.options[this.type] || ''
            }
        },
        methods: {
            initData(){
                this.type = nativeService.getParameters('type')
            },
            goBack(){
                nativeService.goBack()
            },
            save(){
                
            },
            turnOn(){

            },
            checkOn(device, index){
                let tmp = {
                    check: 'uncheck',
                    uncheck: 'check'
                }
                this.devices[index].status = tmp[device.status]
            },
            goSelect(){
                this.goTo('selectDevice')
            },
            goAutoTriggers(){
                this.goTo('autoTriggers', {}, {type: this.type})
            },
            deleteQuickStart(){
                nativeService.toast('delete')
            },
            setDevice(device){
                this.goTo('setDevice')
            }
        },
        created(){
            
            this.initData()
        }
    }
</script>


