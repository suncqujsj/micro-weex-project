<template>
   <div class="wrap" :style="wrapStyle">
        <midea-header :title="header.title" :bgColor="header.bgColor" :titleText="header.color" :leftImg="header.leftImg" @leftImgClick="goBack" :showRightImg="true" :rightImg="header.rightImg" @rightImgClick="goAddQuickStart"></midea-header>
        <div class="content">
            <midea-list style="background-color:#fff" v-for="(item,i) in autoList" :idx="i" :hasWrapBorder="false" leftMargin="25px">
                <midea-cell :title="item.name" height="146" :hasArrow="true" :itemImg="item.image" :hasBottomBorder="false" @mideaCellClick="editAuto(item)"></midea-cell>
            </midea-list>
        </div>
   </div>
</template>

<style>
    .wrap{
        background-color: #f2f2f2;
    }
    .content{
        margin-top: 16px;
    }
</style>

<script>
    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import MideaCell from '@/midea-component/cell.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
    export default {
        components:{ MideaHeader, MideaCell, mideaList },
        computed:{
            wrapStyle(){
                let tmp = {
                    height: this.pageHeight+'px'
                }
                return tmp
            }
        },
        mixins: [base],
        data(){
            return {
                header: {
                    title: '编辑快捷操作',
                    bgColor: '#fff',
                    color: '#111',
                    leftImg: 'assets/img/b.png',
                    rightImg: 'assets/img/add.png'
                },
                autoList:  [
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
            }
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            goAddQuickStart(){
                nativeService.goTo('addAuto.js')
            },
            editAuto(auto){
                this.goTo("autoEdit", {}, { sceneType: auto.sceneType })
            },
        },
        created(){
            this.getItem('userAutos', (res)=>{
                nativeService.alert(1111)
                if ( res.result == 'success') {
                    this.autoList = res.data
                }
            })
        }
    }
</script>


