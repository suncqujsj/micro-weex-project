<template>
    <div class="wrapper">
        <midea-header :title="title" @leftImgClick="back"></midea-header>
        <scroller class="content-wrapper">
            <div class="item-group">
                <midea-grid-select class="type-select-grid" :cols="3" :single="true" :customStyles="{width:'200px',height:'48px'}" :list="types" @select="typeSelected">
                </midea-grid-select>
            </div>

            <div class="item-group scan-group group-bottom-border">
                <input class="scan-input" placeholder="请输入型号或扫机身条码" :autofocus=false :value="code" @change="onchange" @input="oninput" />

                <image class="scan-icon" src="./assets/img/progress.png" resize='contain' @click="scanCode"></image>
            </div>

            <midea-cell title="购买产品时间*" :rightText="date?date:'请选择'" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="pickDate">
            </midea-cell>

            <div class="item-group">
                <text class="result-title">家用净水器（整机三年）</text>
                <text class="result-desc">整机包修3年，电路板，水泵包修5年</text>
            </div>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService';

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
            title: '包修服务',
            types: [
                {
                    'title': '机身条码',
                    'checked': true
                },
                {
                    'title': '产品型号'
                }
            ],
            date: null
        }
    },
    computed: {
    },
    methods: {
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

        pickDate() {
            picker.pickDate({
                'value': this.date,
                'max': '2029-11-28',
                'min': '2015-11-28',
                'title': '选择日期', //取消和确定中间那标题
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#020F13', //取消颜色
                'confirmTxtColor': '#020F13', //标题颜色
                'titleColor': '#020F13', //标题颜色
                'titleBgColor': '#E7EDEF' //标题栏颜色

            }, event => {
                var result = event.result;
                if (result == 'success') {
                    this.date = event.data;
                }
            });
        },
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
.result-title {
  font-size: 28px;
  padding-bottom: 15px;
}
.result-desc {
  font-size: 26px;
}
</style>
