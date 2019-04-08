/**
 * Created by sf
 * 2018/10/20
 */
import modeIcons from "../../common/mapping/modeIcons";
import constant from "../config/constant";

let lang = constant.device.lang || 'cn';

let modes = [
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[12].dir,
                'text': modeIcons[12][lang],
                'mode': 0x01,
                time:{
                    set: true,
                    default:5,
                    range:[1,95,1],
                },
                temperature:{
                    set: false,
                    default:null,
                    range:[35,45,5],
                },
                preheat:{
                    set:false,
                    default: null,
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                },
                fireAmount:{
                    set:true,
                    default:10,
                    range:[1,5,2,8,10,2],
                    hide: null
                },
                settingHide:true,
                circleProgressPointHide: true,
            },
            {
                'icon': modeIcons[13].dir,
                'text': "Grill",
                'mode': 0x40,
                time:{
                    set: true,
                    default:30,
                    range:[1,95,1],
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,250,10],
                },
                preheat:{
                    set:true,
                    default: false,
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                },
                fireAmount:{
                    set:false,
                    default:null,
                    range:null,
                    hide: null
                },
                settingHide:true,
                circleProgressPointHide: true,
            },
            {
                'icon': modeIcons[23].dir,
                'text': modeIcons[23][lang],
                'mode': 0xA0,
                weight:{
                    set:true,
                    default:100,
                    range:[100,2000,100],
                },
                fireAmount: {
                    set:false,
                    default:5,
                    range: [1,10, 1]
                },
                time:{
                    set: false,
                    default:30,
                    range:[1,119,1],
                },
                temperature:{
                    set: false,
                    default:180,
                    range:[100,300,10],
                },
                preheat:{
                    set:false,
                    default: false,
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                },
                settingHide:true,
                circleProgressPointHide: true,
            },
            {
                'icon': modeIcons[24].dir,
                'text': modeIcons[24][lang],
                'mode': 0xA1,
                fireAmount: {
                    set:false,
                    default:5,
                    range: [1,10, 1]
                },
                time:{
                    set: true,
                    default:10,
                    range:[1,59,1],
                },
                temperature:{
                    set: false,
                    default:null,
                    range:[35,45,5],
                },
                preheat:{
                    set:false,
                    default: null,
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                },
                settingHide: true,
                circleProgressPointHide: true,
            },
        ],
    },
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[22].dir,
                'text': "Micro&Grill",
                'mode': 0x70,
                time:{
                    set: true,
                    default:30,
                    range:[1,95,1],
                },
                temperature:{
                    set: true,
                    default:180,
                    range:[100,250,10],
                },
                preheat:{
                    set:false,
                    default: null,
                },
                steamAmount:{
                    set:false,
                    default:null,
                    range:null,
                },
                fireAmount:{
                    set:true,
                    default:10,
                    range:[1,5,2,8,10,2],
                    hide: null
                },
                settingHide:true,
                circleProgressPointHide: true,
            },
        ],
    },
];

export default modes;