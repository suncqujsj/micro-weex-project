<template>
    <div class="wrapper">
        <midea-header :title="title" @leftImgClick="back"></midea-header>
        <scroller class="content-wrapper">
            <midea-cell title="维修产品*" rightText="请选择" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectProduct">
            </midea-cell>
            <midea-cell title="故障类型*" :rightText="malfunctionDesc" :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectMalfunction">
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

            <div class="item-group photo-group">
                <text class="photo-label">现场图片</text>
                <text class="photo-right-label">最多上传3张</text>

                <image class="photo-icon" src="./assets/img/progress.png" resize='contain' @click="takePhoto"></image>
            </div>
            <div class="photo-item-group group-bottom-border">
                <div v-for="(item,index) in photoData" :key="index" class="photo-item-detail">
                    <image :src="item" class="photo-item-img" @click="removePhoto(index)"></image>
                    <image src="./assets/img/progress.png" class="photo-delete-img"></image>
                </div>
                <image v-if="photoData.length<3" src="./assets/img/add.png" class="photo-item-img" @click="takePhoto"></image>
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

        <midea-select :show="isShowMalfunctionSelection" title="选择故障类型" :items="malfunctionList" :index="malfunctionIndex" @close="isShowMalfunctionSelection=false" @itemClick="malfunctionSelected">
        </midea-select>

        <period-picker :isShow="isShowPeriodPicker" :dates="serviePeriodDate" :dateIndex="selectedDateIndex" :times="serviePeriodTime" :timeIndex="selectedTimeIndex" @oncancel="isShowPeriodPicker=false" @onchanged="serviePeriodSelected">
        </period-picker>

        <midea-actionsheet :items="takePhotoItems" :show="showTakePhotoBar" @close="closeTakePhotoActionsheet" @itemClick="takePhotoItemClick" @btnClick="takePhotoBtnClick" ref="takePhotoActionsheet">
        </midea-actionsheet>
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
            isShowMalfunctionSelection: false,
            malfunctionIndex: null,
            malfunctionList: [
                { value: "故障一", key: 0 },
                { value: "故障二", key: 1 },
                { value: "故障三", key: 2 }
            ],

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

            showTakePhotoBar: false,
            takePhotoItems: ['拍摄', '从手机相册选择'],
            photoData: [],

            data: {
                malfunction: ''
            }
        }
    },
    computed: {
        malfunctionDesc() {
            return this.data.malfunction ? this.data.malfunction : '请选择'
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
        selectProduct() {
            this.goTo('productSelection', {}, { from: 'maintenance' })
        },
        selectMalfunction() {
            this.isShowMalfunctionSelection = true
        },
        malfunctionSelected(event) {
            this.data.malfunction = event.item.value;
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
                        this.photoData.push(resp.data)
                    }
                ).catch((error) => {
                    this.result = "error: " + JSON.stringify(error || {})
                })
            } else {
                //选照片
                nativeService.choosePhoto(messageParam).then(
                    (resp) => {
                        this.photoData.push(resp.data)
                    }
                ).catch((error) => {
                    this.result = "error: " + JSON.stringify(error || {})
                })
            }
        },
        takePhotoBtnClick() {
            this.showTakePhotoBar = false
        },
        removePhoto(index) {
            this.photoData.splice(index, 1)
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
.photo-item-group {
  width: 750px;
  padding-left: 24px;
  padding-bottom: 24px;
  flex-direction: row;
}
.photo-item-detail {
  flex-direction: row;
}
.photo-item-img {
  width: 180px;
  height: 180px;
  margin-right: 20px;
}
.photo-delete-img {
  position: absolute;
  right: 20px;
  top: 0px;
  width: 60px;
  height: 60px;
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
