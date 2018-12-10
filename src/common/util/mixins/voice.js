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
            deviceId:null,
            uid:null,
            url:null
        };
    },
    created(){
        let context = this;
        nativeService.getDeviceInfo().then(function(data){
            context.deviceId = data.result.deviceId;
            nativeService.getUserInfo().then((resp) => {
                context.uid = resp.uid;
                context.voiceInitial(data.result.deviceId, resp.uid, context.index);

            }).catch((error) => {
                // nativeService.alert(JSON.stringify(error));
            });

        });
    },
    methods:{

        onchange(event) {
            nativeService.alert(event.value);
            // if(event.value) {
            //     this.voiceAuth().then((data)=>{
            //         nativeService.alert(data);
            //     });
            // } else {
            //     this.voiceAuthCancel().then((data)=>{
            //         nativeService.alert(data);
            //     });
            // }

        },

        async voiceInitial(deviceId, uid, index=0) {

            //查询是否需要进入授权
            let url = 'appliance/authorize/check';
            let stamp = Date.parse(new Date());
            let params = {
                uid,
                applianceCode: deviceId,
                stamp,
                reqId: 2
            }
            // nativeService.alert(params);
            // return;
            try {
                let result = await nativeService.sendMCloudRequest(url, params, {isValidate:false})
                // nativeService.alert(result);
                if (result.data && result.data.authorize == 1) {
                    this.url = result.data.url;
                    let voiceAuthStateResult = await  this.getVoiceAuth(deviceId, uid);
                    // nativeService.alert(voiceAuthStateResult);
                    let data = JSON.parse(voiceAuthStateResult.returnData).data;
                    if(data) {
                        data.status == 1 ? this.list[index].value = false : this.list[index].value = true;
                    }
                    this.list[index].hide = false;
                }
            } catch (error) {
                nativeService.alert(error);
            }
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
        getVoiceAuth(deviceId, userId) {
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
                type: '0xAI', //
                queryStrings: {
                    'serviceUrl': '/v1/user/token/get'
                },
                transmitData: {
                    deviceId,
                    userId
                }
            };
            // nativeService.alert(params);
            // return;
            return nativeService.requestDataTransmit(params)
        },
        voiceAuth() {
            let url = '/mj/user/auth/device';

            var timestamp = Date.parse(new Date())


            let params = {
                data: {
                    timestamp: timestamp,
                    data: {
                        deviceId: this.deviceId, // 设备id
                        aiUpdateTokenUrl: this.url
                    }
                }
            }


            return nativeService.sendCentralCloundRequest(url, params)
        },

        voiceAuthCancel(){
            let params = {
                type: '0xAI', //
                queryStrings: {
                    'serviceUrl': '/v1/user/token/cancel'
                },
                transmitData: {
                    deviceId: this.deviceId
                }
            };
            // nativeService.alert(params);
            // return;
            return nativeService.requestDataTransmit(params)
        },

        _voiceAuth(key, url) {
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