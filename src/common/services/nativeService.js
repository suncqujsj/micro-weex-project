const mm = weex.requireModule('modal');
var ipAddress = "http://10.74.144.55:8080";
const navigator = weex.requireModule('navigator');

var dummy = false;
const storage = weex.requireModule('storage');
var serviceList = {
    getDeviceList: "subdevice/list",
    getDeviceList_add: "subdevice/list",
    addDevice: "subdevice/add",
    delDevice: "device/del",
    updateDevice: "transport",
    updateAllDevices: "transport",
    queryLog: "logging/list",
    queryAlarm: "alarm/list",
    releaseAlarm: "alarm/release",
    delLog: "report_log_del",
    sceneDetail: "scene/detail",
    sceneList: "scene/list",
    addScene: "scene/add",
    otaCheck: "ota/update/check",
    otaCheck_update: "ota/update/check",
    startUpdate: "transport",
    getOtaProgress: "ota_get_progress",
    executeNow: "transport",
    updateScene: "scene/update",
    updateNode: "subdevice/update",
    delScene: "scene/del",
    getSceneDeviceList: "getDeviceList",
    operateDevice: "transport",
    enableScene: "scene/enable",
    getSceneDetail: "scene/detail",
    queryEnvDetector: "query_env_detector",
    sendPlayerControl: "sendPlayerControl",
    gwStatus: "transport",
    switchDefence: "defence/switch",
    getDomainList: "domain/list",
    getDomainDevice: "domain/get_device",
    setAlarmDevice: "subdevice/set_alarm_device",
    generateLockPwd: "subdevice/unlock/generate",
    exeInfrared: "transport",
    studyInfrared: "transport",
    infraredList: "subdevice/infrared/order/list",
    addInfrared: "subdevice/infrared/order/add",
    delInfrared: "subdevice/infrared/order/del",
    updateInfrared: "subdevice/infrared/order/update",
    emptyInfrared: "subdevice/infrared/order/clean",
    b2bAutoRunning: 'b2bAutoRunning',
    b2bAddScene: "b2bAddScene",
    b2bUpdScene: "b2bUpdScene",
    b2bDelScene: "b2bDelScene",
    //安全锁
    getSaveLockStatus: "setup/lock/query",
    //获取项目列表
    getProjectList: "setup/project/list",
    //获取楼盘列表
    getBuildingList: "setup/project/building/list",
    //获取房间列表
    getRoomList: "setup/project/building/room/list",
    //提交安装
    sumitInstall: "setup/submit",
    addDeviceToDomain: "domain/add_device",
    subDeviceConfig: "transport",
    deleteGateWay: "device/del",
    modifyGateWay: "gateway/modify",
    lockUserList: "subdevice/lock/user/list",
    updateLockUserRole: "subdevice/lock/user/update",
    emptySwitchBound: "transport",
    getEndpointBoundDevice: "transport",
    getSwitchBoundDevice: "transport",
    selectSwitchBoundDevice: "transport",
    gatewayBackup: "gateway/backup/req",
    gatewayBackupProgress: "gateway/backup/progress",
    gatewayRestore: "gateway/restore",
    gatewayRestoreProgress: "gateway/restore/progress",
    gatewayBackupHistory: "gateway/backup/history",
    getDeviceStatus: "device/get",
    gatewayResetDefault: "system/default",
    gatewayWifiGet: "net/wifiap/get",
    gatewayWifiSet: "net/wifiap/set",
    gatewayDhcpGet: "net/dhcpd/get",
    gatewayDhcpSet: "net/dhcpd/set",
    deviceModify: "device/modify",
    deviceList: "device/list",
    subDeviceConfigSpecific: "device/transport",
    generateLockNb5Pwd: "doorlock/unlock/gen",
    queryNb5Log: "device/log"

}
const platform = weex.config.env.platform;
const bridgeModule = weex.requireModule('bridgeModule');
var mockArray = [];
export default {
    goTo(path) {
        var self = this;
        var url
        if (dummy != true) {
            //if (platform!='Web') {
            url = 'file://assets/' + path;
            self.getPath(function (weexPath) {
                url = weexPath + path;
                self.runGo(url);
            });
        } else {
            let ip = weex.config.bundleUrl.match(new RegExp("[\?\&]ip=([^\&]+)", "i"));
            if (ip == null || ip.length < 1) {
                url = ipAddress + "/dist/" + path;
            } else {
                url = "http://" + ip[1] + ":8080" + "/dist/" + path;
                self.runGo(url);
            }
        }
    },
    runGo(url) {
        //mm.toast({message:url, duration: 2 })
        navigator.push({
            url: url,
            animated: "true"
        }, event => {
        });
    },
    getPath(callBack) {
        bridgeModule.getWeexPath(function (resData) {
            //mm.toast({message:"log"+resData, duration: 5 })
            var jsonData = JSON.parse(resData);
            var weexPath = jsonData.weexPath;
            callBack(weexPath);
        });
    },
    goBack() {
        var params = {
            animated: 'true'
        }
        navigator.pop(params, function () {
        });
    },
    backToNative() {
        bridgeModule.backToNative();
    },
    getApplianceID(callBack) {
        var self = this;
        var finalCallBack = function (resData) {
            var jsonData = JSON.parse(resData);
            self.setItem("masterId", jsonData.devId);
            callBack(jsonData.devId);
        }
        if (dummy != true) {
            bridgeModule.getApplianceID(finalCallBack);
        } else {
            self.setItem("masterId", "123123");
            callBack("0");
        }
    },
    getDetailParams(callBack) {
        var finalCallBack = function (resData) {
            var jsonData = JSON.parse(resData);
            callBack(jsonData);
        }
        if (dummy != true) {
            bridgeModule.getDetailParams(finalCallBack);
        } else {
            callBack({ "modelid": "jiayun.switch.003" });
        }
    },
    shareMsg(params) {
        if (dummy != true) {
            bridgeModule.shareMsg(JSON.stringify(params));
        }
    },
    updateAreaDevice(params, callback) {
        if (dummy != true) {
            bridgeModule.updateAreaDevice(JSON.stringify(params), callback);
        }
    },
    b2bDelGateway(nodeid) {
        var obj = {};
        obj.nodeid = nodeid;
        if (dummy != true) {
            bridgeModule.b2bDelGateway(JSON.stringify(obj));
        }
    },
    b2bUpdateGateway(obj, callback) {
        if (dummy != true) {
            bridgeModule.b2bUpdateGateway(JSON.stringify(obj), callback);
        }
    },
    showLoading() {
        if (dummy != true) {
            bridgeModule.showLoading();
        }
    },
    hideLoading() {
        if (dummy != true) {
            bridgeModule.hideLoading();
        }
    },
    updateTitle(title, showLeftBtn, showRightBtn) {
        var params = {
            title: title,
            showLeftBtn: showLeftBtn,
            showRightBtn: showRightBtn
        }
        if (dummy != true) {
            bridgeModule.updateTitle(JSON.stringify(params));
        }
    },
    call(name, params, successFunc, failFunc) {
        //if (platform!='Web') {
        var self = this;
        if (dummy != true) {
            this.getItem("masterId", function (resdata) {
                //resdata=JSON.parse(resdata);
                var masterId = resdata.data;
                var sendData = {};
                sendData.url = serviceList[name];
                sendData.params = params || {};
                sendData.params.applianceid = masterId + "";
                sendData.params.msgid = self.genMessageId();
                sendData.params.data = params.data || {};
                if (failFunc == undefined) {
                    failFunc = function () {

                    }
                }
                if (successFunc != undefined) {
                    var finalSuccFunc = function (resData) {
                        var jsonData = JSON.parse(resData);
                        successFunc(jsonData);
                    }
                }
                bridgeModule.b2bAction(sendData, finalSuccFunc, failFunc);
            });
        } else {
            successFunc(mockArray[name]);
        }
    },
    initMockData(jsonObj) {
        for (var key in jsonObj) {
            mockArray[key] = jsonObj[key];
        }
    },
    isMyHouse(callBack) {
        var self = this;
        var finalCallBack = function (resData) {
            var jsonData = JSON.parse(resData);
            self.setItem("isMyHouse", jsonData.houseType);
            callBack(jsonData.houseType);
        }
        if (dummy != true) {
            bridgeModule.getHouseType(finalCallBack);
        } else {
            callBack(0);
            self.setItem("isMyHouse", 1);
        }
    },
    genMessageId() {
        var messageId = '';
        for (var i = 0; i < 8; i++) {
            messageId += (Math.floor(Math.random() * 10)).toString();
        }
        return messageId;
    },
    getItem(key, callback) {
        storage.getItem(key, callback)
    },
    setItem(key, value) {
        if (typeof value == 'object') {
            value = JSON.stringify(value);
            //mm.toast({message:value, duration: 2 })
        }
        storage.setItem(key, value, event => {
            console.log('set success')
        })
    },
    removeItem(key) {
        storage.removeItem(key, event => {
            console.log('delete value:', event.data)
            this.state = 'deleted'
        })
    },
    toast(message, duration) {
        mm.toast({ message: message, duration: duration || 1 });
    },
    alert(message, callback, okTitle) {
        var callbackFunc = callback || function (value) {

        }
        mm.alert({
            message: message,
            okTitle: okTitle || "确定"
        }, function (value) {
            callbackFunc(value);
        });
    },
    confirm(message, callback, okTitle, cancelTitle) {
        mm.confirm({
            message: message,
            okTitle: okTitle || '确定',
            cancelTitle: cancelTitle || '取消'
        }, result => {
            callback(result)
        });
    },
    convertImgPath(path) {
        if (dummy) {
            path = path || '';
            path = path.replace(/\..\//g, '');
            return ipAddress + "/dist/src/" + path;
        } else {
            return path;
        }
    },
    getDeviceSN(callback, callbackFail) {
        var finalCallBack = function (resData) {
            if (typeof resData == 'string') {
                resData = JSON.parse(resData);
            }
            callback(resData.deviceSN);
        }
        if (dummy != true) {
            bridgeModule.getDeviceSN(finalCallBack, callbackFail);
        } else {
            callback(0);
        }
    },
    getCurrentApplianceID(callback, callbackFail) {
        var finalCallBack = function (resData) {
            if (typeof resData == 'string') {
                resData = JSON.parse(resData);
            }
            callback(resData.applianceID);
        }
        if (dummy != true) {
            bridgeModule.getCurrentApplianceID(finalCallBack, callbackFail);
        } else {
            callback(0);
        }
    },
    getApplianceSubtype(callback, callbackFail) {
        var finalCallBack = function (resData) {
            if (typeof resData == 'string') {
                resData = JSON.parse(resData);
            }
            callback(resData.applianceSubtype);
        }
        if (dummy != true) {
            bridgeModule.getApplianceSubtype(finalCallBack, callbackFail);
        } else {
            callback(0);
        }
    },
    startCmdProcess(name, messageBody, callback, callbackFail) {
        var param = {};
        if (messageBody != undefined) {
            param.messageBody = messageBody;
        }
        var finalCallBack = function (resData) {
            //mm.toast({message:resData, duration:3});
            if (typeof resData == 'string') {
                resData = JSON.parse(resData);
            }
            if (resData.errorCode != 0) {
                callbackFail(resData);
            } else {
                callback(resData.messageBody);
            }
        }
        var finalCallbackFail = function (resData) {
            if (typeof resData == 'string') {
                resData = JSON.parse(resData);
            }
            callbackFail(resData);
        }
        if (dummy != true) {
            bridgeModule.startCmdProcess(JSON.stringify(param), finalCallBack, finalCallbackFail);
        } else {
            callback(mockArray[name].messageBody);
        }
    },
    sendLuaRequest(params, callback, callbackFail) {
        var param = {};
        param.operation = params.operation || "luaControl";//luaQuery or luaControl
        param.params = params.data || {};
        var finalCallBack = function (resData) {
            //mm.toast({message:resData, duration:3});
            if (typeof resData == 'string') {
                resData = JSON.parse(resData);
            }
            if (resData.errorCode != 0) {
                callbackFail(resData);
            } else {
                callback(resData);
            }
            callback(resData);
        }
        var finalCallbackFail = function (resData) {
            if (typeof resData == 'string') {
                resData = JSON.parse(resData);
            }
            callbackFail(resData);
        }
        if (dummy != true) {
            bridgeModule.commandInterface(JSON.stringify(param), finalCallBack, finalCallbackFail);
        } else {
            callback(mockArray[params.name]);
        }
    }
}