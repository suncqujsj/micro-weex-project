/**
 * Created by sf
 * 2019/1/11
 *
 * 语音家电模组OTA
 */

const bridgeModule = weex.requireModule('bridgeModule');
import nativeService from "@/common/services/nativeService"

let voiceOtaMixin = {
    data:{
        deviceId: null,
        hasNewVer:false
    },
    methods: {
        /**
         * 初始化流程
         * 1.固件更新状态查询
         * 2.固件版本检查
         * 3.如果是更新中，需要轮询1的接口
         */
        async init(){
            await this.setDeviceId();

        },

        /**
         * 固件升级是否完成查询
         *
         {
            "code": "0",
            "msg": "成功",
            "data":{
                "status": "upgrading"
                }
            }
         * 当status=upgrading，增加verNo和verDesc字段。 和CRC仇伟业约定
         */
        getUpgradeState(){
            let params = {
                type: '0xAI',
                queryStrings: {
                    'serviceUrl': "/v1/device/ota/status"
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
         * 固件更新检查
         *
         {
            "code": "0",
            "msg": "成功",
            "data":{
                "hasNewVer": true,
                "currFmVer": {
                    "verNo" : "xxx.yyy.zzz"
                },
                "nextFmVer": {
                    "verId" : 1,
                    "verNo" : "xxx.yyy.zzz",
                    "verDesc": "测试版本2"
                    }
                }
            }
         */
        checkUpgrade(){
            let params = {
                type: '0xAI',
                queryStrings: {
                    'serviceUrl': "/v1/device/ota/check"
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
         * 告诉设备升级固件
         *
         {
            "code": "0",
            "msg": "成功",
            "data":{
                }
            }
         */
        UpgradeFireware(){
            let params = {
                type: '0xAI',
                queryStrings: {
                    'serviceUrl': "/v1/device/ota/upgrade"
                },
                transmitData: {
                    deviceId: this.deviceId,
                    fmVerId: this.verId
                }
            };
            // nativeService.alert(params);
            // return;
            return nativeService.requestDataTransmit(params)
        },

        setData(hasNewVer, data){
            this.hasNewVer = hasNewVer;
            this.verNo = data.verNo;
            this.verDesc = data.verDesc;
        }
    }
};

export default voiceOtaMixin;