<template>
    <div class="wrapper">
        <midea-header title="Slider" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <scroller class="scroller-wrapper">
            <midea-title-bar title="固定高度" bgColor="#EEF4F7"></midea-title-bar>
            <div><text class="tip-txt">{{fixTemp1}}℃</text></div>
            <div class="slider-sample-fix">
                <text class="slider-sample-range">{{min}}℃ </text>
                <midea-seek-bar class="slider-fix-area" @slideEnd="slideEnd" @slideChange="slideChange1" :max="max" :min="min" :value="value" :step="step" :axisH="axisH" :pointH="pointH" :axisColor="axisColor" :axisBgColor="axisBgColor" :pointColor="pointColor" showTip=false :sliderImage="sliderImageBase64"></midea-seek-bar>
                <text class="slider-sample-range slider-sample-range-right">{{max}}℃</text>
            </div>
            <!-- <midea-title-bar title="测试" bgColor="#EEF4F7"></midea-title-bar>
            <div :style="{ 'flex-direction': 'row', 'justify-content': 'center', 'align-items': 'center', width: '750px', 'margin-top': '20px', 'margin-bottom': '20px'}">
                <text :style="{  width: '80px', 'font-size': '28px', color: '#888888', 'text-align': 'right'}">-20℃ </text>
                <midea-seek-bar :style="{ flex: 1, height: '48px'}" @slideEnd="slideEnd" @slideChange="slideChange1" :max="30" :min="-20" :value="20" :step="1" :axisH="3" :pointH="20" axisColor="#E9EDFF" axisBgColor="#5D75F6" pointColor="#DEDEDE" showTip=false></midea-seek-bar>
                <text :style="{  width: '80px', 'font-size': '28px', color: '#888888', 'text-align': 'left'}">30℃</text>
            </div> -->

            <midea-title-bar title="Disable禁止滑动" bgColor="#EEF4F7"></midea-title-bar>
            <div><text class="tip-txt">{{fixTemp2}}℃</text></div>
            <div class="slider-sample-fix">
                <text class="slider-sample-range">{{min}}℃ </text>
                <midea-seek-bar class="slider-fix-area" @slideEnd="slideEnd" @slideChange="slideChange2" :max="max" :min="min" :value="value" :step="step" :axisH="axisH" :pointH="pointH" :axisColor="axisColor" :axisBgColor="axisBgColor" :pointColor="pointColor" showTip=false :sliderImage="sliderImageBase64" :disable="true"></midea-seek-bar>
                <text class="slider-sample-range slider-sample-range-right">{{max}}℃</text>
            </div>

            <midea-title-bar title="自定义滑动圆球图片" bgColor="#EEF4F7"></midea-title-bar>
            <div><text class="tip-txt">{{fixTemp3}}℃</text></div>
            <div class="slider-sample-fix">
                <text class="slider-sample-range">{{min}}℃ </text>
                <midea-seek-bar class="slider-fix-area" @slideEnd="slideEnd" @slideChange="slideChange3" :max="max" :min="min" :value="value" :step="step" :axisH="axisH" :pointH="pointH" :axisColor="axisColor" :axisBgColor="axisBgColor" :pointColor="pointColor" showTip=false :sliderImage="sliderImageBase64"></midea-seek-bar>
                <text class="slider-sample-range slider-sample-range-right">{{max}}℃</text>
            </div>

            <midea-title-bar title="自定义背景" bgColor="#EEF4F7"></midea-title-bar>
            <div><text class="tip-txt">{{fixTemp4}}档</text></div>
            <div class="slider-sample-fix">
                <text class="slider-sample-range">1档 </text>
                <div class="silder-container">
                    <div class="line-container">
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                    </div>
                    <midea-seek-bar class="slider-fix-area" @slideEnd="slideEnd" @slideChange="slideChange4" :max="7" :min="1" :value="1" :step="1" :axisH="axisH" :pointH="pointH" :axisBgColor="axisColor" :axisColor="axisColor" :pointColor="pointColor" showTip=false :sliderImage="sliderImageBase64" axisAlpha="0" axisBgAlpha="0"></midea-seek-bar>
                </div>
                <text class="slider-sample-range slider-sample-range-right">7档</text>
            </div>

            <midea-title-bar title="时间Tip显示" bgColor="#EEF4F7"></midea-title-bar>
            <div><text class="tip-txt">{{fixTemp5}}</text></div>
            <div class="slider-sample-fix">
                <midea-seek-bar class="slider-fix-area" @slideEnd="slideEnd" @slideChange="slideChange5" max="120" min="0" :value="84" :step="step" :axisH="axisH" :pointH="pointH" :axisColor="axisColor" :axisBgColor="axisBgColor" :pointColor="pointColor" showTip=false :sliderImage="sliderImageBase64"></midea-seek-bar>
            </div>

            <midea-title-bar :title="'weex模拟组件:'+pointIndex" bgColor="#EEF4F7"></midea-title-bar>
            <div class="custome-wrapper">
                <div class="custome-container" :style="{'width':(customeSliderWidth+40)+'px'}">
                    <div class="custome-line-container" :style="{'width':(customeSliderWidth+20)+'px'}">
                        <div v-for="(item,index) in customeSliderCount" class="line" :key="index"></div>
                    </div>
                    <scroller class="custome-scroller" scroll-direction="horizontal" show-scrollbar="false" @scroll="scroll" @scrollend="scrollEnd">
                        <div :ref="'customeScroller'" class="point-wrapper" :style="{'width':(2*customeSliderWidth+40)+'px'}">
                            <div class="point" :style="{'margin-left':customeSliderWidth+'px'}"></div>
                        </div>
                    </scroller>
                </div>
            </div>
        </scroller>
    </div>
</template>
<style scoped>
.wrapper {
  flex: 1;
}
.scroller-wrapper {
  padding-bottom: 50px;
}
.slider-sample {
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 750px;
}
.slider-sample-range {
  width: 60px;
  font-size: 28px;
  color: #888888;
  text-align: right;
}
.slider-sample-range-right {
  width: 90px;
  text-align: left;
}
.slider-sample-area {
  flex: 1;
}
.slider-sample-fix {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 750px;
  margin-bottom: 20px;
}
.slider-fix-area {
  flex: 1;
  height: 64px;
}
.tip-txt {
  text-align: center;
  color: #267aff;
  font-size: 46px;
}
.silder-container {
  flex: 1;
  margin-left: 8px;
  margin-right: 8px;
  height: 64px;
  width: 550px;
}
.line-container {
  position: absolute;
  left: 20px;
  height: 64px;
  width: 550px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.line {
  height: 6px;
  margin: 30px 3px;
  flex: 1;
  background-color: #267aff;
  border-radius: 2px;
}
.dot {
  height: 6px;
  width: 6px;
  margin: 30px 0;
  background-color: #ffffff;
  flex: 0.1;
}
.custome-wrapper {
  justify-content: center;
  align-items: center;
}
.custome-container {
  position: relative;
  padding-top: 25px;
  padding-bottom: 25px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
}
.custome-line-container {
  position: absolute;
  top: 40px;
  left: 20px;
  height: 6px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.custome-scroller {
  flex: 1;
  height: 40px;
}
.point {
  height: 40px;
  width: 40px;
  border-radius: 40px;
  background-color: #267aff;
  
}
</style>
<script>  
import base from '../base'

import mideaTitleBar from '@/midea-component/title-bar.vue'

import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal');
const picker = weex.requireModule('picker');
const dom = weex.requireModule('dom')

export default {
    components: { mideaTitleBar },
    mixins: [base],
    data() {
        return {
            max: 300, //最大值
            min: 0, //最小值
            value: 210, //初始化值
            step: 5, //步长
            axisH: 4, //轴高度(px)
            pointH: 26, //圆球高度（px）
            axisColor: '#DFE5E7',//滑条颜色
            axisBgColor: '#267aff', //滑条背景颜色 
            pointColor: '#267aff', //圆球颜色 
            sliderImageBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM1RjM3MjhFQzc3RDExRThCMjcwOTQyNjcxNTJERDEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM1RjM3MjhGQzc3RDExRThCMjcwOTQyNjcxNTJERDEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzVGMzcyOENDNzdEMTFFOEIyNzA5NDI2NzE1MkREMTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzVGMzcyOERDNzdEMTFFOEIyNzA5NDI2NzE1MkREMTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4uKMdnAAAMaUlEQVR42pRbX6il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",
            showTip: false,
            tipTemp: '',
            fixTemp1: 210,
            fixTemp2: 210,
            fixTemp3: 210,
            fixTemp4: 1,
            fixTemp5: '00:00',

            customeSliderWidth: 670,
            customeSliderCount: 4,
            pointIndex: '',
            customeInfo: '12'
        }
    },
    methods: {
        slideChange1(event) {
            this.fixTemp1 = event.value;
        },
        slideChange2(event) {
            this.fixTemp2 = event.value;
        },
        slideChange3(event) {
            this.fixTemp3 = event.value;
        },
        slideChange4(event) {
            this.fixTemp4 = event.value;
        },
        slideChange5(event) {
            let minute = parseInt(event.value / 60);
            let seconds = event.value - minute * 60;
            this.fixTemp5 = (minute > 9 ? minute : '0' + minute) + ':' + (seconds > 9 ? seconds : '0' + seconds);
        },
        slideEnd(event) {
            nativeService.toast('slideEnd:' + event.value);
            return false;
        },
        customeScrolTo(int) {
            let targetIndex = this.customeSliderCount - int
            let pointGap = this.customeSliderWidth / this.customeSliderCount
            const el = this.$refs['customeScroller']
            dom.scrollToElement(el, { offset: targetIndex * pointGap, animated: false })
        },
        scroll(event) {
            let pointGap = this.customeSliderWidth / this.customeSliderCount
            let offsetX = event.contentOffset.x
            if (offsetX > 0) return false
            if (offsetX % pointGap != 0) {
                let tempIndex = Math.abs(Math.round(offsetX / pointGap))
                this.pointIndex = this.customeSliderCount - tempIndex
            }
            let offsetY = event.contentOffset.y;
            this.customeInfo = " offsetX:" + offsetX + " offsetY:" + offsetY;
        },
        scrollEnd(event) {
            this.customeScrolTo(this.pointIndex)
            nativeService.toast('slideEnd:' + this.pointIndex);
        },
    },
    mounted() {
        this.customeScrolTo(1)
    },
    created() {
        //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
};
</script>