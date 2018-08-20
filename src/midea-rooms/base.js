const appDataTemplate = {

}

const bundleUrl = weex.config.bundleUrl
const match = /.*\/(T0x.*)\//g.exec(bundleUrl)
const plugin_name = match ? match[1] : 'common' //appConfig.plugin_name
const srcFileName = bundleUrl.substring(bundleUrl.lastIndexOf('/') + 1, bundleUrl.lastIndexOf('.js'))

const globalEvent = weex.requireModule('globalEvent')
const storage = weex.requireModule('storage')
const stream = weex.requireModule('stream');

import nativeService from '@/common/services/nativeService'
import debugUtil from '@/common/util/debugUtil'
import mideaHeader from '@/midea-component/header.vue'

const appDataChannel = new BroadcastChannel(plugin_name + 'appData')
const pushDataChannel = new BroadcastChannel(plugin_name + 'pushData')
const bridgeModule = weex.requireModule('bridgeModule');

import { url, codeDesc } from './config/config.js'

export default {
    components: {
        mideaHeader
    },
    data: () => ({
        title: '',
        isIos: weex.config.env.platform == 'iOS' ? true : false,
        srcFileName: srcFileName,
        pluginVersion: '1.0.0',
        pluginName: plugin_name,
        isMixinCreated: true,
        isNavigating: false,
        appDataKey: plugin_name + 'appData',
        appDataChannel: appDataChannel,
        pushKey: 'receiveMessage',
        pushDataChannel: pushDataChannel,
        appData: appDataTemplate,
        webRequestStatus: false//在网络请求没有回来时，阻止下一次请求，防止多次请求
    }),
    computed: {
        pageHeight() {
            return 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight
        },
        isipx: function () {//是否是iphoneX
            return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6')
        },
        platform() {
            return weex.config.env.platform.toLowerCase()
        },
        isImmersion() {
            let result = true
            if (weex.config.env.isImmersion == "false") {
                result = false
            }
            return result
        },
    },
    methods: {
        viewappear() {
        },
        viewdisappear() {
            debugUtil.resetDebugLog()
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
        goTo(pageName, options = {}, params) {
            if (!this.isNavigating) {
                this.isNavigating = true
                // 离开时同步全局应用数据
                nativeService.setItem(this.appDataKey, this.appData, () => {
                    //跳转页面
                    var path = pageName + ".js";
                    if (params) {
                        path += '?' + Object.keys(params).map(k =>
                            encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
                        ).join('&')
                    }
                    options.viewTag = pageName
                    nativeService.goTo(path, options);
                    setTimeout(() => {
                        this.isNavigating = false
                    }, 500);
                })
            }
         },
        back() {
            //返回上一页
            nativeService.goBack();
        },
        exit() {
            nativeService.backToNative()
        },
        getAppData() {
            //获取全局应用数据
            return new Promise((resolve, reject) => {
                nativeService.getItem(this.appDataKey, (resp) => {
                    let data
                    if (resp.result == 'success') {
                        data = resp.data
                        if (typeof data == 'string') {
                            try {
                                data = JSON.parse(data)
                            } catch (error) { }
                        }
                    }
                    if (!data) {
                        data = this.appData
                    }
                    resolve(data)
                })
            })
        },
        updateAppData(data) {
            //更新全局应用数据
            this.appData = Object.assign(this.appData, data)
            appDataChannel.postMessage(this.appData)
        },
        resetAppData() {
            //重置全局应用数据
            return new Promise((resolve, reject) => {
                nativeService.removeItem(this.appDataKey, (resp) => {
                    this.appData = JSON.parse(JSON.stringify(appDataTemplate))
                    appDataChannel.postMessage(this.appData)
                    resolve()
                })
            })
        },
        handleNotification(data) {
            //处理推送消息
            debugUtil.debugLog(srcFileName, this.pushKey, data)
        },
        uuid() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        },
        generateReqBody(reqBody) { //生成weex stream 请求的reqBody，String格式
            reqBody = Object.assign({
                reqId: this.uuid(),
                appId: '1000',
                stamp: +new Date()
            }, reqBody)

            return JSON.stringify(reqBody)
        },
        webRequest(reqUrl, reqParams, isShowLoading = true) {
            return new Promise((resolve, reject) => {
                /*     let reqBody = this.generateReqBody(reqParams)
                    //     stream.fetch({
                    //         method: 'post',
                    //         url: reqUrl,
                    //         mode: 'cors',
                    //         headers: {
                    //             'Content-Type': 'application/json;charset=utf-8',
                    //         },
                    //         type: 'json',
                    //         body: reqBody
                    //     }, (rtnData) => {
                    //         if (rtnData.ok) {
                    //             resolve(rtnData.data)
                    //         } else {
                    //             reject(rtnData)
                    //         }
                    //     })
                */
                this.webRequestStatus = true
                let requestOption = {
                    method: "POST",
                    isShowLoading: isShowLoading
                }
                let requestParam = {
                    method: requestOption.method,
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    data: this.generateReqBody(reqParams)
                }
                nativeService.isDummy = false
                nativeService.sendCentralCloundRequest(reqUrl, requestParam, requestOption).then((resp) => {
                    resolve(resp)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        reload() {
            bridgeModule.reload({}, result => {}, err => {})
        },
        checkLogin(){
            return new Promise((resolve, reject)=>{
                nativeService.getLoginInfo().then((login)=>{
                    if (login.isLogin === '0') {
                        nativeService.jumpNativePage({
                            pageName: 'login'
                        })
                    }else{
                        nativeService.getUserInfo().then((user) => {
                            nativeService.getCurrentHomeInfo().then((home) => {
                                if (home.isLocal === '1') {
                                    nativeService.toast('本地设备暂不支持场景功能')
                                }else{
                                    if (home.homeId === '' || home.homeId == undefined) {
                                        nativeService.toast('获取家庭失败，请稍后重试')
                                    } else {
                                        let result = {
                                            uid: user.uid,
                                            homegroupId: home.homeId
                                        }
                                        resolve(result)
                                    }
                                }
                            }).catch((err) => {
                                nativeService.toast('获取家庭失败，请稍后重试')
                            })
                        })
                    }
                })
               
            })
        },
        getUserRole(uid, homegroupId) {
            return new Promise((resolve, reject) => {
                let reqUrl = url.home.getMember
                let reqParams = {
                    uid: uid,
                    homegroupId: homegroupId
                }
                this.webRequest(reqUrl, reqParams, false).then((rtnData) => {
                    if (rtnData.code == 0) {
                        let roleId = ''
                        for (var i in rtnData.data.list) {
                            if (rtnData.data.list[i].uid == uid) {
                                roleId = rtnData.data.list[i].roleId
                                break
                            }
                        }
                        resolve(roleId)
                    } else {
                        if (codeDesc.scene.hasOwnProperty(rtnData.code)) {
                            nativeService.toast(codeDesc.home[rtnData.code])
                        } else {
                            nativeService.toast(rtnData.msg)
                        }
                    }
                }).catch((err) => {
                    nativeService.toast(this.getErrorMessage(err))
                })
            })
        },
        getErrorMessage(error) {
            let msg = "请求失败，请稍后重试。",
                errorCode
            if (error) {
                errorCode = error.code || error.errorCode
                let unNormalErrorCode = ['error_system']
                if (unNormalErrorCode.indexOf(errorCode) < 0) {
                    //若是正常的错误码，则显示错误信息
                    msg = error.msg || error.errorMsg || error.returnMsg || error.errorMessage || "请求失败，请稍后重试。"
                }
                if (errorCode) {
                    msg += "(" + errorCode + ")"
                }
            }
            debugUtil.debugLog(error)
            return msg
        },
        getScrollActiveIndex(listArray, activeValue){
            let tmp = 0
            for (var i in listArray) {
                if (listArray[i].value === activeValue) {
                    tmp = i
                }
            }
            return tmp
        }
    },
    created() {
        console.log("created")
        //若isMixinCreated为false, 则不继承
        if (!this.isMixinCreated) return

        //Debug Log相关信息
        debugUtil.isEnableDebugInfo = false //开启关闭debuglog功能
        debugUtil.debugLog("@@@@@@ " + this.title + "(" + plugin_name + "-" + srcFileName + ") @@@@@@")

        //监听全局推送(native->weex)
        globalEvent.addEventListener(this.pushKey, (data) => {
            debugUtil.debugLog(this.title + "=>" + this.pushKey + ": " + data)
            //触发本页面处理事件
            this.handleNotification(data || {})
            //触发其他页面处理事件
            pushDataChannel.postMessage(data)
        });
        //监听全局推送通信渠道(weex->weex)
        pushDataChannel.onmessage = (event) => {
            this.handleNotification(event.data || {})
        }

        //监听全局应用数据通信渠道(weex->weex)
        appDataChannel.onmessage = (event) => {
            this.appData = event.data || {}
        }
        //页面创建时获取全局应用数据
        this.getAppData().then((data) => {
            this.appData = data || {}
        })
    }
};

