<template>
   <div class="wrap" :style="wrapStyle">
        <div class="row-sb hd">
            <text class="hd-text font-grey" @click="goBack">取消</text>
            <text class="hd-text">{{autoDetail.name}}</text>
            <text class="hd-text font-grey"  @click="sendAutoEdit">保存</text>
        </div>
        <list>
            <cell class="content">
                <div v-if="sceneType != 2">
                    <div style="background-color:#fff">
                        <div class="row-sb auto-name-floor">
                            <text>名称</text>
                            <input class="auto-name" type="text" placeholder="" :value="inputAutoName" @change="editAutoName" @return="editAutoName"/>
                        </div>
                        <div class="row-sb switch-floor auto-switch-floor">
                            <text>启用</text>
                            <div>
                                <switch-bar :isActive="autoDetail.enable" @onSwitch="openAuto"></switch-bar>
                            </div>
                        </div>
                    </div>
                    <div>
                        <text class="sub-hd">当如下条件满足时</text>
                        <div @click="goAutoTypeSet" class="row-sb floor">
                            <div class="row-s ">
                                <image class="icon" :src="autoDetail.image"></image>
                                <text class="condition-desc" v-if="sceneType==3">在{{weekDesc}} {{directionText[autoDetail.location.direction]}} {{autoDetail.location.address}}时</text>
                                <text class="condition-desc" v-if="sceneType==4">在{{weekDesc}} {{autoDetail.startTime}}时</text>
                                <text class="condition-desc" v-if="sceneType==6"> 在{{weekDesc}} 天气{{autoDetail.weather.weatherStatus}}, 气温{{temperatureLoginText[autoDetail.weather.logical]}} {{autoDetail.weather.temperature}}℃ 时</text>
                            </div>
                            <image class="icon-next" :src="icon.next"></image>
                        </div>
                    </div>
                </div>
                <div>
                    <text class="sub-hd">设备</text>
                    <div class="device-box row-sb">
                        <div class="device" v-for="(item, key) in autoBindDevices">
                            <div @click="setDevice(key)">
                                <image class="device-img" :src="applianceImgPath[item.deviceType]"></image>
                                <text class="device-name">{{item.deviceName}}</text>
                            </div>
                            <image class="check-icon" :src="icon[item.isCheck]" @click="checkOn(item, key)"></image>
                        </div>
                    </div>
                    <text class="select-btn" @click="goBindNewDevice">选择设备</text>
                </div>
            </cell>
        </list>
        <div class="delete" :style="deleteStyle"><text class="delete-text"  @click="showDialog('delete')">删除快捷操作</text></div>
        <!-- 删除自动化弹窗提示 -->
        <midea-dialog  :show="show.delete" @close="closeDialog('delete')" @mideaDialogCancelBtnClicked="closeDialog('delete')" @mideaDialogConfirmBtnClicked="deleteAuto" >
            <text slot="content">确定要删除此快捷操作？</text>
        </midea-dialog>
   </div>
</template>

<style>
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .row-s{ flex-direction: row; align-items: center; justify-content: flex-start; }
    .wrap{ background-color: #f2f2f2; }
    .hd{
        background-color: #fff;
        width: 750px;
        height: 88px;
        padding-left: 30px;
        padding-right: 30px;
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
    .content{
        margin-top: 16px;
        padding-bottom: 150px;
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
        height: 70px;
        margin-left: 100px;
        text-align: right;
    }
    .auto-name-floor{
        margin-left: 25px;
        padding-right: 25px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom-color: #e5e5e5;
        border-bottom-style: solid;
        border-bottom-width: 2px;
    }
    .switch-floor{
        margin-left: 25px;
        padding-right: 25px;
    }
    .device-box{
        padding-left: 32.25px;
        padding-right: 14.25px;
        flex-wrap: wrap;
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
        width:100px;
        height: 100px;
        margin-bottom: 12px;
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
        position: absolute;
        left:0;
        right:0;
        background-color: #fff;
    }
    .delete-text{
        color: #FF3B30;
        padding: 27px;
        text-align: center;
        font-size: 32px;
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
        width: 600px;
        text-overflow: ellipsis
    }
    
    /* .wrap{background-color: #3af} */
</style>

<script>
    import { url, applianceActions, applianceImgPath, autoSupportActions } from './config/config.js'
    import base from './base'

    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import MideaCell from '@/midea-component/cell.vue'
    import mideaDialog from '@/midea-component/dialog.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
	import switchBar from '@/midea-rooms/components/switch.vue'

    const channelAutoEdit = new BroadcastChannel('autoBroadcast')

    export default {
        components:{ MideaHeader, mideaDialog, MideaCell, mideaList, switchBar },
        mixins: [base],
        data(){
            return {
                icon: {
                    check:  'assets/img/check_on.png',
                    uncheck: 'assets/img/check_off.png',
                    next: 'assets/img/more.png'
                },
                applianceImgPath: applianceImgPath,
                header: {
                    title: '设置',
                    bgColor: '#fff',
                    color: '#111',
                    leftImg: 'assets/img/b.png',
                    rightImg: 'assets/img/b.png'
                },
                autoDetail: {},
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
                userDevices: {},
                autoBindDevices: {},
                autoSupportActions: {},
                editParams: {},
                userSetActions: {},
                unbindDevices: {},
                unbindDevicesActions: {},
                bindDeviceActions: {},
                newDevices: {},
                pageStamp: ''//进入编辑页时的时间戳
            }
        },
        computed: {
            wrapStyle(){
                let tmp = {
                    height: this.pageHeight+'px'
                }
                if (this.isipx) {
                    tmp.marginTop = '64px'
                }else{
                    tmp.marginTop = '40px'
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
            }
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
            goHomePage(){
                this.goTo('weex')
            },
            initData(){
                this.pageStamp = +new Date()
                this.uid = nativeService.getParameters('uid')
                this.homegroupId = nativeService.getParameters('homegroupId')
                this.sceneType = nativeService.getParameters('sceneType')
                this.sceneId = nativeService.getParameters('sceneId')
                this.autoSupportActions = autoSupportActions[this.sceneType]
                let tmpUserDevices = JSON.parse(decodeURIComponent(nativeService.getParameters('userDevices')))
                let tmpSceneSupoortDevices = []//生成此场景支持的此用户的设备列表
                for (var i in tmpUserDevices) {
                    this.userDevices[tmpUserDevices[i].deviceId] = tmpUserDevices[i]
                    if (this.autoSupportActions.hasOwnProperty(tmpUserDevices[i].deviceType)){
                        tmpSceneSupoortDevices.push(tmpUserDevices[i])
                    }
                }
                this.sceneSupoortDevices = tmpSceneSupoortDevices
                this.getAutoDetail()
            },
            getAutoDetail(){
                let reqUrl = url.auto.detail
                let reqParams = {
                    uid: this.uid,
                    homegroupId: this.homegroupId,
                    sceneId: this.sceneId
                }
                this.webRequest(reqUrl, reqParams).then((rtnData)=>{
                    if (rtnData.code == 0) {
                        this.autoDetail = Object.assign({}, this.autoDetail, rtnData.data)
                        
                        this.inputAutoName = this.autoDetail.name
                        this.autoEnable = this.autoDetail.enable
                        this.task = this.autoDetail.task

                        this.generateBindDevices()
                        this.generateBindDeviceActions()
                        this.generateUnbindDevices()
                        this.generateWeek()
                     
                    }
                }).catch( (error )=>{
                })
            },
            generateBindDevices(){//生成已绑定设备列表
                let tmpAutoBindDevices = {}

                for (var i in this.task) {
                    tmpAutoBindDevices[this.task[i].applianceCode] = Object.assign({isCheck:'check'},this.userDevices[this.task[i].applianceCode])
                }
                this.autoBindDevices  = Object.assign({}, this.autoBindDevices, tmpAutoBindDevices)
            },
            generateUnbindDevices(){//生成未绑定设备列表
                let bindApplianceCode = [],  tmpUnbindDevices = {},  tmpUnbindDevicesAction = {}
              
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
                            tmpBindDeviceActions[x] = Object.assign({}, tmpBindDeviceActions[x], this.userSetActions[x])
                        }else{
                            tmpBindDeviceActions[x] = this.autoSupportActions[this.autoBindDevices[x].deviceType].actions
                        }
                    }
                }
                this.bindDeviceActions =  Object.assign({}, tmpBindDeviceActions)
            },
            openAuto(e){
                if (this.autoDetail.enable == 1) {
                    this.autoDetail.enable = 0
                }else if (this.autoDetail.enable == 0) {
                    this.autoDetail.enable = 1
                }
                this.editParams.enable = Number(e.value)
            },
            editAutoName(input){
                this.inputAutoName = input.value
                this.editParams.name = input.value
            },
            goAutoTypeSet(){
                let params = {
                    from: 'editAuto',
                    sceneType: this.sceneType,
                    weekly: this.autoDetail.weekly
                }
                if (this.sceneType == 3) {
                    params.direction = this.autoDetail.location.direction
                }
                params.editSceneId = this.autoDetail.sceneId
                
                if (this.sceneType == 3){
                    params.locationLongitude = this.autoDetail.location.longitude
                    params.locationLatitude = this.autoDetail.location.latitude
                }
                if (this.sceneType == 4){
                    params.startTime = this.autoDetail.startTime
                }
                if (this.sceneType == 6){
                    params.weatherStatus = encodeURIComponent(this.autoDetail.weather.weatherStatus)

                }
                this.goTo('autoTypeSet', {}, params)
            },
            deleteAuto(){
                this.closeDialog('delete')
                let reqUrl = url.auto.delete
                let reqParams = {
                    uid: this.uid,
                    homegroupId: this.homegroupId,
                    sceneId: this.sceneId,
                    enable: '2'
                }
                this.webRequest(reqUrl, reqParams).then((rtnData)=>{
                    if (rtnData.code == 0) {
                        nativeService.alert('删除成功!', function(){
                            nativeService.goTo('weex.js')
                        })
                    }
                }).catch( (err)=>{
                    nativeService.alert(err)
                })
            },
            setDevice(deviceId){
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
                this.goTo('setDevice', {}, params)
            },
            checkOn(item, index){
                let tmpStatus = {
                    check: 'uncheck',
                    uncheck: 'check'
                }
                this.autoBindDevices[item.deviceId].isCheck = tmpStatus[this.autoBindDevices[item.deviceId].isCheck]

                this.generateBindDeviceActions()
                this.updateTask()//勾选或取消时需要更新task数据
            },
            updateTask(){
                let tmpTask = []
                for (var key in this.autoBindDevices) {
                    if (this.autoBindDevices[key].isCheck == 'check') {
                        for (var x in this.autoDetail.task) {
                            if (this.autoDetail.task[x].applianceCode == key) {
                                tmpTask.push(this.autoDetail.task[x])
                            }
                        }
                    }
                }
                this.editParams.task = JSON.stringify(tmpTask)
            },
            goBindNewDevice(){
                if (Object.keys(this.unbindDevices).length > 0) {
                    let params = {
                        from: 'editAuto',
                        uid: this.uid,
                        homegroupId: this.homegroupId,
                        sceneType: this.sceneType,
                        userDevices: nativeService.getParameters('userDevices'),
                        unbindDevices: encodeURIComponent(JSON.stringify(this.unbindDevices)),
                        unbindDevicesActions:  encodeURIComponent(JSON.stringify(this.unbindDevicesActions))
                    }
                    this.goTo('autoBindDevices', {}, params)
                }else{
                    nativeService.alert('此快捷操作已经选择了所有设备哦')
                }
            },
            sendAutoEdit(){
                let reqUrl = url.auto.update
                let reqParams = {
                    uid: this.uid,
                    homegroupId: this.homegroupId,
                    sceneType: this.sceneType,
                    sceneId: this.sceneId,
                    image: this.autoDetail.image,
                }

                let tmpTask = []
                for (var key in this.bindDeviceActions) { //key: applianceCode
                    let tmpCommand = {}
                    for (var i in this.bindDeviceActions[key]) {
                        tmpCommand[this.bindDeviceActions[key][i].property] = this.bindDeviceActions[key][i].currentStatus || this.bindDeviceActions[key][i].default
                        
                    }
                    tmpTask.push({
                        applianceCode: key,
                        command: tmpCommand
                    })
                }
                reqParams.task = JSON.stringify(tmpTask) || JSON.stringify(this.autoDetail.task)
                if (Object.keys(this.editParams).length === 0 && !reqParams.task) {
                    nativeService.alert('没有改动哦')
                    return
                }

                reqParams.name = this.editParams.name || this.autoDetail.name
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
                        nativeService.alert('修改成功', function(){
                            nativeService.goTo('weex.js')
                        })
                    }
                }).catch( (error )=>{

                })
            }
        },
        created(){
            let that = this
            this.initData()
            channelAutoEdit.onmessage = function(e) {
                if (e.data.page == 'setDevice') {
                    let tmpUserSetActions = {}
                    tmpUserSetActions[e.data.applianceCode] = e.data.actions
                    that.userSetActions = Object.assign({}, that.userSetActions, tmpUserSetActions)
                    that.generateBindDeviceActions()
                }
                if (e.data.page == 'autoBindDevices') {
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
        }
    }
</script>