<template>
    <midea-popup ref="popup" :show="isShow" @mideaPopupOverlayClicked="cancel" pos="bottom" :height="height">
        <div class="period-header-bar">
            <text class="period-header-action"></text>
            <text class="period-header-text">{{title}}</text>
            <image class="period-header-action" src="./assets/img/progress.png" resize='contain' @click="buttonCancel"></image>
        </div>
        <text v-if="desc" class="period-content-time-desc">{{desc}}</text>
        <div class="period-content">
            <scroller class="period-content-left" @scrollend="scrollEnd">
                <div v-for="(item, index) in dates" :key="index" :ref="'date'+index">
                    <text :style="{'height': itemHeight+'px'}" v-bind:class="['period-content-date',dateIndex==index?'selected-date':'unselected-date']">{{item.desc}}</text>
                </div>
            </scroller>
            <scroller class="period-content-right">
                <div v-for="(item, index) in times" :key="index">
                    <text :style="{'height': itemHeight+'px'}" v-bind:class="['period-content-time',timeIndex==index?'selected-time':'']" @click="selectTime(index)">{{item.desc}}</text>
                </div>
            </scroller>
        </div>
        <div class="action-bar">
            <text class="action-btn" @click="confirm">{{buttonText}}</text>
        </div>
    </midea-popup>
</template>

<script>
import nativeService from '@/common/services/nativeService';

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
        dateIndex: 0,
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
        buttonText: {
            type: String,
            default: "确定"
        },
        times: {
            type: Array,
            default: []
        },
        timeIndex: 0,
        itemHeight: {
            type: Number,
            default: 70
        }
    },
    data() {
        return {
        }
    },
    watch: {
        isShow(value) {
            if (value) {
                this.$nextTick(() => {
                    const el = this.$refs['date' + this.dateIndex]
                    if (el) {
                        dom.scrollToElement(el[0], { offset: -210 })
                    }
                })
            }
        }
    },
    methods: {
        scrollEnd(event) {
            let offsetY = event.contentOffset.y
            if (offsetY % this.itemHeight != 0) {
                let firstVisibleItemIndex = Math.abs(Math.round(offsetY / 70))
                nativeService.toast(firstVisibleItemIndex)
                const el = this.$refs['date0'][0]
                dom.scrollToElement(el, { offset: firstVisibleItemIndex * 70 })
                this.dateIndex = firstVisibleItemIndex + 2
            }
        },
        selectTime(index) {
            this.timeIndex = index
            this.confirm()
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
                dateIndex: this.dateIndex,
                timeIndex: this.timeIndex
            })
            this.$refs.popup.hide()
        }
    },
    mounted() {
    },
    created() {
        if (!this.dateIndex) this.dateIndex = 0
        if (!this.timeIndex) this.timeIndex = 0
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
  height: 60px;
  width: 60px;
  padding-right: 20px;
}
.period-content-time-desc {
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
  height: 363px;
  flex-direction: row;
  background-color: #ffffff;
}
.period-content-left {
  flex: 1;
  align-content: center;
  align-items: center;
}
.period-content-date {
  width: 300px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  text-align: center;
  padding: 8px;
}
.period-content-right {
  flex: 1;
  align-content: center;
  align-items: center;
  padding-bottom: 20px;
}
.period-content-time {
  width: 300px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  text-align: center;
  padding: 20px;
}
.selected-date {
  opacity: 1;
  color: #000000;
}
.unselected-date {
  opacity: 0.6;
  color: #000000;
}
.selected-time {
  background-color: aliceblue;
  color: blue;
}
.action-bar {
  height: 96px;
  align-items: center;
  background-color: #f2f2f2;
}
.action-btn {
  margin-top: 15px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
  background-color: #ffffff;
}
</style>
