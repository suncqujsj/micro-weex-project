/**
 * Created by sf
 * 2018/10/20
 */

import modeIcons from "../../common/mapping/modeIcons";

let modes = [
    {
        title: '',
        iconButtons: [
            { // 上烤
                'icon': modeIcons[15].dir,
                'text': modeIcons[15].cn,
                'mode': 0x05,
                time:{
                    set: true,
                    default:60,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[70,180,10]
                },
                preheat:{
                    set:false,
                    default: 1,
                    workingPreheatHide: true,
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
            { // 下烤
                'icon': modeIcons[3].dir,
                'text': modeIcons[3].cn,
                'mode': 0x0A,
                time:{
                    set: true,
                    default:60,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[70,180,10]
                },
                preheat:{
                    set:false,
                    default: 1,
                    workingPreheatHide: true,
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

            { // 上下烤
                'icon': modeIcons[0].dir,
                'text': modeIcons[0].cn,
                'mode': 0x01,
                time:{
                    set: true,
                    default:60,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:230,
                    range:[70,230,10]
                },
                preheat:{
                    set:false,
                    default: 1,
                    workingPreheatHide: true,
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

            { // 热风
                'icon': modeIcons[1].dir,
                'text': modeIcons[1].cn,
                'mode': 0x08,
                time:{
                    set: true,
                    default:60,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:230,
                    range:[70,230,10]
                },
                preheat:{
                    set:false,
                    default: 1,
                    workingPreheatHide: true,
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

            { // 旋转
                'icon': modeIcons[2].dir,
                'text': modeIcons[2].cn,
                'mode': 0x07,
                time:{
                    set: true,
                    default:60,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[70,180,10]
                },
                preheat:{
                    set:false,
                    default: 1,
                    workingPreheatHide: true,
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

            { // 发酵
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0x09,
                time:{
                    set: true,
                    default:60,
                    range:[1,240,1]
                },
                temperature:{
                    set: true,
                    default:38,
                    range:[38,38,0]
                },
                preheat:{
                    set:false,
                    default: 1,
                    workingPreheatHide: true,
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
        ]
    },
];

export default modes;