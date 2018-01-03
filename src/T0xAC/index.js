// { "framework": "Vue" }

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 292);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var mm = weex.requireModule('modal');
var ipAddress = "http://10.74.144.46:8080";
//var ipAddress="http://192.168.43.187:8080";
var navigator = weex.requireModule('navigator');
var dummy = false;
var storage = weex.requireModule('storage');
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
};
var platform = weex.config.env.platform;
var bridgeModule = weex.requireModule('bridgeModule');
var mockArray = [];
exports.default = {
  goTo: function goTo(path) {
    var self = this;
    var url = ipAddress + "/dist/src/" + path;
    if (dummy != true) {
      //if (platform!='Web') {
      url = 'file://assets/' + path;
      self.getPath(function (weexPath) {
        url = weexPath + path;
        self.runGo(url);
      });
    } else {
      self.runGo(url);
    }
  },
  runGo: function runGo(url) {
    //mm.toast({message:url, duration: 2 })
    navigator.push({
      url: url,
      animated: "true"
    }, function (event) {});
  },
  getPath: function getPath(callBack) {
    bridgeModule.getWeexPath(function (resData) {
      //mm.toast({message:"log"+resData, duration: 5 })
      var jsonData = JSON.parse(resData);
      var weexPath = jsonData.weexPath;
      callBack(weexPath);
    });
  },
  goBack: function goBack() {
    var params = {
      animated: 'true'
    };
    navigator.pop(params, function () {});
  },
  backToNative: function backToNative() {
    bridgeModule.backToNative();
  },
  getApplianceID: function getApplianceID(callBack) {
    var self = this;
    var finalCallBack = function finalCallBack(resData) {
      var jsonData = JSON.parse(resData);
      self.setItem("masterId", jsonData.devId);
      callBack(jsonData.devId);
    };
    if (dummy != true) {
      bridgeModule.getApplianceID(finalCallBack);
    } else {
      self.setItem("masterId", "123123");
      callBack("0");
    }
  },
  getDetailParams: function getDetailParams(callBack) {
    var finalCallBack = function finalCallBack(resData) {
      var jsonData = JSON.parse(resData);
      callBack(jsonData);
    };
    if (dummy != true) {
      bridgeModule.getDetailParams(finalCallBack);
    } else {
      callBack({ "modelid": "jiayun.switch.003" });
    }
  },
  shareMsg: function shareMsg(params) {
    if (dummy != true) {
      bridgeModule.shareMsg(JSON.stringify(params));
    }
  },
  updateAreaDevice: function updateAreaDevice(params, callback) {
    if (dummy != true) {
      bridgeModule.updateAreaDevice(JSON.stringify(params), callback);
    }
  },
  b2bDelGateway: function b2bDelGateway(nodeid) {
    var obj = {};
    obj.nodeid = nodeid;
    if (dummy != true) {
      bridgeModule.b2bDelGateway(JSON.stringify(obj));
    }
  },
  b2bUpdateGateway: function b2bUpdateGateway(obj, callback) {
    if (dummy != true) {
      bridgeModule.b2bUpdateGateway(JSON.stringify(obj), callback);
    }
  },
  showLoading: function showLoading() {
    if (dummy != true) {
      bridgeModule.showLoading();
    }
  },
  hideLoading: function hideLoading() {
    if (dummy != true) {
      bridgeModule.hideLoading();
    }
  },
  updateTitle: function updateTitle(title, showLeftBtn, showRightBtn) {
    var params = {
      title: title,
      showLeftBtn: showLeftBtn,
      showRightBtn: showRightBtn
    };
    if (dummy != true) {
      bridgeModule.updateTitle(JSON.stringify(params));
    }
  },
  call: function call(name, params, successFunc, failFunc) {
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
          failFunc = function failFunc() {};
        }
        if (successFunc != undefined) {
          var finalSuccFunc = function finalSuccFunc(resData) {
            var jsonData = JSON.parse(resData);
            successFunc(jsonData);
          };
        }
        bridgeModule.b2bAction(sendData, finalSuccFunc, failFunc);
      });
    } else {
      successFunc(mockArray[name]);
    }
  },
  initMockData: function initMockData(jsonObj) {
    for (var key in jsonObj) {
      mockArray[key] = jsonObj[key];
    }
  },
  isMyHouse: function isMyHouse(callBack) {
    var self = this;
    var finalCallBack = function finalCallBack(resData) {
      var jsonData = JSON.parse(resData);
      self.setItem("isMyHouse", jsonData.houseType);
      callBack(jsonData.houseType);
    };
    if (dummy != true) {
      bridgeModule.getHouseType(finalCallBack);
    } else {
      callBack(0);
      self.setItem("isMyHouse", 1);
    }
  },
  genMessageId: function genMessageId() {
    var messageId = '';
    for (var i = 0; i < 8; i++) {
      messageId += Math.floor(Math.random() * 10).toString();
    }
    return messageId;
  },
  getItem: function getItem(key, callback) {
    storage.getItem(key, callback);
  },
  setItem: function setItem(key, value) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
      value = JSON.stringify(value);
      //mm.toast({message:value, duration: 2 })
    }
    storage.setItem(key, value, function (event) {
      console.log('set success');
    });
  },
  removeItem: function removeItem(key) {
    var _this = this;

    storage.removeItem(key, function (event) {
      console.log('delete value:', event.data);
      _this.state = 'deleted';
    });
  },
  toast: function toast(message, duration) {
    mm.toast({ message: message, duration: duration || 1 });
  },
  alert: function alert(message, callback, okTitle) {
    var callbackFunc = callback || function (value) {};
    mm.alert({
      message: message,
      okTitle: okTitle || "确定"
    }, function (value) {
      callbackFunc(value);
    });
  },
  confirm: function confirm(message, callback, okTitle, cancelTitle) {
    mm.confirm({
      message: message,
      okTitle: okTitle || '确定',
      cancelTitle: cancelTitle || '取消'
    }, function (result) {
      callback(result);
    });
  },
  getDeviceSN: function getDeviceSN(callback, callbackFail) {
    var finalCallBack = function finalCallBack(resData) {
      if (typeof resData == 'string') {
        resData = JSON.parse(resData);
      }
      callback(resData.deviceSN);
    };
    if (dummy != true) {
      bridgeModule.getDeviceSN(finalCallBack, callbackFail);
    } else {
      callback(0);
    }
  },
  getCurrentApplianceID: function getCurrentApplianceID(callback, callbackFail) {
    var finalCallBack = function finalCallBack(resData) {
      if (typeof resData == 'string') {
        resData = JSON.parse(resData);
      }
      callback(resData.applianceID);
    };
    if (dummy != true) {
      bridgeModule.getCurrentApplianceID(finalCallBack, callbackFail);
    } else {
      callback(0);
    }
  },
  getApplianceSubtype: function getApplianceSubtype(callback, callbackFail) {
    var finalCallBack = function finalCallBack(resData) {
      if (typeof resData == 'string') {
        resData = JSON.parse(resData);
      }
      callback(resData.applianceSubtype);
    };
    if (dummy != true) {
      bridgeModule.getApplianceSubtype(finalCallBack, callbackFail);
    } else {
      callback(0);
    }
  },
  startCmdProcess: function startCmdProcess(name, messageBody, callback, callbackFail) {
    var param = {};
    if (messageBody != undefined) {
      param.messageBody = messageBody;
    }
    var finalCallBack = function finalCallBack(resData) {
      //mm.toast({message:resData, duration:3});
      if (typeof resData == 'string') {
        resData = JSON.parse(resData);
      }
      if (resData.errorCode != 0) {
        callbackFail(resData);
      } else {
        callback(resData.messageBody);
      }
    };
    var finalCallbackFail = function finalCallbackFail(resData) {
      if (typeof resData == 'string') {
        resData = JSON.parse(resData);
      }
      callbackFail(resData);
    };
    if (dummy != true) {
      bridgeModule.startCmdProcess(JSON.stringify(param), finalCallBack, finalCallbackFail);
    } else {
      callback(mockArray[name].messageBody);
    }
  },
  sendLuaRequest: function sendLuaRequest(params, callback, callbackFail) {
    var param = {};
    param.operation = params.operation || "luaControl"; //luaQuery or luaControl
    param.params = params.data || {};
    var finalCallBack = function finalCallBack(resData) {
      //mm.toast({message:resData, duration:3});
      if (typeof resData == 'string') {
        resData = JSON.parse(resData);
      }
      if (resData.errorCode != 0) {
        callbackFail(resData);
      } else {
        callback(resData);
      }
    };
    var finalCallbackFail = function finalCallbackFail(resData) {
      if (typeof resData == 'string') {
        resData = JSON.parse(resData);
      }
      callbackFail(resData);
    };
    if (dummy != true) {
      bridgeModule.commandInterface(JSON.stringify(param), finalCallBack, finalCallbackFail);
    } else {
      callback(mockArray[params.name]);
    }
  }
};

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(2)
)

/* script */
__vue_exports__ = __webpack_require__(3)

/* template */
var __vue_template__ = __webpack_require__(5)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "E:\\weex\\auto\\src\\component\\button.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-20dfb164"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = {
  "btn-wrapper": {
    "marginTop": 20,
    "marginBottom": 20,
    "alignItems": "center"
  },
  "midea-btn": {
    "width": 702,
    "height": 84,
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": 12
  },
  "btn-text": {
    "textOverflow": "ellipsis",
    "lines": 1,
    "fontSize": 32,
    "color": "#FFFFFF"
  },
  "green": {
    "backgroundColor:active": "#00A9EF"
  },
  "delete": {
    "backgroundColor:active": "#EB6560"
  },
  "refresh": {
    "backgroundColor:active": "#9FA0A0"
  },
  "gray": {
    "backgroundColor:active": "#eeeeee"
  },
  "disabled": {
    "backgroundColor:active": "rgba(0,0,0,0.1)"
  }
}

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var CRC8_BABLE = [0, 0xFF & 94, 0xFF & 188, 0xFF & 226, 0xFF & 97, 0xFF & 63, 0xFF & 221, 0xFF & 131, 0xFF & 194, 0xFF & 156, 0xFF & 126, 0xFF & 32, 0xFF & 163, 0xFF & 253, 0xFF & 31, 0xFF & 65, 0xFF & 157, 0xFF & 195, 0xFF & 33, 0xFF & 127, 0xFF & 252, 0xFF & 162, 0xFF & 64, 0xFF & 30, 0xFF & 95, 0xFF & 1, 0xFF & 227, 0xFF & 189, 0xFF & 62, 0xFF & 96, 0xFF & 130, 0xFF & 220, 0xFF & 35, 0xFF & 125, 0xFF & 159, 0xFF & 193, 0xFF & 66, 0xFF & 28, 0xFF & 254, 0xFF & 160, 0xFF & 225, 0xFF & 191, 0xFF & 93, 0xFF & 3, 0xFF & 128, 0xFF & 222, 0xFF & 60, 0xFF & 98, 0xFF & 190, 0xFF & 224, 0xFF & 2, 0xFF & 92, 0xFF & 223, 0xFF & 129, 0xFF & 99, 0xFF & 61, 0xFF & 124, 0xFF & 34, 0xFF & 192, 0xFF & 158, 0xFF & 29, 0xFF & 67, 0xFF & 161, 0xFF & 255, 0xFF & 70, 0xFF & 24, 0xFF & 250, 0xFF & 164, 0xFF & 39, 0xFF & 121, 0xFF & 155, 0xFF & 197, 0xFF & 132, 0xFF & 218, 0xFF & 56, 0xFF & 102, 0xFF & 229, 0xFF & 187, 0xFF & 89, 0xFF & 7, 0xFF & 219, 0xFF & 133, 0xFF & 103, 0xFF & 57, 0xFF & 186, 0xFF & 228, 0xFF & 6, 0xFF & 88, 0xFF & 25, 0xFF & 71, 0xFF & 165, 0xFF & 251, 0xFF & 120, 0xFF & 38, 0xFF & 196, 0xFF & 154, 0xFF & 101, 0xFF & 59, 0xFF & 217, 0xFF & 135, 0xFF & 4, 0xFF & 90, 0xFF & 184, 0xFF & 230, 0xFF & 167, 0xFF & 249, 0xFF & 27, 0xFF & 69, 0xFF & 198, 0xFF & 152, 0xFF & 122, 0xFF & 36, 0xFF & 248, 0xFF & 166, 0xFF & 68, 0xFF & 26, 0xFF & 153, 0xFF & 199, 0xFF & 37, 0xFF & 123, 0xFF & 58, 0xFF & 100, 0xFF & 134, 0xFF & 216, 0xFF & 91, 0xFF & 5, 0xFF & 231, 0xFF & 185, 0xFF & 140, 0xFF & 210, 0xFF & 48, 0xFF & 110, 0xFF & 237, 0xFF & 179, 0xFF & 81, 0xFF & 15, 0xFF & 78, 0xFF & 16, 0xFF & 242, 0xFF & 172, 0xFF & 47, 0xFF & 113, 0xFF & 147, 0xFF & 205, 0xFF & 17, 0xFF & 79, 0xFF & 173, 0xFF & 243, 0xFF & 112, 0xFF & 46, 0xFF & 204, 0xFF & 146, 0xFF & 211, 0xFF & 141, 0xFF & 111, 0xFF & 49, 0xFF & 178, 0xFF & 236, 0xFF & 14, 0xFF & 80, 0xFF & 175, 0xFF & 241, 0xFF & 19, 0xFF & 77, 0xFF & 206, 0xFF & 144, 0xFF & 114, 0xFF & 44, 0xFF & 109, 0xFF & 51, 0xFF & 209, 0xFF & 143, 0xFF & 12, 0xFF & 82, 0xFF & 176, 0xFF & 238, 0xFF & 50, 0xFF & 108, 0xFF & 142, 0xFF & 208, 0xFF & 83, 0xFF & 13, 0xFF & 239, 0xFF & 177, 0xFF & 240, 0xFF & 174, 0xFF & 76, 0xFF & 18, 0xFF & 145, 0xFF & 207, 0xFF & 45, 0xFF & 115, 0xFF & 202, 0xFF & 148, 0xFF & 118, 0xFF & 40, 0xFF & 171, 0xFF & 245, 0xFF & 23, 0xFF & 73, 0xFF & 8, 0xFF & 86, 0xFF & 180, 0xFF & 234, 0xFF & 105, 0xFF & 55, 0xFF & 213, 0xFF & 139, 0xFF & 87, 0xFF & 9, 0xFF & 235, 0xFF & 181, 0xFF & 54, 0xFF & 104, 0xFF & 138, 0xFF & 212, 0xFF & 149, 0xFF & 203, 0xFF & 41, 0xFF & 119, 0xFF & 244, 0xFF & 170, 0xFF & 72, 0xFF & 22, 0xFF & 233, 0xFF & 183, 0xFF & 85, 0xFF & 11, 0xFF & 136, 0xFF & 214, 0xFF & 52, 0xFF & 106, 0xFF & 43, 0xFF & 117, 0xFF & 151, 0xFF & 201, 0xFF & 74, 0xFF & 20, 0xFF & 246, 0xFF & 168, 0xFF & 116, 0xFF & 42, 0xFF & 200, 0xFF & 150, 0xFF & 21, 0xFF & 75, 0xFF & 169, 0xFF & 247, 0xFF & 182, 0xFF & 232, 0xFF & 10, 0xFF & 84, 0xFF & 215, 0xFF & 137, 0xFF & 107, 0xFF & 53];
exports.default = {
	convertTo16Str: function convertTo16Str(byteArray) {
		var str16 = new Array();
		if (byteArray == undefined) {
			return str16.join('');
		}
		for (var i = 0; i < byteArray.length; i++) {
			if (byteArray[i].toString(16).length == 1) {
				str16.push("0" + byteArray[i].toString(16).toUpperCase());
			} else {
				str16.push(byteArray[i].toString(16).toUpperCase());
			}
		}
		return str16.join('');
	},
	convertTo2Str: function convertTo2Str(byteArray) {
		var str2 = new Array();
		if (byteArray == undefined) {
			return str2.join('');
		}
		for (var i = 0; i < byteArray.length; i++) {
			if (byteArray[i].toString(2).length != 8) {
				var appendStr = "00000000".substring(0, 8 - byteArray[i].toString(2).length);
				str2.push(appendStr + byteArray[i].toString(2));
			} else {
				str2.push(byteArray[i].toString(2));
			}
		}
		return str2.join('');
	},
	loadByStr16: function loadByStr16(str16) {
		var byteArray = new Array();
		if (str16 == undefined) {
			return byteArray;
		}
		var data = str16;
		for (var i = 0; i < data.length; i++) {
			if (i % 2 == 0) {
				byteArray[i / 2] = parseInt(data.substring(i, i + 2));
			}
		}
		return byteArray;
	},
	initBytes: function initBytes(pBytes, pValue) {
		for (var i = 0; i < pBytes.length; i++) {
			pBytes[i] = pValue & 0xFF;
		}
		return pBytes;
	},
	setByte: function setByte(pBytes, pIndex, pValue) {
		pBytes[pIndex] = pValue & 0xFF;
		return pBytes;
	},
	getByte: function getByte(pBytes, pIndex) {
		return pBytes[pIndex] & 0xFF;
	},
	_setBit: function _setBit(pByte, pIndex, pValue) {
		pByte = pByte & (~(0x01 << pIndex) & 0xFF) | (pValue & 0x01) << pIndex;
		return pByte;
	},
	_getBit: function _getBit(pByte, pIndex) {
		return pByte >> pIndex & 0x01;
	},
	getBit: function getBit(pBytes, pIndex, pBitIndex) {
		return this._getBit(pBytes[pIndex], pBitIndex);
	},
	setBit: function setBit(pBytes, pIndex, pBitIndex, pValue) {
		pBytes[pIndex] = this._setBit(pBytes[pIndex], pBitIndex, pValue);
		return pBytes;
	},
	_getBits: function _getBits(pByte, pStartIndex, pEndIndex) {
		if (pStartIndex > pEndIndex) {
			return this._getBits(pByte, pEndIndex, pStartIndex);
		}
		var tempVal = 0x00;
		for (var i = pStartIndex; i <= pEndIndex; i++) {
			tempVal = tempVal | this._getBit(pByte, i) << i - pStartIndex;
		}
		return tempVal;
	},
	_setBits: function _setBits(pByte, pStartIndex, pEndIndex, pValue) {
		if (pStartIndex > pEndIndex) {
			return this._setBits(pByte, pEndIndex, pStartIndex, pValue);
		} else {
			for (var i = pStartIndex; i <= pEndIndex; i++) {
				pByte = this._setBit(pByte, i, this._getBit(pValue, i - pStartIndex));
			}
		}
		return pByte;
	},
	getBits: function getBits(pBytes, pIndex, pBitStartIndex, pBitEndIndex) {
		return this._getBits(pBytes[pIndex], pBitStartIndex, pBitEndIndex);
	},
	setBits: function setBits(pBytes, pIndex, pBitStartIndex, pBitEndIndex, pValue) {
		pBytes[pIndex] = this._setBits(pBytes[pIndex], pBitStartIndex, pBitEndIndex, pValue);
		return pBytes;
	},
	createMessage: function createMessage(pApplianceType, pMessageType, pMessageBody, pApplianceProtocolVersion) {
		var _applianceId = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
		if (pApplianceProtocolVersion != undefined) {
			_applianceId[5] = pApplianceProtocolVersion & 0xFF;
		}
		var _bytesMessage = new Array();
		_bytesMessage.push(0xAA);
		if (pMessageBody == undefined || pMessageBody.length == 0) {
			_bytesMessage.push(0x0A);
		} else {
			_bytesMessage.push(0x0A + pMessageBody.length);
		}
		_bytesMessage.push(pApplianceType);
		_bytesMessage = _bytesMessage.concat(_applianceId);
		_bytesMessage.push(pMessageType);
		if (pMessageBody == undefined || pMessageBody.length == 0) {} else {
			_bytesMessage = _bytesMessage.concat(pMessageBody);
		}
		var sumContent = 0x00;
		if (pMessageBody == undefined || pMessageBody.length == 0) {} else {
			for (var i = 0; i < pMessageBody.length; i++) {
				sumContent = sumContent + pMessageBody[i];
			}
		}
		_bytesMessage.push(~(_bytesMessage[1] + _bytesMessage[2] + _bytesMessage[3] + _bytesMessage[4] + _bytesMessage[5] + _bytesMessage[7] + _bytesMessage[8] + _bytesMessage[9] + sumContent) + 1 & 0xFF);
		return _bytesMessage;
	},
	createMessageBody: function createMessageBody(pLen) {
		var _bytesMessage = new Array(pLen);
		this.initBytes(_bytesMessage, 0x00);
		return _bytesMessage;
	},
	createMessageBodyFA: function createMessageBodyFA(pLen) {
		var _bytesMessage = new Array(pLen);
		this.initBytes(_bytesMessage, 0x00);
		// 修改对应：例如摇头和定时这两种状态都会随着机器工作 而变化，如果APP总 是靠 着之前记忆的 数据 发送控制命 令，就会影响机器工作的状态。特别是定时。
		// mdSmart.message.setByte(_bytesMessage,8,0x80);
		// mdSmart.message.setByte(_bytesMessage,14,0xFF);

		this.setBit(_bytesMessage, 4, 7, 0x01); //默认0 1不控制开关机
		this.setBit(_bytesMessage, 8, 7, 0x01); //默认0 1不控制摇头
		return _bytesMessage;
	},
	CRC8: function CRC8(pBytes) {
		var crc8Byte = 0x00;
		for (var index = 0; index < pBytes.length - 1; index++) {
			crc8Byte = 0xFF & CRC8_BABLE[0xFFFF & (0x00FF & (crc8Byte ^ pBytes[index]))];
		}
		return crc8Byte;
	},
	converMessageToBridgePStr: function converMessageToBridgePStr(pMessage) {
		return JSON.stringify({
			messageBody: pMessage
		});
	},
	getApplianceProtocolVersion: function getApplianceProtocolVersion(pMessage) {
		return pMessage[8] & 0xFF;
	}
};

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	"messageBody": [170, 30, 23, 0, 0, 0, 0, 0, 0, 3, 1, 1, 15, 2, 180, 30, 180, 120, 0, 0]
};

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    "errorCode": 0,
    "params": {
        "power": "on",
        "mode": "auto",
        "temperature": "25",
        "small_temperature": "0.5",
        "indoor_temperature": "30",
        "outdoor_temperature": "-25",
        "error_code": "1"
    }
};

/***/ }),

/***/ 292:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var App = __webpack_require__(55);
App.el = '#root';
new Vue(App);

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//

var _btnType = __webpack_require__(4);

exports.default = {
  props: {
    text: {
      type: String,
      default: '确认'
    },
    type: {
      type: String,
      default: 'green'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    btnStyle: Object,
    textStyle: Object
  },
  computed: {
    defaultBtnStyle: function defaultBtnStyle() {
      var type = this.type,
          disabled = this.disabled,
          btnStyle = this.btnStyle;

      var defaultBtnStyle = _extends({}, _btnType.STYLE_MAP[type], btnStyle);
      return disabled ? _extends({}, defaultBtnStyle, {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 0
      }) : defaultBtnStyle;
    },
    defaultTextStyle: function defaultTextStyle() {
      var type = this.type,
          disabled = this.disabled,
          textStyle = this.textStyle;

      var defaultTextStyle = _extends({}, _btnType.TEXT_STYLE_MAP[type], textStyle);
      return disabled ? _extends({}, defaultTextStyle, { color: '#FFFFFF' }) : defaultTextStyle;
    }
  },
  methods: {
    onClicked: function onClicked(e) {
      var type = this.type,
          disabled = this.disabled;

      this.$emit('mideaButtonClicked', { e: e, type: type, disabled: disabled });
    }
  }
};

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var STYLE_MAP = exports.STYLE_MAP = {
  green: {
    backgroundColor: '#00B9EF'
  },
  gray: {
    backgroundColor: '#CCC'
  },
  disabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  delete: {
    backgroundColor: '#FFF',
    borderColor: '#EB6560',
    borderWidth: '1px'
  },
  refresh: {
    backgroundColor: '#FFFFFF',
    borderColor: '#9FA0A0',
    borderWidth: '1px'
  }
};

var TEXT_STYLE_MAP = exports.TEXT_STYLE_MAP = {
  green: {
    color: '#FFFFFF'
  },
  delete: {
    color: '#EB6560'
  },
  refresh: {
    color: '#9FA0A0'
  },
  gray: {
    color: '#FFF'
  },
  disabled: {
    color: '#FFF'
  }
};

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["btn-wrapper"]
  }, [_c('div', {
    staticClass: ["midea-btn"],
    class: [_vm.type],
    style: _vm.defaultBtnStyle,
    on: {
      "click": _vm.onClicked
    }
  }, [_c('text', {
    staticClass: ["btn-text"],
    style: _vm.defaultTextStyle
  }, [_vm._v(_vm._s(_vm.text))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(56)
)

/* script */
__vue_exports__ = __webpack_require__(57)

/* template */
var __vue_template__ = __webpack_require__(58)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "E:\\weex\\auto\\src\\T0xAC\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-067cecde"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ 56:
/***/ (function(module, exports) {

module.exports = {}

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});

var _button = __webpack_require__(1);

var _button2 = _interopRequireDefault(_button);

var _nativeService = __webpack_require__(0);

var _nativeService2 = _interopRequireDefault(_nativeService);

var _smartMessage = __webpack_require__(26);

var _smartMessage2 = _interopRequireDefault(_smartMessage);

var _query = __webpack_require__(27);

var _query2 = _interopRequireDefault(_query);

var _luaQuery = __webpack_require__(28);

var _luaQuery2 = _interopRequireDefault(_luaQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modal = weex.requireModule('modal'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var frameCumulative = 1;

exports.default = {
   components: { mideaButton: _button2.default },
   data: function data() {
      return {};
   },

   methods: {
      createQueryMessage: function createQueryMessage() {
         var messageBody = _smartMessage2.default.createMessageBody(25);
         _smartMessage2.default.setByte(messageBody, 0, 0x41);
         _smartMessage2.default.setByte(messageBody, 1, 0x81);
         _smartMessage2.default.setByte(messageBody, 2, 0x00);
         _smartMessage2.default.setByte(messageBody, 3, 0xFF);
         messageBody[4] = 3;
         messageBody[5] = 0xff;
         messageBody[7] = 2;
         //发送帧累加
         frameCumulative = frameCumulative + 1;
         if (frameCumulative > 0 && frameCumulative < 254) {
            _smartMessage2.default.setByte(messageBody, 23, frameCumulative);
         } else if (frameCumulative == 0 || frameCumulative == 254) {
            frameCumulative = 1;
            _smartMessage2.default.setByte(messageBody, 23, frameCumulative);
         }
         _smartMessage2.default.setByte(messageBody, 24, _smartMessage2.default.CRC8(messageBody));
         this.sendMessage = _smartMessage2.default.createMessage(0xAC, 0x03, messageBody);
         //nativeService.alert(sendMessage);
      },
      queryStatus: function queryStatus() {
         _nativeService2.default.showLoading();
         this.createQueryMessage();
         _nativeService2.default.startCmdProcess("query", this.sendMessage, function (result) {
            _nativeService2.default.hideLoading();
            _nativeService2.default.alert(JSON.stringify(result));
         }, function (result) {
            _nativeService2.default.hideLoading();
            _nativeService2.default.toast("查询失败" + JSON.stringify(result));
         });
      },
      luaQueryStatus: function luaQueryStatus() {
         var params = {
            name: "luaQuery",
            operation: "luaQuery",
            data: {}
         };
         _nativeService2.default.showLoading();
         _nativeService2.default.sendLuaRequest(params, function (result) {
            _nativeService2.default.hideLoading();
            _nativeService2.default.alert(JSON.stringify(result));
         }, function (result) {
            _nativeService2.default.hideLoading();
            _nativeService2.default.toast("查询失败" + JSON.stringify(result));
         });
      },
      getDeviceSN: function getDeviceSN() {
         _nativeService2.default.getDeviceSN(function (result) {
            _nativeService2.default.alert(result);
         }, function () {
            _nativeService2.default.toast("获取失败");
         });
      },
      getDevId: function getDevId() {
         _nativeService2.default.getCurrentApplianceID(function (result) {
            _nativeService2.default.alert(result);
         }, function () {
            _nativeService2.default.toast("获取失败");
         });
      },
      getDevSubtype: function getDevSubtype() {
         _nativeService2.default.getApplianceSubtype(function (result) {
            _nativeService2.default.alert(result);
         }, function () {
            _nativeService2.default.toast("获取失败");
         });
      },
      showLoading: function showLoading() {
         _nativeService2.default.showLoading();
         setTimeout(function () {
            _nativeService2.default.hideLoading();
         }, 2000);
      },
      hideLoading: function hideLoading() {
         _nativeService2.default.hideLoading();
      },
      goTo: function goTo() {
         var path = "next.js";
         _nativeService2.default.goTo(path);
      },
      getPath: function getPath() {
         _nativeService2.default.getPath(function (path) {
            _nativeService2.default.alert(path);
         });
      },
      backToNative: function backToNative() {
         _nativeService2.default.backToNative();
      }
   },
   created: function created() {
      _nativeService2.default.initMockData({
         "query": _query2.default,
         "luaQuery": _luaQuery2.default
      });
   }
};

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('scroller', [_c('midea-button', {
    attrs: {
      "text": "查询设备状态",
      "type": "green"
    },
    on: {
      "mideaButtonClicked": _vm.queryStatus
    }
  }), _c('midea-button', {
    attrs: {
      "text": "LUA查询设备状态",
      "type": "green"
    },
    on: {
      "mideaButtonClicked": _vm.luaQueryStatus
    }
  }), _c('midea-button', {
    attrs: {
      "text": "获取SN",
      "type": "green"
    },
    on: {
      "mideaButtonClicked": _vm.getDeviceSN
    }
  }), _c('midea-button', {
    attrs: {
      "text": "获取家电ID",
      "type": "green"
    },
    on: {
      "mideaButtonClicked": _vm.getDevId
    }
  }), _c('midea-button', {
    attrs: {
      "text": "获取家电子类型",
      "type": "green"
    },
    on: {
      "mideaButtonClicked": _vm.getDevSubtype
    }
  }), _c('midea-button', {
    attrs: {
      "text": "显示原生loading",
      "type": "green"
    },
    on: {
      "mideaButtonClicked": _vm.showLoading
    }
  }), _c('midea-button', {
    attrs: {
      "text": "隐藏原生loading",
      "type": "green"
    },
    on: {
      "mideaButtonClicked": _vm.hideLoading
    }
  }), _c('midea-button', {
    attrs: {
      "text": "页面跳转",
      "type": "green"
    },
    on: {
      "mideaButtonClicked": _vm.goTo
    }
  }), _c('midea-button', {
    attrs: {
      "text": "返回到原生页面",
      "type": "green"
    },
    on: {
      "mideaButtonClicked": _vm.backToNative
    }
  }), _c('midea-button', {
    attrs: {
      "text": "获取页面路径",
      "type": "green"
    },
    on: {
      "mideaButtonClicked": _vm.getPath
    }
  })], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });