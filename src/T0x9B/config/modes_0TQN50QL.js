/**
 * Created by sf
 * 2018/10/20
 */
import modeIcons from "../../common/mapping/modeIcons";
let modes = [
    {
        title: '',
        iconButtons: [
            { // 快速预热
                'icon': modeIcons[11].dir,
                // 'icon': '',
                'text': modeIcons[11].cn,
                'mode': 0x4B,
                time:{
                    set: false,
                    default:null,
                    range:null
                },
                temperature:{
                    set: true,
                    default:150,
                    range:[100,230,5]
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
            { // 上下烤
                'icon': modeIcons[0].dir,
                'text': modeIcons[0].cn,
                'mode': 0x4C,
                time:{
                    set: true,
                    default:60,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:170,
                    range:[50,100,1,105,230,5]
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
            { // 热风
                'icon': modeIcons[1].dir,
                // 'icon': '',
                'text': modeIcons[1].cn,
                'mode': 0x41,
                time:{
                    set: true,
                    default:30,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[50,100,1,105,250,5]
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
            { // 立体烧烤、上下烧烤+风扇
                'icon': modeIcons[2].dir,
                // 'icon': '',
                'text': '立体烧烤',
                'mode': 0x44,
                time:{
                    set: true,
                    default:60,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:170,
                    range:[50,100,1,105,230,5]
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
    {
        title: '',
        iconButtons: [
            { // 底部烧烤
                'icon': modeIcons[3].dir,
                // 'icon': '',
                'text': '底部烧烤',
                'mode': 0x49,
                time:{
                    set: true,
                    default:15,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:150,
                    range:[100,230,5]
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
            { // 大面积+风扇
                'icon': modeIcons[5].dir,
                'text': '大面积+风扇',
                'mode': 0x51,
                time:{
                    set: true,
                    default:20,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,250,5]
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
            { // 大面积烧烤
                'icon': modeIcons[6].dir,
                'text': '大面积烧烤',
                'mode': 0x46,
                time:{
                    set: true,
                    default:20,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:170,
                    range:[100,235,5]
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
            { // 小面积烧烤
                'icon': modeIcons[4].dir,
                'text': '小面积烧烤',
                'mode': 0x47,
                time:{
                    set: true,
                    default:10,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,235,5]
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
    {
        title: '',
        iconButtons: [
            { // 蒸汽
                'icon': modeIcons[33].dir,
                // 'icon': '',
                'text': modeIcons[33].cn,
                'mode': 0x20,
                time:{
                    set: true,
                    default:30,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:100,
                    range:[35,50,1,55,100,5]
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
            { // 蒸汽+上下烧烤
                'icon': modeIcons[34].dir,
                'text': modeIcons[34].cn,
                'mode': 0x3C,
                time:{
                    set: true,
                    default:60,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:170,
                    range:[160,230,5]
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
            { // 蒸汽+热风
                'icon': modeIcons[35].dir,
                'text': modeIcons[35].cn,
                'mode': 0x31,
                time:{
                    set: true,
                    default:30,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[160,250,5]
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
            { // 蒸汽+立体烧烤
                'icon': modeIcons[36].dir,
                'text': modeIcons[36].cn,
                'mode': 0x34,
                time:{
                    set: true,
                    default:60,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:170,
                    range:[160,230,5]
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
    {
        title: '',
        iconButtons: [
            { // 蒸汽+底部烧烤
                'icon': modeIcons[37].dir,
                // 'icon': '',
                'text': modeIcons[37].cn,
                'mode': 0x39,
                time:{
                    set: true,
                    default:15,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[160,230,5]
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
            { // 蒸汽+大面积+风扇
                'icon': modeIcons[38].dir,
                'text': modeIcons[38].cn,
                'mode': 0x61,
                time:{
                    set: true,
                    default:20,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[160,230,5]
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
            { // 蒸汽+大面积烧烤
                'icon': modeIcons[39].dir,
                'text': modeIcons[39].cn,
                'mode': 0x36,
                time:{
                    set: true,
                    default:20,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[160,230,5]
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
            { // 蒸汽+小面积烧烤
                'icon': modeIcons[40].dir,
                'text': modeIcons[40].cn,
                'mode': 0x37,
                time:{
                    set: true,
                    default:10,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[160,235,5]
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
    {
        title: '',
        iconButtons: [
            { // 发酵
                'icon': modeIcons[7].dir,
                // 'icon': '',
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time:{
                    set: true,
                    default:40,
                    range:[1,60,1,65,120,5,130,720,10]
                },
                temperature:{
                    set: true,
                    default:35,
                    range:[35,45,1]
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
            { // 烘干
                'icon': modeIcons[17].dir,
                'text': modeIcons[17].cn,
                'mode': 0xC4,
                time:{
                    set: true,
                    default:5,
                    range:[1,60,1]
                },
                temperature:{
                    set: false,
                    default:180,
                    range:[160,230,5]
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
            { // 清洁
                'icon': modeIcons[20].dir,
                'text': modeIcons[20].cn,
                'mode': 0xC1,
                time:{
                    set: false,
                    default:20,
                    range:[1,60,1,65,120,5,150,300,30]
                },
                temperature:{
                    set: false,
                    default:180,
                    range:[160,230,5]
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