// 本解析js专门针对 新协议，支持微蒸烤所有产品  Giggs

import message from "@/common/util/smartMessage";
import sensoryMenus from '@/common/mapping/sensoryMenus'
import nativeService from '@/common/services/nativeService';
import modeConfig from '@/common/mapping/modeConfig'
export default {
    //10进制转换8位2进制的方法
    doorStatus: 0,
    isWorking: false,
    initAnalysisObj() {
        var obj = {
            workingState: {
                name: "工作状态",
                value: 0x00,
                view: {1: "省电", 2: "待机", 3: "工作中", 4: "烹饪完成", 5: "预约中", 6: "暂停", 7: "云菜谱段间等待", 8: "爱心3秒"}
            },
            mode: {
                name: "烹饪模式", text: '', value: 0x00
            },
            recipeId: {
                name: "菜谱id", text: '', value: 0x00
            },
            displaySign: {
                name: "显示标志",
                lock: {name: "童锁", value: 0x00, view: {0: "未锁", 1: "已锁"}},
                doorSwitch: {name: "门状态", value: 0x00, view: {0: "门关", 1: "门开"}},
                waterBox: {name: "水箱位", value: 0x00, view: {0: "有水箱", 1: "缺水箱"}},
                lackWater: {name: "缺水位", value: 0x00, view: {0: "不缺水", 1: "缺水"}},
                changeWater: {name: "换水位", value: 0x00, view: {0: "不需要换水", 1: "要换水"}},
                preheat: {name: "是否预热", value: 0x00, view: {0: "非预热中", 1: "预热中"}},
                preheatTemperature: {name: "预热温度位", value: 0x00, view: {0: "预热温度未到", 1: "预热温度已到"}},
                isError: {name: "是否故障", value: 0x00, view: {0: "无故障", 1: "有故障"}},
            },
            timeRemaining: {
                name: "程序剩余时间",
                hour: 0,
                minute: 0,
                second: 0,
            },
            temperature: {
                name: "发热管设置的温度",
                upHighTemperature: {name: "上管设置温度：高", value: 0x00},
                upLowTemperature: {name: "上管设置温度：低", value: 0x00},
                downHighTemperature: {name: "下管设置温度：高", value: 0x00},
                downLowTemperature: {name: "下管设置温度：低", value: 0x00},
                unit: 0
            },
            realTemperature: {
                name: "发热管实际的温度",
                upHighTemperature: {name: "上管实际温度：高", value: 0x00},
                upLowTemperature: {name: "上管实际温度：低", value: 0x00},
                downHighTemperature: {name: "下管实际温度：高", value: 0x00},
                downLowTemperature: {name: "下管实际温度：低", value: 0x00},
            },
            light: {
                name: "炉灯",
                value: 0
            },
            highClearLock: {
                name: "高温自清洁锁",
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
            fire: {name: "火力", value: 0x00},
            weight: {name: "重量", value: 0x00},
            steam: {name: "蒸汽量", value: 0x00},
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
            cmdLength: 18

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
        // if(isRecipe && recipeId==0){
        //   isRecipe = false;
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
        var text = '';
        var modeArr = [];
        var isRecipe = false;

        if (modeValue === 0xE2) {
            return sensoryMenus[recipeId].cn;
        }

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
    // 查询指令
    createQueryMessage(device) {
        var messageBody = message.createMessageBody(1);//createMessageBody默认从10开始，1表示11，2表示12....
        message.setByte(messageBody, 0, 0x31);
        var sendMessage = message.createMessage(device.type, 0x03, messageBody);
        // nativeService.alert(this.cmdTo16Hex(sendMessage));
        return sendMessage;
    },

    //控制启动指令
    createControlMessage(params, callbackData) {
        if (this.doorStatus) {
            nativeService.toast("主人，您的设备炉门开了");
            return;
        }

        var upTemp = params.temperature, downTemp = params.temperature;
        if (params.upTemperature || params.downTemperature) {//如果是上下烧烤 独立控温
            let abs_value = Math.abs(params.upTemperature - params.downTemperature);
            if (abs_value > 30) {
                nativeService.toast('上管与下管的温度相差不能超过30哦');
                return;
            }
            upTemp = params.upTemperature, downTemp = params.downTemperature;
        }


        var time = params.time;
        var hour = Math.floor(time / 60);
        var minute = time % 60;
        var second = 0;
        var set_mode = params.mode;
        var messageBody = message.createMessageBody(22);
        var controltype = 0;//待机类
        if (callbackData.working) {
            controltype = 1 //工作类
        }
        if (params.probe && callbackData.isProbe) {//假如当前插上探针，并且 该模式支持探针，则，do
            controltype = 2 //探针类
        }
        if (callbackData.working && params.probe && callbackData.isProbe) {//假如当前插上探针，并且 该模式支持探针，则，工作设置类
            controltype = 3 //探针工作设置类
        }

        if (parseInt(params.temperature) < 100 && !this.isSmallOven(callbackData.device.type)) { // sf 不是小烤箱判断
            params.preheat = false;
        }
        if (this.isWorking && params.currentItem && params.currentItem.preheat && params.currentItem.preheat.hide) {//如果隐藏
            params.preheat = false;
        }
        if (controltype == 0) {
            message.setByte(messageBody, 0, 0x22);
            message.setByte(messageBody, 1, 1);
            message.setByte(messageBody, 2, 0);
            message.setByte(messageBody, 3, 0);
            message.setByte(messageBody, 4, params.recipeId);
            message.setByte(messageBody, 5, 0x11);
            // message.setByte(messageBody, 6, params.preheat?1:0);
            message.setByte(messageBody, 7, this.setHms(time, hour, set_mode, callbackData.device.extra1.sn8));
            message.setByte(messageBody, 8, this.setHms(time, minute, set_mode, callbackData.device.extra1.sn8));
            message.setByte(messageBody, 9, this.setHms(time, second, set_mode, callbackData.device.extra1.sn8));
            message.setByte(messageBody, 10, set_mode);
            message.setByte(messageBody, 11, this.getHighTemperature(upTemp));
            message.setByte(messageBody, 12, this.getLowTemperature(upTemp));
            message.setByte(messageBody, 13, this.getHighTemperature(downTemp));
            message.setByte(messageBody, 14, this.getLowTemperature(downTemp));
            message.setByte(messageBody, 15, params.fireAmount);
            message.setByte(messageBody, 16, this.setByte26(params));
            // 数据埋点
            // this.statisticsUpload({...constant.device});
        }

        if (controltype == 1) {//工作中设置类 byte11 发04，其他byte发ff
            message.setByte(messageBody, 0, 0x22);
            message.setByte(messageBody, 1, 4);
            message.setByte(messageBody, 2, 0xff);
            message.setByte(messageBody, 3, 0xff);
            message.setByte(messageBody, 4, 0xff);
            message.setByte(messageBody, 5, 0xff);
            // message.setByte(messageBody, 6, params.preheat?1:0);
            message.setByte(messageBody, 7, params.isTimeChange ? hour : 0xff);
            message.setByte(messageBody, 8, params.isTimeChange ? minute : 0xff);
            message.setByte(messageBody, 9, params.isTimeChange ? second : 0xff);
            //新协议先该为0xff message.setByte(messageBody, 10, set_mode);
            message.setByte(messageBody, 10, 0xff);
            message.setByte(messageBody, 11, this.getHighTemperature(upTemp));
            message.setByte(messageBody, 12, this.getLowTemperature(upTemp));
            message.setByte(messageBody, 13, this.getHighTemperature(downTemp));
            message.setByte(messageBody, 14, this.getLowTemperature(downTemp));
            // message.setByte(messageBody, 14, params.temperature);
            // message.setByte(messageBody, 15, params.isFireAmountChange?params.fireAmount/10:0xff); //parker
            message.setByte(messageBody, 15, params.isFireAmountChange ? params.fireAmount : 0xff); //parker: 统一新协议
            message.setByte(messageBody, 16, params.isSteamAmountChange ? (this.setByte26(params)) : 0xff);
            message.setByte(messageBody, 18, 0xff);
        }
        if (controltype == 0 || controltype == 1) { // 非探针预热设置 sf
            message.setBit(messageBody, 6, 0, params.preheat ? 1 : 0);
        }


        if (controltype == 2) {//探针类下发
            message.setByte(messageBody, 0, 0x22);
            message.setByte(messageBody, 1, 1);
            message.setByte(messageBody, 5, 0x11);
            message.setByte(messageBody, 6, 2);
            message.setByte(messageBody, 10, set_mode);
            message.setByte(messageBody, 12, params.isProbeSettingTemperature || 200); //parker:罗强的电控 探针下发需要发一个默认的温度200
            message.setByte(messageBody, 16, params.steamAmount);
            message.setByte(messageBody, 18, params.probeTemperature);
        }
        if (controltype == 3) {//探针工作类下发
            message.setByte(messageBody, 0, 0x22);
            message.setByte(messageBody, 1, 4);
            message.setByte(messageBody, 5, 0x11);
            message.setByte(messageBody, 6, 2);
            message.setByte(messageBody, 10, set_mode);
            message.setByte(messageBody, 11, 0xff);
            message.setByte(messageBody, 12, 0xff);
            message.setByte(messageBody, 16, params.steamAmount);
            message.setByte(messageBody, 18, params.probeTemperature);
        }

        if (controltype == 2 || controltype == 3) { // 探针预热设置 sf
            if (params.preheat) {
                message.setBit(messageBody, 6, 0, 1);
                message.setBit(messageBody, 6, 1, 1);
            } else {
                message.setBit(messageBody, 6, 0, 0);
                message.setBit(messageBody, 6, 1, 1);
            }
        }

        // 温度华氏度、重量盎司设置 sf
        if (params.currentItem.weight && params.currentItem.weight.unit === 'oz') {
            message.setBit(messageBody, 6, 3, 1);
        }
        if (params.currentItem.temperature && params.currentItem.temperature.unit === '℉') {
            message.setBit(messageBody, 6, 4, 1);
        }

        var sendcmd = message.createMessage(callbackData.device.type, 0x02, messageBody);
        // nativeService.alert(this.cmdToEasy(sendcmd));
        return sendcmd;
    },

    setByte26(params) {
        let _weight = params.weight / 10;
        // 温度华氏度、重量盎司设置
        if (params.currentItem.weight && params.currentItem.weight.unit === 'oz') { //如果是盎司单位，则不需要除以10
            _weight = params.weight;
        }
        if (params.currentItem.weight && params.currentItem.weight.ratio) {
            _weight = parseInt((params.weight - params.currentItem.weight.index) / params.currentItem.weight.ratio);
        }
        return params.steamAmount || _weight || params.quantity;
    },

    setHms(time, t, mode, sn8) { // 自动菜单hms为0时候需要传0xff
        if (time === false) return 0xff;
        return this.is934MJ(sn8) && this.isAutoMenu(mode) ? (t || 0xff) : t;

    },

    isAutoMenu(mode) { // sf
        return mode === 0xE0;
    },

    getHighTemperature(t) { // 高温控温
        if (t === false) return 0xff;
        return parseInt(t / 256);
    },

    getLowTemperature(t) { // sf 获取低位温度值
        if (t === false) return 0xff;
        return parseInt(t) % 256;
    },

    isSmallOven(type) {
        return type === 0xB4;
    },

    is934MJ(sn8) { // sf 判断是否微波蒸汽烤箱
        return sn8 === '0TR934MJ'
    },

    //取消工作指令
    cmdCancelWork(device) {
        var messageBody = message.createMessageFFBody(9);
        message.setByte(messageBody, 0, 0x22);
        message.setByte(messageBody, 1, 0x02);
        message.setByte(messageBody, 2, 0x02);
        var sendMessage = message.createMessage(device.type, 0x02, messageBody);
        return sendMessage;
    },
    //暂停or继续指令
    cmdStartOrPause(record, device) {
        var messageBody = message.createMessageFFBody(9);
        message.setByte(messageBody, 0, 0x22);
        message.setByte(messageBody, 1, 0x02);
        message.setByte(messageBody, 2, record);
        var sendMessage = message.createMessage(device.type, 0x02, messageBody);
        return sendMessage;
    },

    //炉灯
    cmdLight(lightValue, device) {
        var messageBody = message.createMessageFFBody(9);
        message.setByte(messageBody, 0, 0x22);
        message.setByte(messageBody, 1, 0x02);
        message.setByte(messageBody, 4, lightValue ? 0 : 1);
        var sendMessage = message.createMessage(device.type, 0x02, messageBody);
        return sendMessage;
    },
    //上锁解锁
    cmdLock(params, device) {
        var messageBody = message.createMessageFFBody(9);
        message.setByte(messageBody, 0, 0x22);
        message.setByte(messageBody, 1, 0x02);
        message.setByte(messageBody, 3, params.childLock ? 1 : 0);
        var sendMessage = message.createMessage(device.type, 0x02, messageBody);
        // nativeService.alert(this.cmdToEasy(sendMessage));
        return sendMessage;
    },

    tranformToStausValue(requestCmd){
        let val = 1;        
        switch ( requestCmd.work_status ) {
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
    modeTovalue(requestCmd){
        let mode = requestCmd.work_mode || 'double_tube';
        let modeValue = modeConfig[mode].value;
        // nativeService.alert(modeValue);
        return modeValue;
    },

    analysisLua: function (requestCmd, tabs) {
        nativeService.alert(requestCmd);
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
        obj.timeRemaining.minute = requestCmd.work_minute || 0 ;
        obj.timeRemaining.second = requestCmd.work_second || 0;
        obj.mode.value = this.modeTovalue(requestCmd);

        obj.mode.text = this.modeValueToModeText(recipeId,obj.mode.value, tabs);

        //实际温度
        obj.realTemperature.upHighTemperature = requestCmd.cur_temperature_above || 0;
        obj.realTemperature.upLowTemperature = requestCmd.cur_temperature_above || 0;
        obj.realTemperature.downHighTemperature = requestCmd.cur_temperature_underside || 0;
        obj.realTemperature.downLowTemperature =requestCmd.cur_temperature_underside || 0;

        /*提醒代码tips_code 数字
        1		门没有关紧，提醒用户防止蒸汽烫伤	只读	
        2		缺水	只读	
        4		食物翻面	只读	
        5		搅拌	只读	
        6		缺水箱	只读	
        7		需要换水	只读	
        8		预热中	只读	
        */
    
        obj.displaySign.lock = requestCmd.lock === 'on'?1:0;
        obj.displaySign.doorSwitch = requestCmd.door_open === 'on'?1:0;
        this.doorStatus =  requestCmd.door_open === 'on'?1:0;
        obj.displaySign.waterBox = requestCmd.tips_code === 6?1:0;
        obj.displaySign.lackWater = requestCmd.tips_code === 2?1:0;
        obj.displaySign.changeWater = requestCmd.tips_code === 7?1:0;
        obj.displaySign.preheat = requestCmd.tips_code === 8?1:0;
        obj.displaySign.preheatTemperature = requestCmd.tips_code === 9?1:0;
        obj.displaySign.isError = requestCmd.error_code?1:0;

        obj.light.value = requestCmd.furnace_light === 'on'?1:0;
        obj.isProbe.value = 0; //探针暂时没有返回
        obj.highClearLock.value = 0; //高温自清洁锁暂时没有返回
        obj.menuFeel.value = 0; //菜单感应中暂时没有返回
        //设置温度

        obj.temperature.upHighTemperature = 0;
        obj.temperature.upLowTemperature = requestCmd.temperature;
        obj.temperature.downHighTemperature = 0;
        obj.temperature.downLowTemperature = 0;

        //探针温度
        obj.probeRealTemperature.value = 0; //探针实际温度暂时没有返回
        obj.probeSetttingTemperature.value = 0; //探针设置温度暂时没有返回
        obj.temperature.unit = 0; //温度单位暂时没有返回

        obj.timeSetting.hour = requestCmd.hour_set; //设定的总时间暂时没有返回
        obj.timeSetting.minute = requestCmd.minute_set; //设定的总时间暂时没有返回
        obj.timeSetting.second = requestCmd.second_set; //设定的总时间暂时没有返回

        obj.fire.value =  0;  //parker: 火力不用*10了，统一用新协议0-10  ，lua 没有返回
        obj.weight.value = 0; //lua 没有返回
        obj.steam.value =  0; //lua 没有返回
        // nativeService.toast(requestCmd);
        return obj;
    },
    analysisCmd: function (requestCmd, tabs) {
        var obj = this.initAnalysisObj();
        obj.cmdLength = parseInt(requestCmd[1]); // 指令长度
        obj.workingState.value = parseInt(requestCmd[11]);
        if (parseInt(requestCmd[11]) == 3 || parseInt(requestCmd[11]) == 6) {
            this.isWorking = true;
        } else {
            this.isWorking = false;
        }
        var recipeId = parseInt(requestCmd[12]) * 256 * 256 + parseInt(requestCmd[13]) * 256 + parseInt(requestCmd[14]);
        obj.recipeId.value = recipeId;
        obj.timeRemaining.hour = parseInt(requestCmd[16]);
        obj.timeRemaining.minute = parseInt(requestCmd[17]);
        obj.timeRemaining.second = parseInt(requestCmd[18]);
        obj.mode.value = parseInt(requestCmd[19]);

        obj.mode.text = this.modeValueToModeText(recipeId, parseInt(requestCmd[19]), tabs);

        //实际温度
        obj.realTemperature.upHighTemperature = parseInt(requestCmd[20]);
        obj.realTemperature.upLowTemperature = parseInt(requestCmd[21]);
        obj.realTemperature.downHighTemperature = parseInt(requestCmd[22]);
        obj.realTemperature.downLowTemperature = parseInt(requestCmd[23]);

        obj.displaySign.lock = message.getBit(requestCmd, 26, 0);
        obj.displaySign.doorSwitch = message.getBit(requestCmd, 26, 1);
        this.doorStatus = message.getBit(requestCmd, 26, 1);
        obj.displaySign.waterBox = message.getBit(requestCmd, 26, 2);
        obj.displaySign.lackWater = message.getBit(requestCmd, 26, 3);
        obj.displaySign.changeWater = message.getBit(requestCmd, 26, 4);
        obj.displaySign.preheat = message.getBit(requestCmd, 26, 5);
        obj.displaySign.preheatTemperature = message.getBit(requestCmd, 26, 6);
        obj.displaySign.isError = message.getBit(requestCmd, 26, 7);

        obj.light.value = message.getBit(requestCmd, 27, 2);
        obj.isProbe.value = message.getBit(requestCmd, 27, 6);
        obj.highClearLock.value = message.getBit(requestCmd, 27, 3);
        obj.menuFeel.value = message.getBit(requestCmd, 27, 1);
        //设置温度

        obj.temperature.upHighTemperature = parseInt(requestCmd[28]);
        obj.temperature.upLowTemperature = parseInt(requestCmd[28]) > 0 ? (256 + parseInt(requestCmd[29])) : parseInt(requestCmd[29]);
        obj.temperature.downHighTemperature = parseInt(requestCmd[30]);
        obj.temperature.downLowTemperature = parseInt(requestCmd[30]) > 0 ? (256 + parseInt(requestCmd[31])) : parseInt(requestCmd[31]);

        //探针温度
        obj.probeRealTemperature.value = parseInt(requestCmd[32]);
        obj.probeSetttingTemperature.value = parseInt(requestCmd[33]);
        // if(obj.isProbe.value){ //如果是探针，则为显示为探针设定温度
        //   obj.temperature.upLowTemperature = parseInt(requestCmd[33]);
        // }
        obj.temperature.unit = message.getBit(requestCmd, 34, 4);
        // nativeService.alert(obj.temperature.unit);

        if (parseInt(requestCmd[19]) == 0xC4) {//如果是烘干，则不显示温度
            obj.temperature.upLowTemperature = 0;
        }

        obj.timeSetting.hour = parseInt(requestCmd[38]);
        obj.timeSetting.minute = parseInt(requestCmd[39]);
        obj.timeSetting.second = parseInt(requestCmd[40]);

        // obj.fire.value = parseInt(requestCmd[24])*10;  //parker
        obj.fire.value = parseInt(requestCmd[24]);  //parker: 火力不用*10了，统一用新协议0-10
        obj.weight.value = parseInt(requestCmd[25]) * 10;
        obj.steam.value = parseInt(requestCmd[25]);
        // nativeService.toast(requestCmd);
        return obj;
    },
};


