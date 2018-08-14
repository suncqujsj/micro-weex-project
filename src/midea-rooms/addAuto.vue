<template>
   <div class="wrap" :style="wrapStyle">
        <midea-header :title="header.title" :isImmersion="isipx?false:true" :bgColor="header.bgColor" :titleText="header.color" :leftImg="header.leftImg" @leftImgClick="goBack"></midea-header>
        <div class="content">
            <!-- <text class="hd">选择条件</text> -->
            <midea-list v-for="(item,idx) in autos" :idx="idx" :hasWrapBorder="false" leftMargin="25px" :style="{backgroundColor: '#fff'}">
                <div class="list-item row-sb" @click="goNext(item)">
                    <div class="row-s">
                        <image class="icon-type" :src="item.icon"></image>
                        <div>
                            <text class="name">{{item.title}}</text>
                            <text class="desc">{{item.desc}}</text>
                        </div>
                    </div>
                    <image class="next" :src="icon.more"></image>
                </div>
            </midea-list>
        </div>
   </div>
</template>

<style>
    .row-s{
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }
    .row-sb{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .wrap{
        background-color: #f2f2f2;
    }
    .list-item{
        padding-top: 26px;
        padding-bottom: 26px;
    }
    .next{
        width: 8px;
        height: 16px;
        margin-right: 25px;
    }
    .content{
        margin-top: 25px;
    }
    .icon-type{
        width: 82px;
        height: 82px;
        margin-right: 24px;
    }
    .name{
        font-size: 32px;
        padding-bottom: 8px;
    }
    .desc{
        font-size: 24px;
        color: #666;
    }
</style>

<script>
    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import MideaCell from '@/midea-component/cell.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
    import checkItem from '@/midea-rooms/components/checkItem.vue'


    const channelAddAuto = new BroadcastChannel('autoBroadcast')

    export default {
        components:{ MideaHeader, MideaCell, mideaList, checkItem },
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
                icon: {
                    more: 'assets/img/more.png'
                },
                header: {
                    title: '新建快捷操作',
                    bgColor: '#fff',
                    color: '#111',
                    leftImg: 'assets/img/public_ic_back@3x.png'
                },
                autos: [ // 自动化项目类型，1-设备事件，2-手动执行， 3-距离触发， 4-定时执行 ， 5-区域， 6-天气变化
                    {
                        title: '手动',
                        desc: '',
                        icon: 'assets/img/smart_ic_hand@3x.png',
                        sceneType: 2
                    },
                    {
                        title: '在某个时间',
                        desc: '例如每天晚上5:00打开电热水器',
                        icon: 'assets/img/samrt_ic_clock@3x.png',
                        sceneType: 4
                    },
                    {
                        title: '天气变化时',
                        desc: '例如气温降到15度时打开电暖器',
                        icon: 'assets/img/scene_ic_weather@3x.png',
                        sceneType: 6
                    },
                    {
                        title: '到达某地',
                        desc: '例如到家时自动打开空调',
                        icon: 'assets/img/scene_ic_placeblue@3x.png',
                        sceneType: 3,
                        direction: 1
                    },
                    {
                        title: '离开某地',
                        desc: '例如离家时自动打开空调',
                        icon: 'assets/img/scene_ic_placegreen@3x.png',
                        sceneType: 3,
                        direction: 2
                    }
                    // {
                    //     title: '室内温度/湿度/PM2.5变化时',
                    //     desc: '例如室内PM2.5高于40时打开净化器',
                    //     icon: 'assets/img/slsleep.png',
                    //     sceneType: 5,
                    // },
                    // {
                    //     title: '设备状态变化时',
                    //     desc: '例如门锁打开时',
                    //     icon: 'assets/img/user.png',
                    //     sceneType: 1
                    // }
                ],
                activeTypeIndex: 0,
                style: {
                    title: {
                        fontSize: '32px'
                    }
                }
            }
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            goNext(item){
                this.checkLogin().then( (uid) => {
                    let params = {
                        from: 'addAuto',
                        uid: uid,
                        homegroupId: this.homegroupId,
                        sceneType: item.sceneType,
                        userDevices: nativeService.getParameters('userDevices')
                    }
                    if (item.sceneType == 2){
                        this.goTo('autoBindDevices', {}, params)
                    }else if ( item.sceneType == 3){
                        params.direction = item.direction
                        this.goTo('autoTypeSet', {}, params)
                    }else{
                        this.goTo('autoTypeSet', {}, params)
                    }
                })
            }
        },
        created(){
            this.homegroupId = nativeService.getParameters('homegroupId')
        }
    }
</script>


