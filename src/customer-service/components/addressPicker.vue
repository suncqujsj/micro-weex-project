<template>
    <midea-popup ref="popup" :show="isShow" @mideaPopupOverlayClicked="cancel" pos="bottom" :height="height">
        <div class="period-header-bar">
            <div class="period-header-area-wrapper">
                <text v-if="currentRegionLevel>0" class="period-header-area" @click="getAreaList(0)">{{areaObj.provinceName||''}}</text>
                <text v-if="currentRegionLevel>1" class="period-header-area" @click="getAreaList(areaObj.province)">{{areaObj.cityName}}</text>
                <text v-if="currentRegionLevel>2" class="period-header-area" @click="getAreaList(areaObj.city)">{{areaObj.countyName}}</text>
                <text v-if="currentRegionLevel>3" class="period-header-area" @click="getAreaList(areaObj.county)">{{areaObj.streetName}}</text>
                <text class="period-header-area-current">{{nextRegionDesc}}</text>
            </div>
            <image class="period-header-action" src="./assets/img/service_ic_cancel@3x.png" resize='contain' @click="buttonCancel"></image>
        </div>
        <scroller class="period-content-wrapper" show-scrollbar=false>
            <div class="period-content-item-wrapper" v-for="(item, index) in currentRegionList" :key="index" @click="selectItem(item)" :ref="'area'+index">
                <text v-bind:class="['period-content-item']">{{item.regionName}}</text>
            </div>
        </scroller>
    </midea-popup>
</template>

<script>
import nativeService from '@/common/services/nativeService';

const dom = weex.requireModule('dom')

import { MideaPopup } from '@/index'

export default {
    components: {
        MideaPopup
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: {
                province: '',
                provinceName: '',
                city: '',
                cityName: '',
                county: '',
                countyName: '',
                street: '',
                streetName: ''
            }
        },
        height: {
            type: Number,
            default: 610
        }
    },
    data() {
        return {
            itemHeight: 70,
            areaObj: {
                province: '',
                provinceName: '',
                city: '',
                cityName: '',
                county: '',
                countyName: '',
                street: '',
                streetName: ''
            },
            areaListObj: {},
            currentRegionLevel: 0,
            currentregionCode: '0'
        }
    },
    watch: {
        isShow(value) {
            if (value) {
                this.$nextTick(() => {
                    this.areaObj = Object.assign(this.areaObj, this.data)
                    if (this.areaObj.street) {
                        //修改地址
                        this.currentRegionLevel = 4
                        this.currentregionCode = this.areaObj.county
                        this.getAreaList(this.areaObj.county)
                    } else {
                        //新选
                        this.getAreaList()
                    }
                })
            }
        }
    },
    computed: {
        nextRegionDesc() {
            let result = ""
            switch (this.currentRegionLevel) {
                case 0:
                    result = "选择省"
                    break;
                case 1:
                    result = "选择市"
                    break;
                case 2:
                    result = "选择区/县"
                    break;
                case 3:
                    result = "选择街道"
                    break;
            }
            return result
        },
        currentRegionList() {
            let result = []
            if (this.areaListObj) {
                result = this.areaListObj.children || []
            }
            return result
        }
    },
    methods: {
        getAreaList(regionCode = 0) {
            let param = {
                "regionCode": regionCode
            }
            nativeService.getAreaList(param).then((data) => {
                this.areaListObj = data
                if (data.self) {
                    this.currentRegionLevel = data.self.level
                } else {
                    this.currentRegionLevel = 0
                }
                this.currentregionCode = regionCode
                const el = this.$refs['area0'][0]
                dom.scrollToElement(el)
            })
        },
        selectItem(item) {
            switch (item.level) {
                case 1:
                    this.areaObj.province = item.regionCode
                    this.areaObj.provinceName = item.regionName
                    break;
                case 2:
                    this.areaObj.city = item.regionCode
                    this.areaObj.cityName = item.regionName
                    break;
                case 3:
                    this.areaObj.county = item.regionCode
                    this.areaObj.countyName = item.regionName
                    break;
                case 4:
                    this.areaObj.street = item.regionCode
                    this.areaObj.streetName = item.regionName
                    break;
            }
            if (item.level < 4) {
                //仍有下级区域
                this.getAreaList(item.regionCode)
            } else {
                this.confirm()
            }
        },
        cancel() {
            this.$emit('oncancel')
        },
        buttonCancel() {
            this.$refs.popup.hide()
            this.$emit('oncancel')
        },
        confirm() {
            this.$emit('onchanged', this.areaObj)
            this.$refs.popup.hide()
        }
    },
    mounted() {
    },
    created() {
    }
}
</script>

<style>
.popup {
  background-color: #f2f2f2;
}
.period-header-bar {
  height: 90px;
  width: 750px;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding-right: 32px;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
}
.period-header-area-wrapper {
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.period-header-area {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #8a8a8f;
  padding-left: 32px;
}
.period-header-area-current {
  font-family: PingFangSC-Medium;
  font-size: 28px;
  color: #000000;
  padding-left: 32px;
}
.period-header-action {
  height: 45px;
  width: 45px;
}
.period-content {
  width: 750px;
  height: 350px;
  flex-direction: row;
  background-color: #ffffff;
}
.period-content-wrapper {
  width: 750px;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.period-content-item-wrapper {
  width: 718px;
  height: 95px;
  margin-left: 32px;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.period-content-item {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  text-align: left;
}
.first-content-item {
  margin-top: 140px;
}
.last-content-item {
  margin-bottom: 140px;
}
.first-visible-item {
  opacity: 0.3;
}
.second-visible-item {
  opacity: 0.6;
}
.second-last-visible-item {
  opacity: 0.6;
}
.first-last-visible-item {
  opacity: 0.3;
}
.selected-item {
  opacity: 1;
  color: #000000;
}
.unselected-item {
  opacity: 0.6;
  color: #000000;
}
.action-bar {
  background-color: #f2f2f2;
}
.action-btn {
  margin-top: 16px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  text-align: center;
  background-color: #ffffff;
  text-align: center;
  padding-top: 22px;
  padding-bottom: 22px;
}
</style>
