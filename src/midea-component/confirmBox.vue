<template>
    <div v-if="show" class="bg" @click="cancel">
        <div class="wrap" :style="{height: wrapHeight}">
            <div class="slot-floor">
                <slot></slot>
            </div>
            <div :class="['confirm-buttons', 'row-sb', isipx?'bottom-offset':'']">
                <text class="left-button" @click="leftBtnClick">{{leftBtnText}}</text>
                <text class="right-button" @click="rightBtnClick">{{rightBtnText}}</text>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
        isipx: function () {
            return weex && (
                weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
                || weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
                || weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
                || weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
                );
        },
        wrapHeight: function(){
            let tmp = ''
            if (this.isipx) {
                tmp = this.height + 34
            } else {
                tmp = this.height
            }
            return tmp + 'px'
        }
    },
    methods: { 
        cancel() {
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
        background-color: #ffffff;
        width:750px;
        position: fixed;
        bottom: 0;
    }
    .slot-floor{
        width: 750px;
        height: 500px;
        background-color: #ffffff;
        font-size: 28px;
    }
    .row-sb{ flex-direction: row; justify-content: space-between; }
    .confirm-buttons{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding-top: 16px;
        background-color: #f2f2f2;
    }
    .left-button, .right-button {
        width: 375px;
        line-height: 96px;
        flex:1;
        text-align: center;
        background-color: #ffffff;
    }
    .left-button {
        font-size: 32px;
        color: #666666;
        border-right-width: 1px;
        border-right-color: #e5e5e5;
    }
    .right-button {
        font-size: 32px;
        color: #000000;
    }
    .bottom-offset{
        height: 154px;
    }
</style>
