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
                sub_action: 'pageview',
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
                nativeService.alert(resData);
            }, function (error) {
                //失败的回调
                nativeService.alert('upload error');
            });
        },

        voiceAuth(key, callback) {
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

    }
};

export default commonMixin