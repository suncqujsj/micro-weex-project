<template>
	<scroller class="content" show-scrollbar="false">
		<div class="box">
			<div class="card">
				<image class="main-page" src="./assets/img/smart_ic_set01@3x.png"></image>
			</div>
			<div class="title">
				<text style="font-size: 36px;color: #ffffff;font-family: PingFangSC-Medium;">禅意</text>
			</div>
			<midea-cell v-for="myData in prepareData"
						:title="myData.deviceName"
						height="160"
						:clickActivied="true"
						:hasBottomBorder="true"
						:importTextStyle="cellTitleStyle"
						:rightTextStyle="cellRightStyle"
						:rightText="myData.temperature&& myData.temperature!=='' ? myData.status+myData.temperature : myData.status"
						iconSrc="./img/arrow_right.png"
						:hasArrow="true"
						:itemImg="myData.icon"
						@mideaCellClick="itemClicked">
			</midea-cell>
			<midea-download></midea-download>
		</div>
	</scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
    import mideaSwitch from '@/midea-component/switch.vue'
    import mideaSmart from '@/midea-card/midea-components/smart.vue'
    import mideaItem from '@/midea-component/item.vue'
    import mideaDownload from '@/midea-card/midea-components/download.vue'
    import mideaCell from '@/component/cell.vue'
    //    import Mock from './settings/mock'

    const modal = weex.requireModule('modal');
    const dom = weex.requireModule('dom');
    var stream = weex.requireModule('stream');
    const bridgeModule = weex.requireModule('bridgeModule');
    export default {
        components: {
            mideaCell,
            mideaSwitch,
            mideaSmart,
            mideaItem,
            mideaDownload
        },
        data() {
            return {
                cellTitleStyle: {
                    fontFamily: 'PingFangSC-Medium',
                    fontSize: '32px',
                    color: '#000000'
                },
                cellRightStyle: {
                    fontFamily: 'PingFangSC-Regular',
                    fontSize: '28px',
                    color: '#666666'
                },
                pushKey: "receiveMessage",
                pushKeyOnline: "receiveMessageFromApp",
                queryLoading: false,
                controlLoading: 0,
                first: true,
                deviceName: "",
                deviceTip: "",
                danwei: "℃",
                mode: "",
                loading: false,
                loading2: false,
//                deviceIDTX1: "17592187019849",
                messageBack: "",
                prepareData:[],
            }
        },
        methods: {
            queryTXLists() { //
                let me = this;
                    nativeService.getTxList().then((myList) =>{
                        let TXList = myList.data;
//                        nativeService.alert(myList);
                        for (let i = 0; i < TXList.length; i++) {
                            let currentList = TXList[i];
                            let currentDeviceId = currentList.applianceCode;
                            let deviceType = currentList.applianceType;
                            let deviceSubType = currentList.modelNumber;
                            let deviceName = currentList.name || currentList.typeName;
                            let deviceOnlineStatus = currentList.onlineStatus
                            let tempData = {};
                            if (deviceOnlineStatus == "unmatch") {
                                tempData.status = "去购买";
                            } else if (deviceOnlineStatus == "offline") {
                                tempData.status = "未连接";
                            } else {
                                tempData.status = "";
                            }
                            if (deviceType == "0xE2") {
                                tempData.icon = "./assets/img/smart_E2@3x.png";
                                tempData.temperature = "";
                            } else if (deviceType == "0xE3") {
                                tempData.icon ="./assets/img/smart_E3@3x.png";
                                tempData.temperature = "";
                            } else if (deviceType == "0xED" && deviceSubType == "259") {
                                tempData.icon = "./assets/img/smart_img_equip050@3x.png";
                                tempData.temperature = "";
                            } else if (deviceType == "0xED" && deviceSubType == "263") {
                                tempData.icon = "./assets/img/smart_img_equip049@3x.png";
                                tempData.temperature = "";
                            }
                            tempData.deviceId = currentDeviceId;
                            tempData.deviceName = deviceName;
                            tempData.deviceType = deviceType;
                            tempData.deviceSubType = deviceSubType;
                            tempData.onlineStatus = deviceOnlineStatus;
                            me.prepareData.push(tempData);
                    }}).then(this.updateTXList)
            },
            updateTXList() {
                let me = this;
                for (let j = 0; j < me.prepareData.length; j++) {
                    let currentData = me.prepareData[j];
                    let returnDeviceId = currentData.deviceId;
                    let deviceSubType = currentData.deviceSubType;
                    let deviceType = currentData.deviceType;
                    let deviceStatus = currentData.status;
                    let deviceOnlineStatus = currentData.onlineStatus;
                    if (returnDeviceId && deviceOnlineStatus=="online") {
                        let param={
                            applianceId: returnDeviceId
                        }
                        nativeService.sendLuaRequest(param,true).then( function (data) {
//                            nativeService.alert(data)
                            if (data.errorCode == 0) {
                                let params = data.result;
                                if (deviceType == "0xE2") {
                                    if (params.cur_temperature) {
                                        currentData.temperature = params.cur_temperature + "℃";
                                    } else {
                                        currentData.temperature = "";
                                    }
                                    if (params.power == "off") {
                                        currentData.status = "已关机";
                                    } else {
                                        if (params.hot_power == "on") {
                                            currentData.status = "加热中";
                                        } else if (params.warm_power == "on") {
                                            currentData.status = "保温中";
                                        } else if (params.fast_hot_power == "on") {
                                            currentData.status = "即热";
                                        }else{
                                            currentData.status = "待机";
										}
                                    }
                                } else if (deviceType == "0xE3") {
                                    if (params.power == "on") {
                                        if (params.temperature) {
                                            currentData.status = params.temperature + "℃";
                                        } else {
                                            currentData.status = "";
                                        }
                                    } else {
                                        currentData.status = "已关机";
                                    }
                                    currentData.temperature = "";
                                } else if (deviceType == "0xED" && deviceSubType == "259") {
                                    currentData.temperature = "";
                                    currentData.status = params.power == "on" ? "已开机" : "已关机";
                                } else if (deviceType == "0xED" && deviceSubType == "263") {
                                    currentData.temperature = "";
                                    if (params.life_1) {
                                        currentData.status = params.life_1;
                                    }
                                    if (params.life_2) {
                                        currentData.status += params.life_2;
                                    }
                                    if (params.life_3) {
                                        currentData.status += params.life_3;
                                    }
                                    if (params.life_4) {
                                        currentData.status += params.life_4;
                                    }
                                    if (params.life_5) {
                                        currentData.status += params.life_5;
                                    }
                                }
                                me.prepareData[i]=currentData;
                            } else {
                                modal.toast({'message': '连接设备超时', 'duration': 2});
                            }
                        })
                    }
                }
            },
            updateItem(data){ //设备状态上报
                for (let j = 0; j < me.prepareData.length; j++) {
                    let currentData = me.prepareData[j];
                    let returnDeviceId = currentData.deviceId;
                    let deviceSubType = currentData.deviceSubType;
                    let deviceType = currentData.deviceType;
                    let deviceStatus = currentData.status;
                    let deviceOnlineStatus = currentData.onlineStatus;
                    if (returnDeviceId == data.deviceId && deviceOnlineStatus == "online") {
                        let params = data;
                        if (deviceType == "0xE2") {
                            if (params.cur_temperature) {
                                currentData.temperature = params.cur_temperature + "℃";
                            } else {
                                currentData.temperature = "";
                            }
                            if (params.power == "off") {
                                currentData.status = "已关机";
                            } else {
                                if (params.hot_power == "on") {
                                    currentData.status = "加热中";
                                } else if (params.warm_power == "on") {
                                    currentData.status = "保温中";
                                } else if (params.fast_hot_power == "on") {
                                    currentData.status = "即热";
                                }
                            }
                        } else if (deviceType == "0xE3") {
                            if (params.power == "on") {
                                if (params.temperature) {
                                    currentData.status = params.temperature + "℃";
                                } else {
                                    currentData.status = "";
                                }
                            } else {
                                currentData.status = "已关机";
                            }
                            currentData.temperature = "";
                        } else if (deviceType == "0xED" && deviceSubType == "259") {
                            currentData.temperature = "";
                            currentData.status = params.power == "on" ? "已开机" : "已关机";
                        } else if (deviceType == "0xED" && deviceSubType == "261") {
                            currentData.temperature = "";
                            if (params.life_1) {
                                currentData.status = params.life_1;
                            }
                            if (params.life_2) {
                                currentData.status += params.life_2;
                            }
                            if (params.life_3) {
                                currentData.status += params.life_3;
                            }
                            if (params.life_4) {
                                currentData.status += params.life_4;
                            }
                            if (params.life_5) {
                                currentData.status += params.life_5;
                            }
                        }
                        me.prepareData[j] = currentData;
                    }
                }
			},
            jumpControlPanelPage() {
                let params = {
                    controlPanelName:"index.html"
                };
                bridgeModule.showControlPanelPage(params);
            },
            itemClicked(event) {
                this.jumpControlPanelPage();
            },
            handleNotification() {
                let me = this;
                globalEvent.addEventListener(this.pushKey, (data) => {
//                    nativeService.alert(data)
                    me.updateItem(data);
                });
                globalEvent.addEventListener(this.pushKeyOnline, (data) => {
                   if (data && data.messageType == "queryStatusFromApp") {
                        me.updateTXList();
                    }
                });
            },
            showControlPanelPage() {
                let params = {
                    controlPanelName: "index.html"
                };
                bridgeModule.showControlPanelPage(params);
            },
        },
        computed: {

		},
        mounted() {
        	this.queryTXLists();
            this.handleNotification()
        }
    }
</script>


<style>
	.content {
		flex: 1;
		width: 750px
	}

	.box {
		margin-bottom: 350px
	}

	.card {
		width: 686px;
		height: 392px;
		margin-left: 32px;
		margin-right: 32px;
		margin-top: 32px;
		flex-direction: row;
		border-radius: 6px;
	}

	.card-hot {
		background-color: #FFBD00;
	}

	.main-page {
		width: 686px;
		height: 392px;
		background: #000000;
		border-radius: 6px;
	}

	.title {
		position: absolute;
		top: 196px;
		left: 347px;
		font-family: PingFangSC-Medium;
		font-size: 36px;
		color: #FFFFFF;
		text-align: center;

	}

	.card-power-off {
		width: 686px;
		height: 392px;
		margin-left: 32px;
		margin-right: 32px;
		margin-top: 32px;
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
		right: 300px;
		top: 200px;
		align-items: center;
	}

	.control-div-offline {
		position: absolute;
		right: 32px;
		top: 32px;
		align-items: center;
	}

	.card-control {
		align-items: flex-end;
		margin-top: 44px;
		margin-right: 44px;
		flex-direction: row;
		justify-content: flex-end;
	}

	.card-control-temp-div {
		flex-direction: row;
		margin-left: 35px;
		margin-bottom: 25px;
	}

	.cart-control-temp-img {
		width: 64px;
		height: 64px
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
		width: 56px;
		height: 56px;
	}

	.card-control-img {
		width: 58px;
		height: 58px
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
		height: 314px
	}

	.main-status-div {
		flex-direction: row;
		margin-top: 32px;
		margin-left: 30px
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
		margin-left: 10px;
		margin-top: -50px;
		color: #FFFFFF;
	}

	.main-status-third {
		font-size: 28px;
		margin-left: 10px;
		margin-top: 8px;
		color: #FFFFFF;
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

	.smart {
		flex-direction: column;
		justify-content: space-between;
		margin-top: 50px;
	}

	.smart-title {
		flex-direction: row;
		justify-content: space-between;
		margin-left: 32px;
		margin-right: 32px;
	}

	.smart-content {
		margin-top: 50px;
		margin-left: 32px;
		margin-right: 32px;
		border-bottom: inset
	}

	.smart-content-last {
		margin-top: 50px;
		margin-left: 32px;
		margin-right: 32px;
	}

	.smart-text {
		font-family: PingFangSC-Regular;
		font-size: 36px;
		color: #000000;
		letter-spacing: 0;
	}

	.smart-img {
		width: 48px;
		height: 48px;
	}

	.smart-detail {
		flex-direction: row;
		justify-content: space-between;
		margin-top: 30px;
		padding-bottom: 20px;
	}

	.smart-detail-content {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #8A8A8F;
		letter-spacing: 0;
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
