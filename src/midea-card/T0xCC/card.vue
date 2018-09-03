<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box" >
		    	 <div v-if="onlineStatus == '1'" @click="showControlPanelPage">
		    	 	<div v-if="onoff == 'on'" @click="showControlPanelPage">
				    	 <div class="card" :class="[mode =='heat'?'card-hot':''] ">
				        	<div class="card-left">
			        			<div class="main-status-div">
			        				<text class="main-status">{{temperature}}</text>
			        				<text class="danwei">{{danwei}}</text>
			        			</div>
			        			<text class="main-status-second">设定温度</text>
				        		<div class="card-status-detail">
				        			<image class="card-status-detail-img" :src="statusImg"></image>
				        			<text class="main-status-third">{{currentMode}}</text>
				        		</div>
				        		<div class="card-control-temp-div">
				        			<image @click="temperatureControl(-1)" class="cart-control-temp-img" src="./assets/img/smart_ic_reduce_huge@3x.png"></image>
				        			<image @click="temperatureControl(1)" class="cart-control-temp-img cart-control-temp-img-right" src="./assets/img/smart_ic_increase_huge@3x.png"></image>
				        		</div>
				        	</div>
				        	<div class="card-right">
				        		<div class="card-control" >
				        			
				        		</div>
				        		<div class="card-icon">
				        			<image class="card-icon-img"   :src="deviceIcon"></image>
				        		</div>
				        		<div></div>
				        		<div class="card-control-div" @click="poweronoff(0)">
				        			<image class="card-control-img" :src="powerIcon" ></image>
			        			</div>
				        	</div>
				        	<div class="card-right-margin"></div>
				        </div>
			        </div>
			        <div class="card-power-off" v-else @click="showControlPanelPage">
			        	<div class="control-div-offline">
			        		<image class="card-control-img" :src="powerIcon_poweroff"  @click="poweronoff(1)"></image>
			        		<text class="text-offline">电源</text>
			        	</div>
			        	<div>
			        		<image class="icon-offline" :src="deviceIcon"></image>
			        	</div>
			        </div>
			    </div>
			    <div class="card-power-off" v-else>
		        	<div class="control-div-offline" @click="reload">
		        		<image class="card-control-img" :src="powerIcon_offline"></image>
		        		<text class="text-offline">重连</text>
		        	</div>
		        	<div>
		        		<image class="icon-offline" :src="deviceIcon"></image>
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
	import mideaItem from '@/midea-component/item.vue'
	import mideaButton from '@/midea-component/button.vue';
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
            mideaButton,
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
                
	            promptStr:"",//蜂鸣声,需要从控制页的localStorage里拿
	            onoff: "on",//localStorage.getItem("AConoff") || "on", //当前设备开关机状态
	            mode: "--",//localStorage.getItem("ACmode") || "",
	            temperature: "--",//parseInt(localStorage.getItem("ACtemperature")),
	            indoorTemperature: "",//localStorage.getItem("ACindoorTemperature"),
	            danwei: "",
            
                powerIcon: "./assets/img/smart_ic_off@3x.png",
                powerIcon_poweroff: "./assets/img/smart_ic_power_blue@3x.png",
                powerIcon_offline: "./assets/img/smart_ic_reline@3x.png",
                deviceIcon: "./assets/img/smart_img_equip023@3x.png",
                moreImg: "./assets/img/smart_ic_more@3x.png",
            }
        },
        methods: {
            temperatureControl (value) {// -1 or 1
	            if(this.onoff == 'off') {
	            	nativeService.toast("关机状态无法设置温度");
	                return;
	            }
	            let temperature = this.temperature;
	            
	            if (this.temperature == "--") {
	                this.queryStatus();
	                return;
	            }
	            if(temperature <= 17 && value == -1) {
	            	nativeService.toast("最低设置温度17度");
	                return
	            }
	            if(temperature >= 30 && value == 1) {
	            	nativeService.toast("最高设置温度30度");
	                return
	            }
	            if(this.mode == 'fan') {
	            	nativeService.toast("送风模式无法设置温度");
	                return
	            }
	            let promptStr = "0";//localStorage.getItem("ACTone"+this.deviceSN);
	            let me = this;
	            this.temperature += value;
                let params = {
                	"operation":"luaControl",
        			"name":"temperatureControl",
        			"params":{
        				temperature: me.temperature,
        			}
                }
                nativeService.sendLuaRequest(params,true).then(function(data) {
                    me.updateUI(data);
                })
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
            		if(error.errorCode == '331307' || error.errorCode == '1307') {
            			self.onlineStatus = "0"
            		}
            		console.log("error");
            	});
            },
            updateUI(data) {
            	let self = this;
	            if(data.errorCode == 0) {
	            	this.onlineStatus = "1";
	                let params = data.params || data.result;
	                this.onoff = params.power;
	                this.mode = params.mode;
	                // this.temperature = parseInt(params.temperature) + parseFloat(params.small_temperature);
	                this.temperature = parseInt(params.temperature); //不显示小数位
	                this.tmpTemperatureValue = this.temperature; //记录临时温度值
	                this.danwei = "°";
	
	                this.indoorTemperature = parseInt(params.indoor_temperature) || "--";
	                if(params.indoor_temperature == 0) {
	                	this.indoorTemperature = 0;
	                }
	            }else {
	                this.temperature = this.tmpTemperatureValue; //记录临时温度值
	                nativeService.toast("连接设备超时");
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
            		} else if(data && data.messageType == "queryStatusFromApp") {
	                	me.queryStatus();
	                }
		        });
            },
            showControlPanelPage() {
            	let params = {
            		controlPanelName:"controlPanel.html"
            	};
            	bridgeModule.showControlPanelPage(params);
            	nativeService.burialPoint({
	                pageName: 'applianceDetailPage',
	                subAction: 'page_view'
	            });
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
			powerOnoffImg () {
	            let img = "./assets/img/smart_ic_power@3x.png";
	            return img;
	        },
        	statusImg() {
	        		let img = "./assets/img/smart_ic_smart@3x.png";
	        		if(this.mode == 'cool') {
	        			img = "./assets/img/smart_ic_smart@3x.png";
	        		} else if(this.mode == 'heat') {
	        			img = "./assets/img/smart_ic_warmmode@3x.png";
	        		} else if(this.mode == 'auto') {
	        			img = "./assets/img/auto@3x.png";
	        		} else if(this.mode == 'dry') {
	        			img = "./assets/img/wet@3x.png";
	        		} else if(this.mode == 'fan') {
	        			img = "./assets/img/wind@3x.png";
	        		} else {
	        			img = "./assets/img/smart_ic_smart@3x.png";
	        		}
	        		return img;
        	},
        	currentMode() {
        		let status = "";
        		if(this.mode == 'cool') {
        			status = "制冷";
        		} else if(this.mode == 'heat') {
        			status = "制热";
        		} else if(this.mode == 'auto') {
        			status = "自动";
        		} else if(this.mode == 'dry') {
        			status = "抽湿"
        		} else if(this.mode == 'fan') {
        			status = "送风";
        		} else {
        			status = "";
        		}
        		return status;
        	}
        },
        mounted() {
        	let self = this;
            nativeService.getDeviceInfo().then(function(data) {
            	self.updateDeviceInfo(data.result);
            	self.handleNotification();
        		self.queryStatus();
            },function(error) {
            	nativeService.toast("连接设备超时");
            })
        }
    }
</script>

<style>
	.content {
		flex:1;
		width:750px;
		scroll-direction: vertical;
		background-color: #f2f2f2;
	}
	.box {
		margin-bottom:290px;
	}
	.card {
		width:686px;
		height:392px;
		margin-left:32px;
		margin-right:32px;
		background-color: #5D75F6;
		flex-direction: row;
		border-radius: 6px;
	}
	.card-power-off {
		width:686px;
		height:392px;
		margin-left:32px;
		margin-right:32px;
		background-color: #D8D8DE;
		flex-direction: row;
		border-radius: 6px;
		justify-content: center;
		align-items: center;
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
		top:176px;
		left:289px;
		align-items: center;
		font-family: PingFangSC-Regular;
		font-size: 36px;
		color: #000000;
		letter-spacing: 0;
		text-align: center;
	}
	.control-div-offline {
		position: absolute;
		right: 0px;
		top:0px;
		padding-top: 24px;
		padding-right: 24px;
		padding-left:14px;
		padding-bottom: 6px;
		align-items: center;
	}
	.icon-offline {
		width: 534px;
		height: 248px;
		opacity: 0.3;
	}
	.card-hot {
		background-color: #FFBD00;
	}
	.card-control {
		align-items: flex-end;
		margin-top:38px;
		margin-right:38px;
		height:26px;
	}
	.card-control-div {
		flex-direction: row;
		position: absolute;
		right: 0px;
		top:0px;
		padding-top: 24px;
		padding-right: 24px;
		padding-left:14px;
		padding-bottom: 6px;
	}
	.card-control-temp-div {
		flex-direction: row;
		margin-left: 35px;
		margin-bottom: 25px;
	}
	.cart-control-temp-img {
		width: 84px;
		height: 84px
	}.cart-control-temp-img-right {
		margin-left: 60px
	}
	.card-status-detail {
		flex-direction: row;
		justify-content: center;
	}
	.card-status-detail-simple {
		margin-top: 60px;
		margin-left:60px;
	}
	.card-status-detail-img {
		width:36px;
		height:36px;
	}
	.card-control-img {
		width:58px;
		height:58px
	}
	.card-icon {
		align-items: flex-start;
		margin-top:-60px;
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
		font-family: Roboto-Light;
		font-size: 128px;
		color: #FFFFFF;
	}
	.main-status-simple {
		font-family: PingFangSC-Medium;
		font-size: 36px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		line-height: 18px;
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
		margin-top:-30px;
		color: #FFFFFF;
	}
	.main-status-third {
		font-size: 28px;
		margin-left:10px;
		color: #FFFFFF;
	}
	.main-status-third-simple {
		opacity: 0.6;
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		line-height: 24px;
	}
	.main-status-detail {
		width: 30px;
		height: 30px;
		opacity: 0.6;
		margin-left: 10px;
	}
	.card-left {
		flex-direction: column;
		width:343px;
		height:392px;
		align-items: center;
		justify-content: space-around;
	}
	.card-left-simple {
		justify-content: center;
	}
	.card-right {
		flex-direction: column;
		width:343px;
		height:392px;
		justify-content: space-between;
	}
	.card-right-margin {
		width:32px;
		height:392px;
		background-color: white;
	}
	.mark{
		position: absolute;
        top: 28px;
		left: 28px;
		width:694px;
		height:392px;
     	background-color: #000;
     	opacity: 0.8;
     	align-items: center;
	}
	.wrapper {
		margin-top: 160px;
		width: 694px;
		color: #FFFFFF;
		text-align: center;
	}
	.text_download{
		color: #FFFFFF;
		margin-top: 120px;
		font-size: 28PX;
		text-align: center;
	}
	.indicator {
	    margin-top: 16px;
	    height: 40px;
	    width: 40px;
	    color: #FFFFFF;
	  }
	.text_wifi{
		text-align: center;
		color: #FFFFFF;
		font-size: 28PX;
	}
	.btn_giveup{
		width: 200px;
		height: 80px;
		margin-top: 20px;
		margin-right: 30px;
		margin-bottom: 20px;
		border-radius: 7px;
		border-style:solid;
		border-width: 1px;
		border-color: #CCCCCC;
	}
	.giveup_text{
		color: #FFFFFF;
		line-height: 76px;
		text-align: center;
	}
	.btn_download{
		margin-top: 20px;
		justify-content:space-between;
		flex-direction: row;
	}
</style>
