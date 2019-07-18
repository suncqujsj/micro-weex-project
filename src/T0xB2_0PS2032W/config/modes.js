/**
 * Created by sf
 * 2018/12/15
 */

import modeIcons from "../../common/mapping/modeIcons";

let timeCommon = {
    set: true,
    default: 30,
    range: [1, 60, 1, 65, 120, 5, 150, 1440, 30]
};


function temperatureRange(start, end) {
    let a = [];
    if (start < 100) {
        a = [50, 50, 1];
    }

    let b = [100, end, 5];
    return a.concat(b);
}

let modes = [
    {
        title: '',
        iconButtons: [
            {   // 纯蒸
                'icon': modeIcons[16].dir,
                'text': modeIcons[16].cn,
                'mode': 0x20,
                time: {
                    set: true,
                    default: 20,
                    range: [1, 60, 1, 65, 120, 5]
                },
                temperature: {
                    set: true,
                    default: 100,
                    range: [35, 100, 5],
                    hide: true
                },
                preheat: {
                    set: false,
                    hide: true,
                    default: false
                },
                steamAmount: {
                    set: false,
                    default: null,
                    range: [1, 4, 1, "取消"]
                },
                fireAmount: {
                    set: false,
                    default: null,
                    range: null
                }
            },

            {   // 快蒸
                'icon': modeIcons[25].dir,
                'text': modeIcons[25].cn,
                'mode': 0x90,
                time: {
                    set: true,
                    default: 10,
                    range: [1, 60, 1]
                },
                temperature: {
                    set: false,
                    default: 100,
                    range: [100, 100, 1],
                    hide: true
                },
                preheat: {
                    set: false,
                    hide: null,
                    default: false
                },
                steamAmount: {
                    set: false,
                    default: null,
                    range: [1, 4, 1, "取消"]
                },
                fireAmount: {
                    set: false,
                    default: null,
                    range: null
                }
            },

            {   // 慢蒸
                'icon': modeIcons[48].dir,
                'text': '慢蒸',
                'mode': 0x22,
                time: {
                    set: true,
                    default: 50,
                    range: [1, 60, 1, 65, 300, 5]
                },
                temperature: {
                    set: true,
                    default: 100,
                    range: [35, 100, 5],
                    hide: true
                },
                preheat: {
                    set: false,
                    hide: true,
                    default: false
                },
                steamAmount: {
                    set: false,
                    default: null,
                    range: [1, 4, 1, "取消"]
                },
                fireAmount: {
                    set: false,
                    default: null,
                    range: null
                }
            },

            {   // 发酵
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time: timeCommon,
                temperature: {
                    set: true,
                    default: 35,
                    range: [30, 45, 5],
                    hide: true
                },
                preheat: {
                    set: false,
                    hide: true,
                    default: false
                },
                steamAmount: {
                    set: false,
                    default: null,
                    range: [1, 4, 1, "取消"]
                },
                fireAmount: {
                    set: false,
                    default: null,
                    range: null
                }
            },

        ]
    },
    {
        title: '',
        iconButtons: [

            {   // 烘烤
                'icon': modeIcons[1].dir,
                'text': '烘烤',
                'mode': 0x41,
                time: {
                    set: true,
                    default: 30,
                    range: [1, 60, 1, 65, 120, 5]
                },
                temperature: {
                    set: true,
                    default: 170,
                    range: [100, 230, 5],
                    hide: true
                },
                preheat: {
                    set: true,
                    hide: true,
                    default: false
                },
                steamAmount: {
                    set: false,
                    default: null,
                    range: [40, 40, 1, "取消"]
                },
                fireAmount: {
                    set: false,
                    default: null,
                    range: null
                }
            },
            {   // 蒸烤
                'icon': modeIcons[35].dir,
                'text': '蒸烤',
                'mode': 0x31,
                time: {
                    set: true,
                    default: 30,
                    range: [1, 60, 1, 65, 120, 5]
                },
                temperature: {
                    set: true,
                    default: 190,
                    range: [190, 230, 5],
                    hide: true
                },
                preheat: {
                    set: true,
                    hide: true,
                    default: false
                },
                steamAmount: {
                    set: false,
                    default: null,
                    range: [40, 40, 1, "取消"]
                },
                fireAmount: {
                    set: false,
                    default: null,
                    range: null
                }
            },
            {   // 餐具清洁
                'icon': modeIcons[49].dir,
                'text': '餐具清洁',
                'mode': 0xC8,
                time: {
                    set: false,
                    default: 30,
                    range: [1, 60, 1, 65, 120, 5]
                },
                temperature: {
                    set: false,
                    default: null,
                    range: [190, 230, 5],
                    hide: true
                },
                preheat: {
                    set: false,
                    hide: true,
                    default: false
                },
                steamAmount: {
                    set: false,
                    default: null,
                    range: [40, 40, 1, "取消"]
                },
                fireAmount: {
                    set: false,
                    default: null,
                    range: null
                },
                settingHide:true

            },
            {   // 腔体清洁
                'icon': modeIcons[20].dir,
                'text': '腔体清洁',
                'mode': 0xC6,
                time: {
                    set: false,
                    default: 30,
                    range: [1, 60, 1, 65, 120, 5]
                },
                temperature: {
                    set: false,
                    default: null,
                    range: [190, 230, 5],
                    hide: true
                },
                preheat: {
                    set: false,
                    hide: true,
                    default: false
                },
                steamAmount: {
                    set: false,
                    default: null,
                    range: [40, 40, 1, "取消"]
                },
                fireAmount: {
                    set: false,
                    default: null,
                    range: null
                },
                settingHide:true
            },
        ]
    },
    {
        title: '',
        iconButtons: [
            {   // 腔体除味
                'icon': modeIcons[21].dir,
                'text': '腔体除味',
                'mode': 0xC3,
                time: {
                    set: false,
                    default: 30,
                    range: [1, 60, 1, 65, 120, 5]
                },
                temperature: {
                    set: false,
                    default: null,
                    range: [100, 230, 5],
                    hide: true
                },
                preheat: {
                    set: false,
                    hide: true,
                    default: false
                },
                steamAmount: {
                    set: false,
                    default: null,
                    range: [40, 40, 1, "取消"]
                },
                fireAmount: {
                    set: false,
                    default: null,
                    range: null
                },
                settingHide:true
            },
        ]
    }

];

export default modes;