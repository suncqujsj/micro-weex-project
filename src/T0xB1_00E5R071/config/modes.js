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
                'text': "BAKE",
                'mode': 0x49,
                time: {
                    set: true,
                    default:10,
                    range:[1,60,1,65,120,5,130,720,10],
                },
                fireAmount: {
                    set:true,
                    default:10,
                    range:fireAmountRange
                },

            },
            {
                'icon': modeIcons[23].dir,
                'text': "WARM",
                // 'ellipsisText': 'WEIGHT DEFRO..',
                'mode': 0xD0,
                time: {
                    set: true,
                    default:10,
                    range:[1,60,1,65,120,5,130,720,10],
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
                'text': "PROOF",
                'mode': 0xA1,
                time: {
                    set: true,
                    default:10,
                    range:[1,60,1,65,120,5,130,720,10],
                },
                fireAmount: {
                    set:true,
                    default:3,
                    range:fireAmountRange,
                    hide:true
                },
                // settingHide:true
            },
            {
                'icon': modeIcons[24].dir,
                'text': "BROIL-HL",
                'mode': 0xA1,
                time: {
                    set: true,
                    default:10,
                    range:[1,60,1,65,120,5,130,720,10],
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
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[12].dir,
                'text': "BROIL-LL",
                'mode': 0x49,
                time: {
                    set: true,
                    default:10,
                    range:[1,60,1,65,120,5,130,720,10],
                },
                fireAmount: {
                    set:true,
                    default:10,
                    range:fireAmountRange
                },

            },
            {
                'icon': modeIcons[23].dir,
                'text': "CONVECT",
                // 'ellipsisText': 'WEIGHT DEFRO..',
                'mode': 0xD0,
                time: {
                    set: true,
                    default:10,
                    range:[1,60,1,65,120,5,130,720,10],
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
                'text': "CONVECT ROAST",
                'mode': 0xA1,
                time: {
                    set: true,
                    default:10,
                    range:[1,60,1,65,120,5,130,720,10],
                },
                fireAmount: {
                    set:true,
                    default:3,
                    range:fireAmountRange,
                    hide:true
                },
                // settingHide:true
            },
            {
                'icon': modeIcons[24].dir,
                'text': "PIZZA",
                'mode': 0xA1,
                time: {
                    set: true,
                    default:10,
                    range:[1,60,1,65,120,5,130,720,10],
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
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[12].dir,
                'text': "PROBE",
                'mode': 0x49,
                time: {
                    set: true,
                    default:1,
                    range:[1,60,1,65,120,5,130,720,10],
                },
                fireAmount: {
                    set:true,
                    default:10,
                    range:fireAmountRange
                },

            },
            {
                'icon': modeIcons[23].dir,
                'text': "STEAM CLEAN",
                // 'ellipsisText': 'WEIGHT DEFRO..',
                'mode': 0xD0,
                time: {
                    set: true,
                    default:10,
                    range:[1,60,1,65,120,5,130,720,10],
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
                'text': "SELF CLEAN",
                'mode': 0xA1,
                time: {
                    set: true,
                    default:10,
                    range:[1,60,1,65,120,5,130,720,10],
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