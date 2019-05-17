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
                    'text': 'TOAST',
                    'mode': 0xff,
                    time:{
                        set: false,
                        default:false,
                        range: null,
                        text:1
                    },
                    temperature:{
                        set: false,
                        default:false,
                        range:null,
                        unit:"℉"
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
                        default:10,
                        range:[1,6,1]
                    },
                    weight:{
                        set:true,
                        default:6,
                        range:[1,6,1],
                        ratio:1,
                        index:0,
                        unit:"Slice",
                        text:"Piece"
                    },
                    recipeId:{
                        set:false,
                        default: 0x9e,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                },
                {
                    'icon': '',
                    'text': 'BAGEL',
                    'mode': 0xFF,
                    time:{
                        set: false,
                        default:false,
                        range: null,
                        text:2
                    },
                    temperature:{
                        set: false,
                        default:false,
                        range:null,
                        unit:"℉"
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
                        default:10,
                        range:[1,6,1]
                    },
                    weight:{
                        set:true,
                        default:4,
                        range:[2,6,2],
                        ratio:2,
                        index:0,
                        unit:"Slice",
                        text:"Piece"
                    },
                    recipeId:{
                        set:false,
                        default: 0x9f,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': 'PIZZA',
                    'mode': 0xFF,
                    time:{
                        set: false,
                        default:false,
                        range: null,
                        text:3
                    },
                    temperature:{
                        set: true,
                        default:400,
                        range:[300,450,10],
                        unit:"℉"
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
                        range:[1,6,1]
                    },
                    weight:{
                        set:true,
                        default:9,
                        range:[6,12,3],
                        ratio:3,
                        index:3,
                        unit:"inch"
                    },
                    recipeId:{
                        set:false,
                        default: 0xa0,
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