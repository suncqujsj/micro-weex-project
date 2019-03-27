/**
 * Created by sf
 * 2018/10/20
 */
import modeIcons from "../../common/mapping/modeIcons";
let modes = [
    {
        title: '',
        iconButtons: [
            {   // 纯蒸汽
                'icon': modeIcons[16].dir,
                'text': modeIcons[16].cn,
                'mode': 0x20,
                time:{
                    set: true,
                    default:30,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:100,
                    range:[35,50,1,55,100,5],
                },
                preheat:{
                    set:false,
                    default: null,
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
                settingHide:true, //工作中隐藏设置参数
                circleProgressPointHide: true,
                // standbyHide: true //standbyHide=true 待机中隐藏该对象,默认false或者没有这个key
                // hms:{
                //     set:true,
                //     default:[0,40,40]
                // }
            },
            {   // 发酵
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time:{
                    set: true,
                    default:40,
                    range:[1,720,1],
                },
                temperature:{
                    set: true,
                    default:35,
                    range:[35,45,1],
                },
                preheat:{
                    set:false,
                    default: null,
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
                circleProgressPointHide: true,
            },
            {   // 保温
                'icon': modeIcons[28].dir,
                'text': modeIcons[28].cn,
                'mode': 0xD0,
                time:{
                    set: false,
                    default:40,
                    range:[1,720,1],
                },
                temperature:{
                    set: true,
                    default:60,
                    range:[50,80,5],
                },
                preheat:{
                    set:false,
                    default: null,
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
                circleProgressPointHide: true,
            },
            {   // 热风对流
                'icon': modeIcons[1].dir,
                'text': modeIcons[1].cn,
                'mode': 0x41,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1],
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[100,220,5],
                },
                preheat:{
                    set:false,
                    default: null,
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
                circleProgressPointHide: true,
            },
        ],
    },
    {
        title: '',
        iconButtons: [
            {   // 热风烧烤
                'icon': modeIcons[31].dir,
                'text': modeIcons[31].cn,
                'mode': 0x43,
                time:{
                    set: true,
                    default:25,
                    range:[1,120,1],
                },
                temperature:{
                    set: true,
                    default:150,
                    range:[100,230,5],
                },
                preheat:{
                    set:false,
                    default: null,
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
                settingHide:true, //工作中隐藏设置参数
                circleProgressPointHide: true,
                // standbyHide: true //standbyHide=true 待机中隐藏该对象,默认false或者没有这个key
                // hms:{
                //     set:true,
                //     default:[0,40,40]
                // }
            },
            {   // 上管+红外+风扇
                'icon': modeIcons[9].dir,
                'text': modeIcons[9].cn,
                'mode': 0x4a,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1],
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[100,180,5],
                },
                preheat:{
                    set:false,
                    default: null,
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
                settingHide:true, //工作中隐藏设置参数
                circleProgressPointHide: true,
                // standbyHide: true //standbyHide=true 待机中隐藏该对象,默认false或者没有这个key
                // hms:{
                //     set:true,
                //     default:[0,40,40]
                // }
            },
            {   // 热风对流+蒸汽
                'icon': modeIcons[35].dir,
                'text': modeIcons[35].cn,
                'mode': 0x31,
                time:{
                    set: true,
                    default:20,
                    range:[1,120,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,200,5],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                preheat:{
                    set:false,
                    default: null,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                fireAmount:{
                    set:false,
                    default:null,
                    range:null,
                    hide: null,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                settingHide:true, //工作中隐藏设置参数
                circleProgressPointHide: true,
                probeTemperature:{
                    set: true,
                    default:65,
                    range:[65,100,1],
                },
                probe: true,//支持肉类探针
                // standbyHide: true //standbyHide=true 待机中隐藏该对象,默认false或者没有这个key
                // hms:{
                //     set:true,
                //     default:[0,40,40]
                // }
            },
            {   // 立体烧烤+蒸汽
                'icon': modeIcons[36].dir,
                'text': modeIcons[36].cn,
                'mode': 0x33,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:200,
                    range:[100,230,5],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                preheat:{
                    set:false,
                    default: null,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                fireAmount:{
                    set:false,
                    default:null,
                    range:null,
                    hide: null,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                settingHide:true, //工作中隐藏设置参数
                circleProgressPointHide: true,
                probeTemperature:{
                    set: true,
                    default:70,
                    range:[70,100,1],
                },
                probe: true,//支持肉类探针
                // standbyHide: true //standbyHide=true 待机中隐藏该对象,默认false或者没有这个key
                // hms:{
                //     set:true,
                //     default:[0,40,40]
                // }
            },
        ],
    },
    {
        title: '',
        iconButtons: [
            {   // 烧烤+风扇+蒸汽  、 蒸汽+大面积+风扇
                'icon': modeIcons[38].dir,
                'text': modeIcons[38].cn,
                'ellipsisText': '蒸汽+大面积+...',
                'mode': 0x3A,
                time:{
                    set: true,
                    default:40,
                    range:[1,120,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:150,
                    range:[100,180,5],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                preheat:{
                    set:false,
                    default: null,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                fireAmount:{
                    set:false,
                    default:null,
                    range:null,
                    hide: null,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                settingHide:true, //工作中隐藏设置参数
                circleProgressPointHide: true,
                probeTemperature:{
                    set: true,
                    default:60,
                    range:[60,100,1],
                },
                probe: true,//支持肉类探针
                // standbyHide: true //standbyHide=true 待机中隐藏该对象,默认false或者没有这个key
                // hms:{
                //     set:true,
                //     default:[0,40,40]
                // }
            },
            {   // 烘干
                'icon': modeIcons[17].dir,
                'text': modeIcons[17].cn,
                'mode': 0xC4,
                time:{
                    set: true,
                    default:5,
                    range:[5,60,1],
                },
                temperature:{
                    set: false,
                    default:null,
                    range:null,
                },
                preheat:{
                    set:false,
                    default: false,
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
                circleProgressPointHide: true,
            },
            {   //清洁
                'icon': modeIcons[20].dir,
                'text': modeIcons[20].cn,
                'mode': 0xC1,
                time:{
                    set: false,
                    default:8,
                    range:[1,719,1],
                },
                temperature:{
                    set: false,
                    default:null,
                    range:[35,45,5],
                },
                preheat:{
                    set:false,
                    default: null,
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
                circleProgressPointHide: true,
            },
            {   // 快速预热
                'icon': modeIcons[11].dir,
                'text': modeIcons[11].cn,
                'mode': 0x4B,
                time:{
                    set: false,
                    default:30,
                    range:[1,120,1],
                },
                temperature:{
                    set: true,
                    default:150,
                    range:[100,230,5],
                },
                preheat:{
                    set:false,
                    default: null,
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
                settingHide:true, //工作中隐藏设置参数
                circleProgressPointHide: true,
                // standbyHide: true //standbyHide=true 待机中隐藏该对象,默认false或者没有这个key
                // hms:{
                //     set:true,
                //     default:[0,40,40]
                // }
            },
        ],
    },
];

export default modes;