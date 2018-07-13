<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box" >
	        <div>
		    	 <div v-if="onlineStatus == '1'">
		    	 	<div v-if="onoff == 'on'">
				    	 <div class="card" :class="[mode =='heat'?'card-hot':''] " v-if="PD004 != 0">
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
				        			<image @click="temperatureControl(-1)" class="cart-control-temp-img" src="./assets/img/smart_ic_reduce_huge@2x.png"></image>
				        			<image @click="temperatureControl(1)" class="cart-control-temp-img cart-control-temp-img-right" src="./assets/img/smart_ic_increase_huge@2x.png"></image>
				        		</div>
				        	</div>
				        	<div class="card-right">
				        		<div class="card-control" >
				        			<image class="card-control-img" :src="powerIcon" @click="poweronoff(0)"></image>
				        		</div>
				        		<div class="card-icon" @click="showControlPanelPage">
				        			<image class="card-icon-img" :src="deviceIcon"></image>
				        		</div>
				        		<div></div>
				        	</div>
				        	<div class="card-right-margin"></div>
				        </div>
				        <div class="card" :class="[mode =='heat'?'card-hot':''] " v-else @click="showControlPanelPage">
				        	<div class="card-left card-left-simple">
			        			<div class="main-status-div">
			        				<text class="main-status-simple">设备在线</text>
			        			</div>
				        		<div class="card-status-detail card-status-detail-simple">
				        			<text class="main-status-third-simple">进入详情</text>
				        			<image class="main-status-detail" src="./assets/img/smart_ic_arrow_forward@2x.png"></image>
				        		</div>
				        		<div class="card-control-temp-div">
				        		</div>
				        	</div>
				        	<div class="card-right">
				        		<div class="card-control" >
				        		</div>
				        		<div class="card-icon">
				        			<image class="card-icon-img" :src="deviceIcon"></image>
				        		</div>
				        		<div></div>
				        	</div>
				        	<div class="card-right-margin"></div>
				        </div>
			        </div>
			        <div class="card-power-off" v-else>
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
	        </div>
	        <div class="smart">
		        <div class="smart-title">
		        	<text class="smart-text">智能</text>
		        	<image class="smart-img" :src="moreImg"></image>
		        </div>
		        <midea-smart @change="onMideachange" :checked="mideaChecked" :data="data"></midea-smart>
		      </div>
		      <!--downloading by zhouhg-->
		      <midea-download></midea-download>
		      <midea-smart @change="onMideachange2" :checked="mideaChecked2" :data="data2"></midea-smart>     
	        <midea-smart :showSwitchIcon="true" @change="onMideachange2" :hasBottomBorder="false" :checked="mideaChecked2" :data="data3"></midea-smart>
	    </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
	import mideaSwitch from '@/midea-component/switch.vue'
	import mideaSmart from '@/midea-card/T0xAC/components/smart.vue'
	import mideaItem from '@/midea-component/item.vue'
	import mideaButton from '@/midea-component/button.vue';
	//downloading by zhouhg
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
            mideaSmart,
            mideaItem,
            mideaButton,
            mideaDownload   //downloading by zhouhg
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
                mideaChecked: true,
                mideaChecked2: false,
                
                PD004: -1, //0表示PD004，1表示非PD004。PD004（一拖多）
	            promptStr:"",//蜂鸣声,需要从控制页的localStorage里拿
	            onoff: "on",//localStorage.getItem("AConoff") || "on", //当前设备开关机状态
	            mode: "--",//localStorage.getItem("ACmode") || "",
	            temperature: "--",//parseInt(localStorage.getItem("ACtemperature")),
	            indoorTemperature: "",//localStorage.getItem("ACindoorTemperature"),
	            outdoorTemperature: "",//localStorage.getItem("ACoutdoorTemperature"),
	            danwei: "",
            
                powerIcon: "./assets/img/smart_ic_off@3x.png",
                powerIcon_poweroff: "./assets/img/smart_ic_power_blue@2x.png",
                powerIcon_offline: "./assets/img/smart_ic_reline@2x.png",
                deviceIcon: "./assets/img/smart_img_equip001@2x.png",
                moreImg: "./assets/img/smart_ic_more@2x.png",
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
            temperatureControl (value) {// -1 or 1
	            if(this.onoff == 'off') {
	            	nativeService.toast("关机状态无法设置温度");
	                return;
	            }
	            let temperature = this.temperature;
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
        			"data":{
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
            		console.log("error");
            	});
            },
            updateUI(data) {
            	let self = this;
	            if(data.errorCode == 0) {
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
	                this.outdoorTemperature = parseInt(params.outdoor_temperature) || "";
	                if(params.outdoor_temperature == 0) {
	                	this.outdoorTemperature = 0;
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
            	
            	let deviceBarCode = "";
            	if (this.deviceSn.length == '32') {
                    deviceBarCode = this.deviceSn.substring(12, 17);
                } else if (this.deviceSn.length == '22') {
                    deviceBarCode = this.deviceSn.substring(6, 11);
                }
                if(deviceBarCode.toUpperCase() == "PD004") {
                    this.PD004 = 0;
                } else {
                    this.PD004 = 1;
                }
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
            handleNotification() {
            	console.log("handleNotification Yoram");
            	let me = this;
            	globalEvent.addEventListener(this.pushKey, (data) => {
            		me.queryStatus();
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
			powerOnoffImg () {
	            let img = "./assets/img/smart_ic_power@2x.png";
	            return img;
	        },
        	statusImg() {
	        		let img = "./assets/img/smart_ic_smart@2x.png";
	        		if(this.mode == 'cool') {
	        			img = "./assets/img/smart_ic_smart@2x.png";
	        		} else if(this.mode == 'heat') {
	        			img = "./assets/img/smart_ic_warmmode@2x";
	        		} else if(this.mode == 'auto') {
	        			img = "./assets/img/auto@2x.png";
	        		} else if(this.mode == 'dry') {
	        			img = "./assets/img/wet@2x.png";
	        		} else if(this.mode == 'fan') {
	        			img = "./assets/img/wind@2x.png";
	        		} else {
	        			img = "./assets/img/smart_ic_smart@2x.png";
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
            	if(data.result.isOnline || data.result.isOnline == "1") {
            		self.queryStatus();
            	}
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
		flex-direction: row;
		border-radius: 6px;
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
		right:295px;
		top:170px;
		align-items: center;
	}
	.control-div-offline {
		position: absolute;
		right:32px;
		top:32px;
		align-items: center;
	}
	.icon-offline {
		width: 534px;
		height: 248px;
		opacity: 0.3;
		box-shadow: 0 5px 6px 0 rgba(0,0,0,0.12);
	}
	.card-hot {
		background-color: #FFBD00;
	}
	.card-control {
		align-items: flex-end;
		margin-top:44px;
		margin-right:44px
	}
	.card-control-temp-div {
		flex-direction: row;
		margin-left: 35px;
		margin-bottom: 25px;
	}
	.cart-control-temp-img {
		width: 56px;
		height: 56px
	}.cart-control-temp-img-right {
		margin-left: 100px
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
		width:56px;
		height:56px;
	}
	.card-control-img {
		width:60px;
		height:60px
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
		margin-top:8px;
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
