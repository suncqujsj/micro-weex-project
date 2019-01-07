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
                'mode': 0x40,
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
                    default: 1,
                    workingPreheatHide: true,
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
        ]
    },
];

export default modes;