<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box">
	    	<div v-if="onlineStatus == '1'">
	    		<div v-if="onoff == 'on'">
			        <div>
				    	 <div class="card card-hot">
				        	<div class="card-left">
			        			<div class="main-status-div">
			        				<text class="main-status">{{temperature}}</text>
			        				<text class="danwei">{{danwei}}</text>
			        			</div>
			        			<text class="main-status-second">当前水温</text>
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
				        		<div class="card-icon" @click="showControlPanelPage">
				        			<image class="card-icon-img" src="./assets/img/smart_img_equip036@2x.png"></image>
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
		        		<image @click="showControlPanelPage" class="icon-offline" src="./assets/img/smart_img_equip036@2x.png"></image>
		        	</div>
		        </div>
		    </div>
		    <div class="card-power-off" v-else>
	        	<div class="control-div-offline">
	        		<image class="card-control-img" :src="powerIcon_offline"  @click="reload"></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_img_equip036@2x.png"></image>
	        	</div>
	        	<text class="text-offline-center">已离线</text>
	        </div>
	        <midea-download></midea-download>
	    </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
	import mideaSwitch from '@/midea-component/switch.vue'
	import scrollerBar from '@/midea-card/T0xAC/components/scroller-bar.vue'
	import mideaItem from '@/midea-component/item.vue'
	import mideaDownload from '@/midea-card/midea-components/download.vue';
	import Mock from './settings/mock'
	const modal = weex.requireModule('modal');
	const dom = weex.requireModule('dom');
	var stream = weex.requireModule('stream');
	const globalEvent = weex.requireModule('globalEvent');
	const bridgeModule = weex.requireModule('bridgeModule');
    export default {
        components: {
            mideaSwitch,
            mideaItem,
            scrollerBar,
            mideaDownload
        },
        data() {
            return {
            	deviceId:"",
            	deviceName: "",
            	deviceType: "",
            	deviceSubType: "",
            	deviceSn: "",
            	onlineStatus:"",
            	
            	pushKey: "receiveMessage",
            	pushKeyOnline: "receiveMessageFromApp",
                
                currentTemperture: "",
                currentSetValue: "",
                danwei:"°",
	            mode:"",
	            deviceTip: "",
	            onoff: "",//localStorage.getItem("E2power") || "on",
	            temperature: "",//localStorage.getItem("E2temperature") || "12",
                return_mode: {
	            	invalid:"模式无效，全关",
					shower:"淋浴工作模式",
					kitchen:"厨房工作模式",
					thalposis:"随温感工作模式",
					intelligence:"云智能工作模式",
					eco:"一键节能工作模式",
					unfreeze:"解冻工作模式",
					wash_bowl:"洗碗工作模式",
					high_temperature:"高温水工作模式",
					baby:"宝宝浴工作模式",
					adult:"成人浴工作模式",
					old:"老人浴工作模式"
	            },
                powerIcon_offline: "./assets/img/smart_ic_reline@2x.png",
                powerIcon_poweroff: "./assets/img/smart_ic_power_blue@2x.png",
            }
        },
        methods: {
            queryStatus () {
            	let self = this;
            	let params = {
            			"operation":"luaQuery",
            			"name":"deviceinfo",
            			"params":{}
            		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
            		self.updateUI(data);
            	},function(error) {
            		console.log("error");
            	});
            },
            updateUI(data) {
            	if(data.errorCode == 0) {
            		this.onlineStatus = "1";
	                let params = data.params || data.result;
	                this.deviceTip = parseInt(params.error_code);
	                this.onoff = params.power;
					this.temperature = params.temperature;
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
            			"params":{
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
	        		nativeService.toast("设备故障，暂无法操作");
	           		return;
	           	}
	        	if(this.temperature >= 65) {
	        		nativeService.toast("已达到最高温度");
	           		return;
	           	}
	            let me = this;
	            let params = {
                	"operation":"luaControl",
        			"name":"up",
        			"params":{
        				"mode":"shower",
	            		"temperature":parseInt(this.temperature) + 1
        			}
                }
                nativeService.sendLuaRequest(params,true).then(function(data) {
                    me.updateUI(data);
                })
	        },
	        down () {
	        	if(this.deviceTip) {
	           		nativeService.toast("设备故障，暂无法操作");
	           		return;
	           	}
	        	if(this.temperature <= 35) {
	        		nativeService.toast("已达到最低温度");
	           		return;
	           	}
	            let me = this;
	            let params = {
                	"operation":"luaControl",
        			"name":"down",
        			"params":{
        				"mode":"shower",
	            		"temperature": parseInt(this.temperature) - 1
        			}
                }
                nativeService.sendLuaRequest(params,true).then(function(data) {
                    me.updateUI(data);
                })
	        },
	         handleNotification() {
            	console.log("handleNotification Yoram");
            	let me = this;
            	globalEvent.addEventListener(this.pushKey, (data) => {
            		me.updateUI(data);
		        });
		        globalEvent.addEventListener(this.pushKeyOnline, (data) => {
            		if(data && data.messageType == "deviceOnlineStatus") {
            			if(data.messageBody && data.messageBody.onlineStatus == "online") {
            				me.onlineStatus = "1";
            			} else if(data.messageBody && data.messageBody.onlineStatus == "offline") {
            				me.onlineStatus = "0";
            			} else {
            				me.onlineStatus = "0";
            			}
            		}
		        });
            },
            showControlPanelPage() {
            	let params = {
            		controlPanelName:"controlPanel.html"
            	};
            	bridgeModule.showControlPanelPage(params);
            },
            reload() {
            	let params = {};
            	bridgeModule.reload(params,function(result) {
            		//successful
            	},function(error) {
            		//fail
            	});
            },
        },
        computed: {
        	
        },
        mounted() {
	        let self = this;
            nativeService.getDeviceInfo().then(function(data) {
            	self.updateDeviceInfo(data.result);
            	self.handleNotification();
        		self.queryStatus();
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
		width:686px;
		height:392px;
		margin-left:32px;
		margin-right:32px;
		margin-top:32px;
		background-color: #5D75F6;
		flex-direction: row;
		border-radius: 6px;
	}
	.card-hot {
		background-color: #FFBD00;
	}
	.card-power-off {
		width:686px;
		height:392px;
		margin-left:32px;
		margin-right:32px;
		margin-top:32px;
		background-color: #D8D8DE;
		flex-direction: row;
		border-radius: 6px;
		justify-content: center;
		align-items: flex-end;
	}
	.text-offline {
		font-family: PingFangSC-Regular;
		font-size: 20px;
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
		width: 64px;
		height: 64px
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
		width:58px;
		height:58px
	}
	.icon-offline {
		width: 314px;
		height: 314px;
		opacity: 0.3;
	}
	.card-icon {
		align-items: flex-end;
		margin-top:-60px;
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
