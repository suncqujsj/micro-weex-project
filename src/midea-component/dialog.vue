<template>
    <div class="container">
        <midea-overlay :show="show" :hasAnimation="false"
            v-if="show"
            v-on:mideaOverlayBodyClicked="layoutClick"></midea-overlay>
        <div v-if="show" class="wrapper" :style="{height:pageHeight+'px'}">
            <div class="dialog-box">
                <div class="dialog-content">
                    <slot name="title">
                        <text v-if="title" class="content-title">{{title}}</text>
                    </slot>
                    <slot name="content">
                        <text v-if="content" class="content-subtext" :style="{fontFamily: title?'PingFangSC-Regular':'PingFangSC-Medium'}">{{content}}</text>
                    </slot>
                </div>
                <div class="dialog-footer">
                    <div class="footer-btn cancel" v-if="!single" @click="secondaryClicked">
                        <text class="btn-text" :style="{ color: secondBtnColor }">{{cancelText}}</text>
                    </div>
                    <div class="footer-btn confirm" @click="primaryClicked">
                        <text class="btn-text" :style="{ color: mainBtnColor }">{{confirmText}}</text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 750px;
    align-items: center;
    justify-content: center;
}

.mask {
    top: 0;
    width: 750px;
    justify-content: center;
    align-items: center;
}
.wrapper {
    position: fixed;
    top: 0px;
    width: 750px;
    align-items: center;
    justify-content: center;
}
.dialog-box {
    background-color: #ffffff;
    width: 540px;
    border-radius: 26px;
    z-index: 100;
}

.dialog-content {
    padding-top: 36px;
    padding-bottom: 36px;
    padding-left: 36px;
    padding-right: 36px;
}

.content-title {
    font-family: PingFangSC-Medium;
    color: #333333;
    font-size: 36px;
    text-align: center;
    margin-bottom: 24px;
    line-height: 48px;
}

.content-subtext {
    font-family: PingFangSC-Regular;
    color: #666666;
    font-size: 26px;
    line-height: 36px;
    text-align: center;
}

.dialog-footer {
    flex-direction: row;
    align-items: center;
    border-top-color: #f3f3f3;
    border-top-width: 1px;
    /*H5处理兼容*/
    border-top: 1px solid #f3f3f3;
}

.footer-btn {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 90px;
}

.cancel {
    border-right-color: #f3f3f3;
    border-right-width: 1px;
    /*H5处理兼容*/
    border-right: 1px solid #f3f3f3;
}

.btn-text {
    font-family: PingFangSC-Regular;
    font-size: 36px;
    color: #666666;
}
</style>

<script>
import mideaOverlay from './overlay.vue';
module.exports = {
    components: { mideaOverlay },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        single: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        mainBtnColor: {
            type: String,
            default: '#267aff'
        },
        secondBtnColor: {
            type: String,
            default: '#267aff'
        }
    },
    data: () => ({

    }),
    created() {
        var env = weex.config.env;
        this.pageHeight = env.deviceHeight / env.deviceWidth * 750;
    },
    methods: {
        secondaryClicked() {
            this.$emit('mideaDialogCancelBtnClicked', {
                type: 'cancel'
            });
        },
        primaryClicked(e) {
            this.$emit('mideaDialogConfirmBtnClicked', {
                type: 'confirm'
            });
        },
        layoutClick() {
            this.$emit('close', {});
        }
    }
};
</script>
