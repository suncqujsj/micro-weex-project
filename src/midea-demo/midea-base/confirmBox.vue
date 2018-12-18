<template>
    <div class="wrapper">
        <midea-header title="confirmBox 确认/取消容器" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller class="scroller">
            <div>
                <text class="padding5">confirmBox是一个弹窗容器，有取消和确认两个按钮，点击背景遮罩也可以关闭弹窗</text>
                <text class="padding5">使用时可以动态插入自定义内容，如简单文字，复杂内容或者自定义组件等，具体可以点击下方按钮查看</text>
            </div>
            <midea-button text="打开弹窗：简单文字" @mideaButtonClicked="showBox(1)"></midea-button>
            <midea-button text="打开弹窗：复杂内容（如可以滚动的内容）" @mideaButtonClicked="showBox(2)"></midea-button>
            <midea-button text="打开弹窗：组件（如滚动选择器）" @mideaButtonClicked="showBox(3)"></midea-button>
        </scroller>
    
        <midea-confirm-box :show="show[1]" @leftBtnClick="cancel(1)" @rightBtnClick="confirm(1)" @mideaPopupOverlayClicked="close(1)">
            <text class="padding20">内容为文字 内容为文字 内容为文字 内容为文字 内容为文字 内容为文字 </text>
        </midea-confirm-box>
        <midea-confirm-box :show="show[2]" @leftBtnClick="cancel(2)" @rightBtnClick="confirm(2)" @mideaPopupOverlayClicked="close(2)">
            <scroller>
                <text class="hd">标题文字</text>
                <div class="bd">
                    <text class="padding14">内容内容内容</text>
                    <text class="padding14">内容内容内容</text>
                    <text class="padding14">内容内容内容</text>
                    <text class="padding14">内容内容内容</text>
                    <text class="padding14">内容内容内容</text>
                    <text class="padding14">内容内容内容</text>
                    <text class="padding14">内容内容内容</text>
                </div>
            </scroller>
        </midea-confirm-box>
        <midea-confirm-box :show="show[3]" @leftBtnClick="cancel(3)" @rightBtnClick="confirm(3)" @mideaPopupOverlayClicked="close(3)">
            <div class="scroll-picker-wrap">
                <midea-scroll-picker :listArray="list"></midea-scroll-picker>
            </div>
        </midea-confirm-box>
    </div>
</template>
<style scoped>
    .wrapper {
    background-color: #f2f2f2;
    }
    .scroller {
    padding-top: 20px;
    padding-bottom: 50px;
    }
    .padding5{
        padding: 5px;
    }
    .bd {
      padding-left: 32px;
      padding-right: 32px;
    }
    .padding14{
        padding-top: 14px;
        padding-bottom: 14px;
        font-size: 32px;
    }
    .padding20{
        padding-top: 20px;
        padding-left: 32px;
        padding-right: 32px;
        font-size: 32px;
    }
    .hd{
        padding-top: 20px;
        padding-left: 32px;
        padding-right: 32px;
        font-size: 40px;
    }
    .scroll-picker-wrap{
        padding-top: 30px;
        padding-bottom: 16px;
        height: 458px;
        background-color: #ffffff;
    }
</style>
<script>  

import base from '../base'
import mideaButton from '@/midea-component/button.vue'
import mideaConfirmBox from '@/midea-component/confirmBox.vue'
import mideaScrollPicker from '@/midea-component/scrollPicker.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaConfirmBox, mideaScrollPicker, mideaButton },
    mixins: [base],
    data() {
        return {
            show: {
                1: false,
                2: false,
                3: false,
            },
            list: [
                {index:0, value:0},
                {index:1, value:1},
                {index:2, value:2},
                {index:3, value:3},
                {index:4, value:4},
                {index:5, value:5},
                {index:6, value:6},
                {index:7, value:7},
                {index:8, value:8},
                {index:9, value:9},
           ],
        }
    },
    methods: {
        showBox(index){
            this.show[index] = true
        },
        cancel(index){
            this.show[index] = false
            nativeService.toast('您点击了取消')
        },
        confirm(index){
            this.show[index] = false
            nativeService.toast('您点击了确定')
        },
        close(index){
            this.show[index] = false
        }
    },
    created() {
    }
};
</script>