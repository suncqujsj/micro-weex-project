// 本解析js专门针对 新协议，支持微蒸烤所有产品  Giggs

import nativeService from '@/common/services/nativeService';
import modeConfig from '@/common/mapping/modeConfig'
export default {
  //10进制转换8位2进制的方法
  whichCavity: 1,
  initAnalysisObj() {
    var obj = {
      workingState: {
        name: "工作状态", value: 0x00, view: { 1: "省电", 2: "待机", 3: "工作中", 4: "烹饪完成", 5: "预约中", 6: "暂停", 7: "云菜谱段间等待", 8: "爱心3秒" }
      },
      mode: {
        name: "烹饪模式", text: '', value: 0x00
      },
      recipeId: {
        name: "菜谱id", text: '', value: 0x00
      },
      displaySign: {
        name: "显示标志",
        lock: { name: "童锁", value: 0x00, view: { 0: "未锁", 1: "已锁" } },
        doorSwitch: { name: "门状态", value: 0x00, view: { 0: "门关", 1: "门开" } },
        waterBox: { name: "水箱位", value: 0x00, view: { 0: "有水箱", 1: "缺水箱" } },
        lackWater: { name: "缺水位", value: 0x00, view: { 0: "不缺水", 1: "缺水" } },
        changeWater: { name: "换水位", value: 0x00, view: { 0: "不需要换水", 1: "要换水" } },
        preheat: { name: "是否预热", value: 0x00, view: { 0: "非预热中", 1: "预热中" } },
        preheatTemperature: { name: "预热温度位", value: 0x00, view: { 0: "预热温度未到", 1: "预热温度已到" } },
        isError: { name: "是否故障", value: 0x00, view: { 0: "无故障", 1: "有故障" } },
      },
      timeRemaining: {
        name: "程序剩余时间",
        hour: { name: "小时", value: 0x00 },
        minute: { name: "分钟", value: 0x00 },
        second: { name: "秒", value: 0x00 },
      },
      temperature: {
        name: "发热管设置的温度",
        upHighTemperature: { name: "上管设置温度：高", value: 0x00 },
        upLowTemperature: { name: "上管设置温度：低", value: 0x00 },
        downHighTemperature: { name: "下管设置温度：高", value: 0x00 },
        downLowTemperature: { name: "下管设置温度：低", value: 0x00 },
      },
      realTemperature: {
        name: "发热管实际的温度",
        upHighTemperature: { name: "上管实际温度：高", value: 0x00 },
        upLowTemperature: { name: "上管实际温度：低", value: 0x00 },
        downHighTemperature: { name: "下管实际温度：高", value: 0x00 },
        downLowTemperature: { name: "下管实际温度：低", value: 0x00 },
      },
      light: {
        name: "炉灯",
        value: 0
      },
      isProbe: {
        name: "肉类探针模式",
        value: 0
      },
      probeRealTemperature: {
        name: "探针实际温度",
        value: 0
      },
      probeSetttingTemperature: {
        name: "探针设定温度",
        value: 0
      },
      fire: { name: "火力", value: 0x00 },
      weight: { name: "重量", value: 0x00 },
      steam: { name: "蒸汽量", value: 0x00 },
      timeSetting: {
        name: "程序设定总时间",
        hour: 0,
        minute: 0,
        second: 0,
      },
      menuFeel: {
        name: "感应菜单感应中",
        value: 0
      },
    };
    return obj;
  },
  tranformTo2Bit: function (val) {
    var _str_val = val.toString(2);
    var _str = "";
    if (_str_val.length < 8) {
      for (var i = 0; i < 8 - _str_val.length; i++) {
        _str += "0"; //补零
      }
    }
    var str_2 = _str + _str_val;
    return str_2;
  },
  cmdToEasy(sendCmd) { //16进制
    // var arr=[], message=sendCmd.slice(10,this.MSG_LENGTH-1);
    var arr = [], message = sendCmd;
    for (var i = 10, len = message.length; i < len; i++) {
      var obj = {};
      //obj.key=i+10;
      obj.key = i;
      obj.val = parseInt(message[i]).toString(16);
      arr.push(obj);
    }
    return arr;

  },
  cmdTo16Hex(sendCmd) {
    var cmd = "";
    for (var i = 0, len = sendCmd.length; i < len; i++) {
      var subCmd = parseInt(sendCmd[i]).toString(16).length == 1 ? "0" + parseInt(sendCmd[i]).toString(16) : parseInt(sendCmd[i]).toString(16);
      cmd += subCmd;
    }
    return cmd.toUpperCase();
  },
  getCurrentModeItem(tabs, recipeId, modeId, isRecipe) {
    // let tabs = _tabs;
    // if(_tabs[0].double){
    //   tabs = _tabs[this.whichCavity].tabs;
    // }
    var _item = {};
    if (tabs.length <= 1) {
      let modes = tabs[0].rows;
      for (var i = 0; i < modes.length; i++) {
        var iconButton = modes[i].iconButtons;
        for (var k = 0; k < iconButton.length; k++) {
          if (modeId == iconButton[k].mode) {
            _item = iconButton[k];
            break;
          }
        }
      }
    } else {
      if (isRecipe) {
        var autoMenu = tabs[0].rows;
        var currentModes = autoMenu;
        for (var i = 0; i < currentModes.length; i++) {
          var iconButtonsArr = currentModes[i].iconButtons;
          for (var r = 0; r < iconButtonsArr.length; r++) {
            var iconButtons = iconButtonsArr[r];
            for (var m = 0; m < iconButtons.length; m++) {
              if (recipeId == iconButtons[m].recipeId.default) {
                _item = iconButtons[m];
                break;
              }
            }
          }

        }
      } else {
        var modes = tabs[1].rows;
        var currentModes = modes;
        for (var i = 0; i < currentModes.length; i++) {
          var iconButtons = currentModes[i].iconButtons;
          for (var m = 0; m < iconButtons.length; m++) {

            if (modeId == currentModes[i].iconButtons[m].mode) {
              _item = currentModes[i].iconButtons[m];
              break;
            }

          }
        }
      }
    }
    return _item;
  },
  modeValueToModeText(recipeId, modeValue, tabs) {
    // nativeService.alert(_tabs);
    // let tabs = _tabs;
    // if(_tabs[0].double){
    //   tabs = _tabs[this.whichCavity].tabs;
    // }
    var text = '';
    var modeArr = [];
    var isRecipe = false;
    if (modeValue == 0xE0) { //如果是自动菜谱
      isRecipe = true;
    }

    if (tabs.length <= 1) {
      let modes = tabs[0].rows;
      for (var i = 0; i < modes.length; i++) {
        var iconButton = modes[i].iconButtons;
        for (var k = 0; k < iconButton.length; k++) {
          modeArr.push({
            'text': iconButton[k].text,
            'mode': iconButton[k].mode,
          })
        }
      }
    } else {
      if (isRecipe) {
        let autoMenu = tabs[0].rows;
        let currentModes = autoMenu;
        for (var i = 0; i < currentModes.length; i++) {
          var iconButtonsArr = currentModes[i].iconButtons;
          for (var r = 0; r < iconButtonsArr.length; r++) {
            var iconButtons = iconButtonsArr[r];
            for (var m = 0; m < iconButtons.length; m++) {
              if (recipeId == iconButtons[m].recipeId.default) {
                modeArr.push({
                  'text': iconButtons[m].text,
                  'mode': iconButtons[m].mode,
                })
              }
            }
          }

        }
      } else {
        let modes = tabs[1].rows;
        for (var i = 0; i < modes.length; i++) {
          var iconButton = modes[i].iconButtons;
          for (var k = 0; k < iconButton.length; k++) {
            modeArr.push({
              'text': iconButton[k].text,
              'mode': iconButton[k].mode,
            })
          }
        }
      }
    }
    //modeArr.push({'text': '自动菜谱','mode': 0xE0});

    for (var i = 0; i < modeArr.length; i++) {
      if (modeValue == modeArr[i].mode) {
        text = modeArr[i].text;
      }
    }
    //nativeService.alert(text);
    return text;
  },

  tranformToStausValue(work_status) {
    let val = 1;
    switch (work_status) {
      case 'save_power':
        val = 1;
        break;
      case 'standby':
        val = 2;
        break;
      case 'work':
        val = 3;
        break;
      case 'pause':
        val = 6;
        break;
      case 'pause_c':
        val = 7;
        break;
      case 'work_finish':
        val = 4;
        break;
      default:
        val = 1;
        break;
    }
    return val;
  },
  modeTovalue(work_mode) {
    let mode = work_mode || 'double_tube';
    let modeValue = modeConfig[mode].value;
    return modeValue;
  },

  //烤箱lua
  analysisLua: function (requestCmd, pages) {
    // nativeService.alert(requestCmd);
    var obj = this.initAnalysisObj();
    let tabs = pages[1].tabs;
    obj.workingState.value = this.tranformToStausValue(requestCmd.work_status2);
    if (obj.workingState.value === 3 || obj.workingState.value === 6) {
      this.isWorking = true;
    } else {
      this.isWorking = false;
    }
    var recipeId = requestCmd.cloudmenuid2 || 0;
    obj.recipeId.value = recipeId;
    obj.timeRemaining.hour = requestCmd.work_hour2 || 0;
    obj.timeRemaining.minute = requestCmd.work_minute2 || 0;
    obj.timeRemaining.second = requestCmd.work_second2 || 0;
    obj.mode.value = this.modeTovalue(requestCmd.work_mode2);
    obj.mode.text = this.modeValueToModeText(recipeId, obj.mode.value, tabs);

    //实际温度
    obj.realTemperature.upHighTemperature = requestCmd.cur_temperature_above2 || 0;
    obj.realTemperature.upLowTemperature = requestCmd.cur_temperature_above2 || 0;
    obj.realTemperature.downHighTemperature = requestCmd.cur_temperature_underside2 || 0;
    obj.realTemperature.downLowTemperature = requestCmd.cur_temperature_underside2 || 0;

    /*提醒代码tips_code 数字
    1		门没有关紧，提醒用户防止蒸汽烫伤	只读	
    2		缺水	只读	
    4		食物翻面	只读	
    5		搅拌	只读	
    6		缺水箱	只读	
    7		需要换水	只读	
    8		预热中	只读	
    */

    obj.displaySign.lock = requestCmd.lock2 === 'on' ? 1 : 0;
    obj.displaySign.doorSwitch = requestCmd.door_open2 === 'on' ? 1 : 0;
    this.doorStatus = requestCmd.door_open2 === 'on' ? 1 : 0;
    obj.displaySign.waterBox = requestCmd.tips_code2 === 6 ? 1 : 0;
    obj.displaySign.lackWater = requestCmd.tips_code2 === 2 ? 1 : 0;
    obj.displaySign.changeWater = requestCmd.tips_code2 === 7 ? 1 : 0;
    obj.displaySign.preheat = requestCmd.tips_code2 === 8 ? 1 : 0;
    obj.displaySign.preheatTemperature = requestCmd.tips_code2 === 9 ? 1 : 0;
    obj.displaySign.isError = requestCmd.error_code2 ? 1 : 0;

    obj.light.value = requestCmd.furnace_light2 === 'on' ? 1 : 0;
    // obj.isProbe.value = 0; //探针暂时没有返回
    // obj.highClearLock.value = 0; //高温自清洁锁暂时没有返回
    // obj.menuFeel.value = requestCmd.reaction2 ? 1 : 0;
    //设置温度

    obj.temperature.upHighTemperature = 0;
    obj.temperature.upLowTemperature = requestCmd.temperature2;
    obj.temperature.downHighTemperature = 0;
    obj.temperature.downLowTemperature = 0;

    //探针温度
    obj.probeRealTemperature.value = 0; //探针实际温度暂时没有返回
    obj.probeSetttingTemperature.value = 0; //探针设置温度暂时没有返回
    obj.temperature.unit = 0; //温度单位暂时没有返回

    obj.timeSetting.hour = (requestCmd.hour_set2 === 0xff ? 0 : requestCmd.hour_set2);
    obj.timeSetting.minute = (requestCmd.minute_set2 === 0xff ? 0 : requestCmd.minute_set2);
    obj.timeSetting.second = (requestCmd.second_set2 === 0xff ? 0 : requestCmd.second_set2);

    obj.fire.value = 0;  //parker: 火力不用*10了，统一用新协议0-10  ，lua 没有返回
    obj.weight.value = 0; //lua 没有返回
    obj.steam.value = 0; //lua 没有返回

    //上腔体蒸汽炉
    let upObj = this.analysisLuaUp(requestCmd, pages);
    let newObj = { 'down_cavity': obj, 'up_cavity': upObj };
    return newObj;
  },
  analysisLuaUp: function (requestCmd, pages) {
    // nativeService.alert(requestCmd);
    var obj = this.initAnalysisObj();
    let tabs = pages[0].tabs;
    obj.workingState.value = this.tranformToStausValue(requestCmd.work_status1);
    if (obj.workingState.value === 3 || obj.workingState.value === 6) {
      this.isWorking = true;
    } else {
      this.isWorking = false;
    }

    var recipeId = requestCmd.cloudmenuid1 || 0;
    obj.recipeId.value = recipeId;
    obj.timeRemaining.hour = requestCmd.work_hour1 || 0;
    obj.timeRemaining.minute = requestCmd.work_minute1 || 0;
    obj.timeRemaining.second = requestCmd.work_second1 || 0;
    obj.mode.value = this.modeTovalue(requestCmd.work_mode1);
    obj.mode.text = this.modeValueToModeText(recipeId, obj.mode.value, tabs);

    //实际温度
    obj.realTemperature.upHighTemperature = requestCmd.cur_temperature_above1 || 0;
    obj.realTemperature.upLowTemperature = requestCmd.cur_temperature_above1 || 0;
    obj.realTemperature.downHighTemperature = requestCmd.cur_temperature_underside1 || 0;
    obj.realTemperature.downLowTemperature = requestCmd.cur_temperature_underside1 || 0;

    /*提醒代码tips_code 数字
    1		门没有关紧，提醒用户防止蒸汽烫伤	只读	
    2		缺水	只读	
    4		食物翻面	只读	
    5		搅拌	只读	
    6		缺水箱	只读	
    7		需要换水	只读	
    8		预热中	只读	
    */

    obj.displaySign.lock = requestCmd.lock1 === 'on' ? 1 : 0;
    obj.displaySign.doorSwitch = requestCmd.door_open1 === 'on' ? 1 : 0;
    this.doorStatus = requestCmd.door_open1 === 'on' ? 1 : 0;
    obj.displaySign.waterBox = requestCmd.tips_code1 === 6 ? 1 : 0;
    obj.displaySign.lackWater = requestCmd.tips_code1 === 2 ? 1 : 0;
    obj.displaySign.changeWater = requestCmd.tips_code1 === 7 ? 1 : 0;
    obj.displaySign.preheat = requestCmd.tips_code1 === 8 ? 1 : 0;
    obj.displaySign.preheatTemperature = requestCmd.tips_code1 === 9 ? 1 : 0;
    obj.displaySign.isError = requestCmd.error_code1 ? 1 : 0;

    obj.light.value = requestCmd.furnace_light1 === 'on' ? 1 : 0;
    // obj.isProbe.value = 0; //探针暂时没有返回
    // obj.highClearLock.value = 0; //高温自清洁锁暂时没有返回
    // obj.menuFeel.value = requestCmd.reaction1 ? 1 : 0;
    //设置温度

    obj.temperature.upHighTemperature = 0;
    obj.temperature.upLowTemperature = requestCmd.temperature1;
    obj.temperature.downHighTemperature = 0;
    obj.temperature.downLowTemperature = 0;

    //探针温度
    obj.probeRealTemperature.value = 0; //探针实际温度暂时没有返回
    obj.probeSetttingTemperature.value = 0; //探针设置温度暂时没有返回
    obj.temperature.unit = 0; //温度单位暂时没有返回
    obj.timeSetting.hour = (requestCmd.hour_set1 === 0xff ? 0 : requestCmd.hour_set1);
    obj.timeSetting.minute = (requestCmd.minute_set1 === 0xff ? 0 : requestCmd.minute_set1);
    obj.timeSetting.second = (requestCmd.second_set1 === 0xff ? 0 : requestCmd.second_set1);

    obj.fire.value = 0;  //parker: 火力不用*10了，统一用新协议0-10  ，lua 没有返回
    obj.weight.value = 0; //lua 没有返回
    obj.steam.value = 0; //lua 没有返回

    return obj;
  },
};


