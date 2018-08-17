<template>
   <div class="wrap" :style="wrapStyle">
        <div class="addauto-hd">
            <midea-header :title="title" :isImmersion="isImmersion" :bgColor="header.bgColor" :titleText="header.color"  @leftImgClick="goBack"></midea-header>
        </div>
        <scroller class="content-scroller">
            <div class="map-box" v-if="sceneType == 3">
                <wxc-searchbar ref="wxc-searchbar" returnKeyType="search"
                    @wxcSearchbarCancelClicked="searchCancel"
                    @wxcSearchbarInputReturned="searchInputReturned"
                    @wxcSearchbarInputOnInput="searchInputOnInput"
                    @wxcSearchbarCloseClicked="searchClose"
                    @wxcSearchbarInputOnFocus="searchInputFocus"
                    @wxcSearchbarInputOnBlur="searchInputBlur">
                </wxc-searchbar>
                <div style="width:750px;height:760px;">
                    <midea-map-view class="map" :data="mapData" @point-pick="mapPointPick"></midea-map-view>
                </div>
                <image class="map-icon" :src="icon.map" @click="goCurrentLocation"></image>
            </div>
            <div v-if="sceneType==4">
                <text class="hd">设置为</text>
                <div class="row-sb time-floor"  @click="showPop('time')">
                    <text class="font16">时间</text>
                    <div class="row-sb">
                        <text v-if="from == 'addAuto' && startTime==''" class="font-light-grey text">点击设置时间</text>
                        <text v-else class="font-light-grey text">{{startTime}}</text>
                        <image class="icon-next" :src="icon.next"></image>
                    </div>
                </div>
            </div>
            <div v-if="sceneType==6">
                <text class="hd">天气</text>
                <div>
                    <midea-list style="background-color:#fff" v-for="(item,i) in weather.type" :idx="i" :hasWrapBorder="false" leftMargin="25px">
                        <check-item :title="item" :titleStyle="{fontSize:'30px'}" @itemClick="selectWeather(i)" :status="weather.activeTypeIndex==i" mode="radio"></check-item>
                    </midea-list>
                </div>
                <div class="box">
                    <!-- <midea-cell title="气温" :hasArrow="true" @mideaCellClick="setWeatherSwitch" :cellStyle="{paddingLeft: '30px'}" :rightText="switchs[weather.activeSwitch]"></midea-cell> -->
                    <midea-cell title="气温" :hasArrow="true" @mideaCellClick="showPop('weather')" :cellStyle="{paddingLeft: '30px'}" :rightText="weatherTemperatureDesc"></midea-cell>
                </div>
            </div>
            <div class="repeat">
                <text class="hd">重复</text>
                <div class="row-sa repeat-week">
                    <text :class="['week', item.repeat==1?'week-active':'']" v-for="(item,i) in week" @click="setRepeat(i)">{{item.title}}</text>
                </div>
            </div>
            <text v-if="from=='editAuto'" class="save-btn" @click="saveChange">确定</text>
            <text v-if="from=='addAuto'" class="save-btn" @click="goNext">确定</text>
        </scroller>
        <scroller v-if="sceneType== 3 && showMapSearchResult" class="map-result" :style="mapListStyle">
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
        <div v-if="sceneType==4">
            <!-- 时间弹窗 -->
            <midea-confirm2 :height="popHeight" :show="popStatus.time" @leftBtnClick="cancelPop('time')" @rightBtnClick="confirmPop('time')" @mideaPopupOverlayClicked="closePop('time')">
                <div class="time-picker row-sb">
                    <scroll-picker :wrapWidth="375" :listArray="hours" @onChange="setActiveHour"></scroll-picker>
                    <scroll-picker :wrapWidth="375" :listArray="minutes" @onChange="setActiveMinute"></scroll-picker>
                    <div class="line1" ></div>
                    <div class="line2"></div>
                </div>
            </midea-confirm2>
        </div>
        <div v-if="sceneType==6">
            <!-- 天气弹窗 -->
            <midea-confirm2 :height="popHeight" :show="popStatus.weather" @leftBtnClick="cancelPop('weather')" @rightBtnClick="confirmPop('weather')" @mideaPopupOverlayClicked="closePop('weather')">
                <div class="time-picker row-sb">
                    <scroll-picker :wrapWidth="375" :listArray="weatherLogicalList" @onChange="setActiveLogical"></scroll-picker>
                    <scroll-picker :wrapWidth="375" :listArray="weatherTemperature"  @onChange="setActiveWeatherTemperature"></scroll-picker>
                    <div class="line1" ></div>
                    <div class="line2"></div>
                </div>
            </midea-confirm2>
        </div>
   </div>
</template>

<style>
    .row-sa{ flex-direction: row; align-items: center; justify-content: space-around; }
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .row-e{ flex-direction: row; align-items: center; justify-content: flex-end; }
    .font14{ font-size: 28px; }
    .font15{ font-size: 30px; }
    .font16{ font-size: 32px; }
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
        color: #666;
    }
    .icon-next{
        width: 8px;
        height: 16px;
        margin-left: 12px;
    }
    .text{font-size: 28px;}
    .head{
        background-color: #fff;
        width: 750px;
        height: 88px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .head-text{ font-size: 32px; }
    .addauto-hd{position: relative;}
    .font-grey{ color: #666; }
    .font-light-grey{ color: #8A8A8F; }
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
        flex: 1;
        padding-bottom: 100px;
    }
    .time-floor{
        background-color: #fff;
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 25px;
        padding-right: 25px;
    }
    .time-picker{
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
        padding-top: 13px;
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
        flex: 1;
        flex-direction: column;
        height: 760px;
    }
    .map-box{
        background-color: #fff;
        position: relative;
        flex: 1;
        flex-direction: column;
        height: 834px;
    }
    .map-icon{
        position: absolute;
        width: 82px;
        height: 82px;
        bottom: 20px;
        right: 25px;
    }
    .map-result{
        height: 450px;
        width: 750px;
        padding-bottom: 25px;
        position: absolute;
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
        font-size: 28px;
    }
    .noborder{
        border-top-color: transparent;
    }
    .no-more{
        padding: 25px;
        text-align: center;
        color: #777;
    }
    .line1, .line2{
        background-color: #e2e2e2;
        width: 750px;
        height: 1px;
        position: absolute;
        left: 0;
        right: 0;
    }
    .line1{
        top: 165px;
    }
    .line2{
        top: 245px;
    }
    .save-btn{
        width: 690px;
        margin-top: 48px;
        padding: 25px;
        background-color: #267AFF;
        color: #fff;
        border-radius: 8px;
        margin-left: 30px;
        text-align: center;
        font-size: 32px;
    }
</style>

<script>
    const { platform } = weex.config.env;

    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import MideaCell from '@/midea-component/cell.vue'
    import mideaDialog from '@/midea-component/dialog.vue'
    import mideaConfirm2 from '@/midea-rooms/components/confirm2.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
    import checkItem from '@/midea-rooms/components/checkItem.vue'
    import scrollPicker from '@/midea-rooms/components/scrollPicker.vue'
    import WxcSearchbar from '@/midea-rooms/components/WxcSearchbar.vue'
    const channelAutoTypeSet = new BroadcastChannel('autoBroadcast')
    
    export default {
        components:{
            MideaHeader, MideaCell, mideaDialog, WxcSearchbar, mideaConfirm2,
            mideaList, scrollPicker, checkItem
        },
        mixins: [base],
        data(){
            return {
                icon: {
                    map: 'assets/img/scene_ic_placeblue@3x.png',
                    mapNormal: "assets/img/scene_ic_placeblue@3x.png",
                    mapClick: "assets/img/scene_ic_placeblue@3x.png",
                    next: 'assets/img/more.png'
                },
                title: '',
                header: {
                    bgColor: '#fff',
                    color: '#111'
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
                    type: ['多云','晴','沙尘暴','雾','雪', '雨'],
                    activeTypeIndex: 0,
                    showDialog: false,
                    logicals: {
                        min: '低于',
                        max: '高于'
                    }
                },
                weatherLogicalList: [
                    { name: 'min', value: '低于' },
                    { name: 'max', value: '高于' },
                ],
                switchs: {
                    min: '低于',
                    max: '高于'
                },
                switchTo: {
                    min: 'max',
                    max: 'min'
                },
                startTime: '',
                activeHour: '',
                activeMinute: '',
                activeWeatherTemperature: '',
                activeWeatherLogical: '',
                activeWeatherStatus: '',
                autoWeatherTemperature: '',
                gpsInfo: {},
                showMapSearchResult: false,
                mapSearchResult: [],
                mapCenter: {
                    latitude: '',
                    longitude: '',
                    zoom: 18 //地图显示范围 4-21级 （最大是21级）,非必选
                },
                mapMarkerList: [],
                from: '', // 页面来源于编辑还是新增
                editParams: {},
                popStatus: {
                    time: false,
                    weather: false
                },
                destination: {
                },
                addressName: ''
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
                    center: this.mapCenter,
                    markers: [{
                        icon: {
                            normal: "assets/img/service_ic_pin@3x.png",//正常的图片地址
                            click: "assets/img/service_ic_pin@3x.png" //点击高亮的图片地址
                        },
                        list: this.mapMarkerList
                    }]
                }
                return tmp
            },
            mapListStyle(){
                let tmp = {}
                if (this.platform == 'ios' && !this.isipx) {
                    tmp.top = '210px'
                }else{
                    tmp.top = '172px'
                }
                return tmp
            },
            weatherTemperatureDesc(){
                let tmp = ''
                if (this.from == 'addAuto' ) {
                    if ( this.activeWeatherTemperature == '' || this.activeWeatherLogical == '' ) {
                        tmp = '点击设置温度'
                    }else{
                        tmp = this.weather.logicals[this.activeWeatherLogical] + this.activeWeatherTemperature + '℃'
                    }         
                }else{
                    if (this.activeWeatherTemperature != '' && this.activeWeatherLogical != ''){
                        tmp = this.weather.logicals[this.activeWeatherLogical] + this.activeWeatherTemperature + '℃'
                    }else if (this.autoWeatherTemperature != '' && this.autoWeatherLogical != '') {
                        tmp =  this.weather.logicals[this.autoWeatherLogical] + this.autoWeatherTemperature + '℃'
                    }else{
                        tmp = '点击设置温度'
                    }
                }
                return tmp
            },
            popHeight(){
                let tmp = 573
                if (this.isImmersion === false) {
                    tmp = 615
                }
                return tmp
            },
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
                        this.mapCenter.latitude = nativeService.getParameters('locationLatitude')
                        this.mapCenter.longitude = nativeService.getParameters('locationLongitude')
                        this.mapMarkerList = [{ latitude: this.mapCenter.latitude, longitude: this.mapCenter.longitude, id: 1 }]
                    }
                    if (this.sceneType == 4) {
                        this.startTime = nativeService.getParameters('startTime')
                    }
                    if (this.sceneType == 6) {
                        let tmpWeatherStatus = decodeURIComponent(nativeService.getParameters('weatherStatus'))
                        let tmpWeatherLogical = decodeURIComponent(nativeService.getParameters('logical'))
                        this.autoWeatherTemperature = nativeService.getParameters('weatherTemperature')
                        this.autoWeatherLogical = tmpWeatherLogical == '<' ? 'min':'max'
                        for (var w in this.weather.type) {
                            if (this.weather.type[w] == tmpWeatherStatus) {
                                this.weather.activeTypeIndex = w
                            }
                        }
                    }
                }else{
                    if (this.sceneType == 3) {
                        this.goCurrentLocation()
                    }
                }

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
                    tmp[i] = { index: i, value: ( (i+min)<10 && (i+min)>=0 )?'0'+(i+min):(i+min) }
                }
                return tmp
            },
            dialogCancel(type){
                this[type].showDialog = false
            },
            closeDialog(type){
                this[type].showDialog = false
            },
            showPop(autoTypeName){
                this.popStatus[autoTypeName] = true
            },
            closePop(autoTypeName) {
                this.popStatus[autoTypeName] = false
            },
            cancelPop(autoTypeName){
                if (autoTypeName == 'time') {
                    if (this.startTime == '') {
                        this.activeHour == ''
                        this.activeMinute = ''
                    }
                    if (this.from == 'editAuto') {
                        delete this.editParams.hour
                    }
                }
                if (autoTypeName == 'weather') {
                    if (this.autoWeatherTemperature == '') {
                        this.activeWeatherTemperature = ''
                    }
                }
                this.closePop(autoTypeName)
            },
            confirmPop(autoTypeName) {
                if (autoTypeName == 'time') {
                    if (this.activeHour == '') {
                        this.activeHour = '00'
                    }
                    if (this.activeMinute == '') {
                        this.activeMinute = '00'
                    }
                    this.startTime = this.activeHour + ':' + this.activeMinute
                        
                    if (this.from == 'editAuto') {
                        this.editParams.hour = this.activeHour
                        this.editParams.minute = this.activeMinute
                    }
                }
                if (autoTypeName == 'weather') {
                    if (this.activeWeatherTemperature == '') {
                        this.activeWeatherTemperature = this.weatherTemperature[0].value
                    }
                    if (this.activeWeatherLogical == '') {
                        this.activeWeatherLogical = this.weatherLogicalList[0].name
                    }
                    // nativeService.alert(this.weatherLogicalList[0].name)
                }
                this.closePop(autoTypeName)
            },
            // 时间 start
            setActiveHour(hour){
                this.activeHour = hour.value
                if ( this.activeMinute == '' ) {
                    this.activeMinute == '00'
                }
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
            searchLocation(searchKey){
                let searchParam = {
                    keyword: searchKey,
                }
                
                if (Object.keys(this.gpsInfo).length == 0) {
                    // nativeService.alert('获取不到当前城市，请检查是否开启定位权限')
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
                this.showMapSearchResult = false
                this.mapSearchResult = []
                this.mapCenter.latitude = destination.latitude
                this.mapCenter.longitude = destination.longitude
                this.mapMarkerList = [{ latitude: this.mapCenter.latitude, longitude: this.mapCenter.longitude, id: 1 }]

                this.destination = destination
            },
            mapPointPick(item) {//地图选点，更新中心点坐标和目标地点
                this.mapCenter.latitude = item.latitude
                this.mapCenter.longitude = item.longitude
                this.mapMarkerList = [{ latitude: this.mapCenter.latitude, longitude: this.mapCenter.longitude, id: 1 }]
                this.getBaiduMapName(item.latitude, item.longitude).then((res)=>{
                    let tmpDestination = {
                        key: res,
                        latitude: item.latitude,
                        longitude: item.longitude
                    }
                    this.destination = tmpDestination
                })
            },
            goCurrentLocation(){
                this.showMapSearchResult = false
        
                nativeService.getGPSInfo({
                    desiredAccuracy: "10",
                    distanceFilter: "10",
                    alwaysAuthorization: "0" 
                }).then( (gpsInfo) => {
                    this.mapCenter.latitude = gpsInfo.latitude
                    this.mapCenter.longitude = gpsInfo.longitude
                    this.mapMarkerList = [{ latitude: this.mapCenter.latitude, longitude: this.mapCenter.longitude, id: 1 }]
                
                    this.getBaiduMapName( gpsInfo.latitude, gpsInfo.longitude).then((res)=>{
                        let tmpDestination = {
                            key: res,
                            latitude: gpsInfo.latitude,
                            longitude: gpsInfo.longitude
                        }
                        this.destination = tmpDestination
                    })
                })
            },
            // 地图部分 end
            // 天气 start
            selectWeather(index){
                this.weather.activeTypeIndex = index
                if (this.from == 'editAuto') {
                    this.editParams.weatherStatus = this.weather.type[this.weather.activeTypeIndex]
                }
            },
            setActiveLogical(e){
                this.activeWeatherLogical = e.name
                if (this.from == 'editAuto') {
                    this.editParams.logical =  this.activeWeatherLogical=='min'?'<':'>'
                }
            },
            setActiveWeatherTemperature(wTemp){
                this.activeWeatherTemperature = wTemp.value
                
                if (this.from == 'editAuto') {
                    this.editParams.weatherTemperature = this.activeWeatherTemperature
                }
            },
            getBaiduMapName(latitude, longitude){
                return new Promise((resolve, reject)=>{
                    nativeService.baiduGeocoder({latitude: latitude, longitude: longitude}).then((res)=>{
                        if (res.status == 0) {
                            // this.destination.key = res.sematic_description || res.formatted_address
                            resolve(res.result.sematic_description)
                        }
                    }).catch((err)=>{
                    })
                })
            },
            // 天气 end
            goNext(){
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
                if (nativeService.getParameters('templateCode')) {
                    params.templateCode = nativeService.getParameters('templateCode')
                }
                if (this.sceneType == 3) {
                    let destination = this.destination
                    let tmpDestination = []
                    Object.keys(destination).map(function(x){
                        tmpDestination.push( x + '='+ encodeURIComponent(destination[x]))
                    })
                    tmpDestination = tmpDestination.join('&')
                    params.destination = tmpDestination
                    params.direction = this.direction
                }
                if (this.sceneType == 4) {
                    if ( !this.activeMinute || !this.activeHour ) {
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
                    params.weatherStatus = encodeURIComponent(this.weather.type[this.weather.activeTypeIndex])
                    let logical = this.activeWeatherLogical =='min'?'<':'>'
                    params.logical = logical
                }
                params.userDevices = nativeService.getParameters('userDevices')
                this.goTo('autoBindDevices', {}, params )
            }, 
            saveChange(){
                let that = this
                // if ( Object.keys(this.editParams).length === 0 ){
                //     nativeService.toast('没有改动哦')
                // }
                  
                if (this.sceneType == 3) {
                    this.editParams.locationAddress = this.destination.key
                    this.editParams.locationLatitude = this.destination.latitude
                    this.editParams.locationLongitude = this.destination.longitude
                }
                channelAutoTypeSet.postMessage({
                    page: 'setCondition',
                    editParams: that.editParams
                })
                this.goBack()
            }
        },
        created(){
        },
        mounted() {
            this.initData()
        },
    }
</script>

