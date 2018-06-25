<template>
   <div class="wrap" :style="wrapStyle">
        <midea-header :title="condition.title" :bgColor="header.bgColor" :titleText="header.color" :leftImg="header.leftImg" @leftImgClick="goBack"></midea-header>
        <div  class="next" @click="goNext()">
            <text class="next-text white">下一步</text>
        </div>
        <div class="content">
            <!-- <div v-if="type==1">
            </div> -->
            <div v-if="sceneType == 3"></div>
            <div v-if="sceneType==4">
                <text class="hd">时间</text>
                <div class="time-picker row-sb">
                    <scroller class="scroller" show-scrollbar="false" @scroll="scrollHour">
                        <div class="blank"></div>
                        <text class="hour" v-for="item in hours">{{item}}</text>
                        <div class="blank"></div>
                    </scroller>
                    <scroller class="scroller"show-scrollbar="false" @scroll="scrollMinute">
                        <div class="blank"></div>
                        <text class="minute" v-for="item in minutes">{{item}}</text>
                        <div class="blank"></div>
                    </scroller>
                    <div class="line-cover row-sb">
                        <text class="hour-unit">时</text>
                        <text>分</text>
                    </div>
                </div>
            </div>
            <div v-if="sceneType==5">
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
            </div>
            <div v-if="sceneType==6">
                <text class="hd">天气</text>
                <div>
                     <midea-list style="background-color:#fff" v-for="(item,i) in weather.data" :idx="i" :hasWrapBorder="false" leftMargin="25px">
                        <check-item :title="item.title" @itemClick="selectWeather(i)" :status="weather.activeTypeIndex==i" mode="radio"></check-item>
                    </midea-list>
                </div>
                <div class="box">
                    <midea-cell title="气温" :hasArrow="true" @mideaCellClick="setWeatherSwitch" :cellStyle="{paddingLeft: '30px'}" :rightText="switchs[weather.activeSwitch]"></midea-cell>
                </div>
            </div>
            <div class="repeat">
                <text class="hd">重复</text>
                <div class="row-sa repeat-week">
                    <text :class="['week', item.repeat==1?'week-active':'']" v-for="(item,i) in week" @click="setRepeat(i)">{{item.title}}</text>
                </div>
            </div>
        </div>
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
        padding-left: 150px;
        padding-right: 200px;
        background-color: #fff;
        height: 434px;
        position: relative;
    }
    .scroller{
        height: 394px;
    }
    .blank{
        height: 165px;
        width: 100px;
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
</style>

<script>
    const animation = weex.requireModule('animation')

    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import MideaCell from '@/midea-component/cell.vue'
    import mideaDialog from '@/midea-component/dialog.vue'
    import mideaSwitch2 from '@/midea-component/switch.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
    import checkItem from '@/midea-rooms/components/checkItem.vue'
    import scrollPicker from '@/midea-rooms/components/scrollPicker.vue'
    
    export default {
        components:{
            MideaHeader, MideaCell, mideaDialog, mideaSwitch2,scrollPicker,
            mideaList, checkItem
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
                header: {
                    bgColor: '#fff',
                    color: '#111',
                    leftImg: 'assets/img/b.png',
                    rightImg: 'assets/img/b.png'
                },
                sceneType: '',
                title: '',
                hours: [],
                minutes: [],
                week: [
                    { title: '一', value: 'Monday', repeat: 0 },
                    { title: '二', value: 'Tuesday', repeat: 1 },
                    { title: '三', value: 'Wednesday', repeat: 0 },
                    { title: '四', value: 'Thursday', repeat: 0 },
                    { title: '五', value: 'Friday', repeat: 1 },
                    { title: '六', value: 'Saturday', repeat: 1 },
                    { title: '日', value: 'Sunday', repeat: 0 }
                ],
                weather: {
                    data: [
                        {
                            title: '晴',
                            value: 'sunny'
                        },
                        {
                            title: '阴天',
                            value: 'cloudy'
                        },
                        {
                            title: '下雨',
                            value: 'rainy'
                        },
                        {
                            title: '下雪',
                            value: 'snow'
                        },
                    ],
                    activeTypeIndex: 0,
                    activeSwitch: 'min',
                    showDialog: false
                },
                indoor: {
                    items: [
                        {
                            title: '温度',
                            subType: 'temp',
                            showSwitch: true,
                            switchStatus: 'min',
                            activeValue: null,
                            valueList: [
                                { index: 0, value: "1℃" },
                                { index: 1, value: "2℃" },
                                { index: 2, value: "3℃" },
                                { index: 3, value: "4℃" },
                                { index: 4, value: "5℃" },
                                { index: 5, value: "6℃" },
                                { index: 6, value: "7℃" },
                                { index: 7, value: "8℃" },
                                { index: 8, value: "9℃" },
                                { index: 9, value: "10℃" },
                                { index: 10, value: "11℃" },
                                { index: 11, value: "12℃" },
                                { index: 12, value: "13℃" },
                                { index: 13, value: "14℃" },
                                { index: 14, value: "15℃" },
                                { index: 15, value: "16℃" },
                                { index: 16, value: "17℃" },
                                { index: 17, value: "18℃" },
                                { index: 18, value: "19℃" },
                                { index: 19, value: "20℃" },
                                { index: 20, value: "21℃" },
                                { index: 21, value: "22℃" },
                                { index: 22, value: "23℃" },
                                { index: 23, value: "24℃" },
                                { index: 24, value: "25℃" },
                                { index: 25, value: "26℃" },
                                { index: 26, value: "27℃" },
                                { index: 27, value: "28℃" },
                                { index: 28, value: "29℃" },
                                { index: 29, value: "30℃" }
                            ],
                            valuePanelStyle: {
                                height: '0px'
                            }
                        },
                        {
                            title: '湿度',
                            subType: 'humidity',
                            showSwitch: false,
                            switchStatus: 'min',
                            activeValue: null,
                            valueList: [
                                { index: 0, value: "0%" },
                                { index: 1, value: "1%" },
                                { index: 2, value: "2%" },
                                { index: 3, value: "3%" },
                                { index: 4, value: "4%" },
                                { index: 5, value: "5%" },
                                { index: 6, value: "6%" },
                                { index: 7, value: "7%" },
                                { index: 8, value: "8%" },
                                { index: 9, value: "9%" },
                                { index: 10, value: "10%" },
                                { index: 11, value: "11%" },
                                { index: 12, value: "12%" },
                                { index: 13, value: "13%" },
                                { index: 14, value: "14%" },
                                { index: 15, value: "15%" },
                                { index: 16, value: "16%" },
                                { index: 17, value: "17%" },
                                { index: 18, value: "18%" },
                                { index: 19, value: "19%" },
                                { index: 20, value: "20%" },
                                { index: 21, value: "21%" },
                                { index: 22, value: "22%" },
                                { index: 23, value: "23%" },
                                { index: 24, value: "24%" },
                                { index: 25, value: "25%" },
                                { index: 26, value: "26%" },
                                { index: 27, value: "27%" },
                                { index: 28, value: "28%" },
                                { index: 29, value: "29%" },
                                { index: 30, value: "30%" },
                                { index: 31, value: "31%" },
                                { index: 32, value: "32%" },
                                { index: 33, value: "33%" },
                                { index: 34, value: "34%" },
                                { index: 35, value: "35%" },
                                { index: 36, value: "36%" },
                                { index: 37, value: "37%" },
                                { index: 38, value: "38%" },
                                { index: 39, value: "39%" },
                                { index: 40, value: "40%" },
                                { index: 41, value: "41%" },
                                { index: 42, value: "42%" },
                                { index: 43, value: "43%" },
                                { index: 44, value: "44%" },
                                { index: 45, value: "45%" },
                                { index: 46, value: "46%" },
                                { index: 47, value: "47%" },
                                { index: 48, value: "48%" },
                                { index: 49, value: "49%" }
                            ],
                            valuePanelStyle: {
                                height: '0px'
                            }
                        },
                        {
                            title: 'PM2.5',
                            subType: 'pm2.5',
                            showSwitch: false,
                            switchStatus: 'min',
                            activeValue: null,
                            valueList:[
                                { index: 0, value: "0" },
                                { index: 1, value: "1" },
                                { index: 2, value: "2" },
                                { index: 3, value: "3" },
                                { index: 4, value: "4" },
                                { index: 5, value: "5" },
                                { index: 6, value: "6" },
                                { index: 7, value: "7" },
                                { index: 8, value: "8" },
                                { index: 9, value: "9" },
                                { index: 10, value: "10" },
                                { index: 11, value: "11" },
                                { index: 12, value: "12" },
                                { index: 13, value: "13" },
                                { index: 14, value: "14" },
                                { index: 15, value: "15" },
                                { index: 16, value: "16" },
                                { index: 17, value: "17" },
                                { index: 18, value: "18" },
                                { index: 19, value: "19" },
                                { index: 20, value: "20" },
                                { index: 21, value: "21" },
                                { index: 22, value: "22" },
                                { index: 23, value: "23" },
                                { index: 24, value: "24" },
                                { index: 25, value: "25" },
                                { index: 26, value: "26" },
                                { index: 27, value: "27" },
                                { index: 28, value: "28" },
                                { index: 29, value: "29" },
                                { index: 30, value: "30" },
                                { index: 31, value: "31" },
                                { index: 32, value: "32" },
                                { index: 33, value: "33" },
                                { index: 34, value: "34" },
                                { index: 35, value: "35" },
                                { index: 36, value: "36" },
                                { index: 37, value: "37" },
                                { index: 38, value: "38" },
                                { index: 39, value: "39" },
                            ],
                            valuePanelStyle: {
                                height: '0px'
                            }
                        },
                    ],
                    showDialog: false,
                    activeSwitchStatus: '',
                    activeSubTypeName: '',
                    activeSubIndex: null
                },
                switchs: {
                    min: '低于',
                    max: '高于'
                },
                switchTo: {
                    min: 'max',
                    max: 'min'
                },
                
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
                    this.hours = this.setTimeArray(24)
                    this.minutes = this.setTimeArray(60)
                }
                if (this.sceneType == 6){
                    this.title = '天气变化'
                }
            },
            goBack(){
                nativeService.goBack()
            },
            goNext(){
                this.goTo('selectDevice', {}, {type: this.type})
            },
            setRepeat(i){
                this.week[i].repeat = !this.week[i].repeat
            },
            setTimeArray(num){
                let tmp = []
                for (let i=0;i<num;i++){
                    tmp.push(i>9?i:'0'+i)
                }
                return tmp
            },
            scrollHour(e){
                console.log(e.scrollTop)
            },
            scrollMinute(){},
            selectWeather(index){
                this.weather.activeTypeIndex = index
            },
            setWeatherSwitch(){
                this.weather.showDialog = true
            },
            dialogCancel(type){
                this[type].showDialog = false
            },
            closeDialog(type){
                this[type].showDialog = false
            },
            weatherDialogConfirm(){
                this.weather.activeSwitch = this.switchTo[this.weather.activeSwitch]
                this.weather.showDialog = false
            },
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
            }
        },
        created(){
            this.initData()
        }
    }
</script>


