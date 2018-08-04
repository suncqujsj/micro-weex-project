<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box">
	        <div v-if="onlineStatus == '1'">
		    	 <div class="card card-hot">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<text class="main-status" :class="[work_status !='1' && work_status != '3'?'main-status-simple':''] ">{{display_value1}}</text>
	        				<text class="danwei">{{danwei}}</text>
	        			</div>
	        			<text class="main-status-second">{{main_second}}</text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">{{display_value2}}</text>
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control" >
		        		</div>
		        		<div class="card-icon">
		        			<image class="card-icon-img" @click="showControlPanelPage" resize="contain" src="./assets/img/smart_img_equip039@2x.png"></image>
		        		</div>
		        	</div>
		        </div>
	        </div>
	        <div class="card-power-off" v-else>
	        	<div class="control-div-offline">
	        		<image class="card-control-img" :src="powerIcon_offline"  @click="reload"></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_img_equip039@2x.png"></image>
	        	</div>
	        	<text class="text-offline-center">已离线</text>
	        </div>
			<cookbook-list></cookbook-list>
	        <midea-download></midea-download>
	    </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
	import mideaSwitch from '@/midea-component/switch.vue'
	import mideaItem from '@/midea-component/item.vue'
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
                danwei: "",//localStorage.getItem("E9danwei") || "",
	            display_value1: "",//localStorage.getItem("E9display_value1") || "",
	            main_second: "",
	            volume: "",
	            display_value2: "",//localStorage.getItem("E9display_value2") || "",
	            work_status:"",
	            time_work_min:"",
				time_work_hr:"",
				work_stage:"",
				time_reserve_min:"",
				time_reserve_hr:"",
				return_work_stage:{
					0:"准备",
					1:"搅拌",
					2:"搅拌",
					3:"搅拌",
					4:"松面",
					5:"松面",
					6:"松面",
					7:"揉面",
					8:"揉面",
					9:"醒面",
					10:"排酸",
					11:"发酵",
					12:"烘烤",
					13:"结束"
				},
				return_work_status:{
					0:"待机",
					1:"开始",
					2:"暂停",
					3:"预约等待中",
					4:"保温"
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
	                let volumeString = "";
	               	this.work_status = params.work_status;
		            this.time_work_min = params.time_work_min;
					this.time_work_hr = params.time_work_hr;
					this.work_stage = params.work_stage;
					this.time_reserve_min = params.time_reserve_min; 
					this.time_reserve_hr = params.time_reserve_hr;
					this.volume = params.volume;
					if(this.volume == 0) {
						volumeString = "";
					} else if(this.valume == 1) {
						volumeString = "|500g";
					} else if(this.valume == 2) {
						volumeString = "|750g";
					} else if(this.valume == 3) {
						volumeString = "|1000g";
					}
					
					if(this.work_status == "1") { //开始
						this.display_value1 = (this.time_work_hr<10?"0"+this.time_work_hr:this.time_work_hr) + ":" + (this.time_work_min<10?"0"+this.time_work_min:this.time_work_min);
						this.display_value2 = this.return_work_stage[this.work_stage]+volumeString;
						this.main_second = "剩余时间";
						this.danwei = "";
					} else if(this.work_status == "3") { //预约等待中
						this.display_value1 = (this.time_reserve_hr<10?"0"+this.time_reserve_hr:this.time_reserve_hr) + ":" + (this.time_reserve_min<10?"0"+this.time_reserve_min:this.time_reserve_min);
						this.main_second = "完成时间";
						this.display_value2 = "已预约";
						this.danwei = ""
					} else {
						this.display_value1 = "空闲中";
						this.main_second = "";
						this.display_value2 = this.return_work_status[this.work_status] || "--";
						this.danwei = "";
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
		width:750px
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
		font-size: 84px;
		margin-top: 30px;
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
