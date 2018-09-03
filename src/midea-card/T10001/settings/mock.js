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
		        "mode": "cool",
		        "wind_speed":"high",
		        "humidity": "40",
		        "cur_humidity": "60"
		    }
        }
    },
    {
        path: 'poweroff',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "off",
		        "mode": "cool",
		        "wind_speed":"high",
		        "humidity": "50",
		        "cur_humidity": "62"
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
		        "power": "on",
		        "mode": "normal",
		        "gear":"10"
		    }
        }
    },
    {
        path: 'poweron',
        data: {
            "errorCode": 0,
		    "params": {
		        "power": "on",
		        "mode": "cool",
		        "wind_speed":"high",
		        "humidity": "43",
		        "cur_humidity": "62"
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
    },
    {path:'queryTXList',data:[{
        'applianceType': '0xED',
        'typeName': '简爱系列',
        'name': '净水机0001',
        'modelNumber': '266',
        'sn': '6bdbd1517f0e37cf184a2ca01f43b93a1b390f388875f6b7269e855693233436044786454de37bb10ebecdf2a28ff2ff',
        'applianceCode': '1099511822595',
        'onlineStatus': 'online'
    },
    {
        'applianceType': '0xED',
        'typeName': '简爱系列',
        'name': '净水机0001',
        'modelNumber': '265',
        'sn': '6bdbd1517f0e37cf184a2ca01f43b93a1b390f388875f6b7269e855693233436044786454de37bb10ebecdf2a28ff2ff',
        'applianceCode': '1099511555555',
        'onlineStatus': 'offline'
    },
    {
        'applianceType': '0xE2',
        'typeName': '电热水器',
        'name': '',
        'modelNumber': '60',
        'sn': '',
        'applianceCode': '',
        'onlineStatus': 'unmatch'
    },
    {
        'applianceType': '0xE3',
        'typeName': '燃气热水器',
        'name': '',
        'modelNumber': '49',
        'sn': '',
        'applianceCode': '',
        'onlineStatus': 'unmatch'
    }]
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

