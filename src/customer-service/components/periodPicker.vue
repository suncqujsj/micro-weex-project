<template>
    <midea-popup ref="popup" :show="isShow" @mideaPopupOverlayClicked="cancel" pos="bottom" :height="height">
        <div class="period-header-bar">
            <text class="period-header-text">{{title}}</text>
        </div>
        <text v-if="desc" class="period-head-desc">{{desc}}</text>
        <div class="period-content">
            <div class="period-content-select-area"></div>
            <scroller class="period-content-wrapper" scroll-direction="vertical" show-scrollbar=false @scroll="scroll" @scrollend="scrollEnd">
                <div class="period-content-item-wrapper" v-for="(item, index) in datesArray" :key="index" :ref="'date'+index">
                    <text v-bind:class="['period-content-item',
                    index==0?'first-content-item':'',
                    index==(datesArray.length-1)?'last-content-item':'',
                    index==dateIndex-2?'first-visible-item':'',
                    index==dateIndex-1?'second-visible-item':'',
                    index==dateIndex?'selected-item':'unselected-item',
                    index==dateIndex+1?'second-last-visible-item':'',
                    index==dateIndex+2?'first-last-visible-item':'']">{{item.desc}}</text>
                </div>
            </scroller>
            <scroller class="period-content-wrapper" scroll-direction="vertical" show-scrollbar=false @scroll="scrollTime" @scrollend="scrollTimeEnd">
                <div class="period-content-time-wrapper" v-for="(item, index) in timesArray" :key="index" :ref="'time'+index">
                    <text v-bind:class="['period-content-item',
                    index==0?'first-content-item':'',
                    index==(timesArray.length-1)?'last-content-item':'',
                    index==timeIndex-2?'first-visible-item':'',
                    index==timeIndex-1?'second-visible-item':'',
                    index==timeIndex?'selected-item':'unselected-item',
                    index==timeIndex+1?'second-last-visible-item':'',
                    index==timeIndex+2?'first-last-visible-item':'']">{{item.desc}}</text>
                </div>
            </scroller>
        </div>
        <div class="action-bar">
            <text class="action-btn action-btn-cancel" @click="buttonCancel">{{cancelButtonText}}</text>
            <div class="action-split"></div>
            <text class="action-btn" @click="confirm">{{buttonText}}</text>
        </div>
    </midea-popup>
</template>

<script>
import nativeService from '../settings/nativeService';

import { MideaPopup } from '@/index'

const dom = weex.requireModule('dom')

export default {
    components: {
        MideaPopup
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        dates: {
            type: Array,
            default: []
        },
        dateIndex: {
            type: Number,
            default: 0
        },
        times: {
            type: Array,
            default: []
        },
        timeIndex: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 610
        },
        title: {
            type: String,
            default: "服务时间"
        },
        desc: {
            type: String,
            default: "具体上门时间以服务商与您沟通约定为准"
        },
        cancelButtonText: {
            type: String,
            default: "取消"
        },
        buttonText: {
            type: String,
            default: "确定"
        }
    },
    data() {
        return {
            itemHeight: 72
        }
    },
    watch: {
        isShow(value) {
            if (value) {
                this.$nextTick(() => {
                    this.refreshDate()
                    if (!this.dateIndex || this.dateIndex < 0) this.dateIndex = 0
                    const dateEl = this.$refs['date0'][0]
                    dom.scrollToElement(dateEl, { offset: this.dateIndex * this.itemHeight })
                    this.refreshTime()
                    const timeEl = this.$refs['time0'][0]
                    dom.scrollToElement(timeEl, { offset: this.timeIndex * this.itemHeight })
                })
            }
        }
    },
    computed: {
        datesArray() {
            return this.dates.filter((date) => {
                return date.disable != true
            })
        },
        timesArray() {
            return this.times.filter((time) => {
                return time.disable != true
            })
        }
    },
    methods: {
        scroll(event) {
            let offsetY = event.contentOffset.y
            if (offsetY % this.itemHeight != 0) {
                let firstVisibleItemIndex = Math.abs(Math.round(offsetY / this.itemHeight))
                this.dateIndex = firstVisibleItemIndex
            }
        },
        scrollEnd(event) {
            const el = this.$refs['date0'][0]
            dom.scrollToElement(el, { offset: this.dateIndex * this.itemHeight })
            this.refreshTime()
        },
        scrollTime(event) {
            let offsetY = event.contentOffset.y
            if (offsetY % this.itemHeight != 0) {
                let firstVisibleItemIndex = Math.abs(Math.round(offsetY / this.itemHeight))
                this.timeIndex = firstVisibleItemIndex
            }
        },
        scrollTimeEnd(event) {
            const el = this.$refs['time0'][0]
            dom.scrollToElement(el, { offset: this.timeIndex * this.itemHeight })
        },
        refreshDate() {
            if (this.dates) {
                let now = new Date()
                if (now.getHours() >= 18) {
                    this.dates[0].disable = true
                }
            }
        },
        refreshTime() {
            if (this.times) {
                if (this.dateIndex == 0) {
                    let now = new Date()
                    if (now.getHours() >= 18) {
                        this.times[0].disable = true
                        this.times[1].disable = true
                        this.times[2].disable = true
                        this.times[3].disable = true
                        this.times[4].disable = true
                    } else if (now.getHours() >= 16) {
                        this.times[0].disable = true
                        this.times[1].disable = true
                        this.times[2].disable = true
                        this.times[3].disable = true
                    } else if (now.getHours() >= 14) {
                        this.times[0].disable = true
                        this.times[1].disable = true
                        this.times[2].disable = true
                    } else if (now.getHours() >= 12) {
                        this.times[0].disable = true
                        this.times[1].disable = true
                    } else if (now.getHours() >= 10) {
                        this.times[0].disable = true
                    }
                } else {
                    this.times[0].disable = false
                    this.times[1].disable = false
                    this.times[2].disable = false
                    this.times[3].disable = false
                    this.times[4].disable = false
                }
            }
            if (!this.timeIndex || this.timeIndex < 0 || this.timeIndex >= this.timesArray.length) this.timeIndex = 0
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
                dateIndex: this.datesArray[this.dateIndex].index,
                timeIndex: this.timesArray[this.timeIndex].index,
            })
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
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
.period-header-text {
  font-family: PingFangSC-Regular;
  font-size: 36px;
  color: #000000;
  background-color: #ffffff;
}
.period-head-desc {
  width: 750px;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #8a8a8f;
  border-bottom-color: #e5e5e8;
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
  /* width: 375px; */
  flex: 1;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.period-content-item-wrapper {
  flex: 1;
  /* padding-left: 54px; */
}
.period-content-time-wrapper {
  flex: 1;
  /* padding-right: 54px; */
}
.period-content-item {
  /* width: 300px; */
  flex: 1;
  height: 72px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  text-align: right;
  padding: 8px;
}
.period-content-time {
  text-align: left;
}
.first-content-item {
  margin-top: 144px;
}
.last-content-item {
  margin-bottom: 144px;
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
  border-top-color: #e5e5e8;
  border-top-width: 1px;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
}
.action-bar {
  background-color: #f2f2f2;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.action-btn {
  flex: 1;
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
.action-split {
  background-color: #e5e5e8;
  width: 2px;
}
</style>
