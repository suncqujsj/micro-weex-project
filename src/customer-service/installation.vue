<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
            <div slot="customerContent" class="header-right">
                <text class="header-right-text" @click="goTo('productSelection', {}, { from: 'installation', to:'chargeStandardList' })">收费标准</text>
            </div>
        </midea-header>
        <scroller class="content-wrapper">
            <div class="base-group">
                <midea-cell :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectProduct">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">安装产品</text>
                        <text class="cell-label-star">*</text>
                    </div>
                    <div slot="rightText">
                        <text class="right-text">{{selectedProductDesc}}</text>
                    </div>
                </midea-cell>
                <midea-cell v-if="includeU99" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectProductUse">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">使用场所</text>
                        <text class="cell-label-star">*</text>
                    </div>
                    <div slot="rightText">
                        <text class="right-text">{{productUseDesc}}</text>
                    </div>
                </midea-cell>
                <midea-cell :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectTransportStatus">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">物流状态</text>
                        <text class="cell-label-star">*</text>
                    </div>
                    <div slot="rightText">
                        <text class="right-text">{{transportStatusDesc}}</text>
                    </div>
                </midea-cell>
                <midea-cell :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectServiePeriod">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">期望服务时间</text>
                        <text class="cell-label-star">*</text>
                    </div>
                    <div slot="rightText">
                        <text class="right-text">{{serviePeriodDesc}}</text>
                    </div>
                </midea-cell>
                <midea-cell :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectAddress">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">服务地址</text>
                        <text class="cell-label-star">*</text>
                    </div>
                    <div slot="rightText">
                        <text class="right-text">{{userAddressDesc}}</text>
                    </div>
                </midea-cell>
            </div>

            <div class="base-group">
                <div class="item-group">
                    <text class="type-select-label">以下为选填信息，有助于更快更好地为您服务</text>

                    <div class="search-history">
                        <text v-for="(item,index) in types" :key="index" v-bind:class="['search-history-item', typeSelectedIndex==index?'search-history-item-selected':'']" @click="typeSelected(index)">{{item.title}}</text>
                    </div>
                </div>

                <div class="item-group scan-group">
                    <input class="scan-input" placeholder="请输入型号或扫机身条码" :autofocus=false v-model="code" />

                    <image class="scan-icon" src="./assets/img/service_ic_scan@3x.png" resize='contain' @click="scanCode"></image>
                </div>

                <div class="item-group info-group">
                    <textarea class="info-textarea" placeholder="请输入其他备注信息" v-model="order.pubRemark" rows="5" maxlength="120"></textarea>
                    <text class="info-textarea-calc">{{order.pubRemark.length}}/120</text>
                    <image class="mic-icon" src="./assets/img/service_ic_tape@3x.png" resize='contain'></image>
                </div>
                <div class="action-bar">
                    <midea-button text="提交" type="green" :btnStyle="{'background-color': isDataReady?'#267AFF':'#267AFF','opacity':isDataReady?'1':'0.2','border-radius': '4px'}" @mideaButtonClicked="submit">
                    </midea-button>
                </div>
            </div>
        </scroller>

        <midea-actionsheet :items="productUseItems" :show="isShowProductUse" @close="closeProductUseActionsheet" @itemClick="productUsetItemClick" @btnClick="productUseBtnClick" ref="productUseActionsheet">
        </midea-actionsheet>

        <midea-actionsheet :items="transportStatusItems" :show="isShowTransportStatus" @close="closeTransportStatusActionsheet" @itemClick="transportStatustItemClick" @btnClick="transportStatusBtnClick" ref="transportStatusActionsheet">
        </midea-actionsheet>

        <period-picker :isShow="isShowPeriodPicker" :dates="serviePeriodDate" :dateIndex="selectedDateIndex" :times="serviePeriodTime" :timeIndex="selectedTimeIndex" @oncancel="isShowPeriodPicker=false" @onchanged="serviePeriodSelected">
        </period-picker>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService';
import util from '@/common/util/util'


import { MideaCell, MideaGridSelect, MideaButton, MideaActionsheet, MideaPopup, MideaSelect } from '@/index'

import PeriodPicker from './components/periodPicker.vue'

export default {
    components: {
        MideaCell,
        MideaGridSelect,
        MideaButton,
        MideaActionsheet,
        MideaPopup,
        MideaSelect,

        PeriodPicker
    },
    mixins: [base],
    data() {
        return {
            title: '安装服务',

            selectedProduct: [],

            isShowProductUse: false,
            productUseOptions: [
                { value: '11', desc: '商用' },
                { value: '10', desc: '家用' }
            ],

            isShowTransportStatus: false,
            transportStatusIndex: '',
            transportStatusOptions: [
                {
                    "serviceRequireId": "643",
                    "orgCode": "CS006",
                    "serviceRequireItemCode": "BZ01001",
                    "serviceRequireItemName": "货已到需要安装",
                    "parentServiceRequireCode": "BZ01",
                    "leafPath": "BZ.BZ01.BZ01001",
                    "serviceMainTypeCode": "10",
                    "serviceMainTypeName": "安装",
                    "serviceSubTypeCode": "1010",
                    "serviceSubTypeName": "安装",
                    "leafFlag": "Y",
                    "depth": "3",
                    "isNotifySub": null,
                    "disposeType": "11",
                    "complaintLevel": "13",
                    "complaintType": "10",
                    "sortNo": 13,
                    "pubRemark": "初始化导入",
                    "pubValidly": "Y",
                    "pubCreatePerson": "admin",
                    "pubCreateDate": 1472572800000,
                    "pubCreateDateStr": null,
                    "pubCreateDateBeginStr": null,
                    "pubCreateDateEndStr": null,
                    "pubModiPerson": "admin",
                    "pubModiDate": 1472572800000,
                    "pubModiDateStr": null,
                    "pubModiDateBeginStr": null,
                    "pubModiDateEndStr": null,
                    "prodCode": "1000",
                    "prodName": "家用空调",
                    "customerDesc": null
                },
                {
                    "serviceRequireId": "644",
                    "orgCode": "CS006",
                    "serviceRequireItemCode": "BZ01002",
                    "serviceRequireItemName": "货未到预约安装",
                    "parentServiceRequireCode": "BZ01",
                    "leafPath": "BZ.BZ01.BZ01002",
                    "serviceMainTypeCode": "10",
                    "serviceMainTypeName": "安装",
                    "serviceSubTypeCode": "1010",
                    "serviceSubTypeName": "安装",
                    "leafFlag": "Y",
                    "depth": "3",
                    "isNotifySub": null,
                    "disposeType": "11",
                    "complaintLevel": "13",
                    "complaintType": "10",
                    "sortNo": 14,
                    "pubRemark": "初始化导入",
                    "pubValidly": "Y",
                    "pubCreatePerson": "admin",
                    "pubCreateDate": 1472572800000,
                    "pubCreateDateStr": null,
                    "pubCreateDateBeginStr": null,
                    "pubCreateDateEndStr": null,
                    "pubModiPerson": "admin",
                    "pubModiDate": 1472572800000,
                    "pubModiDateStr": null,
                    "pubModiDateBeginStr": null,
                    "pubModiDateEndStr": null,
                    "prodCode": "1000",
                    "prodName": "家用空调",
                    "customerDesc": null
                }
            ],

            isShowPeriodPicker: false,
            selectedDateIndex: null,
            selectedTimeIndex: null,
            serviePeriodDate: [],
            serviePeriodTime: [
                { index: 0, desc: "08:00-10:00", disable: false },
                { index: 1, desc: "10:00-12:00", disable: false },
                { index: 2, desc: "12:00-14:00", disable: false },
                { index: 3, desc: "14:00-16:00", disable: false },
                { index: 4, desc: "16:00-18:00", disable: false }
            ],
            userAddress: null,

            typeSelectedIndex: 0,
            types: [
                {
                    'title': '机身条码',
                    'isSelected': true
                },
                {
                    'title': '产品型号',
                    'isSelected': false
                }
            ],
            code: '',
            order: {
                customerName: '',   //报单人姓名
                customerMobilephone1: '',  //报单人手机号1
                areaNum: '',  //报单人所在地区号
                customerAddress: '',  //报单人所在地址
                areaCode: '',  //报单人所在区域编码
                areaName: '',  //报单人所在区域名称
                servCustomerName: '',  //现场服务用户姓名
                servCustomerMobilephone1: '',  //现场服务用户手机号1
                servAreaNum: '',  //现场服务用户所在地区号
                servCustomerAddress: '',  //现场服务用户所在地址
                servAreaCode: '',  //现场服务用户所在区域编码
                servAreaName: '',  //现场服务用户所在区域名称
                orderOrigin: '38',  //38
                interfaceSource: 'MJAPP',  //MJAPP
                requireServiceDate: '',  //用户要求服务时间
                webUserCode: '',  //APP用户UUID
                webUserPhone: '',  //APP用户注册手机号
                pubRemark: '', //备注
                serviceUserDemandVOs: [{
                    serviceMainTypeCode: '',  //业务类型如安装值为10，从选择服务请求项目中带过来
                    serviceMainTypeName: '',  //业务类型如安装值为10，从选择服务请求项目中带过来
                    serviceSubTypeCode: '',  //业务类型如安装值1010，从选择服务请求项目中带过来
                    serviceSubTypeName: '',  //业务类型如安装，从选择服务请求项目中带过来
                    contactOrderSerItemCode: '',  //用户报单请求项目，如需要安装值为BZ01001
                    contactOrderSerItemName: '',  //用户报单请求项目，如需要安装
                    prodBrand: '',  //产品品牌
                    brandName: '',  //产品品牌名称
                    prodCode: '',  //产品品类
                    prodName: '',  //产品品类名称
                    productAmount: '',  //默认填1
                }],
                productUse: '', //中央空调家用、商用标志
            },
        }
    },
    computed: {
        //安装产品
        selectedProductDesc() {
            let result = '请选择'
            if (this.selectedProduct && this.selectedProduct.length > 0) {
                const temp = this.selectedProduct.map((item) => {
                    return item.prodName
                })
                result = temp.join("、")
            }
            return result
        },

        //使用场所
        includeU99() {
            let result = false
            if (this.selectedProduct && this.selectedProduct.length > 0) {
                const temp = this.selectedProduct.filter((item) => {
                    return item.userTypeCode == "U99"
                })
                result = temp.length > 0 ? true : false
            }
            return result
        },
        productUseItems() {
            return this.productUseOptions.map((item) => {
                return item.desc
            })
        },
        productUseDesc() {
            let result = '请选择'
            if (this.order.productUse !== '') {
                let matchItem = this.productUseOptions.filter((item) => {
                    return item.value == this.order.productUse
                })
                if (matchItem && matchItem.length > 0) {
                    result = matchItem[0].desc
                }
            }
            return result
        },

        //物流状态
        transportStatusItems() {
            return this.transportStatusOptions.map((item) => {
                return item.serviceRequireItemName
            })
        },
        transportStatusDesc() {
            let result = '请选择' + this.transportStatusIndex
            if (this.transportStatusIndex !== '') {
                result = this.transportStatusOptions[this.transportStatusIndex].serviceRequireItemName
            }
            return result
        },


        //期望服务时间
        serviePeriodDesc() {
            if (this.serviePeriodDate && this.selectedDateIndex != null && this.serviePeriodTime && this.selectedTimeIndex != null) {
                return this.serviePeriodDate[this.selectedDateIndex].desc + ' ' + this.serviePeriodTime[this.selectedTimeIndex].desc
            } else {
                return '请选择'
            }
        },

        //服务地址
        userAddressDesc() {
            let result = '请选择'
            if (this.userAddress) {
                result = this.userAddress.receiverName + ' ' + this.userAddress.receiverMobile + '\n' + this.userAddress.provinceName + ' ' + this.userAddress.cityName + ' ' + this.userAddress.countyName + ' ' + this.userAddress.streetName + '\n' + this.userAddress.addr
            }
            return result
        },

        isDataReady() {
            return true
        }
    },
    methods: {
        handlePageData(data) {
            if (data.page == "installation") {
                if (data.key == "selectedProduct") {
                    this.selectedProduct = data.data
                } else if (data.key == "userAddressList") {
                    this.userAddress = data.data
                }
            }
        },
        //安装产品
        selectProduct() {
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.selectedProductArray, JSON.stringify(this.selectedProduct), () => {
                this.goTo('productSelection', {}, { from: 'installation', isMultiMode: true })
            })
        },
        //使用场所
        selectProductUse() {
            this.isShowProductUse = true;
            this.$nextTick(e => {
                this.$refs.productUseActionsheet.open();
            });
        },
        closeProductUseActionsheet() {
            this.isShowProductUse = false
        },
        productUsetItemClick(event) {
            this.isShowProductUse = false
            this.order.productUse = this.productUseOptions[event.index].value
        },
        productUseBtnClick() {
            this.isShowProductUse = false
        },

        //物流状态
        selectTransportStatus() {
            this.isShowTransportStatus = true;
            this.$nextTick(e => {
                this.$refs.transportStatusActionsheet.open();
            });
        },
        closeTransportStatusActionsheet() {
            this.isShowTransportStatus = false
        },
        transportStatustItemClick(event) {
            this.isShowTransportStatus = false
            this.transportStatusIndex = event.index
        },
        transportStatusBtnClick() {
            this.isShowTransportStatus = false
        },

        //期望服务时间
        initServiePeriod() {
            let today = new Date()
            let weekDesc = {
                0: "日",
                1: "一",
                2: "二",
                3: "三",
                4: "四",
                5: "五",
                6: "六",
            }
            for (let index = 0; index < 31; index++) {
                let theDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + index)
                let theDateDesc = theDate.getMonth() + '月' + theDate.getDate() + '日'
                this.serviePeriodDate.push({
                    'index': index,
                    'value': util.dateFormat(theDate, "yyyy-MM-dd"),
                    'desc': theDateDesc + (index == 0 ? '(今天)' : '(周' + weekDesc[theDate.getDay()] + ')')
                })
            }
        },
        selectServiePeriod() {
            this.isShowPeriodPicker = true
        },
        serviePeriodSelected(event) {
            this.selectedDateIndex = event.dateIndex
            this.selectedTimeIndex = event.timeIndex
        },

        //服务地址
        selectAddress() {
            let userAddrId = ''
            if (this.userAddress && this.userAddress.userAddrId) {
                userAddrId = this.userAddress.userAddrId
            }
            this.goTo('userAddressList', {}, { from: 'installation', id: userAddrId })
        },

        //类型选择
        typeSelected(index) {
            this.typeSelectedIndex = index
        },

        //二维码扫描
        scanCode() {
            nativeService.scanCode().then(
                (resp) => {
                    if (resp.status == 0) {
                        this.code = resp.data
                    }
                }
            )
        },
        submit() {
            nativeService.getUserInfo().then((data) => {
                this.userInfo = data || {}
                let param = {
                    serviceOrderVO: {
                        interfaceSource: "SMART",
                        webUserCode: "oFtQywGHyqrWbDvjVdRTeR9Ig3m0", //this.userInfo.uid
                        webUserPhone: this.userInfo.mobile,

                        customerName: this.userAddress.receiverName,   //报单人姓名
                        customerMobilephone1: this.userAddress.receiverMobile,  //报单人手机号1
                        customerAddress: this.userAddress.provinceName + ' ' + this.userAddress.cityName + ' ' + this.userAddress.countyName + ' ' + this.userAddress.streetName + ' ' + this.userAddress.addr,  //报单人所在地址
                        areaCode: this.userAddress.street,  //报单人所在区域编码
                        areaName: this.userAddress.streetName, //报单人所在区域名称

                        servCustomerName: this.userAddress.receiverName,  //现场服务用户姓名
                        servCustomerMobilephone1: this.userAddress.receiverMobile,  //现场服务用户手机号1
                        servCustomerMobilephone2: '', //现场服务用户手机号2
                        servCustomerAddress: this.userAddress.provinceName + ' ' + this.userAddress.cityName + ' ' + this.userAddress.countyName + ' ' + this.userAddress.streetName + ' ' + this.userAddress.addr,  //现场服务用户所在地址
                        servAreaCode: this.userAddress.street,  //现场服务用户所在区域编码
                        servAreaName: this.userAddress.streetName,  //现场服务用户所在区域名称

                        orderOrigin: '38',  //美居APP则入参为38
                        // interfaceSource: 'MJAPP', //通用参数已经包含
                        requireServiceDate: this.serviePeriodDate[this.selectedDateIndex].value + ' ' + this.serviePeriodTime[this.selectedTimeIndex].desc,  //用户要求服务时间,
                        requireUnitCode: '',
                        pubRemark: this.order.pubRemark //备注
                    }
                }
                //用户诉求从表  
                let serviceUserDemandVOs = []
                let transportStatusItem = this.transportStatusOptions[this.transportStatusIndex]
                for (let index = 0; index < this.selectedProduct.length; index++) {
                    const product = this.selectedProduct[index];
                    serviceUserDemandVOs.push({
                        serviceMainTypeCode: transportStatusItem.serviceMainTypeCode,  //业务类型如安装值为10，从选择服务请求项目中带过来
                        serviceMainTypeName: transportStatusItem.serviceMainTypeName,  //业务类型如安装值为10，从选择服务请求项目中带过来
                        serviceSubTypeCode: transportStatusItem.serviceSubTypeCode,  //业务类型如安装值1010，从选择服务请求项目中带过来
                        serviceSubTypeName: transportStatusItem.serviceSubTypeName,  //业务类型如安装，从选择服务请求项目中带过来
                        contactOrderSerItemCode: transportStatusItem.serviceRequireItemCode,  //用户报单请求项目，如需要安装值为BZ01001
                        contactOrderSerItemName: transportStatusItem.serviceRequireItemName,  //用户报单请求项目，如需要安装
                        prodBrand: product.brandCode,  //产品品牌
                        brandName: product.brand,  //产品品牌名称
                        prodCode: product.prodCode,  //产品品类
                        prodName: product.prodName,  //产品品类名称
                        productAmount: 1,  //默认填1
                        serviceDesc: '', //服务描述
                        productUse: product.userTypeCode == "U99" ? this.order.productUse : ''
                    })
                }
                param["serviceUserDemandVOs"] = serviceUserDemandVOs

                nativeService.createserviceorder(param).then(() => {
                    if (["orderList", "orderDetail"].indexOf(this.fromPage) > -1) {
                        //重新报单
                        this.back({ viewTag: "orderList" })
                    } else {
                        //安装，维修
                        this.goTo('orderList', { "replace": true })
                    }
                }).catch((error) => {
                    nativeService.toast(nativeService.getCssErrorMessage(error))
                })
            })
        }
    },
    created() {
        this.initServiePeriod()

        nativeService.getItem(this.SERVICE_STORAGE_KEYS.order, (resp) => {
            if (resp.result == 'success') {
                this.order = JSON.parse(resp.data) || []
            }
        })
    }
}
</script>

<style>
.wrapper {
  background-color: #ffffff;
  position: relative;
}
.header-right {
  position: absolute;
  right: 0px;
  width: 160px;
  height: 88px;
  display: flex;
  justify-content: center;
}
.header-right-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  padding-left: 20px;
  padding-right: 20px;
  text-align: right;
}
.content-wrapper {
}
.base-group {
  padding-top: 24px;
  background-color: #f2f2f2;
}
.cell-title {
  flex: 1;
  flex-direction: row;
  align-items: center;
}
.cell-label {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
.cell-label-star {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #ff3b30;
  padding-left: 5px;
}
.right-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  padding-right: 24px;
  text-align: right;
  width: 480px;
}
.item-group {
  padding: 24px;
  background-color: #ffffff;
}

.type-select-label {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  padding-bottom: 32px;
}
.search-history {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.search-history-item {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  background-color: #f6f6f6;
  text-align: center;
  padding-top: 8px;
  padding-right: 28px;
  padding-bottom: 8px;
  padding-left: 28px;
  margin-left: 12px;
  margin-right: 12px;
  border-radius: 4px;
}
.search-history-item-selected {
  background-color: #e8f1ff;
  color: #267aff;
}
.scan-group {
  position: relative;
}
.scan-input {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  height: 72px;
  padding-left: 22px;
  padding-right: 50px;
  background-color: #fafafa;
}
.scan-icon {
  position: absolute;
  top: 40px;
  right: 50px;
  height: 40px;
  width: 40px;
}
.info-group {
  position: relative;
}
.info-textarea {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  padding-top: 10px;
  padding-left: 22px;
  padding-right: 50px;
  background-color: #fafafa;
}
.info-textarea-calc {
  position: absolute;
  bottom: 28px;
  right: 100px;
  color: #8a8a8f;
  height: 40px;
  font-size: 24px;
}
.mic-icon {
  position: absolute;
  bottom: 35px;
  right: 50px;
  height: 40px;
  width: 40px;
}
.action-bar {
  background-color: #ffffff;
  width: 750px;
  text-align: center;
  padding-bottom: 50px;
}
</style>
