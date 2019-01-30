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
                    hide:true,
                    default: false
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
                    default:160,
                    range:[50,50,1,100,250,5]
                },
                preheat:{
                    set:true,
                    hide:true,
                    default: false
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
                    hide:true,
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
                    hide:true,
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
                'icon': modeIcons[5].dir,
                'text': modeIcons[5].cn,
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
                    hide:true,
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
                'icon': modeIcons[6].dir,
                'text': modeIcons[6].cn,
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
                    hide:true,
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
                    default:180,
                    range:[100,235,5]
                },
                preheat:{
                    set:true,
                    hide:true,
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
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time:{
                    set: true,
                    default:30,
                    range:[1,60,1,65,120,5,150,720,30]
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
                    default:2,
                    range:[40,40,1,"取消"]
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
                'icon': modeIcons[8].dir,
                'text': modeIcons[8].cn,
                'mode': 0x42,
                time:{
                    set: true,
                    default:30,
                    range:[2,540,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[50,50,1,100,250,5]
                },
                preheat:{
                    set:true,
                    hide:true,
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
            }

        ]
    },
];

export default modes;