<template>
    <div class="wrapper">
        <midea-header title="progresscycle" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller class="scroller">
            <m-progress-cycle :chartData="chartData" :chartColor="chartColor1" @onClick="callClick($event,2)">
            	<text style="font-size: 30px;margin-left:0px" slot="displayText">PCB</text>
            </m-progress-cycle> 
            <m-progress-cycle :chartData="chartData" :chartColor="chartColor2" @onClick="callClick($event,3)">
            	<text style="font-size: 30px;margin-left:0px" slot="displayText">PCB</text>
            </m-progress-cycle> 
            <m-progress-cycle :chartData="chartData" :chartColor="chartColor3" @onClick="callClick($event,4)">
            	<text style="font-size: 30px;margin-left:0px" slot="displayText">PCB</text>
            </m-progress-cycle> 
            <m-progress-cycle :chartData="chartData" :chartColor="chartColor4" @onClick="callClick($event,5)">
            	<text style="font-size: 30px;margin-left:0px" slot="displayText">PCB</text>
            </m-progress-cycle> 
        </scroller>
    </div>
</template>
<style scoped>
.wrapper {
    background-color: blue
}
.scroller {
	margin-top: 100px;
	margin-left:100px;
}
.progresscycle {
    width: 480px;
    height: 480px;
    justify-content: center;
    align-items: center;
}
</style>
<script>  

import base from '../base'
import nativeService from '@/common/services/nativeService'
import mProgressCycle from '@/midea-component/mProgressCycle.vue'
module.exports = {
    components: { mProgressCycle},
    mixins: [base],
    data() {
        return {
            chartData: {
                "completedColor": "#eeffffff", //环形进度条未完成后的颜色默认#267AFF
                "incompletedColor": "#eef5d5d5", //环形进度条未完成后的颜色，默认透明
                "thickness": 2, //环形进度条宽度，默认4
                "cornerRadius": 200,  //环形的半径，默认是width/2
                "totalCounter": 360, //环形进度条的最大值，默认是360
                "progressCounter": 100, //设置进度值，默认是从0-360, 默认为0
                "autoProgress": false, //设置是否需要自动执行环形进度，默认false, 如果设置为true，则每秒进度值+1操作
                "clockwise": true, //环形自动执行进度的方向，默认是true，即顺时针方向，false为逆时针方向
                "startingSlice": 180, //环形进度开始的起始位置，当totalCounter为360的时候，0: 0点钟位置起点，90:3点钟位置起点 180:6点钟位置起点
                "pointShow": false, //环形进度中的进度球是否需要显示，默认不显示
                "pointRadius": 8, //默认是环形进度宽度的一半
                "pointColor": "#FFFFFF", //环形进度中的进度球颜色
                "pointImageBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAERklEQVRYR82Yf2jUdRjHX5875137cbcfOF1Omfij1DDC3BKEWeCPUMERy2pgkQvBQUY5EfrB6AfIlrVFG4gYJWmaxASV/AHlQKptRTRSywyHu5oudttOt+623T3x3Pe8rbntbiTdvv99P5/n83ne3/fn/Tyf5/ka4nkqxObKJd3RS1Y/FCI8JpBnDLOATASvQJuBVoSvptpoCKTQ6fPQTYUJxXJhYhlkV8t0PxRjWIeQH3Ya6zF0As0IJ51wtOMlc2O8JWOD2CtJbj9FCK8KLACcsXyPMu83cBnDOz1O6tlqBkbbY1QQGXvFHQpQJiHeABy6cKodpiXD/AxYPxcezIbcVEh3QrcfPLfgpw448Tv81gV/9UF/MOoyYGy8aXNQ27XV9IwEcgcI13syDzsVwDMI4fn7MmHT/ZbzBZlYg2M8Alz2WmCO/AK/eiOGBp06RJAK38vmyvDl/9pPGQj6qUV4CrAbA88uhp0FMD0ZptjiP5DBENzog8pG+OQCiEKAIIbDdidlwxkZAqEaCFAuwtvKQHISlD0EryyDe6ZYznsH4JoPzrbC6Va42gNdfshwwhw3rMmDVXkw2wUpSdaavwdhTzPU/gh9qgiDGMNrPQ6qbmskCsJdI0+KcEA1oAzsWDYEICjw/XU4cAGOX4GewNiMuB2wYR5sXgwPz1A6h4C82xxlJGAMm3u2m891pzAIDcMAnBFYou/PPQC7C4cY+PIqlJ8Dz83oJuOei35EbhpUrYTH5wwxsqsBPv7ZejfQ4oDVGr4GTUSZbCNElYahirC+CGamgjJwphVKTkAwZsq5E5fdBgfXw+o8i5E/bkLRsahY/dgo93mpM2kfSpYJ8inCWg3DXQWwfaklwsZ22HIK2nzxC3Kk5SwX7F8LBTkwEIIPfoDdjZHwNZwiSImZViPzA8J3mglnpkH9RiskVYQ7G+DgxfiOYCyYejQli6Cy0BKrhqyyoawAXofhEeOukVIR9unIytlwrMgSyqVOWHN0fBHGy4+K9XQxLMwinCw21sO5axFtCC8Yd7UcEnhah/Y8CqVhaVq0vX4+Xjex7d5aAS8utez2tcCOr6MC/cy4quUbYLkOnd0E+TOsyXVfwHlP7M3jtViRCyefsKybrsOqI9GV3+pxtImQq0OXtsC9qdbkoo+i5xavn3HtVG8Xn7dM/rwFC/dHmDB4FESvCMk61F4GyZHsmFMXyXB3BQJoBm7fZm3WNwg5tVEQfaqJNiGBTIBnkmhiMkSH+30pFZPgPJHQjGnodMDyyXF3hG/RdDR4/v9bFMp93dRNknoikowSXlmFcUyGGlNxjFlt50N2CiRNoNrWAqajFyqbJlJtR44l4X3H7bsqVge2YS4siXRgWu5r2a8dWEsHHL8bHVj00kx0Lzr89g535TaKkQl05eDF0PTfu/LhSDShuUh32MnqD1GIGfF/ArwiI/5PBOn0+eL7P/EPYtpkF4ik2AkAAAAASUVORK5CYII=", //环形进度中的进度球的图片base64
            },
            chartColor:'#FFAACC',
            chartColor1:"#FF3B30",
            chartColor2:"#FFAACC",
            chartColor3:"#FF3B30",
            chartColor4:"#FFAACC"
        }
    },
    methods: {
       callClick(event,num) {
       	if(num == 1) {
       		if(this.chartColor == "#FFAACC") {
       			this.chartColor = "#FF3B30"
       		} else {
       			this.chartColor = "#FFAACC"
       		}
       	} else if(num == 2) {
       		if(this.chartColor1 == "#FF3B30") {
       			this.chartColor1 = "#FFAACC"
       		} else {
       			this.chartColor1 = "#FF3B30"
       		}
       	} else if(num == 3) {
       		if(this.chartColor2 == "#FFAACC") {
       			this.chartColor2 = "#FF3B30"
       		} else {
       			this.chartColor2 = "#FFAACC"
       		}
       	} else if(num == 4) {
       		if(this.chartColor3 == "#FF3B30") {
       			this.chartColor3 = "#FFAACC"
       		} else {
       			this.chartColor3 = "#FF3B30"
       		}
       	} else if(num == 5) {
       		if(this.chartColor4 == "#FFAACC") {
       			this.chartColor4 = "#FF3B30"
       		} else {
       			this.chartColor4 = "#FFAACC"
       		}
       	}
       	//nativeService.alert(event.value)
       }
    },
    created() {
        //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
};
</script>