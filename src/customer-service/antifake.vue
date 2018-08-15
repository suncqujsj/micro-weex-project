<template>
    <div class="wrapper">
        <midea-header :title="title" :isImmersion="isImmersion" @headerClick="headerClick" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller>
            <image class="advertisement" src="./assets/img/service_img_gangwei@3x.png" resize='contain'></image>

            <div class="item-group">
                <text class="info-title">滤芯防伪查询</text>
            </div>

            <div class="item-group">
                <scan-input placeholder="请输入编号或扫描二维码" v-model="code" @scanCode="scanCode"></scan-input>
            </div>

            <div class="item-group">
                <input class="item-input" type="number" placeholder="请输入4位验证码" v-model="validCode" maxlength="4" @return="submit" />
            </div>

            <div class="item-group" v-if="successCount>=3 || failedCount>=3">
                <input class="item-input" type="text" placeholder="请输入图形验证码" v-model="picCode" maxlength="4" @return="submit" />
                <image class="validate-img" :src="picCodeSrc" resize='contain' @click="antiValidateCode()"></image>
            </div>
            <div class="item-group">
                <text class="info-label">适用于生产日期2017年7月1日之后的滤芯</text>
            </div>

            <div class="action-bar">
                <midea-button text="查询" type="secondary" :disabled="!isDataReady" @mideaButtonClicked="submit"></midea-button>
            </div>
        </scroller>
        <midea-dialog :title="result.message" mainBtnColor="#267AFF" secondBtnColor="#267AFF" :show="dialogShow" cancelText="否" confirmText="确认" @mideaDialogCancelBtnClicked="dialogConfirm" @mideaDialogConfirmBtnClicked="dialogConfirm" :single="true">
        </midea-dialog>

    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService'

import MideaButton from '@/midea-component/button2.vue'
import MideaDialog from '@/component/dialog.vue'
import ScanInput from '@/customer-service/components/scanInput.vue'

export default {
    components: {
        MideaButton,
        MideaDialog,
        ScanInput
    },
    mixins: [base],
    data() {
        return {
            title: '滤芯防伪',
            code: '',
            validCode: '',
            successCount: 0,
            failedCount: 0,
            picCode: '',
            picCodeSrc: '', //http://wap.cjm.so/Common/ValidateCode.ashx?Type=&Demand=&w=&h=&r=
            picCodeSrcRadom: '',
            result: {
                message: ''
            },
            dialogShow: false
        }
    },
    computed: {
        isDataReady() {
            return this.code && this.validCode && (this.successCount < 3 || this.picCode) && (this.failedCount < 3 || this.picCode)
        }
    },
    methods: {
        scanCode(result) {
            this.code = result.substr(result.lastIndexOf('/') + 1)
        },
        refreshPicCode() {
            this.picCodeSrcRadom = Math.random().toString().replace('.', '')
        },
        antiValidateCode() {
            nativeService.antiValidateCode().then((resp) => {
                this.picCodeSrc = "data:image/png;base64," + resp.data.ValidateCode
            })
        },
        submit() {
            if (!this.isDataReady) return

            if (this.validCode.length != 4) {
                this.result.message = "验证码必须为4位"
                this.dialogShow = true
                return
            }
            let param = {
                Code: this.code + this.validCode
            }
            if (this.successCount > 2 || this.failedCount > 2) {
                param.Validate = this.picCode
            }
            nativeService.antiFakeQuery(param).then(
                (resp) => {
                    this.result = resp
                    if (resp.success && resp.result.ResultID) {
                        nativeService.setItem(this.SERVICE_STORAGE_KEYS.antifakeResult, Object.assign({
                            code: this.code
                        }, resp), (resp) => {
                            this.successCount++
                            if (this.successCount > 2) {
                                this.antiValidateCode()
                            }
                            this.picCode = ""
                            this.goTo('antifakeResult')
                        })
                    } else {
                        if (this.result.message == '码不存在') {
                            this.result.message = "滤芯编码错误或者校验码错误，请重新输入。"
                        }
                        this.failedCount++
                        if (this.failedCount > 2) {
                            this.antiValidateCode()
                        }
                        this.dialogShow = true
                    }
                }
            ).catch((error) => {
                this.result.message = error || "请求失败，请稍后重试。"
                this.dialogShow = true
            })
        },
        dialogConfirm() {
            this.dialogShow = false
        }
    },
    created() {
        nativeService.burialPoint({
            pageName: 'serviceAntiFakePage',
            subAction: 'page_view'
        })
    }
}
</script>

<style>
.wrapper {
  background-color: #ffffff;
  position: relative;
}
.advertisement {
  width: 750px;
  height: 428px;
  background-color: #ffffff;
}
.base-group {
  padding-top: 24px;
  background-color: #f2f2f2;
}
.item-group {
  flex-direction: row;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 32px;
  background-color: #ffffff;
}
.item-input {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  height: 72px;
  padding-left: 22px;
  padding-right: 60px;
  background-color: #fafafa;
}
.validate-img {
  border-color: #e5e5e8;
  border-top-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  flex: 180px;
  height: 72px;
  width: 180px;
  margin-left: 22px;
}
.info-title {
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 28px;
  color: #000000;
}
.result-title {
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 32px;
  color: #000000;
  padding-bottom: 24px;
}
.result-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  padding-bottom: 32px;
}
.info-label {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
}
.action-bar {
  background-color: #ffffff;
  width: 750px;
  text-align: center;
  padding-bottom: 50px;
  padding-left: 32px;
  padding-right: 32px;
}
.action-btn {
  flex: 1;
  border-radius: 4px;
  border-color: #267aff;
  border-width: 1px;
  justify-content: center;
  align-items: center;
  height: 84px;
  margin-top: 32px;
}
.action-btn-disable {
  border-color: #e5e5e8;
}
.action-btn-text {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #267aff;
  text-align: center;
}
.action-btn-text-disable {
  color: #e5e5e8;
}
</style>
