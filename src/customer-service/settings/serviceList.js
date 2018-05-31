const serviceList = {
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
}
export default serviceList