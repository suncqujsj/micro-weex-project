<template>
    <div>
        <div :style="wrapStyle">
            <midea-header :title="scene.name" bgColor="transparent" titleText="#fff"  @leftImgClick="goBack"></midea-header>
            <div class="setting" @click="goSetting()">
                <text class="setting-text white">设置</text>
            </div>
            <div v-if="scene.type=='1' || scene.type=='2' || scene.type=='3' " class="up-block" >
                <div class="up-desc">
                    <text class="desc white">{{temperatureStatus}} {{pm25Status}}</text>
                    <midea-vote :defaulSelectd="Number(scene.indicator.level)" :disabled="true" :styles="style.vote" :imgPath="voteImg"></midea-vote>
                    <text class="improve white">一键优化</text>
                </div>
                <div class="up-status row-sa" v-if="scene.type=='1' || scene.type=='2'">
                    <div>
                        <text class="info-text font14 white">温度</text>
                        <div class="row-c status-value">
                            <text class="font36 white">{{scene.indicator.temperature}}</text>
                            <text class="font16 white mgb-10">℃</text>
                        </div>
                        <text class="info-text font12 white">{{temperatureStatus}}</text>
                    </div>  
                    <div>
                        <text class="info-text font14 white">湿度</text>
                        <div class="row-c status-value">
                            <text class="font36 white">{{scene.indicator.humidity}}</text>
                            <text class="font16 white mgb-10">%</text>
                        </div>
                        <text class="info-text font12 white">{{humidityStatus}}</text>
                    </div>  
                    <div>
                        <text class="info-text font14 white">空气质量</text>
                        <div class="row-c status-value">
                            <text class="font36 white">{{scene.indicator.pm5}}</text>
                        </div>
                        <text class="info-text font12 white">{{pm25Status}}</text>
                    </div>
                </div>
                <div class="up-status row-sa" v-if="scene.type=='3'">
                    <div>
                        <text class="info-text font14 white">{{scene.indicator.work_stats}}</text>
                        <div class="row-c status-value">
                            <text class="font36 white">{{scene.indicator.water_temperature}}</text>
                            <text class="font16 white mgb-10">℃</text>
                        </div>
                    </div>  
                    <div>
                        <text class="info-text font14 white">热水量</text>
                        <div class="row-c status-value">
                            <text class="font36 white">{{scene.indicator.water_capacity}}</text>
                            <text class="font16 white mgb-10">%</text>
                        </div>
                    </div>  
                     <div v-if="scene.type=='3' ">
                        <text class="info-text font14 white">还需加热</text>
                        <div class="row-c status-value">
                            <text class="font36 white">{{scene.indicator.remain_time}}</text>
                            <text class="font16 white mgb-10">分</text>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="scene.type=='4'" class="up-block balcony-block">
                <text class="weather white font12">todo 无法获取天气，请在系统设置中打开定位服务</text>
                <slider>
                    <div class="barchart">
                        <midea-barchart-view class="barchart" :data="chartData"></midea-barchart-view>
                    </div>
                    <div class="barchart">
                        <midea-barchart-view class="barchart" :data="chartData"></midea-barchart-view>
                    </div>
                </slider>
            </div>
            <div v-if="scene.type=='4'" class="wash-list wash-item row-sb" @click="buyShampoo">
                <text class="font16 white">购买洗涤剂</text>
                <image class="next" :src="icon.next"></image>
            </div>
        </div>
    
        <div class="down-block row-sa">
            <div v-for="mode in scene.modeList" @click="changeMode(mode.modeId)">
                <image class="down-icon" :src="icon.actions[mode.modelId][mode.action[0].command.power]"></image>
                <text class="down-text">{{mode.modelName}}</text>
            </div>
        </div>
        <toast-dialog :show="showToastDialog" @close="closeToastDialog" :maskStyle="{backgroundColor: 'rgba(0,0,0,0.6)'}">
            <div class="row-sb mgb-10" v-for="device in activeModeDevices">
                <div>
                    <text class="pop-hd">{{device.name}}</text>
                    <text class="sub-pop-hd">{{device.status}}</text>
                </div>
                <!-- <image class="icon" :src="icon[modeSetStatus]"> -->
            </div>
        </toast-dialog>
        <web v-if="showMall" src=""></web>
    </div>
</template>

<style>
    .row-s{
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }
    .row-c{
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .row-sb{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .row-sa{
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
    .row-e{
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
    .icon{
        width: 50px;
        height: 50px;
    }
    .font12{ font-size: 24px; }
    .font14{ font-size: 28px; }
    .font16{ font-size: 32px; }
    .font36{ font-size: 72px; }
    .white{ color: #fff; }
    .mgb-10{ margin-bottom: 10px; }
    .setting{
        position:fixed;
        right: 10px;
        top: 30px;
    }
    .setting-text{
        font-size: 32px;
    }
    .up-block{
        padding-top: 208px;
    }
    .balcony-block{
        padding-top: 100px;
    }
    .desc{
        margin-bottom: -10px;
        font-size: 40px;
    }
    .desc, .weather{
        text-align: center;
    }
    .improve{
        margin-left: 275px;
        margin-top:25px;
        width: 200px;
        padding-top: 8px;
        padding-bottom: 8px;
        border-width: 2px;
        border-color: #fff;
        border-style: solid;
        text-align: center;
        border-radius: 28px;
        font-size: 28px;
    }
    .up-status{
        margin-top: 155px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .status-value{
        align-items: flex-end;
    }
    .info-text{
        width: 180px;
        text-align: center;
        margin-bottom: 2px;
    }
    .down-block{
        padding-top: 70px;
        align-items: center;
        padding-left:30px;
        padding-right:30px;
    }
    .down-icon{
        width: 112px;
        height: 112px;
    }
    .down-text{
        width: 112px;
        margin-top: 15px;
        text-align: center;
        font-size: 24px;
    }
    .barchart {
        width: 730px;
        height: 350px;
    }
    .wash-list{
        /* margin-top: 100px; */
        position: absolute;
        left: 40px;
        right: 0;
        bottom: 0;
    }
    .wash-item{
        height: 80px;
        padding-right: 25px;
    }
    .next{
        width: 8px;
        height: 16px;
    }
    .pop-hd{
        font-size: 32px;
    }
    .sub-pop-hd{
        font-size: 28px;
        color:#8A8A8F;
    }
</style>

<script>
    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import MideaVote from '@/midea-component/mVote.vue'
    import ToastDialog from '@/midea-component/toastDialog.vue'
    import mideaCell from '@/component/cell.vue'
    import mideaList from '@/midea-rooms/components/list.vue'

    import { url } from './config/config.js'

    export default {
        components:{ MideaHeader, MideaVote, ToastDialog, mideaCell, mideaList },
        computed:{
            temperatureStatus(){
                let temperature = this.scene.indicator.temperature
                let desc
                if (temperature){
                    if (temperature <=10){
                        desc = '温度极低'
                    }else if (temperature >10 && temperature<=15){
                        desc = '温度偏低'
                    }else if (temperature >15 && temperature<=23){
                        desc = '温度凉爽'
                    }else if (temperature >23 && temperature<=28){
                        desc = '温度适宜 '
                    }else if (temperature > 28 ){
                        desc = '有点闷热'
                    }else{
                        desc = '温度未知'
                    }
                }else{
                    desc = '温度未知'
                }
             
                return desc
            },
            humidityStatus(){
                let humidity = this.scene.indicator.humidity
                let desc
                if (humidity){
                     if (humidity <=30){
                        desc = '干燥'
                    }else if (humidity >80){
                        desc = '潮湿'
                    }else if (humidity>30 && humidity <=80){
                        desc = '适宜'
                    }
                }else{
                    desc = '未知'
                }
               
                return desc
            },
            pm25Status(){
                let pm25 = this.scene.indicator.pm25
                let humidity = this.scene.indicator.humidity
                let desc
                if (pm25){
                    if (humidity <=30){
                        desc = '空气干燥'
                    }else if (humidity >80){
                        desc = '空气潮湿'
                    }else{
                        
                        if (pm25 <=50){
                            desc = '空气清新'
                        }else if (pm25 >50 && value<=100){
                            desc = '空气良好'
                        }else if (pm25 >100 && value<=200){
                            desc = '空气浑浊'
                        }else if (pm25 >200 && value<=500){
                            desc = '空气污染严重 '
                        }else{
                            desc = '未知'
                        }
                    }
                }else{
                    desc = '未知'
                }
             
                return desc
            },
            wrapStyle(){
                return { 
                    backgroundImage: this.style.linearBg[this.scene.type],
                    height: this.pageHeight*0.75 + 'px',
                    position: 'relative',
                    overflow: 'hidden'
                }
            },
        },
        mixins: [base],
        data(){
            return {
                uid: '',
                homegroupId: '',
                scene: {},
                /*
                scene: {
                    "indicator": {
                        "water_capacity": "",
                        "water_temperature": "",
                        "level": 1,
                        "work_stats": "",
                        "remain_time": ""
                    },
                    "prop": {
                        "comfortable": "70",
                        "use": "3",
                        "save": "60"
                    },
                    "sceneId": 66,
                    "name": "卫浴",
                    "homegroupId": 150366,
                    "type": 3,
                    "list": [
                        {
                            "modelId": 1009,
                            "name": "舒适",
                            "action": [
                                {
                                    "type": "0xE2",
                                    "command": {
                                        "temperature": "70",
                                        "power": "on"
                                    }
                                }
                            ]
                        },
                        {
                            "modelId": 1010,
                            "name": "省电",
                            "action": [
                                {
                                    "type": "0xE2",
                                    "command": {
                                        "temperature": "60",
                                        "power": "on"
                                    }
                                }
                            ]
                        },
                        {
                            "modelId": 1011,
                            "name": "停用",
                            "action": [
                                {
                                    "type": "0xE2",
                                    "command": {
                                        "power": "off"
                                    }
                                }
                            ]
                        }
                    ]
                },
                */
                icon:{
                    next: 'assets/img/more_w.png',
                    success: '',
                    fail: '',
                    hanging: '',
                    actions: {
                        '1001': {
                            on: 'assets/img/home_on.png',
                            off: 'assets/img/home_off.png'
                        },
                        '1002': {
                            on: 'assets/img/comfort_on.png',
                            off: 'assets/img/comfort_off.png'
                        },
                        '1003': {
                            on: 'assets/img/eco_on.png',
                            off: 'assets/img/eco_off.png'
                        },
                        '1004': {
                            on: 'assets/img/shut_on.png',
                            off: 'assets/img/shut_off.png'
                        },
                        '1005': {
                            on: 'assets/img/home_on.png',
                            off: 'assets/img/home_off.png'
                        },
                        '1006': {
                            on: 'assets/img/comfort_on.png',
                            off: 'assets/img/comfort_off.png'
                        },
                        '1007': {
                            on: 'assets/img/eco_on.png',
                            off: 'assets/img/eco_off.png'
                        },
                        '1008': {
                            on: 'assets/img/shut_on.png',
                            off: 'assets/img/shut_off.png'
                        },
                        '1009': {
                            on: 'assets/img/comfort_on.png',
                            off: 'assets/img/comfort_off.png'
                        },
                        '1010': {
                            on: 'assets/img/eco_on.png',
                            off: 'assets/img/eco_off.png'
                        },
                        '1011': {
                            on: 'assets/img/stop_on.png',
                            off: 'assets/img/stop_off.png'
                        },
                        '1012': 'assets/img/power_on.png',
                        '1013': 'assets/img/power_off.png',
                        '1014': {
                            on: 'assets/img/alarm_on.png',
                            off: 'assets/img/alarm_off.png'
                        },
                        '1015': {
                            on: 'assets/img/start_on.png',
                            off: 'assets/img/start_off.png'
                        },

                    }
                },
                style: {
                    vote: {
                        box: {
                            width: '290px',
                            marginLeft: '230px',
                        }
                    },
                    linearBg: {
                        1: 'linear-gradient(to top, #4E69F7,#5D75F6)',
                        2: 'linear-gradient(to top, #4E69F7,#5D75F6)',
                        3: 'linear-gradient(to top, #FFB632,#FFCD00)',
                        4: 'linear-gradient(to top, #4E69F7,#5D75F6)'
                    },
                },
                voteImg:{
                    star: 'assets/img/rate.png',
                    unstar: 'assets/img/unrate.png'
                },
                unit: {
                    temperature: '℃',
                    percent: '%'
                },
                voteImg:{
                    star: 'assets/img/rate.png',
                    unstar: 'assets/img/unrate.png'
                },
                activeModeDevices: [],
                applianceList: {},
                showToastDialog: false,
                userDevices: [],
                userSupportDevices: [],
                showMall: false,
                chartData: {
                    "x": {
                        "value": [1, 2, 3, 4, 5, 6, 7],
                        "label": ["11.6", "11.7", "11.8", "11.9", "11.10", "11.11", "11.12"]
                    },
                    "y": [
                        {
                            "value": [1, 6, 2, 1, 2, 3, 7],
                            "title": "冷藏室",
                            "color": "#2AD2FC",
                            "background": "#ffffff"
                        },
                        {
                            "value": [10, 5, 3, 4, 1, 2, 6],
                            "title": "下段冷冻室",
                            "color": "#1B81FB",
                            "background": "#ffffff"
                        }
                    ],
                    "description": "",
                    "legend": {
                        "position": "TOP_LEFT",
                        "orientation": "HORIZONTAL" 
                    },
                    "unit": {
                        "x": "日期",
                        "y": "次数"
                    }
                },
            }
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            goSetting(){
                this.goTo('setting', {}, {sceneType: this.sceneType, sceneId: this.sceneId})
            },
            changeMode(mode){
                this.activeModeDevices = mode
                this.showToastDialog = true
            },
            closeToastDialog(){
                this.showToastDialog = false
            },
            buyShampoo(){
                this.showMall = true
            },
            getSceneDetail(){
                let reqUrl = url.scene.detail
                let reqParams = {
                    uid: this.uid,
                    homegroupId: this.homegroupId,
                    sceneId: this.sceneId
                }
                
                this.webRequest(reqUrl, reqParams).then( (res) => {
                    if (res.code == '0') {
                        this.scene = res.data
                    }else{
                        // nativeService.toast(rtnData.msg)
                    }
                }).catch( (error )=>{
                    nativeService.alert(error)
                })
            },
            getDevices(){
                return new Promise((resolve,reject)=>{
                    let reqUrl = url.scene.supportList
                    let reqParams = {
                        uid: this.uid,
                        homegroupId: this.homegroupId,
                        sceneId: this.sceneId
                    }
                    this.webRequest(reqUrl, reqParams).then((res)=>{
                        if (res.code == 0) {
                            resolve(res.data)
                        }else{
                            reject(res.msg)
                        }
                    }).catch( (err )=>{
                        reject(err)
                    })
                })
            },
            changeMode(modeId){
                this.executeMode(modeId).then((resolve, reject) => {
                    this.executeModeCheck().then((resolve, reject)=>{
                    })
                })
            },
            executeMode(modeId){
                return new Promise((resolve, reject)=>{
                    let reqUrl = url.scene.modeExecute
                    let reqParams = {
                        uid: this.uid,
                        homegroupId: this.homegroupId,
                        sceneId: this.sceneId,
                        modeId: modeId
                    }
                    this.webRequest(reqUrl, reqParams).then((res)=>{
                        nativeService.alert(res)
                        if (res.code == 0) {
                            nativeService.alert(res)
                            resolve(res.data)
                        }else{
                            reject(res.msg)
                        }
                    }).catch( (err )=>{
                        reject(err)
                    })
                })
            },
            executeModeCheck(){
                return new Promise((resolve, reject)=>{
                    let reqUrl = url.scene.status
                    let reqParams = {
                        uid: this.uid,
                        homegroupId: this.homegroupId,
                        sceneId: this.sceneId,
                        modeId: modeId
                    }
                    this.webRequest(reqUrl, reqParams).then((res)=>{
                        if (res.code == 0) {
                            resolve(res.data)
                        }else{
                            reject(res.msg)
                        }
                    }).catch( (err )=>{
                        reject(err)
                    })
                })

            }
        },
        created(){
            this.sceneId = nativeService.getParameters('sceneId')
            this.sceneType = nativeService.getParameters('sceneType')
      
            nativeService.getItem('uid', (res)=>{
                if (res.result == 'success'){
                    this.uid = res.data
                    nativeService.getItem('homegroupId',(res)=>{
                        if (res.result == 'success'){
                            this.homegroupId = res.data
                            this.getSceneDetail()

                            /*
                                nativeService.getItem('home', (res)=>{
                                    let data = JSON.parse(res.data)
                                    this.userDevices = data.deviceList   
                                    this.getDevices().then((res)=>{
                                        this.userSupportDevices = this.filttAllowedDevices(res.typeList)    
                                    })
                                })
                            */
                        }else{
                            nativeService.toast('获取用户家庭失败')
                        }
                    })
                }else{
                    nativeService.toast('获取用户身份失败')
                }
            })
            
        }
    }
</script>

