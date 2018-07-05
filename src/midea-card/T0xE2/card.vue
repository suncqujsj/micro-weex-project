<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box">
	    	<div v-if="onlineStatus == '1'">
	    		<div v-if="onoff == 'on'">
			        <div>
				    	 <div class="card card-hot">
				        	<div class="card-left">
			        			<div class="main-status-div">
			        				<text class="main-status">{{currentTemperture}}</text>
			        				<text class="danwei">°</text>
			        			</div>
			        			<text class="main-status-second">设置水温</text>
				        		<div class="card-status-detail">
				        			<text class="main-status-third">{{mode}}</text>
				        		</div>
				        		<div class="card-control-temp-div">
				        			<image @click="down" class="cart-control-temp-img" src="./assets/img/smart_ic_reduce_huge@2x.png"></image>
				        			<image @click="up" class="cart-control-temp-img cart-control-temp-img-right" src="./assets/img/smart_ic_increase_huge@2x.png"></image>
				        		</div>
				        	</div>
				        	<div class="card-right">
				        		<div class="card-control">
				        			<image class="card-control-img" src="./assets/img/smart_ic_off@2x.png" @click="poweronoff(0)"></image>
				        		</div>
				        		<div class="card-icon">
				        			<image class="card-icon-img" src="./assets/img/smart_pic_equip021@2x.png"></image>
				        		</div>
				        	</div>
				        </div>
			        </div>
			        <div class="scroller-bar" v-if="1==2">
			        	<scroller-bar :max="75" :min="30" :currentTemperture="currentTemperture" :offsetStep="5" @scrollerBarScroll="scrollerBarScroll"></scroller-bar>
			        </div>
			    </div>
			    <div class="card-power-off" v-else>
		        	<div class="control-div-offline">
		        		<image class="card-control-img" :src="powerIcon_poweroff"  @click="poweronoff(1)"></image>
		        		<text class="text-offline">电源</text>
		        	</div>
		        	<div>
		        		<image class="icon-offline" src="./assets/img/smart_img_equip021@2x.png"></image>
		        	</div>
		        </div>
		    </div>
		    <div class="card-power-off" v-else>
	        	<div class="control-div-offline">
	        		<image class="card-control-img" :src="powerIcon_offline"  @click="poweronoff(1)"></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_img_equip021@2x.png"></image>
	        	</div>
	        	<text class="text-offline-center">已离线</text>
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
	import Mock from './settings/mock'
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
            	deviceId:"",
            	deviceName: "",
            	deviceType: "",
            	deviceSubType: "",
            	deviceSn: "",
            	onlineStatus:"",
            	
                mideaChecked: true,
                mideaChecked2: false,
                
                currentTemperture: "",
                currentSetValue: "",
                danwei:"℃",
	            mode:"",
	            deviceTip: "",
	            onoff: "",//localStorage.getItem("E2power") || "on",
	            temperature: "",//localStorage.getItem("E2temperature") || "12",
	            cur_temperature: "",//localStorage.getItem("E2cur_temperature") || "30",
                return_mode: {
	            	eplus:"E＋增容",
					fast_wash:"极速洗",
					summer:"夏季模式",
					winter:"冬季模式",
					efficient:"节能模式",
					night:"峰谷夜电",
					sterilization:"高温杀菌",
					one_person:"一人洗",
					two_person:"两人洗",
					three_person:"三人洗",
					old_man:"老人洗",
					adult:"成人洗",
					children:"儿童洗",
					cloud:"云智能",
					custom:"自设温度",
					wash:"洗漱用水",
					shower:"淋浴用水",
					bath:"浴缸用水",
					memory:"智能记忆",
					none:""
	            },
                powerIcon_offline: "./assets/img/smart_ic_reline@2x.png",
                powerIcon_poweroff: "./assets/img/smart_ic_power_blue@2x.png",
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
            changeTemperture(value) {
            	let self = this;
            	let params = {
            			"operation":"luaControl",
            			"name":"update",
            			"data":{
            				"mode":"custom",
               				"temperature": value
            			}
            		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
            		self.updateUI(data);
            	},function(error) {
            		console.log("error");
            	});
            },
            scrollerBarScroll(event) {
            	this.currentSetValue = event.value;
            	setTimeout(() => {
            		if((this.currentTemperture - this.currentSetValue)%5 == 0 && this.onoff == "on") {
            			this.changeTemperture(this.currentSetValue);
	            	}
	            }, 1500)
            },
            queryStatus () {
            	let self = this;
            	let params = {
            			"operation":"luaQuery",
            			"name":"deviceinfo",
            			"data":{}
            		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
            		self.updateUI(data);
            	},function(error) {
            		console.log("error");
            	});
            },
            updateUI(data) {
            	if(data.errorCode == 0) {
	                let params = data.params || data.result;
	                this.deviceTip = parseInt(params.error_code);
	                this.onoff = params.power;
					this.temperature = params.temperature;
					this.cur_temperature = params.cur_temperature;
					this.currentTemperture = params.temperature;
					this.mode = this.return_mode[params.mode];
	            }else {
	                modal.toast({ 'message': "连接设备超时", 'duration': 2 });
	            }
            },
            updateDeviceInfo(data) {
            	this.deviceId = data.deviceId;
            	this.deviceName = data.deviceName;
            	this.deviceType = data.deviceType;
            	this.deviceSubType = data.deviceSubType;
            	this.deviceSn = data.deviceSn;
            	this.onlineStatus = data.isOnline;
            },
            poweronoff(flag) {
		        let self = this;
		        let name = flag == 1? "poweron":"poweroff";
		        let poweronoff = flag == 1? "on" : "off";
            	let params = {
            			"operation":"luaControl",
            			"name":name,
            			"data":{
            				"power": poweronoff,
            			}
            		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
            		self.updateUI(data);
            	},function(error) {
            		console.log("error");
            	});
            },
            up () {
	        	if(this.deviceTip) {
	        		modal.toast({ 'message': "设备故障，暂无法操作", 'duration': 2 });
	           		return;
	           	}
	        	if(this.temperature >= 75) {
	        		modal.toast({ 'message': "已达到最高温度", 'duration': 2 });
	           		return;
	           	}
	            let me = this;
	            let params = {
                	"operation":"luaControl",
        			"name":"up",
        			"data":{
        				"mode":"custom",
	            		"temperature":parseInt(this.temperature) + 5
        			}
                }
                nativeService.sendLuaRequest(params,true).then(function(data) {
                    me.updateUI(data);
                })
	        },
	        down () {
	        	if(this.deviceTip) {
	           		modal.toast({ 'message': "设备故障，暂无法操作", 'duration': 2 });
	           		return;
	           	}
	        	if(this.temperature <= 30) {
	        		modal.toast({ 'message': "已达到最低温度", 'duration': 2 });
	           		return;
	           	}
	            let me = this;
	            let params = {
                	"operation":"luaControl",
        			"name":"down",
        			"data":{
        				"mode":"custom",
	            		"temperature": parseInt(this.temperature) - 5
        			}
                }
                nativeService.sendLuaRequest(params,true).then(function(data) {
                    me.updateUI(data);
                })
	        },
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
	        let self = this;
            nativeService.getDeviceInfo().then(function(data) {
            	self.updateDeviceInfo(data.result);
            	if(data.result.isOnline == 1) {
            		self.queryStatus();
            	}
            },function(error) {
            	modal.toast({ 'message': "连接设备超时", 'duration': 2 });
            })
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
	.card-power-off {
		width:694px;
		height:392px;
		margin-left:28px;
		margin-right:28px;
		margin-top:28px;
		background-color: #D8D8DE;
		flex-direction: row;
		border-radius: 6px;
		justify-content: center;
		align-items: center;
	}
	.text-offline {
		font-family: PingFangSC-Regular;
		font-size: 28px;
		color: #5D75F6;
		letter-spacing: 0;
		text-align: center;
	}
	.text-offline-center {
		position: absolute;
		right:300px;
		top:170px;
		align-items: center;
	}
	.control-div-offline {
		position: absolute;
		right:32px;
		top:32px;
		align-items: center;
	}
	.card-control {
		align-items: flex-end;
		margin-top:44px;
		margin-right:44px;
		flex-direction: row;
		justify-content: flex-end;
	}
	.card-control-temp-div {
		flex-direction: row;
		margin-left: 35px;
		margin-bottom: 25px;
	}
	.cart-control-temp-img {
		width: 56px;
		height: 56px
	}
	.cart-control-temp-img-right {
		margin-left: 100px
	}
	.card-status-detail {
		flex-direction: row;
		justify-content: center;
	}
	.card-status-detail-img {
		width:56px;
		height:56px;
	}
	.card-control-img {
		width:60px;
		height:60px
	}
	.icon-offline {
		width: 534px;
		height: 248px;
	}
	.card-icon {
		align-items: flex-end;
		margin-top:-60px;
		margin-right:-10px
	}
	.card-icon-img {
		width:335px;
		height:290px;
		resize: contain;
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
