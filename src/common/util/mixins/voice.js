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
            url:null,
            iotAppId:null
        };
    },
    created(){
    },
    methods:{

        /**
         *  语音开关状态初始化
         */
        async initVoiceWithParams(isIndexPage=false){
            await this.setDeviceId();
            await this.setUid();
            // nativeService.alert(this.uid);
            this.initVoiceAuth(isIndexPage);
        },

        /**
         * 语音开关、授初始状态
         * */
        async initVoice(){
            await this.initVoiceWithParams();
            this.initVoiceSwitch();

        },

        /**
         * 语音开关初始化
         */
        async initVoiceSwitch(){
            let microphoneState = await this.getMicrophoneState();
            let data = JSON.parse(microphoneState.returnData).data;
            this.list[this.controlIndex].value = data.micStatus === 'On'; // 注意O是大写
            let t = setInterval(()=>{
                this.hideState();
                this.pageViewStatistics();
                clearInterval(t);
                this.loading = false;
            }, 1000);
        },

        /**
         * 语音开关点击事件
         */
        onControlSwitchChange(event){
            let index = this.controlIndex;
            let value = this.getSwitchValue(index);
            nativeService.showLoading();
            this.microphoneSetting(!value).then((resp)=>{
                // nativeService.alert(resp);
                if(parseInt(JSON.parse(resp.returnData).code) === 0) {
                    this.setSwitchValue(index, !value);
                    nativeService.hideLoading();
                    this.statisticsUpload({subAction:'voice_microphone_switch', action_result:!value?1:0})
                }
            });

        },

        /**
         * 获取开关状态
         */
        getSwitchValue(index){
            return this.list[index].value;
        },

        /**
         * 设置开关状态
         */
        setSwitchValue(index, value){
            this.list[index].value = value;
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
            let index = this.authIndex;
            let value = this.getSwitchValue(index);
            let subAction = 'voice_auth_switch';
            // nativeService.toast(value);
            if(value) {
                nativeService.showLoading();
                this.voiceAuthCancel().then((resp)=>{
                    // nativeService.alert(resp);
                    if(parseInt(JSON.parse(resp.returnData).code) === 0) {
                        this.setSwitchValue(index, !value);
                        nativeService.hideLoading();
                        this.statisticsUpload({subAction, action_result:0})
                    }

                });
                return;
            }

            this.voiceAuth().then((resp)=>{
                // nativeService.alert(resp);
                if(resp.code === 0) {
                    this.setSwitchValue(index, !value);
                    this.statisticsUpload({subAction, action_result:1})
                }
            });

        },

        /**
         * 语音授权状态初始化
         * 1.查询是否需要进入授权
         * 2.查询设备语音授权状态
         */
        async initVoiceAuth(isIndexPage) { // 判断是否是插件首页
            let deviceId = this.deviceId;
            let uid = this.uid;

            let url = 'appliance/authorize/check';
            let stamp = Date.parse(new Date());
            let params = {
                uid,
                applianceCode: deviceId,
                stamp,
                reqId: 2
            };
            // nativeService.alert(params);
            // return;
            try {
                let result = await nativeService.sendMCloudRequest(url, params, {isValidate:false});
                // nativeService.alert(result);
                if (result.data && result.data.authorize == 1) {

                    this.url = result.data.url;
                    this.iotAppId = result.data.iotAppId;
                    let voiceAuthStateResult = await  this.getVoiceAuth(deviceId, uid);
                    let data = JSON.parse(voiceAuthStateResult.returnData).data;
                    // nativeService.toast('授权状态status：' + data.status);

                    // nativeService.alert(data);
                    if(!data || !data.status) {
                        return;
                    }

                    if(isIndexPage) {
                        this.voiceAuthConfirm(data.status);
                        return;
                    }

                    this.setSwitchValue(this.authIndex, data.status === '0');
                    this.list[this.authIndex].hide = false;
                }
            } catch (error) {
                nativeService.alert(error);
            }
        },

        /**
         *  用户在配网完成的授权页面关闭了app情况下，插件首页的弹窗提示
         */
        voiceAuthConfirm(status){
            // nativeService.alert(status)
            if (status == 1) {
                nativeService.confirm('允许后，您可以通过"烤箱"的语音功能控制家庭的其他美的智能设备', async (result) => {
                    this.voiceAuth(result == '允许' ? 1 : 0);
                    // this.voiceAuth(result == '允许' ? 1 : 0).then((resp)=>{
                    //     nativeService.alert(resp);
                    // });
                }, '允许', '不允许')
            } else {
                console.log('已授权')
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
        voiceAuth(userOption=1) {
            let url = '/mj/user/auth/device';

            var timestamp = Date.parse(new Date())


            let params = {
                data: {
                    timestamp: timestamp,
                    data: {
                        deviceId: this.deviceId, // 设备id
                        aiUpdateTokenUrl: this.url,
                        iotAppId: this.iotAppId,
                        userOption //
                    }
                }
            }
            // nativeService.alert(params)


            return nativeService.sendCentralCloundRequest(url, params)
        },

        /**
         * 取消授权
         */
        voiceAuthCancel(isDel=0){
            let params = {
                type: '0xAI',
                queryStrings: {
                    'serviceUrl': '/v1/user/token/cancel'
                },
                transmitData: {
                    deviceId: this.deviceId,
                    isDel
                }
            };
            // nativeService.alert(params);
            // return;
            return nativeService.requestDataTransmit(params)
        }
    }

};

export default commonMixin