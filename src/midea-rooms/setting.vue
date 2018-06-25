<template>
    <div>
        <midea-header :title="header.title" :bgColor="header.bgColor" :titleText="header.color" :leftImg="header.leftImg" @leftImgClick="goBack"></midea-header>
        <sroller class="scroller" :style="scrollerStyle">
            <text class="hd">关联设备</text>
            <div class="block">
                <div v-for="(group, groupIdx) in userSupportDevices">
                    <midea-list v-if="userSupportDevices.length > 0" style="background-color:#fff" v-for="(device,idx) in group" :idx="1" :hasWrapBorder="false" leftMargin="25px">
                        <check-item v-if="group.length == 1" :title="device.applianceName" :status="device.isRelation == 1" @itemClick="bindSceneAppliance(device, groupIdx)"></check-item>
                        <check-item v-else :title="device.applianceName" mode="radio" :status="device.isRelation == 1" @itemClick="bindGroupDevice(device, groupIdx)"></check-item>
                    </midea-list>
                </div>
            </div>
            <div class="block" v-if="sceneType == 1 || sceneType == 2">
                <div class="range-block">
                    <div class="row-sb range-hd">
                        <text class="text">适宜温度</text>
                        <text class="text range-value">{{temperatureRange.min}}℃ - {{temperatureRange.max}}℃</text>
                    </div>
                    <div class="range-bd">
                        <midea-range :wrapWidth="700" unit="℃" :min="18" :max="30" :rangeMin="temperatureRange.min" :rangeMax="temperatureRange.max" @minClicked="showPropPop('temperatureMin')" @maxClicked="showPropPop('temperatureMax')"></midea-range>
                    </div>
                </div>
                <div class="range-block">
                    <div class="row-sb range-hd">
                        <text class="text">适宜湿度</text>
                        <text class="text range-value">{{humidityRange.min}}% - {{humidityRange.max}}%</text>
                    </div>
                    <div class="range-bd" @click="showPropPop('humidity')">
                        <midea-range :wrapWidth="700" unit="%" :min="10" :max="90" :rangeMin="humidityRange.min" :rangeMax="humidityRange.max" @minClicked="showPropPop('humidityMin')" @maxClicked="showPropPop('humidityMax')"></midea-range>
                    </div>
                </div>
            </div>
            <div class="block" v-if="sceneType == 3">
                <midea-list style="background-color:#fff" v-for="(prop,i) in scenePropFormat" :idx="i" :hasWrapBorder="false" leftMargin="25px">
                    <midea-cell :title="sceneName[prop.key]" :rightText="prop.value" :hasArrow="true" :clickActivied="true" @mideaCellClick="showPropPop(prop.key)" :hasBottomBorder="false" :cellStyle="{paddingLeft: '0'}"></midea-cell>
                </midea-list>
            </div>
        </sroller>
        <!-- 客厅/卧室场景指标弹窗 -->
        <div v-if="sceneType == 1 || sceneType == 2">
            <midea-popup :show="show.temperatureMin" :height="400" @mideaPopupOverlayClicked="closePropPop('temperatureMin')">
                <div class="row-sb pop-hd">
                    <text class="pop-text" @click="cancelProp('temperatureMin')">取消</text>
                    <text class="pop-text" @click="confirmProp('temperatureMin')">确定</text>
                </div>
                <scroll-picker :listArray="temperatureMinList" @onChange="setTemperatureMin"></scroll-picker>
            </midea-popup>
            <midea-popup :show="show.temperatureMax" :height="400" @mideaPopupOverlayClicked="closePropPop('temperatureMax')">
                <div class="row-sb pop-hd">
                    <text class="pop-text" @click="cancelProp('temperatureMax')">取消</text>
                    <text class="pop-text" @click="confirmProp('temperatureMax')">确定</text>
                </div>
                <scroll-picker :listArray="temperatureMaxList" @onChange="setTemperatureMax"></scroll-picker>
            </midea-popup>
            <midea-popup :show="show.humidityMin" :height="400" @mideaPopupOverlayClicked="closePropPop('humidityMin')">
                 <div class="row-sb pop-hd">
                    <text class="pop-text" @click="cancelProp('humidityMin')">取消</text>
                    <text class="pop-text" @click="confirmProp('humidityMin')">确定</text>
                </div>
                <div class="row-sb">
                    <scroll-picker :listArray="humidityMinList" @onChange="setHumidityMin"></scroll-picker>
                </div>
            </midea-popup>
            <midea-popup :show="show.humidityMax" :height="400" @mideaPopupOverlayClicked="closePropPop('humidityMax')">
                 <div class="row-sb pop-hd">
                    <text class="pop-text" @click="cancelProp('humidityMax')">取消</text>
                    <text class="pop-text" @click="confirmProp('humidityMax')">确定</text>
                </div>
                <div class="row-sb">
                    <scroll-picker :listArray="humidityMaxList" @onChange="setHumidityMax"></scroll-picker>
                </div>
            </midea-popup>
        </div>
        <!-- 卫浴场景指标弹窗 -->
        <div v-if="sceneType == 3">
            <midea-popup :show="show.comfortable" :height="400" @mideaPopupOverlayClicked="closePropPop('comfortable')">
                <div class="row-sb pop-hd">
                    <text class="pop-text" @click="cancelProp('comfortable')">取消</text>
                    <text class="pop-text" @click="confirmProp('comfortable')">确定</text>
                </div>
                <scroll-picker :listArray="comfortableList" @onChange="setComfortableValue"></scroll-picker>
            </midea-popup>
            <midea-popup :show="show.save" :height="400" @mideaPopupOverlayClicked="closePropPop('save')">
                <div class="row-sb pop-hd">
                    <text class="pop-text" @click="cancelProp('save')">取消</text>
                    <text class="pop-text" @click="confirmProp('save')">确定</text>
                </div>
                <scroll-picker :listArray="saveList" @onChange="setSaveValue"></scroll-picker>
            </midea-popup>
            <midea-popup :show="show.use" :height="400" @mideaPopupOverlayClicked="closePropPop('use')">
                <div class="row-sb pop-hd">
                    <text class="pop-text" @click="cancelProp('use')">取消</text>
                    <text class="pop-text" @click="confirmProp('use')">确定</text>
                </div>
                <scroll-picker :listArray="useList" @onChange="setUseValue"></scroll-picker>
            </midea-popup>
        </div>
    </div>
</template>

<style>
    .wrap  { padding:30px; }
    .row-s { flex-direction: row; align-items: center; justify-content: flex-start; }
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .row-sa{ flex-direction: row; align-items: center; justify-content: space-around; }
    .row-e { flex-direction: row; align-items: center; justify-content: flex-end; }
    .scroller{ background-color: #F2F2F2; }
    .block{ margin-bottom: 25px; }
    .range-block{ background-color: #fff; }
    .hd{ padding: 40px; font-size: 28px; color: #777;}
    .text{ font-size: 28px; }
    .pop-text{ font-size: 30px; color: #007AFF; padding: 25px; }
    .range-block{ margin-bottom: 25px;}
    .range-hd{ border-bottom-color: #e5e5e5; border-bottom-width: 2px; border-bottom-style: solid; margin-left: 25px; padding-top: 30px; padding-bottom: 30px; padding-right: 25px; }
    .range-bd{ padding: 25px; }
    .range-value{ color: #666; }
</style>

<script>
    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import mideaCell from '@/component/cell.vue'
    import MideaHeader from '@/midea-component/header.vue'
    import MideaPopup from '@/midea-component/popup.vue'
    import checkItem from '@/midea-rooms/components/checkItem.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
    import scrollPicker from '@/midea-rooms/components/scrollPicker.vue'
    import mideaRange from '@/midea-rooms/components/range.vue'

    import { url } from './config/config.js'

    export default {
        components:{ mideaCell, MideaHeader, MideaPopup, checkItem, mideaList, scrollPicker, mideaRange },
        computed:{
        },
        mixins: [base],
        computed:{
            scrollerStyle(){
                let tmp = {
                    height: this.pageHeight+'px'
                }
                return tmp
            },
            temperatureMinList(){
                let min = 18, max = Number(this.temperatureRange.max)
                return this.generateListArray(min, max) 
            },
            temperatureMaxList(){
                let min = Number(this.temperatureRange.min), max = 30
                return this.generateListArray(min, max)
            },
            humidityMinList(){
                let min = 10, max = Number(this.humidityRange.max)
                return this.generateListArray(min, max)
            },
            humidityMaxList(){
                let min = Number(this.humidityRange.max), max = 90
                return this.generateListArray(min, max)
            },
            comfortableList(){
                let min = Number(this.sceneProp.save), max = 80
                return this.generateListArray(min, max)
            },
            saveList(){
                let min = 40, max = Number(this.sceneProp.save)
                return this.generateListArray(min, max)
            },
            useList(){
                return this.generateListArray(1, 20)
            }
        },
        data(){
            return {
                header: {
                    title: '设置',
                    bgColor: '#fff',
                    color: '#111',
                    leftImg: 'assets/img/b.png'
                },
                userSupportDevices: [],
                temperatureRange: {},
                humidityRange: {},
                sceneProp: {
                    "temperatureRange": "18,30",
                    "pm25": "75",
                    "pm25Range": "50,90",
                    "temperature": "28",
                    "humidity": "80",
                    "humidityRange": "10,90"
                },
                sceneProp: [
                    { key: 'temperature', value: '28,30' },
                    { key: 'humidity', value: '10,80' },
                    { key: 'comfortable', value: '70' },
                    { key: 'use', value: '3' },
                    { key: 'save', value: '60' },
                ],
                sceneName: {
                    temperature: '适宜温度',
                    humidity: '适宜湿度',
                    comfortable: '适宜水温',
                    save: '省电水温',
                    use: '使用人数'
                },
                show: {
                    temperatureMin: false,
                    temperatureMax: false,
                    humidityMin: false,
                    humidityMax: false,
                    comfortable: false,
                    save: false,
                    use: false
                },
                activeProp: {
                    temperatureMin: '',
                    temperatureMax: '',
                    humidityMin: '',
                    humidityMax: '',
                    comfortable: '',
                    save: '',
                    use: '',  
                },
                activeGroupDevice: {}
            }
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            generateListArray(min, max){
                let tmp = []
                let len  = max-min+1
                for (let i=0; i<len; i++){
                    tmp[i] = { index: i, value: i+min }
                }
                return tmp
            },
            itemChecked(e) {
                this.checkedList = e.checkedList;
            },
            getSupportDevices(){
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
            formatUserSupportDevices(applianceList){
            // formatUserSupportDevices(){
                // let applianceList = [
                //     {
                //         "applianceName": "test设备FA xxxxxxx",
                //         "applianceType": "0xFA",
                //         "applianceCode": 21990232670864,
                //         "isRelation": 1
                //     },
                //     {
                //         "applianceName": "test设备FA xxssxxxxx",
                //         "applianceType": "0xFA",
                //         "applianceCode": 21990232670864,
                //         "isRelation": 2
                //     },
                //     {
                //         "applianceType": "0xAC",
                //         "applianceCode": 21990232670962,
                //         "isRelation": 1
                //     },
                //     {
                //         "applianceName": "加湿器0008",
                //         "applianceType": "0xFD",
                //         "applianceCode": 1099511810436,
                //         "isRelation": 1
                //     },
                //     {
                //         "applianceName": "净化器0513",
                //         "applianceType": "0xFC",
                //         "applianceCode": 1099511810483,
                //         "isRelation": 1
                //     }
                // ]
                let typeArray = [], typeObj = {}, tmp = []
                for (let i=0;i<applianceList.length; i++){
                    let typeName = applianceList[i].applianceType
                    if(typeArray.indexOf(typeName) == -1){
                        typeArray.push(typeName)
                    }
                }
                for (let j=0; j<typeArray.length; j++) {
                    typeObj[typeArray[j]] = []
                }
                for (var k=0;k<applianceList.length; k++){
                    typeObj[applianceList[k].applianceType].push(applianceList[k])
                }
                for (var x in typeObj){
                    tmp.push(typeObj[x])
                }
                return tmp
            },
            filttAllowedDevices(supportDevice){//过滤出该场景支持的设备, 应该用不上了
                // return this.userDevices.filter( (v) => {
                //     return supportDevice.indexOf(v) > -1
                // })
                let tmpArray = []
        
                for (var i=0; i<this.userDevices.length; i++ ){
                    for( var j=0; j<supportDevice.length;j++ ){
                        if (this.userDevices[i].deviceType == supportDevice[j].type){
                            tmpArray.push(this.userDevices[i])
                        }
                    }
                }
                return tmpArray
            },
            jsonToArray(jsonObj){
                var tmp= []
                for (var key in jsonObj) {
                    if ( key.indexOf('Range') == -1 ){
                        tmp.push( {key:key,value: jsonObj[key]} );
                    }
                }
                return tmp
            },
            bindGroupDevice(appliance, index){//绑定同品类数量大于1的设备，radio类型
                if (appliance.isRelation == 1) {
                    this.deleteSceneAppliance(appliance.applianceCode).then((res)=>{
                        // this.userSupportDevices[appliance.applianceType][index].isRelation = 2
                    }).catch((err)=>{
                        nativeService.alert(err)
                    })
                }else if (appliance.isRelation == 2) {
                    this.addSceneAppliance(appliance.applianceCode).then((res)=>{
                        // this.userSupportDevices[appliance.applianceType][index].isRelation = 1
                        
                    }).catch((err)=>{
                        nativeService.alert(err)
                    })
                }
              
            },
            bindSceneAppliance(appliance, groupIdx){//绑定同品类数量为1个的设备，checkbox类型
                if (appliance.isRelation == 1) {
                    this.deleteSceneAppliance(appliance.applianceCode).then((res)=>{
                        let tmp = this.userSupportDevices[groupIdx][0]
                        tmp.isRelation = 2
                        Vue.set( this.userSupportDevices[groupIdx], 0, tmp)
                        nativeService.alert(this.userSupportDevices)
                    }).catch((err)=>{
                        nativeService.alert(err)
                    })
                }else if (appliance.isRelation == 2) {
                    this.addSceneAppliance(appliance.applianceCode).then((res)=>{
                        let tmp = this.userSupportDevices[groupIdx][0]
                        tmp.isRelation = 1
                        Vue.set( this.userSupportDevices[groupIdx], 0, tmp)
                        nativeService.alert(this.userSupportDevices)
                    }).catch((err)=>{
                        nativeService.alert(err)
                    })
                }
            },
            addSceneAppliance(applianceCode){
                return new Promise((resolve,reject)=>{
                    let reqUrl = url.scene.applianceAdd
                    let reqParams = {
                        uid: this.uid,
                        homegroupId: this.homegroupId,
                        sceneId: this.sceneId,
                        applianceCode: applianceCode
                    }
                    
                    this.webRequest(reqUrl, reqParams).then((res)=>{
                        if (res.code == 0) {
                            resolve(res)
                        }else{
                            reject()
                        }
                    }).catch( (err )=>{
                        reject(err)
                    })
                })
            },
            deleteSceneAppliance(applianceCode){
                return new Promise((resolve,reject)=>{
                    let reqUrl = url.scene.applianceDelete
                    let reqParams = {
                        uid: this.uid,
                        homegroupId: this.homegroupId,
                        sceneId: this.sceneId,
                        applianceCode: applianceCode
                    }
                    this.webRequest(reqUrl, reqParams).then((res)=>{
                        if (res.code == 0) {
                            resolve(res)
                        }else{
                            reject()
                        }
                    }).catch( (err )=>{
                        reject(err)
                    })
                })
            },
            showPropPop(propType){
                this.show[propType] = true
            },
            closePropPop(propType){
                this.show[propType] = false
            },
            cancelProp(propType){
                this.activeProp[propType] = ''
                this.closePropPop(propType)
            },
            confirmProp(propType){
                let reqUrl = url.scene.modelSet
                let reqParams = {
                    uid: this.uid,
                    homegroupId: this.homegroupId,
                    sceneId: this.sceneId
                }
                if (this.sceneType == 1 || this.sceneType == 2) {
                    switch(propType) {
                        case 'temperatureMin':
                            this.temperatureRange.min = this.activeProp[propType]
                            break;
                        case 'temperatureMax':
                            this.temperatureRange.max = this.activeProp[propType]
                            break;
                        case 'humidityMin':
                            this.humidityRange.min = this.activeProp[propType]
                            break;
                        case 'humidityMax':
                            this.humidityRange.max = this.activeProp[propType]
                            break;
                    }
                    
                    let tmpTemp = {
                        min: this.activeProp.temperatureMin || this.temperatureRange.min,
                        max: this.activeProp.temperatureMax || this.temperatureRange.min
                    }

                    let tmpHumid = {
                        min :this.activeProp.humidityMin || this.humidityRange.min,
                        max: this.activeProp.humidityMax || this.humidityRange.min
                    }
                    reqParams.prop = JSON.stringify({
                        temperature: tmpTemp.min + ',' + tmpTemp.max,
                        humidity: tmpHumid.min + ',' + tmpHumid.max
                    })
                }else if( this.sceneType == 3 ){
                    this.sceneProp[propType] = this.activeProp[propType]

                    reqParams.prop = JSON.stringify({
                        comfortable: this.activeProp.comfortable || this.sceneProp.comfortable,
                        use: this.activeProp.use || this.sceneProp.use,
                        save: this.activeProp.save || this.sceneProp.save
                    })
                }
                
                this.webRequest(reqUrl, reqParams).then((res)=>{

                    this.closePropPop(propType)
                    if (res.code == 0) {
                        resolve(res.data)
                    }else{
                        reject(res.msg)
                    }
                }).catch( (err )=>{
                    reject(err)
                })
            },
            setTemperatureMin(result){
                this.activeProp.temperatureMin = result.value
            },
            setTemperatureMax(result){
                this.activeProp.temperatureMax = result.value
            },
            setHumidityMin(result){
                this.activeProp.humidityMin = result.value
            },
            setHumidityMax(result){
                this.activeProp.humidityMax = result.value
            },
            setComfortableValue(result){
                this.activeProp.comfortable = result.value
            },
            setSaveValue(result){
                this.activeProp.save = result.value
            },
            setUseValue(result){
                this.activeProp.use = result.value
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

                            nativeService.getItem('home', (res)=>{
                                let data = JSON.parse(res.data)
                                this.userDevices = data.deviceList

                                this.getSupportDevices().then((res)=>{
                                    // this.userSupportDevices = this.filttAllowedDevices(res.typeList)
                                    this.userSupportDevices = this.formatUserSupportDevices(res.applianceList)
                                    this.scenePropFormat = this.jsonToArray(res.prop)
                                    this.sceneProp = res.prop
                                    if ( this.sceneType == 1 || this.sceneType == 2 ){
                                        this.temperatureRange = {
                                            min: res.prop.temperature.split(',')[0],
                                            max: res.prop.temperature.split(',')[1]
                                        }
                                        this.humidityRange = {
                                            min: res.prop.humidity.split(',')[0],
                                            max: res.prop.humidity.split(',')[1]
                                        }
                                    }
                                })
                            })
                        }else{
                            nativeService.toast('获取用户家庭失败')
                        }
                    })
                }else{
                    nativeService.toast('获取用户身份失败')
                }
            })
                                    
            this.userSupportDevices = this.formatUserSupportDevices()

        }
    }
</script>

