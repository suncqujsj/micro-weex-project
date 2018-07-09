import Mock, { mock } from 'mockjs';

export const all = [
    {
        path: 'deviceinfo',
        data: {
            "errorCode": 0,
		    "params": {
		       "power": "on",
		        "mode": "shower",
		        "temperature": "55"
		    }
        }
    },
    {
        path: 'poweroff',
        data: {
            "errorCode": 0,
		    "params": {
		       "power": "off",
		        "mode": "shower",
		        "temperature": "55"
		    }
        }
    },
    {
        path: 'poweron',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "on",
		        "mode": "kitchen",
		        "temperature": "45"
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

