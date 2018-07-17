<template>
	<div :class="['smart-content', hasBottomBorder && 'cell-bottom-border']" @click="onClick">
		<div class="title-div">
			<image :src="checked?icon_img_on:icon_img_off" class="index-img"></image>
			<text style="margin-left:20px">{{data.title}}</text>
		</div>
		<div class="smart-detail">
			<text class="smart-detail-content">{{data.detail}}</text>
			<div class="switch-div">
				<midea-switch v-if="showSwitchIcon" :checked="checked" @change="onMideachange" :width="width" :height="height"></midea-switch>
			</div>
		</div>
	</div>
</template>

<script>
import mideaSwitch from '@/midea-component/switch2.vue'
import switchBar from '@/midea-card/T0xAC/components/switch.vue'
const modal = weex.requireModule('modal');
export default {
	components: {
		mideaSwitch
	},
	props: {
		data: {
			type: Object
		},
		width: {
			type: String,
			default: '100',
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
	data() {
		return {
			mideaChecked: true,
			icon_img_on: "./assets/img/smart_ic_yellow@2x.png",
			icon_img_off: "./assets/img/smart_ic_gray@2x.png"
		}
	},
	methods: {
		onMideachange(event) {
			this.checked = event.value
			this.$emit('change', { value: event.value })
		},
		onClick(event) {
			this.$emit('click', event)
		}
	},
	computed: {

	}
}
</script>


<style>
.smart-content {
  padding-top: 30px;
  padding-bottom: 30px;
}
.index-img {
  width: 40px;
  height: 40px;
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
  align-items: center;
  margin-left: 60px;
  align-items: center;
  padding-top: 24px;
}
.smart-detail-content {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8a8a8f;
}
.switch-div {
  margin-left: 32px;
}
</style>
