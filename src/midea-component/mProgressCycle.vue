<template>
    <div class="progresscycle-wrapper" :style="progresscycleStyle" @click="clicked">
    	<div class="displayText" :style="displayTextstyle">
    		<slot name="displayText"></slot>
    	</div>
        <midea-progresscycle-view  :style="cycleStyle" :data="temp">
        </midea-progresscycle-view>
    </div>
</template>

<style scoped>
.progresscycle-wrapper {
    position: relative;
    width:154px;
	height: 154px;
	border-radius: 77px;
   	background-color: red;
}
.displayText {
	position:absolute;
	align-items: center;
	justify-content: center;
	top:30px;
	left:20px;
}
</style>

<script>
export default {
    props: {
        chartData: {
            type: Object,
            default: () => ({})
        },
        chartColor: {
        	type: String,
        	default:'#FF9500'
        }
    },
    data() {
        return {
			configObj: weex.config,
			temp:{
				"completedColor": "#eeffffff", //环形进度条未完成后的颜色默认#267AFF
                "incompletedColor": "#eef5d5d5", //环形进度条未完成后的颜色，默认透明
                "thickness": 2, //环形进度条宽度，默认4
                "cornerRadius": 230,  //环形的半径，默认是width/2
                "totalCounter": 360, //环形进度条的最大值，默认是360
                "progressCounter": 100, //设置进度值，默认是从0-360, 默认为0
                "autoProgress": false, //设置是否需要自动执行环形进度，默认false, 如果设置为true，则每秒进度值+1操作
                "clockwise": true, //环形自动执行进度的方向，默认是true，即顺时针方向，false为逆时针方向
                "startingSlice": 180, //环形进度开始的起始位置，当totalCounter为360的时候，0: 0点钟位置起点，90:3点钟位置起点 180:6点钟位置起点
                "pointShow": false, //环形进度中的进度球是否需要显示，默认不显示
                "pointRadius": 8, //默认是环形进度宽度的一半
                "pointColor": "#FFFFFF", //环形进度中的进度球颜色
			}
        }
    },
    computed: {
    	progresscycleStyle () {
	        const { chartData,chartColor } = this;
	        let returnData = {};
	        if (chartData.cornerRadius) {
	            if( this.configObj && this.configObj.env && this.configObj.env.platform == 'android') {
	            	returnData = {
		            	width:(chartData.cornerRadius-0)*2 + 'px',
		            	height:(chartData.cornerRadius-0)*2 + 'px',
		            	borderRadius: (chartData.cornerRadius-0) + 'px'
		            }
	            } else {
	            	returnData = {
		            	width:(chartData.cornerRadius+7)*2 + 'px',
		            	height:(chartData.cornerRadius+7)*2 + 'px',
		            	borderRadius: (chartData.cornerRadius+7) + 'px'
		            }
	            }
	        }
	        if(chartColor)  {
	        	returnData.backgroundColor = chartColor;
	        }
	        return returnData
	    },
	    displayTextstyle() {
	    	const { chartData } = this;
	        if (chartData.cornerRadius) {
	        	return {
	        		top: (chartData.cornerRadius-20)+'px',
	        		left: (chartData.cornerRadius-35)+ 'px'
	        	}
	        }
	        return {}
	    },
	    cycleStyle() {
	    	let returnData = {};
	    	if( this.configObj && this.configObj.env && this.configObj.env.platform == 'android') {
            	returnData = {
	            	position: 'relative',
				    width: '480px',
				    height: '480px',
				    marginLeft:'-27px',
				    marginTop:'-27px'
	            }
            } else {
            	returnData = {
	            	position: 'relative',
				    width: '480px',
				    height: '480px',
				    marginLeft:'8px',
				    marginTop:'8px'
	            }
            }
            return returnData;
	    }
    },
    methods: {
    	clicked(event) {
    		 this.$emit('onClick', {value:this.chartData});
    	}
    }
}
</script>
