/**
 * Created by giggs , 兼容老协议版本中的 工作模式、温度、时间等参数。已检查ok
 * 2018/10/20
 */

import modeIcons from "../../common/mapping/modeIcons";

let modes = [
    {
        title: '',
        iconButtons: [
            { // 解冻
                'icon': modeIcons[24].dir,
                'text': modeIcons[24].cn,
                'mode': 0xa1,
                time:{
                    set: true,
                    default:30,
                    range:[1,60,1,65,115,5,120,540,30]
                },
                temperature:{
                    set: false,
                    default:35,
                    range:[30,40,1]
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
                // standbyHide:true,
                settingHide:true,
                circleProgressPointHide: true,
            },
            { // 快速预热
                'icon': modeIcons[11].dir,
                'text': modeIcons[11].cn,
                'mode': 0x4b,
                time:{
                    set: false,
                    default:15,
                    range:[1,540,1]
                },
                temperature:{
                    set: false,
                    default:180,
                    range:[160,180,5]
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
                settingHide:true,
                circleProgressPointHide: true,
            },
            { // 发酵
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xb0,
                time:{
                    set: true,
                    default:30,
                    range:[1,60,1,65,115,5,120,540,30]
                },
                temperature:{
                    set: true,
                    default:35,
                    range:[30,40,1]
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
                settingHide:true,
                circleProgressPointHide: true,
            },
            {   // 保温
                'icon': modeIcons[28].dir,
                'text': modeIcons[28].cn,
                'mode': 0xD0,
                time:{
                    set: true,
                    default:1,
                    range:[1,60,1,65,115,5,120,540,30]
                },
                temperature:{
                    set: true,
                    default:60,
                    range:[60,100,1,105,120,5]
                },
                preheat:{
                    set:true,
                    default: 0,
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                },
                fireAmount:{
                    set:false,
                    default:null,
                    range:null,
                    hide: null
                },
                settingHide:true,
                // standbyHide: true,
                circleProgressPointHide: true,
            },
        ]
    },
    {
        title: '',
        iconButtons: [
            { // 上下烧烤
                'icon': modeIcons[0].dir,
                'text': '烧烤',
                'mode': 0x4c,
                time:{
                    set: true,
                    default:1,
                    range:[1,60,1,65,115,5,120,540,30]
                },
                temperature:{
                    set: true,
                    default:220,
                    range:[50,100,1,105,250,5]
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
                settingHide:true,
                circleProgressPointHide: true,
            },
            { // 上下烧烤+风扇/立体烧烤
                'icon': modeIcons[2].dir,
                'text': '立体烧烤',
                'mode': 0x44,
                time:{
                    set: true,
                    default:1,
                    range:[1,60,1,65,115,5,120,540,30]
                },
                temperature:{
                    set: true,
                    default:220,
                    range:[50,100,1,105,250,5]
                },
                preheat:{
                    set:true,
                    default: 0,
                    workingPreheatHide: true,
                },
                steamAmount:{
                    set:false,
                    default:2,
                    range:[1,4,1,"取消"]
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                },
                settingHide:true,
                circleProgressPointHide: true,
            },
            { // 上管+红外+风扇/中心烧烤
                'icon': modeIcons[9].dir,
                'text': '中心烧烤',
                'mode': 0x46,
                time:{
                    set: true,
                    default:1,
                    range:[1,60,1,65,115,5,120,540,30]
                },
                temperature:{
                    set: true,
                    default:210,
                    range:[180,240,5]
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
                settingHide:true,
                circleProgressPointHide: true,
            },
            { // 双层烧烤
                'icon': modeIcons[42].dir,
                'text': modeIcons[42].cn,
                'mode': 0x50,
                time:{
                    set: true,
                    default:1,
                    range:[1,60,1,65,115,5,120,540,30]
                },
                temperature:{
                    set: true,
                    default:210,
                    range:[180,240,5]
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
                // standbyHide:true,
                settingHide:true,
                circleProgressPointHide: true,
            },
        ]
    },
    {
        title: '',
        iconButtons: [
            { // 旋转小份量上色
                'icon': modeIcons[41].dir,
                'text': modeIcons[41].cn,
                'mode': 0x4F,
                time:{
                    set: true,
                    default:1,
                    range:[1,60,1,65,115,5,120,540,30]
                },
                temperature:{
                    set: true,
                    default:210,
                    range:[180,240,5]
                },
                preheat:{
                    set:true,
                    default: 0,
                    workingPreheatHide: true,
                },
                steamAmount:{
                    set:false,
                    default:2,
                    range:[1,4,1,"取消"]
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                },
                settingHide:true,
                circleProgressPointHide: true,
            },
            { // 热风对流
                'icon': modeIcons[1].dir,
                'text': modeIcons[1].cn,
                'mode': 0x41,
                time:{
                    set: true,
                    default:1,
                    range:[1,60,1,65,115,5,120,540,30]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[50,100,1,105,240,5]
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
                settingHide:true,
                circleProgressPointHide: true,
            },
            { // 高温自清洁
                'icon': modeIcons[20].dir,
                'text': modeIcons[20].cn,
                'mode': 0xC0,
                time:{
                    set: true,
                    default:90,
                    range:[90,120,30]
                },
                temperature:{
                    set: true,
                    default:450,
                    range:[450,450,1]
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
                settingHide:true,
                circleProgressPointHide: true,
            },
        ]
    },
];

export default modes;