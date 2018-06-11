import nativeService from '@/common/services/nativeService'
import { SERVICE_STORAGE_KEYS } from './globalKeys'

let customizeNativeService = Object.assign(nativeService, {
    serviceList: {
        createserviceorder: "c-css-ipms/api/wom/order/createserviceorder", //用户报装、报修、洗悦家服务请求
        queryserviceorder: "c-css-ipms/api/wom/order/queryserviceorder", //用户服务工单列表查询
        queryserviceuserdemanddispatch: "c-css-ipms/api/wom/order/queryserviceuserdemanddispatch", //用户服务工单详情进度查询
        createserviceuserdemand: "c-css-ipms/api/wom/order/createserviceuserdemand", //催单CSS信息单
        cancelserviceorder: "c-css-ipms/api/wom/order/cancelserviceorder", //取消售后工单
        queryconsumerorderprogress: "c-css-ipms/api/wom/order/queryconsumerorderprogress", //用户服务单服务过程列表查询接口
        queryservicerequireproduct: "c-css-ipms/api/wom/order/queryservicerequireproduct", //服务请求查询接口
        querywarrantydescbycodeorsn: "c-css-ipms/api/wom/order/querywarrantydescbycodeorsn", //包修政策查询接口
        getChargeStandardList: "c-css-ipms/css/api/mmp/insp/getChargeStandardList", //收费标准查询
        queryunitarchives: "c-css-ipms/api/wom/order/queryunitarchives", //网点查询
        getProducts: "c-css-ipms/api/dc/getProducts", //产品主数据同步
        searchFaultType: "/wxgw/css/faultType", //故障类型
        searchExcludedFault: "wxgw/css/excludedFault", //故障可能原因查询
        getFeePlocy: "mideaService/getFeePlocy", //收费标准

        //中控消息
        searchProductType: "pdgw-ap/message/getProdType", //产品列表
        getAreaList: "cmms/area/list", //服务地区
        getUserAddrPageList: "ccrm2-core/userAddr/getUserAddrPageList", //地址列表查询
        userAddrAdd: "ccrm2-core/userAddr/add", //地址新增
        userAddrUpdate: "ccrm2-core/userAddr/update", //地址修改
        userAddrDelete: "ccrm2-core/userAddr/delete", //地址删除
    },
    getCssErrorMessage(error) {
        let msg = error.errorMsg || "请求失败，请稍后重试。"
        if (error.errorCode) {
            msg += "(" + error.errorCode + ")"
        }
        return msg
    },
    createserviceorder(param = {}) {
        return new Promise((resolve, reject) => {
            this.sendMCloudRequest('createserviceorder', param, { isValidate: false }).then((resp) => {
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
            let result
            this.sendMCloudRequest('queryserviceorder', param, { isValidate: false }).then((resp) => {
                result = resp
                resolve(result)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    queryserviceuserdemanddispatch(param = {}) {
        return new Promise((resolve, reject) => {
            this.sendMCloudRequest('queryserviceuserdemanddispatch', param, { isValidate: false }).then((resp) => {
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
                orgCode: '',
                interfaceSource: 'MJAPP',
                operator: ''
            }
            this.sendMCloudRequest('createserviceuserdemand', param, { isValidate: false }).then((resp) => {
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
    cancelserviceorder(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                orgCode: '',
                interfaceSource: 'MJAPP',
                operator: ''
            }
            this.sendMCloudRequest('cancelserviceorder', param, { isValidate: false }).then((resp) => {
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
                orgCode: '',
                interfaceSource: 'MJAPP',
                operator: ''
            }
            this.sendMCloudRequest('queryconsumerorderprogress', param, { isValidate: false }).then((resp) => {
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
    getFeePlocy(param = {}) {
        return new Promise((resolve, reject) => {
            let result
            this.sendMCloudRequest('getFeePlocy', param, { isValidate: false }).then((resp) => {
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

    searchProductType(param = {}) {
        return new Promise((resolve, reject) => {
            let result
            this.getItem(SERVICE_STORAGE_KEYS.productType, (resp) => {
                if (resp.result == 'success' && JSON.parse(resp.data).length > 0) {
                    result = JSON.parse(resp.data)
                    resolve(result)
                } else {
                    let requestParam = {
                        url: "http://10.16.38.95:8080/pdgw-ap/message/getProdType",
                        method: "GET",
                        body: Object.assign({
                            version: "1.0",
                            codeType: "0",
                            sourceSys: "10001"
                        }, param)
                    }
                    this.sendHttpRequest(requestParam, { isValidate: false }).then((resp) => {
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
                url: "http://10.16.85.47/cmms/area/list",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                body: Object.assign({
                    regionCode: "0"
                }, param)
            }
            let oldDummy = this.isDummy
            this.isDummy = !false
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

    getUserAddrPageList(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: "http://10.16.85.47/ccrm2-core/userAddr/getUserAddrPageList",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: Object.assign({
                    sourceSys: "10001",
                    uid: "b986b7612c2d462491bb2462d29cdc34"
                }, param)
            }
            let oldDummy = this.isDummy
            this.isDummy = !false
            this.sendHttpRequest(requestParam, { isValidate: false }).then((resp) => {
                this.isDummy = oldDummy
                resolve(resp)
            }).catch((error) => {
                this.isDummy = oldDummy
                reject(error)
            })
        })
    },

    userAddrAdd(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: "http://10.16.85.47/ccrm2-core/userAddr/add",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: Object.assign({
                    sourceSys: "10001",
                    uid: "b986b7612c2d462491bb2462d29cdc34"
                }, param)
            }
            let oldDummy = this.isDummy
            this.isDummy = !false
            this.sendHttpRequest(requestParam, { isValidate: false }).then((resp) => {
                this.isDummy = oldDummy
                resolve(resp)
            }).catch((error) => {
                this.isDummy = oldDummy
                reject(error)
            })
        })
    },

    userAddrUpdate(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: "http://10.16.85.47/ccrm2-core/userAddr/update",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: Object.assign({
                    sourceSys: "10001",
                    uid: "b986b7612c2d462491bb2462d29cdc34"
                }, param)
            }
            let oldDummy = this.isDummy
            this.isDummy = !false
            this.sendHttpRequest(requestParam, { isValidate: false }).then((resp) => {
                this.isDummy = oldDummy
                resolve(resp)
            }).catch((error) => {
                this.isDummy = oldDummy
                reject(error)
            })
        })
    },

    userAddrDelete(param = {}) {
        return new Promise((resolve, reject) => {
            let requestParam = {
                url: "http://10.16.85.47/ccrm2-core/userAddr/delete",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: Object.assign({
                    sourceSys: "10001",
                    uid: "b986b7612c2d462491bb2462d29cdc34"
                }, param)
            }
            let oldDummy = this.isDummy
            this.isDummy = !false
            this.sendHttpRequest(requestParam, { isValidate: false }).then((resp) => {
                this.isDummy = oldDummy
                resolve(resp)
            }).catch((error) => {
                this.isDummy = oldDummy
                reject(error)
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