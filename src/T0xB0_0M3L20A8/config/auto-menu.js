/**
 * Created by sf
 * 2018/10/20
 */

import sensoryMenu from '@/common/mapping/sensoryMenus';

function sensoryMenuItem(recipeId, t) {
    return {
        'icon': '',
        'text': sensoryMenu[recipeId].cn,
        'mode': 0xE2,
        time:{
            set: false,
            text: t
        },
        recipeId:{
            set:false,
            default: recipeId,
            range:null
        },
        detail: null,
        settingHide:true, //工作页面，隐藏设置参数
    };
}

let data = [
    {
        title: '中式家常',
        iconButtons: [
            [
                sensoryMenuItem(0x5b, "25'"),
                sensoryMenuItem(0x1b, "14'"),
                sensoryMenuItem(0x29, "8'"),
                sensoryMenuItem(0x5e, "7'"),
            ],
        ]
    },
    {
        title: '中式家常',
        iconButtons: [
            [
                sensoryMenuItem(0x5f, "47'"),
                sensoryMenuItem(0x60, "9'"),
            ],
        ]
    },
    {
        title: '养颜甜品',
        iconButtons: [
            [
                sensoryMenuItem(0x2c, "48'"),
                sensoryMenuItem(0x62, "55'"),
                sensoryMenuItem(0x63, "45'"),
                sensoryMenuItem(0x64, "78'"),
            ],
        ]
    },
    {
        title: '特色风味',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '西班牙海鲜炒饭',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:9,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:800,
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x65,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                },
                {
                    'icon': '',
                    'text': '西兰花培根意面',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:15,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:400,
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x66,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '柠檬香草鱼',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:9,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:400,
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x67,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '泰式冬阴功汤',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:32,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:1500,
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x68,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
            ],
        ]
    },
    {
        title: '特色风味',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '宫保鸡丁',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:4,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:300,
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x61,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
                {
                    'icon': '',
                    'text': '鱼香肉丝',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:5,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:300,
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x5D,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 

            ],

        ]
    },
    {
        title: '烧烤小吃',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '黑椒烤鲜虾',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:8,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:true,
                        default:100,
                        range:[100,500,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x3F,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '蒜香鸡中翅',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:12,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:true,
                        default:200,
                        range:[200,500,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x1F,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '孜然肉串',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:8,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:true,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x22,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
                {
                    'icon': '',
                    'text': '酥脆番薯片',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:7,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:true,
                        default:100,
                        range:[100,150,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x5C,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
            ]

        ]
    },
];

export default data;