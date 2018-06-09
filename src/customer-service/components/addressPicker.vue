<template>
    <midea-popup ref="popup" :show="isShow" @mideaPopupOverlayClicked="cancel" pos="bottom" :height="height">
        <div class="period-header-bar">
            <text class="period-header-action"></text>
            <image class="period-header-action" src="./assets/img/service_ic_cancel@3x.png" resize='contain' @click="buttonCancel"></image>
        </div>
        <div class="period-content">
            <div class="period-content-select-area"></div>
            <scroller class="period-content-wrapper" show-scrollbar=false @scroll="scroll" @scrollend="scrollEnd">
                <midea-item v-for="(item, index) in areaListObj[currentregionCode]" :key="index" height="96" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectItem(item)">
                    <text slot="title" class="address-item-title">{{item.regionDesc}}</text>
                </midea-item>
            </scroller>
        </div>
    </midea-popup>
</template>

<script>
import nativeService from '@/common/services/nativeService';

import { MideaPopup, MideaItem } from '@/index'

const dom = weex.requireModule('dom')

export default {
    components: {
        MideaPopup,
        MideaItem
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
            areaListObj: {},
            currentregionCode: '0'
        }
    },
    watch: {
        isShow(value) {
            if (value) {
                this.$nextTick(() => {

                })
            }
        }
    },
    computed: {

    },
    methods: {
        scroll(event) {
            let offsetY = event.contentOffset.y
            if (offsetY % this.itemHeight != 0) {
                let firstVisibleItemIndex = Math.abs(Math.round(offsetY / 70))
                this.dateIndex = firstVisibleItemIndex
            }
        },
        scrollEnd(event) {
            const el = this.$refs['date0'][0]
            dom.scrollToElement(el, { offset: this.dateIndex * 70 })
            this.refreshTime()
        },
        getAreaList(regionCode) {
            let param = {}
            if (regionCode) {
                param.regionCode = regionCode
            }
            this.currentregionCode = regionCode || '0'
            nativeService.getAreaList(param).then((data) => {
                this.areaListObj[this.currentregionCode] = data
            })
        },
        selectItem(item) {
            if (item.regionLevel == 3) {

            } else {
                this.getAreaList(regionCode)
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
            this.$emit('onchanged', {

            })
            this.$refs.popup.hide()
        }
    },
    mounted() {
    },
    created() {
        this.getAreaList()
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
}
.period-header-text {
  font-family: PingFangSC-Regular;
  font-size: 36px;
  color: #000000;
  background-color: #ffffff;
}
.period-header-action {
  height: 45px;
  width: 45px;
  margin-right: 24px;
}
.period-head-desc {
  width: 750px;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #8a8a8f;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
  padding-bottom: 24px;
}
.period-content {
  width: 750px;
  height: 350px;
  flex-direction: row;
  background-color: #ffffff;
}
.period-content-wrapper {
  flex: 1;
  align-content: center;
  align-items: center;
}
.period-content-item {
  width: 300px;
  height: 70px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  text-align: center;
  padding: 8px;
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
.period-content-select-area {
  position: absolute;
  top: 136px;
  left: 0px;
  width: 750px;
  height: 72px;
  padding-left: 120px;
  padding-right: 120px;
  border-top-color: #e2e2e2;
  border-top-width: 1px;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
  /* background-color: aquamarine; */
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
