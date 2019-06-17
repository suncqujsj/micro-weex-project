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
                'icon': modeIcons[0].dir,
                'text': modeIcons[0].cn,
                'mode': 0x4C,
                time:{
                    set: true,
                    default:60,
                    range:[1,300,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[30,250,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                preheat:{
                    set:true,
                    default: true,
                    hide: true, //工作中，隐藏预热选择
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                steamAmount:{
                    set:true,
                    default:0,
                    range:[0,4,1],
                    // isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                // stopBtnHide:true,//工作中没有暂停按钮，默认有
                probeTemperature:{
                    set: true,
                    default:60,
                    range:[50,100,1],
                },
                probe: true,//支持肉类探针
               
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
                    range:[30,50,1]
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: true,
                },
                steamAmount:{
                    set:true,
                    default:0,
                    range:[0,1,1]
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                },
                // steamSwitch:{
                //     set:true,
                //     default: false,
                //     hide: true,
                // }
            },
            {
                'icon': modeIcons[1].dir,
                'text': modeIcons[1].cn,
                'mode': 0x41,
                time:{
                    set: true,
                    default:30,
                    range:[1,300,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[50,250,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                preheat:{
                    set:true,
                    default: true,
                    hide: true,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                steamAmount:{
                    set:true,
                    default:0,
                    range:[0,4,1],
                    // isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                probeTemperature:{
                    set: true,
                    default:60,
                    range:[50,100,1],
                },
                probe:true //支持肉类探针
            },
            {
                'icon': modeIcons[2].dir,
                'text': modeIcons[2].cn,
                'mode': 0x52,
                time:{
                    set: true,
                    default:60,
                    range:[1,300,1]
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[50,250,1]
                },
                preheat:{
                    set:true,
                    default: true,
                    hide: true,
                },
                steamAmount:{
                    set:false,
                    default:0
                },
                fireAmount:{
                    set:false,
                    default:0
                },
            },
        ]
    },
    {
        title: '',
        iconButtons: [
          
            {
                'icon': modeIcons[4].dir,
                'text': modeIcons[4].cn,
                'mode': 0x47,
                time:{
                    set: true,
                    default:10,
                    range:[1,300,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[150,250,1]
                },
                preheat:{
                    set:true,
                    default: true,
                    hide: true,
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
                'icon': modeIcons[3].dir,
                'text': modeIcons[3].cn,
                'mode': 0x49,
                time:{
                    set: true,
                    default:15,
                    range:[1,300,1]
                },
                temperature:{
                    set: true,
                    default:170,
                    range:[30,200,1]
                },
                preheat:{
                    set:true,
                    default: true,
                    hide: true,
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
                'icon': modeIcons[9].dir,
                'text': modeIcons[9].cn,
                'mode': 0x51,
                time:{
                    set: true,
                    default:20,
                    range:[1,300,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[50,250,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                preheat:{
                    set:true,
                    default: true,
                    hide: true,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                steamAmount:{
                    set:true,
                    default:0,
                    range:[0,4,1],
                    // isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                fireAmount:{
                    set:false,
                    default:0,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                probeTemperature:{
                    set: true,
                    default:60,
                    range:[50,100,1],
                },
                probe: true,
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
                    default:null,
                    range:null
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: true,
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                },
                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
            }, 
        ]
    },
    {
        title: '',
        iconButtons: [   
            {
                'icon': modeIcons[11].dir,
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
                    range:[100,230,1]
                },
                preheat:{
                    set:false,
                    default: null,
                    hide: true,
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
                    default:120,
                    range:null
                },
                preheat:{
                    set:false,
                    default: null,
                    hide: true,
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
                'icon': modeIcons[19].dir,
                'text': modeIcons[19].cn,
                'mode': 0x4D,
                time:{
                    set: true,
                    default:60,
                    range:[1,300,1]
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[140,240,20]
                },
                preheat:{
                    set:false,
                    default: null,
                    hide: true,
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
        ]
    },
];

export default modes;