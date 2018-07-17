<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box">
	       <div v-if="onlineStatus == '1'">
		    	 <div class="card" v-if="onoff == 'on'">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<text class="main-status" :class="[danwei==''? 'main-status-simple' :'']">{{display_value2}}</text>
	        				<text class="danwei">{{danwei}}</text>
	        			</div>
	        			<text class="main-status-second">{{main_detail}}</text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">{{display_value1}}</text>
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control">
		        			<image class="card-control-img" style="margin-right:35px"  :src="startPause" @click="controlStartPause"></image>
		        			<image class="card-control-img" src="./assets/img/smart_ic_off@2x.png" @click="poweronoff(0)"></image>
		        		</div>
		        		<div class="card-icon">
		        			<image class="card-icon-img" src="./assets/img/smart_pic_equip010@2x.png"></image>
		        		</div>
		        	</div>
		        </div>
		        <div class="card-power-off" v-else>
		        	<div class="control-div-offline">
		        		<image class="card-control-img" :src="powerIcon_poweroff"  @click="poweronoff(1)"></image>
		        		<text class="text-offline">电源</text>
		        	</div>
		        	<div>
		        		<image class="icon-offline" src="./assets/img/smart_pic_equip010@2x.png"></image>
		        	</div>
		        </div>
	        </div>
	         <div class="card-power-off" v-else>
	        	<div class="control-div-offline">
	        		<image class="card-control-img" :src="powerIcon_offline"  @click="poweronoff(1)"></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_pic_equip010@2x.png"></image>
	        	</div>
	        	<text class="text-offline-center">已离线</text>
	        </div>
	        <div class="smart">
		        <div class="smart-title">
		        	<text class="smart-text">智能</text>
		        	<image class="smart-img" src="./assets/img/smart_ic_more@2x.png"></image>
		        </div>
	      	</div>
	      	<midea-smart @change="onMideachange2" :checked="mideaChecked2" :data="data2"></midea-smart>     
	        <midea-smart :showSwitchIcon="true" @change="onMideachange2" :hasBottomBorder="false" :checked="mideaChecked2" :data="data3"></midea-smart>
	    </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
	import mideaSwitch from '@/midea-component/switch.vue'
	import mideaSmart from '@/midea-card/T0xAC/components/smart.vue'
	import mideaItem from '@/midea-component/item.vue'
	import Mock from './settings/mock'
	const modal = weex.requireModule('modal');
	const dom = weex.requireModule('dom');
	var stream = weex.requireModule('stream');
    export default {
        components: {
            mideaSwitch,
            mideaSmart,
            mideaItem
        },
        data() {
            return {
            	deviceId:"",
            	deviceName: "",
            	deviceType: "",
            	deviceSubType: "",
            	deviceSn: "",
            	onlineStatus:"",
            	return_running_status:{
		            order:"预约执行中",
					error:"错误状态",
					standby:"待机状态",
					work:"运行状态",
					end:"结束状态",
					pause:"暂停状态"
	            },
	            return_program : {
					standard:"标准程序",
					fast:"快洗程序",
					blanket:"毛毯程序",
					wool:"羊毛程序",
					embathe:"浸洗程序",
					memory:"记忆程序",
					child:"童装程序",
					strong_wash:"强洗程序",
					down_jacket:"羽绒服程序",
					stir:"搅拌洗程序",
					mute:"静音洗程序",
					bucket_self_clean:"桶自洁程序",
					air_dry:"风干程序",
					cycle:"水循环程序",
					remain_water:"留水程序",
					summer:"夏日洗程序",
					big:"大物程序",
					home:"家纺程序",
					cowboy:"牛仔程序",
					soft:"轻柔程序",
					hand_wash:"手搓洗程序",
					water_flow:"新水流程序",
					fog:"雾态洗程序",
					bucket_dry:"桶干燥程序",
					fast_clean_wash:"快净洗程序",
					dehydration:"单脱水程序",
					under_wear:"内衣程序",
					rinse_dehydration:"漂洗+脱水程序",
					degerm:"除菌程序",
					five_clean:"5分钟桶自洁程序",
					in_15:"IN15程序",
					in_25:"IN25程序",
					love_baby:"爱婴程序",
					outdoor:"户外程序",
					silk:"丝绸程序",
					shirt:"衬衫程序",
					cook_wash:"煮洗程序",
					towel:"毛巾程序",
					memory_2:"记忆2程序",
					memory_3:"记忆3程序",
					half_energy:"半载能效（洗衣房）",
					all_energy:"全载能效（洗衣房）",
					soft_wash:"柔洗程序",
					prevent_allergy:"防过敏程序",
					wash_cube:"水魔方程序",
					winter_jacket:"冲锋衣程序",
					leisure_wash:"随心程序",
					no_iron:"免熨程序"
				},
                mideaChecked: true,
                mideaChecked2: false,
                
                wash_level: "",
				rinse_level: "",
				wash_strength: "",
				dehydration_speed: "",
				rinse_count: "",
				temperature: "",
				dehydration_time: "",
				wash_time: "",
                
                running_status:"",
	            danwei: "",//localStorage.getItem("DAdanwei") || "",
	            display_value1: "",//localStorage.getItem("DAdisplay_value1") || "",
	            display_value2: "",//localStorage.getItem("DAdisplay_value2") || "",
	            main_detail: "",
                onoff: "",
                deviceLock:"",
                powerIcon_offline: "./assets/img/smart_ic_reline@2x.png",
                powerIcon_poweroff: "./assets/img/smart_ic_power_blue@2x.png",
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
                 	detail:""
                },
                list: [
                { 
                	"name": "电饭煲食谱",
                	"rightText":"更多"
                }]
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
            			"data":{}
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
	                this.onoff = params.power;
	                this.running_status = params.running_status;
					this.remain_time = this.caculateTime(params.remain_time);
					this.program = params.program;
					this.deviceLock = params.lock;
					
					this.wash_level = params.wash_level;
					this.rinse_level = params.rinse_level;
					this.wash_strength = params.wash_strength;
					this.dehydration_speed = params.dehydration_speed;
					this.rinse_count = params.rinse_count;
					this.temperature = params.temperature;
					this.dehydration_time = params.dehydration_time;
					this.wash_time = params.wash_time;
				
					if(this.onoff == "on" && this.running_status == "work") {
						if(params.intelligent_wash && params.intelligent_wash == "on") {
							if(!this.program || this.program == "invalid") {
								this.display_value1 = "智能洗";
								this.display_value2 = "正在为您智能选择洗衣程序";
								this.main_detail = "";
								this.danwei = "";
							} else {
								this.display_value1 = this.return_program[params.program];
								this.display_value2 = params.remain_time;//this.remain_time;
								this.danwei = "分";
								this.main_detail = "剩余时间";
							}
						} else {
							this.display_value1 = this.return_program[params.program];
							this.display_value2 = params.remain_time;//this.remain_time;
							this.danwei = "分";
							this.main_detail = "剩余时间";
						}
					} else if (this.onoff == "on" && this.running_status == "order") {
						this.display_value1 = "";
						this.display_value2 = "预约中";
						this.danwei = "";
						this.main_detail = "";
					} else if(this.onoff == "on" && this.running_status == "standby") {
						if(params.intelligent_wash && params.intelligent_wash == "on") {
							if(!this.program || this.program == "invalid") {
								this.display_value1 = "智能洗";
								this.display_value2 = "将为您智能选择洗衣程序";
								this.danwei = "";
								this.main_detail = "";
							} else {
								this.display_value1 = this.return_program[params.program] || "--";
								this.display_value2 = this.return_running_status[this.running_status];
								this.danwei = "";
								this.main_detail = "";
							}
						} else {
							this.display_value1 = this.return_program[params.program] || "--";
							this.display_value2 = this.return_running_status[this.running_status];
							this.danwei = "";
							this.main_detail = "";
						}
					} else {
						this.display_value1 = this.return_program[params.program] || "--";
						this.display_value2 = this.return_running_status[this.running_status];
						this.danwei = "";
						this.main_detail = "";
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
            			"data":{
            				"power": poweronoff,
            			}
            		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
            		if(flag != 1) {
            			self.queryStatus();
            		} else {
            			self.updateUI(data);	
            		}
            	},function(error) {
            		console.log("error");
            	});
            },
            controlStartPause() {
            	let self = this;
            	if(this.running_status == "work") {
            		//pause logic
            		let params = {
            			"operation":"luaControl",
            			"name":"pause",
            			"data":{
            				"control_status": "pause",
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
            			"data":{
            				"control_status": "start",
            				"wash_level": this.wash_level,
							"rinse_level": this.rinse_level,
							"wash_strength": this.wash_strength,
							"dehydration_speed": this.dehydration_speed,
							"rinse_count": this.rinse_count,
							"temperature": this.temperature,
							"dehydration_time": this.dehydration_time,
							"wash_time": this.wash_time
            			}
            		};
            		nativeService.sendLuaRequest(params,true).then(function(data) {
	            		//self.updateUI(data);
	            		self.queryStatus();
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
	        }
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
		        startPause() {
		        	let img = "./assets/img/smart_ic_play@2x.png";
		            if(this.running_status == "work") {
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
            	if(data.result.isOnline == "1") {
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
		margin-bottom:450px
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
		right:325px;
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
		margin-right:-24px
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
