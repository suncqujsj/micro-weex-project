<template>
	<scroller class="scroller-bar" offset-accuracy="50" @click="onchange" show-scrollbar="false">
		<div class="scroller-div" ref="switchBar">
			<div style="flex-direction: row;">
				<div class="container selected"></div>
				<div class="container-right unselected"></div>
			</div>
			<div>
				<image :src="icon" ref="mysecond" class="item-img" resize='contain' :style="{'width':width,'height':height}"></image>
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
			default: './img/smart_ic_switch_l@2x.png'
		},
		iconOff: {
			type: String,
			default: './img/smart_ic_switch_l@2x.png'
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
			selected: "selected",
			unselected: "unselected"
		}
	},
	watch: {
		checked(value) {
			// modal.toast({ message: "watch:" + this.checked })
			this.updateIcon()
		}
	},
	methods: {
		onchange(event) {
			this.checked = !this.checked;
			this.updateIcon()

			this.$emit('change', { value: this.checked })
		},
		updateIcon(durationTime = 100) {
			var switchBar = this.$refs.switchBar;
			if (this.checked) {
				animation.transition(switchBar, {
					styles: {
						transform: 'translateX(0px)',
					},
					duration: durationTime, //ms
					timingFunction: 'linear',
					delay: 0 //ms
				}, function () {
				});
			} else {
				animation.transition(switchBar, {
					styles: {
						transform: 'translateX(-61px)',
					},
					duration: durationTime, //ms
					timingFunction: 'linear',
					delay: 0 //ms
				}, function () {
				});
			}
		}

	},
	mounted() {
		this.updateIcon(0)
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
  background-color: #5d75f6;
  border-radius: 20px;
  width: 80px;
  height: 6px;
}
.container-right {
  background-color: #5d75f6;
  border-radius: 2px;
  width: 80px;
  height: 6px;
}
.item-img {
  margin-top: -28px;
  margin-left: 58px;
}
.selected {
  background-color: #5d75f6;
}
.unselected {
  background-color: #e5e5e8;
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
