<template>
   <div class="wrap" :style="wrapStyle">
        <midea-header :title="header.title" :bgColor="header.bgColor" :titleText="header.color" :leftImg="header.leftImg" @leftImgClick="goBack"></midea-header>
        <div class="done" @click="getDone()">
            <text class="done-text white">完成</text>
        </div>
        <div class="content">
            <div v-if="sceneType != 2" class="hd">
                <text v-if="sceneType != 2" class="hd-text">在{{weekDesc}}</text>
                <text v-if="sceneType == 3 && direction == 1" class="hd-text">到达 {{destination.key}} 时</text>
                <text v-if="sceneType == 3 && direction == 2" class="hd-text">离开 {{destination.key}} 时</text>
                <text v-if="sceneType == 4" class="hd-text">的{{startTime}}</text>
                <text>自动操控</text>
            </div>
            <text class="sub-hd">选择要控制的电器，点击更改具体控制</text>
            <div class="device-box row-sb">
                <div class="device" v-for="(device, idx) in devices">
                    <div @click="goSetDevice(device)">
                        <image class="device-img" :src="img[device.deviceType]"></image>
                        <text class="device-name">{{device.deviceName}}</text>
                        <!-- <text class="device-desc">{{device.desc}}</text> -->
                    </div>
                    <image class="check-icon" :src="icon[device.status]" @click="checkOn(device, idx)"></image>
                </div>
            </div>
        </div>
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

    import { url } from './config/config.js'

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
          
        },
        data(){
            return {
                icon: {
                    check:  'assets/img/check_on.png',
                    uncheck: 'assets/img/check_off.png',
                    auto: {
                        2: 'assets/img/hand.png',
                        3: 'assets/img/location.png',
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
                img: {
                    '0xAC': 'assets/img/stop_on.png'
                },
                devices: [
                    {
                        deviceId: "111111", 
                        deviceName: "name1",
                        deviceType: "0xAC",
                        deviceSubType: "xxxxx", 
                        deviceSn: "16584",
                        isOnline: 1,
                        status: 'uncheck'
                    },
                    {
                        deviceId: "2222222", 
                        deviceName: "name2",
                        deviceType: "0xAC",
                        deviceSubType: "xxxxx", 
                        deviceSn: "165854",
                        isOnline: 1,
                        status: 'uncheck'
                    }
                ],
                deviceCheckList: {},
                weekDesc: '',
                destination: {},
                gpsInfo: {},
                cityWeatherNo: '',
                showPrompt: false,
                inputAutoName: '',
                checkedDevices: {},
                logical: ''
            }
        },
        methods: {
            initData(){
                this.sceneType = nativeService.getParameters('sceneType')
                if ( this.sceneType != 2 ) {
                    this.weekly = nativeService.getParameters('weekly')
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
                                nativeService.toast( this.cityWeatherNo )
                                }
                            }).catch((err)=>{
                                nativeService.toast(err)
                            })
                        }else {
                            nativeService.alert('1获取不到当前城市，请检查是否开启定位权限')
                        }
                    }).catch((error) => {
                        nativeService.alert(error)
                    })

                }
            },
            goBack(){
                nativeService.goBack()
            },
            save(){ },
            turnOn(){ },
            checkOn(device, index){
                let tmp = {
                    check: 'uncheck',
                    uncheck: 'check'
                }
                this.devices[index].status = tmp[device.status]
                this.checkedDevices[device.deviceId] = true
            },
            goAutoTypeSet(){
                this.goTo('autoTypeSet', {}, {sceneType: this.sceneType})
            },
            deleteQuickStart(){
                nativeService.toast('delete')
            },
            goSetDevice(device){
                let params = {}
                params.sceneType = this.sceneType

                params.deviceType = device.deviceType
                params.deviceName = device.deviceName
                params.deviceId = device.deviceId
                
                this.goTo('setDevice', {}, params)
            },
            getDone(){
                this.showPrompt = true
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
                nativeService.getItem('homegroupId',(res)=>{
                    if (res.result == 'success'){
                        this.homegroupId = res.data
                                    
                        nativeService.getItem('uid', (res)=>{
                            if (res.result == 'success'){
                                this.uid = res.data

                                let reqUrl = url.auto.add
                                let reqParams = {
                                    uid: this.uid,
                                    homegroupId: this.homegroupId,
                                    sceneType: this.sceneType,
                                    image: this.icon.auto[this.sceneType],
                                    name: this.inputAutoName
                                }

                                if ( Object.keys(this.checkedDevices).length === 0) {
                                    nativeService.alert('还没有选择自动化关联设备哦')
                                    return
                                }
                                nativeService.getItem('task', (res)=>{
                                    
                                    reqParams.task = res.data
                                    if (this.sceneType == 2) {
                                        reqParams.weekly = '1111111'
                                    }else{
                                        reqParams.weekly = this.weekly
                                    }

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
                                        nativeService.alert(rtnData)
                                        if (rtnData.code == 0) {
                                            nativeService.alert('新增成功！', function(){
                                                nativeService.goTo('weex.js')
                                            })
                                        }
                                    }).catch( (error )=>{

                                    })
                                })
                            }else{
                                nativeService.alert('获取用户身份失败')
                            }
                        })
                    }else{
                        nativeService.alert('获取用户家庭失败')
                    }
                })
            },
        },
        created() {
            this.initData()
        }
    }
</script>


