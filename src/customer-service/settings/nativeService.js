import nativeService from '@/common/services/nativeService'
import { SERVICE_STORAGE_KEYS } from './globalKeys'

const HOST_CSS = "http://csuat.midea.com"
const HOST_CSS_WX = "http://weixincs.midea.com"
const HOST_CENTER = "http://10.16.85.47"

let customizeNativeService = Object.assign(nativeService, {
    serviceList: {
        createserviceorder: HOST_CSS + "/c-css-ipms/api/wom/order/createserviceorder", //用户报装、报修、洗悦家服务请求
        queryserviceorder: HOST_CSS + "/c-css-ipms/api/wom/order/queryserviceorder", //用户服务工单列表查询
        queryserviceuserdemanddispatch: HOST_CSS + "/c-css-ipms/api/wom/order/queryserviceuserdemanddispatch", //用户服务工单详情进度查询
        createserviceuserdemand: HOST_CSS + "/c-css-ipms/api/wom/order/createserviceuserdemand", //催单CSS信息单
        cancelserviceorder: HOST_CSS + "/c-css-ipms/api/wom/order/cancelserviceorder", //取消售后工单
        queryconsumerorderprogress: HOST_CSS + "/c-css-ipms/api/wom/order/queryconsumerorderprogress", //用户服务单服务过程列表查询接口
        queryservicerequireproduct: HOST_CSS + "/c-css-ipms/api/wom/order/queryservicerequireproduct", //服务请求查询接口
        querywarrantydescbycodeorsn: HOST_CSS + "/c-css-ipms/api/wom/order/querywarrantydescbycodeorsn", //包修政策查询接口
        getChargeStandardList: HOST_CSS + "/c-css-ipms/css/api/mmp/insp/getChargeStandardList", //收费标准查询
        getChargePriceForMaterial: HOST_CSS + "/c-css-ipms/css/api/mmp/insp/getChargePriceForMaterial", //配件价格查询
        queryunitarchives: HOST_CSS + "/c-css-ipms/api/wom/order/queryunitarchives", //网点查询

        getFaultType: HOST_CSS_WX + "/wxgw/css/faultType?mpType=MIDEASERVICE", //故障类型
        getExcludedFault: HOST_CSS_WX + "/wxgw/css/excludedFault?mpType=MIDEASERVICE", //故障可能原因查询
        queryReminderOptions: HOST_CSS_WX + "/wxgw/css/queryReminderOptions?mpType=MIDEASERVICE", //查询催单原因列表: TODO: url要修改

        //中控消息
        getProdType: "http://10.16.38.95:8080/pdgw-ap/message/getProdType", //产品列表
        getProdMessage: "http://10.16.38.95:8080/pdgw-ap/message/getProdMessage", //获取售后产品资料对外服务接口
        getUserAddrPageList: HOST_CENTER + "/ccrm2-core/userAddr/getUserAddrPageList", //地址列表查询
        getAreaList: HOST_CENTER + "/cmms/area/list", //服务地区
        userAddrAdd: HOST_CENTER + "/ccrm2-core/userAddr/add", //地址新增
        userAddrUpdate: HOST_CENTER + "/ccrm2-core/userAddr/update", //地址修改
        userAddrDelete: HOST_CENTER + "/ccrm2-core/userAddr/delete", //地址删除
        setDefaultAddr: HOST_CENTER + "/ccrm2-core/userAddr/defaultAddr", //设置默认地址
    },
    userInfo: null,
    getCssErrorMessage(error) {
        let msg = error.errorMsg || error.returnMsg || "请求失败，请稍后重试。"
        if (error.errorCode) {
            msg += "(" + error.errorCode + ")"
        }
        return msg
    },
    getCssRequestCommonParam() {
        return new Promise((resolve, reject) => {
            let param = {
                interfaceSource: "SMART" //MMJYWX
            }
            if (this.userInfo) {
                param.webUserCode = "oFtQywGHyqrWbDvjVdRTeR9Ig3m0" //this.userInfo.uid
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
    sendHttpRequestCssWrapper(params, options = { isShowLoading: true, isValidate: false }) {
        return new Promise((resolve, reject) => {
            this.getCssRequestCommonParam().then((commonParam) => {
                let requestParam = {
                    url: params.url + "?json=" + JSON.stringify({ "body": Object.assign(commonParam, params.body) }),
                    method: params.method || "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                let oldDummy = this.isDummy
                this.isDummy = false
                this.sendHttpRequest(requestParam, options).then((resp) => {
                    this.isDummy = oldDummy
                    resolve(resp)
                }).catch((error) => {
                    this.isDummy = oldDummy
                    reject(error)
                })
            })
        })
    },
    createserviceorder(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: this.serviceList.createserviceorder,
                method: "POST",
                body: param
            }
            this.sendHttpRequestCssWrapper(requestParam).then((resp) => {
                if (resp.status) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    queryserviceorder(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: this.serviceList.queryserviceorder,
                method: "POST",
                body: param
            }
            this.sendHttpRequestCssWrapper(requestParam).then((resp) => {
                if (resp.status) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    queryserviceuserdemanddispatch(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: this.serviceList.queryserviceuserdemanddispatch,
                method: "POST",
                body: param
            }
            this.sendHttpRequestCssWrapper(requestParam).then((resp) => {
                if (resp.status) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    createserviceuserdemand(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: this.serviceList.createserviceuserdemand,
                method: "POST",
                body: param
            }
            this.sendHttpRequestCssWrapper(requestParam).then((resp) => {
                if (resp.status) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    queryReminderOptions(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: this.serviceList.queryReminderOptions,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: param
            }
            let oldDummy = this.isDummy
            this.isDummy = false
            this.sendHttpRequest(requestParam).then((resp) => {
                this.isDummy = oldDummy
                if (resp.code) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                this.isDummy = oldDummy
                reject(error)
            })
        })
    },
    cancelserviceorder(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: this.serviceList.cancelserviceorder,
                method: "POST",
                body: param
            }
            this.sendHttpRequestCssWrapper(requestParam).then((resp) => {
                if (resp.status) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    queryconsumerorderprogress(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: this.serviceList.queryconsumerorderprogress,
                method: "POST",
                body: param
            }
            this.sendHttpRequestCssWrapper(requestParam).then((resp) => {
                if (resp.status) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    queryservicerequireproduct(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: this.serviceList.queryservicerequireproduct,
                method: "POST",
                body: param
            }
            this.sendHttpRequestCssWrapper(requestParam).then((resp) => {
                if (resp.status) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },

    getFaultType(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: this.serviceList.getFaultType,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: param
            }
            let oldDummy = this.isDummy
            this.isDummy = false
            this.sendHttpRequest(requestParam).then((resp) => {
                this.isDummy = oldDummy
                if (resp.code) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                this.isDummy = oldDummy
                reject(error)
            })
        })
    },
    getExcludedFault(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: this.serviceList.getExcludedFault,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: param
            }
            let oldDummy = this.isDummy
            this.isDummy = false
            this.sendHttpRequest(requestParam).then((resp) => {
                this.isDummy = oldDummy
                if (resp.code) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                this.isDummy = oldDummy
                reject(error)
            })
        })
    },
    getChargeStandardList(param = {}) {
        return new Promise((resolve, reject) => {
            let url = this.serviceList.getChargeStandardList + "?"
            for (const key in param) {
                if (param.hasOwnProperty(key)) {
                    url += key + "=" + param[key] + "&"
                }
            }
            let requestParam = {
                url: url,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            let oldDummy = this.isDummy
            this.isDummy = false
            this.sendHttpRequest(requestParam).then((resp) => {
                this.isDummy = oldDummy
                if (resp.returnStatus) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                this.isDummy = oldDummy
                reject(error)
            })
        })
    },
    getChargePriceForMaterial(param = {}) {
        return new Promise((resolve, reject) => {
            let url = this.serviceList.getChargePriceForMaterial + "?"
            for (const key in param) {
                if (param.hasOwnProperty(key)) {
                    url += key + "=" + param[key] + "&"
                }
            }
            let requestParam = {
                url: url,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            let oldDummy = this.isDummy
            this.isDummy = false
            this.sendHttpRequest(requestParam).then((resp) => {
                this.isDummy = oldDummy
                if (resp.returnStatus) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                this.isDummy = oldDummy
                reject(error)
            })
        })
    },

    queryunitarchives(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: this.serviceList.queryunitarchives,
                method: "POST",
                body: param
            }
            this.sendHttpRequestCssWrapper(requestParam).then((resp) => {
                if (resp.status) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    querywarrantydescbycodeorsn(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: this.serviceList.querywarrantydescbycodeorsn,
                method: "POST",
                body: param
            }
            this.sendHttpRequestCssWrapper(requestParam).then((resp) => {
                if (resp.status) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },

    //** 中控后台服务 start **/
    getRequestCommonParam() {
        return new Promise((resolve, reject) => {
            let param = {
                sourceSys: "APP"
            }
            if (this.userInfo) {
                param.uid = "2a58bb9810b3462b80e6d42c142441f8" //this.userInfo.userId
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
    sendHttpRequestWrapper(params, options = { isShowLoading: true, isValidate: false }) {
        return new Promise((resolve, reject) => {
            this.getRequestCommonParam().then((commonParam) => {
                let requestParam = {
                    url: params.url,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: Object.assign(commonParam, params.body)
                }
                let oldDummy = this.isDummy
                this.isDummy = false
                this.sendHttpRequest(requestParam, options).then((resp) => {
                    this.isDummy = oldDummy
                    resolve(resp)
                }).catch((error) => {
                    this.isDummy = oldDummy
                    reject(error)
                })
            })
        })
    },
    getProdTypeForInstallation(param = {}) {
        return new Promise((resolve, reject) => {
            let result
            this.getItem(SERVICE_STORAGE_KEYS.productTypeForInstallation, (resp) => {
                if (resp.result == 'success' && JSON.parse(resp.data).length > 0) {
                    result = JSON.parse(resp.data)
                    resolve(result)
                } else {
                    let queryStringObj = Object.assign({
                        sourceSys: "APP",
                        version: "1.0",
                        codeType: "bzbx"
                    }, param)
                    let queryString = Object.keys(queryStringObj).map(k =>
                        encodeURIComponent(k) + '=' + encodeURIComponent(queryStringObj[k] || '')
                    ).join('&')
                    let requestParam = {
                        url: this.serviceList.getProdType + '?' + queryString,
                        method: "GET"
                    }
                    this.sendHttpRequestWrapper(requestParam).then((resp) => {
                        result = this.proceedProductData(resp.data)
                        this.setItem(SERVICE_STORAGE_KEYS.productTypeForInstallation, JSON.stringify(result), () => {
                            resolve(result)
                        })
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
                    let queryStringObj = Object.assign({
                        sourceSys: "APP",
                        version: "1.0",
                        codeType: ""
                    }, param)
                    let queryString = Object.keys(queryStringObj).map(k =>
                        encodeURIComponent(k) + '=' + encodeURIComponent(queryStringObj[k] || '')
                    ).join('&')
                    let requestParam = {
                        url: this.serviceList.getProdType + '?' + queryString,
                        method: "GET"
                    }
                    this.sendHttpRequestWrapper(requestParam).then((resp) => {
                        result = this.proceedProductData(resp.data)
                        this.setItem(SERVICE_STORAGE_KEYS.productType, JSON.stringify(result), () => {
                            resolve(result)
                        })
                    }).catch((error) => {
                        reject(error)
                    })
                }
            })
        })
    },
    proceedProductData(productData) {
        //把品牌信息写入产品Object, 以便做唯一匹配
        let result = productData
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

    getProdMessage(param = {}) {
        return new Promise((resolve, reject) => {
            this.getRequestCommonParam().then((commonParam) => {
                let requestParam = {
                    url: this.serviceList.getProdMessage,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: Object.assign(commonParam, {
                        version: "3.0",
                        sourceTag: "3"
                    }, param)
                }
                let oldDummy = this.isDummy
                this.isDummy = false
                this.sendHttpRequest(requestParam, { isValidate: false }).then((resp) => {
                    this.isDummy = oldDummy
                    resolve(resp)
                }).catch((error) => {
                    this.isDummy = oldDummy
                    reject(error)
                })
            })
        })
    },
    getUserAddrPageList(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: this.serviceList.getUserAddrPageList + "?appKey=c8c35003cc4c408581043baad45bce5b&secret=0dc6fe93a8154fcaab629353ab800bb4",
                method: "GET",
                body: Object.assign({
                }, param)
            }
            this.sendHttpRequestWrapper(requestParam).then((resp) => {
                resolve(resp)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    getAreaListCache(param = { regionCode: "0" }) {
        return new Promise((resolve, reject) => {
            let result
            this.getItem(SERVICE_STORAGE_KEYS.areaList, (data) => {
                let cacheObj = {}
                if (data.result == 'success' && data.data) {
                    try {
                        cacheObj = JSON.parse(data.data)
                        result = cacheObj[param.regionCode]
                    } catch (error) { }
                }

                if (result) {
                    resolve(result)
                } else {
                    this.getAreaList(param).then((resp) => {
                        cacheObj[param.regionCode] = resp
                        this.setItem(SERVICE_STORAGE_KEYS.areaList, JSON.stringify(cacheObj), () => {
                            resolve(resp)
                        })
                    }).catch((error) => {
                        reject(error)
                    })
                }
            })
        })
    },
    getAreaList(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: this.serviceList.getAreaList,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                body: Object.assign({
                    regionCode: "0"
                }, param)
            }
            let oldDummy = this.isDummy
            this.isDummy = false
            this.sendHttpRequest(requestParam, { isValidate: false }).then((resp) => {
                this.isDummy = oldDummy
                if (resp.code == 0) {
                    resolve(resp.content)
                } else {
                    reject(resp)
                }
            }).catch((error) => {
                this.isDummy = oldDummy
                reject(error)
            })
        })
    },

    userAddrAdd(param = {}) {
        return new Promise((resolve, reject) => {
            this.getRequestCommonParam().then((commonParam) => {
                let requestParam = {
                    url: this.serviceList.userAddrAdd + "?appKey=c8c35003cc4c408581043baad45bce5b&secret=0dc6fe93a8154fcaab629353ab800bb4",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: Object.assign(commonParam, param)
                }
                let oldDummy = this.isDummy
                this.isDummy = false
                this.sendHttpRequest(requestParam, { isValidate: false }).then((resp) => {
                    this.isDummy = oldDummy
                    resolve(resp)
                }).catch((error) => {
                    this.isDummy = oldDummy
                    reject(error)
                })
            })
        })
    },

    userAddrUpdate(param = {}) {
        return new Promise((resolve, reject) => {
            this.getRequestCommonParam().then((commonParam) => {
                let requestParam = {
                    url: this.serviceList.userAddrUpdate + "?appKey=c8c35003cc4c408581043baad45bce5b&secret=0dc6fe93a8154fcaab629353ab800bb4",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: Object.assign(commonParam, param)
                }
                let oldDummy = this.isDummy
                this.isDummy = false
                this.sendHttpRequest(requestParam, { isValidate: false }).then((resp) => {
                    this.isDummy = oldDummy
                    resolve(resp)
                }).catch((error) => {
                    this.isDummy = oldDummy
                    reject(error)
                })
            })
        })
    },

    userAddrDelete(param = {}) {
        return new Promise((resolve, reject) => {
            this.getRequestCommonParam().then((commonParam) => {
                let requestParam = {
                    url: this.serviceList.userAddrDelete + "?appKey=c8c35003cc4c408581043baad45bce5b&secret=0dc6fe93a8154fcaab629353ab800bb4",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: Object.assign(commonParam, param)
                }
                let oldDummy = this.isDummy
                this.isDummy = false
                this.sendHttpRequest(requestParam, { isValidate: false }).then((resp) => {
                    this.isDummy = oldDummy
                    resolve(resp)
                }).catch((error) => {
                    this.isDummy = oldDummy
                    reject(error)
                })
            })
        })
    },

    setDefaultAddr(param = {}) {
        return new Promise((resolve, reject) => {
            this.getRequestCommonParam().then((commonParam) => {
                let requestParam = {
                    url: this.serviceList.setDefaultAddr + "?appKey=c8c35003cc4c408581043baad45bce5b&secret=0dc6fe93a8154fcaab629353ab800bb4",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: Object.assign(commonParam, param)
                }
                let oldDummy = this.isDummy
                this.isDummy = false
                this.sendHttpRequest(requestParam, { isValidate: false }).then((resp) => {
                    this.isDummy = oldDummy
                    resolve(resp)
                }).catch((error) => {
                    this.isDummy = oldDummy
                    reject(error)
                })
            })
        })
    },

    //防伪
    antiFakeQuery(param = {}) {
        return new Promise((resolve, reject) => {
            let url = "http://wap.cjm.so/Common/DataService.ashx?function=AntiFakeQuery&CorpID=14500&Code=" + param.code + param.validCode + "&QueryType=2"
            let param = {
                method: 'GET',
                url: url,
                type: 'jsonp',
                headers: { 'Content-Type': 'application/json' }
            }
            let oldDummy = this.isDummy
            this.isDummy = false
            nativeService.sendHttpRequest(param).then(
                (resp) => {
                    this.isDummy = oldDummy
                    resolve(resp)
                }
            ).catch((error) => {
                this.isDummy = oldDummy
                reject(error)
            })
        })
    }
})

export default customizeNativeService