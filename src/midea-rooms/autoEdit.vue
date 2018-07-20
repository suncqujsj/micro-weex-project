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
                            <text class="text">名称</text>
                            <input class="auto-name" type="text" placeholder="" :value="inputAutoName" @input="editAutoName" @change="editAutoName" />
                        </div>
                        <div class="row-sb switch-floor auto-switch-floor">
                            <text class="text">启用</text>
                            <div>
                                <switch-bar :isActive="autoEnable == 1" @onSwitch="openAuto"></switch-bar>
                            </div>
                        </div>
                    </div>
                    <div>
                        <text class="sub-hd">当如下条件满足时</text>
                        <div @click="goAutoTypeSet" class="row-sb floor">
                            <div class="row-s">
                                <image class="type-img" :src="autoTypeImg[sceneType]"></image>
                                <text class="condition-desc" v-if="autoDetail.location && sceneType==3">在{{weekDesc}} {{directionText[autoDetail.location.direction]}} {{autoDetail.location.address}}时</text>
                                <text class="condition-desc" v-if="autoDetail.startTime && sceneType==4">在{{weekDesc}} {{autoDetail.startTime}}时</text>
                                <text class="condition-desc" v-if="autoDetail.weather && sceneType==6"> 在{{weekDesc}} 天气为{{autoDetail.weather.weatherStatus}}, 气温{{temperatureLoginText[autoDetail.weather.logical]}} {{autoDetail.weather.temperature}}℃ 时</text>
                            </div>
                            <image class="icon-next" :src="icon.next"></image>
                        </div>
                    </div>
                </div>
                <div>
                    <text class="sub-hd">设备</text>
                    <div v-if="Object.keys(autoBindDevices).length > 0" class="device-box row-sb">
                        <div class="device" v-for="(item, key) in autoBindDevices">
                            <div @click="setDevice(key)">
                                <image class="device-img" :src="applianceImgPath[item.deviceType]"></image>
                                <text class="device-name">{{item.deviceName}}</text>
                                <div class="row-s device-desc">
                                    <div v-for="(action, key) in taskActions[item.deviceId]">
                                         <text v-if="applianceActions[item.deviceType].actions[key].value" class="device-desc-text"> {{applianceActions[item.deviceType].actions[key].value[action]}}</text>
                                    </div>
                                </div>
                            </div>
                            <image class="check-icon" :src="icon[item.isCheck]" @click="checkOn(item, key)"></image>
                        </div>
                    </div>
                    <div  v-else class="device-box row-sb">
                        <text class="not-bind-text text">当前快捷操作没有绑定设备，点击选择设备进行添加</text>
                    </div>
                    <text class="select-btn text" @click="goBindNewDevice">选择设备</text>
                </div>
            </cell>
        </list>
        <div class="delete" :style="deleteStyle"><text class="delete-text"  @click="showDialog('delete')">删除快捷操作</text></div>
        <!-- 删除自动化弹窗提示 -->
        <midea-dialog  :show="show.delete" @close="closeDialog('delete')" @mideaDialogCancelBtnClicked="closeDialog('delete')" @mideaDialogConfirmBtnClicked="deleteAuto" >
            <text class="·" slot="content">确定要删除此快捷操作？</text>
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
    .content{
        margin-top: 16px;
        padding-bottom: 150px;
    }
    .sub-hd{
        color: #666;
        font-size: 30px;
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
        width: 333px;
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
         align-items: flex-start;
         margin-top: 6px;
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
        font-size: 30px;
    }
    
    /* .wrap{background-color: #3af} */
</style>

<script>
    import { url, applianceActions, applianceImgPath, autoSupportActions, codeDesc } from './config/config.js'
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
                autoDetail: {
                },
                autoTypeImg: {
                    2: 'assets/img/hand.png',
                    3: 'assets/img/location.png',
                    4: 'assets/img/time.png',
                    6: 'assets/img/slweather.png',
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
                autoSupportActions: {},//此场景可用设备的动作指令的值
                editParams: {},//用户改动的编辑项
                userSetActions: {},//用户改动的设备动作指令值
                unbindDevices: {},//用户未绑定的可用设备
                unbindDevicesActions: {},//用户未绑定的可用设备的动作指令的值
                bindDeviceActions: {},
                newDevices: {},
                taskActions: {}, //前端自己处理过格式的{deviceId:动作指令值}的对象，数据来源：后端返回的task字段
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
                this.checkLogin().then( (uid) => {
                    let reqUrl = url.auto.detail
                    let reqParams = {
                        uid: uid,
                        homegroupId: this.homegroupId,
                        sceneId: this.sceneId
                    }
                    this.webRequest(reqUrl, reqParams).then((rtnData)=>{
                        if (rtnData.code == 0) {
                            this.autoDetail = Object.assign({}, this.autoDetail, rtnData.data)
                            this.inputAutoName = this.autoDetail.name
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
                        nativeService.toast(this.getErrorMessage(err))
                    })
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
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
                                    tmpAction[i] = Object.assign({}, {currentStatus: this.taskActions[this.autoBindDevices[x].deviceId][staticActions[i].property]}, staticActions[i])
                                }else{
                                    tmpAction[i] = Object.assign({}, {currentStatus:  staticActions[i].default},  staticActions[i])
                                }
                            }
                            
                            tmpBindDeviceActions[x] = tmpAction
                        }
                    }
                }
                this.bindDeviceActions =  Object.assign({}, tmpBindDeviceActions)
            },
            openAuto(e){
                if (this.autoDetail.enable == 1) {
                    this.autoDetail.enable = 0
                    this.autoEnable = 0
                }else if (this.autoDetail.enable == 0) {
                    this.autoDetail.enable = 1
                    this.autoEnable = 1
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
                    params.logical = encodeURIComponent(this.autoDetail.weather.logical)
                }
                this.goTo('autoTypeSet', {}, params)
            },
            deleteAuto(){
                this.closeDialog('delete')
                this.checkLogin().then( (uid) => {
                    let reqUrl = url.auto.delete
                    let reqParams = {
                        uid: uid,
                        homegroupId: this.homegroupId,
                        sceneId: this.sceneId,
                        enable: '2'
                    }
                    this.webRequest(reqUrl, reqParams).then((rtnData)=>{
                        if (rtnData.code == 0) {
                            if (this.sceneType == 3) {
                                nativeService.updateAutoList()//通知原生位置类型自动化列表需要更新
                            }
                            nativeService.alert('删除成功!', function(){
                                nativeService.backToNative()
                            })
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
            },
            goBindNewDevice(){
                this.checkLogin().then( (uid) => {
                    if (Object.keys(this.unbindDevices).length > 0) {
                        let params = {
                            from: 'editAuto',
                            uid: uid,
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
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            },
            sendAutoEdit(){
                this.checkLogin().then( (uid) => {
                    let reqUrl = url.auto.update
                    let reqParams = {
                        uid: uid,
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
                            if (this.sceneType == 3) {
                                nativeService.updateAutoList()//通知原生位置类型自动化列表需要更新
                            }
                            nativeService.alert('修改成功', function(){
                                nativeService.backToNative()
                            })
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
            }
        },
        created(){
            this.initData()
            let that = this
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
        },
    }
</script>