<template>
    <div>
            
        <scroller class="wrap" :style="wrapStyle">
            <div :style="sceneStyle">
                <midea-header :title="scene.name" bgColor="transparent" titleText="#fff"  @leftImgClick="goBack"></midea-header>
                <div class="setting" @click="goSetting()">
                    <text class="setting-text white">设置</text>
                </div>
                <div v-if="scene.roomType=='1' || scene.roomType=='2' || scene.roomType=='3' " class="up-block" >
                    <div class="up-desc">
                        <text class="desc white">{{temperatureStatus}} {{pm25Status}}</text>
                        <midea-vote :defaulSelectd="Number(scene.indicator.level)" :disabled="true" :styles="style.vote" :imgPath="voteImg"></midea-vote>
                        <text class="improve white" @click="quickOptimize">一键优化</text>
                    </div>
                    <div class="up-status row-sa" v-if="scene.roomType=='1' || scene.roomType=='2'">
                        <div>
                            <text class="info-text font14 white">温度</text>
                            <div  class="row-c status-value">
                                <text v-if="scene.indicator.temperature" class="font36 white">{{scene.indicator.temperature}}</text>
                                <text v-if="scene.indicator.temperature" class="font16 white mgb-10">℃</text>
                                <text v-else class="font36 white">-</text>
                            </div>
                            <text class="info-text font12 white">{{temperatureStatus}}</text>
                        </div>  
                        <div>
                            <text class="info-text font14 white">湿度</text>
                            <div class="row-c status-value">
                                <text v-if="scene.indicator.humidity" class="font36 white">{{scene.indicator.humidity}}</text>
                                <text v-if="scene.indicator.humidity" class="font16 white mgb-10">%</text>
                                <text v-else class="font36 white">-</text>
                            </div>
                            <text class="info-text font12 white">{{humidityStatus}}</text>
                        </div>  
                        <div>
                            <text class="info-text font14 white">空气质量</text>
                            <div class="row-c status-value">
                                <text v-if="scene.indicator.pm5" class="font36 white">{{scene.indicator.pm5}}</text>
                                <text v-else class="font36 white">-</text>
                            </div>
                            <text class="info-text font12 white">{{pm25Status}}</text>
                        </div>
                    </div>
                    <div class="up-status row-sa" v-if="scene.roomType=='3'">
                        <div>
                            <text v-if="scene.indicator.work_stats" class="info-text font14 white">{{scene.indicator.work_stats}}</text>
                            <text v-else class="info-text font14 white">工作状态</text>
                            <div class="row-c status-value">
                                <text v-if="scene.indicator.water_temperature" class="font36 white">{{scene.indicator.water_temperature}}</text>
                                <text v-if="scene.indicator.water_temperature" class="font16 white mgb-10">℃</text>
                                <text v-else class="font36 white">-</text>
                            </div>
                        </div>  
                        <div>
                            <text class="info-text font14 white">热水量</text>
                            <div class="row-c status-value">
                                <text v-if="scene.indicator.water_capacity" class="font36 white">{{scene.indicator.water_capacity}}</text>
                                <text v-if="scene.indicator.water_capacity" class="font16 white mgb-10">%</text>
                                <text v-else class="font36 white">-</text>
                            </div>
                        </div>  
                        <div v-if="scene.roomType=='3' ">
                            <text class="info-text font14 white">还需加热</text>
                            <div class="row-c status-value">
                                <text v-if="scene.indicator.remain_time" class="font36 white">{{scene.indicator.remain_time}}</text>
                                <text v-if="scene.indicator.remain_time" class="font16 white mgb-10">分</text>
                                <text v-else class="font36 white">-</text>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="scene.roomType=='4'" class="up-block balcony-block">
                    <text class="weather white">{{weatherDesc}}</text>
                    <slider v-if="hasWasherWaterData || hasWasherPowerData">
                        <div v-if="hasWasherWaterData">
                            <midea-barchart-view class="barchart" :data="washData"></midea-barchart-view>
                        </div>
                        <div v-if="hasWasherPowerData">
                            <midea-barchart-view class="barchart" :data="washData"></midea-barchart-view>
                        </div>
                    </slider>
                    <div v-else>
                        <text class="no-washdata">暂无数据</text>
                    </div>
                </div>
                <!-- <div v-if="scene.roomType=='4'" class="wash-list wash-item row-sb" @click="buyShampoo">
                    <text class="font16 white">购买洗涤剂</text>
                    <image class="next" :src="icon.next"></image>
                </div> -->
            </div>
            <div v-if="scene.roomType == 4" class="down-block row-sa">
                <div @click="powerOnOff">
                    <image class="down-icon" :src="icon.washer[washerPower]"></image>
                    <text class="down-text">{{washerStatus[washerPower]}}</text>
                </div>
                <div @click="controlStartPause">
                    <image class="down-icon" :src="icon.washer[washerControlStatus]"></image>
                    <text class="down-text">{{washerStatus[washerControlStatus]}}</text>
                </div>
            </div>
            <div v-if="scene.roomType != 4" class="down-block row-sa">
                <div v-for="model in scene.modeList" @click="executeModel(model.modelId)">
                    <image class="down-icon" :src="icon.actions[model.modelId]"></image>
                    <text class="down-text">{{model.modelName}}</text>
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
    .setting{
        position:absolute;
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
        width: 750px;
    }
    .desc{
        margin-bottom: -10px;
        font-size: 40px;
    }
    .desc, .weather{
        text-align: center;
    }
    .weather{
        font-size: 28px;
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
        width: 700px;
        margin-left: 25px;
        height: 500px;
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
            wrapStyle(){
                let tmp = {}
                if (this.isipx) {
                    tmp.marginTop = '64px'
                }else{
                    tmp.marginTop = '40px'
                }
                return tmp
            },
            webStyle(){
                return {
                    width: '750px',
                    height: this.pageHeight + 'px',
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    bottom: '0px',
                    right: '0px'
                }
            },
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
            sceneStyle(){
                return { 
                    backgroundImage: this.style.linearBg[this.scene.roomType],
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
                icon:{
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
                        pause: 'assets/img/stop_on.png'
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
                userDevices: '',
                userSupportDevices: [],
                showMall: false,
                weatherDesc: '',
                sceneDevices: [],
                washerPowerData: {
                    x: {
                        "value": [],
                        "label": []
                    },
                    y: [
                        {
                            "value": [],
                            "title": "用电量",
                            "color": "#2AD2FC",
                            "backgroundColor": "#111"
                        }
                    ],
                    description: "",
                    legend: {
                        "position": "TOP_LEFT",
                        "orientation": "HORIZONTAL" 
                    },
                    unit: {
                        "x": "日期",
                        "y": "度"
                    }
                },
                washerWaterData: {
                    x: {
                        "value": [],
                        "label": []
                    },
                    y: [
                        {
                            "value": [],
                            "title": "用水量",
                            "color": "#2AD2FC",
                            "backgroundColor": "#111"
                        }
                    ],
                    description: "",
                    legend: {
                        "position": "TOP_LEFT",
                        "orientation": "HORIZONTAL" 
                    },
                    unit: {
                        "x": "日期",
                        "y": "吨"
                    }
                },
                hasWasherPowerData: false,
                hasWasherWaterData: false,
                washerPower: 'off',
                washerControlStatus: 'pause',
                washerStatus: {
                    on: '开机',
                    off: '关机',
                    start: '启动',
                    pause: '暂停'
                },
            }
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            goSetting(){
                let params = {
                    uid: this.uid,
                    homegroupId: this.homegroupId,
                    roomType: this.roomType,
                    sceneId: this.sceneId,
                    userDevices: nativeService.getParameters('userDevices')
                }
                this.goTo('setting', {}, params)
            },
            closeToastDialog(){
                this.showToastDialog = false
            },
            buyShampoo(){
                let params = {
                    uid: this.uid
                }
                this.goTo('buyShampoo', {}, params)
            },
            getSceneDetail(){
                return new Promise((resolve, reject)=>{
                    let reqUrl = url.scene.detail
                    let reqParams = {
                        uid: this.uid,
                        homegroupId: this.homegroupId,
                        sceneId: this.sceneId
                    }
                    
                    this.webRequest(reqUrl, reqParams).then( (res) => {
                        if (res.code == '0') {
                            this.scene = res.data
                            resolve()
                        }else{
                            let codeMsg = {
                                "1000": "未知系统错误",
                                "1001": "参数格式错误",
                                "1002": "参数为空",
                                "1105": "账户不存在",
                                "1200": "用户不在家庭"
                            }
                            nativeService.toast(codeMsg[res.code])
                        }
                    }).catch( (error )=>{
                        nativeService.alert(error)
                    })
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
            quickOptimize(){
                let reqUrl = url.scene.optimize
                let reqParams = {
                    uid: this.uid,
                    homegroupId: this.homegroupId,
                    sceneId: this.sceneId,
                }
                let codeDesc = {
                    '1000':"未知系统错误",
                    '1001':"参数格式错误",
                    '1002':"参数为空",
                    '1003':"参数类型不支持",
                    '1105':"账户不存在",
                    '1200':"用户不在家庭",
                    '1701':"场景不存在",
                    '1704':"场景没有关联设备"
                }
                this.webRequest(reqUrl, reqParams).then((res)=>{
                    
                    if (res.code == 0) {
                        this.checkQuickOptimize(res.data.resultId)
                        
                    }else if (res.code == 1711){
                        nativeService.alert(res.msg)
                    }else{
                        if (codeDesc.hasOwnProperty(res.code)) {
                            nativeService.toast(codeDesc[res.code])
                        }else{
                            nativeService.toast(res.msg)
                        }
                    }
                }).catch( (err )=>{
                    reject(err)
                })
            },
            checkQuickOptimize(resultId){
                // status 1-成功，2-执行中，3-失败
                let reqUrl = url.scene.optimizeStatus
                let reqParams = {
                    uid: this.uid,
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
                    }
                })
            },
            executeModel(modelId){
                let reqUrl = url.scene.modelExecute
                let reqParams = {
                    uid: this.uid,
                    homegroupId: this.homegroupId,
                    sceneId: this.sceneId,
                    modelId: modelId
                }
                let codeDesc = {
                    '1000':	'未知系统错误',
                    '1001':	'参数格式错误',
                    '1002':	'参数为空',
                    '1105':	'账户不存在',
                    '1200':	'用户不在家庭',
                    '1701':	'场景不存在',
                    '1704':	'场景没有关联设备',
                    '1709':	'模式不存在'
                }
                this.webRequest(reqUrl, reqParams).then((res)=>{
                    if (res.code == 0) {
                        nativeService.toast('执行成功！')
                    }else{
                        nativeService.alert(codeDesc[res.code])
                    }
                }).catch( (err)=>{
                })
            },
            getWashData(){
                if (this.washerCode) {
                    let reqUrl = url.scene.washerConsumption
                    let reqParams = {
                        uid: this.uid,
                        homegroupId: this.homegroupId,
                        applianceCode: this.washerCode
                    }
                    
                    this.webRequest(reqUrl, reqParams).then((res)=>{
                        if (res.code == 0) {
                            let result = res.data.historyConsumptions
                            let tmpPowerXValue = [], tmpPowerXLabel = [], tmpPowerYValue = [], tmpPowerYLabel = [], 
                                tmpWaterXValue = [], tmpWaterXLabel = [], tmpWaterYValue = [], tmpWaterYLabel = []

                            for (let i=0; i<result.length; i++) {
                                tmpPowerXValue[i] = i
                                tmpPowerXLabel[i] = result[i].date

                                tmpPowerYValue[i] = 0
                                tmpPowerYLabel[i] = 0
                                if (result[i].powerConsumption && result[i].powerConsumption != '') {
                                    tmpPowerYValue[i] = result[i].powerConsumption
                                     tmpPowerYLabel[i] = result[i].powerConsumption
                                }

                                tmpWaterXValue[i] = i
                                tmpWaterXLabel[i] = result[i].date
                                
                                tmpWaterYValue[i] = 0
                                tmpWaterYLabel[i] = 0
                                if (result[i].waterConsumption && result[i].waterConsumption != '') {
                                    tmpWaterYValue[i] = result[i].waterConsumption
                                    tmpWaterYLabel[i] = result[i].waterConsumption
                                }
                            }

                            this.washerPowerData['x']['value'] = tmpPowerXValue
                            this.washerPowerData['x']['label'] = tmpPowerXLabel
                            this.washerPowerData['y']['value'] = tmpPowerYValue
                            this.washerPowerData['y']['label'] = tmpPowerYLabel
                            
                            this.washerWaterData['x']['value'] = tmpWaterXValue
                            this.washerWaterData['x']['label'] = tmpWaterXLabel
                            this.washerWaterData['y']['value'] = tmpWaterYValue
                            this.washerWaterData['y']['label'] = tmpWaterYLabel
                            
                            this.hasWasherPowerData = true
                            this.hasWasherWaterData = true
                        }else{
                            let codeMsg = {
                                "1000": "未知系统错误",
                                "1001": "参数格式错误",
                                "1002": "参数为空",
                                "1105": "账户不存在"
                            }
                            nativeService.alert(codeMsg[res.code])
                        }
                    }).catch((err)=>{
                    })
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
                            this.weatherDesc = tmpDesc || '无法获取天气，请在系统设置中打开定位服务'
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
            setWasherStatus(luaData){
                // this.washerRunningStatus = luaData.running_status
            },
            luaQueryStatus () {
            	let self = this;
            	let params = {
                    data:{}, 
                    operation: 'luaQuery',
                    applianceId: String(self.washerCode),
                }
                nativeService.alert('params:  ' + JSON.stringify(params))

            	nativeService.sendLuaRequest(params, true).then(function(luaData) {
                    nativeService.alert('luaData:  ' + JSON.stringify(luaData))
                    self.setWasherStatus(luaData)
            	},function(error) {
                    nativeService.alert('error:  ' + JSON.stringify(error))
            	});
            },
            powerOnOff(){//控制阳台场景洗衣机的开启关闭
		        let self = this;
		        let poweronoff = this.washerPower=='off' ? "on" : "off";
            	let params = {
            			operation: "luaControl",
                        applianceId: self.washerCode,
            			data: { "power": poweronoff },
            		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
            		self.setWasherStatus(data);
            	},function(error) {
            		nativeService.alert(data);
            	});
            },
            controlStartPause(){//控制阳台场景洗衣机的启动暂停
            	let self = this;
            	if( self.washerRunningStatus == "work") {
            		let params = {
            			operation:"luaControl",
                        applianceId: self.washerCode,
            			data:{ "control_status": "pause" }
            		};
            		nativeService.sendLuaRequest(params,true).then(function(data) {
            			nativeService.alert(data)
	            		self.setWasherStatus(data)
	            	},function(error) {
	            		nativeService.alert(error)
	            	})
            	} else {
            		let params = {
            			operation: "luaControl",
                        applianceId: self.washerCode,
            			data: { control_status: "start" },
            		};
            		nativeService.sendLuaRequest(params,true).then(function(data) {
	            		self.setWasherStatus(data);
	            	},function(error) {
	            		nativeService.alert(error)
	            	});
            	}
            }
        },
        created(){
            this.uid = nativeService.getParameters('uid')
            this.homegroupId = nativeService.getParameters('homegroupId')
            this.sceneId = nativeService.getParameters('sceneId')
            this.roomType = nativeService.getParameters('roomType')
            
            if (nativeService.getParameters('userDevices')) {
                this.userDevices = JSON.parse(decodeURIComponent(nativeService.getParameters('userDevices')))
            }
            this.getSceneDetail().then(()=>{
                if (this.roomType == 4 && this.scene.applianceList.length > 0) {
                    this.washerCode = this.scene.applianceList[0].applianceCode
                    this.getWashData()
                    this.getWeatherInfo()
                    this.luaQueryStatus()
                }
            })
        }
    }
</script>
