export const domain = 'http://iot-dev.smartmidea.net'
export const url = {
    scene: {
        applianceAdd: domain +'/v1/scene/appliance/add',
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
    "0xB0": {
        "door_open": {
            "on": "开着",
            "off": "关着",
        },
        "lock": {
            "on": "打开",
            "off": "关闭",
        },
        "mode": {
            "microwave": "微波",
            "baking": "烧烤",
            "unfreeze": "解冻",
        },
        "work_status": {
            "cancel": "待机/取消工作",
            "work": "工作",
            "pause": "暂停",
            "end": "烹饪完成",
            "order": "预约中",
            "heat": "预热",
            "three": "爱心3秒",
            "reaction": "菜单感应中",
            "cloud": "云菜谱段结束",
        },
        "power": {
            "on": "开机",
            "off": "关机",
        },
        "name": {
            "CH": "微波炉",
        },
    },
    "0xCA": {
        "flexzone_door_state": {
            "on": "未关闭",
            "off": "关闭",
        },
        "freezer_door_state": {
            "on": "未关闭",
            "off": "关闭",
        },
        "storage_door_state": {
            "on": "未关闭",
            "off": "关闭",
        },
        "intelligent_mode": {
            "on": "打开",
            "off": "关闭",
        },
        "freezing_mode": {
            "on": "打开",
            "off": "关闭",
        },
        "storage_mode": {
            "on": "打开",
            "off": "关闭",
        },
        "right_flexzone_power": {
            "on": "打开",
            "off": "关闭",
        },
        "left_flexzone_power": {
            "on": "打开",
            "off": "关闭",
        },
        "storage_power": {
            "on": "打开 ",
            "off": "关闭",
        },
        "name": {
            "CH": "冰箱",
        },
    },
    "0xEA": {
        "rice_type": {
            "fragrant": "香米",
            "northeast": "东北米",
            "longrain": "丝苗米",
            "none": "无米种",
        },
        "mouthfeel": {
            "soft": "偏软",
            "middle": "适中",
            "hard": "偏硬",
            "none": "无口感",
        },
        "work_status": {
            "cooking": "工作中",
            "schedule": "预约中",
            "keep_warm": "保温中",
            "cancel": "取消",
        },
        "mode": {
            "cook_rice": "煮饭",
            "cook_congee": "煮粥",
            "stew_soup": "煲汤",
            "stewing": "蒸煮",
            "make_cake": "蛋糕",
        },
        "name": {
            "CH": "电饭煲",
        },
    },
    "0xFB": {
        "lock": {
            "on": "上锁",
            "off": "解锁",
            "invalid": "无效",
        },
        "humidity_mode": {
            "invalid": "无效",
            "three": "3档",
            "two": "2档",
            "one": "1档",
            "close": "关闭",
            "const": "无档位变化加湿",
        },
        "mode": {
            "invalid": "无效",
            "custom": "随心暖",
            "fast_hot": "速热",
            "normal": "正常",
            "constant_temperature": "智能恒温",
            "comfort": "舒适",
            "antifreezing": "防冻",
            "sleep": "睡眠",
            "efficient": "节能",
            "intelligent": "智能",
        },
        "power": {
            "on": "开机",
            "off": "关机",
        },
        "name": {
            "CH": "取暖器",
        },
    },
    "0xB2": {
        "water_state": {
            "full": "水满",
            "empty": "缺水",
        },
        "box_state": {
            "in": "在位",
            "out": "抽出",
        },
        "door_state": {
            "open": "打开",
            "close": "关闭",
        },
        "lock": {
            "on": "上锁",
            "off": "解锁",
        },
        "work_mode": {
            "fish": "蒸鱼",
            "meat": "蒸肉",
            "egg": "蒸蛋",
            "seafood": "蒸海鲜",
            "grain": "蒸杂粮",
            "rice": "蒸米饭",
            "vegetable": "蒸蔬菜",
            "chop": "蒸排骨",
            "unfreeze": "解冻",
            "keep_warm": "保温",
            "steam_clean": "蒸汽清洁",
            "common": "普通蒸汽",
            "zymosis": "发酵",
            "heat": "翻热",
            "furring_clean": "水垢清洁",
            "disinfect": "蒸汽消毒",
        },
        "work_status": {
            "standby": "开机，非省电，非工作，取消工作",
            "work": "工作，继续",
            "save_power": "省电，关机",
            "pause": "暂停",
            "reservation": "预约",
            "none": "不操作",
            "work_finish": "完成工作",
        },
        "name": {
            "CH": "蒸汽炉",
        },
    },
    "0xB1": {
        "mode": {
            "keep_warm": "保温",
            "stero_baking": "立体烧烤",
            "whole_baking": "全烧烤",
            "up_down_baking": "上下烧烤",
            "unfreeze": "解冻",
            "hot_air_convection": "热风对流",
            "power_saving": "省电模式",
            "center_baking": "中心烧烤",
            "rotary_baking": "旋转烧烤",
        },
        "work_status": {
            "none": "空闲",
            "cancel": "取消",
            "work": "工作",
            "pause": "暂停",
            "end": "工作结束",
            "appointment": "预约中",
        },
        "power": {
            "on": "开机",
            "off": "关机",
        },
        "name": {
            "CH": "大烤箱",
        },
    },
    "0xB4": {
        "name": {
            "CH": "小烤箱",
        },
        "work_mode": {
            "temperature_differ": "上下异温",
            "underside_tube": "单下管发热",
            "zymosis": "发酵",
            "hot_wind_bake": "热风烧烤",
            "revolve_bake": "旋转烧烤",
            "above_tube": "单上管发热",
            "double_tube": "上下管发热",
            "none": "不设置",
        },
        "work_status": {
            "recipes_finish": "菜谱段结束",
            "work_finish": "完成工作",
            "preheat_finish": "预热结束",
            "preheating": "预热中",
            "lock_on": "上锁",
            "preheat": "预热",
            "save_power": "省电，关机",
            "work": "工作",
            "standby": "开机，非省电，非工作，取消工作，解锁",
        },
    },
    "0xE1": {
        "lock": {
            "off": "解锁",
            "on": "上锁",
        },
        "mode": {
            "self_define": "自定义",
            "fast_wash": "快速洗",
            "glass_wash": "玻璃洗",
            "eco_wash": "节能洗/经济洗",
            "standard_wash": "及时洗/标准洗",
            "strong_wash": "强力洗",
            "auto_wash": "自动洗/智能洗",
        },
        "operator": {
            "start": "重启工作",
            "pause": "暂停工作",
        },
        "work_status": {
            "soft_gear": "软水档位设置中",
            "error": "错误",
            "order": "预约",
            "work": "开始工作",
            "cancel": "取消工作",
            "power_off": "关机",
            "power_on": "开机",
        },
        "name": {
            "CH": "洗碗机",
        },
    },
    "0xB6": {
        "light": {
            "on": "开灯",
            "off": "关灯",
        },
        "intelligent": {
            "on": "开",
            "off": "关",
        },
        "power": {
            "on": "开机",
            "off": "关机",
        },
        "name": {
            "CH": "抽油烟机",
        },
    },
    "0x10": {
        "name": {
            "CH": "插座",
        },
        "power": {
            "on": "打开插座",
            "off": "关闭插座",
        },
    },
    "0xE2": {
        "name": {
            "CH": "热水器",
        },
        "mode": {
            "none": "无",
            "cloud": "云智能",
            "custom": "自设温度",
            "wash": "洗漱用水",
            "shower": "淋浴用水",
            "bath": "浴缸用水",
            "memory": "智能记忆",
            "adult": "成人洗",
            "sterilization": "高温杀菌",
            "one_person": "一人洗",
            "two_person": "两人洗",
            "three_person": "三人洗",
            "old_man": "老人洗",
            "children": "儿童洗",
            "summer": "夏季模式",
            "winter": "冬季模式",
            "efficient": "节能模式",
            "night": "峰谷夜电",
            "fast_wash": "快速洗",
            "eplus": "E+增容",
        },
        "power": {
            "off": "关机",
            "on": "开机",
        },
    },
    "0xFC": {
        "ash_tvoc": {
            "ash_tvoc_value": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
            ],
            "ash_tvoc_CH": {
                "0": "优",
                "1": "优",
                "2": "中",
                "3": "中",
                "4": "差",
                "5": "差",
            },
        },
        "pm25": {
            "pm25_value": [
                "0",
                "35",
                "75",
                "115",
                "150",
                "250",
                "500",
                "9999999",
            ],
            "pm25_CH": {
                "0": "优",
                "35": "优",
                "75": "良",
                "115": "轻度污染",
                "150": "中度污染",
                "250": "重度污染",
                "500": "严重污染",
                "9999999": "未知",
            },
        },
        "smell_tvoc": {
            "smell_tvoc_value": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
            ],
            "smell_tvoc_CH": {
                "0": "优",
                "1": "优",
                "2": "中",
                "3": "中",
                "4": "差",
                "5": "差",
            },
        },
        "name": {
            "CH": "净化器",
        },
        "mode": {
            "auto": "自动",
            "manual": "手动",
            "sleep": "睡眠",
        },
        "anion": {
            "on": "打开",
            "off": "关闭",
        },
        "power": {
            "off": "关机",
            "on": "开机",
        },
    },
    "0xAC": {
        "name": {
            "CH": "空调",
        },
        "power": {
            "off": "关机",
            "on": "开机",
        },
        "mode": {
            "auto": "自动",
            "fan": "送风",
            "cool": "制冷",
            "heat": "制热",
            "dry": "抽湿",
        },
    },
    "0xE3": {
        "name": {
            "CH": "燃热水器",
        },
        "mode": {
            "old": "老人浴",
            "adult": "成人浴",
            "baby": "宝宝浴",
            "high_temperature": "高温水",
            "wash_bowl": "洗碗",
            "unfreeze": "解冻",
            "eco": "一键节能",
            "intelligence": "云智能",
            "thalposis": "随温感",
            "kitchen": "厨房",
            "shower": "淋浴",
            "invalid": "无",
        },
        "power": {
            "off": "关机",
            "on": "开机",
        },
    },
    "0xDB": {
        "name": {
            "CH": "洗衣机",
        },
        "control_status": {
            "start": "启动",
            "pause": "暂停",
        },
        "running_status": {
            "end": "结束",
            "delay": "预约中",
            "fault": "FAULT",
            "standby": "待机中",
            "start": "运行中",
            "pause": "已暂停",
        },
        "program": {
            "steep": "浸泡洗",
            "enzyme": "除菌洗",
            "underwear": "内衣",
            "outdoor": "户外服",
            "air_wash": "空气洗",
            "single_drying": "单烘干",
            "fiber": "化纤",
            "cotton": "棉麻",
            "eco": "节能",
            "fast_wash": "快洗",
            "mixed_wash": "混合洗",
            "wool": "羊毛",
            "ssp": "筒自洁",
            "sport_clothes": "运动服",
            "single_dehytration": "单脱水",
            "rinsing_dehydration": "漂洗+脱水",
            "big": "大件",
            "baby_clothes": "婴儿服",
            "down_jacket": "羽绒服",
            "color": "护色",
            "intelligent": "智能洗",
            "quick_wash": "速洗45分钟",
            "shirt": "衬衫",
            "fast_wash_60": "洗烘60′程序",
            "wash_drying_60": "洗烘60&apos;",
            "kids": "童装程序",
        },
        "mode": {
            "normal_continus": "正常工作模式,连续运行中",
            "normal": "正常工作",
            "service": "服务测试",
            "factory_test": "工厂测试",
        },
        "power": {
            "off": "关机",
            "on": "开机",
        },
    },
    "0xA1": {
        "name": {
            "CH": "除湿器",
        },
        "power": {
            "on": "开机",
            "off": "关机",
        },
        "mode": {
            "set": "设定除湿",
            "continuity": "连续除湿",
            "auto": "自动除湿",
            "dry_clothes": "干衣模式",
            "dry_shoes": "干鞋模式",
        },
    },
    "0xCC": {
        "name": {
            "CH": "空调",
        },
        "power": {
            "off": "关机",
            "on": "开机",
        },
        "mode": {
            "auto": "自动",
            "fan": "送风",
            "cool": "制冷",
            "heat": "制热",
            "dry": "抽湿",
        },
    },
    "0xFD": {
        "name": {
            "CH": "加湿器",
        },
        "power": {
            "on": "开机",
            "off": "关机",
        },
        "wind_speed": {
            "low": "低风",
            "middle": "中风",
            "high": "高风",
        },
    },
    "0xB8": {
        "name": {
            "CH": "吸尘器",
        },
        "work_status": {
            "work": "启动",
            "stop": "停止",
            "charge": "回充",
        },
        "work_mode": {
            "random": "随机模式",
            "arc": "弓形模式",
            "edge": "沿边模式",
            "emphases": "重点模式",
            "screw": "螺旋模式",
            "auto": "自动模式",
        },
    },
    "0xFA": {
        "name": {
            "CH": "风扇",
        },
        "power": {
            "on": "开机",
            "off": "关机",
        },
        "mode": {
            "normal": "正常风",
            "natural": "自然风",
            "sleep": "睡眠风",
            "comfort": "舒适风",
            "feel": "人感",
            "baby": "宝宝风",
            "mute": "静音风",
        },
    },
    "0xDA": {
        "name": {
            "CH": "洗衣机",
        },
        "program": {
            "eco": "节能",
            "fog": "雾态洗",
            "bucket_dry": "桶干燥",
            "fast_clean_wash": "快净洗",
            "dehydration": "单脱水",
            "under_wear": "内衣",
            "rinse_dehydration": "漂洗+脱水",
            "degerm": "除菌",
            "summer": "夏日洗",
            "big": "大物",
            "home": "家纺",
            "cowboy": "牛仔",
            "soft": "轻柔",
            "hand_wash": "手搓洗",
            "water_flow": "新水流",
            "standard": "标准",
            "fast": "快洗",
            "blanket": "毛毯",
            "wool": "羊毛",
            "embathe": "浸洗",
            "memory": "记忆",
            "child": "童装",
            "strong_wash": "强洗",
            "down_jacket": "羽绒服",
            "stir": "搅拌洗",
            "mute": "静音洗",
            "bucket_self_clean": "筒自洁",
            "air_dry": "风干",
            "cycle": "水循环",
            "remain_water": "留水",
        },
        "running_status": {
            "order": "预约中",
            "error": "FAULT",
            "standby": "待机中",
            "work": "运行中",
            "end": "结束状态",
            "pause": "已暂停",
        },
        "control_status": {
            "start": "启动",
            "pause": "暂停",
        },
        "mode": {
            "normal": "正常工作",
            "dry": "干调模式",
            "continus": "连续运行中",
        },
        "power": {
            "off": "关机",
            "on": "开机",
        },
    },


}