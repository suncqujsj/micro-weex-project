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
