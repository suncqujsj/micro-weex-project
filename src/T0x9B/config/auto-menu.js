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
                        default:19,
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
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '蒜蓉粉蒸虾',
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
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x02,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '清蒸大闸蟹',
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
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x03,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '蒸排骨',
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
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x04,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
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
                    'text': '蒸水蛋',
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
                        default: 0x05,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '蒸手工包',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:25,
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
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '蒸娃娃菜',
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
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x07,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '蒸红薯',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:44,
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
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
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
                    'text': '海绵蛋糕',
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
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x09,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '玛芬蛋糕',
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
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x0A,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '牛角面包',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:13,
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
                        default: 0x0B,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '蔓越莓曲奇',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:22,
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
                        default: 0x0C,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
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
                    'text': '宝宝手指饼干',
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
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x0D,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '烤鸡中翅',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:22,
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
                        default: 0x0E,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '烤牛排',
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
                        range:null,
                    },
                    recipeId:{
                        set:false,
                        default: 0x0F,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '烤玉米',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:25,
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
                        default: 0x10,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
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
                    'text': '海鲜比萨',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:21,
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
                        default: 0x11,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '烤鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:25,
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
                        default: 0x12,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '烤虾',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:13,
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
                        default: 0x13,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '烤地瓜',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:45,
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
                        default: 0x14,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
            ],
        ]
    },
];

export default data;