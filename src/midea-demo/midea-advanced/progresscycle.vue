<template>
    <div class="wrapper">
        <midea-header title="progresscycle" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller class="scroller">
            <div class="progresscycle-wrapper">
                <midea-progresscycle-view v-if="isShow" class="progresscycle" :data="chartData"></midea-progresscycle-view>
            </div>
            <div class="param-wrapper">
                <div class="item-group">
                    <text class="text-label">起始角度:</text>
                    <input class="text-input" type="text" placeholder="起始角度" v-model="chartData.startingSlice" />
                </div>
                <div class="item-group">
                    <text class="text-label">总进度:</text>
                    <input class="text-input" type="text" placeholder="总进度" v-model="chartData.totalCounter" />
                </div>
                <div class="item-group">
                    <text class="text-label">步长:</text>
                    <input class="text-input" type="text" placeholder="步长" v-model="step" />
                </div>
            </div>
            <midea-button  :text="(intervalHandler?'停止':'开始')+'增加进度（步长/秒）'" type="primary" :btnStyle="{'width': '500px', 'height':'60px', 'margin-top':'0px'}" @mideaButtonClicked="mideaButtonClicked">
            </midea-button>
            <midea-button  text="增加进度" type="primary" :btnStyle="{'width': '500px', 'height':'60px', 'margin-top':'0px'}" @mideaButtonClicked="mideaButtonClicked1">
            </midea-button>
            <midea-button  text="重新加载" type="primary" :btnStyle="{'width': '500px', 'height':'60px', 'margin-top':'0px'}" @mideaButtonClicked="mideaButtonClicked2">
            </midea-button>
            <midea-button  text="清零" type="primary" :btnStyle="{'width': '500px', 'height':'60px', 'margin-top':'0px'}" @mideaButtonClicked="mideaButtonClicked3">
            </midea-button>
        </scroller>
    </div>
</template>
<style scoped>
.wrapper {
  background-color: #ffffff;
}
.scroller {
  padding-top: 20px;
  padding-bottom: 50px;
}
.progresscycle-wrapper {
    width: 750px;
    height: 350px;
    justify-content: center;
    align-items: center;
}
.progresscycle {
    width: 350px;
    height: 350px;
    justify-content: center;
    align-items: center;
    border-color: red;
    border-width: 1px;
}
.param-wrapper {
    width: 750px;
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
  background-color: #ffffff;
}
.item-group {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.text-label {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  width: 150px;
  padding-top: 16px;
  margin-bottom: 16px;
  padding-right: 20px;
  text-align: right;
}
.text-input {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  /* height: 72px; */
  padding-top: 16px;
  padding-left: 22px;
  padding-right: 50px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  background-color: #fafafa;
}
</style>
<script>  

import base from '../base'
import mideaButton from '@/midea-component/button.vue'
import mideaDualButton from '@/midea-component/dualButton.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaDualButton },
    mixins: [base],
    data() {
        return {
            isShow: true,
            intervalHandler: null,
            step: 5,
            chartData: {
                "completedColor": "#267aff", //环形进度条未完成后的颜色默认#267AFF
                "incompletedColor": "#f2f2f2", //环形进度条未完成后的颜色，默认透明
                "thickness": 4, //环形进度条宽度，默认4
                "cornerRadius": 175,  //环形的半径，默认是width/2
                "totalCounter": 100, //环形进度条的最大值，默认是360
                "progressCounter": 0, //设置进度值，默认是从0-360, 默认为0
                "autoProgress": false, //设置是否需要自动执行环形进度，默认false, 如果设置为true，则每秒进度值+1操作
                "clockwise": true, //环形自动执行进度的方向，默认是true，即顺时针方向，false为逆时针方向
                "startingSlice": 180, //环形进度开始的起始位置，当totalCounter为360的时候，0: 0点钟位置起点，90:3点钟位置起点 180:6点钟位置起点
                "pointShow": true, //环形进度中的进度球是否需要显示，默认不显示
                "pointRadius": 8, //默认是环形进度宽度的一半
                "pointColor": "#FFFFFF", //环形进度中的进度球颜色
                "pointImageBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAERklEQVRYR82Yf2jUdRjHX5875137cbcfOF1Omfij1DDC3BKEWeCPUMERy2pgkQvBQUY5EfrB6AfIlrVFG4gYJWmaxASV/AHlQKptRTRSywyHu5oudttOt+623T3x3Pe8rbntbiTdvv99P5/n83ne3/fn/Tyf5/ka4nkqxObKJd3RS1Y/FCI8JpBnDLOATASvQJuBVoSvptpoCKTQ6fPQTYUJxXJhYhlkV8t0PxRjWIeQH3Ya6zF0As0IJ51wtOMlc2O8JWOD2CtJbj9FCK8KLACcsXyPMu83cBnDOz1O6tlqBkbbY1QQGXvFHQpQJiHeABy6cKodpiXD/AxYPxcezIbcVEh3QrcfPLfgpw448Tv81gV/9UF/MOoyYGy8aXNQ27XV9IwEcgcI13syDzsVwDMI4fn7MmHT/ZbzBZlYg2M8Alz2WmCO/AK/eiOGBp06RJAK38vmyvDl/9pPGQj6qUV4CrAbA88uhp0FMD0ZptjiP5DBENzog8pG+OQCiEKAIIbDdidlwxkZAqEaCFAuwtvKQHISlD0EryyDe6ZYznsH4JoPzrbC6Va42gNdfshwwhw3rMmDVXkw2wUpSdaavwdhTzPU/gh9qgiDGMNrPQ6qbmskCsJdI0+KcEA1oAzsWDYEICjw/XU4cAGOX4GewNiMuB2wYR5sXgwPz1A6h4C82xxlJGAMm3u2m891pzAIDcMAnBFYou/PPQC7C4cY+PIqlJ8Dz83oJuOei35EbhpUrYTH5wwxsqsBPv7ZejfQ4oDVGr4GTUSZbCNElYahirC+CGamgjJwphVKTkAwZsq5E5fdBgfXw+o8i5E/bkLRsahY/dgo93mpM2kfSpYJ8inCWg3DXQWwfaklwsZ22HIK2nzxC3Kk5SwX7F8LBTkwEIIPfoDdjZHwNZwiSImZViPzA8J3mglnpkH9RiskVYQ7G+DgxfiOYCyYejQli6Cy0BKrhqyyoawAXofhEeOukVIR9unIytlwrMgSyqVOWHN0fBHGy4+K9XQxLMwinCw21sO5axFtCC8Yd7UcEnhah/Y8CqVhaVq0vX4+Xjex7d5aAS8utez2tcCOr6MC/cy4quUbYLkOnd0E+TOsyXVfwHlP7M3jtViRCyefsKybrsOqI9GV3+pxtImQq0OXtsC9qdbkoo+i5xavn3HtVG8Xn7dM/rwFC/dHmDB4FESvCMk61F4GyZHsmFMXyXB3BQJoBm7fZm3WNwg5tVEQfaqJNiGBTIBnkmhiMkSH+30pFZPgPJHQjGnodMDyyXF3hG/RdDR4/v9bFMp93dRNknoikowSXlmFcUyGGlNxjFlt50N2CiRNoNrWAqajFyqbJlJtR44l4X3H7bsqVge2YS4siXRgWu5r2a8dWEsHHL8bHVj00kx0Lzr89g535TaKkQl05eDF0PTfu/LhSDShuUh32MnqD1GIGfF/ArwiI/5PBOn0+eL7P/EPYtpkF4ik2AkAAAAASUVORK5CYII=", //环形进度中的进度球的图片base64
            }
        }
    },
    methods: {
        mideaButtonClicked() {
            let tempObj = JSON.parse(JSON.stringify(this.chartData))
            if (this.intervalHandler) {
                clearInterval(this.intervalHandler)
                this.intervalHandler = null
            } else {
                this.intervalHandler = setInterval(() => {
                    tempObj.progressCounter += (this.step || 1)
                    if (tempObj.progressCounter >= tempObj.totalCounter) {
                        tempObj.progressCounter = tempObj.totalCounter
                        clearInterval(this.intervalHandler)
                        this.intervalHandler = null
                    }
                    this.chartData = JSON.parse(JSON.stringify(tempObj))
                }, 1000);
            }
        },
        mideaButtonClicked1(){
            let tempObj = JSON.parse(JSON.stringify(this.chartData))
            tempObj.progressCounter += (this.step || 1)
            if (tempObj.progressCounter >= tempObj.totalCounter) {
                this.chartData = JSON.parse(JSON.stringify(tempObj))
            }
        },
        mideaButtonClicked2(){
            this.isShow = false
            this.$nextTick(()=>{
                this.isShow = true
            })
        },
        mideaButtonClicked3(){
            let tempObj = JSON.parse(JSON.stringify(this.chartData))
            tempObj.progressCounter = 0
            this.chartData = JSON.parse(JSON.stringify(tempObj))
        }
    },
    created() {
        //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
};
</script>