/**
 * Created by sf
 * 2018/12/01
 */

const bridgeModule = weex.requireModule('bridgeModule');
const objectAssign = require('object-assign');
import nativeService from '@/common/services/nativeService';


let commonMixin = {
    data(){
        return {
        };
    },
    methods:{

        _voiceAuth(key, callback) {
            let name = ''
            // 1./mj/user/auth/device: 用户授权给指定设备
            // 2./mj/user/cancel/auth/device: 用户取消设备授权
            // 3./mj/user/check/device/auth: 检查设备是否已经授权
            switch (key) {
                case 1:
                    name = '/mj/user/auth/device'
                    break;
                case 2:
                    name = '/mj/user/cancel/auth/device'
                    break;
                case 3:
                    name = '/mj/user/check/device/auth'
                    break;
                default:
                    name = ''
                    break;
            }
            if(name == '') {
                return false
            }
            var timestamp = Date.parse(new Date())
            let params = {
                data: {
                    timestamp: timestamp,
                    data: {
                        deviceId: this.userInfo.applianceId // 设备id
                    }
                }
            }
            nativeService.sendCentralCloundRequest(name, params).then(rst => { // 美居demo中nativeService提供的调用发送中台网络请求的方法
                callback(rst)
            }).catch(err => {
                console.error(err)
            })
        },

        async aa(deviceId, uid) {

            try {
                nativeService.alert('in');
                //查询是否需要进入授权
                let url = 'appliance/authorize/check';
                let params = {
                    uid,
                    applianceCode: deviceId,
                    reqId: 1
                }
                nativeService.alert(params);
                return;

            }catch (e) {
                nativeService.alert(JSON.stringify(e));
            }
            // try {
            //     let result = await nativeService.sendMCloudRequest(url, params)
            //     nativeService.alert(result);
            // } catch (error) {
            //     nativeService.alert(JSON.stringify(error));
            // }
        },

        async voiceAuthCheck() {
            //查询是否需要进入授权
            let url = 'appliance/authorize/check';
            let params = {
                uid: this.uid,
                applianceCode: this.userInfo.applianceId,
                reqId: 1
            }
            try {
                let result = await nativeService.sendMCloudRequest(url, params)
                if (result.data && result.data.authorize == 1) { // 需要授权
                    let url = result.data.url
                    try {
                        let voiceAuthResult = await this.getVoiceAuth()
                        let data = JSON.parse(voiceAuthResult.returnData).data;


                        if (data.status == 1) { // 未授权
                            nativeService.confirm('允许破壁机控制其他美的智能设备', async (result) => {
                                if (result == '允许') {
                                    let rst = this.voiceAuth(1, url)
                                }
                            }, '允许', '不允许')
                        } else {
                            console.log('已授权')
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        getVoiceAuth() {
            /*
            返回示例
              {
              "code": "0",
              "msg": "成功",
              "data": {
                "status": "0",
                "desc": "已授权",
              }
            }*/
            //查询设备授权状态
            let params = {
                type: '0xAI',
                queryStrings: {
                    'serviceUrl': '/v1/user/token/get'
                },
                transmitData: {
                    deviceId: this.userInfo.applianceId,
                    userId: this.userInfo.userId
                }
            };
            return nativeService.requestDataTransmit(params)
        },
        voiceAuth(key, url) {
            let name = ''
            // 1./mj/user/auth/device: 用户授权给指定设备
            // 2./mj/user/cancel/auth/device: 用户取消设备授权
            // 3./mj/user/check/device/auth: 检查设备是否已经授权
            switch (key) {
                case 1:
                    name = '/mj/user/auth/device'
                    break;
                case 2:
                    name = '/mj/user/cancel/auth/device'
                    break;
                case 3:
                    name = '/mj/user/check/device/auth'
                    break;
                default:
                    name = ''
                    break;
            }


            if(name == '') {
                return false
            }


            var timestamp = Date.parse(new Date())


            let params = {
                data: {
                    timestamp: timestamp,
                    data: {
                        deviceId: this.userInfo.applianceId, // 设备id
                        aiUpdateTokenUrl: url || null
                    }
                }
            }


            return nativeService.sendCentralCloundRequest(name, params)
        },

    }
};

export default commonMixin