<template>
    <div class="wrapper">
        <midea-header title="Slider" :isImmersion="isImmersion" @leftImgClick="back"></midea-header>

        <midea-title-bar title="工作温度℃" bgColor="#EEF4F7"></midea-title-bar>
        <div class="slider-sample">
            <text class="slider-sample-range">{{min}}℃</text>
            <midea-slider class="slider-sample-area" @slideEnd="slideEnd" :max="max" :min="min" :value="value" :step="step" :axisH="axisH" :pointH="pointH" :axisColor="axisColor" :pointColor="pointColor" @tipFormat="tempFormat" :tipTxt="tipTemp"></midea-slider>
            <text class="slider-sample-range slider-sample-range-right">{{max}}℃</text>
        </div>
        <div class="slider-sample">
            <text class="slider-sample-range">{{min}}℃</text>
            <midea-slider class="slider-sample-area" @slideEnd="slideEnd" :max="max" :min="min" :value="value" :step="step" :axisH="axisH" :pointH="pointH" :axisBgColor="axisColor" :axisColor="axisColor" :pointColor="pointColor"></midea-slider>
            <text class="slider-sample-range slider-sample-range-right">{{max}}℃</text>
        </div>

        <midea-title-bar title="工作时长" bgColor="#EEF4F7"></midea-title-bar>
        <div style="height:380px;">
            <midea-slider @slideEnd="slideEnd" @tipFormat="timeFormat" max="120" min="0" value="84" :step="step" :axisH="axisH" :pointH="pointH" :axisColor="axisColor" :pointColor="pointColor" :tipTxt="tipTime"></midea-slider>
        </div>

        <!--
   <midea-title-bar title="跟随变化" bgColor="#EEF4F7"></midea-title-bar>
   <div style="height:200px;">
   <midea-slider @slideEnd="slideEnd" :showTip="true" max="100" min="0" value="60" unit="度" :step="10"
   ></midea-slider>
 -->

        <midea-title-bar title="自定义背景" bgColor="#EEF4F7"></midea-title-bar>
        <div class="silder-container">
            <div class="line-container">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <midea-slider @slideEnd="slideEnd" :max="7" :min="1" :value="1" :step="1" :axisH="0" :pointH="26" :axisColor="axisColor" pointColor="#EEF4F7" showTip="false"></midea-slider>
        </div>

    </div>
</template>
<style scoped>
.slider-sample {
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 750px;
  padding-bottom: 20px;
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
  padding-bottom: 13px;
}
.silder-container {
  position: relative;
  height: 52px;
  margin-top: 50px;
  padding-top: 25px;
}
.line-container {
  position: absolute;
  top: 24px;
  left: 20px;
  height: 6px;
  width: 710px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-color: #5d75f6;
  border-width: 1px;
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
</style>
<script>  
import base from '../base'

import mideaTitleBar from '@/midea-component/title-bar.vue'
import mideaSlider from '@/midea-component/slider.vue'

import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal');
const picker = weex.requireModule('picker');

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
            tipTime: ''
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
        }
    },
    created() {
        //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
};
</script>