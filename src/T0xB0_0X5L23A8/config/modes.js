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
                    set:true,
                    default:10,
                    range:[1,5,2,8,10,2],
                    hide: true
                },
               
            },
           
            { //烧烤
                'icon': modeIcons[13].dir,
                'text': modeIcons[13].cn,
                'mode': 0x40,
                time:{
                    set: true,
                    default:20,
                    range:[1,90,1],
                },
                temperature:{
                    set: true,
                    default:150,
                    range:[100,230,10]
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: false,
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
                    hide: false,
                },
                weight:{
                    set:true,
                    default:100,
                    range:[100,2000,100],
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
                    set: false,
                    default:false,
                    range:false
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: false,
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
            { //发酵
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time:{
                    set: true,
                    default:40,
                    range:[10,480,10],
                },
                temperature:{
                    set: false,
                    default:40,
                    range:false,
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: false,
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
];

export default modes;