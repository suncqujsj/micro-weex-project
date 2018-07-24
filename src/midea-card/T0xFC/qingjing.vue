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
						<text class="right-text">{{situactionData.props.value}}</text>
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

import { MideaHeader, MideaCell, MideaButton, MideaSelect } from '@/index'

export default {
	components: {
		MideaHeader,
		MideaCell,
		MideaButton,
		MideaSelect
	},
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
		back(options = {}) {
			//返回上一页
			nativeService.goBack(options);
		},

		selectSleepTemp() {
			this.isShowSleepTemp = true
		},
		conditionTempItemClick(event) {
			this.conditionTempIndex = event.index
			this.situactionData.props.conditions[0].value = event.key
		},

		submit() {
			nativeService.getUserInfo().then((data) => {
				let param = {
					method: "POST",
					headers: {
						"Content-Type": "application/json;charset=utf-8"
					},
					data: {
						uid: data.uid,
						applianceCode: this.situactionData.deviceId || "",
						stamp: Math.round(new Date().getTime() / 1000), //时间戳
						moduleCode: "1",
						enable: this.situactionData.enable,
						props: this.situactionData.props
					}
				}
				nativeService.isDummy = false
				nativeService.sendCentralCloundRequest("/v1/situation/update", param).then((resp) => {
					if (resp.code == 0) {
						nativeService.toast("更新成功")
						this.back()
					} else {
						throw resp
					}
				}).catch((error) => {
					let msg = "请求失败，请稍后重试。"
					if (error.msg) {
						msg = error.msg
					}
					if (error.code) {
						msg += "(" + error.code + ")"
					}
					nativeService.toast(msg)
				})
			})
		}
	},
	created() {
		for (let index = 1; index <= 99; index++) {
			this.temperatureList.push({ value: index * 10, key: index * 10 }, )
		}
		nativeService.getItem("CARD_STORAGE_SITUATION", (resp) => {
			if (resp.result == 'success') {
				this.situactionData = JSON.parse(resp.data) || {}
			}
		})
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
