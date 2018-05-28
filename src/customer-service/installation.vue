<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
            <div slot="customerContent" class="header-right">
                <text class="header-right-text" @click="goTo('productSelection', {}, { from: 'installation' })">收费标准</text>
            </div>
        </midea-header>
        <scroller class="content-wrapper">
            <div class="base-group">
                <midea-cell rightText="请选择" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectProduct">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">安装产品</text>
                        <text class="cell-label-star">*</text>
                    </div>
                </midea-cell>
                <midea-cell :rightText="transportStatusDesc" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectTransportStatus">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">物流状态</text>
                        <text class="cell-label-star">*</text>
                    </div>
                </midea-cell>
                <midea-cell :rightText="serviePeriodDesc" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectServiePeriod">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">期望服务时间</text>
                        <text class="cell-label-star">*</text>
                    </div>
                </midea-cell>
                <midea-cell rightText="请选择" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectAddress">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">服务地址</text>
                        <text class="cell-label-star">*</text>
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
                    <input class="scan-input" placeholder="请输入型号或扫机身条码" :autofocus=false :value="code" @change="onchange" @input="oninput" />

                    <image class="scan-icon" src="./assets/img/service_ic_scan@3x.png" resize='contain' @click="scanCode"></image>
                </div>

                <div class="item-group info-group">
                    <textarea class="info-textarea" placeholder="请输入其他备注信息" :value="infoText" rows="5" @input="onInfoInput" maxlength="120"></textarea>
                    <text class="info-textarea-calc">{{infoText.length}}/120</text>
                    <image class="mic-icon" src="./assets/img/service_ic_tape@3x.png" resize='contain'></image>
                </div>
                <div class="action-bar">
                    <midea-button text="提交" type="green" :btnStyle="{'background-color': isDataReady?'#267AFF':'#267AFF','opacity':isDataReady?'1':'0.2','border-radius': '4px'}" @mideaButtonClicked="submit">
                    </midea-button>
                </div>
            </div>
        </scroller>

        <midea-actionsheet :items="TransportStatusItems" :show="isShowTransportStatus" @close="closeTransportStatusActionsheet" @itemClick="TransportStatustItemClick" @btnClick="transportStatusBtnClick" ref="transportStatusActionsheet">
        </midea-actionsheet>

        <period-picker :isShow="isShowPeriodPicker" :dates="serviePeriodDate" :dateIndex="selectedDateIndex" :times="serviePeriodTime" :timeIndex="selectedTimeIndex" @oncancel="isShowPeriodPicker=false" @onchanged="serviePeriodSelected">
        </period-picker>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService';


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
            typeSelectedIndex: 0,
            isShowTransportStatus: false,
            TransportStatusItems: ['货已到需要安装', '货未到需要安装'],

            isShowPeriodPicker: false,
            selectedDateIndex: 0,
            selectedTimeIndex: 0,
            serviePeriodDate: [],
            serviePeriodTime: [
                { key: 0, desc: "08:00-10:00" },
                { key: 1, desc: "10:00-12:00" },
                { key: 2, desc: "12:00-14:00" },
                { key: 3, desc: "14:00-16:00" },
                { key: 4, desc: "16:00-18:00" }
            ],

            code: '',
            data: {
                transportStatus: ''
            },
            infoText: ''
        }
    },
    computed: {
        transportStatusDesc() {
            return this.data.transportStatus ? this.data.transportStatus : '请选择'
        },
        serviePeriodDesc() {
            if (this.serviePeriodDate && this.selectedDateIndex && this.serviePeriodTime && this.selectedTimeIndex) {
                return this.serviePeriodDate[this.selectedDateIndex].desc + ' ' + this.serviePeriodTime[this.selectedTimeIndex].desc
            } else {
                return '请选择'
            }
        },
        isDataReady() {
            return true
        }
    },
    methods: {
        initProductData() {
            let params = {
                url: 'http://weixincs.midea.com/wxgw/myproduct/searchProductType?mpType=MIDEASERVICE',
                body: {
                    'codeType': 'bzbx',
                    'version': '1.0'
                }
            }
            // nativeService.sendHttpRequest(params)
        },
        selectProduct() {
            this.goTo('productSelection', {}, { from: 'installation' })
        },
        selectTransportStatus() {
            this.isShowTransportStatus = true;
            this.$nextTick(e => {
                this.$refs.transportStatusActionsheet.open();
            });
        },
        closeTransportStatusActionsheet() {
            this.isShowTransportStatus = false
        },
        TransportStatustItemClick(event) {
            this.isShowTransportStatus = false
            this.data.transportStatus = this.TransportStatusItems[event.index]
        },
        transportStatusBtnClick() {
            this.isShowTransportStatus = false
        },
        initServiePeriod() {
            let today = new Date()

            this.serviePeriodDate.push({
                key: -2,
                desc: ''
            })
            this.serviePeriodDate.push({
                key: -1,
                desc: ''
            })
            this.serviePeriodDate.push({
                key: 0,
                desc: '今天'
            })
            let weekDesc = {
                0: "日",
                1: "一",
                2: "二",
                3: "三",
                4: "四",
                5: "五",
                6: "六",
            }
            for (let index = 1; index < 31; index++) {
                let nextDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + index)

                this.serviePeriodDate.push({
                    key: index,
                    desc: nextDate.getMonth() + '月' + nextDate.getDate() + '日 (周' + weekDesc[nextDate.getDay()] + ')'
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
        selectAddress() {

        },
        typeSelected(index) {
            this.typeSelectedIndex = index
        },
        onchange() {

        },
        oninput(event) {
            this.code = event.value
        },
        scanCode() {
            nativeService.scanCode().then(
                (resp) => {
                    if (resp.status == 0) {
                        this.code = resp.data
                    }
                }
            )
        },
        onInfoInput(event) {
            this.infoText = event.value
        },
        onInfoIChange() {

        },
        submit() {

        }
    },
    created() {
        this.initServiePeriod()
        this.initProductData()
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
