<template>
    <div class="wrapper">
        <midea-header title="Radio" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div style="padding:24px">
            <text style="font-size:28px">当前选中 {{checkedInfo.title}}</text>
        </div>
        <midea-radio-list :list="list" :needShowTopBorder="true" @mideaRadioItemChecked="itemChecked"></midea-radio-list>
        <div style="padding:24px">
            <text style="font-size:28px">当前选中 {{checkedImgInfo.title}}</text>
        </div>
        <div style="border-bottom-width:1px;border-bottom-color:#e2e2e2;border-top-width:1px;border-top-color:#e2e2e2;padding-left:24px;background-color:#fff">
            <midea-radio-list :list="list1" :needShowTopBorder="false" :needShowLastBottomBorder="false" @mideaRadioItemChecked="imgItemChecked"></midea-radio-list>
        </div>
    </div>
</template>
<style scoped>
.wrapper {
  background-color: #f2f2f2;
}
</style>
<script>  
import base from '../base'

import mideaRadioList from '@/component/radioList.vue'
import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal');

module.exports = {
    components: { mideaRadioList },
    mixins: [base],
    data() {
        return {
            list: [
                { title: '选项1', value: 1 },
                { title: '选项2', value: 2, checked: true },
                { title: '选项3', value: 3 },
                { title: '选项4', value: 4 }
            ],
            list1: [
                { title: '一路开关面板', value: 1, itemImg: "http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.001.png" },
                { title: '二路开关面板', value: 2, checked: true, itemImg: "http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.002.png" },
                { title: '三路开关面板', value: 3, itemImg: "http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.003.png" },
                { title: '四路开关面板', value: 4, itemImg: "http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/jiayun.switch.004.png" }
            ],
            checkedInfo: { title: '选项2', value: 2 },
            checkedImgInfo: { title: '二路开关面板', value: 2 }
        }
    },
    methods: {
        itemChecked(e) {
            this.checkedInfo = e;
        },
        imgItemChecked(e) {
            this.checkedImgInfo = e;
        }

    },
    created() {
        this.isIos = weex.config.env.platform == 'iOS' ? true : false;
    }
};
</script>