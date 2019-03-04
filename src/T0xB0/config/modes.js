/**
 * Created by sf
 * 2018/10/20
 */
import modeIcons from "../../common/mapping/modeIcons";
let modes = [
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[16].dir,
                'text': modeIcons[16].cn,
                'mode': 0x20,
                time:{
                    set: false,
                    default:20,
                    range:[1,120,1],
                },
                temperature:{
                    set: true,
                    default:100,
                    range:[90,100,5],
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
                // standbyHide: true //standbyHide=true 待机中隐藏该对象,默认false或者没有这个key
                circleProgressPointHide: true,
                // hms:{
                //     set:true,
                //     default:[0,40,40]
                // }
            },
            {
                'icon': modeIcons[13].dir,
                'text': modeIcons[13].cn,
                'mode': 0x40,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1],
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,300,10],
                },
                preheat:{
                    set:true,
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
            {
                'icon': modeIcons[27].dir,
                'text': modeIcons[27].cn,
                'mode': 0x03,
                time:{
                    set: true,
                    default:1,
                    range:[1,30,1],
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
            {
                'icon': modeIcons[20].dir,
                'text': modeIcons[20].cn,
                'mode': 0xC6,
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
        ],
        
    },
    {
        title:'',
        iconButtons:[
             //以下为待机中隐藏的对象
             {
                'icon': modeIcons[25].dir,
                'text': modeIcons[25].cn,
                'mode': 0x90,
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
            {
                'icon': modeIcons[26].dir,
                'text': modeIcons[26].cn,
                'mode': 0x70,
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
            {
                'icon': modeIcons[14].dir,
                'text': modeIcons[14].cn,
                'mode': 0xA0,
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
            {
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time:{
                    set: true,
                    default:30,
                    range:[1,720,1],
                },
                temperature:{
                    set: true,
                    default:35,
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
            {
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
            {
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
            {
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
                'icon': modeIcons[29].dir,
                'text': modeIcons[29].cn,
                'mode': 0x01,
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