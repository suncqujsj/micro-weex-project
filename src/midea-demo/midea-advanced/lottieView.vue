<template>
    <div class="wrapper" :style="{paddingTop:isIos?'0px':'0px'}">
        <midea-header title="lottieView动效视图" :isImmersion="false" @leftImgClick="back"></midea-header>
        <midea-lottie-view class="lottie" :data="lottieData" :loop="true"></midea-lottie-view>
        <midea-button text="加载数据" type="green" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <textarea class="display-text" v-model="newData"></textarea>
    </div>
</template>

<style scoped>
.lottie {
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
            newData: null,
            lottieData: { "v": "5.1.16", "fr": 25, "ip": 0, "op": 125, "w": 1920, "h": 1080, "nm": "合成 1", "ddd": 0, "assets": [], "layers": [{ "ddd": 0, "ind": 1, "ty": 4, "nm": "形状图层 1", "td": 1, "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [960, 540, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "d": 1, "ty": "el", "s": { "a": 0, "k": [504, 504], "ix": 2 }, "p": { "a": 0, "k": [0, 0], "ix": 3 }, "nm": "椭圆路径 1", "mn": "ADBE Vector Shape - Ellipse", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [0.86274510622, 0.071049593389, 0.071049593389, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 49, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "d": [{ "n": "d", "nm": "虚线", "v": { "a": 0, "k": 10, "ix": 1 } }, { "n": "o", "nm": "偏移", "v": { "a": 0, "k": 0, "ix": 7 } }], "nm": "描边 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.23529399797, 0, 1, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "nm": "填充 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [-48, 16], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "变换" }], "nm": "椭圆 1", "np": 3, "cix": 2, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 125, "st": 0, "bm": 0 }, { "ddd": 0, "ind": 2, "ty": 1, "nm": "深 品蓝色 纯色 2", "tt": 1, "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 1, "k": [{ "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "n": "0p833_0p833_0p167_0p167", "t": 0, "s": [960, 540, 0], "e": [964, 1132, 0], "to": [0.66666668653488, 98.6666641235352, 0], "ti": [-0.66666668653488, -98.6666641235352, 0] }, { "t": 124 }], "ix": 2 }, "a": { "a": 0, "k": [960, 540, 0], "ix": 1 }, "s": { "a": 0, "k": [61.25, 56.296, 100], "ix": 6 } }, "ao": 0, "hasMask": true, "masksProperties": [{ "inv": false, "mode": "a", "pt": { "a": 0, "k": { "i": [[0, 0], [0, 0], [0, 0], [0, 0]], "o": [[0, 0], [0, 0], [0, 0], [0, 0]], "v": [[-346.667, -44.262], [-346.667, 1203.934], [2259.594, 1195.082], [2259.594, -53.115]], "c": true }, "ix": 1 }, "o": { "a": 0, "k": 100, "ix": 3 }, "x": { "a": 0, "k": 0, "ix": 4 }, "nm": "蒙版 1" }], "ef": [{ "ty": 5, "nm": "波形变形", "np": 10, "mn": "ADBE Wave Warp", "ix": 1, "en": 1, "ef": [{ "ty": 7, "nm": "波浪类型", "mn": "ADBE Wave Warp-0001", "ix": 1, "v": { "a": 0, "k": 1, "ix": 1 } }, { "ty": 0, "nm": "波形高度", "mn": "ADBE Wave Warp-0002", "ix": 2, "v": { "a": 0, "k": 10, "ix": 2 } }, { "ty": 0, "nm": "波形宽度", "mn": "ADBE Wave Warp-0003", "ix": 3, "v": { "a": 0, "k": 64.4, "ix": 3 } }, { "ty": 0, "nm": "方向", "mn": "ADBE Wave Warp-0004", "ix": 4, "v": { "a": 0, "k": 90, "ix": 4 } }, { "ty": 7, "nm": "波形速度", "mn": "ADBE Wave Warp-0005", "ix": 5, "v": { "a": 0, "k": 1.61, "ix": 5 } }, { "ty": 7, "nm": "固定", "mn": "ADBE Wave Warp-0006", "ix": 6, "v": { "a": 0, "k": 1, "ix": 6 } }, { "ty": 0, "nm": "相位", "mn": "ADBE Wave Warp-0007", "ix": 7, "v": { "a": 0, "k": 42, "ix": 7 } }, { "ty": 7, "nm": "消除锯齿（最佳品质）", "mn": "ADBE Wave Warp-0008", "ix": 8, "v": { "a": 0, "k": 1, "ix": 8 } }] }], "sw": 1920, "sh": 1080, "sc": "#2c8cb4", "ip": 0, "op": 125, "st": 0, "bm": 0 }], "markers": [] }
        }
    },
    methods: {
        mideaButtonClicked() {
            this.lottieData = JSON.parse(this.newData)
        }
    },
    created() {
        this.newData = JSON.stringify(this.lottieData)
    }
}
</script>