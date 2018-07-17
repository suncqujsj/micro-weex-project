<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./assets/img/public_ic_back@3x.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller>
            <div class="base-group">
                <div class="item-group">
                    <scan-input placeholder="请输入或扫机身条码" v-model="barCode" @blur="checkBarCode" @scanCode="scanCode"></scan-input>
                </div>
                <div class="item-group last-item-group">
                    <text v-if="!productModel" class="item-input-text placeholder" @click="goToSearch">请输入型号</text>
                    <text v-else class="item-input-text" @click="goToSearch">{{productModel}}</text>
                </div>
            </div>
            <div class="base-group">
                <midea-cell title="" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="pickDate">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">购买产品时间</text>
                        <text class="cell-label-star">*</text>
                    </div>
                    <div slot="rightText">
                        <text class="right-text">{{date?date:'请选择'}}</text>
                    </div>
                </midea-cell>
            </div>

            <div v-if="result" class="base-group">
                <div class="item-group">
                    <text class="result-title">{{result.warrantyStandardName}}</text>
                    <text class="result-desc">{{result.warrantyStandardDesc}}</text>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService'
import util from '@/common/util/util'

import { MideaCell } from '@/index'
import ScanInput from '@/customer-service/components/scanInput.vue'

const picker = weex.requireModule('picker')

export default {
    components: {
        MideaCell,
        ScanInput
    },
    mixins: [base],
    data() {
        return {
            title: '包修政策',
            barCode: '',
            orgCode: "",
            productCode: '',
            productModel: '',
            date: null,
            result: null
        }
    },
    computed: {
    },
    methods: {
        handlePageData(data) {
            if (data.page == "serviceWarranty") {
                if (data.key == "selectedMachine") {
                    //条码解析选择
                    let machine = data.data
                    this.orgCode = machine.orgCode
                    this.productCode = machine.productCode
                    this.productModel = machine.productModel
                } else if (data.key == "serviceMachineSearch") {
                    //型号模糊查询选择
                    let machine = data.data
                    this.orgCode = machine.prodType.orgCode
                    this.productCode = machine.product.salesCode
                    this.productModel = machine.product.productModel
                }
                this.resetResult()
            }
        },
        resetResult(event) {
            this.productModel = null
            this.date = null
            this.result = null
        },
        scanCode(result) {
            this.resetResult()
            this.barCode = nativeService.convertScanResult(result).code
            this.checkBarCode()
        },
        checkBarCode() {
            if (!this.barCode) return

            let param = {
                "barCode": this.barCode
            }
            nativeService.queryproductinfobysn(param).then((resp) => {
                let machineList = resp.machineList
                if (machineList) {
                    if (machineList.length == 1) {
                        this.orgCode = machineList[0].orgCode
                        this.productCode = machineList[0].productCode
                        this.productModel = machineList[0].productModel
                    } else if (machineList.length > 1) {
                        nativeService.setItem(this.SERVICE_STORAGE_KEYS.machineList, JSON.stringify(machineList), () => {
                            this.goTo('serviceMachineList', {}, { from: 'serviceWarranty' })
                        })
                    }
                }
            }).catch((error) => {
                this.resetResult()
                nativeService.toast(nativeService.getErrorMessage(error))
            })
        },
        goToSearch() {
            this.goTo('serviceMachineSearch', {}, { from: 'serviceWarranty', keyword: this.productModel })
        },
        pickDate() {
            if (!this.barCode && !this.productModel) {
                nativeService.toast('请输入型号或扫机身条码')
                return
            }
            picker.pickDate({
                'value': this.date,
                'max': util.dateFormat(new Date(), "yyyy-MM-dd"),
                'min': '2000-01-01',
                'title': '选择日期', //取消和确定中间那标题
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#000000', //取消颜色
                'confirmTxtColor': '#000000', //标题颜色
                'titleColor': '#000000', //标题颜色
                'titleBgColor': '#E5E5E8' //标题栏颜色
            }, event => {
                var result = event.result;
                if (result == 'success') {
                    this.date = event.data;

                    let param = {
                        barcode: "",
                        orgCode: this.orgCode,
                        productCode: this.productCode,
                        purchaseDate: util.dateFormat(new Date(this.date), "yyyy-MM-dd")
                    }
                    nativeService.querywarrantydescbycodeorsn(param).then((data) => {
                        this.result = data
                    }).catch((error) => {
                        this.result = null
                        nativeService.toast(nativeService.getErrorMessage(error))
                    })
                }
            });
        },
    },
    created() {
    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
}
.base-group {
  padding-top: 24px;
  background-color: #f2f2f2;
}
.cell-title {
  flex: 1;
  flex-direction: row;
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
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
  background-color: #ffffff;
}
.last-item-group {
  padding-bottom: 32px;
}
.item-input-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  height: 72px;
  padding-top: 16px;
  padding-left: 22px;
  padding-right: 50px;
  padding-bottom: 16px;
  background-color: #fafafa;
}
.placeholder {
  color: #9a9a9a;
}
.item-input {
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
.type-select-label {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
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
  margin-right: 24px;
  border-radius: 4px;
}
.search-history-item-selected {
  background-color: #e8f1ff;
  color: #267aff;
}
.search-mode {
  flex: 1;
  flex-direction: column;
}
.scroller {
  flex: 1;
}
.scroller-item-wrapper {
  padding-top: 28px;
  padding-left: 32px;
  padding-bottom: 28px;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
  background-color: #ffffff;
}
.scroller-item {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
.result-title {
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 32px;
  color: #000000;
  padding-bottom: 24px;
}
.result-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  padding-bottom: 32px;
}
</style>
