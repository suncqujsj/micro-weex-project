<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller class="content-wrapper">
            <div class="base-group">
                <div class="item-group">
                    <text class="type-select-label">以下为选填信息，有助于更快更好地为您服务</text>
                    <div class="search-history">
                        <text v-for="(item,index) in types" :key="index" v-bind:class="['search-history-item', typeSelectedIndex==index?'search-history-item-selected':'']" @click="typeSelected(index)">{{item.title}}</text>
                    </div>
                </div>

                <div class="item-group scan-group">
                    <input class="scan-input" placeholder="请输入型号或扫机身条码" :autofocus=false v-model="barcode" @input="oninput" />

                    <image class="scan-icon" src="./assets/img/service_ic_scan@3x.png" resize='contain' @click="scanCode"></image>
                </div>
            </div>

            <div class="base-group">
                <midea-cell title="" :rightText="date?date:'请选择'" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="pickDate">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">购买产品时间</text>
                        <text class="cell-label-star">*</text>
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
import nativeService from '@/common/services/nativeService'
import util from '@/common/util/util'

import { MideaCell, MideaGridSelect } from '@/index'

const picker = weex.requireModule('picker')

export default {
    components: {
        MideaCell,
        MideaGridSelect
    },
    mixins: [base],
    data() {
        return {
            title: '包修政策',
            types: [
                {
                    'title': '机身条码',
                    'checked': true
                },
                {
                    'title': '产品型号'
                }
            ],
            typeSelectedIndex: 0,
            barcode: '',
            date: null,
            result: null
        }
    },
    computed: {
    },
    methods: {
        typeSelected(index) {
            this.typeSelectedIndex = index
        },
        oninput(event) {
            this.date = null
            this.result = null
        },
        scanCode() {
            nativeService.scanCode().then(
                (resp) => {
                    if (resp.status == 0) {
                        if (this.barcode != resp.data) {
                            this.barcode = resp.data
                            this.date = null
                            this.result = null
                        }
                    }
                }
            )
        },

        pickDate() {
            if (!this.barcode) {
                nativeService.toast('请输入型号或扫机身条码')
                return
            }
            picker.pickDate({
                'value': this.date,
                'max': util.dateFormat(new Date(), "yyyy-MM-dd"),
                'min': '2015-11-28',
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
                        barcode: this.barcode,
                        purchaseDate: util.dateFormat(new Date(this.date), "yyyy-MM-dd")
                    }
                    nativeService.querywarrantydescbycodeorsn(param).then((data) => {
                        this.result = data
                    }).catch((error) => {
                        nativeService.toast(nativeService.getCssErrorMessage(error))
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
.scan-group {
  position: relative;
  padding-bottom: 32px;
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
