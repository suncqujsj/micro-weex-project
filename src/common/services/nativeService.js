const mm = weex.requireModule('modal');
const navigator = weex.requireModule('navigator');
const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage');
const bridgeModule = weex.requireModule('bridgeModule');
const globalEvent = weex.requireModule("globalEvent");


const isIos = weex.config.env.platform == "iOS" ? true : false;
import debugUtil from '../util/debugUtil'
import util from '../util/util'

var isDummy = false;
// import Mock from './mock'  //正式场上线时注释掉

const debugLogSeperator = "**************************************\n"


var ipParam = weex.config.bundleUrl.match(new RegExp("[\?\&]ip=([^\&]+)", "i"));
if (ipParam && ipParam.length > 1) {
    ipParam = ipParam[1]
    // 测试
    isDummy = true
}
const platform = weex.config.env.platform;
if (platform == 'Web') {
    isDummy = true
}
console.log("isDummy:" + isDummy)
var isRemote = weex.config.bundleUrl.indexOf("http") > -1 ? true : false

export default {
    serviceList: {
        test: "commonservice"
    },
    Mock: {},
    isDummy: isDummy,
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
    getParameters(key) {
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
        return key ? theRequest[key] : theRequest
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
            transparent: 'true/false', //新页面背景是否透明
            animatedType: 'slide_bottomToTop' //新页面出现动效类型
        }
    */
    goTo(path, options) {
        var url
        // mm.toast({ message: isRemote, duration: 2 })
        if (this.isDummy != true && !isRemote) {
            //手机本地页面跳转
            this.getPath((weexPath) => {
                //weexPath为插件包地址，比如：files:///..../MideaHome/T0x99/
                url = weexPath + path;
                this.runGo(url, options);
            });
        } else if (platform != 'Web') {
            //手机远程weex页面调试跳转
            let theRequest = this.getParameters()
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
            location.href = location.origin + location.pathname + '?path=' + path.replace('?', '&')
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
        if (this.isDummy != true) {
            bridgeModule.getWeexPath(function (resData) {
                var jsonData = JSON.parse(resData);
                var weexPath = jsonData.weexPath;
                callBack(weexPath);
            });
        } else if (platform != 'Web') {
            //手机远程weex页面调试
            let theRequest = this.getParameters()
            let ip = theRequest['ip']
            let root = theRequest['root']
            let weexPath
            if (ip == null || ip.length < 1) {
                weexPath = "http://localhost:8080/dist/" + root + '/'
            } else {
                weexPath = "http://" + ip + ":8080" + "/dist/" + root + '/'
            }
            callBack(weexPath);
        } else {
            //PC网页调试跳转
            location.href = location.origin + location.pathname + '?path=' + path
        }
    },
    /*  
    options = {
            animated: 'true',
            animatedType: 'slide_topToBottom' //页面关闭时动效类型
    }*/
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
        let temp
        if (typeof value == 'object') {
            temp = JSON.stringify(value);
        }
        let defaultCallback = event => {
            console.log('set success')
        }
        storage.setItem(key, temp || value, callback || defaultCallback)
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
        if (this.isDummy != true) {
            bridgeModule.showLoading();
        }
    },
    hideLoading() {
        if (this.isDummy != true) {
            bridgeModule.hideLoading();
        }
    },
    showLoadingWithMsg(option) {
        if (this.isDummy != true) {
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
        if (this.isDummy != true) {
            bridgeModule.hideLoadingWithMsg();
        }
    },
    //**********非APP业务接口***************END

    //**********网络请求接口***************START
    //发送智慧云网络请求：此接口固定Post到智慧云https地址及端口
    sendMCloudRequest(name, params, options = { isShowLoading: true, isValidate: true }) {
        return new Promise((resolve, reject) => {
            var self = this;
            if (this.isDummy != true) {
                this.getItem("masterId", (resdata) => {
                    let msgid = self.genMessageId()
                    var masterId = resdata.data
                    var sendData = {}
                    sendData.url = self.serviceList[name] ? self.serviceList[name] : name
                    sendData.params = Object.assign({
                        applianceId: masterId + "",
                        msgid: msgid
                    }, params)
                    if (options.isShowLoading) {
                        this.showLoading()
                    }
                    bridgeModule.sendMCloudRequest(sendData,
                        (resData) => {
                            debugUtil.debugLog(debugLogSeperator, `request(${msgid}): `, sendData)
                            debugUtil.debugLog(`response(${msgid}): `, resData, debugLogSeperator)
                            if (typeof resData == 'string') {
                                resData = JSON.parse(resData)
                            }
                            if (options.isShowLoading) {
                                this.hideLoading()
                            }

                            if (options.isValidate) {
                                //resData.status为5.0判断；resData.errorCode为4.判断
                                if (resData.errorCode == 0) {
                                    resolve(resData)
                                } else if (resData.status === true) {
                                    resolve(resData)
                                } else {
                                    reject(resData)
                                }
                            } else {
                                resolve(resData)
                            }
                        },
                        (error) => {
                            debugUtil.debugLog(debugLogSeperator, `request(${msgid}): `, sendData)
                            debugUtil.debugLog(`=======> error(${msgid}): `, error, debugLogSeperator)
                            if (options.isShowLoading) {
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
                let resData = this.Mock.getMock(self.serviceList[name] ? self.serviceList[name] : name)
                if (options.isValidate) {
                    //resData.status为5.0判断；resData.errorCode为4.判断
                    if (resData.errorCode == 0) {
                        resolve(resData)
                    } else if (resData.status === true) {
                        resolve(resData)
                    } else {
                        reject(resData)
                    }
                } else {
                    resolve(resData)
                }
            }
        })
    },

    //^5.0.0发送中台网络请求：此接口固定Post到中台https地址及端口
    sendCentralCloundRequest(name, params, options = { isShowLoading: true }) {
        return new Promise((resolve, reject) => {
            if (this.isDummy != true) {
                let msgid = this.genMessageId()
                var sendData = params || {}
                sendData.url = this.serviceList[name] ? this.serviceList[name] : name
                if (options.isShowLoading) {
                    this.showLoading()
                }
                bridgeModule.sendCentralCloundRequest(sendData,
                    (resData) => {
                        debugUtil.debugLog(debugLogSeperator, `request(${msgid}): `, sendData)
                        debugUtil.debugLog(`response(${msgid}): `, resData, debugLogSeperator)
                        if (typeof resData == 'string') {
                            resData = JSON.parse(resData)
                        }
                        if (options.isShowLoading) {
                            this.hideLoading()
                        }

                        resolve(resData)
                    },
                    (error) => {
                        debugUtil.debugLog(debugLogSeperator, `request(${msgid}): `, sendData)
                        debugUtil.debugLog(`=======> error(${msgid}): `, error, debugLogSeperator)
                        if (options.isShowLoading) {
                            this.hideLoading()
                        }
                        if (typeof error == 'string') {
                            error = JSON.parse(error)
                        }
                        reject(error);
                    }
                )
            } else {
                let resData = this.Mock.getMock(this.serviceList[name] ? this.serviceList[name] : name)
                resolve(resData)
            }
        })
    },
    //发送POST网络请求：URL自定义
    /* params: {
        url: url,
        type: 'text',
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: {
            'objectId': objectId,
            'format': 'base64'
        }
    } */
    sendHttpRequest(params, options = { isShowLoading: true, isValidate: true }) {
        return new Promise((resolve, reject) => {
            let requestParams = JSON.parse(JSON.stringify(params))
            var self = this;
            if (this.isDummy != true) {
                let defaultParams = {
                    method: "POST",
                    type: 'json'
                }
                requestParams = Object.assign(defaultParams, requestParams)

                /* body 参数仅支持 string 类型的参数，请勿直接传递 JSON，必须先将其转为字符串。
                GET 请求不支持 body 方式传递参数，请使用 url 传参。 */
                if (requestParams.body && requestParams.method == "GET") {
                    let bodyStr = this.convertRequestBody(requestParams.body)
                    if (requestParams.url.indexOf("?") > -1) {
                        requestParams.url += "&" + bodyStr
                    } else {
                        requestParams.url += "?" + bodyStr
                    }
                    requestParams.body = ""
                } else if (requestParams.body && requestParams.method == "POST") {
                    requestParams.body = requestParams.body
                }

                if (options.isShowLoading) {
                    this.showLoading()
                }
                let msgid = self.genMessageId()
                stream.fetch(requestParams,
                    (resData) => {
                        debugUtil.debugLog(debugLogSeperator, `request(${msgid}): `, requestParams)
                        debugUtil.debugLog(`response(${msgid}): `, resData, debugLogSeperator)
                        if (options.isShowLoading) {
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
                let resData = this.Mock.getMock(params.url)
                resolve(resData);
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
        if (this.isDummy != true) {
            if (isIos) {
                this.createCallbackFunctionListener();
                this.callbackFunctions[commandId] = finalCallBack;
                this.callbackFailFunctions[commandId] = finalCallbackFail;
            }
            bridgeModule.startCmdProcess(JSON.stringify(param), finalCallBack, finalCallbackFail);
        } else {
            callback(this.Mock.getMock(name).messageBody);
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
            if (this.isDummy != true) {
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

                if (params['operation'] || params['name']) {
                	if(params['name']) {
                		resData = Mock.getMock(params['name'])
                	} else {
                		resData = Mock.getMock(params['operation'])	
                	}
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
        if (this.isDummy != true) {
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
    /* param: {
        tel: '10086',
        title: '客户服务',
        desc: '拨打热线电话：'
    } */
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
        if(this.isDummy == true) {
        	 return new Promise((resolve, reject) => {
	        	let resData = Mock.getMock(param.operation);
	            if (resData.errorCode == 0) {
	                resolve(resData);
	            } else {
	                reject(resData)
	            }
	        });
        } else {
        	return this.commandInterfaceWrapper(param)
        }
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
    //跳转到h5页面
    weexBundleToWeb(params) {
        /* params =  {
            url: "xxxx", //跳转的目标页面
            titel: "h5标题"
        } */
        let param = Object.assign(params, {
            operation: 'weexBundleToWeb',
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
    //二维码/条形码扫码功能，用于读取二维码/条形码的内容
    scanCode(status) {
        let params = {
            operation: 'scanCode'
        }
        return this.commandInterfaceWrapper(params)
    },
    //开启麦克风录音，可以保存录音文件或者把声音转换成文字
    startRecordAudio(params) {
        /* params =  {
            max:number, //最长录音时间, 单位为秒
            isSave:true/false, //是否保存语音录音文件
            isTransform:true/false, //是否需要转换语音成文字
        } */
        let param = Object.assign(params, {
            operation: 'startRecordAudio'
        })
        return this.commandInterfaceWrapper(param)
    },
    //开启麦克风录音后，自行控制结束录音
    stopRecordAudio() {
        let params = {
            operation: 'stopRecordAudio'
        }
        return this.commandInterfaceWrapper(params)
    },
    takePhoto(params) {
        /* params =  {
            compressRage:60, , //number, 返回照片的压缩率，范围为0~100，数值越高保真率越高
            type:'jpg', //值为jpg或png，指定返回相片的格式
            isNeedBase64: true/false //是否需要返回相片base64数据
        } */
        let param = Object.assign(params, {
            operation: 'takePhoto'
        })
        return this.commandInterfaceWrapper(param)
    },
    choosePhoto(params) {
        /* params =  {
            compressRage:60, , //number, 返回照片的压缩率，范围为0~100，数值越高保真率越高
            type:'jpg', //值为jpg或png，指定返回相片的格式
            isNeedBase64: true/false //是否需要返回相片base64数据
        } */
        let param = Object.assign(params, {
            operation: 'choosePhoto'
        })
        return this.commandInterfaceWrapper(param)
    },
    getGPSInfo(params) {
        /* params =  {
            desiredAccuracy: "10",  //定位的精确度，单位：米
            alwaysAuthorization: "0",  //是否开启实时定位功能，0: 只返回一次GPS信息（默认），1:APP在前台时，每移动distanceFilter的距离返回一次回调。2:无论APP在前后台，每移动distanceFilter的距离返回一次回调（注意耗电）
            distanceFilter: "10", //alwaysAuthorization为1或2时有效，每移动多少米回调一次定位信息
        } */
        let param = Object.assign(params, {
            operation: 'getGPSInfo'
        })
        return this.commandInterfaceWrapper(param)
    },
    //获取登录态信息
    getLoginInfo() {
        let param = {
            operation: 'getLoginInfo'
        }
        return this.commandInterfaceWrapper(param)
    },
    /* ^5.0.0 打开用户手机地图软件，传入标记地点。（打开地图软件后，用户可以使用地图软件的功能，比如导航等）
    ios: 如果用户安装了百度地图，则跳转到百度地图app，没有安装，则跳转Safar，使用网页导航
    android: 如果用户安装了百度地图，则跳转到百度地图app，没有安装，则跳转使用外部浏览器，使用网页导航（用户选择合适的浏览器，原生toast引导，存在选择错误应用的风险） */
    launchMapApp(params) {
        /* params =  {
            from:{ //当前用户地点
                latitude: string, //纬度
                longitude: string //经度
            },
            to:{ //目的地地点
                latitude: string, //纬度
                longitude: string //经度
            }
        } */
        let param = Object.assign(params, {
            operation: 'launchMapApp'
        })
        return this.commandInterfaceWrapper(param)
    },
    /* 根据模糊地址，返回地图服务的查询结果数据。 */
    searchMapAddress(params) {
        /* params =  {
            city: "", //需要查询的城市(范围)
            keyword: "美的" //需要查询的地址
        } */
        let param = Object.assign(params, {
            operation: 'searchMapAddress'
        })
        return this.commandInterfaceWrapper(param)
    },
    /* 选择通讯录的好友，可以获取电话号码，好友信息 */
    getAddressBookPerson() {
        let param = {
            operation: 'getAddressBookPerson'
        }
        return this.commandInterfaceWrapper(param)
    },
    //调用第三方SDK统一接口
    interfaceForThirdParty(...args) {
        bridgeModule.interfaceForThirdParty(...args)
    }
    //**********APP业务接口***************END
}