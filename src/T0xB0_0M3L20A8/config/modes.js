 /**
 * Created by sf
 * 2018/10/20
 */
import modeIcons from "../../common/mapping/modeIcons";
 let timeCommon = {
     set: true,
     default:5,
     range:[1,95,1],
 };


let modes = [
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[12].dir,
                'text': modeIcons[12].cn,
                'mode': 0x01,
                time: timeCommon,
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
                    default:30,
                    range:[30,50,20,80,80,1,100,100,1],
                    hide: true
                },
               
            },
           
            {
                'icon': modeIcons[13].dir,
                'text': '薄块烧烤',
                'mode': 0x40,
                time: timeCommon,
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
                'icon': modeIcons[22].dir,
                'text': '双模快烤',
                'mode': 0x70,
                time: timeCommon,
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
                    set:false,
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

            },
            {
                'icon': modeIcons[23].dir,
                'text': modeIcons[23].cn,
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