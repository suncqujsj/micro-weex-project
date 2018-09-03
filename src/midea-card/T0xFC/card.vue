<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box" >
	        <div  v-if="onlineStatus == '1'" @click="showControlPanelPage">
		    	 <div class="card" v-if="onoff == 'on'" @click="showControlPanelPage">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<text class="main-status">{{pm25}}</text>
	        				<text class="danwei"></text>
	        			</div>
	        			<text class="main-status-second">PM2.5</text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">{{mode}}</text>
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control" >
		        			
		        		</div>
		        		<div class="card-icon" >
		        			<image class="card-icon-img"  src="./assets/img/smart_img_equip033@3x.png"></image>
		        		</div>
		        		<div></div>
		        		 <div class="card-control-div" @click="poweronoff(0)">
		        			<image class="card-control-img"  src="./assets/img/smart_ic_off@3x.png"></image>
	        			</div>
		        	</div>
		        </div>
		        <div class="card-power-off" v-else @click="showControlPanelPage">
		        	<div class="control-div-offline">
		        		<image class="card-control-img" :src="powerIcon_poweroff"  @click="poweronoff(1)"></image>
		        		<text class="text-offline">电源</text>
		        	</div>
		        	<div >
		        		<image  class="icon-offline" src="./assets/img/smart_img_equip033@3x.png"></image>
		        	</div>
		        </div>
	        </div>
	        <div class="card-power-off" v-else>
	        	<div class="control-div-offline" @click="reload">
	        		<image class="card-control-img" :src="powerIcon_offline"></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_img_equip033@3x.png"></image>
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
            	onoff: "",
            	PM25: "",
            	mode: "",
            	return_mode:{
		            manual:"手动模式",
					sleep:"睡眠模式",
					fast:"急速模式",
					auto:"自动模式",
	            },
            	
            	pushKey: "receiveMessage",
            	pushKeyOnline: "receiveMessageFromApp",
                powerIcon_offline: "./assets/img/smart_ic_reline@3x.png",
                powerIcon_poweroff: "./assets/img/smart_ic_power_blue@3x.png"
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
	                if(parseInt(params.pm25) > 999) {
	                    this.pm25 = "--";
	                }else {
	                    this.pm25 = params.pm25;
	                }
	               
	                this.mode = this.return_mode[params.mode];
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
		margin-bottom:490px;
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
		top: 0px;
		right: 0px;
		padding-top: 24px;
		padding-right: 24px;
		padding-left:14px;
		padding-bottom: 6px;
		align-items: center;
	}
	.icon-offline {
		width: 314px;
		height: 314px;
		opacity: 0.3;
	}
	.card-control {
		align-items: flex-end;
		margin-top:38px;
		margin-right:38px;
		height:60px;
	}
	.card-control-div {
		flex-direction: row;
		position: absolute;
		top: 0px;
		right: 0px;
		padding-top: 24px;
		padding-right: 24px;
		padding-left:14px;
		padding-bottom: 6px;
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
		width:58px;
		height:58px
	}
	.card-icon {
		margin-top:-20px;
	}
	.card-icon-img {
		width: 314px;
		height: 314px
	}
	.main-status-div {
		flex-direction: row;
		margin-top:32px;
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
		margin-top:-50px;
		color: #FFFFFF;
	}
	.main-status-third {
		font-size: 28px;
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
</style>
