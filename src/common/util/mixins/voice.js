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
                context.voiceInitial(data.result.deviceId, resp.uid, context.authIndex);

            }).catch((error) => {
                nativeService.toast(JSON.stringify(error));
            });

        });
    },
    methods:{

        /**
         * 语音开关点击事件
         */
        onControlSwitchChange(event){

        },

        /**
         * 查询设备麦克风打开状态
         */

        getMicrophoneState(){
            let params = {
                type: '0xAI',
                queryStrings: {
                    'serviceUrl': "/v1/device/media/status"
                },
                transmitData: {
                    deviceId: this.deviceId
                }
            };
            // nativeService.alert(params);
            // return;
            return nativeService.requestDataTransmit(params)
        },

        /**
         * 禁麦或打开麦克风
         * */
        microphoneSetting(state){
            let params = {
                type: '0xAI',
                queryStrings: {
                    'serviceUrl': "/v1/device/mic"
                },
                transmitData: {
                    deviceId: this.deviceId,
                    mic: state ? "1": "0"
                }
            };
            // nativeService.alert(params);
            // return;
            return nativeService.requestDataTransmit(params)
        },

        /**
         * 语音授权开关点击事件
         */
        onAuthSwitchChange(event) {
            nativeService.alert(this.authIndex);
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

        /**
         * 语音授权状态初始化
         * 1.查询是否需要进入授权
         * 2.查询设备语音授权状态
         */
        async voiceInitial(deviceId, uid, authIndex=0) {

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
                        data.status == 1 ? this.list[authIndex].value = false : this.list[authIndex].value = true;
                    }
                    this.list[authIndex].hide = false;
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

        /**
         * 查询设备语音授权状态
         * */
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

        /**
         * 用户授权给指定设备
         */
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

        /**
         * 取消授权
         */
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
        }

    }
};

export default commonMixin