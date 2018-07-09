import Mock, { mock } from 'mockjs';

export const all = [
    {
        path: 'deviceinfo',
        data: {
            "errorCode": 0,
		    "params": {
		        "work_status": "standby",
		        "work_mode": "double_tube",
		        "temperature": "25",
		        "work_hour": "5",
		        "work_minute": "30",
		        "error_code": "0",
		        "lock":"on"
		    }
        }
    },
    {
        path: 'off',
        data: {
            "errorCode": 0,
		    "params": {
		        "work_status": "work",
		        "work_mode": "double_tube",
		        "temperature": "25",
		        "work_hour": "5",
		        "work_minute": "30",
		        "error_code": "0",
		        "lock":"off"
		    }
        }
    },
    {
        path: 'on',
        data: {
            "errorCode": 0,
		    "params": {
		        "work_status": "work",
		        "work_mode": "double_tube",
		        "temperature": "25",
		        "work_hour": "5",
		        "work_minute": "30",
		        "error_code": "0",
		        "lock":"on"
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

