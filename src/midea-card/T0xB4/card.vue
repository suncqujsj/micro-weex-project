<template>
	<scroller class="content">
    <div class="box">
        <div>
        	<div>
		    	 <div class="card" v-if="onlineStatus == '1'">
		        	<div class="card-left">
	        			<div class="main-status-div">
	        				<text class="main-status" :class="[work_status != 'work'?'main-status-simple':'']">{{display_value1}}</text>
	        				<text class="danwei">{{danwei}}</text>
		        		</div>
	        			<text class="main-status-second" style="text-align: center;">{{display_value2}}</text>
		        		<div class="card-status-detail">
		        			<text class="main-status-third">{{work_mode}}</text>
		        		</div>
		        	</div>
		        	<div class="card-right">
		        		<div class="card-control" @click="lockSwitch" >
		        			<image class="card-control-img" :src="deviceLock"></image>
		        		</div>
		        		<div class="card-icon" @click="showControlPanelPage">
		        			<image class="card-icon-img" resize="contain" src="./assets/img/smart_img_equip042@2x.png"></image>
		        		</div>
		        	</div>
		        </div>
			    <div v-else class="card-power-off" >
			    	<div class="control-div-offline" >
			    		<image class="card-control-img" :src="powerIcon_offline" @click="reload"></image>
			    		<text class="text-offline">重连</text>
			    	</div>
			    	<div>
			    		<image class="icon-offline" src="./assets/img/smart_img_equip042@2x.png"></image>
			    	</div>
			    	<text class="text-offline-center">已离线</text>
			    </div>
	        </div>
        </div>
	    <scroller class="scroller-item" scroll-direction="horizontal">
		    <list class="scroller-list-item">
	        	<!--带向右箭头的链接 -->
		        <midea-item v-for="(item,i) in list" :key="item" :hasTopBorder="false" :hasBottomBorder="false" :title="item.name"   :hasArrow="true" :clickActivied="true" @onItemPress="showDel(item)" @mideaCellClick="cellClick(item)" :cantEdit="true" @onDelete="delItem(item)">
		        	 <text slot="title" class="cell-content">{{item.name}}</text>
		        	 <text slot="rightText" class="right-text">{{item.rightText}}</text>
		        </midea-item>
	        </list>
	    </scroller>
        <div style="flex-direction: row;flex-wrap: wrap;">
        	<cookbook v-for="(item3,index) in cookbook" :data="item3" @cookbookclick="mideaClick"></cookbook>
        </div>
    </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
	import mideaSwitch from '@/midea-component/switch.vue'
	import mideaSmart from '@/midea-card/T0xAC/components/smart.vue'
	import mideaItem from '@/midea-component/item.vue'
	import cookbook from '@/midea-card/T0xAC/components/cookbook.vue'
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
            cookbook
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
                work_status: "",
                work_mode: "",
                work_hour: "",
                work_minute: "",
                lock: "",
                display_value1: "",
                display_value2: "",
                danwei: "分",
                return_work_mode: {
                	none: "不设置",
					double_tube: "上下管发热",
					above_tube: "单上管发热",
					revolve_bake: "旋转烧烤",
					hot_wind_bake: "热风烧烤",
					zymosis: "发酵",
					underside_tube: "单下管发热",
					temperature_differ: "上下异温"
                },
                return_work_status: {
                	standby: "空闲中",
					work: "工作",
					save_power: "省电",
					preheat: "预热",
					lock_on: "上锁",
					preheating: "预热中",
					preheat_finish: "预热结束",
					work_finish: "完成工作",
					recipes_finish: "菜谱段结束"
                },
                powerIcon_offline: "./assets/img/smart_ic_reline@2x.png",
                data:{
                 	title:"连续烹饪次数过多，提醒饮食多样性",
                 	detail:"次数30次以上"
                },
                data2:{
                 	title:"宝宝最适宜温度",
                 	detail:"温度28C，风速最小"
                },
                data3:{
                 	title:"宝宝最适宜温度",
                 	detail:"空调/客厅"
                },
                list: [
                { 
                	"name": "电饭煲食谱",
                	"rightText":"更多"
                }],
                cookbook:[{
	    			title:"蓬松煎饼1",
	    			title_preimg:"./assets/img/smart_ic_a@2x.png",
	    			detail_first:"炖锅炖锅炖1 ",
	    			detail_second:"20分 | 简单 | 240千卡1",
	    			img_url:"./assets/img/test_pic_banner04@2x.png",
	    			targeturl:"a"
	    		},{
	    			title:"蓬松煎饼2",
	    			title_tailimg:"./assets/img/smart_ic_like@2x.png",
	    			detail_first:"炖锅炖锅炖2 ",
	    			detail_second:"20分 | 简单 | 240千卡2",
	    			img_url:"./assets/img/test_pic_banner04@2x.png",
	    			targeturl:"b"
	    		},{
	    			title:"蓬松煎饼3",
	    			detail_first:"炖锅炖锅炖3",
	    			detail_second:"20分 | 简单 | 240千卡3",
	    			img_url:"./assets/img/test_pic_banner04@2x.png",
	    			targeturl:"c"
	    		},{
	    			title:"蓬松煎饼4",
	    			title_preimg:"./assets/img/smart_ic_a@2x.png",
	    			title_tailimg:"./assets/img/smart_ic_like@2x.png",
	    			detail_first:"炖锅炖锅炖4",
	    			detail_second:"20分 | 简单 | 240千卡4",
	    			img_url:"./assets/img/test_pic_banner04@2x.png",
	    			targeturl:"d"
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
            mideaClick(event) {
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
	                this.work_status = params.work_status;
	                this.work_mode = this.return_work_mode[params.work_mode];
	                this.work_hour = params.work_hour;
	                this.work_minute = params.work_minute;
	                this.lock = params.lock;
	                if(this.work_status == "work") {
	                	this.display_value1 = this.work_hour + ":" + this.work_minute;
	                	this.display_value2 = "剩余时间";
	                	this.danwei = "分";
	                } else {
	                	this.display_value1 = this.return_work_status[this.work_status];
	                	this.display_value2 = "";
	                	this.danwei = "";
	                }
	            }else {
	                this.temperature = this.tmpTemperatureValue; //记录临时温度值
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
            lockSwitch() {
            	let self = this;
            	if(self.work_status == "work") {
            		nativeService.toast("工作中不能进行童锁操作");
            		return;
            	}
		        let name = this.lock == "on"? "off":"on";
		        let lockSwitch = this.lock == "on"? "off" : "on";
            	let params = {
            			"operation":"luaControl",
            			"name":name,
            			"data":{
            				"lock": lockSwitch,
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
				powerOnoffImg () {
		            let img = "./assets/img/smart_ic_play@2x.png";
		            if(this.power == "on") {
		                img = "./assets/img/smart_ic_play@2x.png";
		            } else {
		                img = "./assets/img/smart_ic_play@2x.png";
		            }
		            return img;
		        },
	        	statusImg() {
		        		let img = "./assets/img/smart_ic_cold_on@2x.png";
		        		if(this.currentStatus == "auto") {
		        			img = "./assets/img/smart_ic_auto_on@2x.png"
		        		} else if(this.currentStatus == "cold") {
		        			img = "./assets/img/smart_ic_cold_on@2x.png"
		        		}
		        		return img;
	        	},
	        	deviceLock() {
	        		let img = "";
	        		if(this.lock == "on") {
	        			img = "./assets/img/smart_ic_lock_white@2x.png";
	        		} else {
	        			img = "./assets/img/smart_ic_unlock_white@2x.png";
	        		}
	        		return img;
	        	}
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
		width:750px;
	}
	.box {
		margin-bottom: 150px;
	}
	.card {
		width:686;
		height:392px;
		margin-left:32px;
		margin-right:32px;
		margin-top:32px;
		background-color:#FFBD00;
		border-radius: 2px;
		flex-direction: row;
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
		width:60px;
		height:60px
	}
	.card-icon {
		align-items: flex-end;
		margin-top:-60px;
	}
	.card-icon-img {
		width:314px;
		height:314px
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
	.main-status-div {
		flex-direction: row;
		margin-left:50px
	}
	.main-status {
		font-size: 128px;
		margin-top:60px;
		font-family: SFProText-Light;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
	}
	.main-status-simple {
		font-size: 75px;
		margin-top: 74px;
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
		margin-left:10px;
		margin-top:-30px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
	}
	.main-status-third {
		font-size: 28px;
		margin-left:10px;
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
