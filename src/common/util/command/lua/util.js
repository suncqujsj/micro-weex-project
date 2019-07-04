// 本解析js专门针对 新协议，支持微蒸烤所有产品  Giggs

import message from "@/common/util/smartMessage";
import sensoryMenus from '@/common/mapping/sensoryMenus'
import nativeService from '@/common/services/nativeService';
import { Transform } from "stream";
// import {device} from "../config/constant";
// import modes from "../config/modes.js";
// import autoMenu from "../config/auto-menu.js";
var latesFrameRecord = 0;
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

    tranformToValue(which){
        
    },
   
    analysisCmd: function (requestCmd, tabs) {
        var obj = this.initAnalysisObj();
        // obj.cmdLength = parseInt(requestCmd[1]); // 指令长度
        obj.workingState.value = this.tranformToValue('work_status');
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


