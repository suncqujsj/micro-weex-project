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
		        "rinse_count": 2, 
			    "rinse_level": 0, 
			    "lock": "off", 
			    "mode": "normal", 
			    "program": "invalid", 
			    "power": "on", 
			    "intelligent_wash": "on", 
			    "wash_strength": 2, 
			    "error_code": 0, 
			    "wash_time": 15, 
			    "temperature": 0, 
			    "version": 7, 
			    "dehydration_time": 7, 
			    "remain_time": 55, 
			    "running_status": "work", 
			    "dehydration_speed": 3, 
			    "wash_level": 0
		    }
        }
    },
    {
        path: 'start',
        data: {
            "errorCode": 0,
		    "params": {
		        "rinse_count": 2, 
			    "rinse_level": 0, 
			    "lock": "off", 
			    "mode": "normal", 
			    "program": "standard", 
			    "power": "on", 
			    "intelligent_wash": "off", 
			    "wash_strength": 2, 
			    "error_code": 0, 
			    "wash_time": 15, 
			    "temperature": 0, 
			    "version": 7, 
			    "dehydration_time": 7, 
			    "remain_time": 55, 
			    "running_status": "work", 
			    "dehydration_speed": 3, 
			    "wash_level": 0
		    }
        }
    },
    {
        path: 'pause',
        data: {
            "errorCode": 0,
		    "params": {
		        "rinse_count": 2, 
			    "rinse_level": 0, 
			    "lock": "off", 
			    "mode": "normal", 
			    "program": "standard", 
			    "power": "on", 
			    "intelligent_wash": "off", 
			    "wash_strength": 2, 
			    "error_code": 0, 
			    "wash_time": 15, 
			    "temperature": 0, 
			    "version": 7, 
			    "dehydration_time": 7, 
			    "remain_time": 55, 
			    "running_status": "standby", 
			    "dehydration_speed": 3, 
			    "wash_level": 0
		    }
        }
    },
    {
        path: 'poweroff',
        data: {
            "errorCode": 0,
		    "params": {
		        "rinse_count": 2, 
			    "rinse_level": 0, 
			    "lock": "off", 
			    "mode": "normal", 
			    "program": "standard", 
			    "power": "off", 
			    "intelligent_wash": "off", 
			    "wash_strength": 2, 
			    "error_code": 0, 
			    "wash_time": 15, 
			    "temperature": 0, 
			    "version": 7, 
			    "dehydration_time": 7, 
			    "remain_time": 55, 
			    "running_status": "work", 
			    "dehydration_speed": 3, 
			    "wash_level": 0
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
		        "rinse_count": 2, 
			    "rinse_level": 0, 
			    "lock": "off", 
			    "mode": "normal", 
			    "program": "standard", 
			    "power": "on", 
			    "intelligent_wash": "off", 
			    "wash_strength": 2, 
			    "error_code": 0, 
			    "wash_time": 15, 
			    "temperature": 0, 
			    "version": 7, 
			    "dehydration_time": 7, 
			    "remain_time": 55, 
			    "running_status": "work", 
			    "dehydration_speed": 3, 
			    "wash_level": 0
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

