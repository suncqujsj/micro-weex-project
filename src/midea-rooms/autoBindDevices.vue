<template>
   <div class="wrap" :style="wrapStyle">
        <midea-header :title="header.title" :isImmersion="isipx?false:true" :bgColor="header.bgColor" :titleText="header.color" :leftImg="header.leftImg" @leftImgClick="goBack"></midea-header>
        <list>
            <cell class="content">
                <div v-if="sceneType != 2 && from=='addAuto' && sceneSupportDevices.length > 0" class="hd">
                    <text v-if="sceneType == 3 && direction == 1" class="hd-text">在{{weekDesc}}到达 {{destination.key}} 时自动操控</text>
                    <text v-if="sceneType == 3 && direction == 2" class="hd-text">在{{weekDesc}}离开 {{destination.key}} 时自动操控</text>
                    <text v-if="sceneType == 4" class="hd-text">在{{weekDesc}}的{{startTime}}自动操控</text>
                    <text v-if="sceneType == 6" class="hd-text">在{{weekDesc}}天气{{weatherStatus}}，气温{{logical}} {{weatherTemperature}}℃时自动操控</text>
                </div>
                <div v-if="sceneSupportDevices.length > 0">
                    <text class="sub-hd">选择要控制的电器，点击更改具体控制</text>
                    <div v-if="from == 'addAuto'" class="device-box row-sb">
                        <div class="device" v-for="(item, idx) in sceneSupportDevices">
                            <div @click="goSetDevice(item)">
                                <image class="device-img" :src="applianceImgPath[item.deviceType]"></image>
                                <text class="device-name">{{item.deviceName}}</text>
                                <div class="row-s device-desc">
                                    <div v-for="actions in allDeviceActions[item.deviceId]">
                                        <div v-if="actions.type =='range'">
                                            <text v-if="actions.currentStatus === '' || actions.currentStatus == undefined" class="device-desc-text">{{actions.propertyName}}{{actions.default}}</text>
                                            <text v-else class="device-desc-text">{{actions.propertyName}}{{actions.currentStatus}}</text>
                                        </div>
                                        <div v-else>
                                            <text v-if="actions.currentStatus" class="device-desc-text">{{actions.value[actions.currentStatus]}}</text>
                                            <text v-else class="device-desc-text">{{actions.value[actions.default]}}</text>
                                        </div>
                                    </div>
                                </div>
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
                </div>
                <text v-if="sceneSupportDevices.length > 0" class="save-btn" @click="getDone()">完成</text>              
            </cell>
        </list>
        <midea-promt title="快捷操作名称" ref="promt" placeholder="最多输入15字" :inputValue="inputAutoName" :show="showPrompt" @okClicked="promptConfirm" @onPromtClose="promptClose" @onPromtInput="promptInput"></midea-promt>
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
        position:absolute;
        right: 25px;
        top: 30px;
    }
    .done-text{ font-size: 32px; color: #666; }
    .font-grey { color: #666; }
    .content{ margin-top: 16px; }
    .sub-hd{
        color: #666;
        font-size: 28px;
        margin-left:30px;
        margin-bottom: 18px;
        margin-top: 25px;
    }
    .device-box{
        padding-left: 32.25px;
        padding-right: 14.25px;
        flex-wrap: wrap;
    }
    .device{
        width: 333px;
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
        height: 36px;
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
    .device-desc{
         align-items: flex-start;
         height: 26px;
    }
    .device-desc-text{
        color:#c7c7c7;
        font-size: 26px;
        margin-right: 6px;
        text-align: left;
    }
    .save-btn{
        width: 690px;
        margin-top: 48px;
        padding: 25px;
        background-color: #267AFF;
        color: #fff;
        border-radius: 8px;
        margin-left: 30px;
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
    import mideaPromt from '@/midea-rooms/components/promt.vue'

    import { url, applianceImgPath, autoSupportActions, codeDesc } from './config/config.js'
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

            },
            sceneTypeName(){
                let tmp = {
                    2: '手动',
                    3: '位置',
                    4: '时间',
                    6: '天气'
                }
                return  tmp[this.sceneType]
            },
            task(){
                let tmpTask = []
                for (var key in this.checkedDevices) {//key: applianceCode
                    let tmpCommand = {}
                    if ( this.checkedDevices[key] ) {
                        for (var x in this.allDeviceActions[key]) {
                            if (this.allDeviceActions[key][x].currentStatus === '' || this.allDeviceActions[key][x].currentStatus == undefined){
                                tmpCommand[this.allDeviceActions[key][x].property] = this.allDeviceActions[key][x].default
                            }else{
                                tmpCommand[this.allDeviceActions[key][x].property] = this.allDeviceActions[key][x].currentStatus 
                            }
                        }
                    }
                    tmpTask.push({
                        applianceCode: key,
                        command: tmpCommand
                    })
                }
                return tmpTask
            }
        },
        data(){
            return {
                icon: {
                    check:  'assets/img/scene_ic_checkbox_on@3x.png',
                    uncheck: 'assets/img/scene_ic_checkbox_off@3x.png',
                    auto: {
                        '2': 'assets/img/smart_ic_hand@3x.png',
                        '31': 'assets/img/scene_ic_placeblue@3x.png',
                        '32': 'assets/img/scene_ic_placegreen@3x.png',
                        '4': 'assets/img/samrt_ic_clock@3x.png',
                        '6': 'assets/img/scene_ic_weather@3x.png',
                    }
                },
                header: {
                    title: '要控制的电器',
                    bgColor: '#fff',
                    color: '#111',
                    leftImg: 'assets/img/public_ic_back@3x.png'
                },
                applianceImgPath: applianceImgPath,
                userDevices: [],
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
                unbindDevicesActions: {},
                sceneSupportDevices: [],
                newAutoEditActions: {},
                allDeviceActions: {},
                pageStamp: '',//进入设备设置时的时间戳
            }
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            initData(){
                this.homegroupId = nativeService.getParameters('homegroupId')
                this.sceneType = nativeService.getParameters('sceneType')
                this.from = nativeService.getParameters('from')
                this.autoSupportActions = Object.assign({}, this.autoSupportActions, autoSupportActions[this.sceneType])
                this.pageStamp = +new Date()

                if (nativeService.getParameters('userDevices')) {
                    let tmpUserDevices = JSON.parse(decodeURIComponent(nativeService.getParameters('userDevices'))) || []
                    
                    let tmpSceneSupoortDevices = []
                    for (var i in tmpUserDevices) {
                        tmpUserDevices[i].isCheck = 'uncheck'
                        if (this.autoSupportActions.hasOwnProperty(tmpUserDevices[i].deviceType)){
                            tmpSceneSupoortDevices.push(tmpUserDevices[i])
                        }
                    }
                    
                    this.userDevices = tmpUserDevices
                    this.sceneSupportDevices = tmpSceneSupoortDevices

                    if (this.sceneSupportDevices.length == 0) {
                        nativeService.alert('您当前无可用于' + this.sceneTypeName + '类型快捷操作的设备，请绑定设备后重试!', function(){
                            nativeService.goBack()
                        })
                    }

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
                            }).then( (gps) => {
                                this.gpsInfo = gps
                                nativeService.getCityInfo({cityName: gps.city}).then((city)=>{
                                    if ( city.cityNo ) {
                                        this.cityWeatherNo = city.cityNo
                                    }
                                }).catch((err)=>{
                                    nativeService.alert('获取不到当前设置天气城市，请检查是否开启定位权限')
                                })
                            }).catch((error) => {
                                nativeService.alert('获取不到当前设置天气城市，请检查是否开启定位权限')
                            })
                        }
                    }else if (this.from == 'editAuto'){
                        let tmpUnbindDevices = JSON.parse(decodeURIComponent(nativeService.getParameters('unbindDevices')))
                        this.unbindDevices = Object.assign({}, this.unbindDevices, tmpUnbindDevices)
                        let tmpUnbindDevicesActions = JSON.parse(decodeURIComponent(nativeService.getParameters('unbindDevicesActions')))
                        this.unbindDevicesActions = Object.assign({}, this.unbindDevicesActions, tmpUnbindDevicesActions)
                    }
                }else{
                    nativeService.alert('您当前无设备，请绑定设备后重试!', function(){
                        nativeService.goBack()
                    })
                }
               
            },
            checkOn(device, index){
                let tmp = {
                    check: 'uncheck',
                    uncheck: 'check'
                }
                if (this.from == 'addAuto') {
                    if (device.isCheck == 'check'){
                        this.sceneSupportDevices[index].isCheck = 'uncheck'
                        this.checkedDevices[device.deviceId] = false
                    }else if (device.isCheck == 'uncheck') {
                        this.sceneSupportDevices[index].isCheck = 'check'
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
                if (this.from == 'editAuto') {
                    from = 'addEdit' //编辑页面新增设备
                    return
                }else if (this.from == 'addAuto') {
                    from = 'addAuto'
                    let params = {
                        from: from,
                        sceneType: this.sceneType,
                        deviceType: device.deviceType,
                        deviceName: encodeURIComponent(device.deviceName),
                        deviceId: device.deviceId,
                        pageStamp: this.pageStamp
                    }
                    this.goTo('setDevice', {}, params)
                }
            },
            generateAllDeviceActions(){
                let tmpAllDeviceActions = {}
                for (var x in this.sceneSupportDevices) {
                    tmpAllDeviceActions[this.sceneSupportDevices[x].deviceId] = Object.assign({}, this.autoSupportActions[this.sceneSupportDevices[x].deviceType].actions, this.newAutoEditActions[this.sceneSupportDevices[x].deviceId])
                }
                
                this.allDeviceActions = Object.assign({}, tmpAllDeviceActions)
            },
            getDone(){
                if ( Object.keys(this.checkedDevices).length == 0) {
                    nativeService.alert('没有选择绑定设备哦')
                    return
                }
                if (this.from == 'addAuto') {//为新增就直接弹窗命名，下一步请求新增接口
                    this.showPrompt = true
                }else if(this.from == 'editAuto'){ //为编辑时，提交数据到edit页面并返回
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
                    nativeService.toast('没有输入快捷操作名称哦')
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
                this.checkLogin().then( (res) => {
                    let reqUrl = url.auto.add
                    let reqParams = {
                        uid: res.uid,
                        homegroupId: res.homegroupId,
                        sceneType: this.sceneType,
                        name: this.inputAutoName,
                        enable: 1
                    }
                    if (this.sceneType == 3) {
                        if (this.direction == 1){
                            reqParams.image = this.icon.auto['31']
                        }else{
                            reqParams.image = this.icon.auto['32']
                        }
                    }else{
                        reqParams.image = this.icon.auto[this.sceneType]
                    }

                    if (nativeService.getParameters('templateCode')) {
                        reqParams.templateCode = nativeService.getParameters('templateCode')
                    }
              
                    reqParams.task = JSON.stringify(this.task)
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
                            if (this.sceneType == 3) {
                                nativeService.updateAutoList()//通知原生位置类型自动化列表需要更新
                            }
                            nativeService.toast('新增成功！')
                            setTimeout(()=>{
                                nativeService.backToNative()
                            }, 300)
                        }else{
                            if (codeDesc.auto.hasOwnProperty(rtnData.code)){
                                nativeService.toast(codeDesc.auto[rtnData.code])
                            }else{
                                nativeService.toast(rtnData.msg)
                            }
                        }
                    }).catch((err)=>{
                        nativeService.toast(this.getErrorMessage(err))
                    })
                })
                nativeService.burialPoint({
                    pageName: 'sceneMainPage',
                    subAction: 'scene_select_and_create'
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
                        that.newAutoEditActions[e.data.applianceCode] = e.data.actions
                        that.generateAllDeviceActions()
                    }
                }
            }
        }
    }
</script>
