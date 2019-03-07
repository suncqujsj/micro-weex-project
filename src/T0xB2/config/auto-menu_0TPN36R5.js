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
                    'text': '清蒸鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:14,
                        range: [1,120,1]
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
                        default:0,
                        range:null,
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
                    'text': '蒜蓉蒸粉丝扇贝',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:8,
                        range: [1,120,1]
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
                        default:0,
                        range:null,
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
                    'text': '豆豉蒸鳕鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:11,
                        range: [1,120,1]
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
                        default:0,
                        range:null,
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
                    'text': '蒜蓉粉蒸虾',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:5,
                        range: [1,120,1]
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
                        default:0,
                        range:null,
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
        title: '所有人群',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '清蒸大闸蟹',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:7,
                        range: [1,120,1]
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
                        default:0,
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x05,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
                {
                    'icon': '',
                    'text': '酒蒸蛤蛎',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:9,
                        range: [1,120,1]
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
                        default:0,
                        range:null,
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
                    'text': '蒸排骨',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:14,
                        range: [1,120,1]
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
                        default:0,
                        range:[100,500,100],
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
                    'text': '粉蒸肉',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:38,
                        range: [1,120,1]
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
                        default:0,
                        range:null,
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
    {
        title: '所有人群',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '珍珠肉丸',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:15,
                        range: [1,120,1]
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
                        default:0,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x09,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
                {
                    'icon': '',
                    'text': '香菇木耳蒸鸡',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:14,
                        range: [1,120,1]
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
                        default:0,
                        range:[100,150,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x0A,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
                {
                    'icon': '',
                    'text': '蒸水蛋',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:12,
                        range: [1,120,1]
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
                        default:0,
                        range:[100,150,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x0B,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
                {
                    'icon': '',
                    'text': '粉丝蒸丝瓜',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:6,
                        range: [1,120,1]
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
                        default:0,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x09,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
            ]

        ]
    },
    {
        title: '所有人群',
        iconButtons: [
            [
               
                {
                    'icon': '',
                    'text': '粉丝蒸娃娃菜',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:9,
                        range: [1,120,1]
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
                        default:0,
                        range:[100,150,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x0A,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
                {
                    'icon': '',
                    'text': '蒜香蒸茄子',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:9,
                        range: [1,120,1]
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
                        default:0,
                        range:[100,150,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x0B,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
                {
                    'icon': '',
                    'text': '蒸米饭',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:30,
                        range: [1,120,1]
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
                        default:0,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x09,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
                {
                    'icon': '',
                    'text': '腊味糯米饭',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:35,
                        range: [1,120,1]
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
                        default:0,
                        range:[100,150,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x0A,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
            ]

        ]
    },
    {
        title: '所有人群',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '紫薯蒸米饭',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:30,
                        range: [1,120,1]
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
                        default:0,
                        range:[100,150,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x0B,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
                {
                    'icon': '',
                    'text': '蒸馒头',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:16,
                        range: [1,120,1]
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
                        default:0,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x09,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
                {
                    'icon': '',
                    'text': '蒸包子',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:17,
                        range: [1,120,1]
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
                        default:0,
                        range:[100,150,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x0A,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                }, 
                {
                    'icon': '',
                    'text': '冬瓜火腿汤',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:120,
                        range: [1,120,1]
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
                        default:0,
                        range:[100,150,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x0B,
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