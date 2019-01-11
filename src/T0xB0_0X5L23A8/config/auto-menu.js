/**
 * Created by sf
 * 2018/10/20
 */
let data = [
    {
        title: 'mode',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '黄油软化',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:3,
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
            ],

        ]
    },
    {
        title: '所有人群',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '烤肉串',
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
                    'text': '烤红薯片',
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