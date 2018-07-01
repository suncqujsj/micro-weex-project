// 美居场景首页
<template>
    <scroller class="wrap"  :show-scrollbar="false">
        <div>
            <div class="hd row-sb">
                <text class="hd-name">快捷操作</text>
                <text class="hd-btn" @click="goAddAuto">添加</text>
            </div>
            <scroller class="scroller" scroll-direction="horizontal" :show-scrollbar="false">
                <div v-for="col in colList">
                    <div v-for="item in col" class="auto row-sb"  @click="editAuto(item)">
                        <div class="row-s">
                            <image class="icon" :src="item.image"></image>
                            <text class="auto-name">{{item.name}}</text>
                        </div>
                        <image class="auto-btn" :src="icon.autoBtn[item.enable]"  @click="executeAuto(item.autoId)">
                    </div>
                </div>
            </scroller>
        </div>
        <div>
            <div class="hd"><text class="hd-name">场景</text></div> 
            <div class="scene-list" v-if="sceneList">
                <div class="scene" v-for="scene in sceneList" @click="goScene(scene)">
                    <image class="scene-bg" :src="sceneImg[scene.roomType]"></image>
                    <div class="scene-info">
                        <text class="scene-name">{{scene.name}}</text>
                        <div v-if="scene.roomType == 1 || scene.roomType == 2" class="row-s">
                            <text v-if="scene.indicator.temperature" class="scene-desc">室温{{scene.indicator.temperature}}, </text>
                            <text v-if="scene.indicator.humidity" class="scene-desc">湿度{{scene.indicator.humidity}}, </text>
                            <text v-if="scene.indicator.pm25" class="scene-desc">空气质量{{scene.indicator.pm25}} </text>
                        </div>
                        <div v-if="scene.roomType == 3" class="scene-desc">
                            <text class="scene-desc">{{feel[scene.indicator.level]}}</text>
                        </div>
                        <div v-if="scene.roomType == 4" class="scene-dexc">
                            <text class="scene-desc">{{scene.indicator.work_stats}}</text>
                        </div>
                        <image v-if="scene.applianceCount>0" class="next" :src="icon.next"></image>
                    </div>
                </div>
            </div>
        </div>
    </scroller>
</template>

<style>
    .wrap { padding-left:30px; padding-right:30px; flex-direction: column;}
    .row-s { flex-direction: row; align-items: center; justify-content: flex-start; }
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .row-sa{ flex-direction: row; align-items: center; justify-content: space-around; }
    .row-e { flex-direction: row; align-items: center; justify-content: flex-end; }
    .hd { margin-top: 24px; margin-bottom: 24px; }
    .hd-name{ font-weight: bold; font-size: 36px; color: #000; }
    .hd-btn{ font-size: 24px; color: #666; padding: 10px;}
    .scroller{ flex-direction: row; height: 276px;}
    .icon { width: 82px; height: 82px; margin-right: 20px; }
    .auto-btn{ width: 50px; height: 50px; }
    .auto{
        width: 320px;
        height: 122px;
        background-color: #F6F6F6;
        margin-bottom: 16px;
        margin-right: 16px;
        padding: 20px;
    }
    .auto-name{ width: 120px; font-size: 28px; color: #666666; margin-bottom: 8px; text-overflow: clip; lines: 1  }
    /* .auto-desc{ width: 120px; font-size: 24px; color: #C7C7CC; lines:1; } */
    .scene-list{ height:1000px; }
    .scene { width: 690px; height: 206px; padding-bottom: 16px; position: relative; }
    .scene-bg{ width: 690px; height: 185px; position: absolute; }
    .next { width: 16px; height: 32px; position:absolute; top:77px; right: 25px;}
    .scene-name, .scene-desc{ color: #fff; }
    .scene-name{ font-size: 32px; margin-top: 50px; margin-left: 32px; margin-bottom: 30px;}
    .scene-desc{ margin-left: 24px; font-size: 24px; }
</style>

<script>
    import { url } from './config/config.js'
    import base from './base'
    import nativeService from '@/common/services/nativeService.js'

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
            }
        },
        mixins: [base],
        data(){
            return {
                uid: 'ac70d2636c0c4dd5b86bc97bbc8166c6',
                homegroupId: '150366',
                icon: {
                    next: 'assets/img/more_w.png',
                    autoBtn:{
                        0: 'assets/img/auto_btn.png',
                        1: 'assets/img/autooo.png',
                    }
                },
                sceneImg: {
                    1: 'assets/img/parlour.png',
                    2: 'assets/img/bed.png',
                    3: 'assets/img/bath.png',
                    4: 'assets/img/balcony.png',
                },
                feel: {
                    1: '未知',
                    2: '热水不足',
                    4: '加热中',
                    5: '热水充足'
                },
                autoList: [
                    {
                        "image": "assets/img/hand.png",
                        "task": [
                            {
                                "applianceCode": 111111,
                                "command": {
                                    "mode": "auto",
                                    "power": "true"
                                }
                            },
                            {
                                "applianceCode": 2222222,
                                "command": {
                                    "mode": "auto",
                                    "power": "false"
                                }
                            }
                        ],
                        "sceneType": 2,
                        "createTime": "2018-07-01 18:16:33",
                        "enable": 1,
                        "sceneId": 103,
                        "name": "手动",
                        "weather": "",
                        "updateTime": "2018-07-01 18:16:33",
                        "location": "",
                        "homegroupId": 150366,
                        "weekly": "1111111"
                    }
                ],
                sceneList: null,
                user: null,
                autoTemplate: {}
            }
        },
        methods: {  
            itemClicked(){
            },
            goScene(scene){
                if (scene.applianceCount <= 0 ) {
                    nativeService.toast('您在该场景下没有设备，请关联设备')
                    return
                }
                this.goTo("scene", {}, { roomType:scene.roomType, sceneId: scene.sceneId })
                
            },
            editAuto(auto){
                if (auto.isAdd){                    
                    this.goTo('autoTypeSet',{}, {sceneType: auto.sceneType})
                }else{
                    let params = {
                        sceneType: auto.sceneType,
                        sceneId: auto.sceneId
                    }
                    this.goTo("autoEdit", {}, params)
                }
            },
            executeAuto(autoId){
                nativeService.alert('executeAuto')
            },
            goAddAuto(){
                nativeService.goTo('addAuto.js')
            },
            getAutoList(){
                let reqUrl = url.auto.list
                let reqParams = {
                    uid: this.uid,
                    homegroupId: this.homegroupId
                }
                this.webRequest(reqUrl, reqParams).then((rtnData)=>{
                    if (rtnData.code == 0) {
                        this.autoList = rtnData.data.list
                        let basicTemplate = {
                            '2': {
                                isAdd: true,
                                image: 'assets/img/hand.png',
                                sceneType: 2,
                                name: '手动'
                            },
                            '3.1':{
                                isAdd: true,
                                image: 'assets/img/location.png',
                                sceneType: 3,
                                direction: 1,
                                name: '到达某地'
                            },
                            '3.2': {
                                isAdd: true,
                                image: 'assets/img/location.png',
                                sceneType: 3,
                                direction: 2,
                                name: '离开某地'
                            },
                            '4': {
                                isAdd: true,
                                image: 'assets/img/clock.png',
                                sceneType: 4,
                                name: '在某个时间'
                            },
                            '6': {
                                image: 'assets/img/slweather.png',
                                sceneType: 6,
                                name: '在某个时间'
                            }
                        }
                        let templateName = ['2', '3.1', '3.2', '4', '6'], tmpTemp =  []
                        for (var i in this.autoList) {
                            let sType = String(this.autoList[i].sceneType)
                            if (sType == '3') {
                                sType = sType + '.' +this.autoList[i].location.direction
                            }
                            templateName.splice(templateName.indexOf(sType), 1)
                        }
                        for (var x in templateName) {
                            tmpTemp.push(basicTemplate[templateName[x]])
                        }
                        this.autoList = this.autoList.concat(tmpTemp)
                        
                    }
                }).catch( (error )=>{
                })
            },
            getSceneList(){
                let reqUrl = url.scene.list
                let reqParams = {
                    uid: this.uid,
                    homegroupId: this.homegroupId
                }
                this.webRequest(reqUrl, reqParams).then((rtnData)=>{
                    if (rtnData.code == 0) {
                        this.sceneList = rtnData.data.list
                    }else{
                        nativeService.toast(rtnData.msg)
                    }
                }).catch( (error )=>{
                    nativeService.alert(error)
                })
            },
        },
        created(){
            /*
                获取用户信息-> 获取家庭id-> 获取自动化列表->获取场景列表
            */
            let that = this
            nativeService.getUserInfo().then((res)=>{
                that.user = res
                nativeService.setItem('user', res)
            })
        
            nativeService.setItem('uid', this.uid)
            nativeService.setItem('homegroupId', this.homegroupId)

            this.getAutoList()
            // this.getSceneList()
            
            // nativeService.getCurrentHomeInfo().then( (res)=>{
            //     nativeService.setItem('home', JSON.stringify(res))
            // }).catch((err)=>{
            //     nativeService.toast(err)
            // })
            
        }
    }
</script>



