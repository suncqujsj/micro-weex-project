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
                    <div v-for="item in col" class="quick row-sb"  @click="editAuto(item)">
                        <div class="row-s">
                            <image class="icon" :src="icon.auto[item.type]"></image>
                            <text class="quick-name">{{item.name}}</text>
                            <text v-if="item.desc" class="quick-desc">{{item.desc}}</text>
                        </div>
                        <image class="auto-btn" :src="icon.autoBtn[item.enable]"  @click="executeAuto(item.autoId)">
                    </div>
                </div>
            </scroller>
        </div>
        <div>
            <div class="hd"><text class="hd-name">场景</text></div> 
            <list class="scene-list">
                <cell class="scene" v-for="scene in sceneList" @click="goScene(scene)">
                    <image class="scene-bg" :src="sceneImg[scene.type]"></image>
                    <div class="scene-info">
                        <text class="scene-name">{{scene.name}}</text>
                        <div v-if="scene.type == 1 || scene.type == 2" class="row-s">
                            <text v-if="scene.indicator.temperature" class="scene-desc">室温{{scene.indicator.temperature}}, </text>
                            <text v-if="scene.indicator.humidity" class="scene-desc">湿度{{scene.indicator.humidity}}, </text>
                            <text v-if="scene.indicator.pm25" class="scene-desc">空气质量{{scene.indicator.pm25}} </text>
                        </div>
                        <div v-if="scene.type == 3" class="scene-desc">
                            <text class="scene-desc">{{feel[scene.indicator.level]}}</text>
                        </div>
                        <div v-if="scene.type == 4" class="scene-dexc">
                            <text class="scene-desc">{{scene.indicator.work_stats}}</text>
                        </div>
                        <image v-if="scene.applianceCount>0" class="next" :src="icon.next"></image>
                    </div>
                </cell>
            </list>
        </div>
    </scroller>
</template>

<style>
    .wrap { padding:30px; }
    .row-s { flex-direction: row; align-items: center; justify-content: flex-start; }
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .row-sa{ flex-direction: row; align-items: center; justify-content: space-around; }
    .row-e { flex-direction: row; align-items: center; justify-content: flex-end; }
    .hd   { margin-top: 24px; margin-bottom: 24px; }
    .hd-name{ font-weight: bold; font-size: 36px; color: #000; }
    .hd-btn{ font-size: 24px; color: #666; padding: 10px;}
    .scroller{ flex-direction: row; }
    .icon { width: 82px; height: 82px; margin-right: 20px; }
    .auto-btn{ width: 50px; height: 50px; }
    .quick{
        width: 320px;
        height: 122px;
        background-color: #F6F6F6;
        margin-bottom: 16px;
        margin-right: 16px;
        padding: 20px;
    }
    .quick-name{ width: 120px; font-size: 28px; color: #666666; margin-bottom: 8px; text-overflow: clip; lines: 1  }
    .quick-desc{ width: 120px; font-size: 24px; color: #C7C7CC; lines:1; }
    .scene { width: 680px; height: 206px; padding-bottom: 16px; position: relative; }
    .scene-bg{ width: 680px; height: 185px; position: absolute; }
    .scene-info{ position:relative; }
    .next { width: 16px; height: 32px; position:absolute; top:77px; right: 25px;}
    .scene-name, .scene-desc{ color: #fff; }
    .scene-name{ font-size: 32px; margin-top: 40px; margin-left: 32px; margin-bottom: 30px;}
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
                    auto: {
                        1: 'assets/img/slhome.png',
                        2: 'assets/img/slsleep.png',
                        3: 'assets/img/slweather.png',
                        4: 'assets/img/slhome.png',
                        5: 'assets/img/slweather.png'
                    },
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
                        "image": "145265",
                        "timeZone": "00:00-10:30;12:00-20:00;22:30-23:30",
                        "updateTime": "2018-06-23 18:23:56",
                        "homegroupId": 4212096,
                        "weekly": "1111111",
                        "task": {
                            "modelNum": "1000",
                            "applianceType": "0xAC",
                            "applianceCode": 211106232556174,
                            "command": {
                                "mode": "auto",
                                "power": "on"
                            }
                        },
                        "sceneType": 4,
                        "createTime": "2018-06-23 18:23:56",
                        "enable": 1,
                        "sceneId": 78,
                        "name": "我的场景",
                        "weather": {
                            "cityNo": "125456210",
                            "latitude": "23.56",
                            "temperature": "25",
                            "weatherStatus": "晴",
                            "logical": ">",
                            "longitude": "105.65"
                        },
                        "location": {
                            "address": "A8音乐大厦",
                            "distance": "500",
                            "latitude": "23.56",
                            "directionName": "接近位置",
                            "direction": "inside",
                            "longitude": "105.65"
                        },
                        "startTime": "23:40"
                    },
                    {
                        "image": "145265",
                        "timeZone": "00:00-10:30;12:00-20:00;22:30-23:30",
                        "updateTime": "2018-06-23 18:23:02",
                        "homegroupId": 4212096,
                        "weekly": "1111111",
                        "task": {
                            "modelNum": "1",
                            "applianceType": "0xAC",
                            "applianceCode": 17592186045673,
                            "command": {
                                "mode": "auto",
                                "wind_speed": "",
                                "power": "on"
                            }
                        },
                        "sceneType": 6,
                        "createTime": "2018-06-23 17:14:15",
                        "enable": 1,
                        "sceneId": 69,
                        "name": "我的场景",
                        "weather": {
                            "cityNo": "125456210",
                            "latitude": "23.56",
                            "temperature": "25",
                            "weatherStatus": "晴",
                            "logical": ">",
                            "longitude": "105.65"
                        },
                        "location": {
                            "address": "A8音乐大厦",
                            "distance": "500",
                            "latitude": "23.56",
                            "directionName": "接近位置",
                            "direction": "1",
                            "longitude": "105.65"
                        },
                        "startTime": "22:57"
                    },
                    {
                        "sceneType": 5,
                        "createTime": "2018-06-13 21:12:24",
                        "enable": 1,
                        "sceneId": 67,
                        "name": "阳台",
                        "weather": "",
                        "updateTime": "2018-06-13 21:12:24",
                        "location": "",
                        "homegroupId": 150366
                    },
                    {
                        "task": {
                            "modelNum": "20",
                            "applianceType": "0xE2",
                            "applianceCode": 17592186045469
                        },
                        "sceneType": 5,
                        "createTime": "2018-06-13 21:11:01",
                        "enable": 1,
                        "sceneId": 66,
                        "name": "卫浴",
                        "weather": "",
                        "updateTime": "2018-06-13 21:11:01",
                        "location": "",
                        "homegroupId": 150366
                    },
                    {
                        "task": {
                            "applianceType": "0xFA",
                            "applianceCode": 21990232670864
                        },
                        "sceneType": 5,
                        "createTime": "2018-06-13 20:03:24",
                        "enable": 1,
                        "sceneId": 65,
                        "name": "客厅",
                        "weather": "",
                        "updateTime": "2018-06-23 11:07:02",
                        "location": "",
                        "homegroupId": 150366
                    },
                    {
                        "image": "145265",
                        "timeZone": "00:00-10:30;12:00-20:00;22:30-23:30;",
                        "updateTime": "2017-11-24 21:13:25",
                        "homegroupId": 150366,
                        "weekly": "1111111",
                        "task": {
                            "modelNum": "1000",
                            "applianceType": "0xAC",
                            "applianceCode": 211106232556174,
                            "command": {
                                "mode": "auto",
                                "power": "on"
                            }
                        },
                        "sceneType": 4,
                        "createTime": "2017-11-24 21:13:25",
                        "enable": 1,
                        "sceneId": 64,
                        "name": "我的场景",
                        "weather": "",
                        "location": {
                            "address": "A8音乐大厦",
                            "distance": "500",
                            "latitude": "23.56",
                            "directionName": "接近位置",
                            "direction": "inside",
                            "longitude": "105.65"
                        },
                        "startTime": "23:40"
                    }
                ],
                sceneList: [],
                user: null
            }
        },
        methods: {  
            itemClicked(){
            },
            goScene(scene){
                this.goTo("scene", {}, { sceneType:scene.type, sceneId: scene.sceneId })
            },
            editAuto(auto){
                this.goTo("autoEdit", {}, { sceneType: auto.sceneType })
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
                        nativeService.setItem('userAutos', JSON.stringify(rtnData.data.list))
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
            // nativeService.getUserInfo().then((res)=>{
            //     nativeService.alert(res)
            //     that.user = res
            //     nativeService.setItem('user', res)
            // })
        
            nativeService.setItem('uid', this.uid)
            nativeService.setItem('homegroupId', this.homegroupId)

            this.getAutoList()
            this.getSceneList()
            
            // nativeService.getCurrentHomeInfo().then( (res)=>{
            //     nativeService.setItem('home', JSON.stringify(res))
            // }).catch((err)=>{
            //     nativeService.alert(err)
            // })
        }
    }
</script>



