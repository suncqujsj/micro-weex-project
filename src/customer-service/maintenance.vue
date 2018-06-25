<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
            <div slot="customerContent" class="header-right">
                <text class="header-right-text" @click="goTo('productSelection', {}, { from: 'maintenance', to:'chargeStandardList' })">收费标准</text>
            </div>
        </midea-header>
        <scroller class="content-wrapper">
            <div class="base-group">
                <midea-cell :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectProduct">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">维修产品</text>
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
                <midea-cell height="80" :hasBottomBorder="!true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectFaultType">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">故障类型</text>
                        <text class="cell-label-star">*</text>
                    </div>
                    <div slot="rightText">
                        <text class="right-text">{{faultDesc}}</text>
                    </div>
                </midea-cell>
                <midea-cell v-if="excludedFault && excludedFault.length>0" class="fault-reason" height="80" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="showExcludedFault">
                    <div slot="title" class="cell-title">
                        <image class="fault-reason-icon" src="./assets/img/service_ic_warming@3x.png" resize='contain'></image>
                        <text class="fault-reason-label">{{excludedFault[0].faultServiceDesc}}</text>
                    </div>
                    <div slot="rightText">
                        <text class="right-text fault-reason-right-text">可能原因</text>
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
                <div class="item-group photo-group">
                    <text class="photo-label">现场图片</text>
                    <text class="photo-right-label">(最多上传3张)</text>
                </div>
                <div class="item-group photo-item-group">
                    <div v-for="(item,index) in photoData" :key="index" class="photo-item-detail">
                        <image :src="item.contentStr" class="photo-item-img" @click="removePhoto(index)"></image>
                        <image src="./assets/img/service_ic_delone@3x.png" class="photo-delete-img" resize='contain'></image>
                    </div>
                    <div v-if="photoData.length<3" class="photo-item-detail">
                        <image src="./assets/img/service_ic_carema@3x.png" class="photo-item-add" resize='contain' @click="takePhoto"></image>
                    </div>
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

        <midea-actionsheet :items="takePhotoItems" :show="showTakePhotoBar" @close="closeTakePhotoActionsheet" @itemClick="takePhotoItemClick" @btnClick="takePhotoBtnClick" ref="takePhotoActionsheet">
        </midea-actionsheet>

        <period-picker :isShow="isShowPeriodPicker" :dates="serviePeriodDate" :dateIndex="selectedDateIndex" :times="serviePeriodTime" :timeIndex="selectedTimeIndex" @oncancel="isShowPeriodPicker=false" @onchanged="serviePeriodSelected">
        </period-picker>

        <service-dialog :show="showExcludedFaultInfo" :data="excludedFault" @close="excludedFaultInfoClose" @dialogConfirm="excludedFaultInfoConfirm" @dialogCancel="excludedFaultInfoCancel">
        </service-dialog>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService';
import util from '@/common/util/util'


import { MideaCell, MideaGridSelect, MideaButton, MideaActionsheet, MideaPopup, MideaSelect } from '@/index'

import PeriodPicker from './components/periodPicker.vue'
import ServiceDialog from './components/dialog.vue'

export default {
    components: {
        MideaCell,
        MideaGridSelect,
        MideaButton,
        MideaActionsheet,
        MideaPopup,
        MideaSelect,

        PeriodPicker,
        ServiceDialog
    },
    mixins: [base],
    data() {
        return {
            title: '维修服务',
            isRenew: false,

            selectedProduct: [],

            isShowProductUse: false,
            productUseOptions: [
                { value: '11', desc: '商用' },
                { value: '10', desc: '家用' }
            ],

            selectedFault: null,
            excludedFault: null,
            showExcludedFaultInfo: false,

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
            codeType: '',
            code: '',

            showTakePhotoBar: false,
            takePhotoItems: ['拍摄', '从手机相册选择'],
            photoData: [],

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
        //维修产品
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

        //故障类型
        faultDesc() {
            let result = '请选择'
            if (this.selectedFault) {
                result = this.selectedFault.serviceRequireItemName
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
            if (data.page == "maintenance") {
                if (data.key == "selectedProduct") {
                    this.selectedProduct = data.data
                    //清空故障原因
                    this.selectedFault = null
                    if (this.excludedFault && this.excludedFault.length > 0) {
                        this.excludedFault.splice(0, this.excludedFault.length)
                    }
                } else if (data.key == "userAddressList") {
                    this.userAddress = data.data
                } else if (data.key == "selectedFault") {
                    this.selectedFault = data.data
                    nativeService.getUserInfo().then((data) => {
                        let param = {
                            operator: data.nickName,
                            operatorUnit: "operatorUnit",
                            orgCode: this.selectedFault.orgCode,
                            depth: "3",
                            serviceRequireItemCode: this.selectedFault.serviceRequireItemCode,
                            brandCode: this.selectedProduct[0].brandCode,
                            prodCode: this.selectedProduct[0].prodCode,
                            parentServiceRequireCode: "BX"
                        }
                        nativeService.getexcludedfaultlist(param).then((data) => {
                            this.excludedFault = data.excludedFaultVOList
                        })
                    })
                }
            }
        },
        //维修产品
        selectProduct() {
            nativeService.setItem(this.SERVICE_STORAGE_KEYS.selectedProductArray, JSON.stringify(this.selectedProduct), () => {
                this.goTo('productSelection', {}, { from: 'maintenance' })
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

        //故障类型
        selectFaultType() {
            if (this.selectedProduct.length > 0) {
                nativeService.setItem(this.SERVICE_STORAGE_KEYS.selectedProductArray, JSON.stringify(this.selectedProduct), () => {
                    this.goTo('faultTypeList', {}, { from: 'maintenance' })
                })
            } else {
                nativeService.toast("请先选择“维修产品”")
            }
        },
        showExcludedFault(event) {
            this.showExcludedFaultInfo = true
        },
        updateExcludedFaultInfo(index, isHelpful) {
            let param = {
                "orgCode": this.selectedFault.orgCode,
                "serviceRequireItemCode": this.selectedFault.serviceRequireItemCode,
                "serviceRequireItemName": this.selectedFault.serviceRequireItemName,
                "excludedFaultId": this.excludedFault[index].excludedFaultId,
                "excludedFaultCode": this.excludedFault[index].excludedFaultCode,
                "excludedFaultName": this.excludedFault[index].excludedFaultName,
                "prodCode": this.selectedProduct[0].prodCode,
                "isHelpful": isHelpful,
                "prodName": this.selectedProduct[0].prodName
            }
            nativeService.appexcludedfaulttraces(param).then(() => {
                this.showExcludedFaultInfo = false
            })
        },
        excludedFaultInfoClose(event) {
            this.showExcludedFaultInfo = false
        },
        excludedFaultInfoConfirm(event) {
            this.updateExcludedFaultInfo(event.index, "Y")
        },
        excludedFaultInfoCancel(event) {
            this.updateExcludedFaultInfo(event.index, "N")
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
            this.goTo('userAddressList', {}, { from: 'maintenance', id: userAddrId })
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
                        let scanResult = resp.data || resp.code

                        if (scanResult.indexOf(",") != -1) {
                            // 扫条形码，可能会带'ITF,xxxxxxx', 截取后半部
                            this.codeType = '60'
                            let tmp = scanResult.split(",")
                            this.code = tmp.length === 1 ? tmp[0] : tmp[1]
                        } else if (util.getParameters(scanResult, "tsn")) {
                            //二维码
                            this.codeType = '0'
                            this.code = util.getParameters(scanResult, "tsn")
                        } else {
                            this.codeType = '60'
                            this.code = scanResult
                        }
                        this.getProductFromCode()
                    }
                }
            )
        },
        getProductFromCode() {
            let param = {
                codeType: this.codeType,
                code: this.code,
                version: "3.0",
                sourceTag: "3"
            }
            nativeService.getProdMessage(param).then((data) => {

            })
        },

        //现场图片
        takePhoto() {
            if (this.photoData.length > 2) {
                nativeService.toast("最多上传3张")
            } else {
                this.showTakePhotoBar = true;
                this.$nextTick(e => {
                    this.$refs.takePhotoActionsheet.open();
                });
            }
        },
        closeTakePhotoActionsheet() {
            this.showTakePhotoBar = false
        },
        takePhotoItemClick(event) {
            this.showTakePhotoBar = false
            let messageParam = {
                compressRage: 60,
                type: 'jpg',
                isNeedBase64: true
            }
            if (event.index == 0) {
                //拍照
                nativeService.takePhoto(messageParam).then(
                    (resp) => {
                        this.photoData.push({
                            fileName: resp.fileName,
                            contentStr: resp.data
                        })
                    }
                ).catch((error) => {
                    nativeService.toast(JSON.stringify(error || {}))
                })
            } else {
                //选照片
                nativeService.choosePhoto(messageParam).then(
                    (resp) => {
                        this.photoData.push({
                            fileName: resp.fileName,
                            contentStr: resp.data
                        })
                    }
                ).catch((error) => {
                    nativeService.toast(JSON.stringify(error || {}))
                })
            }
        },
        takePhotoBtnClick() {
            this.showTakePhotoBar = false
        },
        removePhoto(index) {
            this.photoData.splice(index, 1)
        },
        renewOrder(order) {
            //安装产品
            this.selectedProduct.push({
                brandCode: order.serviceUserDemandVOs[0].brandCode,  //产品品牌
                brand: order.serviceUserDemandVOs[0].brandName,  //产品品牌名称
                prodCode: order.serviceUserDemandVOs[0].prodCode,  //产品品类
                prodName: order.serviceUserDemandVOs[0].prodName  //产品品类名称
            })
            //故障类型
            // selectedFault

            //期望服务时间
            let temp = order.requireServiceDate.split(" ")
            let matchDateItem = this.serviePeriodDate.find((item) => {
                return item.value == temp[0]
            })
            if (matchDateItem) {
                this.selectedDateIndex = matchDateItem.index
            } else {
                this.selectedDateIndex = 1
            }
            let matchTimeItem = this.serviePeriodTime.find((item) => {
                return item.desc == temp[1]
            })
            if (matchTimeItem) {
                this.selectedTimeIndex = matchTimeItem.index
            }

            //服务地址
            let customerAddressArray = order.customerAddress.split(" ")
            this.userAddress = {
                receiverName: order.customerName,
                receiverMobile: order.customerMobilephone1,
                province: '',
                provinceName: customerAddressArray[0],
                city: '',
                cityName: customerAddressArray[1],
                county: '',
                countyName: customerAddressArray[2],
                street: order.areaCode,
                streetName: order.areaName,
                addr: customerAddressArray[3],
            }

            this.order.pubRemark = order.serviceOrderVO[0].pubRemark

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
                    },

                    //图片
                    fileVOs: this.photoData
                }

                //用户诉求从表  
                const product = this.selectedProduct[0]
                let serviceParam = {
                    brandCode: product.brandCode,
                    depth: "3",
                    orgCode: "",
                    interfaceSource: "SMART",
                    parentServiceRequireCode: "BX",
                    prodCode: product.prodCode
                }
                nativeService.queryservicerequireproduct(serviceParam).then((resp) => {
                    let serviceItem = resp.list[0]
                    //用户诉求从表  
                    let serviceUserDemandVOs = []
                    if (serviceItem) {
                        serviceUserDemandVOs.push({
                            serviceMainTypeCode: serviceItem.serviceMainTypeCode,  //业务类型如安装值为10，从选择服务请求项目中带过来
                            serviceMainTypeName: serviceItem.serviceMainTypeName,  //业务类型如安装值为10，从选择服务请求项目中带过来
                            serviceSubTypeCode: serviceItem.serviceSubTypeCode,  //业务类型如安装值1010，从选择服务请求项目中带过来
                            serviceSubTypeName: serviceItem.serviceSubTypeName,  //业务类型如安装，从选择服务请求项目中带过来
                            contactOrderSerItemCode: serviceItem.serviceRequireItemCode,  //用户报单请求项目，如需要安装值为BZ01001
                            contactOrderSerItemName: serviceItem.serviceRequireItemName,  //用户报单请求项目，如需要安装
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
                        this.appPageDataChannel.postMessage({ page: "maintenance", key: "createOrder" })
                        if (this.isRenew) {
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
            })
        }
    },
    created() {
        this.initServiePeriod()

        this.isRenew = nativeService.getParameters('isRenew') || false
        if (this.isRenew) {
            //重新下单
            nativeService.getItem(this.SERVICE_STORAGE_KEYS.currentOrder, (resp) => {
                if (resp.result == 'success') {
                    this.renewOrder(JSON.parse(resp.data))
                }
            })
        }
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
  width: 430px;
}

.fault-reason {
  background-color: #fff7d5;
}
.fault-reason-icon {
  height: 40px;
  width: 40px;
  margin-right: 5px;
}
.fault-reason-label {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #ff9500;
}
.fault-reason-right-text {
  width: 200px;
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
.photo-group {
  flex-direction: row;
  justify-content: flex-start;
}
.photo-label {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  text-align: left;
  margin-right: 10px;
}
.photo-right-label {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  text-align: left;
}
.photo-item-group {
  width: 750px;
  padding-left: 24px;
  padding-bottom: 24px;
  flex-direction: row;
}
.photo-item-detail {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 128px;
  background-color: #f2f2f2;
  margin-right: 24px;
}
.photo-item-img {
  width: 128px;
  height: 128px;
  margin: 20px;
}
.photo-item-add {
  width: 60px;
  height: 60px;
  margin: 20px;
}
.photo-delete-img {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 30px;
  height: 30px;
}
</style>
