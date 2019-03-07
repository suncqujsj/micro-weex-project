 /**
 * Created by sf
 * 2018/10/20
 */
import modeIcons from "../../common/mapping/modeIcons";
 let timeCommon = {
     set: true,
     default:0,
     range:[0,100,1],
 };

 let fireAmountRange = [0,10, 1];


let modes = [
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[12].dir,
                'text': modeIcons[12].en,
                'mode': 0x01,
                time: timeCommon,
                fireAmount: {
                    set:true,
                    default:10,
                    range:fireAmountRange
                },
               
            },
            {
                'icon': modeIcons[23].dir,
                'text': modeIcons[23].en,
                'mode': 0xA0,
                weight:{
                    set:true,
                    default:4,
                    range:[4,100,1]
                },
                fireAmount: {
                    set:true,
                    default:5,
                    range:fireAmountRange
                },
                settingHide:true

            },
            {
                'icon': modeIcons[24].dir,
                'text': modeIcons[24].en,
                'mode': 0xA0,
                time: timeCommon,
                fireAmount: {
                    set:true,
                    default:3,
                    range:fireAmountRange
                },
                settingHide:true

            },
        ]
    },
];

export default modes;