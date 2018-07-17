<template>
   <div class="wrap" :style="wrapStyle">
        <div v-if="from=='addAuto'" class="addauto-hd">
            <midea-header :title="title" :bgColor="header.bgColor" :titleText="header.color" :leftImg="header.leftImg" @leftImgClick="goBack"></midea-header>
            <div v-if="sceneType != 3" class="next" @click="goNext">
                <text class="next-text white"  @click="goNext">下一步</text>
            </div>
        </div>  
        <div v-if="from=='editAuto'" class="row-sb head">
            <text class="head-text font-grey" @click="goBack">取消</text>
            <text class="head-text">{{title}}</text>
            <text class="head-text font-grey"  @click="saveChange">确定</text>
        </div>
        <scroller class="content-scroller">
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
            <div v-if="sceneType==6">
                <text class="hd">天气</text>
                <div>
                    <midea-list style="background-color:#fff" v-for="(item,i) in weather.data" :idx="i" :hasWrapBorder="false" leftMargin="25px">
                        <check-item :title="item" @itemClick="selectWeather(i)" :status="weather.activeTypeIndex==i" mode="radio"></check-item>
                    </midea-list>
                </div>
                <div class="box">
                    <midea-cell title="气温" :hasArrow="true" @mideaCellClick="setWeatherSwitch" :cellStyle="{paddingLeft: '30px'}" :rightText="switchs[weather.activeSwitch]"></midea-cell>
                    <scroll-picker :listArray="weatherTemperature" @onChange="setActiveWeatherTemperature"></scroll-picker>
                </div>
            </div>
            <div class="repeat">
                <text class="hd">重复</text>
                <div class="row-sa repeat-week">
                    <text :class="['week', item.repeat==1?'week-active':'']" v-for="(item,i) in week" @click="setRepeat(i)">{{item.title}}</text>
                </div>
            </div>
        </scroller>
        <scroller v-if="sceneType== 3 && showMapSearchResult" class="map-result">
            <div v-if="mapSearchResult.length > 0">
                <div v-for="(item,i) in mapSearchResult" @click="selectMapSearchResult(item)">
                    <text :class="['map-result-item', i==0?'noborder':'']">{{item.key}}-{{item.city}} </text>
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
    .row-e{ flex-direction: row; align-items: center; justify-content: flex-end; }
    .wrap{
        background-color: #f2f2f2;
    }
    .back{
        width: 12px;
        height: 24px;
    }
    .next{
        position: absolute;
        top: 30px;
        right: 25px;
    }
    .next-text{
        font-size: 32px;
    }
    .text{font-size: 28px;}
     .head{
        background-color: #fff;
        width: 750px;
        height: 88px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .head-text{ font-size: 32px; width: 200px; text-align: center;}
    .addauto-hd{position: relative;}
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
    .content-scroller{
        padding-bottom: 100px;
    }
    .time-picker{
        margin-top: 25px;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #fff;
        height: 434px;
    }
    .weather-hd{
        padding-left: 25px;
        padding-right: 25px;
        padding-top: 20px;
        padding-bottom: 20px;
        background-color: #fff;
        border-bottom-width: 2px;
        border-bottom-color: #e5e5e5;
        border-bottom-style: solid;
    }
    .next-icon{
        width: 12px;
        height: 24px;
        margin-left: 10px;
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
        position: absolute;
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
    
    const channelAutoTypeSet = new BroadcastChannel('autoBroadcast')
    
    export default {
        components:{
            MideaHeader, MideaCell, mideaDialog, WxcSearchbar,
            mideaList, scrollPicker, checkItem
        },
        mixins: [base],
        data(){
            return {
                icon: {
                    map: 'assets/img/location.png',
                    mapNormal: "assets/img/service_ic_pin@3x.png",
                    mapClick: "assets/img/service_ic_pin@3x.png",
                    next: 'assets/img/more.png'
                },
                title: '',
                header: {
                    bgColor: '#fff',
                    color: '#111',
                    leftImg: 'assets/img/public_ic_back@3x.png'
                },
                sceneType: '',
                direction: '',
                hours: [],
                minutes: [],
                week: [
                    { title: '一', repeat: 0 },
                    { title: '二', repeat: 0 },
                    { title: '三', repeat: 0 },
                    { title: '四', repeat: 0 },
                    { title: '五', repeat: 0 },
                    { title: '六', repeat: 0 },
                    { title: '日', repeat: 0 },
                ],
                weather: {
                    data: ['多云','晴','沙尘暴','雾','雪', '雨'],
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
                    zoom: 11 //地图显示范围 4-21级 （最大是21级）,非必选
                },
                mapMarkers: [],
                from: '', // 页面来源于编辑还是新增
                editParams: {},
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
            goBack(){
                nativeService.goBack()
            },
            initData(){
                this.from = nativeService.getParameters('from')
                this.sceneType = nativeService.getParameters('sceneType')
                this.homegroupId = nativeService.getParameters('homegroupId')
                if (this.from == 'editAuto') {
                    let tmpWeely = nativeService.getParameters('weekly')
                    let weekName = ['一', '二', '三', '四', '五', '六', '七']
                    let tmpWeek = []
                    for (var x in tmpWeely) {
                        tmpWeek.push({
                            title: weekName[x],
                            repeat: tmpWeely[x]
                        })
                    }
                    this.week = tmpWeek
                                 
                    if (this.sceneType == 3) {
                         nativeService.getGPSInfo({
                            desiredAccuracy: "10",
                            distanceFilter: "10",
                            alwaysAuthorization: "0" 
                        }).then( (res) => {
                            this.gpsInfo = res
                        })
                        this.mapCenter.latitude = nativeService.getParameters('locationLatitude') ||  this.gpsInfo.latitude
                        this.mapCenter.longitude = nativeService.getParameters('locationLongitude') || this.gpsInfo.longitude
                    }
                    if (this.sceneType == 4) {}
                    if (this.sceneType == 6) {
                        let tmpWeatherStatus = decodeURIComponent(nativeService.getParameters('weatherStatus'))
                        let tmpWeatherLogical = decodeURIComponent(nativeService.getParameters('logical'))
                        this.weather.activeSwitch = tmpWeatherLogical == '<' ? 'min':'max'
                        for (var w in this.weather.data) {
                            if (this.weather.data[w] == tmpWeatherStatus) {
                                this.weather.activeTypeIndex = w
                            }
                        }
                    }
                }

                if (this.sceneType == 3) {
                    this.direction = nativeService.getParameters('direction')
                    if (this.direction == 1) {
                        this.title = '到达某地'
                    }else if (this.direction == 2) {
                        this.title = '离开某地'
                    }
                    nativeService.getGPSInfo({
                        desiredAccuracy: "10",
                        distanceFilter: "10",
                        alwaysAuthorization: "0" 
                    }).then( (res) => {
                        this.gpsInfo = res
                    })
                }
                if (this.sceneType == 4){
                    this.title = '在某个时间'
                    this.hours = this.generateTimeListArray(0,23)
                    this.minutes = this.generateTimeListArray(0,59)
                }
                if (this.sceneType == 6){
                    this.title = '天气变化'
                    this.weatherTemperature = this.generateNumberListArray(-10,40)
                }
            },
            setRepeat(i){
                if (this.week[i].repeat == '0'){
                    this.week[i].repeat = '1'
                }else if (this.week[i].repeat == '1') {
                    this.week[i].repeat = '0'
                }
                
                if (this.from == 'editAuto') {
                    let weeklyString = ''
                    for (let i=0; i<this.week.length; i++) {
                        weeklyString += this.week[i].repeat
                    }
                    this.editParams.weekly = weeklyString
                }
            },
            generateNumberListArray(min, max){
                let tmp = []
                let len  = max-min+1
                for (let i=0; i<len; i++){
                    tmp[i] = { index: i, value: i+min }
                }
                return tmp
            },
            generateTimeListArray(min, max){
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
            // 时间 start
            setActiveHour(hour){
                this.activeHour = hour.value
                if (this.from == 'editAuto') {
                    this.editParams.hour = this.activeHour
                }
            },
            setActiveMinute(minute){
                this.activeMinute = minute.value
                if (this.from == 'editAuto') {
                    this.editParams.minute = this.activeMinute
                }
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
                }
                
                if (Object.keys(this.gpsInfo).length == 0) {
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
            searchInputBlur(e){
                // this.searchLocation(e.value)
            },
            searchInputOnInput(e){
            },
            searchClose(e){
            },
            searchInputFocus(e){
                this.showMapSearchResult = false
                this.mapSearchResult = []
            },
            selectMapSearchResult(destination){
                let tmpDestination = []
                Object.keys(destination).map(function(x){
                    tmpDestination.push( x + '='+ encodeURIComponent(destination[x]))
                })
                tmpDestination = tmpDestination.join('&')

                if (this.from == 'editAuto') {
                    this.editParams.locationAddress = destination.key
                    this.editParams.locationLatitude = destination.latitude
                    this.editParams.locationLongitude = destination.longitude
                    channelAutoTypeSet.postMessage({page: 'setCondition', editParams: this.editParams})
                    this.goBack()
                }else{
                    this.goNext(tmpDestination)
                }
            },
            goCurrentLocation(){
                this.showMapSearchResult = false
                let tmp = {
                    latitude: this.gpsInfo.latitude,
                    longitude: this.gpsInfo.longitude,
                    zoom: 10
                }
                this.mapCenter = tmp
                this.markers = [{
                    icon: {
                        normal: this.icon.mapNormal,
                        click: this.icon.mapClick
                    },
                    list: [{ latitude: this.gpsInfo.latitude, longitude: this.gpsInfo.longitude, id: 1 }]
                }]
            },
            // 地图部分 end
            // 天气 start
            selectWeather(index){
                this.weather.activeTypeIndex = index
                if (this.from == 'editAuto') {
                    this.editParams.weatherStatus = this.weather.data[this.weather.activeTypeIndex]
                }
            },
            setWeatherSwitch(){
                this.weather.showDialog = true
            },
            weatherDialogConfirm(){
                this.weather.activeSwitch = this.switchTo[this.weather.activeSwitch]
                this.weather.showDialog = false
                
                if (this.from == 'editAuto') {
                    this.editParams.logical =  this.weather.activeSwitch=='min'?'<':'>'
                }
            },
            setActiveWeatherTemperature(wTemp){
                this.activeWeatherTemperature = wTemp.value
                
                if (this.from == 'editAuto') {
                    this.editParams.weatherTemperature = this.activeWeatherTemperature
                }
            },
            // 天气 end
            goNext(destination){
                let weeklyString = ''
                for (let i=0; i<this.week.length; i++) {
                    weeklyString += this.week[i].repeat
                }
                if (weeklyString == '0000000')  {
                    nativeService.alert('还没有设置重复日数哦')
                    return
                }
                let params = {
                    homegroupId: this.homegroupId,
                    sceneType: this.sceneType,
                    weekly: weeklyString,
                    from: this.from
                }
                if (this.sceneType == 3) {
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
                
                params.userDevices = nativeService.getParameters('userDevices')
                this.goTo('autoBindDevices', {}, params )
            },
            saveChange(){
                let that = this
                if ( Object.keys(this.editParams).length === 0 ){
                    nativeService.toast('没有改动哦')
                }
                
                channelAutoTypeSet.postMessage({
                    page: 'setCondition',
                    editParams: that.editParams
                })
                this.goBack()
            }
        },
        created(){
            this.initData()
        }
    }
</script>


