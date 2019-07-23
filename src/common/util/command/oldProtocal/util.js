// 本解析js专门针对 旧协议，支持微蒸烤所有产品

import message from "@/common/util/smartMessage";
import nativeService from '@/common/services/nativeService';
import modeConfig from '@/common/mapping/oldModeConfig'
export default {
  //10进制转换8位2进制的方法
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
    var _item = {};
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
      var modes = tabs[0].rows;
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

    return _item;
  },
  modeValueToModeText(recipeId, modeValue, tabs) {
    var text = '';
    var modeArr = [];
    var isRecipe = false;
    if (modeValue == 0xE0) { //如果是自动菜谱
      isRecipe = true;
    }
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
    }
    else {
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
    }

    //modeArr.push({'text': '自动菜谱','mode': 0xE0});

    for (var i = 0; i < modeArr.length; i++) {
      if (modeValue == modeArr[i].mode) {
        text = modeArr[i].text;
      }
    }
    // nativeService.alert(text);
    return text;
  },
  // 查询指令
  createQueryMessage(device) {
    var messageBody = message.createMessageBody(1);//createMessageBody默认从10开始，1表示11，2表示12....
    // message.setByte(messageBody, 0, 0);
    var sendMessage = message.createMessage(device.type, 0x03, messageBody);
    return sendMessage;
  },

  //控制启动指令
  createControlMessage(params, callbackData) {

    var upTemp = params.temperature, downTemp = params.temperature;
    if (params.upTemperature || params.downTemperature) {//如果是上下烧烤
      let abs_value = Math.abs(params.upTemperature - params.downTemperature);
      if (abs_value > 30) {
        nativeService.toast('上管与下管的温度相差不能超过30哦');
        return;
      }
      upTemp = params.upTemperature, downTemp = params.downTemperature;
    }
    var time = params.minute;
    var hour = Math.floor(time / 60);
    var minute = time % 60;
    var second = 0;
    var set_mode = params.mode;
    var messageBody = message.createMessageBody(13);

    message.setByte(messageBody, 0, params.preheat ? 0x08 : 0x02);
    message.setByte(messageBody, 1, set_mode);
    message.setByte(messageBody, 2, hour);
    message.setByte(messageBody, 3, minute);
    message.setByte(messageBody, 4, upTemp);
    message.setByte(messageBody, 5, 0x11);
    message.setByte(messageBody, 6, downTemp);
    message.setByte(messageBody, 9, second);
    var sendcmd = message.createMessage(callbackData.device.type, 0x02, messageBody);
    // nativeService.alert(this.cmdToEasy(sendcmd));
    return sendcmd;
  },
  //取消工作指令
  cmdCancelWork(device) {
    var messageBody = message.createMessageBody(13);
    message.setByte(messageBody, 0, 0x01);
    var sendMessage = message.createMessage(device.type, 0x02, messageBody);
    return sendMessage;
  },
  //暂停or继续指令
  cmdStartOrPause(record, device) {
    var messageBody = message.createMessageBody(13);
    message.setByte(messageBody, 0, record == 3 ? 0x02 : 0x03);
    var sendMessage = message.createMessage(device.type, 0x02, messageBody);
    return sendMessage;
  },
  //上锁
  cmdLock(params, device) {
    var messageBody = message.createMessageBody(13);
    message.setByte(messageBody, 0, params.childLock ? 0x05 : 0x0a);
    var sendMessage = message.createMessage(device.type, 0x02, messageBody);
    return sendMessage;
  },

  tranformToStausValue(requestCmd) {
    let val = 1;
    switch (requestCmd.work_status) {
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
  modeTovalue(requestCmd) {
    let mode = requestCmd.work_mode || 'double_tube';
    let modeValue = modeConfig[mode].value;
    return modeValue;
  },


  analysisLua: function (requestCmd, tabs) {
    // nativeService.alert(requestCmd);
    var obj = this.initAnalysisObj();
    obj.workingState.value = this.tranformToStausValue(requestCmd);
    if (obj.workingState.value === 3 || obj.workingState.value === 6) {
      this.isWorking = true;
    } else {
      this.isWorking = false;
    }

    var recipeId = requestCmd.cloudmenuid || 0;
    obj.recipeId.value = recipeId;
    obj.timeRemaining.hour = requestCmd.work_hour || 0;
    obj.timeRemaining.minute = requestCmd.work_minute || 0;
    obj.timeRemaining.second = requestCmd.work_second || 0;
    obj.mode.value = this.modeTovalue(requestCmd);
    obj.mode.text = this.modeValueToModeText(recipeId, obj.mode.value, tabs);

    //实际温度
    obj.realTemperature.upHighTemperature = requestCmd.cur_temperature_above || 0;
    obj.realTemperature.upLowTemperature = requestCmd.cur_temperature_above || 0;
    obj.realTemperature.downHighTemperature = requestCmd.cur_temperature_underside || 0;
    obj.realTemperature.downLowTemperature = requestCmd.cur_temperature_underside || 0;

    /*提醒代码tips_code 数字
    1		门没有关紧，提醒用户防止蒸汽烫伤	只读	
    2		缺水	只读	
    4		食物翻面	只读	
    5		搅拌	只读	
    6		缺水箱	只读	
    7		需要换水	只读	
    8		预热中	只读	
    */

    obj.displaySign.lock = requestCmd.lock === 'on' ? 1 : 0;
    obj.displaySign.doorSwitch = requestCmd.door_open === 'on' ? 1 : 0;
    this.doorStatus = requestCmd.door_open === 'on' ? 1 : 0;
    obj.displaySign.waterBox = requestCmd.tips_code === 6 ? 1 : 0;
    obj.displaySign.lackWater = requestCmd.tips_code === 2 ? 1 : 0;
    obj.displaySign.changeWater = requestCmd.tips_code === 7 ? 1 : 0;
    obj.displaySign.preheat = requestCmd.tips_code === 8 ? 1 : 0;
    obj.displaySign.preheatTemperature = requestCmd.tips_code === 9 ? 1 : 0;
    obj.displaySign.isError = requestCmd.error_code ? 1 : 0;
    obj.light.value = requestCmd.furnace_light === 'on' ? 1 : 0;
    obj.menuFeel.value = requestCmd.reaction ? 1 : 0;
    //设置温度

    obj.temperature.upHighTemperature = 0;
    obj.temperature.upLowTemperature = requestCmd.temperature;
    obj.temperature.downHighTemperature = 0;
    obj.temperature.downLowTemperature = 0;

    //探针温度
    obj.probeRealTemperature.value = 0; //探针实际温度暂时没有返回
    obj.probeSetttingTemperature.value = 0; //探针设置温度暂时没有返回
    obj.temperature.unit = 0; //温度单位暂时没有返回

    obj.timeSetting.hour = (requestCmd.hour_set === 0xff ? 0 : requestCmd.hour_set);
    obj.timeSetting.minute = (requestCmd.minute_set === 0xff ? 0 : requestCmd.minute_set);
    obj.timeSetting.second = (requestCmd.second_set === 0xff ? 0 : requestCmd.second_set);

    obj.fire.value = 0;  //parker: 火力不用*10了，统一用新协议0-10  ，lua 没有返回
    obj.weight.value = 0; //lua 没有返回
    obj.steam.value = 0; //lua 没有返回
    // nativeService.toast(requestCmd);
    return obj;
  },

  // 设备上报状态解析
  analysisCmd: function (requestCmd, tabs) {
    // var receiveFrame = parseInt(requestCmd[3]);

    // if(latesFrameRecord > receiveFrame){
    //   // latesFrameRecord = newFrame;
    //   return;
    // }
    // latesFrameRecord = receiveFrame;
    // nativeService.toast(latesFrameRecord,6);
    var obj = this.initAnalysisObj();
    // if(parseInt(requestCmd[9])==2 || parseInt(requestCmd[9])==3 || parseInt(requestCmd[9]==4)){
    obj.workingState.value = this.getStatusCode(parseInt(requestCmd[10]));

    var recipeId = parseInt(requestCmd[24]) * 256 * 256 + parseInt(requestCmd[25]) * 256 + parseInt(requestCmd[26]);
    obj.recipeId.value = recipeId;

    obj.timeRemaining.hour = parseInt(requestCmd[12]);
    obj.timeRemaining.minute = parseInt(requestCmd[13]);
    obj.timeRemaining.second = parseInt(requestCmd[22]);
    obj.mode.value = parseInt(requestCmd[11]);

    obj.mode.text = this.modeValueToModeText(recipeId, parseInt(requestCmd[11]), tabs);  // giggs stub
    //实际温度
    obj.realTemperature.upHighTemperature = 0;
    obj.realTemperature.upLowTemperature = parseInt(requestCmd[18]);
    obj.realTemperature.downHighTemperature = 0;
    obj.realTemperature.downLowTemperature = parseInt(requestCmd[19]);

    obj.displaySign.lock = parseInt(requestCmd[10]) === 5 ? 1 : 0; // 状态位 0x05是童锁
    obj.displaySign.doorSwitch = 0;// 无此状态检测
    obj.displaySign.waterBox = 0;// 无此状态检测
    obj.displaySign.lackWater = 0;// 无此状态检测
    obj.displaySign.changeWater = 0;// 无此状态检测
    obj.displaySign.preheat = parseInt(requestCmd[10]) === 8 ? 1 : 0;  // B10状态位 ，不预热工作0x02，预热工作0x08
    obj.displaySign.preheatTemperature = parseInt(requestCmd[10]) === 0x88 ? 1 : 0;  //预热完成
    obj.displaySign.isError = parseInt(requestCmd[15]) ? 1 : 0;

    obj.isProbe.value = 0;// 无此状态检测

    //设置温度
    obj.temperature.upHighTemperature = 0;// 没有这个字段，直接填0就好
    obj.temperature.upLowTemperature = parseInt(requestCmd[14]);// 没有这个字段，直接填0就好
    obj.temperature.downHighTemperature = 0;// 没有这个字段，直接填0就好
    obj.temperature.downLowTemperature = parseInt(requestCmd[14]);// 没有这个字段，直接填0就好

    //探针温度
    obj.probeRealTemperature.value = 0;// 没有这个字段，直接填0就好
    obj.probeSetttingTemperature.value = 0;// 没有这个字段，直接填0就好
    if (obj.isProbe.value) { //如果是探针，则为显示为探针设定温度
      obj.temperature.upLowTemperature = 0;// 没有这个字段，直接填0就好
    }

    obj.fire.value = 0;// 没有这个字段，直接填0就好
    obj.weight.value = 0;// 没有这个字段，直接填0就好
    obj.steam.value = 0;// 没有这个字段，直接填0就好
    return obj;
  },

  // 解析老版本协议的设备状态码，并转换映射成现有新协议的编号：1:"省电",2:"待机",3:"工作中",4:"烹饪完成",5:"预约中",6:"暂停",7:"云菜谱段间等待",8:"爱心3秒"
  getStatusCode(status_code) {
    var result = 2;  // 默认状态人为定义为待机
    switch (status_code) {
      case 7: // 省电
        result = 1;
        break;
      case 0: // 省电
        result = 0;
        break;
      case 1: // 待机
        result = 2;
        break;
      case 2: // 工作中
        result = 3;
        break;
      case 8: // 预热中
        result = 3;
        break;
      case 4: // 烹饪完成
        result = 4;
        break;
      case 6: // 预热中
        result = 5;
        break;
      case 3: // 暂停
        result = 6;
        break;
      case 102: // 云菜段结束
        result = 7;
        break;
      case 136: // 预热结束
        result = 3;
        break;
    }
    return result;
  }


};


