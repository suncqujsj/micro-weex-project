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
         *
         * OTA升级的所有状态
         * 1.模块没有上线 接口1 code 4007
         * 2.模块上电check
         * 3.模块静默下载固件 1 status downloading
         * 4.模块下载固件成功 1 status willUpgrade
         * 5.模块执行升级 1 status upgrading
         * 6.模块升级完成
         * */
        async init(isOtaPage=false){
            await this.setDeviceId();
            let upgradeState = await this.getUpgradeState();
            let returnDataJson = JSON.parse(upgradeState.returnData);
            if(returnDataJson.code === '4007') { // 语音模块没有上报过状态
                nativeService.toast(returnDataJson.msg);
                return;
            }

            let data = returnDataJson.data;
            if(data.status === 'upgrading') { // 发现固件在升级中
                this.setData(true, data);
                if(isOtaPage) {
                    this.markButtonPressedState();
                    this.showUpgradingState();
                    this.fetchUpgradeState();
                    return;
                }

            }

            let updateVersion = await this.checkUpgradeVersion();
            let versionData = JSON.parse(updateVersion.returnData).data;
            this.setData(versionData.hasNewVer, versionData.nextFmVer);

            if(versionData.hasNewVer && isOtaPage) { //有可升级版本则更新版本号
                this.verId = data.nextFmVer.verId;
            }
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
        checkUpgradeVersion(){
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
        },

        showUpgradingState(){
            this.showState('更新中...');
        },
    }
};

export default voiceOtaMixin;