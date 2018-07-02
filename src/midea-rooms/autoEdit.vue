<template>
   <div class="wrap" :style="wrapStyle">
        <div class="row-sb hd">
            <text class="hd-text font-grey" @click="goHomePage">取消</text>
            <text class="hd-text">{{autoDetail.name}}</text>
            <text class="hd-text font-grey"  @click="sendAutoEdit">保存</text>
        </div>
        <div class="content">
            <div v-if="sceneType != 2">
                <div style="background-color:#fff">
                    <div class="row-sb auto-name-floor">
                        <text>名称</text>
                        <input class="auto-name" type="text" placeholder="" :value="inputAutoName" @change="editAutoName" @return="editAutoName"/>
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
                        <div class="row-s ">
                            <image class="icon" :src="autoDetail.image"></image>
                            <text class="condition-desc" v-if="sceneType==3">在{{weekDesc}} {{directionText[autoDetail.location.direction]}} {{autoDetail.location.address}}时</text>
                            <text class="condition-desc" v-if="sceneType==4">在{{weekDesc}} {{autoDetail.startTime}}时</text>
                            <text class="condition-desc" v-if="sceneType==6"> 在{{weekDesc}} 天气{{autoDetail.weather.weatherStatus}}, 气温{{temperatureLoginText[autoDetail.weather.logical]}} {{autoDetail.weather.temperature}}℃ 时</text>
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
                            <image class="device-img" :src="applianceImgPath[autoBindDevices[item.applianceCode].deviceType]"></image>
                            <text class="device-name">{{autoBindDevices[item.applianceCode].deviceName}}</text>
                        </div>
                        <image class="check-icon" :src="icon[autoBindDevices[item.applianceCode].isCheck]" @click="checkOn(item, idx)"></image>
                    </div>
                </div>
                <text class="select-btn" v-if="showDevicePop" @click="openDevicePop">选择设备</text>
            </div>
        </div>
        <div class="delete" :style="deleteStyle"><text class="delete-text"  @click="deleteAuto">删除快捷操作</text></div>
        <!-- <div v-if="showDevicePop" class="devices-pop">
            <div class="row-sb device-pop-hd">
                <text class="hd-text font-grey" @click="closeDevicePop">取消</text>
                <text class="hd-text">{{autoDetail.name}}</text>
                <text class="hd-text font-grey"  @click="confirmDevicePop">保存</text>
            </div>
            <text class="sub-hd device-pop-sub-hd">选择要控制的电器，点击更改具体控制</text>
            <div class="device-box row-sb">
                <div class="device" v-for="(item, idx) in userUnbindDevices">
                    <div @click="goSetDevice(item)">
                        <image class="device-img" :src="imgPath[item.deviceType]"></image>
                        <text class="device-name">{{item.deviceName}}</text>
                    </div>
                    <image class="check-icon" :src="icon[item.status]" @click="addDeviceToTask(item, idx)"></image>
                </div>
            </div>
        </div> -->
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
        width:100px;
        height: 100px;
        margin-bottom: 12px;
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
        width: 50px;
        height: 50px;
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
    .devices-pop{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f2f2f2;
    }
    .device-pop-hd{
        background-color: #fff;
        padding: 25px;
    }
    .device-pop-sub-hd{
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .condition-desc{
        width: 600px;
        text-overflow: ellipsis
    }
</style>

<script>
    import { url, applianceActions, applianceImgPath } from './config/config.js'
    import base from './base'

    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import MideaCell from '@/midea-component/cell.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
	import switchBar from '@/midea-rooms/components/switch.vue'

    const channelAutoEdit = new BroadcastChannel('autoBroadcast')

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
                applianceImgPath: applianceImgPath,
                header: {
                    title: '设置',
                    bgColor: '#fff',
                    color: '#111',
                    leftImg: 'assets/img/b.png',
                    rightImg: 'assets/img/b.png'
                },
                devices: {
                    '111111': {
                        deviceId: "111111", 
                        deviceName: "name1",
                        deviceType: "0xAC",
                        deviceSubType: "xxxxx", 
                        deviceSn: "16584",
                        isOnline: 1,
                        status: 'uncheck'
                    },
                    '2222222': {
                        name: 'name2',
                        deviceType: '0xAC',
                        status: 'check'
                    },
                },
                autoDetail: {},
                inputAutoName: '',
                weekDesc: '',
                conditionName: null,
                temperatureLoginText: {
                    '>': '高于',
                    '<': '低于'
                },
                directionText: {
                    1: '到达',
                    2: '离开'
                },
                applianceActions: {
                    '0xAC': {
                        name: '空调',
                        actions: [
                            {
                                property: 'power',
                                propertyName: '电源',
                                action: {
                                    off: "关机",
                                    on: "开机"
                                },
                            },
                           {
                                property: 'mode',
                                propertyName: '模式',
                                action: {
                                    auto: "自动",
                                    fan: "送风",
                                    cool: "制冷",
                                    heat: "制热",
                                    dry: "抽湿"
                                }
                            }
                        ]
                    }
                },
                userUnbindDevices: [
                    {
                        deviceId: "333", 
                        deviceName: "name3",
                        deviceType: "0xAC",
                        deviceSubType: "xxxxx", 
                        deviceSn: "16584",
                        isOnline: 1,
                        status: 'uncheck'
                    },
                    {
                        deviceId: "777", 
                        deviceName: "name7",
                        deviceType: "0xAC",
                        deviceSubType: "xxxxx", 
                        deviceSn: "165854",
                        isOnline: 1,
                        status: 'uncheck'
                    }
                ],
                showDevicePop: false,
                task: [],
                tmpAddTaskList: [],
                userDevices: {},
                autoBindDevices: {}
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
            goHomePage(){
                this.goTo('weex')
            },
            initData(){
                this.uid = nativeService.getParameters('uid')
                this.homegroupId = nativeService.getParameters('homegroupId')
                this.sceneType = nativeService.getParameters('sceneType')
                this.sceneId = nativeService.getParameters('sceneId')
                let tmpUserDevices = JSON.parse(decodeURIComponent(nativeService.getParameters('userDevices')))
                        
                for (var i in tmpUserDevices) {
                    this.userDevices[tmpUserDevices[i].deviceId] = tmpUserDevices[i]
                }
                this.getAutoDetail()
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
                        this.autoDetail = Object.assign({}, this.autoDetail, rtnData.data)
                        
                        this.inputAutoName = this.autoDetail.name
                        this.autoEnable = this.autoDetail.enable
                        this.task = this.autoDetail.task

                        let tmpAutoBindDevices = {}
                        for (var i in this.task) {
                            tmpAutoBindDevices[this.task[i].applianceCode] = Object.assign({isCheck:'check'},this.userDevices[this.task[i].applianceCode])
                        }
                        this.autoBindDevices  = Object.assign({}, this.autoBindDevices, tmpAutoBindDevices)
                        this.generateWeek()
                    }
                }).catch( (error )=>{
                })
            },
            generateWeek(){
                let weekText = {
                    0: '周一',
                    1: '周二',
                    2: '周三',
                    3: '周四',
                    4: '周五',
                    5: '周六',
                    6: '周日',
                }
                let weekTmp = []
                
                let week =  this.autoDetail.weekly.split('')
                for (var x in week) {
                    if (week[x] == '1') {
                        weekTmp.push(weekText[x])
                    }
                }
                weekTmp = weekTmp.join('、')
                this.weekDesc = weekTmp
                
            },
            openAuto(){
                if (this.autoDetail.enable == 1) {
                    this.autoDetail.enable = 0
                }else if (this.autoDetail.enable == 0) {
                    this.autoDetail.enable = 1
                }
            },
            goSelect(){
                this.goTo('selectDevice')
            },
            goAutoTypeSet(){
                let params = {
                    from: 'editAuto',
                    sceneType: this.sceneType,
                    weekly: this.autoDetail.weekly
                }
                if (this.sceneType == 3) {
                    params.direction = this.autoDetail.location.direction
                }
                params.editSceneId = this.autoDetail.sceneId
                
                if (this.sceneType == 3){
                    params.locationLongitude = this.autoDetail.location.longitude
                    params.locationLatitude = this.autoDetail.location.latitude
                }
                if (this.sceneType == 4){
                    params.startTime = this.autoDetail.startTime
                }
                if (this.sceneType == 6){
                    params.weatherStatus = encodeURIComponent(this.autoDetail.weather.weatherStatus)

                }
                this.goTo('autoTypeSet', {}, params)
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
            checkOn(item, index){
                let tmpStatus = {
                    check: 'uncheck',
                    uncheck: 'check'
                }
                this.autoBindDevices[item.applianceCode].isCheck = tmpStatus[this.autoBindDevices[item.applianceCode].isCheck]

                // let basicTask = {}, tmpTask = []
                // for (var task in this.autoDetail.task){
                //     basicTask[this.autoDetail.task[task].applianceCode] = this.autoDetail.task[task]
                // }
               
                // for (var x in this.devices) {
                //     if (this.devices[x].status == 'check') {
                //         tmpTask.push(basicTask[x])
                //     }
                // }
                // this.task = tmpTask
            },
            addDeviceToTask(item, idx){
                let tmpStatus = {
                    check: 'uncheck',
                    uncheck: 'check'
                }
                this.userUnbindDevices[item.applianceCode].status = tmpStatus[this.userUnbindDevices[item.applianceCode].status]

                let basicTask = {}, tmpTask = []
                
                for (x in userUnbindDevices){
                    basicTask[userUnbindDevices[x].deviceId] = {
                        applianceCode: userUnbindDevices[x].deviceId,
                        command: { power: 'off' }
                    }
                }
            
                nativeService.alert(basicTask)

            },
            openDevicePop(){
                this.showDevicePop = true
            },
            closeDevicePop(){
                this.showDevicePop = false
            },
            confirmDevicePop(){
                this.showDevicePop = false
            },
            sendAutoEdit(){
                let reqUrl = url.auto.update
                let reqParams = {
                    uid: this.uid,
                    homegroupId: this.homegroupId,
                    sceneType: this.sceneType,
                    sceneId: this.sceneId,
                    image: this.autoDetail.image,
                    name: this.inputAutoName,
                    enable: this.autoEnable
                }

                let editConditionItems = JSON.parse(nativeService.getParameters('editConditionItems'))
                
                for (var x in editConditionItems) {
                    if (x == 'weatherStatus') {
                        editConditionItems[x] = decodeURIComponent(editConditionItems[x])
                    }
                }

                if (this.sceneType == 2) {
                    reqParams.weekly = '1111111'
                }
                if (this.sceneType == 3) {
                    let tmpLocation = {}
                    if ( editConditionItems.destination ) {
                        tmpLocation = {
                            address: editConditionItems.destination.key,
                            latitude: editConditionItems.destination.latitude,
                            longitude: editConditionItems.destination.longitude,
                        }
                    }
                    reqParams.location = JSON.stringify(Object.assign(this.autoDetail.location, tmpLocation))
                }
                if (this.sceneType == 4) {
                    reqParams.startTime = editConditionItems.hour + ':' + editConditionItems.minute || this.autoDetail.startTime
                }
                if (this.sceneType == 6) {
                    let tmpWeather = {}
                    if (editConditionItems.weatherStatus) {
                        tmpWeather.weatherStatus = editConditionItems.weatherStatus
                    }
                    if (editConditionItems.logical) {
                        tmpWeather.logical = editConditionItems.logical
                    }
                    if (editConditionItems.weatherTemperature) {
                        tmpWeather.temperature = editConditionItems.weatherTemperature
                    }
                    reqParams.weather =  JSON.stringify(Object.assign(this.autoDetail.weather, tmpWeather))

    
                    this.webRequest(reqUrl, reqParams).then((rtnData)=>{
                        nativeService.alert(rtnData)
                        if (rtnData.code == 0) {
                            nativeService.alert('修改成功', function(){
                                nativeService.goTo('weex.js')
                            })
                        }
                    }).catch( (error )=>{

                    })
                }
            },
            editAutoName(input){
                this.inputAutoName = input.value
            }
        },
        created(){
            this.initData()
            channelAutoEdit.onmessage = function(e){
                nativeService.alert(e)
            }
        }
    }
</script>

