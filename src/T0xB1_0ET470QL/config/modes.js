/**
 * Created by sf
 * 2018/10/20
 */

let modes = [
    {
        title: '',
        iconButtons: [
            {
                'icon': 'img/modes/up_down_pipe.png',
                'text': '上下管',
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
               
                probeTemperature:{
                    set: true,
                    default:60,
                    range:[50,100,1],
                },
                probe: true,//支持肉类探针
               
            },
           
            {
                'icon': 'img/modes/fermentation@3x.png',
                'text': '发酵',
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
                'icon': 'img/modes/hot_wind@3x.png',
                'text': '热风对流',
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
                'icon': 'img/modes/up_down_and_wind.png',
                'text': '上下管+风扇',
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
                'icon': 'img/modes/Infra-red.png',
                'text': '红外管',
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
                'icon': 'img/modes/down_pipe.png',
                'text': '下管',
                'mode': 0x49,
                time:{
                    set: true,
                    default:15,
                    range:[1,300,1]
                },
                temperature:{
                    set: true,
                    default:170,
                    range:[30,220,1]
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
                'icon': 'img/modes/up_hot_wind@3x.png',
                'text': '上管+红外+风扇',
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
                'icon': 'img/modes/descaling_cg.png',
                'text': '除垢',
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
            }, 
        ]
    },
    {
        title: '',
        iconButtons: [   
            {
                'icon': 'img/modes/quik_preheat@3x.png',
                'text': '快速预热',
                'mode': 0x4B,
                time:{
                    set: false,
                    default:null,
                    range:null
                },
                temperature:{
                    set: true,
                    default:180,
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
        ]
    },
];

export default modes;