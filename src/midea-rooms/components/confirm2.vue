<template>
    <midea-popup ref="popup" :show="show" @mideaPopupOverlayClicked="cancel" pos="bottom" :height="height">
        <div class="wrap">
            <slot></slot>
            <div class="confirm-buttons row-sb">
                <div class="confirm-button-left" @click="leftBtnClick"><text class="left-button">{{leftBtnText}}</text></div>
                <div class="confirm-button-right" @click="rightBtnClick"><text class="right-button">{{rightBtnText}}</text></div>
            </div>
        </div>
        
    </midea-popup>
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
    .wrap{ background-color: #f2f2f2; }
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .confirm-buttons{
        background-color: #fff;
        margin-top: 30px;
        padding-top: 25px;
        padding-bottom: 25px;
    }
    .confirm-button-left, .confirm-button-right{
        width: 375px;
        flex:1;
        padding-top: 15px;
        padding-bottom: 15px;
        align-items: center;
        text-align: center;
    }
    .confirm-button-left {
        border-right-width: 1px;
        border-right-color: #C8C7CC;
    }
    .left-button {
        font-size: 32px;
        color: #666;
    }

    .right-button {
        font-size: 32px;
        color: #000;
    }

</style>
