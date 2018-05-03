<template>
    <div class="wrapper">
        <midea-header title="Button按钮" :isImmersion="false" @leftImgClick="back"></midea-header>
        <midea-button text="操作面板" type="green" @mideaButtonClicked="openActionsheet">
        </midea-button>

        <midea-actionsheet :items="actionsheetItems" :show="showBar" @close="closeActionsheet" @itemClick="actionsheetItemClick" @btnClick="actionsheetBtnClick" ref="actionsheet"></midea-actionsheet>
    </div>
</template>
<style scoped>

</style>
<script>  

import base from './base'
import mideaActionsheet from '@/component/actionsheet.vue'
import mideaButton from '@/component/button.vue'
import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal');

export default {
    components: { mideaActionsheet, mideaButton },
    mixins: [base],
    data() {
        return {
            showBar: false,
            actionsheetItems: ['风速调节', '模式控制']
        }
    },
    methods: {
        //打开上拉菜单
        "openActionsheet": function () {
            this.showBar = true;
            this.$nextTick(e => {
                this.$refs.actionsheet.open();
            });
        },
        //关闭事件
        "closeActionsheet": function () {
            this.showBar = false;
        },
        //点击某个item的事件
        "actionsheetItemClick": function (event) {
            nativeService.toast(event.item)
            this.showBar = false;
        },
        //点击取消/确定按钮事件
        "actionsheetBtnClick": function () {
            this.showBar = false;
        }
    },
    created() {
        this.isIos = weex.config.env.platform == 'iOS' ? true : false;
    }
};
</script>