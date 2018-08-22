<template>
	<scroller class="content" show-scrollbar="false">
		<div class="box" >
			<div v-if="onlineStatus == '1'" @click="showControlPanelPage">
				<div class="card card-hot">
					<div class="card-left">
						<div class="main-status-div">
							<text class="main-status main-status-exception" :class="[work_status != 'order'?'main-status-simple':'']">{{display_value}}</text>
							<text class="danwei"></text>
						</div>
						<text class="main-status-second">{{display_value2}}</text>
						<div class="card-status-detail">
							<text class="main-status-third">{{mode}}</text>
						</div>
					</div>
					<div class="card-right">
						<div class="card-control" @click="lockSwitch">
						</div>
						<div class="card-icon" >
							<image class="card-icon-img"  resize="contain" src="./assets/img/smart_img_equip022@3x.png"></image>
						</div>
						<div class="card-control-div" @click="lockSwitch">
		        			<image class="card-control-img"  :src="deviceLock"></image>
	        			</div>
					</div>
				</div>
			</div>
			<div class="card-power-off" v-else>
				<div class="control-div-offline">
					<image class="card-control-img" :src="powerIcon_offline" @click="reload"></image>
					<text class="text-offline">重连</text>
				</div>
				<div>
					<image class="icon-offline" src="./assets/img/smart_img_equip022@3x.png"></image>
				</div>
				<text class="text-offline-center">已离线</text>
			</div>
      <situation></situation>
			<cookbook-list></cookbook-list>
			<midea-download></midea-download>
		</div>
	</scroller>
</template>

<script>
import nativeService from '@/common/services/nativeService.js'
import mideaSwitch from '@/midea-component/switch.vue'
import mideaItem from '@/midea-component/item.vue'
import situation from '@/midea-card/midea-components/situation.vue'
import cookbookList from '@/midea-card/midea-components/cookbookList.vue'
import mideaDownload from '@/midea-card/midea-components/download.vue';
import Mock from './settings/mock'
import { DEVICE_STATUS } from './settings/deviceStatus'
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
		cookbookList,
		mideaDownload
	},
	data() {
		return {
			deviceId: "",
			deviceName: "",
			deviceType: "",
			deviceSubType: "",
			deviceSn: "",
			onlineStatus: "",

			pushKey: "receiveMessage",
			pushKeyOnline: "receiveMessageFromApp",
			onoff: "",
			work_status: "",
			mode: "",
			minutes: "",
			second: "",
			lock: "",
			display_value: "",
			display_value2: "",
			powerIcon_offline: "./assets/img/smart_ic_reline@3x.png",
			list: [
				{
					"name": "电饭煲食谱",
					"rightText": "更多"
				}]
		}
	},
	methods: {
		queryStatus() {
			let self = this;
			let params = {
				"operation": "luaQuery",
				"name": "deviceinfo",
				"params": {}
			};
			nativeService.sendLuaRequest(params, true).then(function (data) {
				self.updateUI(data);
			}, function (error) {
				if(error.errorCode == '331307' || error.errorCode == '1307') {
        			self.onlineStatus = "0"
        		}
				console.log("error");
			});
		},
		updateUI(data) {
			if (data.errorCode == 0) {
				this.onlineStatus = "1";
				let params = data.params || data.result;
				this.onoff = params.power;
				this.mode = DEVICE_STATUS.mode[params.mode];
				this.work_status = params.work_status;
				this.minutes = params.minutes;
				this.second = params.second;
				this.lock = params.lock;
				if (params.work_status == "order") {
					this.display_value = this.minutes + "分" + this.second + "秒";
					this.display_value2 = "后开始运行";
				} else {
					this.display_value = DEVICE_STATUS.work_status[params.work_status] || "--";
					this.mode = this.mode || "--";
					this.display_value2 = "";
				}

			} else {
				modal.toast({ 'message': "连接设备超时", 'duration': 2 });
			}
		},
		updateUILock(data) {
			if (data.errorCode == 0) {
				let params = data.params || data.result;
				this.lock = params.lock;
			} else {
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
		lockSwitch() {
			let self = this;
			if (self.work_status == "work") {
				nativeService.toast("工作中不能进行童锁操作");
				return;
			}
			let name = this.lock == "on" ? "off" : "on";
			let lockSwitch = this.lock == "on" ? "off" : "on";
			let params = {
				"operation": "luaControl",
				"name": name,
				"params": {
					"lock": lockSwitch,
				}
			};
			nativeService.sendLuaRequest(params, true).then(function (data) {
				//self.updateUI(data);
				self.updateUILock(data);
			}, function (error) {
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
				if (data && data.messageType == "deviceOnlineStatus") {
					if (data.messageBody && data.messageBody.onlineStatus == "online") {
						me.onlineStatus = "1";
					} else if (data.messageBody && data.messageBody.onlineStatus == "offline") {
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
				controlPanelName: "controlPanel.html"
			};
			bridgeModule.showControlPanelPage(params);
			nativeService.burialPoint({
                pageName: 'applianceDetailPage',
                subAction: 'page_view'
            });
		},
		reload() {
			let params = {};
			bridgeModule.reload(params, function (result) {
				//successful
			}, function (error) {
				//fail
			});
		},
	},
	computed: {
		deviceLock() {
			let img = "";
			if (this.lock == "on") {
				img = "./assets/img/smart_ic_lock_white@3x.png";
			} else {
				img = "./assets/img/smart_ic_unlock_white@3x.png";
			}
			return img;
		}
	},
	mounted() {
		let self = this;
		nativeService.getDeviceInfo().then(function (data) {
			self.updateDeviceInfo(data.result);
			self.handleNotification();
			self.queryStatus();
		}, function (error) {
			modal.toast({ 'message': "连接设备超时", 'duration': 2 });
		})
	}
}
</script>


<style>
.content {
  flex: 1;
  width: 750px;
	background-color: #f2f2f2;
}
.box {
  margin-bottom: 650px;
}
.card {
  width: 686px;
  height: 392px;
  margin-left: 32px;
  margin-right: 32px;
  background-color: #5d75f6;
  flex-direction: row;
  border-radius: 6px;
}
.card-hot {
  background-color: #ffbd00;
}
.card-power-off {
  width: 686px;
  height: 392px;
  margin-left: 32px;
  margin-right: 32px;
  background-color: #d8d8de;
  flex-direction: row;
  border-radius: 6px;
  justify-content: center;
  align-items: flex-end;
}
.text-offline {
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #5d75f6;
  letter-spacing: 0;
  text-align: center;
}
.text-offline-center {
  position: absolute;
  top: 176px;
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
	padding-top: 24px;
	padding-right: 24px;
	padding-left:14px;
	padding-bottom: 6px;
	top: 0px;
	right: 0px;
  align-items: center;
}
.card-control {
  align-items: flex-end;
  margin-top: 44px;
  margin-right: 44px;
  flex-direction: row;
  justify-content: flex-end;
  height:100px;
}
.card-control-div {
	flex-direction: row;
	position: absolute;
	padding-top: 24px;
	padding-right: 24px;
	padding-left:14px;
	padding-bottom: 6px;
	top: 0px;
	right: 0px;
}
.card-status-detail {
  flex-direction: row;
  justify-content: center;
  margin-bottom: 60px;
}
.card-status-detail-img {
  width: 56px;
  height: 56px;
}
.card-control-img {
  width: 58px;
  height: 58px;
}
.icon-offline {
  width: 314px;
  height: 314px;
  opacity: 0.3;
}
.card-icon {
  align-items: flex-end;
  margin-top: -60px;
}
.card-icon-img {
  width: 314px;
  height: 314px;
}
.main-status-div {
  flex-direction: row;
  margin-top: 32px;
  margin-left: 30px;
}
.main-status-simple {
  font-size: 75px;
  margin-top: 74px;
}
.main-status {
  font-size: 128px;
  color: #ffffff;
}
.main-status-exception {
  font-size: 70px;
}
.danwei {
  font-family: PingFangSC-Light;
  font-size: 25px;
  text-align: center;
  color: #ffffff;
  margin-top: 28px;
}
.main-status-second {
  font-size: 26px;
  margin-left: 10px;
  margin-top: -50px;
  color: #ffffff;
}
.main-status-third {
  font-size: 28px;
  margin-left: 10px;
  margin-top: 8px;
  color: #ffffff;
}
.card-left {
  flex-direction: column;
  width: 343px;
  height: 392px;
  align-items: center;
  justify-content: space-around;
}
.card-right {
  flex-direction: column;
  width: 343px;
  height: 392px;
  justify-content: space-between;
}
.scroller-bar {
  margin-top: -72px;
}
.scroller {
  height: 120px;
}
.scroller-div {
  width: 1372px;
  flex-direction: row;
  justify-content: space-between;
}
.scroller-left {
  width: 350px;
}
.scroller-main {
  width: 233px;
  flex-direction: column;
}
.scroller-main-div {
  margin-left: 102px;
  flex-direction: column;
}
.scroller-main-content {
  font-size: 24px;
}
.scroller-main-separate {
  font-size: 16px;
  margin-left: 14px;
}
.scroller-main-img-first {
  width: 233px;
  height: 30px;
}
.scroller-main-img-second {
  width: 32px;
  height: 32px;
  margin-left: 100px;
  margin-top: -20px;
}
.scroller-right {
  width: 350px;
}
</style>
