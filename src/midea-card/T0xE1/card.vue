<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box">
	        <div v-if="onlineStatus == '1'">
		    	 <div class="card" v-if="onoff == 'on'">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<text class="main-status" :class="[work_status != 'work'?'main-status-simple':'']">{{display_value1}}</text>
	        				<text class="danwei">{{danwei}}</text>
	        			</div>
	        			<text class="main-status-second">{{main_detail}}</text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">{{display_value2}}</text>
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control" >
		        			
		        		</div>
		        		<div class="card-icon" >
		        			<image class="card-icon-img" resize="contain" src="./assets/img/smart_img_equip029@2x.png" @click="showControlPanelPage()"></image>
		        		</div>
		        		<div class="card-control-div" v-if="work_status=='work'">
		        			<image v-if="work_status=='work'" class="card-control-img" :src="startPause" @click="controlStartPause"></image>
		        			<image v-if="work_status=='work'" class="card-control-img" src="./assets/img/smart_ic_cancelwork@2x.png" @click="cancelWork"></image>
		        			<image class="card-control-img" src="./assets/img/smart_ic_off@2x.png" @click="poweronoff(0)"></image>
	        			</div>
	        			<div class="card-control-div" v-else>
		        			<image v-if="work_status!='work'" class="card-control-img" style="margin-left:50px" src="./assets/img/smart_ic_play@2x.png" @click="startWork"></image>
		        			<image class="card-control-img" src="./assets/img/smart_ic_off@2x.png" @click="poweronoff(0)"></image>
	        			</div>
		        	</div>
		        </div>
		        <div class="card-power-off" v-else>
		        	<div class="control-div-offline">
		        		<image class="card-control-img" :src="powerIcon_poweroff"  @click="poweronoff(1)"></image>
		        		<text class="text-offline">电源</text>
		        	</div>
		        	<div>
		        		<image class="icon-offline" src="./assets/img/smart_img_equip029@2x.png" @click="showControlPanelPage"></image>
		        	</div>
		        </div>
	        </div>
	        <div class="card-power-off" v-else>
	        	<div class="control-div-offline" @click="reload()">
	        		<image class="card-control-img" :src="powerIcon_offline"></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_img_equip029@2x.png"></image>
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
	const stream = weex.requireModule('stream');
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
                
                work_status:"",
                mode: "",
                wash_stage: "",
                left_time: "",
                operator: "",
                onoff: "",
                danwei: "",
                
                display_value1: "",
                main_detail: "",
	            display_value2: "",
	            return_work_status:{
				    power_on: "开机",
					power_off: "关机",
					cancel: "取消工作",
					work: "开始工作",
					order: "预约",
					error: "错误",
					soft_gear: "软水档位设置中"
	            },
	            return_mode: {
	            	auto_wash: "自动洗/智能洗",   
					strong_wash: "强力洗 ",
					standard_wash: "及时洗/标准洗",
					eco_wash: "节能洗/经济洗",
					glass_wash: "玻璃洗",
					fast_wash: "快速洗",
					self_define: "自定义洗"
	            },
	            return_wash_stage: {
	            	0: "未洗涤",
					1: "预洗",
					2: "主洗",
					3: "漂洗",
					4: "干燥",
					5: "结束"
	            },
	            powerIcon_poweroff: "./assets/img/smart_ic_power_blue@2x.png",
                powerIcon_offline: "./assets/img/smart_ic_reline@2x.png",
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
	                this.mode = params.mode;
	                this.wash_stage = params.wash_stage;
	                this.left_time = params.left_time;
	                this.operator = params.operator;
	                if(this.work_status == "power_off") {
	                	this.onoff = "off";
	                } else {
	                	this.onoff = "on";
	                	if(this.work_status == "work") {
	                		this.display_value1 = this.left_time;
	                		this.main_detail = "工作剩余时间";
	                		this.display_value2 = this.return_mode[this.mode] + " " + this.return_wash_stage[params.wash_stage];
	                		this.danwei = "分"
	                	} else {
	                		this.display_value1 = this.return_work_status[this.work_status];
	                		this.main_detail = "";
	                		this.display_value2 = this.return_mode[this.mode] || "--";
	                		this.danwei = "";
	                	}
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
		    	if(flag != 1 && this.work_status == "work") {
		    		nativeService.toast("工作中不可以直接关机");
		    		return;
		    	}
		        let name = flag == 1? "poweron":"poweroff";
		        let poweronoff = this.work_status == "power_off"?"power_on":"power_off";
            	let params = {
        			"operation":"luaControl",
        			"name":name,
        			"params":{
        				"work_status": poweronoff
        			}
        		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
            		self.updateUI(data);
            	},function(error) {
            		console.log("error");
            	});
            },
            controlStartPause() {
            	let self = this;
            	if(this.operator == "start") {
            		//pause logic
            		let params = {
            			"operation":"luaControl",
            			"name":"pause",
            			"params":{
            				"operator": "pause"
            			}
            		};
            		nativeService.sendLuaRequest(params,true).then(function(data) {
	            		self.updateUI(data);
	            	},function(error) {
	            		console.log("error");
	            	});
            	} else {
            		//start logic
            		let params = {
            			"operation":"luaControl",
            			"name":"start",
            			"params":{
            				"operator": "start",
            			}
            		};
            		nativeService.sendLuaRequest(params,true).then(function(data) {
	            		self.updateUI(data);
	            	},function(error) {
	            		console.log("error");
	            	});
            	}
            },
            cancelWork() {
            	let self = this;
            	let params = {
        			"operation":"luaControl",
        			"name":"cancelWork",
        			"params":{
        				"work_status": "cancel"
        			}
        		};
        		nativeService.sendLuaRequest(params,true).then(function(data) {
            		self.updateUI(data);
            	},function(error) {
            		console.log("error");
            	});
            },
            startWork() {
            	let self = this;
            	let params = {
        			"operation":"luaControl",
        			"name":"startWork",
        			"params":{
        				"work_status": "work",
        				"mode": this.return_mode[this.mode] ? this.mode : "auto_wash"
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
            }
        },
        computed: {
        	startPause() {
	        	let img = "";
	            if(this.operator == "start") {
	                img = "./assets/img/smart_ic_pause@2x.png";
	            } else {
	                img = "./assets/img/smart_ic_play@2x.png";
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
		right:32px;
		top:32px;
		align-items: center;
	}
	.card-control {
		align-items: flex-end;
		margin-top:44px;
		flex-direction: row;
		justify-content: space-around;
		height:100px;
	}
	.card-control-div {
		flex-direction: row;
		position: absolute;
		justify-content: space-around;
		top: 38px;
		/*right: 36px;*/
		height:100px;
		width: 343px;
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
		margin-bottom: 60px;
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
		font-size: 75px;
		margin-top: 74px;
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
