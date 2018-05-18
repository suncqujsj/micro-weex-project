<template>
    <div class="wrapper">
        <midea-header :title="title" @leftImgClick="back"></midea-header>
        <midea-cell title="维修产品*" rightText="请选择" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectProduct">
        </midea-cell>
        <midea-cell title="故障类型*" rightText="请选择" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectTransportStatus">
        </midea-cell>
        <midea-cell title="期望服务时间*" rightText="请选择" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectServiePeriod">
        </midea-cell>
        <midea-cell title="服务地址*" rightText="请选择" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectTAdress">
        </midea-cell>

        <div class="item-group">
            <text class="type-select-label">以下为选填信息，有助于更快更好地为您服务</text>

            <midea-grid-select class="type-select-grid" :cols="3" :single="true" :customStyles="{width:'200px',height:'48px'}" :list="types" @select="typeSelected">
            </midea-grid-select>
        </div>

        <div class="item-group scan-group group-bottom-border">
            <input class="scan-input" type="text" placeholder="请输入型号或扫机身条码" :autofocus=false value="" @change="onchange" @input="oninput" />

            <image class="scan-icon" src="./assets/img/progress.png" resize='contain'></image>
        </div>

        <div class="item-group photo-group group-bottom-border">
            <text class="photo-label">现场图片</text>
            <text class="photo-right-label">最多上传3张</text>

            <image class="photo-icon" src="./assets/img/progress.png" resize='contain'></image>
        </div>

        <div class="item-group info-group">
            <text class="info-label">其他备注信息</text>

            <image class="mic-icon" src="./assets/img/progress.png" resize='contain'></image>
        </div>

        <div class="item-group info-group group-bottom-border">
            <textarea class="info-textarea" rows="4" @input="onInfoInput" @change="onInfoIChange"></textarea>
            <text class="info-textarea-calc">119/120</text>
        </div>

        <div class="action-bar">
            <midea-button text="提交" type="green" @mideaButtonClicked="submit">
            </midea-button>
        </div>

        <midea-actionsheet :items="actionsheetItems" :show="showBar" @close="closeActionsheet" @itemClick="actionsheetItemClick" @btnClick="actionsheetBtnClick" ref="actionsheet">
        </midea-actionsheet>

        <midea-popup :show="isBottomShow" @mideaPopupOverlayClicked="cancelServiePeriod" pos="bottom" height="700">
            <div class="period-header-bar">
                <text class="period-header-action"></text>
                <text class="period-header-text">服务时间</text>
                <text class="period-header-action" @click="cancelServiePeriod">取消</text>
            </div>
            <div class="period-content">
                <scroller class="period-content-left">
                    <text class="period-content-date">今天</text>
                    <text class="period-content-date">4月12日(周四)</text>
                    <text class="period-content-date">4月12日(周四)</text>
                    <text class="period-content-date">4月12日(周四)</text>
                    <text class="period-content-date">4月12日(周四)</text>
                    <text class="period-content-date">4月12日(周四)</text>
                    <text class="period-content-date">4月12日(周四)</text>
                    <text class="period-content-date">4月12日(周四)</text>
                    <text class="period-content-date">4月12日(周四)</text>
                    <text class="period-content-date">4月12日(周四)</text>
                    <text class="period-content-date">4月12日(周四)</text>
                    <text class="period-content-date">4月12日(周四)</text>
                    <text class="period-content-date">4月12日(周四)</text>
                </scroller>
                <scroller class="period-content-right">
                    <text class="period-content-time-desc">具体上门时间以服务商与您沟通约定为准</text>
                    <text class="period-content-time">8:00-10:00</text>
                    <text class="period-content-time">8:00-10:00</text>
                    <text class="period-content-time">8:00-10:00</text>
                    <text class="period-content-time">8:00-10:00</text>
                    <text class="period-content-time">8:00-10:00</text>
                </scroller>
            </div>
        </midea-popup>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService';

import mideaCell from '@/component/cell.vue'
import mideaGridSelect from '@/component/optionList.vue'
import mideaButton from '@/midea-component/button.vue'
import mideaActionsheet from '@/component/actionsheet.vue'
import mideaPopup from '@/midea-component/popup.vue'

export default {
    components: {
        mideaCell,
        mideaGridSelect,
        mideaButton,
        mideaActionsheet,
        mideaPopup
    },
    mixins: [base],
    data() {
        return {
            title: '维修服务',
            types: [
                {
                    'title': '机身条码',
                    'checked': true
                },
                {
                    'title': '产品型号'
                }
            ],
            showBar: false,
            actionsheetItems: ['货已到需要安装', '或未到需要安装'],
            isBottomShow: false
        }
    },
    methods: {
        selectProduct() {

        },
        selectTransportStatus() {
            this.showBar = true;
            this.$nextTick(e => {
                this.$refs.actionsheet.open();
            });
        },
        closeActionsheet() {
            this.showBar = false
        },
        actionsheetItemClick(event) {
            this.showBar = false
        },
        actionsheetBtnClick() {
            this.showBar = false
        },
        selectServiePeriod() {
            this.isBottomShow = true
        },
        confirmServiePeriod() {
            this.isBottomShow = false;
        },
        cancelServiePeriod() {
            this.isBottomShow = false;
        },
        selectTAdress() {

        },
        typeSelected() {

        },
        onchange() {

        },
        oninput() {

        },
        onInfoInput() {

        },
        onInfoIChange() {

        },
        submit() {

        }
    },
    created() {

    }
}
</script>

<style>
.wrapper {
  background-color: #ffffff;
  position: relative;
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
  font-size: 28px;
  margin-right: 20px;
}
.scan-icon {
  height: 40px;
  width: 40px;
}
.photo-group {
  flex-direction: row;
}
.photo-label {
  flex: 1;
  font-size: 28px;
  margin-right: 20px;
  text-align: left;
}
.photo-right-label {
  color: #e2e2e2;
  flex: 1;
  font-size: 26px;
  margin-right: 20px;
  text-align: right;
}
.photo-icon {
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
.period-header-bar {
  height: 80px;
  width: 750px;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
.period-header-text {
  font-size: 32px;
}
.period-header-action {
  width: 88px;
  font-size: 28px;
}
.period-content {
  width: 750px;
  height: 620px;
  flex-direction: row;
}
.period-content-left {
  flex: 1;
  align-content: center;
  align-items: center;
}
.period-content-date {
  text-align: center;
  font-size: 32px;
  padding: 20px;
}
.period-content-right {
  flex: 1;
  align-content: center;
  align-items: center;
  padding-bottom: 20px;
}
.period-content-time-desc {
  width: 340px;
  text-align: center;
  font-size: 32px;
  padding: 20px;
  margin-top: 20px;
  color: red;
  word-wrap: break-word;
}
.period-content-time {
  text-align: center;
  font-size: 32px;
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  background-color: gray;
}
</style>
