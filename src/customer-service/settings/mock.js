import Mock, { mock } from 'mockjs';

export const all = [
    {
        path: 'c-css-ipms/api/wom/order/queryserviceorder',
        data: {
            "status": true,
            "errorCode": null,
            "errorMsg": null,
            "pageIndex": 1,
            "pageSize": 10,
            "pageCount": 1,
            "total": 1,
            "list|0-10": [
                {
                    "serviceUserDemandVOs": [
                        {
                            "isCover": null,
                            "contactUserRequireId": "1041794802",
                            "contactProductInfoId": null,
                            "serviceRequireId": null,
                            "contactOrderId": null,
                            "contactOrderCode": null,
                            "prodCode": "1006",
                            "prodName": "洗衣机",
                            "prodBrand": null,
                            "brandCode": "MIDEA",
                            "brandName": "美的",
                            "productModel": null,
                            "contactOrderSerItemCode": null,
                            "contactOrderSerItem2Code": "BX01017",
                            "contactOrderSerItemName": null,
                            "contactOrderSerItem2Name": "声音异常/噪音大",
                            "serviceMainTypeCode": null,
                            "serviceMainTypeName": null,
                            "serviceSubTypeCode": null,
                            "serviceSubTypeName": null,
                            "machineErrorDisplay": null,
                            "complaintLevel": null,
                            "appointTimeDesc": null,
                            "pubRemark": null,
                            "productCode": null,
                            "userEnvironment": null,
                            "insideBarcode": null,
                            "productSn1": null,
                            "outsideBarcode": null,
                            "productSn2": null,
                            "deviceTypeCode": null,
                            "vwTypeCode": null,
                            "deviceTypeName": null,
                            "vwTypeDesc": null,
                            "serviceDesc": "　",
                            "contactOrderBuyChannel": null,
                            "purchasingChannels": null,
                            "contactOrderBuyDate": null,
                            "purchaseDate": null,
                            "purchaseUnitName": null,
                            "contactOrderSaleUnitCode": null,
                            "salesUnitCode": null,
                            "contactOrderSaleUnitName": null,
                            "salesUnitName": null,
                            "contactOrderProductUse": null,
                            "productUse": null,
                            "productAmount": null,
                            "appointDate": null,
                            "intfOrderDetailId": null,
                            "payAmount": null,
                            "subAttribute1": null,
                            "subAttribute2": null,
                            "subAttribute3": null,
                            "subAttribute4": null,
                            "subAttribute5": null
                        }
                    ],
                    "businessFileVOs": null,
                    "serviceOrderId": "1038191056",
                    "contactOrderId": "1040381072",
                    "serviceOrderNo": "FW170884499533",
                    "orgCode": "CS007",
                    "serviceOrderStatus": "22",
                    "orderOrigin": "13",
                    "contactOrderNo": "JR170842114847",
                    "serviceMainTypeCode": "11",
                    "serviceMainTypeName": "维修",
                    "serviceSubTypeCode": "1111",
                    "serviceSubTypeName": "维修",
                    "customerId": "1015163594",
                    "customerCode": "YH17040041643175",
                    "customerAddressId": "1042615775",
                    "customerName": "范曰雷",
                    "areaNum": "0757",
                    "customerMobilephone1": "18614035358",
                    "customerMobilephone2": null,
                    "customerMobilephone3": null,
                    "customerTelphone": null,
                    "customerLevel": "10",
                    "customerStarLevel": null,
                    "customerEmail": null,
                    "customerType": "10",
                    "areaCode": "1440606005",
                    "areaName": "大良街道",
                    "customerAddress": "广东省佛山市顺德区大良街道伦教新村",
                    "servCustomerId": "1015163594",
                    "servCustomerCode": "YH17040041643175",
                    "servCustomerAddressId": "1042615775",
                    "servCustomerName": "范曰雷",
                    "servCustomerMobilephone1": "18614035358",
                    "servCustomerMobilephone2": null,
                    "servCustomerMobilephone3": null,
                    "servAreaNum": "0757",
                    "servAreaCode": "1440606005",
                    "servAreaName": "大良街道",
                    "servCustomerAddress": "广东省佛山市顺德区大良街道伦教新村",
                    "requireUnitCode": null,
                    "requireUnitName": null,
                    "requireServiceDate": "2017-08-23 10:00-12:00",
                    "distance": 0,
                    "urgentLevel": null,
                    "cemergencyLevel": null,
                    "interfaceSource": "MMJYWX",
                    "intfOrderCode": "031502765442631276",
                    "replaceCollectionsFlag": null,
                    "branchCode": "F4401000008",
                    "branchName": "洗衣机-广州中心",
                    "unitCode": "W4406032555",
                    "unitName": "佛山市顺德区大良中源家电维修服务部",
                    "contactTime": 1502765442000,
                    "dispatchOrderTime": 1502765442000,
                    "webUserCode": "oiEBCwBJHjycb5w__QfikEQzvPHA",
                    "webUserPhone": null,
                    "dispatchPerson": null,
                    "receiveOrderTime": null,
                    "appointDesc": null,
                    "appointTime": null,
                    "appointSaveTime": null,
                    "finishTime": null,
                    "feedbackTime": null,
                    "pubCreatePerson": "美美家园服务号",
                    "pubCreateDate": 1502765442000,
                    "pubValidly": "Y",
                    "dispatchOrderPerson": "system",
                    "receiveOrderPerson": null,
                    "callbackTime": null,
                    "allowCallbackWX": "N",
                    "dispatchTime": null,
                    "callbackStatus": null,
                    "cancelTime": 1502765511000
                }
            ]
        }

    },
    {
        path: "wxgw/myproduct/searchProductType",
        data: {
            "code": "0",
            "data": [
                {
                    "brandSort": 1,
                    "productTypeDTOList": [
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U01",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U01",
                                    "prodCode": "1000",
                                    "children": [],
                                    "orgCode": "CS006",
                                    "userTypeName": "空调",
                                    "prodName": "家用空调",
                                    "userTypeSort": 1,
                                    "rowId": "134"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U01",
                                    "prodCode": "1001",
                                    "children": [],
                                    "orgCode": "CS006",
                                    "userTypeName": "空调",
                                    "prodName": "除湿机",
                                    "userTypeSort": 1,
                                    "rowId": "139"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "空调",
                            "userTypeSort": 1,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U03",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U03",
                                    "prodCode": "1006",
                                    "children": [],
                                    "orgCode": "CS007",
                                    "userTypeName": "洗衣机",
                                    "prodName": "洗衣机",
                                    "userTypeSort": 2,
                                    "rowId": "180"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U03",
                                    "prodCode": "1007",
                                    "children": [],
                                    "orgCode": "CS007",
                                    "userTypeName": "洗衣机",
                                    "prodName": "干衣机",
                                    "userTypeSort": 2,
                                    "rowId": "183"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "洗衣机",
                            "userTypeSort": 2,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U04",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U04",
                                    "prodCode": "1023",
                                    "children": [],
                                    "orgCode": "CS009",
                                    "userTypeName": "热水器",
                                    "prodName": "电热水器",
                                    "userTypeSort": 3,
                                    "rowId": "142"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U04",
                                    "prodCode": "1024",
                                    "children": [],
                                    "orgCode": "CS009",
                                    "userTypeName": "热水器",
                                    "prodName": "太阳能",
                                    "userTypeSort": 3,
                                    "rowId": "143"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U04",
                                    "prodCode": "1025",
                                    "children": [],
                                    "orgCode": "CS009",
                                    "userTypeName": "热水器",
                                    "prodName": "燃气热水器",
                                    "userTypeSort": 3,
                                    "rowId": "156"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U04",
                                    "prodCode": "1132",
                                    "children": [],
                                    "orgCode": "CS002",
                                    "userTypeName": "热水器",
                                    "prodName": "空气能热水机",
                                    "userTypeSort": 3,
                                    "rowId": "6A1D0FC997B067BAE05400144FFB1D03"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U04",
                                    "prodCode": "1133",
                                    "children": [],
                                    "orgCode": "CS002",
                                    "userTypeName": "热水器",
                                    "prodName": "燃气壁挂炉",
                                    "userTypeSort": 3,
                                    "rowId": "6A1D0FC997B167BAE05400144FFB1D03"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "热水器",
                            "userTypeSort": 3,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U02",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U02",
                                    "prodCode": "1004",
                                    "children": [],
                                    "orgCode": "CS008",
                                    "userTypeName": "冰箱",
                                    "prodName": "冷柜",
                                    "userTypeSort": 4,
                                    "rowId": "178"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U02",
                                    "prodCode": "1005",
                                    "children": [],
                                    "orgCode": "CS008",
                                    "userTypeName": "冰箱",
                                    "prodName": "酒柜",
                                    "userTypeSort": 4,
                                    "rowId": "179"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U02",
                                    "prodCode": "1003",
                                    "children": [],
                                    "orgCode": "CS008",
                                    "userTypeName": "冰箱",
                                    "prodName": "冰箱",
                                    "userTypeSort": 4,
                                    "rowId": "222"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "冰箱",
                            "userTypeSort": 4,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U05",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U05",
                                    "prodCode": "1016",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房大家电",
                                    "prodName": "嵌入式微波炉",
                                    "userTypeSort": 5,
                                    "rowId": "175"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U05",
                                    "prodCode": "1020",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房大家电",
                                    "prodName": "洗碗机",
                                    "userTypeSort": 5,
                                    "rowId": "176"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U05",
                                    "prodCode": "1008",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房大家电",
                                    "prodName": "烟机",
                                    "userTypeSort": 5,
                                    "rowId": "189"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U05",
                                    "prodCode": "1009",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房大家电",
                                    "prodName": "燃气灶",
                                    "userTypeSort": 5,
                                    "rowId": "190"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U05",
                                    "prodCode": "1010",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房大家电",
                                    "prodName": "气电灶",
                                    "userTypeSort": 5,
                                    "rowId": "191"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U05",
                                    "prodCode": "1012",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房大家电",
                                    "prodName": "消毒柜",
                                    "userTypeSort": 5,
                                    "rowId": "192"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U05",
                                    "prodCode": "1015",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房大家电",
                                    "prodName": "嵌入式烤箱",
                                    "userTypeSort": 5,
                                    "rowId": "195"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U05",
                                    "prodCode": "1018",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房大家电",
                                    "prodName": "商用厨房设备",
                                    "userTypeSort": 5,
                                    "rowId": "237"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U05",
                                    "prodCode": "1114",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房大家电",
                                    "prodName": "集成灶",
                                    "userTypeSort": 0,
                                    "rowId": "5316C898269C4802E054001517BB4C6E"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U05",
                                    "prodCode": "1124",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房大家电",
                                    "prodName": "嵌入式电蒸炉",
                                    "userTypeSort": 0,
                                    "rowId": "54BDE323A8F23AFDE054001517BB4C6E"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "厨房大家电",
                            "userTypeSort": 5,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U06",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1044",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "小烤箱",
                                    "userTypeSort": 6,
                                    "rowId": "163"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1046",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "爆米花机",
                                    "userTypeSort": 6,
                                    "rowId": "164"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1047",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "微波烤箱",
                                    "userTypeSort": 6,
                                    "rowId": "165"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1048",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "冰淇淋机",
                                    "userTypeSort": 6,
                                    "rowId": "166"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1052",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "酸奶机",
                                    "userTypeSort": 6,
                                    "rowId": "168"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1054",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "蒸蛋器",
                                    "userTypeSort": 6,
                                    "rowId": "169"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1041",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "车载微波炉",
                                    "userTypeSort": 6,
                                    "rowId": "170"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1045",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "烤鱼器",
                                    "userTypeSort": 6,
                                    "rowId": "171"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1050",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "果蔬机",
                                    "userTypeSort": 6,
                                    "rowId": "172"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1013",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "BBQ",
                                    "userTypeSort": 6,
                                    "rowId": "193"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1014",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "电烤炉",
                                    "userTypeSort": 6,
                                    "rowId": "194"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1074",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "炊具",
                                    "userTypeSort": 6,
                                    "rowId": "211"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1076",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "电磁炉",
                                    "userTypeSort": 6,
                                    "rowId": "214"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1078",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "电炖锅",
                                    "userTypeSort": 6,
                                    "rowId": "216"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1095",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "面条机",
                                    "userTypeSort": 6,
                                    "rowId": "226"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1019",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "食物垃圾处理器",
                                    "userTypeSort": 6,
                                    "rowId": "238"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1040",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "微波炉",
                                    "userTypeSort": 6,
                                    "rowId": "241"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1042",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "纯蒸炉",
                                    "userTypeSort": 6,
                                    "rowId": "242"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1079",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "电饭煲",
                                    "userTypeSort": 6,
                                    "rowId": "243"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1080",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "电饭锅",
                                    "userTypeSort": 6,
                                    "rowId": "244"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1081",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "电火锅",
                                    "userTypeSort": 6,
                                    "rowId": "245"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1084",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "电压力锅",
                                    "userTypeSort": 6,
                                    "rowId": "250"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1086",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "电蒸锅",
                                    "userTypeSort": 6,
                                    "rowId": "252"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1087",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "豆浆机",
                                    "userTypeSort": 6,
                                    "rowId": "253"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1089",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "果汁机",
                                    "userTypeSort": 6,
                                    "rowId": "256"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1090",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "煎烤机",
                                    "userTypeSort": 6,
                                    "rowId": "257"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1092",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "咖啡机",
                                    "userTypeSort": 6,
                                    "rowId": "259"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1093",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "空气炸锅",
                                    "userTypeSort": 6,
                                    "rowId": "260"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1094",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "面包机",
                                    "userTypeSort": 6,
                                    "rowId": "261"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1017",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "燃气烤炉",
                                    "userTypeSort": 6,
                                    "rowId": "263"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "厨房小家电",
                            "userTypeSort": 6,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U07",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1101",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "生活家电",
                                    "prodName": "加湿器",
                                    "userTypeSort": 7,
                                    "rowId": "140"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1102",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "生活家电",
                                    "prodName": "空气净化器",
                                    "userTypeSort": 7,
                                    "rowId": "141"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1026",
                                    "children": [],
                                    "orgCode": "CS009",
                                    "userTypeName": "生活家电",
                                    "prodName": "净水桶",
                                    "userTypeSort": 7,
                                    "rowId": "144"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1027",
                                    "children": [],
                                    "orgCode": "CS009",
                                    "userTypeName": "生活家电",
                                    "prodName": "净饮机",
                                    "userTypeSort": 7,
                                    "rowId": "145"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1029",
                                    "children": [],
                                    "orgCode": "CS009",
                                    "userTypeName": "生活家电",
                                    "prodName": "饮水机",
                                    "userTypeSort": 7,
                                    "rowId": "157"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1112",
                                    "children": [],
                                    "orgCode": "CS010",
                                    "userTypeName": "生活家电",
                                    "prodName": "家用净水",
                                    "userTypeSort": 7,
                                    "rowId": "159"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1113",
                                    "children": [],
                                    "orgCode": "CS010",
                                    "userTypeName": "生活家电",
                                    "prodName": "商用净水",
                                    "userTypeSort": 7,
                                    "rowId": "160"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1043",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "生活家电",
                                    "prodName": "吸尘器",
                                    "userTypeSort": 7,
                                    "rowId": "162"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1051",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "生活家电",
                                    "prodName": "奶瓶消毒器",
                                    "userTypeSort": 7,
                                    "rowId": "167"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1049",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "生活家电",
                                    "prodName": "电热便当盒",
                                    "userTypeSort": 7,
                                    "rowId": "173"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1053",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "生活家电",
                                    "prodName": "衣物净化器",
                                    "userTypeSort": 7,
                                    "rowId": "174"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1065",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "生活家电",
                                    "prodName": "烘干机",
                                    "userTypeSort": 7,
                                    "rowId": "203"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1073",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "生活家电",
                                    "prodName": "按摩电器",
                                    "userTypeSort": 7,
                                    "rowId": "210"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1075",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "生活家电",
                                    "prodName": "电吹风",
                                    "userTypeSort": 7,
                                    "rowId": "212"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1077",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "生活家电",
                                    "prodName": "电动牙刷",
                                    "userTypeSort": 7,
                                    "rowId": "215"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1099",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "生活家电",
                                    "prodName": "蒸汽挂烫机",
                                    "userTypeSort": 7,
                                    "rowId": "227"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1097",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "生活家电",
                                    "prodName": "剃须刀",
                                    "userTypeSort": 7,
                                    "rowId": "231"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1098",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "生活家电",
                                    "prodName": "血压计",
                                    "userTypeSort": 7,
                                    "rowId": "232"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1100",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "生活家电",
                                    "prodName": "直发器",
                                    "userTypeSort": 7,
                                    "rowId": "233"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1063",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "生活家电",
                                    "prodName": "电子鞋柜",
                                    "userTypeSort": 7,
                                    "rowId": "235"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1069",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "生活家电",
                                    "prodName": "理疗仪",
                                    "userTypeSort": 7,
                                    "rowId": "236"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1022",
                                    "children": [],
                                    "orgCode": "CS011",
                                    "userTypeName": "生活家电",
                                    "prodName": "整体吊顶",
                                    "userTypeSort": 7,
                                    "rowId": "240"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1082",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "生活家电",
                                    "prodName": "电热水瓶",
                                    "userTypeSort": 7,
                                    "rowId": "246"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1083",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "生活家电",
                                    "prodName": "电水壶",
                                    "userTypeSort": 7,
                                    "rowId": "248"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1085",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "生活家电",
                                    "prodName": "电熨斗",
                                    "userTypeSort": 7,
                                    "rowId": "251"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1088",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "生活家电",
                                    "prodName": "耳温枪",
                                    "userTypeSort": 7,
                                    "rowId": "254"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1091",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "生活家电",
                                    "prodName": "卷发器",
                                    "userTypeSort": 7,
                                    "rowId": "258"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1096",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "生活家电",
                                    "prodName": "剃毛器",
                                    "userTypeSort": 7,
                                    "rowId": "262"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "生活家电",
                            "userTypeSort": 7,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U08",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U08",
                                    "prodCode": "1062",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "风扇",
                                    "prodName": "壁扇",
                                    "userTypeSort": 8,
                                    "rowId": "201"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U08",
                                    "prodCode": "1064",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "风扇",
                                    "prodName": "吊扇",
                                    "userTypeSort": 8,
                                    "rowId": "202"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U08",
                                    "prodCode": "1066",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "风扇",
                                    "prodName": "换气扇",
                                    "userTypeSort": 8,
                                    "rowId": "204"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U08",
                                    "prodCode": "1067",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "风扇",
                                    "prodName": "金属扇",
                                    "userTypeSort": 8,
                                    "rowId": "205"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U08",
                                    "prodCode": "1068",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "风扇",
                                    "prodName": "空调扇",
                                    "userTypeSort": 8,
                                    "rowId": "206"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U08",
                                    "prodCode": "1070",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "风扇",
                                    "prodName": "楼顶扇",
                                    "userTypeSort": 8,
                                    "rowId": "207"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U08",
                                    "prodCode": "1071",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "风扇",
                                    "prodName": "塑料扇",
                                    "userTypeSort": 8,
                                    "rowId": "208"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U08",
                                    "prodCode": "1072",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "风扇",
                                    "prodName": "塔扇",
                                    "userTypeSort": 8,
                                    "rowId": "209"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U08",
                                    "prodCode": "1002",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "风扇",
                                    "prodName": "风幕机",
                                    "userTypeSort": 8,
                                    "rowId": "217"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U08",
                                    "prodCode": "1104",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "风扇",
                                    "prodName": "鹰牌吊扇",
                                    "userTypeSort": 8,
                                    "rowId": "228"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U08",
                                    "prodCode": "1103",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "风扇",
                                    "prodName": "鹰牌风扇",
                                    "userTypeSort": 8,
                                    "rowId": "234"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "风扇",
                            "userTypeSort": 8,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U09",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U09",
                                    "prodCode": "1055",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "取暖产品",
                                    "prodName": "电暖炉",
                                    "userTypeSort": 9,
                                    "rowId": "196"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U09",
                                    "prodCode": "1057",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "取暖产品",
                                    "prodName": "对衡式",
                                    "userTypeSort": 9,
                                    "rowId": "197"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U09",
                                    "prodCode": "1058",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "取暖产品",
                                    "prodName": "暖风机",
                                    "userTypeSort": 9,
                                    "rowId": "198"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U09",
                                    "prodCode": "1059",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "取暖产品",
                                    "prodName": "暖脚器",
                                    "userTypeSort": 9,
                                    "rowId": "199"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U09",
                                    "prodCode": "1061",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "取暖产品",
                                    "prodName": "远红外",
                                    "userTypeSort": 9,
                                    "rowId": "200"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U09",
                                    "prodCode": "1056",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "取暖产品",
                                    "prodName": "电热油汀",
                                    "userTypeSort": 9,
                                    "rowId": "224"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U09",
                                    "prodCode": "1060",
                                    "children": [],
                                    "orgCode": "CS013",
                                    "userTypeName": "取暖产品",
                                    "prodName": "小暖阳",
                                    "userTypeSort": 9,
                                    "rowId": "225"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "取暖产品",
                            "userTypeSort": 9,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U99",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U99",
                                    "prodCode": "1129",
                                    "children": [],
                                    "orgCode": "CS002",
                                    "userTypeName": "中央空调",
                                    "prodName": "多联式中央空调",
                                    "userTypeSort": 10,
                                    "rowId": "6A1D0FC997AC67BAE05400144FFB1D03"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U99",
                                    "prodCode": "1130",
                                    "children": [],
                                    "orgCode": "CS002",
                                    "userTypeName": "中央空调",
                                    "prodName": "单元机",
                                    "userTypeSort": 10,
                                    "rowId": "6A1D0FC997AD67BAE05400144FFB1D03"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U99",
                                    "prodCode": "1131",
                                    "children": [],
                                    "orgCode": "CS002",
                                    "userTypeName": "中央空调",
                                    "prodName": "风冷模块",
                                    "userTypeSort": 10,
                                    "rowId": "6A1D0FC997AE67BAE05400144FFB1D03"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U99",
                                    "prodCode": "1137",
                                    "children": [],
                                    "orgCode": "CS002",
                                    "userTypeName": "中央空调",
                                    "prodName": "风机盘管",
                                    "userTypeSort": 10,
                                    "rowId": "6A1D0FC997AF67BAE05400144FFB1D03"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "中央空调",
                            "userTypeSort": 10,
                            "rowId": null
                        }
                    ],
                    "brand": "美的",
                    "brandCode": "MIDEA"
                },
                {
                    "brandSort": 2,
                    "productTypeDTOList": [
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U01",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U01",
                                    "prodCode": "1000",
                                    "children": [],
                                    "orgCode": "CS006",
                                    "userTypeName": "空调",
                                    "prodName": "家用空调",
                                    "userTypeSort": 1,
                                    "rowId": "137"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "空调",
                            "userTypeSort": 1,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U03",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U03",
                                    "prodCode": "1006",
                                    "children": [],
                                    "orgCode": "CS007",
                                    "userTypeName": "洗衣机",
                                    "prodName": "洗衣机",
                                    "userTypeSort": 2,
                                    "rowId": "182"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U03",
                                    "prodCode": "1007",
                                    "children": [],
                                    "orgCode": "CS007",
                                    "userTypeName": "洗衣机",
                                    "prodName": "干衣机",
                                    "userTypeSort": 2,
                                    "rowId": "185"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "洗衣机",
                            "userTypeSort": 2,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U02",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U02",
                                    "prodCode": "1004",
                                    "children": [],
                                    "orgCode": "CS008",
                                    "userTypeName": "冰箱",
                                    "prodName": "冷柜",
                                    "userTypeSort": 4,
                                    "rowId": "177"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U02",
                                    "prodCode": "1003",
                                    "children": [],
                                    "orgCode": "CS008",
                                    "userTypeName": "冰箱",
                                    "prodName": "冰箱",
                                    "userTypeSort": 4,
                                    "rowId": "219"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "冰箱",
                            "userTypeSort": 4,
                            "rowId": null
                        }
                    ],
                    "brand": "小天鹅",
                    "brandCode": "XIAOTIANE"
                },
                {
                    "brandSort": 5,
                    "productTypeDTOList": [
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U02",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U02",
                                    "prodCode": "1003",
                                    "children": [],
                                    "orgCode": "CS008",
                                    "userTypeName": "冰箱",
                                    "prodName": "冰箱",
                                    "userTypeSort": 4,
                                    "rowId": "220"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "冰箱",
                            "userTypeSort": 4,
                            "rowId": null
                        }
                    ],
                    "brand": "雪尔",
                    "brandCode": "XUEER"
                },
                {
                    "brandSort": 10,
                    "productTypeDTOList": [
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U01",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U01",
                                    "prodCode": "1000",
                                    "children": [],
                                    "orgCode": "CS006",
                                    "userTypeName": "空调",
                                    "prodName": "家用空调",
                                    "userTypeSort": 1,
                                    "rowId": "136"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "空调",
                            "userTypeSort": 1,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U02",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U02",
                                    "prodCode": "1003",
                                    "children": [],
                                    "orgCode": "CS008",
                                    "userTypeName": "冰箱",
                                    "prodName": "冰箱",
                                    "userTypeSort": 4,
                                    "rowId": "221"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U02",
                                    "prodCode": "1004",
                                    "children": [],
                                    "orgCode": "CS008",
                                    "userTypeName": "冰箱",
                                    "prodName": "冷柜",
                                    "userTypeSort": 4,
                                    "rowId": "223"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "冰箱",
                            "userTypeSort": 4,
                            "rowId": null
                        }
                    ],
                    "brand": "华凌",
                    "brandCode": "HUALING"
                },
                {
                    "brandSort": 14,
                    "productTypeDTOList": [
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U06",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1076",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "电磁炉",
                                    "userTypeSort": 6,
                                    "rowId": "213"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1084",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "电压力锅",
                                    "userTypeSort": 6,
                                    "rowId": "249"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1089",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "果汁机",
                                    "userTypeSort": 6,
                                    "rowId": "255"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "厨房小家电",
                            "userTypeSort": 6,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U07",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1083",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "生活家电",
                                    "prodName": "电水壶",
                                    "userTypeSort": 7,
                                    "rowId": "247"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "生活家电",
                            "userTypeSort": 7,
                            "rowId": null
                        }
                    ],
                    "brand": "易酷客",
                    "brandCode": "YIKU"
                },
                {
                    "brandSort": 15,
                    "productTypeDTOList": [
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U04",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U04",
                                    "prodCode": "1023",
                                    "children": [],
                                    "orgCode": "CS009",
                                    "userTypeName": "热水器",
                                    "prodName": "电热水器",
                                    "userTypeSort": 3,
                                    "rowId": "1000000132"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U04",
                                    "prodCode": "1025",
                                    "children": [],
                                    "orgCode": "CS009",
                                    "userTypeName": "热水器",
                                    "prodName": "燃气热水器",
                                    "userTypeSort": 3,
                                    "rowId": "1000000150"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "热水器",
                            "userTypeSort": 3,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U07",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U07",
                                    "prodCode": "1112",
                                    "children": [],
                                    "orgCode": "CS010",
                                    "userTypeName": "生活家电",
                                    "prodName": "家用净水",
                                    "userTypeSort": 7,
                                    "rowId": "161"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "生活家电",
                            "userTypeSort": 7,
                            "rowId": null
                        }
                    ],
                    "brand": "比佛利",
                    "brandCode": "BEVERLY"
                },
                {
                    "brandSort": 16,
                    "productTypeDTOList": [
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U06",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1079",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "电饭煲",
                                    "userTypeSort": 6,
                                    "rowId": "272"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "厨房小家电",
                            "userTypeSort": 6,
                            "rowId": null
                        }
                    ],
                    "brand": "酷晨",
                    "brandCode": "CUCHEN"
                },
                {
                    "brandSort": 17,
                    "productTypeDTOList": [
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U06",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U06",
                                    "prodCode": "1092",
                                    "children": [],
                                    "orgCode": "CS012",
                                    "userTypeName": "厨房小家电",
                                    "prodName": "咖啡机",
                                    "userTypeSort": 6,
                                    "rowId": "5D9DEFFAF51472FEE054001517BB4C6E"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "厨房小家电",
                            "userTypeSort": 6,
                            "rowId": null
                        }
                    ],
                    "brand": "卡菲塔利",
                    "brandCode": "Caffitaly"
                },
                {
                    "brandSort": 18,
                    "productTypeDTOList": [
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U04",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U04",
                                    "prodCode": "1132",
                                    "children": [],
                                    "orgCode": "CS002",
                                    "userTypeName": "热水器",
                                    "prodName": "空气能热水机",
                                    "userTypeSort": 3,
                                    "rowId": "6A1D0FC997B667BAE05400144FFB1D03"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U04",
                                    "prodCode": "1133",
                                    "children": [],
                                    "orgCode": "CS002",
                                    "userTypeName": "热水器",
                                    "prodName": "燃气壁挂炉",
                                    "userTypeSort": 3,
                                    "rowId": "6A1D0FC997B767BAE05400144FFB1D03"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "热水器",
                            "userTypeSort": 3,
                            "rowId": null
                        },
                        {
                            "prodLevel": "1",
                            "userTypeCode": null,
                            "prodCode": "U99",
                            "children": [
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U99",
                                    "prodCode": "1130",
                                    "children": [],
                                    "orgCode": "CS002",
                                    "userTypeName": "中央空调",
                                    "prodName": "单元机",
                                    "userTypeSort": 10,
                                    "rowId": "6A1D0FC997B367BAE05400144FFB1D03"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U99",
                                    "prodCode": "1131",
                                    "children": [],
                                    "orgCode": "CS002",
                                    "userTypeName": "中央空调",
                                    "prodName": "风冷模块",
                                    "userTypeSort": 10,
                                    "rowId": "6A1D0FC997B467BAE05400144FFB1D03"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U99",
                                    "prodCode": "1137",
                                    "children": [],
                                    "orgCode": "CS002",
                                    "userTypeName": "中央空调",
                                    "prodName": "风机盘管",
                                    "userTypeSort": 10,
                                    "rowId": "6A1D0FC997B567BAE05400144FFB1D03"
                                },
                                {
                                    "prodLevel": "2",
                                    "userTypeCode": "U99",
                                    "prodCode": "1129",
                                    "children": [],
                                    "orgCode": "CS002",
                                    "userTypeName": "中央空调",
                                    "prodName": "多联式中央空调",
                                    "userTypeSort": 10,
                                    "rowId": "6A1D0FC997B967BAE05400144FFB1D03"
                                }
                            ],
                            "orgCode": null,
                            "userTypeName": null,
                            "prodName": "中央空调",
                            "userTypeSort": 10,
                            "rowId": null
                        }
                    ],
                    "brand": "克来沃",
                    "brandCode": "Clivet"
                }
            ],
            "msg": "操作成功"
        }
    },
    {
        path: "/wxgw/css/faultType",
        data: {
            "code": "0",
            "data": [
                {
                    "serviceRequireCode": "BX01007",
                    "serviceRequireId": 27,
                    "serviceRequireName": "不通电"
                },
                {
                    "serviceRequireCode": "BX01017",
                    "serviceRequireId": 46,
                    "serviceRequireName": "声音异常/噪音大"
                },
                {
                    "serviceRequireCode": "BX01020",
                    "serviceRequireId": 63,
                    "serviceRequireName": "通电不加热/加热异常"
                },
                {
                    "serviceRequireCode": "BX02093",
                    "serviceRequireId": 108,
                    "serviceRequireName": "生锈"
                },
                {
                    "serviceRequireCode": "BX01033",
                    "serviceRequireId": 180,
                    "serviceRequireName": "指示灯不亮"
                },
                {
                    "serviceRequireCode": "BX01081",
                    "serviceRequireId": 207,
                    "serviceRequireName": "按键/旋钮失灵"
                },
                {
                    "serviceRequireCode": "BX01016",
                    "serviceRequireId": 327,
                    "serviceRequireName": "其它（请说明）"
                }
            ],
            "msg": "操作成功"
        }
    },
    {
        path: "wxgw/css/excludedFault",
        data: {
            "code": "0",
            "data": [
                {
                    "pubCreateDateBeginStr": null,
                    "pubModiPerson": "system",
                    "pubCreateDateStr": "2017-11-25 00:00:00",
                    "pubValidly": "Y",
                    "pubCreateDate": 1511539200000,
                    "faultSolutionDesc": "请确认插座开关已打开，并尝试重新插好电源线，并再次按下“启动/暂停”键试试。若还是不行，请提交服务单进行维修",
                    "excludedFaultCode": "EF0531",
                    "pubCreateDateEndStr": null,
                    "orgCode": "CS007",
                    "prodName": "洗衣机",
                    "pubModiDateBeginStr": null,
                    "serviceRequireItemCode": "BX01007",
                    "pubModiDateStr": "2017-11-25 00:00:00",
                    "excludedFaultId": "7031",
                    "serviceRequireId": "1000014152",
                    "pubCreatePerson": "system",
                    "faultReason": "家中停电、插座开关未打开、电源线接触不良，也可能忘记了按下“启动/暂停”键",
                    "sortNo": null,
                    "prodCode": "1006",
                    "faultServiceDesc": "插座开关已打开了么？",
                    "pubRemark": "初始化数据导入",
                    "pubModiDateEndStr": null,
                    "excludedFaultName": "不通电",
                    "serviceRequireItemName": "不通电",
                    "pubModiDate": 1511539200000
                }
            ],
            "msg": "操作成功"
        }
    },
    {
        path: "mideaService/getFeePlocy",
        data: {
            "error": null,
            "content": [
                {
                    "unit": "元/米",
                    "chargeStandard": "90",
                    "classACode": "112",
                    "classBCode": "1122079",
                    "classCCode": "11220793257",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "京东自营",
                    "classCProject": "挂机加长铜管",
                    "pubRemark": null
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "120",
                    "classACode": "112",
                    "classBCode": "1122079",
                    "classCCode": "11220793263",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "京东自营",
                    "classCProject": "柜机加长铜管",
                    "pubRemark": null
                },
                {
                    "unit": "元/公里",
                    "chargeStandard": "1.5",
                    "classACode": "110",
                    "classBCode": "1102118",
                    "classCCode": "11021183616",
                    "classAProject": "上门费",
                    "classBProject": "线下购买",
                    "classCProject": "远程上门费",
                    "pubRemark": "安装及市外包外维修，服务地点服务网点所在地20公里（含）以上，远程费用=实际里程（单程）*1.5元/公里；服务地点距服务网点20公里内免收上门费"
                },
                {
                    "unit": "元/公里",
                    "chargeStandard": "1",
                    "classACode": "110",
                    "classBCode": "1102117",
                    "classCCode": "11021173616",
                    "classAProject": "上门费",
                    "classBProject": "线上购买（京东自营）",
                    "classCProject": "远程上门费",
                    "pubRemark": "服务地点距服务网点所在地20公里（含）以上，安装及市外包外维修，远程费用=实际里程（单程）*1.0元/公里"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "180",
                    "classACode": "103",
                    "classBCode": "1032047",
                    "classCCode": "10320473640",
                    "classAProject": "包外维修",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "中修（人工费）",
                    "pubRemark": "\"1、更换：电辅助加热器、风机风叶、电机支架、室内外风扇电机、蒸发器、连接管、室内底盘、室外电路板。2、调整处理：内外机连接管补焊加氟、系统管路脏堵、重做喇叭口。3、适用范围：窗机及移动空调\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "220",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205836401 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "中修（人工费）",
                    "pubRemark": "\"1、更换：电辅助加热器、风机风叶、电机支架、室内外风扇电机、蒸发器、连接管、室内底盘、室外电路板。2、调整处理：内外机连接管补焊加氟、系统管路脏堵、重做喇叭口。3、适用范围：分体落地式（5100<Q≤8100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "240",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205836402 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "中修（人工费）",
                    "pubRemark": "\"1、更换：电辅助加热器、风机风叶、电机支架、室内外风扇电机、蒸发器、连接管、室内底盘、室外电路板。2、调整处理：内外机连接管补焊加氟、系统管路脏堵、重做喇叭口。3、适用范围：分体落地式（14000<Q≤20000）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "30",
                    "classACode": "103",
                    "classBCode": "1032074",
                    "classCCode": "10320743414",
                    "classAProject": "包外维修",
                    "classBProject": "简修",
                    "classCProject": "普通清洗（含清洗滤网）",
                    "pubRemark": "同一用户一起清洗1套以上的，每多一台加收20元/套"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "150",
                    "classACode": "103",
                    "classBCode": "1032074",
                    "classCCode": "10320743264",
                    "classAProject": "包外维修",
                    "classBProject": "简修",
                    "classCProject": "柜机深度清洗",
                    "pubRemark": "柜机深度清洗收费标准（含冷凝器和蒸发器清洗），同一用户一起清洗1套以上的，每多一套加收50元/套"
                },
                {
                    "unit": "元/次",
                    "chargeStandard": "30",
                    "classACode": "103",
                    "classBCode": "1032074",
                    "classCCode": "10320743354",
                    "classAProject": "包外维修",
                    "classBProject": "简修",
                    "classCProject": "空调保养",
                    "pubRemark": "机器无问题保养、上门检查机器无问题、加长排水嘴、加长水管。更换遥控器、换电池、更换空气滤清器、更换光触媒。"
                },
                {
                    "unit": "元/次",
                    "chargeStandard": "50",
                    "classACode": "103",
                    "classBCode": "1032074",
                    "classCCode": "10320743254",
                    "classAProject": "包外维修",
                    "classBProject": "简修",
                    "classCProject": "更换小零部件",
                    "pubRemark": "更换面框、保险管、负离子发生器、进风格栅、出风罩、排水管、接线座、接线端子、导风板、开关膜。"
                },
                {
                    "unit": "元/次",
                    "chargeStandard": "50",
                    "classACode": "103",
                    "classBCode": "1032074",
                    "classCCode": "10320743337",
                    "classAProject": "包外维修",
                    "classBProject": "简修",
                    "classCProject": "接线错调整、内机噪音调整",
                    "pubRemark": null
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "200",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205836403 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "中修（人工费）",
                    "pubRemark": "\"1、更换：电辅助加热器、风机风叶、电机支架、室内外风扇电机、蒸发器、连接管、室内底盘、室外电路板。2、调整处理：内外机连接管补焊加氟、系统管路脏堵、重做喇叭口。3、适用范围：分体落地式（Q≤5100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "220",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205836404 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "中修（人工费）",
                    "pubRemark": "\"1、更换：电辅助加热器、风机风叶、电机支架、室内外风扇电机、蒸发器、连接管、室内底盘、室外电路板。2、调整处理：内外机连接管补焊加氟、系统管路脏堵、重做喇叭口。3、适用范围：分体落地式（8100<Q≤11000）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "240",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205836405 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "中修（人工费）",
                    "pubRemark": "\"1、更换：电辅助加热器、风机风叶、电机支架、室内外风扇电机、蒸发器、连接管、室内底盘、室外电路板。2、调整处理：内外机连接管补焊加氟、系统管路脏堵、重做喇叭口。3、适用范围：分体落地式（11000<Q≤14000）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "95",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205835711 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "小修（人工费）",
                    "pubRemark": "\"1、更换：电容、摆风开关、静电除尘器、蜗壳、变压器、传感器、接触器、感温头、电辅热温控器、步进电机、同步电机、电磁阀线圈、四通阀线圈、接水盘、控制面板、室内电路板、过载保护、排水泵、信号线、窗机机械式温控器等。2、调整处理：换气装置、系统管路噪音处理、高低压阀调整、调整漏水、清洗蒸发器冷凝器翅片。3、适用范围：分体落地式（11000<Q≤14000）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "95",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205835712 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "小修（人工费）",
                    "pubRemark": "\"1、更换：电容、摆风开关、静电除尘器、蜗壳、变压器、传感器、接触器、感温头、电辅热温控器、步进电机、同步电机、电磁阀线圈、四通阀线圈、接水盘、控制面板、室内电路板、过载保护、排水泵、信号线、窗机机械式温控器等。2、调整处理：换气装置、系统管路噪音处理、高低压阀调整、调整漏水、清洗蒸发器冷凝器翅片。3、适用范围：分体落地式（5100<Q≤8100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "95",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205835713 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "小修（人工费）",
                    "pubRemark": "\"1、更换：电容、摆风开关、静电除尘器、蜗壳、变压器、传感器、接触器、感温头、电辅热温控器、步进电机、同步电机、电磁阀线圈、四通阀线圈、接水盘、控制面板、室内电路板、过载保护、排水泵、信号线、窗机机械式温控器等。2、调整处理：换气装置、系统管路噪音处理、高低压阀调整、调整漏水、清洗蒸发器冷凝器翅片。3、适用范围：分体落地式（8100<Q≤11000）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "95",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205835714 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "小修（人工费）",
                    "pubRemark": "\"1、更换：电容、摆风开关、静电除尘器、蜗壳、变压器、传感器、接触器、感温头、电辅热温控器、步进电机、同步电机、电磁阀线圈、四通阀线圈、接水盘、控制面板、室内电路板、过载保护、排水泵、信号线、窗机机械式温控器等。2、调整处理：换气装置、系统管路噪音处理、高低压阀调整、调整漏水、清洗蒸发器冷凝器翅片。3、适用范围：分体落地式（14000<Q≤20000）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "70",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205835715 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "小修（人工费）",
                    "pubRemark": "\"1、更换：电容、摆风开关、静电除尘器、蜗壳、变压器、传感器、接触器、感温头、电辅热温控器、步进电机、同步电机、电磁阀线圈、四通阀线圈、接水盘、控制面板、室内电路板、过载保护、排水泵、信号线、窗机机械式温控器等。2、调整处理：换气装置、系统管路噪音处理、高低压阀调整、调整漏水、清洗蒸发器冷凝器翅片。3、适用范围：分体落地式（Q≤5100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "320",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205831181 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "大修（人工费）",
                    "pubRemark": "\"1、更换：压缩机、四通阀、冷凝器、高低压阀、压力开关、单向阀、膨胀阀、电磁阀、过滤器、毛细管。2、调整处理：毛细管冰堵。3、适用范围：分体落地式（5100<Q≤8100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "400",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205831182 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "大修（人工费）",
                    "pubRemark": "\"1、更换：压缩机、四通阀、冷凝器、高低压阀、压力开关、单向阀、膨胀阀、电磁阀、过滤器、毛细管。2、调整处理：毛细管冰堵。3、适用范围：分体落地式（11000<Q≤14000）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "270",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205831183 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "大修（人工费）",
                    "pubRemark": "\"1、更换：压缩机、四通阀、冷凝器、高低压阀、压力开关、单向阀、膨胀阀、电磁阀、过滤器、毛细管。2、调整处理：毛细管冰堵。3、适用范围：分体落地式（Q≤5100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "320",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205831184 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "大修（人工费）",
                    "pubRemark": "\"1、更换：压缩机、四通阀、冷凝器、高低压阀、压力开关、单向阀、膨胀阀、电磁阀、过滤器、毛细管。2、调整处理：毛细管冰堵。3、适用范围：分体落地式（8100<Q≤11000）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "400",
                    "classACode": "103",
                    "classBCode": "1032058",
                    "classCCode": "103205831185 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体落地式空调",
                    "classCProject": "大修（人工费）",
                    "pubRemark": "\"1、更换：压缩机、四通阀、冷凝器、高低压阀、压力开关、单向阀、膨胀阀、电磁阀、过滤器、毛细管。2、调整处理：毛细管冰堵。3、适用范围：分体落地式（14000<Q≤20000）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "180",
                    "classACode": "103",
                    "classBCode": "1032057",
                    "classCCode": "103205736401 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体挂壁式空调",
                    "classCProject": "中修（人工费）",
                    "pubRemark": "\"1、更换：电辅助加热器、风机风叶、电机支架、室内外风扇电机、蒸发器、连接管、室内底盘、室外电路板。2、调整处理：内外机连接管补焊加氟、系统管路脏堵、重做喇叭口。3、适用范围：分体挂壁式（3900<Q≤5100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "240",
                    "classACode": "103",
                    "classBCode": "1032057",
                    "classCCode": "103205736402 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体挂壁式空调",
                    "classCProject": "中修（人工费）",
                    "pubRemark": "\"1、更换：电辅助加热器、风机风叶、电机支架、室内外风扇电机、蒸发器、连接管、室内底盘、室外电路板。2、调整处理：内外机连接管补焊加氟、系统管路脏堵、重做喇叭口。3、适用范围：分体挂壁式（Q>8100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "180",
                    "classACode": "103",
                    "classBCode": "1032057",
                    "classCCode": "103205736403 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体挂壁式空调",
                    "classCProject": "中修（人工费）",
                    "pubRemark": "\"1、更换：电辅助加热器、风机风叶、电机支架、室内外风扇电机、蒸发器、连接管、室内底盘、室外电路板。2、调整处理：内外机连接管补焊加氟、系统管路脏堵、重做喇叭口。3、适用范围：分体挂壁式（Q≤3900）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "200",
                    "classACode": "103",
                    "classBCode": "1032057",
                    "classCCode": "103205736404 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体挂壁式空调",
                    "classCProject": "中修（人工费）",
                    "pubRemark": "\"1、更换：电辅助加热器、风机风叶、电机支架、室内外风扇电机、蒸发器、连接管、室内底盘、室外电路板。2、调整处理：内外机连接管补焊加氟、系统管路脏堵、重做喇叭口。3、适用范围：分体挂壁式（Q>5100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "70",
                    "classACode": "103",
                    "classBCode": "1032057",
                    "classCCode": "103205735711 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体挂壁式空调",
                    "classCProject": "小修（人工费）",
                    "pubRemark": "\"1、更换：电容、摆风开关、静电除尘器、蜗壳、变压器、传感器、接触器、感温头、电辅热温控器、步进电机、同步电机、电磁阀线圈、四通阀线圈、接水盘、控制面板、室内电路板、过载保护、排水泵、信号线、窗机机械式温控器等。2、调整处理：换气装置、系统管路噪音处理、高低压阀调整、调整漏水、清洗蒸发器冷凝器翅片。3、适用范围：分体挂壁式（Q>5100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "95",
                    "classACode": "103",
                    "classBCode": "1032057",
                    "classCCode": "103205735712 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体挂壁式空调",
                    "classCProject": "小修（人工费）",
                    "pubRemark": "\"1、更换：电容、摆风开关、静电除尘器、蜗壳、变压器、传感器、接触器、感温头、电辅热温控器、步进电机、同步电机、电磁阀线圈、四通阀线圈、接水盘、控制面板、室内电路板、过载保护、排水泵、信号线、窗机机械式温控器等。2、调整处理：换气装置、系统管路噪音处理、高低压阀调整、调整漏水、清洗蒸发器冷凝器翅片。3、适用范围：分体挂壁式（Q>8100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "70",
                    "classACode": "103",
                    "classBCode": "1032057",
                    "classCCode": "103205735713 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体挂壁式空调",
                    "classCProject": "小修（人工费）",
                    "pubRemark": "\"1、更换：电容、摆风开关、静电除尘器、蜗壳、变压器、传感器、接触器、感温头、电辅热温控器、步进电机、同步电机、电磁阀线圈、四通阀线圈、接水盘、控制面板、室内电路板、过载保护、排水泵、信号线、窗机机械式温控器等。2、调整处理：换气装置、系统管路噪音处理、高低压阀调整、调整漏水、清洗蒸发器冷凝器翅片。3、适用范围：分体挂壁式（Q≤3900）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "70",
                    "classACode": "103",
                    "classBCode": "1032057",
                    "classCCode": "103205735714 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体挂壁式空调",
                    "classCProject": "小修（人工费）",
                    "pubRemark": "\"1、更换：电容、摆风开关、静电除尘器、蜗壳、变压器、传感器、接触器、感温头、电辅热温控器、步进电机、同步电机、电磁阀线圈、四通阀线圈、接水盘、控制面板、室内电路板、过载保护、排水泵、信号线、窗机机械式温控器等。2、调整处理：换气装置、系统管路噪音处理、高低压阀调整、调整漏水、清洗蒸发器冷凝器翅片。3、适用范围：分体挂壁式（3900<Q≤5100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "250",
                    "classACode": "103",
                    "classBCode": "1032057",
                    "classCCode": "103205731181 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体挂壁式空调",
                    "classCProject": "大修（人工费）",
                    "pubRemark": "\"1、更换：压缩机、四通阀、冷凝器、高低压阀、压力开关、单向阀、膨胀阀、电磁阀、过滤器、毛细管。2、调整处理：毛细管冰堵。3、适用范围：分体挂壁式（3900<Q≤5100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "270",
                    "classACode": "103",
                    "classBCode": "1032057",
                    "classCCode": "103205731182 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体挂壁式空调",
                    "classCProject": "大修（人工费）",
                    "pubRemark": "\"1、更换：压缩机、四通阀、冷凝器、高低压阀、压力开关、单向阀、膨胀阀、电磁阀、过滤器、毛细管。2、调整处理：毛细管冰堵。3、适用范围：分体挂壁式（Q>5100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "420",
                    "classACode": "103",
                    "classBCode": "1032057",
                    "classCCode": "103205731183 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体挂壁式空调",
                    "classCProject": "大修（人工费）",
                    "pubRemark": "\"1、更换：压缩机、四通阀、冷凝器、高低压阀、压力开关、单向阀、膨胀阀、电磁阀、过滤器、毛细管。2、调整处理：毛细管冰堵。3、适用范围：分体挂壁式（Q>8100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "250",
                    "classACode": "103",
                    "classBCode": "1032057",
                    "classCCode": "103205731184 ",
                    "classAProject": "包外维修",
                    "classBProject": "分体挂壁式空调",
                    "classCProject": "大修（人工费）",
                    "pubRemark": "\"1、更换：压缩机、四通阀、冷凝器、高低压阀、压力开关、单向阀、膨胀阀、电磁阀、过滤器、毛细管。2、调整处理：毛细管冰堵。3、适用范围：分体挂壁式（3900<Q≤5100）\""
                },
                {
                    "unit": "元/次",
                    "chargeStandard": "50",
                    "classACode": "113",
                    "classBCode": "1132040",
                    "classCCode": "11320403090",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "拆防盗网",
                    "classCProject": "拆卸一般防盗网",
                    "pubRemark": "防盗网、防盗窗为螺栓、螺丝等连接可使用一般工具拆卸的情况，根据难度协商收费，最高收取100元/次，差价体现在协商收费项中"
                },
                {
                    "unit": "元/次",
                    "chargeStandard": "50",
                    "classACode": "113",
                    "classBCode": "1132067",
                    "classCCode": "11320673283",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "划割玻璃",
                    "classCProject": "划割玻璃（2块以内）",
                    "pubRemark": "划割玻璃数2块及2块以下"
                },
                {
                    "unit": "元/次",
                    "chargeStandard": "80",
                    "classACode": "113",
                    "classBCode": "1132067",
                    "classCCode": "11320673284",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "划割玻璃",
                    "classCProject": "划割玻璃（2块以上）",
                    "pubRemark": "划割玻璃数2块以上，最高收取100元/次，差价体现在协商收费项中"
                },
                {
                    "unit": "元/次",
                    "chargeStandard": "50",
                    "classACode": "113",
                    "classBCode": "1132131",
                    "classCCode": "11321313663",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "钻孔",
                    "classCProject": "钻孔",
                    "pubRemark": "超过40CM的砖墙、钢筋混凝土墙钻孔，特殊情况另行协商"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "200",
                    "classACode": "113",
                    "classBCode": "1132061",
                    "classCCode": "11320613246",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "高空作业",
                    "classCProject": "高空作业费：11楼及以上",
                    "pubRemark": "\"1、十一楼以上不需使用吊车或吊篮的高空作业，特殊情况另行协商2、一个用户多台安装200元封顶\""
                },
                {
                    "unit": "元/次",
                    "chargeStandard": "800",
                    "classACode": "113",
                    "classBCode": "1132061",
                    "classCCode": "11320613193",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "高空作业",
                    "classCProject": "吊车作业",
                    "pubRemark": "墙外施工，需要使用吊车作业，视操作难度而定，最高收取1000元/次，差价体现在协商收费项中，特殊情况另行协商"
                },
                {
                    "unit": "元/个",
                    "chargeStandard": "90",
                    "classACode": "113",
                    "classBCode": "1132052",
                    "classCCode": "11320523370",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "电源改造",
                    "classCProject": "漏电保护开关安装",
                    "pubRemark": "含漏电保护开关配件费，需由有电工操作资格的人员完成"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "100",
                    "classACode": "113",
                    "classBCode": "1132070",
                    "classCCode": "11320703309",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "加长铜管（R22制冷剂）",
                    "classCProject": "加长铜管（3000≤Q≤5200）",
                    "pubRemark": "加长管不足1米的按1米标准收费，超过1米按实际长度计算收费。加长管包括应加长部分的电源线、信号线、保温套、排水管、焊接及适量补充制冷剂等费用。适用规格：R22，3000≤Q≤5200"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "240",
                    "classACode": "113",
                    "classBCode": "1132070",
                    "classCCode": "11320703312",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "加长铜管（R22制冷剂）",
                    "classCProject": "加长铜管（Q≥20000）",
                    "pubRemark": "加长管不足1米的按1米标准收费，超过1米按实际长度计算收费。加长管包括应加长部分的电源线、信号线、保温套、排水管、焊接及适量补充制冷剂等费用。适用规格：R22，Q≥20000"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "110",
                    "classACode": "113",
                    "classBCode": "1132071",
                    "classCCode": "11320713313",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "加长铜管（R410A制冷剂）",
                    "classCProject": "加长铜管（R410A，3000≤Q≤5200）",
                    "pubRemark": "加长管不足1米的按1米标准收费，超过1米按实际长度计算收费。加长管包括应加长部分的电源线、信号线、保温套、排水管、焊接及适量补充制冷剂等费用。适用规格：R410A，3000≤Q≤5200"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "240",
                    "classACode": "113",
                    "classBCode": "1132071",
                    "classCCode": "11320713312",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "加长铜管（R410A制冷剂）",
                    "classCProject": "加长铜管（Q≥20000）",
                    "pubRemark": "加长管不足1米的按1米标准收费，超过1米按实际长度计算收费。加长管包括应加长部分的电源线、信号线、保温套、排水管、焊接及适量补充制冷剂等费用。适用规格：R410A，Q≥20000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "112",
                    "classBCode": "1122055",
                    "classCCode": "11220553247",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "非京东自营",
                    "classCProject": "高空作业费：4楼以上",
                    "pubRemark": "4楼（含）-10楼（含），1家装多台：200元封顶"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "112",
                    "classBCode": "1122079",
                    "classCCode": "11220793247",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "京东自营",
                    "classCProject": "高空作业费：4楼以上",
                    "pubRemark": "\"1、从楼顶通过吊绳、吊板等方式安装，200元/台2、1家装多台：不封顶\""
                },
                {
                    "unit": "元/个",
                    "chargeStandard": "50",
                    "classACode": "112",
                    "classBCode": "1122055",
                    "classCCode": "11220553282",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "非京东自营",
                    "classCProject": "厚墙钻孔",
                    "pubRemark": "超40CM特殊墙，特殊情况另行协商，费用差价体现在协商收费项中"
                },
                {
                    "unit": "元/个",
                    "chargeStandard": "0",
                    "classACode": "112",
                    "classBCode": "1122079",
                    "classCCode": "11220793390",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "京东自营",
                    "classCProject": "免费钻孔",
                    "pubRemark": "普通砖墙冲击钻非一次性成孔免费"
                },
                {
                    "unit": "元/个",
                    "chargeStandard": "80",
                    "classACode": "112",
                    "classBCode": "1122079",
                    "classCCode": "11220793244",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "京东自营",
                    "classCProject": "钢混墙钻孔",
                    "pubRemark": "钢筋混凝土墙水钻80元/个，新疆区钢筋混凝土墙150元个，费用差价体现在协商收费项中"
                },
                {
                    "unit": "元/副",
                    "chargeStandard": "30",
                    "classACode": "113",
                    "classBCode": "1132108",
                    "classCCode": "113210834661 ",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "室外安装支架",
                    "classCProject": "室外安装普通支架",
                    "pubRemark": "空调规格：2P及以下。若当地卖场体系有相关规定的，可参考卖场标准。含普通膨胀螺栓零件费用，如果使用加长膨胀螺钉，额外计费"
                },
                {
                    "unit": "元/副",
                    "chargeStandard": "50",
                    "classACode": "113",
                    "classBCode": "1132108",
                    "classCCode": "113210834662 ",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "室外安装支架",
                    "classCProject": "室外安装普通支架",
                    "pubRemark": "空调规格：3P。若当地卖场体系有相关规定的，可参考卖场标准。含普通膨胀螺栓零件费用，如果使用加长膨胀螺钉，额外计费"
                },
                {
                    "unit": "元/副",
                    "chargeStandard": "80",
                    "classACode": "113",
                    "classBCode": "1132108",
                    "classCCode": "113210834663 ",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "室外安装支架",
                    "classCProject": "室外安装普通支架",
                    "pubRemark": "空调规格：5P。若当地卖场体系有相关规定的，可参考卖场标准。含普通膨胀螺栓零件费用，如果使用加长膨胀螺钉，额外计费"
                },
                {
                    "unit": "元/副",
                    "chargeStandard": "80",
                    "classACode": "113",
                    "classBCode": "1132108",
                    "classCCode": "113210834651 ",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "室外安装支架",
                    "classCProject": "室外安装不锈钢支架",
                    "pubRemark": "空调规格：2P及以下。若当地卖场体系有相关规定的，可参考卖场标准。含普通膨胀螺栓零件费用，如果使用加长膨胀螺钉，额外计费"
                },
                {
                    "unit": "元/副",
                    "chargeStandard": "170",
                    "classACode": "113",
                    "classBCode": "1132108",
                    "classCCode": "113210834652 ",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "室外安装支架",
                    "classCProject": "室外安装不锈钢支架",
                    "pubRemark": "空调规格：3P。若当地卖场体系有相关规定的，可参考卖场标准。含普通膨胀螺栓零件费用，如果使用加长膨胀螺钉，额外计费"
                },
                {
                    "unit": "元/副",
                    "chargeStandard": "220",
                    "classACode": "113",
                    "classBCode": "1132108",
                    "classCCode": "113210834653 ",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "室外安装支架",
                    "classCProject": "室外安装不锈钢支架",
                    "pubRemark": "空调规格：5P。若当地卖场体系有相关规定的，可参考卖场标准。含普通膨胀螺栓零件费用，如果使用加长膨胀螺钉，额外计费"
                },
                {
                    "unit": "元/副",
                    "chargeStandard": "40",
                    "classACode": "112",
                    "classBCode": "1122079",
                    "classCCode": "112207934661 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "京东自营",
                    "classCProject": "室外安装普通支架",
                    "pubRemark": "挂机"
                },
                {
                    "unit": "元/副",
                    "chargeStandard": "60",
                    "classACode": "112",
                    "classBCode": "1122079",
                    "classCCode": "112207934662 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "京东自营",
                    "classCProject": "室外安装普通支架",
                    "pubRemark": "普通柜机"
                },
                {
                    "unit": "协商项",
                    "chargeStandard": "0",
                    "classACode": "112",
                    "classBCode": "1122079",
                    "classCCode": "112207934651 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "京东自营",
                    "classCProject": "室外安装不锈钢支架",
                    "pubRemark": "挂机，按实际制作费用收取，费用体现在协商收费项中"
                },
                {
                    "unit": "协商项",
                    "chargeStandard": "0",
                    "classACode": "112",
                    "classBCode": "1122079",
                    "classCCode": "112207934652 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "京东自营",
                    "classCProject": "室外安装不锈钢支架",
                    "pubRemark": "柜机，按实际制作费用收取，费用体现在协商收费项中"
                },
                {
                    "unit": "元/个",
                    "chargeStandard": "90",
                    "classACode": "112",
                    "classBCode": "1122079",
                    "classCCode": "112207933691 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "京东自营",
                    "classCProject": "漏电保护开关",
                    "pubRemark": null
                },
                {
                    "unit": "元/个",
                    "chargeStandard": "100",
                    "classACode": "112",
                    "classBCode": "1122079",
                    "classCCode": "112207933692 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "京东自营",
                    "classCProject": "漏电保护开关",
                    "pubRemark": null
                },
                {
                    "unit": "元/副",
                    "chargeStandard": "30",
                    "classACode": "112",
                    "classBCode": "1122055",
                    "classCCode": "112205534661 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "非京东自营",
                    "classCProject": "室外安装普通支架",
                    "pubRemark": "2P及以下机型"
                },
                {
                    "unit": "元/副",
                    "chargeStandard": "50",
                    "classACode": "112",
                    "classBCode": "1122055",
                    "classCCode": "112205534662 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "非京东自营",
                    "classCProject": "室外安装普通支架",
                    "pubRemark": "2P-3P机型"
                },
                {
                    "unit": "元/副",
                    "chargeStandard": "80",
                    "classACode": "112",
                    "classBCode": "1122055",
                    "classCCode": "112205534651 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "非京东自营",
                    "classCProject": "室外安装不锈钢支架",
                    "pubRemark": "2P及以下机型"
                },
                {
                    "unit": "元/副",
                    "chargeStandard": "170",
                    "classACode": "112",
                    "classBCode": "1122055",
                    "classCCode": "112205534652 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "非京东自营",
                    "classCProject": "室外安装不锈钢支架",
                    "pubRemark": "2P-3P机型"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "80",
                    "classACode": "112",
                    "classBCode": "1122055",
                    "classCCode": "112205533071 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "非京东自营",
                    "classCProject": "加长铜管",
                    "pubRemark": "适用规格：R22，1P及以下"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "100",
                    "classACode": "112",
                    "classBCode": "1122055",
                    "classCCode": "112205533072 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "非京东自营",
                    "classCProject": "加长铜管",
                    "pubRemark": "适用规格：R22，2P-3P以上"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "120",
                    "classACode": "112",
                    "classBCode": "1122055",
                    "classCCode": "112205533073 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "非京东自营",
                    "classCProject": "加长铜管",
                    "pubRemark": "适用规格：R22，1P及以下"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "90",
                    "classACode": "112",
                    "classBCode": "1122055",
                    "classCCode": "112205533074 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "非京东自营",
                    "classCProject": "加长铜管",
                    "pubRemark": "适用规格：R410A/R32，1P及以下"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "110",
                    "classACode": "112",
                    "classBCode": "1122055",
                    "classCCode": "112205533075 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "非京东自营",
                    "classCProject": "加长铜管",
                    "pubRemark": "适用规格：R410A/R32，1.5P-2P(含)"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "130",
                    "classACode": "112",
                    "classBCode": "1122055",
                    "classCCode": "112205533076 ",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "非京东自营",
                    "classCProject": "加长铜管",
                    "pubRemark": "适用规格：R410A/R32，2P-3P以上"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "220",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930354 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R22，分体嵌入式Q＞8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "240",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930331 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R22，分体嵌入式Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "260",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930332 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R22，分体嵌入式Q＞8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "300",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930333 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R410A，分体嵌入式Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "320",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930334 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R410A，分体嵌入式Q＞8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "380",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836071 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R22，分体落地式8100＜Q≤11000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "520",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836072 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R22，分体落地式14000＜Q≤20000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "410",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836073 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R410A，分体落地式8100＜Q≤11000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "310",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836074 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R22，分体落地式Q≤5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "380",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836075 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R22，分体落地式5100＜Q≤8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "520",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836076 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R22，分体落地式11000＜Q≤14000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "300",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836077 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R410A，分体落地式Q≤5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "410",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836078 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R410A，分体落地式5100＜Q≤8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "560",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836079 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R410A，分体落地式11000＜Q≤14000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "560",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836070 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R410A，分体落地式14000＜Q≤20000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "180",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836061 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R22，分体落地式Q≤5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "250",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836062 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R22，分体落地式8100＜Q≤11000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "240",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836063 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R410A，分体落地式Q≤5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "310",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836064 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R410A，分体落地式8100＜Q≤11000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "360",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836065 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R410A，分体落地式14000＜Q≤20000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "250",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836066 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R22，分体落地式5100＜Q≤8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "300",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836067 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R22，分体落地式11000＜Q≤14000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "300",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836068 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R22，分体落地式14000＜Q≤20000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "310",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836069 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R410A，分体落地式5100＜Q≤8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "360",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836060 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R410A，分体落地式11000＜Q≤14000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "200",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836051 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R22，分体落地式5100＜Q≤8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "230",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836052 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R22，分体落地式11000＜Q≤14000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "260",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836053 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R410A，分体落地式5100＜Q≤8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "290",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836054 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R410A，分体落地式11000＜Q≤14000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "140",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836055 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R22，分体落地式Q≤5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/次",
                    "chargeStandard": "100",
                    "classACode": "113",
                    "classBCode": "1132040",
                    "classCCode": "11320403156",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "拆防盗网",
                    "classCProject": "电焊/切割拆卸防盗网",
                    "pubRemark": "防盗网、防盗窗为固定焊死，需用切割、电焊等方式拆卸的情况，根据难度协商收费，最高收取150元/次，差价体现在协商收费项中"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "113",
                    "classBCode": "1132061",
                    "classCCode": "11320613247",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "高空作业",
                    "classCProject": "高空作业费：4楼以上",
                    "pubRemark": "\"1、四楼至十楼（包含四楼）不需使用吊车或吊篮的高空作业，特殊情况另行协商2、一个用户多台安装200元封顶\""
                },
                {
                    "unit": "元/次",
                    "chargeStandard": "300",
                    "classACode": "113",
                    "classBCode": "1132061",
                    "classCCode": "11320613194",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "高空作业",
                    "classCProject": "吊篮 / 脚手架作业",
                    "pubRemark": "墙外施工，使用吊篮、脚手架作业，视操作难度而定，最高收取600元/次，差价体现在协商收费项中，特殊情况另行协商"
                },
                {
                    "unit": "元/次",
                    "chargeStandard": "50",
                    "classACode": "113",
                    "classBCode": "1132052",
                    "classCCode": "11320523355",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "电源改造",
                    "classCProject": "空调电源布线",
                    "pubRemark": "布线长度超过20米的另行商定，需由有电工操作资格的人员完成，此价格不含材料费"
                },
                {
                    "unit": "元/个",
                    "chargeStandard": "5",
                    "classACode": "113",
                    "classBCode": "1132108",
                    "classCCode": "11321083306",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "室外安装支架",
                    "classCProject": "加长膨胀螺钉",
                    "pubRemark": "加长膨胀螺钉一般用于在水泥、砖等材料上的紧固"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "80",
                    "classACode": "113",
                    "classBCode": "1132070",
                    "classCCode": "11320703311",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "加长铜管（R22制冷剂）",
                    "classCProject": "加长铜管（Q≤2800）",
                    "pubRemark": "加长管不足1米的按1米标准收费，超过1米按实际长度计算收费。加长管包括应加长部分的电源线、信号线、保温套、排水管、焊接及适量补充制冷剂等费用。适用规格：R22，Q≤2800"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "120",
                    "classACode": "113",
                    "classBCode": "1132070",
                    "classCCode": "11320703310",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "加长铜管（R22制冷剂）",
                    "classCProject": "加长铜管（6000≤Q≤8000）",
                    "pubRemark": "加长管不足1米的按1米标准收费，超过1米按实际长度计算收费。加长管包括应加长部分的电源线、信号线、保温套、排水管、焊接及适量补充制冷剂等费用。适用规格：R22，6000≤Q≤8000"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "180",
                    "classACode": "113",
                    "classBCode": "1132070",
                    "classCCode": "11320703308",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "加长铜管（R22制冷剂）",
                    "classCProject": "加长铜管（10000≤Q≤16000）",
                    "pubRemark": "加长管不足1米的按1米标准收费，超过1米按实际长度计算收费。加长管包括应加长部分的电源线、信号线、保温套、排水管、焊接及适量补充制冷剂等费用。适用规格：R22，10000≤Q≤16000"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "90",
                    "classACode": "113",
                    "classBCode": "1132071",
                    "classCCode": "11320713311",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "加长铜管（R410A制冷剂）",
                    "classCProject": "加长铜管（Q≤2800）",
                    "pubRemark": "加长管不足1米的按1米标准收费，超过1米按实际长度计算收费。加长管包括应加长部分的电源线、信号线、保温套、排水管、焊接及适量补充制冷剂等费用。适用规格：R410A，Q≤2800"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "130",
                    "classACode": "113",
                    "classBCode": "1132071",
                    "classCCode": "11320713310",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "加长铜管（R410A制冷剂）",
                    "classCProject": "加长铜管（6000≤Q≤8000）",
                    "pubRemark": "加长管不足1米的按1米标准收费，超过1米按实际长度计算收费。加长管包括应加长部分的电源线、信号线、保温套、排水管、焊接及适量补充制冷剂等费用。适用规格：R410A，6000≤Q≤8000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "95",
                    "classACode": "103",
                    "classBCode": "1032059",
                    "classCCode": "10320593571",
                    "classAProject": "包外维修",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "小修（人工费）",
                    "pubRemark": "\"1、更换：电容、摆风开关、静电除尘器、蜗壳、变压器、传感器、接触器、感温头、电辅热温控器、步进电机、同步电机、电磁阀线圈、四通阀线圈、接水盘、控制面板、室内电路板、过载保护、排水泵、信号线、窗机机械式温控器等。2、调整处理：换气装置、系统管路噪音处理、高低压阀调整、调整漏水、清洗蒸发器冷凝器翅片。3、适用范围：分体嵌入式（Q≤8100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "220",
                    "classACode": "103",
                    "classBCode": "1032059",
                    "classCCode": "10320593640",
                    "classAProject": "包外维修",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "中修（人工费）",
                    "pubRemark": "\"1、更换：电辅助加热器、风机风叶、电机支架、室内外风扇电机、蒸发器、连接管、室内底盘、室外电路板。2、调整处理：内外机连接管补焊加氟、系统管路脏堵、重做喇叭口。3、适用范围：分体嵌入式（Q≤8100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "230",
                    "classACode": "103",
                    "classBCode": "1032047",
                    "classCCode": "10320473118",
                    "classAProject": "包外维修",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "大修（人工费）",
                    "pubRemark": "\"1、更换：压缩机、四通阀、冷凝器、高低压阀、压力开关、单向阀、膨胀阀、电磁阀、过滤器、毛细管。2、调整处理：毛细管冰堵。3、适用范围：窗机及移动空调\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "600",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205936071 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R22，分体嵌入式Q＞8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "560",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205936072 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R410A，分体嵌入式Q≤8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "500",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205936073 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R22，分体嵌入式Q≤8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "660",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205936074 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R410A，分体嵌入式Q＞8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "250",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205936061 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R22，分体嵌入式Q≤8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "360",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205936062 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R410A，分体嵌入式Q＞8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "300",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205936063 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R22，分体嵌入式Q＞8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "310",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205936064 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R410A，分体嵌入式Q≤8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "300",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205936051 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R22，分体嵌入式Q≤8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "360",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205936052 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R410A，分体嵌入式Q≤8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "380",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205936053 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R22，分体嵌入式Q＞8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "440",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205936054 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R410A，分体嵌入式Q＞8100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "90",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205933021 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R22，分体嵌入式Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205933022 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R22，分体嵌入式Q＞8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "180",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205933023 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R410A，分体嵌入式Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "210",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205933024 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R410A，分体嵌入式Q＞8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "260",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930925 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "拆整机",
                    "pubRemark": "R22/R410A，分体嵌入式Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "320",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930926 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "拆整机",
                    "pubRemark": "R22/R410A，分体嵌入式Q＞8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "160",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930891 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "拆外机",
                    "pubRemark": "R22/R410A，分体嵌入式Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "200",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930892 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "拆外机",
                    "pubRemark": "R22/R410A，分体嵌入式Q＞8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "190",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930881 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "拆内机",
                    "pubRemark": "R22/R410A，分体嵌入式Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "220",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930882 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "拆内机",
                    "pubRemark": "R22/R410A，分体嵌入式Q＞8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "410",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930361 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R410A，分体嵌入式Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "460",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930362 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R410A，分体嵌入式Q＞8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "350",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930363 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R22，分体嵌入式Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "400",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930364 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R22，分体嵌入式Q＞8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "240",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930351 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R410A，分体嵌入式Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "280",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930352 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R410A，分体嵌入式Q＞8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "180",
                    "classACode": "102",
                    "classBCode": "1022059",
                    "classCCode": "102205930353 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R22，分体嵌入式Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "190",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830922 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆整机",
                    "pubRemark": "R22/R410A，分体落地式5100＜Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "250",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830923 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆整机",
                    "pubRemark": "R22/R410A，分体落地式11000＜Q≤14000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "190",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830924 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆整机",
                    "pubRemark": "R22/R410A，分体落地式8100＜Q≤11000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "290",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830925 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆整机",
                    "pubRemark": "R22/R410A，分体落地式14000＜Q≤20000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830891 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆外机",
                    "pubRemark": "R22/R410A，分体落地式Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "160",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830892 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆外机",
                    "pubRemark": "R22/R410A，分体落地式5100＜Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "160",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "1022058308983 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆外机",
                    "pubRemark": "R22/R410A，分体落地式8100＜Q≤11000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "190",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830894 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆外机",
                    "pubRemark": "R22/R410A，分体落地式11000＜Q≤14000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "210",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830895 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆外机",
                    "pubRemark": "R22/R410A，分体落地式14000＜Q≤20000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "70",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830881 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆内机",
                    "pubRemark": "R22/R410A，分体落地式Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830882 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆内机",
                    "pubRemark": "R22/R410A，分体落地式5100＜Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830883 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆内机",
                    "pubRemark": "R22/R410A，分体落地式8100＜Q≤11000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "150",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830884 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆内机",
                    "pubRemark": "R22/R410A，分体落地式11000＜Q≤14000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "170",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830885 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆内机",
                    "pubRemark": "R22/R410A，分体落地式14000＜Q≤20000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "210",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830361 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R410A，分体落地式Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "280",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830362 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R410A，分体落地式5100＜Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "280",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830363 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R410A，分体落地式8100＜Q≤11000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "350",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830364 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R410A，分体落地式11000＜Q≤14000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "390",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830365 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R410A，分体落地式14000＜Q≤20000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "150",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830366 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R22，分体落地式Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "220",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830367 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R22，分体落地式5100＜Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "220",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830368 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R22，分体落地式8100＜Q≤11000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "290",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830369 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R22，分体落地式11000＜Q≤14000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "330",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830360 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R22，分体落地式14000＜Q≤20000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "220",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830351 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R410A，分体落地式5100＜Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "220",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830352 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R410A，分体落地式8100＜Q≤11000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "280",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830353 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R410A，分体落地式11000＜Q≤14000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "300",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830354 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R410A，分体落地式14000＜Q≤20000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "120",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830355 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R22，分体落地式Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "160",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830356 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R22，分体落地式5100＜Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "160",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830357 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R22，分体落地式8100＜Q≤11000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "220",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830358 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R22，分体落地式11000＜Q≤14000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "180",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830359 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R410A，分体落地式Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "240",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830350 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R22，分体落地式14000＜Q≤20000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "90",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830331 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R22，分体落地式Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "120",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830332 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R22，分体落地式5100＜Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "120",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830333 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R22，分体落地式8100＜Q≤11000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "170",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830334 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R22，分体落地式11000＜Q≤14000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "200",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830335 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R22，分体落地式14000＜Q≤20000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "150",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830336 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R410A，分体落地式Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "180",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830337 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R410A，分体落地式5100＜Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "180",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830338 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R410A，分体落地式8100＜Q≤11000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "230",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830339 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R410A，分体落地式11000＜Q≤14000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "260",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830330 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R410A，分体落地式14000＜Q≤20000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "230",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636071 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R22，分体壁挂式Q≤3900；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "310",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636072 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R22，分体壁挂式Q＞5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "340",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636073 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R410A，分体壁挂式Q＞5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "240",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636074 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R22，分体壁挂式3900＜Q≤5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "250",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636075 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R410A，分体壁挂式Q≤3900；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "290",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636076 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移整机",
                    "pubRemark": "R410A，分体壁挂式3900＜Q≤5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "170",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636061 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R22，分体壁挂式3900＜Q≤5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "220",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636062 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R410A，分体壁挂式Q≤3900；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "160",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636063 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R22，分体壁挂式Q≤3900；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "200",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636064 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R22，分体壁挂式Q＞5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "230",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636065 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R410A，分体壁挂式3900＜Q≤5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "260",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636066 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移外机",
                    "pubRemark": "R410A，分体壁挂式Q＞5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "170",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636051 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R22，分体壁挂式Q＞5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/米",
                    "chargeStandard": "180",
                    "classACode": "113",
                    "classBCode": "1132071",
                    "classCCode": "11320713308",
                    "classAProject": "特殊环境（线下）",
                    "classBProject": "加长铜管（R410A制冷剂）",
                    "classCProject": "加长铜管（10000≤Q≤16000）",
                    "pubRemark": "加长管不足1米的按1米标准收费，超过1米按实际长度计算收费。加长管包括应加长部分的电源线、信号线、保温套、排水管、焊接及适量补充制冷剂等费用。适用规格：R410A，10000≤Q≤16000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "200",
                    "classACode": "112",
                    "classBCode": "1122055",
                    "classCCode": "11220553246",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "非京东自营",
                    "classCProject": "高空作业费：11楼及以上",
                    "pubRemark": "\"11楼（含）以上1、1家装多台：200元封顶2、除京东自营外，其他电商平台收费标准与线下标准保持一致。即电商渠道销售产品 (京东自营除外)与线下销售产品的售后收费标准保持一致，京东自营渠道销售产品与京东平台的售后收费标准保持一致，如因安装环境特殊，需租用吊车、吊篮、搭建脚手架等特种安装设备，实际产生费用由用户自行承担。\""
                },
                {
                    "unit": "元/个",
                    "chargeStandard": "50",
                    "classACode": "112",
                    "classBCode": "1122079",
                    "classCCode": "11220793486",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "京东自营",
                    "classCProject": "水钻钻孔",
                    "pubRemark": "普通砖墙使用水钻钻孔"
                },
                {
                    "unit": "协商项",
                    "chargeStandard": "0",
                    "classACode": "112",
                    "classBCode": "1122079",
                    "classCCode": "11220793660",
                    "classAProject": "特殊环境（线上）",
                    "classBProject": "京东自营",
                    "classCProject": "租用特种安装设备",
                    "pubRemark": "\"如因安装环境特殊，需租用吊车、吊篮、搭建脚手架等特种安装设备，实际产生费用由用户自行承担，费用体现在协商收费项中。除京东自营外，其他电商平台收费标准与线下标准保持一致。即电商渠道销售产品 (京东自营除外)与线下销售产品的售后收费标准保持一致，京东自营渠道销售产品与京东平台的售后收费标准保持一致。\""
                },
                {
                    "unit": "元/公里",
                    "chargeStandard": "1.5",
                    "classACode": "110",
                    "classBCode": "1102116",
                    "classCCode": "11021163616",
                    "classAProject": "上门费",
                    "classBProject": "线上购买（非京东自营）",
                    "classCProject": "远程上门费",
                    "pubRemark": "服务地点距服务网点所在地20公里（含）以上，安装及市外包外维修，远程费用=实际里程（单程）*1.5元/公里"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "70",
                    "classACode": "103",
                    "classBCode": "1032047",
                    "classCCode": "10320473571",
                    "classAProject": "包外维修",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "小修（人工费）",
                    "pubRemark": "\"1、更换：电容、摆风开关、静电除尘器、蜗壳、变压器、传感器、接触器、感温头、电辅热温控器、步进电机、同步电机、电磁阀线圈、四通阀线圈、接水盘、控制面板、室内电路板、过载保护、排水泵、信号线、窗机机械式温控器等。2、调整处理：换气装置、系统管路噪音处理、高低压阀调整、调整漏水、清洗蒸发器冷凝器翅片。3、适用范围：窗机及移动空调\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "380",
                    "classACode": "103",
                    "classBCode": "1032059",
                    "classCCode": "10320593118",
                    "classAProject": "包外维修",
                    "classBProject": "分体嵌入式空调",
                    "classCProject": "大修（人工费）",
                    "pubRemark": "\"1、更换：压缩机、四通阀、冷凝器、高低压阀、压力开关、单向阀、膨胀阀、电磁阀、过滤器、毛细管。2、调整处理：毛细管冰堵。3、适用范围：分体嵌入式（Q≤8100）\""
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "103",
                    "classBCode": "1032074",
                    "classCCode": "10320743258",
                    "classAProject": "包外维修",
                    "classBProject": "简修",
                    "classCProject": "挂机深度清洗",
                    "pubRemark": "挂机深度清洗收费标准（含冷凝器和蒸发器清洗），同一用户一起清洗1套以上的，每多一套加收50元/套"
                },
                {
                    "unit": "元/次",
                    "chargeStandard": "50",
                    "classACode": "103",
                    "classBCode": "1032074",
                    "classCCode": "10320743431",
                    "classAProject": "包外维修",
                    "classBProject": "简修",
                    "classCProject": "清洗类其他服务",
                    "pubRemark": "清洗换热器、清洗整机，机内异物排出、堵墙洞、贴防震胶，不含更换零配件的标准"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "200",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836056 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R22，分体落地式8100＜Q≤11000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "230",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836057 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R22，分体落地式14000＜Q≤20000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "200",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836058 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R410A，分体落地式Q≤5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "260",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836059 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R410A，分体落地式8100＜Q≤11000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "290",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205836050 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R410A，分体落地式14000＜Q≤20000；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "80",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205833021 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R22，分体落地式Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205833022 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R22，分体落地式5100＜Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205833023 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R22，分体落地式8100＜Q≤11000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "120",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205833024 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R22，分体落地式11000＜Q≤14000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "120",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205833025 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R22，分体落地式14000＜Q≤20000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "180",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205833026 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R410A，分体落地式Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "210",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205833027 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R410A，分体落地式5100＜Q≤8100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "210",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205833028 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R410A，分体落地式8100＜Q≤11000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "250",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205833029 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R410A，分体落地式11000＜Q≤14000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "250",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205833020 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R410A，分体落地式14000＜Q≤20000"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "120",
                    "classACode": "102",
                    "classBCode": "1022058",
                    "classCCode": "102205830921 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体落地式空调",
                    "classCProject": "拆整机",
                    "pubRemark": "R22/R410A，分体落地式Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "200",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636052 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R410A，分体壁挂式3900＜Q≤5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "110",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636053 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R22，分体壁挂式Q≤3900；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "140",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636054 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R22，分体壁挂式3900＜Q≤5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "170",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636055 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R410A，分体壁挂式Q≤3900；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "230",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205636056 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "移内机",
                    "pubRemark": "R410A，分体壁挂式Q＞5100；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "70",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205633021 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R22，分体壁挂式Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "70",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205633022 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R22，分体壁挂式3900＜Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "80",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205633023 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R22，分体壁挂式Q＞5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "150",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205633024 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R410A，分体壁挂式Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "150",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205633025 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R410A，分体壁挂式3900＜Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "200",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205633026 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "加氟",
                    "pubRemark": "R410A，分体壁挂式Q＞5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "130",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630921 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "拆整机",
                    "pubRemark": "R22/R410A，分体壁挂式3900＜Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "150",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630922 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "拆整机",
                    "pubRemark": "R22/R410A，分体壁挂式Q＞5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630923 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "拆整机",
                    "pubRemark": "R22/R410A，分体壁挂式Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "80",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630891 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "拆外机",
                    "pubRemark": "R22/R410A，分体壁挂式Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "120",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630892 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "拆外机",
                    "pubRemark": "R22/R410A，分体壁挂式Q＞5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630893 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "拆外机",
                    "pubRemark": "R22/R410A，分体壁挂式3900＜Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "60",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630881 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "拆内机",
                    "pubRemark": "R22/R410A，分体壁挂式Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "90",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630882 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "拆内机",
                    "pubRemark": "R22/R410A，分体壁挂式Q＞5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "80",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630883 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "拆内机",
                    "pubRemark": "R22/R410A，分体壁挂式3900＜Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "180",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630361 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R410A，分体壁挂式Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "250",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630362 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R410A，分体壁挂式Q＞5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "120",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630363 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R22，分体壁挂式Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "160",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630364 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R22，分体壁挂式3900＜Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "190",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630365 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R22，分体壁挂式Q＞5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "220",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630366 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R410A，分体壁挂式3900＜Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630351 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R22，分体壁挂式Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "120",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630352 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R22，分体壁挂式3900＜Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "160",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630353 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R22，分体壁挂式Q＞5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "160",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630354 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R410A，分体壁挂式Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "180",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630355 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R410A，分体壁挂式3900＜Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "220",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630356 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装外机",
                    "pubRemark": "R410A，分体壁挂式Q＞5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "70",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630331 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R22，分体壁挂式Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630332 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R22，分体壁挂式3900＜Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "110",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630333 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R22，分体壁挂式Q＞5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "130",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630334 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R410A，分体壁挂式Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "160",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630335 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R410A，分体壁挂式3900＜Q≤5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "170",
                    "classACode": "102",
                    "classBCode": "1022056",
                    "classCCode": "102205630336 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "分体壁挂式空调",
                    "classCProject": "安装内机",
                    "pubRemark": "R410A，分体壁挂式Q＞5100"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "120",
                    "classACode": "102",
                    "classBCode": "1022047",
                    "classCCode": "102204736071 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "移整机",
                    "pubRemark": "R22，窗机及移动空调Q≤3900；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "140",
                    "classACode": "102",
                    "classBCode": "1022047",
                    "classCCode": "102204736072 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "移整机",
                    "pubRemark": "R410A，窗机及移动空调Q＞3900；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "140",
                    "classACode": "102",
                    "classBCode": "1022047",
                    "classCCode": "102204736073 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "移整机",
                    "pubRemark": "R22，窗机及移动空调Q＞3900；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "120",
                    "classACode": "102",
                    "classBCode": "1022047",
                    "classCCode": "102204736074 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "移整机",
                    "pubRemark": "R410A，窗机及移动空调Q≤3900；运输费用及再次安装所产生的材料费用额外收取"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "60",
                    "classACode": "102",
                    "classBCode": "1022047",
                    "classCCode": "102204733021 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "加氟",
                    "pubRemark": "R22，窗机及移动空调Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "60",
                    "classACode": "102",
                    "classBCode": "1022047",
                    "classCCode": "102204733022 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "加氟",
                    "pubRemark": "R22，窗机及移动空调Q＞3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "150",
                    "classACode": "102",
                    "classBCode": "1022047",
                    "classCCode": "102204733023 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "加氟",
                    "pubRemark": "R410A，窗机及移动空调Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "150",
                    "classACode": "102",
                    "classBCode": "1022047",
                    "classCCode": "102204733024 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "加氟",
                    "pubRemark": "R410A，窗机及移动空调Q＞3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "80",
                    "classACode": "102",
                    "classBCode": "1022047",
                    "classCCode": "102204730921 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "拆整机",
                    "pubRemark": "R22/R410A，窗机及移动空调Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "102",
                    "classBCode": "1022047",
                    "classCCode": "102204730922 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "拆整机",
                    "pubRemark": "R22/R410A，窗机及移动空调Q＞3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "102",
                    "classBCode": "1022047",
                    "classCCode": "102204730361 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R410A，窗机及移动空调Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "120",
                    "classACode": "102",
                    "classBCode": "1022047",
                    "classCCode": "102204730362 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R410A，窗机及移动空调Q＞3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "100",
                    "classACode": "102",
                    "classBCode": "1022047",
                    "classCCode": "102204730363 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R22，窗机及移动空调Q≤3900"
                },
                {
                    "unit": "元/台",
                    "chargeStandard": "120",
                    "classACode": "102",
                    "classBCode": "1022047",
                    "classCCode": "102204730364 ",
                    "classAProject": "包外拆、装机",
                    "classBProject": "窗机及移动空调",
                    "classCProject": "安装整机",
                    "pubRemark": "R22，窗机及移动空调Q＞3900"
                }
            ],
            "totalCount": 281
        }
    },
    {
        path: "",
        data: {}
    },
    {
        path: "",
        data: {}
    },
    {
        path: "",
        data: {}
    },
    {
        path: "",
        data: {}
    },
    {
        path: "",
        data: {}
    },
    {
        path: "",
        data: {}
    },
    {
        path: "",
        data: {}
    }
]


function addToMock(list) {
    list.forEach(n => {
        Mock.mock(n.path, n.data)
    })
}

addToMock(all)

Mock.getMock = function (name) {
    let result = Mock.mock(Mock._mocked[name].template)
    console.log("mock data > " + name + ":", result)
    return result
}

export default Mock

