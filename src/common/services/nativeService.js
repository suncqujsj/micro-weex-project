const mm = weex.requireModule('modal');
const navigator = weex.requireModule('navigator');
const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage');
const bridgeModule = weex.requireModule('bridgeModule');
const globalEvent = weex.requireModule("globalEvent");

const isIos = weex.config.env.platform == "iOS" ? true : false;
import debugUtil from '../util/debugUtil'

var ipAddress = "http://localhost:8080";
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

    //**********页面跳转接口***************START
    /*
    params:
        path - 跳转页面路径（以插件文件夹为根目录的相对路径）
        animated - 是否需要跳转动画
        replace - 跳转后是否在历史栈保留当前页面
    */
    goTo(path, animated = 'true', replace = 'false') {
        var self = this;
        var url
        // mm.toast({ message: dummy, duration: 2 })
        if (dummy != true) {
            //if (platform!='Web') {
            url = 'file://assets/' + path;
            self.getPath(function (weexPath) {
                //处理插件目录
                if (path.indexOf("T0x") != -1) {
                    path = path.substr(6, path.length - 6);
                }
                url = weexPath + path;
                self.runGo(url, animated, replace);
            });
        } else {
            let ip = weex.config.bundleUrl.match(new RegExp("[\?\&]ip=([^\&]+)", "i"));
            if (ip == null || ip.length < 1) {
                url = ipAddress + "/dist/" + path;
            } else {
                url = "http://" + ip[1] + ":8080" + "/dist/" + path;
            }
            self.runGo(url, animated, replace);
        }
    },
    runGo(url, animated = 'true', replace = 'false') {
        // mm.toast({ message: url, duration: 2 })
        if (typeof animated == 'boolean') {
            animated = animated ? 'true' : 'false';
        }
        if (typeof replace == 'boolean') {
            replace = replace ? 'true' : 'false';
        }
        navigator.push({
            url: url,
            animated: animated,
            replace: replace
        }, event => {
        });
    },
    getPath(callBack) {
        bridgeModule.getWeexPath(function (resData) {
            var jsonData = JSON.parse(resData);
            var weexPath = jsonData.weexPath;
            callBack(weexPath);
        });
    },
    goBack() {
        var params = {
            animated: 'true'
        }
        navigator.pop(params, function () {
        });
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
            let params = param
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
    call(name, params, isShowLoading = true) {
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
    callWeb(options, isShowLoading = true) {
        return new Promise((resolve, reject) => {
            var self = this;
            if (dummy != true) {
                let defaultOption = {
                    method: "POST",
                    type: 'json'
                }
                if (options.body) {
                    options.body = this.convertWebBody(options.body)
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
                            debugUtil.debugLog(debugLogSeperator, "request: ", options)
                            debugUtil.debugLog("error: ", resData, debugLogSeperator)
                            if (typeof resData == 'string') {
                                resData = JSON.parse(resData)
                            }
                            reject(resData);
                        } else {
                            debugUtil.debugLog(debugLogSeperator, "request: ", options)
                            debugUtil.debugLog("response success: ", resData, debugLogSeperator)
                            let result = resData.data
                            if (typeof result == 'string') {
                                result = JSON.parse(result)
                            }
                            if (result.errorCode == 0) {
                                resolve(result)
                            } else {
                                reject(result)
                            }
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
    convertWebBody(obj) {
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
    //统一JS->Native接口
    commandInterface(...args) {
        bridgeModule.commandInterface(...args)
    },
    getDeviceSN(callback, callbackFail) {
        return new Promise((resolve, reject) => {
            bridgeModule.getDeviceSN(function (resData) {
                let jsonData = JSON.parse(resData);
                let deviceSN = jsonData.deviceSN
                resolve(deviceSN)
            }, (error) => {
                reject(error)
            });
        })
    },

    getApplianceID(callBack) {
        return new Promise((resolve, reject) => {
            bridgeModule.getApplianceID(function (resData) {
                let jsonData = JSON.parse(resData);
                let applianceID = jsonData.devId
                self.setItem("masterId", applianceID);
                resolve(applianceID)
            });
        })
    },
    getDetailParams(callBack) {
        var finalCallBack = function (resData) {
            var jsonData = JSON.parse(resData);
            callBack(jsonData);
        }
        if (dummy != true) {
            bridgeModule.getDetailParams(finalCallBack);
        } else {
            callBack({ "modelid": "jiayun.switch.003" });
        }
    },
    shareMsg(params) {
        if (dummy != true) {
            bridgeModule.shareMsg(JSON.stringify(params));
        }
    },
    updateAreaDevice(params, callback) {
        if (dummy != true) {
            bridgeModule.updateAreaDevice(JSON.stringify(params), callback);
        }
    },
    b2bDelGateway(nodeid) {
        var obj = {};
        obj.nodeid = nodeid;
        if (dummy != true) {
            bridgeModule.b2bDelGateway(JSON.stringify(obj));
        }
    },
    b2bUpdateGateway(obj, callback) {
        if (dummy != true) {
            bridgeModule.b2bUpdateGateway(JSON.stringify(obj), callback);
        }
    },
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
    isMyHouse(callBack) {
        var self = this;
        var finalCallBack = function (resData) {
            var jsonData = JSON.parse(resData);
            self.setItem("isMyHouse", jsonData.houseType);
            callBack(jsonData.houseType);
        }
        if (dummy != true) {
            bridgeModule.getHouseType(finalCallBack);
        } else {
            callBack(0);
            self.setItem("isMyHouse", 1);
        }
    },
    getCurrentApplianceID(callback, callbackFail) {
        var finalCallBack = function (resData) {
            if (typeof resData == 'string') {
                resData = JSON.parse(resData);
            }
            callback(resData.applianceID);
        }
        if (dummy != true) {
            bridgeModule.getCurrentApplianceID(finalCallBack, callbackFail);
        } else {
            callback(0);
        }
    },
    getApplianceSubtype(callback, callbackFail) {
        var finalCallBack = function (resData) {
            if (typeof resData == 'string') {
                resData = JSON.parse(resData);
            }
            callback(resData.applianceSubtype);
        }
        if (dummy != true) {
            bridgeModule.getApplianceSubtype(finalCallBack, callbackFail);
        } else {
            callback(0);
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
    getUserInfo() {
        return new Promise((resolve, reject) => {
            let param = {
                operation: 'getUserInfo'
            }
            bridgeModule.commandInterface(JSON.stringify(param),
                (resData) => {
                    let jsonResult = JSON.parse(resData)
                    resolve(jsonResult)
                },
                (error) => {
                    reject(error)
                })
        })
    },
    callTel(options) {
        return new Promise((resolve, reject) => {
            let param = Object.assign(options, {
                operation: 'callTel'
            })
            bridgeModule.commandInterface(JSON.stringify(param),
                (resData) => {
                    resolve(resData)
                },
                (error) => {
                    reject(error)
                })
        })
    },
    //触发手机震动
    hapticFeedback() {
        return new Promise((resolve, reject) => {
            let param = {
                operation: 'hapticFeedback'
            }
            bridgeModule.commandInterface(JSON.stringify(param),
                (resData) => {
                    resolve(resData)
                },
                (error) => {
                    reject(error)
                })
        })
    },
    //打开指定的系统设置页面，比如蓝牙开关页面
    openNativeSystemPage(pageName) {
        return new Promise((resolve, reject) => {
            let param = {
                operation: 'openNativeSystemPage',
                page: pageName || 'bluetooth'
            }
            bridgeModule.commandInterface(JSON.stringify(param),
                (resData) => {
                    resolve(resData)
                },
                (error) => {
                    reject(error)
                })
        })
    },
    shareMsg(options) {
        /* params =  {
            "type": "wx", //分享类型，wx表示微信分享，qq表示qq分享，sms表示短信分享，weibo表示新浪微博，qzone表示QQ空间，wxTimeline表示微信朋友圈
            "title": "xxxxxx", //分享的标题
            "desc": "xxxxxx",//分享的文本内容
            "imgUrl": "xxxxxx",//分享的图片链接
            "link": "xxxxxx" //分享的跳转链接
        } */
        return new Promise((resolve, reject) => {
            let param = {
                operation: 'shareMsg',
                params: options
            }
            bridgeModule.commandInterface(JSON.stringify(param),
                (resData) => {
                    resolve(resData)
                },
                (error) => {
                    reject(error)
                })
        })
    },
    //获取当前设备网络信息
    getNetworkStatus() {
        return new Promise((resolve, reject) => {
            let param = {
                operation: 'getNetworkStatus'
            }
            bridgeModule.commandInterface(JSON.stringify(param),
                (resData) => {
                    resolve(resData)
                },
                (error) => {
                    reject(error)
                })
        })
    },
    //获取当前家庭信息
    getCurrentHomeInfo() {
        return new Promise((resolve, reject) => {
            let param = {
                operation: 'getCurrentHomeInfo'
            }
            bridgeModule.commandInterface(JSON.stringify(param),
                (resData) => {
                    resolve(resData)
                },
                (error) => {
                    reject(error)
                })
        })
    },
    //获取当前设备信息
    getDeviceInfo() {
        return new Promise((resolve, reject) => {
            let param = {
                operation: 'getDeviceInfo'
            }
            bridgeModule.commandInterface(JSON.stringify(param),
                (resData) => {
                    resolve(resData)
                },
                (error) => {
                    reject(error)
                })
        })
    },
    //更新当前设备信息
    updateDeviceInfo(params) {
        return new Promise((resolve, reject) => {
            let param = Object.assign(params, {
                operation: 'updateDeviceInfo'
            })
            bridgeModule.commandInterface(JSON.stringify(param),
                (resData) => {
                    resolve(resData)
                },
                (error) => {
                    reject(error)
                })
        })
    },
    //打开指定的原生页面
    jumpNativePage(params) {
        /* params =  {
            "pageName": "xxxx", //跳转的目标页面
            "data": {xxxxxx}, //传参，为json格式字符串
        } */
        return new Promise((resolve, reject) => {
            let param = Object.assign(params, {
                operation: 'jumpNativePage'
            })
            bridgeModule.commandInterface(JSON.stringify(param),
                (resData) => {
                    resolve(resData)
                },
                (error) => {
                    reject(error)
                })
        })
    },
    //调用第三方SDK统一接口
    interfaceForThirdParty(...args) {
        bridgeModule.interfaceForThirdParty(...args)
    }
    //**********APP业务接口***************END
}