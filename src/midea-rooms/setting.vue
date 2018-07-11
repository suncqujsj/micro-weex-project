<template>
    <div :style="wrapStyle">
        <midea-header :title="header.title" :bgColor="header.bgColor" :titleText="header.color" :leftImg="header.leftImg" @leftImgClick="goBack"></midea-header>
        <list class="scroller" :style="scrollerStyle">
            <cell>
                <div class="block"  style="background-color:#fff">
                    
                    <midea-list v-for="(item,idx) in userSupportDevices" :idx="idx" :hasWrapBorder="false" leftMargin="25px">
                        <check-item  :title="item.applianceName" :status="item.isRelation == 1" @itemClick="switchBindSceneDevice(item,idx)"></check-item>
                    </midea-list>
                </div>
                <div class="block" v-if="roomType == 1 || roomType == 2">
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
                <div class="block" v-if="roomType == 3">
                    <midea-list style="background-color:#fff" v-for="(prop,i) in scenePropFormat" :idx="i" :hasWrapBorder="false" leftMargin="25px">
                        <div class="row-sb set-item" @click="showPropPop(prop.key)">
                            <text class="text">{{sceneName[prop.key]}}</text>
                            <div class="row-e">
                                <text class="value-text">{{prop.value}}</text>
                                <text v-if="prop.key == 'comfortable' || prop.key == 'save'" class="value-text">℃</text>
                                <image class="next-icon" :src="icon.next"></image>
                            </div>
                        </div>
                    </midea-list>
                </div>
            </cell>
        </list>
        <!-- 客厅/卧室场景指标弹窗 -->
        <div v-if="roomType == 1 || roomType == 2">
            <midea-popup :show="show.temperatureMin" :height="400" @mideaPopupOverlayClicked="cancelProp('temperatureMin')">
                <div class="row-sb pop-hd">
                    <text class="pop-text" @click="cancelProp('temperatureMin')">取消</text>
                    <text class="pop-text" @click="confirmProp('temperatureMin')">确定</text>
                </div>
                <scroll-picker :listArray="temperatureMinList" @onChange="setTemperatureMin"></scroll-picker>
            </midea-popup>
            <midea-popup :show="show.temperatureMax" :height="400" @mideaPopupOverlayClicked="cancelProp('temperatureMax')">
                <div class="row-sb pop-hd">
                    <text class="pop-text" @click="cancelProp('temperatureMax')">取消</text>
                    <text class="pop-text" @click="confirmProp('temperatureMax')">确定</text>
                </div>
                <scroll-picker :listArray="temperatureMaxList" @onChange="setTemperatureMax"></scroll-picker>
            </midea-popup>
            <midea-popup :show="show.humidityMin" :height="400" @mideaPopupOverlayClicked="cancelProp('humidityMin')">
                 <div class="row-sb pop-hd">
                    <text class="pop-text" @click="cancelProp('humidityMin')">取消</text>
                    <text class="pop-text" @click="confirmProp('humidityMin')">确定</text>
                </div>
                <div class="row-sb">
                    <scroll-picker :listArray="humidityMinList" @onChange="setHumidityMin"></scroll-picker>
                </div>
            </midea-popup>
            <midea-popup :show="show.humidityMax" :height="400" @mideaPopupOverlayClicked="cancelProp('humidityMax')">
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
        <div v-if="roomType == 3">
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
    .wrap  { padding:30px;}
    .row-s { flex-direction: row; align-items: center; justify-content: flex-start; }
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .row-sa{ flex-direction: row; align-items: center; justify-content: space-around; }
    .row-e { flex-direction: row; align-items: center; justify-content: flex-end; }
    .scroller{ background-color: #F2F2F2; height: 1500px;}
    .block{ margin-bottom: 25px; }
    .range-block{ background-color: #fff; }
    .hd{ padding: 40px; font-size: 28px; color: #777;}
    .text{ font-size: 28px; }
    .pop-text{ font-size: 30px; color: #007AFF; padding: 25px; }
    .range-block{ margin-bottom: 25px;}
    .range-hd{ border-bottom-color: #e5e5e5; border-bottom-width: 2px; border-bottom-style: solid; margin-left: 25px; padding-top: 30px; padding-bottom: 30px; padding-right: 25px; }
    .range-bd{ padding: 25px; }
    .range-value{ color: #666; }
    .value-text{ color: #666; font-size: 28px;}
    .next-icon{width: 12px; height: 24px; margin-left: 20px;}
    .set-item{ padding-top: 25px; padding-bottom: 25px; padding-right: 25px;}
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
        mixins: [base],
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
            scrollerStyle(){
                let tmp = {
                    height: this.pageHeight+'px'
                }
                return tmp
            },
            temperatureMinList(){
                let min = 18, max = Number(this.temperatureRange.max)-1
                return this.generateListArray(min, max) 
            },
            temperatureMaxList(){
                let min = Number(this.temperatureRange.min)+1, max = 30
                return this.generateListArray(min, max)
            },
            humidityMinList(){
                let min = 10, max = Number(this.humidityRange.max)-1
                return this.generateListArray(min, max)
            },
            humidityMaxList(){
                let min = Number(this.humidityRange.min)+1, max = 90
                return this.generateListArray(min, max)
            },
            comfortableList(){
                let min = Number(this.sceneProp.save)+1, max = 80
                return this.generateListArray(min, max)
            },
            saveList(){
                let min = 40, max = Number(this.sceneProp.comfortable-1)
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
                icon: {
                    next: 'assets/img/more.png'
                },
                userSupportDevices: [],
                temperatureRange: {},
                humidityRange: {},
                sceneProp: {},
                sceneName: {
                    temperature: '适宜温度',
                    humidity: '适宜湿度',
                    comfortable: '舒适水温',
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
                activeGroupDevice: {},
                userDevices: {}
            }
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            initData(){
                this.uid = nativeService.getParameters('uid')
                this.homegroupId = nativeService.getParameters('homegroupId')
                this.sceneId = nativeService.getParameters('sceneId')
                this.roomType = nativeService.getParameters('roomType')
                this.userDevices = JSON.parse(decodeURIComponent(nativeService.getParameters('userDevices')))

                this.getSupportDevices().then((res)=>{
                    if (res.applianceList.length == 0) {
                        nativeService.toast('您在该场景下没有可以绑定的设备哦')
                        this.goBack()
                    }
                    this.userSupportDevices = res.applianceList
                    this.scenePropFormat = this.jsonToArray(res.prop)
                    this.sceneProp = res.prop

                    if ( this.roomType == 1 || this.roomType == 2 ){//初始化客厅/卧室的温度、湿度（可以被用户设置）
                        this.temperatureRange = {
                            min: this.sceneProp.temperature.split(',')[0],
                            max:this.sceneProp.temperature.split(',')[1]
                        }
                        this.humidityRange = {
                            min: this.sceneProp.humidity.split(',')[0],
                            max: this.sceneProp.humidity.split(',')[1]
                        }
                    }
                })
            },
            generateListArray(min, max){
                let tmp = []
                let len  = max-min+1
                for (let i=0; i<len; i++){
                    tmp[i] = { index: i, value: i+min }
                }
                return tmp
            },
            getSupportDevices(){//获取此房间可绑定的设备以及该房间的指标数据（温度、湿度、水温、人数等）
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
            jsonToArray(jsonObj){
                var tmp= []
                for (var key in jsonObj) {
                    if ( key.indexOf('Range') == -1 ){
                        tmp.push( {key:key,value: jsonObj[key]} );
                    }
                }
                return tmp
            },
            switchBindSceneDevice(appliance, index){//解绑、绑定设备到房间
                let tmpDevice = this.userSupportDevices[index]
                
                if (appliance.isRelation == 1) {
                    this.deleteSceneAppliance(appliance.applianceCode).then((res)=>{
                        tmpDevice.isRelation = 2
                        this.userSupportDevices.splice(index, 1, tmpDevice)
                        nativeService.alert('解绑成功！')
                    })
                } else if (appliance.isRelation == 2) {
                    this.addSceneAppliance(appliance.applianceCode).then((res)=>{
                        tmpDevice.isRelation = 1
                        this.userSupportDevices.splice(index, 1, tmpDevice)
                        this.reload()
                        nativeService.toast('绑定成功！')
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
                            let codeMsg = {
                                1000: '未知系统错误',
                                1002: '参数为空',
                                1105: '账户不存在',
                                1200: '用户不在家庭',
                                1202: '用户不是家庭的管理员',
                                1212: '房间不在家庭里面',
                                1300: '设备不存在',
                                1305: '用户不是设备的管理员'
                            }
                            nativeService.alert(codeMsg[res.code])
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
                /*
                1.scrollPick-> set ActiveProp 
                    * scrollPick只有一个值的时候，无法选中这个值，将scrollPick里的值直接赋给activeProp
                    * 
                2.comfirmPop -> sendRequest
                */
                if (this.roomType == 1 || this.roomType == 2) {
                    if (propType == 'temperatureMin') {
                        if (this.temperatureMinList.length == 1) {
                           this.activeProp[propType] = this.temperatureMinList[0].value
                        } else {
                            if ( !this.activeProp[propType]) {
                                nativeService.alert('您还没有设置属性值哦')
                                return
                            }
                        }
                    }
                    if (propType == 'temperatureMax') {
                        if (this.temperatureMaxList.length == 1) {
                           this.activeProp[propType] = this.temperatureMaxList[0].value
                        } else {
                            if ( !this.activeProp[propType]) {
                                nativeService.alert('您还没有设置属性值哦')
                                return
                            }
                        }
                    }
                    if (propType == 'humidityMin') {
                        if (this.humidityMinList.length == 1) {
                           this.activeProp[propType] = this.humidityMinList[0].value
                        } else {
                            if ( !this.activeProp[propType]) {
                                nativeService.alert('您还没有设置属性值哦')
                                return
                            }
                        }
                    }
                    if (propType == 'humidityMax') {
                        if (this.humidityMaxList.length == 1) {
                            this.activeProp[propType] = this.humidityMaxList[0].value
                        } else {
                            if ( !this.activeProp[propType]) {
                                nativeService.alert('您还没有设置属性值哦')
                                return
                            }
                        }
                    }
                    
                    let tmpTemp = {
                        min: this.activeProp.temperatureMin || this.temperatureRange.min,
                        max: this.activeProp.temperatureMax || this.temperatureRange.max
                    }
                    let tmpHumid = {
                        min :this.activeProp.humidityMin || this.humidityRange.min,
                        max: this.activeProp.humidityMax || this.humidityRange.max
                    }
                    reqParams.prop = JSON.stringify({
                        temperature: tmpTemp.min + ',' + tmpTemp.max,
                        humidity: tmpHumid.min + ',' + tmpHumid.max
                    })
                }else if( this.roomType == 3 ){
                    let propTypeList = propType + 'List'
                    if (this[propTypeList].length == 1) {
                        this.activeProp[propType] = this[propTypeList][0].value
                    } else if (!this.activeProp[propType]){
                        nativeService.alert('您还没有设置属性值哦')
                        return
                    }
                    reqParams.prop = JSON.stringify({
                        use: this.activeProp.use || this.sceneProp.use,
                        comfortable: this.activeProp.comfortable || this.sceneProp.comfortable,
                        save: this.activeProp.save || this.sceneProp.save,
                    })
                }
                this.webRequest(reqUrl, reqParams).then((res)=>{
                    this.closePropPop(propType)
                    if (res.code == 0) {
                        setTimeout(()=>{
                            nativeService.alert('修改成功！')
                            this.reload()
                        },500)
                    }else{
                        let codeMsg = {
                            "1000": "未知系统错误",
                            "1001": "参数格式错误",
                            "1002": "参数为空",
                            "1003": "参数类型不支持",
                            "1105": "账户不存在",
                            "1202": "用户不是家庭的管理员",
                            "1701": "场景不存在"
                        }
                        nativeService.alert(codeMsg[res.code])
                    }
                }).catch( (err )=>{
                    nativeService.alert('设置场景属性失败')
                })
            },
        },
        created(){
            this.initData()
        }
    }
</script>

