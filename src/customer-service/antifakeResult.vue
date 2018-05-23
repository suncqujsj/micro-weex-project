<template>
    <div>
        <midea-header :title="title" @leftImgClick="back"></midea-header>
        <scroller class="scroller">
            <div class="antifake-result-body  group-bottom-border">
                <text class="group-title">查询信息</text>
                <div class="antifake-result-body-row">
                    <text class="antifake-result-label">总共查询次数:</text>
                    <text class="antifake-result-desc">3次(改码已被查询过，请谨防假冒)</text>
                </div>
                <div class="antifake-result-body-row">
                    <text class="antifake-result-label">首次查询时间:</text>
                    <text class="antifake-result-desc">2018年8月8日 12:12</text>
                </div>
                <div class="antifake-result-body-row">
                    <text class="antifake-result-label">企业名称:</text>
                    <text class="antifake-result-desc">广东阿斯蒂芬法师打发</text>
                </div>
                <div class="antifake-result-body-row">
                    <text class="antifake-result-label">品牌名称:</text>
                    <text class="antifake-result-desc">美的</text>
                </div>
            </div>

            <div class="antifake-result-footer">
                <text class="group-title">综合停伪技术</text>
                <image class="antifake-result-img" src="./assets/img/progress.png" resize='contain'>
                </image>
                <text class="antifake-result-desc">查询小贴士:xxxxxx</text>
            </div>
        </scroller>

        <midea-dialog title="改码已被查询过，请谨防假冒" :show="dialogShow" @close="closeDialog" @mideaDialogCancelBtnClicked="dialogConfirm" @mideaDialogConfirmBtnClicked="dialogConfirm" content="尊敬的客户您好，你所查询的是：xxxxx" :single="true">
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
            dialogShow: true
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
        },
        callService(index) {
            nativeService.callTel({
                tel: this.order.tel,
                title: '网点客户服务',
                desc: '拨打网点热线电话：' + this.order.tel
            }).then(
                (resp) => { }
            ).catch((error) => {
                nativeService.toast(error)
            })
        }
    },
    created() {
        nativeService.getItem("antifakeResult", (resp) => {
            nativeService.toast(resp)
        })
    }
}
</script>

<style>
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
  padding-top: 8px;
  padding-bottom: 8px;
}
.group-bottom-border {
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
.antifake-result-label {
  width: 200px;
  font-size: 26px;
  text-align: right;
  padding-right: 15px;
}
.antifake-result-desc {
  flex: 1;
  font-size: 26px;
}
.antifake-result-footer {
  width: 750px;
  flex-direction: column;
  justify-content: center;
  padding-top: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  padding-left: 50px;
  margin-top: 50px;
}
.antifake-result-img {
  width: 650px;
  height: 300px;
}
</style>
