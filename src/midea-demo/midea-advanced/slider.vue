<template>
    <div class="wrapper">
        <midea-header title="Slider" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <scroller class="scroller-wrapper">
            <midea-title-bar title="工作温度℃" bgColor="#EEF4F7"></midea-title-bar>
            <div class="slider-sample">
                <text class="slider-sample-range">{{min}}℃</text>
                <midea-slider class="slider-sample-area" @slideEnd="slideEnd" :max="max" :min="min" :value="value" :step="step" :axisH="axisH" :pointH="pointH" :axisColor="axisColor" :axisBgColor="axisColor" :pointColor="pointColor" @tipFormat="tempFormat" :tipTxt="tipTemp"></midea-slider>
                <text class="slider-sample-range slider-sample-range-right">{{max}}℃</text>
            </div>
            <midea-title-bar title="固定高度" bgColor="#EEF4F7"></midea-title-bar>
            <div><text style="text-align: center;">{{fixTemp}}</text></div>
            <div class="slider-sample-fix">
                <text class="slider-sample-range">{{min}}℃ </text>
                <midea-seek-bar class="slider-fix-area" @slideEnd="fixEnd" @slideChange="fixChange" :max="max" :min="min" :value="value" :step="step" :axisH="axisH" :pointH="pointH" :axisBgColor="axisColor" :axisColor="axisColor" :pointColor="pointColor" :showTip=false ></midea-seek-bar>
                <text class="slider-sample-range slider-sample-range-right">{{max}}℃</text>
            </div>

            <midea-title-bar title="工作时长" bgColor="#EEF4F7"></midea-title-bar>
            <div class="slider-sample">
                <midea-slider class="slider-sample-area" @slideEnd="slideEnd" @tipFormat="timeFormat" max="120" min="0" value="84" :step="step" :axisH="axisH" :pointH="pointH" :axisColor="axisColor" :pointColor="pointColor" :tipTxt="tipTime"></midea-slider>
            </div>
            <midea-title-bar title="disable" bgColor="#EEF4F7"></midea-title-bar>
            <div class="slider-sample">
            	<midea-slider class="slider-sample-area" @slideEnd="slideEnd"  max="120" min="0"  :step="step" :axisH="axisH" :pointH="pointH" :axisColor="axisColor" :pointColor="pointColor" :showTip=true :disable=true :tipTxt="tipTime"></midea-slider>
            </div>

            <midea-title-bar title="自定义背景" bgColor="#EEF4F7"></midea-title-bar>

            <div>
                <div class="silder-container">
                    <div class="line-container">
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                    </div>
                    <midea-seek-bar class="slider-fix-area" @slideEnd="slideEnd" :max="7" :min="1" :value="1" :step="1" :axisH="axisH" :pointH="pointH" :axisBgColor="axisColor" :axisColor="axisColor" :pointColor="pointColor" :showTip=false axisAlpha="0" axisBgAlpha="0"></midea-seek-bar>
                </div>
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
  border-color: #5d75f6;
  border-width: 1px;
}
.slider-sample-fix {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 750px;
}
.slider-fix-area {
  flex: 1;
  height: 80px;
  border-color: #5d75f6;
  border-width: 1px;
}
.silder-container {
  position: relative;
  height: 80px;
}
.line-container {
  position: absolute;
  left: 20px;
  height: 80px;
  width: 710px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.line {
  height: 6px;
  margin: 30px 3px;
  flex: 1;
  background-color: #5d75f6;
  border-radius: 2px;
}
.dot {
  height: 6px;
  width: 6px;
  margin: 30px 0;
  background-color: #fff;
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
  border-color: #5d75f6;
  border-width: 1px;
}
.custome-scroller {
  flex: 1;
  height: 40px;
}
.point {
  height: 40px;
  width: 40px;
  border-radius: 40px;
  background-color: #5d75f6;
}
</style>
<script>  
import base from '../base'

import mideaTitleBar from '@/midea-component/title-bar.vue'
import mideaSlider from '@/midea-component/slider.vue'

import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal');
const picker = weex.requireModule('picker');
const dom = weex.requireModule('dom')

export default {
    components: { mideaTitleBar, mideaSlider },
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
            pointColor: '#267AFF', //圆球颜色 
            showTip: false,
            tipTemp: '',
            tipTime: '',
            fixTemp: 210,

            customeSliderWidth: 670,
            customeSliderCount: 4,
            pointIndex: '',
            customeInfo: '12'
        }
    },
    methods: {
        tempFormat(event) {
            this.tipTemp = event.value + '℃';
        },
        timeFormat(event) {
            let minute = parseInt(event.value / 60);
            let seconds = event.value - minute * 60;
            this.tipTime = (minute > 9 ? minute : '0' + minute) + ':' + (seconds > 9 ? seconds : '0' + seconds);
        },
        slideChange(event) {
            nativeService.toast('slideChange:' + event.value);
            return false;
        },
        slideEnd(event) {
            nativeService.toast('slideEnd:' + event.value);
            // nativeService.toast(JSON.stringify(data));
            return false;
        },
        fixEnd(event) {
        	this.fixTemp = event.value;
        },
        fixChange(event) {
        	this.fixTemp = event.value;
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