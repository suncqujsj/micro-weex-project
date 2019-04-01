/**
 * Created by sf
 * 2018/10/20
 */

import modeIcons from "../../common/mapping/modeIcons";
import constant from "@/T0xB0_01TESTB0/config/constant";
let probe = false;

let modes = [
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[15].dir,
                'text': "Top",
                'mode': 0x40,
                time:{
                    set: true,
                    default:20,
                    range:[1,120,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:350,
                    range:[300,450,10],
                    unit:'℉'
                },
                preheat:{
                    set:true,
                    default: 0,
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
                'text': "Bottom",
                'mode': 0x49,
                time:{
                    set: true,
                    default:25,
                    range:[1,120,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:350,
                    range:[300,450,10],
                    unit:"℉"
                },
                preheat:{
                    set:false,
                    default: 0,
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
                'text': "Top&Bottom",
                'mode': 0x4C,
                time:{
                    set: true,
                    default:10,
                    range:[1,120,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:350,
                    range:[300,450,10],
                    unit:"℉"
                },
                preheat:{
                    set:false,
                    default: 0,
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
                'icon': modeIcons[28].dir,
                'text': "Keep Warm",
                'mode': 0xD0,
                time:{
                    set: true,
                    default:60,
                    range:[1,120,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,200,10],
                    unit:'℉'
                },
                preheat:{
                    set:false,
                    default: 0,
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
];

export default modes;