/**
 * Created by sf
 * 2018/10/20
 */

let data = [
    {
        title: '三高',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '清蒸草鱼香菇',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:13,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:100,
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
                        default: 0x41,
                        range:null
                    }
                },
                {
                    'icon': '',
                    'text': '金针菇蒸粉丝',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:10,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:100,
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
                        default: 0x42,
                        range:null
                    }
                },
                {
                    'icon': '',
                    'text': '鲜虾花蛤蒸蛋羹',
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
                        default: 0x43,
                        range:null
                    }
                },
            ],
           
        ]
    },
    {
        title: '1-7岁儿童',
        iconButtons: [
            [
               
               
                {
                    'icon': '',
                    'text': '南瓜泥牛奶蒸蛋',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:14,
                        range:[2,120,1]
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
                        default: 0x47,
                        range:null
                    }
                },
                {
                    'icon': '',
                    'text': '清蒸鲳鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:18,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:100,
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
                        default: 0x48,
                        range:null
                    }
                },
                {
                    'icon': '',
                    'text': '粉蒸牛肉',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:24,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:100,
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
                        default: 0x49,
                        range:null
                    }
                },
                {
                    'icon': '',
                    'text': '豉汁蒸鲈鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:10,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:100,
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
                        default: 0x4A,
                        range:null
                    }
                },
            ],
            [
               
                {
                    'icon': '',
                    'text': '枸杞百合蒸鸡',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:16,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:100,
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
                        default: 0x4B,
                        range:null
                    }
                },
                {
                    'icon': '',
                    'text': '牛肉灌汤包',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:16,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:100,
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
                        default: 0x4C,
                        range:null
                    }
                },
              
            ],
        ]
    },
    {
        title: '减肥塑身',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '柠香鲈鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:13,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:100,
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
                        default: 0x4D,
                        range:null
                    }
                },
                {
                    'icon': '',
                    'text': '蒜蓉干贝蒸丝瓜',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:9,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:100,
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
                        default: 0x4E,
                        range:null
                    }
                },
                {
                    'icon': '',
                    'text': '清蒸香菇鳕鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:13,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:100,
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
                        default: 0x4F,
                        range:null
                    }
                }
            ]
        ]
    },
    {
        title: '孕妇',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '豆腐狮子头',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:12,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:100,
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
                        default: 0x44,
                        range:null
                    }
                },
                {
                    'icon': '',
                    'text': '蒜蓉粉丝鲍鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:10,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:100,
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
                        default: 0x45,
                        range:null
                    }
                },
                    {
                        'icon': '',
                        'text': '小米蒸排骨',
                        'mode': 0xE0,
                        time:{
                            set: true,
                            default:25,
                            range:[5,120,1]
                        },
                        temperature:{
                            set: true,
                            default:100,
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
                            default: 0x46,
                            range:null
                        }
                    },
            ]
        ]
    },
    
];

export default data;