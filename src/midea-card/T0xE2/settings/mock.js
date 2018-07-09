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
		        "mode": "fast_wash",
		        "temperature": "35",
		        "cur_temperature": "65",
		    }
        }
    },
    {
        path: 'poweroff',
        data: {
            "errorCode": 0,
		    "params": {
		       "power": "off",
		        "mode": "summer",
		        "temperature": "25",
		        "cur_temperature": "65",
		    }
        }
    },
    {
        path: 'update',
        data: {
            "errorCode": 0,
		    "params": {
		       "power": "on",
		        "mode": "summer",
		        "temperature": "45",
		        "cur_temperature": "65",
		    }
        }
    },
    {
        path: 'poweron',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "on",
		        "mode": "summer",
		        "temperature": "55",
		        "cur_temperature": "60",
		    }
        }
    },
    {
        path: 'up',
        data: {
            "errorCode": 0,
				    "params": {
				         "power": "on",
					        "mode": "summer",
					        "temperature": "25",
					        "cur_temperature": "15"
				   		 }
        }
    },
    {
        path: 'down',
        data: {
            "errorCode": 0,
					    "params": {
					        "power": "on",
					        "mode": "winter",
					        "temperature": "33",
					        "cur_temperature": "44"
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

