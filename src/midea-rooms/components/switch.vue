<template>
	<scroller class="scroller-bar"  offset-accuracy="50" @click="onchange"  show-scrollbar="false">
	  <div class="scroller-div" @click="onchange" ref="switchBar">
			<div style="flex-direction: row;">
				<div class="container selected"></div>
	  			<div class="container-right unselected"></div>
			</div>
			<div>
	 		 <image :src="icon" ref="mysecond"  class="item-img"  :style="{'width':width,'height':height}" ></image>
			</div>
	  </div>

  	</scroller>
</template>

<script>
  const animation = weex.requireModule('animation')
  const modal = weex.requireModule('modal')
  export default {
    props: {
      value: {
        type: Number,
        default: -1
      },
      // 是否选中
      iconOn: {
        type: String,
        default: './assets/img/smart_ic_switch_l@2x.png'
      },
      iconOff: {
        type: String,
        default: './assets/img/smart_ic_switch_l@2x.png'
      },
      width: {
        type: String,
        default: '48',
      },
      height: {
        type: String,
        default: '48',
      },
      checked: {
        type: Boolean,
        default: false
      }

    },
    computed: {
    	icon() {
	         return this.checked ? this.iconOn : this.iconOff;
	      }
    },
    data() {
    	return {
			selected:"selected",
    		unselected:"unselected"    		
    	}
    },
    methods: {
     onchange (event) {
        this.checked = !this.checked;
        var switchBar = this.$refs.switchBar;
         if(this.checked) {
         	 animation.transition(switchBar, {
	          styles: {
	          	transform: 'translateX(-61px)',
	          },
	          duration: 100, //ms
	          timingFunction: 'linear',
	          delay: 0 //ms
	        }, function () {
	          //modal.toast({ message: 'animation finished.' })
	        });
         } else {
         	 animation.transition(switchBar, {
	          styles: {
	          	transform: 'translateX(0px)',
	          },
	          duration: 100, //ms
	          timingFunction: 'linear',
	          delay: 0 //ms
	        }, function () {
	          //modal.toast({ message: 'animation finished.' })
	        });
         }
        
          this.$emit('change', { value: this.checked})
      }
    },
     mounted() {
     	this.onchange();
      }
  }
</script>

<style scoped>
	.scroller-bar {
		height: 60px;
		width: 104px;
		padding-top: 36px;
		margin-top: -30px;
	}
	.scroller-div {
		width: 160px;
		flex-direction: column;
	}
	.container {
		background-color: #5D75F6;
		border-radius: 20px;	
		width:80px;
		height:6px;
	}
	.container-right {
		background-color: #5D75F6;
		border-radius: 2px;	
		width:80px;
		height:6px;
	}
	.item-img {
		margin-top:-28px;
		margin-left:58px;
	}
	.selected {
		background-color: #5D75F6;
	}
	.unselected {
		background-color: #E5E5E8;;
	}
  .grid-option {
    justify-content: center;
    border-radius: 8px;
    border-width: 2px;
    padding-left: 6px;
    padding-right: 6px;
  }

  .text-title {
    lines: 2;
    line-height: 30px;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 26px;
  }

  .image-checked {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 38px;
    height: 34px;
  }
</style>