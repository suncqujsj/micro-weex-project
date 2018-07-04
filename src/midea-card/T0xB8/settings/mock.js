import Mock, { mock } from 'mockjs';

export const all = [
    {
        path: 'deviceinfo',
        data: {
            "errorCode": 0,
		    "params": {
		        "work_status": "work",
		        "work_mode": "random",
		    }
        }
    },
    {
        path: 'work',
        data: {
            "errorCode": 0,
		    "params": {
		        "work_status": "work",
		        "work_mode": "edge",
		    }
        }
    },
    {
        path: 'pause',
        data: {
            "errorCode": 0,
		    "params": {
		        "work_status": "stop",
		        "work_mode": "arc",
		    }
        }
    },
    {
        path: 'charge',
        data: {
            "errorCode": 0,
		    "params": {
		        "work_status": "charge",
		        "work_mode": "emphases",
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

