/**
 * Created by sf
 * 2018/10/30
 */

const bridgeModule = weex.requireModule('bridgeModule');
const objectAssign = require('object-assign');
import nativeService from '@/common/services/nativeService';


let commonMixin = {
    data(){
        return {
            wrapHeight: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750,
        };
    },
    methods:{
        dList(list, cols){
            var length=list.length;
            var mod=list.length%cols;
            if(mod!=0){
                var appendLen= cols-mod;
                for(var i=0;i<appendLen;i++){
                    list.push('');
                }
            }
            var resultList=[];
            var obj={};
            var index=0;
            // debugger;
            for(var j=0;j<list.length;j++){
                var item=list[j];
                // item.index=index;
                index++;
                if(j%cols==0){
                    obj.items=[];
                }
                obj.items.push(item);
                if(j%cols==cols-1){
                    resultList.push(Object.assign({}, obj));
                }
            }
            return resultList;
        },

        statisticsUpload: function(data={}){

            // nativeService.alert(data);
            // return;
            let param = {
                operation: 'burialPoint',
                action_type: 'plugin',
                page_name: 'homePage',
                sub_action: 'page_view',
                widget_name: 'MSO_T0xB2_xxxxxxxx', // constant
                widget_version: '1.0.0', // constant
                extra1: { //浏览页面，如不需设备信息，可不传该字段 ‘key’:’value’,
                     }
            };

            param = objectAssign(param, data);

            // nativeService.alert(param)
            // return;

            bridgeModule.commandInterface(JSON.stringify(param), function
                (resData) {
                //成功的回调
                // nativeService.alert(resData);
            }, function (error) {
                //失败的回调
                // nativeService.alert('upload error');
            });
        },

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