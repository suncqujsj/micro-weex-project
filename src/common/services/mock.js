import Mock, { mock } from 'mockjs';

export const all = [
    {
        path: 'luaQuery',
        data: {
            errorCode: 0,
            msg: 'success',
            result: {
                errorCode: 0,
                power_saving: '@pick(["on", "off"])',
                power_saving_out: '@pick(["on", "off"])',
                cooling: "@pick(['normal','quick_freezing', 'vegetables', 'vegetables_drying', 'chilled', 'thawing'])",
                chilling_room_temp: '@integer(0, 24)',
                freezing_room_temp: '@integer(0, 24)',
                ice_making: '@pick(["normal", "quick", "off"])',
                ice_making_status: '@pick(["running", "water_shortage", "ice_full","stop"])',
                lock: '@pick(["on", "on"])',
                eco: '@pick(["on", "on"])',
                auto_open_door: '@pick(["on", "on"])',
                demo_mode: '',
                force_defrost: '',
                defrost_status_moisture: '@pick(["on", "on"])',
                defrost_status_precool: '@pick(["on", "on"])',
                defrost_status_defrost: '@pick(["on", "on"])',
                chilling_door_status: '',
                freezing_door_status: '',
                ice_door_status: '',
                instantaneous_power: '',
                daily_energy: '',
                error_code: '',
                completion_notice_one: '',
                function_type: '',
                camera_shooting: '',
                time_year: '',
                time_month: '',
                time_day: '',
                time_hour: '',
                time_min: ''
            }
        }
    },
    {
        path: 'luaControl',
        data: {
            errorCode: 0,
            msg: 'success',
            result: {}
        }
    },
    {
        path: 'app/message/settings',
        data: {
            errorCode: 0,
            msg: 'success',
            result: {
                "errorPush": '@pick([0, 1])',
                "defrost30MinPush": '@pick([0, 1])',
                "doorOpenPush": '@pick([0, 1])',
                "watchModePush": '@pick([0, 1])',
                "defrost60MinPush": '@pick([0, 1])'
            }
        }
    },
    {
        path: 'getDeviceInfo',
        data: {
            "msg": "",
            "result": {
                "deviceID": "1099511629098",
                "deviceSSID": "",
                "deviceName": "冰箱541F",
                "deviceType": "0xCA",
                "deviceSubType": "0",
                "online": "1",
                "deviceDescription": "",
                "activated": "",
                "isDeviceOwner": "1"
            },
            "errorCode": "0"
        }
    },
    {
        path: 'getNetworkStatus',
        data: {
            "msg": "",
            "result":{
				"status":1, //0表示不可用，1表示可用
				"type": 1 //0:非wifi, 1: wifi
			},
            "errorCode": "0"
        }
    },
    {
        path: 'getDevicePluginInfo',
        data: {
            "msg": "",
            "result":{
				"status": 0,
				"version": "5.0",
				"packageSize": "30692",
				"needUpdate": 1, //0表示不用更新，1表示需要更新
				"autoDown": 0 //0表示不自动下载，1表示自动下载
			},
            "errorCode": "0"
        }
    },
    {
        path: 'downLoadDevicePlugin',
        data: {
            "msg": "",
            "result":{
				"status": 7, //0 等待下载，1 下载中，2暂停，3下载失败， 4。下载成功 5.解压中，6，解压失败，7.解压成功
				"progress": 100 //下载进度
			},
            "errorCode": "0"
        }
    },
    {path:'queryTXList',
        data:[{
        'applianceType': '0xED',
        'typeName': '简爱系列',
        'name': '净水机0001',
        'modelNumber': '266',
        'sn': '6bdbd1517f0e37cf184a2ca01f43b93a1b390f388875f6b7269e855693233436044786454de37bb10ebecdf2a28ff2ff',
        'applianceCode': '1099511822595',
        'onlineStatus': 'online'
    },
        {
            'applianceType': '0xED',
            'typeName': '简爱系列',
            'name': '净水机0001',
            'modelNumber': '265',
            'sn': '6bdbd1517f0e37cf184a2ca01f43b93a1b390f388875f6b7269e855693233436044786454de37bb10ebecdf2a28ff2ff',
            'applianceCode': '1099511555555',
            'onlineStatus': 'offline'
        },
        {
            'applianceType': '0xE2',
            'typeName': '电热水器',
            'name': '',
            'modelNumber': '60',
            'sn': '',
            'applianceCode': '',
            'onlineStatus': 'unmatch'
        },
        {
            'applianceType': '0xE3',
            'typeName': '燃气热水器',
            'name': '',
            'modelNumber': '49',
            'sn': '',
            'applianceCode': '',
            'onlineStatus': 'unmatch'
        }]
    }
]


function addToMock(list) {
    list.forEach(n => {
        Mock.mock(n.path, n.data)
    })
}

addToMock(all)

Mock.getMock = function (name) {
    let result = Mock.mock(Mock._mocked[name].template)
    console.log("mock data > " + name + ":", result)
    return result
}

export default Mock

