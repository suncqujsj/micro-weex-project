<template>
    <div class="wrapper" :style="{paddingTop:isIos?'0px':'0px'}">
        <midea-header title="lottieView动效视图" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller>
	        <div style="height: 350px;">
	            <midea-lottie-view v-if="lottieData" ref="lottieView" class="lottie" :dataUrl="url" :data="lottieData" :loop="true"></midea-lottie-view>
	        </div>
	        <div class="botton-group">
	        	<div class="button-group-sub">
		            <midea-button class="botton" :btnStyle="{'width': '250px'}" text="加载demo1" @mideaButtonClicked="mideaButtonClicked(0)">
		            </midea-button>
		            <midea-button class="botton" :btnStyle="{'width': '250px'}" text="加载demo2" @mideaButtonClicked="mideaButtonClicked(1)">
		            </midea-button>
	            </div>
	            <div class="button-group-sub">
		            <midea-button class="botton" :btnStyle="{'width': '250px'}" text="加载demo3" @mideaButtonClicked="mideaButtonClicked(2)">
		            </midea-button>
		            <midea-button class="botton" :btnStyle="{'width': '250px'}" text="加载demo4" @mideaButtonClicked="mideaButtonClicked(3)">
		            </midea-button>
	            </div>
	        </div>
	        
	        <midea-button text="加载自定义" @mideaButtonClicked="mideaButtonClicked1()"></midea-button>
	        <midea-button text="play" @mideaButtonClicked="mideaButtonControl('play')"></midea-button>
	        <midea-button text="pause" @mideaButtonClicked="mideaButtonControl('pause')"></midea-button>
	        <midea-button text="resume" @mideaButtonClicked="mideaButtonControl('resume')"></midea-button>
	        <midea-button text="stop" @mideaButtonClicked="mideaButtonControl('stop')"></midea-button>
	        <textarea class="display-text" v-model="newData" rows="10"></textarea>
        </scroller>
    </div>
</template>

<style scoped>
.lottie {
  width: 730px;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  height: 350px;
}
.botton-group{
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
  flex-wrap: wrap;
}
.button-group-sub {
  flex-direction: row;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
  flex-wrap: wrap;
}
.botton{
  width:250px;
  margin-right: 24px;
}
.display-text {
  font-size: 30px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
<script>  
import base from '../base'
import mideaHeader from '@/midea-component/header.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'

import demo1 from '../assets/lottie/play_button.json'
import demo2 from '../assets/lottie/refresh.json'
import demo3 from '../assets/lottie/WeAcceptInlineImage.json'
import demo4 from '../assets/lottie/lottiefiles.com - Nudge.json'
const lottieModule = weex.requireModule('lottieModule');

export default {
    components: { mideaHeader, mideaButton },
    mixins: [base],
    data() {
        return {
            newData:'{"v":"4.11.1","fr":29.9700012207031,"ip":0,"op":61,"w":300,"h":150,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[150,75,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[76.445,76.445],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":0,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":1,"k":[{"t":0,"s":[0.928262987324,0,0,1],"h":1},{"t":17,"s":[0.03852634877,0,1,1],"h":1},{"t":51,"s":[0.03852634877,1,0,1],"h":1}],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-59.777,-4.777],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":2,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":61,"st":0,"bm":0}]}',
            lottieDemo:[
                demo1,
                demo2,
                demo3,
                demo4
            ],
            lottieData: "",
            url: "http://10.73.12.140:8080/dist/midea-demo/assets/lottie/animated_laptop_.json"
        }
    },
    methods: {
        mideaButtonClicked(index) {
            this.lottieData = JSON.stringify(this.lottieDemo[index])
        },
        mideaButtonClicked1(index) {
            this.lottieData = this.newData
        },
        mideaButtonControl(api) {
        	let lottieRef = this.$refs.lottieView;
        	let param = {
        		api: api,
        		params:{}
        	};
        	lottieModule.lottieInterface(lottieRef,
        	param,function(success){
        		nativeService.toast("successful");
        	},function(error) {
        		nativeService.toast("error");
        	})
        }
    },
    mounted() {
        this.lottieData = JSON.stringify(this.lottieDemo[0])
    }
}
</script>