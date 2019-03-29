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
                        default:1,
                        range:[1,2,1],
                        unit:"oz"
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
                    'text': 'POTATO',
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
                        set:true,
                        default:1,
                        range:[1,4,1],
                        unit:"oz"
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