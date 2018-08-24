
import appConfig from './config'
import nativeService from '@/common/services/nativeService'
import util from '@/common/util/util'
import debugUtil from '@/common/util/debugUtil'
import ERROR_MESSAGES from './errorMessages';
import { SERVICE_STORAGE_KEYS } from './globalKeys'
const cssRrequestSendWithApp = true
const requestSendWithApp = true
const withoutAPPWithMAS = true
const HOST_CSS = cssRrequestSendWithApp ? '' : withoutAPPWithMAS ? "http://mp-sit.smartmidea.net/mas/v5/app/proxy?alias=" : "http://csuat.midea.com"
const HOST_CENTER = requestSendWithApp ? '' : withoutAPPWithMAS ? "http://mp-sit.smartmidea.net/mas/v5/app/proxy?alias=" : "http://cmms2.midea.com"
const HOST_antiFake = "http://wap.cjm.so/Common/DataService.ashx"

let customizeNativeService = Object.assign(nativeService, {
    isDummy: false,
    serviceList: {
        //CSS 客服接口
        queryserviceorder: HOST_CSS + "/c-css-ipms/oi/api/wom/order/queryserviceorder", //客服-CSS-用户服务工单列表查询
        createserviceorder: HOST_CSS + "/c-css-ipms/oi/api/wom/order/createserviceorder", //客服-CSS-用户报装、报修、洗悦家服务请求
        queryserviceuserdemanddispatch: HOST_CSS + "/c-css-ipms/oi/api/wom/order/queryserviceuserdemanddispatch", //客服-CSS-用户服务工单详情进度查询
        queryservicereqsrvprod: HOST_CSS + "/c-css-ipms/oi/api/wom/order/queryservicereqsrvprod", //客服-CSS-催单原因列表接口
        createserviceuserdemand: HOST_CSS + "/c-css-ipms/oi/api/wom/order/createserviceuserdemand", //客服-CSS-催单CSS信息单
        cancelserviceorder: HOST_CSS + "/c-css-ipms/oi/api/wom/order/cancelserviceorder", //客服-CSS-取消售后工单
        extractcallbackitem: HOST_CSS + "/c-css-ipms/oi/api/wom/order/extractcallbackitem", //客服-CSS-回访问卷抽取
        createcallbackinfo: HOST_CSS + "/c-css-ipms/oi/api/wom/order/createcallbackinfo", //客服-CSS-回访结果提交
        queryconsumerorderprogress: HOST_CSS + "/c-css-ipms/oi/api/wom/order/queryconsumerorderprogress", //客服-CSS-用户服务单服务过程列表查询接口
        queryservicerequireproduct: HOST_CSS + "/c-css-ipms/oi/api/wom/order/queryservicerequireproduct", //客服-CSS-服务请求查询接口 (故障类型)
        getexcludedfaultlist: HOST_CSS + "/c-css-ipms/oi/api/wom/getexcludedfaultlist", //客服-CSS-故障可能原因查询
        appexcludedfaulttraces: HOST_CSS + "/c-css-ipms/oi/api/wom/appexcludedfaulttraces", //客服-CSS-假性故障有帮助没帮助标识接口
        queryunitarchives: HOST_CSS + "/c-css-ipms/oi/api/wom/order/queryunitarchives", //客服-CSS-网点查询
        querywarrantydescbycodeorsn: HOST_CSS + "/c-css-ipms/oi/api/wom/order/querywarrantydescbycodeorsn", //客服-CSS-包修政策查询接口
        createchargeinfo: HOST_CSS + "/c-css-ipms/oi/api/mmp/createchargeinfo", //客服-CSS-收费信息接收接口
        dochargecomfirm: HOST_CSS + "/c-css-ipms/oi/api/wom/order/dochargecomfirm", //客服-CSS-服务号收费确认
        querychargedetails: HOST_CSS + "/c-css-ipms/oi/api/wom/order/querychargedetails", //客服-CSS-服务号收费报告查看
        querychargestatus: HOST_CSS + "/c-css-ipms/oi/mideapay/charge/querychargestatus", //客服-CSS-收费状态查询
        queryproductinfobysn: HOST_CSS + "/c-css-ipms/oi/api/wom/queryproductinfobysn", //客服-CSS-条码解析接口

        // CSS客服 - 技术组接口
        getChargeStandardList: HOST_CSS + "/c-css-ipms/api/insp/getChargeStandardList", //客服-CSS-收费标准查询
        getChargePriceForMaterial: HOST_CSS + "/c-css-ipms/api/insp/getChargePriceForMaterial", //客服-CSS-配件价格查询

        //中控消息
        getProdType: HOST_CENTER + "/pdgw-ap/message/getProdType", //客服-中控-产品列表
        getProdMessage: HOST_CENTER + "/pdgw-ap/message/getProdMessage", //客服-中控-获取售后产品资料对外服务接口 (产品型号模糊查询)

        //中控-用户消息
        getUserProductPageList: HOST_CENTER + "/ccrm2-core/userProduct/getUserProductPageList", //客服-中控-获取家电列表
        getProductBySerialNo: HOST_CENTER + "/ccrm2-core/userProduct/getProductBySerialNo", //客服-中控-sn码查询用户产品 (一键报修)

        getAreaList: HOST_CENTER + "/cmms/area/list", //客服-中控-服务地区
        getUserAddrPageList: HOST_CENTER + "/ccrm2-core/userAddr/getUserAddrPageList", //客服-中控-地址列表查询
        getDefaultAddr: HOST_CENTER + "/ccrm2-core/userAddr/getDefaultAddr", //客服-中控-获取默认地址
        userAddrAdd: HOST_CENTER + "/ccrm2-core/userAddr/add", //客服-中控-地址新增
        userAddrUpdate: HOST_CENTER + "/ccrm2-core/userAddr/update", //客服-中控-地址修改
        userAddrDelete: HOST_CENTER + "/ccrm2-core/userAddr/delete", //客服-中控-地址删除
    },
    objectToQuery(obj) {
        return Object.keys(obj).map(k =>
            k + '=' + obj[k]
        ).join('&')
    },
    objectToQueryWithEncode(obj) {
        return Object.keys(obj).map(k =>
            encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
        ).join('&')
    },
    getErrorMessage(error) {
        let msg = "系统出错，请稍后再试。", errorCode
        if (error) {
            errorCode = error.code || error.errorCode
            let unNormalErrorCode = ['error_system']
            if (unNormalErrorCode.indexOf(errorCode) < 0) {
                //若是正常的错误码，则显示错误信息
                msg = ERROR_MESSAGES[errorCode] || error.msg || error.errorMsg || error.returnMsg || error.errorMessage || "系统出错，请稍后再试。"
            }
            if (errorCode) {
                msg += "(" + errorCode + ")"
            }
        }
        debugUtil.debugLog(error)
        return msg
    },

    // CSS 接口
    getCssRequestCommonParam() {
        return new Promise((resolve, reject) => {
            let param = {
                plugin_version: appConfig.plugin_version || '0.0.1',
                tm: Math.round(new Date().getTime() / 1000) //时间戳
            }
            this.getUserInfo().then((data) => {
                param.webUserPhone = data.mobile
                resolve(param)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    sendCssHttpRequestWrapper(url, params, options) {
        return new Promise((resolve, reject) => {
            this.getCssRequestCommonParam().then((commonParam) => {
                let requestBody = Object.assign({}, commonParam, params)
                if (cssRrequestSendWithApp) {
                    let requestOption = Object.assign({ method: "POST", isShowLoading: true, isWrapWithBody: true }, options)
                    let requestParam = {
                        method: requestOption.method,
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        data: requestOption.isWrapWithBody ? { "body": requestBody } : requestBody
                    }
                    this.sendCentralCloundRequest(url, requestParam, requestOption).then((resp) => {
                        //CSS成功：resp.status ， CSS技术组成功：resp.code
                        if (resp.status || resp.code == 0) {
                            resolve(resp)
                        } else {
                            reject(resp)
                        }
                    }).catch((error) => {
                        reject(error)
                    })
                } else {
                    let requestOption = Object.assign({ method: "POST", isShowLoading: true, isWrapWithBody: true }, options)
                    let requestParam = {
                        url: url,
                        type: 'json',
                        method: requestOption.method,
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify(requestOption.isWrapWithBody ? { "body": requestBody } : requestBody)
                    }
                    this.sendHttpRequest(requestParam, requestOption).then((resp) => {
                        //CSS成功：resp.status ， CSS技术组成功：resp.code
                        if (resp.status || resp.code == 0) {
                            resolve(resp)
                        } else {
                            reject(resp)
                        }
                    }).catch((error) => {
                        reject(error)
                    })
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    queryserviceorder(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.queryserviceorder, param, options)
    },
    createserviceorder(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.createserviceorder, param, options)
    },
    queryserviceuserdemanddispatch(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.queryserviceuserdemanddispatch, param, options)
    },
    queryservicereqsrvprod(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.queryservicereqsrvprod, param, options)
    },
    createserviceuserdemand(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.createserviceuserdemand, param, options)
    },
    cancelserviceorder(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.cancelserviceorder, param, options)
    },
    extractcallbackitem(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.extractcallbackitem, param, options)
    },
    createcallbackinfo(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.createcallbackinfo, param, options)
    },
    queryconsumerorderprogress(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.queryconsumerorderprogress, param, options)
    },
    queryservicerequireproduct(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.queryservicerequireproduct, param, options)
    },
    getexcludedfaultlist(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.getexcludedfaultlist, param, options)
    },
    appexcludedfaulttraces(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.appexcludedfaulttraces, param, options)
    },
    queryunitarchives(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.queryunitarchives, param, options)
    },
    querywarrantydescbycodeorsn(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.querywarrantydescbycodeorsn, param, options)
    },
    createchargeinfo(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.createchargeinfo, param, options)
    },
    dochargecomfirm(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.dochargecomfirm, param, options)
    },
    querychargedetails(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.querychargedetails, param, options)
    },
    querychargestatus(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.querychargestatus, param, options)
    },
    queryproductinfobysn(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.queryproductinfobysn, param, options)
    },

    // CSS 接口： 技术组提供
    getChargeStandardList(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.getChargeStandardList, param, options)
    },
    getChargePriceForMaterial(param = {}, options = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.getChargePriceForMaterial, param, options)
    },

    //** 中控后台服务 start **/
    getRequestCommonParam() {
        return new Promise((resolve, reject) => {
            let param = {
                plugin_version: appConfig.plugin_version || '0.0.1',
                sourceSys: "APP",
                tm: Math.round(new Date().getTime() / 1000) //时间戳
            }
            resolve(param)
        })
    },
    sendControlHttpRequestWrapper(url, params, options) {
        return new Promise((resolve, reject) => {
            this.getRequestCommonParam().then((commonParam) => {
                if (requestSendWithApp) {
                    let requestOption = Object.assign({ method: "POST", isShowLoading: true }, options)
                    let requestParam = {
                        method: requestOption.method,
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        }
                    }
                    if (requestOption.method != "GET") {
                        requestParam.data = Object.assign({}, commonParam, params)
                    } else {
                        requestParam.data = {}
                    }
                    this.sendCentralCloundRequest(url, requestParam, requestOption).then((resp) => {
                        if (resp.code == 0) {
                            resolve(resp)
                        } else {
                            reject(resp)
                        }
                    }).catch((error) => {
                        reject(error)
                    })
                } else {
                    let requestOption = Object.assign({ method: "POST", isShowLoading: true, isValidate: false }, options)
                    if (!withoutAPPWithMAS) {
                        url = url + (url.indexOf("?") > -1 ? "&" : "?") + "appKey=e13fd74579ef4ab4a77218e787812096&secret=068bd15122f648e58e360c2271892220"
                    }
                    let requestParam = {
                        url: url,
                        method: requestOption.method || "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: Object.assign({}, commonParam, params)
                    }
                    this.sendHttpRequest(requestParam, requestOption).then((resp) => {
                        if (resp.code == 0) {
                            resolve(resp)
                        } else {
                            reject(resp)
                        }
                    }).catch((error) => {
                        reject(error)
                    })
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    proceedProductData(productData) {
        //把品牌信息写入产品Object, 以便做唯一匹配
        let result = productData || []
        for (let brandIndex = 0; brandIndex < result.length; brandIndex++) {
            const brandItem = result[brandIndex]
            if (brandItem.productTypeDTOList) {
                for (let categaryIndex = 0; categaryIndex < brandItem.productTypeDTOList.length; categaryIndex++) {
                    let categaryItem = brandItem.productTypeDTOList[categaryIndex]
                    categaryItem.isShowImage = (categaryIndex > 3 ? false : true)
                    if (categaryItem.children) {
                        for (let productIndex = 0; productIndex < categaryItem.children.length; productIndex++) {
                            categaryItem.children[productIndex].brandCode = brandItem.brandCode
                            categaryItem.children[productIndex].brand = brandItem.brand
                        }
                    }
                }
            }
        }
        return result
    },
    getProdTypeForInstallation(param = {}) {
        return new Promise((resolve, reject) => {
            let result
            this.getItem(SERVICE_STORAGE_KEYS.productTypeForInstallation, (resp) => {
                if (resp.result == 'success' && JSON.parse(resp.data).length > 0) {
                    result = JSON.parse(resp.data)
                    resolve(result)
                } else {
                    let url = this.serviceList.getProdType + (requestSendWithApp || withoutAPPWithMAS ? '&' : '?') + this.objectToQuery(param)
                    this.sendControlHttpRequestWrapper(url, {}).then((resp) => {
                        if (resp && resp.code == 0) {
                            result = this.proceedProductData(resp.data)
                            this.setItem(SERVICE_STORAGE_KEYS.productTypeForInstallation, JSON.stringify(result), () => {
                                resolve(result)
                            })
                        } else {
                            reject(resp)
                        }
                    }).catch((error) => {
                        reject(error)
                    })
                }
            })
        })
    },
    getProdType(param = {}) {
        return new Promise((resolve, reject) => {
            let result
            this.getItem(SERVICE_STORAGE_KEYS.productType, (resp) => {
                if (resp.result == 'success' && JSON.parse(resp.data).length > 0) {
                    result = JSON.parse(resp.data)
                    resolve(result)
                } else {
                    let url = this.serviceList.getProdType + (requestSendWithApp || withoutAPPWithMAS ? '&' : '?') + this.objectToQuery(param)
                    this.sendControlHttpRequestWrapper(url, {}).then((resp) => {
                        if (resp && resp.code == 0) {
                            result = this.proceedProductData(resp.data)
                            this.setItem(SERVICE_STORAGE_KEYS.productType, JSON.stringify(result), () => {
                                resolve(result)
                            })
                        } else {
                            reject(resp)
                        }
                    }).catch((error) => {
                        reject(error)
                    })
                }
            })
        })
    },

    getProdMessage(param = {}, options = {}) {
        let url = this.serviceList.getProdMessage + (requestSendWithApp || withoutAPPWithMAS ? '&' : '?') + this.objectToQuery(param)
        return this.sendControlHttpRequestWrapper(url, {})
    },
    getUserProductPageList(param = {}, options = {}) {
        return this.sendControlHttpRequestWrapper(this.serviceList.getUserProductPageList, param, options)
    },
    getProductBySerialNo(param = {}, options = {}) {
        return this.sendControlHttpRequestWrapper(this.serviceList.getProductBySerialNo, param, options)
    },
    getUserAddrPageList(param = {}, options = {}) {
        return this.sendControlHttpRequestWrapper(this.serviceList.getUserAddrPageList, param, options)
    },
    getDefaultAddr(param = {}, options = {}) {
        return this.sendControlHttpRequestWrapper(this.serviceList.getDefaultAddr, param, options)
    },
    getAreaList(param = {}, options = {}) {
        let url = this.serviceList.getAreaList + (requestSendWithApp || withoutAPPWithMAS ? '&' : '?') + this.objectToQuery(param)
        return this.sendControlHttpRequestWrapper(url, {}, { method: "GET" })
    },
    userAddrAdd(param = {}, options = {}) {
        return this.sendControlHttpRequestWrapper(this.serviceList.userAddrAdd, param, options)
    },
    userAddrUpdate(param = {}, options = {}) {
        return this.sendControlHttpRequestWrapper(this.serviceList.userAddrUpdate, param, options)
    },
    userAddrDelete(param = {}, options = {}) {
        return this.sendControlHttpRequestWrapper(this.serviceList.userAddrDelete, param, options)
    },

    //防伪
    antiFakeQuery(param = {}) {
        return new Promise((resolve, reject) => {
            let url = HOST_antiFake + "?" + this.objectToQueryWithEncode(Object.assign({
                "function": "AntiFakeQuery",
                "CorpID": 14500,
                "QueryType": 2
            }, param))
            let params = {
                method: 'GET',
                url: url,
                type: 'json',
                headers: { 'Content-Type': 'application/json' }
            }
            nativeService.sendHttpRequest(params).then(
                (resp) => {
                    resolve(resp)
                }
            ).catch((error) => {
                reject(error)
            })
        })
    },
    antiValidateCode() {
        return new Promise((resolve, reject) => {
            let url = ("http://wap.cjm.so/Common/ValidateCode.ashx?Type=&Demand=base64&w=&h=&r=" + Math.random().toString().replace('.', ''))
            let params = {
                method: 'GET',
                url: url,
                type: 'json',
                headers: { 'Content-Type': 'application/json' }
            }
            // weex.requireModule('stream').fetch(params, (resp) => {
            //     resolve(resp)
            // })
            nativeService.sendHttpRequest(params).then(
                (resp) => {
                    resolve(resp)
                }
            ).catch((error) => {
                reject(error)
            })
        })
    },


    //扫描条形/二维码
    convertScanResult(scanResult) {
        let scanResultObj = {
            code: '',
            type: ''
        }
        if (scanResult.indexOf(",") != -1) {
            // 扫条形码，可能会带'ITF,xxxxxxx', 截取后半部
            let tmp = scanResult.split(",")
            scanResultObj.code = tmp.length === 1 ? tmp[0] : tmp[1]
            scanResultObj.type = '60'
        } else if (util.getParameters(scanResult, "tsn")) {
            //二维码
            scanResultObj.code = util.getParameters(scanResult, "tsn")
            scanResultObj.type = '0'
        } else {
            // 扫条形码
            scanResultObj.code = scanResult
            scanResultObj.type = '60'
        }
        return scanResultObj
    },
    /* 
    高德、腾讯、图灵、阿里地图等都是 GCJ - 02坐标系（也称火星坐标系）,而百度则使用BD-09坐标系。
    */
    //GCJ-02(火星)转BD-09（百度地图）
    mapabcEncryptToBdmap(gg_lat, gg_lon) {
        var point = new Object();
        var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        var x = new Number(gg_lon);
        var y = new Number(gg_lat);
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
        var bd_lon = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        point.lng = bd_lon;
        point.lat = bd_lat;
        return point;
    },
    //根据经纬度计算距离
    Rad(d) {
        return d * Math.PI / 180.0;
    },

    distanceByLnglat(lng1, lat1, lng2, lat2) {
        var radLat1 = this.Rad(lat1);
        var radLat2 = this.Rad(lat2);
        var a = radLat1 - radLat2;
        var b = this.Rad(lng1) - this.Rad(lng2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378137.0;// 取WGS84标准参考椭球中的地球长半径(单位:m)
        // s = Math.round(s * 10000) / 10000;
        s = Math.round(s)
        return s
        // //下面为两点间空间距离（非球面体）
        // var value= Math.pow(Math.pow(lng1-lng2,2)+Math.pow(lat1-lat2,2),1/2);
        // alert(value);
    }
})

export default customizeNativeService