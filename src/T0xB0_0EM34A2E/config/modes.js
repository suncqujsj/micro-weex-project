/**
 * Created by sf
 * 2018/10/20
 */
import constant from './constant';
import modeIcons from "../../common/mapping/modeIcons";

let lang = constant.device.lang || 'cn';

let fireAmountRange = [1,10, 1];


let tests = [
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[12].dir,
                'text': modeIcons[12][lang],
                'mode': 0x01,
                time: {
                    set: true,
                    default:1,
                    range:[1,60,1],
                },
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
                    range:[4,10,1],
                    unit:"oz"
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
                time: {
                    set: true,
                    default:10,
                    range:[1,60,1],
                },
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