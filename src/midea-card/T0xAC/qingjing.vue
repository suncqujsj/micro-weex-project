<template>
	<scroller class="content" show-scrollbar="false">
		<div class="box">
			<div class="box-header">
				<div class="close-wrapper" @click="close">
					<image class="close-icon" src="./assets/img/smart_ic_deletesmall@2x.png"></image>
				</div>
				<midea-smart @change="onMideachange2" :hasBottomBorder="false" :checked="mideaChecked2" :data="data"></midea-smart>
			</div>
			<div class="box-detail">
				<text class="setting-title">如果室温 {{selectValue}}</text>
				<midea-radio-list :list="list" :cellStyle="cellStyle" :needShowTopBorder="true" @mideaRadioItemChecked="itemChecked"></midea-radio-list>

				<extend-selection :menus="menus" @makeSwitch="mySwitch">
					<div slot="selected" class="cell-highline"></div>
					<scroller slot="detail" :offset-accuracy="43" @scroll="myScroll" style="width:750px;height:430px">
						<div v-for="n in 35">
							<text style="text-align: center;height:43px" v-if="n>12 && n<17" :ref="'item'+n"></text>
							<text style="text-align: center;height:43px" v-if="n>=17 && n<=30" :ref="'item'+n">{{n}}</text>
							<text style="text-align: center;height:43px" v-if="n>=30 && n<35" :ref="'item'+n"></text>
						</div>
					</scroller>
				</extend-selection>
				<div style="background-color: white;">
					<div style="margin-left: 34px">
						<div style="height: 100px;justify-content: center;">
							<text>就开启</text>
						</div>

					</div>
					<div>
						<div style="background-color:  #F6F6F6;;">
							<midea-radio-list :list="list2" :cellStyle="cellStyle" :needShowTopBorder="true" @mideaRadioItemChecked="itemChecked2"></midea-radio-list>
						</div>
					</div>
				</div>
				<div style="background-color: white;">
					<div style="background-color:#F6F6F6;margin-top: 10px;opacity: 0.5">
						<extend-selection :menus="menus" @makeSwitch="mySwitch">
							<div slot="selected" class="cell-highline" style="flex-direction: row;">
								<text style="margin-left:345px">时</text>
								<text style="margin-left:105px">分</text>
							</div>
							<scroller slot="detail" :offset-accuracy="43" @scroll="myScroll" show-scrollbar="false" style="width:375px;height:430px;">
								<div v-for="n in 35" style="align-items: flex-end;margin-right:60px">
									<text style="text-align: center;height:43px" v-if="n>12 && n<17" :ref="'item'+n"></text>
									<text style="text-align: center;height:43px" v-if="n>=17 && n<=30" :ref="'item'+n">{{n}}</text>
									<text style="text-align: center;height:43px" v-if="n>=30 && n<35" :ref="'item'+n"></text>
								</div>
							</scroller>
							<scroller slot="detail" :offset-accuracy="43" @scroll="myScroll" show-scrollbar="false" style="width:375px;height:430px;">
								<div v-for="n in 35" style="align-items: flex-start;margin-left:60px">
									<text style="text-align: center;height:43px" v-if="n>12 && n<17" :ref="'item'+n"></text>
									<text style="text-align: center;height:43px" v-if="n>=17 && n<=30" :ref="'item'+n">{{n}}</text>
									<text style="text-align: center;height:43px" v-if="n>=30 && n<35" :ref="'item'+n"></text>
								</div>
							</scroller>
						</extend-selection>
					</div>
				</div>
			</div>
		</div>
	</scroller>
</template>

<script>
import nativeService from '@/common/services/nativeService.js'
import mideaSwitch from '@/midea-component/switch.vue'
import mideaSmart from '@/midea-card/T0xAC/components/smart.vue'
import mideaRadioList from '@/midea-card/T0xAC/components/radioList.vue'
import extendSelection from '@/midea-card/T0xAC/components/extend-selection.vue'
import mideaItem from '@/midea-component/item.vue'
const modal = weex.requireModule('modal');
const dom = weex.requireModule('dom');
var stream = weex.requireModule('stream');
export default {
	components: {
		mideaSwitch,
		mideaSmart,
		mideaItem,
		mideaRadioList,
		extendSelection
	},
	data() {
		return {
			mideaChecked: true,
			mideaChecked2: false,
			currentTemperture: 19,
			checkedInfo: { title: '选项2', value: 2 },
			checkedInfo2: { title: '选项2', value: 2 },
			selectValue: "",
			cellStyle: {
				backgroundColor: "#F6F6F6",
				opacity: 0.5
			},
			data: {
				title: "室内温度高于28°度时候，自动开启空调。",
				detail: "模式制冷，温度23."
			},
			list: [
				{ title: '高于', value: 1 },
				{ title: '低于', value: 2, checked: true },
			],
			list2: [
				{ title: '制冷', value: 1, checked: true },
				{ title: '制热', value: 2 },
			],
			menus: [{
				name: '温度',
				rightText: this.selectValue || "28",
				iconPath: '',
			}]
		}
	},
	methods: {
		close() {
			nativeService.goBack()
		},
		onMideachange(event) {
			//modal.toast({ 'message': event.value, 'duration': 2 });
		},
		onMideachange2(event) {
			//modal.toast({ 'message': event.value, 'duration': 2 });
		},
		itemChecked(e) {
			this.checkedInfo = e;
		},
		itemChecked2(e) {
			this.checkedInfo2 = e;
		},
		mySwitch(event) {
			let el = this.$refs.item25[0];
			dom.scrollToElement(el, {})
			//modal.toast({ 'message': "hello world", 'duration': 2 });
		}
	},
	computed: {
	},
	mounted() {
	}
}
</script>

<style>
.content {
  flex: 1;
  width: 750px;
  background-color: #f2f2f2;
  scroll-direction: vertical;
}
.box {
  margin-top: 40px;
  margin-bottom: 290px;
}
.box-header {
  background-color: #ffffff;
  padding-left: 32px;
  padding-right: 32px;

  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-top-color: #e2e2e2;
  border-top-width: 1px;
}
.close-wrapper {
  height: 100px;
  align-items: flex-end;
  justify-content: center;
}
.close-icon {
  width: 45px;
  height: 45px;
}
.box-detail {
  margin-top: 24px;
  background-color: white;
  padding-left: 34px;
}
.setting-title {
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: #000000;
  margin-top: 72px;
  margin-bottom: 40px;
}
.cell-highline {
  border-top-width: 2px;
  border-top-color: #cdcdcd;
  border-bottom-width: 2px;
  border-bottom-color: #cdcdcd;
  height: 43px;
  width: 750px;
  bottom: 215px;
  position: absolute;
}
</style>
