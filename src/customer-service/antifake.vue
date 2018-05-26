<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller>
            <image class="advertisement" src="./assets/img/progress.png" resize='contain'></image>

            <div class="item-group">
                <text class="info-title">滤芯防伪查询</text>
            </div>

            <div class="item-group scan-group">
                <input class="scan-input" type="text" placeholder="请输入编号或扫描二维码" :autofocus=false :value="code" @input="oninput" />

                <image class="scan-icon" src="./assets/img/progress.png" resize='contain' @click="scanCode"></image>
            </div>

            <div class="item-group scan-group">
                <input class="scan-input" type="text" placeholder="请输入4位验证码" :autofocus=false :value="validCode" @input="onValidCodeinput" />
            </div>
            <div class="item-group">
                <text class="info-label">适用于生产日期2017年7月1日之后的滤芯</text>
            </div>

            <div class="action-bar">
                <midea-button text="提交" type="green" :btnStyle="{'background-color': '#267AFF','border-radius': '4px'}" @mideaButtonClicked="submit">
                </midea-button>
            </div>
        </scroller>
        <midea-dialog :title="result.message" mainBtnColor="#267AFF" secondBtnColor="#267AFF" :show="dialogShow" cancelText="否" confirmText="确定" @mideaDialogCancelBtnClicked="dialogConfirm" @mideaDialogConfirmBtnClicked="dialogConfirm" single=true>
        </midea-dialog>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService';

import { MideaButton, MideaDialog } from '@/index'

export default {
    components: {
        MideaButton,
        MideaDialog
    },
    mixins: [base],
    data() {
        return {
            title: '滤芯防伪',
            code: '',
            validCode: '',
            result: {
                message: ''
            },
            dialogShow: false
        }
    },
    methods: {
        oninput(event) {
            this.code = event.value
        },
        scanCode() {
            nativeService.scanCode().then(
                (resp) => {
                    if (resp.status == 0) {
                        this.code = resp.data.substr(resp.data.lastIndexOf('/') + 1)
                    }
                }
            )
        },
        onValidCodeinput(event) {
            this.validCode = event.value
        },
        submit() {
            let url = "http://wap.cjm.so/Common/DataService.ashx?function=AntiFakeQuery&CorpID=14500&Code=" + this.code + this.validCode + "&QueryType=2"
            let param = {
                method: 'GET',
                url: url,
                type: 'jsonp',
                headers: { 'Content-Type': 'application/json' }
            }
            nativeService.sendHttpRequest(param).then(
                (resp) => {
                    this.result = resp
                    if (resp.success && resp.result.ResultID) {
                        nativeService.setItem("antifakeResult", resp, (resp) => {
                            this.goTo('antifakeResult')
                        })
                    } else {
                        this.dialogShow = true
                    }
                }
            ).catch((error) => {
                this.result.message = "请求失败，请稍后重试。"
                this.dialogShow = true
            })
        },
        dialogConfirm() {
            this.dialogShow = false
        }
    },
    created() {

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
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
  background-color: #ffffff;
}
.info-title {
  font-family: PingFangSC-Medium;
  font-size: 28px;
  color: #000000;
}
.scan-group {
  position: relative;
}
.scan-input {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  height: 72px;
  padding-left: 22px;
  padding-right: 50px;
  background-color: #fafafa;
}
.scan-icon {
  position: absolute;
  top: 40px;
  right: 50px;
  height: 40px;
  width: 40px;
}
.result-title {
  font-family: PingFangSC-Medium;
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
}
</style>
