<template>
    <div>
        <midea-barchart-view class="barchart" :data="chartJson"></midea-barchart-view>
    </div>
</template>

<style scoped>
.barchart {
  width: 730px;
  margin-left: 10px;
  height: 350px;
}
</style>
<script>
export default {
    data() {
        return {
            chartJson: {
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
    }
}
</script>