import message from "../../common/util/smartMessage";
import  nativeService from '@/common/services/nativeService';

export default {
  //10进制转换8位2进制的方法
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
  modeValueToModeText(modeValue){
      var text = '';
      var modeArr =  [
      {'text': '蒸汽','mode': 0x20},
      {'text': '蒸汽+热风','mode': 0x31},
      {'text': '烧烤', 'mode': 0x40},
      {'text': '热风对流','mode': 0x41},
      {'text': '热风烧烤','mode': 0x43},
      {'text': '清洁','mode': 0xC1},
      {'text': '保温','mode': 0xD0},
      {'text': '发酵','mode': 0xB0},
      {'text': '自动菜谱','mode': 0xE0},
    ];
    for(var i=0; i<modeArr.length; i++){
      if(modeValue == modeArr[i].mode){
         text = modeArr[i].text;
      }
    }
    return text;
  },
  // 查询指令
  createQueryMessage() {
    var messageBody = message.createMessageBody(1);//createMessageBody默认从10开始，1表示11，2表示12....
    message.setByte(messageBody, 0, 0x31);
    var sendMessage = message.createMessage(0x9B, 0x03, messageBody);
    return sendMessage;
  },
 
  //控制启动指令
  createControlMessage(params,working) {
    var time = params.minute;
    var hour = time/60;
    var minute = time%60;
    var second = 0;
    var set_mode = params.mode;
    var messageBody = message.createMessageBody(22); 
    if(working){//工作中设置类 byte11 发04，其他byte发ff
      if(params.mode == 0xB0){ //这款设备特殊处理，发酵，下发0x43
        set_mode = 0x43;
      }
      if(params.mode == 0xD0){ //这款设备特殊处理，保温，下发0x41
        set_mode = 0x41;
      }
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
    }else{
      if(params.mode == 0xB0){ //这款设备特殊处理，发酵，下发0x43
        set_mode = 0x43;
      }
      if(params.mode == 0xD0){ //这款设备特殊处理，保温，下发0x41
        set_mode = 0x41;
      }
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
    
  
    var sendcmd = message.createMessage(0x9B, 0x02, messageBody);
    return sendcmd;
  },
  //取消工作指令
  cmdCancelWork(){
    var messageBody = message.createMessageBody(7); 
    message.setByte(messageBody, 0,0x22);
    message.setByte(messageBody, 1,0x02); 
    message.setByte(messageBody, 2,0x02);
    message.setByte(messageBody, 3,0xff);
    message.setByte(messageBody, 4,0xff);
    message.setByte(messageBody, 5,0xff);
    message.setByte(messageBody, 6,0xff);
    var sendMessage = message.createMessage(0x9B, 0x02, messageBody);
    return sendMessage;
  },
  //暂停or继续指令
  cmdStartOrPause(record){
    var messageBody = message.createMessageBody(7); 
    message.setByte(messageBody, 0,0x22);
    message.setByte(messageBody, 1,0x02);
    message.setByte(messageBody, 2,record);
    message.setByte(messageBody, 3,0xff);
    message.setByte(messageBody, 4,0xff);
    message.setByte(messageBody, 5,0xff);
    message.setByte(messageBody, 6,0xff);
    var sendMessage = message.createMessage(0x9B, 0x02, messageBody);
    return sendMessage;
  },
   //上锁
   cmdLock(params){
    var messageBody = message.createMessageBody(7); 
    message.setByte(messageBody, 0,0x22);
    message.setByte(messageBody, 1,0x02);
    message.setByte(messageBody, 2,0xff);
    message.setByte(messageBody, 3,params.childLock?1:0);
    message.setByte(messageBody, 4,0xff);
    message.setByte(messageBody, 5,0xff);
    message.setByte(messageBody, 6,0xff);
    var sendMessage = message.createMessage(0x9B, 0x02, messageBody);
    return sendMessage;
  },
  analysisCmd: function(requestCmd) {
    // nativeService.toast(requestCmd,6);
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
      fire:{name: "火力",value: 0x00},
      weight:{name: "重量",value: 0x00},
      steam:{name: "蒸汽量",value: 0x00},
  };
  // if((parseInt(requestCmd[9])==2 || parseInt(requestCmd[9])==3 || parseInt(requestCmd[9]==4)) && parseInt(requestCmd[10])==0){
    obj.workingState.value = parseInt(requestCmd[11]);    
    obj.recipeId.value = parseInt(requestCmd[12])*256*256+parseInt(requestCmd[13])*256+parseInt(requestCmd[14]);
    obj.mode.value = parseInt(requestCmd[19]);
    obj.mode.text = this.modeValueToModeText(parseInt(requestCmd[19]));        
    obj.displaySign.lock = message.getBit(requestCmd, 26, 0);
    obj.displaySign.doorSwitch = message.getBit(requestCmd, 26, 1);
    obj.displaySign.waterBox = message.getBit(requestCmd, 26, 2);
    obj.displaySign.lackWater = message.getBit(requestCmd, 26, 3);
    obj.displaySign.changeWater = message.getBit(requestCmd, 26, 4);
    obj.displaySign.preheat = message.getBit(requestCmd, 26, 5);
    obj.displaySign.preheatTemperature = message.getBit(requestCmd, 26, 6);
    obj.displaySign.isError = message.getBit(requestCmd, 26, 7);
    obj.timeRemaining.hour = parseInt(requestCmd[16]);
    obj.timeRemaining.minute = parseInt(requestCmd[17]);
    obj.timeRemaining.second = parseInt(requestCmd[18]);
    
     //实际温度
     obj.realTemperature.upHighTemperature = parseInt(requestCmd[20]);
     obj.realTemperature.upLowTemperature = parseInt(requestCmd[21]);
     obj.realTemperature.downHighTemperature = parseInt(requestCmd[22]);
     obj.realTemperature.downLowTemperature = parseInt(requestCmd[23]);

    //设置温度
    obj.temperature.upHighTemperature = parseInt(requestCmd[28]);
    obj.temperature.upLowTemperature = parseInt(requestCmd[29]);
    obj.temperature.downHighTemperature = parseInt(requestCmd[30]);
    obj.temperature.downLowTemperature = parseInt(requestCmd[31]);

    obj.fire.value = parseInt(requestCmd[24]);
    obj.weight.value = parseInt(requestCmd[25]);
    obj.steam.value = parseInt(requestCmd[25]);
    return obj;
  }
};
