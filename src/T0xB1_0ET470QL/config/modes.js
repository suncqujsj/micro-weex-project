/**
 * Created by sf
 * 2018/10/20
 */

let modes = [
    {
        title: '',
        iconButtons: [
            {
                'icon': 'assets/img/modes/up_down_pipe.png',
                'text': '上下管',
                'mode': 0x4C,
                time:{
                    set: true,
                    default:60,
                    range:[1,540,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[30,250,1]
                },
                preheat:{
                    set:true,
                    default: 1
                },
                steamAmount:{
                    set:true,
                    default:2,
                    range:[1,4,1,"取消"]
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
                    default: false
                },
                steamAmount:{
                    set:true,
                    default:2,
                    range:[40,40,1,"取消"]
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                }
            },
            {
                'icon': 'assets/img/modes/hot_wind@3x.png',
                'text': '热风对流',
                'mode': 0x41,
                time:{
                    set: true,
                    default:30,
                    range:[1,540,1]
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[50,250,1]
                },
                preheat:{
                    set:true,
                    default: 1
                },
                steamAmount:{
                    set:true,
                    default:2,
                    range:[1,4,1,"取消"]
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null
                }
            },
            {
                'icon': 'assets/img/modes/up_down_and_wind.png',
                'text': '上下管+风扇',
                'mode': 0x52,
                time:{
                    set: true,
                    default:60,
                    range:[1,540,1]
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[50,250,1]
                },
                preheat:{
                    set:true,
                    default: 0
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
    {
        title: '',
        iconButtons: [
          
            {
                'icon': 'assets/img/modes/Infra-red.png',
                'text': '红外管',
                'mode': 0x47,
                time:{
                    set: true,
                    default:10,
                    range:[1,540,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[150,250,1]
                },
                preheat:{
                    set:true,
                    default: 0
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
                'icon': 'assets/img/modes/down_pipe.png',
                'text': '下管',
                'mode': 0x49,
                time:{
                    set: true,
                    default:15,
                    range:[1,540,1]
                },
                temperature:{
                    set: true,
                    default:170,
                    range:[30,220,1]
                },
                preheat:{
                    set:true,
                    default: 0
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
                'icon': 'assets/img/modes/down_pipe.png',
                'text': '上管+红外+风扇',
                'mode': 0x51,
                time:{
                    set: true,
                    default:20,
                    range:[1,540,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[50,250,1]
                },
                preheat:{
                    set:true,
                    default: 1
                },
                steamAmount:{
                    set:true,
                    default:2,
                    range:[1,4,1,"取消"]
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