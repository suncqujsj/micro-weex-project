<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./assets/img/public_ic_back@3x.png" titleText="#000000" @leftImgClick="back">
            <div slot="customerContent" class="header-right">
                <text class="header-right-text" @click="goToServiceCharge">收费标准</text>
            </div>
        </midea-header>
        <scroller class="content-wrapper">
            <div class="base-group">
                <div class="service-cell" @click="selectProduct">
                    <div class="service-cell-block">
                        <text class="cell-label">维修产品</text>
                        <text class="cell-label-star">*</text>
                        <text class="right-text address-text" v-bind:class="[selectedProductDesc=='请选择'?'empty-text':'']">{{selectedProductDesc}}</text>
                        <image class="arrow-icon" src="./img/arrow_right.png" resize='contain'></image>
                    </div>
                </div>
                <midea-cell v-if="isIncludeU99" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectProductUse">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">使用场所</text>
                        <text class="cell-label-star">*</text>
                    </div>
                    <div slot="rightText">
                        <text class="right-text" v-bind:class="[productUseDesc=='请选择'?'empty-text':'']">{{productUseDesc}}</text>
                    </div>
                </midea-cell>
                <midea-cell :height="excludedFault?'80':'100'" :hasBottomBorder="false" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectFaultType">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">故障类型</text>
                        <text class="cell-label-star">*</text>
                    </div>
                    <div slot="rightText">
                        <text class="right-text" v-bind:class="[faultDesc=='请选择'?'empty-text':'']">{{faultDesc}}</text>
                    </div>
                </midea-cell>
                <div class="arraw-cell" v-if="excludedFault" @click="showExcludedFault">
                    <div class="arraw-line">
                        <div class="arraw-triangle"></div>
                    </div>
                    <div class="fault-reason">
                        <image class="fault-reason-icon" src="./assets/img/service_ic_warming@3x.png" resize='contain'></image>
                        <text class="fault-reason-label">{{excludedFault[0].faultServiceDesc}}</text>
                        <text class="right-text fault-reason-right-text">可能原因</text>
                        <image class="arrow-icon" src="./img/arrow_right.png" resize='contain'></image>
                    </div>
                </div>
                <midea-cell :hasBottomBorder="true" :hasTopBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectServiePeriod">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">期望服务时间</text>
                        <text class="cell-label-star">*</text>
                    </div>
                    <div slot="rightText">
                        <text class="right-text" v-bind:class="[serviePeriodDesc=='请选择'?'empty-text':'']">{{serviePeriodDesc}}</text>
                    </div>
                </midea-cell>

                <div class="service-cell" @click="selectAddress">
                    <div class="service-cell-block">
                        <text class="cell-label">服务地址</text>
                        <text class="cell-label-star">*</text>
                        <text class="right-text address-text" v-bind:class="[userAddressDesc=='请选择'?'empty-text':'']">{{userAddressDesc}}</text>
                        <image class="arrow-icon" src="./img/arrow_right.png" resize='contain'></image>
                    </div>
                </div>
            </div>

            <div class="base-group">
                <div class="item-group">
                    <text class="type-select-label">以下为选填信息，有助于更好更快地为您服务</text>

                    <div class="search-history">
                        <text v-for="(item,index) in types" :key="index" v-bind:class="['search-history-item', typeSelectedIndex==index?'search-history-item-selected':'']" @click="typeSelected(index)">{{item.title}}</text>
                    </div>
                </div>

                <div class="item-group">
                    <scan-input placeholder="请输入型号或扫描机身条码" v-model="code" :scan="typeSelectedIndex==1" @scanCode="scanCode"></scan-input>
                </div>
                <div class="item-group photo-group">
                    <text class="photo-label">现场图片</text>
                    <text class="photo-right-label">(最多上传3张)</text>
                </div>
                <div class="item-group photo-item-group">
                    <div v-for="(item,index) in photoData" :key="index" class="photo-item-detail">
                        <image :src="item.imgMeta +','+item.contentStr" class="photo-item-img"></image>
                        <image src="./assets/img/service_ic_delone@3x.png" class="photo-delete-img" resize='contain' @click="removePhoto(index)"></image>
                    </div>
                    <div v-if="photoData.length<3" class="photo-item-detail">
                        <image src="./assets/img/service_ic_carema@3x.png" class="photo-item-add" resize='contain' @click="takePhoto"></image>
                    </div>
                </div>
                <div class="item-group info-group">
                    <textarea class="info-textarea" placeholder="其他备注信息" v-model="order.pubRemark" rows="5" maxlength="120"></textarea>
                    <text class="info-textarea-calc">{{order.pubRemark.length}}/120</text>
                    <div class="mic-icon-wrapper" @click="isMicPanelShow=true">
                        <image class="mic-icon" src="./assets/img/service_ic_tape@3x.png" resize='contain'></image>
                    </div>
                </div>
            </div>
            <div class="action-bar">
                <midea-button text="提交" type="green" :btnStyle="{'background-color': '#267AFF','opacity':dataReadyStatus.status?'1':'0.2','border-radius': '4px'}" @mideaButtonClicked="submit">
                </midea-button>
            </div>
        </scroller>

        <midea-actionsheet :items="productUseItems" :show="isShowProductUse" @close="closeProductUseActionsheet" @itemClick="productUsetItemClick" @btnClick="productUseBtnClick" ref="productUseActionsheet">
        </midea-actionsheet>

        <period-picker :isShow="isShowPeriodPicker" :dates="serviePeriodDate" :dateIndex="selectedDateIndex" :times="serviePeriodTime" :timeIndex="selectedTimeIndex" @oncancel="isShowPeriodPicker=false" @onchanged="serviePeriodSelected">
        </period-picker>

        <midea-actionsheet :items="takePhotoItems" :show="showTakePhotoBar" @close="closeTakePhotoActionsheet" @itemClick="takePhotoItemClick" @btnClick="takePhotoBtnClick" ref="takePhotoActionsheet">
        </midea-actionsheet>

        <fault-dialog :show="showExcludedFaultInfo" :data="excludedFault" @close="excludedFaultInfoClose" @dialogConfirm="excludedFaultInfoConfirm" @dialogCancel="excludedFaultInfoCancel">
        </fault-dialog>

        <midea-popup :show="isMicPanelShow" @mideaPopupOverlayClicked="closeMicPannel" pos="bottom" height="700">
            <image class="mic-close-icon" src="./assets/img/service_ic_cancel@3x.png" resize='contain' @click="closeMicPannel"></image>
            <text class="mic-result">{{micResult}}</text>
            <div class="mic-record-wrapper">
                <text v-if="micResult" class="mic-result-clean" @click="micResult=''">清空</text>
                <div class="mic-record-icon-wrapper" @touchstart="startRecordAudio" @touchend="stopRecordAudio">
                    <image v-if="!isRecording" class="mic-record-icon" src="./assets/img/voice@3x.png" resize='contain'></image>
                    <image v-if="isRecording" class="mic-record-on-icon" src="./assets/img/voice_on@3x.png" resize='contain'></image>
                </div>
                <text v-if="micResult" class="mic-result-confirm" @click="confirmMicResult">确定</text>
            </div>
            <text class="mic-record-tip">按住说话</text>
        </midea-popup>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService'
import util from '@/common/util/util'
const globalEvent = weex.requireModule('globalEvent')

import { MideaCell, MideaGridSelect, MideaButton, MideaActionsheet, MideaPopup } from '@/index'

import PeriodPicker from './components/periodPicker.vue'
import ScanInput from '@/customer-service/components/scanInput.vue'
import FaultDialog from './components/faultDialog.vue'

const PLEASE_SELECT = "请选择"
export default {
    components: {
        MideaCell,
        MideaGridSelect,
        MideaButton,
        MideaActionsheet,
        MideaPopup,

        PeriodPicker,
        ScanInput,
        FaultDialog
    },
    mixins: [base],
    data() {
        return {
            title: '维修服务',
            isRenew: false,
            applianceSN: '',  //一键报修
            oneStepFaultDesc: '', //一键报修
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
                    'title': '产品型号',
                    'isSelected': true
                },
                {
                    'title': '机身条码',
                    'isSelected': false
                }
            ],
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
                orderOrigin: '',  //38
                interfaceSource: '',  //MJAPP
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
            isMicPanelShow: false,
            isRecording: false,
            micResult: ""
        }
    },
    computed: {
        //维修产品
        selectedProductDesc() {
            let result = PLEASE_SELECT
            if (this.selectedProduct && this.selectedProduct.length > 0) {
                const temp = this.selectedProduct.map((item) => {
                    return item.prodName
                })
                result = temp.join("、")
            }
            return result
        },

        //使用场所
        isIncludeU99() {
            return this.checkIsIncludeU99()
        },
        productUseItems() {
            return this.productUseOptions.map((item) => {
                return item.desc
            })
        },
        productUseDesc() {
            let result = PLEASE_SELECT
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
            let result = PLEASE_SELECT
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
                return PLEASE_SELECT
            }
        },

        //服务地址
        userAddressDesc() {
            let result = PLEASE_SELECT
            if (this.userAddress) {
                result = this.userAddress.receiverName + ' ' + this.userAddress.receiverMobile + '\n' + this.userAddress.provinceName + this.userAddress.cityName + this.userAddress.countyName + this.userAddress.streetName + (this.isRenew ? '' : '\n') + this.userAddress.addr
            }
            return result
        },

        dataReadyStatus() {
            let result = {
                status: true,
                message: ''
            }
            let isPrevValided = true
            let message = ''

            //维修产品
            if (isPrevValided && !(this.selectedProduct && this.selectedProduct.length > 0)) {
                isPrevValided = false
                message = "请选择 维修产品"
            }
            //使用场所
            if (isPrevValided && this.checkIsIncludeU99() && this.order.productUse == '') {
                isPrevValided = false
                message = "请选择 使用场所"
            }
            //故障类型
            if (isPrevValided && !this.selectedFault) {
                isPrevValided = false
                message = "请选择 故障类型"
            }
            //期望服务时间
            if (isPrevValided && !(this.serviePeriodDate && this.selectedDateIndex != null && this.serviePeriodTime && this.selectedTimeIndex != null)) {
                isPrevValided = false
                message = "请选择 期望服务时间"
            }

            //服务地址
            if (isPrevValided && !this.userAddress) {
                isPrevValided = false
                message = "请选择 服务地址"
            }

            result.status = isPrevValided
            result.message = message
            return result
        }
    },
    methods: {
        handlePageData(data) {
            if (data.page == "maintenance") {
                if (data.key == "selectedProduct") {
                    this.selectedProduct = data.data
                    //清空故障原因
                    this.selectedFault = null
                    this.excludedFault = null
                } else if (data.key == "userAddressList") {
                    this.userAddress = data.data
                } else if (data.key == "selectedFault") {
                    this.selectedFault = data.data
                    this.getExcludedFaultList()
                }
            }
        },
        //收费标准
        goToServiceCharge() {
            if (this.selectedProduct && this.selectedProduct.length > 0) {
                nativeService.setItem(this.SERVICE_STORAGE_KEYS.selectedProductArray, JSON.stringify(this.selectedProduct), () => {
                    this.goTo('serviceCharge', {}, { from: 'maintenance' })
                })
            } else {
                this.goTo('productSelection', {}, { from: 'maintenance', to: 'serviceCharge' })
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
        checkIsIncludeU99() {
            let result = false
            if (this.selectedProduct && this.selectedProduct.length > 0) {
                const temp = this.selectedProduct.filter((item) => {
                    return item.userTypeCode == "U99"
                })
                result = temp.length > 0 ? true : false
            }
            return result
        },

        //故障类型
        selectFaultType() {
            if (this.selectedProduct.length > 0) {
                nativeService.setItem(this.SERVICE_STORAGE_KEYS.selectedProductArray, JSON.stringify(this.selectedProduct), () => {
                    this.goTo('maintenanceFaultList', {}, { from: 'maintenance' })
                })
            } else {
                nativeService.toast("请先选择“维修产品”")
            }
        },
        getExcludedFaultList() {
            nativeService.getUserInfo().then((data) => {
                let param = {
                    interfaceSource: "SMART",
                    operator: data.nickName || "operator",
                    operatorUnit: "operatorUnit",
                    orgCode: this.selectedFault.orgCode,
                    depth: "3",
                    serviceRequireItemCode: this.selectedFault.serviceRequireItemCode,
                    brandCode: this.selectedProduct[0].brandCode,
                    prodCode: this.selectedProduct[0].prodCode,
                    parentServiceRequireCode: "BX"
                }
                nativeService.getexcludedfaultlist(param).then((data) => {
                    this.excludedFault = data.excludedFaultVOList.map((item) => {
                        return Object.assign({ helpfulChecked: "" }, item)
                    })
                })
            })
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
                // this.showExcludedFaultInfo = false
                this.excludedFault[index].helpfulChecked = isHelpful
            }).catch((error) => {
                nativeService.toast(nativeService.getErrorMessage(error))
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
                let theDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate() + index)
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
        scanCode(result) {
            this.code = nativeService.convertScanResult(result).code
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
                compressRage: 10,
                type: 'jpg',
                isNeedBase64: true
            }
            if (event.index == 0) {
                //拍照
                nativeService.takePhoto(messageParam).then(
                    (resp) => {
                        let imgBase64 = resp.data.split(",")
                        this.photoData.push({
                            fileName: resp.fileName,
                            imgMeta: imgBase64[0],
                            contentStr: imgBase64[1],
                            size: resp.size
                        })
                    }
                ).catch((error) => {
                    // nativeService.toast(JSON.stringify(error || {}))
                })
            } else {
                //选照片
                nativeService.choosePhoto(messageParam).then(
                    (resp) => {
                        let imgBase64 = resp.data.split(",")
                        this.photoData.push({
                            fileName: resp.fileName,
                            imgMeta: imgBase64[0],
                            contentStr: imgBase64[1],
                            size: resp.size
                        })
                    }
                ).catch((error) => {
                    // nativeService.toast(JSON.stringify(error || {}))
                })
            }
        },
        takePhotoBtnClick() {
            this.showTakePhotoBar = false
        },
        removePhoto(index) {
            this.photoData.splice(index, 1)
        },


        //录音
        closeMicPannel() {
            this.isMicPanelShow = false
            this.isRecording = false
            this.stopRecordAudio()
            this.micResult = ''
        },
        startRecordAudio() {
            this.isRecording = true
            nativeService.startRecordAudio({
                max: 30, //最长录音时间, 单位为秒
                isSave: false, //是否保存语音录音文件
                isTransform: true, //是否需要转换语音成文字
            }).then(
                (resp) => {
                    if (resp.status == 0) {
                    }
                }
            ).catch((error) => {
                this.isRecording = false
            })
        },
        stopRecordAudio() {
            if (!this.isRecording) return

            nativeService.stopRecordAudio().then(
                (resp) => {
                    this.isRecording = false
                    if (this.isMicPanelShow) {
                        this.micResult += (resp.data || resp.speakData || '')
                    }
                }
            ).catch((error) => {
            })
        },
        confirmMicResult() {
            this.order.pubRemark += this.micResult
            this.closeMicPannel()
        },

        //重新下单
        renewOrder(order) {
            let serviceUserDemandVO = order.serviceUserDemandVOs[0]
            //维修产品
            this.selectedProduct.push({
                brandCode: serviceUserDemandVO.brandCode,  //产品品牌
                brand: serviceUserDemandVO.brandName,  //产品品牌名称
                prodCode: serviceUserDemandVO.prodCode,  //产品品类
                prodName: serviceUserDemandVO.prodName  //产品品类名称
            })

            //故障类型
            this.selectedFault = {
                orgCode: order.orgCode,
                serviceRequireItemCode: serviceUserDemandVO.contactOrderSerItemCode || serviceUserDemandVO.contactOrderSerItem2Code,
                serviceRequireItemName: serviceUserDemandVO.contactOrderSerItemName || serviceUserDemandVO.contactOrderSerItem2Name,
            }
            this.getExcludedFaultList()

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
                provinceName: customerAddressArray[0] || '',
                city: '',
                cityName: customerAddressArray[1] || '',
                county: '',
                countyName: customerAddressArray[2] || '',
                street: order.areaCode,
                streetName: customerAddressArray[3] || '',
                addr: customerAddressArray[4] || ''
            }

            this.order.pubRemark = serviceUserDemandVO.pubRemark || ""

        },

        claimBySN(applianceSN) {
            let param = {
                serialNo: applianceSN
            }
            nativeService.getProductBySerialNo(param).then((resp) => {
                //通过SN获取设备信息
                let deviceInfo = resp.data

                //维修产品
                this.selectedProduct.push({
                    brandCode: deviceInfo.brandCode,  //产品品牌
                    brand: deviceInfo.productBrand,  //产品品牌名称
                    prodCode: deviceInfo.productTypeId,  //产品品类
                    prodName: deviceInfo.productType  //产品品类名称
                })

                //故障类型
                let param = {
                    interfaceSource: "SMART",
                    depth: 3,
                    parentServiceRequireCode: "BX01016",
                    brandCode: deviceInfo.brandCode, //查询品牌
                    prodCode: deviceInfo.productTypeId, //查询品类
                }
                nativeService.queryservicerequireproduct(param).then((data) => {
                    let faultList = data.list
                    if (faultList && faultList.length > 0) {
                        this.selectedFault = faultList[0]
                    }
                }).catch((error) => {
                    nativeService.toast(nativeService.getErrorMessage(error))
                })

            })
        },

        submit() {
            if (!this.dataReadyStatus.status) return

            nativeService.getUserInfo().then((data) => {
                this.userInfo = data || {}
                let param = {
                    serviceOrderVO: {
                        interfaceSource: "SMART",
                        webUserCode: this.userInfo.uid, //"oFtQywGHyqrWbDvjVdRTeR9Ig3m0"
                        webUserPhone: this.userInfo.mobile,

                        customerName: this.userInfo.nickName,   //报单人姓名
                        customerMobilephone1: this.userInfo.mobile,  //报单人手机号1
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
                        requireServiceDate: this.serviePeriodDate[this.selectedDateIndex].value + ' ' + this.serviePeriodTime[this.selectedTimeIndex].desc,  //用户要求服务时间,
                        requireUnitCode: '',
                        pubRemark: this.order.pubRemark //备注
                    },

                    //图片
                    fileVOs: this.photoData
                }

                //用户诉求从表  
                const product = this.selectedProduct[0]
                //用户诉求从表  
                let serviceUserDemandVOs = [{
                    serviceMainTypeCode: this.selectedFault.serviceMainTypeCode,  //业务类型如安装值为10，从选择服务请求项目中带过来
                    serviceMainTypeName: this.selectedFault.serviceMainTypeName,  //业务类型如安装值为10，从选择服务请求项目中带过来
                    serviceSubTypeCode: this.selectedFault.serviceSubTypeCode,  //业务类型如安装值1010，从选择服务请求项目中带过来
                    serviceSubTypeName: this.selectedFault.serviceSubTypeName,  //业务类型如安装，从选择服务请求项目中带过来
                    contactOrderSerItemCode: this.selectedFault.serviceRequireItemCode,  //用户报单请求项目，如需要安装值为BZ01001
                    contactOrderSerItemName: this.selectedFault.serviceRequireItemName,  //用户报单请求项目，如需要安装
                    prodBrand: product.brandCode,  //产品品牌
                    brandName: product.brand,  //产品品牌名称
                    prodCode: product.prodCode,  //产品品类
                    prodName: product.prodName,  //产品品类名称
                    productAmount: 1,  //默认填1
                    serviceDesc: '', //服务描述
                    productUse: product.userTypeCode == "U99" ? this.order.productUse : '',
                    productCode: this.typeSelectedIndex == 1 ? this.code : '',
                    productModel: this.typeSelectedIndex == 0 ? this.code : ''
                }]
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
                    nativeService.toast(nativeService.getErrorMessage(error))
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
        } else {
            nativeService.getDefaultAddr().then((data) => {
                this.userAddress = data.data
            })

            this.applianceSN = nativeService.getParameters('applianceSN') || ''
            if (this.applianceSN) {
                //一键报修
                this.oneStepFaultDesc = nativeService.getParameters('faultDesc') || ''
                this.claimBySN(this.applianceSN)
            }
        }

        globalEvent.addEventListener("receiveMessageFromApp", (data) => {
            if (data.messageType == "stopRecordAudio") {
                this.stopRecordAudio()
            }
        })
    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
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
.base-group {
  margin-top: 24px;
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
.empty-text {
  color: #c8c7cc;
}
.arraw-cell {
  background-color: #fff7d5;
}
.arraw-line {
  width: 750px;
  height: 15px;
  background-color: #ffffff;
  overflow: hidden;
}
.arraw-triangle {
  left: 600px;
  bottom: -4px;
  width: 22px;
  height: 22px;
  background-color: #fff7d5;
  border-color: #fff7d5;
  border-width: 1px;
  transform: rotate(45deg);
}
.fault-reason {
  flex-direction: row;
  align-items: center;
  padding-top: 16px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 16px;
}
.fault-reason-icon {
  height: 40px;
  width: 40px;
  margin-right: 5px;
}
.fault-reason-label {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #ff9500;
}
.fault-reason-right-text {
  width: 160px;
  padding-right: 10px;
  color: #ff9500;
}
.arrow-icon {
  height: 24px;
  width: 12px;
}

.service-cell {
  background-color: #ffffff;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
.service-cell-block {
  flex-direction: row;
  align-items: center;
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
}
.address-text {
  flex: 1;
  padding-right: 10px;
}
.item-group {
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;
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
  padding-top: 10px;
  padding-right: 28px;
  padding-bottom: 10px;
  padding-left: 28px;
  margin-left: 12px;
  margin-right: 12px;
  border-radius: 4px;
}
.search-history-item-selected {
  background-color: #e8f1ff;
  color: #267aff;
}
.info-group {
  position: relative;
  padding-bottom: 24px;
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
  height: 200px;
}
.info-textarea-calc {
  position: absolute;
  bottom: 28px;
  right: 100px;
  color: #8a8a8f;
  height: 40px;
  font-size: 24px;
}
.mic-icon-wrapper {
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding-right: 30px;
  padding-bottom: 15px;
}
.mic-icon {
  height: 40px;
  width: 40px;
}
.action-bar {
  width: 750px;
  text-align: center;
  padding-top: 30px;
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

.mic-close-icon {
  height: 40px;
  width: 40px;
  position: absolute;
  right: 20px;
  top: 20px;
}
.mic-result {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  height: 400px;
  margin-top: 60px;
  padding-left: 36px;
  padding-right: 36px;
}
.mic-record-wrapper {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 160px;
}
.mic-result-clean {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #666666;
  padding: 20px;
}
.mic-record-icon-wrapper {
  height: 160px;
  width: 160px;
  margin-left: 110px;
  margin-right: 110px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.mic-record-icon {
  height: 120px;
  width: 120px;
}
.mic-record-on-icon {
  height: 160px;
  width: 160px;
}
.mic-result-confirm {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #267aff;
  padding: 20px;
}
.mic-record-tip {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8a8a8f;
  text-align: center;
  padding-top: 10px;
}
</style>
