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
                    },
                    detail: {
                        foodMaterial:'香菇 34克\n' +
                        '草鱼 134克\n' +
                        '香葱 1克\n' +
                        '姜 1克 \n' +
                        '汉口白酒(49.6度) 2毫升\n' +
                        '蒸鱼豉油   7毫升\n' +
                        '花椒    2克\n' +
                        '酱油(均值)  2毫升',
                        cookingSteps:'1.将鱼清洗干净，去内脏后，在鱼体两侧抹匀食用油，再沾少许白酒。\n' +
                        '2.准备葱丝、姜片。\n' +
                        '3.香菇切块。\n' +
                        '4.将葱丝、姜片、香菇块铺在鱼盘上，将鱼入盘后再在鱼身上撒些葱姜丝。\n' +
                        '5.锅下水，等水开后，将鱼入锅；蒸6-7分钟即关火。\n' +
                        '6.关火后，别打开锅盖，利用锅内余温“虚蒸”5-8分钟后立即出锅，把多余的水份倒掉。\n' +
                        '7.铺上葱，淋上酱油。\n' +
                        '8.在鱼身撒上青蒜末，锅中放油，爆香花椒。编出红油，热油泼在鱼上面即可。'
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