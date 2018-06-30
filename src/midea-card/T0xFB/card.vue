<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box">
	        <div v-if="onlineStatus == '1'">
		    	 <div class="card card-hot" v-if="onoff == 'on'">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<text class="main-status">{{gear}}</text>
	        				<text class="danwei">{{danwei}}</text>
	        			</div>
	        			<text class="main-status-second"></text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">{{display_value1}}</text>
		        		</div>
		        		<div class="card-control-temp-div">
		        			<image @click="down" class="cart-control-temp-img" src="./assets/img/smart_ic_reduce_huge@2x.png"></image>
		        			<image @click="up" class="cart-control-temp-img cart-control-temp-img-right" src="./assets/img/smart_ic_increase_huge@2x.png"></image>
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control" @click="poweronoff(0)">
		        			<image class="card-control-img" src="./assets/img/smart_ic_off@2x.png"></image>
		        		</div>
		        		<div class="card-icon">
		        			<image class="card-icon-img" resize="contain" src="./assets/img/smart_img_equip040@2x.png"></image>
		        		</div>
		        	</div>
		        </div>
		        <div class="card-power-off" v-else>
		        	<div class="control-div-offline">
		        		<image class="card-control-img" :src="powerIcon_poweroff"  @click="poweronoff(1)"></image>
		        		<text class="text-offline">电源</text>
		        	</div>
		        	<div>
		        		<image class="icon-offline" src="./assets/img/smart_img_equip040@2x.png"></image>
		        	</div>
		        </div>
	        </div>
	        <div class="card-power-off" v-else>
	        	<div class="control-div-offline">
	        		<image class="card-control-img" :src="powerIcon_offline"  @click="poweronoff(1)"></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_img_equip040@2x.png"></image>
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
            	
                mideaChecked: true,
                mideaChecked2: false,
                onoff: "",
                gear: "",
                deviceLock: "",
                temperature: "",
                danwei: "档",
                display_value1: "",
                return_mode: {
	            	intelligent:"智能",
					efficient:"节能（ECO）",
					sleep:"睡眠",
					antifreezing:"防冻",
					comfort:"舒适",
					constant_temperature:"智能恒温",
					normal:"正常",
					fast_hot:"速热",
					custom:"随心暖",
					invalid:"无效"
	            },
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
	                let params = data.params;
	                this.onoff = params.power;
	                this.mode = params.mode;
	            	this.gear = params.gear;
	            	this.deviceLock = params.lock;
	            	this.temperature = params.temperature;
	            	this.display_value1 = this.return_mode[this.mode] + " 设定温度 " + this.temperature + "℃";
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
            },
            up () {
	        	if(this.deviceSubType == "5") {
	        	 	if(this.deviceLock == "on") {
		        		modal.toast({ 'message': '取暖器已开启童锁，请关闭童锁后再尝试！', 'duration': 2 });
		                return;
		        	}
	        	}
	            let set_gear = "";
	            if(this.deviceSubType == "5") {
	            	if(this.gear >= 10) {
	            		modal.toast({ 'message': '档位已达最大值', 'duration': 2 });
		                return;
	            	} else {
	            		set_gear = parseInt(this.gear) + 1;
	            	}
	            } else {
	            	if(this.gear >= 3) {
	            		modal.toast({ 'message': '档位已达最大值', 'duration': 2 });
		                return;
		            } else {
		            	set_gear = parseInt(this.gear) + 1;
		            }	
	            }
	            
	            let params = {
                	"operation":"luaControl",
        			"name":"up",
        			"data":{
        				"gear":set_gear
        			}
                }
	            let me = this;
	           nativeService.sendLuaRequest(params,true).then(function(data) {
                    me.updateUI(data);
                })
	        },
	        down () {
	        	if(this.deviceSubType == "5") {
	        		if(this.deviceLock == "on") {
	        			modal.toast({ 'message': '取暖器已开启童锁，请关闭童锁后再尝试！', 'duration': 2 });
		                return;
		        	}
	        	}
	             let set_gear = "";
	            if(this.gear == 1) {
	            	modal.toast({ 'message': '档位已达最小值', 'duration': 2 });
	                return;
	            } else {
	            	set_gear = parseInt(this.gear) -1;
	            }
	            let params = {
                	"operation":"luaControl",
        			"name":"down",
        			"data":{
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
