<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box" >
	        <div>
		    	 <div v-if="onlineStatus == 'online'">
			    	 <div class="card" :class="[mode =='heat'?'card-hot':''] " v-if="onoff == 'on'">
			        	<div class="card-left">
		        			<div class="main-status-div">
		        				<text class="main-status">{{temperature}}</text>
		        				<text class="danwei">°</text>
		        			</div>
		        			<text class="main-status-second">设定温度</text>
			        		<div class="card-status-detail">
			        			<image class="card-status-detail-img" :src="statusImg"></image>
			        			<text class="main-status-third">{{currentMode}}</text>
			        		</div>
			        		<div class="card-control-temp-div">
			        			<image @click="temperatureControl(-1)" class="cart-control-temp-img" src="./assets/img/smart_ic_reduce_huge@2x.png"></image>
			        			<image @click="temperatureControl(1)" class="cart-control-temp-img cart-control-temp-img-right" src="./assets/img/smart_ic_increase_huge@2x.png"></image>
			        		</div>
			        	</div>
			        	<div class="card-right">
			        		<div class="card-control" >
			        			<image class="card-control-img" :src="powerIcon" @click="poweronoff(0)"></image>
			        		</div>
			        		<div class="card-icon">
			        			<image class="card-icon-img" :src="deviceIcon"></image>
			        		</div>
			        		<div></div>
			        	</div>
			        	<div class="card-right-margin"></div>
			        </div>
			        <div class="card-power-off" v-else>
			        	<div class="control-div-offline">
			        		<image class="card-control-img" :src="powerIcon_poweroff"  @click="poweronoff(1)"></image>
			        		<text class="text-offline">电源</text>
			        	</div>
			        	<div>
			        		<image class="icon-offline" :src="deviceIcon"></image>
			        	</div>
			        </div>
			    </div>
			    <div class="card-power-off" v-else>
			        	<div class="control-div-offline">
			        		<image class="card-control-img" :src="powerIcon_offline"></image>
			        		<text class="text-offline">重连</text>
			        	</div>
			        	<div>
			        		<image class="icon-offline" :src="deviceIcon"></image>
			        	</div>
			        </div>
		        <div class="scroller-bar" v-if="1==2">
		        	<scroller-bar :max="30" :min="17"></scroller-bar>
		        </div>
	        </div>
	        <div class="smart">
		        <div class="smart-title">
		        	<text class="smart-text">智能</text>
		        	<image class="smart-img" :src="moreImg"></image>
		        </div>
		        <midea-smart @change="onMideachange" :checked="mideaChecked" :data="data"></midea-smart>
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
	import scrollerBar from '@/midea-card/T0xAC/components/scroller-bar.vue'
	import mideaItem from '@/midea-component/item.vue'
	
	import Mock from './settings/mock'
	const modal = weex.requireModule('modal');
	const dom = weex.requireModule('dom');
	var stream = weex.requireModule('stream');
    export default {
        components: {
            mideaSwitch,
            mideaSmart,
            mideaItem,
            scrollerBar
        },
        data() {
            return {
                mideaChecked: true,
                mideaChecked2: false,
                //currentTemperture:19,
                power:"off",
                currentStatus:"auto",
                onlineStatus:"online",
                
                PD004: -1, //0表示PD004，1表示非PD004。PD004（一拖多）
	            queryLoading: false,
	            controlLoading: 0, //0、无loading  1、“开关”loading  2、“温度+”loading  3、“温度-”loading
	            first: true,
	            deviceName: "",
	            deviceTip: "",
	            promptStr:"",
	            onoff: "",//localStorage.getItem("AConoff") || "on", //当前设备开关机状态
	            mode: "",//localStorage.getItem("ACmode") || "",
	            temperature: "",//parseInt(localStorage.getItem("ACtemperature")),
	            indoorTemperature: "",//localStorage.getItem("ACindoorTemperature"),
	            outdoorTemperature: "",//localStorage.getItem("ACoutdoorTemperature"),
            
                powerIcon: "./assets/img/smart_ic_off@3x.png",
                powerIcon_poweroff: "./assets/img/smart_ic_power_blue@2x.png",
                powerIcon_offline: "./assets/img/smart_ic_reline@2x.png",
                deviceIcon: "./assets/img/smart_img_equip001@2x.png",
                moreImg: "./assets/img/smart_ic_more@2x.png",
                data:{
                 	title:"室内温度高于28°度时候，自动开启空调。",
                 	detail:"模式制冷，温度23."
                },
                data2:{
                 	title:"宝宝最适宜温度",
                 	detail:"温度28C，风速最小"
                },
                data3:{
                 	title:"宝宝最适宜温度",
                 	detail:""
                }
            }
        },
        methods: {
            onMideachange(event) {
            		//modal.toast({ 'message': event.value, 'duration': 2 });
            },
             onMideachange2(event) {
            		//modal.toast({ 'message': event.value, 'duration': 2 });
            },
            changeTemperture(event) {
	            	let currentSetTemperture = Math.ceil(event.contentOffset.x/52) +29;
	            	if(currentSetTemperture <= 17) {
	            		currentSetTemperture = 17;
	            	} else if (currentSetTemperture >= 30) {
	            		currentSetTemperture = 30;
	            	}
	            	this.currentTemperture = currentSetTemperture;
            },
            temperatureControl (value) {// -1 or 1
	            if(this.onoff == 'off') {
	                modal.toast({ 'message': "关机状态无法设置温度", 'duration': 2 });
	                return;
	            }
	            let temperature = this.temperature;
	            if(temperature <= 17 && value == -1) {
	                modal.toast({ 'message': "最低设置温度17度", 'duration': 2 });
	                return
	            }
	            if(temperature >= 30 && value == 1) {
	                modal.toast({ 'message': "最高设置温度30度", 'duration': 2 });
	                return
	            }
	            if(this.mode == 'fan') {
	                  modal.toast({ 'message': "送风模式无法设置温度", 'duration': 2 });
	                return
	            }
	            let promptStr = "0";//localStorage.getItem("ACTone"+this.deviceSN);
	            let me = this;
	            this.temperature += value;
                let params = {
                	"operation":"luaQuery",
        			"name":"temperatureControl",
        			"data":{
        				temperature: me.temperature,
                    	buzzer: promptStr == "0"?"off":"on"
        			}
                }
                nativeService.sendLuaRequest(params,true).then(function(data) {
                    me.updateUI(data);
                })
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
            	let self = this;
	            this.queryLock = false;
	            this.queryLoading = false;
	            this.controlLoading = 0;
	            if(data.errorCode == 0) {
	                let params = data.params;
	                let errorCode = parseInt(params.error_code);
	                this.onoff = params.power;
	                this.mode = params.mode;
	                // this.temperature = parseInt(params.temperature) + parseFloat(params.small_temperature);
	                this.temperature = parseInt(params.temperature); //不显示小数位
	                this.tmpTemperatureValue = this.temperature; //记录临时温度值
	
	                this.indoorTemperature = parseInt(params.indoor_temperature) || "--";
	                if(params.indoor_temperature == 0) {
	                	this.indoorTemperature = 0;
	                }
	                this.outdoorTemperature = parseInt(params.outdoor_temperature) || "";
	                if(params.outdoor_temperature == 0) {
	                	this.outdoorTemperature = 0;
	                }
	                //this.deviceTip = tipsService[errorCode] || "";
//	                localStorage.setItem('AConoff',this.onoff);
//	                localStorage.setItem('ACmode',this.mode);
//	                localStorage.setItem('ACtemperature',this.currentTemperture);
//	                localStorage.setItem('ACindoorTemperature',this.indoorTemperature);
//	                localStorage.setItem('ACoutdoorTemperature',this.outdoorTemperature);

	            }else {
	                this.temperature = this.tmpTemperatureValue; //记录临时温度值
	                modal.toast({ 'message': "连接设备超时", 'duration': 2 });
	            }
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
            				"buzzer": "off"
            			}
            		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
            		self.updateUI(data);
            	},function(error) {
            		console.log("error");
            	});
            }
        },
        computed: {
				powerOnoffImg () {
		            let img = "./assets/img/smart_ic_power@2x.png";
		            return img;
		        },
	        	statusImg() {
		        		let img = "./assets/img/smart_ic_smart@2x.png";
		        		if(this.mode == 'cool') {
		        			img = "./assets/img/smart_ic_smart@2x.png";
		        		} else if(this.mode == 'heat') {
		        			img = "./assets/img/smart_ic_warmmode@2x";
		        		} else if(this.mode == 'auto') {
		        			img = "./assets/img/smart_ic_smart@2x.png";
		        		} else if(this.mode == 'dry') {
		        			img = "./assets/img/smart_ic_smart@2x.png";
		        		} else if(this.mode == 'fan') {
		        			img = "./assets/img/smart_ic_smart@2x.png";
		        		} else {
		        			img = "./assets/img/smart_ic_smart@2x.png";
		        		}
		        		return img;
	        	},
	        	currentMode() {
	        		let status = "";
	        		if(this.mode == 'cool') {
	        			status = "制冷";
	        		} else if(this.mode == 'heat') {
	        			status = "制热";
	        		} else if(this.mode == 'auto') {
	        			status = "自动";
	        		} else if(this.mode == 'dry') {
	        			status = "抽湿"
	        		} else if(this.mode == 'fan') {
	        			status = "送风";
	        		} else {
	        			status = "";
	        		}
	        		return status;
	        	}
        },
        mounted() {
            this.queryStatus();
        }
    }
</script>

<style>
	.content {
		flex:1;
		width:750px;
		scroll-direction: vertical;
	}
	.box {
		margin-bottom:290px;
	}
	.card {
		width:694px;
		height:392px;
		margin-left:28px;
		margin-right:28px;
		margin-top:28px;
		background-color: #5D75F6;
		flex-direction: row;
		border-radius: 6px;
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
		align-items: center;
	}
	.text-offline {
		font-family: PingFangSC-Regular;
		font-size: 28px;
		color: #5D75F6;
		letter-spacing: 0;
		text-align: center;
	}
	.control-div-offline {
		position: absolute;
		right:32px;
		top:32px;
		align-items: center;
	}
	.icon-offline {
		width: 534px;
		height: 248px;
	}
	.card-hot {
		background-color: #FFBD00;
	}
	.card-control {
		align-items: flex-end;
		margin-top:44px;
		margin-right:44px
	}
	.card-control-temp-div {
		flex-direction: row;
		margin-left: 35px;
		margin-bottom: 25px;
	}
	.cart-control-temp-img {
		width: 56px;
		height: 56px
	}.cart-control-temp-img-right {
		margin-left: 100px
	}
	.card-status-detail {
		flex-direction: row;
		justify-content: center;
	}
	.card-status-detail-img {
		width:56px;
		height:56px;
	}
	.card-control-img {
		width:48px;
		height:50px
	}
	.card-icon {
		align-items: flex-start;
		margin-top:-60px;
		margin-right:-24px
	}
	.card-icon-img {
		width:534px;
		height:248px
	}
	.main-status-div {
		flex-direction: row;
		margin-top:32px;
		margin-left:50px
	}
	.main-status {
		font-size: 128px;
		color: #FFFFFF;
	}
	.danwei {
		font-family: PingFangSC-Light;
		font-size: 96px;
		text-align: center;
		color: #FFFFFF;
		margin-top: 7px;
	}
	.main-status-second {
		font-size: 26px;
		margin-left:10px;
		margin-top:-30px;
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
	.card-right-margin {
		width:30px;
		height:392px;
		background-color: white;
		margin-left: 9px;
	}
	.smart {
		flex-direction: column;
		justify-content: space-between;
		margin-top:20px;
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
		font-family: PingFangSC-Light;
		color: #FFFFFF;
		letter-spacing: -4px;
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
		color: #FFFFFF;
	}
	.temp-danwei {
		font-family: PingFangSC-Medium;
		font-size: 12px;
		color: #FFFFFF;
	}
	.scroller-main-separate {
		font-size:16px;
		margin-left:14px;
		color: #FFFFFF;
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
