<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box">
	       <div v-if="onlineStatus == '1'">
		    	 <div class="card" v-if="onoff == 'on'">
		        	<div class="card-left" v-if="heat == 'on' || cool == 'on'">
	        			<div class="main-status-div">
	        				<text class="main-status">{{display_value1}}</text>
	        				<text class="danwei">{{danwei}}</text>
	        			</div>
	        			<text class="main-status-second">{{display_value1_description}}</text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">{{display_value2}}</text>
		        		</div>
		        	</div>
		        	<div class="card-left card-left-simple" v-else>
	        			<div class="main-status-div main-status-div-simple">
	        				<text class="main-status-simple">设备在线</text>
	        			</div>
		        		<div class="card-status-detail card-status-detail-simple">
		        			<text class="main-status-third-simple">进入详情</text>
		        			<image class="main-status-detail" src="./assets/img/smart_ic_arrow_forward@2x.png"></image>
		        		</div>
		        		<div class="card-control-temp-div">
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control">
		        		</div>
		        		<div class="card-icon" @click="showControlPanelPage">
		        			<image class="card-icon-img" src="./assets/img/smart_img_equip031@2x.png"></image>
		        		</div>
		        	</div>
		        </div>
		        <div class="card-power-off" v-else>
		        	<div class="control-div-offline">
		        		<image class="card-control-img" :src="powerIcon_poweroff"  @click="poweronoff(1)"></image>
		        		<text class="text-offline">电源</text>
		        	</div>
		        	<div>
		        		<image class="icon-offline" src="./assets/img/smart_img_equip031@2x.png"></image>
		        	</div>
		        </div>
	        </div>
	         <div class="card-power-off" v-else>
	        	<div class="control-div-offline" @click="reload">
	        		<image class="card-control-img" :src="powerIcon_offline"></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_img_equip031@2x.png"></image>
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
	            danwei: "°",//localStorage.getItem("DAdanwei") || "",
	            display_value1: "",//localStorage.getItem("DAdisplay_value1") || "",
	            display_value1_description: "",
	            display_value2: "",//localStorage.getItem("DAdisplay_value2") || "",
                onoff: "",
                heat: "",
                heat_status: "",
                cool: "",
                cool_status: "",
                heat_temperature: "",
                cool_temperature: "",
                powerIcon_offline: "./assets/img/smart_ic_reline@2x.png",
                powerIcon_poweroff: "./assets/img/smart_ic_power_blue@2x.png",
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
            		console.log("error");
            	});
            },
            updateUI(data) {
            	if(data.errorCode == 0) {
            		this.onlineStatus = "1";
	                let params = data.params || data.result;
	                this.onoff = params.power;
	                this.heat = params.heat;
	                this.heat_status = params.heat_status;
	                this.cool = params.cool;
	                this.cool_status = params.cool_status;
	                this.heat_temperature = params.heat_temperature;
	                this.cool_temperature = params.cool_temperature;
	                if(this.heat == "on") {
	                	this.display_value1 = this.heat_temperature;
	                	this.display_value1_description = "热水温度";
	                	if(this.heat_status == "on") {
	                		this.display_value2 = "加热中";	
	                	} else {
	                		this.display_value2 = "加热保温中";	
	                	}
	                }else if(this.cool == "on") {
	                	this.display_value1 = this.cool_temperature;
	                	this.display_value1_description = "冷水温度";
	                	if(this.cool_status == "on") {
	                		this.display_value2 = "制冷中";	
	                	} else {
	                		this.display_value2 = "制冷保温中";	
	                	}
	                } else {
	                	this.display_value1 = "--";
	                	this.display_value1_description = "--";
	                	this.display_value2 = "--";	
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
		            let img = "./assets/img/smart_ic_power@2x.png";
		            if(this.power == "on") {
		                img = "./assets/img/smart_ic_power@2x.png";
		            } else {
		                img = "./assets/img/smart_ic_power@2x.png";
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
            	nativeService.toast("连接设备超时");
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
		margin-bottom:450px
	}
	.card {
		width:686px;
		height:392px;
		margin-left:32px;
		margin-right:32px;
		margin-top:32px;
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
		margin-top:32px;
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
		right:300px;
		top:170px;
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
	.card-status-detail {
		flex-direction: row;
		justify-content: center;
		margin-bottom:60px;
	}
	.card-status-detail-simple {
		margin-top: 60px;
		margin-left:60px;
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
	.main-status-div-simple {
		margin-top:57px;
		height: 60px;
	}
	.main-status {
		font-size: 128px;
		color: #FFFFFF;
	}
	.main-status-simple {
		font-family: PingFangSC-Medium;
		font-size: 36px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		/*line-height: 18px;*/
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
	.main-status-third-simple {
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
	}
	.card-left {
		flex-direction: column;
		width:343px;
		height:392px;
		align-items: center;
		justify-content: space-around;
	}
	.card-left-simple {
		justify-content: center;
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
