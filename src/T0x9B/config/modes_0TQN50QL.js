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
                // 'icon': modeIcons[11].dir,
                'icon': '',
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
            { // 立体烧烤、上下烧烤+风扇
                // 'icon': modeIcons[2].dir,
                'icon': '',
                'text': modeIcons[2].cn,
                'mode': 0x44,
                time:{
                    set: true,
                    default:60,
                    range:[1,300,1]
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

            { // 上下烤
                // 'icon': modeIcons[0].dir,
                'icon': '',
                'text': modeIcons[0].cn,
                'mode': 0x4C,
                time:{
                    set: true,
                    default:60,
                    range:[1,300,1]
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
                // 'icon': modeIcons[1].dir,
                'icon': '',
                'text': modeIcons[1].cn,
                'mode': 0x41,
                time:{
                    set: true,
                    default:30,
                    range:[1,300,1]
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
        ]
    },
    {
        title: '',
        iconButtons: [
            {//下管烧烤
                // 'icon': modeIcons[3].dir,
                'icon': '',
                'text': modeIcons[3].cn,
                'mode': 0x49,
                time:{
                    set: true,
                    default:15,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:150,
                    range:[50,100,1,105,230,5],
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
            {//
                // 'icon': modeIcons[9].dir,
                'icon': '',
                'text': modeIcons[9].cn,
                'mode': 0x51,
                time:{
                    set: true,
                    default:20,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,250,5],
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
            {
                // 'icon': modeIcons[6].dir,
                'icon': '',
                'text': modeIcons[6].cn,
                'mode': 0x46,
                time:{
                    set: true,
                    default:20,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:170,
                    range:[100,235,5],
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
                // 'icon': modeIcons[13].dir,
                'icon': '',
                'text': modeIcons[13].cn,
                'mode': 0x47,
                time:{
                    set: true,
                    default:10,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,235,5],
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
            {
                // 'icon': modeIcons[16].dir,
                'icon': '',
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
                    range:[35,70,1,75,100,5],
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
            { //蒸汽+上下烧烤
                'icon': '',
                'text': modeIcons[34].cn,
                'mode': 0x3C,
                time:{
                    set: true,
                    default:60,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:170,
                    range:[160,230,5],
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
            { //蒸汽+热风
                'icon': '',
                'text': modeIcons[35].cn,
                'mode': 0x31,
                time:{
                    set: true,
                    default:30,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[160,250,5],
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
            { //蒸汽+立体烧烤
                'icon': '',
                'text': modeIcons[36].cn,
                'mode': 0x34,
                time:{
                    set: true,
                    default:60,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:170,
                    range:[160,230,5],
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
        ]
    },
    {
        title:'',
        iconButtons:[
            { //蒸汽+底部烧烤
                'icon': '',
                'text': modeIcons[37].cn,
                'mode': 0x39,
                time:{
                    set: true,
                    default:15,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[160,230,5],
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
            { //蒸汽+大面积+风扇
                'icon': '',
                'text': modeIcons[38].cn,
                'mode': 0x61,
                time:{
                    set: true,
                    default:20,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[160,230,5],
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
            { //蒸汽+大面积
                'icon': '',
                'text': modeIcons[39].cn,
                'mode': 0x36,
                time:{
                    set: true,
                    default:20,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:170,
                    range:[160,250,5],
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
            { //蒸汽+小面积烧烤
                'icon': '',
                'text': modeIcons[40].cn,
                'mode': 0x37,
                time:{
                    set: true,
                    default:20,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[160,230,5],
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
        ]
    },
    {
        title:'',
        iconButtons:[
            {
                'icon': '',
                'text': modeIcons[30].cn,
                'mode': 0xE0,
                time:{
                    set: true,
                    default:15,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[160,230,5],
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
                standbyHide: true,
                settingHide:true,
                circleProgressPointHide: true,
            },
            {
                'icon': '',
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time:{
                    set: true,
                    default:15,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[160,230,5],
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
                standbyHide: true,
                settingHide:true,
                circleProgressPointHide: true,
            },
            {
                'icon': '',
                'text': modeIcons[20].cn,
                'mode': 0xC4,
                time:{
                    set: true,
                    default:15,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[160,230,5],
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
                standbyHide: true,
                settingHide:true,
                circleProgressPointHide: true,
            },
          
        ]
    },
];

export default modes;