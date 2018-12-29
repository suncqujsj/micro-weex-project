/**
 * Created by sf
 * 2018/10/20
 */

let modes = [
    {
        title: '',
        iconButtons: [
            {
                'icon': 'img/modes/up_down_tube@3x.png',
                'text': '微波加热',
                'mode': 0x01,
                time:{
                    set: true,
                    default:20,
                    range:[5,95,1],
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
                    range:[10,50,20,80,100,20],
                    hide: true
                },
               
            },
           
            {
                'icon': 'img/modes/fermentation@3x.png',
                'text': '烧烤',
                'mode': 0x40,
                time:{
                    set: true,
                    default:20,
                    range:[5,95,1],
                },
                temperature:{
                    set: false,
                    default:false,
                    range:null
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
            {
                'icon': 'img/modes/hot_wind@3x.png',
                'text': '解冻',
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
        ]
    },
];

export default modes;