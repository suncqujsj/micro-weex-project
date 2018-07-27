<template>
	<div class="wrapper">
		<midea-header :title="title" :isImmersion="isipx?false:true" @leftImgClick="back">
		</midea-header>
		<scroller class="content-wrapper" v-if="situactionData">
			<div class="base-group">
				<text class="header-title">{{situationDesc.title}}</text>
				<text class="header-desc">{{situationDesc.detail}}</text>
			</div>
			<div class="base-group">
				<midea-cell :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectModel">
					<div slot="title" class="cell-title">
						<text class="cell-label">模式</text>
					</div>
					<div slot="rightText">
						<text class="right-text">{{situationDesc.modelDesc}}</text>
					</div>
				</midea-cell>
				<midea-cell :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectModelTemp">
					<div slot="title" class="cell-title">
						<text class="cell-label">温度</text>
					</div>
					<div slot="rightText">
						<text class="right-text">{{situactionData.props.temperature}}</text>
					</div>
				</midea-cell>
				<midea-cell :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectWindSpeed">
					<div slot="title" class="cell-title">
						<text class="cell-label">风速</text>
					</div>
					<div slot="rightText">
						<text class="right-text">{{situationDesc.windSpeedDesc}}</text>
					</div>
				</midea-cell>
				<div class="item-group">
					<text class="cell-label">上下摆风</text>
					<midea-switch2 :checked="situactionData.props.wind_swing_ud == 'on'?true:false" @change="changeWindSwingUD"></midea-switch2>
				</div>
				<div class="item-group">
					<text class="cell-label">左右摆风</text>
					<midea-switch2 :checked="situactionData.props.wind_swing_lr == 'on'?true:false" @change="changeWindSwingLR"></midea-switch2>
				</div>
			</div>
			<div class="action-bar">
				<midea-button text="保存" @mideaButtonClicked="submit"></midea-button>
			</div>
		</scroller>

		<midea-actionsheet :items="modelItems" :show="isShowModel" @close="closeModelActionsheet" @itemClick="modeltItemClick" @btnClick="modelBtnClick" ref="modelActionsheet">
		</midea-actionsheet>

		<midea-select :show="isShowModelTemp" title="选择温度" :items="temperatureList" :index="modelTempIndex" @close="isShowModelTemp=false" @itemClick="modelTempItemClick"></midea-select>

		<midea-actionsheet :items="windSpeedItems" :show="isShowWindSpeed" @close="closeWindSpeedActionsheet" @itemClick="windSpeedtItemClick" @btnClick="windSpeedBtnClick" ref="windSpeedActionsheet">
		</midea-actionsheet>
	</div>
</template>

<script>
import nativeService from '@/common/services/nativeService.js'
import situationBase from '@/midea-card/midea-components/situationBase'

import { MideaHeader, MideaCell, MideaButton, MideaActionsheet, MideaSelect, MideaSwitch2 } from '@/index'

export default {
	components: {
		MideaHeader,
		MideaCell,
		MideaButton,
		MideaActionsheet,
		MideaSelect,
		MideaSwitch2
	},
	mixins: [situationBase],
	data() {
		return {
			title: '情境设置',
			situactionData: null,

			isShowModel: false,
			modelOptions: [
				{ value: 'cool', desc: '制冷' },
				{ value: 'heat', desc: '制热' }
			],

			isShowModelTemp: false,
			modelTempIndex: null,
			temperatureList: [],

			isShowWindSpeed: false,
			windSpeedOptions: [
				{ value: '1', desc: '最小' },
				{ value: '50', desc: '中' },
				{ value: '100', desc: '最强' }
			],
		}
	},
	computed: {
		isipx: function () {
			return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6');
		},
		modelItems() {
			return this.modelOptions.map((item) => {
				return item.desc
			})
		},
		windSpeedItems() {
			return this.windSpeedOptions.map((item) => {
				return item.desc
			})
		},
		situationDesc() {
			let result = {
				title: '',
				detail: ''
			}

			if (this.situactionData) {
				let modelDesc = (this.situactionData.props.model == 'cool' ? "制冷" : "制热")

				let windSpeed, windSpeedDesc
				let temp = this.windSpeedOptions.filter((item) => {
					return item.value == this.situactionData.props.wind_speed
				})
				if (temp && temp.length > 0) {
					windSpeed = temp[0]
					windSpeedDesc = windSpeed.desc
				}


				result = {
					modelDesc: modelDesc,
					windSpeedDesc: windSpeedDesc,
					title: "我的最舒适",
					detail: "模式" + modelDesc + "，温度" + this.situactionData.props.temperature + "°，风速" + windSpeedDesc + (this.situactionData.props.wind_swing_ud == 'on' ? "，上下摆风" : "") + (this.situactionData.props.wind_swing_lr == 'on' ? "，左右摆风" : "")
				}
			}

			return result
		},
	},
	methods: {

		selectModel() {
			this.isShowModel = true
			this.$nextTick(e => {
				this.$refs.modelActionsheet.open();
			});
		},
		closeModelActionsheet() {
			this.isShowModel = false
		},
		modeltItemClick(event) {
			this.isShowModel = false
			this.situactionData.props.model = this.modelOptions[event.index].value
		},
		modelBtnClick() {
			this.isShowModel = false
		},

		selectModelTemp() {
			this.isShowModelTemp = true
		},
		modelTempItemClick(event) {
			this.modelTempIndex = event.index
			this.situactionData.props.temperature = event.key
		},

		selectWindSpeed() {
			this.isShowWindSpeed = true
			this.$nextTick(e => {
				this.$refs.windSpeedActionsheet.open();
			});
		},
		closeWindSpeedActionsheet() {
			this.isShowWindSpeed = false
		},
		windSpeedtItemClick(event) {
			this.isShowWindSpeed = false
			this.situactionData.props.wind_speed = this.windSpeedOptions[event.index].value
		},
		windSpeedBtnClick() {
			this.isShowWindSpeed = false
		},
		changeWindSwingUD(event) {
			this.situactionData.props.wind_swing_ud = event.value ? "on" : "off"
		},
		changeWindSwingLR(event) {
			this.situactionData.props.wind_swing_lr = event.value ? "on" : "off"
		},
		submit() {
			this.submitSituationService(this.situactionData).then((resp) => {
				if (resp.code == 0) {
					nativeService.toast("保存成功")
					this.appPageDataChannel.postMessage({ key: "situation", deviceId: this.deviceId, data: {} })
					this.back()
				} else {
					throw resp
				}
			}).catch((error) => {
				nativeService.toast(this.getErrorMessage(error))
			})
		}
	},
	created() {
		for (let index = 17; index <= 30; index++) {
			this.temperatureList.push({ value: index, key: index }, )
		}
		nativeService.getUserInfo().then((data) => {
			this.uid = data.uid
			nativeService.getItem("CARD_STORAGE_SITUATION", (resp) => {
				if (resp.result == 'success') {
					this.situactionData = JSON.parse(resp.data) || {}
					this.deviceId = this.situactionData.deviceId
					//设置默认值
					this.modelTempIndex = this.situactionData.props.temperature - 17
				}
			})
		}).catch((error) => { })
	}
}
</script>

<style>
.wrapper {
  flex: 1;
  background-color: #f2f2f2;
  position: relative;
}
.base-group {
  margin-top: 24px;
  padding-left: 32px;
  background-color: #ffffff;
}
.header-title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  padding-top: 30px;
  padding-right: 32px;
}
.header-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #8a8a8f;
  padding-top: 32px;
  padding-bottom: 32px;
  padding-right: 32px;
}
.cell-title {
  flex: 1;
  flex-direction: row;
  align-items: center;
}
.cell-label {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
.right-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  padding-right: 24px;
  text-align: right;
  width: 430px;
}
.item-group {
  padding-top: 30px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 30px;
  background-color: #ffffff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
