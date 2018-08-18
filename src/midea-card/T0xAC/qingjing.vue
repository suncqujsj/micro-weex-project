<template>
	<div class="wrapper">
		<midea-header :title="title" :isImmersion="isImmersion" @leftImgClick="back">
		</midea-header>
		<scroller class="content-wrapper" v-if="situactionData">
			<div class="base-group header-group">
				<text class="header-title">{{situationDesc.title}}</text>
				<text class="header-desc">{{situationDesc.detail}}</text>
			</div>
			<div class="base-group">
				<midea-cell placeHolder="请选择" :rightText="situationDesc.conditionsDesc" @mideaCellClick="selectCondition">
					<div slot="title" class="cell-title">
						<text class="cell-label">如果室温</text>
					</div>
				</midea-cell>
				<midea-cell placeHolder="请选择" :rightText="situactionData.props.conditions[0].value" @mideaCellClick="selectConditionTemp" :hasSubBottomBorder="false">
					<div slot="title" class="cell-title">
						<text class="cell-label">温度</text>
					</div>
				</midea-cell>
			</div>

			<div class="base-group">
				<midea-cell placeHolder="请选择" :rightText="situationDesc.modeDesc" @mideaCellClick="selectModel">
					<div slot="title" class="cell-title">
						<text class="cell-label">就开启</text>
					</div>
				</midea-cell>
				<midea-cell placeHolder="请选择" :rightText="situactionData.props.target.temperature" @mideaCellClick="selectModelTemp" :hasSubBottomBorder="false">
					<div slot="title" class="cell-title">
						<text class="cell-label">温度</text>
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

		<midea-actionsheet :items="modeItems" :show="isShowModel" @close="closeModelActionsheet" @itemClick="modeItemClick" @btnClick="modeBtnClick" ref="modeActionsheet">
		</midea-actionsheet>

		<midea-select :show="isShowModelTemp" title="选择温度" :items="temperatureList" :index="modeTempIndex" @close="isShowModelTemp=false" @itemClick="modeTempItemClick"></midea-select>
	</div>
</template>

<script>
import nativeService from '@/common/services/nativeService.js'
import situationBase from '@/midea-card/midea-components/situationBase'

import MideaActionsheet from '@/midea-component/actionsheet.vue'
import MideaButton from '@/midea-component/button2.vue'
import MideaCell from '@/midea-component/cell2.vue'
import MideaHeader from '@/midea-component/header.vue'
import MideaSelect from '@/midea-component/mSelect.vue'

// import { MideaHeader, MideaCell, MideaButton, MideaActionsheet, MideaSelect } from '@/index'

export default {
	components: {
		MideaHeader,
		MideaCell,
		MideaButton,
		MideaActionsheet,
		MideaSelect
	},
	mixins: [situationBase],
	data() {
		return {
			title: '情境设置',
			situactionData: null,

			isShowCondition: false,
			conditionOptions: [
				{ value: '1', desc: '高于' },
				{ value: '2', desc: '低于' }
			],

			isShowConditionTemp: false,
			conditionTempIndex: null,
			temperatureList: [],

			isShowModel: false,
			modeOptions: [
				{ value: 'cool', desc: '制冷' },
				{ value: 'heat', desc: '制热' }
			],

			isShowModelTemp: false,
			modeTempIndex: null,
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
		modeItems() {
			return this.modeOptions.map((item) => {
				return item.desc
			})
		},
		situationDesc() {
			let result = {
				title: '',
				detail: ''
			}

			if (this.situactionData) {
				let conditionsDesc = (this.situactionData.props.conditions[0].operator == 1 ? "高于" : "低于")
				let modeDesc = (this.situactionData.props.target.mode == 'cool' ? "制冷" : "制热")

				result = {
					conditionsDesc: conditionsDesc,
					modeDesc: modeDesc,
					title: "室内温度" + conditionsDesc + this.situactionData.props.conditions[0].value + "°度时，自动开启",
					detail: "模式" + modeDesc + "，温度" + this.situactionData.props.target.temperature + "°."
				}
			}

			return result
		},
	},
	methods: {
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
				this.$refs.modeActionsheet.open();
			});
		},
		closeModelActionsheet() {
			this.isShowModel = false
		},
		modeItemClick(event) {
			this.isShowModel = false
			this.situactionData.props.target.mode = this.modeOptions[event.index].value
		},
		modeBtnClick() {
			this.isShowModel = false
		},

		selectModelTemp() {
			this.isShowModelTemp = true
		},
		modeTempItemClick(event) {
			this.modeTempIndex = event.index
			this.situactionData.props.target.temperature = event.key
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
			this.temperatureList.push({ value: index, key: "" + index })
		}
		nativeService.getItem("CARD_STORAGE_SITUATION", (resp) => {
			if (resp.result == 'success') {
				this.situactionData = JSON.parse(resp.data) || {}
				this.deviceId = this.situactionData.deviceId
				//设置默认值
				this.conditionTempIndex = this.situactionData.props.conditions[0].value - 17
				this.modeTempIndex = this.situactionData.props.target.temperature - 17
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
  background-color: #ffffff;
}
.header-group {
  padding-left: 32px;
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
