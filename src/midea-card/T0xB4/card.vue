<template>
	<scroller class="content">
    <div class="box" >
        <div>
		    	 <div class="card" v-if="onlineStatus == '1'" @click="showControlPanelPage">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<text class="main-status" :class="[work_status != 'work'?'main-status-simple':'']">{{display_value1}}</text>
	        				<text class="danwei">{{danwei}}</text>
		        		</div>
	        			<text class="main-status-second" style="text-align: center;">{{display_value2}}</text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">{{work_mode}}</text>
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control" @click="lockSwitch" >
		        			
		        		</div>
		        		<div class="card-icon">
		        			<image class="card-icon-img"   resize="contain" src="./assets/img/smart_img_equip042@3x.png"></image>
		        		</div>
		        		<!--<div class="card-control-div" v-if="false">-->
		        			<!--<image class="card-control-img"  :src="deviceLock"  @click="lockSwitch"></image>-->
	        			<!--</div>-->
		        	</div>
		        </div>
			    <div v-else class="card-power-off" >
			    	<div class="control-div-offline" >
			    		<image class="card-control-img" :src="powerIcon_offline" @click="reload"></image>
			    		<text class="text-offline">重连</text>
			    	</div>
			    	<div>
			    		<image class="icon-offline" src="./assets/img/smart_img_equip042@3x.png"></image>
			    	</div>
			    	<text class="text-offline-center">已离线</text>
			    </div>
        </div>
      	<situation></situation>
		<cookbook-list></cookbook-list>
        <midea-download></midea-download>
    </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
	import mideaSwitch from '@/midea-component/switch.vue'
	import mideaItem from '@/midea-component/item.vue'
	import situation from '@/midea-card/midea-components/situation.vue'
	import cookbookList from '@/midea-card/midea-components/cookbookList.vue'
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
			situation,
			cookbookList,
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
                work_hour: "",
                work_minute: "",
                lock: "",
                display_value1: "",
                display_value2: "",
                danwei: "分",
                return_work_mode: {
                	none: "未设置",
					double_tube: "上下管发热",
					above_tube: "单上管发热",
					revolve_bake: "旋转烧烤",
					hot_wind_bake: "热风烧烤",
					zymosis: "发酵",
					underside_tube: "单下管发热",
					temperature_differ: "上下异温"
                },
                return_work_status: {
                	standby: "空闲中",
					work: "工作",
					save_power: "省电",
					preheat: "预热",
					lock_on: "上锁",
					preheating: "预热中",
					preheat_finish: "预热结束",
					work_finish: "完成工作",
					recipes_finish: "菜谱段结束",
					invalid: "--"
                },
                powerIcon_offline: "./assets/img/smart_ic_reline@3x.png",
                list: [
                { 
                	"name": "电饭煲食谱",
                	"rightText":"更多"
                }]
            }
        },
        methods: {
            mideaClick(event) {
            	//modal.toast({ 'message': event.value, 'duration': 2 });
            },
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
	                this.work_mode = this.return_work_mode[params.work_mode] || "--";
	                this.work_hour = params.work_hour;
	                this.work_minute = params.work_minute;
	                this.lock = params.lock;
	                if(this.work_status == "work") {
	                	this.display_value1 = this.work_hour + ":" + this.work_minute;
	                	this.display_value2 = "剩余时间";
	                	this.danwei = "分";
	                } else {
	                	this.display_value1 = this.return_work_status[this.work_status] || "--";
	                	this.display_value2 = "";
	                	this.danwei = "";
	                }
	            }else {
	                this.temperature = this.tmpTemperatureValue; //记录临时温度值
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
            lockSwitch() {
            	let self = this;
            	if(self.work_status == "work") {
            		nativeService.toast("工作中不能进行童锁操作");
            		return;
            	}
		        let name = this.lock == "on"? "off":"on";
		        let lockSwitch = this.lock == "on"? "off" : "on";
            	let params = {
            			"operation":"luaControl",
            			"name":name,
            			"params":{
            				"lock": lockSwitch,
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
		            let img = "./assets/img/smart_ic_play@2x.png";
		            if(this.power == "on") {
		                img = "./assets/img/smart_ic_play@2x.png";
		            } else {
		                img = "./assets/img/smart_ic_play@2x.png";
		            }
		            return img;
		        },
	        	statusImg() {
		        		let img = "./assets/img/smart_ic_cold_on@3x.png";
		        		if(this.currentStatus == "auto") {
		        			img = "./assets/img/smart_ic_auto_on@3x.png"
		        		} else if(this.currentStatus == "cold") {
		        			img = "./assets/img/smart_ic_cold_on@3x.png"
		        		}
		        		return img;
	        	},
	        	deviceLock() {
	        		let img = "";
	        		if(this.lock == "on") {
	        			img = "./assets/img/smart_ic_lock_white@3x.png";
	        		} else {
	        			img = "./assets/img/smart_ic_unlock_white@3x.png";
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
            	modal.toast({ 'message': "连接设备超时", 'duration': 2 });
            })
        }
    }
</script>


<style>
	.content {
		width:750px;
		background-color: #f2f2f2;
	}
	.box {
		margin-bottom: 150px;
	}
	.card {
		width:686px;
		height:392px;
		margin-left:32px;
		margin-right:32px;
		background-color:#FFBD00;
		border-radius: 6px;
		flex-direction: row;
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
		padding-top: 24px;
		padding-right: 24px;
		padding-left:14px;
		padding-bottom: 6px;
		top: 0px;
		right: 0px;
		align-items: center;
	}
	.icon-offline {
		width: 314px;
		height: 314px;
		opacity: 0.3;
	}
	.scroller-item {
		height:120px;
		flex:1
	}
	.scroller-list-item {
		margin-top:32px;
		height:80px;
		width:750px
	}
	.card-control {
		align-items: flex-end;
		margin-top:38px;
		margin-right:38px;
		flex-direction: row;
		justify-content: flex-end;
		height:100px;
	}
	.card-control-div {
		flex-direction: row;
		position: absolute;
		padding-top: 24px;
		padding-right: 24px;
		padding-left:14px;
		padding-bottom: 6px;
		top: 0px;
		right: 0px;
	}
	.card-status-detail {
		flex-direction: row;
		justify-content: center;
		margin-bottom:60px;
		margin-top:8px;
	}
	.card-status-detail-img {
		width:56px;
		height:56px
	}
	.card-control-img {
		width:58px;
		height:58px
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
		margin-left:50px
	}
	.main-status {
		font-size: 128px;
		margin-top:60px;
		font-family: SFProText-Light;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
	}
	.main-status-simple {
		font-size: 75px;
		margin-top: 74px;
	}
	.danwei {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #FFFFFF;
		letter-spacing: 0;
		margin-top: 80px;
	}
	.main-status-second {
		font-size: 28px;
		margin-left:10px;
		margin-top:-30px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
	}
	.main-status-third {
		font-size: 28px;
		margin-left:10px;
		margin-top:8px;
		font-family: PingFangSC-Regular;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
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
	.cell-content {
		font-family: PingFangSC-Medium;
		font-size: 36px;
		color: #000000;
	}
	.right-text {
		font-family: PingFangSC-Regular;
		font-size: 28px;
		color: #000000;
		text-align: right;
		margin-right:25px;
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
