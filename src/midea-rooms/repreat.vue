<template>
    <div class="wrap" :style="wrapStyle">
        <div>
            <midea-header :title="header.title" :bgColor="header.bgColor" :titleText="header.color" :leftImg="header.leftImg" @leftImgClick="goBack"></midea-header>
            <div class="done" @click="goNext()">
                <text class="done-text white">下一步</text>
            </div>
            <div class="content">
                <text class="hd">要控制的电器</text>
                <text class="sub-hd">请选择电器，点击更改状态</text>
                <div class="device-box row-sb">
                    <div class="device" v-for="(device, idx) in devices">
                        <div @click="setDeviceCondition(device)">
                            <image class="device-img" :src="device.img"></image>
                            <text class="device-name">{{device.name}}</text>
                            <text class="device-desc">{{device.desc}}</text>
                        </div>
                        <image class="check-icon" :src="icon[device.status]" @click="checkOn(device, idx)"></image>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showFull" class="full-pop">
            <div class="row-sb pop-hd">
                <text class="pop-hd-text font-grey" @click="closeFullPop">取消</text>
                <text class="pop-hd-text">{{devices[activeDeviceIndex].name}}</text>
                <text class="pop-hd-text font-grey"  @click="confirmFullPop">确定</text>
            </div>
            <div class="pop-content">
                <midea-list style="background-color:#fff" :idx="0" :hasWrapBorder="false" leftMargin="25px">
                    <midea-cell title="打开" :hasArrow="true" @mideaCellClick="onOffDevice" :cellStyle="{paddingLeft: '0px'}"></midea-cell>
                </midea-list>
                <midea-list style="background-color:#fff" :idx="0" :hasWrapBorder="false" leftMargin="25px">
                    <midea-cell title="模式" :hasArrow="true" rightText="TODO设备模式" @mideaCellClick="setDeviceConditionMode" :cellStyle="{paddingLeft: '0px'}"></midea-cell>
                </midea-list>
            </div>
            <div class="repeat">
                <text class="pop-sub-hd">重复</text>
                <div class="row-sa repeat-week">
                    <text :class="['week', item.repeat?'week-active':'']" v-for="(item,i) in week" @click="setRepeat(i)">{{item.title}}</text>
                </div>
            </div>
        </div>
   </div>
</template>

<style>
    .row-sa{ flex-direction: row; align-items: center; justify-content: space-around; }
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
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
        right: 25px;
        top: 30px;
    }
    .done-text{
        font-size: 32px;
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
    .full-pop{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f2f2f2;
    }
    .repeat-week{
        background-color: #fff;
        width: 750px;
        padding-top: 21px;
        padding-bottom: 21px;
    }
    .week{
        background-color: #C7C7CC;
        border-radius: 28px;
        width: 56px;
        height: 56px;
        color: #fff;
        font-size: 28px;
        text-align: center;
        padding-top: 10px;
    }
    .week-active{
        background-color: #267AFF;
    }
    .pop-hd{
        background-color: #fff;
        width: 750px;
        height: 88px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .pop-hd-text{ font-size: 32px; }
    .pop-sub-hd{
        padding-top: 34px;
        padding-left: 25px;
        padding-right: 25px;
        padding-bottom: 14px;
        font-size: 28px;
        color: #777;
    }
    .pop-content{
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .font-grey {
        color: #666;
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
                    title: '设备状态变化时',
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
                ],
                showFull: false,
                activeDeviceIndex: 0,
                week: [
                    { title: '一', value: 'Monday', repeat: false },
                    { title: '二', value: 'Tuesday', repeat: true },
                    { title: '三', value: 'Wednesday', repeat: false },
                    { title: '四', value: 'Thursday', repeat: false },
                    { title: '五', value: 'Friday', repeat: false },
                    { title: '六', value: 'Saturday', repeat: false },
                    { title: '日', value: 'Sunday', repeat: false }
                ],
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
            checkOn(device, index){
                let tmp = {
                    check: 'uncheck',
                    uncheck: 'check'
                }
                this.devices[index].status = tmp[device.status]
            },
            setDeviceCondition(){
                this.showFull = true
            },
            goNext(){
                this.goTo('selectDevice', {}, {type: 'deviceStatus'})
            },
            closeFullPop(){
                this.showFull = false
            },
            confirmFullPop(){
                //todo 存储数据以便发送接口【设备是否打开、选择什么模式、重复周期】
                this.closeFullPop()
            },
            onOffDevice(){
                //todo
            },
            setDeviceConditionMode(){
                //todo
            },
            setRepeat(i){
                this.week[i].repeat = !this.week[i].repeat
            },
        },
        created(){
            this.initData()
        }
    }
</script>


