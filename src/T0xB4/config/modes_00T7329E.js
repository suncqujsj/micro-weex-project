/**
 * Created by giggs , 兼容老协议版本中的 工作模式、温度、时间等参数。已检查ok
 * 2018/10/20
 */

import modeIcons from "../../common/mapping/modeIcons";

let modes = [
    {
        title: '',
        iconButtons: [
            { // 上烤
                'icon': modeIcons[15].dir,
                'text': modeIcons[15].cn,
                'mode': 0x05,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[70,180,10]
                },
                preheat:{
                    set:true,
                    default: 0,
                    workingPreheatHide: true,
                },
                steamAmount:{
                    set:false,
                    default:0,
                    range:[1,4,1,"取消"]
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                },
                stopBtnHide: true,
                settingHide:true,
                circleProgressPointHide: true,
            },
            { // 下烤
                'icon': modeIcons[3].dir,
                'text': modeIcons[3].cn,
                'mode': 0x0A,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[70,180,10]
                },
                preheat:{
                    set:true,
                    default: 0,
                    workingPreheatHide: true,
                },
                steamAmount:{
                    set:false,
                    default:0,
                    range:[1,4,1,"取消"]
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                },
                stopBtnHide: true,
                settingHide:true,
                circleProgressPointHide: true,
            },

            { // 上下烤
                'icon': modeIcons[0].dir,
                'text': modeIcons[0].cn,
                'mode': 0x06,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1]
                },
                upTemperature:{
                    set: true,
                    default:230,
                    range:[70,230,10]
                },
                downTemperature:{
                    set: true,
                    default:230,
                    range:[70,230,10]
                },
                preheat:{
                    set:true,
                    default: 0,
                    workingPreheatHide: true,
                },
                steamAmount:{
                    set:false,
                    default:0,
                    range:[1,4,1,"取消"]
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                },
                stopBtnHide: true,
                settingHide:true,
                circleProgressPointHide: true,
            },


            { // 热风
                'icon': modeIcons[1].dir,
                'text': modeIcons[1].cn,
                'mode': 0x08,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:230,
                    range:[70,230,10]
                },
                preheat:{
                    set:true,
                    default: 0,
                    workingPreheatHide: true,
                },
                steamAmount:{
                    set:false,
                    default:0,
                    range:[1,4,1,"取消"]
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                },
                stopBtnHide: true,
                settingHide:true,
                circleProgressPointHide: true,
            },
        ]
    },
    {
        title: '',
        iconButtons: [

            { // 旋转
                'icon': modeIcons[41].dir,
                'text': modeIcons[41].cn,
                'mode': 0x07,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[70,180,10]
                },
                preheat:{
                    set:true,
                    default: 0,
                    workingPreheatHide: true,
                },
                steamAmount:{
                    set:false,
                    default:0,
                    range:[1,4,1,"取消"]
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                },
                stopBtnHide: true,
                settingHide:true,
                circleProgressPointHide: true,
            },

            { // 发酵
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0x09,
                time:{
                    set: true,
                    default:90,
                    range:[1,540,1]
                },
                temperature:{
                    set: true,
                    default:38,
                    range:[38,38,1]
                },
                preheat:{
                    set:false,
                    default: 0,
                    workingPreheatHide: true,
                },
                steamAmount:{
                    set:false,
                    default:0,
                    range:[1,4,1,"取消"]
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                },
                stopBtnHide: true,
                settingHide:true,
                circleProgressPointHide: true,
            },
        ]
    },
];

export default modes;