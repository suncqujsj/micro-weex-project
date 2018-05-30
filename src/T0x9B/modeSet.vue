<template>
    <div>
        <midea-header :title="title" :bgColor="style.header.bgColor" :titleText="style.header.textColor" :showLeftImg="true" :leftImg="icon.back" @leftImgClick="goBack"></midea-header>
        <div style="padding-top: 100px; border-top-width: 1px; border-top-style: solid; border-top-color: #e5e5e5;">
            <circle-progress :percent="workPercent">
                <div v-if="!workFinish" slot="content">
                    <div>
                        <text style="text-align: center; font-size: 40px;margin-top: 130px;">上下管</text>
                    </div>
                    <div style="text-align: center; flex-direction: row; justify-content: center;">
                        <text style="font-size: 70px;">{{countMin}}</text>
                        <text style="font-size: 70px;">:</text>
                        <text style="font-size: 70px;">{{countSec}}</text>
                    </div>
                </div>
                <div v-else slot="content">
                    <div>
                        <text style="text-align: center; font-size: 40px;margin-top: 130px;">烹饪完成</text>
                    </div>
                   <imgae class="icon" :src="icon.back"></imgae>
                </div>
            </circle-progress>
            <div style="flex-direction: row; justify-content: space-between; width: 450px; margin-left: 150px; margin-top: 150px; align-items: center;margin-bottom: 50px;">
                <div style="flex-direction: row; justify-content:left; align-items: center;" @click="getStart">
                    <image class="icon" :src="icon.back"></image>
                    <text>{{countMin}}分</text>
                    <text>{{countSec}}秒</text>
                </div>
                <text>|</text>
                <div style="flex-direction: row; justify-content:left; align-items: center;" @click="getStart">
                    <image class="icon" :src="icon.back"></image>
                    <text>{{temperature}}℃</text>
                </div>
            </div>
            <div v-if="!reserveStatus" class="btn-wrap">
                <midea-button text="预约" @mideaButtonClicked="reverse" :btnStyle="style.btn"></midea-button>
                <midea-button text="开始" @mideaButtonClicked="getStart" :btnStyle="style.btn"></midea-button>
            </div>
            <div v-else class="btn-wrap">
                <midea-button text="取消" @mideaButtonClicked="popCancelConfirm" :btnStyle="style.btn2" :textStyle="style.btn2Text"></midea-button>
                <midea-button text="直接启动" @mideaButtonClicked="getStart" :btnStyle="style.btn1"></midea-button>
            </div>
            <div v-if="showBackRecipe" class="back-recipe" @click="goTo('recipe')"><text>菜谱</text></div>
        </div>
        <midea-popup :show="showPop1" @mideaPopupOverlayClicked="closePop1">
            <div style="flex-direction: row; jusitify-content: space-around; ">
                <div style="flex: 2; padding-left: 50px;">
                    <div><text style="padding: 25px;text-align:center;color: #777;">温度设置</text></div>
                    <scroller class="pop-scroller" show-scrollbar="false">
                        <text :class="['select-line', activeTempI == i?'active-select':'']"  style="text-align:center" v-for="(tItem,i) in temperatureData"@click="setTemperature(tItem,i)">{{tItem}}</text>
                    </scroller>
                </div>
                <div style="flex: 3;padding-right: 100px; ">
                    <div><text style="text-align: left;padding: 25px;color: #777;">时间设置 时：分</text></div>
                    <div style="flex-direction: row; jusitify-content: center; align-items: center; ">
                        <scroller class="pop-scroller" show-scrollbar="false">
                            <text :class="['select-line', activeMinI == i?'active-select':'']"  v-for="(mItem,i) in minuteData" @click="setMinutes(mItem,i)" >{{mItem}}</text>
                        </scroller>
                        <text style="flex:1; text-align:center">:</text>
                        <scroller class="pop-scroller" show-scrollbar="false">
                            <text :class="['select-line', activeSecI == i?'active-select':'']"   v-for="(sItem,i) in secondData" @click="setSeconds(sItem,i)">{{sItem}}</text>
                        </scroller>
                    </div>
                </div>
            </div>
            <midea-button text="确定"  :btnStyle="style.btn2" :textStyle="style.btn2Text" @mideaButtonClicked="confirmStart"></midea-button>
        </midea-popup>
        <midea-popup :show="showPop2" @mideaPopupOverlayClicked="closePop2" :height="270">
            <div class="btn-wrap">
                <midea-button text="按错了" @mideaButtonClicked="closePop2" :btnStyle="style.btn2" :textStyle="style.btn2Text"></midea-button>
                <midea-button text="取消预约" @mideaButtonClicked="cancelReverse" :btnStyle="style.btn1"></midea-button>
            </div>
        </midea-popup>
    </div>
</template>

<style>
    .icon{
        width: 32px;
        height: 32px;
        margin-right: 10px;
    }
    .select-line{
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 34px;
        text-align:center;
        color:#777;
    }
    .select-line:active{
        background-color: #d8d8d8;
    }
    .active-select{
        color: #444;
        font-weight: bold;
        font-size: 36px;
    }
    .pop-scroller{
        height: 500px;
        flex: 1;
    }
    .btn-wrap{
        flex-direction: row;
        justify-content: space-between;
        width: 600px;
        margin-left: 75px;
        margin-top: 50px;
        align-items: center;
    }
    .back-recipe{
        position: absolute;
        top: 10px;
        left: 10px;
        width: 80px;
        height: 80px;
        padding-top: 13px;
        align-items: center;
        border-radius: 40px;
        border-width: 2px;
        border-color: #d8d8d8;
        border-style: solid;
        background-color: #fff;
    }
</style>

<script>

    const storage = weex.requireModule('storage')
    const picker = weex.requireModule('picker')
    import MideaHeader from '@/midea-component/header.vue'
    import circleProgress from '@/midea-component/circleProgress.vue'
    import MideaButton from '@/midea-component/button.vue'
    import mideaPopup from '@/midea-component/popup.vue'
    import nativeService from '@/common/services/nativeService'

    export default {
        components: {  MideaHeader, circleProgress, MideaButton, mideaPopup },
        data(){
            return {
                title: '加热模式',
                icon: {
                    back: 'assets/img/b.png',
                },
                style: {
                    header: {
                        bgColor: '#fff',
                        textColor: '#333'
                    },
                    btn: {
                        width: '250px',
                        borderRadius: '66px',
                        backgroundImage: 'linear-gradient(to right,#3DADFF,#3377FE)'
                    },
                    btn1: {
                        width: '250px',
                        borderRadius: '66px',
                        backgroundImage: 'linear-gradient(to right,#3377FE,#3DADFF)'
                    },
                    btn2: {
                        width: '250px',
                        borderRadius: '66px',
                        borderColor: '#3DADFF',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        backgroundColor: '#fff',
                    },
                    btn2Text: {
                        color: '#3DADFF'
                    },
                    btn3: {
                        width: '500px',
                        borderRadius: '66px',
                        marginTop: '50px',
                        backgroundImage: 'linear-gradient(to left,#3DADFF,#3377FE)'
                    }
                },
                list:[
                ],
                temperatureData: [],
                minuteData: [],
                secondData: [],
                start: false,
                countdown: 30, 
                showPop1: false, //温度时长弹窗
                showPop2: false, //撤销预约弹窗
                temperature: 180,
                minutes: '00',
                seconds: '00',
                activeMinI: null,
                activeTempI: null,
                activeSecI: null,
                countMin: '00', //设置的分
                countSec: '00', //设置的秒
                countTemperature: null, //设置的温度
                reserveTime: null, //预约启动时间
                reserveStatus: false,//是否预约
                workStatus: false, //运行状态
                workFinish: false, //烹饪是否完成
                workPercent: 0,
                showBackRecipe: false
            }
        },
        computed: {
        },
        methods: {
            goTo(src){
                let path = src + '.js'
                nativeService.goTo(path)
            },
            goBack(){
                nativeService.goBack()
            },
            getStart(){
                if (this.workStatus == true) {
                    nativeService.toast('烹饪正在进行中！')
                }else{
                    this.workFinish = false
                    this.workPercent = 0
                    this.showPop1 = true
                }
            },
            closePop1(){
                this.showPop1 = false
            },
            closePop2(){
                this.showPop2 = false
            },
            // @params {下限，上限，最小单位}
            createArrayData(min, max, unit){
                let that = this
                let tmp = []
                let len = Math.ceil((max - min)/unit)
                for (let i=0; i<=len; i++){
                    let elment = that.formatNum(min + i*unit)
                    tmp.push(elment)
                }
                return tmp
            },
            setTemperature(temp, i){
                this.temperature = temp
                this.activeTempI = i
            },
            setMinutes(min,i){
                this.minutes = min
                this.activeMinI = i
            },
            setSeconds(sec,i){
                this.seconds = sec
                this.activeSecI = i
            },
            reverse() {
                picker.pickTime({
                    'value': this.time,
                    'title': '选择时间', //取消和确定中间那标题
                    'cancelTxt': '取消', //取消按钮文字
                    'confirmTxt': '确定', //确定按钮文字,
                    'cancelTxtColor': '#020F13', //取消颜色
                    'confirmTxtColor': '#020F13', //标题颜色
                    'titleColor': '#020F13', //标题颜色
                    'titleBgColor': '#E7EDEF' //标题栏颜色
                }, event => {
                    if (event.result === 'success') {
                        this.reserveTime = event.data;
                        this.reserveStatus = true
                    }
                })
            },
            cancelReverse(){
                this.reserveStatus = false
            },
            popCancelConfirm(){
                this.showPop2 = true
            },
            confirmStart(){
                this.countTemperature = this.temperature || 0;
                this.countMin = this.minutes || 0;
                this.countSec = this.seconds || 0;
                this.workStatus = true;
                this.closePop1();
                this.countdownTime()
            },
            countdownTime(){
                let that = this
                if (this.workStatus) {
                    let time = Number(that.countMin*60) + Number(that.countSec)
                    let wholeTime = time
                    let timeCount = setInterval(function(){
                        if (time > 0){
                            time-=1;
                            let m = Math.floor(time/60)
                            let s = time - 60*m
                            that.countMin = that.formatNum(m)
                            that.countSec = that.formatNum(s)
                            that.workPercent = (wholeTime -time)*100/wholeTime
                        }else{
                            that.workStatus = false
                            that.workFinish = true
                            that.workPercent = 100
                            clearInterval(timeCount)
                        }
                        
                    },1000)
                }
            },
            formatNum(n){
                if (typeof(n) == 'number' && n < 10){
                    return '0' + n
                }else{
                    return n
                }
            },
            checkRefer(){
                storage.getItem('refer', e => {
                    if (e.data == 'recipe') {
                        this.showBackRecipe = true
                    }
                })
            }
        },
        created(){
            this.checkRefer()
            this.temperatureData = this.createArrayData(0, 320, 10)
            this.minuteData = this.createArrayData(0, 60, 1)
            this.secondData = this.createArrayData(0, 60, 1)

        }
    }
</script>


