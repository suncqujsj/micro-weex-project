<template>
    <div @viewappear="initData">
        <scroller class="wrap">
            <div :style="sceneStyle">
                <midea-header :title="scene.name" bgColor="transparent" titleText="#fff" :leftImg="icon.back" @leftImgClick="goBack"></midea-header>
                <div class="setting" @click="goSetting()">
                    <text class="setting-text white">设置</text>
                </div>
                <div v-if="roomType=='1' || roomType=='2' || roomType=='3' " class="up-block" >
                    <div class="up-desc">
                        <text v-if="roomType=='1'||roomType=='2'" class="desc white">{{temperatureStatus}} {{pm25Status}}</text>
                        <text v-if="roomType=='3'" class="desc white">{{waterStatus}}</text>
                        <my-score class="scene-score" :score="indicator.level" :starWidth="45"></my-score>
                        <text class="improve white" @click="quickOptimize">一键优化</text>
                    </div>
                    <div class="up-status row-sa" v-if="roomType=='1' || roomType=='2'">
                        <div class="scene-status">
                            <text class="info-text font14 white">温度</text>
                            <div  class="row-c status-value">
                                <text v-if="indicator.temperature != ''" class="font36 white">{{indicator.temperature}}</text>
                                <text v-if="indicator.temperature != ''" class="font16 white mgb-20">℃</text>
                                <text v-else class="font36 white">?</text>
                            </div>
                            <text class="info-text font12 white">{{temperatureStatus}}</text>
                        </div>  
                        <div class="scene-status">
                            <text class="info-text font14 white">湿度</text>
                            <div class="row-c status-value">
                                <text v-if="indicator.humidity != ''" class="font36 white">{{indicator.humidity}}</text>
                                <text v-if="indicator.humidity != ''" class="font16 white mgb-20">%</text>
                                <text v-else class="font36 white">?</text>
                            </div>
                            <text class="info-text font12 white">{{humidityStatus}}</text>
                        </div>  
                        <div class="scene-status">
                            <text class="info-text font14 white">空气质量</text>
                            <div class="row-c status-value">
                                <text v-if="indicator.pm25 != ''" class="font36 white">{{indicator.pm25}}</text>
                                <text v-else class="font36 white">?</text>
                            </div>
                            <text class="info-text font12 white">{{pm25Status}}</text>
                        </div>
                    </div>
                    <div class="up-status row-sa bath-up-status" v-if="roomType=='3'">
                        <div class="scene-status">
                            <text class="info-text font14 white">温度</text>
                            <div class="row-c status-value">
                                <text v-if="indicator.water_temperature !== ''" class="font36 white">{{indicator.water_temperature}}</text>
                                <text v-if="indicator.water_temperature !== ''" class="font16 white mgb-20">℃</text>
                                <text v-else class="font36 white">?</text>
                            </div>
                        </div>  
                        <!-- <div class="scene-status">
                            <text class="info-text font14 white">热水量</text>
                            <div class="row-c status-value">
                                <text v-if="indicator.water_capacity" class="font36 white">{{indicator.water_capacity}}</text>
                                <text v-if="indicator.water_capacity" class="font16 white mgb-20">%</text>
                                <text v-else class="font36 white">?</text>
                            </div>
                        </div> -->
                        <div class="scene-status">
                            <text class="info-text font14 white">还需加热</text>
                            <div class="row-c status-value">
                                <text v-if="indicator.remain_time != ''" class="font36 white">{{indicator.remain_time}}</text>
                                <text v-if="indicator.remain_time != ''" class="font16 white mgb-20">分</text>
                                <text v-else class="font36 white">?</text>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="roomType=='4'" class="up-block balcony-block">
                    <text class="weather white">{{weatherDesc}}</text>
                    <slider v-if="hasWasherWaterData || hasWasherPowerData">
                        <div v-if="hasWasherWaterData">
                            <div class="row-s chart-info">
                                <text class="font14 white">单位：升</text>
                                <!-- <div class="row-e">
                                    <image class="icon-use" :src="icon.water"></image>
                                    <text class="font14 white">今日用水总量:</text>
                                    <text class="use-value white">{{todayWaterUse}}</text>
                                    <text class="font14 white">升</text>
                                </div> -->
                            </div>
                            <midea-barchart-view class="barchart" :data="washerWaterData"></midea-barchart-view>
                        </div>
                        <div v-if="hasWasherPowerData">
                            <div class="row-s chart-info">
                                <text class="font14 white">单位：度</text>
                                <!-- <div class="row-e">
                                    <image class="icon-use" :src="icon.power"></image>
                                    <text class="font14 white">今日用电总量:</text>
                                    <text class="use-value white">{{todayPowerUse}}</text>
                                    <text class="font14 white">度</text>
                                </div> -->
                            </div>
                            <midea-barchart-view class="barchart" :data="washerPowerData"></midea-barchart-view>
                        </div>
                    </slider>
                    <div v-if="!hasWasherPowerData && !hasWasherWaterData">
                        <text class="no-washdata">暂无数据</text>
                    </div>
                </div>
                <!-- <div v-if="roomType=='4'" class="wash-list wash-item row-sb" @click="buyShampoo">
                    <text class="font16 white">购买洗涤剂</text>
                    <image class="next" :src="icon.next"></image>
                </div> -->
            </div>
            <div v-if="roomType != 4" class="down-block row-sa" :style="downBlockStyle">
                <div v-for="model in scene.modeList" @click="executeModel(model.modelId)">
                    <image class="down-icon" :src="icon.actions[model.modelId]"></image>
                    <text class="down-text">{{model.modelName}}</text>
                </div>
            </div>
            <div v-if="roomType == 4" class="down-block row-sa" :style="downBlockStyle">
                <div @click="powerOnOff">
                    <image class="down-icon" :src="icon.washer[washerPower]"></image>
                    <text class="down-text">{{washerStatus[washerPower]}}</text>
                </div>
                <div @click="controlStartPause">
                    <image class="down-icon" :src="icon.washer[washerRunningStatus]"></image>
                    <text class="down-text">{{washerStatus[washerRunningStatus]}}</text>
                </div>
            </div>
            <toast-dialog :show="showToastDialog" :maskStyle="{backgroundColor: 'rgba(0,0,0,0.6)'}">
                <div class="row-sb mgb-10" v-for="item in sceneDevices">
                    <div class="row-sb toast-line">
                        <text class="pop-hd">{{item.applianceName}}</text>
                        <image class="toast-icon" :src="icon.model[item.status]"></image>
                    </div>
                </div>
            </toast-dialog>
        </scroller>
        
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
    .mgb-20{ margin-bottom: 20px; }
    .setting{
        position:absolute;
        right: 25px;
        top: 69px;
    }
    .setting-text{
        font-size: 28px;
    }
    .up-block{
        padding-top: 188px;
    }
    .balcony-block{
        padding-top: 100px;
        width: 750px;
    }
    .desc{
        margin-bottom: -10px;
        font-size: 40px;
    }
    .desc, .weather{
        text-align: center;
    }
    .scene-score{
        margin-top: 30px;
        margin-bottom: 70px;
        margin-left: 260px;
    }
    .weather{
        font-size: 30px;
        margin-bottom: 25px;
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
        margin-top: 145px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .bath-up-status{
        padding-left: 40px;
        padding-right: 40px;
    }
    .scene-status{
        width: 220px;
    }
    .status-value{
        align-items: flex-end;
    }
    .info-text{
        width: 220px;
        height: 50px;
        text-align: center;
        margin-bottom: 2px;
    }
    .down-block{
        /* padding-top: 100px; */
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
        width: 700px;
        margin-left: 25px;
        height: 500px;
    }
    .chart-info{
        width: 700px;
        margin-left: 25px;
    }
    .icon-use{
        width: 43px;
        height: 50px;
    }
    .use-value{
        font-size: 52px;
        margin-left: 12px;
        margin-right: 10px;
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
        width: 400px;
        text-overflow: ellipsis;
    }
    .sub-pop-hd{
        font-size: 28px;
        color:#8A8A8F;
    }
    .toast-line{
        padding: 10px;
    }
    .toast-icon{
        width: 50px;
        height: 50px;
    }
    .no-washdata{
        color: #fff;
        text-align: center;
        padding-top: 80px;
        font-size: 30px;
    }
 
</style>

<script>
    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import ToastDialog from '@/midea-component/toastDialog.vue'
    import mideaCell from '@/component/cell.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
    import myScore from '@/midea-rooms/components/score.vue'

    import { url, codeDesc } from './config/config.js'

    export default {
        components:{ MideaHeader, ToastDialog, mideaCell, mideaList, myScore },
        computed:{
            temperatureStatus(){
                let temperature = this.indicator.temperature
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
                let humidity = this.indicator.humidity
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
                    // desc = '未知'
                    desc = ''
                }
               
                return desc
            },
            pm25Status(){
                let pm25 = this.indicator.pm25
                let humidity = this.indicator.humidity
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
                    // desc = '未知'
                    desc = ''
                }
             
                return desc
            },
            waterStatus(){
                if(this.scene.applianceList && this.scene.applianceList.length > 0) {
                    if (this.scene.indicator.work_status == 'warm') {
                        return '热水充足'
                    }else if (this.scene.indicator.work_status) {
                        return '加热中'
                    }else{
                        return '未知'
                    }
                }else{
                    return '无相关设备'
                }
                
            },
            sceneStyle(){
                let tmp = {
                    backgroundImage: this.style.linearBg[this.roomType],
                    height: this.pageHeight*0.7 + 'px',
                    position: 'relative',
                    overflow: 'hidden'
                }
                if (this.isipx) {
                    tmp.paddingTop = '64px'
                }else{
                    tmp.paddingTop = '40px'
                }
                return tmp
            },
            downBlockStyle(){
                return {
                    paddingTop: (this.pageHeight*0.3- 170)/2+ 'px',
                }
            }
        },
        mixins: [base],
        data(){
            return {
                uid: '',
                homegroupId: '',
                scene: {},
                icon:{
                    back: 'assets/img/b_white.png',
                    next: 'assets/img/more_w.png',
                    success: '',
                    fail: '',
                    hanging: '',
                    actions: {
                        '1001': 'assets/img/home_on.png',
                        '1002': 'assets/img/comfort_on.png',
                        '1003': 'assets/img/eco_on.png',
                        '1004': 'assets/img/shut_on.png',
                        '1005': 'assets/img/home_on.png',
                        '1006': 'assets/img/comfort_on.png',
                        '1007': 'assets/img/eco_on.png',
                        '1008': 'assets/img/shut_on.png',
                        '1009': 'assets/img/comfort_on.png',
                        '1010': 'assets/img/eco_on.png',
                        '1011': 'assets/img/stop_on.png',
                        '1012': 'assets/img/power_on.png',
                        '1013': 'assets/img/power_off.png',
                        '1014': 'assets/img/alarm_on.png',
                        '1015': 'assets/img/start_on.png',
                    },
                    model: {
                        1: 'assets/img/success.png',
                        2: 'assets/img/loading.png',
                        3: 'assets/img/fail.png'
                    },
                    washer: {
                        on: 'assets/img/power_on.png',
                        off: 'assets/img/power_off.png',
                        start: 'assets/img/start_on.png',
                        pause: 'assets/img/stop_on.png',
                        powerDisabled: 'assets/img/power_off.png',
                        statusDisabled: 'assets/img/start_off.png'
                    },
                    water: 'assets/img/equitment_ic_waterdrop@2x.png',
                    power: 'assets/img/equitment_ic_lightning@2x.png',
                },
                style: {
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
                activeModeDevices: [],
                applianceList: {},
                showToastDialog: false,
                userSupportDevices: [],
                showMall: false,
                weatherDesc: '',
                sceneDevices: [],
                washerWaterData: {
                    x: {
                        "value": [],
                        "label": []
                    },
                    y: [
                        {
                            "value": [],
                            "title": "用水量",
                            "color": "#eeeeee",
                            "backgroundColor": "#111"
                        }
                    ],
                    borderRadius: "3",
                    description: "",
                    legend: {
                        "position": "TOP_CENTER",
                        "orientation": "HORIZONTAL",
                        "show": false
                    },
                    unit: {
                        "x": "",
                        "y": "",
                        // "x": "日期",
                        // "y": "单位:吨"
                    }
                },
                washerPowerData: {
                    x: {
                        "value": [],
                        "label": []
                    },
                    y: [
                        {
                            "value": [],
                            "title": "用电量",
                            "color": "#eeeeee",
                            "backgroundColor": "#111"
                        }
                    ],
                    borderRadius: "3",
                    description: "",
                    legend: {
                        "position": "TOP_LEFT",
                        "orientation": "HORIZONTAL",
                        "show": false
                    },
                    unit: {
                        "x": "",
                        "y": "",
                        // "x": "日期",
                        // "y": "单位:度"
                    }
                },
                hasWasherPowerData: false,
                hasWasherWaterData: false,
                washerPower: 'powerDisabled',//洗衣机电源状态（开机关机）
                washerRunningStatus: 'statusDisabled',//洗衣机运行状态
                washerStatus: {
                    on: '开机',
                    off: '关机',
                    powerDisabled: '',
                    start: '启动',
                    pause: '暂停',
                    statusDisabled: ''
                },
                indicator: {},
                sceneLevel: 1,
            }
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            goSetting(){
                let params = {
                    homegroupId: this.homegroupId,
                    roomType: this.roomType,
                    sceneId: this.sceneId,
                }
                this.goTo('setting', {}, params)
            },
            closeToastDialog(){
                this.showToastDialog = false
            },
            buyShampoo(){
                this.goTo('buyShampoo')
            },
            initData(){
                if (this.roomType == 1){
                    this.scene.modeList = [
                        { modelName: '回家', modelId: '1001' },
                        { modelName: '舒适', modelId: '1002' },
                        { modelName: '节能', modelId: '1003' },
                        { modelName: '全关', modelId: '1004' },
                    ]
                }else if (this.roomType == 2) {
                    this.scene.modeList = [
                        { modelName: '回家', modelId: '1005' },
                        { modelName: '舒适', modelId: '1006' },
                        { modelName: '节能', modelId: '1007' },
                        { modelName: '全关', modelId: '1008' },
                    ]
                }else if (this.roomType == 3) {
                    this.scene.modeList = [
                        { modelName: '舒适', modelId: '1009' },
                        { modelName: '省电', modelId: '1010' },
                        { modelName: '停用', modelId: '1011' },
                    ]
                }
                this.getSceneDetail().then(()=>{
                    if (this.scene.applianceList.length <= 0 ) {
                        nativeService.toast('无法获取相关数据，点击右上角设置设备')
                    }
                    if (this.roomType == 4){
                        this.getWeatherInfo()
                         if ( this.scene.applianceList.length > 0) {
                            this.washerCode = this.scene.applianceList[0].applianceCode || ''
                            this.getWashData()
                            this.luaQueryStatus()
                         }
                    }
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            },
            getSceneDetail(){
                return new Promise((resolve, reject)=>{
                    this.checkLogin().then( (uid) => {
                        let reqUrl = url.scene.detail
                        let reqParams = {
                            uid: uid,
                            homegroupId: this.homegroupId,
                            sceneId: this.sceneId
                        }
                        
                        this.webRequest(reqUrl, reqParams).then( (res) => {
                            if (res.code == '0') {
                                this.scene = res.data
                                this.indicator = res.data.indicator || {}
                                if ( this.indicator.level && this.indicator.level != '' ) {
                                     this.sceneLevel = this.indicator.level
                                }
                                resolve()
                            }else{
                                if (codeDesc.scene.hasOwnProperty(res.code)) {
                                    nativeService.toast(codeDesc.scene[res.code])
                                }else{
                                    nativeService.toast(res.msg)
                                }
                            }
                        }).catch((err)=>{
                            nativeService.toast(this.getErrorMessage(err))
                        })
                    }).catch((err)=>{
                        nativeService.toast(this.getErrorMessage(err))
                    })
                })
            },
            quickOptimize(){
                this.checkLogin().then( (uid) => {
                    let reqUrl = url.scene.optimize
                    let reqParams = {
                        uid: uid,
                        homegroupId: this.homegroupId,
                        sceneId: this.sceneId,
                    }
                    this.webRequest(reqUrl, reqParams).then((res)=>{
                        if (res.code == 0) {
                            this.checkQuickOptimize(res.data.resultId)
                        }else if (res.code == 1711){
                            nativeService.alert(res.msg)
                        }else{
                            if (codeDesc.scene.hasOwnProperty(res.code)) {
                                nativeService.toast(codeDesc.scene[res.code])
                            }else{
                                nativeService.toast(res.msg)
                            }
                        }
                    }).catch((err)=>{
                        nativeService.toast(this.getErrorMessage(err))
                    })
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            },
            checkQuickOptimize(resultId){
                // status 1-成功，2-执行中，3-失败
                this.checkLogin().then( (uid) => {
                    let reqUrl = url.scene.optimizeStatus
                    let reqParams = {
                        uid: uid,
                        homegroupId: this.homegroupId,
                        sceneId: this.sceneId,
                        resultId: resultId
                    }
                    this.webRequest(reqUrl, reqParams, false).then((res)=>{
                        if (res.code == 0) {
                            this.showToastDialog = true
                            this.sceneDevices = Object.assign({}, res.data.list[0].actionList)
                            
                            for (var x in this.sceneDevices) {
                                if (this.sceneDevices[x].status == 2 || this.sceneDevices[x].status == 3) {
                                    setTimeout(()=>{
                                        this.checkQuickOptimize(resultId)
                                    },1000)
                                } else{
                                    setTimeout(()=>{
                                        this.showToastDialog = false
                                    },2000)
                                    break
                                }
                            }
                        }else{
                            if (codeDesc.scene.hasOwnProperty(res.code)) {
                                nativeService.toast(codeDesc.scene[res.code])
                            }else{
                                nativeService.toast(res.msg)
                            }
                        }
                    }).catch((err)=>{
                        nativeService.toast(this.getErrorMessage(err))
                    })
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            },
            executeModel(modelId){
                if (this.scene.applianceList && this.scene.applianceList.length > 0) {
                    this.checkLogin().then( (uid) => {
                        let reqUrl = url.scene.modelExecute
                        let reqParams = {
                            uid: uid,
                            homegroupId: this.homegroupId,
                            sceneId: this.sceneId,
                            modelId: modelId
                        }
                        this.webRequest(reqUrl, reqParams).then((res)=>{
                            if (res.code == 0) {
                                nativeService.toast('执行成功！')
                            }else{
                                if (codeDesc.scene.hasOwnProperty(res.code)) {
                                    nativeService.toast(codeDesc.scene[res.code])
                                }else{
                                    nativeService.toast(res.msg)
                                }
                            }
                        }).catch((err)=>{
                            nativeService.toast(this.getErrorMessage(err))
                        })
                    }).catch((err)=>{
                        nativeService.toast(this.getErrorMessage(err))
                    })
                }else{
                    nativeService.toast('当前场景未绑定设备，无法执行此场景模式')
                }
                
            },
            getWeatherInfo(){
                nativeService.getGPSInfo({
                    desiredAccuracy: "10",
                    distanceFilter: "10",
                    alwaysAuthorization: "0" 
                }).then((gps)=>{
                    nativeService.getCityInfo({cityName: gps.city}).then( (city)=>{
                        nativeService.getWeatherInfo({cityNo: city.cityNo}).then((weather)=>{
                            let tmpDesc = ''
                            if (weather.weatherStatus) {
                                tmpDesc += '今天' + weather.weatherStatus
                            }
                            if (weather.grade) {
                                tmpDesc += ' , 气温' + weather.grade + '℃'
                            }
                            this.weatherDesc = tmpDesc || '无法获取天气，可能因为未开启定位服务'
                        }).catch(()=>{
                            this.weatherDesc = '无法获取天气，请在系统设置中打开定位服务'
                        })
                    }).catch((err)=>{
                        this.weatherDesc = '无法获取天气，请在系统设置中打开定位服务'
                    })
                }).catch((err)=>{
                    this.weatherDesc = '无法获取天气，请在系统设置中打开定位服务'
                })
            },
            getWashData(){
                this.checkLogin().then( (uid) => {
                    if (this.washerCode) {
                        let reqUrl = url.scene.washerConsumption
                        let reqParams = {
                            uid: uid,
                            homegroupId: this.homegroupId,
                            applianceCode: this.washerCode
                        }
                        
                        this.webRequest(reqUrl, reqParams).then((res)=>{
                            if (res.code == 0) {
                                let result = res.data.historyConsumptions.reverse()//接口数据是倒序的，需要反序过来

                                // x:日期， y:用量
                                let tmpPowerXValue = [], tmpPowerXLabel = [], tmpPowerYValue = [], tmpPowerYLabel = [], 
                                    tmpWaterXValue = [], tmpWaterXLabel = [], tmpWaterYValue = [], tmpWaterYLabel = []

                                for (let i=0; i<result.length; i++) {
                                    tmpPowerXValue[i] = i
                                    tmpWaterXValue[i] = i

                                    let mm = result[i].date.split('-')[1], dd = result[i].date.split('-')[2]
                                    if (['05','10', '15', '20', '25','30'].indexOf(dd) > -1) {
                                        tmpPowerXLabel[i] = mm+'.'+dd
                                        tmpWaterXLabel[i] = mm+'.'+dd
                                    }else{
                                        tmpPowerXLabel[i] =''
                                        tmpWaterXLabel[i] = ''
                                    }

                                    tmpPowerYValue[i] = 0
                                    tmpPowerYLabel[i] = 0
                                    if (result[i].powerConsumption){
                                        if ( result[i].powerConsumption != '') {
                                            tmpPowerYValue[i] = Number(result[i].powerConsumption)
                                            tmpPowerYLabel[i] = Number(result[i].powerConsumption)
                                        }
                                    }

                                    tmpWaterYValue[i] = 0
                                    tmpWaterYLabel[i] = 0
                                    if (result[i].waterConsumption && result[i].waterConsumption != '') {
                                        tmpWaterYValue[i] = Number(result[i].waterConsumption)
                                        tmpWaterYLabel[i] = Number(result[i].waterConsumption)
                                    }
                                }

                                this.washerPowerData['x']['value'] = tmpPowerXValue
                                this.washerPowerData['x']['label'] = tmpPowerXLabel
                                this.washerPowerData['y'][0]['value'] = tmpPowerYValue
                                this.washerPowerData['y'][0]['label'] = tmpPowerYLabel
                                
                                this.washerWaterData['x']['value'] = tmpWaterXValue
                                this.washerWaterData['x']['label'] = tmpWaterXLabel
                                this.washerWaterData['y'][0]['value'] = tmpWaterYValue
                                this.washerWaterData['y'][0]['label'] = tmpWaterYLabel
                                
                                this.hasWasherPowerData = true
                                this.hasWasherWaterData = true

                            }else{
                                if (codeDesc.scene.hasOwnProperty(res.code)) {
                                    nativeService.toast(codeDesc.scene[res.code])
                                }else{
                                    nativeService.toast(res.msg)
                                }
                            }
                        }).catch((err)=>{
                            nativeService.toast(this.getErrorMessage(err))
                        })
                    }
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            },
            luaQueryStatus () {//洗衣机数据的lua查询
            	let self = this;
            	let params = {
                    params:{}, 
                    operation: 'luaQuery',
                    applianceId: String(self.washerCode)
                }
            	nativeService.sendLuaRequest(params, true).then(function(luaData) {
                    self.setWasherStatus(luaData)
            	},function(error) {
                    nativeService.alert('查询洗衣机状态时遇到了问题 \n[错误码：' + error.errorCode +']')
            	});
            },
            setWasherStatus(luaData){
                this.washerPower = luaData.result.power
                if (luaData.result.running_status != 'start') {
                    this.washerRunningStatus = 'start' //runnig_status不等于start就可以发start命令
                }else if (luaData.running_status == 'start'){
                    this.washerRunningStatus = 'pause'
                }
            },
            powerOnOff(){//控制阳台场景洗衣机的开启关闭
                if (this.washerPower == 'powerDisabled') {
                    return
                }else{
                    let self = this;
                    let poweronoff = this.washerPower=='off' ? "on" : "off"
                    let params = {
                        operation: "luaControl",
                        applianceId:  String(self.washerCode),
                        params: { "power": poweronoff },
                    }
                    nativeService.sendLuaRequest(params,true).then(function(luaData) {
                        nativeService.showLoading()
                        setTimeout(()=>{
                            self.luaQueryStatus()
                            nativeService.hideLoading()
                        },2000)
                    },function(error) {
                        nativeService.alert('改变洗衣机状态时遇到了问题 \n[错误码：' + error.errorCode +']')
                    });
                }
            },
            controlStartPause(){//控制阳台场景洗衣机的启动暂停
                if (this.washerRunningStatus == 'statusDisabled') {
                    return
                }else{
                    let self = this;
                    if( self.washerRunningStatus == "work") {
                        let params = {
                            operation:"luaControl",
                            applianceId: String(self.washerCode),
                            params:{ "control_status": "pause" }
                        }
                        nativeService.sendLuaRequest(params,true).then(function(luaData) {
                            nativeService.showLoading()
                            setTimeout(()=>{
                                self.luaQueryStatus()
                                nativeService.hideLoading()
                            },2000)
                        },function(error) {
                            nativeService.alert('改变洗衣机状态时遇到了问题 \n[错误码：' + error.errorCode +']')
                        })
                    } else {
                        let params = {
                            operation: "luaControl",
                            applianceId: String(self.washerCode),
                            params: { control_status: "start" }
                        }
                        nativeService.sendLuaRequest(params,true).then(function(luaData) {
                            nativeService.showLoading()
                            setTimeout(()=>{
                                self.luaQueryStatus()
                                nativeService.hideLoading()
                            },2000)
                        },function(error) {
                            nativeService.alert('改变洗衣机状态时遇到了问题 \n[错误码：' + error.errorCode +']')
                        });
                    }
                }
            }
        },
        created(){
            this.homegroupId = nativeService.getParameters('homegroupId')
            this.sceneId = nativeService.getParameters('sceneId')
            this.roomType = nativeService.getParameters('roomType')
        }
    }
</script>
