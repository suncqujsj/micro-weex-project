import Mock, { mock } from 'mockjs';

export const all = [
    {
        path: 'deviceinfo',
        data: {
            "errorCode": 0,
		    "params": {
		        "work_status": "work",
		        "mode": "auto_wash",
		        "wash_stage":"4",
		        "left_time":"40"
		    }
        }
    },
    {
        path: 'poweroff',
        data: {
            "errorCode": 0,
		    "params": {
		       "work_status": "power_off",
		        "mode": "auto_wash",
		        "wash_stage":"4",
		        "left_time":"40"
		    }
        }
    },
    {
        path: 'poweron',
        data: {
            "errorCode": 0,
		    "params": {
		       "work_status": "power_on",
		        "mode": "auto_wash",
		        "wash_stage":"4",
		        "left_time":"40"
		    }
        }
    },
    {
        path: 'start',
        data: {
            "errorCode": 0,
		    "params": {
		       "work_status": "work",
		        "mode": "auto_wash",
		        "wash_stage":"4",
		        "left_time":"40"
		    }
        }
    },
    {
        path: 'pause',
        data: {
            "errorCode": 0,
		    "params": {
		       "work_status": "order",
		        "mode": "auto_wash",
		        "wash_stage":"4",
		        "left_time":"40"
		    }
        }
    },
    {
        path: 'startWork',
        data: {
            "errorCode": 0,
		    "params": {
		       "work_status": "work",
		        "mode": "auto_wash",
		        "wash_stage":"4",
		        "left_time":"40"
		    }
        }
    },
    {
        path: 'cancelWork',
        data: {
            "errorCode": 0,
		    "params": {
		       "work_status": "cancel",
		        "mode": "auto_wash",
		        "wash_stage":"4",
		        "left_time":"40"
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

