import nativeService from '@/common/services/nativeService'
import { SERVICE_STORAGE_KEYS } from './globalKeys'

let customizeNativeService = Object.assign(nativeService, {
    serviceList: {
        createserviceorder: "http://csuat.midea.com/c-css-ipms/api/wom/order/createserviceorder", //用户报装、报修、洗悦家服务请求
        queryserviceorder: "http://csuat.midea.com/c-css-ipms/api/wom/order/queryserviceorder", //用户服务工单列表查询
        queryserviceuserdemanddispatch: "http://csuat.midea.com/c-css-ipms/api/wom/order/queryserviceuserdemanddispatch", //用户服务工单详情进度查询
        createserviceuserdemand: "http://csuat.midea.com/c-css-ipms/api/wom/order/createserviceuserdemand", //催单CSS信息单
        queryReminderOptions: "http://weixincs.midea.com/wxgw/css/queryReminderOptions?mpType=MIDEASERVICE", //查询催单原因列表: TODO: url要修改
        cancelserviceorder: "http://csuat.midea.com/c-css-ipms/api/wom/order/cancelserviceorder", //取消售后工单
        queryconsumerorderprogress: "http://csuat.midea.com/c-css-ipms/api/wom/order/queryconsumerorderprogress", //用户服务单服务过程列表查询接口
        queryservicerequireproduct: "http://csuat.midea.com/c-css-ipms/api/wom/order/queryservicerequireproduct", //服务请求查询接口
        querywarrantydescbycodeorsn: "http://csuat.midea.com/c-css-ipms/api/wom/order/querywarrantydescbycodeorsn", //包修政策查询接口
        getChargeStandardList: "http://csuat.midea.com/c-css-ipms/css/api/mmp/insp/getChargeStandardList", //收费标准查询
        queryunitarchives: "http://csuat.midea.com/c-css-ipms/api/wom/order/queryunitarchives", //网点查询
        getProducts: "http://csuat.midea.com/c-css-ipms/api/dc/getProducts", //产品主数据同步
        searchFaultType: "/wxgw/css/faultType", //故障类型
        searchExcludedFault: "wxgw/css/excludedFault", //故障可能原因查询

        //中控消息
        getProdType: "http://10.16.33.168:8081/pdgw-ap/message/getProdType?version=1.0", //产品列表
        getUserAddrPageList: "http://10.16.85.47/ccrm2-core/userAddr/getUserAddrPageList", //地址列表查询
        getAreaList: "http://10.16.85.47/cmms/area/list", //服务地区
        userAddrAdd: "http://10.16.85.47/ccrm2-core/userAddr/add", //地址新增
        userAddrUpdate: "http://10.16.85.47/ccrm2-core/userAddr/update", //地址修改
        userAddrDelete: "http://10.16.85.47/ccrm2-core/userAddr/delete", //地址删除
        setDefaultAddr: "http://10.16.85.47/ccrm2-core/userAddr/defaultAddr", //设置默认地址
    },
    userInfo: null,
    getCssErrorMessage(error) {
        let msg = error.errorMsg || "请求失败，请稍后重试。"
        if (error.errorCode) {
            msg += "(" + error.errorCode + ")"
        }
        return msg
    },
    getCssRequestCommonParam() {
        return new Promise((resolve, reject) => {
            let param = {
                interfaceSource: "MMJYWX"
            }
            if (this.userInfo) {
                param.webUserCode = "oFtQywGHyqrWbDvjVdRTeR9Ig3m0" //this.userInfo.userId
                param.webUserPhone = "18614035358" //this.userInfo.mobile
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
    searchFaultType(param = {}) {
        return new Promise((resolve, reject) => {
            let result
            this.getItem(SERVICE_STORAGE_KEYS.faultType, (resp) => {
                if (resp.result == 'success') {
                    result = JSON.parse(resp.data)
                    resolve(result)
                } else {
                    this.sendMCloudRequest('searchFaultType', param, { isValidate: false }).then((resp) => {
                        result = resp.data
                        this.setItem(SERVICE_STORAGE_KEYS.faultType, JSON.stringify(result), () => {
                            resolve(result)
                        })
                    }).catch((error) => {
                        reject(error)
                    })
                }
            })
        })
    },
    searchExcludedFault(param = {}) {
        return new Promise((resolve, reject) => {
            let result
            this.sendMCloudRequest('searchExcludedFault', param, { isValidate: false }).then((resp) => {
                resolve(resp.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    getChargeStandardList(param = {}) {
        return new Promise((resolve, reject) => {
            let result
            this.sendMCloudRequest('getChargeStandardList', param, { isValidate: false }).then((resp) => {
                resolve(resp.content)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    queryunitarchives(param = {}) {
        return new Promise((resolve, reject) => {
            this.sendMCloudRequest('queryunitarchives', param, { isValidate: false }).then((resp) => {
                resolve(resp)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    querywarrantydescbycodeorsn(param = {}) {
        return new Promise((resolve, reject) => {
            this.sendMCloudRequest('querywarrantydescbycodeorsn', param, { isValidate: false }).then((resp) => {
                resolve(resp)
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
    getProdType(param = {}) {
        return new Promise((resolve, reject) => {
            let result
            this.getItem(SERVICE_STORAGE_KEYS.productType, (resp) => {
                if (resp.result == 'success' && JSON.parse(resp.data).length > 0) {
                    result = JSON.parse(resp.data)
                    resolve(result)
                } else {
                    let requestParam = {
                        url: this.serviceList.getProdType,
                        method: "GET",
                        body: Object.assign({
                            version: "1.0",
                            codeType: "0"
                        }, param)
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
                    const categaryItem = brandItem.productTypeDTOList[categaryIndex]
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