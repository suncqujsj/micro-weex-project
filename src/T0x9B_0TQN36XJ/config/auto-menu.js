/**
 * Created by sf
 * 2018/10/20
 */

let data = [
    {
        title: 'S类菜单',
        iconButtons: [
            {
                'icon': 'assets/img/modes/steam@3x.png',
                'text': '清蒸鱼',
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
            }
        ]
    },
    {
        title: 'P类菜单',
        iconButtons: [
            {
                'icon': 'assets/img/modes/steam@3x.png',
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
            }
        ]
    }
];

export default data;