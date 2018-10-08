<template>
    <div class="wrapper">
        <midea-header title="Dialog" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="打开对话框" @mideaButtonClicked="openDialog">
        </midea-button>

        <midea-button text="仅带确认按钮对话框" @mideaButtonClicked="openSingleDialog">
        </midea-button>

        <midea-dialog title="使用协议" :show="show" @close="closeDialog" @mideaDialogCancelBtnClicked="mideaDialogConfirmBtnClicked" @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked" content="美的智慧生活解决方案" :single="single">
        </midea-dialog>

        <midea-button text="自定义格式" @mideaButtonClicked="openCustomeDialog">
        </midea-button>

        <midea-dialog :show="showCustome" @close="closeCustomeDialog" @mideaDialogCancelBtnClicked="closeCustomeDialog" @mideaDialogConfirmBtnClicked="closeCustomeDialog">
            <div slot="content">
                <text class="custom-content">是否启动香浓粥？</text>
                <midea-rich-text :hasTextMargin="false" :textStyle="{'justify-content': 'center'}" :config-list="richDesc"></midea-rich-text>
            </div>
        </midea-dialog>
    </div>
</template>
<style scoped>
.wrapper {
  background-color: #f2f2f2;
}
.custom-content {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  text-align: center;
  padding-bottom: 10px;
}
</style>
<script>  
import base from '../base'

import mideaButton from '@/midea-component/button.vue'
import mideaDialog from '@/midea-component/dialog.vue'
import MideaRichText from '@/midea-component/wxc-rich-text'

module.exports = {
    components: { mideaButton, mideaDialog, MideaRichText },
    mixins: [base],
    data() {
        return {
            show: false,
            single: false,
            showCustome: false,
            richDesc: [
                {
                    type: 'text',
                    value: '约用时',
                    style: {
                        fontSize: 32,
                        color: '#000000'
                    }
                },
                {
                    type: 'text',
                    value: '30',
                    style: {
                        fontSize: 32,
                        color: '#267aff'
                    }
                },
                {
                    type: 'text',
                    value: '分钟',
                    style: {
                        fontSize: 32,
                        color: '#000000'
                    }
                }
            ]
        }
    },
    methods: {
        openDialog() {
            this.single = false;
            this.show = true;
        },
        openSingleDialog() {
            this.single = true;
            this.show = true;
        },
        mideaDialogConfirmBtnClicked() {
            this.show = false;
        },
        mideaDialogConfirmBtnClicked() {
            this.show = false;
        },
        closeDialog() {
            this.show = false;
        },
        openCustomeDialog() {
            this.showCustome = true;
        },
        closeCustomeDialog() {
            this.showCustome = false;
        },
    },
    created() {
        this.isIos = weex.config.env.platform == 'iOS' ? true : false;
    }
};
</script>