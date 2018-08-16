<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box">
	        <div v-if="onlineStatus == '1'">
		    	 <div class="card" :class="[device_info.deviceStyle =='warm'?'card-hot':'']">
		        	<div class="card-left" @click="showControlPanelPage">
	        			<div class="main-status-div">
	        				<text class="main-status">设备在线</text>
	        			</div>
		        		<div class="card-status-detail" @click="showControlPanelPage">
		        			<text class="main-status-third">进入详情</text>
		        			<image class="main-status-detail" src="./assets/img/smart_ic_arrow_forward@2x.png"></image>
		        		</div>
		        		<div class="card-control-temp-div">
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control" >
		        		</div>
		        		<div class="card-icon" @click="showControlPanelPage">
		        			<image class="card-icon-img" resize="contain" :src="device_icon"></image>
		        		</div>
		        	</div>
		        </div>
	        </div>
	        <div class="card-power-off" v-else>
	        	<div class="control-div-offline">
	        		<image class="card-control-img" :src="powerIcon_offline"  @click="reload"></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div v-if="deviceType == '0x20'">
	        		<image class="icon-offline" @click="showControlPanelPage" :src="device_icon"></image>
	        	</div>
	        	<div v-else>
	        		<image class="icon-offline" :src="device_icon"></image>
	        	</div>
	        	<text v-if="deviceType == '0x20'" @click="showControlPanelPage" class="text-offline-center">已离线</text>
	        	<text v-else class="text-offline-center">已离线</text>
	        </div>
	        <midea-download></midea-download>
	    </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
	import mideaSwitch from '@/midea-component/switch.vue'
	import mideaItem from '@/midea-component/item.vue'
	import { DEVICE_INFO } from './settings/deviceStatus'
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
            	
            	device_info: "",
            	
            	pushKey: "receiveMessage",
            	pushKeyOnline: "receiveMessageFromApp",
	            powerIcon_poweroff: "./assets/img/smart_ic_power_blue@2x.png",
                powerIcon_offline: "./assets/img/smart_ic_reline@2x.png",
            }
        },
        methods: {
            updateDeviceInfo(data) {
            	this.deviceId = data.deviceId;
            	this.deviceName = data.deviceName;
            	this.deviceType = data.deviceType;
            	this.deviceSubType = data.deviceSubType;
            	this.deviceSn = data.deviceSn;
            	this.onlineStatus = data.isOnline;
            	this.device_info = DEVICE_INFO[this.deviceType];
            },
            handleNotification() {
            	console.log("handleNotification Yoram");
            	let me = this;
//          	globalEvent.addEventListener(this.pushKey, (data) => {
//          		me.queryStatus();
//		        });
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
            		controlPanelName:this.device_info.controlPanel || "controlPanel.html"
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
        	device_icon() {
        		let img = "";
        		if(this.device_info) {
        			img = "./assets/img/"+this.device_info.img;
        		}
        		return img;
        	}
        },
        mounted() {
	       let self = this;
            nativeService.getDeviceInfo().then(function(data) {
            	self.updateDeviceInfo(data.result);
            	self.handleNotification();
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
		margin-top: 60px;	
		margin-left: 35px;
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
		font-family: PingFangSC-Medium;
		font-size: 36px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		/*line-height: 18px;*/
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
		opacity: 0.6;
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		/*line-height: 24px;*/
	}
	.main-status-detail {
		width: 30px;
		height: 30px;
		opacity: 0.6;
		margin-left: 10px;
		margin-top: 2px;
	}
	.card-left {
		flex-direction: column;
		width:343px;
		height:392px;
		align-items: center;
		justify-content: center;
	}
	.card-right {
		flex-direction: column;
		width:343px;
		height:392px;
		justify-content: space-between;
	}
</style>
