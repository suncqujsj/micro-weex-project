export const domain = 'http://iot-dev.smartmidea.net'
export const url = {
    scene: {
        applianceAdd: domain + '/v1/scene/appliance/add',
        applianceDelete: domain + '/v1/scene/appliance/delete',
        list: domain + '/v1/scene/list',
        detail: domain + '/v1/scene/detail',
        supportList: domain + '/v1/scene/support/type/list',
        modelSet: domain + '/v1/scene/model/set',
        modeExecute: domain + '/v1/scene/model/execute',
        optimize: domain + '/v1/scene/optimize',
        status: domain + '/v1/scene/status/get',
        record: domain + '/v1/scene/record/list',
        recordDelete: domain + '/v1/scene/record/delete',
    },
    auto: {
        list: domain + '/v1/scene/auto/list',
        add: domain + '/v1/scene/auto/add',
        detail: domain + '/v1/scene/auto/detail',
        update: domain + '/v1/scene/auto/update',
        delete: domain + '/v1/scene/auto/delete',
        execute: domain + '/v1/scene/auto/execute',
        status: domain + '/v1/scene/auto/status/get',
        recordUpload: domain + '/v1/scene/auto/record/upload',
        record: domain + '/v1/scene/auto/record/list',
        recordDelete: domain + '/v1/scene/auto/record/delete',
        ApplianceAction: domain + '/v1/scene/auto/action/list'
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
                "auto": "自动",
                "manual": "手动",
                "sleep": "睡眠",
                "fast": "急速"
            },
            "wind_speed": {
                "type": "range",
                "range": {
                    "max": 0,
                    "min": 101
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

export const applianceImgPath = {
    "0xAC": "assets/img/0xAC.png",
    "0xB8": "assets/img/0xB8.png",
    "0xFB": "assets/img/0xFB.png",
    "0xB6": "assets/img/0xB6.png",
    "0xE1": "assets/img/0xE1.png",
    "0xFA": "assets/img/0xFA.png",
    "0xE3": "assets/img/0xE3.png",
    "0xFD": "assets/img/0xFD.png",
    "0xA1": "assets/img/0xA1.png",
    "0xCC": "assets/img/0xCC.png",
    "0x10": "assets/img/0x10.png",
    "0x13": "assets/img/0x13.png"
}