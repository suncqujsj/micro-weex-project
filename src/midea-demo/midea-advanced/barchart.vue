<template>
    <div>
        <midea-header title="barchart" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-barchart-view class="barchart" :data="chartData"></midea-barchart-view>
        <div class="text-row">
            <text class="text-label">柱子个数:</text>
            <input class="text-input" type="text" placeholder="x个数" v-model="xCount" />
            <input class="text-input" type="text" placeholder="每x柱子个数" v-model="xValueCount" />
        </div>
        <midea-button text="刷新数据" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <text class="display-text">
            {{JSON.stringify(chartData)}}
        </text>
    </div>
</template>

<style scoped>
.barchart {
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
.text-row {
  display: flex;
  flex-direction: row;
}
.text-label {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  width: 160px;
  padding-left: 22px;
}
.text-input {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  padding-left: 22px;
  padding-right: 50px;

  border-color: #e2e2e2;
  border-width: 1px;
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
            xCount: 7,
            xValueCount: 1,
            chartData: {
                "x": {
                    "value": [1, 2, 3, 4, 5, 6, 7],
                    "label": ["11.6", "11.7", "11.8", "11.9", "11.10", "11.11", "11.12"]
                },
                "y": [
                    {
                        "value": [1, 6, 2, 1, 2, 3, 7,],
                        "title": "冷藏室",
                        "color": "#1B81FB", //柱子颜色
                        "background": "#ffffff"
                    }
                ],
                "xAxisColor": "#000000", //x轴线的颜色，如果不设置，则默认是白色线
                "xAxisLabelColor": "#000000", //x label的字体颜色，如果不设置，则默认是白色线 
                "yAxisColor": "#000000", //y轴线的颜色，如果不设置，则默认是白色线
                "yAxisLabelColor": "#000000", // label的字体颜色，如果不设置，则默认是白色线 
                // "background": "#ffffff", //不传，则默认使用透明背景
                "borderRadius": "0",//柱子顶部的圆角，默认为0px
                "description": "图标描叙",
                "legend": {
                    "position": "TOP_RIGHT", //"TOP_LEFT"/"TOP_RIGHT"
                    "orientation": "BOTTOM_RIGHT", //"HORIZONTAL"/"BOTTOM_RIGHT"
                    "show": false //是否显示标识
                },
                "unit": {
                    "x": "",
                    "y": ""
                }
            }
        }
    },
    methods: {
        mideaButtonClicked() {
            let tempObj = JSON.parse(JSON.stringify(this.chartData))
            tempObj.x.value = []
            tempObj.x.label = []
            tempObj.y = []
            for (let indexY = 0; indexY < this.xValueCount; indexY++) {
                if (!tempObj.y[indexY]) {
                    tempObj.y.push({
                        "value": [],
                        "title": "测试" + indexY,
                        "color": "#1B81FB", //柱子颜色
                        "background": "#ffffff"
                    })
                } else {
                    tempObj.y[indexY].value = []
                }
            }
            for (let index = 0; index < this.xCount; index++) {
                tempObj.x.value.push(Math.ceil(Math.random() * 100) + '')
                tempObj.x.label.push(Math.ceil(Math.random() * 100) + '')

                for (let indexY = 0; indexY < this.xValueCount; indexY++) {
                    tempObj.y[indexY].value.push(Math.ceil(Math.random() * 100))
                }
            }

            this.chartData = JSON.parse(JSON.stringify(tempObj))
        }
    },
}
</script>