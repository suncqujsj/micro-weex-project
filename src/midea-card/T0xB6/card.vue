<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box" >
	        <div v-if="onlineStatus == '1'" @click="showControlPanelPage">
		    	 <div class="card card-hot" v-if="onoff == 'on'">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<text class="main-status">{{minutes}}</text>
	        				<text class="danwei">{{danwei}}</text>
	        			</div>
	        			<text class="main-status-second">运行时间</text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">{{display_value}}</text>
		        		</div>
		        		<div class="card-control-temp-div">
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control" >
		        			
		        		</div>
		        		<div class="card-icon" >
		        			<image class="card-icon-img" resize="contain" src="./assets/img/smart_img_equip030@3x.png"></image>
		        		</div>
		        		<div class="card-control-div">
							<div class="left-btn" @click="lightSwitch">
								<image class="card-control-img"   :src="lightImg"></image>
							</div>
							<div class="right-btn"  @click="poweronoff(0)">
		        			<image class="card-control-img" src="./assets/img/smart_ic_off@3x.png"></image>
							</div>
	        			</div>
		        	</div>
		        </div>
		        <div class="card-power-off" v-else>
		        	<div class="control-div-offline" >
						<div class="right-btn">
						<image class="card-control-img" :src="powerIcon_poweroff" @click="poweronoff(1)"></image>
		        		<text class="text-offline">电源</text>
						</div>
		        	</div>
		        	<div>
		        		<image class="icon-offline" src="./assets/img/smart_img_equip030@3x.png" ></image>
		        	</div>
		        </div>
	        </div>
	        <div class="card-power-off" v-else>
	        	<div class="control-div-offline" @click="reload">
	        		<image class="card-control-img" :src="powerIcon_offline"  ></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_img_equip030@3x.png"></image>
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
                minutes: "",
                gear: "",
                light: "",
                danwei: "",
                display_value: "",
                
	            powerIcon_poweroff: "./assets/img/smart_ic_power_blue@3x.png",
                powerIcon_offline: "./assets/img/smart_ic_reline@3x.png",
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
                 	detail:"说明文字说明文字说明文字。"
                },
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
	                this.minutes = params.minutes;
	            	this.gear = params.gear;
	            	this.light = params.light;
	            	this.danwei = "分钟";
	            	if(this.light == "on") {
	            		this.display_value = this.gear +"档 | 灯开"
	            	} else {
	            		this.display_value = this.gear +"档 | 灯关"
	            	}
	            }else {
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
        				"gear":  this.gear || '1'
        			}
        		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
//            		self.updateUI(data);
					self.queryStatus();
            	},function(error) {
            		console.log("error");
            	});
            },
            lightSwitch() {
            	let self = this;
            	let name = this.light == 'on'? "off":"on";
            	let lightSwitch = this.light == 'on'? "off":"on";
            	if(this.light == "on") {
            		
            	}
            	let params = {
            			"operation":"luaControl",
            			"name":name,
            			"params":{
            				"light": lightSwitch,
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
        	lightImg() {
	        	let img = "";
	            if(this.light == "on") {
	                img = "./assets/img/smart_ic_lightoff@3x.png";
	            } else {
	                img = "./assets/img/smart_ic_lighton@3x.png";
	            }
	            return img;
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
		right:0px;
		top:0px;
		align-items: center;
	}
	.card-control {
		align-items: flex-end;
		margin-top:38px;
		margin-right:38px;
		flex-direction: row;
		justify-content: flex-end;
	}
	.card-control-div {
		flex-direction: row;
		position: absolute;
		top: 0px;
		right: 0px;
	}
	.left-btn{
		padding-top: 24px;
		padding-right: 24px;
		padding-left:14px;
		padding-bottom: 6px;
		margin-right: 2px;
	}
	.right-btn{
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
		width:534px;
		height:248px;
		margin-bottom: 50px;
		opacity: 0.3;
	}
	.card-icon {
		align-items: flex-end;
	}
	.card-icon-img {
		width:534px;
		height:248px;
		margin-right: -105px;
		margin-bottom: 45px;
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
