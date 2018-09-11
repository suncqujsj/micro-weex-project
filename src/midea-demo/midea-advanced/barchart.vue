<template>
    <div>
        <midea-header title="barchart" :isImmersion="isImmersion" @leftImgClick="back"></midea-header>
        <midea-barchart-view class="barchart" :data="chartData"></midea-barchart-view>
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
                        "title": "冷藏室",
                        "color": "#2AD2FC", //柱子颜色
                        "background": "#ffffff"
                    },
                    {
                        "value": [10, 5, 3, 4, 1, 2, 6],
                        "title": "下段冷冻室",
                        "color": "#1B81FB", //柱子颜色
                        "background": "#ffffff"
                    }
                ],
                "description": "",
                "legend": {
                    "position": "TOP_LEFT", //"TOP_LEFT"/"TOP_RIGHT"
                    "orientation": "HORIZONTAL" //"HORIZONTAL"/"BOTTOM_RIGHT"
                },
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
                tempObj.y[0].value[index] = Math.ceil(Math.random() * 100)
                tempObj.y[1].value[index] = Math.ceil(Math.random() * 100)
            }

            this.chartData = JSON.parse(JSON.stringify(tempObj))
        }
    },
}
</script>