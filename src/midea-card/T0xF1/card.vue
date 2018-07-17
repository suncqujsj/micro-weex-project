<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box">
	        <div v-if="onlineStatus == '1'">
		    	 <div class="card card-hot">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<text class="main-status" :class="[danwei == ''?'main-status-only':'']">{{display_value1}}</text>
	        				<text class="danwei"></text>
	        			</div>
	        			<text class="main-status-second">{{main_detail}}</text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">{{display_value2}}</text>
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control" @click="poweronoff(0)">
		        		</div>
		        		<div class="card-icon" @click="showControlPanelPage">
		        			<image class="card-icon-img" resize="contain" src="./assets/img/smart_img_equip038@2x.png"></image>
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
	        		<image class="icon-offline" src="./assets/img/smart_img_equip038@2x.png"></image>
	        	</div>
	        	<text class="text-offline-center">已离线</text>
	        </div>
	        <div class="smart">
		        <div class="smart-title">
		        	<text class="smart-text">智能</text>
		        	<image class="smart-img" src="./assets/img/smart_ic_more@2x.png"></image>
		        </div>
	      	</div>
	        <midea-smart :showSwitchIcon="true" @change="onMideachange2" :hasBottomBorder="true" :checked="mideaChecked2" :data="data3"></midea-smart>
	        <midea-download></midea-download>
	    </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
	import mideaSwitch from '@/midea-component/switch.vue'
	import mideaSmart from '@/midea-card/T0xAC/components/smart.vue'
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
            mideaSmart,
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
                mideaChecked: true,
                mideaChecked2: false,
                
                work_status:"",
	            danwei: "",//localStorage.getItem("F1danwei") || "",
	            display_value1: "",//localStorage.getItem("F1display_value1") || "",
	            main_detail: "",
	            display_value2: "",//localStorage.getItem("F1display_value2") || "",
	            
	            powerIcon_poweroff: "./assets/img/smart_ic_power_blue@2x.png",
                powerIcon_offline: "./assets/img/smart_ic_reline@2x.png",
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
            onMideachange(event) {
            		//modal.toast({ 'message': event.value, 'duration': 2 });
            },
             onMideachange2(event) {
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
            		console.log("error");
            	});
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
            updateUI(data) {
            	if(data.errorCode == 0) {
	                let params = data.params || data.result;
	                this.work_status = params.work_status;
					if(this.work_status == "0") {//待机
						this.display_value1 = "空闲";
						this.main_detail = "";
						this.display_value2 = "待机中";
						this.danwei = "";
					} else if(this.work_status == "1"){//预约等待中
						this.display_value1 = this.return_display_time(params.appoint_time);
						this.main_detail = "完成时间";
						this.display_value2 = "已预约";
						this.danwei = "分";
					} else if(this.work_status == "2") {//制作中
						this.display_value1 = this.return_display_time(params.current_time);
						this.main_detail = "已工作时间";
						this.display_value2 = "工作中";
						this.danwei = "分";
					} else if(this.work_status == "3") {//制作完成
						this.display_value1 = "空闲";
						this.main_detail = "";
						this.display_value2 = "已完成";
						this.danwei = "";
					} else if(this.work_status == "4") {//保温中
						this.display_value1 = this.return_display_time(params.current_time);
						this.main_detail = "已工作时间";
						this.display_value2 = "已工作";
						this.danwei = "分";
					}else {//设备异常
						this.display_value1 = "设备异常";
						this.main_detail = "";
						this.display_value2 = "--";
						this.danwei = "";
					}
	            }else {
	                nativeService.toast("连接设备超时");
	            }
            },
            return_display_time(allMin) {
	        	var hour = parseInt(allMin/60);
	            var minute = allMin%60;
	             if(hour<10){
	            	hour="0"+hour;
	            }
	            if(minute<10){
	            	minute="0"+minute;
	            }
	            return hour +":"+ minute;
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
            		me.queryStatus();
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
            	if(data.result.isOnline == 1) {
            		self.queryStatus();
            	}
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
		width:694;
		height:392px;
		margin-left:28px;
		margin-right:28px;
		margin-top:28px;
		background-color: #5D75F6;
		flex-direction: row;
		border-radius: 6px;
	}
	.card-hot {
		background-color: #FFBD00;
	}
	.card-power-off {
		width:694px;
		height:392px;
		margin-left:28px;
		margin-right:28px;
		margin-top:28px;
		background-color: #D8D8DE;
		flex-direction: row;
		border-radius: 6px;
		justify-content: center;
		align-items: flex-end;
	}
	.text-offline {
		font-family: PingFangSC-Regular;
		font-size: 28px;
		color: #5D75F6;
		letter-spacing: 0;
		text-align: center;
	}
	.text-offline-center {
		position: absolute;
		right:300px;
		top:180px;
		align-items: center;
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
		width: 56px;
		height: 56px
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
		width:60px;
		height:60px
	}
	.icon-offline {
		width: 314px;
		height: 314px;
		opacity: 0.3;
		box-shadow: 0 5px 6px 0 rgba(0,0,0,0.12);
	}
	.card-icon {
		align-items: flex-end;
		margin-top:-60px;
		margin-right:-10px
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
	.smart {
		flex-direction: column;
		justify-content: space-between;
		margin-top:50px;
	}
	.smart-title {
		flex-direction: row;
		justify-content: space-between;
		margin-left:32px;
		margin-right:32px;
	}
	.smart-content {
		margin-top:50px;
		margin-left:32px;
		margin-right:32px;
		border-bottom: inset
	}
	.smart-content-last {
		margin-top:50px;
		margin-left:32px;
		margin-right:32px;
	}
	.smart-text {
		font-family: PingFangSC-Regular;
		font-size: 36px;
		color: #000000;
		letter-spacing: 0;
	}
	.smart-img {
		width:48px;
		height: 48px;
	}
	.smart-detail {
		flex-direction: row;
		justify-content: space-between;
		margin-top:30px;
		padding-bottom: 20px;
	}
	.smart-detail-content {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #8A8A8F;
		letter-spacing: 0;
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
