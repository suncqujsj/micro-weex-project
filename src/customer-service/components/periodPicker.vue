<template>
    <midea-popup ref="popup" :show="isShow" @mideaPopupOverlayClicked="cancel" pos="bottom" height="700">
        <div class="period-header-bar">
            <text class="period-header-action"></text>
            <text class="period-header-text">服务时间</text>
            <image class="period-header-action" src="./assets/img/progress.png" resize='contain' @click="buttonCancel"></image>
        </div>
        <div class="period-content">
            <scroller class="period-content-left">
                <div v-for="(item, index) in dates" :key="index" :ref="'date'+index">
                    <text v-bind:class="['period-content-date',dateIndex==index?'selected-date':'']" @click="selectDate(index)">{{item.desc}}</text>
                </div>
            </scroller>
            <scroller class="period-content-right">
                <text class="period-content-time-desc">具体上门时间以服务商与您沟通约定为准</text>
                <div v-for="(item, index) in times" :key="index">
                    <text v-bind:class="['period-content-time',timeIndex==index?'selected-time':'']" @click="selectTime(index)">{{item.desc}}</text>
                </div>
            </scroller>
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

        times: {
            type: Array,
            default: []
        },
        timeIndex: 0
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
                        dom.scrollToElement(el[0], { offset: -240 })
                    }
                })
            }
        }
    },
    methods: {
        selectDate(index) {
            if (index != this.dateIndex) {
                this.dateIndex = index
                this.timeIndex = null
            }
        },
        selectTime(index) {
            this.timeIndex = index
            this.submit()
        },
        cancel() {
            this.$emit('oncancel')
        },
        buttonCancel() {
            this.$refs.popup.hide()
            this.$emit('oncancel')
        },
        submit() {
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
  height: 60px;
  width: 60px;
  padding-right: 20px;
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
  padding-top: 20px;
}
.period-content-date {
  height: 80px;
  width: 300px;
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
  text-align: left;
  font-size: 28px;
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
  border-color: #e2e2e2;
  border-width: 1px;
}
.selected-date {
  border-color: #e2e2e2;
  border-width: 1px;
  color: blue;
}
.selected-time {
  background-color: aliceblue;
  color: blue;
}
</style>
