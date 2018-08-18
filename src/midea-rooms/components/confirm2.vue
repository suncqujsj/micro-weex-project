<template>
    <!-- <midea-popup ref="popup" :show="show" @mideaPopupOverlayClicked="cancel" pos="bottom" :height="height">
        <div class="wrap" :style="{height: height+ 'px'}">
            <div class="slot-floor">
                <slot></slot>
            </div>
            <div class="confirm-buttons row-sb">
               <text class="left-button">{{leftBtnText}}</text>
                <text class="right-button">{{rightBtnText}}</text>
            </div>
        </div>
    </midea-popup> -->
    <div v-if="show" class="bg" @click="cancel2">
        <div class="wrap" :style="{height: height+ 'px'}">
            <div class="slot-floor">
                <slot></slot>
            </div>
            <div class="confirm-buttons row-sb">
               <text class="left-button" @click="leftBtnClick">{{leftBtnText}}</text>
                <text class="right-button" @click="rightBtnClick">{{rightBtnText}}</text>
            </div>
        </div>
    </div>
</template>

<script>
import nativeService from '@/common/services/nativeService.js'

import MideaPopup from '@/midea-component/popup.vue'

const dom = weex.requireModule('dom')

export default {
    components: {
        MideaPopup
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        height: {
            type: Number,
            default: 570
        },
        leftBtnText: {
            type: String,
            default: '取消'
        },
        rightBtnText: {
            type: String,
            default: '确定'
        },
    },
    data() {
        return {

        }
    },
    computed: {
    },
    methods: {
        cancel() {
            this.$emit('mideaPopupOverlayClicked')
        },
        cancel2() {
            this.show = false
            this.$emit('mideaPopupOverlayClicked')
        },
        leftBtnClick () {
            this.$emit('leftBtnClick');
        },
        rightBtnClick () {
            this.$emit('rightBtnClick');
        },
    },
    mounted() {
    },
    created() {
    }
}
</script>

<style>
    .bg{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0, 0.6)
    }
    .wrap{
        background-color: #f2f2f2;
        width:750px;
        position: fixed;
        bottom: 0;
    }
    .slot-floor{
        width: 750px;
        height: 500px;
        background-color: #f2f2f2;
    }
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .confirm-buttons{
        position: fixed;
        height: 120px;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        /* padding-top: 25px;
        padding-bottom: 25px; */
    }
    .left-button, .right-button {
        width: 375px;
        margin-top: 20px;
        margin-bottom: 20px;
        height: 80px;
        padding-top: 24px;
        flex:1;
        align-items: center;
        text-align: center;
    }
    .left-button {
        font-size: 32px;
        color: #666;
        border-right-width: 1px;
        border-right-color: #e5e5e5;
    }

    .right-button {
        font-size: 32px;
        color: #000;
    }

</style>
