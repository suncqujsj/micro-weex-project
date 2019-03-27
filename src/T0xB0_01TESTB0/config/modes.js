/**
 * Created by sf
 * 2018/10/20
 */
import constant from './constant';
import modeIcons from "../../common/mapping/modeIcons";

let lang = constant.device.lang || 'cn';

let timeCommon = {
    set: true,
    default:1,
    range:[1,100,1],
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
                'icon': modeIcons[13].dir,
                'text': modeIcons[13][lang],
                'mode': 0x40,
                time: timeCommon,
                temperature: {
                    set:true,
                    default:160,
                    range:[160,230,10],
                },
            },
            {
                'icon': modeIcons[22].dir,
                'text': modeIcons[22][lang],
                'mode': 0x70,
                time: timeCommon,
                fireAmount: {
                    set:true,
                    default:6,
                    range:fireAmountRange
                },
                temperature: {
                    set:true,
                    default:160,
                    range:[160,230,10],
                },
            },
            {
                'icon': modeIcons[1].dir,
                'text': modeIcons[1][lang],
                'mode': 0x41,
                time: timeCommon,
                temperature: {
                    set:true,
                    default:160,
                    range:[160,230,10],
                },
            },
        ]
    },
    {
        title: '',
        iconButtons: [

            {
                'icon': modeIcons[23].dir,
                'text': modeIcons[23][lang],
                'mode': 0xA0,
                weight:{
                    set:true,
                    default:100,
                    range:[100,1000,100],
                },
                fireAmount: {
                    set:true,
                    default:5,
                    range:fireAmountRange
                },
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
            },
            {
                'icon': modeIcons[27].dir,
                'text': modeIcons[27][lang],
                'mode': 0x03,
                time: timeCommon,
                fireAmount: {
                    set:true,
                    default:10,
                    range:fireAmountRange
                },
            },
        ]
    },
];

export default tests;