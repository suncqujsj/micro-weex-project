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
		        "mode": "sleep",
		        "gear":"4",
		        "temperature":"50"
		    }
        }
    },
    {
        path: 'poweroff',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "off",
		        "mode": "sleep",
		        "gear":"4"
		    }
        }
    },
    {
        path: 'up',
        data: {
            "errorCode": 0,
		    "params": {
		         "power": "on",
		        "mode": "fast_hot",
		        "gear":"20",
		        "temperature":"51"
		    }
        }
    },
     {
        path: 'down',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "on",
		        "mode": "constant_temperature",
		        "gear":"7",
		        "temperature":"40"
		    }
        }
    },
    {
        path: 'poweron',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "on",
		       "mode": "sleep",
		        "gear":"4",
		        "temperature":"60"
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
                "deviceSubType": "5",
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

