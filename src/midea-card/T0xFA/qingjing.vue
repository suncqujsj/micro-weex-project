<template>
    <div class="wrapper">
        <midea-header :title="title" :isImmersion="isipx?false:true" @leftImgClick="back">
        </midea-header>
        <scroller class="content-wrapper" v-if="situactionData">
            <div class="base-group header-group">
                <text class="header-title">{{situationDesc.title}}</text>
                <text class="header-desc">{{situationDesc.detail}}</text>
            </div>
            <div class="base-group">
				<midea-cell placeHolder="请选择" :rightText="situactionData.props.time" @mideaCellClick="selectSleepTemp" :hasSubBottomBorder="false">
					<div slot="title" class="cell-title">
						<text class="cell-label">睡眠时间</text>
					</div>
				</midea-cell>
            </div>

            <div class="action-bar">
                <midea-button text="保存" @mideaButtonClicked="submit"></midea-button>
            </div>
        </scroller>
    </div>
</template>

<script>
import nativeService from '@/common/services/nativeService.js'
import situationBase from '@/midea-card/midea-components/situationBase'
const picker = weex.requireModule('picker')

import MideaButton from '@/midea-component/button2.vue'
import MideaCell from '@/midea-component/cell2.vue'
import MideaHeader from '@/midea-component/header.vue'

// import { MideaHeader, MideaCell, MideaButton } from '@/index'

export default {
    components: {
        MideaHeader,
        MideaCell,
        MideaButton
    },
    mixins: [situationBase],
    data() {
        return {
            title: '情境设置',
            situactionData: null
        }
    },
    computed: {
        isipx: function () {
            return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6');
        },
        situationDesc() {
            let result = {
                title: "睡觉时自动启用睡眠模式",
                detail: "自然风，摇头"
            }
            return result
        },
    },
    methods: {
        selectSleepTemp() {
            picker.pickTime({
                'value': this.situactionData.props.value,
                'title': '选择时间', //取消和确定中间那标题
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#020F13', //取消颜色
                'confirmTxtColor': '#020F13', //标题颜色
                'titleColor': '#020F13', //标题颜色
                'titleBgColor': '#E7EDEF' //标题栏颜色
            }, event => {
                if (event.result === 'success') {
                    this.situactionData.props.time = event.data;
                }
            })
        },

        submit() {
            this.submitSituationService(this.situactionData).then((resp) => {
                if (resp.code == 0) {
                    nativeService.toast("保存成功")
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
        nativeService.getItem("CARD_STORAGE_SITUATION", (resp) => {
            if (resp.result == 'success') {
                this.situactionData = JSON.parse(resp.data) || {}
                this.deviceId = this.situactionData.deviceId
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
