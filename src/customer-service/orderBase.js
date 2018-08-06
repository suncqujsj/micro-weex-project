
import util from '@/common/util/util'
export default {
    data: () => ({

    }),
    computed: {
    },
    methods: {
        convertServiceOrderStatus(order) {
            let status = order.serviceOrderStatus
            let resultStatus

            if (['10', '11', '13', '14', '15', '32'].indexOf(status) > -1) {
                if (order.serviceMethodCode == 11) {
                    //已接单-送修
                    resultStatus = 1
                } else if (order.serviceMethodCode == 10) {
                    //已接单-上门
                    resultStatus = 2
                } else {
                    // 已接单
                    resultStatus = 7
                }
            } else if (status == '22') {
                // 已取消
                resultStatus = 3
            } else if (['17', '18', '19', '20', '21'].indexOf(status) > -1) {
                // 已完成/已终止
                if (order.allowCallbackWX == 'Y') {
                    // 已完成 - 待评价
                    resultStatus = 4
                } else {
                    resultStatus = 5
                }

            } else if (['33', '16', '31'].indexOf(status) > -1) {
                // 待服务
                resultStatus = 6
            }

            return resultStatus
        },
        formatOrder(order) {
            if (!order) {
                return {}
            }
            let others = {
                interfaceSourceIcon: '',
                interfaceSourceDesc: '',
                contactTimeDesc: '',
                orderDesc: '',
                imageUrl: '',
                isAbleToCancel: false, //是否可取消订单
                isAbleToCheckBranch: false, //是否可查看网点
                isAbleToUrgeOrder: false, //是否可催单
                isAbleToRenew: false, //是否可重新报单
                isAbleToCallService: false, //是否可联系网点
                isFinished: false, //是否已完成
                statusIcon: '',
                calcServiceOrderStatus: 0,
                statusDesc: ''
            }
            //接入图标及渠道
            others.interfaceSourceIcon = "./assets/img/logo/" + order.interfaceSource + ".png"
            others.interfaceSourceDesc = order.originSystem

            //接入时间
            others.contactTimeDesc = util.dateFormat(new Date(order.contactTime), "yyyy-MM-dd")

            //产品图片
            others.imageUrl = ''
            let prodName, archivesNumber = 0
            if (order.serviceUserDemandVOs && order.serviceUserDemandVOs.length > 0) {
                //订单描述
                prodName = order.serviceUserDemandVOs[0].prodName

                //档案数
                archivesNumber = order.serviceUserDemandVOs[0].archivesNumber || 0
            }
            others.orderDesc = (order.serviceSubTypeName || order.serviceMainTypeName) + prodName

            //订单状态
            others.calcServiceOrderStatus = this.convertServiceOrderStatus(order)
            switch (others.calcServiceOrderStatus) {
                case 1:
                    //已接单-送修
                    others.statusDesc = "已接单"
                    others.statusIcon = "./assets/img/service_ic_order_ongoing@3x.png"

                    if (order.interfaceSource == "SMART" && archivesNumber <= 0) {
                        others.isAbleToCancel = true
                    }
                    if (order.unitCode) {
                        others.isAbleToCheckBranch = true
                    }
                    break;
                case 2:
                    //已接单-上门
                    others.statusDesc = "已接单"
                    others.statusIcon = "./assets/img/service_ic_order_ongoing@3x.png"
                    if (order.interfaceSource == "SMART" && archivesNumber <= 0) {
                        others.isAbleToCancel = true
                    }
                    if (this.checkPassTime(order)) {
                        others.isAbleToUrgeOrder = true
                    }
                    break;
                case 7:
                    //已接单
                    others.statusDesc = "已接单"
                    others.statusIcon = "./assets/img/service_ic_order_ongoing@3x.png"
                    if (order.interfaceSource == "SMART" && archivesNumber <= 0) {
                        others.isAbleToCancel = true
                    }
                    break;
                case 3:
                    // 已取消
                    others.statusDesc = "已取消"
                    others.statusIcon = "./assets/img/service_ic_order_cancel@3x.png"
                    others.isAbleToRenew = true
                    break;
                case 4:
                    // 已完成/已终止
                    others.statusDesc = "待评价"
                    others.statusIcon = "./assets/img/service_ic_order_finish@3x.png"
                    others.isFinished = true
                    break;
                case 5:
                    // 已完成
                    others.statusDesc = "已完成"
                    others.statusIcon = "./assets/img/service_ic_order_finish@3x.png"
                    others.isFinished = true
                    break;
                case 6:
                    // 待服务
                    others.statusDesc = "待服务"
                    others.statusIcon = "./assets/img/service_ic_order_new@3x.png"
                    if (order.interfaceSource == "SMART" && archivesNumber <= 0) {
                        others.isAbleToCancel = true
                    }
                    others.isAbleToCallService = true
                    break;
            }


            return Object.assign({}, order, others)
        },
        checkPassTime(order) {
            let result = false
            let now = new Date()
            if (order.contactTime && new Date(order.contactTime) < now.setHours(now.getHours() - 1)) {
                result = true
            }
            return result
        }
    },
    created() {
    }
};