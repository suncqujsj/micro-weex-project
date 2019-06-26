<template>
  <div class="wrapper">
    <midea-header
      :bg-color="isScroll ? '#ffffff' : '#07c160'"
      :title-text="isScroll ? '#000000' : '#ffffff'"
      title="记录统计"
      @leftImgClick="back"
      :showRightImg="true"
      :leftImg="leftImg"
      rightImg="../assets/img/smart_ic_reline@3x.png"
      @rightImgClick="reload">
    </midea-header>
    <list class="list" @scroll="onScroll" :show-scrollbar="false">
      <cell class="main-cell">
        <div class="cell-header">
          <text class="test-time">测量时间:  今天 ({{time}})</text>
          <div class="weight-wrapper">
            <div class="weight-wrapper-item">
              <div class="weight-item-left">
                <div class="weight-item-main">
                  <text class="weight-txt">100</text>
                  <text class="weight-unit">斤</text>
                </div>

                <text class="weight-desc">当前体重</text>
              </div>

              <div class="border-r"></div>
            </div>
            <div class="weight-wrapper-item">
              <div class="weight-item-left">
                <div class="weight-item-main">
                  <text class="weight-txt">4</text>
                  <text class="weight-unit">斤</text>
                </div>

                <text class="weight-desc">本月减少体重</text>
              </div>

              <div class="border-r"></div>
            </div>
            <div class="weight-wrapper-item">
              <div class="weight-item-left">
                <div class="weight-item-main">
                  <text class="weight-txt">6</text>
                  <text class="weight-unit">斤</text>
                </div>

                <text class="weight-desc">本月目标减重</text>
              </div>
            </div>
          </div>
        </div>

          <midea-tab ref="mTab" :tabArray="tabData" @tabClicked="tabClicked">
          </midea-tab>
          <slider
            :index="index"
            @change="changeAreaA"
            class="slider"
            :infinite="false"
            :scrollable="true"
            :auto-play="false">
            <div class="slider-item">
              <midea-linechart-view class="linechart" :data="chartJson"></midea-linechart-view>

              <div class="flow-list">
                <text class="flow-title">{{flowTitle}}</text>
                <div class="flow-list-item">
                  <div class="flow-item-left">
                    <text class="flow-time">22:31:06</text>
                    <text class="flow-time">22:02:08</text>
                    <text class="flow-time">20:30:08</text>
                  </div>
                  <div class="flow-item-center">
                    <div class="circle-line">
                      <div class="flow-circle"></div>
                      <div class="flow-line"></div>
                    </div>

                    <div class="circle-line">
                      <div class="flow-circle"></div>
                      <div class="flow-line"></div>
                    </div>

                    <div class="circle-line">
                      <div class="flow-circle"></div>
                      <div class="flow-line"></div>
                    </div>
                  </div>
                  <div class="flow-item-right">
                    <div class="flow-r-item">
                      <div class="flow-r-title">
                        <text class="r-title-txt">基础消耗 1405 身体年龄 28 隐藏肥胖</text>
                      </div>

                      <div class="flow-r-weight">
                        <text class="r-weight-txt">体重 58.8kg</text>
                      </div>

                      <div class="flow-r-list">
                        <text class="r-list-txt">BMI 21.1</text>
                        <text class="r-list-txt">体脂 27.9</text>
                        <text class="r-list-txt">内脏脂肪 4</text>
                        <text class="r-list-txt">皮下脂肪 26.1</text>
                        <text class="r-list-txt">肌肉 67.1</text>
                        <text class="r-list-txt">骨骼肌 46.9</text>
                        <text class="r-list-txt">骨骼 4.1</text>
                        <text class="r-list-txt">蛋白质 18.8</text>
                      </div>
                    </div>

                    <div class="flow-r-item">
                      <div class="flow-r-title">
                        <text class="r-title-txt">基础消耗 1405 身体年龄 28 隐藏肥胖</text>
                      </div>

                      <div class="flow-r-weight">
                        <text class="r-weight-txt">体重 58.8kg</text>
                      </div>

                      <div class="flow-r-list">
                        <text class="r-list-txt">BMI 21.1</text>
                        <text class="r-list-txt">体脂 27.9</text>
                        <text class="r-list-txt">内脏脂肪 4</text>
                        <text class="r-list-txt">皮下脂肪 26.1</text>
                        <text class="r-list-txt">肌肉 67.1</text>
                        <text class="r-list-txt">骨骼肌 46.9</text>
                        <text class="r-list-txt">骨骼 4.1</text>
                        <text class="r-list-txt">蛋白质 18.8</text>
                      </div>
                    </div>

                    <div class="flow-r-item">
                      <div class="flow-r-title">
                        <text class="r-title-txt">基础消耗 1405 身体年龄 28 隐藏肥胖</text>
                      </div>

                      <div class="flow-r-weight">
                        <text class="r-weight-txt">体重 58.8kg</text>
                      </div>

                      <div class="flow-r-list">
                        <text class="r-list-txt">BMI 21.1</text>
                        <text class="r-list-txt">体脂 27.9</text>
                        <text class="r-list-txt">内脏脂肪 4</text>
                        <text class="r-list-txt">皮下脂肪 26.1</text>
                        <text class="r-list-txt">肌肉 67.1</text>
                        <text class="r-list-txt">骨骼肌 46.9</text>
                        <text class="r-list-txt">骨骼 4.1</text>
                        <text class="r-list-txt">蛋白质 18.8</text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="slider-item">
              <midea-linechart-view class="linechart" :data="chartJson"></midea-linechart-view>

              <div class="flow-list">
                <text class="flow-title">{{flowTitle}}</text>
                <div class="flow-list-item">
                  <div class="flow-item-left">
                    <text class="flow-time">22:31:06</text>
                    <text class="flow-time">22:02:08</text>
                    <text class="flow-time">20:30:08</text>
                  </div>
                  <div class="flow-item-center">
                    <div class="circle-line">
                      <div class="flow-circle"></div>
                      <div class="flow-line"></div>
                    </div>

                    <div class="circle-line">
                      <div class="flow-circle"></div>
                      <div class="flow-line"></div>
                    </div>

                    <div class="circle-line">
                      <div class="flow-circle"></div>
                      <div class="flow-line"></div>
                    </div>
                  </div>
                  <div class="flow-item-right">
                    <div class="flow-r-item">
                      <div class="flow-r-title">
                        <text class="r-title-txt">基础消耗 1405 身体年龄 28 隐藏肥胖</text>
                      </div>

                      <div class="flow-r-weight">
                        <text class="r-weight-txt">体重 58.8kg</text>
                      </div>

                      <div class="flow-r-list">
                        <text class="r-list-txt">BMI 21.1</text>
                        <text class="r-list-txt">体脂 27.9</text>
                        <text class="r-list-txt">内脏脂肪 4</text>
                        <text class="r-list-txt">皮下脂肪 26.1</text>
                        <text class="r-list-txt">肌肉 67.1</text>
                        <text class="r-list-txt">骨骼肌 46.9</text>
                        <text class="r-list-txt">骨骼 4.1</text>
                        <text class="r-list-txt">蛋白质 18.8</text>
                      </div>
                    </div>

                    <div class="flow-r-item">
                      <div class="flow-r-title">
                        <text class="r-title-txt">基础消耗 1405 身体年龄 28 隐藏肥胖</text>
                      </div>

                      <div class="flow-r-weight">
                        <text class="r-weight-txt">体重 58.8kg</text>
                      </div>

                      <div class="flow-r-list">
                        <text class="r-list-txt">BMI 21.1</text>
                        <text class="r-list-txt">体脂 27.9</text>
                        <text class="r-list-txt">内脏脂肪 4</text>
                        <text class="r-list-txt">皮下脂肪 26.1</text>
                        <text class="r-list-txt">肌肉 67.1</text>
                        <text class="r-list-txt">骨骼肌 46.9</text>
                        <text class="r-list-txt">骨骼 4.1</text>
                        <text class="r-list-txt">蛋白质 18.8</text>
                      </div>
                    </div>

                    <div class="flow-r-item">
                      <div class="flow-r-title">
                        <text class="r-title-txt">基础消耗 1405 身体年龄 28 隐藏肥胖</text>
                      </div>

                      <div class="flow-r-weight">
                        <text class="r-weight-txt">体重 58.8kg</text>
                      </div>

                      <div class="flow-r-list">
                        <text class="r-list-txt">BMI 21.1</text>
                        <text class="r-list-txt">体脂 27.9</text>
                        <text class="r-list-txt">内脏脂肪 4</text>
                        <text class="r-list-txt">皮下脂肪 26.1</text>
                        <text class="r-list-txt">肌肉 67.1</text>
                        <text class="r-list-txt">骨骼肌 46.9</text>
                        <text class="r-list-txt">骨骼 4.1</text>
                        <text class="r-list-txt">蛋白质 18.8</text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="slider-item">
              <midea-linechart-view class="linechart" :data="chartJson"></midea-linechart-view>

              <div class="flow-list">
                <text class="flow-title">{{flowTitle}}</text>
                <div class="flow-list-item">
                  <div class="flow-item-left">
                    <text class="flow-time">22:31:06</text>
                    <text class="flow-time">22:02:08</text>
                    <text class="flow-time">20:30:08</text>
                  </div>
                  <div class="flow-item-center">
                    <div class="circle-line">
                      <div class="flow-circle"></div>
                      <div class="flow-line"></div>
                    </div>

                    <div class="circle-line">
                      <div class="flow-circle"></div>
                      <div class="flow-line"></div>
                    </div>

                    <div class="circle-line">
                      <div class="flow-circle"></div>
                      <div class="flow-line"></div>
                    </div>
                  </div>
                  <div class="flow-item-right">
                    <div class="flow-r-item">
                      <div class="flow-r-title">
                        <text class="r-title-txt">基础消耗 1405 身体年龄 28 隐藏肥胖</text>
                      </div>

                      <div class="flow-r-weight">
                        <text class="r-weight-txt">体重 58.8kg</text>
                      </div>

                      <div class="flow-r-list">
                        <text class="r-list-txt">BMI 21.1</text>
                        <text class="r-list-txt">体脂 27.9</text>
                        <text class="r-list-txt">内脏脂肪 4</text>
                        <text class="r-list-txt">皮下脂肪 26.1</text>
                        <text class="r-list-txt">肌肉 67.1</text>
                        <text class="r-list-txt">骨骼肌 46.9</text>
                        <text class="r-list-txt">骨骼 4.1</text>
                        <text class="r-list-txt">蛋白质 18.8</text>
                      </div>
                    </div>

                    <div class="flow-r-item">
                      <div class="flow-r-title">
                        <text class="r-title-txt">基础消耗 1405 身体年龄 28 隐藏肥胖</text>
                      </div>

                      <div class="flow-r-weight">
                        <text class="r-weight-txt">体重 58.8kg</text>
                      </div>

                      <div class="flow-r-list">
                        <text class="r-list-txt">BMI 21.1</text>
                        <text class="r-list-txt">体脂 27.9</text>
                        <text class="r-list-txt">内脏脂肪 4</text>
                        <text class="r-list-txt">皮下脂肪 26.1</text>
                        <text class="r-list-txt">肌肉 67.1</text>
                        <text class="r-list-txt">骨骼肌 46.9</text>
                        <text class="r-list-txt">骨骼 4.1</text>
                        <text class="r-list-txt">蛋白质 18.8</text>
                      </div>
                    </div>

                    <div class="flow-r-item">
                      <div class="flow-r-title">
                        <text class="r-title-txt">基础消耗 1405 身体年龄 28 隐藏肥胖</text>
                      </div>

                      <div class="flow-r-weight">
                        <text class="r-weight-txt">体重 58.8kg</text>
                      </div>

                      <div class="flow-r-list">
                        <text class="r-list-txt">BMI 21.1</text>
                        <text class="r-list-txt">体脂 27.9</text>
                        <text class="r-list-txt">内脏脂肪 4</text>
                        <text class="r-list-txt">皮下脂肪 26.1</text>
                        <text class="r-list-txt">肌肉 67.1</text>
                        <text class="r-list-txt">骨骼肌 46.9</text>
                        <text class="r-list-txt">骨骼 4.1</text>
                        <text class="r-list-txt">蛋白质 18.8</text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </slider>
      </cell>
    </list>
  </div>
</template>

<script>
import base from '../base';
import mideaTab from '@/midea-component/mTab.vue';
import nativeService from '../../common/services/nativeService';

export default {
  mixins: [base],
  components: {
    mideaTab
  },
  data() {
    return {
      isScroll: false,
      time: '2019.05.20 20:30',
      chartJson: {
        "x": {
            "value": [1, 2, 3, 4, 5, 6, 7],
            "label": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },

        "y": [
          {
            "value": [18, 38, 36, 36, 58, 58, 40],
            "title": "实际体重",
            "color": "#07c160", //折线颜色
            "starcolor": "#ffffff", //区域背景渐变开始颜色（从下自上）
            "endcolor": "#07c160", //区域背景渐变结束颜色（从下自上）
            "smooth":1,  //0直线，1平滑
            "lineSidesPointAble" : true,  //首尾可以设置是否有端点,默认false
            "lineSidesPointRadius" : 4,   //端点大小，端点的半径值大小，lineSidesPointAble为ture有效
            "lineSidesPointColor" : "#07c160", //端点颜色，lineSidesPointAble为ture有效
          },
          {
            "value": [58, 58, 58, 58, 58, 58, 58],
            "title": "目标体重",
            "color": "#e6a23c", //折线颜色
            // "starcolor": "#ffffff", //区域背景渐变开始颜色（从下自上）
            // "endcolor": "#e6a23c", //区域背景渐变结束颜色（从下自上）
            "smooth":1,  //0直线，1平滑
            "lineDashAble" : true, //曲线的类型可调: 是否使用虚线，默认false
          }
        ],
        "xAxisColor":"#e5e5e8", //x轴线的颜色，如果不设置，则默认是黑色线
        "xAxisLabelColor":"#666666", //x label的字体颜色，如果不设置，则默认是黑色字体颜色
        "yAxisColor":"#e5e5e8", //y轴线的颜色，如果不设置，则默认是黑色线
        "yAxisLabelColor":"#666666", // label的字体颜色，如果不设置，则默认是黑色字体颜色
        "background": "#ffffff", //不传，则默认使用透明背景
 
 
        "xAxisGridColor" : "#123456", //x轴上分割线颜色
        "xAxisGridAlpha": 0.5,  //x轴上分割线透明度
        "granularity" : 1, //间距本身是自适应的，可以使用该值进行调整间距的比例，比如自适应间距是20px，granularity设置为2的时候，界面显示的间距为 40px
              
        "yAxisLabelShow" : true, //是否只显示最大最小值，true: 显示y轴值；false: 不显示y轴值；默认true
             
                 
        "description": "",
        "legend": {
          "position": "TOP_LEFT", //"TOP_LEFT"/"TOP_RIGHT"
          "orientation": "HORIZONTAL" //"HORIZONTAL"/"BOTTOM_RIGHT"
        },
        "legendHide" : false, //是否需要隐藏legend，默认不隐藏
        "unit": {
          // "x": "日期",
          // "y": "次数"
        }
      },
      tabData: [
        { "name": "7天", "selected": true },
        { "name": "1个月", "selected": false },
        { "name": "1年", "selected": false }
      ],
      index: 0,
      scrollTop: 0,
      flowTitle: '2019年3月06日 周日'
    }
  },

  computed: {
    leftImg() {
      const {isScroll} = this;
      return isScroll ? './img/header/public_ic_back@3x.png' : './img/header/ic_back@3x.png';
    }
  },

  methods: {
    tabClicked(tabIndex) {
      this.index = tabIndex;
    },

    changeAreaA(sliObj) {
      var sliderIndex = sliObj.index;
      this.$refs.mTab.tabClicked(sliderIndex);
    },

    onScroll(event) {
      this.scrollTop = Math.abs(event.contentOffset.y);
      if (this.scrollTop >= 330) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    }
  }
}
</script>

<style scoped>
   .wrapper {
     background-color: #ffffff;
   }
  .cell-header {
    justify-content: center;
    align-items: center;
    width: 750px;
    background-color: #07c160;
  }

  .test-time {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #ffffff;
    opacity: 0.5;
  }
  .weight-wrapper {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 70px;
    padding-bottom: 60px;
    width: 750px;
  }

  .weight-wrapper-item {
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  
  .weight-item-left {
    justify-content: center;
    align-items: center;
  }

  .border-r {
    height: 84px;
    border-right-width: 2px;
    border-right-color: rgba(255, 255, 255, 0.3);
  }
  .weight-item-main {
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
  }
  
  .weight-txt {
    font-family: PingFangSC-Regular;
    font-size: 100px;
    color: #ffffff;
  }

  .weight-unit {
    padding-left: 10px;
    padding-bottom: 22px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #ffffff;
    opacity: 0.5;
  }

  .weight-desc {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #ffffff;
    opacity: 0.5;
  }
  
  .slider {
    border-top-width: 2px;
    border-top-color: #e5e5e8;
  }

  .slider-item {
    padding-left: 32px;
    padding-right: 32px;
    width: 750px;
  }
  .linechart {
    width: 686px;
    height: 400px;
  }

  .flow-list {
    margin-top: 50px;
    padding-left: 32px;
    padding-right: 32px;
    width: 686px;
    background-color: #f2f2f2;
    border-radius: 20px;
  }

  .flow-title {
    padding-top: 48px;
    padding-bottom: 48px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #363636;
  }

  .flow-list-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .flow-time {
    padding-top: 16px;
    height: 486px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #666666;
  }

  .flow-item-center {
    padding-top: 21px;
    justify-content: center;
    align-items: center;
  }

  .circle-line {
    justify-content: center;
    align-items: center;
  }

  .flow-circle {
    width: 18px;
    height: 18px;
    background-color: #666666;
    border-radius: 18px;
  }

  .flow-line {
    width: 2px;
    height: 468px;
    background-color: #999999;
  }
   
  .flow-item-right {
    justify-content: flex-start;
  }

  .flow-r-item {
    height: 486px;
  }

  .flow-r-title {
    justify-content: center;
    align-items: center;
    width: 484px;
    height: 60px;
    border-width: 4px;
    border-color: #07c160;
    border-radius: 30px;
  }

  .r-title-txt {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    font-weight: 600;
    color: #000000;
  }

  .flow-r-weight {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    padding-left: 30px;
  }

  .r-weight-txt {
    font-family: PingFangSC-Regular;
    font-weight: 600;
    font-size: 28px;
    color: #000000;
  }

  .flow-r-list {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    padding-left: 30px;
    width: 484px;
  }

  .r-list-txt {
    padding-bottom: 30px;
    width: 227px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #666666;
  }
</style>

