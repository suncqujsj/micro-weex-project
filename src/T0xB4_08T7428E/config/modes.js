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
                'icon': modeIcons[15].dir,
                'text': modeIcons[15].cn,
                'mode': 0x40,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:220,
                    range:[60,230,5]
                },
                preheat:{
                    set:true,
                    default: 1,
                    workingPreheatHide: true,
                }
            },
            {
                'icon': modeIcons[3].dir,
                'text': modeIcons[3].cn,
                'mode': 0x49,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:220,
                    range:[60,230,5]
                },
                preheat:{
                    set:true,
                    default: 1,
                    workingPreheatHide: true,
                }
            },
            {
                'icon': modeIcons[0].dir,
                'text': modeIcons[0].cn,
                'mode': 0x4C,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:220,
                    range:[60,230,5]
                },
                preheat:{
                    set:true,
                    default: 1,
                    workingPreheatHide: true,
                }
            },
            {
                'icon': modeIcons[31].dir,
                'text': modeIcons[31].cn,
                'mode': 0x43,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:220,
                    range:[60,230,5]
                },
                preheat:{
                    set:true,
                    default: 1,
                    workingPreheatHide: true,
                }
            }
        ]
    },
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[32].dir,
                'text': modeIcons[32].cn,
                'mode': 0x4E,
                time:{
                    set: true,
                    default:30,
                    range:[1,120,1]
                },
                temperature:{
                    set: true,
                    default:220,
                    range:[60,230,5]
                },
                preheat:{
                    set:true,
                    default: 1,
                    workingPreheatHide: true,
                }
            },
            {
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time:{
                    set: true,
                    default:40,
                    range:[1,240,1]
                },
                temperature:{
                    set: true,
                    default:40,
                    range:[35,40,1]
                },
                preheat:{
                    set:false
                }
            },
        ]
    },
];

export default modes;