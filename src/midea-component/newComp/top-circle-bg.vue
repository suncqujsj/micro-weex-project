<template>
    <div class="wrap">
        <midea-lottie-view  class="lottie" :data="srcList.data" :loop="true"></midea-lottie-view>
        <image v-if="srcList.hasWave" class="circle-img" :src='waveSrc' ref="circle" />
    </div>
</template>
<style>
.wrap{
    position: absolute;
    width: 750px;
    height: 600px;
}
.lottie{
    position: relative;
    right: -100px;
    width: 750px;
    height: 600px;
}
.circle-img{
    position: absolute;
    right: -70px;
    top: 0px;
    height: 100px;
    width: 100px;
}
</style>
<script>
import waterInit from './assets/E2_new/water-init.json';
import waterNormal from './assets/E2_new/water-normal.json';
import waterOffline from './assets/E2_new/water-offline.json';
const animation = weex.requireModule('animation')
var timer
export default {
    props:{
        state:{
            type:Number,
            default:0
        },
        assetsPath:{
            type:String,
            default:'../assets'
        }
    },
    data(){
        return {
            waveSrc:this.assetsPath+'/E2_new/watercleaner_img_ing.png'
        }
    },
    computed:{
        srcList(){
            switch(this.state){//0:初始化  1:正常  2:制水中  3:离线
                case 0:
                    return {
                        data:waterInit,
                        hasWave:false
                    }
                case 1:
                    return {
                        data:waterNormal,
                        hasWave:false
                    }
                case 2:
                    return {
                        data:waterNormal,
                        hasWave:true
                    }
                case 3:
                    return {
                        data:waterOffline,
                        hasWave:false
                    }
            }
        }
    },
    methods:{
        startAnimation(){
            clearInterval(timer)
            var doAnimate = ()=>{
                animation.transition(this.$refs.circle,{
                    styles:{
                        transform:'scale(1,1)',
                        opacity:1
                    },
                    duration:0,
                    timingFunction:'linear',
                    delay:0
                })
                animation.transition(this.$refs.circle,{
                    styles:{
                        transform:'scale(15,15)',
                        opacity:0
                    },
                    duration:3500,
                    delay:100,
                    timingFunction:'linear'
                })
            }
            doAnimate()
            timer = setInterval(doAnimate,4000)
        },
        stopAnimation(){
            clearInterval(timer)
        }
    },
    watch:{
        state:{
            handler(nV,oV){
                if(nV==2){
                    setTimeout(()=>{
                        this.startAnimation()
                    },100)
                }else{
                    this.stopAnimation()
                }
            }
        }
    }
}
</script>
