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
                'icon': modeIcons[16].dir,
                'text': modeIcons[16].cn,
                'mode': 0x20,
                time:{
                    set: false,
                    default:20,
                    range:[1,119,1],
                },
                temperature:{
                    set: true,
                    default:100,
                    range:[90,100,5],
                },
                preheat:{
                    set:false,
                    default: null,
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                },
                fireAmount:{
                    set:false,
                    default:null,
                    range:null,
                    hide: null
                },
                hms:{
                    set:true,
                    default:[0,40,40]
                }
            },
            {
                'icon': modeIcons[13].dir,
                'text': modeIcons[13].cn,
                'mode': 0x40,
                time:{
                    set: true,
                    default:30,
                    range:[1,119,1],
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,300,10],
                },
                preheat:{
                    set:true,
                    default: false,
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                },
                fireAmount:{
                    set:false,
                    default:null,
                    range:null,
                    hide: null
                },
            },
            {
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time:{
                    set: true,
                    default:30,
                    range:[1,719,1],
                },
                temperature:{
                    set: true,
                    default:35,
                    range:[35,45,5],
                },
                preheat:{
                    set:false,
                    default: null,
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                },
                fireAmount:{
                    set:false,
                    default:null,
                    range:null,
                    hide: null
                },
            },
        ]
    },
];

export default modes;