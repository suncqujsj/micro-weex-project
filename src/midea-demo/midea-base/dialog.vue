<template>
    <div class="wrapper">
        <midea-header title="Dialog" :isImmersion="isImmersion" @leftImgClick="back"></midea-header>
        <midea-button text="打开对话框" type="green" @mideaButtonClicked="openDialog">
        </midea-button>

        <midea-button text="仅带确认按钮对话框" type="green" @mideaButtonClicked="openSingleDialog">
        </midea-button>

        <midea-dialog title="使用协议" :show="show" @close="closeDialog" @mideaDialogCancelBtnClicked="mideaDialogConfirmBtnClicked" @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked" content="美的智慧生活解决方案" :single="single">
        </midea-dialog>

    </div>
</template>
<style scoped>
.wrapper {
  align-items: center;
}
</style>
<script>  
import base from '../base'

import mideaButton from '@/midea-component/button.vue'
import mideaDialog from '@/component/dialog.vue';

module.exports = {
    components: { mideaButton, mideaDialog },
    mixins: [base],
    data() {
        return {
            show: false,
            single: false
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
        }
    },
    created() {
        this.isIos = weex.config.env.platform == 'iOS' ? true : false;
    }
};
</script>