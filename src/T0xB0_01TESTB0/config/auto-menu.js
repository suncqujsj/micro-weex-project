import modeIcons from "@/common/mapping/modeIcons";

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
                        default:800,
                        range:[10,20,10],
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
                        range:[10,40,10],
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