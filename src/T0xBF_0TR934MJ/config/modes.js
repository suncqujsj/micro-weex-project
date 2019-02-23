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
                'icon': modeIcons[33].dir,
                'text': modeIcons[33].cn,
                'mode': 0x20,
                time: {
                    set: true,
                    default:5,
                    range:[1,95,1],
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
                    default:30,
                    range:[30,50,20,80,80,1,100,100,1],
                    hide: true
                },
               
            },
        ]
    },
];

export default modes;