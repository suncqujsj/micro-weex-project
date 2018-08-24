<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box" >
	          <div v-if="onlineStatus == '1'" @click="showControlPanelPage">
		    	 <div class="card">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<text class="main-status main-status-only">{{display_value1}}</text>
	        				<text class="danwei"></text>
	        			</div>
	        			<text class="main-status-second"></text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">{{display_value2}}</text>
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control">
		        			
		        		</div>
		        		<div class="card-icon" >
		        			<image class="card-icon-img" src="./assets/img/smart_img_equip011@3x.png"></image>
		        		</div>
		        		<div class="card-control-div">
							<div class="left-btn" @click="clickCharge">
								<image class="card-control-img" :src="charge"  ></image>
							</div>
							<div class="right-btn" @click="clickStartPause">
								<image class="card-control-img" :src="startPause" ></image>
							</div>
	        			</div>
		        	</div>
		        </div>
	        </div>
	         <div class="card-power-off" v-else>
	        	<div class="control-div-offline" @click="reload">
					<div class="right-btn">
	        		<image class="card-control-img" :src="powerIcon_offline"></image>
	        		<text class="text-offline">重连</text>
					</div>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_img_equip011@3x.png"></image>
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
                
                work_status: "",
                work_mode: "",
                return_work_status: {
                	charge: "充电",
					work: "工作",
					stop: "停止",
					charging: "充电中",
					charge_finish: "充电结束",
					work_finish: "工作结束",
					set: "设置"
                },
                return_work_mode: {
                	none: "不操作",
					random: "随机模式",
					arc: "弓形模式",
					edge: "沿边模式",
					emphases: "重点模式",
					screw: "螺旋模式",
					auto: "自动模式",
					bed: "床底清扫",
					wide_screw: "宽阔地方螺旋",
					area: "区域清扫",
					deep: "深度清扫"
                },
                display_value1: "",
                display_value2: "",
                
                powerIcon_offline: "./assets/img/smart_ic_reline@3x.png",
                powerIcon_poweroff: "./assets/img/smart_ic_power_blue@3x.png",
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
	                this.work_status = params.work_status;
               		this.work_mode = params.work_mode;
               		if(this.work_status == "work") {
               			this.display_value1 = "工作中";
               			this.display_value2 = this.return_work_mode[this.work_mode] || "--";
               		} else {
               			this.display_value1 = this.return_work_status[this.work_status] || "--";
               			this.display_value2 = this.return_work_mode[this.work_mode] || "--";
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
            clickCharge() {
		        let self = this;
		        if(this.work_status == "charge") {
		        	nativeService.toast("正在充电中");
		        	return;
		        }
            	let params = {
            			"operation":"luaControl",
            			"name":"charge",
            			"params":{
            				"work_status": "charge",
            			}
            		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
            		self.updateUI(data);
            	},function(error) {
            		console.log("error");
            	});
            },
            clickStartPause() {
		        let self = this;
		        let name = this.work_status == "work"? "pause":"work";
		        let startPause = this.work_status == "work"? "stop" : "work";
            	let params = {
        			"operation":"luaControl",
        			"name":name,
        			"params":{
        				"work_status": startPause,
        				"move_direction": "none",
        				"work_mode": this.work_mode == "none"? "arc":this.work_mode
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
				startPause () {
		            let img = "";
		            if(this.work_status == "work") {
		                img = "./assets/img/smart_ic_pause@3x.png";
		            } else {
		                img = "./assets/img/smart_ic_play@3x.png";
		            }
		            return img;
		        },
		        charge() {
		        	let img = "./assets/img/smart_ic_charge@3x.png";
//		            if(this.work_status == "work") {
//		                img = "./assets/img/smart_ic_charge@2x.png";
//		            } else {
//		                img = "./assets/img/smart_ic_charge@2x.png";
//		            }
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
		margin-bottom:450px
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
		margin-top:44px;
		margin-right:44px;
		flex-direction: row;
		justify-content: flex-end;
		height:100px;
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
	.right-btn {
		padding-top: 24px;
		padding-right: 24px;
		padding-left: 14px;
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
	.main-status-only {
		font-size: 75px;
		margin-top: 74px;
	}
	.danwei {
		font-family: PingFangSC-Light;
		font-size: 50px;
		text-align: center;
		color: #FFFFFF;
		margin-top: 30px;
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
