
import util from '@/common/util/util'
export default {
    data: () => ({

    }),
    computed: {
    },
    methods: {
        convertServiceOrderStatus(order) {
            let status = order.serviceOrderStatus

            if (10 <= status && status <= 15) {
                // 已接单
                if (order.serviceMethodCode == 11) {  //TODO: 需要CSS确认serviceMethodCode字段
                    //送修
                    status = 1
                } else {
                    //上门
                    status = 2
                }
            } else if (status == 16) {
                // 待服务
                status = 6
            } else if (17 <= status && status <= 20) {
                // 已完成-待评价
                status = 4
            } else if (status == 21 || status >= 23) {
                // 已完成 - 已评价
                status = 5
            } else if (status == 22) {
                // 已取消
                status = 3
            }

            return status
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
                isFinished: false,
                statusIcon: '',
                calcServiceOrderStatus: 0,
                statusDesc: ''
            }
            //接入图标及渠道
            others.interfaceSourceIcon = "./assets/img/logo/" + order.interfaceSource + ".png"
            others.interfaceSourceDesc = order.pubCreatePerson + "接入"

            //接入时间
            others.contactTimeDesc = util.dateFormat(new Date(order.contactTime), "yyyy-MM-dd")

            //产品图片
            others.imageUrl = 'http://fcmms.midea.com/ccrm-uat/productImg/1000美的家用空调.jpg'//'./assets/img/product/default.png'
            //订单描述
            let prodName
            if (order.serviceUserDemandVOs && order.serviceUserDemandVOs.length > 0) {
                prodName = order.serviceUserDemandVOs[0].prodName
            }
            others.orderDesc = order.serviceSubTypeName + prodName

            //订单状态
            others.calcServiceOrderStatus = this.convertServiceOrderStatus(order)
            switch (others.calcServiceOrderStatus) {
                case 1:
                    //已接单-送修
                    others.statusDesc = "已接单"
                    others.statusIcon = "./assets/img/service_ic_order_ongoing@3x.png"
                    break;
                case 2:
                    //已接单-上门
                    others.statusDesc = "已接单"
                    others.statusIcon = "./assets/img/service_ic_order_ongoing@3x.png"
                    break;
                case 3:
                    // 已取消
                    others.statusDesc = "已取消"
                    others.statusIcon = "./assets/img/service_ic_order_cancel@3x.png"
                    break;
                case 4:
                    // 已完成-待评价
                    others.statusDesc = "已完成"
                    others.statusIcon = "./assets/img/service_ic_order_finish@3x.png"
                    others.isFinished = true
                    break;
                case 5:
                    // 已完成 - 已评价
                    others.statusDesc = "已完成"
                    others.statusIcon = "./assets/img/service_ic_order_finish@3x.png"
                    others.isFinished = true
                    break;
                case 6:
                    // 待服务
                    others.statusDesc = "待服务"
                    others.statusIcon = "./assets/img/service_ic_order_new@3x.png"
                    break;
            }


            return Object.assign(order, others)
        }
    },
    created() {
    }
};