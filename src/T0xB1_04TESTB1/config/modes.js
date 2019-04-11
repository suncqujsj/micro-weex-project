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
                'text': "Top&Bottom",
                'mode': 0x4C,
                time:{
                    set: true,
                    default:60,
                    range:[1,59,1,60,115,5,120,540,30],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[30,250,10],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                preheat:{
                    set:true,
                    default: true,
                    hide: true, //工作中，隐藏预热选择
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                steamAmount:{
                    set:false,
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
                    set: false,
                    default:60,
                    range:[50,100,1],
                },
                probe: false,//支持肉类探针

            },

            {
                'icon': modeIcons[1].dir,
                'text': "Hot Wind",
                'mode': 0x41,
                time:{
                    set: true,
                    default:60,
                    range:[1,59,1,60,115,5,120,540,30],
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[50,250,10]
                },
                preheat:{
                    set:true,
                    default: true,
                    hide: true, //工作中，隐藏预热选择
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                steamAmount:{
                    set:false,
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
                'icon': modeIcons[2].dir,
                'text': "All&Hot Wind",
                'ellipsisText': 'All&Hot Wind',
                'mode': 0x52,
                time:{
                    set: true,
                    default:60,
                    range:[1,59,1,60,115,5,120,540,30],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[50,250,10],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                preheat:{
                    set:true,
                    default: true,
                    hide: true, //工作中，隐藏预热选择
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                steamAmount:{
                    set:false,
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
                    set: false,
                    default:60,
                    range:[50,100,1],
                },
                probe:false //支持肉类探针
            },
            {
                'icon': modeIcons[4].dir,
                'text': "Infrared Grill",
                'mode': 0x47,
                time:{
                    set: true,
                    default:60,
                    range:[1,59,1,60,115,5,120,540,30],
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[150,250,10]
                },
                preheat:{
                    set:true,
                    default: true,
                    hide: true, //工作中，隐藏预热选择
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
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
                'icon': modeIcons[9].dir,
                'text': "Top&Infrared&HotWind",
                'ellipsisText': 'Top&Infrared&H..',
                'mode': 0x51,
                time:{
                    set: true,
                    default:60,
                    range:[1,59,1,60,115,5,120,540,30],
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[50,250,10]
                },
                preheat:{
                    set:true,
                    default: true,
                    hide: true, //工作中，隐藏预热选择
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
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
                'icon': `${'img/modes/'}${'up_double_grill@3x'}${'.png'}`,
                'text': "Top&Grill",
                'mode': 0x46,
                time:{
                    set: true,
                    default:60,
                    range:[1,59,1,60,115,5,120,540,30],
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[150,250,10]
                },
                preheat:{
                    set:true,
                    default: true,
                    hide: true, //工作中，隐藏预热选择
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
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
                'icon': modeIcons[8].dir,
                'text': "Pizza",
                'mode': 0x42,
                time:{
                    set: true,
                    default:60,
                    range:[1,59,1,60,115,5,120,540,30],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[50,250,10],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                preheat:{
                    set:true,
                    default: true,
                    hide: true,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                steamAmount:{
                    set:false,
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
                'icon': modeIcons[3].dir,
                'text': "Bottom",
                'mode': 0x49,
                time:{
                    set: true,
                    default:60,
                    range:[1,59,1,60,115,5,120,540,30],
                },
                temperature:{
                    set: true,
                    default:170,
                    range:[30,200,10],
                },
                preheat:{
                    set:true,
                    default: true,
                    hide: true, //工作中，隐藏预热选择
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
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
                'icon': modeIcons[24].dir,
                'text': "Defrost",
                'mode': 0xa1,
                time:{
                    set: true,
                    default:60,
                    range:[1,59,1,60,115,5,120,540,30],
                },
                temperature:{
                    set: false,
                    default:50,
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
                'icon': modeIcons[7].dir,
                'text': "Fermentation",
                'mode': 0xB0,
                time:{
                    set: true,
                    default:60,
                    range:[1,59,1,60,115,5,120,540,30],
                },
                temperature:{
                    set: true,
                    default:40,
                    range:[30,45,1]
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
            // {
            //     'icon': modeIcons[11].dir,
            //     'text': modeIcons[11].cn,
            //     'mode': 0x4c,
            //     time:{
            //         set: false,
            //         default:0,
            //         range:[1,300,1]
            //     },
            //     temperature:{
            //         set: false,
            //         default:180,
            //         range:[140,240,20]
            //     },
            //     preheat:{
            //         set:false,
            //         default: null,
            //         hide: true,
            //     },
            //     steamAmount:{
            //         set:false,
            //         default:0
            //     },
            //     fireAmount:{
            //         set:false,
            //         default:0
            //     }
            // },
        ]
    },
];

export default modes;