/**
 * Created by sf
 * 2018/10/20
 */
import constant from './constant';
import modeIcons from "../../common/mapping/modeIcons";

let lang = constant.device.lang || 'cn';

let timeCommon = {
    set: true,
    default:0,
    range:[0,100,3],
};

let fireAmountRange = [0,10, 1];


let tests = [
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[12].dir,
                'text': modeIcons[12][lang],
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
                'text': modeIcons[23][lang],
                'mode': 0xA0,
                weight:{
                    set:true,
                    default:4,
                    range:[4,100,1],
                    unit:"oz",
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
                'text': modeIcons[24][lang],
                'mode': 0xA1,
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

export default tests;