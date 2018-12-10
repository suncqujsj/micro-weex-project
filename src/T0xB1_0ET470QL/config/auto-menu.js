/**
 * Created by sf
 * 2018/10/20
 */
let data = [
    {
        title: '所有人群',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '翻热',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:20,
                        range:null
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:2,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    recipeId:{
                        set:false,
                        default: 0x51,
                        range:null
                    },
                    detail: null
                },
                {
                    'icon': '',
                    'text': '全麦核桃包',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:32,
                        range:null
                    },
                    temperature:{
                        set: false,
                        default:185,
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
                    recipeId:{
                        set:false,
                        default: 0x52,
                        range:null
                    },
                    detail: null
                },
                {
                    'icon': '',
                    'text': '菌菇烤鸡胸肉',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:15,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:95,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x53,
                        range:null
                    },
                    detail: null
                },
                {
                    'icon': '',
                    'text': '牛角面包',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:15,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:95,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x54,
                        range:null
                    },
                    detail: null
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
                    'text': '香烤啤酒鸡',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:15,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:95,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x55,
                        range:null
                    },
                    detail: null
                }, 
                {
                    'icon': '',
                    'text': '草莓纸杯蛋糕',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:15,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:95,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x56,
                        range:null
                    },
                    detail: null
                }, 
                {
                    'icon': '',
                    'text': '牛肉披萨',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:15,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:95,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x57,
                        range:null
                    },
                    detail: null
                }, 
                {
                    'icon': '',
                    'text': '地中海柠檬烤鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:15,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:95,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x58,
                        range:null
                    },
                    detail: null
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
                    'text': '苹果烤猪排',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:15,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:95,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x59,
                        range:null
                    },
                    detail: null
                }, 
                {
                    'icon': '',
                    'text': '脆皮烤羊腿',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:15,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:95,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x5A,
                        range:null
                    },
                    detail:null
                }, 
            ]

        ]
    },
];

export default data;