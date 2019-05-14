<template>
    <div class="progresscycle-wrapper" :style="progresscycleStyle" @click="clicked">
    	<div class="displayText" :style="displayTextstyle">
    		<slot name="displayText"></slot>
    	</div>
        <midea-progresscycle-view  class="progresscycle" :data="chartData">
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
.progresscycle {
	position: relative;
    width: 480px;
    height: 480px;
    margin-left:-27px;
    margin-top:-27px;
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
        	default:'#dfe5ef'
        }
    },
    computed: {
    	progresscycleStyle () {
	        const { chartData,chartColor } = this;
	        let returnData = {};
	        if (chartData.cornerRadius) {
	            returnData = {
	            	width:(chartData.cornerRadius-7)*2 + 'px',
	            	height:(chartData.cornerRadius-7)*2 + 'px',
	            	borderRadius: (chartData.cornerRadius-7) + 'px'
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
	    }
    },
    methods: {
    	clicked(event) {
    		 this.$emit('onClick', {value:this.chartData});
    	}
    }
}
</script>
