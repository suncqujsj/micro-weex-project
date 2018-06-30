<template>
   <div class="wrap" :style="wrapStyle">
        <div class="row-sb hd">
            <text class="hd-text font-grey" @click="goBack">取消</text>
            <text class="hd-text">{{autoDetail.name}}</text>
            <text class="hd-text font-grey"  @click="save">保存</text>
        </div>
        <div class="content">
            <div v-if="sceneType != 2">
                <div style="background-color:#fff">
                    <div class="row-sb auto-name-floor">
                        <text>名称</text>
                        <input class="auto-name" type="text" placeholder="" :value="autoDetail.name" @change="editAutoName" @return="editAutoName"/>
                    </div>
                    <div class="row-sb floor auto-switch-floor">
                        <text>启用</text>
                        <div>
                            <switch-bar :checked="autoDetail.enable" @change="openAuto"></switch-bar>
                        </div>
                    </div>
                </div>
                <div>
                    <text class="sub-hd">当如下条件满足时</text>
                    <div @click="goAutoTypeSet" class="row-sb floor">
                        <div class="row-s">
                            <image class="icon" :src="autoDetail.image"></image>
                            <text v-if="sceneType==3">在{{weekDesc}}时</text>
                            <!-- <text v-if="sceneType==4">在{{autoDetail.location.direction}} {{autoDetail.location.address}}时</text>
                            <text v-if="sceneType==6">在天气{{autoDetail.weather.weatherStatus}},气温{{autoDetail.weather.temperature}} 时</text> -->
                        </div>
                        <image class="icon-next" :src="icon.next"></image>
                    </div>
                </div>
            </div>
            <div>
                <text class="sub-hd">设备</text>
                <div class="device-box row-sb"> 
                    <div class="device" v-for="(item, idx) in autoDetail.task">
                        <div @click="setDevice(item)">
                            <!-- <image class="device-img" :src=""></image> -->
                            <text class="device-name">{{devices[item.applianceCode].name}}</text>
                        </div>
                        <!-- <image class="check-icon" :src="icon[devices[item.applianceCode].status]" @click="checkOn(item, idx)"></image> -->
                    </div>
                </div>
                <text class="select-btn" @click="goSelect">选择设备</text>
            </div>
        </div>
        <div class="delete" :style="deleteStyle"><text class="delete-text"  @click="deleteAuto">删除快捷操作</text></div>
   </div>
</template>

<style>
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .row-s{ flex-direction: row; align-items: center; justify-content: flex-start; }
    .wrap{ background-color: #f2f2f2; }
    .hd{
        background-color: #fff;
        width: 750px;
        height: 88px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .hd-text{ font-size: 32px; }
    .floor{ 
        background-color: #fff; 
        padding-left: 25px;
        padding-right: 25px;
        padding-top: 30px;
        padding-bottom: 30px;
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
        margin-top: 33px;
        margin-left:30px;
        margin-bottom: 14px;
    }
    .auto-name{
        width: 200px;
        height: 70px;
        margin-left: 100px;
    }
    .auto-name-floor{
        margin-left: 25px;
        padding-right: 25px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom-color: #e5e5e5;
        border-bottom-style: solid;
        border-bottom-width: 2px;
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
        position: absolute;
        left:0;
        right:0;
        background-color: #fff;
    }
    .delete-text{
        color: #FF3B30;
        padding: 27px;
        text-align: center;
        font-size: 32px;
    }
    .icon-next{
        width: 12px;
        height: 24px;
    }
</style>

<script>
    import { url } from './config/config.js'
    import base from './base'

    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import MideaCell from '@/midea-component/cell.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
	import switchBar from '@/midea-rooms/components/switch.vue'
    export default {
        components:{ MideaHeader, MideaCell, mideaList, switchBar },
        mixins: [base],
        data(){
            return {
                icon: {
                    check:  'assets/img/check_on.png',
                    uncheck: 'assets/img/check_off.png',
                    next: 'assets/img/more.png'
                },
                header: {
                    title: '设置',
                    bgColor: '#fff',
                    color: '#111',
                    leftImg: 'assets/img/b.png',
                    rightImg: 'assets/img/b.png'
                },
                auto: {},
                devices: {
                    '111111': {
                        name: 'name1',
                        status: 'check'
                    },
                    '2222222': {
                        name: 'name2',
                        status: 'check'
                    },
                },
                autoDetail: {
                 "image": "assets/img/location.png",
                    "task": [
                        {
                            "applianceCode": null,
                            "command": {
                                "mode": "",
                                "power": ""
                            }
                        }
                    ],
                    "sceneType": null,
                    "createTime": "",
                    "enable": null,
                    "sceneId": null,
                    "name": "",
                    "weather": "",
                    "updateTime": "",
                    "location": {
                        "address": "",
                        "distance": "",
                        "latitude": "",
                        "directionName": "",
                        "longitude": "",
                        "direction": "",
                    },
                    "homegroupId": null,
                    "weekly": "",
                },
                weekDesc: '',
                conditionName: null,
                directionText: {
                    1: '到达',
                    2: '离开'
                }
            }
        },
        computed: {
            wrapStyle(){
                let tmp = {
                    height: this.pageHeight+'px'
                }
                return tmp
            },
            deleteStyle(){
                let tmp = {
                    top: this.pageHeight-200+'px'
                }
                return tmp
            }
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            initData(){
                this.sceneType = nativeService.getParameters('sceneType')
                this.sceneId = nativeService.getParameters('sceneId')
                nativeService.getItem('uid', (res)=>{
                    if (res.result == 'success'){
                        this.uid = res.data
                        nativeService.getItem('homegroupId',(res)=>{
                            if (res.result == 'success'){
                                this.homegroupId = res.data
                                this.getAutoDetail()
                            }
                        })
                    }
                })
            },
            getAutoDetail(){
                let reqUrl = url.auto.detail
                let reqParams = {
                    uid: this.uid,
                    homegroupId: this.homegroupId,
                    sceneId: this.sceneId
                }
                this.webRequest(reqUrl, reqParams).then((rtnData)=>{
                    if (rtnData.code == 0) {
                        this.autoDetail = rtnData.data
                        let weekText = {
                            1: '周一',
                            2: '周二',
                            3: '周三',
                            4: '周四',
                            5: '周五',
                            6: '周六',
                            7: '周日',
                        }
                        let weekTmp = []
                        let week =  this.autoDetail.weekly.split('')
                        for (let i=0; i<week.length; i++) {
                            if (week[i] == '1' ) {
                                weekTmp.push(weekText[i])
                            }
                        }
                        weekTmp = weekTmp.join('、')
                        this.weekDesc = weekTmp
                    }
                }).catch( (error )=>{
                    
                })

            },
            save(){
                
            },
            checkOn(item, index){
                let tmp = {
                    check: 'uncheck',
                    uncheck: 'check'
                }
                this.devices[item.applianceCode].status = tmp[this.devices[item.applianceCode].status]
            },
            goSelect(){
                this.goTo('selectDevice')
            },
            goAutoTypeSet(){
                this.goTo('autoTypeSet', {}, {type: this.type})
            },
            deleteAuto(){
                let reqUrl = url.auto.delete
                let reqParams = {
                    uid: this.uid,
                    homegroupId: this.homegroupId,
                    sceneId: this.sceneId,
                    enable: '2'
                }
                this.webRequest(reqUrl, reqParams).then((rtnData)=>{
                    if (rtnData.code == 0) {
                        nativeService.alert('删除成功!', function(){
                            nativeService.goTo('weex.js')
                        })
                    }
                }).catch( (error )=>{
                    
                })
            },
            setDevice(device){
                let params = {}
                params.addOrEdit = 'edit'
                params.sceneId = this.autoDetail.sceneId
                this.goTo('setDevice', {}, params)
            },
            openAuto(){
                let tmp = {
                    '1': '0',
                    '0': '1'
                }
                this.autoDetail.enable = tmp[this.autoDetail.enable]
            },
            editAutoName(value){
            }
        },
        created(){
            this.initData()
           
        }
    }
</script>


