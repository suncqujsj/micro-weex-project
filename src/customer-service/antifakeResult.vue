<template>
    <div class="wrapper">
        <midea-header :title="title" :isImmersion="isipx?false:true" @headerClick="headerClick" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <scroller class="scroller">
            <div class="base-group">
                <div class="item-group">
                    <text class="info-title">查询信息</text>
                </div>

                <div class="item-group antifake-result-body-row">
                    <text class="antifake-result-label">总共查询次数:</text>
                    <text class="antifake-result-desc result-count">{{result.QueryCount}}</text>
                    <text class="antifake-result-desc">次{{result.QueryCount>1?' (该码已被查询过，请谨防假冒)':''}}</text>
                </div>
                <div class="item-group antifake-result-body-row">
                    <text class="antifake-result-label">首次查询时间:</text>
                    <text class="antifake-result-desc">{{firstQueryTimeDesc}}</text>
                </div>
                <div class="item-group antifake-result-body-row">
                    <text class="antifake-result-label">企业名称:</text>
                    <text class="antifake-result-desc">美的集团股份有限公司</text>
                </div>
                <div class="item-group antifake-result-body-row last-row">
                    <text class="antifake-result-label">品牌名称:</text>
                    <text class="antifake-result-desc">美的</text>
                </div>
            </div>

            <!-- <div class="base-group">
                <div class="item-group">
                    <text class="info-title">综合停伪技术</text>
                </div>
                <div class="item-group">
                    <image class="antifake-footer-img" src="./assets/img/servie_pic_service@3x.png" resize='contain'>
                    </image>
                </div>
                <div class="item-group">
                    <text class="antifake-footer-desc">查询小贴士:xxxxxx</text>
                </div>
            </div> -->
        </scroller>

        <empty-dialog :show="dialogShow">
            <div slot="content">
                <div class="dialog-result group-bottom-border">
                    <div class="dialog-result-row">
                        <text class="dialog-result-count">{{result.QueryCount}}</text>
                        <text class="dialog-result-count-desc">次</text>
                    </div>
                    <text class="dialog-result-count-title">{{resultMessage}}</text>
                    <text class="dialog-result-desc">尊敬的客户你好，您所查询的是</text>
                    <text class="dialog-result-desc">{{code}}</text>
                </div>
                <div class="dialog-result-footer" @click="dialogShow=false">
                    <text class="dialog-result-btn">确认</text>
                </div>
            </div>
        </empty-dialog>

    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService'
import { MideaButton } from '@/index'
import EmptyDialog from '@/customer-service/components/emptyDialog.vue'

const clipboard = weex.requireModule('clipboard')

export default {
    components: {
        EmptyDialog
    },
    mixins: [base],
    data() {
        return {
            title: '滤芯防伪',
            dialogShow: false,
            code: '',
            result: {}
        }
    },
    computed: {
        firstQueryTimeDesc() {
            let firstQueryTime = this.result.FirstQueryTime
            let timeObj = new Date(firstQueryTime)
            return timeObj.getFullYear() + '年' + (timeObj.getMonth() + 1) + '月' + timeObj.getDate() + '日 ' + timeObj.getHours() + ':' + timeObj.getMinutes()
        },
        resultMessage() {
            if (this.result.QueryCount == 1) {
                return "该码第1次被查询，是美的正品"
            } else if (this.result.QueryCount > 1) {
                return "该码已被查询过，请谨防假冒"
            }
        }
    },
    methods: {
        showDialog(index) {
            this.dialogShow = true
        },
        dialogConfirm() {
            this.dialogShow = false
        }
    },
    created() {
        nativeService.getItem(this.SERVICE_STORAGE_KEYS.antifakeResult, (resp) => {
            let result = JSON.parse(resp.data)
            this.result = result.result
            this.code = result.code
            this.showDialog()
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
  padding-bottom: 24px;
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
.last-row {
  padding-bottom: 32px;
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
  padding-bottom: 32px;
}
.dialog-result {
  padding: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dialog-result-row {
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}
.dialog-result-count {
  font-family: PingFangSC-Regular;
  font-size: 48px;
  color: #ff3b30;
}
.dialog-result-count-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  padding-bottom: 10px;
}
.dialog-result-count-title {
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 32px;
  color: #000000;
  text-align: center;
  padding-top: 18px;
  padding-bottom: 8px;
}
.dialog-result-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  padding-top: 10px;
}
.dialog-result-footer {
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 89px;
}
.dialog-result-btn {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #267aff;
}
</style>
