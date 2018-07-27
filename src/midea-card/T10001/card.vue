<template>
    <scroller class="content" show-scrollbar="false">
        <div class="box">
            <div class="card">
                <image class="main-page" src="./assets/img/smart_ic_set02@2x.png"></image>
            </div>
            <div class="title">
                <text>简爱</text>
            </div>
            <midea-cell v-for="myData in data"
                        :title="myData.title"
                        desc=""
                        height="160"
                        :importTextStyle="cellTitleStyle"
                        :rightTextStyle="cellRightStyle"
                        :rightText="myData.status"
                        :hasArrow="true"
                        :clickActivied="true"
                        itemImg="myData.img"
                        @mideaCellClick="itemClicked">
            </midea-cell>
            <midea-download></midea-download>
        </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
    import mideaSwitch from '@/midea-component/switch.vue'
    import mideaItem from '@/midea-component/item.vue'
    import mideaDownload from '@/midea-card/midea-components/download.vue'
    import mideaCell from '@/component/cell.vue'
    import Mock from './settings/mock'

    const modal = weex.requireModule('modal');
    const dom = weex.requireModule('dom');
    var stream = weex.requireModule('stream');
    const bridgeModule = weex.requireModule('bridgeModule');
    export default {
        components: {
            mideaCell,
            mideaSwitch,
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
                cellRightStyle:{
                    fontFamily: 'PingFangSC-Regular',
                    fontSize: '28px',
                    color: '#666666'
                },
                deviceId: "",
                deviceName: "",
                deviceType: "",
                deviceSubType: "",
                deviceSn: "",
                onlineStatus: "",
                pushKey: "receiveMessage",
                pushKeyOnline: "receiveMessageFromApp",
                mideaChecked: true,
                mideaChecked2: false,
                danwei: "%",
                onoff: "",//localStorage.getItem("E2power") || "on",
                wind_speed: "",//localStorage.getItem("FDwind_speed") || "高风",
                humidity: "",//localStorage.getItem("FDhumidity") || "50",
                cur_humidity: "",//localStorage.getItem("FDcur_humidity") || "60",
                return_wind_speed: {
                    high: "高风 ",
                    middle: "中风",
                    low: "低风",
                    auto: "自动风"
                },
                powerIcon_poweroff: "./assets/img/smart_ic_power_blue@2x.png",
                powerIcon_offline: "./assets/img/smart_ic_reline@2x.png",
                data: [{
                    title: "电热水器",
                    status: "已开启",
                    img: "./assets/img/smart_img_equip021@2x.png",
                    deviceId: ""
                },
                    {
                        title: "燃气热水器",
                        status: "已开启",
                        img: "./assets/img/smart_img_equip036@2x.png",
                        deviceId: ""
                    },
                    {
                        title: "净水机",
                        status: "已开启",
                        img: "./assets/img/smart_img_equip031@2x.png",
                        deviceId: ""
                    }
                    ],
            }
        },
        methods: {
            queryStatus() {
                this.lock = true;
                if (this.first) {
                    this.queryLoading = true;
                    this.first = false;
                }
                let me = this;
                let data = nativeService.sendLuaRequest();
                me.updateUI(data);
            },
            updateUI(data) {
                if (data.errorCode == 0) {
                    this.onlineStatus = "1";
                    let params = data.params || data.result;
                    this.onoff = params.power;
                    this.wind_speed = this.return_wind_speed[params.wind_speed];
                    this.humidity = params.humidity;
                    this.cur_humidity = params.cur_humidity;
                    this.danwei = "%";
                } else {
                    modal.toast({'message': "连接设备超时", 'duration': 2});
                }
            },
            queryTXList() { //缺
                let me = this;
                nativeService.getTXList("getTXList", function (myList) {
                    var TXList = myList;
                    console.dir(TXList);
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
                            tempData.icon = require("./assets/img/smart_img_equip021@2x.png");
                            tempData.temperature = "";
                        } else if (deviceType == "0xE3") {
                            tempData.icon = require("./assets/img/smart_img_equip036@2x.png");
                            tempData.temperature = "";
                        } else if (deviceType == "0xED" && deviceSubType == "266") {
                            tempData.icon = require("./assets/img/smart_img_equip031@2x.png");
                            tempData.temperature = "";
                        } else if (deviceType == "0xED" && deviceSubType == "265") {
                            tempData.icon = require("./assets/img/smart_img_equip031@2x.png");
                            tempData.temperature = "";
                        }
                        tempData.deviceId = currentDeviceId;
                        tempData.deviceName = deviceName;
                        tempData.deviceType = deviceType;
                        tempData.deviceSubType = deviceSubType;
                        tempData.onlineStatus = deviceOnlineStatus;
                        me.prepareData.push(tempData);
                        console.log(me.prepareData);
                    }
                    for (let j = 0; j < me.prepareData.length; j++) {
                        let currentData = me.prepareData[j];
                        let returnDeviceId = currentData.deviceId;
                        let deviceType = currentData.deviceType;
                        let deviceSubType = currentData.deviceSubType;
                        if (returnDeviceId && currentData.onlineStatus == "online") {
                            nativeService.call('luaQueryTX', "deviceInfo", {deviceId: returnDeviceId}, function (data) {
                                console.log("data:" + data);
                                if (data.errorCode == 0) {
                                    let params = data.params;
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
                                            } else {
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
                                    } else if (deviceType == "0xED" && deviceSubType == "266") {
                                        currentData.temperature = "";
                                        currentData.status = params.power == "on" ? "已开机" : "已关机";
                                        currentData.deviceName = currentData.deviceName.replace("(管线机)", "") + "(管线机)";
                                    } else if (deviceType == "0xED" && deviceSubType == "265") {
                                        currentData.temperature = "";
                                        if (params.life_1 && params.life_1 != "0") {
                                            currentData.status = params.life_1;
                                        }
                                        if (params.life_2 && params.life_2 != "0") {
                                            currentData.status += " " + params.life_2;
                                        }
                                        if (params.life_3 && params.life_3 != "0") {
                                            currentData.status += " " + params.life_3;
                                        }
                                        if (params.life_4 && params.life_4 != "0") {
                                            currentData.status += " " + params.life_4;
                                        }
                                        if (params.life_5 && params.life_5 != "0") {
                                            currentData.status += " " + params.life_5;
                                        }
                                        currentData.deviceName = currentData.deviceName.replace("(橱下)", "") + "(橱下)";
                                    }
                                    //me.prepareData.push(tempData);
                                    console.log(me.prepareData);
                                } else {
                                    currentData.status = "连接超时";
                                    me.showToast('连接设备超时');
                                }
                            })
                        } else if (returnDeviceId && currentData.onlineStatus == "offline") {
                            if (deviceType == "0xED" && deviceSubType == "266") {
                                currentData.deviceName = currentData.deviceName.replace("(管线机)", "") + "(管线机)";
                            } else if (deviceType == "0xED" && deviceSubType == "265") {
                                currentData.deviceName = currentData.deviceName.replace("(橱下)", "") + "(橱下)";
                            }
                        }
                    }
                });
            },
            updateTXList(deviceId) {
                let me = this;
                for (let j = 0; j < me.prepareData.length; j++) {
                    let currentData = me.prepareData[j];
                    let returnDeviceId = currentData.deviceId;
                    let deviceType = currentData.deviceType;
                    if (returnDeviceId == deviceId) {
                        nativeService.call('luaQueryTX', "deviceInfo", {deviceId: returnDeviceId}, function (data) {
                            console.log("data:" + data);
                            if (data.errorCode == 0) {
                                let params = data.params;
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
                                } else if (deviceType == "0xED" && deviceSubType == "266") {
                                    currentData.temperature = "";
                                    currentData.status = params.power == "on" ? "已开机" : "已关机";
                                } else if (deviceType == "0xED" && deviceSubType == "265") {
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
                                //me.prepareData.push(tempData);
                                console.log(me.prepareData);
                            } else {
                                me.showToast('连接设备超时');
                                //currentData.temperature = "";
                                //currentData.status = "未连接";
                            }
                        })
                    }
                }
            },
            showToast(text, type) {
                this.$vux.toast.show({
                    text: text || '',
                    type: type || 'text',
                    isShowMask: true,
                    time: 1500,
                    position: 'top',
                    width: text.length + 2 + 'em'
                })
            },
            jumpControlPanelPage(deviceType, deviceSubType) {
                if (deviceType && deviceType == "0xE2") {
                    localStorage.setItem('jianAiCurrentSelectedDevice', "0");
                } else if (deviceType && deviceType == "0xE3") {
                    localStorage.setItem('jianAiCurrentSelectedDevice', "1");
                } else if (deviceType && deviceType == "0xED" && deviceSubType && deviceSubType == "266") {
                    localStorage.setItem('jianAiCurrentSelectedDevice', "2");
                } else if (deviceType && deviceType == "0xED" && deviceSubType && deviceSubType == "265") {
                    localStorage.setItem('jianAiCurrentSelectedDevice', "3");
                } else {
                    localStorage.setItem('jianAiCurrentSelectedDevice', "");
                }
                bridge.showControlPanelPage("", "index.html");
            },
            getApplianceIDTX() {
                console.log("getApplianceIDTX");
                let me = this;
                nativeService.getApplianceIDTX("deviceIds", function (data) {
                    console.log(data);
                    me.showToast(data);
                    me.deviceIDTX1 = data[0];
                })
            },
            getDeviceName() {
                console.log("getDeviceName");
                var me = this;
                nativeService.getDeviceName(this.deviceIDTX1, "deviceName", function (data) {
                    me.showToast(data);
                });
            },
            getApplianceSubtypeTX() {
                var me = this;
                console.log("getApplianceSubtypeTX");
                nativeService.getApplianceSubtypeTX(this.deviceIDTX1, "deviceSubType", function (data) {
                    me.showToast(data);
                });
            },
            getApplianceType() {
                var me = this;
                console.log("getApplianceType");
                nativeService.getApplianceType(this.deviceIDTX1, "deviceType", function (data) {
                    me.showToast(data);
                });
            },
            getDeviceSNTX() {
                var me = this;
                console.log("getDeviceSNTX");
                nativeService.getDeviceSNTX(this.deviceIDTX1, "deviceSN", function (data) {
                    me.showToast(data);
                });
            },
            getTXList() {
                var me = this;
                console.log("getTXList");
                nativeService.getTXList("getTXList", function (data) {
                    me.showToast(data);
                    console.dir(data);
                });
            },
            getDeviceOnlineStatus() {
                var me = this;
                console.log("getDeviceOnlineStatus");
                nativeService.getDeviceOnlineStatus(this.deviceIDTX1, "getDeviceOnlineStatus", function (data) {
                    me.showToast(data);
                    console.dir(data);
                })
            },
            luaQueryTX() {
                var me = this;
                console.log("luaQueryTX");
                nativeService.call('luaQueryTX', "deviceInfo", {deviceId: this.deviceIDTX1}, function (data) {
                    console.log(data);
                    me.showToast(data);
                });
            },
            luaControlTX() {
                let params = {
                    "deviceId": this.deviceIDTX1,
                    "mode": "custom",
                    "temperature": 45
                }
                let me = this;
                console.log("luaControlTX");
                nativeService.call('luaControlTX', "deviceInfo", params, function (data) {
                    console.log(data);
                    me.showToast(data);
                });
            },
            recieveMessage() {
                console.log("recieveMessage");
                console.log(this.messageBack);
                me.showToast(data);
            },
            startCmdProcess() {
                console.log("startCmdProcess");
            },
            rewriteAlert() {
                window.alert = function (name) {
                    var iframe = document.createElement("IFRAME");
                    iframe.style.display = "none";
                    iframe.setAttribute("src", 'data:text/plain,');
                    document.documentElement.appendChild(iframe);
                    window.frames[0].window.alert(name);
                    iframe.parentNode.removeChild(iframe);
                }
            }
        },
//        methods: {
//            onMideachange(event) {
//            		//modal.toast({ 'message': event.value, 'duration': 2 });
//            },
//            onMideachange2(event) {
//            		//modal.toast({ 'message': event.value, 'duration': 2 });
//            },
//            itemClicked(event) {
//            	//modal.toast({ 'message': event.value, 'duration': 2 });
//            },
//            queryStatus () {
//            	let self = this;
//            	let params = {
//            			"operation":"luaQuery",
//            			"name":"deviceinfo",
//            			"params":{}
//            		};
//            	nativeService.sendLuaRequest(params,true).then(function(data) {
//            		self.updateUI(data);
//            	},function(error) {
//            		console.log("error");
//            	});
//            },
//            updateDeviceInfo(data) {
//            	this.deviceId = data.deviceId;
//            	this.deviceName = data.deviceName;
//            	this.deviceType = data.deviceType;
//            	this.deviceSubType = data.deviceSubType;
//            	this.deviceSn = data.deviceSn;
//            	this.onlineStatus = data.isOnline;
//            },
////          queryTXList() {
////	        	let me = this;
////	        	nativeService.getTXList("getTXList",function(myList){
////	        		var TXList = myList;
////	        		console.dir(TXList);
////	        		for(let i=0;i<TXList.length;i++) {
////	        			let currentList = TXList[i];
////	        			let currentDeviceId = currentList.applianceCode;
////	        			let deviceType = currentList.applianceType;
////	        			let deviceSubType = currentList.modelNumber;
////	        			let deviceName = currentList.name || currentList.typeName;
////	        			let deviceOnlineStatus = currentList.onlineStatus
////	        			let tempData = {};
////	        			if(deviceOnlineStatus == "unmatch") {
////							tempData.status = "去购买";
////						} else if (deviceOnlineStatus == "offline") {
////							tempData.status = "未连接";
////						} else {
////							tempData.status = "";
////						}
////	        			if(deviceType == "0xE2") {
////							tempData.icon = require("../assets/img/e2_jianai@2x.png");
////							tempData.temperature = "";
////						} else if(deviceType == "0xE3") {
////							tempData.icon = require("../assets/img/ed_cx_jianai@2x.png");
////							tempData.temperature = "";
////						} else if(deviceType == "0xED" && deviceSubType == "266") {
////							tempData.icon = require("../assets/img/ed_gxj_jianai@2x.png");
////							tempData.temperature = "";
////						} else if(deviceType == "0xED" && deviceSubType == "265") {
////							tempData.icon = require("../assets/img/ed_cx_jianai@2x.png");
////							tempData.temperature = "";
////						}
////						tempData.deviceId = currentDeviceId;
////						tempData.deviceName = deviceName;
////						tempData.deviceType = deviceType;
////						tempData.deviceSubType = deviceSubType;
////						tempData.onlineStatus = deviceOnlineStatus;
////						me.prepareData.push(tempData);
////						console.log(me.prepareData);
////	        		}
////	        		for(let j=0;j<me.prepareData.length;j++) {
////	        			let currentData = me.prepareData[j];
////	        			let returnDeviceId = currentData.deviceId;
////	        			let deviceType = currentData.deviceType;
////	        			let deviceSubType = currentData.deviceSubType;
////	        			if(returnDeviceId && currentData.onlineStatus == "online") {
////	        				nativeService.call('luaQueryTX',"deviceInfo",{deviceId:returnDeviceId},function(data){
////								console.log("data:"+data);
////								if(data.errorCode == 0) {
////		                			let params = data.params;
////									if(deviceType == "0xE2") {
////										if(params.cur_temperature) {
////											currentData.temperature = params.cur_temperature + "℃";
////										} else {
////											currentData.temperature = "";
////										}
////										if(params.power == "off") {
////											currentData.status = "已关机";
////										} else {
////											if(params.hot_power == "on") {
////												currentData.status = "加热中";
////											} else if(params.warm_power == "on") {
////												currentData.status = "保温中";
////											} else if(params.fast_hot_power == "on") {
////												currentData.status = "即热";
////											} else {
////												currentData.status = "待机";
////											}
////										}
////									} else if(deviceType == "0xE3") {
////										if(params.power == "on") {
////											if(params.temperature) {
////												currentData.status = params.temperature + "℃";
////											} else {
////												currentData.status = "";
////											}
////										} else {
////											currentData.status = "已关机";
////										}
////										currentData.temperature = "";
////									} else if(deviceType == "0xED" && deviceSubType == "266") {
////										currentData.temperature = "";
////										currentData.status = params.power=="on"?"已开机":"已关机";
////										currentData.deviceName = currentData.deviceName.replace("(管线机)","") + "(管线机)";
////									} else if(deviceType == "0xED" && deviceSubType == "265") {
////										currentData.temperature = "";
////										if(params.life_1 && params.life_1 != "0") {
////											currentData.status = params.life_1;
////										}
////										if(params.life_2 && params.life_2 != "0") {
////											currentData.status += " "+params.life_2;
////										}
////										if(params.life_3 && params.life_3 != "0") {
////											currentData.status += " "+params.life_3;
////										}
////										if(params.life_4 && params.life_4 != "0") {
////											currentData.status += " "+params.life_4;
////										}
////										if(params.life_5 && params.life_5 != "0") {
////											currentData.status += " "+params.life_5;
////										}
////										currentData.deviceName = currentData.deviceName.replace("(橱下)","") + "(橱下)";
////									}
////									//me.prepareData.push(tempData);
////									console.log(me.prepareData);
////								} else {
////									currentData.status = "连接超时";
////									me.showToast('连接设备超时');
////
////								}
////							})
////		        		} else if(returnDeviceId && currentData.onlineStatus == "offline") {
////		        			if(deviceType == "0xED" && deviceSubType == "266") {
////		        				currentData.deviceName = currentData.deviceName.replace("(管线机)","") + "(管线机)";
////		        			} else if(deviceType == "0xED" && deviceSubType == "265") {
////		        				currentData.deviceName = currentData.deviceName.replace("(橱下)","") + "(橱下)";
////		        			}
////		        		}
////	        		}
////	        	});
////	        },
////	        updateTXList(deviceId) {
////	        	let me = this;
////	        	for(let j=0;j<me.prepareData.length;j++) {
////	    			let currentData = me.prepareData[j];
////	    			let returnDeviceId = currentData.deviceId;
////	    			let deviceType = currentData.deviceType;
////	    			if(returnDeviceId == deviceId) {
////	    				nativeService.call('luaQueryTX',"deviceInfo",{deviceId:returnDeviceId},function(data){
////							console.log("data:"+data);
////							if(data.errorCode == 0) {
////	                			let params = data.params;
////								if(deviceType == "0xE2") {
////									if(params.cur_temperature) {
////										currentData.temperature = params.cur_temperature + "℃";
////									} else {
////										currentData.temperature = "";
////									}
////									if(params.power == "off") {
////										currentData.status = "已关机";
////									} else {
////										if(params.hot_power == "on") {
////											currentData.status = "加热中";
////										} else if(params.warm_power == "on") {
////											currentData.status = "保温中";
////										} else if(params.fast_hot_power == "on") {
////											currentData.status = "即热";
////										}
////									}
////								} else if(deviceType == "0xE3") {
////									if(params.power == "on") {
////										if(params.temperature) {
////											currentData.status = params.temperature + "℃";
////										} else {
////											currentData.status = "";
////										}
////									} else {
////										currentData.status = "已关机";
////									}
////									currentData.temperature = "";
////								} else if(deviceType == "0xED" && deviceSubType == "266") {
////									currentData.temperature = "";
////									currentData.status = params.power=="on"?"已开机":"已关机";
////								} else if(deviceType == "0xED" && deviceSubType == "265") {
////									currentData.temperature = "";
////									if(params.life_1) {
////										currentData.status = params.life_1;
////									}
////									if(params.life_2) {
////										currentData.status += params.life_2;
////									}
////									if(params.life_3) {
////										currentData.status += params.life_3;
////									}
////									if(params.life_4) {
////										currentData.status += params.life_4;
////									}
////									if(params.life_5) {
////										currentData.status += params.life_5;
////									}
////								}
////								//me.prepareData.push(tempData);
////								console.log(me.prepareData);
////							} else {
////								me.showToast('连接设备超时');
////								//currentData.temperature = "";
////								//currentData.status = "未连接";
////							}
////						})
////	    			}
////	    		}
////	       },
//	        handleNotification() {
//            	console.log("handleNotification Yoram");
//            	let me = this;
//            	globalEvent.addEventListener(this.pushKey, (data) => {
//            		if(data.deviceId) {
////	               		me.updateTXList(data.deviceId);
//	                }
//		        });
//            },
        showControlPanelPage() {
            let params = {
                controlPanelName: "index.html"
            };
            bridgeModule.showControlPanelPage(params);
        },
//            reload() {
//            	let params = {};
//            	bridgeModule.reload(params,function(result) {
//            		//successful
//            	},function(error) {
//            		//fail
//            	});
//            }
//        },
        computed: {},
        mounted() {
            this.rewriteAlert();
            this.queryTXList();
            let me = this;
            nativeService.getCardTitle("deviceName", function (name) {
                me.deviceName = name;
            })
            $(document).unbind('recieveMessage').bind('recieveMessage', {}, function (event, messageBack) {
                console.log("receiveMessage");
                console.dir(messageBack);
                if (!me.lock) {
                    me.messageBack = messageBack;
                    // me.queryStatus();
                    if (messageBack.deviceId) {
                        me.updateTXList(messageBack.deviceId);
                    }
                }
            });
//	       let self = this;
//            nativeService.getDeviceInfo().then(function(data) {
//            	self.updateDeviceInfo(data.result);
//            	self.handleNotification();
//        		self.queryStatus();
//            },function(error) {
//            	modal.toast({ 'message': "连接设备超时", 'duration': 2 });
//            })
        }
    }
</script>


<style>
    .content {
        flex: 1;
        width: 750px
    }

    .box {
        margin-bottom: 650px
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
