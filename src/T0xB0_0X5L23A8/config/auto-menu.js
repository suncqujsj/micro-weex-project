/**
 * Created by giggs
 * 2019/2/21
 */


let data = [
    {
        title: 'mode',  // 首个 title 很重要，决定了是否平铺所有菜。当 title = mode，平铺； 当title = xxx，按分类显示
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '蒸速冻饺',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:20,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x1B,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '蒸手工包',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:25,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x1A,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '广式腊肠蒸饭',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:26,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x69,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '秋葵蒸鸡蛋羹',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:11,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x6A,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
            ]

        ]
    },
    {
        title: 'mode',  // 首个 title 很重要，决定了是否平铺所有菜。当 title = mode，平铺； 当title = xxx，按分类显示
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '清蒸柠檬鲈鱼',
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x6B,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '蒜蓉蒸虾',
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x6C,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '南瓜粉丝蒸排骨',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:45,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x6D,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '枸杞百合蒸鸡',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:8,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x22,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
            ]

        ]
    },
    {
        title: 'mode',  // 首个 title 很重要，决定了是否平铺所有菜。当 title = mode，平铺； 当title = xxx，按分类显示
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '蒜蓉粉丝蒸扇贝',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:8,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
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
                    'text': '蒜蓉蒸娃娃菜',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:12,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x6E,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '麻婆豆腐',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:5,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x29,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '豆角茄子',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:6,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x6F,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
            ]

        ]
    },
    {
        title: 'mode',  // 首个 title 很重要，决定了是否平铺所有菜。当 title = mode，平铺； 当title = xxx，按分类显示
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '糖醋小排',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:20,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x70,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '时蔬海鲜烩',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:10,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x71,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '农家小炒肉',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:8,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x72,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '小鸡炖蘑菇',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:30,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x73,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
            ]

        ]
    },
    {
        title: '精致焗烤',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '黑椒牛扒',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:20,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x74,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '香烤鳕鱼',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:10,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x75,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '椒盐烤虾',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:10,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x76,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '锡纸烤排骨',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:8,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x77,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
            ]

        ]
    },
    {
        title: '精致焗烤',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '蒜蓉烤扇贝',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:8,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x78,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '蜜汁鸡中翅',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:25,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x79,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '孜然香烤玉米',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:30,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x7A,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '迷迭香小土豆',
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x7B,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
            ]

        ]
    },
    {
        title: '精致焗烤',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '芝士焗番薯',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:25,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x7C,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '肉酱焗意粉',
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x7D,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '三文鱼焗西兰花',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:18,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x7E,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '芝士焗海鲜千层面',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:4,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x7F,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
            ]

        ]
    },
    {
        title: '滋补养生',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '冰糖炖雪梨',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:35,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x2C,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '银耳莲子羹',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:40,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x8A,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '红枣乌鸡汤',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:55,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x8B,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '虫草花炖排骨',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:8,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x50,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
            ]

        ]
    },
    {
        title: '午后时光',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '双皮奶',
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x80,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '抹茶酥',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:25,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x81,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '蛋黄酥',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:25,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x82,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '网红青团',
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x83,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
            ]

        ]
    },
    {
        title: '午后时光',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '海绵蛋糕',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:30,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x84,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '蔓越莓曲奇',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:12,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x85,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '斑马纹戚风蛋糕',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:50,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x86,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '法式焦糖布丁',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:30,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x87,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
            ]

        ]
    },
    {
        title: '午后时光',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '经典葡式蛋挞',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:20,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x88,
                        range:null
                    },
                    detail: null,
                    settingHide:true
                },
                {
                    'icon': '',
                    'text': '百香果玛德琳',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:16,
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
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x89,
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