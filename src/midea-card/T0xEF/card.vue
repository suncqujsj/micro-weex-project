<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box">
	        <div v-if="onlineStatus == '1'">
		    	 <div class="card card-hot">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<text class="main-status" :class="[work_status != 2?'main-status-simple':'']">{{display_value2}}</text>
	        				<text class="danwei"></text>
	        			</div>
	        			<text class="main-status-second">{{danwei}}</text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">{{display_value1}}</text>
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control" @click="poweronoff(0)">
		        		</div>
		        		<div class="card-icon">
		        			<image class="card-icon-img" resize="contain" src="./assets/img/smart_img_equip016@2x.png"></image>
		        		</div>
		        	</div>
		        </div>
	        </div>
	        <div class="card-power-off" v-else>
	        	<div class="control-div-offline">
	        		<image class="card-control-img" :src="powerIcon_offline"  @click="poweronoff(1)"></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_img_equip016@2x.png"></image>
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
            	
                work_status:"",
	            danwei: "",//localStorage.getItem("EFdanwei") || "",
	            display_value1: "",//localStorage.getItem("EFdisplay_value1") || "",
	            display_value2: "",//localStorage.getItem("EFdisplay_value2") || "",
	            
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
            		console.log("error");
            	});
            },
            updateUI(data) {
            	if(data.errorCode == 0) {
	            	let params = data.params || data.result;
	                this.work_status = params.work_status;
					if(this.work_status == "1") {//预约
						this.display_value1 = "已预约";
						this.display_value2 = (params.time_work_hr<10?"0"+params.time_work_hr:params.time_work_hr) + ":" + (params.time_work_min<10?"0"+params.time_work_min:params.time_work_min);
						this.danwei = "后运行";
					} else if(this.work_status == "2"){//工作
						this.display_value1 = "";
						this.display_value2 = "工作中";//(params.time_work_hr<10?"0"+params.time_work_hr:params.time_work_hr) + ":" + (params.time_work_min<10?"0"+params.time_work_min:params.time_work_min);
						this.danwei = "";
					} else if(this.work_status == "3") {//保温
						this.display_value1 = "";
						this.display_value2 = "保温中";//(params.time_work_hr<10?"0"+params.time_work_hr:params.time_work_hr) + ":" + (params.time_work_min<10?"0"+params.time_work_min:params.time_work_min);
						this.danwei = "";
					} else {
						this.display_value1 = "";
						this.display_value2 = "待机中";
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
            poweronoff(flag) {
		    	let self = this;
		        let name = flag == 1? "poweron":"poweroff";
		        let poweronoff = this.work_status == "5"?"on":"off";
	            let params_value = "";
	            if(this.work_status == "5") {
	            	params_value = "1";
	            } else {
	            	params_value = "5";
	            }
            	let params = {
            			"operation":"luaControl",
            			"name":name,
            			"params":{
            				"work_status": params_value
            			}
            		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
            		self.updateUI(data);
            	},function(error) {
            		console.log("error");
            	});
            },
            up () {
				this.deviceSubtype = parseInt(this.deviceSubtype);
	        	if(this.deviceSubtype == 10) {
	        		if(!(this.mode == "normal" || this.mode == "sleep")) {
	        			modal.toast({ 'message': '只有正常风或睡眠风模式下可以设置档位', 'duration': 2 });
		                return;
		        	} 
	        	} else {
	        		if(this.mode != "normal") {
		        		modal.toast({ 'message': '只有正常风模式下可以设置档位', 'duration': 2 });
		                return;
		        	} 
	        	}
	        	
	            let gear = 'up';
	            let set_gear = "";
	            if(this.gear >= 26) {
	            	modal.toast({ 'message': '风速已达最大值', 'duration': 2 });
	                return;
	            } else {
	            	set_gear = parseInt(this.gear) + 1;
	            }
	            let params = {
                	"operation":"luaControl",
        			"name":"up",
        			"params":{
        				"gear":set_gear
        			}
                }
	            let me = this;
	            nativeService.sendLuaRequest(params,true).then(function(data) {
                    me.updateUI(data);
                })
	        },
	        down () {
	        	if(this.deviceSubtype == 10) {
	        		if(!(this.mode == "normal" || this.mode == "sleep")) {
	        			modal.toast({ 'message': '只有正常风或睡眠风模式下可以设置档位', 'duration': 2 });
		                return;
		        	} 
	        	} else {
	        		if(this.mode != "normal") {
	        			modal.toast({ 'message': '只有正常风模式下可以设置档位', 'duration': 2 });
		                return;
		        	} 
	        	}
	            let set_gear = "";
	            if(this.gear == 1) {
	            	modal.toast({ 'message': '风速已达最小值', 'duration': 2 });
	                return;
	            } else {
	            	set_gear = parseInt(this.gear) -1;
	            }
	            let params = {
                	"operation":"luaControl",
        			"name":"down",
        			"params":{
        				"gear":set_gear
        			}
                }
	            let me = this;
	            nativeService.sendLuaRequest(params,true).then(function(data) {
                    me.updateUI(data);
                })
	        },
        },
        computed: {
        	
        },
        mounted() {
	       let self = this;
            nativeService.getDeviceInfo().then(function(data) {
            	self.updateDeviceInfo(data.result);
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
		top:200px;
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
