import Mock, { mock } from 'mockjs';

export const all = [
    {
        path: 'luaQuery',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "on",
		        "mode": "auto",
		        "temperature": "25",
		        "small_temperature": "0.5",
		        "indoor_temperature": "30",
		        "outdoor_temperature": "-25",
		        "error_code": "1"
		    }
        }
    },
    {
        path: 'deviceinfo',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "on",
		        "work_status": "1",
		        "error_code": "0",
		        "temperature": "30",
		        "time_reserve_setting_hr":"12",
		        "time_reserve_setting_min":"12",
		        "time_reserve_hr": "4",
		        "time_reserve_min": "50",
		        "time_warm_hr": "1",
		        "time_warm_min": "20",
		        "time_work_hr": "1",
		        "time_work_min": "20",
		        "time_pressurize_hr": "1",
		        "time_pressurize_min": "1"
		    }
        }
    },
    {
        path: 'poweroff',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "off",
		        "mode": "auto",
		        "temperature": "25",
		        "small_temperature": "0.5",
		        "indoor_temperature": "30",
		        "outdoor_temperature": "-25",
		        "error_code": "1"
		    }
        }
    },
    {
        path: 'temperatureControl',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "on",
		        "mode": "fan",
		        "temperature": "26",
		        "small_temperature": "0.5",
		        "indoor_temperature": "30",
		        "outdoor_temperature": "-25",
		        "error_code": "1"
		    }
        }
    },
    {
        path: 'poweron',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "on",
		        "mode": "auto",
		        "temperature": "25",
		        "small_temperature": "0.5",
		        "indoor_temperature": "30",
		        "outdoor_temperature": "-25",
		        "error_code": "1"
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
                 "deviceId": "1099511629098",
                "deviceName": "空调541F",
                "deviceType": "0xAC",
                "deviceSubType": "0",
                "isOnline": "1",
                "deviceSn": "",
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

