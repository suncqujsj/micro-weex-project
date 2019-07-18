/**
 * Created by sf
 * 2018/10/20
 */
import modeIcons from "../../common/mapping/modeIcons";
let modes = [
    {
        title: '',
        iconButtons: [
            {   // 微波加热
                'icon': modeIcons[12].dir,
                'text': modeIcons[12].cn,
                'mode': 0x01,
                time:{
                    set: true,
                    default:1,
                    range:[1,95,1],
                },
                temperature:{
                    set: false,
                    default:null,
                    range:null,
                },
                preheat:{
                    set:false,
                    default: null,
                    hide: true, //工作中，隐藏预热选择
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
                    hide: true, //工作中，隐藏预热选择
                },
               
            },
            { //烧烤
                'icon': modeIcons[13].dir,
                'text': modeIcons[13].cn,
                'mode': 0x4C,
                time:{
                    set: true,
                    default:30,
                    range:[1,90,1],
                },
                temperature:{
                    set: true,
                    default:150,
                    range:[100,230,10],
                    hide: true, //工作中，隐藏预热选择
                },
                preheat:{
                    set:true,
                    default: false,
                    hide: true, //工作中，隐藏预热选择
                },
                steamAmount:{
                    set:false,
                    default:false,
                    range:false
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                }
                // stopBtnHide:true, // 如果工作中没有暂停按钮，则设为 true ，默认是有暂停按钮的（无需专门设置）
            },
            { //解冻
                'icon': modeIcons[14].dir,
                'text': modeIcons[14].cn,
                'mode': 0xA0,
                time:{
                    set: false,
                    default:false,
                    range:false,
                },
                temperature:{
                    set: false,
                    default:false,
                    range:false
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: true, //工作中，隐藏预热选择
                },
                weight:{
                    set:true,
                    default:100,
                    range:[100,2000,100],
                    hide: true, //工作中，隐藏预热选择
                },
                steamAmount:{
                    set:false,
                    default:false,
                    range:false,
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null,
                },
                settingHide:true

            },
            { //蒸汽
                'icon': modeIcons[16].dir,
                'text': modeIcons[16].cn,
                'mode': 0x20,
                time:{
                    set: true,
                    default:15,
                    range:[1,90,1],
                },
                temperature:{
                    set: true,
                    default:100,
                    range:[50,100,10],
                    hide: true, //工作中，隐藏预热选择
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: true, //工作中，隐藏预热选择
                },
                weight:{
                    set:false,
                    default:false,
                    range:false,
                    hide: true
                },
                steamAmount:{
                    set:false,
                    default:false,
                    range:false,
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null,
                },
                settingHide:false

            },
        ]
    },
    {
        title: '',
        iconButtons: [
            { //发酵
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time:{
                    set: true,
                    default:30,
                    range:[1,540,1],
                },
                temperature:{
                    set: true,
                    default:40,
                    range:[35,40,5],
                    hide: true, //工作中，隐藏预热选择
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: true, //工作中，隐藏预热选择
                },
                weight:{
                    set:false,
                    default:false,
                    range:false,
                    hide: true
                },
                steamAmount:{
                    set:false,
                    default:false,
                    range:false,
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null,
                },
                settingHide:false

            },
            {   // 炉腔清洁
                'icon': modeIcons[20].dir,
                'text': modeIcons[20].cn,
                'mode': 0xC6,
                time:{
                    set: false,
                    default:5,
                    range:[1,95,1],
                },
                temperature:{
                    set: false,
                    default:null,
                    range:null,
                },
                preheat:{
                    set:false,
                    default: null,
                    hide: true, //工作中，隐藏预热选择
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                },
                fireAmount:{
                    set:false,
                    default:10,
                    range:[1,5,2,8,10,2],
                    hide: true
                },
                settingHide:true
            },
            {   // 除味
                'icon': modeIcons[21].dir,
                'text': modeIcons[21].cn,
                'mode': 0xC3,
                time:{
                    set: false,
                    default:5,
                    range:[1,95,1],
                },
                temperature:{
                    set: false,
                    default:null,
                    range:null,
                },
                preheat:{
                    set:false,
                    default: null,
                    hide: true, //工作中，隐藏预热选择
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                },
                fireAmount:{
                    set:false,
                    default:10,
                    range:[1,5,2,8,10,2],
                    hide: true
                },
                settingHide:true
            },
            {   // 水垢清洁 or 炉腔除垢，常用有2种叫法
                'icon': modeIcons[10].dir,
                'text': modeIcons[10].cn,
                'mode': 0xC1,
                time:{
                    set: false,
                    default:5,
                    range:[1,95,1],
                },
                temperature:{
                    set: false,
                    default:null,
                    range:null,
                },
                preheat:{
                    set:false,
                    default: null,
                    hide: true, //工作中，隐藏预热选择
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                },
                fireAmount:{
                    set:false,
                    default:10,
                    range:[1,5,2,8,10,2],
                    hide: true
                },
                settingHide:true
            },
        ]
    },
];

export default modes;