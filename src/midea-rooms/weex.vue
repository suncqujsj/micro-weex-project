// 美居场景首页
<template>
    <scroller class="wrapper"  :show-scrollbar="false" @viewappear="initData">
        <div>
            <div class="hd row-sb">
                <text class="hd-name">快捷操作</text>
                <text class="hd-btn" @click="goAddAuto">添加</text>
            </div>
            <scroller class="scroller" scroll-direction="horizontal" :show-scrollbar="false">
                <div v-for="col in colList">
                    <div v-for="item in col" class="auto row-sb"  @click="editAuto(item)">
                        <div class="row-s">
                            <image class="icon" :src="icon.auto[item.sceneType]"></image>
                            <div>
                                <text class="auto-name">{{item.name}}</text>
                                <div class="auto-desc row-s">
                                    <div v-for="device in item.task">
                                        <text class="auto-desc-text">{{formatUserDevices[device.applianceCode]}}</text>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <image v-if="item.sceneType==2" class="auto-btn" :src="icon.autoBtn"  @click="executeAuto(item.sceneId)">
                    </div>
                </div>
            </scroller>
        </div>
        <div>
            <div class="hd"><text class="hd-name">场景</text></div> 
            <div class="scene-list" v-if="sceneList" :style="sceneListStyle">
                <div class="scene" v-for="scene in sceneList" @click="goScene(scene)">
                    <image class="scene-bg" :src="sceneImg[scene.roomType]"></image>
                    <div v-if="isLogin && scene.applianceCount !== 0" class="scene-info">
                        <text class="scene-name">{{scene.name}}</text>
                        <div>
                            <div v-if="[1, 2].indexOf(scene.roomType) > -1 && scene.indicator" class="row-s">
                                <text v-if="scene.indicator.temperature" class="scene-desc">室温{{scene.indicator.temperature}}, </text>
                                <text v-if="scene.indicator.humidity" class="scene-desc">湿度{{scene.indicator.humidity}}, </text>
                                <text v-if="scene.indicator.pm25" class="scene-desc">空气质量{{scene.indicator.pm25}} </text>
                                <text v-if="!scene.indicator.temperature && !scene.indicator.humidity && !scene.indicator.pm25" class="scene-desc">该场景暂无设备信息</text>
                            </div>
                            <div v-else-if="scene.roomType == 3 && scene.indicator" class="scene-desc">
                                <text v-if="scene.indicator.level" class="scene-desc">{{feel[scene.indicator.level]}}</text>
                                <text v-else class="scene-desc">该场景暂无设备信息</text>
                            </div>
                            <div v-else-if="scene.roomType == 4 && scene.indicator" class="scene-dexc">
                                <text v-if="scene.indicator.work_stats" class="scene-desc">{{scene.indicator.work_stats}}</text>
                                <text v-else class="scene-desc">该场景暂无设备信息</text>
                            </div>
                        </div>
                        <image class="next" :src="icon.next"></image>
                    </div>
                    <div v-else>
                        <text class="scene-name">{{scene.name}}</text>
                        <text class="scene-desc">该场景暂无设备信息</text>
                        <image class="next" :src="icon.next"></image>
                    </div>
                </div>
            </div>
        </div>
        <toast-dialog :show="showToastDialog" :maskStyle="{backgroundColor: 'rgba(0,0,0,0.6)'}" contentPadding="0px">
            <div class="auto-toast" v-for="(item,i) in autoExecuteDevices">
                <div :class="['row-sb','toast-line', i>0?'toast-border':'']">
                    <div>
                        <text class="toast-hd">{{item.applianceName}}</text>
                        <div class="row-s">
                            <text class="toast-desc" v-for="desc in item.describe">{{desc.actionValue}}</text>
                        </div>
                    </div>
                    <image class="toast-icon" :src="icon.exe[item.status]"></image>
                </div>
            </div>
        </toast-dialog>
    </scroller>
</template>

<style>
    .wrapper { flex-direction: column; background-color: #f2f2f2;}
    .row-s { flex-direction: row; align-items: center; justify-content: flex-start; }
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .row-sa{ flex-direction: row; align-items: center; justify-content: space-around; }
    .row-e { flex-direction: row; align-items: center; justify-content: flex-end; }
    .hd { margin-top: 44px; padding-left:30px; padding-right:30px; margin-bottom: 24px; }
    .hd-name{ font-weight: bold; font-size: 36px; color: #000; }
    .hd-btn{ font-size: 26px; color: #666; padding: 10px;}
    .scroller{ padding-left:30px; padding-right:30px; flex-direction: row; height: 276px;}
    .icon { width: 82px; height: 82px; margin-right: 20px; }
    .auto-btn{ width: 50px; height: 50px; }
    .auto{
        width: 366px;
        height: 122px;
        background-color: #fff;
        margin-bottom: 16px;
        margin-right: 16px;
        padding: 20px;
        border-radius: 4px;
    }
    .auto-name{ width: 180px; font-size: 28px; color: #000; font-weight: bold; margin-bottom: 8px; text-overflow: clip; }
    .auto-desc{ width: 120px; font-size: 24px; color: #C7C7CC; lines:1; text-overflow: ellipsis; }
    .auto-desc-text{ font-size: 24px; color: #C7C7CC; margin-right: 6px;}
    .scene-list{  padding-left:30px; padding-right:30px;}
    .scene { width: 690px; height: 206px; padding-bottom: 16px; position: relative; }
    .scene-bg{ width: 690px; height: 185px; position: absolute; }
    .next { width: 8px; height: 16px; position:absolute; top:84px; right: 25px;}
    .scene-name, .scene-desc{ color: #fff; }
    .scene-name{ font-weight:bold; font-size: 32px; margin-top: 50px; margin-left: 32px; margin-bottom: 30px;}
    .scene-desc{ margin-left: 30px; font-size: 24px; }

    .auto-toast{ width: 550px; }
    .toast-line{ padding: 25px; }
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
</style>

<script>
    import { url, codeDesc, autoSupportActions } from './config/config.js'
    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import ToastDialog from '@/midea-component/toastDialog.vue'

    export default {
        computed:{
            colList(){
                var qList = this.autoList
                var tmp = []
                for (let i=  0; i<Math.ceil(qList.length/2); i++){
                    tmp[i] = []
                    tmp[i].push(qList[2*i])
                    if ( qList[2*i+1] ){
                        tmp[i].push(qList[2*i+1])
                    }
                }
                return tmp
            },
            sceneListStyle(){
                let tmp = {}
                if (this.platform == 'android'){
                    tmp.height = '840px'
                }else if (this.platform == 'iphoneX'){
                    tmp.height = '1180px'
                }else{
                    tmp.height = '1080px'
                }
                return tmp
            },
            formatSceneList(){
                let tmp = {}
                if (this.sceneList.length > 0) {
                    for (var i in this.sceneList) {
                        tmp[this.sceneList[i].roomType] = this.sceneList[i]
                    }
                }
                return tmp
            },
        },
        watch: {
            userDevices(newValue){
                let tmp = {}
                for(var i in this.userDevices) {
                    tmp[this.userDevices[i].deviceId] = this.userDevices[i].deviceName
                }
                this.formatUserDevices = tmp
            }
        },
        components: {ToastDialog},
        mixins: [base],
        data(){
            return {
                isLogin: false,
                uid: '',
                homegroupId: '',
                icon: {
                    next: 'assets/img/more_w.png',
                    autoBtn: 'assets/img/sence_ic_action_on@3x.png',
                    exe: {
                        1: 'assets/img/scene_ic_listdone@3x.png',
                        2: 'assets/img/scene_ic_listloading@3x.png',
                        3: 'assets/img/scene_ic_listundo@3x.png'
                    },
                    auto: {
                        2: 'assets/img/smart_ic_hand@3x.png',
                        3: 'assets/img/scene_ic_placeblue@3x.png',
                        4: 'assets/img/samrt_ic_clock@3x.png',
                        6: 'assets/img/scene_ic_weather@3x.png',
                    }
                },
                sceneImg: {
                    1: 'assets/img/sence_pic_parlour@3x.png',
                    2: 'assets/img/sence_pic_bedroom@3x.png',
                    3: 'assets/img/sence_pic_bathroom@3x.png',
                    4: 'assets/img/sence_pic_sun@3x.png',
                },
                feel: {
                    1: '未知',
                    2: '热水不足',
                    4: '加热中',
                    5: '热水充足'
                },
                autoList: [],
                autoListTmpl: [
                    {
                        isAdd: true,
                        image: 'assets/img/scene_ic_placeblue@3x.png',
                        sceneType: 3,
                        direction: 1,
                        name: '回家'
                    },
                    {
                        isAdd: true,
                        image: 'assets/img/scene_ic_placegreen@3x.png',
                        sceneType: 3,
                        direction: 2,
                        name: '离家'
                    },
                    {
                        isAdd: true,
                        image: 'assets/img/samrt_ic_clock@3x.png',
                        sceneType: 4,
                        name: '晚安'
                    },
                    {
                        isAdd: true,
                        image: 'assets/img/scene_ic_weather@3x.png',
                        sceneType: 6,
                        name: '天气变化'
                    }
                ],
                sceneList: [],
                sceneListTmpl: [
                    {
                        "name": "客厅",
                        "roomType": 1
                    }, {
                        "name": "卧室",
                        "roomType": 2
                    }, {
                        "name": "卫浴",
                        "roomType": 3
                    }, {
                        "name": "阳台",
                        "roomType": 4
                    }
                ],
                userDevices: [],
                userDevicesStr: '',
                user: null,
                autoTemplate: {},
                showToastDialog: false,
                autoExecuteDevices: [],
                checkAutoExeTimes: 0,
                templateCode: {
                    '3.1': '1005',
                    '3.2': '1007',
                    '4': '1006',
                    '6': '1008'
                },
                formatUserDevices: {},
                autoSupportActions: autoSupportActions
            }
        },
        methods: { 
            initData(){
                nativeService.getNetworkStatus().then((result)=>{
                    if (result.status == 1){
                        nativeService.getUserInfo().then((user)=>{
                            if (user.uid == '' || user.uid == undefined){
                                this.setTmpl()
                            }else{
                                nativeService.getCurrentHomeInfo().then( (home)=>{
                                    if (home.homeId === '' || home.homeId == undefined) {
                                        this.setTmpl()
                                    }else{
                                        this.userDevicesStr = ''
                                        if (home.deviceList) {
                                            this.userDevices = home.deviceList
                                            this.userDevicesStr = encodeURIComponent(JSON.stringify(home.deviceList))
                                        }
                                        this.getAutoList(user.uid, home.homeId)
                                        this.getSceneList(user.uid, home.homeId)
                                    }
                                }).catch((err)=>{
                                    this.setTmpl()
                                    nativeService.toast(this.getErrorMessage(err))
                                })
                            }
                        }).catch((err)=>{
                            this.setTmpl()
                            nativeService.toast(this.getErrorMessage(err))
                        })
                    } else if (result.status == 0){
                        this.setTmpl()
                    }
                })
            },
            editAuto(auto){
                this.checkLogin().then( (res) => {
                    this.getUserRole(res.uid, res.homegroupId).then((roleId)=>{
                        if (auto.isAdd){
                            if (roleId == '1001') {
                                let params = {
                                    from: 'addAuto',
                                    uid: res.uid,
                                    homegroupId: res.homegroupId,
                                    sceneType: auto.sceneType,
                                    userDevices: this.userDevicesStr,
                                    templateCode: this.templateCode[auto.sceneType]
                                }
                                if (auto.sceneType == 3) {
                                    params.direction = auto.direction
                                }
                                if (auto.sceneType == 2) {
                                    this.goTo("autoBindDevices", {}, params)
                                }else{
                                    this.goTo('autoTypeSet',{}, params)
                                }
                            }else{
                                nativeService.toast('只有家庭创建者才有权限操作')
                            }
                        }else{
                            let params = {
                                uid: res.uid,
                                homegroupId: res.homegroupId,
                                sceneType: auto.sceneType,
                                sceneId: auto.sceneId,
                                enable: auto.enable,
                                userDevices: this.userDevicesStr,
                                roleId: roleId
                            }
                            this.goTo("autoEdit", {}, params)
                        }
                    }).catch((err)=>{
                        nativeService.toast(this.getErrorMessage(err))
                    })
                })
            },
            executeAuto(sceneId){
                this.checkAutoExeTimes = 0
                this.checkLogin().then( (res) => {
                    let reqUrl = url.auto.execute
                    let reqParams = {
                        uid: res.uid,
                        homegroupId: res.homegroupId,
                        sceneId: sceneId
                    }
                    this.webRequest(reqUrl, reqParams).then((rtnData)=>{
                        if (rtnData.code == 0) {
                            this.checkExecuteAuto(sceneId,rtnData.data.resultId)
                        }else{
                            if (codeDesc.auto.hasOwnProperty(rtnData.code)) {
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
                
                nativeService.burialPoint({//埋点手动自动化执行
                    pageName: 'sceneMainPage',
                    subAction: 'scene_shortcut_operate'
                })
            },
            checkExecuteAuto(sceneId, resultId){
                this.checkLogin().then( (res) => {
                    if (this.checkAutoExeTimes < 20) {//最多查20次
                        this.checkAutoExeTimes += 1
                        let reqUrl = url.auto.executeStatus
                        let reqParams = {
                            uid: res.uid,
                            homegroupId: res.homegroupId,
                            sceneId: sceneId,
                            resultId: resultId
                        }
                        
                        this.webRequest(reqUrl, reqParams, false).then((res)=>{
                            if (res.code == 0) {
                                this.showToastDialog = true
                                this.autoExecuteDevices = res.data.list
                                
                                if (res.data.status == 2) {
                                    setTimeout(()=>{
                                        this.checkExecuteAuto(sceneId, resultId)
                                    },1000)
                                } else if(res.data.status == 3){
                                    this.showToastDialog = false
                                    nativeService.toast('自动化执行失败，请再试一次')
                                } else {
                                    setTimeout(()=>{
                                        this.showToastDialog = false
                                        setTimeout(()=>{
                                            nativeService.toast('自动化执行成功！')
                                        }, 200)
                                    },1000)
                                }
                            }else{
                                if (codeDesc.auto.hasOwnProperty(rtnData.code)) {
                                    nativeService.toast(codeDesc.auto[rtnData.code])
                                }else{
                                    nativeService.toast(rtnData.msg)
                                }
                            }
                        }).catch((err)=>{
                            nativeService.toast(this.getErrorMessage(err))
                        })
                    }else{
                        this.showToastDialog = false
                        nativeService.toast('自动化执行失败，请再试一次')
                    }
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            },
            goAddAuto(){
                this.checkLogin().then( (res) => {
                    this.getUserRole(res.uid, res.homegroupId).then((roleId)=>{
                        if (roleId == '1001') {
                            let params = {
                                uid: res.uid,
                                homegroupId: res.homegroupId,
                                userDevices: this.userDevicesStr
                            }
                            this.goTo('addAuto', {}, params)
                        }else{
                            nativeService.toast('只有家庭创建者才有权限操作')
                        }
                    }).catch((err)=>{
                        nativeService.toast(this.getErrorMessage(err))
                    })
                })
            },
            getAutoList(uid, homegroupId){
                let reqUrl = url.auto.list
                let reqParams = {
                    uid: uid,
                    homegroupId: homegroupId
                }
                this.webRequest(reqUrl, reqParams, false).then((rtnData)=>{
                    if (rtnData.code == 0) {
                        this.autoList = rtnData.data.list
                        let basicTemplate = {
                            '3.1':{
                                isAdd: true,
                                image: 'assets/img/scene_ic_placeblue@3x.png',
                                sceneType: 3,
                                direction: 1,
                                name: '回家'
                            },
                            '3.2': {
                                isAdd: true,
                                image: 'assets/img/scene_ic_placegreen@3x.png',
                                sceneType: 3,
                                direction: 2,
                                name: '离家'
                            },
                            '4': {
                                isAdd: true,
                                image: 'assets/img/samrt_ic_clock@3x.png',
                                sceneType: 4,
                                name: '晚安'
                            },
                            '6': {
                                isAdd: true,
                                image: 'assets/img/scene_ic_weather@3x.png',
                                sceneType: 6,
                                name: '天气变化'
                            }
                        }
                        let templateName = ['3.1', '3.2', '4', '6'], tmpTemp =  []
                        
                        for (var i in this.autoList) {
                            let sType = String(this.autoList[i].sceneType)
                            if (sType == '3') {
                                sType = sType + '.' +this.autoList[i].location.direction
                            }
                            if (templateName.indexOf(sType) > -1 && ['1005', '1006', '1007', '1008'].indexOf(this.autoList[i].templateCode) == -1) {
                                templateName.splice(templateName.indexOf(sType), 1)
                            }
                        }
                        for (var x in templateName) {
                            tmpTemp.push(basicTemplate[templateName[x]])
                        }
                        this.autoList = this.autoList.concat(tmpTemp)
                        
                    }else{
                        if (codeDesc.auto.hasOwnProperty(rtnData.code)) {
                            nativeService.toast(codeDesc.auto[rtnData.code])
                        }else{
                            nativeService.toast(rtnData.msg)
                        }
                    }
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            },
            getSceneList(uid, homegroupId){
                let reqUrl = url.scene.list
                let reqParams = {
                    uid: uid,
                    homegroupId: homegroupId
                }

                this.webRequest(reqUrl, reqParams, false).then((rtnData)=>{
                    if (rtnData.code == 0) {
                        this.sceneList = this.sortSceneList(rtnData.data.list)
                    }else{
                        this.sceneList = this.sceneListTmpl
                        if (codeDesc.scene.hasOwnProperty(rtnData.code)) {
                            nativeService.toast(codeDesc.scene[rtnData.code])
                        }else{
                            nativeService.toast(rtnData.msg)
                        }
                    }
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            },
            sortSceneList(sList){
                for(var i=0; i<sList.length-1; i++){
                    for(var j=0; j<sList.length-1-i; j++){
                        if(sList[j].roomType>sList[j+1].roomType){
                            var temp=sList[j]
                            sList[j]=sList[j+1]
                            sList[j+1]=temp
                        }
                    }
                }
                return sList;
            },
            setTmpl(){
                this.autoList = this.autoListTmpl
                this.sceneList = this.sceneListTmpl
            },
            goScene(scene){
                this.checkLogin().then( (res) => {
                    let params = {
                        uid: res.uid,
                        homegroupId: res.homegroupId,
                        roomType:scene.roomType,
                        sceneId: scene.sceneId,
                        userDevices: this.userDevicesStr
                    }
                    this.goTo("scene", {}, params)
                }).catch((err)=>{
                    nativeService.toast(this.getErrorMessage(err))
                })
            }
        },
        created(){
        }
    }
</script>



