<template>
    <div @viewappear="initData">
        <scroller class="wrap">
            <div :style="sceneStyle">
                <midea-header :title="sceneName[roomType]" :isImmersion="isImmersion" bgColor="transparent" titleText="#fff" :leftImg="icon.back" @leftImgClick="goBack" :showRightText="isOwner==1 && hasUseableDevice && network ? true : false" rightText="设置" rightColor="#fff" @rightTextClick="goSetting"></midea-header>
                <div v-if="roomType=='1' || roomType=='2' || roomType=='3' " class="up-block" >
                    <div v-if="hasUseableDevice">
                        <div class="up-desc">
                            <text v-if="roomType=='1'||roomType=='2'" class="bold desc white">{{temperatureStatus}} {{pm25Status}}</text>
                            <text v-if="roomType=='3'" class="desc white">{{waterStatus}}</text>
                            <my-score class="scene-score" :score="indicator.level" :starWidth="45"></my-score>
                            <text class="improve white" @click="quickOptimize">一键优化</text>
                        </div>
                        <div class="up-status row-sa" v-if="roomType=='1' || roomType=='2'">
                            <div class="scene-status">
                                <text class="info-text font14 white">温度</text>
                                <div  class="row-c status-value">
                                    <text v-if="indicator.temperature != undefined && indicator.temperature !== ''" class="font36 white">{{indicator.temperature}}</text>
                                    <text v-if="indicator.temperature != undefined && indicator.temperature !== ''" class="font16 white mgb-20">℃</text>
                                    <text v-else class="font36 white">--</text>
                                </div>
                                <text v-if="indicator.temperature != undefined && indicator.temperature != ''" class="info-text font12 white">{{temperatureStatus}}</text>
                                <text v-else class="info-text font12 white"></text>
                            </div>  
                            <div class="scene-status">
                                <text class="info-text font14 white">湿度</text>
                                <div class="row-c status-value">
                                    <text v-if="indicator.humidity != undefined && indicator.humidity !== ''" class="font36 white">{{indicator.humidity}}</text>
                                    <text v-if="indicator.humidity != undefined && indicator.humidity !== ''" class="font16 white mgb-20">%</text>
                                    <text v-else class="font36 white">--</text>
                                </div>
                                <text class="info-text font12 white">{{humidityStatus}}</text>
                            </div>  
                            <div class="scene-status">
                                <text class="info-text font14 white">空气质量</text>
                                <div class="row-c status-value">
                                    <text v-if="indicator.pm25 != undefined && indicator.pm25 !== '' && indicator.pm25 != '65535'" class="font36 white">{{indicator.pm25}}</text>
                                    <text v-else class="font36 white">--</text>
                                </div>
                                <text class="info-text font12 white">{{pm25Status}}</text>
                            </div>
                        </div>
                        <div class="up-status row-sa bath-up-status" v-if="roomType=='3'">
                            <div class="scene-status">
                                <text class="info-text font14 white">温度</text>
                                <div class="row-c status-value">
                                    <text v-if="indicator.water_temperature != undefined && indicator.water_temperature !== ''" class="font36 white">{{indicator.water_temperature}}</text>
                                    <text v-if="indicator.water_temperature != undefined && indicator.water_temperature !== ''" class="font16 white mgb-20">℃</text>
                                    <text v-else class="font36 white">--</text>
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
                                    <text v-if="indicator.remain_time != undefined && indicator.remain_time !== ''" class="font36 white">{{indicator.remain_time}}</text>
                                    <text v-if="indicator.remain_time != undefined && indicator.remain_time !== ''" class="font16 white mgb-20">分</text>
                                    <text v-else class="font36 white">--</text>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="hasUseableDevice === false">
                        <div class="up-desc">
                            <text class="desc white">{{sceneName[roomType]}}中无相关设备</text>
                            <text class="sub-desc" v-if="roomType==1 || roomType==2">(如： 空调/空气净化器/电风扇)</text>
                            <text class="sub-desc" v-if="roomType==3">(如： 电热水器)</text>
                            <text class="sub-desc" v-if="roomType==4">(如： 滚筒洗衣机/波轮洗衣机)</text>
                            <text class="add-device-btn white" @click="jumpAddDevicePage">添加设备</text>
                        </div>
                    </div>
                </div>
                <div v-if="roomType=='4'" class="up-block balcony-block">
                    <div v-if="network">
                        <text class="weather white">{{weatherDesc}}</text>
                        <div v-if="hasUseableDevice">
                            <slider v-if="hasWasherWaterData || hasWasherPowerData">
                                <div v-if="hasWasherWaterData">
                                    <div class="row-sb chart-info">
                                        <text class="font14 white">单位：升</text>
                                        <text class="font14 white">近30天用水量</text>
                                    </div>
                                    <midea-barchart-view class="barchart" :data="washerWaterData"></midea-barchart-view>
                                </div>
                                <div v-if="hasWasherPowerData">
                                    <div class="row-sb chart-info">
                                        <text class="font14 white">单位：度</text>
                                        <text class="font14 white">近30天用电量</text>
                                    </div>
                                    <midea-barchart-view class="barchart" :data="washerPowerData"></midea-barchart-view>
                                </div>
                            </slider>
                            <div v-if="!hasWasher">
                                <text class="no-washdata">暂无数据</text>
                            </div>
                        </div>
                        <div v-if="hasUseableDevice === false">
                            <div class="up-desc">
                                <text class="desc white">{{sceneName[roomType]}}中无相关设备</text>
                                <text class="sub-desc">(如： 滚筒洗衣机/波轮洗衣机)</text>
                                <text class="add-device-btn white" @click="jumpAddDevicePage">添加设备</text>
                            </div>
                        </div>
                    </div>
                    <div v-if="!network">
                        <text class="no-washdata">暂无数据</text>
                    </div>
                </div>
                <!-- <div v-if="roomType=='4'" class="wash-list wash-item row-sb" @click="buyShampoo">
                    <text class="font16 white">购买洗涤剂</text>
                    <image class="next" :src="icon.next"></image>
                </div> -->
            </div>
            <div v-if="roomType != 4" class="down-block row-sa" :style="downBlockStyle">
                <div v-for="model in scene.modeList">
                    <div v-if="hasUseableDevice && network" @click="executeModel(model.modelId)">
                        <image class="down-icon" :src="icon.actions[model.modelId]"></image>
                        <text class="down-text">{{model.modelName}}</text>
                    </div>
                    <div v-if="hasUseableDevice === false || !network">
                        <image class="down-icon" :src="icon.actionsDisabled[model.modelId]"></image>
                        <text class="down-text down-text-disable">{{model.modelName}}</text>
                    </div>
                </div>
            </div>
            <div v-if="roomType == 4" class="down-block row-sa" :style="downBlockStyle">
                <div v-if="washerPower && hasUseableDevice" @click="powerOnOff">
                    <image v-if="hasUseableDevice" class="down-icon" :src="icon.washer[washerPower]"></image>
                    <text class="down-text">{{washerStatus[washerPower]}}</text>
                </div>
                <div v-if="washerPower && hasUseableDevice=== false">
                    <image class="down-icon" :src="icon.washer['powerDisabled']"></image>
                    <text class="down-text">{{washerStatus[washerPower]}}</text>
                </div>
                <div v-if="washerPower=='on'" @click="controlStartPause">
                    <image class="down-icon" :src="icon.washer[washerRunningStatus]"></image>
                    <text class="down-text">{{washerStatus[washerRunningStatus]}}</text>
                </div>
                <text v-if="washerPower" class="washer-desc">{{washerPowerDesc[washerPower]}}</text>
                <text v-else class="washer-desc">洗衣机状态未知</text>
            </div>
            <toast-dialog :show="showToastDialog" :maskStyle="{backgroundColor: 'rgba(0,0,0,0.6)'}" contentPadding="0px">
                <div class="toast-box" v-for="(item,i) in formatSceneDevices">
                    <div :class="['row-sb','toast-line', i>0?'toast-border':'']">
                        <div>
                            <text class="toast-hd">{{item.applianceName}}</text>
                            <div class="row-s">
                                <text class="toast-desc" v-for="desc in JSON.parse(item.describe)">{{desc.actionValue}}</text>
                            </div>
                        </div>
                        <image class="toast-icon" :src="icon.model[item.status]"></image>
                    </div>
                </div>
            </toast-dialog>
            <toast-dialog :show="showModelToastDialog" :maskStyle="{backgroundColor: 'rgba(0,0,0,0.6)'}" contentPadding="0px">
                <div class="toast-box" v-for="(item,i) in modelDeviceList">
                    <div :class="['row-sb','toast-line', i>0?'toast-border':'']">
                        <div>
                            <text class="toast-hd">{{item.applianceName}}</text>
                            <div class="row-s">
                                <text class="toast-desc" v-for="desc in item.describe">{{desc.actionValue}}</text>
                            </div>
                        </div>
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
    .bold{ font-weight: bold; }
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
    .sub-desc{
        font-size: 24px;
        color: #FFFFFF;
        opacity: 0.6;
        text-align: center;
        margin-top: 30px;
    }
    .scene-score{
        margin-top: 30px;
        margin-bottom: 70px;
        margin-left: 228px;
    }
    .weather{
        font-size: 30px;
        margin-bottom: 25px;
    }
    .improve, .add-device-btn{
        margin-left: 275px;
        margin-top:15px;
        width: 200px;
        padding-top: 14px;
        padding-bottom: 14px;
        border-width: 2px;
        border-color: #fff;
        border-style: solid;
        text-align: center;
        border-radius: 32px;
        font-size: 28px;
    }
    .add-device-btn{
        margin-top: 125px;
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
        position: relative;
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
        height: 24px;
        color: #000;
    }
    .down-text-disabled{
        /* color: #696969; */
        color: #f00;
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
    .washer-desc{
        color: #c7c7cc;
        margin-bottom: 16px;
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 24px;
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
    .toast-box{
        width: 550px;
    }
    .toast-line{
        padding: 25px;
    }
    .toast-border{
        border-top-color: #f2f2f2;
        border-top-width: 1px;
        border-top-style: solid;
    }
    .toast-hd{
        font-size: 32px;
        width: 400px;
        text-overflow: ellipsis;
        margin-bottom: 10px;
    }
    .toast-desc{ color: #8A8A8F; margin-right: 4px; font-size: 24px; }
    .toast-icon{ width: 50px; height: 50px; }
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

    import { url, codeDesc, luaDesc } from './config/config.js'

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
                    if (pm25>0 && pm25 < 51){
                        desc = '空气清新'
                    }else if (pm25 < 101){
                        desc = '空气良好'
                    }else if (pm25 < 201){
                        desc = '空气浑浊'
                    }else if (pm25 < 501){
                        desc = '空气污染严重 '
                    }else if(pm25 == '65535'){
                        desc = ''
                    }else{
                        desc = '空气质量异常'
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
                    }else if (this.scene.indicator.work_status == 'off') {
                        return '关机'
                    }else if (this.scene.indicator.work_status == 'on') {
                        return '待机'
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
                    // backgroundImage: this.style.linearBg[this.roomType],
                    backgroundColor: this.style.sceneBg[this.roomType],
                    height: this.pageHeight*0.7 + 'px',
                    position: 'relative',
                    overflow: 'hidden'
                }
                return tmp
            },
            downBlockStyle(){
                return {
                    paddingTop: (this.pageHeight*0.3- 170)/2+ 'px',
                }
            },
            formatSceneDevices(){
                let tmp = []
                for (var i in this.sceneDevices) {
                    tmp = tmp.concat(this.sceneDevices[i].actionList)
                }
                return tmp
            }
        },
        mixins: [base],
        data(){
            return {
                homegroupId: '',
                isOwner: '',
                scene: {},
                sceneName: {
                    1: '客厅',
                    2: '卧室',
                    3: '卫浴',
                    4: '阳台'
                },
                icon:{
                    back: 'assets/img/public_ic_back_white@3x.png',
                    next: 'assets/img/more_w.png',
                    success: '',
                    fail: '',
                    hanging: '',
                    actions: {
                        '1001': 'assets/img/scene_ic_homing_on@3x.png',
                        '1002': 'assets/img/scene_ic_comfort_on@3x.png',
                        '1003': 'assets/img/scene_ic_eco_on@3x.png',
                        '1004': 'assets/img/scene_ic_switch_on@3x.png',
                        '1005': 'assets/img/scene_ic_homing_on@3x.png',
                        '1006': 'assets/img/scene_ic_comfort_on@3x.png',
                        '1007': 'assets/img/scene_ic_eco_on@3x.png',
                        '1008': 'assets/img/scene_ic_switch_on@3x.png',
                        '1009': 'assets/img/scene_ic_comfort_on@3x.png',
                        '1010': 'assets/img/scene_ic_eco_on@3x.png',
                        '1011': 'assets/img/scene_ic_stop_on@3x.png',
                    },
                    actionsDisabled: {
                        '1001': 'assets/img/scene_ic_homing_off_1@3x.png',
                        '1002': 'assets/img/scene_ic_comfort_off_1@3x.png',
                        '1003': 'assets/img/scene_ic_eco_off_1@3x.png',
                        '1004': 'assets/img/scene_ic_switch_off_1@3x.png',
                        '1005': 'assets/img/scene_ic_homing_off_1@3x.png',
                        '1006': 'assets/img/scene_ic_comfort_off_1@3x.png',
                        '1007': 'assets/img/scene_ic_eco_off_1@3x.png',
                        '1008': 'assets/img/scene_ic_switch_off_1@3x.png',
                        '1009': 'assets/img/scene_ic_comfort_off_1@3x.png',
                        '1010': 'assets/img/scene_ic_eco_off_1@3x.png',
                        '1011': 'assets/img/scene_ic_stop_off_1@3x.png',
                    },
                    model: {
                        1: 'assets/img/scene_ic_listdone@3x.png',
                        2: 'assets/img/scene_ic_listloading@3x.png',
                        3: 'assets/img/scene_ic_listundo@3x.png'
                    },
                    washer: {
                        on: 'assets/img/scene_ic_power_off@3x.png',
                        off: 'assets/img/scene_ic_power_on@3x.png',
                        start: 'assets/img/scene_ic_stop_on@3x.png',
                        work: 'assets/img/scene_ic_stop_on@3x.png',
                        pause: 'assets/img/scene_ic_start_on@3x.png',
                        standby: 'assets/img/scene_ic_start_on@3x.png',
                        idle: 'assets/img/scene_ic_start_on@3x.png',
                        powerDisabled: 'assets/img/scene_ic_power_off_1@3x.png',
                        statusDisabled: 'assets/img/scene_ic_start_off@3x.png'
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
                    sceneBg: {
                        1: '#4E69F7',
                        2: '#4E69F7',
                        3: '#FFB632',
                        4: '#4E69F7',
                    }
                },
                indicator: {
                    level: 1
                },
                unit: {
                    temperature: '℃',
                    percent: '%'
                },
                washerWaterData: {
                    x: { 
                        "value": ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
                        "label": ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',]
                    },
                    y: [{
                            "value": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            "title": "用水量",
                            "color": "#ffffff",
                            "background": "#ffffff"
                        }],
                    borderRadius: "3",
                    description: "",
                    // background: "#4E69F7",
                    legend: {
                        "position": "TOP_CENTER",
                        "orientation": "HORIZONTAL",
                        "show": false
                    },
                    unit: { "x": "日期", "y": "", }
                },
                washerPowerData: {
                    x: {
                        "value": ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
                        "label": ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',]
                    },
                    y: [{
                        "value": [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
                        "title": "用电量",
                        "color": "#ffffff",
                        "background": "#ffffff"
                    }],
                    background: "#4E69F7",
                    borderRadius: "3",
                    description: "",
                    legend: {
                        "position": "TOP_LEFT",
                        "orientation": "HORIZONTAL",
                        "show": false
                    },
                    unit: {
                        "x": "日期",
                        "y": "",
                        // "y": "单位:度"
                    }
                },
                hasUseableDevice: '',
                hasWasherPowerData: false,
                hasWasherWaterData: false,
                washerPowerDesc: {
                    on: '已开机',
                    off: '已关机'
                },
                washerPower: 'powerDisabled',//洗衣机电源状态（开机关机）
                washerRunningStatus: 'statusDisabled',//洗衣机运行状态
                washerStatus: {//机器要成为的状态
                    on: '关机',
                    off: '开机',
                    powerDisabled: '电源',
                    start: '暂停',
                    work: '暂停',
                    pause: '启动',
                    standby: '启动',
                    idle: '启动',
                    statusDisabled: ''
                },
                activeModeDevices: [],
                applianceList: {},
                showToastDialog: false,
                showModelToastDialog: false,
                userSupportDevices: [],
                showMall: false,
                weatherDesc: '',
                sceneDevices: [],
                modelDeviceList: [],
                checkQuickOptimizeTimes: 0,
                checkModelExeTimes: 0,
                hasWasher: true,
                network: true,
                queryStatusCount: 0
            }
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            goSetting(){
                if (this.sceneId !== '') {
                    let params = {
                        homegroupId: this.homegroupId,
                        roomType: this.roomType,
                        sceneId: this.sceneId,
                    }
                    this.goTo('setting', {}, params)
                }else{
                    nativeService.toast('该场景暂无设备信息')
                }
            },
            closeToastDialog(){
                this.showToastDialog = false
            },
            buyShampoo(){
                this.goTo('buyShampoo')
            },
            initData(){
                nativeService.getNetworkStatus().then((result)=>{
                    if (result.status == 1 ){
                        if (this.sceneId !== ''){
                            this.getSupportDevices().then((res)=>{
                                if (res.applianceList.length == 0) {
                                    this.hasUseableDevice = false
                                }else{
                                    this.hasUseableDevice = true
                                                
                                    this.getSceneDetail().then(()=>{
                                        if (this.scene.applianceList.length <= 0 ) {
                                            nativeService.toast('无法获取相关数据，点击右上角设置设备')
                                        }
                                        if (this.roomType == 4){
                                            this.hasWasherWaterData = false
                                            this.hasWasherPowerData = false
                                            if ( this.scene.applianceList.length > 0) {
                                                this.hasWasher = true
                                                this.washerCode = this.scene.applianceList[0].applianceCode || ''
                                                this.getWashData()
                                                this.luaQueryStatus()
                                            }else{
                                                this.hasWasher = false
                                            }
                                        }
                                    }).catch((err)=>{
                                        nativeService.toast(this.getErrorMessage(err))
                                    })
                                }
                            })
                        }else{
                            this.hasUseableDevice = false
                        }
                    }else if(result.status == 0){
                        this.hasUseableDevice = true //为了兼容没有网络时的显示，将hasUseableDevice设为true
                        this.network = false
                    }
                })
            },
            getSceneDetail(){
                return new Promise((resolve, reject)=>{
                    this.checkLogin().then( (res) => {
                        this.isOwner = res.isOwner
                        if (this.sceneId !== '') {
                            let reqUrl = url.scene.detail
                            let reqParams = {
                                homegroupId: res.homegroupId,
                                sceneId: this.sceneId
                            }
                            
                            this.webRequest(reqUrl, reqParams).then( (res) => {
                                if (res.code == '0') {
                                    this.scene = res.data
                                    if (res.data.indicator) {
                                        this.indicator = res.data.indicator
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
                        }else{
                            nativeService.toast('该场景暂无设备信息')
                        }
                    }).catch((err)=>{
                        nativeService.toast(this.getErrorMessage(err))
                    })
                })
            },
            quickOptimize(){
                this.checkLogin().then( (res) => {
                    if (this.sceneId !== '') {
                        let reqUrl = url.scene.optimize
                        let reqParams = {
                            homegroupId: res.homegroupId,
                            sceneId: this.sceneId,
                        }
                        this.webRequest(reqUrl, reqParams).then((res)=>{
                            if (res.code == 0) {
                                this.checkQuickOptimizeTimes = 0
                                this.checkQuickOptimize(res.data.resultId)
                            }else if (res.code == 1711){
                                nativeService.toast(res.msg, 3)
                            }else{
                                if (codeDesc.scene.hasOwnProperty(res.code)) {
                                    nativeService.toast(codeDesc.scene[res.code], 3)
                                }else{
                                    nativeService.toast(res.msg, 3)
                                }
                            }
                        }).catch((err)=>{
                            nativeService.toast(this.getErrorMessage(err), 3)
                        })
                    }else{
                        nativeService.toast('该场景暂无设备信息')
                    }
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            },
            checkQuickOptimize(resultId){
                // status 1-成功，2-执行中，3-失败
                this.checkLogin().then( (res) => {
                    if (this.checkQuickOptimizeTimes < 30) {
                        this.checkQuickOptimizeTimes += 1
                        let reqUrl = url.scene.optimizeStatus
                        let reqParams = {
                            homegroupId: res.homegroupId,
                            sceneId: this.sceneId,
                            resultId: resultId
                        }
                        this.webRequest(reqUrl, reqParams, false).then((res)=>{
                            if (res.code == 0) {
                                this.showToastDialog = true
                                this.sceneDevices = res.data.list

                                if (res.data.status == 2) {
                                    setTimeout(()=>{
                                        this.checkQuickOptimize(resultId)
                                    },1000)
                                } else if (res.data.status == 3){
                                    this.showToastDialog = false
                                    nativeService.toast('一键优化执行失败，请再试一次')
                                } else {
                                    setTimeout(()=>{
                                        this.showToastDialog = false
                                        this.initData()
                                        setTimeout(()=>{
                                            nativeService.toast('执行成功!')

                                        },200)
                                    },1000)
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
                    }else{
                        this.showToastDialog = false
                        nativeService.toast('一键优化执行失败，请再试一次')
                    }
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            },
            executeModel(modelId){
                if (this.scene.applianceList && this.scene.applianceList.length > 0) {
                    this.checkLogin().then( (res) => {
                        let reqUrl = url.scene.modelExecute
                        let reqParams = {
                            homegroupId: res.homegroupId,
                            sceneId: this.sceneId,
                            modelId: modelId
                        }
                        this.webRequest(reqUrl, reqParams).then((res)=>{
                            if (res.code == 0) {
                                this.checkModelExeTimes = 0
                                this.checkModelExe(res.data.resultId, modelId)
                                // nativeService.toast('执行成功！')
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
            checkModelExe(resultId, modelId){
                this.checkLogin().then( (res) => {
                    if (this.checkModelExeTimes < 30) {
                        this.checkModelExeTimes += 1
                        let reqUrl = url.scene.modelStatus
                        let reqParams = {
                            homegroupId: res.homegroupId,
                            sceneId: this.sceneId,
                            modelId: modelId,
                            resultId: resultId
                        }
                        this.webRequest(reqUrl, reqParams, false).then((res)=>{
                            if (res.code == 0) {
                                this.showModelToastDialog = true
                                this.modelDeviceList = res.data.list

                                if (res.data.status == 2) {
                                    setTimeout(()=>{
                                        this.checkModelExe(resultId, modelId)
                                    },1000)
                                } else if (res.data.status == 3){
                                    this.showModelToastDialog = false
                                    nativeService.toast('执行失败，请再试一次')
                                } else {
                                    this.showModelToastDialog = false
                                    this.initData()
                                    setTimeout(()=>{
                                        nativeService.toast('场景模式执行成功!')
                                    },1000)
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
                    }else{
                        this.showModelToastDialog = false
                        nativeService.toast('执行失败，请再试一次')
                    }
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            },
            getWeatherInfo(){
                nativeService.getGPSInfo({
                    desiredAccuracy: "10",
                    distanceFilter: "10",
                    alwaysAuthorization: "0" 
                }).then((gps)=>{
                    nativeService.getCityInfo({cityName: gps.city}).then( (city)=>{
                        nativeService.getWeatherInfo({cityNo: city.cityNo}).then((weather)=>{
                            let tmpDesc = gps.district || gps.city
                            if (weather.weatherStatus) {
                                tmpDesc += '  今天' + weather.weatherStatus
                            }
                            if (weather.grade) {
                                tmpDesc += ' , 气温' + weather.grade + '℃'
                            }
                            this.weatherDesc = tmpDesc || '无法获取天气城市的信息'
                        }).catch(()=>{
                            this.weatherDesc = '无法获取天气城市的信息'
                        })
                    }).catch((err)=>{
                        this.weatherDesc = '获取天气城市出错'
                    })
                }).catch((err)=>{
                    this.weatherDesc = '无法获取天气城市，请检查是否开启定位服务'
                })
            },
            getWashData(){
                this.checkLogin().then( (res) => {
                    if (this.washerCode) {
                        let reqUrl = url.scene.washerConsumption
                        let reqParams = {
                            homegroupId: res.homegroupId,
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
                                            tmpPowerYValue[i] = Number(result[i].powerConsumption)/1000
                                            tmpPowerYLabel[i] = Number(result[i].powerConsumption)/1000
                                        }
                                    }

                                    tmpWaterYValue[i] = 0
                                    tmpWaterYLabel[i] = 0
                                    if (result[i].waterConsumption && result[i].waterConsumption != '') {
                                        tmpWaterYValue[i] = Number(result[i].waterConsumption)/10
                                        tmpWaterYLabel[i] = Number(result[i].waterConsumption)/10
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
                return new Promise((resolve, reject)=>{
                    let self = this;
                    let params = {
                        params:{}, 
                        operation: 'luaQuery',
                        applianceId: String(self.washerCode)
                    }
                    nativeService.sendLuaRequest(params, true).then(function(luaData) {
                        self.setWasherStatus(luaData)
                        resolve(luaData)
                    },function(error) {
                        let luaCode = String(error.errorCode).slice(2,6)
                        if (Object.keys(luaDesc).indexOf(luaCode) > -1) {
                            nativeService.toast(luaDesc[luaCode])
                        }else{
                            nativeService.toast('查询洗衣机状态失败,请稍后重试')
                        }
                    })
                })
            },
            setWasherStatus(luaData){
                this.washerPower = luaData.result.power
                if (this.washerPower == 'on') {
                    this.washerRunningStatus = luaData.result.running_status
                }
            },
            powerOnOff(){//控制阳台场景洗衣机的开启关闭
                let self = this;
                if (this.hasWasher) {
                    if (['on','off'].indexOf(this.washerPower) > -1) {
                        let poweronoff = this.washerPower=='off' ? "on" : "off"
                        let aimText = this.washerPower=='off' ? "开机" : "关机"
                        let params = {
                            operation: "luaControl",
                            applianceId:  String(self.washerCode),
                            params: { "power": poweronoff },
                        }
                        nativeService.sendLuaRequest(params,true).then(function() {
                            self.luaQueryStatus().then((luaData)=>{
                                if (luaData.result.power == 'on') {
                                    nativeService.toast('已开启电源')
                                }
                                if (luaData.result.power == 'off') {
                                    nativeService.toast('已关闭电源')
                                }
                            })
                        },function(error) {
                            nativeService.toast(aimText + '失败，请稍后重试')
                            // nativeService.toast('改变洗衣机状态时遇到了问题 \n[错误码：' + error.errorCode +']')
                        })
                    }else{
                        nativeService.toast('切换电源失败，请稍后重试')
                    }
                }else{
                    nativeService.toast('未绑定洗衣机，请绑定后重试')
                }
            },
            controlStartPause(){//控制阳台场景洗衣机的启动暂停
                let self = this;
                
                if( self.washerRunningStatus == "start" || self.washerRunningStatus == "work") {
                    let params = {
                        operation:"luaControl",
                        applianceId: String(self.washerCode),
                        params:{ "control_status": "pause" }
                    }
                    this.queryStatusCount = 0
                    nativeService.sendLuaRequest(params, true).then(function() {
                        nativeService.showLoading()
                        var countQuery = setInterval(()=>{
                            self.queryStatusCount++
                        }, 1000)
                        if (self.queryStatusCount < 10) {
                            setTimeout(()=>{
                                self.callLuaQuery()
                            },1000)
                        }else{
                            clearInterval(countQuery)
                            nativeService.toast('洗衣机暂停失败')
                        }
                    },function(error) {
                        nativeService.toast('洗衣机暂停失败')
                        // nativeService.toast('改变洗衣机状态时遇到了问题 \n[错误码：' + error.errorCode +']')
                    })
                } else {//runnig_status不等于start和work就可以发start命令
                    let params = {
                        operation: "luaControl",
                        applianceId: String(self.washerCode),
                        params: { control_status: "start" }
                    }
                    nativeService.sendLuaRequest(params,true).then(function(luaData) {
                        nativeService.showLoading()
                        setTimeout(()=>{
                            self.luaQueryStatus().then((luaData)=>{
                                nativeService.hideLoading()
                                if (luaData.result.running_status == 'start' || luaData.result.running_status == 'work') {
                                    nativeService.toast('洗衣机启动成功')
                                }else{
                                    nativeService.toast('洗衣机启动失败')
                                }
                            })
                        },1000)
                    },function(error) {
                        // nativeService.toast('洗衣机启动失败 \n[错误码：' + error.errorCode +']')
                        nativeService.toast('洗衣机启动失败')
                    });
                }
            },
            callLuaQuery(){
                this.luaQueryStatus().then((luaData)=>{
                    if (luaData.result.running_status != 'start' || luaData.result.running_status != 'work') {
                        nativeService.toast('洗衣机暂停成功')
                    }else{
                        setTimeout(()=>{
                            this.callLuaQuery()
                        },1000)
                    }
                })
            },
            getSupportDevices(){//获取此房间可绑定的设备以及该房间的指标数据（温度、湿度、水温、人数等）
                return new Promise((resolve,reject)=>{
                    this.checkLogin().then( (res) => {
                        let reqUrl = url.scene.supportList
                        let reqParams = {
                            homegroupId: res.homegroupId,
                            sceneId: this.sceneId
                        }
                        this.webRequest(reqUrl, reqParams).then((res)=>{
                            if (res.code == 0) {
                                resolve(res.data)
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
            jumpAddDevicePage(){
                 nativeService.jumpNativePage({
                    "pageName": "addDevice", //跳转到登录界面
                    "data": {}
                })
            }
        },
        created(){
            this.roomType = nativeService.getParameters('roomType')

            if (this.roomType == 1){
                this.scene.modeList = [
                    { modelName: '回家', modelId: '1001' },
                    { modelName: '舒适', modelId: '1002' },
                    { modelName: '节能', modelId: '1003' },
                    { modelName: '全关', modelId: '1004' },
                ]
                
                nativeService.burialPoint({//埋点客厅
                    pageName: 'sceneMainPage',
                    actionType: 'scene',
                    subAction: 'scene_livingroom_operate'
                })
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
            }else if (this.roomType == 4) {
                this.getWeatherInfo()

                nativeService.burialPoint({//埋点洗衣机用水
                    pageName: 'sceneMainPage',
                    actionType: 'scene',
                    subAction: 'scene_balcony_water_operate'
                })
                nativeService.burialPoint({//埋点洗衣机用电
                    pageName: 'sceneMainPage',
                    actionType: 'scene',
                    subAction: 'scene_balcony_electric_operate'
                })
            }

            this.homegroupId = nativeService.getParameters('homegroupId')
            this.sceneId = nativeService.getParameters('sceneId') || ''
        }
    }
</script>
