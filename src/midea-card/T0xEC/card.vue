<template>
	<scroller class="content">
    <div class="box" @click="showControlPanelPage">
        <div>
	    	 <div class="card" v-if="onlineStatus == '1'">
	        	<div class="card-left">
        			<div class="main-status-div">
        				<text class="main-status">{{currentWorkStatus}}</text>
        				<text class="danwei"></text>
	        		</div>
        			<text class="main-status-second" style="text-align: center;">{{danwei}}</text>
	        		<div class="card-status-detail">
	        			<text class="main-status-third">{{secondWorkStatus}}</text>
	        		</div>
	        	</div>
	        	<div class="card-right">
	        		<div class="card-control">
	        			<image v-if="false" class="card-control-img" :src="controlStartPauseImg"></image>
	        		</div>
	        		<div class="card-icon">
	        			<image class="card-icon-img"  resize="contain" src="./assets/img/smart_img_equip041@3x.png"></image>
	        		</div>
	        	</div>
	        </div>
	        <div class="card-power-off" v-else>
	        	<div class="control-div-offline">
	        		<image class="card-control-img" :src="powerIcon_offline" @click="reload"></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_img_equip041@3x.png"></image>
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
            	workStatus: "",
	            temperature: "",//localStorage.getItem("ECtemperature") || "--",
	            workstatusNum: "",
	            currentWorkStatus:"--",
	            danwei: "",
	            secondWorkStatus: "--",
	            powerIcon_offline: "./assets/img/smart_ic_reline@3x.png",
	            work_status: {
					0: "待机",
					1: "非预约烹饪中",
					2: "预约等待中",
					3: "保温/完成",
					4: "开盖状态",
					5: "排气中",
					6: "非预约保压中",
					7: "非预约排气中",
					8: "预约烹饪中",
					9: "预约排气中",
					10: "中途开盖",
					11: "排气完成（中途开盖）",
					12: "已开盖（中途开盖）"
				},
				return_cmd_code : {
					20001: "煮饭",
					20002: "煮粥",
					20003: "煲汤",
					20004: "肉/鸡",
					20005: "牛/羊肉",
					20006: "豆/蹄筋",
					20007: "喷香米饭",
					20008: "原味煲汤",
					20009: "浓香炖肉",
					20010: "快速煮饭",
					20011: "稀饭",
					20012: "杂粮粥",
					20013: "蛋糕",
					20014: "收汁入味",
					20015: "蒸汽清洁",
					20016: "再加热",
					20017: "保温",
					20018: "无水焗",
					20019: "排气",
					20020: "浓香煲汤",
					20021: "隔水蒸饭",
					20022: "营养炖汤",
					20023: "滋补药膳",
					20024: "营养蒸",
					20025: "清香煮粥",
					20026: "快速粥",
					20027: "快速饭",
					20028: "杂粮饭",
					20029: "开盖煮",
					20030: "高速骨肉香",
					20031: "蹄筋",
					20032: "豆类",
					20034: "快速肉"
				},
                list: [
                { 
                	"name": "电饭煲食谱",
                	"rightText":"更多"
                }]
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
	                this.workStatus = this.work_status[params.work_status] || "";
	                this.workstatusNum = params.work_status;
	                this.temperature = params.temperature || "--";
	                this.danwei = "";
	                this.secondWorkStatus = this.return_cmd_code[params.cmd_code] || "--";
	                if(this.workstatusNum == "0") {
	                	this.currentWorkStatus = "空闲中";
	                } else if(this.workstatusNum == "1" || this.workstatusNum == "8") {
	                	this.currentWorkStatus = "烹饪中";
	                } else if(this.workstatusNum == "3") {
	                	this.currentWorkStatus = "保温中";
	                } else if(this.workstatusNum == "4" || this.workstatusNum == "10" || this.workstatusNum == "12") {
	                	this.currentWorkStatus = "已开盖";
	                } else if(this.workstatusNum == "5" || this.workstatusNum == "7" || this.workstatusNum == "9"|| this.workstatusNum == "11") {
	                	this.currentWorkStatus = "排气中";
	                } else if(this.workstatusNum == "6") {
	                	this.currentWorkStatus = "保压中";
	                } else if(this.workstatusNum == "2") {
//	                	this.currentWorkStatus = "预约中";
						this.currentWorkStatus = (params.time_reserve_hr<10?"0"+params.time_reserve_hr:params.time_reserve_hr) +":"+ (params.time_reserve_min<10?"0"+params.time_reserve_min:params.time_reserve_min);
	                	this.danwei = "后开始运行";
	                } else {
	                	this.currentWorkStatus = "--";
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
            controlStartPause() {
            	let self = this;
            	if(this.work_status == "cooking" || this.work_status == "keep_warm") {
            		//pause logic
            		let params = {
		                "work_status": "cancel",
		                "name": "pause"
		            }
            		nativeService.sendLuaRequest(params,true).then(function(data) {
	            		self.updateUI(data);
	            	},function(error) {
	            		console.log("error");
	            	});
            	} else {
            		//start logic
            		let params = {
		                "work_status": "cooking",
		                "name": "start"
		            }
            		nativeService.sendLuaRequest(params,true).then(function(data) {
	            		self.updateUI(data);
	            	},function(error) {
	            		console.log("error");
	            	});
            	}
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
        	controlStartPauseImg () {
	            let img = "./assets/img/smart_ic_play@3x.png";
	            if(this.work_status == "cooking" || this.work_status == "keep_warm") {
	                img = "./assets/img/smart_ic_pause@3x.png";
	            } else {
	                img = "./assets/img/smart_ic_play@3x.png";
	            }
	            return img;
	        },
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
		margin-top:44px;
		margin-right:44px;
		flex-direction: row;
		justify-content: flex-end;
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
	.icon-offline {
		width: 314px;
		height: 314px;
		opacity: 0.3;
	}
	.card-icon-img {
		width:314px;
		height:314px
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
		padding-top: 24px;
		padding-right: 24px;
		padding-left:14px;
		padding-bottom: 6px;
		top: 0px;
		right: 0px;
		align-items: center;
	}
	.main-status-div {
		flex-direction: row;
	}
	.main-status {
		font-size: 80px;
		margin-top:60px;
		font-family: SFProText-Light;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
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
		margin-top:-30px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
	}
	.main-status-third {
		font-size: 28px;
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
