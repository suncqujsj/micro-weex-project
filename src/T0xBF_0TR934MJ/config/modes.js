 /**
 * Created by sf
 * 2018/10/20
 */
import modeIcons from "../../common/mapping/modeIcons";
let microwaveTimeCommon = {
    set: true,
    default:10,
    range:[1, 90, 1]
};

 let heatTimeCommon = {
     set: true,
     default:10,
     range:[1, 90, 1]
 };

let modes = [
    {
        title: '',
        iconButtons: [
            {
                // 蒸汽
                'icon': modeIcons[33].dir,
                'text': modeIcons[33].cn,
                'mode': 0x20,
                time: microwaveTimeCommon,
                temperature:{
                    set: true,
                    default:100,
                    range:[50,100,10],
                },
                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示

            },
            {
                // 蒸汽+微波
                'icon': modeIcons[33].dir,
                'text': modeIcons[33].cn,
                'mode': 0x90,
                fireAmount:{
                    set:true,
                    default:3,
                    range:[1,1,1,3,3,1]
                },
                steamAmount:{
                    set:true,
                    default:3,
                    range: [1,5,1]
                },
                time: microwaveTimeCommon,
                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示

            },
            {
                //蒸汽+热风对流
                'text': modeIcons[35].cn,
                'icon': modeIcons[35].dir,
                'mode': 0x31,
                temperature:{
                    set: true,
                    default:100,
                    range:[180,200,10],
                },
                steamAmount:{
                    set:true,
                    default:3,
                    range: [1,3,1]
                },
                time: microwaveTimeCommon,
                settingHide:true
            },
            {
                // 热风对流
                'icon': modeIcons[1].dir,
                'text': modeIcons[1].cn,
                'mode': 0x41,
                temperature:{
                    set: true,
                    default:180,
                    range:[50,50,1,100,230,5],
                },
                time: heatTimeCommon,

                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示

            },
        ]
    },
    {
        title: '',
        iconButtons: [
            {
                // 热风烧烤
                'icon': modeIcons[31].dir,
                'text': modeIcons[31].cn,
                'mode': 0x43,
                time: heatTimeCommon,
                temperature:{
                    set: true,
                    default:180,
                    range:[35,35,1,100,180,5],
                },
                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示

            },
            {
                // 上管
                'icon': modeIcons[15].dir,
                'text': '烧烤',
                'mode': 0x40,
                fireAmount:{
                    set:true,
                    default:3,
                    range:[1,3,1]
                },
                time:microwaveTimeCommon,
                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示

            },
            {
                // 微波
                'icon': modeIcons[12].dir,
                'text': modeIcons[12].cn,
                'mode': 0x01,
                fireAmount:{
                    set:true,
                    default:10,
                    range:[1,5,2, 8,10,2] // 100,300,450,700,900
                },
                time: {
                    set: true,
                    default:1,
                    range:[1,30,1]
                },

                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示

            },
            {
                // 清洁
                'icon': modeIcons[20].dir,
                'text': modeIcons[20].cn,
                'mode': 0xC1,
                time: {
                    set: false,
                    default:480,
                },
                settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示

            },


        ]
    },
    // {
    //     title: '',
    //     iconButtons: [
    //         {
    //             'text': '蒸汽+微波',
    //             'mode': 0x90,
    //             standbyHide: true
    //         },
    //         {
    //             'text': '蒸汽+热风对流',
    //             'mode': 0x31,
    //             standbyHide: true
    //         },
    //         {
    //             'text': '热风对流+微波',
    //             'mode': 0x71,
    //             standbyHide: true
    //         },
    //         {
    //             'text': '热风烧烤+微波',
    //             'mode': 0x73,
    //             standbyHide: true
    //         },
    //         {
    //             'text': '烧烤+微波',
    //             'mode': 0x70,
    //             standbyHide: true
    //         },
    //     ]
    // }
];

export default modes;