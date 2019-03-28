/**
 * Created by sf
 * 2019/03/20
 */

import modeIcons from "../../common/mapping/modeIcons";
let probe = false;
let preheatDefault = false;
let udTemperature = {
        set: true,
        default:220,
        range:[60,230,5],
    };

let modes = [
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[15].dir,
                'text': modeIcons[15].cn,
                'mode': 0x40,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:350,
                    range:[300,450,10],
                },
                preheat:{
                    set:true,
                    default: preheatDefault,
                    workingPreheatHide: true,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                probeTemperature:{
                    set: probe,
                    default:65,
                    range:[30,90,1],
                },
                probe,//支持肉类探针
                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                stopBtnHide: true
            },
            {
                'icon': modeIcons[3].dir,
                'text': modeIcons[3].cn,
                'mode': 0x49,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:220,
                    range:[60,230,5],
                },
                preheat:{
                    set:true,
                    default: preheatDefault,
                    workingPreheatHide: true,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                probeTemperature:{
                    set: probe,
                    default:65,
                    range:[30,90,1],
                },
                probe,//支持肉类探针
                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                stopBtnHide: true
            },
            {
                'icon': modeIcons[0].dir,
                'text': modeIcons[0].cn,
                'mode': 0x4C,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                upTemperature:udTemperature,
                downTemperature:udTemperature,
                preheat:{
                    set:true,
                    default: preheatDefault,
                    workingPreheatHide: true,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                probeTemperature:{
                    set: probe,
                    default:65,
                    range:[30,90,1],
                },
                probe,//支持肉类探针
                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                stopBtnHide: true
            },
            {
                'icon': modeIcons[31].dir,
                'text': modeIcons[31].cn,
                'mode': 0x43,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:220,
                    range:[60,230,5],
                },
                preheat:{
                    set:true,
                    default: preheatDefault,
                    workingPreheatHide: true,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                probeTemperature:{
                    set: probe,
                    default:65,
                    range:[30,90,1],
                },
                probe,//支持肉类探针
                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                stopBtnHide: true
            }
        ]
    },
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[32].dir,
                'text': modeIcons[32].cn,
                'mode': 0x4E,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:220,
                    range:[60,230,5]
                },
                preheat:{
                    set:true,
                    default: preheatDefault,
                    workingPreheatHide: true,
                },
                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                stopBtnHide: true
            },
            {
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time:{
                    set: true,
                    default:40,
                    range:[1,240,1]
                },
                temperature:{
                    set: true,
                    default:40,
                    range:[35,40,1]
                },
                preheat:{
                    set:false
                },
                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                stopBtnHide: true
            },
        ]
    },
];

export default modes;