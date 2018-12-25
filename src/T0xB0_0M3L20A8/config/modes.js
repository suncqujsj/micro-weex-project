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
                'text': '微波加热',
                'mode': 0x01,
                time:{
                    set: true,
                    default:10,
                    range:[1,540,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: false,
                    default:null,
                    range:[30,250,1],
                },
                preheat:{
                    set:false,
                    default: null,
                    hide: true, //工作中，隐藏预热选择
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:[0,4,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                fireAmount:{
                    set:true,
                    default:10,
                    range:[1,10,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
               
            },
           
            {
                'icon': 'img/modes/fermentation@3x.png',
                'text': '烧烤',
                'mode': 0x40,
                time:{
                    set: true,
                    default:40,
                    range:[5,540,1]
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
                    default:40,
                    range:[0,0,1,40,40,1]
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                }
            },
            {
                'icon': 'img/modes/hot_wind@3x.png',
                'text': '解冻',
                'mode': 0xA0,
                time:{
                    set: true,
                    default:30,
                    range:[1,540,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[50,250,1],
                },
                preheat:{
                    set:true,
                    default: 1,
                    hide: true,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                steamAmount:{
                    set:true,
                    default:2,
                    range:[0,4,1],
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null,
                    isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
            },
        ]
    },
];

export default modes;