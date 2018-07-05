<template>
   <div class="wrap" :style="wrapStyle">
        <midea-header :title="header.title" :bgColor="header.bgColor" :titleText="header.color" :leftImg="header.leftImg" @leftImgClick="goBack"></midea-header>
        <div class="done" @click="getDone()">
            <text class="done-text white">完成</text>
        </div>
        <list>
            <cell class="content">
                <div v-if="sceneType != 2 && from=='addAuto'" class="hd">
                    <text v-if="sceneType == 3 && direction == 1" class="hd-text">在{{weekDesc}}到达 {{destination.key}} 时自动操控</text>
                    <text v-if="sceneType == 3 && direction == 2" class="hd-text">在{{weekDesc}}离开 {{destination.key}} 时自动操控</text>
                    <text v-if="sceneType == 4" class="hd-text">在{{weekDesc}}的{{startTime}}自动操控</text>
                    <text v-if="sceneType == 6" class="hd-text">在{{weekDesc}}天气{{weatherStatus}}，气温{{logical}} {{weatherTemperature}}℃时自动操控</text>
                </div>
                <text class="sub-hd">选择要控制的电器，点击更改具体控制</text>
                <div v-if="from == 'addAuto'" class="device-box row-sb">
                    <div class="device" v-for="(item, idx) in userDevices">
                        <div @click="goSetDevice(item)">
                            <image class="device-img" :src="applianceImgPath[item.deviceType]"></image>
                            <text class="device-name">{{item.deviceName}}</text>
                            <!-- <text class="device-desc">{{device.desc}}</text> -->
                        </div>
                        <image class="check-icon" :src="icon[item.isCheck]" @click="checkOn(item, idx)"></image>
                    </div>
                </div>
                <div v-if="from == 'editAuto'" class="device-box row-sb">
                    <div class="device" v-for="(item, idx) in unbindDevices">
                        <div @click="goSetDevice(item)">
                            <image class="device-img" :src="applianceImgPath[item.deviceType]"></image>
                            <text class="device-name">{{item.deviceName}}</text>
                        </div>
                        <image class="check-icon" :src="icon[item.isCheck]" @click="checkOn(item, idx)"></image>
                    </div>
                </div>
            </cell>
        </list>
        <midea-promt title="快捷操作名称" ref="promt" placeholder="" :inputValue="inputAutoName" :show="showPrompt" @okClicked="promptConfirm" @onPromtClose="promptClose" @onPromtInput="promptInput"></midea-promt>
   </div>
</template>

<style>
    .row-s { flex-direction: row; align-items: center; justify-content: flex-start; }
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    
    .wrap{ background-color: #f2f2f2; }
    .hd{
        width: 750px;
        margin-top: 54px;
        margin-bottom: 44px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .hd-text{
        font-size: 36px;
        color: #000;
    }
    .done{
        position:fixed;
        right: 10px;
        top: 30px;
    }
    .done-text{ font-size: 32px; }
    .font-grey { color: #666; }
    .content{ margin-top: 16px; }
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
    import mideaPromt from '@/component/promt.vue'

    import { url, applianceImgPath, autoSupportActions } from './config/config.js'
    const channelBindDevice = new BroadcastChannel('autoBroadcast')

    export default {
        components:{ MideaHeader, MideaCell, mideaList, mideaPromt },
        mixins: [base],
        computed: {
            wrapStyle(){
                let tmp = {
                    height: this.pageHeight+'px'
                }
                return tmp
            }
        },
        data(){
            return {
                icon: {
                    check:  'assets/img/check_on.png',
                    uncheck: 'assets/img/check_off.png',
                    auto: {
                        2: 'assets/img/man.png',
                        3: 'assets/img/arrive.png',
                        4: 'assets/img/clock.png',
                        6: 'assets/img/slweather.png',
                    }
                },
                header: {
                    title: '要控制的电器',
                    bgColor: '#fff',
                    color: '#111',
                    leftImg: 'assets/img/b.png',
                    rightImg: 'assets/img/b.png'
                },
                applianceImgPath: applianceImgPath,
                userDevices: {},
                deviceCheckList: {},
                weekDesc: '',
                destination: {},
                gpsInfo: {},
                cityWeatherNo: '',
                showPrompt: false,
                inputAutoName: '',
                checkedDevices: {},
                logical: '',
                editParams: {},
                unbindDevices: {},
                autoSupportActions: {},
                unbindDevicesActions: {}
            }
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            initData(){
                this.uid = nativeService.getParameters('uid')
                this.homegroupId = nativeService.getParameters('homegroupId')
                this.sceneType = nativeService.getParameters('sceneType')
                this.from = nativeService.getParameters('from')
                this.autoSupportActions = Object.assign({}, this.autoSupportActions, autoSupportActions[this.sceneType])

                let tmpUserDevices = JSON.parse(decodeURIComponent(nativeService.getParameters('userDevices')))
                for (var i in tmpUserDevices) {
                    tmpUserDevices[i].isCheck = 'uncheck'
                }
                this.userDevices = tmpUserDevices

                if (this.from == 'addAuto'){
                    this.generateAllDeviceActions()
                    if ( this.sceneType == 2 ){
                        this.weekly = '1111111'
                    }else {
                        this.weekly = nativeService.getParameters('weekly')
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
                        let week = this.weekly.split('')
                        for (let i=0; i<week.length; i++) {
                            if (week[i] == '1' ) {
                                weekTmp.push(weekText[i])
                            }
                        }
                        this.weekDesc = weekTmp.join('、')
                    }
                    if ( this.sceneType == 3 ) {
                        this.direction = nativeService.getParameters('direction')
                        this.destination = decodeURIComponent(nativeService.getParameters('destination'))
                        let destArray = this.destination.split('&'), tmpDest = {}
                        destArray.map((x)=>{
                            tmpDest[x.split('=')[0]] = x.split('=')[1]
                        })
                        this.destination = tmpDest
                    }
                    if ( this.sceneType == 4 ) {
                        this.startTime = nativeService.getParameters('startTimeHour') + ':'+ nativeService.getParameters('startTimeMinute')
                    }
                    if( this.sceneType == 6 ) {
                        this.weatherTemperature = nativeService.getParameters('weatherTemperature')
                        this.weatherStatus = decodeURIComponent(nativeService.getParameters('weatherStatus'))
                        this.logical = nativeService.getParameters('logical')

                        nativeService.getGPSInfo({
                            desiredAccuracy: "10",
                            distanceFilter: "10",
                            alwaysAuthorization: "0" 
                        }).then( (res) => {
                            let key
                            this.gpsInfo = res

                            if( res.city){
                                nativeService.getCityInfo({cityName: res.city}).then((res)=>{
                                    if ( res.cityWeatherNo ) {
                                        this.cityWeatherNo = res.cityNo
                                    }
                                }).catch((err)=>{
                                    nativeService.toast(err)
                                })
                            }else {
                                nativeService.alert('获取不到当前设置天气城市，请检查是否开启定位权限')
                            }
                        }).catch((error) => {
                            nativeService.alert(error)
                        })
                    }
                }else if (this.from == 'editAuto'){
                    let tmpUnbindDevices = JSON.parse(decodeURIComponent(nativeService.getParameters('unbindDevices')))
                    this.unbindDevices = Object.assign({}, this.unbindDevices, tmpUnbindDevices)
                    let tmpUnbindDevicesActions = JSON.parse(decodeURIComponent(nativeService.getParameters('unbindDevicesActions')))
                    this.unbindDevicesActions = Object.assign({}, this.unbindDevicesActions, tmpUnbindDevicesActions)
                }
            },
            checkOn(device, index){
                let tmp = {
                    check: 'uncheck',
                    uncheck: 'check'
                }
                if (this.from == 'addAuto') {
                    if (device.isCheck == 'check'){
                        this.userDevices[index].isCheck = 'uncheck'
                        this.checkedDevices[device.deviceId] = false
                    }else if (device.isCheck == 'uncheck') {
                        this.userDevices[index].isCheck = 'check'
                        this.checkedDevices[device.deviceId] = true
                    }
                }else if( this.from == 'editAuto'){
                    if (device.isCheck == 'check'){
                        this.unbindDevices[index].isCheck = 'uncheck'
                        this.checkedDevices[device.deviceId] = false
                    }else if (device.isCheck == 'uncheck') {
                        this.unbindDevices[index].isCheck = 'check'
                        this.checkedDevices[device.deviceId] = true
                    }
                }
            },
            goSetDevice(device){
                let from
                if (this.from == 'addAuto') {
                    from = 'addAuto'
                }else if (this.from == 'editAuto') {
                    from = 'addEdit' //编辑页面新增设备
                }
                let params = {
                    from: from,
                    sceneType: this.sceneType,
                    deviceType: device.deviceType,
                    deviceName: encodeURIComponent(device.deviceName),
                    deviceId: device.deviceId
                }
                
                this.goTo('setDevice', {}, params)
            },
            generateAllDeviceActions(){
                let tmpAllDeviceActions = {}
                for (var x in this.userDevices) {
                    tmpAllDeviceActions[this.userDevices[x].deviceId] = this.autoSupportActions[this.userDevices[x].deviceType].actions
                }
                this.allDeviceActions = Object.assign({}, this.allDeviceActions, tmpAllDeviceActions)
            },
            getDone(){
                if (this.from == 'addAuto') {
                    this.showPrompt = true
                }else if(this.from == 'editAuto'){
                    let tmpCheckedDevice = {}
                    
                    for(var i in this.checkedDevices) {
                        if (this.checkedDevices[i]) {
                            tmpCheckedDevice[i] = Object.assign(this.unbindDevices[i])
                        }
                    }
                    channelBindDevice.postMessage({
                        page: 'autoBindDevices',
                        newDevices: tmpCheckedDevice
                    })
                    this.goBack()
                }
            },
            promptConfirm(){
                if (this.inputAutoName == ''){
                    nativeService.alert('没有输入快捷操作名称哦')
                    return
                }
                
                this.showPrompt = false
                this.setNewAuto()
            },
            promptClose(e){
                this.showPrompt = false
            },
            promptInput(val){
                this.inputAutoName = val;
            },
            setNewAuto(){
                let reqUrl = url.auto.add
                let reqParams = {
                    uid: this.uid,
                    homegroupId: this.homegroupId,
                    sceneType: this.sceneType,
                    image: this.icon.auto[this.sceneType],
                    name: this.inputAutoName
                }
                let tmpTask = []
                
                for (var key in this.checkedDevices) {//key: applianceCode
                    let tmpCommand = {}
                    if ( this.checkedDevices[key] ) {
                        for (var x in this.allDeviceActions[key]) { 
                            tmpCommand[this.allDeviceActions[key][x].property] = this.allDeviceActions[key][x].currentStatus || this.allDeviceActions[key][x].default
                        }
                    }
                    tmpTask.push({
                        applianceCode: key,
                        command: tmpCommand
                    })
                }
                
                reqParams.task = JSON.stringify(tmpTask)
                reqParams.weekly = this.weekly

                if (this.sceneType == 3) {
                    reqParams.location = JSON.stringify({
                        address: this.destination.key,
                        latitude: this.destination.latitude,
                        longitude: this.destination.longitude,
                        distance: '500',
                        direction: this.direction,
                        directionName: ['接近位置', '靠近位置'][this.direction]
                    })
                    
                }

                if (this.sceneType == 4) {
                    reqParams.startTime = this.startTime
                }
                
                if (this.sceneType == 6) {
                    let tmp = JSON.stringify({
                        cityNo: this.cityWeatherNo,
                        temperature: this.weatherTemperature,
                        latitude: this.gpsInfo.latitude,
                        longitude: this.gpsInfo.longitude,
                        weatherStatus: this.weatherStatus,
                        logical: this.logical
                    })
                    reqParams.weather = tmp
                }
                this.webRequest(reqUrl, reqParams).then((rtnData)=>{
                    if (rtnData.code == 0) {
                        nativeService.alert('新增成功！', function(){
                            nativeService.goTo('weex.js')
                        })
                    }
                }).catch( (error )=>{

                })
            
            }
        },
        created() {
            let that = this
            that.initData()
            if (that.from == 'addAuto') {
                channelBindDevice.onmessage = function(e) {
                    if (e.data.page == 'setDevice') {
                        that.allDeviceActions[e.data.applianceCode] = e.data.actions
                    }
                }
            }
        }
    }
</script>


