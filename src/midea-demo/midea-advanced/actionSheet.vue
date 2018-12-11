<template>
    <div class="wrapper">
        <midea-header title="actionSheet" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="操作面板" @mideaButtonClicked="openActionsheet">
        </midea-button>

        <midea-actionsheet :items="actionsheetItems" :index="selectedIndex" :show="showBar" @close="closeActionsheet" @itemClick="actionsheetItemClick" @btnClick="actionsheetBtnClick" ref="actionsheet"></midea-actionsheet>
    </div>
</template>
<style scoped>

</style>
<script>  

import base from '../base'
import mideaActionsheet from '@/midea-component/actionsheet.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal');

export default {
    components: { mideaActionsheet, mideaButton },
    mixins: [base],
    data() {
        return {
            showBar: false,
            actionsheetItems: ['风速调节', '模式控制'],
            selectedIndex: null
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
            this.selectedIndex = event.index
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