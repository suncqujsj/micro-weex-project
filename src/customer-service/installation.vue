<template>
    <div class="wrapper">
        <midea-header :title="title" :isImmersion="isipx?false:true" @headerClick="headerClick" titleText="#000000" @leftImgClick="back" :showRightText="true" rightText="收费标准" @rightTextClick="goToServiceCharge">
        </midea-header>
        <scroller class="content-wrapper">
            <div class="base-group">
                <midea-cell placeHolder="请选择" :rightText="selectedProductDesc" @mideaCellClick="selectProduct">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">安装产品</text>
                        <text class="cell-label-star">*</text>
                    </div>
                </midea-cell>
                <midea-cell v-if="isIncludeU99" placeHolder="请选择" :rightText="productUseDesc" @mideaCellClick="selectProductUse">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">使用场所</text>
                        <text class="cell-label-star">*</text>
                    </div>
                </midea-cell>
                <midea-cell placeHolder="请选择" :rightText="transportStatusDesc" @mideaCellClick="selectTransportStatus">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">物流状态</text>
                        <text class="cell-label-star">*</text>
                    </div>
                </midea-cell>
                <midea-cell placeHolder="请选择" :rightText="serviePeriodDesc" @mideaCellClick="selectServiePeriod">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">期望服务时间</text>
                        <text class="cell-label-star">*</text>
                    </div>
                </midea-cell>
                <midea-cell placeHolder="请选择" :rightText="userAddressDesc" @mideaCellClick="selectAddress" :hasSubBottomBorder="false">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">服务地址</text>
                        <text class="cell-label-star">*</text>
                    </div>
                </midea-cell>
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

                <div class="item-group info-group">
                    <div class="info-textarea-wrapper">
                        <textarea class="info-textarea" placeholder="其他备注信息" v-model="order.pubRemark" rows="5" maxlength="120"></textarea>
                        <text class="info-textarea-calc">{{order.pubRemark.length}}/120</text>
                        <div class="mic-icon-wrapper" @click="isMicPanelShow=true">
                            <image class="mic-icon" src="./assets/img/service_ic_tape@3x.png" resize='contain'></image>
                        </div>
                    </div>
                </div>
            </div>
            <div class="action-bar">
                <midea-button text="提交" :disabled="!isDataReady" @mideaButtonClicked="submit"></midea-button>
            </div>
        </scroller>

        <midea-actionsheet :items="productUseItems" :show="isShowProductUse" @close="closeProductUseActionsheet" @itemClick="productUsetItemClick" @btnClick="productUseBtnClick" ref="productUseActionsheet">
        </midea-actionsheet>

        <period-picker :isShow="isShowPeriodPicker" :dates="serviePeriodDate" :dateIndex="selectedDateIndex" :times="serviePeriodTime" :timeIndex="selectedTimeIndex" @oncancel="isShowPeriodPicker=false" @onchanged="serviePeriodSelected">
        </period-picker>

        <midea-actionsheet :items="transportStatusItems" :show="isShowTransportStatus" @close="closeTransportStatusActionsheet" @itemClick="transportStatustItemClick" @btnClick="transportStatusBtnClick" ref="transportStatusActionsheet">
        </midea-actionsheet>

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

import MideaCell from '@/midea-component/cell2.vue'
import MideaGridSelect from '@/component/optionList.vue'
import MideaButton from '@/midea-component/button2.vue'
import MideaActionsheet from '@/midea-component/actionsheet.vue'
import MideaPopup from '@/midea-component/popup.vue'

import PeriodPicker from './components/periodPicker.vue'
import ScanInput from '@/customer-service/components/scanInput.vue'

const PLEASE_SELECT = ""
export default {
    components: {
        MideaCell,
        MideaGridSelect,
        MideaButton,
        MideaActionsheet,
        MideaPopup,

        PeriodPicker,
        ScanInput
    },
    mixins: [base],
    data() {
        return {
            title: '安装服务',
            isRenew: false,
            selectedProduct: [],

            isShowProductUse: false,
            productUseOptions: [
                { value: '11', desc: '商用' },
                { value: '10', desc: '家用' }
            ],

            isShowTransportStatus: false,
            transportStatusIndex: null,
            transportStatusOptions: [
                {
                    "serviceRequireItemCode": "BZ01001",
                    "serviceRequireItemName": "货已到需要安装",
                    "serviceMainTypeCode": "10",
                    "serviceMainTypeName": "安装",
                    "serviceSubTypeCode": "1010",
                    "serviceSubTypeName": "安装"
                },
                {
                    "serviceRequireItemCode": "BZ01002",
                    "serviceRequireItemName": "货未到预约安装",
                    "serviceMainTypeCode": "10",
                    "serviceMainTypeName": "安装",
                    "serviceSubTypeCode": "1010",
                    "serviceSubTypeName": "安装"
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
                    'title': '产品型号',
                    'isSelected': true
                },
                {
                    'title': '机身条码',
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
        //安装产品
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

        //物流状态
        transportStatusItems() {
            return this.transportStatusOptions.map((item) => {
                return item.serviceRequireItemName
            })
        },
        transportStatusDesc() {
            let result = PLEASE_SELECT
            if (this.transportStatusIndex !== null) {
                result = this.transportStatusOptions[this.transportStatusIndex].serviceRequireItemName
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

        isDataReady() {
            let result = true

            //安装产品
            if (result && !(this.selectedProduct && this.selectedProduct.length > 0)) {
                result = false
            }
            //使用场所
            if (result && this.checkIsIncludeU99() && this.order.productUse == '') {
                result = false
            }
            //物流状态
            if (result && this.transportStatusIndex == null) {
                result = false
            }
            //期望服务时间
            if (result && !(this.serviePeriodDate && this.selectedDateIndex != null && this.serviePeriodTime && this.selectedTimeIndex != null)) {
                result = false
            }
            //服务地址
            if (result && !this.userAddress) {
                result = false
            }

            return result
        }
    },
    methods: {
        handlePageData(data) {
            if (data.page == "installation") {
                if (data.key == "selectedProduct") {
                    this.selectedProduct.splice(0, this.selectedProduct.length, ...(data.data))
                } else if (data.key == "userAddressList") {
                    this.userAddress = data.data
                }
            }
        },
        //收费标准
        goToServiceCharge() {
            if (this.selectedProduct && this.selectedProduct.length > 0) {
                nativeService.setItem(this.SERVICE_STORAGE_KEYS.selectedProductArray, JSON.stringify(this.selectedProduct), () => {
                    this.goTo('serviceCharge', {}, { from: 'installation' })
                })
            } else {
                this.goTo('productSelection', {}, { from: 'installation', to: 'serviceCharge' })
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
                let theDateDesc = (theDate.getMonth() + 1) + '月' + theDate.getDate() + '日'
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
        scanCode(result) {
            this.code = nativeService.convertScanResult(result).code
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
            //安装产品
            this.selectedProduct.push({
                brandCode: serviceUserDemandVO.brandCode,  //产品品牌
                brand: serviceUserDemandVO.brandName,  //产品品牌名称
                prodCode: serviceUserDemandVO.prodCode,  //产品品类
                prodName: serviceUserDemandVO.prodName  //产品品类名称
            })

            //物流状态
            if (order.serviceRequireItemCode == this.transportStatusOptions[0].serviceRequireItemCode) {
                this.transportStatusIndex = 0
            } else {
                this.transportStatusIndex = 1
            }
            //期望服务时间
            // let temp = order.requireServiceDate.split(" ")
            // let matchDateItem = this.serviePeriodDate.find((item) => {
            //     return item.value == temp[0]
            // })
            // if (matchDateItem) {
            //     this.selectedDateIndex = matchDateItem.index
            // } else {
            //     this.selectedDateIndex = 1
            // }
            // let matchTimeItem = this.serviePeriodTime.find((item) => {
            //     return item.desc == temp[1]
            // })
            // if (matchTimeItem) {
            //     this.selectedTimeIndex = matchTimeItem.index
            // }

            //服务地址
            let customerAddressArray = order.customerAddress.split(" ")
            this.userAddress = {
                receiverName: order.servCustomerName,
                receiverMobile: order.servCustomerMobilephone1,
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

        submit() {
            if (!this.isDataReady) return

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
                        productUse: product.userTypeCode == "U99" ? this.order.productUse : '',
                        productCode: this.typeSelectedIndex == 1 ? this.code : '',
                        productModel: this.typeSelectedIndex == 0 ? this.code : ''
                    })
                }
                param["serviceUserDemandVOs"] = serviceUserDemandVOs

                nativeService.createserviceorder(param).then(() => {
                    this.appPageDataChannel.postMessage({ page: "installation", key: "createOrder" })
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
        }

        globalEvent.addEventListener("receiveMessageFromApp", (data) => {
            if (data.messageType == "stopRecordAudio") {
                this.stopRecordAudio()
            }
        })

        nativeService.burialPoint({
            pageName: 'serviceInstallationPage',
            subAction: 'page_view'
        })
    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
}
.base-group {
  margin-top: 24px;
}
.cell-title {
  flex: 300px;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
}
.cell-label {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
.cell-label-star {
  font-family: "SF Pro Text", PingFangSC-Regular;
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
  padding-left: 32px;
  padding-right: 24px;
  padding-bottom: 32px;
}
.address-text {
  flex: 1;
  padding-right: 20px;
}
.item-group {
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
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
  padding-top: 14px;
  padding-right: 32px;
  padding-bottom: 14px;
  padding-left: 32px;
  margin-right: 24px;
  border-radius: 4px;
}
.search-history-item-selected {
  background-color: #e8f1ff;
  color: #267aff;
}
.info-group {
  position: relative;
  padding-bottom: 48px;
}
.info-textarea-wrapper {
  position: relative;
  border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  padding-bottom: 50px;
  background-color: #fafafa;
  height: 200px;
}
.info-textarea {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  padding-top: 10px;
  padding-left: 16px;
  padding-right: 50px;
  background-color: #fafafa;
  height: 150px;
}
.info-textarea-calc {
  position: absolute;
  bottom: 8px;
  right: 50px;
  color: #8a8a8f;
  height: 40px;
  font-size: 24px;
}
.mic-icon-wrapper {
  position: absolute;
  right: 10px;
  bottom: 0px;
  padding-bottom: 15px;
}
.mic-icon {
  height: 40px;
  width: 40px;
}
.action-bar {
  width: 750px;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 50px;
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
