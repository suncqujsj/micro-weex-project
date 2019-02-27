/**
 * Created by parker
 * 2018/10/20
 */
import modeIcons from "../../common/mapping/modeIcons";
let modes = [
    {
        title: '',
        iconButtons: [
            {    // 纯蒸
                'icon': modeIcons[16].dir,
                'text': modeIcons[16].cn,
                'mode': 0x20,
                time:{
                    set: true,
                    default:10,
                    range:[1,120,1]
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
            {    // 清洁
                'icon': modeIcons[20].dir,
                'text': modeIcons[20].cn,
                'mode': 0xC1, // Giggs，根据协议清洁应该用 0xC6，但是这款是协议未跟新之前，所以用0xc1
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
           
            {    // 发酵
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time:{
                    set: true,
                    default:40,
                    range:[5,60,1,65,120,5,150,720,30]
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
            {    // 烘干
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
];

export default modes;