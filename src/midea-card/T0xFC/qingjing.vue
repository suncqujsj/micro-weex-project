<template>
	<div class="wrapper">
		<midea-header :title="title" :isImmersion="isipx?false:true" @leftImgClick="back">
		</midea-header>
		<scroller class="content-wrapper">
			<div class="base-group">
				<text class="header-title">{{situationDesc.title}}</text>
				<text class="header-desc">{{situationDesc.detail}}</text>
			</div>
			<div class="base-group">
				<midea-cell :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectSleepTemp">
					<div slot="title" class="cell-title">
						<text class="cell-label">PM2.5高于</text>
					</div>
					<div slot="rightText">
						<text class="right-text">{{situactionData.props.conditions[0].value}}</text>
					</div>
				</midea-cell>
			</div>

			<div class="action-bar">
				<midea-button text="保存" @mideaButtonClicked="submit"></midea-button>
			</div>
		</scroller>

		<midea-select :show="isShowSleepTemp" title="选择PM2.5" :items="temperatureList" :index="conditionTempIndex" @close="isShowSleepTemp=false" @itemClick="conditionTempItemClick"></midea-select>
	</div>
</template>

<script>
import nativeService from '@/common/services/nativeService.js'
import util from '@/common/util/util'
import situationBase from '@/midea-card/midea-components/situationBase'

import { MideaHeader, MideaCell, MideaButton, MideaSelect } from '@/index'

export default {
	components: {
		MideaHeader,
		MideaCell,
		MideaButton,
		MideaSelect
	},
	mixins: [situationBase],
	data() {
		return {
			title: '情境设置',
			situactionData: null,

			isShowSleepTemp: false,
			conditionTempIndex: null,
			temperatureList: []
		}
	},
	computed: {
		isipx: function () {
			return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6');
		},
		situationDesc() {
			let result

			if (this.situactionData) {
				result = {
					title: "PM2.5高于70时，自动打开净化器",
					detail: ""
				}
			}

			return result
		},
	},
	methods: {
		selectSleepTemp() {
			this.isShowSleepTemp = true
		},
		conditionTempItemClick(event) {
			this.conditionTempIndex = event.index
			this.situactionData.props.conditions[0].value = event.key
		},

		submit() {
			this.updateSituationService(this.situactionData).then((resp) => {
				if (resp.code == 0) {
					nativeService.toast("更新成功")
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
		for (let index = 1; index <= 99; index++) {
			this.temperatureList.push({ value: index * 10, key: index * 10 }, )
		}

		nativeService.getUserInfo().then((data) => {
			this.uid = data.uid
			nativeService.getItem("CARD_STORAGE_SITUATION", (resp) => {
				if (resp.result == 'success') {
					this.situactionData = JSON.parse(resp.data) || {}
					this.deviceId = this.situactionData.deviceId

					//设置默认值
					this.conditionTempIndex = ((this.situactionData.props.conditions[0].value || 0) / 10) - 1
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
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
  background-color: #ffffff;
}
</style>
