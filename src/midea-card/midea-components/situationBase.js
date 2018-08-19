
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
        deviceId: '',
        situationList: [],
        isSituationLoaded: false
    }),
    computed: {
        pageHeight() {
            return 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight
        },
        isipx: function () {
            return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6');
        },
        isImmersion: function () {
            let result = true
            if (weex.config.env.isImmersion == "false") {
                result = false
            }
            return result
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
        getSituationListService() {
            return new Promise((resolve, reject) => {
                nativeService.getUserInfo().then((data) => {
                    this.uid = data.uid
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
                    nativeService.sendCentralCloundRequest("/v1/situation/list", param).then((resp) => {
                        resolve(resp)
                    }).catch((error) => {
                        reject(error)
                    })
                })
            })
        },
        addSituationService(moduleCode, enable, situation) {
            return new Promise((resolve, reject) => {
                nativeService.getUserInfo().then((data) => {
                    this.uid = data.uid
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
                    nativeService.sendCentralCloundRequest("/v1/situation/add", param).then((resp) => {
                        resolve(resp)
                    }).catch((error) => {
                        reject(error)
                    })
                })
            })
        },
        updateSituationEnableService(moduleCode, enable) {
            return new Promise((resolve, reject) => {
                nativeService.getUserInfo().then((data) => {
                    this.uid = data.uid
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
                    nativeService.sendCentralCloundRequest("/v1/situation/update", param).then((resp) => {
                        resolve(resp)
                    }).catch((error) => {
                        reject(error)
                    })
                })
            })
        },
        updateSituationService(situation, enable = null) {
            return new Promise((resolve, reject) => {
                nativeService.getUserInfo().then((data) => {
                    this.uid = data.uid
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
                    nativeService.sendCentralCloundRequest("/v1/situation/update", param).then((resp) => {
                        resolve(resp)
                    }).catch((error) => {
                        reject(error)
                    })
                })
            })
        },
        submitSituationService(situation) {
            return new Promise((resolve, reject) => {
                nativeService.getUserInfo().then((data) => {
                    this.uid = data.uid
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
                    nativeService.sendCentralCloundRequest(url, param).then((resp) => {
                        resolve(resp)
                    }).catch((error) => {
                        reject(error)
                    })
                })
            })
        },
        executeSituationService(situation) {
            return new Promise((resolve, reject) => {
                nativeService.getUserInfo().then((data) => {
                    this.uid = data.uid
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
                    nativeService.sendCentralCloundRequest("/v1/situation/execute", param).then((resp) => {
                        resolve(resp)
                    }).catch((error) => {
                        reject(error)
                    })
                })
            })
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
        },

        handlePageData(data) {
            //处理页面传递的信息
            if (data.deviceId == this.deviceId) {
                if (data.key == "situation") {
                    this.getSituationList()
                }
            }
        },
        goToSituation(path, situation) {
            if (this.isSituationLoaded) {
                nativeService.setItem("CARD_STORAGE_SITUATION", Object.assign(situation, { deviceId: this.deviceId }), () => {
                    nativeService.goTo(path)
                })
            } else {
                this.getSituationList()
            }
        },
        getSituationList() {
            this.getSituationListService().then((resp) => {
                if (resp.code == 10 && resp.data) {
                    this.situationList = resp.data.list || []
                    this.isSituationLoaded = true
                } else {
                    throw resp
                }
            }).catch((error) => {
                nativeService.toast(this.getErrorMessage(error))
            })
        },
        switchEnable(event, situation) {
            if (this.isSituationLoaded) {
                let enable = event.value ? "1" : "0"
                if (situation.isCreated) {
                    //更新
                    let index = this.situationList.findIndex((item) => (item.moduleCode == situation.moduleCode))
                    this.updateSituationEnableService(situation.moduleCode, enable).then((resp) => {
                        if (resp.code == 0) {
                            situation.enable = enable
                            this.$set(this.situationList, index, situation)
                        } else {
                            throw resp
                        }
                    }).catch((error) => {
                        this.$set(this.situationList, index, situation)
                        nativeService.toast(this.getErrorMessage(error))
                    })
                } else {
                    //新增
                    this.addSituationService(situation.moduleCode, enable, situation).then((resp) => {
                        if (resp.code == 0) {
                            situation.enable = enable
                            this.situationList.push(situation)
                        } else {
                            throw resp
                        }
                    }).catch((error) => {
                        nativeService.toast(this.getErrorMessage(error))
                    })
                }
            } else {
                this.getSituationList()
            }
        }
    },
    created() {
        appPageDataChannel.onmessage = (event) => {
            this.handlePageData(event.data || {})
        }

    }
};