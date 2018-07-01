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
		       "work_status": "2",
		        "time_running_hr": "3",
		        "time_running_min": "55",
		        "time_reserve_hr":"4",
		        "time_reserve_min":"45",
		        "error_code":"1",
		        "function_no":"2"
		    }
        }
    },
    {
        path: 'poweroff',
        data: {
            "errorCode": 0,
		    "params": {
		        "work_status": "5",
		        "time_running_hr": "3",
		        "time_running_min": "55",
		        "time_reserve_hr":"4",
		        "time_reserve_min":"45",
		        "error_code":"1"
		    }
        }
    },
    {
        path: 'up',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "on",
		        "mode": "normal",
		        "gear":"20"
		    }
        }
    },
     {
        path: 'down',
        data: {
            "errorCode": 0,
		    "params": {
		        "work_status": "5",
		        "time_running_hr": "3",
		        "time_running_min": "55",
		        "time_reserve_hr":"4",
		        "time_reserve_min":"45",
		        "error_code":"1"
		    }
        }
    },
    {
        path: 'poweron',
        data: {
            "errorCode": 0,
		    "params": {
		        "work_status": "1",
		        "time_running_hr": "3",
		        "time_running_min": "55",
		        "time_reserve_hr":"4",
		        "time_reserve_min":"45",
		        "error_code":"1",
		        "function_no":"3"
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

