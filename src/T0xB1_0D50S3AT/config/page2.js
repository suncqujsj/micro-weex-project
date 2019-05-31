/**
 * Created by sf
 * 2018/11/14
 */

import modeIcons from "../../common/mapping/modeIcons";
let modes = [
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[1].dir,
                'text': modeIcons[1].cn,
                'mode': 0x41,
                time:{
                    set: true,
                    default:30,
                    range:[1,300,1],
                    // isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:170,
                    range:[50,250,1],
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: false, //工作中，隐藏预热选择
                },
                steamAmount:{
                    set:false,
                    default:0,
                    range:null,
                    // isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null,
                },
               
                // probeTemperature:{
                //     set: true,
                //     default:60,
                //     range:[50,100,1],
                // },
                // probe: true,//支持肉类探针
               
            },
           
            {
                'icon': modeIcons[0].dir,
                'text': modeIcons[0].cn,
                'mode': 0x4C,
                time:{
                    set: true,
                    default:45,
                    range:[1,300,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[50,250,1]
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: false,
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
                // steamSwitch:{
                //     set:true,
                //     default: false,
                //     hide: true,
                // }
            },
            {
                'icon': modeIcons[15].dir,
                'text': modeIcons[15].cn,
                'mode': 0x47,
                time:{
                    set: true,
                    default:30,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:150,
                    range:[50,250,1],
                },
                preheat:{
                    set:false,
                    default: false,
                },
                steamAmount:{
                    set:false,
                    default:0,
                    range:null,
                    // isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null,
                },
                // probeTemperature:{
                //     set: true,
                //     default:60,
                //     range:[50,100,1],
                // },
                // probe:true //支持肉类探针
            },
            {
                'icon': modeIcons[3].dir,
                'text': modeIcons[3].cn,
                'mode': 0x49,
                time:{
                    set: true,
                    default:30,
                    range:[1,300,1]
                },
                temperature:{
                    set: true,
                    default:150,
                    range:[50,250,1]
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: false,
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
                'icon': modeIcons[28].dir,
                'text': modeIcons[28].cn,
                'mode': 0xD0,
                time:{
                    set: true,
                    default:45,
                    range:[1,300,1]
                },
                temperature:{
                    set: true,
                    default:75,
                    range:[60,100,1]
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: false,
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
                    default:20,
                    range:[1,300,1]
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[50,220,1]
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: false,
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
                    default:170,
                    range:[50,250,1]
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
                },
                settingHide: true
            },
        ]
    },
];

let page = {
    tabs: [
        // {
        //     name:'自动菜单',
        //     active:true,
        //     rows:autoMenu
        // },
        {
            name:'加热模式',
            active:true,
            rows:modes
        }
    ]
};

export default page;