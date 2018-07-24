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
				<midea-cell :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectCondition">
					<div slot="title" class="cell-title">
						<text class="cell-label">如果室温</text>
					</div>
					<div slot="rightText">
						<text class="right-text">{{situationDesc.conditionsDesc}}</text>
					</div>
				</midea-cell>
				<midea-cell :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectConditionTemp">
					<div slot="title" class="cell-title">
						<text class="cell-label">温度</text>
					</div>
					<div slot="rightText">
						<text class="right-text">{{situactionData.props.conditions[0].value}}</text>
					</div>
				</midea-cell>
			</div>

			<div class="base-group">
				<midea-cell :hasBottomBorder="true" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectModel">
					<div slot="title" class="cell-title">
						<text class="cell-label">就开启</text>
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
						<text class="right-text">{{situactionData.props.target.temperature}}</text>
					</div>
				</midea-cell>
			</div>
			<div class="action-bar">
				<midea-button text="保存" @mideaButtonClicked="submit"></midea-button>
			</div>
		</scroller>

		<midea-actionsheet :items="conditionItems" :show="isShowCondition" @close="closeConditionActionsheet" @itemClick="conditiontItemClick" @btnClick="conditionBtnClick" ref="conditionActionsheet">
		</midea-actionsheet>

		<midea-select :show="isShowConditionTemp" title="选择温度" :items="temperatureList" :index="conditionTempIndex" @close="isShowConditionTemp=false" @itemClick="conditionTempItemClick"></midea-select>

		<midea-actionsheet :items="modelItems" :show="isShowModel" @close="closeModelActionsheet" @itemClick="modeltItemClick" @btnClick="modelBtnClick" ref="modelActionsheet">
		</midea-actionsheet>

		<midea-select :show="isShowModelTemp" title="选择温度" :items="temperatureList" :index="modelTempIndex" @close="isShowModelTemp=false" @itemClick="modelTempItemClick"></midea-select>
	</div>
</template>

<script>
import nativeService from '@/common/services/nativeService.js'
import util from '@/common/util/util'

import { MideaHeader, MideaCell, MideaButton, MideaActionsheet, MideaSelect } from '@/index'

export default {
	components: {
		MideaHeader,
		MideaCell,
		MideaButton,
		MideaActionsheet,
		MideaSelect
	},
	data() {
		return {
			title: '情境设置',
			situactionData: null,

			isShowCondition: false,
			conditionOptions: [
				{ value: '1', desc: '高于' },
				{ value: '0', desc: '低于' }
			],

			isShowConditionTemp: false,
			conditionTempIndex: null,
			temperatureList: [],

			isShowModel: false,
			modelOptions: [
				{ value: 'cool', desc: '制冷' },
				{ value: 'heat', desc: '制热' }
			],

			isShowModelTemp: false,
			modelTempIndex: null,
		}
	},
	computed: {
		isipx: function () {
			return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6');
		},
		conditionItems() {
			return this.conditionOptions.map((item) => {
				return item.desc
			})
		},
		modelItems() {
			return this.modelOptions.map((item) => {
				return item.desc
			})
		},
		situationDesc() {
			let result

			if (this.situactionData) {
				let conditionsDesc = (this.situactionData.props.conditions[0].operator == 1 ? "高于" : "低于")
				let modelDesc = (this.situactionData.props.target.model == 'cool' ? "制冷" : "制热")

				result = {
					conditionsDesc: conditionsDesc,
					modelDesc: modelDesc,
					title: "室内温度" + conditionsDesc + this.situactionData.props.conditions[0].value + "°度时，自动开启",
					detail: "模式" + modelDesc + "，温度" + this.situactionData.props.target.temperature + "."
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
		selectCondition() {
			this.isShowCondition = true
			this.$nextTick(e => {
				this.$refs.conditionActionsheet.open();
			});
		},
		closeConditionActionsheet() {
			this.isShowCondition = false
		},
		conditiontItemClick(event) {
			this.isShowCondition = false
			this.situactionData.props.conditions[0].operator = this.conditionOptions[event.index].value
		},
		conditionBtnClick() {
			this.isShowCondition = false
		},

		selectConditionTemp() {
			this.isShowConditionTemp = true
		},
		conditionTempItemClick(event) {
			this.conditionTempIndex = event.index
			this.situactionData.props.conditions[0].value = event.key
		},

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
			this.situactionData.props.target.model = this.modelOptions[event.index].value
		},
		modelBtnClick() {
			this.isShowModel = false
		},

		selectModelTemp() {
			this.isShowModelTemp = true
		},
		modelTempItemClick(event) {
			this.modelTempIndex = event.index
			this.situactionData.props.target.temperature = event.key
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
		for (let index = 17; index <= 30; index++) {
			this.temperatureList.push({ value: index, key: index }, )
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
