/**
 * Created by sf
 * 2018/10/20
 */

let data = [
    {
        title: '蒸汽菜单',
        iconButtons: [
            {
                'icon': '',
                'text': '蒸汽菜单',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
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
                    default: 1,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '蒜蓉粉丝蒸虾',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
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
                    default: 2,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '清蒸大闸蟹',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
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
                    default: 3,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '蒸排骨',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
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
                    default: 4,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '粉蒸肉',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
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
                    default: 5,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '蒸水蛋',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
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
                    default: 6,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '蒸米饭',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
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
                    default: 7,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '蒸馒头',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
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
                    default: 8,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '蒸包子',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
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
                    default: 9,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '蒸红薯',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
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
                    default: 10,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '蒸南瓜',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
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
                    default: 11,
                    range:null
                }
            }

        ]
    },
    {
        title: '非蒸汽菜单',
        iconButtons: [
            {
                'icon': '',
                'text': '披萨',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
                },
                temperature:{
                    set: false,
                    default:220,
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
                    default: 12,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '蛋糕',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
                },
                temperature:{
                    set: false,
                    default:160,
                    range:null
                },
                preheat:{
                    set:false,
                    default: true
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
                    default: 13,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '手指饼干',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
                },
                temperature:{
                    set: false,
                    default:180,
                    range:null
                },
                preheat:{
                    set:false,
                    default: true
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
                    default: 14,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '面包片',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
                },
                temperature:{
                    set: false,
                    default:180,
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
                    default: 15,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '烤鸡翅',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
                },
                temperature:{
                    set: false,
                    default:200,
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
                    default: 16,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '烤虾',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
                },
                temperature:{
                    set: false,
                    default:200,
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
                    default: 17,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '烤排骨',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
                },
                temperature:{
                    set: false,
                    default:200,
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
                    default: 18,
                    range:null
                }
            },
            {
                'icon': '',
                'text': '烤地瓜',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
                },
                temperature:{
                    set: false,
                    default:230,
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
                    default: 19,
                    range:null
                }
            },{
                'icon': '',
                'text': '烤土豆',
                'mode': 0xE0,
                time:{
                    set: true,
                    default:10,
                    range:[1,90,1]
                },
                temperature:{
                    set: false,
                    default:230,
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
                    default: 12,
                    range:null
                }
            }
        ]
    }
];

export default data;