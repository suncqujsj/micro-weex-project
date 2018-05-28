<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller class="scroller">
            <div class="base-group">
                <div class="item-group">
                    <text class="info-title">查询信息</text>
                </div>

                <div class="item-group antifake-result-body-row">
                    <text class="antifake-result-label">总共查询次数:</text>
                    <text class="antifake-result-desc result-count">{{result.result.QueryCount}}</text>
                    <text class="antifake-result-desc">次{{result.result.QueryCount>1?' (该码已被查询过，请谨防假冒)':''}}</text>
                </div>
                <div class="item-group antifake-result-body-row">
                    <text class="antifake-result-label">首次查询时间:</text>
                    <text class="antifake-result-desc">{{firstQueryTimeDesc}}</text>
                </div>
                <div class="item-group antifake-result-body-row">
                    <text class="antifake-result-label">企业名称:</text>
                    <text class="antifake-result-desc">美的集团股份有限公司</text>
                </div>
                <div class="item-group antifake-result-body-row">
                    <text class="antifake-result-label">品牌名称:</text>
                    <text class="antifake-result-desc">美的</text>
                </div>
            </div>

            <div class="base-group">
                <div class="item-group">
                    <text class="info-title">综合停伪技术</text>
                </div>
                <div class="item-group">
                    <image class="antifake-footer-img" src="./assets/img/servie_pic_banner03@3x.png" resize='contain'>
                    </image>
                </div>
                <div class="item-group">
                    <text class="antifake-footer-desc">查询小贴士:xxxxxx</text>
                </div>
            </div>
        </scroller>

        <midea-dialog :title="resultMessage" mainBtnColor="#267AFF" secondBtnColor="#267AFF" :show="dialogShow" cancelText="否" confirmText="我知道了" @mideaDialogCancelBtnClicked="dialogConfirm" @mideaDialogConfirmBtnClicked="dialogConfirm" single=true>
        </midea-dialog>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'
import { MideaDialog, MideaButton } from '@/index'

const clipboard = weex.requireModule('clipboard')

export default {
    components: {
        MideaDialog
    },
    mixins: [base],
    data() {
        return {
            title: '滤芯防伪',
            dialogShow: true,
            result: {}
        }
    },
    computed: {
        firstQueryTimeDesc() {
            let firstQueryTime = this.result.result.FirstQueryTime
            let timeObj = new Date(firstQueryTime)
            return timeObj.getFullYear() + '年' + (timeObj.getMonth() + 1) + '月' + timeObj.getDate() + '日 ' + timeObj.getHours() + ':' + timeObj.getMinutes()
        },
        resultMessage() {
            if (this.result.result.QueryCount == 1) {
                return "该码第一次被查询，是美的正品。"
            } else if (this.result.result.QueryCount > 1) {
                return "该码已被查询过，请谨防假冒。"
            }
        }
    },
    methods: {
        copyOrder(orderNo) {
            clipboard.setString(orderNo)
            nativeService.toast("复制单号成功")
        },
        checkAddress() {
            this.goTo('productSelection', {}, { from: 'orderList' })
        },
        urgeOrder(index) {
            nativeService.toast("催单成功")
        },
        renewOrder(index) {
            if (this.order.orderType == 1) {
                this.goTo("maintenance", {}, { id: this.order.id })
            } else {
                this.goTo("installation", {}, { id: this.order.id })
            }
        },
        showDialog(index) {
            this.dialogShow = true
        },
        dialogCancel() {
            this.dialogShow = false
        },
        dialogConfirm() {
            this.dialogShow = false
        }
    },
    created() {
        nativeService.getItem("antifakeResult", (resp) => {
            this.result = JSON.parse(resp.data)
        })
    }
}
</script>

<style>
.wrapper {
  background-color: #f5f5f5;
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
.antifake-result-body {
  width: 750px;
  flex-direction: column;
  justify-content: center;
  padding-top: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  padding-left: 50px;
  margin-top: 50px;
}
.antifake-result-body-row {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.group-bottom-border {
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
.antifake-result-label {
  width: 210px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  text-align: left;
}
.antifake-result-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
}
.result-count {
  font-size: 36px;
  color: #ff3b30;
}
.antifake-footer-img {
  width: 686px;
  height: 270px;
}
.antifake-footer-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  width: 686px;
  text-align: center;
}
</style>
