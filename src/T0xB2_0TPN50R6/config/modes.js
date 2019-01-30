/**
 * Created by parker
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
                    set: true,
                    default:10,
                    range:[1,300,1]
                },
                temperature:{
                    set: true,
                    default:100,
                    range:[35,70,1,75,100,5]
                },
                preheat:{
                    set:false,
                    default: false
                },
                steamAmount:{
                    set:false,
                    default:0
                },
                fireAmount:{
                    set:false,
                    default:0
                }
            },
            {
                'icon': modeIcons[10].dir,
                'text': modeIcons[10].cn,
                'mode': 0xC1,
                time:{
                    set: false,
                    default:15,
                    range:null
                },
                temperature:{
                    set: false,
                    default:0,
                    range:null
                },
                preheat:{
                    set:false,
                    default: false
                },
                steamAmount:{
                    set:false,
                    default:0,
                    range:null
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                },
                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
            },
           
            {
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time:{
                    set: true,
                    default:40,
                    range:[5,720,1]
                },
                temperature:{
                    set: true,
                    default:40,
                    range:[35,45,1]
                },
                preheat:{
                    set:false,
                    default: false
                },
                steamAmount:{
                    set:false,
                    default:0,
                    range:null
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                }
            },
            {
                'icon': modeIcons[17].dir,
                'text': modeIcons[17].cn,
                'mode': 0xC4,
                time:{
                    set: true,
                    default:5,
                    range:[5,60,1]
                },
                temperature:{
                    set: false,
                    default:0,
                    range:null
                },
                preheat:{
                    set:false,
                    default: false
                },
                steamAmount:{
                    set:false,
                    default:0,
                    range:null
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                }
            },
        ]
    },
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[20].dir,
                'text': modeIcons[20].cn,
                'mode': 0xC6,
                time:{
                    set: false,
                    default:5,
                    range:null
                },
                temperature:{
                    set: false,
                    default:0,
                    range:null
                },
                preheat:{
                    set:false,
                    default: false
                },
                steamAmount:{
                    set:false,
                    default:0
                },
                fireAmount:{
                    set:false,
                    default:0
                },
                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
            },
        ]
    },
];

export default modes;