//菜谱详情页
<template>
    <div class="recipe">
        <midea-header :title="title" :bgColor="bgColor" :showLeftImg="true" :showRightImg="true" :leftImg="icon.leftImg" :rightImg="icon.rightImg" @leftImgClick="goBack" @rightImgClick="goSearch"></midea-header>
        <div class="interaction-bar">
            <div class="interaction-tag">
                <image class="icon" :src="icon.fav[isFav]"></image>
                <text class="text">{{favsNum}}</text>
            </div>
            <div class="share">
                <image class="icon" :src="icon.share"></image>
            </div>
            <div class="interaction-tag">
                <image class="icon" :src="icon.comment"></image>
                <text class="text">{{commentsNum}}</text>
            </div>
        </div>
        <scroller class="scroller">
            <!-- <midea-video class="video" :src="videoSrc" :autoplay="true" controls @start="onVideoStart" @pause="onVideoPause" @finish="onVideoFinish" @fail="onVideoFail"></midea-video> -->
            <div class="video">
                <text class="text">视频视频视频视频视频视频视频视频视频视频视频视频视频</text>
            </div>
            <div class="recipe-intro-floor" v-if="showRecipeIntro">
                <div class="recipe-intro">
                    <div class="intro-item">
                        <text class="text machine-name">{{recipeData.type}}</text>
                        <text class="text">难度</text>
                        <text class="text">{{recipeData.difficulty}}</text>
                    </div>
                    <div class="intro-item">
                        <image class="icon" :src="icon.duration"></image>
                        <text class="text intro-text">{{recipeData.duration}}</text>
                    </div>
                </div>
            </div>
            <div class="block">
                <div class="score-floor floor">
                    <div class="score">
                        <div class=""><text class="text">评分组件</text></div>
                        <div><text class="text">{{recipeData.scoreNum}}</text></div>
                    </div>
                    <div><text class="text">{{recipeData.madeNum}}人做过</text></div>
                </div>
                <text class="recipe-desc text">{{recipeData.desc}}</text>
                <div class="floor nutritions">
                    <div class="nutritions-list">
                        <div class="floor gram-list" v-for="item in recipeData.gramData">
                            <div><text class="text gram-name">{{item.name}}</text></div>
                            <div><text class="text gram-value">{{item.value}}</text></div>
                        </div>
                    </div>
                    <div class="weight" @click="changeWeight">
                        <image class="icon" :src="icon.weighter"></image>
                        <text class="text weight-text">{{recipeData.weight}}g</text>
                    </div>
                </div>
                
            </div>
            <div class="block">
                <div class="add-sub">
                    <image class="big-icon minus" :src="icon.minus"></image>
                    <div class="floor">
                        <text class="text">{{peopleNum}}</text>
                        <text class="text">人份</text>
                    </div>
                    <image class="big-icon plus" :src="icon.plus"></image>
                </div>
                <div class="needs">
                    <need-list :cols="2" :lists="needList1" :wrapStyle="needStyle" :title="needTitle1"></need-list>
                    <need-list :cols="2" :lists="needList2" :wrapStyle="needStyle" :title="needTitle2"></need-list>
                </div>
                <div class="go-buy" @click="goBuy">
                    <text class="text go-buy-text">食材购买</text>
                </div>
            </div>
            <div class="block" v-for="item in stepData">
                <step-card :stepData="item"></step-card>
            </div>
            <div class="scroller-last"></div>
        </scroller>
        <div class="progress">
             <midea-progress :value="progressValue" :barHeight="12" :bar-width="750" :isRadius="false" barColor="#F6862B"></midea-progress>
             <div>
                <div class="floor floor-c">
                    <text class="text progress-step">步骤一</text>
                    <text class="text progress-time">10:30</text>
                </div>
                <div class="floor floor-c">
                    <text class="text start-btn">一键启动</text>
                </div>
             </div>
        </div>
        <midea-popup :show="showWeightPop" @mideaPopupOverlayClicked="closePop" pos="bottom">
            <div class="weight-pop-list">
                <div class="floor gram-list" v-for="item in recipeData.gramData">
                    <div><text class="text gram-name">{{item.name}}</text></div>
                    <div><text class="text gram-value">{{item.value}}</text></div>
                </div>
            </div>
          
            <scale :max="1000"></scale>
        </midea-popup>
        <midea-popup :show="showBuyPop" @mideaPopupOverlayClicked="closePop" pos="bottom">
            <scroller>
                <div class="floor">
                    <text class="text">牛肉</text>
                    <a href="" class="text">去购买</a>
                </div>
                <div>
                    <text class="text">面粉</text>
                    <a href="" class="text">去购买</a>
                </div>
                <div>
                    <text class="text">羊肉</text>
                    <a href="" class="text">去购买</a>
                </div>
                <div>
                    <text class="text">鸡蛋</text>
                    <a href="" class="text">去购买</a>
                </div>
            </scroller>
        </midea-popup>
    </div>
</template>

<script>

    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import NeedList from '@/T0x9B/components/needList.vue'
    import StepCard from '@/T0x9B/components/stepCard.vue'
    import mideaPopup from '@/midea-component/popup.vue'
    import MideaProgress from '@/midea-component/mProgress.vue'
    import Scale from '@/T0x9B/components/scale.vue'

    export default {
        components: {
            MideaHeader, MideaProgress, mideaPopup, Scale, StepCard, NeedList
        },
        computed: {
        },
        props: {
        },
        data() {
            return {
                icon: {
                    leftImg: './img/header/tab_back.png',
                    rightImg: 'assets/img/search.png',
                    share: 'assets/img/share.png',
                    fav: {
                        on: 'assets/img/fav_on.png',
                        off: 'assets/img/fav.png',
                    },
                    comment: 'assets/img/comment.png',
                    duration: 'assets/img/timer.png',
                    weighter: 'assets/img/weight.png',
                    plus: 'assets/img/plus.png',
                    minus: 'assets/img/minus.png',
                    cart: 'assets/img/cart.png'
                },
                bgColor: '#111',
                title: '烤面包',
                favsNum: 20,
                commentsNum: 1000,
                isFav: 'off',
                videoSrc: '',
                recipeData: {
                    duration: '90分',
                    type: '微波炉',
                    difficulty: '难',
                    score: '4.3',
                    scoreNum: 20,
                    madeNum: 53,
                    desc: '自己动手，丰衣足食，贵州媳妇在家自己作的早餐面包加酸奶，飞上自己考得叉烧肉更加美味',
                    gramData: [
                        {
                            name: '热量',
                            value: '160千卡'
                        },{
                            name: '蛋白质',
                            value: '12.2g'
                        },{
                            name: '脂肪',
                            value: '6.2g'
                        },{
                            name: '碳水化合物',
                            value: '16.2g'
                        },{
                            name: '膳食纤维',
                            value: '2.5g'
                        }
                   ],
                   weight: 100
                },
                showRecipeIntro: true,
                peopleNum: 3,
                needStyle: {
                    width: '750px'
                },
                needTitle1: '主料',
                needList1:[
                    { 
                        name: '低筋面粉',
                        value: 180,
                        unit: 'g',
                        sell: true
                    },
                    { 
                        name: '鸡蛋黄',
                        value: 4,
                        unit: '个',
                        sell: false
                    },
                    { 
                        name: '牛奶',
                        value: 180,
                        unit: 'g',
                        sell: true
                    },
                    { 
                        name: '鸡蛋黄',
                        value: 4,
                        unit: '个',
                        sell: false
                    },
                    { 
                        name: '牛奶',
                        value: 180,
                        unit: 'g',
                        sell: false
                    }
                ],
                needTitle2: '辅料',
                needList2:[
                    { 
                        name: '低筋面粉',
                        value: 180,
                        unit: 'g',
                        sell: true
                    },
                    { 
                        name: '鸡蛋黄',
                        value: 4,
                        unit: '个',
                        sell: false
                    },
                    { 
                        name: '牛奶',
                        value: 180,
                        unit: 'g',
                        sell: true
                    },
                    { 
                        name: '鸡蛋黄',
                        value: 4,
                        unit: '个',
                        sell: false
                    },
                    { 
                        name: '牛奶',
                        value: 180,
                        unit: 'g',
                        sell: false
                    }
                ],
                stepData: [
                    {
                        banner: {
                            type: 'img',
                            src: 'assets/img/tmp_bg.png'
                        },
                        name: '步骤1',
                        icon: 'assets/img/oven.png',
                        desc: '看看啥的金黄色的健康绝对是开心时刻新年开始色即是空几点开始',
                        machineName: '微波炉',
                        runMinute: '10',
                        runSecond: '30'
                    },
                    {
                        banner: {
                            type: 'img',
                            src: 'assets/img/tmp_bg.png'
                        },
                        name: '步骤2',
                        icon: 'assets/img/oven.png',
                        desc: 'sddsfyhgfjgf发给他然后给他人教育厅',
                        machineName: '微波炉',
                        runMinute: '',
                        runSecond: ''
                    },
                    {
                        banner: {
                            type: 'img',
                            src: 'assets/img/tmp_bg.png'
                        },
                        name: '步骤3',
                        icon: 'assets/img/oven.png',
                        desc: '看看啥的金黄色的健康绝对是开心时刻新年开始色即是空几点开始',
                        machineName: '微波炉',
                        runMinute: '10',
                        runSecond: '30'
                    },
                ],
                showBuyPop: false,
                showWeightPop: false,
                progressValue: 50,
            }
        },
        methods:{
            goBack(){
                nativeService.goBack();
            },
            goSearch(){
                nativeService.goTo('search.js')
            },
            goBuy(){
                this.showBuyPop = true
            },
            changeWeight(){
                this.showWeightPop = true
            },
            closePop(){
                this.showWeightPop = false
                this.showBuyPop = false
            },
            onVideoStart() {
                this.showRecipeIntro = false
            },
            onVideoPause() {
            },
            onVideoFinish() {
            },
            onVideoFail() {
            }
        },
        created(){

        }
    }
</script>

<style>
    .recipe{
        background-color: #f1f1f1;
    }
    .interaction-bar{
        width: 740px;
        margin-left: 1px;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 25px;
        padding-right: 25px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .icon{
        width: 36px;
        height: 36px;
        margin-right: 10px;
    }
    .big-icon{
        width: 70px;
        height: 70px;
    }
    .text{
        color: #444;
        font-size: 32px;
        margin-right: 10px;
    }
    .block{
        margin-bottom: 30px;
        border-top-style: solid;
        border-top-color: #e5e5e5;
        border-top-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #e5e5e5;
        border-bottom-width: 2px;
        background-color: #fff;
    }
    .floor{
        padding-left: 25px;
        padding-right: 25px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .floor-c{
        justify-content: center;
    }
    .interaction-tag{
        flex: 1;
        flex-direction: row;
        justify-content: center;
        background-color: #dcdcdc;
        border-radius: 10px;
        padding: 14px;
    }
    .share{
            flex: 2;
            flex-direction: row;
            justify-content: center;
            padding-top: 8px;
    }
    .video {
        width: 750px;
        height: 750px;
        /* background-color: #111; */
        
        background-image: linear-gradient(to top,#08c,#999);
    }
    .machine-name{
        border-width: 2px;
        border-style: solid;
        border-color: #999;
        border-radius: 32px;
        padding-left: 10px;
        padding-right: 10px;
        background-color: #fff;
    }
    .recipe-intro-floor{
        background-color: rgba(255, 255, 255, 0.4);
        margin-top: -130px;
        height: 130px;
        padding: 20px;
        position: relative;
    }
    .recipe-intro{
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.7);
        height: 90px;
        padding-left: 20px;
        padding-right: 20px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .intro-item{
        flex-direction: row;
        justify-content: space-between;
    }
    .score-floor{
        margin-top: 20px;
    }
    .score{
        flex-direction: row;
        justify-content: space-between;
        align-text: center;
    }
    .recipe-desc{
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 25px;
        margin-right: 25px;
    }
    .gram-list{
        height: 50px;
    }
    .nutritions{
        padding-top: 30px;
        padding-bottom: 30px;
        align-items: center;
        border-top-style: solid;
        border-top-color: #b7b7b7;
        border-top-width: 1px;
    }
    .nutritions-list{
        width: 360px;
    }
    .weight{
        background-color: #A4A4A4;
        border-radius: 35px;
        width: 220px;
        height: 70px;
        flex-direction:row;
        justify-content: center;
        align-items: center;
    }
    .weight-text{
        color: #fff;
    }
    .add-sub{
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 25px;
    }
    .minus, .plus{
        border-radius: 35px;
        background-color: #F0BE24;
    }
    .minus:active, .plus:active{
        background-color: #B49D54;
        
    }
    .needs{
        margin-left: 25px;
    }
    .need-title{
        font-weight: bold;
        font-size: 36;
        margin-bottom: 10;
    }
    .need-item{
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .go-buy{
        margin-bottom: 50px;
        flex-direction: row;
        justify-content: center;
    }
    .weight:active, .go-buy-text:active{
        background-color: #808080;
    }
    .go-buy-text{
        padding-left: 120px;
        padding-right: 120px;
        padding-top: 15px;
        padding-bottom: 15px;
        background-color: #b7b7b7;
        color: #fff;
        font-size: 40px;
    }
    .progress{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding-bottom: 20px;
        background-color: rgba(0,0,0,0.8);
        justify-content: center;
    }
    .progress-step{
        color: #fff;
        border-radius: 10px;
        padding-top: 20px;
    }
    .progress-time{
        font-size: 50px;
        font-weight: bold;
        color: #fff;
        padding-top: 20px;
    }
    .start-btn{
        background-color: #F6862B;
        padding-left: 50px;
        padding-right: 50px;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-top: 20px;
        color: #fff;
        border-radius: 10px;
        font-weight: bold;
    }
    .start-btn:active{
        background-color: #B15B16
    }
    .scroller-last{
        width: 750px;
        height: 180px;
    }
    .weight-pop-list{
        justify-content: center;
    }
</style>
