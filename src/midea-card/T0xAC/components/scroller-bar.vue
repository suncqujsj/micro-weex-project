<template>
	<scroller  class="scroller"  :offset-accuracy="offset" scroll-direction="horizontal" show-scrollbar="false" @scroll="changeTemperture">
    	<div class="scroller-div" ref="scrollBar">
    		<text class="scroller-left"></text>
    		<div class="scroller-main">
    			<div class="scroller-main-div">
    				<div style="flex-direction: row;">
    					<text class="scroller-main-content">{{currentTemperture}}</text>
    					<text class="temp-danwei">°</text>
    				</div>
    				<text class="scroller-main-separate">|</text>
    			</div>
    			<image class="scroller-main-img-first" src="./assets/img/smart_ic_choose_s@2x.png"></image>
    			<image class="scroller-main-img-second" src="./assets/img/smart_ic_switch_s@2x.png"></image>
    		</div>
    		<text class="scroller-right"></text>
    	</div>
	</scroller>
</template>

<script>
  const animation = weex.requireModule('animation')
  const modal = weex.requireModule('modal')
  const dom = weex.requireModule('dom');
  export default {
    props: {
    	min: {
    		type: String,
    		default: "17"
    	},
    	max: {
    		type: String,
    		default: "30"
    	},
    	currentTemperture: {
	        type: String,
	        default: '19'
	    },
    },
    computed: {
    },
    data() {
    	return {
			selected:"selected",
    		unselected:"unselected" ,
    		offset: Math.floor(676/(this.max - this.min))
    	}
    },
    methods: {
    	changeTemperture(event) {
    		let currentSetTemperture = Math.ceil(event.contentOffset.x/this.offset) +this.max - 1;
        	if(currentSetTemperture <= this.min) {
        		currentSetTemperture = this.min;
        	} else if (currentSetTemperture >= this.max) {
        		currentSetTemperture = this.max;
        	}
        	this.currentTemperture = currentSetTemperture;
        	this.$emit('scrollerBarScroll', { value: this.currentTemperture});
    	}
    },
     mounted() {
        const el = this.$refs.scrollBar;
        dom.scrollToElement(el,{offset:parseInt(this.max - this.currentTemperture) * this.offset})
      }
  }
</script>

<style scoped>
	.scroller-bar {
		margin-top:-72px;
		font-family: PingFangSC-Light;
		color: #FFFFFF;
		letter-spacing: -4px;
	}
	.scroller {
		height:120px;
	}
	.scroller-div {
		width:1372px;
		flex-direction: row;
		justify-content: space-between;
	}
	.scroller-left {
		width:350px;
	}
	.scroller-main {
		width:233px;
		flex-direction: column;
	}
	.scroller-main-div {
		margin-left:102px;
		flex-direction: column;
	}
	.scroller-main-content {
		font-size: 24px;
		color: #FFFFFF;
	}
	.temp-danwei {
		font-family: PingFangSC-Medium;
		font-size: 12px;
		color: #FFFFFF;
	}
	.scroller-main-separate {
		font-size:16px;
		margin-left:14px;
		color: #FFFFFF;
	}
	.scroller-main-img-first {
		width:233px;
		height: 30px;
	}
	.scroller-main-img-second {
		width:32px;
		height: 32px;
		margin-left:100px;
		margin-top:-20px;
	}
	.scroller-right {
		width:350px;
	}
</style>
