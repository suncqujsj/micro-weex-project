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
                    'text': 'Pizza',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:false,
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
                        default:200,
                        range:[200,400,200],
                    },
                    recipeId:{
                        set:false,
                        default: 0x01,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                },
                {
                    'icon': '',
                    'text': 'Meat',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:false,
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
                        set:true,
                        default:250,
                        range:[250,450,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x02,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': 'Vegetable',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:false,
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
                        default:200,
                        range:[200,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x03,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': 'Pasta',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:false,
                        range: null,
                        text:4
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
                        default:50,
                        range:[50,100,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x04,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
            ],
        ]
    },
    {
        title: 'mode',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': 'Potato',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:false,
                        range: null,
                        text:5
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
                        range:[200,600,200],
                    },
                    recipeId:{
                        set:false,
                        default: 0x05,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                },
                {
                    'icon': '',
                    'text': 'Fish',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:false,
                        range: null,
                        text:6
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
                        default:250,
                        range:[250,450,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x06,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': 'Beverage',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:false,
                        range: null,
                        text:7
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
                        range:[1,3,1],
                        ratio:1,
                        index:0,
                        unit:"cup"
                    },
                    recipeId:{
                        set:false,
                        default: 0x07,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': 'Popcorn',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:false,
                        range: null,
                        text:8
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
                        default:50,
                        range:[50,100,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x08,
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