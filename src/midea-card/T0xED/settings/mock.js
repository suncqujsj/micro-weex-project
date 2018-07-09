import Mock, { mock } from 'mockjs';

export const all = [
    {
        path: 'deviceinfo',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "on",
		        "heat": "off",
		        "heat_status":"on",
		        "cool":"off",
		        "cool_status":"off",
		        "heat_temperature":"40"
		    }
        }
    },
    {
        path: 'poweroff',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "off",
		        "heat": "on",
		        "heat_status":"on",
		        "cool":"off",
		        "cool_status":"off",
		        "heat_temperature":"40"
		    }
        }
    },
    {
        path: 'poweron',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "on",
		        "heat": "off",
		        "heat_status":"off",
		        "cool":"on",
		        "cool_status":"on",
		        "cool_temperature":"10"
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

