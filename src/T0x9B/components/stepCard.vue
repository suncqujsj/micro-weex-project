//食材列表
<template>
    <div class="wrap">
        <div class="banner">
            <image v-if="stepData.bannerType == 'img'" class="step-image" :src="stepData.bannerSrc"></image>
            <midea-video v-else class="video" :src="stepData.bannerSrc" @start="vdStart" @pause="vdPause" @finish="vdFinish" @fail="vdFail"></midea-video>
        </div>
        <div class="floor floor-l">
            <text class="text">{{stepData.name}}</text>
            <image class="icon" :src="stepData.icon"></image>
        </div>
        <div class="desc">
            <text class="text">{{stepData.desc}}</text>
        </div>
        <div v-if="stepData.runMinute && stepData.runSecond" class="floor floor-c">
            <text class="machine-name">{{stepData.machineName}}</text>
            <text class="duration-time">{{stepData.runMinute}}</text>
            <text class="duration-text">分</text>
            <text class="duration-time">{{stepData.runSecond}}</text>
            <text class="duration-text">秒</text>
        </div>
    </div>
</template>

<script>

    import nativeService from '@/common/services/nativeService.js'

    export default {
        components: {
        },
        computed: {
          
        },
        props: {
            stepData: {
                type: Object,
                default: function(){
                    return {
                        bannerType: 'img',
                        bannerSrc: 'assets/img/tmp_bg.png',
                        name: '步骤1',
                        icon: 'assets/img/oven.png',
                        desc: '看看啥的金黄色的健康绝对是开心时刻新年开始色即是空几点开始',
                        machineName: '微波炉',
                        runMinute: '10',
                        runSecond: '30'
                    }
                }
            }
        },
        data() {
            return {
                icon: {
                    cart: 'assets/img/cart.png'
                }
            }
        },
        methods:{
            vdStart(e) {
                this.$emit('videoStart',e)
            },
            vdPause(e) {
                this.$emit('videoPause',e)
            },
            vdFinish(e) {
                this.$emit('videoFinish',e)
            },
            vdFail(e) {
                this.$emit('videoFail',e)
            }
        },
        created(){

        }
    }
</script>

<style>
    .wrap{
        padding-bottom: 20px;
    }
    .text{
        font-size: 32px;
        color: #777;
        margin-right: 10px;
    }
    .icon{
        width: 32px;
        height: 32px;
    }
    .floor{
        flex-direction: row;
        padding: 20px;
        align-items: center;
    }
    .floor-l{
        justify-content: flex-start;
    }
    .floor-c{
        justify-content: center;
    }
    .desc{
        padding-left: 20px;
        padding-right: 20px;
    }
    
    .banner,.video, .step-image{
        width: 750px;
        height: 750px;
    }
    
    .duration-text{
        font-size: 34px;
        margin-right: 10px;
        color: #777;
    }
    .machine-name{
        font-size: 34px;
        margin-right: 30px;
        font-weight: bold;
        color: #999;
    }
    .duration-time{
        color: #6A462E;
        font-size: 70px;
        font-weight: bold;
    }
</style>
