/**
 * Created by sf
 * 2018/10/20
 */
import modeIcons from "../../common/mapping/modeIcons";
let modes = [
    {
        title: '',
        iconButtons: [
            {//蒸汽
                'icon': modeIcons[33].dir,
                'text': modeIcons[33].cn,
                'mode': 0x20,
                time: {
                    set: true,
                    default: 10,
                    range: [1, 90, 1]
                },
                temperature: {
                    set: true,
                    default: 100,
                    range: [50, 100, 10]
                },
                preheat: {
                    set: false,
                    default: false
                },
                steamAmount: {
                    set: false,
                    default: 0
                },
                fireAmount: {
                    set: false,
                    default: 0
                },
                settingHide: true,
            },
            {//蒸汽+热风对流
                'icon': modeIcons[35].dir,
                'text': modeIcons[35].cn,
                'mode': 0x31,
                time: {
                    set: true,
                    default: 10,
                    range: [1, 90, 1]
                },
                temperature: {
                    set: true,
                    default: 180,
                    range: [180, 220, 10]
                },
                preheat: {
                    set: false,
                    default: false
                },
                steamAmount: {
                    set: true,
                    default: 3,
                    range: [1, 3, 1],
                    hide: true
                },
                fireAmount: {
                    set: false,
                    default: 0
                },
                settingHide: true,
            },
            {//烧烤
                'icon': modeIcons[13].dir,
                'text': modeIcons[13].cn,
                'mode': 0x40,
                time: {
                    set: true,
                    default: 10,
                    range: [1, 90, 1]
                },
                temperature: {
                    set: false,
                    default: false,
                    range: null
                },
                preheat: {
                    set: false,
                    default: false
                },
                steamAmount: {
                    set: false,
                    default: 0
                },
                fireAmount: {
                    set: true,
                    default: 3,
                    range: [1, 3, 1]
                    // set:false,
                    // default:0,
                    // range:null
                },
                settingHide: true,
            },
            {//热风对流
                'icon': modeIcons[1].dir,
                'text': modeIcons[1].cn,
                'mode': 0x41,
                time: {
                    set: true,
                    default: 10,
                    range: [1, 300, 1]
                },
                temperature: {
                    set: true,
                    default: 180,
                    range: [100, 230, 5]
                },
                preheat: {
                    set: true,
                    default: true
                },
                steamAmount: {
                    set: false,
                    default: 0,
                    range: [1, 3, 1]
                },
                fireAmount: {
                    set: false,
                    default: 0,
                    range: null
                },
                settingHide: true,

            }
        ]
    },
    {
        title: '',
        iconButtons: [
            {//热风烧烤
                'icon': modeIcons[31].dir,
                'text': modeIcons[31].cn,
                'mode': 0x43,
                time: {
                    set: true,
                    default: 90,
                    range: [1, 300, 1]
                },
                temperature: {
                    set: true,
                    default: 160,
                    range: [100, 180, 5]
                },
                preheat: {
                    set: true,
                    default: true
                },
                steamAmount: {
                    set: false,
                    default: 0
                },
                fireAmount: {
                    set: false,
                    default: 0
                },
                settingHide: true,
            },
            {//清洁
                'icon': modeIcons[20].dir,
                'text': modeIcons[20].cn,
                'mode': 0xC1,
                time: {
                    set: false,
                    default: 20,
                    range: null
                },
                temperature: {
                    set: false,
                    default: 0,
                    range: null
                },
                preheat: {
                    set: false,
                    default: false
                },
                steamAmount: {
                    set: false,
                    default: 0,
                    range: null
                },
                fireAmount: {
                    set: false,
                    default: 0,
                    range: null
                },
                settingHide: true,
            },
            {
                'icon': modeIcons[28].dir,
                'text': modeIcons[28].cn,
                'mode': 0xD0,
                time: {
                    set: true,
                    default: 10,
                    range: [1, 300, 1]
                },
                temperature: {
                    set: false,
                    default: 50,
                    range: null
                },
                preheat: {
                    set: false,
                    default: false
                },
                steamAmount: {
                    set: false,
                    default: 0,
                    range: null
                },
                fireAmount: {
                    set: false,
                    default: 0,
                    range: null
                },
                settingHide: true,
            },
            {//发酵
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time: {
                    set: true,
                    default: 10,
                    range: [1, 300, 1]
                },
                temperature: {
                    set: false,
                    default: 35,
                    range: null
                },
                preheat: {
                    set: false,
                    default: false
                },
                steamAmount: {
                    set: false,
                    default: 0,
                    range: null
                },
                fireAmount: {
                    set: false,
                    default: 0,
                    range: null
                },
                settingHide: true,
            }
        ]
    }
];

export default modes;