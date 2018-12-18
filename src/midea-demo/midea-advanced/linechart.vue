<template>
    <div>
        <midea-header title="Linechart折线图" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-linechart-view class="linechart" :data="chartData"></midea-linechart-view>
        <midea-button text="刷新数据" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <midea-button text="扫码导入数据" @mideaButtonClicked="mideaImportButtonClicked">
        </midea-button>
        <scroller class="scroller">
            <text class="display-text">
                {{JSON.stringify(chartData, null, 2)}}
            </text>
        </scroller>
    </div>
</template>

<style scoped>
.linechart {
  width: 730px;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  height: 350px;
}
.display-text {
  font-size: 30px;
  margin-left: 10px;
  margin-right: 10px;
}
.scroller {
  flex:1;
}
</style>
<script>  
import base from '../base'
import mideaHeader from '@/midea-component/header.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'
export default {
    components: { mideaHeader, mideaButton },
    mixins: [base],
    data() {
        return {
            chartData: {
                "x": {
                    "value": [1, 2, 3, 4, 5, 6, 7],
                    "label": ["11.6", "11.7", "11.8", "11.9", "11.10", "11.11", "11.12"]
                },
                "y": [
                    {
                        "value": [1, 6, 2, 1, 2, 3, 7],
                        "label": [1, 6, 2, 1, 2, 3, 7],
                        "title": "冷藏室",
                        "color": "#2AD2FC", //折线颜色
                        "starcolor": "#ffffff", //区域背景渐变开始颜色（从下自上）
                        "endcolor": "#2AD2FC", //区域背景渐变结束颜色（从下自上）
                        "smooth":1,  //0直线，1平滑
                        "lineSidesPointAble" : true,  //首尾可以设置是否有端点,默认false
                        "lineSidesPointRadius" : 4,   //端点大小，端点的半径值大小，lineSidesPointAble为ture有效
                        "lineSidesPointColor" : "#000000", //端点颜色，lineSidesPointAble为ture有效
                        "lineDashAble" : true, //曲线的类型可调: 是否使用虚线，默认false
                    },
                    {
                        "value": [10, 5, 3, 4, 1, 2, 6],
                        "label": [10, 5, 3, 4, 1, 2, 6],
                        "title": "下段冷冻室",
                        "color": "#1B81FB", //折线颜色
                        "starcolor": "#ffffff", //区域背景渐变开始颜色（从下自上）
                        "endcolor": "#1B81FB", //区域背景渐变结束颜色（从下自上）
                        "smooth":1,  //0直线，1平滑
                    }
                ],
                "xAxisColor":"#000000", //x轴线的颜色，如果不设置，则默认是黑色线
                "xAxisLabelColor":"#000000", //x label的字体颜色，如果不设置，则默认是黑色字体颜色
                "yAxisColor":"#000000", //y轴线的颜色，如果不设置，则默认是黑色线
                "yAxisLabelColor":"#000000", // label的字体颜色，如果不设置，则默认是黑色字体颜色
                "background": "#ffffff", //不传，则默认使用透明背景
  
  
                "xAxisGridColor" : "#ffffff", //x轴上分割线颜色
                "xAxisGridAlpha": 0.5,  //x轴上分割线透明度
                "granularity" : 1.2, //间距本身是自适应的，可以使用该值进行调整间距的比例，比如自适应间距是20px，granularity设置为2的时候，界面显示的间距为 40px
               
                "yAxisLabelShow" : true, //是否只显示最大最小值，true: 显示y轴值；false: 不显示y轴值；默认true
                  
                "description": "",
                "legend": {
                    "position": "TOP_LEFT", //"TOP_LEFT"/"TOP_RIGHT"
                    "orientation": "HORIZONTAL" //"HORIZONTAL"/"BOTTOM_RIGHT"
                },
                "legendHide" : false, //是否需要隐藏legend，默认不隐藏
                "unit": {
                    "x": "日期",
                    "y": "次数"
                }
            }
        }
    },
    methods: {
        mideaButtonClicked() {
            let tempObj = JSON.parse(JSON.stringify(this.chartData))
            for (let index = 0; index < 7; index++) {
                tempObj.x.label[index] = Math.ceil(Math.random() * 100) + ''
                let value = Math.ceil(Math.random() * 100)
                tempObj.y[0].value[index] = value
                tempObj.y[0].label[index] = value
                tempObj.y[1].value[index] = Math.ceil(Math.random() * 100)
                tempObj.y[1].label[index] = Math.ceil(Math.random() * 100)
            }

            this.chartData = JSON.parse(JSON.stringify(tempObj))
        },
        mideaImportButtonClicked() {
        	let self = this;
        	let result = "";
        	 nativeService.scanCode().then(
                (resp) => {
                	result = resp.data;
			        if (typeof result == 'string') {
			            try {
			                result = JSON.parse(result)
			            } catch (error) {
			            	nativeService.alert("JSON数据格式有误");
			            }
			        }
			        self.chartData = result;
                }
            ).catch((error) => {
                result = "error: " + JSON.stringify(error || {})
            })
        }
    },
}
</script>
