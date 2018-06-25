<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box">
	        <div>
		    	 <div class="card card-hot">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<text class="main-status">58</text>
	        				<text class="danwei">°</text>
	        			</div>
	        			<text class="main-status-second">当前水温</text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">加热中/还需10分钟</text>
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control" @click="powerOnoff">
		        			<image class="card-control-img" src="./assets/img/smart_ic_off@2x.png"></image>
		        		</div>
		        		<div class="card-icon">
		        			<image class="card-icon-img" src="./assets/img/smart_pic_equip021@2x.png"></image>
		        		</div>
		        	</div>
		        </div>
	        </div>
	        <div class="scroller-bar">
	        	<scroller-bar :max="60" :min="30" :currentTemperture="currentTemperture"></scroller-bar>
	        </div>
	        <div class="smart">
		        <div class="smart-title">
		        	<text class="smart-text">智能</text>
		        	<image class="smart-img" src="./assets/img/smart_ic_more@2x.png"></image>
		        </div>
	      	</div>
	      	<midea-smart @change="onMideachange2" :checked="mideaChecked2" :data="data2"></midea-smart>     
	        <midea-smart :showSwitchIcon="true" @change="onMideachange2" :hasBottomBorder="true" :checked="mideaChecked2" :data="data3"></midea-smart>
	    </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
		import mideaSwitch from '@/midea-component/switch.vue'
		import mideaSmart from '@/midea-card/T0xAC/components/smart.vue'
		import scrollerBar from '@/midea-card/T0xAC/components/scroller-bar.vue'
		import mideaItem from '@/midea-component/item.vue'
		const modal = weex.requireModule('modal');
		const dom = weex.requireModule('dom');
		var stream = weex.requireModule('stream');
    export default {
        components: {
            mideaSwitch,
            mideaSmart,
            mideaItem,
            scrollerBar
        },
        data() {
            return {
                mideaChecked: true,
                mideaChecked2: false,
                currentTemperture:38,
                power:"off",
                currentStatus:"auto",
                data:{
                 	title:"室内温度高于28°度时候，自动开启空调。",
                 	detail:"模式制冷，温度23."
                },
                data2:{
                 	title:"洗衣机清洁提醒。",
                 	detail:"每隔1个月提醒。"
                },
                data3:{
                 	title:"缺少消毒剂，柔顺剂提醒。",
                 	detail:""
                },
                list: [
                { 
                	"name": "电饭煲食谱",
                	"rightText":"更多"
                }]
            }
        },
        methods: {
            onMideachange(event) {
            		//modal.toast({ 'message': event.value, 'duration': 2 });
            },
             onMideachange2(event) {
            		//modal.toast({ 'message': event.value, 'duration': 2 });
            },
            changeTemperture(event) {
	            	let currentSetTemperture = Math.ceil(event.contentOffset.x/52) +29;
	            	if(currentSetTemperture <= 17) {
	            		currentSetTemperture = 17;
	            	} else if (currentSetTemperture >= 30) {
	            		currentSetTemperture = 30;
	            	}
	            	this.currentTemperture = currentSetTemperture;
            },
            queryStatus () {
            	let self = this;
            	let params = {
            			"operation":"luaQuery",
            			"data":{}
            		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
            		self.updateUI(data);
            	},function(error) {
            		console.log("error");
            	});
            },
            updateUI(data) {
            	console.log("yoram:");
            	console.dir(data);
            },
            powerOnoff() {
            	//nativeService.getPath((weexPath)=> {
		            	stream.fetch({
		            		method:'get',
		            		url:"/dist/T0xAC/dummy/delDevice.js",
		            		type:"json"
		            	},function(ret) {
		            		console.dir(nativeService.convertToJson(ret.data))
		            	},function(response) {
		            		console.dir(nativeService.convertToJson(response.data));
		            	})
		          // });
		        }
        },
        computed: {
				powerOnoffImg () {
		            let img = "./assets/img/smart_ic_power@2x.png";
		            if(this.power == "on") {
		                img = "./assets/img/smart_ic_power@2x.png";
		            } else {
		                img = "./assets/img/smart_ic_power@2x.png";
		            }
		            return img;
		        },
		        startPause() {
		        	let img = "./assets/img/smart_ic_power@2x.png";
		            if(this.power == "on") {
		                img = "./assets/img/smart_ic_power@2x.png";
		            } else {
		                img = "./assets/img/smart_ic_power@2x.png";
		            }
		            return img;
		        },
	        	statusImg() {
		        		let img = "./assets/img/smart_ic_smart@2x.png";
		        		if(this.currentStatus == "auto") {
		        			img = "./assets/img/smart_ic_smart@2x.png"
		        		} else if(this.currentStatus == "cold") {
		        			img = "./assets/img/smart_ic_smart@2x.png"
		        		}
		        		return img;
	        	}
        },
        mounted() {
	        	const el = this.$refs.scrollBar;
	        	//modal.toast({ 'message': this.currentTemperture, 'duration': 2 });
            dom.scrollToElement(el,{offset:parseInt(30 - this.currentTemperture) * 52})
            //this.queryStatus();
        }
    }
</script>


<style>
	.content {
		flex:1;
		width:750px
	}
	.box {
		margin-bottom:450px
	}
	.card {
		width:694;
		height:392px;
		margin-left:28px;
		margin-right:28px;
		margin-top:28px;
		background-color: #5D75F6;
		flex-direction: row;
		border-radius: 6px;
	}
	.card-hot {
		background-color: #FFBD00;
	}
	.card-control {
		align-items: flex-end;
		margin-top:44px;
		margin-right:44px;
		flex-direction: row;
		justify-content: flex-end;
	}
	.card-status-detail {
		flex-direction: row;
		justify-content: center;
		margin-bottom:60px;
	}
	.card-status-detail-img {
		width:56px;
		height:56px;
	}
	.card-control-img {
		width:48px;
		height:50px
	}
	.card-icon {
		align-items: flex-end;
		margin-top:-60px;
		margin-right:-10px
	}
	.card-icon-img {
		width:282px;
		height:286px
	}
	.main-status-div {
		flex-direction: row;
		margin-top:32px;
		margin-left:30px
	}
	.main-status {
		font-size: 128px;
		color: #FFFFFF;
	}
	.danwei {
		font-family: PingFangSC-Light;
		font-size: 96px;
		text-align: center;
		color: #FFFFFF;
	}
	.main-status-second {
		font-size: 26px;
		margin-left:10px;
		margin-top:-50px;
		color: #FFFFFF;
	}
	.main-status-third {
		font-size: 28px;
		margin-left:10px;
		margin-top:8px;
		color: #FFFFFF;
	}
	.card-left {
		flex-direction: column;
		width:343px;
		height:392px;
		align-items: center;
		justify-content: space-around;
	}
	.card-right {
		flex-direction: column;
		width:343px;
		height:392px;
		justify-content: space-between;
	}
	.smart {
		flex-direction: column;
		justify-content: space-between;
		margin-top:20px;
	}
	.smart-title {
		flex-direction: row;
		justify-content: space-between;
		margin-left:32px;
		margin-right:32px;
	}
	.smart-content {
		margin-top:50px;
		margin-left:32px;
		margin-right:32px;
		border-bottom: inset
	}
	.smart-content-last {
		margin-top:50px;
		margin-left:32px;
		margin-right:32px;
	}
	.smart-text {
		font-family: PingFangSC-Regular;
		font-size: 36px;
		color: #000000;
		letter-spacing: 0;
	}
	.smart-img {
		width:48px;
		height: 48px;
	}
	.smart-detail {
		flex-direction: row;
		justify-content: space-between;
		margin-top:30px;
		padding-bottom: 20px;
	}
	.smart-detail-content {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #8A8A8F;
		letter-spacing: 0;
	}
	.scroller-bar {
		margin-top:-72px;
	}
	.scroller {
		height:120px;
	}
	.scroller-div {
		width:1372px;
		flex-direction: row;
		justify-content: space-between;
	}
	.scroller-left {
		width:350px;
	}
	.scroller-main {
		width:233px;
		flex-direction: column;
	}
	.scroller-main-div {
		margin-left:102px;
		flex-direction: column;
	}
	.scroller-main-content {
		font-size: 24px;
	}
	.scroller-main-separate {
		font-size:16px;
		margin-left:14px;
	}
	.scroller-main-img-first {
		width:233px;
		height: 30px;
	}
	.scroller-main-img-second {
		width:32px;
		height: 32px;
		margin-left:100px;
		margin-top:-20px;
	}
	.scroller-right {
		width:350px;
	}

</style>
