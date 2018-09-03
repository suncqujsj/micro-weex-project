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
                <midea-cell placeHolder="请选择" :rightText="situactionData.props.value" @mideaCellClick="selectConditionTemp" :hasSubBottomBorder="false">
                    <div slot="title" class="cell-title">
                        <text class="cell-label">提醒间隔</text>
                    </div>
                </midea-cell>
            </div>

            <div class="action-bar">
                <midea-button text="保存" @mideaButtonClicked="submit"></midea-button>
            </div>
        </scroller>

        <midea-select :show="isShowConditionTemp" title="选择间隔" :items="temperatureList" :index="conditionTempIndex" @close="isShowConditionTemp=false" @itemClick="conditionTempItemClick"></midea-select>
    </div>
</template>

<script>
import nativeService from '@/common/services/nativeService.js'
import situationBase from '@/midea-card/midea-components/situationBase'

import MideaButton from '@/midea-component/button2.vue'
import MideaCell from '@/midea-component/cell2.vue'
import MideaHeader from '@/midea-component/header.vue'
import MideaSelect from '@/midea-component/mSelect.vue'

// import { MideaHeader, MideaCell, MideaButton, MideaSelect } from '@/index'

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

            isShowConditionTemp: false,
            conditionTempIndex: null,
            temperatureList: []
        }
    },
    computed: {
        isipx: function () {
            return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6');
        },
        situationDesc() {
            let result = {
                title: '',
                detail: ''
            }

            if (this.situactionData) {
                result = {
                    title: "每" + this.situactionData.props.value + "周提醒清洁冰箱内侧",
                    detail: "开启后， 每" + this.situactionData.props.value + "周提醒一次待清洁信息；关闭后，不再显示"
                }
            }

            return result
        },
    },
    methods: {

        selectConditionTemp() {
            this.isShowConditionTemp = true
        },
        conditionTempItemClick(event) {
            this.conditionTempIndex = event.index
            this.situactionData.props.value = event.key
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
        for (let index = 1; index <= 24; index++) {
            this.temperatureList.push({ value: index, key: index }, )
        }
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
