<template>
<div class="mgbot">
    <!--在线状态-->
    <div class="wrapper" v-if="state!=5">
        <image ref="bgImg" class="bg" v-if="state!=5 && state!=4" :src="srcList.src"></image>
        <image v-if="state==4" class="bg" :src="srcList.bg"></image>
        <image class="bg" :src="srcList.bg"></image>
        <!-- <image class="bg opacity50" :src="srcList.bg"></image> -->
        <midea-lottie-view v-if="state!=5 && state!=4" class="lottie" :data="srcList.data" :loop="true"></midea-lottie-view>
        <div class="textPanel">
            <text class="gray3">实际水温</text>
            <div class="relative">
                <text class="nowTem">{{nowTem>99?99:nowTem}}</text>
                <text class="mgleft160">°</text>
            </div>

            <div class="jcenter mgt-20">
                <div class="center">
                    <text class="gray1">热水量</text>
                    <text class="gray2">{{hotWaterContent}}</text>
                </div>
                <div class="ver-line" />
                <div class="center">
                    <text class="gray1">可洗浴时间</text>
                    <text class="gray2">{{availableTime}}</text>
                </div>
            </div>
        </div>
        <!--开机并保温中-->
        <midea-lottie-view v-if="state==0" class="btn-ani" :data="srcList.btnSrc" :loop="true"></midea-lottie-view>
        <text v-if="state==0" class="btnText">{{keepWarmText}}</text>

        <!--开机并加热中-->
        <div v-if="state==1" class="btn-div">
            <div class="btn-div-dh" ref="btnImgDh" />
            <text class="btn-text">{{heatingText}}</text>
        </div>

        <!--开机并待机中-->
        <div v-if="state==3" class="btn-div-standby">
            <text class="btn-text">{{standbyText}}</text>
        </div>
        <!-- 关机状态 -->
        <div v-if="state==4" class="btn-div-offline">
            <text class="btn-text">{{offlineText}}</text>
        </div>
    </div>
    <!--离线状态-->
    <div class="wrapper" v-if="state==5">
        <image class="bg" :src="srcList.bg"></image>
        <image class="bg" :src="srcList.bg"></image>
        <text class="offLine">已离线</text>

    </div>

</div>
</template>

<script>
const animation = weex.requireModule('animation');
import nativeService from '@/common/services/nativeService';
import base from '@/midea-demo/base.js';

import demo1 from '@/midea-demo/assets/E2_new/keepHeat.json';
import demo2 from '@/midea-demo/assets/E2_new/heating.json';
import demo3 from '@/midea-demo/assets/E2_new/highTemp.json';
import demo5 from '@/midea-demo/assets/E2_new/btn-keepHeat.json';

var timer = undefined;
const config = [{
    src: '../assets/E2_new/keepHeatBg3x.png',
    bg: '../assets/E2_new/keepHeatBg3x.png',
    data: demo1,
    btnSrc: demo5,
}, {
    src: '../assets/E2_new/heatingBg3x.png',
    bg: '../assets/E2_new/heatingBg3x.png',
    data: demo2
}, {
    src: '../assets/E2_new/highTempBg3x.png',
    bg: '../assets/E2_new/highTempBg3x.png',
    data: demo3
}, {
    src: '../assets/E2_new/keepHeatBg3x.png',
    bg: '../assets/E2_new/keepHeatBg3x.png',
    data: demo1,
    btnSrc: demo5,
}, {
    bg: '../assets/E2_new/poweredOff3x.png',
}, {
    bg: '../assets/E2_new/poweredOff3x.png',
}];
export default {
    mixins: [base],
    props: {
        //0:保温中  1:加热中 2:高温杀菌中3:待机中 4:关机 5:离线   待机和保温动效相同,待机没有状态按钮动画
        state: {
            type: Number,
            default: 0
        },
        nowTem: {
            type: Number,
            default: 60
        },
        keepWarmText: {
            type: String,
            default: '保温中'
        },
        heatingText: {
            type: String,
            default: '加热中 还需要10分钟'
        },
        standbyText: {
            type: String,
            default: '待机中'
        },
        offlineText: {
            type: String,
            default: '已关机'
        },
        hotWaterContent: {
            type: String,
            default: '80%'
        },
        availableTime: {
            type: String,
            default: '10min'
        }

    },
    computed: {
        srcList() {
            var i = this.state;
            return config[i];
        }
    },
    components: {

    },
    data() {
        return {

        }
    },
    methods: {
        startAnimation() {
            clearInterval(timer);
            var doAnimate = () => {

                animation.transition(this.$refs.bgImg, {
                    styles: {
                        transform: 'scale(0.8,0.8)',
                        opacity: 1
                    },
                    duration: 0,
                    delay: 0
                })

                animation.transition(this.$refs.bgImg, {
                    styles: {
                        transform: 'scale(1.35,1.35)',
                        opacity: 0
                    },
                    duration: 2000,
                    delay: 100
                })

                if (this.state == 1) {
                    animation.transition(this.$refs.btnImgDh, {
                        styles: {
                            width: 0,
                            opacity: 1
                        },
                        duration: 0,
                        timingFunction: 'linear',
                        delay: 0
                    })

                    animation.transition(this.$refs.btnImgDh, {
                        styles: {
                            width: 370
                        },
                        duration: 1000,
                        timingFunction: 'linear',
                        delay: 100
                    })

                    animation.transition(this.$refs.btnImgDh, {
                        styles: {
                            opacity: 0
                        },
                        duration: 300,
                        delay: 1200,
                        timingFunction: 'linear',
                    })
                }
            }

            doAnimate()
            timer = setInterval(doAnimate, 2200)
        }
    },
    mounted() {
        this.startAnimation();
    },
    watch: {
        state: {
            handler(nV, oV) {
                setTimeout(() => {
                    this.startAnimation()
                }, 100)

            },
            // 表示首次绑定时就会执行Num监测
            immediate: false
        }
    },
}
</script>

<style scoped>
.mgbot {
    margin-bottom: 0px;
}

.relative {
    position: relative;
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.opacity50 {
    opacity: 0.2;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.has-right-border {
    padding-right: 32px;
    border-right-style: solid;
    border-right-width: 1px;
    border-right-color: #E5E5E8;
}

.ver-line {
    background-color: #E5E5E8;
    width: 1px;
    height: 60px;
}

.wrapper {
    width: 750px;
    height: 750px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.bg {
    position: absolute;
    top: 0px;
    left: 75px;
    width: 600px;
    height: 600px;
}

.lottie {
    position: absolute;
    top: 0;
    left: 75px;
    width: 600px;
    height: 600px;
}

.btn-ani {
    position: relative;
    /* left: 142px; */
    top: 70px;
    width: 450px;
    height: 170px;
}

.btnText {
    position: relative;
    top: -35px;
    font-size: 32px;
    color: #ffffff;
}

.btn-div-standby {
    position: relative;
    top: 120px;
    width: 224px;
    height: 60px;
    border-radius: 30px;
    background-color: #FFCD00;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.btn-div {
    position: relative;
    top: 120px;
    width: 370;
    height: 60px;
    border-radius: 30px;
    background-color: #FFAA10;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.btn-div-dh {
    position: absolute;
    width: 370px;
    height: 60px;
    border-radius: 30px 0 0 30px;
    background-image: linear-gradient(to right, rgba(249, 130, 66, 0), #F98242);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.btn-text {
    font-size: 32px;
    color: white;
}

.btn-div-offline {
    position: relative;
    top: 120px;
    width: 224px;
    height: 60px;
    border-radius: 30px;
    background-color: #7C879B;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.textPanel {
    position: relative;
    top: 55px;
    left: 0px;
    width: 600px;
    height: 480px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.nowTem {
    /* font-family: PingFangSC-Regular; */
    font-size: 160px;
    /*width: 200px;

height: 200px;

line-height: 200px;*/
    text-align: center;
}

.jcenter {
    width: 280px;
    margin-left: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.mgleft160 {
    font-family: PingFangSC-Regular;
    font-size: 100px;
    position: absolute;
    right: 30px;
    top: 10px;
}

.gray3 {
    color: #666666;
    font-size: 24px;
}

.gray1 {
    color: #8A8A8F;
    font-size: 24px;
}

.gray2 {
    color: #666666;
    font-size: 32px;
}

.mgt-20 {
    margin-top: 0px;
}

.offLine {
    font-size: 80px;
    position: relative;
    top: 260px;
}
</style>
