const env = 'sit'
// const env = 'dev'
const domains = {
    'sit': '',
    'dev': 'http://iot-dev.smartmidea.net'
}
export const domain = domains[env]
export const url = {
    scene: {
        applianceAdd: domain + '/v1/scene/appliance/add',
        applianceDelete: domain + '/v1/scene/appliance/delete',
        list: domain + '/v1/scene/list',
        detail: domain + '/v1/scene/detail',
        supportList: domain + '/v1/scene/support/type/list',
        modelSet: domain + '/v1/scene/model/set',
        modelExecute: domain + '/v1/scene/model/execute',
        modelStatus: domain + '/v1/scene/model/status/get',
        optimize: domain + '/v1/scene/optimize',
        optimizeStatus: domain + '/v1/scene/optimize/status/get',
        record: domain + '/v1/scene/record/list',
        recordDelete: domain + '/v1/scene/record/delete',
        washerConsumption: domain + '/v1/scene/washerConsumption'
    },
    auto: {
        list: domain + '/v1/scene/auto/list',
        add: domain + '/v1/scene/auto/add',
        detail: domain + '/v1/scene/auto/detail',
        update: domain + '/v1/scene/auto/update',
        delete: domain + '/v1/scene/auto/delete',
        execute: domain + '/v1/scene/auto/execute',
        executeStatus: domain + '/v1/scene/auto/status/get',
        recordUpload: domain + '/v1/scene/auto/record/upload',
        record: domain + '/v1/scene/auto/record/list',
        recordDelete: domain + '/v1/scene/auto/record/delete',
        ApplianceAction: domain + '/v1/scene/auto/action/list'
    },
    home: {
        getMember: domain + '/v1/homegroup/member/get'
    }
}


export const applianceActions = {
    "0xAC": {
        "name": "空调",
        "actions": {
            "power": {
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            },
            "mode": {
                "type": "list",
                "value": {
                    "auto": "自动",
                    "fan": "送风",
                    "cool": "制冷",
                    "heat": "制热",
                    "dry": "抽湿",
                },
                "default": "auto"
            },
            "temperature": {
                "type": "range",
                "range": {
                    "max": 30,
                    "min": 17
                },
                "default": 27
            }
        }
    },
    "0xE2": {
        "name": "热水器",
        "img": "assets/img/0xE2.png",
        "actions": {
            "power": {
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            },
            "temperature": {
                "type": "range",
                "range": {
                    "max": 75,
                    "min": 30
                },
                "default": 65
            }
        }
    },
    "0xFC": {
        "name": "空气净化器",
        "img": "assets/img/0xFC.png",
        "actions": {
            "power": {
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            },
            "mode": {
                "type": "list",
                "value": {
                    "auto": "自动",
                    "manual": "手动",
                    "sleep": "睡眠",
                    "fast": "急速"
                },
                "default": "auto"
            },
            "wind_speed": {
                "type": "range",
                "range": {
                    "max": 101,
                    "min": 0
                },
                "default": 101
            }
        }
    },
    "0xB8": {
        "name": "吸尘器",
        "actions": {
            "work_status": {
                "type": "list",
                "value": {
                    "work": "启动",
                    "stop": "停止",
                    "charge": "回充",
                },
                "default": "stop"
            },
            "work_mode": {
                "type": "list",
                "value": {
                    "random": "随机模式",
                    "arc": "弓形模式",
                    "edge": "沿边模式",
                    "emphases": "重点模式",
                    "screw": "螺旋模式",
                    "auto": "自动模式",
                },
                "default": "auto"
            }
        }
    },
    "0xFB": {
        "name": "电暖器",
        "actions": {
            "power": {
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            },
            "temperature": {
                "type": "range",
                "range": {
                    "max": 50,
                    "min": -40
                },
                "default": 27
            }
        }
    },
    "0xB6": {
        "name": "抽油烟机",
        "actions": {
            "power": {
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            },
            "gear": {
                "type": "list",
                "value": {
                    "1": "1档",
                    "2": "2档",
                    "3": "3档",
                    "4": "4档"
                },
                "default": "1"
            }
        }
    },
    "0xE1": {
        "name": "洗碗机",
        "actions": {
            "work_status": {
                "type": "list",
                "value": {
                    "soft_gear": "软水档位设置中",
                    "error": "错误",
                    "order": "预约",
                    "work": "开始工作",
                    "cancel": "取消工作",
                    "power_off": "关机",
                    "power_on": "开机",
                },
                "default": "power_off"
            },
            "mode": {
                "type": "list",
                "value": {
                    "self_define": "自定义",
                    "fast_wash": "快速洗",
                    "glass_wash": "玻璃洗",
                    "eco_wash": "节能洗/经济洗",
                    "standard_wash": "及时洗/标准洗",
                    "strong_wash": "强力洗",
                    "auto_wash": "自动洗/智能洗",
                },
                "default": "auto_wash"
            }
        }
    },
    "0xFA": {
        "name": "风扇",
        "actions": {
            "power": {
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            },
            "mode": {
                "type": "list",
                "value": {
                    "normal": "正常风",
                    "natural": "自然风",
                    "sleep": "睡眠风",
                    "comfort": "舒适风",
                    "feel": "人感",
                    "baby": "宝宝风",
                    "mute": "静音风",
                },
                "default": "normal"
            }
        }
    },
    "0xE3": {
        "name": "燃热水器",
        "actions": {
            "power": {
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            },
            "temperature": {
                "type": "range",
                "range": {
                    "max": 65,
                    "min": 35
                },
                "default": 65
            }
        }
    },
    "0xFD": {
        "name": "加湿器",
        "actions": {
            "power": {
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            },
            "wind_speed": {
                "type": "list",
                "value": {
                    "low": "低风",
                    "middle": "中风",
                    "high": "高风",
                    "auto": "自动"
                },
                "default": "auto"
            }
        }
    },
    "0xA1": {
        "name": "除湿器",
        "actions": {
            "power": {
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            },
            "mode": {
                "type": "list",
                "value": {
                    "set": "设定除湿",
                    "continuity": "连续除湿",
                    "auto": "自动除湿",
                    "dry_clothes": "干衣模式",
                    "dry_shoes": "干鞋模式",
                },
                "default": "auto"
            }
        }
    },
    "0xCC": {
        "name": "中央空调",
        "actions": {
            "power": {
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            },
            "mode": {
                "type": "list",
                "value": {
                    "auto": "自动",
                    "fan": "送风",
                    "cool": "制冷",
                    "heat": "制热",
                    "dry": "抽湿"
                },
                "default": "auto"
            },
            "temperature": {
                "type": "range",
                "range": {
                    "max": 30,
                    "min": 17
                },
                "default": 27
            }
        }
    },
    "0x10": {
        "name": "插座",
        "actions": {
            "power": {
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            }
        }
    },
    "0x13": {
        "name": "WiFi吸顶灯",
        "actions": {
            "power": {
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            }
        }
    }
}


/*
'2': ["0xAC", "0xE2", "0xFC", "0xB8", "0xFB", "0xB6", "0xE1", "0xFA", "0xE3", "0xFD", "0xA1", "0x10", "0xCC", "0x13"],
'3': ["0xAC", "0xE2", "0xFC", "0xB8", "0xFB", "0xB6", "0xE1", "0xFA", "0xE3", "0xFD", "0xA1", "0x10", "0xCC", "0x13"],
'4': ["0xAC", "0xE2", "0xFC", "0xB8", "0xFB", "0xB6", "0xE1", "0xFA", "0xE3", "0xFD", "0xA1", "0x10", "0xCC", "0x13"],
'6': ["0xAC", "0xE2", "0xFC", "0xFB", "0xFA", "0xE3", "0xFD", "0xA1", "0x10", "0xCC"]
*/
export const autoSupportActions = {
    '2': {
        "0xAC": { "name": "空调",   
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "auto": "自动",
                        "fan": "送风",
                        "cool": "制冷",
                        "heat": "制热",
                        "dry": "抽湿",
                    },
                    "default": "auto"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 30,
                        "min": 17
                    },
                    "default": 27
                }
            ]
        },
        "0xCC": { "name": "中央空调",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "auto": "自动",
                        "fan": "送风",
                        "cool": "制冷",
                        "heat": "制热",
                        "dry": "抽湿"
                    },
                    "default": "auto"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 30,
                        "min": 17
                    },
                    "default": 27
                }
            ]
        },
        "0xE1": { "name": "洗碗机",
            "actions": [{
                    "property": "work_status",
                    "propertyName": "工作状态",
                    "type": "list",
                    "value": {
                        "soft_gear": "软水档位设置中",
                        "error": "错误",
                        "order": "预约",
                        "work": "开始工作",
                        "cancel": "取消工作",
                        "power_off": "关机",
                        "power_on": "开机",
                    },
                    "default": "power_off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "self_define": "自定义",
                        "fast_wash": "快速洗",
                        "glass_wash": "玻璃洗",
                        "eco_wash": "节能洗/经济洗",
                        "standard_wash": "及时洗/标准洗",
                        "strong_wash": "强力洗",
                        "auto_wash": "自动洗/智能洗",
                    },
                    "default": "auto_wash"
                }
            ]
        },
        "0xE2": { "name": "热水器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 75,
                        "min": 30
                    },
                    "default": 65
                }
            ]
        },
        "0xE3": { "name": "燃热水器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 65,
                        "min": 35
                    },
                    "default": 65
                }
            ]
        },
        "0xFA": { "name": "风扇",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "normal": "正常风",
                        "natural": "自然风",
                        "sleep": "睡眠风",
                        "comfort": "舒适风",
                        "feel": "人感",
                        "baby": "宝宝风",
                        "mute": "静音风",
                    },
                    "default": "normal"
                }
            ]
        },
        "0xFB": { "name": "电暖器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 50,
                        "min": -40
                    },
                    "default": 27
                }
            ]
        },
        "0xFC": { "name": "空气净化器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "auto": "自动",
                        "manual": "手动",
                        "sleep": "睡眠",
                        "fast": "急速"
                    },
                    "default": "auto"
                },
                {
                    "property": "wind_speed",
                    "propertyName": "风速",
                    "type": "range",
                    "range": {
                        "max": 101,
                        "min": 0
                    },
                    "default": 101
                }
            ]
        },
        "0xFD": { "name": "加湿器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "wind_speed",
                    "propertyName": "风速",
                    "type": "list",
                    "value": {
                        "low": "低风",
                        "middle": "中风",
                        "high": "高风",
                        "auto": "自动"
                    },
                    "default": "auto"
                }
            ]
        },
        "0xB6": { "name": "抽油烟机",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "gear",
                    "propertyName": "档位",
                    "type": "list",
                    "value": {
                        "1": "1档",
                        "2": "2档",
                        "3": "3档",
                        "4": "4档"
                    },
                    "default": "1"
                }
            ]
        },
        "0xB8": { "name": "吸尘器",
            "actions": [{
                    "property": "work_status",
                    "propertyName": "工作状态",
                    "type": "list",
                    "value": {
                        "work": "启动",
                        "stop": "停止",
                        "charge": "回充",
                    },
                    "default": "stop"
                },
                {
                    "property": "work_mode",
                    "propertyName": "工作模式",
                    "type": "list",
                    "value": {
                        "random": "随机模式",
                        "arc": "弓形模式",
                        "edge": "沿边模式",
                        "emphases": "重点模式",
                        "screw": "螺旋模式",
                        "auto": "自动模式",
                    },
                    "default": "auto"
                }
            ]
        },
        "0xA1": { "name": "除湿机",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "set": "设定除湿",
                        "continuity": "连续除湿",
                        "auto": "自动除湿",
                        "dry_clothes": "干衣模式",
                        "dry_shoes": "干鞋模式",
                    },
                    "default": "auto"
                }
            ]
        },
        "0x10": { "name": "插座",
            "actions": [{
                "property": "power",
                "propertyName": "电源",
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            }]
        },
        "0x13": { "name": "WiFi吸顶灯",
            "actions": [{
                "property": "power",
                "propertyName": "电源",
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            }]
        }
    },
    '3': {
        "0xAC": { "name": "空调",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "auto": "自动",
                        "fan": "送风",
                        "cool": "制冷",
                        "heat": "制热",
                        "dry": "抽湿",
                    },
                    "default": "auto"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 30,
                        "min": 17
                    },
                    "default": 27
                }
            ]
        },
        "0xCC": { "name": "中央空调",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "auto": "自动",
                        "fan": "送风",
                        "cool": "制冷",
                        "heat": "制热",
                        "dry": "抽湿"
                    },
                    "default": "auto"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 30,
                        "min": 17
                    },
                    "default": 27
                }
            ]
        },
        "0xE1": { "name": "洗碗机",
            "actions": [{
                    "property": "work_status",
                    "propertyName": "工作状态",
                    "type": "list",
                    "value": {
                        "soft_gear": "软水档位设置中",
                        "error": "错误",
                        "order": "预约",
                        "work": "开始工作",
                        "cancel": "取消工作",
                        "power_off": "关机",
                        "power_on": "开机",
                    },
                    "default": "power_off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "self_define": "自定义",
                        "fast_wash": "快速洗",
                        "glass_wash": "玻璃洗",
                        "eco_wash": "节能洗/经济洗",
                        "standard_wash": "及时洗/标准洗",
                        "strong_wash": "强力洗",
                        "auto_wash": "自动洗/智能洗",
                    },
                    "default": "auto_wash"
                }
            ]
        },
        "0xE2": { "name": "热水器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 75,
                        "min": 30
                    },
                    "default": 65
                }
            ]
        },
        "0xE3": { "name": "燃热水器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 65,
                        "min": 35
                    },
                    "default": 65
                }
            ]
        },
        "0xFA": { "name": "风扇",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "normal": "正常风",
                        "natural": "自然风",
                        "sleep": "睡眠风",
                        "comfort": "舒适风",
                        "feel": "人感",
                        "baby": "宝宝风",
                        "mute": "静音风",
                    },
                    "default": "normal"
                }
            ]
        },
        "0xFB": { "name": "电暖器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 50,
                        "min": -40
                    },
                    "default": 27
                }
            ]
        },
        "0xFC": { "name": "空气净化器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "auto": "自动",
                        "manual": "手动",
                        "sleep": "睡眠",
                        "fast": "急速"
                    },
                    "default": "auto"
                },
                {
                    "property": "wind_speed",
                    "propertyName": "风速",
                    "type": "range",
                    "range": {
                        "max": 101,
                        "min": 0
                    },
                    "default": 101
                }
            ]
        },
        "0xFD": { "name": "加湿器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "wind_speed",
                    "propertyName": "风速",
                    "type": "list",
                    "value": {
                        "low": "低风",
                        "middle": "中风",
                        "high": "高风",
                        "auto": "自动"
                    },
                    "default": "auto"
                }
            ]
        },
        "0xB6": { "name": "抽油烟机",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "gear",
                    "propertyName": "档位",
                    "type": "list",
                    "value": {
                        "1": "1档",
                        "2": "2档",
                        "3": "3档",
                        "4": "4档"
                    },
                    "default": "1"
                }
            ]
        },
        "0xB8": { "name": "吸尘器",
            "actions": [{
                    "property": "work_status",
                    "propertyName": "工作状态",
                    "type": "list",
                    "value": {
                        "work": "启动",
                        "stop": "停止",
                        "charge": "回充",
                    },
                    "default": "stop"
                },
                {
                    "property": "work_mode",
                    "propertyName": "工作模式",
                    "type": "list",
                    "value": {
                        "random": "随机模式",
                        "arc": "弓形模式",
                        "edge": "沿边模式",
                        "emphases": "重点模式",
                        "screw": "螺旋模式",
                        "auto": "自动模式",
                    },
                    "default": "auto"
                }
            ]
        },
        "0xA1": { "name": "除湿机",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "set": "设定除湿",
                        "continuity": "连续除湿",
                        "auto": "自动除湿",
                        "dry_clothes": "干衣模式",
                        "dry_shoes": "干鞋模式",
                    },
                    "default": "auto"
                }
            ]
        },
        "0x10": { "name": "插座",
            "actions": [{
                "property": "power",
                "propertyName": "电源",
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            }]
        },
        "0x13": { "name": "WiFi吸顶灯",
            "actions": [{
                "property": "power",
                "propertyName": "电源",
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            }]
        }
    },
    '4': {
        "0xAC": { "name": "空调",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "auto": "自动",
                        "fan": "送风",
                        "cool": "制冷",
                        "heat": "制热",
                        "dry": "抽湿",
                    },
                    "default": "auto"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 30,
                        "min": 17
                    },
                    "default": 27
                }
            ]
        },
        "0xCC": { "name": "中央空调",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "auto": "自动",
                        "fan": "送风",
                        "cool": "制冷",
                        "heat": "制热",
                        "dry": "抽湿"
                    },
                    "default": "auto"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 30,
                        "min": 17
                    },
                    "default": 27
                }
            ]
        },
        "0xE1": { "name": "洗碗机",
            "actions": [{
                    "property": "work_status",
                    "propertyName": "工作状态",
                    "type": "list",
                    "value": {
                        "soft_gear": "软水档位设置中",
                        "error": "错误",
                        "order": "预约",
                        "work": "开始工作",
                        "cancel": "取消工作",
                        "power_off": "关机",
                        "power_on": "开机",
                    },
                    "default": "power_off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "self_define": "自定义",
                        "fast_wash": "快速洗",
                        "glass_wash": "玻璃洗",
                        "eco_wash": "节能洗/经济洗",
                        "standard_wash": "及时洗/标准洗",
                        "strong_wash": "强力洗",
                        "auto_wash": "自动洗/智能洗",
                    },
                    "default": "auto_wash"
                }
            ]
        },
        "0xE2": { "name": "热水器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 75,
                        "min": 30
                    },
                    "default": 65
                }
            ]
        },
        "0xE3": { "name": "燃热水器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 65,
                        "min": 35
                    },
                    "default": 65
                }
            ]
        },
        "0xFA": { "name": "风扇",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "normal": "正常风",
                        "natural": "自然风",
                        "sleep": "睡眠风",
                        "comfort": "舒适风",
                        "feel": "人感",
                        "baby": "宝宝风",
                        "mute": "静音风",
                    },
                    "default": "normal"
                }
            ]
        },
        "0xFB": { "name": "电暖器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 50,
                        "min": -40
                    },
                    "default": 27
                }
            ]
        },
        "0xFC": { "name": "空气净化器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "auto": "自动",
                        "manual": "手动",
                        "sleep": "睡眠",
                        "fast": "急速"
                    },
                    "default": "auto"
                },
                {
                    "property": "wind_speed",
                    "propertyName": "风速",
                    "type": "range",
                    "range": {
                        "max": 101,
                        "min": 0
                    },
                    "default": 101
                }
            ]
        },
        "0xFD": { "name": "加湿器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "wind_speed",
                    "propertyName": "风速",
                    "type": "list",
                    "value": {
                        "low": "低风",
                        "middle": "中风",
                        "high": "高风",
                        "auto": "自动"
                    },
                    "default": "auto"
                }
            ]
        },
        "0xB6": { "name": "抽油烟机",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "gear",
                    "propertyName": "档位",
                    "type": "list",
                    "value": {
                        "1": "1档",
                        "2": "2档",
                        "3": "3档",
                        "4": "4档"
                    },
                    "default": "1"
                }
            ]
        },
        "0xB8": { "name": "吸尘器",
            "actions": [{
                    "property": "work_status",
                    "propertyName": "工作状态",
                    "type": "list",
                    "value": {
                        "work": "启动",
                        "stop": "停止",
                        "charge": "回充",
                    },
                    "default": "stop"
                },
                {
                    "property": "work_mode",
                    "propertyName": "工作模式",
                    "type": "list",
                    "value": {
                        "random": "随机模式",
                        "arc": "弓形模式",
                        "edge": "沿边模式",
                        "emphases": "重点模式",
                        "screw": "螺旋模式",
                        "auto": "自动模式",
                    },
                    "default": "auto"
                }
            ]
        },
        "0xA1": { "name": "除湿机",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "set": "设定除湿",
                        "continuity": "连续除湿",
                        "auto": "自动除湿",
                        "dry_clothes": "干衣模式",
                        "dry_shoes": "干鞋模式",
                    },
                    "default": "auto"
                }
            ]
        },
        "0x10": { "name": "插座",
            "actions": [{
                "property": "power",
                "propertyName": "电源",
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            }]
        },
        "0x13": { "name": "WiFi吸顶灯",
            "actions": [{
                "property": "power",
                "propertyName": "电源",
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            }]
        }
    },
    '6': {
        "0xAC": { "name": "空调",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "auto": "自动",
                        "fan": "送风",
                        "cool": "制冷",
                        "heat": "制热",
                        "dry": "抽湿",
                    },
                    "default": "auto"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 30,
                        "min": 17
                    },
                    "default": 27
                }
            ]
        },
        "0xCC": { "name": "中央空调",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "auto": "自动",
                        "fan": "送风",
                        "cool": "制冷",
                        "heat": "制热",
                        "dry": "抽湿"
                    },
                    "default": "auto"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 30,
                        "min": 17
                    },
                    "default": 27
                }
            ]
        },
        "0xE2": { "name": "热水器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 75,
                        "min": 30
                    },
                    "default": 65
                }
            ]
        },
        "0xE3": { "name": "燃热水器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 65,
                        "min": 35
                    },
                    "default": 65
                }
            ]
        },
        "0xFA": { "name": "风扇",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "normal": "正常风",
                        "natural": "自然风",
                        "sleep": "睡眠风",
                        "comfort": "舒适风",
                        "feel": "人感",
                        "baby": "宝宝风",
                        "mute": "静音风",
                    },
                    "default": "normal"
                }
            ]
        },
        "0xFB": { "name": "电暖器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "temperature",
                    "propertyName": "温度",
                    "type": "range",
                    "range": {
                        "max": 50,
                        "min": -40
                    },
                    "default": 27
                }
            ]
        },
        "0xFC": { "name": "空气净化器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "auto": "自动",
                        "manual": "手动",
                        "sleep": "睡眠",
                        "fast": "急速"
                    },
                    "default": "auto"
                },
                {
                    "property": "wind_speed",
                    "propertyName": "风速",
                    "type": "range",
                    "range": {
                        "max": 101,
                        "min": 0                    
                    },
                    "default": 101
                }
            ]
        },
        "0xFD": { "name": "加湿器",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "wind_speed",
                    "propertyName": "风速",
                    "type": "list",
                    "value": {
                        "low": "低风",
                        "middle": "中风",
                        "high": "高风",
                        "auto": "自动"
                    },
                    "default": "auto"
                }
            ]
        },
        "0xA1": { "name": "除湿机",
            "actions": [{
                    "property": "power",
                    "propertyName": "电源",
                    "type": "switch",
                    "value": {
                        "off": "关机",
                        "on": "开机",
                    },
                    "default": "off"
                },
                {
                    "property": "mode",
                    "propertyName": "模式",
                    "type": "list",
                    "value": {
                        "set": "设定除湿",
                        "continuity": "连续除湿",
                        "auto": "自动除湿",
                        "dry_clothes": "干衣模式",
                        "dry_shoes": "干鞋模式",
                    },
                    "default": "auto"
                }
            ]
        },
        "0x10": { "name": "插座",
            "actions": [{
                "property": "power",
                "propertyName": "电源",
                "type": "switch",
                "value": {
                    "off": "关机",
                    "on": "开机",
                },
                "default": "off"
            }]
        }
    },
}

export const applianceImgPath = {
    "0xAC": "assets/img/0xAC.png", //空调
    "0xCC": "assets/img/0xCC.png", //中央空调
    "0xE1": "assets/img/0xE1.png", //洗碗机
    "0xE2": "assets/img/0xE2.png", //热水器
    "0xE3": "assets/img/0xE3.png", //燃热水器
    "0xFB": "assets/img/0xFB.png",//电暖器
    "0xB6": "assets/img/0xB6.png", //抽油烟机
    "0xB8": "assets/img/0xB8.png", //吸尘器
    "0xFC": "assets/img/0xFC.png", //空气净化器
    "0xFA": "assets/img/0xFA.png",//风扇
    "0xFD": "assets/img/0xFD.png",//加湿器
    "0xA1": "assets/img/0xA1.png",//除湿机
    "0x10": "assets/img/0x10.png",//插座
    "0x13": "assets/img/0x13.png"//吸顶灯
}

export const codeDesc = {//云端接口返回的错误码对应描述
    scene: {
        '1000': '未知系统错误',
        '1001': '参数格式错误',
        '1002': '参数为空',
        '1105': '账户不存在',
        '1202': '用户不是家庭的管理员',
        '1200': '用户不在家庭',
        '1300': '设备不存在',
        '1700': '无操作权限',
        '1701': '场景不存在',
        '1003': '参数类型不支持',
        '1704': '场景没有关联设备',
        '1708': '场景执行记录不存在',
        '1709': '模式不存在',
        '1710': '场景不支持该设备类型'
    },
    auto: {
        '1000': '未知系统错误',
        '1001': '参数格式错误',
        '1002': '参数为空',
        '1105': '账户不存在',
        '1200': '用户不在家庭',
        '1202': '用户不是家庭管理员',
        '1701': '自动化项目不存在',
        '1702': '自动化已被禁用， 不能执行',
        '1704': '没有关联设备',
        '1708': '执行记录不存在'  
    },
    home: {
        '1000': '未知系统错误',
        '1002': '参数为空',
        '1105': '账户不存在',
        '1200': '用户不是家庭成员'
    }
}

export const luaDesc = {
    '1001': '账号未登录',
    '1002': '设备不存在',
    '1003': '设备已离线',
    '1101': '启用WIFI超时',
    '1102': '不支持的路由器加密类型',
    '1103': '连接路由器密码错误',
    '1104': '连接路由器超时',
    '1105': '连接路由器失败',
    '1107': '连接设备热点密码错误',
    '1108': '连接设备热点超时',
    '1109': '连接设备热点失败',
    '1110': '发现设备热点超时',
    '1111': '连接设备异常',
    '1112': '连接设备失败',
    '1129': '重连路由器密码错误',
    '1130': '重连路由器超时',
    '1131': '重连路由器失败',
    '1133': '局域网设备发现失败',
    '4000': '没有发现设备',
    '4001': '无法识别',
    '4002': '手机已自动连接到其他WiFi， 无法激活。 请连接到“xx” 网络后返回',
    '4003': '该设备热点不符合格式规范',
    '4004': '连接设备失败',
    '4005': '连接设备超时',
    '4008': '发现设备超时',
    '4010': '获取WiFi列表失败',
    '4016': '配网方式切换失败',
    '4017': '连接家庭网络失败',
    '4018': '发现设备超时',
    '4019': '固件升级失败',
    '4020': '固件升级失败',
    '4021': '暂无更新',
    '4022': '下载失败',
    '4023': '升级失败',
    '4024': '升级失败',
    '4025': '升级失败',
    '4026': '升级失败',
    '4027': '升级失败',
    '4028': '升级失败',
    '4029': '升级失败',
    '4030': '升级失败',
    '4031': '升级失败',
    '4032': '升级失败',
    '8001': '设备不存在',
    '8002': '升级失败',
    '9002': '网络异常',
    '9003': '网络异常'
}