<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box">
	        <div class="card">
		    	 <div class="card-row">
		        	<div class="card-left">
		        		<div><text class="text-label">冷藏</text></div>
		        		<div style="flex-direction: row;margin-left: 100px">
		        			<text class="text-main-status" style="margin-bottom: 80px;">05</text>
		        			<image class="img" :src="rightArrow"></image>
		        		</div>
		        	</div>
		        	<div class="card-middle" style="margin-top:50px">
		        	</div>
		        	<div class="card-right" style="margin-left:115px">
		        		<div><text class="text-label">变温</text></div>
		        		<div style="flex-direction: row;margin-left: -30px">
		        			<text class="text-main-status" style="margin-bottom: 80px;">-05</text>
		        			<image class="img" :src="rightArrow"></image>
		        		</div>
		        	</div>
		        </div>
		        <div class="card-separate">
		        	<div class="card-separate-left"></div>
		        	<div class="card-separate-middle"></div>
		        	<div class="card-separate-right"></div>
		        </div>
		        <div class="card-row" style="align-items: flex-end;">
		        	<div class="card-left">
		        		<div style="margin-top: 60px"><text class="text-label">冷冻</text></div>
		        		<div style="flex-direction: row;margin-left: 100px">
		        			<text class="text-main-status" style="margin-bottom: 80px;">-12</text>
		        			<image class="img" :src="rightArrow"></image>
		        		</div>
		        	</div>
		        	<div class="card-middle" style="margin-bottom: 50px;">
		        	</div>
		        	<div class="card-right" style="margin-left:115px">
		        		<div style="margin-top: 40px"><text class="text-label">模式</text></div>
		        		<div style="flex-direction: row;margin-left: -15px">
		        			<text class="text-main-status-last" style="margin-bottom: 80px;">速冻</text>
		        			<image class="img" :src="rightArrow"></image>
		        		</div>
		        	</div>
		        	
		        </div>
	        </div>
	        <div class="smart">
		        <div class="smart-title">
		        	<text class="smart-text">智能</text>
		        	<image class="smart-img" src="./assets/img/smart_ic_more@2x.png"></image>
		        </div>
		        <midea-smart @change="onMideachange" :checked="mideaChecked" :data="data"></midea-smart>
		      </div>
		      <midea-smart @change="onMideachange2" :checked="mideaChecked2" :data="data2"></midea-smart>     
	        <midea-smart :showSwitchIcon="true" @change="onMideachange2" :hasBottomBorder="false" :checked="mideaChecked2" :data="data3"></midea-smart>
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
                currentTemperture:19,
                power:"off",
                currentStatus:"auto",
                powerIcon: "./assets/img/smart_ic_off@3x.png",
                deviceIcon: "./assets/img/smart_img_equip001@2x.png",
                rightArrow: "./assets/img/smart_ic_arrow_forward@2x.png",
                data:{
                 	title:"室内温度高于28°度时候，自动开启空调。",
                 	detail:"模式制冷，温度23."
                },
                data2:{
                 	title:"宝宝最适宜温度",
                 	detail:"温度28C，风速最小"
                },
                data3:{
                 	title:"宝宝最适宜温度",
                 	detail:""
                }
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
            dom.scrollToElement(el,{offset:parseInt(30 - this.currentTemperture) * 52})
            //this.queryStatus();
        }
    }
</script>

<style>
	.content {
		flex:1;
		width:750px;
		scroll-direction: vertical;
	}
	.box {
		margin-bottom:290px;
	}
	.card {
		width:694px;
		height:392px;
		margin-left:28px;
		margin-right:28px;
		margin-top:28px;
		background-color: #5D75F6;
		flex-direction: column;
		border-radius: 6px;
	}
	.card-row {
		flex-direction: row;
		width: 694px;
		height: 196px;
	}
	.card-separate {
		flex-direction: row;
		justify-content: space-between;
		width: 694px;
		height: 1px;
	}
	.card-separate-left {
		width: 275px;
		margin-left: 50px;
		background-color: white;
	}
	.card-separate-middle {
		width: 44px;
		height: 44px;
	}
	.card-separate-right {
		width: 275px;
		margin-right: 50px;
		background-color: white;
	}
	.text-label {
		opacity: 0.7;
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #FFFFFF;
	}
	.text-main-status {
		font-family: SFProText-Light;
		font-size: 60px;
		color: #FFFFFF;
		letter-spacing: 0;
	}
	.text-main-status-last {
		font-family: PingFangSC-Regular;
		font-size: 44px;
		color: #FFFFFF;
		letter-spacing: -1.69px;
	}
	.img {
		width: 40px;
		height: 40px;
		margin-top: 16px;
		margin-left: 60px;
	}
	.card-hot {
		background-color: #FFBD00;
	}
	.card-control {
		align-items: flex-end;
		margin-top:44px;
		margin-right:44px
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
		align-items: flex-start;
		margin-top:-60px;
		margin-right:-24px
	}
	.card-icon-img {
		width:534px;
		height:248px
	}
	.main-status-div {
		flex-direction: row;
		margin-top:32px;
		margin-left:50px
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
		margin-top: 7px;
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
		width:347px;
		height:196px;
		margin-top: 50px;
		align-items: center;
		justify-content: space-around;
	}
	.card-middle {
		width: 1px;
		height: 120px;
		background-color: white;
	}
	.card-right {
		flex-direction: column;
		width:347px;
		height:196px;
		margin-top: 50px;
		justify-content: space-between;
	}
	.card-right-margin {
		width:30px;
		height:392px;
		background-color: white;
		margin-left: 9px;
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
		font-family: PingFangSC-Light;
		color: #FFFFFF;
		letter-spacing: -4px;
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
		color: #FFFFFF;
	}
	.temp-danwei {
		font-family: PingFangSC-Medium;
		font-size: 12px;
		color: #FFFFFF;
	}
	.scroller-main-separate {
		font-size:16px;
		margin-left:14px;
		color: #FFFFFF;
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
