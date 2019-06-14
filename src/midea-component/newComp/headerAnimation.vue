<template>
    <div class="wrapper">
    	<image resize="stretch" class="back-img" :src="bgImg"></image>
        <image  class="circle-img" :src='animationImg' ref="circle"></image>
        <image  class="circle-img2" :src='animationImg' ref="circle2"></image>
    </div>
</template>
<style scoped>
.wrapper {
	width:750px;
	height:750px;
	position: absolute;
	top:-100px;
}
.back-img {
	width: 750px;
 	height: 550px;
  	position:absolute;
}
.circle-img{
    position: absolute;
    top: -450px;
    height: 750px;
    width: 750px;
}
.circle-img2{
    position: absolute;
    top: -600px;
    height: 750px;
    width: 750px;
}
</style>
<script>  

const animation = weex.requireModule('animation')
import nativeService from '@/common/services/nativeService'
export default {
    props: {
        bgImg: {
        	type:String,
        	default:"../assets/FB/blue_change.png"
        },
        animationImg: {
            type: String,
            default: "../assets/FB/warm_img_circle_blue@3x.png"
        }
    },
    data() {
        return {
        	bgColor:"#5D75F6"
        }
    },
    methods: {
       progresscycleTap(event) {
       	nativeService.alert(event)
       },
       startAnimation(){
			let currentTag = this.$refs.circle
			let currentTag2 = this.$refs.circle2
            var doAnimate = ()=>{
                animation.transition(currentTag,{
                    styles:{
                        transform:'scale(0.8)',
                        opacity:1
                    },
                    duration:0,
                    timingFunction:'linear',
                    delay:0
                })
                animation.transition(currentTag,{
                    styles:{
                        transform:'scale(2)',
                        opacity:0
                    },
                    duration:3500,
                    delay:100,
                    timingFunction:'linear'
                })
                 animation.transition(currentTag2,{
                    styles:{
                        transform:'scale(0.8)',
                        opacity:1
                    },
                    duration:0,
                    timingFunction:'linear',
                    delay:200
                })
                animation.transition(currentTag2,{
                    styles:{
                        transform:'scale(2)',
                        opacity:0
                    },
                    duration:3500,
                    delay:300,
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
    mounted() {
      	this.startAnimation();
    },
};
</script>