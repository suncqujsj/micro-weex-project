/**
 * Created by sf
 * 2018/12/15
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
                    default:30,
                    range:[1,540,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,235,5]
                },
                preheat:{
                    set:true,
                    default: 1
                },
                steamAmount:{
                    set:false,
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
                'icon': modeIcons[1].dir,
                'text': modeIcons[1].cn,
                'mode': 0x41,
                time:{
                    set: true,
                    default:30,
                    range:[1,540,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,250,5]
                },
                preheat:{
                    set:true,
                    default: 1
                },
                steamAmount:{
                    set:false,
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
                'icon': modeIcons[2].dir,
                'text': modeIcons[2].cn,
                'mode': 0x52,
                time:{
                    set: true,
                    default:30,
                    range:[1,540,1]
                },
                temperature:{
                    set: true,
                    default:160,
                    range:[50,50,1, 100,235,5]
                },
                preheat:{
                    set:true,
                    default: false
                },
                steamAmount:{
                    set:false,
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
                'icon': modeIcons[3].dir,
                'text': modeIcons[3].cn,
                'mode': 0x49,
                time:{
                    set: true,
                    default:30,
                    range:[1,540,1]
                },
                temperature:{
                    set: true,
                    default:150,
                    range:[50,50,1, 100,235,5]
                },
                preheat:{
                    set:true,
                    default: false
                },
                steamAmount:{
                    set:false,
                    default:2,
                    range:[40,40,1,"取消"]
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
                'icon': 'assets/img/modes/fermentation@3x.png',
                'text': '双上管+风扇',
                'mode': 0x51,
                time:{
                    set: true,
                    default:30,
                    range:[1,540,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,235,5]
                },
                preheat:{
                    set:true,
                    default: false
                },
                steamAmount:{
                    set:false,
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
                'icon': 'assets/img/modes/fermentation@3x.png',
                'text': '双上管烧烤',
                'mode': 0x46,
                time:{
                    set: true,
                    default:30,
                    range:[1,540,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,235,5]
                },
                preheat:{
                    set:true,
                    default: false
                },
                steamAmount:{
                    set:false,
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
                'icon': modeIcons[4].dir,
                'text': modeIcons[4].cn,
                'mode': 0x47,
                time:{
                    set: true,
                    default:30,
                    range:[1,540,1]
                },
                temperature:{
                    set: true,
                    default:150,
                    range:[100,235,5]
                },
                preheat:{
                    set:true,
                    default: false
                },
                steamAmount:{
                    set:false,
                    default:2,
                    range:[40,40,1,"取消"]
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