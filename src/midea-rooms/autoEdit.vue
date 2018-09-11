<template>
   <div class="wrap" :style="wrapStyle">
       <div class="header-floor">
            <midea-header :title="autoDetail.name" :isImmersion="isImmersion" :bgColor="header.bgColor" :titleText="header.color" @leftImgClick="goBack" :showRightText="isOwner=='1' ? true : false" rightText="删除" @rightTextClick="showDialog('delete')"></midea-header>
       </div>
        <list class="content-list">
            <cell class="content">
                <div>
                    <div class="content-hd">
                        <div class="row-sb auto-name-floor"  @click="goSetAutoName">
                            <text class="text">名称</text>
                            <div class="row-sb">
                                <text class="auto-name-text">{{autoName}}</text>
                               <image v-if="isOwner == '1'" class="icon-next" :src="icon.next"></image>
                            </div>
                        </div>
                        <div v-if="sceneType != 2" class="row-sb switch-floor">
                            <text class="text">启用</text>
                            <div>
                                <switch-bar v-if="isOwner == '1'" :isActive="autoEnable == 1" @onSwitch="openAuto"></switch-bar>
                                <text class="enable-text" v-else>{{autoEnable==1?'已开启':'已关闭'}}</text>
                            </div>
                        </div>
                    </div>
                    <div v-if="sceneType != 2">
                        <text class="sub-hd">当如下条件满足时</text>
                        <div @click="goAutoTypeSet" class="row-sb floor">
                            <div class="row-s">
                                <image class="type-img" :src="sceneType == 3 ? autoTypeImg[sceneType+'.'+autoDetail.location.direction] :  autoTypeImg[sceneType]"></image>

                                <text class="condition-desc" v-if="autoDetail.location && sceneType==3">在{{weekDesc}} {{directionText[autoDetail.location.direction]}} {{autoDetail.location.address}}时</text>
                                <text class="condition-desc" v-if="autoDetail.startTime && sceneType==4">在{{weekDesc}} {{autoDetail.startTime}}时</text>
                                <text class="condition-desc" v-if="autoDetail.weather && sceneType==6"> 在{{weekDesc}} 天气为{{autoDetail.weather.weatherStatus}}, 气温{{temperatureLoginText[autoDetail.weather.logical]}} {{autoDetail.weather.temperature}}℃ 时</text>
                            </div>
                            <image v-if="isOwner == '1'" class="icon-next" :src="icon.next"></image>
                        </div>
                    </div>
                </div>
                <div>
                    <text class="sub-hd">设备</text>
                    <div class="device-box row-sb">
                        <div v-if="Object.keys(autoBindDevices).length > 0" class="device" v-for="(item, key) in autoBindDevices">
                            <div @click="setDevice(key)">
                                <image class="device-img" :src="applianceImgPath[item.deviceType]"></image>
                                <text class="device-name">{{item.deviceName}}</text>
                                <div class="row-s device-desc">
                                    <div v-for="actions in bindDeviceActions[item.deviceId]">
                                        <text v-if="actions.currentStatusName" class="device-desc-text">{{actions.currentStatusName}}</text>
                                        <text v-if="actions.type=='range'" class="device-desc-text">{{actions.propertyName}}{{actions.currentStatus}}</text>
                                    </div>
                                </div>
                            </div>
                            <!-- <image class="check-icon" :src="icon[item.isCheck]" @click="checkOn(item, key)"></image> -->
                        </div>
                        <div v-if="isOwner == '1'" class="device row-c" @click="goBindNewDevice">
                            <image class="icon-add" :src="icon.addDevice"></image>
                            <text class="add-device-text">添加设备</text>
                        </div>
                    </div>
                </div>
                <text v-if="isOwner == '1'" class="save-btn" @click="sendAutoEdit">保存</text>
            </cell>
        </list>
        <!-- 删除自动化弹窗提示 -->
        <midea-dialog  :show="show.delete" secondBtnColor="#267AFF" mainBtnColor="#267AFF" @close="closeDialog('delete')" @mideaDialogCancelBtnClicked="closeDialog('delete')" @mideaDialogConfirmBtnClicked="deleteAuto" title="删除快捷操作">
            <text class="delete-text" slot="content">确定要删除此快捷操作？</text>
        </midea-dialog>
   </div>
</template>

<style>
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .row-s{ flex-direction: row; align-items: center; justify-content: flex-start; }
    .row-c{ flex-direction: row; align-items: center; justify-content: center; }
    .wrap{ background-color: #f2f2f2;}
    .header-floor{
        position: relative; 
    }
   
    .hd{
        background-color: #fff;
        width: 750px;
        height: 88px;
        padding-left: 30px;
        padding-right: 30px;
        margin-bottom: 25px;
    }
    .hd-text{ font-size: 32px; }
    .floor{ 
        background-color: #fff; 
        padding-left: 25px;
        padding-right: 25px;
        padding-top: 25px;
        padding-bottom: 30px;
    }
    .font-grey {
        color: #666;
    }
    .text{
        font-size: 30px;
    }
    .not-bind-text{
        color: #666;
    }
    .content-list{
        margin-top: 25px;
    }
    .content{
        padding-bottom: 150px;
    }
    .content-hd{
        background-color: #fff;
    }
    .sub-hd{
        color: #666;
        font-size: 28px;
        margin-top: 33px;
        margin-left:30px;
        margin-bottom: 14px;
    }
    .auto-name{
        width: 400px;
    }
    .auto-name-text{
        margin-right: 14px;
        font-size: 28px;
        color: #666;
    }
    .auto-name-floor{
        margin-left: 25px;
        padding-right: 25px;
        padding-top: 36px;
        padding-bottom: 32px;
    }
    .switch-floor{
        margin-left: 25px;
        padding-right: 25px;
        padding-top: 7px;
        padding-bottom: 5px;
        border-top-color: #e5e5e5;
        border-top-style: solid;
        border-top-width: 1px;
    }
    .enable-text{
        padding-top: 30px;
        padding-bottom: 30px;
        padding-right: 10px;
        font-size: 28px;
        color: #666;
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
        height: 220px;
    }
    .device-img{
        width:100px;
        height: 100px;
        margin-bottom: 12px;
    }
    .device-name{
        height: 32px;
        font-size: 32px;
        margin-bottom: 10px;
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
    .check-icon{
        position: absolute;
        top: 14px;
        right:14px;
        width: 50px;
        height: 50px;
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
   
    .type-img{
        width: 82px;
        height: 82px;
        margin-right: 18px;
        margin-top: 14px;
        margin-bottom: 10px;
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
        width: 570px;
        text-overflow: ellipsis;
        font-size: 30px;
    }
    .delete-text{
        font-size: 28px;
        color: #111;
        text-align: center;
    }
    .icon-add{
        width: 32px;
        height: 32px;
        margin-right: 18px;
    }
    .add-device-text{
        font-size: 32px;
    }
    .next{
        width: 10px;
        height: 20px;
    }
</style>

<script>
    import { url, applianceActions, applianceImgPath, autoSupportActions, codeDesc } from './config/config.js'
    import base from './base'

    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import MideaCell from '@/midea-component/cell.vue'
    import mideaDialog from '@/midea-rooms/components/dialog.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
	import switchBar from '@/midea-rooms/components/switch.vue'

    const channelAutoEdit = new BroadcastChannel('autoBroadcast')

    export default {
        components:{ MideaHeader, mideaDialog, MideaCell, mideaList, switchBar },
        mixins: [base],
        data(){
            return {
                icon: {
                    check:  'assets/img/scene_ic_checkbox_on@3x.png',
                    uncheck: 'assets/img/scene_ic_checkbox_off@3x.png',
                    next: 'assets/img/more.png',
                    addDevice: 'assets/img/add.png'
                },
                isOwner: nativeService.getParameters('isOwner'),
                applianceImgPath: applianceImgPath,
                header: {
                    title: '设置',
                    bgColor: '#fff',
                    color: '#111'
                },
                autoDetail: {
                },
                autoTypeImg: {
                    '2': 'assets/img/smart_ic_hand@3x.png',
                    '3.1': 'assets/img/scene_ic_placeblue@3x.png',
                    '3.2': 'assets/img/scene_ic_placegreen@3x.png',
                    '4': 'assets/img/samrt_ic_clock@3x.png',
                    '6': 'assets/img/scene_ic_weather@3x.png',
                },
                applianceActions: applianceActions,
                autoEnable: null,
                inputAutoName: '',
                conditionName: null,
                temperatureLoginText: {
                    '>': '高于',
                    '<': '低于'
                },
                directionText: {
                    1: '到达',
                    2: '离开'
                },
                show: {
                    delete: false
                },
                active: [],
                userDevices: {},//用户名下设备
                autoBindDevices: {},//此场景绑定的设备（随勾选操作更新）
                autoSupportActions: {},//此场景支持的所有设备的动作指令的值
                editParams: {},//用户改动的编辑项
                userSetActions: {},//用户改动的设备动作指令值
                unbindDevices: {},//用户未绑定的可用设备
                unbindDevicesActions: {},//用户未绑定的可用设备的动作指令的值
                bindDeviceActions: {},
                newDevices: {},
                taskActions: {}, //前端自己处理过格式的{deviceId:动作指令值}的对象，数据来源：后端返回的task字段
                pageStamp: '',//进入编辑页时的时间戳
                autoName: ''
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
                    top: this.pageHeight-130+'px'
                }
                return tmp
            },
            weekDesc(){
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
                return weekTmp
            },
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            showDialog(dialogType){
                this.show[dialogType] = true
            },
            closeDialog(dialogType){
                this.show[dialogType] = false
            },
            initData(){
                this.pageStamp = +new Date()
                this.homegroupId = nativeService.getParameters('homegroupId')
                this.sceneType = nativeService.getParameters('sceneType')
                this.sceneId = nativeService.getParameters('sceneId')
                this.autoSupportActions = autoSupportActions[this.sceneType]
                this.autoEnable = nativeService.getParameters('enable')

                this.generateSceneSupportDevices()
                this.getAutoDetail()
            },
            generateSceneSupportDevices(){//生成此场景支持的此用户的设备列表
                let tmpUserDevices = JSON.parse(decodeURIComponent(nativeService.getParameters('userDevices')))
                let tmpSceneSupoortDevices = []
                for (var i in tmpUserDevices) {
                    this.userDevices[tmpUserDevices[i].deviceId] = tmpUserDevices[i]
                    if (this.autoSupportActions.hasOwnProperty(tmpUserDevices[i].deviceType)){
                        tmpSceneSupoortDevices.push(tmpUserDevices[i])
                    }
                }
                this.sceneSupoortDevices = tmpSceneSupoortDevices
            },
            getAutoDetail(){//请求自动化详情
                this.checkLogin().then( (res) => {
                    let reqUrl = url.auto.detail
                    let reqParams = {
                        homegroupId: res.homegroupId,
                        sceneId: this.sceneId
                    }
                    this.webRequest(reqUrl, reqParams).then((rtnData)=>{
                        if (rtnData.code == 0) {
                            this.autoDetail = Object.assign({}, this.autoDetail, rtnData.data)
                            this.autoName = this.autoDetail.name
                            this.task = this.autoDetail.task

                            this.initBindDevices()
                            this.generateBindDeviceActions()
                            this.generateUnbindDevices()
                        }else{
                            if (codeDesc.auto.hasOwnProperty(rtnData.code)){
                                nativeService.toast(codeDesc.auto[rtnData.code])
                            }else{
                                nativeService.toast(rtnData.msg)
                            }
                        }
                    }).catch((err)=>{
                        // nativeService.alert(err)
                        nativeService.toast(this.getErrorMessage(err))
                    })
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            },
            goSetAutoName(){
                if (this.isOwner == '1') {
                    let params = {
                        autoName: encodeURIComponent(this.autoName)
                    }
                    this.goTo('common-pages/setAutoName', {}, params)
                }
            },
            initBindDevices(){
                let tmpAutoBindDevices = {}//根据后台返回的task字段初始化已绑定设备列表
                let tmpActions = {}//转换后台返回的task中设备属性的格式
                for (var i in this.task) {
                    tmpAutoBindDevices[this.task[i].applianceCode] = Object.assign({isCheck:'check'},this.userDevices[this.task[i].applianceCode])
                    tmpActions[this.task[i].applianceCode] = this.task[i].command
                }
                this.autoBindDevices  = Object.assign({}, this.autoBindDevices, tmpAutoBindDevices)
                this.taskActions = tmpActions
            },
            generateUnbindDevices(){//生成未绑定设备列表及其动作指令值
                let bindApplianceCode = [], //已绑定的设备号
                    tmpUnbindDevices = {},
                    tmpUnbindDevicesAction = {}
              
                for (var x in this.autoBindDevices) {
                    bindApplianceCode.push(x)
                }
                
                for (var i in this.sceneSupoortDevices) {
                    if ( bindApplianceCode.indexOf(this.sceneSupoortDevices[i].deviceId) == -1 ){
                        let tmp = Object.assign(this.sceneSupoortDevices[i], {isCheck: 'uncheck'})
                        tmpUnbindDevices[this.sceneSupoortDevices[i].deviceId] =  tmp
                        tmpUnbindDevicesAction[this.sceneSupoortDevices[i].deviceId] = this.autoSupportActions[this.sceneSupoortDevices[i].deviceType]
                    }
                }
                this.unbindDevices = {} 
                this.unbindDevicesActions = {}
                this.unbindDevices = Object.assign({}, this.unbindDevices, tmpUnbindDevices)
                this.unbindDevicesActions = Object.assign({}, this.unbindDevicesActions, tmpUnbindDevicesAction)
            },
            generateBindDeviceActions(){//生成已绑定设备的actions
                let tmpBindDeviceActions = {}
                for (var x in this.autoBindDevices) {
                    
                    if (this.autoBindDevices[x].isCheck == 'check'){
                        if (this.userSetActions[x]) {
                            tmpBindDeviceActions[x] = this.userSetActions[x]
                         }else{
                            let tmpAction = []
                            let staticActions = this.autoSupportActions[this.autoBindDevices[x].deviceType].actions
                            for (var i in staticActions) {
                                if ( Object.keys(this.taskActions).indexOf(this.autoBindDevices[x].deviceId) > -1 ) {
                                    let current = {
                                        currentStatus: this.taskActions[this.autoBindDevices[x].deviceId][staticActions[i].property],
                                        currentStatusName: staticActions[i].hasOwnProperty('value') ? staticActions[i].value[this.taskActions[this.autoBindDevices[x].deviceId][staticActions[i].property]] : undefined
                                    }
                                    tmpAction[i] = Object.assign({}, current,  staticActions[i])
                                }else{
                                    let current = {
                                        currentStatus: staticActions[i].default,
                                        currentStatusName: staticActions[i].hasOwnProperty('value')? staticActions[i].value[staticActions[i].default] : undefined
                                    }
                                    tmpAction[i] = Object.assign({}, current,  staticActions[i])
                                }
                            }
                            tmpBindDeviceActions[x] = tmpAction
                        }
                    }
                }
                this.bindDeviceActions =  Object.assign({}, tmpBindDeviceActions)
            },
            openAuto(e){
                if (this.isOwner == '1') {
                    if (this.autoDetail.enable == 1) {
                        this.autoDetail.enable = 0
                        this.autoEnable = 0
                    }else if (this.autoDetail.enable == 0) {
                        this.autoDetail.enable = 1
                        this.autoEnable = 1
                    }
                    this.editParams.enable = Number(e.value)
                }
            },
            goAutoTypeSet(){
                if (this.isOwner == '1') {
                    let params = {
                        from: 'editAuto',
                        sceneType: this.sceneType,
                        weekly: this.autoDetail.weekly
                    }
                    params.editSceneId = this.autoDetail.sceneId
                    
                    if (this.sceneType == 3){
                        params.direction = this.autoDetail.location.direction
                        params.locationLatitude = this.editParams.locationLatitude ||this.autoDetail.location.latitude
                        params.locationLongitude = this.editParams.locationLongitude || this.autoDetail.location.longitude
                    }
                    if (this.sceneType == 4){
                        params.startTime = this.autoDetail.startTime
                    }
                    if (this.sceneType == 6){
                        params.weatherStatus = encodeURIComponent(this.autoDetail.weather.weatherStatus)
                        params.logical = encodeURIComponent(this.autoDetail.weather.logical)
                        params.weatherTemperature = this.autoDetail.weather.temperature
                    }
                    this.goTo('autoTypeSet', {}, params)
                }
            },
            deleteAuto(){
                this.closeDialog('delete')
                this.checkLogin().then( (res) => {
                    let reqUrl = url.auto.delete
                    let reqParams = {
                        homegroupId: res.homegroupId,
                        sceneId: this.sceneId,
                        enable: '2'
                    }
                    this.webRequest(reqUrl, reqParams).then((rtnData)=>{
                        if (rtnData.code == 0) {
                            if (this.sceneType == 3) {
                                nativeService.updateAutoList()//通知原生位置类型自动化列表需要更新
                            }
                            nativeService.toast('删除成功!')
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
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            },
            setDevice(deviceId){
                if (this.isOwner == '1'){
                    let tmpTask = {}
                    for (var i in this.autoDetail.task) {
                        if (this.autoDetail.task[i].applianceCode == deviceId) {
                            tmpTask = this.autoDetail.task[i].command
                        }
                    }
                    tmpTask = JSON.stringify(tmpTask)
                    let params = {
                        from: 'editAuto',
                        sceneId: this.autoDetail.sceneId,
                        sceneType: this.autoDetail.sceneType,
                        deviceId: deviceId,
                        deviceType: this.userDevices[deviceId].deviceType,
                        deviceTask: tmpTask,
                        deviceName: encodeURIComponent(this.autoBindDevices[deviceId].deviceName),
                        pageStamp: this.pageStamp
                    }
                    this.goTo('common-pages/setDevice', {}, params)
                }
            },
            checkOn(item, index){
                let tmpStatus = {
                    check: 'uncheck',
                    uncheck: 'check'
                }
                this.autoBindDevices[item.deviceId].isCheck = tmpStatus[this.autoBindDevices[item.deviceId].isCheck]

                this.generateBindDeviceActions()
            },
            goBindNewDevice(){
                this.checkLogin().then( (res) => {
                    if (Object.keys(this.unbindDevices).length > 0) {
                        let params = {
                            from: 'editAuto',
                            homegroupId: res.homegroupId,
                            sceneType: this.sceneType,
                            userDevices: nativeService.getParameters('userDevices'),
                            unbindDevices: encodeURIComponent(JSON.stringify(this.unbindDevices)),
                            unbindDevicesActions:  encodeURIComponent(JSON.stringify(this.unbindDevicesActions))
                        }
                        this.goTo('autoBindDevices', {}, params)
                    }else{
                        nativeService.toast('没有更多设备可以绑定了')
                    }
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            },
            sendAutoEdit(){
                this.checkLogin().then( (res) => {
                    let reqUrl = url.auto.update
                    let reqParams = {
                        homegroupId: res.homegroupId,
                        sceneType: this.sceneType,
                        sceneId: this.sceneId,
                        image: this.autoDetail.image,
                    }

                    let tmpTask = []
                    for (var key in this.bindDeviceActions) { //key: applianceCode
                        let tmpCommand = {}
                        for (var i in this.bindDeviceActions[key]) {
                            if (this.bindDeviceActions[key][i].currentStatus === '' || this.bindDeviceActions[key][i].currentStatus === undefined) {
                                tmpCommand[this.bindDeviceActions[key][i].property] = this.bindDeviceActions[key][i].default
                            }else{
                                tmpCommand[this.bindDeviceActions[key][i].property] = this.bindDeviceActions[key][i].currentStatus 
                            }
                        }
                        
                        tmpTask.push({
                            applianceCode: key,
                            command: tmpCommand
                        })
                    }
                    reqParams.task = JSON.stringify(tmpTask) || JSON.stringify(this.autoDetail.task)
                    if (reqParams.task == '[]' || reqParams == ''){
                        nativeService.toast('请添加设备')
                        return
                    }
                    if (Object.keys(this.editParams).length === 0 && !reqParams.task) {
                        nativeService.toast('没有改动哦')
                        return
                    }
                    reqParams.name = this.autoName || this.autoDetail.name
                    reqParams.enable = this.editParams.enable || this.autoDetail.enable
                    reqParams.weekly = this.editParams.weekly || this.autoDetail.weekly
                
                    if (this.sceneType == 3) {
                        let tmpLocation = {
                            address: this.editParams.locationAddress || this.autoDetail.location.address,
                            latitude: this.editParams.locationLatitude || this.autoDetail.location.latitude,
                            longitude: this.editParams.locationLongitude || this.autoDetail.location.longitude,
                            distance: this.autoDetail.location.distance,
                            direction: this.autoDetail.location.direction,
                            directionName: this.autoDetail.location.directionName,
                        }
                        reqParams.location = JSON.stringify(tmpLocation)
                    }
                    if (this.sceneType == 4) {
                        reqParams.startTime = this.editParams.startTime || this.autoDetail.startTime
                    }
                    if (this.sceneType == 6) {
                        let tmpWeather = {
                            cityNo: this.autoDetail.weather.cityNo,
                            latitude: this.autoDetail.weather.latitude,
                            longitude: this.autoDetail.weather.longitude,
                            weatherStatus: this.editParams.weatherStatus || this.autoDetail.weather.weatherStatus,
                            temperature: this.editParams.weatherTemperature || this.autoDetail.weather.temperature,
                            logical: this.editParams.logical || this.autoDetail.weather.logical,
                        }
                        reqParams.weather = JSON.stringify(tmpWeather)
                    }

                    this.webRequest(reqUrl, reqParams).then((rtnData)=>{
                        if (rtnData.code == 0) {
                            if (this.sceneType == 3) {
                                nativeService.updateAutoList()//通知原生位置类型自动化列表需要更新
                            }
                            nativeService.toast('修改成功')
                            nativeService.backToNative()
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
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
                nativeService.burialPoint({
                    pageName: 'sceneMainPage',
                    actionType: 'scene',
                    subAction: 'scene_select_and_edit'
                })
            }
        },
        created(){
            this.initData()
            let that = this
            channelAutoEdit.onmessage = function(e) {
                if (e.data.page == 'setAutoName') {//修改快捷操作名称
                    that.autoName = e.data.autoName
                }
                if (e.data.page == 'setDevice') {//修改设备操作属性和设备绑定状态
                    if (e.data.isCheck == 'uncheck') {
                        delete that.autoBindDevices[e.data.applianceCode]
                    }
                    let tmpUserSetActions = {}
                    tmpUserSetActions[e.data.applianceCode] = e.data.actions
                    that.userSetActions = Object.assign({}, that.userSetActions, tmpUserSetActions)
                    that.generateUnbindDevices()
                    that.generateBindDeviceActions()
                }
                if (e.data.page == 'autoBindDevices') {//修改设备绑定状态
                    that.autoBindDevices = Object.assign({}, that.autoBindDevices, e.data.newDevices)
                    that.generateUnbindDevices()
                    that.generateBindDeviceActions()
                }
                if (e.data.page == 'setCondition') {
                    that.editParams = Object.assign({}, that.editParams,  e.data.editParams)
                    
                    if ( e.data.editParams.locationAddress) {
                        that.autoDetail.location.address =  e.data.editParams.locationAddress
                    }
                    if ( e.data.editParams.weekly) {
                        that.autoDetail.weekly = e.data.editParams.weekly
                    }
                    if ( e.data.editParams.hour) {
                        let tmpMinute = e.data.editParams.minute || '00'
                        that.autoDetail.startTime = e.data.editParams.hour + ':' + tmpMinute
                    }
                 
                    if ( e.data.editParams.weatherStatus) {
                        that.autoDetail.weather.weatherStatus = e.data.editParams.weatherStatus
                    }
                    if ( e.data.editParams.weatherTemperature) {
                        that.autoDetail.weather.temperature = e.data.editParams.weatherTemperature
                    }
                    if ( e.data.editParams.logical) {
                        that.autoDetail.weather.logical = e.data.editParams.logical
                    }
                }
            }
        },
    }
</script>