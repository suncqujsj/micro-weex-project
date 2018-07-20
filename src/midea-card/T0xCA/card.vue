<template>
	<scroller class="content" show-scrollbar="false">
	    <div class="box">
	        <div v-if="onlineStatus == '1'">
		    	 <div class="card">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<div class="main-status-left-div">
	        					<div><text class="main-status-subtext">冷藏</text></div>
	        					<div style="flex-direction: row;">
	        						<text class="main-status-text">{{storage_temperature}}</text>
	        						<text class="main-status-danwei">°</text>
	        					</div>
	        				</div>
	        				<div class="main-status-separate"></div>
	        				<div class="main-status-right-div">
	        					<div><text class="main-status-subtext">冷冻</text></div>
	        					<div style="flex-direction: row;">
	        						<text class="main-status-text">{{freezing_temperature}}</text>
	        						<text class="main-status-danwei">°</text>
	        					</div>
	        				</div>
	        			</div>
	        			<div style="margin-bottom: 114px;"><text class="main-status-mode">模式速冻</text></div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control">
		        			<image class="card-control-img" style="margin-right:35px" :src="startPause" @click="controlStartPause"></image>
		        			<image class="card-control-img" src="./assets/img/smart_ic_off@2x.png" @click="poweronoff(0)"></image>
		        		</div>
		        		<div class="card-icon" style="margin-right:40px">
		        			<image class="card-icon-img" src="./assets/img/smart_img_equip012@2x.png"></image>
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
	        		<image class="icon-offline" src="./assets/img/smart_img_equip012@2x.png"></image>
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
	        <midea-smart :showSwitchIcon="true" @change="onMideachange2" :hasBottomBorder="true" :checked="mideaChecked2" :data="data3"></midea-smart>
	        <midea-download></midea-download>
	    </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
	import mideaSwitch from '@/midea-component/switch.vue'
	import mideaSmart from '@/midea-card/midea-components/smart.vue'
	import mideaItem from '@/midea-component/item.vue'
	import mideaDownload from '@/midea-card/midea-components/download.vue';
	import Mock from './settings/mock'
	const modal = weex.requireModule('modal');
	const dom = weex.requireModule('dom');
	var stream = weex.requireModule('stream');
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
            	
                mideaChecked: true,
                mideaChecked2: false,
                storage_temperature:"",
                freezing_temperature:"",
                powerIcon_poweroff: "./assets/img/smart_ic_power_blue@2x.png",
                powerIcon_offline: "./assets/img/smart_ic_reline@2x.png",
                data:{
                 	title:"室内温度高于28°度时候，自动开启空调。",
                 	detail:"模式制冷，温度23."
                },
                data2:{
                 	title:"每周三提醒清洗冰箱内侧。。",
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
                }],
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
            updateUI(data) {
	            this.lock = false;
	            if(data.errorCode == 0) {
	                let params = data.params || data.result;
	                this.storage_temperature = params.storage_temperature;
                	this.freezing_temperature = params.freezing_temperature
	            }else {
	                this.showToast('连接设备超时');
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
        },
        computed: {
		        startPause() {
		        	let img = "./assets/img/smart_ic_power@2x.png";
		            if(this.running_status == "start") {
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
	.icon-offline {
		width: 314px;
		height: 314px;
		opacity: 0.3;
		box-shadow: 0 5px 6px 0 rgba(0,0,0,0.12);
	}
	.card-control-img {
		width:60px;
		height:60px
	}
	.card-hot {
		background-color: #FFBD00;
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
		width:48px;
		height:50px
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
		margin-top: 86px
	}
	.main-status-left-div {
		flex-direction: column;
		align-items: center;
	}
	.main-status-right-div {
		flex-direction: column;
		align-items: center;
	}
	.main-status {
		font-size: 128px;
		color: #FFFFFF;
	}
	.main-status-subtext {
		opacity: 0.7;
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #FFFFFF;
	}
	.main-status-text {
		font-family: Roboto-Light;
		font-size: 80px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
	}
	.main-status-mode {
		opacity: 0.7;
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #FFFFFF;
		margin-left: -30px;
	}
	.main-status-separate {
		opacity: 0.3;
		border: 0 solid #FFFFFF;
		background-color: #FFFFFF;
		width:2px;
		height:120px;
		margin-left:10px;
		margin-right:10px
	}
	.main-status-danwei {
		font-family: PingFangSC-Regular;
		font-size: 36px;
		color: #FFFFFF;
	}
	.main-status-only {
		font-size: 50%;;
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
		margin-left:40px;
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
