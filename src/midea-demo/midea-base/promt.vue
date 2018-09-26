<template>
    <div class="wrapper">
        <midea-header title="Promt" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="打开带输入框的对话框" @mideaButtonClicked="openRenameDialog">
        </midea-button>

        <midea-promt :title="nameTitle" ref="promt" :placeholder="namePlaceholder" :inputValue="inputName" :show="show" @okClicked="confirmRename" @onPromtClose="onPromtClose" @onPromtInput="onPromtInput">
        </midea-promt>

    </div>
</template>
<style scoped>
.wrapper {
  background-color: #f2f2f2;
}
</style>
<script>  
import base from '../base'

import mideaButton from '@/midea-component/button.vue'
import mideaPromt from '@/component/promt.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaPromt },
    mixins: [base],
    data() {
        return {
            show: false,
            inputName: "",
            namePlaceholder: "请输入设备名称",
            nameTitle: "设备重命名"
        }
    },
    methods: {
        onPromtClose(val) {
            this.show = false;
        },
        onPromtInput(val) {
            this.inputName = val;
        },
        openRenameDialog(event) {
            this.show = true;
            //this.inputName=this.deviceDetail.devName;
        },
        confirmRename() {
            this.show = false;
            nativeService.toast("输入值：" + this.inputName);
        }
    },
    created() {
        this.isIos = weex.config.env.platform == 'iOS' ? true : false;
    }
};
</script>