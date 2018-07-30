<template>
	<scroller class="content">
    <div class="box">
        <div>
	    	 <div class="card" v-if="onlineStatus == '1'">
	        	<div class="card-left">
        			<div class="main-status-div">
        				<text class="main-status">{{currentWorkStatus}}</text>
        				<text class="danwei"></text>
	        		</div>
        			<text class="main-status-second" style="text-align: center;"></text>
	        		<div class="card-status-detail">
	        			<text class="main-status-third"></text>
	        		</div>
	        	</div>
	        	<div class="card-right">
	        		<div class="card-control" @click="powerOnoff">
	        			<image class="card-control-img" :src="controlStartPauseImg"></image>
	        		</div>
	        		<div class="card-icon">
	        			<image class="card-icon-img" @click="showControlPanelPage" resize="contain" src="./assets/img/smart_img_equip041@2x.png"></image>
	        		</div>
	        	</div>
	        </div>
	        <div class="card-power-off" v-else>
	        	<div class="control-div-offline">
	        		<image class="card-control-img" :src="powerIcon_offline" @click="reload"></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_img_equip041@2x.png"></image>
	        	</div>
	        	<text class="text-offline-center">已离线</text>
	        </div>
        </div>
      	<situation></situation>
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
        <midea-download></midea-download>
    </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
	import mideaSwitch from '@/midea-component/switch.vue'
	import mideaItem from '@/midea-component/item.vue'
	import situation from '@/midea-card/midea-components/situation.vue'
	import cookbook from '@/midea-card/T0xAC/components/cookbook.vue'
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
            cookbook,
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
	            currentWorkStatus:"",
	            powerIcon_offline: "./assets/img/smart_ic_reline@2x.png",
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
	                	this.currentWorkStatus = "预约中";
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
	            let img = "./assets/img/smart_ic_play@2x.png";
	            if(this.work_status == "cooking" || this.work_status == "keep_warm") {
	                img = "./assets/img/smart_ic_pause@2x.png";
	            } else {
	                img = "./assets/img/smart_ic_play@2x.png";
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
	}
	.box {
		margin-bottom: 150px;
	}
	.card {
		width:686px;
		height:392px;
		margin-left:32px;
		margin-right:32px;
		margin-top:32px;
		background-color:#FFBD00;
		border-radius: 2px;
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
		top:190px;
		align-items: center;
	}
	.control-div-offline {
		position: absolute;
		right:32px;
		top:32px;
		align-items: center;
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
