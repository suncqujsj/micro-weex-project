<template>
     <div :class="['smart-content', hasBottomBorder && 'cell-bottom-border']" v-if="data.detail">
    	<text>{{data.title}}</text>
    	<div class="smart-detail">
    		<text class="smart-detail-content">{{data.detail}}</text>
    		<midea-switch v-if="showSwitchIcon" :checked="checked" @change="onMideachange" :width="width" :height="height" slot="value"></midea-switch>
    	</div>
    </div>
    <div :class="['smart-content', 'smart-detail', hasBottomBorder && 'cell-bottom-border']" v-else>
    	<text>{{data.title}}</text>
    	<midea-switch v-if="showSwitchIcon" :checked="checked" @change="onMideachange" :width="width" :height="height" slot="value"></midea-switch>
    	</div>
    </div>
    
</template>

<script>
	import mideaSwitch from '@/midea-component/switch.vue'
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
		        default: '88',
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
            mideaSwitch
        },
        data() {
            return {
                 mideaChecked: true,
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
		margin-top:50px;
		margin-left:32px;
		margin-right:32px;
	}
	.cell-bottom-border {
	    border-bottom-color: #e2e2e2;
	    border-bottom-width: 1px;
	}
	.smart-detail {
		flex-direction: row;
		justify-content: space-between;
		margin-top:30px;
		padding-bottom: 40px;
	}
	.smart-detail-content {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #8A8A8F;
		letter-spacing: 0;
	}
</style>
