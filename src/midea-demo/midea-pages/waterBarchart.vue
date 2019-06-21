<template>
    <div class="wrapper">
        <midea-header bg-color="transparent" title="净水器柱状图" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <top-circle-bg :state='widgetState' />
        <list class="list">
            <cell class="content-wrapper">
                <text class="desc">用水量</text>
                <div class="value-wrapper">
                    <text class="value">20</text>
                    <text class="unit">L</text>
                </div>
                <div class="barchart1-wrapper">
                    <midea-barchart-view class="barchart1" :data="chartData1"></midea-barchart-view>
                </div>

                <div class="barchart2-wrapper">
                    <midea-barchart-view class="barchart2" :data="chartData2"></midea-barchart-view>
                </div>

                <div class="barchart2-wrapper">
                    <midea-barchart-view class="barchart2" :data="chartData3"></midea-barchart-view>
                </div>

                <div class="barchart2-wrapper">
                    <midea-barchart-view class="barchart2" :data="chartData4"></midea-barchart-view>
                </div>
            </cell>
        </list>
    </div> 
</template>

<script>
import base from '../base'
import nativeService from '../../common/services/nativeService';
import topCircleBg from '@/midea-component/newComp/top-circle-bg.vue'

const nums = function() {
    let arr = [];
    for(let i = 1; i <= 30; i++) {
        arr.push(i);
    }
    return arr;
}

const labels = function() {
    let arr = [];
    for(let i = 1; i <= 30; i++) {
        if (i === 12 || i === 30) {
            arr.push(i + '');
        } else {
            arr.push('');
        }
    }
    return arr;
}
export default {
    components:{topCircleBg},
    mixins:[base],
    data(){
        return {
            widgetState:2,
            chartData1: {
                "x": {
                    "value": [1, 2, 3, 4, 5, 6, 7],
                    "label": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                },
                "y": [
                    {
                        "maxValue": [10, 10, 8, 10, 2, 5, 8],
                        "value": [2, 2, 2, 2, 2, 2, 2],
                        "color": "#605BD2FF", //柱子颜色ARGB格式
                        "maxColor": '#205BD2FF', //柱子上面颜色ARGB格式
                        "background": "#ffffff",
                        "maxHighLightColor":"#805BD2FF", //高亮颜色
                        "highLightColor":"#FF5BD2FF", //高亮颜色
                        "highLightEnable":true //点击高亮是否可用
                    }
                ],
                "xAxisColor": "#e5e5e8", //x轴线的颜色，如果不设置，则默认是白色线
                "xAxisLabelColor": "#8a8a8f", //x label的字体颜色，如果不设置，则默认是白色线 
                "yAxisColor": "transparent", //y轴线的颜色，如果不设置，则默认是白色线
                "yAxisLabelColor": "transparent", // label的字体颜色，如果不设置，则默认是白色线 
                // "background": "#ffffff", //不传，则默认使用透明背景
                "borderRadius": "5",//柱子顶部的圆角，默认为0px
                "bottomBorderRadius": "5",
                "description": "图标描叙",
                "legend": {
                    "position": "TOP_RIGHT", //"TOP_LEFT"/"TOP_RIGHT"
                    "orientation": "BOTTOM_RIGHT", //"HORIZONTAL"/"BOTTOM_RIGHT"
                    "show": false //是否显示标识
                },
                "unit": {
                    // "x": "x坐标",
                    // "y": "y坐标"
                }
            },

            chartData2:{
                "x": {
                    "value": [1, 2, 3, 4, 5, 6, 7],
                    "label": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                },
                "y": [
                    {
                        "maxValue": [4, 3, 10, 8.5, 1, 6, 6],
                        "value": [1, 1, 2, 3.5, 1, 3, 3],
                        // "label": ["3L", "2L", "8L", "5L", "1L", "3L", "3L"],
                        "color": "#605BD2FF", //柱子颜色ARGB格式
                        "maxColor": '#205BD2FF', //柱子上面颜色ARGB格式
                        "maxHighLightColor":"#805BD2FF", //高亮颜色
                        "highLightColor":"#FF5BD2FF", //高亮颜色
                        "background": "#ffffff",
                        "highLightEnable":true //点击高亮是否可用
                    }
                ],
                "xAxisColor": "#e5e5e8", //x轴线的颜色，如果不设置，则默认是白色线
                "xAxisLabelColor": "#8a8a8f", //x label的字体颜色，如果不设置，则默认是白色线 
                "yAxisColor": "transparent", //y轴线的颜色，如果不设置，则默认是白色线
                "yAxisLabelColor": "#8a8a8f", // label的字体颜色，如果不设置，则默认是白色线 
                // "background": "#ffffff", //不传，则默认使用透明背景
                "borderRadius": "5",//柱子顶部的圆角，默认为0px
                "bottomBorderRadius": "5", //底部的圆角值
                "description": "图标描叙",
                "legend": {
                    "position": "TOP_RIGHT", //"TOP_LEFT"/"TOP_RIGHT"
                    "orientation": "BOTTOM_RIGHT", //"HORIZONTAL"/"BOTTOM_RIGHT"
                    "show": false //控制每组数据标识的显示或隐藏
                },
                "unit": {
                    // "x": "x坐标",
                    // "y": "y坐标"
                },
                "signPost": {                    //底部界面  v5.8.0
                  "lineHeight":1, //线条的高度
                  "lineColor":"#e5e5e8", //标签线的颜色 如果不设置，则默认是黑色线 
                  "linePointRadius":3, //标签线上圆点的半径, 默认10
                  "lineMarginTop":"5", //线条距离X轴的距离
                  "lineMarginBottom":"0",
                  "cursorColor":"#5BD2FF", //标签（三角形）的颜色 如果不设置，则默认是黑色线
                  "cursorMarginTop":"5",   //标签（三角形）距离线条的距离
                  "cursorHigh":"20",       //标签（三角形）本身高度
                  "cursorMarginBottom":"0",
                  "show": true, //默认是 false 是否显示底部界面
                }
            },

            chartData3:{
                "x": {
                    "value": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    "label": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                },
                "y": [
                    {
                        "maxValue": [9, 1, 7, 3, 7, 4, 4, 3, 3, 10, 4, 8],
                        "value": [3, 1, 3, 1.5, 3, 1, 1, 1, 1, 2, 1, 2],
                        // "label": ["6L", "1L", "4L", "2.5L", "4L", "3L", "3L", "2L", "2L", "8L", "3L", "6L"],
                        "color": "#605BD2FF", //柱子颜色ARGB格式
                        "maxColor": '#205BD2FF', //柱子上面颜色ARGB格式
                        "maxHighLightColor":"#805BD2FF", //高亮颜色
                        "highLightColor":"#FF5BD2FF", //高亮颜色
                        "background": "#ffffff",
                        "highLightEnable":true //点击高亮是否可用
                    }
                ],
                "xAxisColor": "#e5e5e8", //x轴线的颜色，如果不设置，则默认是白色线
                "xAxisLabelColor": "#8a8a8f", //x label的字体颜色，如果不设置，则默认是白色线 
                "yAxisColor": "transparent", //y轴线的颜色，如果不设置，则默认是白色线
                "yAxisLabelColor": "#8a8a8f", // label的字体颜色，如果不设置，则默认是白色线 
                // "background": "#ffffff", //不传，则默认使用透明背景
                "borderRadius": "5",//柱子顶部的圆角，默认为0px
                "bottomBorderRadius": "5", //底部的圆角值
                "description": "图标描叙",
                "legend": {
                    "position": "TOP_RIGHT", //"TOP_LEFT"/"TOP_RIGHT"
                    "orientation": "BOTTOM_RIGHT", //"HORIZONTAL"/"BOTTOM_RIGHT"
                    "show": false //控制每组数据标识的显示或隐藏
                },
                "unit": {
                    // "x": "x坐标",
                    // "y": "y坐标"
                },
                "signPost": {                    //底部界面  v5.8.0
                  "lineHeight":1, //线条的高度
                  "lineColor":"#e5e5e8", //标签线的颜色 如果不设置，则默认是黑色线 
                  "linePointRadius":3, //标签线上圆点的半径, 默认10
                  "lineMarginTop":"5", //线条距离X轴的距离
                  "lineMarginBottom":"0",
                  "cursorColor":"#5BD2FF", //标签（三角形）的颜色 如果不设置，则默认是黑色线
                  "cursorMarginTop":"5",   //标签（三角形）距离线条的距离
                  "cursorHigh":"20",       //标签（三角形）本身高度
                  "cursorMarginBottom":"0",
                  "show": true, //默认是 false 是否显示底部界面
                }
            },

            chartData4:{
                "x": {
                    "value": nums(),
                    "label": labels()
                },
                "y": [
                    {
                        "maxValue": [10, 5, 3, 7, 1.8, 8.8, 9, 1, 1, 4, 3, 7, 4, 8.5, 7, 9, 8.6, 1.8, 3, 4, 10, 8, 7, 3, 3.8, 3.6, 4, 7, 4, 4],
                        "value": [3, 2, 1.5, 2.5, 0.3, 3.8, 2, 0.2, 1, 1, 1, 3, 1, 0.5, 3.2, 2, 2, 0.5, 1, 1, 3, 2, 2, 0.5, 0.8, 1.1, 1, 1, 1, 1],
                        // "label": ["7L", "3L", "2.5L", "4.5L", "1.5L", "5L", "7L", "0.8L", "1L", "3L", "2L", "4L", "3L", "8L", "3.8L", "7L", "6.6L", "1.3L", "2L", "3L", "7L", "6L", "5L", "2.5L", "3L", "2.5L", "3L", "6L", "3L", "3L"],
                        "color": "#605BD2FF", //柱子颜色ARGB格式
                        "maxColor": '#205BD2FF', //柱子上面颜色ARGB格式
                        "maxHighLightColor":"#805BD2FF", //高亮颜色
                        "highLightColor":"#FF5BD2FF", //高亮颜色
                        "background": "#ffffff",
                        "highLightEnable":true //点击高亮是否可用
                    }
                ],
                "xAxisColor": "#e5e5e8", //x轴线的颜色，如果不设置，则默认是白色线
                "xAxisLabelColor": "#8a8a8f", //x label的字体颜色，如果不设置，则默认是白色线 
                "yAxisColor": "transparent", //y轴线的颜色，如果不设置，则默认是白色线
                "yAxisLabelColor": "#8a8a8f", // label的字体颜色，如果不设置，则默认是白色线 
                // "background": "#ffffff", //不传，则默认使用透明背景
                "borderRadius": "3",//柱子顶部的圆角，默认为0px
                "bottomBorderRadius": "3", //底部的圆角值
                "description": "图标描叙",
                "legend": {
                    "position": "TOP_RIGHT", //"TOP_LEFT"/"TOP_RIGHT"
                    "orientation": "BOTTOM_RIGHT", //"HORIZONTAL"/"BOTTOM_RIGHT"
                    "show": false //控制每组数据标识的显示或隐藏
                },
                "unit": {
                    // "x": "x坐标",
                    // "y": "y坐标"
                },
                "signPost": {                    //底部界面  v5.8.0
                  "lineHeight":1, //线条的高度
                  "lineColor":"#e5e5e8", //标签线的颜色 如果不设置，则默认是黑色线 
                  "linePointRadius":3, //标签线上圆点的半径, 默认10
                  "lineMarginTop":"5", //线条距离X轴的距离
                  "lineMarginBottom":"0",
                  "cursorColor":"#5BD2FF", //标签（三角形）的颜色 如果不设置，则默认是黑色线
                  "cursorMarginTop":"5",   //标签（三角形）距离线条的距离
                  "cursorHigh":"20",       //标签（三角形）本身高度
                  "cursorMarginBottom":"0",
                  "show": true, //默认是 false 是否显示底部界面
                }
            }
        }
    },
    computed: {
    },
    methods:{
    }
}
</script>

<style scoped>
 .wrapper {
     background-color: #f2f2f2;
 }
  .content-wrapper {
      align-items: center;
      padding-top: 228px;
      width: 750px;
  }
  .desc {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #666666;
      letter-spacing: 0;
      text-align: center;
      line-height: 24px;
  }

  .value-wrapper {
      flex-direction: row;
      justify-content: center;
      align-items: flex-end;
      padding-top: 16px;
  }
  .value {
      font-family: PingFangSC-Regular;
      font-size: 200px;
      color: #000000;
      letter-spacing: 0;
      line-height: 180px;
  }

  .unit {
      padding-bottom: 16px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #000000;
      letter-spacing: 0;
      line-height: 36px;
  }

  .barchart1-wrapper {
      margin-top: 200px;
      padding-bottom: 40px;
      width: 686px;
      height: 246px;
      background-color: #ffffff;
      border-radius: 16px;
  }

  .barchart1 {
      width: 686px;
      height: 206px;
  }

  .barchart2-wrapper {
      margin-top: 32px;
      width: 750px;
      height: 434px;
      background-color: #ffffff;
  }

  .barchart2 {
      width: 750px;
      height: 366px;
  }
</style>
