<template>
   <div class="wrap" :style="wrapStyle">
        <midea-header :title="header.title" :bgColor="header.bgColor" :titleText="header.color" :leftImg="header.leftImg" @leftImgClick="goBack"></midea-header>
        <div class="next" @click="goNext()">
            <text class="next-text white">下一步</text>
        </div>
        <div class="content">
            <text class="hd">选择条件</text>
            <midea-list v-for="(item,idx) in autos" :idx="idx" :hasWrapBorder="false" leftMargin="25px" :style="{backgroundColor: '#fff'}">
                <div class="list-item">
                    <check-item :title="item.title" :icon="item.icon" :desc="item.desc" :titleStyle="style.title" :status="activeTypeIndex == idx" @itemClick="selectType(idx)" mode="radio"></check-item>
                </div>
            </midea-list>
        </div>
   </div>
</template>

<style>
    .wrap{
        background-color: #f2f2f2;
    }
    .next{
        position:fixed;
        right: 10px;
        top: 30px;
    }
    .next-text{
        font-size: 32px;
    }
    .hd{
        padding: 25px;
        font-size: 28px;
        color: #777;
    }
    .list-item{
        padding-top: 18px;
        padding-bottom: 18px;
    }
</style>

<script>
    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import MideaCell from '@/midea-component/cell.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
    import checkItem from '@/midea-rooms/components/checkItem.vue'
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
                header: {
                    title: '新建快捷操作',
                    bgColor: '#fff',
                    color: '#111',
                    leftImg: 'assets/img/b.png',
                    rightImg: 'assets/img/b.png'
                },
                autos: [ // 自动化项目类型，1-设备事件，2-手动执行， 3-距离触发， 4-定时执行 ， 5-区域， 6-天气变化
                    {
                        title: '手动',
                        desc: '',
                        icon: 'assets/img/man.png',
                        sceneType: 2
                    },
                    {
                        title: '在某个时间',
                        desc: '例如每天晚上5:00打开电热水器',
                        icon: 'assets/img/clock.png',
                        sceneType: 4
                    },
                    {
                        title: '到达某地',
                        desc: '例如到家时自动打开空调',
                        icon: 'assets/img/arrive.png',
                        sceneType: 3,
                        direction: 1
                    },
                    {
                        title: '离开某地',
                        desc: '例如离家时自动打开空调',
                        icon: 'assets/img/arrive.png',
                        sceneType: 3,
                        direction: 2
                    },
                    {
                        title: '天气变化时',
                        desc: '例如气温降到15度时打开电暖器',
                        icon: 'assets/img/slweather.png',
                        sceneType: 6
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
            selectType(index){
                this.activeTypeIndex = index
            },
            goNext(){
                if (this.autos[this.activeTypeIndex].sceneType == 2){
                    this.goTo('autoBindDevices')
                }else if ( this.autos[this.activeTypeIndex].sceneType == 3){
                    this.goTo('autoTypeSelect', {}, { sceneType: this.autos[this.activeTypeIndex].sceneType, direction: this.autos[this.activeTypeIndex].direction })
                }else{
                    this.goTo('autoTypeSelect', {}, { sceneType: this.autos[this.activeTypeIndex].sceneType })
                }
            }
        },
        created(){
        }
    }
</script>


