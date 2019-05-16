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
                    'text': 'POPCORN',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:9,
                        range: null,
                        text:1
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
                        default:2.75,
                        range:[2.75,3.2,0.45],
                        unit:"oz",
                        index:2.3,
                        ratio:0.45
                    },
                    recipeId:{
                        set:false,
                        default: 0x8D,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                },

                {
                    'icon': '',
                    'text': 'REHEAT',
                    'mode': 0xE2,
                    time:{
                        set: false,
                        default:0,
                        range: null,
                        text:2
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
                        default:2.75,
                        range:[2.75,3.2,0.45],
                        unit:"oz",
                        index:2.3,
                        ratio:0.45
                    },
                    recipeId:{
                        set:false,
                        default: 0x8F,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                },

                {
                    'icon': '',
                    'text': 'POTATO',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:15,
                        range: null,
                        text:3
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
                        default:1,
                        range:[1,4,1],
                        unit:" ",
                        index:0,
                        ratio:1
                    },
                    recipeId:{
                        set:false,
                        default: 0x8E,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
            ],
        ]
    },
];

export default data;