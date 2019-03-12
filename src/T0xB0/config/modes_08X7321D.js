/**
 * Created by sf
 * 2018/10/20
 */
import modeIcons from "../../common/mapping/modeIcons";
let modes = [
    {
        title: '',
        iconButtons: [
            {      // 烘烤/发酵
                'icon': modeIcons[13].dir,
                'text': '烘烤/发酵',
                'mode': 0xB0,
                time:{
                    set: true,
                    default:1,
                    range:[1,99,1],
                },
                temperature:{
                    set: true,
                    default:40,
                    range:[40,40,0,100,300,10],
                },
                preheat:{
                    set:true,
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
                // standbyHide: true //standbyHide=true 待机中隐藏该对象,默认false或者没有这个key
                circleProgressPointHide: true,
                // hms:{
                //     set:true,
                //     default:[0,40,40]
                // }
            },
            {   // 蒸汽
                'icon': modeIcons[16].dir,
                'text': modeIcons[16].cn,
                'mode': 0x20,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1],
                },
                temperature:{
                    set: false,
                    default:180,
                    range:[100,300,10],
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
            {   // 微波
                'icon': modeIcons[12].dir,
                'text': modeIcons[12].cn,
                'mode': 0x01,
                time:{
                    set: true,
                    default:1,
                    range:[1,99,1],
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
                    set:true,
                    default:10,
                    range:[1,5,2,8,10,2],
                    hide: null
                },
                settingHide:true,
                circleProgressPointHide: true,
            },
            {   // 快蒸
                'icon': modeIcons[39].dir,
                'text': '快蒸',
                'mode': 0x90,
                time:{
                    set: true,
                    default:1,
                    range:[1,99,1],
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
                // standbyHide: true,
                circleProgressPointHide: true,
            },
        ],
        
    },
    {
        title: '',
        iconButtons: [
            {      // 快烤
                'icon': modeIcons[13].dir,
                'text': '快烤',
                'mode': 0x70,
                time:{
                    set: true,
                    default:1,
                    range:[1,99,1],
                },
                temperature:{
                    set: false,
                    default:40,
                    range:[40,40,0,100,300,10],
                },
                preheat:{
                    set:true,
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
                // standbyHide: true //standbyHide=true 待机中隐藏该对象,默认false或者没有这个key
                circleProgressPointHide: true,
                // hms:{
                //     set:true,
                //     default:[0,40,40]
                // }
            },
            {   // 解冻
                'icon': modeIcons[23].dir,
                'text': '解冻',
                'mode': 0xA0,
                time:{
                    set: false,
                    default:30,
                    range:[1,120,1],
                },
                temperature:{
                    set: false,
                    default:180,
                    range:[100,300,10],
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
            {   // 复脆
                'icon': modeIcons[29].dir,
                'text': '复脆',
                'mode': 0x1E,
                time:{
                    set: true,
                    default:1,
                    range:[1,99,1],
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
        ],

    },


    {
        title:'',
        iconButtons:[
            {   // 保温
                'icon': modeIcons[28].dir,
                'text': modeIcons[28].cn,
                'mode': 0xD0,
                time:{
                    set: false,
                    default:20,
                    range:[1,720,1],
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
                standbyHide: true,
                circleProgressPointHide: true,
            },
           
        ]
    },
    {
        title:'',
        iconButtons:[
            {   // 智能清洗
                'icon': modeIcons[20].dir,
                'text': modeIcons[20].cn,
                'mode': 0xC5,
                time:{
                    set: false,
                    default:20,
                    range:[1,720,1],
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
                standbyHide: true,
                circleProgressPointHide: true,
            },
           
        ]
    },
    {
        title:'',
        iconButtons:[
            {   // 清洁
                'icon': modeIcons[20].dir,
                'text': modeIcons[20].cn,
                'mode': 0xC1,
                time:{
                    set: false,
                    default:20,
                    range:[1,720,1],
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
                standbyHide: true,
                circleProgressPointHide: true,
            },
           
        ]
    },
    {
        title:'',
        iconButtons:[
            {   // 除味
                'icon': modeIcons[20].dir,
                'text': modeIcons[20].cn,
                'mode': 0xC3,
                time:{
                    set: false,
                    default:20,
                    range:[1,720,1],
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
                standbyHide: true,
                circleProgressPointHide: true,
            },
        ]
    },
    {
        title:'',
        iconButtons:[
            {
                'icon': modeIcons[30].dir,
                'text': modeIcons[30].cn,
                'mode': 0xE0,
                time:{
                    set: false,
                    default:20,
                    range:[1,720,1],
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
                standbyHide: true,
                circleProgressPointHide: true,
            },
        ]
    }
];

export default modes;