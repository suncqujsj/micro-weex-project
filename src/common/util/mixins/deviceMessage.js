/**
 * Created by sf
 * 2018/10/22
 */

import cmdFun from "../command/util.js"; //解析指令
import nativeService from "@/common/services/nativeService";
import modeConfig from "@/common/mapping/modeConfig";
import fireConfig from "@/common/mapping/fireConfig";
const globalEvent = weex.requireModule("globalEvent");
const storage = weex.requireModule("storage");
const deviceMessageMixin = {
  data() {
    return {
      loading: false,
      device: null,
      tabs: null,
      doorStatus: 0,
    };
  },
  methods: {
    modeTextSec(modeValue) {
      let modeSec = "";
      for (var key in modeConfig) {
        if (modeConfig[key].value === modeValue) {
          modeSec = key;
        }
      }
      return modeSec;
    },
    fireTextSec(fireValue) {
      let modeSec = "";
      for (var key in fireConfig) {
        if (fireConfig[key].value === fireValue) {
          modeSec = key;
        }
      }
      return modeSec;
    },
    viewdisappear() {
      globalEvent.removeEventListener("receiveMessage");
      globalEvent.removeEventListener("receiveMessageFromApp");
      clearInterval(this.queryTimer);
      clearInterval(this.countDownTimer);
    },
    viewappear() {
      this.listenerDeviceReiveMessage();
    },
    onlongpressQuery() {
      //隐藏调试，查看设备上报数据
      nativeService.getDeviceInfo().then(function (data) {
        nativeService.alert(data);
      });

      let params = {
        operation: "luaQuery",
        params: {}
      };
      nativeService.showLoading();
      nativeService
        .sendLuaRequest(params)
        .then(resp => {
          nativeService.hideLoading();
          nativeService.alert(resp);
        })
        .catch(error => {
          nativeService.hideLoading();
          nativeService.toast("查询失败");
        });
    },
    onlongpressGoToMenu() {
      //隐藏查看云菜谱
      nativeService.weexBundleToWeb({
        url: "http://39.108.117.20/dist/build_index.html#/",
        title: "云菜谱"
      });
    },
    childLock: function (childLock) {
      if (this.loading) return;

      this.loading = true;
      let context = this;
      let params = {
        operation: "luaControl",
        params: {
          lock: childLock ? "on" : "off"
        }
      };
      nativeService
        .sendLuaRequest(params)
        .then(resp => {
          context.loading = false;
          context.statisticsUpload({
            subAction: "child_lock_click",
            action_result: childLock
          });
          context.queryStatus();
        })
        .catch(error => {
          context.loading = false;
          // nativeService.toast("控制失败");
        });
    },
    goTo(url) {
      let path = url + ".js";
      nativeService.goTo(path, { animated: false, replace: true });
    },
    queryRunTimer(timeSet) {
      var self = this;
      this.queryTimer = setInterval(function () {
        self.queryStatus();
        // nativeService.toast(111);
      }, timeSet * 1000);
    },
    initData(tabs, device) {
      this.tabs = tabs;
      this.device = device;
    },
    queryStatus(
      tabs = this.tabs,
      device = this.device,
      cb = null,
      isFirstEnter = null
    ) {
      //传入模式配置数据tabs
      if (device) {
        this.initData(tabs, device);
      }
      if (isFirstEnter == "firstEnter") {
        nativeService.showLoading();
      }
      var context = this;

      let params = {
        operation: "luaQuery",
        params: {}
      };
      // nativeService.alert(params)
      nativeService
        .sendLuaRequest(params)
        .then(resp => {
          nativeService.hideLoading();
          let resultObj = resp.result;
          // nativeService.alert(resultObj);
          let getObj = context.tranformToInt(resultObj);
          let analysisObj = cmdFun.analysisLua(getObj, context.tabs);
          context.doorStatus = analysisObj.displaySign.doorSwitch;
          context.analysisFun(analysisObj, context.tabs);

          if (typeof cb === "function") {
            cb();
          }
        })
        .catch(error => {
          nativeService.hideLoading();
          // nativeService.toast("查询失败");
        });
    },
    sendLightCmd(lightValue) {
      let context = this;
      nativeService.showLoading();

      let params = {
        operation: "luaControl",
        params: {
          furnace_light: lightValue ? "off" : "on"
        }
      };
      // nativeService.alert(params);
      nativeService
        .sendLuaRequest(params)
        .then(resp => {
          nativeService.hideLoading();
          context.statisticsUpload({
            subAction: "light_click",
            action_result: lightValue ? 0 : 1
          });
          context.queryStatus();
        })
        .catch(error => {
          nativeService.hideLoading();
          // nativeService.toast("控制失败");
        });
    },
    setting(cmdObj) {
      this.statisticsUpload({ subAction: "edit_click" });
      if (!this.hasSetting) {
        return;
      }
      var _isRecipe = false;
      let { constant, tabs } = this;

      if (cmdObj.mode.value == 0xe0) {
        _isRecipe = true;
      }
      var _item = cmdFun.getCurrentModeItem(
        tabs,
        cmdObj.recipeId.value,
        cmdObj.mode.value,
        _isRecipe
      );

      this.modeText = _item.text;
      this.currentItem = _item;
      // nativeService.alert(_item);
      var time = cmdObj.timeRemaining.hour * 60 + cmdObj.timeRemaining.minute;
      if (_item.time.range && _item.time.range.length > 0) {
        let leastTime = _item.time.range[0];
        if (time < leastTime) {
          time = leastTime;
        }
      }
      this.current.time = time;
      this.current.second = cmdObj.timeRemaining.second;
      this.current.temperature = cmdObj.temperature.upLowTemperature;
      this.current.preheat = cmdObj.displaySign.preheat ? true : false;
      this.current.fireAmount = cmdObj.fire.value;
      this.current.steamAmount = cmdObj.steam.value;
      this.current.weight = cmdObj.weight.value;
      this.current.probeTemperature = cmdObj.probeSetttingTemperature.value;
      this.current.isProbeSettingTemperature =
        cmdObj.temperature.upLowTemperature;
      // this.currentItem.steamSwitch.default = cmdObj.steam.value?true:false;
      // nativeService.toast(this.current,3);
      this.openDialog();
    },
    controlDevice(jsonCmd, callbackData) {
      let context = this;

      // 蒸汽烤箱0TQN36QL判断探针温度与设定的常规温度
      if (this.device.extra1.sn8 == "0TQN36QL") {
        if (jsonCmd.isProbeSettingTemperature < jsonCmd.probeTemperature) {
          nativeService.toast("设定的温度不能低于探针温度哦");
          return;
        }
      }

      if (this.doorStatus) {
        nativeService.toast("主人，您的设备炉门开了");
        return;
      }
      let upTemp = jsonCmd.temperature,
        downTemp = jsonCmd.temperature;
      if (jsonCmd.upTemperature || jsonCmd.downTemperature) {
        //如果是上下烧烤 独立控温
        let abs_value = Math.abs(
          jsonCmd.upTemperature - jsonCmd.downTemperature
        );
        if (abs_value > 30) {
          nativeService.toast("上管与下管的温度相差不能超过30哦");
          return;
        }
        (upTemp = jsonCmd.upTemperature), (downTemp = jsonCmd.downTemperature);
      }

      if (parseInt(jsonCmd.temperature) < 100 && !this.isSmallOven(callbackData.device.type)) { // sf 不是小烤箱判断
        jsonCmd.preheat = false;
      }
      if (this.isWorking && jsonCmd.currentItem && jsonCmd.currentItem.preheat && jsonCmd.currentItem.preheat.hide) {//如果隐藏
        jsonCmd.preheat = false;
      }

      let modeSec = this.modeTextSec(jsonCmd.mode); //加载模式对应的json 字段表
      if (jsonCmd.mode === 0xE0) { //如果是自动菜单
        modeSec = 'auto_menu';
      }
      let sendParmas = {
        work_status: "work",
        work_mode: modeSec
      };
      if (jsonCmd.time) {
        var time = parseInt(jsonCmd.time);
        var hour = Math.floor(time / 60);
        var minute = time % 60;
        sendParmas.work_hour = hour;
        sendParmas.work_minute = minute;

        //sonCmd.time有小数（秒）的时候
        let num = jsonCmd.time;
        let str = num.toString().split('.');
        let getStr = str[1] != undefined ? str[1] : '';
        let getSecond = 0;
        var index = 6;
        if (getStr) {
          for (var i = 0; i < getStr.length; i++) {
            getSecond += parseInt(getStr[i]) * index;
            index = index / 10;
          }
        }
        sendParmas.work_second = parseInt(getSecond);
      }
      if (jsonCmd.preheat) { // 非探针预热设置 sf
        sendParmas.pre_heat = "on";
      }
      if (jsonCmd.temperature) {
        var temperature = parseInt(jsonCmd.temperature);
        if (temperature < 6) { //温度档位
          sendParmas.temperature_gear = temperature;
        } else {
          sendParmas.temperature = temperature;
        }
      }
      if (callbackData.working) {
        //工作类设置类
        sendParmas = { hour_set: hour, minute_set: minute, temp_set: temperature };

        if (jsonCmd.time && jsonCmd.isTimeChange && !jsonCmd.isTemperatureChange) {
          delete sendParmas.temp_set;
        }
        if (jsonCmd.temperature && jsonCmd.isTemperatureChange && !jsonCmd.isTimeChange) {
          delete sendParmas.hour_set;
          delete sendParmas.minute_set;
        }
      }
      if (jsonCmd.recipeId) {
        sendParmas.cloudmenuid = jsonCmd.recipeId;
      }
      if (jsonCmd.probe && callbackData.isProbe) {
        //假如当前插上探针，并且 该模式支持探针，则，do 探针开始类
      }
      if (callbackData.working && jsonCmd.probe && callbackData.isProbe) {
        //假如当前插上探针，并且 该模式支持探针，则，工作设置类,探针工作设置类
        delete sendParmas.work_mode;
      }
      if (jsonCmd.fireAmount) { //火力
        let fire = this.fireTextSec(parseInt(jsonCmd.fireAmount));
        sendParmas.fire_power = fire;
      }
      if (jsonCmd.weight) { //重量
        let weight = parseInt(jsonCmd.weight);
        sendParmas.weight = weight;
      }
      if (jsonCmd.steamAmount) { //蒸汽
        let steamAmount = parseInt(jsonCmd.steamAmount);
        sendParmas.steam_quantity = steamAmount;
      }
      if (jsonCmd.quantity) { //份量
        let quantity = parseInt(jsonCmd.quantity);
        sendParmas.people_number = quantity;
      }

      nativeService.showLoading();
      // nativeService.alert(sendParmas);
      let params = {
        operation: "luaControl",
        params: sendParmas
      };
      nativeService
        .sendLuaRequest(params)
        .then(resp => {
          nativeService.hideLoading();
          // let resultObj = resp.result;
          // //   nativeService.alert(resultObj);
          // let analysisObj = cmdFun.analysisLua(resultObj, context.tabs);
          // context.analysisFun(analysisObj, context.tabs);

          if (context.isStandby()) {
            context.fromStandBy = true;
            context.queryStatus(null, null, context.pageViewStatistics);
          } else {
            context.queryStatus();
          }
        })
        .catch(error => {
          nativeService.hideLoading();
          // nativeService.toast("控制失败" + JSON.stringify(error));
        });
    },

    startOrPause() {
      var context = this;
      var record = 3;
      if (this.btnText == this.getLanguage("pause")) {
        record = 6;
      }
      if (
        this.btnText == this.getLanguage("resume") ||
        this.btnText == this.getLanguage("start")
      ) {
        record = 3;
      }
      nativeService.showLoading();
      let params = {
        operation: "luaControl",

        params: {
          work_status: record === 3 ? "work" : "pause"
        }
      };
      nativeService
        .sendLuaRequest(params)
        .then(resp => {
          nativeService.hideLoading();
          context.statisticsUpload({
            subAction: "pause_continue_click",
            action_result: record
          });
          context.queryStatus();
        })
        .catch(error => {
          nativeService.hideLoading();
          // nativeService.toast("控制失败" + JSON.stringify(error));
        });
    },
    cancleWorking() {
      var context = this;
      nativeService.showLoading();
      let params = {
        operation: "luaControl",
        params: {
          work_status: "standby"
        }
      };
      nativeService
        .sendLuaRequest(params)
        .then(resp => {
          nativeService.hideLoading();
          context.queryStatus();
        })
        .catch(error => {
          nativeService.hideLoading();
          // nativeService.toast("控制失败" + JSON.stringify(error));
        });

    },

    getStorageItem(key) {
      // nativeService.alert('get:' + key);
      return new Promise(function (resolve, reject) {
        storage.getItem(key, event => {
          // nativeService.alert('get:' + event.data);
          resolve(event.data);
        });
      });
    },
    setStorageItem(key, value) {
      // nativeService.alert('set:' + key);
      return new Promise(function (resolve, reject) {
        storage.setItem(key, JSON.stringify(value), event => {
          nativeService.alert("get:" + event.data);
          resolve(event.data);
        });
      });
    },

    getDeviceInfo: function (key) {
      // nativeService.alert(key);
      let context = this;
      return this.getStorageItem(key).then(function (data) {
        // nativeService.alert(typeof data);
        // return;
        if (data === "undefined") {
          // nativeService.toast('comein', 3000);
          return nativeService.getDeviceInfo().then(function (data) {
            // nativeService.alert(data);
            return context.setStorageItem(key, data);
          });
        }

        // nativeService.alert(data);
        let dataJson = JSON.parse(data);
        if (dataJson && dataJson.result.deviceSn) {
          let deviceSn = dataJson.result.deviceSn;
          // nativeService.alert(deviceSn);
          return new Promise(function (resolve, reject) {
            resolve(deviceSn);
          });
        }
      });
    },

    tranformToInt(obj) {
      if (obj.cloudmenuid) {
        obj.cloudmenuid = parseInt(obj.cloudmenuid);
      }
      if (obj.work_hour) {
        obj.work_hour = parseInt(obj.work_hour);
      }
      if (obj.work_minute) {
        obj.work_minute = parseInt(obj.work_minute);
      }
      if (obj.work_second) {
        obj.work_second = parseInt(obj.work_second);
      }
      if (obj.tips_code) {
        obj.tips_code = parseInt(obj.tips_code);
      }
      if (obj.error_code) {
        obj.error_code = parseInt(obj.error_code);
      }
      if (obj.temperature) {
        obj.temperature = parseInt(obj.temperature);
      }
      if (obj.cur_temperature_above) {
        obj.cur_temperature_above = parseInt(obj.cur_temperature_above);
      }
      if (obj.cur_temperature_underside) {
        obj.cur_temperature_underside = parseInt(obj.cur_temperature_underside);
      }
      if (obj.hour_set) {
        obj.hour_set = parseInt(obj.hour_set);
      }
      if (obj.minute_set) {
        obj.minute_set = parseInt(obj.minute_set);
      }
      if (obj.second_set) {
        obj.second_set = parseInt(obj.second_set);
      }
      if (obj.reaction) {
        obj.reaction = parseInt(obj.reaction);
      }
      if (obj.steam_quantity) {
        obj.steam_quantity = parseInt(obj.steam_quantity);
      }
      if (obj.temperature_gear) {
        obj.temperature_gear = parseInt(obj.temperature_gear);
      }


      return obj;
    },

    listenerDeviceReiveMessage() {
      //传入模式配置数据
      let context = this;
      // lua返回字段有问题
      globalEvent.addEventListener("receiveMessage", function (e) {
        // nativeService.alert(e);
        nativeService.hideLoading();
        context.settingClickRecord = false;
        let obj = e.result;
        let getObj = context.tranformToInt(obj);
        var analysisObj = cmdFun.analysisLua(getObj, context.tabs);
        context.doorStatus = analysisObj.displaySign.doorSwitch;
        context.analysisFun(analysisObj, context.tabs);

      });
      //监听设备在线离线状态
      globalEvent.addEventListener("receiveMessageFromApp", data => {
        // 网络状态判断
        if (data.messageType === "networkStatusChanged") {
          if (data.messageBody.status === 1) {
            this.hideWarningDialog();
            return;
          }

          this.setWarningDialog("主人，您的手机没有网络。");
        }

        if (data && data.messageType == "deviceOnlineStatus") {
          if (data.messageBody && data.messageBody.onlineStatus == "online") {
            // this.onlineStatus = "1";
          } else if (
            data.messageBody &&
            data.messageBody.onlineStatus == "offline"
          ) {
            // this.onlineStatus = "0";
            nativeService.backToNative();
          } else {
            // this.onlineStatus = "0";
          }
        }
      });
    }
  }
};

export default deviceMessageMixin;
