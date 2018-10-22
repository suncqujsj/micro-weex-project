/**
 * Created by sf
 * 2018/10/20
 */

let modes = [
    {
        title: '',
        iconButtons: [
            {
                'icon': 'assets/img/modes/steam@3x.png',
                'text': '蒸汽',
                'mode': 0x20,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
                },
                temperature:{
                    set: true,
                    default:100,
                    range:[50,100,10]
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
                'icon': 'assets/img/modes/steam_and_hot_wind@3x.png',
                'text': '蒸汽+热风对流',
                'mode': 0x31,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[180,220,10]
                },
                preheat:{
                    set:false,
                    default: false
                },
                steamAmount:{
                    set:true,
                    default:3,
                    range:[1,3,1]
                },
                fireAmount:{
                    set:false,
                    default:0
                }
            },
            {
                'icon': 'assets/img/modes/broil@3x.png',
                'text': '烧烤',
                'mode': 0x40,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
                },
                temperature:{
                    set: false,
                    default:180,
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
                    set:true,
                    default:3,
                    range:[1,3,1]
                },
            },
            {
                'icon': 'assets/img/modes/hot_wind@3x.png',
                'text': '热风对流',
                'mode': 0x41,
                time:{
                    set: true,
                    default:10,
                    range:[1,300,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,230,5]
                },
                preheat:{
                    set:true,
                    default: true
                },
                steamAmount:{
                    set:false,
                    default:0,
                    range:[1,3,1]
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                }
            }
        ]
    },
    {
        title: '',
        iconButtons: [
            {
                'icon': 'assets/img/modes/hot_wind_and_broil@3x.png',
                'text': '热风烧烤',
                'mode': 0x43,
                time:{
                    set: true,
                    default:90,
                    range:[1,300,1]
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[100,180,5]
                },
                preheat:{
                    set:true,
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
                'icon': 'assets/img/modes/clean@3x.png',
                'text': '清洁',
                'mode': 0xC1,
                time:{
                    set: false,
                    default:20,
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
                }
            },
            {
                'icon': 'assets/img/modes/heat_preservation@3x.png',
                'text': '保温',
                'mode': 0x41,
                time:{
                    set: true,
                    default:10,
                    range:[1,300,1]
                },
                temperature:{
                    set: false,
                    default:50,
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
            {
                'icon': 'assets/img/modes/fermentation@3x.png',
                'text': '发酵',
                'mode': 0xB0,
                time:{
                    set: true,
                    default:10,
                    range:[1,300,1]
                },
                temperature:{
                    set: false,
                    default:35,
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
            }
        ]
    }
];

export default modes;