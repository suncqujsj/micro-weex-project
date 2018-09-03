<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box" >
	        <div v-if="onlineStatus == '1'" @click="showControlPanelPage">
		    	 <div class="card" v-if="onoff == 'on'" @click="showControlPanelPage">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<text class="main-status" :class="[running_status != 'start'?'main-status-only':'']">{{remain_time}}</text>
	        				<text class="danwei">{{danwei}}</text>
	        			</div>
	        			<text class="main-status-second">{{subInfo}}</text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">{{program}}</text>
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control">
		        		</div>
		        		<div class="card-icon" >
		        			<image class="card-icon-img"  src="./assets/img/smart_pic_equip032@3x.png"></image>
		        		</div>
		        		<div class="card-control-div">
							<div class="left-btn" @click="controlStartPause">
								<image class="card-control-img" :src="startPause" ></image>
							</div>
							<div class="right-btn" @click="poweronoff(0)">
								<image class="card-control-img" src="./assets/img/smart_ic_off@3x.png" ></image>
							</div>
	        			</div>
		        	</div>
		        </div>
		        <div class="card-power-off" v-else @click="showControlPanelPage">
		        	<div class="control-div-offline" >
		        		<image class="card-control-img" :src="powerIcon_poweroff" @click="poweronoff(1)" ></image>
		        		<text class="text-offline">电源</text>
		        	</div>
		        	<div>
		        		<image class="icon-offline" @click="showControlPanelPage" src="./assets/img/smart_pic_equip032@3x.png"></image>
		        	</div>
		        </div>
	        </div>
	        <div class="card-power-off" v-else>
	        	<div class="control-div-offline" @click="reload">
	        		<image class="card-control-img" :src="powerIcon_offline"></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_pic_equip032@3x.png"></image>
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
	import mideaItem from '@/midea-component/item.vue'
	import situation from './components/situation.vue'
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
                mideaChecked: true,
                mideaChecked2: false,
                onoff:"on",
                running_status: "",
                remain_time: "",
                remain_min:"",
                expert_step: "",
                program: "",
                deviceLock: "",
                errorCode: "",
                danwei: "分",
                subInfo: "大约需要",
                powerIcon_poweroff: "./assets/img/smart_ic_power_blue@3x.png",
                powerIcon_offline: "./assets/img/smart_ic_reline@3x.png",
                list: [
                { 
                	"name": "电饭煲食谱",
                	"rightText":"更多"
                }],
                 return_program : {
					cotton: "棉麻",
					eco: "节能",
					fast_wash: "快洗15分钟",
					mixed_wash: "混合洗",
					wool: "羊毛",
					ssp: "简自洁",
					sport_clothes: "运动服",
					single_dehytration: "单脱水",
					rinsing_dehydration: "漂洗+脱水",
					big: "大件",
					baby_clothes: "婴儿服",
					down_jacket: "羽绒服",
					color: "护色",
					intelligent: "智能洗",
					quick_wash: "速洗45分钟",
					shirt: "衬衫",
					fiber: "化纤程序",
					enzyme: "活性酶/除菌洗",
					underwear: "内衣",
					outdoor: "户外服",
					air_wash: "空气洗",
					single_drying: "单烘干",
					steep: "浸泡洗",
					kids: "童装程序",
					water_cotton: "新水流棉麻程序",
					fast_wash_30: "速洗30'程序",
					fast_wash_60: "洗烘60'程序",
					water_mixed_wash: "新水流混合洗程序",
					water_fiber: "新水流化纤程序",
					water_kids: "新水流童装程序",
					water_underwear: "新水流内衣程序",
					specialist: "洗衣专家",
					love: "喜爱程序(记忆程序)",
					water_intelligent: "新水流智能洗",
					water_steep: "新水流浸泡洗",
					water_fast_wash_30: "新水流速洗30’",
					new_water_cotton: "新水流棉麻程序",
					water_eco: "新水流节能",
					wash_drying_60: "洗烘60'程序",
					self_wash_5: "5分钟筒自洁",
					fast_wash_min: "快洗（mini）",
					mixed_wash_min: "混合洗（mini）",
					dehydration_min: "脱水（mini）",
					self_wash_min: "筒自洁（mini）",
					baby_clothes_min: "婴儿服（mini）",
					diy0: "DIY0",
					diy1: "DIY1",
					diy2: "DIY2"
				},
				return_running_status:{
	            	idle:"空闲",
	            	standby:"待机",
	            	start:"启动状态",
	            	pause:"暂停状态",
	            	end:"结束",
	            	fault:"错误",
	            	delay:"预约执行中"
	            },
	            return_expert_step:{
	            	0:"未进入洗衣专家模式",
	            	1:"自动称重中",
	            	2:"水硬度检测中",
	            	3:"织物感知中",
	            	4:"自动投放中"
	            }
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
	            this.lock = false;
	            if(data.errorCode == 0) {
	            	this.onlineStatus = "1";
	                let params = data.params || data.result;
	                let errorCode = parseInt(params.error_code);
	                this.onoff = params.power;
	                this.running_status = params.running_status;
					this.remain_time = params.remain_time;//this.caculateTime(params.remain_time);
					this.expert_step = this.return_expert_step[params.expert_step];
					this.program = this.return_program[params.program];
					this.deviceLock = params.lock;
					this.errorCode = parseInt(params.error_code);
					if(this.running_status == "start") {
						this.remain_time = this.remain_time;
						this.danwei = "分";
						this.subInfo = "大约需要";
					}else if(this.running_status == "delay") {
						this.remain_time = "预约中";
						this.danwei = "";
						this.subInfo = "";
					} else {
						this.remain_time = this.return_running_status[this.running_status];
						this.danwei = "";
						this.subInfo = "";
					}
//					localStorage.setItem('DBonoff',this.onoff);
//					localStorage.setItem('DBremain_time',this.remain_time);
//					localStorage.setItem('DBexpert_step',this.expert_step);
//					localStorage.setItem('DBprogram',this.program);
//					localStorage.setItem('DBstartPause',this.startPause);
	            }else {
	                nativeService.toast('连接设备超时');
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
            		if(self.flag == '1') {
            			self.updateUI(data);
            		} else {
            			self.queryStatus();
            		}
            	},function(error) {
            		console.log("error");
            	});
            },
            controlStartPause() {
            	let self = this;
            	if(self.errorCode != "0") {
            		nativeService.toast('设备故障');
		            return;
            	}
            	if(this.running_status == "start" || this.running_status == "delay") {
            		//pause logic
					if(this.deviceLock == "on") {
		            	nativeService.toast('请关闭童锁')
		                return;
		            }     
		            
            		let params = {
            			"operation":"luaControl",
            			"name":"pause",
            			"params":{
            				"control_status": "pause",
            			}
            		};
            		nativeService.sendLuaRequest(params,true).then(function(data) {
//	            		self.updateUI(data);
						self.queryStatus();
	            	},function(error) {
	            		console.log("error");
	            	});
            	} else {
            		//start logic
            		let params = {
            			"operation":"luaControl",
            			"name":"start",
            			"params":{
            				"control_status": "start",
            			}
            		};
            		nativeService.sendLuaRequest(params,true).then(function(data) {
	            		self.updateUI(data);
	            	},function(error) {
	            		console.log("error");
	            	});
            	}
            },
            caculateTime(timeValue) {
	        	if (timeValue > 59) {
	        		var timeStr = "";
		          	var htime = parseInt(timeValue / 60);
		          	var mtime = timeValue % 60;
		
		         	if (timeValue / 60 < 10) {
		           		 htime = '0' + htime;
		          	}
		          	if (timeValue % 60 < 10) {
		            	mtime = '0' + mtime;
		          	}
		         	 timeStr = htime + ':' + mtime;
		         	 this.danwei = "小时后结束"
		          	return timeStr;
		        } else {
		        	this.danwei = "分钟后结束"
		        	if(timeValue < 10) {
		        		timeValue = "0"+timeValue;
		        	}
		          	return "00:" + timeValue;
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
	        startPause() {
	        	let img = "./assets/img/smart_ic_power@3x.png";
	            if(this.running_status == "start" || this.running_status == "delay") {
	                img = "./assets/img/smart_ic_pause@3x.png";
	            } else {
	                img = "./assets/img/smart_ic_play@3x.png";
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
	.icon-offline {
		width: 314px;
		height: 314px;
		opacity: 0.3;
	}
	.card-control-img {
		width:58px;
		height:58px
	}
	.card-hot {
		background-color: #FFBD00;
	}
	.card-control {
		align-items: center;
		margin-top:38px;
		margin-right:38px;
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
