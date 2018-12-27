// 本解析js专门针对 新协议，支持微蒸烤所有产品  Giggs

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
        light:{
          name:"炉灯",
          value: 0
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

    if(tabs.length<=1){
      let modes = tabs[0].rows;
      for(var i=0; i<modes.length; i++){
        var iconButton = modes[i].iconButtons;
        for(var k=0; k<iconButton.length; k++){
          modeArr.push({
            'text': iconButton[k].text,
            'mode': iconButton[k].mode,
          })
        }
      }
    }else{
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
      }else{
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
    var messageBody = message.createMessageBody(22); 
    var controltype = 0;//待机类
    if(callbackData.working){
      controltype = 1 //工作类
    }
    if(params.probe && callbackData.isProbe){//假如当前插上探针，并且 该模式支持探针，则，do
      controltype = 2 //探针类
    }
    if(callbackData.working && params.probe && callbackData.isProbe){//假如当前插上探针，并且 该模式支持探针，则，工作设置类
      controltype = 3 //探针工作设置类
    }
    // nativeService.alert(callbackData);
    // if(params.steamSwitch){
    //   params.steamAmount = 40;
    // }else{
    //   params.steamAmount = 0;
    // }
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
      message.setByte(messageBody, 16, params.steamAmount || params.weight);
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
      message.setByte(messageBody, 16, params.steamAmount || params.weight);
    }
    if(controltype == 2){//探针类下发
      message.setByte(messageBody, 0, 0x22);
      message.setByte(messageBody, 1, 1);
      message.setByte(messageBody, 6, 2);
      message.setByte(messageBody, 10, set_mode);
      message.setByte(messageBody, 12, 200);
      message.setByte(messageBody, 16, params.steamAmount);
      message.setByte(messageBody, 18, params.probeTemperature);
    }
    if(controltype == 3){//探针工作类下发
      message.setByte(messageBody, 0, 0x22);
      message.setByte(messageBody, 1, 4);
      message.setByte(messageBody, 6, 2);
      message.setByte(messageBody, 10, set_mode);
      message.setByte(messageBody, 12, 200);
      message.setByte(messageBody, 16, params.steamAmount);
      message.setByte(messageBody, 18, params.probeTemperature);
    }
    
    var sendcmd = message.createMessage(callbackData.device.type, 0x02, messageBody);
    // nativeService.alert(this.cmdToEasy(sendcmd));

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
   cmdLight(lightValue,device){
    var messageBody = message.createMessageBody(7); 
    message.setByte(messageBody, 0,0x22);
    message.setByte(messageBody, 1,0x02);
    message.setByte(messageBody, 2,0xff);
    message.setByte(messageBody, 3,0xff);
    message.setByte(messageBody, 4,lightValue?0:1);
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
    obj.workingState.value = parseInt(requestCmd[11]); 
    var recipeId = parseInt(requestCmd[12])*256*256+parseInt(requestCmd[13])*256+parseInt(requestCmd[14]);
    obj.recipeId.value = recipeId;
    obj.timeRemaining.hour = parseInt(requestCmd[16]);
    obj.timeRemaining.minute = parseInt(requestCmd[17]);
    obj.timeRemaining.second = parseInt(requestCmd[18]);
    obj.mode.value = parseInt(requestCmd[19]);
    
    obj.mode.text = this.modeValueToModeText(recipeId,parseInt(requestCmd[19]),tabs);     
    
     //实际温度
     obj.realTemperature.upHighTemperature = parseInt(requestCmd[20]);
     obj.realTemperature.upLowTemperature = parseInt(requestCmd[21]);
     obj.realTemperature.downHighTemperature = parseInt(requestCmd[22]);
     obj.realTemperature.downLowTemperature = parseInt(requestCmd[23]);
   
     obj.displaySign.lock = message.getBit(requestCmd, 26, 0);
     obj.displaySign.doorSwitch = message.getBit(requestCmd, 26, 1);
     obj.displaySign.waterBox = message.getBit(requestCmd, 26, 2);
     obj.displaySign.lackWater = message.getBit(requestCmd, 26, 3);
     obj.displaySign.changeWater = message.getBit(requestCmd, 26, 4);
     obj.displaySign.preheat = message.getBit(requestCmd, 26, 5);
     obj.displaySign.preheatTemperature = message.getBit(requestCmd, 26, 6);
     obj.displaySign.isError = message.getBit(requestCmd, 26, 7);

     obj.light.value = message.getBit(requestCmd, 27, 2);
     obj.isProbe.value = message.getBit(requestCmd, 27, 6);

    //设置温度
    obj.temperature.upHighTemperature = parseInt(requestCmd[28]);
    obj.temperature.upLowTemperature = parseInt(requestCmd[29]);
    obj.temperature.downHighTemperature = parseInt(requestCmd[30]);
    obj.temperature.downLowTemperature = parseInt(requestCmd[31]);

    //探针温度
    obj.probeRealTemperature.value = parseInt(requestCmd[32]);
    obj.probeSetttingTemperature.value = parseInt(requestCmd[33]);
    if(obj.isProbe.value){ //如果是探针，则为显示为探针设定温度
      obj.temperature.upLowTemperature = parseInt(requestCmd[33]);
    }

    obj.fire.value = parseInt(requestCmd[24]);
    obj.weight.value = parseInt(requestCmd[25]);
    obj.steam.value = parseInt(requestCmd[25]);
    
    return obj;
  }

};


