<template>
   <div class="wrap" :style="wrapStyle">
        <midea-header :title="title" :bgColor="header.bgColor" :titleText="header.color" :leftImg="header.leftImg" @leftImgClick="goBack"></midea-header>
        <div  class="next" @click="goNext()">
            <text v-if="sceneType != 3" class="next-text white">下一步</text>
        </div>
        <div class="content">
            <!-- <div v-if="type==1">
            </div> -->
            <div style="background-color: #fff" v-if="sceneType == 3">
                <wxc-searchbar ref="wxc-searchbar" returnKeyType="search"
                    @wxcSearchbarCancelClicked="searchCancel"
                    @wxcSearchbarInputReturned="searchInputReturned"
                    @wxcSearchbarInputOnInput="searchInputOnInput"
                    @wxcSearchbarCloseClicked="searchClose"
                    @wxcSearchbarInputOnFocus="searchInputFocus"
                    @wxcSearchbarInputOnBlur="searchInputBlur">
                </wxc-searchbar>
                <midea-map-view class="map" :data="mapData" @marker-pick="mapMarkerPick" @point-pick="mapPointPick"></midea-map-view>
            </div>
            <div v-if="sceneType==4">
                <text class="hd">时间</text>
                <div class="time-picker row-sb">
                    <scroll-picker :wrapWidth="375" :listArray="hours" @onChange="setActiveHour"></scroll-picker>
                    <scroll-picker :wrapWidth="375" :listArray="minutes" @onChange="setActiveMinute"></scroll-picker>
                </div>
            </div>
            <!-- <div v-if="sceneType==5">
                <text class="hd">选择条件</text>
                <div>
                    <div v-for="(item,idx) in indoor.items">
                        <midea-cell :title="item.title" :cellStyle="{paddingLeft: '30px'}">
                             <midea-switch2 :checked="item.showSwitch" @onchange="onOffIndoorSwitch(item, idx)" width="70" height="38" slot="value"></midea-switch2>
                        </midea-cell>
                        <div v-if="item.showSwitch" class="indoor-value-panel">
                            <midea-cell :title="switchs[item.switchStatus]"  :hasArrow="true" @mideaCellClick="setIndoorSubConditionSwitch(item, idx)" :cellStyle="{paddingLeft: '30px'}"></midea-cell>
                            <scroll-picker :listArray="item.valueList" @onChange="setIndoorSubConditionValue"></scroll-picker>
                        </div>
                    </div>
                </div>
            </div> -->
            <div v-if="sceneType==6">
                <text class="hd">天气</text>
                <div>
                     <midea-list style="background-color:#fff" v-for="(item,i) in weather.data" :idx="i" :hasWrapBorder="false" leftMargin="25px">
                        <check-item :title="item" @itemClick="selectWeather(i)" :status="weather.activeTypeIndex==i" mode="radio"></check-item>
                    </midea-list>
                </div>
                <div class="box">
                    <midea-cell title="气温" :hasArrow="true" @mideaCellClick="setWeatherSwitch" :cellStyle="{paddingLeft: '30px'}" :rightText="switchs[weather.activeSwitch]"></midea-cell>
                    <scroll-picker :wrapWidth="750" :wrapHeight="320" :listArray="weatherTemperature" @onChange="setActiveWeatherTemperature"></scroll-picker>
                </div>
            </div>
            <div class="repeat">
                <text class="hd">重复</text>
                <div class="row-sa repeat-week">
                    <text :class="['week', item.repeat==1?'week-active':'']" v-for="(item,i) in week" @click="setRepeat(i)">{{item.title}}</text>
                </div>
            </div>
        </div>
        <scroller v-if="sceneType== 3 && showMapSearchResult" class="map-result">
            <div v-if="mapSearchResult.length > 0">
                <div v-for="(item,i) in mapSearchResult" @click="goNext(item)">
                    <text :class="['map-result-item', i==0?'noborder':'']">{{item.key}}-{{item.district}} </text>
                </div>
                <text class="no-more">没有更多了...</text>
            </div>
            <div v-else>
                <text>什么都没有搜到呢，换个关键词试试吧</text>
            </div>
        </scroller>
        <image v-if="sceneType==3" class="map-icon" :src="icon.map" @click="goCurrentLocation"></image>
        <div class="modal">
            <!-- 天气弹窗 -->
            <midea-dialog  :show="weather.showDialog" @close="closeDialog('weather')" @mideaDialogCancelBtnClicked="dialogCancel('weather')" @mideaDialogConfirmBtnClicked="weatherDialogConfirm" >
                <text slot="content">需要切换模式为{{switchs[switchTo[weather.activeSwitch]] }}某个温度吗？</text>
            </midea-dialog>
        </div>
   </div>
</template>

<style>
    .row-sa{ flex-direction: row; align-items: center; justify-content: space-around; }
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .wrap{
        background-color: #f2f2f2;
    }
    .next{
        position:fixed;
        right: 10px;
        top: 30px;
    }
    .next-text{
        padding: 10px;
        font-size: 32px;
    }
    .hd{
        padding-top: 34px;
        padding-left: 25px;
        padding-right: 25px;
        padding-bottom: 14px;
        font-size: 28px;
        color: #777;
    }
    .box{
        margin-top: 23px;
    }
    .time-picker{
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #fff;
        height: 434px;
    }
    .hour, .minute{
        font-size: 40px;
        color: #333;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 80px;
        padding-right: 80px;
    }
    .line-cover{
        height: 70px;
        border-top-width: 2px;
        border-top-color: #C8C7CC;
        border-top-style: solid;
        border-bottom-width: 2px;
        border-bottom-color: #CDCDCD;
        border-bottom-style: solid;
        position: absolute;
        top: 182px;
        left: 0px;
        right: 0px;
        padding-left: 300px;
        padding-right: 150px;
    }
    .hour-unit{
        margin-right: 230px;
    }
    .repeat-week{
        background-color: #fff;
        width: 750px;
        padding-top: 21px;
        padding-bottom: 21px;
    }
    .week{
        background-color: #C7C7CC;
        border-radius: 28px;
        width: 56px;
        height: 56px;
        color: #fff;
        font-size: 28px;
        text-align: center;
        padding-top: 10px;
    }
    .week-active{
        background-color: #267AFF;
    }
    .indoor-value-panel{
       padding-top:12px;
       padding-bottom: 13px;
       height: 0;
    }
    .map{
        width: 750px;
        height: 750px;
    }
    .map-icon{
        position: fixed;
        width: 82px;
        height: 82px;
        top: 800px;
        right: 25px;
    }
    .map-result{
        height: 450px;
        width: 750px;
        padding-bottom: 25px;
        position: fixed;
        top: 172px;
        left: 0;
        right: 0;
        background-color: #fff;
    }
    .map-result-item{
        margin-left: 25px;
        padding-right: 25px;
        padding-top: 25px;
        padding-bottom: 25px;
        border-top-width: 2px;
        border-top-style: solid;
        border-top-color: #e5e5e5;
    }
    .noborder{
        border-top-color: transparent;
    }
    .no-more{
        padding:25px;
        text-align: center;
        color: #777;
    }
</style>

<script>
    const animation = weex.requireModule('animation')

    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import MideaCell from '@/midea-component/cell.vue'
    import mideaDialog from '@/midea-component/dialog.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
    import checkItem from '@/midea-rooms/components/checkItem.vue'
    import scrollPicker from '@/midea-rooms/components/scrollPicker.vue'
    import WxcSearchbar from '@/midea-rooms/components/WxcSearchbar.vue'
    
    export default {
        components:{
            MideaHeader, MideaCell, mideaDialog, WxcSearchbar,
            mideaList, scrollPicker, checkItem
        },
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
                    map: 'assets/img/location.png',
                    mapNormal: "assets/img/service_ic_pin@3x.png",
                    mapClick: "assets/img/service_ic_pin@3x.png"
                },
                title: '',
                header: {
                    bgColor: '#fff',
                    color: '#111',
                    leftImg: 'assets/img/b.png',
                    rightImg: 'assets/img/b.png'
                },
                sceneType: '',
                direction: '',
                hours: [],
                minutes: [],
                week: [
                    { title: '一', value: 'Monday', repeat: 0 },
                    { title: '二', value: 'Tuesday', repeat: 0 },
                    { title: '三', value: 'Wednesday', repeat: 0 },
                    { title: '四', value: 'Thursday', repeat: 0 },
                    { title: '五', value: 'Friday', repeat: 0 },
                    { title: '六', value: 'Saturday', repeat: 0 },
                    { title: '日', value: 'Sunday', repeat: 0 }
                ],
                weather: {
                    data: ['晴','阴天','下雨','下雪'],
                    activeTypeIndex: 0,
                    activeSwitch: 'min',
                    showDialog: false
                },
                switchs: {
                    min: '低于',
                    max: '高于'
                },
                switchTo: {
                    min: 'max',
                    max: 'min'
                },
                activeHour: '',
                activeMinute: '00',
                activeWeatherTemperature: '',
                activeWeatherStatus: '',
                gpsInfo: {},
                showMapSearchResult: false,
                mapSearchResult: [],
                mapCenter: {
                    latitude: 22.93,
                    longitude: 113.2,
                    zoom: 10 //地图显示范围 4-21级 （最大是21级）,非必选
                },
                mapMarkers: []
            }
        },
        computed: {
            wrapStyle(){
                let tmp = {
                    height: this.pageHeight+'px'
                }
                return tmp
            },
            condition(){
                return this.options[this.type] || ''
            },
            mapData(){
                let tmp = {
                    center: {
                        latitude: 22.93,
                        longitude: 113.2,
                        zoom: 10 //地图显示范围 4-21级 （最大是21级）,非必选
                    },
                    markers: []
                }

                if (this.mapCenter) {
                    tmp. center = this.mapCenter
                }
                if (this.mapMarkers) {
                    tmp.markers = this.mapMarkers
                }
                return tmp
            }
        },
        methods: {
            initData(){
                this.sceneType = nativeService.getParameters('sceneType')
                if (this.sceneType == 3) {
                    this.direction = nativeService.getParameters('direction')
                    if (this.direction == 1) {
                        this.title = '到达某地'
                    }else if (this.direction == 2) {
                        this.title = '离开某地'
                    }
                   
                }
                if (this.sceneType == 4){
                    this.title = '在某个时间'
                    this.hours = this.generateListArray(0,23)
                    this.minutes = this.generateListArray(0,59)
                }
                if (this.sceneType == 6){
                    this.title = '天气变化'
                    this.weatherTemperature = this.generateListArray(-10,40)
                }
              
            },
            goBack(){
                nativeService.goBack()
            },
            setRepeat(i){
                let tmp = {
                    0: 1,
                    1: 0
                }
                this.week[i].repeat = tmp[this.week[i].repeat]
            },
            generateListArray(min, max){
                let tmp = []
                let len  = max-min+1
                for (let i=0; i<len; i++){
                    tmp[i] = { index: i, value: ( (i+min)<9 && (i+min)>=0 )?'0'+(i+min):(i+min) }
                }
                return tmp
            },
            dialogCancel(type){
                this[type].showDialog = false
            },
            closeDialog(type){
                this[type].showDialog = false
            },
            /*
                indoorDialogConfirm(){
                    this.indoor.items[this.indoor.activeSubIndex].switchStatus = this.switchTo[this.indoor.items[this.indoor.activeSubIndex].switchStatus]
                    this.indoor.showDialog = false//关弹窗
                },
                onOffIndoorSwitch(item, index){
                    this.indoor.items[index].showSwitch = !item.showSwitch//打开或关闭子天气设置面板
                },
                setIndoorSubConditionSwitch(item, index){
                    this.indoor.showDialog = true //弹窗
                    this.indoor.activeSubIndex = index
                    this.indoor.activeSwitchStatus = item.switchStatus//为弹窗设置子天气开关状态值
                    this.indoor.activeSubTypeName = item.title//为弹窗设置子天气开关状态值
                },
                setIndoorSubConditionValue(item){
                },
            */
            // 时间 start
            setActiveHour(hour){
                this.activeHour = hour.value
            },
            setActiveMinute(minute){
                this.activeMinute = minute.value
            },
            // 时间 end
            // 地图部分 start
            mapMarkerPick(item) {
            },
            mapPointPick(item) {
            },
            searchLocation(searchKey){
                let searchParam = {
                    keyword: searchKey,
                    operation: 'searchMapAddress'
                }
                if (!this.gpsInfo) {
                    nativeService.alert('获取不到当前城市，请检查是否开启定位权限')
                }else{
                    searchParam.city = this.gpsInfo.city
                }

                nativeService.searchMapAddress(searchParam).then( (res) => {
                    if (res.status == 0) {
                        this.mapSearchResult = res.resultList
                        this.showMapSearchResult = true
                    }else {
                        nativeService.alert('查询地址失败')
                    }
                }).catch((error) => {
                    nativeService.alert('搜到火星都搜不到呢 TAT')
                })
            },
            searchCancel(){
            },
            searchInputReturned(e){
                this.searchLocation(e.value)
            },
            searchInputOnInput(e){
            },
            searchClose(e){ },
            searchInputFocus(e){
                this.showMapSearchResult = false
                this.mapSearchResult = []
            },
            searchInputBlur(e){
                this.searchLocation(e.value)
            },
            goCurrentLocation(){
                if (this.gpsInfo) {
                    let tmp = {
                        latitude: this.gpsInfo.latitude,
                        longitude: this.gpsInfo.longitude,
                        zoom: 10
                    }
                    this.mapCenter = tmp
                    this.markers = [{
                        icon: {
                            normal: icon.mapNormal,
                            click: icon.mapClick
                        },
                        list: [{ latitude: this.gpsInfo.latitude, longitude: this.gpsInfo.longitude, id: 1 }]
                    }]
                }
            },
            // 地图部分 end
            // 天气 start
            selectWeather(index){
                this.weather.activeTypeIndex = index
            },
            setWeatherSwitch(){
                this.weather.showDialog = true
            },
            weatherDialogConfirm(){
                this.weather.activeSwitch = this.switchTo[this.weather.activeSwitch]
                this.weather.showDialog = false
            },
            setActiveWeatherTemperature(wTemp){
                this.activeWeatherTemperature = wTemp.value
            },
            goNext(destination){
                let weeklyString = ''
                for (let i=0; i<this.week.length; i++) {
                    weeklyString += this.week[i].repeat
                }
                let params = {
                    sceneType: this.sceneType,
                    weekly: weeklyString
                }
                if (this.sceneType == 3) {
                    let tmp = []
                    Object.keys(destination).map(function(x){
                        tmp.push( x + '='+ encodeURIComponent(destination[x]))
                    })
                    destination = tmp.join('&')

                    params.destination = destination
                    params.direction = this.direction
                }
                if (this.sceneType == 4) {
                    if ( !this.activeHour ) {
                        nativeService.alert('还没有设置启动时间哦')
                        return
                    }
                    params.startTimeHour = this.activeHour
                    params.startTimeMinute = this.activeMinute
                }
                if (this.sceneType == 6 ) {
                    if ( !this.activeWeatherTemperature ) {
                        nativeService.alert('还没有设定温度哦')
                        return
                    }
                    params.weatherTemperature = this.activeWeatherTemperature
                    params.weatherStatus = encodeURIComponent(this.weather.data[this.weather.activeTypeIndex])
                    let logical = this.weather.activeSwitch=='低于'?'<':'>'
                    params.logical = logical
                }
                this.goTo('autoBindDevices', {}, params )
            }
        },
        created(){
            this.initData()
        }
    }
</script>


