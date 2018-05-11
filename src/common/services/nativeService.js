const mm = weex.requireModule('modal');
const navigator = weex.requireModule('navigator');
const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage');
const bridgeModule = weex.requireModule('bridgeModule');
const globalEvent = weex.requireModule("globalEvent");

const isIos = weex.config.env.platform == "iOS" ? true : false;
import debugUtil from '../util/debugUtil'

var dummy = false;
// import Mock from './mock'  //正式场上线时注释掉

const debugLogSeperator = "**************************************\n"


var ipParam = weex.config.bundleUrl.match(new RegExp("[\?\&]ip=([^\&]+)", "i"));
if (ipParam && ipParam.length > 1) {
    ipParam = ipParam[1]
    // 测试
    dummy = true
}
const platform = weex.config.env.platform;
if (platform == 'Web') {
    dummy = true
}
console.log("dummy:" + dummy)

export default {
    serviceList: {
        test: "commonservice"
    },
    //**********Util方法***************START
    convertToJson(str) {
        let result = str
        if (typeof str == 'string') {
            try {
                result = JSON.parse(str)
            } catch (error) {
                console.error(error)
            }
        }
        return result
    },
    //**********Util方法***************END

    //**********页面跳转接口***************START
    /*
    params:
        path - 跳转页面路径（以插件文件夹为根目录的相对路径）
        options: {
            animated: true/false, - 是否需要跳转动画
            replace: true/false, - 跳转后是否在历史栈保留当前页面
            viewTag: string - 给跳转后的页面设置标识，可用于goBack时指定返回页面
        }
    */
    goTo(path, options) {
        var url
        // mm.toast({ message: dummy, duration: 2 })
        if (dummy != true) {
            //手机本地页面跳转
            this.getPath((weexPath) => {
                //weexPath为插件包地址，比如：files:///..../MideaHome/T0x99/
                url = weexPath + path;
                this.runGo(url, options);
            });
        } else if (platform != 'Web') {
            //手机远程weex页面调试跳转
            let theRequest = new Object();
            let bundleUrl = weex.config.bundleUrl
            let queryString = ''
            if (bundleUrl.indexOf("?") != -1) {
                queryString = bundleUrl.substr(bundleUrl.indexOf("?") + 1);
                let strs = queryString.split("&");
                for (let i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            let ip = theRequest['ip']
            let root = theRequest['root']
            let targetPath = path
            if (targetPath.indexOf("?") != -1) {
                targetPath += '&root=' + root + '&ip=' + ip
            } else {
                targetPath += '?root=' + root + '&ip=' + ip
            }
            if (ip == null || ip.length < 1) {
                url = "http://localhost:8080/dist/" + root + '/' + targetPath;
            } else {
                url = "http://" + ip + ":8080" + "/dist/" + root + '/' + targetPath;
            }
            this.runGo(url, options);
        } else {
            //PC网页调试跳转
            location.href = location.origin + location.pathname + '?path=' + path
        }
    },
    runGo(url, options) {
        // mm.toast({ message: url, duration: 2 })
        if (!options) {
            options = {
                animated: 'true',
                replace: 'false'
            }
        } else {
            if (typeof options.animated == 'boolean') {
                options.animated = options.animated ? 'true' : 'false';
            }
            if (typeof options.replace == 'boolean') {
                options.replace = options.replace ? 'true' : 'false';
            }
        }
        let params = Object.assign(options, {
            url: url
        })
        // this.toast(params)
        navigator.push(params, event => { });
    },
    /*
        取得当前weex页面的根路径
    */
    getPath(callBack) {
        bridgeModule.getWeexPath(function (resData) {
            var jsonData = JSON.parse(resData);
            var weexPath = jsonData.weexPath;
            callBack(weexPath);
        });
    },
    goBack(options = {}) {
        var params = Object.assign({
            animated: 'true'
        }, options)
        // this.toast(params)
        navigator.pop(params, event => { });
    },
    backToNative() {
        bridgeModule.backToNative();
    },
    //**********页面跳转接口***************END


    //**********非APP业务接口***************START
    genMessageId() {
        var messageId = '';
        for (var i = 0; i < 8; i++) {
            messageId += (Math.floor(Math.random() * 10)).toString();
        }
        return messageId;
    },
    getItem(key, callback) {
        storage.getItem(key, callback)
    },
    setItem(key, value, callback) {
        if (typeof value == 'object') {
            value = JSON.stringify(value);
        }
        let defaultCallback = event => {
            console.log('set success')
        }
        storage.setItem(key, value, callback || defaultCallback)
    },
    removeItem(key, callback) {
        storage.removeItem(key, () => {
            if (callback) callback()
        })
    },
    toast(message, duration) {
        if (typeof message == 'object') {
            message = JSON.stringify(message)
        }
        mm.toast({ message: message, duration: duration || 1 });
    },
    alert(message, callback, okTitle) {
        var callbackFunc = callback || function (value) { }

        if (typeof message == 'object') {
            try {
                message = JSON.stringify(message)
            } catch (error) { }
        }
        mm.alert({
            message: message,
            okTitle: okTitle || "确定"
        }, function (value) {
            callbackFunc(value);
        });
    },
    confirm(message, callback, okTitle, cancelTitle) {
        mm.confirm({
            message: message,
            okTitle: okTitle || '确定',
            cancelTitle: cancelTitle || '取消'
        }, result => {
            callback(result)
        });
    },
    showLoading() {
        if (dummy != true) {
            bridgeModule.showLoading();
        }
    },
    hideLoading() {
        if (dummy != true) {
            bridgeModule.hideLoading();
        }
    },
    showLoadingWithMsg(option) {
        if (dummy != true) {
            let params = option
            if (typeof option == 'string') {
                params = {
                    msg: option
                }
            }
            bridgeModule.showLoadingWithMsg(params);
        }
    },
    hideLoadingWithMsg() {
        if (dummy != true) {
            bridgeModule.hideLoadingWithMsg();
        }
    },
    //**********非APP业务接口***************END

    //**********网络请求接口***************START
    //发送智慧云网络请求：此接口固定Post到智慧云https地址及端口
    sendMCloudRequest(name, params, isShowLoading = true) {
        return new Promise((resolve, reject) => {
            var self = this;
            if (dummy != true) {
                this.getItem("masterId", (resdata) => {
                    let msgid = self.genMessageId()
                    var masterId = resdata.data
                    var sendData = {}
                    sendData.url = self.serviceList[name] ? self.serviceList[name] : name
                    sendData.params = Object.assign({
                        applianceId: masterId + "",
                        msgid: msgid
                    }, params)
                    if (isShowLoading) {
                        this.showLoading()
                    }
                    bridgeModule.sendMCloudRequest(sendData,
                        (resData) => {
                            debugUtil.debugLog(debugLogSeperator, `request(${msgid}): `, sendData)
                            debugUtil.debugLog(`response(${msgid}): `, resData, debugLogSeperator)
                            if (typeof resData == 'string') {
                                resData = JSON.parse(resData)
                            }
                            if (isShowLoading) {
                                this.hideLoading()
                            }
                            if (resData.errorCode == 0) {
                                resolve(resData)
                            } else {
                                reject(resData)
                            }
                        },
                        (error) => {
                            debugUtil.debugLog(debugLogSeperator, `request(${msgid}): `, sendData)
                            debugUtil.debugLog(`=======> error(${msgid}): `, error, debugLogSeperator)
                            if (isShowLoading) {
                                this.hideLoading()
                            }
                            if (typeof error == 'string') {
                                error = JSON.parse(error)
                            }
                            reject(error);
                        }
                    )
                });
            } else {
                let resData = Mock.getMock(self.serviceList[name] ? self.serviceList[name] : name)
                if (resData.errorCode == 0) {
                    resolve(resData);
                }
            }
        })
    },
    //发送POST网络请求：URL自定义
    /* options: {
        url: url,
        type: 'text',
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: {
            'objectId': objectId,
            'format': 'base64'
        }
    } */
    sendHttpRequest(params, isShowLoading = true) {
        return new Promise((resolve, reject) => {
            let options = JSON.parse(JSON.stringify(params))
            var self = this;
            if (true || dummy != true) {
                let defaultOption = {
                    method: "POST",
                    type: 'json'
                }
                if (options.body) {
                    options.body = this.convertRequestBody(options.body)
                }
                options = Object.assign(defaultOption, options)

                if (isShowLoading) {
                    this.showLoading()
                }
                stream.fetch(options,
                    (resData) => {
                        if (isShowLoading) {
                            this.hideLoading()
                        }
                        if (!resData.ok) {
                            if (typeof resData == 'string') {
                                resData = JSON.parse(resData)
                            }
                            reject(resData);
                        } else {
                            let result = resData.data
                            if (typeof result == 'string') {
                                result = JSON.parse(result)
                            }
                            resolve(result)
                        }

                    }
                )
            } else {
                let resData = Mock.getMock(name)
                if (resData.errorCode == 0) {
                    resolve(resData);
                }
            }
        })
    },
    convertRequestBody(obj) {
        var param = ""
        for (const name in obj) {
            if (typeof obj[name] != 'function') {
                param += "&" + name + "=" + encodeURI(obj[name])
            }
        }
        return param.substring(1)
    },
    //发送指令透传接口
    startCmdProcess(name, messageBody, callback, callbackFail) {
        let commandId = Math.floor(Math.random() * 1000);
        var param = {
            commandId: commandId
        }
        if (messageBody != undefined) {
            param.messageBody = messageBody;
        }
        var finalCallBack = function (resData) {
            if (typeof resData == 'string') {
                resData = JSON.parse(resData);
            }
            if (resData.errorCode != 0) {
                callbackFail(resData);
            } else {
                callback(resData.messageBody);
            }
        }
        var finalCallbackFail = function (resData) {
            if (typeof resData == 'string') {
                resData = JSON.parse(resData);
            }
            callbackFail(resData);
        }
        if (dummy != true) {
            if (isIos) {
                this.createCallbackFunctionListener();
                this.callbackFunctions[commandId] = finalCallBack;
                this.callbackFailFunctions[commandId] = finalCallbackFail;
            }
            bridgeModule.startCmdProcess(JSON.stringify(param), finalCallBack, finalCallbackFail);
        } else {
            callback(Mock.getMock(name).messageBody);
        }
    },

    /* *****即将删除, IOS已经做了改进，不在需要已callbackFunction回调callback ********/
    isCreateListener: false,
    createCallbackFunctionListener() {
        if (!this.isCreateListener) {
            this.isCreateListener = true;
            globalEvent.addEventListener("callbackFunction", (result) => {
                //IOS消息返回处理
                var commandId = result.commandId;
                if (commandId) {
                    this.callbackFunction(commandId, result);
                }
            });
        }
    },
    callbackFunctions: {},
    callbackFailFunctions: {},
    callbackFunction(commandId, result) {
        var jsonResult = result;
        var cbf = this.callbackFunctions[commandId];
        var cbff = this.callbackFailFunctions[commandId];
        if (jsonResult.errorCode !== undefined && jsonResult.errMessage == 'TimeOut') {
            if (typeof cbff == "function") {
                cbff(-1); //表示指令超时 －1
            }
        } else {
            if (typeof cbf == "function") {
                cbf(jsonResult);
            }
        }
        delete this.callbackFunctions[commandId];
        delete this.callbackFailFunctions[commandId];
    },
    /* *****即将删除, IOS已经做了改进，不在需要已callbackFunction回调callback ********/

    //发送Lua指令接口
    sendLuaRequest(params, isShowLoading = true) {
        return new Promise((resolve, reject) => {
            var param = {};
            param.operation = params.operation || "luaControl";//luaQuery or luaControl
            param.params = params.data || {};
            if (dummy != true) {
                if (isShowLoading) {
                    this.showLoading()
                }
                let msgid = this.genMessageId()
                bridgeModule.commandInterface(JSON.stringify(param),
                    (resData) => {
                        debugUtil.debugLog(debugLogSeperator, `Lua request(${msgid}): `, param)
                        debugUtil.debugLog(`Lua response(${msgid}):`, resData, debugLogSeperator)
                        if (typeof resData == 'string') {
                            resData = JSON.parse(resData);
                        }
                        if (isShowLoading) {
                            this.hideLoading()
                        }
                        if (resData.errorCode == 0) {
                            //成功
                            resolve(resData);
                        } else {
                            reject(resData);
                        }
                    }, (error) => {
                        debugUtil.debugLog(debugLogSeperator, `Lua request(${msgid}): `, param)
                        debugUtil.debugLog(`=======> Lua error(${msgid}): `, error, debugLogSeperator)
                        if (isShowLoading) {
                            this.hideLoading()
                        }
                        if (typeof error == 'string') {
                            error = JSON.parse(error)
                        }
                        reject(error);
                    });
            } else {
                let resData

                if (params['operation']) {
                    resData = Mock.getMock(params['operation'])
                }
                debugUtil.debugLog("Mock: ", resData)
                resolve(resData);
            }
        })
    },
    //**********网络请求接口***************END



    //**********APP业务接口***************START
    updateTitle(title, showLeftBtn, showRightBtn) {
        var params = {
            title: title,
            showLeftBtn: showLeftBtn,
            showRightBtn: showRightBtn
        }
        if (dummy != true) {
            bridgeModule.updateTitle(JSON.stringify(params));
        }
    },

    showSharePanel(params, callback, callbackFail) {
        return new Promise((resolve, reject) => {
            bridgeModule.showSharePanel(params,
                (resData) => {
                    resolve(resData)
                },
                (error) => {
                    reject(error)
                });
        })
    },

    //统一JS->Native接口
    commandInterfaceWrapper(param) {
        return new Promise((resolve, reject) => {
            bridgeModule.commandInterface(JSON.stringify(param),
                (resData) => {
                    resolve(this.convertToJson(resData))
                },
                (error) => {
                    reject(error)
                })
        })
    },
    //获取用户信息
    getUserInfo() {
        let param = {
            operation: 'getUserInfo'
        }
        return this.commandInterfaceWrapper(param)
    },
    //打电话
    callTel(params) {
        let param = Object.assign(params, {
            operation: 'callTel'
        })
        return this.commandInterfaceWrapper(param)
    },
    //触发手机震动
    hapticFeedback() {
        let param = {
            operation: 'hapticFeedback'
        }
        return this.commandInterfaceWrapper(param)
    },
    //打开指定的系统设置，比如蓝牙
    openNativeSystemSetting(settingName) {
        let param = {
            operation: 'openNativeSystemSetting',
            setting: settingName || 'bluetooth'
        }
        return this.commandInterfaceWrapper(param)
    },
    shareMsg(params) {
        /* params =  {
            "type": "wx", //分享类型，wx表示微信分享，qq表示qq分享，sms表示短信分享，weibo表示新浪微博，qzone表示QQ空间，wxTimeline表示微信朋友圈
            "title": "xxxxxx", //分享的标题
            "desc": "xxxxxx",//分享的文本内容
            "imgUrl": "xxxxxx",//分享的图片链接
            "link": "xxxxxx" //分享的跳转链接
        } */
        let param = {
            'operation': 'shareMsg',
            'params': params
        }
        return this.commandInterfaceWrapper(param)
    },
    //获取当前设备网络信息
    getNetworkStatus() {
        let param = {
            operation: 'getNetworkStatus'
        }
        return this.commandInterfaceWrapper(param)
    },
    //获取当前家庭信息
    getCurrentHomeInfo() {
        let param = {
            operation: 'getCurrentHomeInfo'
        }
        return this.commandInterfaceWrapper(param)
    },
    //获取当前设备信息
    getDeviceInfo() {
        let param = {
            operation: 'getDeviceInfo'
        }
        return this.commandInterfaceWrapper(param)
    },
    //更新当前设备信息
    updateDeviceInfo(params) {
        let param = Object.assign(params, {
            operation: 'updateDeviceInfo'
        })
        return this.commandInterfaceWrapper(param)
    },
    //打开指定的原生页面
    jumpNativePage(params) {
        /* params =  {
            "pageName": "xxxx", //跳转的目标页面
            "data": {xxxxxx}, //传参，为json格式字符串
        } */
        let param = Object.assign(params, {
            operation: 'jumpNativePage'
        })
        return this.commandInterfaceWrapper(param)
    },
    //设置是否监控安卓手机物理返回键功能, v4.4.0
    setBackHandle(status) {
        /* params =  {
            "pageName": "xxxx", //跳转的目标页面
            "isMonitor": on,  //on: 打开监控，off: 关闭监控
        } */
        let params = {
            operation: 'setBackHandle',
            isMonitor: status
        }
        return this.commandInterfaceWrapper(params)
    },
    //调用第三方SDK统一接口
    interfaceForThirdParty(...args) {
        bridgeModule.interfaceForThirdParty(...args)
    }
    //**********APP业务接口***************END
}