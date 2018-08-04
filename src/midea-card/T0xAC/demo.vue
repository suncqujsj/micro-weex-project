<template>
	<div>
		<midea-header title="demo" :showLeftImg="true" rightText="秀一秀" @leftImgClick="goBack"></midea-header>

		<scroller class="box">
			<div>
				<div class="card">
					<div class="card-left">
						<div style="flex-direction: column;">
							<text class="main-status">24</text>
							<text class="main-status-second" style="text-align: center;">室内温度</text>
						</div>
						<div style="flex-direction: row;justify-content: center;margin-bottom:60px">
							<image style="width:56px;height:56px" src="./assets/img/smart_ic_cold_on@2x.png"></image>
							<text class="main-status-second" style="margin-left:10px;margin-top:8px">制冷</text>
						</div>
					</div>
					<div class="card-right">
						<div style="align-items: flex-end;margin-top:32px;margin-right:32px">
							<image style="width:48px;height:50px" src="./assets/img/smart_ic_power@2x.png"></image>
						</div>
						<div style="align-items: flex-end;margin-top:-60px;margin-right:-24px">
							<image style="width:282px;height:160px" src="./assets/img/test_ic_one@2x.png"></image>
						</div>
						<div></div>

					</div>
				</div>
				<div style="margin-top:-72px;">
					<scroller style="height:120px" offset-accuracy="52" scroll-direction="horizontal" show-scrollbar="false" @scroll="changeTemperture">
						<div ref="scrollBar" style="width:1372px;flex-direction: row;justify-content: space-between;">
							<text style="width:350px"></text>
							<div style="width:233px;flex-direction: column;">
								<div style="margin-left:102px;flex-direction: column;">
									<text style="font-size: 24px;">{{currentTemperture}}</text>
									<text style="font-size:16px;margin-left:14px;">|</text>
								</div>
								<image style="width:233px;height: 30px;" src="./assets/img/smart_ic_choose_s@2x.png"></image>
								<image style="width:32px;height: 32px;margin-left:100px;margin-top:-20px" src="./assets/img/smart_ic_switch_s@2x.png"></image>
							</div>
							<text style="width:350px"></text>
						</div>
					</scroller>
				</div>
			</div>
			<div style="margin-left:32px;width:80px;height:60px;margin-top:50px">
				<switch-bar></switch-bar>
			</div>
			<div>
				<extend></extend>
			</div>
			<div style="background-color: darkgoldenrod;">
				<scroller-bar @scrollerBarScroll="setValue" :min="min" :max="max" :offset="offset"></scroller-bar>
			</div>
			<div class="smart">
				<div class="smart-title">
					<text class="smart-text">智能</text>
					<image style="width:48px;height: 48px;" src="./assets/img/smart_ic_more@2x.png"></image>
				</div>
				<!--显示两行带switch,hasBottomBorder=true -->
				<midea-smart @change="onMideachange" :checked="mideaChecked" :data="data"></midea-smart>
			</div>
			<!--显示一行带switch,hasBottomBorder=true -->
			<midea-smart @change="onMideachange2" :checked="mideaChecked2" :data="data2"></midea-smart>
			<!--显示两行不带switch,hasBottomBorder=true -->
			<midea-smart :showSwitchIcon="false" @change="onMideachange2" :hasBottomBorder="true" :checked="mideaChecked2" :data="data4"></midea-smart>

			<!--显示一行不带switch,hasBottomBorder=true -->
			<midea-smart :showSwitchIcon="false" @change="onMideachange2" :hasBottomBorder="true" :checked="mideaChecked2" :data="data5"></midea-smart>
			<!--显示两行不带switch,hasBottomBorder=false -->
			<midea-smart :showSwitchIcon="false" @change="onMideachange2" :hasBottomBorder="false" :checked="mideaChecked2" :data="data3"></midea-smart>

			<div style="flex-direction: row;flex-wrap: nowrap;margin-top:20px;margin-left: 32px;">
				<scroller scroll-direction="horizontal" show-scrollbar="false" style="flex:1;height:300px">
					<food v-for="(it,index) in foodData" :data="it" @foodclick="mideaClick"></food>
				</scroller>
			</div>

		</scroller>
		<list style="height:350px;width:750px">
			<!--带向右箭头的链接 -->
			<midea-item v-for="(item,i) in list" :key="item" :hasTopBorder="i==0?true:false" :title="item.name" :hasArrow="true" :clickActivied="true" @onItemPress="showDel(item)" @mideaCellClick="cellClick(item)" :cantEdit="true" @onDelete="delItem(item)">
				<text slot="title" class="cell-content">{{item.name}}</text>
				<text slot="rightText" class="right-text">{{item.rightText}}</text>
			</midea-item>
			<!--带向右箭头,有详情的链接 -->
			<midea-item v-for="(item1,j) in list1" :key="item1" :hasTopBorder="j==0?true:false" :title="item1.name" :hasArrow="true" :clickActivied="true" @onItemPress="showDel(item1)" @mideaCellClick="cellClick(item1)" :cantEdit="true" @onDelete="delItem(item1)">
				<text slot="title" class="cell-content">{{item1.name}}</text>
				<div slot="text" style="flex-direction: row;">
					<text class="cell-desc-text">冷藏</text>
					<text class="cell-desc-text">变温</text>
					<text class="cell-desc-text">冷冻</text>
				</div>
				<text slot="rightText" class="right-text">{{item1.rightText}}</text>
			</midea-item>
			<midea-item v-for="(item2,k) in list2" :key="item2" :hasTopBorder="k==0?true:false" :title="item2.name" :hasArrow="true" :clickActivied="true" @onItemPress="showDel(item2)" :cantEdit="true" @onDelete="delItem(item2)">
				<text slot="title" class="cell-content">{{item2.name}}</text>
			</midea-item>
		</list>
	</div>
</template>

<script>
import nativeService from '@/common/services/nativeService.js'
import MideaHeader from '@/midea-component/header.vue'
import mideaSwitch from '@/midea-component/switch.vue'
import mideaSmart from '@/midea-card/midea-components/smart.vue'
import food from '@/midea-card/T0xAC/components/food.vue'
import switchBar from '@/midea-card/T0xAC/components/switch.vue'
import extend from '@/midea-card/T0xAC/components/extend.vue'
import scrollerBar from '@/midea-card/T0xAC/components/scroller-bar.vue'
import mideaItem from '@/midea-component/item.vue'
const modal = weex.requireModule('modal');
const dom = weex.requireModule('dom')
export default {
	components: {
		MideaHeader,
		mideaSwitch,
		mideaSmart,
		mideaItem,
		food,
		switchBar,
		extend,
		scrollerBar
	},
	data() {
		return {
			mideaChecked: true,
			mideaChecked2: false,
			currentTemperture: 25,
			min: 17,
			max: 48,
			data: {
				title: "室内温度高于28°度时候，自动开启空调。",
				detail: "模式制冷，温度23."
			},
			data2: {
				title: "宝宝最适宜温度",
				detail: ""
			},
			data3: {
				title: "宝宝最适宜温度",
				detail: "模式制冷，温度23."
			},
			data4: {
				title: "宝宝最适宜温度",
				detail: "空调/客厅"
			},
			data5: {
				title: "宝宝最适宜温度",
				detail: ""
			},
			list: [
				{
					"name": "电饭煲食谱",
					"rightText": "更多",
					"desc": "more"
				}],
			list1: [
				{
					"name": "即将过期",
					"rightText": "更多",
					"desc": "冷藏"
				}],
			list2: [
				{ "name": "云食普" },
			],
			foodData: [{
				name: "橘子",
				img: "./assets/img/test_pic_orange@2x.png",
				detail: "1天后过期",
				desc: "冷冻",
				color: "#FF9500",
				targeturl: "/T0xAC/weex.vue"
			}, {
				name: "鲜肉",
				img: "./assets/img/test_pic_vagetable@2x.png",
				detail: "5天后过期",
				desc: "冷藏",
				color: "#5AC8FA",
				targeturl: "/T0xAC/weex.vue"
			}, {
				name: "橘子",
				img: "./assets/img/test_pic_orange@2x.png",
				detail: "1天后过期",
				desc: "冷冻",
				color: "#FF9500",
				targeturl: "/T0xAC/weex.vue"
			}, {
				name: "鲜肉",
				img: "./assets/img/test_pic_vagetable@2x.png",
				detail: "5天后过期",
				desc: "冷藏",
				color: "#5AC8FA",
				targeturl: "/T0xAC/weex.vue"
			}, {
				name: "橘子",
				img: "./assets/img/test_pic_orange@2x.png",
				detail: "1天后过期",
				desc: "冷冻",
				color: "#FF9500",
				targeturl: "/T0xAC/weex.vue"
			}, {
				name: "鲜肉",
				img: "./assets/img/test_pic_vagetable@2x.png",
				detail: "5天后过期",
				desc: "冷藏",
				color: "#5AC8FA",
				targeturl: "/T0xAC/weex.vue"
			}]
		}
	},
	methods: {
		goBack() {
			nativeService.goBack();
		},
		onMideachange(event) {
			//modal.toast({ 'message': event.value, 'duration': 2 });
		},
		onMideachange2(event) {
			//modal.toast({ 'message': event.value, 'duration': 2 });
		},
		cellClick(event) {
			console.dir(event);
			modal.toast({ 'message': event.name + " " + event.rightText, 'duration': 2 });
		},
		mideaClick(event) {
			//modal.toast({ 'message': event.value, 'duration': 2 });
		},
		changeTemperture(event) {
			this.currentTemperture = Math.ceil(event.contentOffset.x / 52) + 29;
			//modal.toast({ 'message': event.data.offset, 'duration': 2 });
		},
		setValue(event) {
			modal.toast({ 'message': event.value, 'duration': 2 });
		}
	},
	computed: {

	},
	mounted() {
		const el = this.$refs.scrollBar;
		modal.toast({ 'message': this.currentTemperture, 'duration': 2 });
		dom.scrollToElement(el, { offset: parseInt(30 - this.currentTemperture) * 52 })
	}
}
</script>


<style>
.box {
  width: 750px;
  height: 2800px;
  flex: 1;
}
.card {
  width: 686px;
  height: 392px;
  margin-left: 32px;
  margin-right: 32px;
  background-color: #e9f1ff;
  border-radius: 2px;
  flex-direction: row;
}
.smart {
  flex-direction: column;
  justify-content: space-between;
  margin-top: 80px;
}
.smart-title {
  flex-direction: row;
  justify-content: space-between;
  margin-left: 32px;
  margin-right: 32px;
}
.smart-content {
  margin-top: 50px;
  margin-left: 32px;
  margin-right: 32px;
  border-bottom: inset;
}
.smart-text {
  font-family: PingFangSC-Regular;
  font-size: 36px;
  color: #000000;
  letter-spacing: 0;
}
.smart-detail {
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  padding-bottom: 20px;
}
.smart-detail-content {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #8a8a8f;
  letter-spacing: 0;
}
.main-status {
  font-size: 128px;
}
.main-status-second {
  font-size: 28px;
}
.card-left {
  flex-direction: column;
  width: 343px;
  height: 392px;
  align-items: center;
  justify-content: space-around;
}
.card-right {
  flex-direction: column;
  width: 343px;
  height: 392px;
  justify-content: space-between;
}
.cell-content {
  font-family: PingFangSC-Medium;
  font-size: 36px;
  color: #000000;
}
.right-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  text-align: right;
  margin-right: 25px;
}
.cell-desc-text {
  width: 100px;
  margin-right: 30px;
  opacity: 0.4;
  font-family: PingFangSC-Medium;
  font-size: 28px;
  color: #000000;
}
</style>
