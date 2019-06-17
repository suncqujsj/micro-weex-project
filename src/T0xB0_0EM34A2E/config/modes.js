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
                'text': "MICROWAVE",
                'mode': 0x01,
                time: {
                    set: true,
                    default:1,
                    range:[1,99,1],
                },
                fireAmount: {
                    set:true,
                    default:10,
                    range:[0,10, 1]
                },

            },
            {
                'icon': modeIcons[23].dir,
                'text': "WEIGHT DEFROST",
                'ellipsisText': 'WEIGHT DEFR..',
                'mode': 0xA0,
                weight:{
                    set:true,
                    default:20,
                    range:[4,70,1],
                    unit:"oz"
                },
                fireAmount: {
                    set:false,
                    default:null,
                    range:fireAmountRange
                },
                settingHide:true
            },
            {
                'icon': modeIcons[24].dir,
                'text': "TIME DEFROST",
                'mode': 0xA1,
                time: {
                    set: true,
                    default:10,
                    range:[1,99,1],
                },
                fireAmount: {
                    set:true,
                    default:3,
                    range:fireAmountRange,
                    hide:true
                },
                // settingHide:true
            },
        ]
    },
];

export default tests;