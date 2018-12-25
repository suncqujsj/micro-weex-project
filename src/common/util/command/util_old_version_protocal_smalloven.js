// 本解析js专门针对 新协议，支持微蒸烤所有产品

import message from "@/common/util/smartMessage";
import  nativeService from '@/common/services/nativeService';
// import {device} from "../config/constant";
// import modes from "../config/modes.js";
// import autoMenu from "../config/auto-menu.js";
var latesFrameRecord = 0;
export default {
  //10进制转换8位2进制的方法
  initAnalysisObj(){
    var obj = {
        workingState:{
            name:"工作状态",value:0x00,view:{1:"省电",2:"待机",3:"工作中",4:"烹饪完成",5:"预约中",6:"暂停",7:"云菜谱段间等待",8:"爱心3秒"}
        },
        mode:{
            name:"烹饪模式",text: '',value:0x00
        },
        recipeId:{
          name:"菜谱id",text: '',value:0x00
        },
        displaySign:{
            name:"显示标志",
            lock:{name:"童锁",value:0x00,view:{0:"未锁",1:"已锁"}},
            doorSwitch:{name:"门状态",value:0x00,view:{0:"门关",1:"门开"}},
            waterBox:{name:"水箱位",value:0x00,view:{0:"有水箱",1:"缺水箱"}},
            lackWater:{name:"缺水位",value:0x00,view:{0:"不缺水",1:"缺水"}},
            changeWater:{name:"换水位",value:0x00,view:{0:"不需要换水",1:"要换水"}},
            preheat:{name:"是否预热",value:0x00,view:{0:"非预热中",1:"预热中"}},
            preheatTemperature:{name:"预热温度位",value:0x00,view:{0:"预热温度未到",1:"预热温度已到"}},
            isError:{name:"是否故障",value:0x00,view:{0:"无故障",1:"有故障"}},
        },
        timeRemaining:{
            name:"程序剩余时间",
            hour: {name:"小时",value: 0x00},
            minute: {name:"分钟",value: 0x00},
            second: {name:"秒",value: 0x00},
        },
        temperature:{
          name:"发热管设置的温度",
          upHighTemperature: {name:"上管设置温度：高",value: 0x00},
          upLowTemperature: {name:"上管设置温度：低",value: 0x00},
          downHighTemperature: {name:"下管设置温度：高",value: 0x00},
          downLowTemperature: {name:"下管设置温度：低",value: 0x00},
        },
        realTemperature:{
          name:"发热管实际的温度",
          upHighTemperature: {name:"上管实际温度：高",value: 0x00},
          upLowTemperature: {name:"上管实际温度：低",value: 0x00},
          downHighTemperature: {name:"下管实际温度：高",value: 0x00},
          downLowTemperature: {name:"下管实际温度：低",value: 0x00},
        },
        isProbe:{
          name:"肉类探针模式",
          value: 0
        },
        probeRealTemperature:{
          name:"探针实际温度",
          value: 0
        },
        probeSetttingTemperature:{
          name:"探针设定温度",
          value: 0
        },
        fire:{name: "火力",value: 0x00},
        weight:{name: "重量",value: 0x00},
        steam:{name: "蒸汽量",value: 0x00},
    };
    return obj;
  },
  tranformTo2Bit: function(val) {
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
  cmdToEasy(sendCmd){ //16进制
      // var arr=[], message=sendCmd.slice(10,this.MSG_LENGTH-1);
      var arr=[], message=sendCmd;
      for (var i=10,len=message.length; i < len; i++)
      {
          var obj={};
          //obj.key=i+10;
          obj.key=i;
          obj.val=parseInt(message[i]).toString(16);
          arr.push(obj);
      }
      return arr;

  },
  cmdTo16Hex(sendCmd){
    var cmd="";
    for (var i=0,len=sendCmd.length; i < len; i++)
    {   var subCmd = parseInt(sendCmd[i]).toString(16).length == 1 ? "0"+parseInt(sendCmd[i]).toString(16):parseInt(sendCmd[i]).toString(16);
        cmd += subCmd;
    }
    return cmd.toUpperCase();
  },
  getCurrentModeItem(tabs,recipeId,modeId,isRecipe){ 
      var  _item = {};
      if(isRecipe){
          var autoMenu = tabs[0].rows;
          var  currentModes = autoMenu;
          for(var i=0; i<currentModes.length; i++){
              var iconButtonsArr = currentModes[i].iconButtons; 
              for(var r=0; r<iconButtonsArr.length; r++){
                  var iconButtons = iconButtonsArr[r];
                  for(var m=0; m<iconButtons.length; m++){
                      if(recipeId == iconButtons[m].recipeId.default){
                          _item = iconButtons[m];
                          break;
                      }
                  }
              }                      
            
          }
      }else{
          var modes = tabs[1].rows;
          var  currentModes = modes;
          for(var i=0; i<currentModes.length; i++){
              var iconButtons = currentModes[i].iconButtons;
              for(var m=0; m<iconButtons.length; m++){
                
                  if(modeId == currentModes[i].iconButtons[m].mode){
                      _item = currentModes[i].iconButtons[m];
                      break;
                  }
              
              }
          }
      }
    
      return _item;
  },
  modeValueToModeText(recipeId,modeValue,tabs){
    var text = '';
    var modeArr =  [];
    var isRecipe = false;
    if(modeValue == 0xE0){ //如果是自动菜谱
        isRecipe = true;
    }

    if(isRecipe){
      let autoMenu = tabs[0].rows;
      let  currentModes = autoMenu;
       for(var i=0; i<currentModes.length; i++){
           var iconButtonsArr = currentModes[i].iconButtons; 
          for(var r=0; r<iconButtonsArr.length; r++){
              var iconButtons = iconButtonsArr[r];
               for(var m=0; m<iconButtons.length; m++){
                  if(recipeId == iconButtons[m].recipeId.default){
                      modeArr.push({
                        'text': iconButtons[m].text,
                        'mode': iconButtons[m].mode,
                      })
                  }
              }
          }                      
         
      }
    }
    else{
      let modes = tabs[1].rows;
      for(var i=0; i<modes.length; i++){
        var iconButton = modes[i].iconButtons;
        for(var k=0; k<iconButton.length; k++){
          modeArr.push({
            'text': iconButton[k].text,
            'mode': iconButton[k].mode,
          })
        }
      }
    }
    //modeArr.push({'text': '自动菜谱','mode': 0xE0});

    for(var i=0; i<modeArr.length; i++){
      if(modeValue == modeArr[i].mode){
         text = modeArr[i].text;
      }
    }
    //nativeService.alert(text);
    return text;
  },
  // 查询指令
  createQueryMessage(device) {
    var messageBody = message.createMessageBody(1);//createMessageBody默认从10开始，1表示11，2表示12....
    message.setByte(messageBody, 0, 0x31);
    var sendMessage = message.createMessage(device.type, 0x03, messageBody);
    return sendMessage;
  },
 
  //控制启动指令
  createControlMessage(params,callbackData) {
    var time = params.minute;
    var hour = time/60;
    var minute = time%60;
    var second = 0;
    var set_mode = params.mode;
    var messageBody = message.createMessageFFBody(22); 
    var controltype = 0;//待机类
    if(callbackData.working){
      controltype = 1 //工作类
    }
    if(params.probe && callbackData.isProbe){//假如当前插上探针，并且 该模式支持探针，则，do
      controltype = 2 //探针类
    }
    // nativeService.alert(controltype);
    if(controltype==0){
      message.setByte(messageBody, 0, 0x22);
      message.setByte(messageBody, 1, 1);
      message.setByte(messageBody, 2, 0);
      message.setByte(messageBody, 3, 0);
      message.setByte(messageBody, 4, params.recipeId);
      message.setByte(messageBody, 5, 0);
      message.setByte(messageBody, 6, params.preheat?1:0);
      message.setByte(messageBody, 7, hour);
      message.setByte(messageBody, 8, minute);
      message.setByte(messageBody, 9, second);
      message.setByte(messageBody, 10, set_mode);
      message.setByte(messageBody, 12, params.temperature);
      // message.setByte(messageBody, 14, params.temperature);
      message.setByte(messageBody, 15, params.fireAmount);
      message.setByte(messageBody, 16, params.steamAmount);
    }
    if(controltype == 1){//工作中设置类 byte11 发04，其他byte发ff
      message.setByte(messageBody, 0, 0x22);
      message.setByte(messageBody, 1, 4);
      message.setByte(messageBody, 2, 0xff);
      message.setByte(messageBody, 3, 0xff);
      message.setByte(messageBody, 4, 0xff);
      message.setByte(messageBody, 5, 0xff);
      message.setByte(messageBody, 6, params.preheat?1:0);
      message.setByte(messageBody, 7, hour);
      message.setByte(messageBody, 8, minute);
      message.setByte(messageBody, 9, second);
      message.setByte(messageBody, 10, set_mode);
      message.setByte(messageBody, 12, params.temperature);
      // message.setByte(messageBody, 14, params.temperature);
      message.setByte(messageBody, 15, params.fireAmount);
      message.setByte(messageBody, 16, params.steamAmount);
    }
    if(controltype == 2){//探针类下发
      message.setByte(messageBody, 0, 0x22);
      message.setByte(messageBody, 1, 1);
      message.setByte(messageBody, 10, set_mode);
      message.setByte(messageBody, 12, 200);
      message.setByte(messageBody, 18, params.probeTemperature);
    }
    
    var sendcmd = message.createMessage(callbackData.device.type, 0x02, messageBody);
    // nativeService.alert(this.cmdTo16Hex(sendcmd));

    return sendcmd;
  },
  //取消工作指令
  cmdCancelWork(device){
    var messageBody = message.createMessageBody(7); 
    message.setByte(messageBody, 0,0x22);
    message.setByte(messageBody, 1,0x02); 
    message.setByte(messageBody, 2,0x02);
    message.setByte(messageBody, 3,0xff);
    message.setByte(messageBody, 4,0xff);
    message.setByte(messageBody, 5,0xff);
    message.setByte(messageBody, 6,0xff);
    var sendMessage = message.createMessage(device.type, 0x02, messageBody);
    return sendMessage;
  },
  //暂停or继续指令
  cmdStartOrPause(record,device){
    var messageBody = message.createMessageBody(7); 
    message.setByte(messageBody, 0,0x22);
    message.setByte(messageBody, 1,0x02);
    message.setByte(messageBody, 2,record);
    message.setByte(messageBody, 3,0xff);
    message.setByte(messageBody, 4,0xff);
    message.setByte(messageBody, 5,0xff);
    message.setByte(messageBody, 6,0xff);
    var sendMessage = message.createMessage(device.type, 0x02, messageBody);
    return sendMessage;
  },



   //炉灯
   cmdLight(params,device){
    var messageBody = message.createMessageBody(7); 
    message.setByte(messageBody, 0,0x22);
    message.setByte(messageBody, 1,0x02);
    message.setByte(messageBody, 2,0xff);
    message.setByte(messageBody, 3,params.light?1:0);
    message.setByte(messageBody, 4,0xff);
    message.setByte(messageBody, 5,0xff);
    message.setByte(messageBody, 6,0xff);
    var sendMessage = message.createMessage(device.type, 0x02, messageBody);
    return sendMessage;
  },
   //上锁
   cmdLock(params,device){
    var messageBody = message.createMessageBody(7); 
    message.setByte(messageBody, 0,0x22);
    message.setByte(messageBody, 1,0x02);
    message.setByte(messageBody, 2,0xff);
    message.setByte(messageBody, 3,params.childLock?1:0);
    message.setByte(messageBody, 4,0xff);
    message.setByte(messageBody, 5,0xff);
    message.setByte(messageBody, 6,0xff);
    var sendMessage = message.createMessage(device.type, 0x02, messageBody);
    return sendMessage;
  },


    // 设备上报状态解析
  analysisCmd: function(requestCmd,tabs) {
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
    var recipeId = parseInt(requestCmd[21])*256*256+parseInt(requestCmd[22])*256+parseInt(requestCmd[23]);
    obj.recipeId.value = recipeId;
    obj.timeRemaining.hour = parseInt(requestCmd[12])%60;
    obj.timeRemaining.minute = parseInt(requestCmd[12]);
    obj.timeRemaining.second = parseInt(requestCmd[13]);
    obj.mode.value = parseInt(requestCmd[11]);
    obj.mode.text = this.modeValueToModeText(recipeId,parseInt(requestCmd[19]),tabs);  // giggs stub
    
     //实际温度
     obj.realTemperature.upHighTemperature = parseInt(requestCmd[24]);
     obj.realTemperature.upLowTemperature = parseInt(requestCmd[24]);
     obj.realTemperature.downHighTemperature = parseInt(requestCmd[24]);
     obj.realTemperature.downLowTemperature = parseInt(requestCmd[24]);
   
     obj.displaySign.lock = parseInt(requestCmd[10]) === 5 ? 1:0; // 状态位 0x05是童锁
     obj.displaySign.doorSwitch = message.getBit(requestCmd, 10, 7); // B10状态位 第7个Bit标识门开关
     obj.displaySign.waterBox = message.getBit(requestCmd, 26, 2);  // 貌似没有水盒检测
     obj.displaySign.lackWater =  parseInt(requestCmd[16]) === 2 ? 1:0;  // B16 =2 标识 缺水
     obj.displaySign.changeWater = parseInt(requestCmd[16]) === 6 ? 1:0; // B16 =6 清洁换水
     obj.displaySign.preheat = parseInt(requestCmd[10]) === 8 ? 1:0;  // B10状态位 ，不预热工作0x02，预热工作0x08
     obj.displaySign.preheatTemperature = parseInt(requestCmd[24])*5;
     obj.displaySign.isError = parseInt(requestCmd[15]) != 0 ? 1:0;

     obj.isProbe.value = 0; // 微波炉没有探针，直接填0就好

    //设置温度
    obj.temperature.upHighTemperature = 0;// 没有这个字段，直接填0就好
    obj.temperature.upLowTemperature = 0;// 没有这个字段，直接填0就好
    obj.temperature.downHighTemperature = 0;// 没有这个字段，直接填0就好
    obj.temperature.downLowTemperature = 0;// 没有这个字段，直接填0就好

    //探针温度
    obj.probeRealTemperature.value = 0;// 没有这个字段，直接填0就好
    obj.probeSetttingTemperature.value = 0;// 没有这个字段，直接填0就好
    if(obj.isProbe.value){ //如果是探针，则为显示为探针设定温度
      obj.temperature.upLowTemperature = 0;// 没有这个字段，直接填0就好
    }

    obj.fire.value = parseInt(requestCmd[24]);
    obj.weight.value = parseInt(requestCmd[24]);
    obj.steam.value = 0;// 没有这个字段，直接填0就好
    return obj;
  },

  // 解析老版本协议的设备状态码，并转换映射成现有新协议的编号：1:"省电",2:"待机",3:"工作中",4:"烹饪完成",5:"预约中",6:"暂停",7:"云菜谱段间等待",8:"爱心3秒"
    getStatusCode(status_code){
      var result = 2;  // 默认状态人为定义为待机
      switch (status_code) {
          case 7: // 省电
              result = 1;
              break;
          case 1: // 待机
              result = 2;
              break;
          case 2: // 不预热工作
              result = 3;
              break;
          case 4: // 烹饪完成
              result = 4;
              break;
          case 6: // 预约中
              result = 5;
              break;
          case 3: // 暂停
              result = 6;
              break;
          case 102: // 云菜段结束
              result = 7;
              break;
          case 9: // 爱心3秒
              result = 8;
              break;
          case 8: // 预热工作
              result = 3;
      }
      return result;
    }


};


