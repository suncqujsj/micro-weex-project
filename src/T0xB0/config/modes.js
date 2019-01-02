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
                'icon': modeIcons[12].dir,
                'text': modeIcons[12].cn,
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
                'icon': modeIcons[13].dir,
                'text': modeIcons[13].cn,
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
                'icon': modeIcons[14].dir,
                'text': modeIcons[14].cn,
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