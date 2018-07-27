
import nativeService from '@/common/services/nativeService.js'
const appPageDataChannel = new BroadcastChannel('appPageData')

export default {
    components: {
    },
    data: () => ({
        title: '',
        isIos: weex.config.env.platform == 'iOS' ? true : false,
        isMixinCreated: true,
        isNavigating: false,
        appPageDataChannel: appPageDataChannel,
        CARD_STORAGE_KEYS: {
            situation: 'CARD_STORAGE_SITUATION'
        },
        uid: '',
        deviceId: ''
    }),
    computed: {
        pageHeight() {
            return 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight
        },
        isipx: function () {
            return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6');
        }
    },
    methods: {
        viewappear() {
        },
        viewdisappear() {
        },
        getParameterByName: function (name) {
            let url = this.$getConfig().bundleUrl
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        back(options = {}) {
            //返回上一页
            nativeService.goBack(options);
        },
        exit() {
            nativeService.backToNative()
        },
        handlePageData(data) {
            //处理页面传递的信息
        },
        getSituationListService() {
            let param = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                data: {
                    reqId: nativeService.generateUUID(),
                    uid: this.uid,
                    applianceCode: this.deviceId || "",
                    stamp: Math.round(new Date().getTime() / 1000) //时间戳
                }
            }
            return nativeService.sendCentralCloundRequest("/v1/situation/list", param)
        },
        addSituationService(moduleCode, enable, situation) {
            let param = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                data: {
                    reqId: nativeService.generateUUID(),
                    uid: this.uid,
                    applianceCode: this.deviceId || "",
                    stamp: Math.round(new Date().getTime() / 1000), //时间戳
                    moduleCode: moduleCode,
                    enable: enable,
                    props: situation.props
                }
            }
            return nativeService.sendCentralCloundRequest("/v1/situation/add", param)
        },
        updateSituationEnableService(moduleCode, enable) {
            let param = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                data: {
                    reqId: nativeService.generateUUID(),
                    uid: this.uid,
                    applianceCode: this.deviceId || "",
                    stamp: Math.round(new Date().getTime() / 1000), //时间戳
                    moduleCode: moduleCode,
                    enable: enable
                }
            }
            return nativeService.sendCentralCloundRequest("/v1/situation/update", param)
        },
        updateSituationService(situation, enable = null) {
            let param = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                data: {
                    reqId: nativeService.generateUUID(),
                    uid: this.uid,
                    applianceCode: this.deviceId || "",
                    stamp: Math.round(new Date().getTime() / 1000), //时间戳
                    moduleCode: situation.moduleCode,
                    props: situation.props
                }
            }
            if (enable != null) {
                param.data.enable = enable
            }
            return nativeService.sendCentralCloundRequest("/v1/situation/update", param)
        },
        submitSituationService(situation) {
            let param = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                data: {
                    reqId: nativeService.generateUUID(),
                    uid: this.uid,
                    applianceCode: this.deviceId || "",
                    stamp: Math.round(new Date().getTime() / 1000), //时间戳
                    moduleCode: situation.moduleCode,
                    enable: situation.enable,
                    props: situation.props
                }
            }
            let url = "/v1/situation/add"
            if (situation.isCreated) {
                url = "/v1/situation/update"
            }
            return nativeService.sendCentralCloundRequest(url, param)
        },
        executeSituationService(situation) {
            let param = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                data: {
                    reqId: nativeService.generateUUID(),
                    uid: this.uid,
                    applianceCode: this.deviceId || "",
                    stamp: Math.round(new Date().getTime() / 1000), //时间戳
                    moduleCode: situation.moduleCode
                }
            }
            return nativeService.sendCentralCloundRequest("/v1/situation/execute", param)
        },
        getErrorMessage(error) {
            let msg = "请求失败，请稍后重试。", errorCode
            if (error) {
                errorCode = error.code
                let unNormalErrorCode = ['']
                if (unNormalErrorCode.indexOf(errorCode) < 0) {
                    //若是正常的错误码，则显示错误信息
                    msg = error.msg || "请求失败，请稍后重试。"
                }
                if (errorCode) {
                    msg += "(" + errorCode + ")"
                }
            }
            return msg
        }
    },
    created() {
        appPageDataChannel.onmessage = (event) => {
            this.handlePageData(event.data || {})
        }

    }
};