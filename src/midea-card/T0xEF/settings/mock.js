import Mock, { mock } from 'mockjs';

export const all = [
    {
        path: 'deviceinfo',
        data: {
            "errorCode": 0,
		    "params": {
		       "work_status": "1",
		        "time_reserve_hr": "2",
		        "time_reserve_min": "55",
		        "time_work_hr":"3",
		        "time_work_min":"44",
		        "time_warm_hr":"4",
		        "time_warm_min":"33"
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

