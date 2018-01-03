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
/******/ 	return __webpack_require__(__webpack_require__.s = 293);
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

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var App = __webpack_require__(294);
App.el = '#root';
new Vue(App);

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(295)
)

/* script */
__vue_exports__ = __webpack_require__(296)

/* template */
var __vue_template__ = __webpack_require__(297)
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
__vue_options__.__file = "E:\\weex\\auto\\src\\T0xAC\\next.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-03b42404"
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

/***/ 295:
/***/ (function(module, exports) {

module.exports = {}

/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = __webpack_require__(1);

var _button2 = _interopRequireDefault(_button);

var _nativeService = __webpack_require__(0);

var _nativeService2 = _interopRequireDefault(_nativeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


var modal = weex.requireModule('modal');
var frameCumulative = 1;

exports.default = {
  components: { mideaButton: _button2.default },
  data: function data() {
    return {};
  },

  methods: {
    goBack: function goBack() {
      _nativeService2.default.goBack();
    }
  },
  created: function created() {}
};

/***/ }),

/***/ 297:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('midea-button', {
    attrs: {
      "text": "返回上一级",
      "type": "green"
    },
    on: {
      "mideaButtonClicked": _vm.goBack
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

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

/***/ })

/******/ });