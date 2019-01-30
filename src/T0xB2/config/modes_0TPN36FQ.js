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
                    range:[1,119,1],
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
                settingHide:true //工作中隐藏设置参数
                // standbyHide: true //standbyHide=true 待机中隐藏该对象,默认false或者没有这个key
                // hms:{
                //     set:true,
                //     default:[0,40,40]
                // }
            },
            {
                'icon': modeIcons[17].dir,
                'text': modeIcons[17].cn,
                'mode': 0xC4,
                time:{
                    set: true,
                    default:30,
                    range:[1,60,1],
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
                settingHide:true
            },
            {
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time:{
                    set: true,
                    default:30,
                    range:[1,719,1],
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
            },
            {
                'icon': modeIcons[20].dir,
                'text': modeIcons[20].cn,
                'mode': 0xC6,
                time:{
                    set: false,
                    default:20,
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
                standbyHide: true,
            },
            {
                'icon': modeIcons[26].dir,
                'text': modeIcons[26].cn,
                'mode': 0x70,
                time:{
                    set: false,
                    default:20,
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
                standbyHide: true,
            },
            {
                'icon': modeIcons[14].dir,
                'text': modeIcons[14].cn,
                'mode': 0xA1,
                time:{
                    set: false,
                    default:20,
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
                standbyHide: true,
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
                standbyHide: true,
            },
           
        ]
    }
];

export default modes;