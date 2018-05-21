<template>
    <div class="wrapper">
        <midea-header :title="title" @leftImgClick="back"></midea-header>
        <scroller class="content-wrapper">
            <midea-cell title="安装产品*" rightText="请选择" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectProduct">
            </midea-cell>
            <midea-cell title="物流状态*" :rightText="transportStatusDesc" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectTransportStatus">
            </midea-cell>
            <midea-cell title="期望服务时间*" :rightText="serviePeriodDesc" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectServiePeriod">
            </midea-cell>
            <midea-cell title="服务地址*" rightText="请选择" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectAddress">
            </midea-cell>

            <div class="item-group">
                <text class="type-select-label">以下为选填信息，有助于更快更好地为您服务</text>

                <midea-grid-select class="type-select-grid" :cols="3" :single="true" :customStyles="{width:'200px',height:'48px'}" :list="types" @select="typeSelected">
                </midea-grid-select>
            </div>

            <div class="item-group scan-group group-bottom-border">
                <input class="scan-input" placeholder="请输入型号或扫机身条码" :autofocus=false :value="code" @change="onchange" @input="oninput" />

                <image class="scan-icon" src="./assets/img/progress.png" resize='contain' @click="scanCode"></image>
            </div>

            <div class="item-group info-group">
                <text class="info-label">其他备注信息</text>

                <image class="mic-icon" src="./assets/img/progress.png" resize='contain'></image>
            </div>

            <div class="item-group info-group group-bottom-border">
                <textarea class="info-textarea" placeholder="请输入其他备注信息" rows="4" @input="onInfoInput" @change="onInfoIChange"></textarea>
                <text class="info-textarea-calc">119/120</text>
            </div>
        </scroller>
        <div class="action-bar">
            <midea-button text="提交" type="green" @mideaButtonClicked="submit">
            </midea-button>
        </div>

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
                    'checked': true
                },
                {
                    'title': '产品型号'
                }
            ],
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
            }
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
        }
    },
    methods: {
        initProductData() {
            let params = {
                url: 'http://weixincs.midea.com/wxgw/myproduct/searchProductType?mpType=MIDEASERVICE',
                type: 'text',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: {
                    'codeType': 'bzbx',
                    'version': '1.0'
                }
            }
            nativeService.sendHttpRequest(params)
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
        typeSelected() {

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
        onInfoInput() {

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
.content-wrapper {
  padding-bottom: 120px;
}
.item-group {
  padding: 24px;
}

.group-bottom-border {
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}

.type-select-label {
  font-size: 28px;
  padding-bottom: 15px;
}
.type-select-grid {
  font-size: 28px;
}
.scan-group {
  flex-direction: row;
}
.scan-input {
  flex: 1;
  font-size: 32px;
  margin-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.scan-icon {
  height: 40px;
  width: 40px;
}
.info-group {
  flex-direction: row;
}
.info-label {
  flex: 1;
  font-size: 28px;
  margin-right: 20px;
  text-align: left;
}
.mic-icon {
  height: 40px;
  width: 40px;
}
.info-textarea {
  flex: 1;
  font-size: 28px;
  padding-bottom: 30px;
}
.info-textarea-calc {
  position: absolute;
  bottom: 24px;
  right: 26px;
  color: #e2e2e2;
  font-size: 20px;
}
.action-bar {
  position: fixed;
  bottom: 0px;
  width: 750px;
  text-align: center;
}
</style>
