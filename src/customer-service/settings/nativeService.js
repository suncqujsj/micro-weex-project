import nativeService from '@/common/services/nativeService'
import util from '@/common/util/util'
import { SERVICE_STORAGE_KEYS } from './globalKeys'
const requestSendWithApp = true
const HOST_CSS = requestSendWithApp ? '' : "http://csuat.midea.com"
const HOST_CENTER_APP = requestSendWithApp ? '' : "http://10.16.38.95:8080"
const HOST_CENTER = requestSendWithApp ? '' : "http://10.16.85.47"
const HOST_antiFake = "http://wap.cjm.so/Common/DataService.ashx"

let customizeNativeService = Object.assign(nativeService, {
    isDummy: false,
    serviceList: {
        //CSS 客服消息
        queryserviceorder: HOST_CSS + "/c-css-ipms/api/wom/order/queryserviceorder", //客服-CSS-用户服务工单列表查询
        createserviceorder: HOST_CSS + "/c-css-ipms/api/wom/order/createserviceorder", //客服-CSS-用户报装、报修、洗悦家服务请求
        queryserviceuserdemanddispatch: HOST_CSS + "/c-css-ipms/api/wom/order/queryserviceuserdemanddispatch", //客服-CSS-用户服务工单详情进度查询
        queryservicereqsrvprod: HOST_CSS + "/c-css-ipms/api/wom/order/queryservicereqsrvprod", //客服-CSS-催单原因列表接口
        createserviceuserdemand: HOST_CSS + "/c-css-ipms/api/wom/order/createserviceuserdemand", //客服-CSS-催单CSS信息单
        cancelserviceorder: HOST_CSS + "/c-css-ipms/api/wom/order/cancelserviceorder", //客服-CSS-取消售后工单
        extractcallbackitem: HOST_CSS + "/c-css-ipms/api/wom/order/extractcallbackitem", //客服-CSS-回访问卷抽取
        createcallbackinfo: HOST_CSS + "/c-css-ipms/api/wom/order/createcallbackinfo", //客服-CSS-回访结果提交
        queryconsumerorderprogress: HOST_CSS + "/c-css-ipms/api/wom/order/queryconsumerorderprogress", //客服-CSS-用户服务单服务过程列表查询接口
        queryservicerequireproduct: HOST_CSS + "/c-css-ipms/api/wom/order/queryservicerequireproduct", //客服-CSS-服务请求查询接口
        getexcludedfaultlist: HOST_CSS + "/c-css-ipms/cssmobile/api/wom/getexcludedfaultlist", //客服-CSS-故障可能原因查询
        appexcludedfaulttraces: HOST_CSS + "/c-css-ipms/cssmobile/api/wom/appexcludedfaulttraces", //客服-CSS-假性故障有帮助没帮助标识接口
        queryunitarchives: HOST_CSS + "/c-css-ipms/api/wom/order/queryunitarchives", //客服-CSS-网点查询
        getChargeStandardList: HOST_CSS + "/c-css-ipms/css/api/mmp/insp/getChargeStandardList", //客服-CSS-收费标准查询
        querywarrantydescbycodeorsn: HOST_CSS + "/c-css-ipms/api/wom/order/querywarrantydescbycodeorsn", //客服-CSS-包修政策查询接口
        getChargePriceForMaterial: HOST_CSS + "/c-css-ipms/css/api/mmp/insp/getChargePriceForMaterial", //客服-CSS-配件价格查询


        //中控消息
        getProdType: HOST_CENTER_APP + "/pdgw-ap/message/getProdType", //客服-中控-产品列表
        getProdMessage: HOST_CENTER_APP + "/pdgw-ap/message/getProdMessage", //客服-中控-获取售后产品资料对外服务接口

        getUserProductPageList: HOST_CENTER + "/ccrm2-core/userProduct/getUserProductPageList", //客服-中控-获取家电列表
        getAreaList: HOST_CENTER + "/cmms/area/list", //客服-中控-服务地区
        getUserAddrPageList: HOST_CENTER + "/ccrm2-core/userAddr/getUserAddrPageList", //客服-中控-地址列表查询
        getDefaultAddr: HOST_CENTER + "/ccrm2-core/userAddr/getDefaultAddr", //客服-中控-获取默认地址
        userAddrAdd: HOST_CENTER + "/ccrm2-core/userAddr/add", //客服-中控-地址新增
        userAddrUpdate: HOST_CENTER + "/ccrm2-core/userAddr/update", //客服-中控-地址修改
        userAddrDelete: HOST_CENTER + "/ccrm2-core/userAddr/delete", //客服-中控-地址删除
    },
    userInfo: null,
    objectToQuery(obj) {
        return Object.keys(obj).map(k =>
            encodeURIComponent(k) + '=' + encodeURIComponent(obj[k] || '')
        ).join('&')
    },
    getErrorMessage(error) {
        let msg
        if (error) {
            msg = error.msg || error.errorMsg || error.returnMsg || "请求失败，请稍后重试。"
        } else {
            msg = "请求失败，请稍后重试。"
        }
        if (error.code) {
            msg += "(" + error.code + ")"
        } else if (error.errorCode) {
            msg += "(" + error.errorCode + ")"
        }
        return msg
    },

    // CSS 接口
    getCssRequestCommonParam() {
        return new Promise((resolve, reject) => {
            let param = {
                interfaceSource: "SMART"
            }
            if (this.userInfo) {
                param.webUserCode = this.userInfo.uid //"oFtQywGHyqrWbDvjVdRTeR9Ig3m0"
                param.webUserPhone = this.userInfo.mobile
                resolve(param)
            } else {
                this.getUserInfo().then((data) => {
                    this.userInfo = data || {}
                    this.getCssRequestCommonParam().then((resp) => {
                        resolve(resp)
                    })
                })
            }
        })
    },
    sendCssHttpRequestWrapper(url, params, options) {
        return new Promise((resolve, reject) => {
            this.getCssRequestCommonParam().then((commonParam) => {
                if (requestSendWithApp) {
                    let requestOption = Object.assign({ method: "POST", isShowLoading: !true }, options)
                    let requestParam = {
                        method: requestOption.method || "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        data: { json: JSON.stringify({ "body": Object.assign({}, commonParam, params) }) }
                    }
                    this.sendCentralCloundRequest(url, requestParam, requestOption).then((resp) => {
                        if (resp.status) {
                            resolve(resp)
                        } else {
                            reject(resp)
                        }
                    }).catch((error) => {
                        reject(error)
                    })
                } else {
                    let requestOption = Object.assign({ method: "POST", isShowLoading: true }, options)
                    let requestParam = {
                        url: url,
                        type: 'json',
                        method: requestOption.method || "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body: { "json": Object.assign({}, commonParam, params) }
                    }
                    this.sendHttpRequest(requestParam, requestOption).then((resp) => {
                        if (resp.status) {
                            resolve(resp)
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
    queryserviceorder(param = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.queryserviceorder, param)
    },
    createserviceorder(param = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.createserviceorder, param)
    },
    queryserviceuserdemanddispatch(param = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.queryserviceuserdemanddispatch, param)
    },
    queryservicereqsrvprod(param = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.queryservicereqsrvprod, param)
    },
    createserviceuserdemand(param = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.createserviceuserdemand, param)
    },
    cancelserviceorder(param = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.cancelserviceorder, param)
    },
    extractcallbackitem(param = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.extractcallbackitem, param)
    },
    createcallbackinfo(param = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.createcallbackinfo, param)
    },
    queryconsumerorderprogress(param = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.queryconsumerorderprogress, param)
    },
    queryservicerequireproduct(param = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.queryservicerequireproduct, param)
    },
    getexcludedfaultlist(param = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.getexcludedfaultlist, param)
    },
    appexcludedfaulttraces(param = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.appexcludedfaulttraces, param)
    },
    queryunitarchives(param = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.queryunitarchives, param)
    },
    querywarrantydescbycodeorsn(param = {}) {
        return this.sendCssHttpRequestWrapper(this.serviceList.querywarrantydescbycodeorsn, param)
    },

    // CSS 接口： 技术组提供
    sendCssTechHttpRequestWrapper(url, params, options) {
        return new Promise((resolve, reject) => {
            if (requestSendWithApp) {
                let requestOption = Object.assign({ method: "POST", isShowLoading: true }, options)
                let requestParam = {
                    method: requestOption.method || "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    data: params
                }
                this.sendCentralCloundRequest(url, requestParam, requestOption).then((resp) => {
                    if (resp.status) {
                        resolve(resp)
                    } else {
                        reject(resp)
                    }
                }).catch((error) => {
                    reject(error)
                })
            } else {
                let requestOption = Object.assign({ method: "POST", isShowLoading: true, isValidate: false }, options)
                let requestParam = {
                    url: url,
                    type: 'json',
                    method: requestOption.method || "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(params)
                }
                this.sendHttpRequest(requestParam, requestOption).then((resp) => {
                    if (resp.returnStatus) {
                        resolve(resp)
                    } else {
                        reject(resp)
                    }
                }).catch((error) => {
                    reject(error)
                })
            }
        })
    },
    getChargeStandardList(param = {}) {
        let url = this.serviceList.getChargeStandardList + "?" + this.objectToQuery(param)
        return this.sendCssTechHttpRequestWrapper(url)
    },

    getChargePriceForMaterial(param = {}) {
        let url = this.serviceList.getChargePriceForMaterial + "?" + this.objectToQuery(param)
        return this.sendCssTechHttpRequestWrapper(url)
    },

    //** 中控后台服务 start **/
    getRequestCommonParam() {
        return new Promise((resolve, reject) => {
            let param = {
                sourceSys: "APP"
            }
            if (this.userInfo) {
                param.uid = this.userInfo.uid //"2a58bb9810b3462b80e6d42c142441f8"
                resolve(param)
            } else {
                this.getUserInfo().then((data) => {
                    this.userInfo = data || {}
                    this.getRequestCommonParam().then((resp) => {
                        resolve(resp)
                    })
                })
            }
        })
    },
    sendControlHttpRequestWrapper(url, params, options) {
        return new Promise((resolve, reject) => {
            this.getRequestCommonParam().then((commonParam) => {
                if (requestSendWithApp) {
                    let requestOption = Object.assign({ method: "POST", isShowLoading: true }, options)
                    let requestParam = {
                        method: requestOption.method || "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        data: Object.assign({}, commonParam, params)
                    }
                    this.sendCentralCloundRequest(url, requestParam, requestOption).then((resp) => {
                        resolve(resp)
                    }).catch((error) => {
                        reject(error)
                    })
                } else {
                    let requestOption = Object.assign({ method: "POST", isShowLoading: true, isValidate: false }, options)
                    let requestParam = {
                        url: url + (url.indexOf("?") > -1 ? "&" : "?") + "appKey=c8c35003cc4c408581043baad45bce5b&secret=0dc6fe93a8154fcaab629353ab800bb4",
                        method: requestOption.method || "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: Object.assign({}, commonParam, params)
                    }
                    this.sendHttpRequest(requestParam, requestOption).then((resp) => {
                        resolve(resp)
                    }).catch((error) => {
                        reject(error)
                    })
                }
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
                    let url = this.serviceList.getProdType + (requestSendWithApp ? '&' : '?') + this.objectToQuery(param)
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
                    let url = this.serviceList.getProdType + (requestSendWithApp ? '&' : '?') + this.objectToQuery(param)
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

    getProdMessage(param = {}) {
        let url = this.serviceList.getProdMessage + (requestSendWithApp ? '&' : '?') + this.objectToQuery(param)
        return this.sendControlHttpRequestWrapper(url, {})
    },
    getUserProductPageList(param = {}) {
        return this.sendControlHttpRequestWrapper(this.serviceList.getUserProductPageList, param)
    },
    getUserAddrPageList(param = {}) {
        return this.sendControlHttpRequestWrapper(this.serviceList.getUserAddrPageList, param)
    },
    getDefaultAddr(param = {}) {
        return this.sendControlHttpRequestWrapper(this.serviceList.getDefaultAddr, param)
    },
    getAreaList(param = {}) {
        return this.sendControlHttpRequestWrapper(this.serviceList.getAreaList, param, { method: "GET" })
    },
    userAddrAdd(param = {}) {
        return this.sendControlHttpRequestWrapper(this.serviceList.userAddrAdd, param)
    },
    userAddrUpdate(param = {}) {
        return this.sendControlHttpRequestWrapper(this.serviceList.userAddrUpdate, param)
    },
    userAddrDelete(param = {}) {
        return this.sendControlHttpRequestWrapper(this.serviceList.userAddrDelete, param)
    },

    //防伪
    antiFakeQuery(param = {}) {
        return new Promise((resolve, reject) => {
            let url = HOST_antiFake + "?" + this.objectToQuery(Object.assign({
                "function": "AntiFakeQuery",
                "CorpID": 14500,
                "QueryType": 2
            }, param))
            let params = {
                method: 'GET',
                url: url,
                type: 'jsonp',
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


    //扫描条形/二维码
    scanServiceCode() {
        return new Promise((resolve, reject) => {
            nativeService.scanCode().then(
                (resp) => {
                    this.toast(resp)
                    if (resp.status == 0) {
                        let scanResult = resp.data || resp.code
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
                        resolve(scanResultObj)
                    }
                }
            )
        })
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