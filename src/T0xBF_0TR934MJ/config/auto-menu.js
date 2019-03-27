/**
 * Created by sf
 * 2018/10/20
 */

let weightCommon = {
    set:true,
    default:500,
    range:[200,600,100],
};

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
                        set: false,
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
                    weight: weightCommon,
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
                        set: false,
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
                    weight:weightCommon,
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
                        set: false,
                        default:15.5,
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
                        set:true,
                        default:500,
                        range:[200,600,100],
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
                    'text': '蒸白贝',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:15.5,
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
                        set:true,
                        default:500,
                        range:[200,600,100],
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
                    'text': '蒸腊肠',
                    'mode': 0xE0,
                    time:{
                        set: false,
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
                        set:true,
                        default:500,
                        range:[100,500,100],
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
                    'text': '蒸排骨',
                    'mode': 0xE0,
                    time:{
                        set: false,
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
                        set:true,
                        default:500,
                        range:[200,600,100],
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
                    'text': '蒸肉丸',
                    'mode': 0xE0,
                    time:{
                        set: false,
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
                        set:true,
                        default:500,
                        range:[200,600,100],
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
                    'text': '香菇鸡块',
                    'mode': 0xE0,
                    time:{
                        set: false,
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
                        set:true,
                        default:500,
                        range:[200,600,100],
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
                    'text': '蒸水蛋',
                    'mode': 0xE0,
                    time:{
                        set: false,
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
                    quantity:{
                        set:true,
                        default:3,
                        range:[1,3,1], // Giggs，个数1，2，3，默认3
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
                    'text': '蒸茄子',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:14.5,
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
                        set:true,
                        default:500,
                        range:[200,600,100],
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
                    'text': '粉丝蒸娃娃菜',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:9.5,
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
                        set:true,
                        default:500,
                        range:[200,600,100],
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
                    'text': '蒸红薯',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:28,
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
                        set:true,
                        default:600,
                        range:[200,1000,200],
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
                    'text': '蒸玉米',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:18,
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
                        set:true,
                        default:600,
                        range:[200,1000,200],
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
                    'text': '蒸米饭',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:26,
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
                        set:true,
                        default:500,
                        range:[100,500,100],
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
                    'text': '紫薯饭',
                    'mode': 0xE0,
                    time:{
                        set: false,
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
                        set:true,
                        default:500,
                        range:[200,500,100],
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
                    'text': '融化巧克力',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:2.83,
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
                        set:true,
                        default:200,
                        range:[100,200,50],
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
                    'text': '新鲜披萨',
                    'mode': 0xE0,
                    time:{
                        set: false,
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
                        set:true,
                        default:500,
                        range:[200,600,100],
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
                    'text': '蛋糕',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:50,
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
                        set:true,
                        default:500,
                        range:[400,600,100],
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
                    'text': '巧克力饼干',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:18,
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
                        set:true,
                        default:500,
                        range:[500,500,1],
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
                    'text': '柠檬饼干',
                    'mode': 0xE0,
                    time:{
                        set: false,
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
                        set:true,
                        default:400,
                        range:[400,400,1],
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
    {
        title: 'mode',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '食物翻热',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:3.5,
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
                        set:true,
                        default:500,
                        range:[200,600,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x15,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '土豆',
                    'mode': 0xE0,
                    time:{
                        set: false,
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
                    quantity:{
                        set:true,
                        default:3,
                        range:[1,3,1], // Giggs，个数1，2，3，默认3
                        // title: '杯数'
                        // unit: '杯'
                    },
                    recipeId:{
                        set:false,
                        default: 0x16,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '热咖啡',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:2.5,
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
                        set:true,
                        default:3,
                        range:[1,3,1],// Giggs，个数1，2，3，默认3
                    },
                    recipeId:{
                        set:false,
                        default: 0x17,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '意大利面',
                    'mode': 0xE0,
                    time:{
                        set: false,
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
                        set:true,
                        default:200,
                        range:[100,200,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x18,
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
                    'text': '汤',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:5.33,
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
                        set:true,
                        default:3,
                        range:[1,3,1],// Giggs，个数1，2，3，默认3
                    },
                    recipeId:{
                        set:false,
                        default: 0x19,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '披萨',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:2,
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
                        set:true,
                        default:3,
                        range:[1,3,1], // Giggs，个数1，2，3，默认3
                    },
                    recipeId:{
                        set:false,
                        default: 0x1a,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '松饼',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:0.5,
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
                        set:true,
                        default:4,
                        range:[1,4,1],// Giggs，个数1，2，3，4 默认4
                    },
                    recipeId:{
                        set:false,
                        default: 0x1b,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '燕麦粥',
                    'mode': 0xE0,
                    time:{
                        set: false,
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
                        set:true,
                        default:150,
                        range:[50,150,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x1c,
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
                    'text': '三明治',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:1.33,
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
                        set:true,
                        default:3,
                        range:[1,3,1],// Giggs，个数1，2，3 默认3
                    },
                    recipeId:{
                        set:false,
                        default: 0x1d,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '爆玉米',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:1.67,
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
                        set:true,
                        default:100,
                        range:[50,100,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x1e,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '巧克力蛋糕',
                    'mode': 0xE0,
                    time:{
                        set: false,
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
                        set:true,
                        default:800,
                        range:[800,800,1],
                    },
                    recipeId:{
                        set:false,
                        default: 0x1f,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '面包片',
                    'mode': 0xE0,
                    time:{
                        set: false,
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
                        set:true,
                        default:200,
                        range:[100,200,50],
                    },
                    recipeId:{
                        set:false,
                        default: 0x20,
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
                    'text': '巧克力坚果饼干',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:18,
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
                        set:true,
                        default:600,
                        range:[600,600,1],
                    },
                    recipeId:{
                        set:false,
                        default: 0x21,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '桃仁小酥饼',
                    'mode': 0xE0,
                    time:{
                        set: false,
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
                        set:true,
                        default:500,
                        range:[500,500,1],
                    },
                    recipeId:{
                        set:false,
                        default: 0x22,
                        range:null
                    },
                    detail: null,
                    settingHide:true, //工作页面，隐藏设置参数
                    circleProgressPointHide: true,
                },
                {
                    'icon': '',
                    'text': '花生巧克力饼干',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:18,
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
                        set:true,
                        default:500,
                        range:[500,500,1],
                    },
                    recipeId:{
                        set:false,
                        default: 0x23,
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
                        set: false,
                        default:20,
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
                        set:true,
                        default:12,
                        range:[12,12,1],// Giggs，个数12 默认12
                    },
                    recipeId:{
                        set:false,
                        default: 0x24,
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