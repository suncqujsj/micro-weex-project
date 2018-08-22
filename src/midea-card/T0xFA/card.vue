<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box">
	        <div v-if="onlineStatus == '1'" @click="showControlPanelPage">
		    	 <div class="card" v-if="onoff == 'on'">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<text class="main-status" :class="[mode =='baby'?'main-status-simple':'']">{{display_value2}}</text>
	        				<text class="danwei">{{danwei}}</text>
	        			</div>
	        			<text class="main-status-second"></text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">{{display_value1}}</text>
		        		</div>
		        		<div class="card-control-temp-div">
		        			<image @click="down" class="cart-control-temp-img" src="./assets/img/smart_ic_reduce_huge@3x.png"></image>
		        			<image @click="up" class="cart-control-temp-img cart-control-temp-img-right" src="./assets/img/smart_ic_increase_huge@3x.png"></image>
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control">
		        			
		        		</div>
		        		<div class="card-icon">
		        			<image class="card-icon-img"  resize="contain" src="./assets/img/smart_img_equip028@3x.png"></image>
		        		</div>
		        		 <div class="card-control-div" @click="poweronoff(0)">
		        			<image class="card-control-img"   src="./assets/img/smart_ic_off@3x.png"></image>
	        			</div>
		        	</div>
		        </div>
		        <div class="card-power-off" v-else>
		        	<div class="control-div-offline">
		        		<image class="card-control-img" :src="powerIcon_poweroff"  @click="poweronoff(1)"></image>
		        		<text class="text-offline">电源</text>
		        	</div>
		        	<div>
		        		<image class="icon-offline" src="./assets/img/smart_img_equip028@3x.png"></image>
		        	</div>
		        </div>
	        </div>
	        <div class="card-power-off" v-else>
	        	<div class="control-div-offline" @click="reload">
	        		<image class="card-control-img" :src="powerIcon_offline"  ></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_img_equip028@3x.png"></image>
	        	</div>
	        	<text class="text-offline-center">已离线</text>
	        </div>
            <situation></situation>
	        <midea-download></midea-download>
	    </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
	import situation from './components/situation.vue'
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
            mideaItem,
			situation,
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
                onoff: "",
                mode: "",
                gear: "",
                deviceLock: "",
                temperature: "",
                danwei: "档",
                display_value1: "",
                display_value2: "",
                return_mode: {
	            	normal:"正常风",
					natural:"自然风",
					sleep:"睡眠风",
					comfort:"舒适风",
					feel:"人感",
					baby:"宝宝风",
					mute:"静音风"
	            },
	            powerIcon_poweroff: "./assets/img/smart_ic_power_blue@3x.png",
                powerIcon_offline: "./assets/img/smart_ic_reline@3x.png"
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
            		if(error.errorCode == '331307' || error.errorCode == '1307') {
            			self.onlineStatus = "0"
            		}
            		console.log("error");
            	});
            },
            updateUI(data) {
            	if(data.errorCode == 0) {
            		this.onlineStatus = "1";
	            	let params = data.params || data.result;
	                this.onoff = params.power;
	                this.mode = params.mode;
	            	this.gear = params.gear;
	            	this.display_value1 = this.return_mode[params.mode];
	            	this.display_value2 = params.gear;
					if(this.mode == "baby") {
						this.display_value1 = "";
						this.display_value2 = this.return_mode[params.mode];
						this.danwei = "";
					} else {
						this.danwei = "档";
					}
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
            				"buzzer": "off"
            			}
            		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
            		self.updateUI(data);
            	},function(error) {
            		console.log("error");
            	});
            },
            up () {
				this.deviceSubtype = parseInt(this.deviceSubtype);
	        	if(this.deviceSubtype == 10) {
	        		if(!(this.mode == "normal" || this.mode == "sleep")) {
	        			modal.toast({ 'message': '只有正常风或睡眠风模式下可以设置档位', 'duration': 2 });
		                return;
		        	} 
	        	} else {
	        		if(this.mode != "normal") {
		        		modal.toast({ 'message': '只有正常风模式下可以设置档位', 'duration': 2 });
		                return;
		        	} 
	        	}
	        	
	            let gear = 'up';
	            let set_gear = "";
	            if(this.gear >= 26) {
	            	modal.toast({ 'message': '风速已达最大值', 'duration': 2 });
	                return;
	            } else {
	            	set_gear = parseInt(this.gear) + 1;
	            }
	            let params = {
                	"operation":"luaControl",
        			"name":"up",
        			"params":{
        				"gear":set_gear
        			}
                }
	            let me = this;
	            nativeService.sendLuaRequest(params,true).then(function(data) {
                    me.updateUI(data);
                })
	        },
	        down () {
	        	if(this.deviceSubtype == 10) {
	        		if(!(this.mode == "normal" || this.mode == "sleep")) {
	        			modal.toast({ 'message': '只有正常风或睡眠风模式下可以设置档位', 'duration': 2 });
		                return;
		        	} 
	        	} else {
	        		if(this.mode != "normal") {
	        			modal.toast({ 'message': '只有正常风模式下可以设置档位', 'duration': 2 });
		                return;
		        	} 
	        	}
	            let set_gear = "";
	            if(this.gear == 1) {
	            	modal.toast({ 'message': '风速已达最小值', 'duration': 2 });
	                return;
	            } else {
	            	set_gear = parseInt(this.gear) -1;
	            }
	            let params = {
                	"operation":"luaControl",
        			"name":"down",
        			"params":{
        				"gear":set_gear
        			}
                }
	            let me = this;
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
		width:750px;
		background-color: #f2f2f2;
	}
	.box {
		margin-bottom:650px
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
	.card-hot {
		background-color: #FFBD00;
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
	.card-control {
		align-items: flex-end;
		margin-top:44px;
		margin-right:44px;
		flex-direction: row;
		justify-content: flex-end;
		height:100px;
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
	}
	.cart-control-temp-img-right {
		margin-left: 60px
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
		width:314px;
		height:314px
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
	.main-status-simple {
		font-size: 84px;
		margin-top:50px;
	}
	.danwei {
		font-family: PingFangSC-Light;
		font-size: 25px;
		text-align: center;
		color: #FFFFFF;
		margin-top: 28px;
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
