<template>
   <div class="wrap" :style="wrapStyle">
        <midea-header :title="header.title" :bgColor="header.bgColor" :titleText="header.color" :leftImg="header.leftImg" @leftImgClick="goBack"></midea-header>
        <div class="done" @click="getDone()">
            <text class="done-text white">完成</text>
        </div>
        <div class="content">
            <text class="hd">{{conditionDesc}}</text>
            <text class="sub-hd">选择要控制的电器，点击更改具体控制</text>
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
            </div>
        </div>
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
        width: 750px;
        margin-top: 54px;
        margin-bottom: 44px;
        padding-left: 30px;
        padding-right: 30px;
        font-size: 36px;
        color: #000;
    }
    .done{
        position:fixed;
        right: 10px;
        top: 30px;
    }
    .done-text{
        font-size: 32px;
    }
    .font-grey {
        color: #666;
    }
    .content{
        margin-top: 16px;
    }
    .sub-hd{
        color: #666;
        font-size: 28px;
        margin-left:30px;
        margin-bottom: 18px;
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
    export default {
        components:{ MideaHeader, MideaCell, mideaList },
        mixins: [base],
        data(){
            return {
                icon: {
                    check:  'assets/img/check_on.png',
                    uncheck: 'assets/img/check_off.png'
                },
                header: {
                    title: '要控制的电器',
                    bgColor: '#fff',
                    color: '#111',
                    leftImg: 'assets/img/b.png',
                    rightImg: 'assets/img/b.png'
                },
                conditionDesc: '在周一、周二、周三的3点14分自动操控',
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
            getDone(){
                
            },
            checkOn(device, index){
                let tmp = {
                    check: 'uncheck',
                    uncheck: 'check'
                }
                this.devices[index].status = tmp[device.status]
            },
            goAutoTypeSelect(){
                this.goTo('autoTypeSelect', {}, {type: this.type})
            },
            deleteQuickStart(){
                nativeService.toast('delete')
            },
            setDevice(){
                this.goTo('setDevice')
            }
        },
        created(){
            
            this.initData()
        }
    }
</script>


