<template>
     <div :class="['smart-content', hasBottomBorder && 'cell-bottom-border']">
    	<div class="title-div">
    		<image v-if="checked" :src="icon_img_on" class="index-img"></image>
    		<image v-else :src="icon_img_off" class="index-img"></image>
    		<text style="margin-left:20px">{{data.title}}</text>
    	</div>
    	<div class="smart-detail">
    		<text class="smart-detail-content">{{data.detail}}</text>
    		<!--<midea-switch v-if="showSwitchIcon" :checked="checked" @change="onMideachange" :width="width" :height="height" slot="value"></midea-switch>-->
    		<div class="switch-div">
		        <switch-bar v-if="showSwitchIcon" :checked="checked" @change="onMideachange" :width="width" :height="height"></switch-bar>
		    </div>
    	</div>
    </div>
    <!--<div :class="['smart-content', 'smart-detail', hasBottomBorder && 'cell-bottom-border']" style="align-items: center;" v-else>
    	<div class="title-div">
    		<image v-if="checked" :src="icon_img_on" class="index-img"></image>
    		<image v-else :src="icon_img_off" class="index-img"></image>
    		<text style="margin-left:20px">{{data.title}}</text>
    	</div>
    	<!--<midea-switch v-if="showSwitchIcon" :checked="checked" @change="onMideachange" :width="width" :height="height" slot="value"></midea-switch>-->
    	<!--<div class="switch-div"style="margin-top:40px;">
	        <switch-bar :checked="checked" v-if="showSwitchIcon" @change="onMideachange" :width="width" :height="height"></switch-bar>
	    </div>
    </div>-->
    
</template>

<script>
	import mideaSwitch from '@/midea-component/switch.vue'
	import switchBar from '@/midea-card/T0xAC/components/switch.vue'
	const modal = weex.requireModule('modal');
    export default {
    	props: {
    		data:{
	    		type:Object,
	    		default:() => ({
	    			title:"室内温度高于28°度时候，自动开启空调。",
	    			detail:"模式制冷，温度23.",
	    		})
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
		    },
		    hasBottomBorder: {
		        type: Boolean,
		        default: true
		    },
		    showSwitchIcon: {
		        type: Boolean,
		        default: true
		    },
    	},
        components: {
            mideaSwitch,
            switchBar
        },
        data() {
            return {
                 mideaChecked: true,
                 icon_img_on:"./assets/img/smart_ic_yellow@2x.png",
                 icon_img_off:"./assets/img/smart_ic_gray@2x.png"
            }
        },
        methods: {
            onMideachange(event) {
            	this.$emit('change', { value: event.value})
            }
        },
        computed: {

        }
    }
</script>


<style>
	.box {
		width:750px;
	}
	.smart-content {
		margin-top:30px;
		margin-left:32px;
		margin-right:32px;
	}
	.index-img {
		width:40px;
		height:40px
	}
	.title-div {
		flex-direction: row;
		align-items: center;
	}
	.cell-bottom-border {
	    border-bottom-color: #e2e2e2;
	    border-bottom-width: 1px;
	}
	.smart-detail {
		flex-direction: row;
		justify-content: space-between;
		margin-left:60px;
		align-items: center;
	}
	.smart-detail-content {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #8A8A8F;
		letter-spacing: 0;
	}
	.switch-div {
		width:80px;
		height:60px;
		margin-top:50px;
		margin-left:32px;
		margin-right:32px;
	}
</style>
