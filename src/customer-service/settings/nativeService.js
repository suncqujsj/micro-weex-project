import nativeService from '@/common/services/nativeService'

let customizeNativeService = Object.assign(nativeService, {
    serviceList: {
        createserviceorder: "c-css-ipms/api/wom/order/createserviceorder", //用户报装、报修、洗悦家服务请求
        queryserviceorder: "c-css-ipms/api/wom/order/queryserviceorder", //用户服务工单列表查询
        queryserviceuserdemanddispatch: "c-css-ipms/api/wom/order/queryserviceuserdemanddispatch", //用户服务工单详情进度查询
        createserviceuserdemand: "c-css-ipms/api/wom/order/createserviceuserdemand",
        cancelserviceorder: "c-css-ipms/api/wom/order/cancelserviceorder", //取消售后工单
        queryconsumerorderprogress: "c-css-ipms/api/wom/order/queryconsumerorderprogress", //用户服务单服务过程列表查询接口
        queryservicerequireproduct: "c-css-ipms/api/wom/order/queryservicerequireproduct", //服务请求查询接口
        querywarrantydescbycodeorsn: "c-css-ipms/api/wom/order/querywarrantydescbycodeorsn", //包修政策查询接口
        getChargeStandardList: "c-css-ipms/css/api/mmp/insp/getChargeStandardList", //收费标准查询
        queryunitarchives: "c-css-ipms/api/wom/order/queryunitarchives", //网点查询
        getProducts: "c-css-ipms/api/dc/getProducts", //产品主数据同步
        searchProductType: "wxgw/myproduct/searchProductType", //产品列表
        searchFaultType: "/wxgw/css/faultType", //故障类型
        searchExcludedFault: "wxgw/css/excludedFault", //故障可能原因查询
        getFeePlocy: "mideaService/getFeePlocy" //收费标准
    },
    searchProductType(param = {}) {
        return new Promise((resolve, reject) => {
            let result
            this.getItem("SERVICE_STORAGE_productType", (resp) => {
                if (resp.result == 'success') {
                    result = JSON.parse(resp.data)
                    resolve(result)
                } else {
                    this.sendMCloudRequest('searchProductType', param, { isValidate: false }).then((resp) => {
                        result = resp.data
                        this.setItem("SERVICE_STORAGE_productType", JSON.stringify(result), () => {
                            resolve(result)
                        })
                    }).catch((error) => {
                        reject(error)
                    })
                }
            })
        })
    },
    searchFaultType(param = {}) {
        return new Promise((resolve, reject) => {
            let result
            this.getItem("SERVICE_STORAGE_faultType", (resp) => {
                if (resp.result == 'success') {
                    result = JSON.parse(resp.data)
                    resolve(result)
                } else {
                    this.sendMCloudRequest('searchFaultType', param, { isValidate: false }).then((resp) => {
                        result = resp.data
                        this.setItem("SERVICE_STORAGE_faultType", JSON.stringify(result), () => {
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
    }
})

export default customizeNativeService