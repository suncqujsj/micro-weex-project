<template>
    <div>
        <div @touchend="handleTouchEnd">
            <midea-overlay :show="haveOverlay && isOverShow"
               v-if="show"
               ref="overlay"
               v-bind="overlayCfg"
               v-on:mideaOverlayBodyClicked="mideaOverlayBodyClicking"></midea-overlay>
        </div>
        <div ref="midea-confirm"
            v-if="show"
            :height="_height"
            :hack="isNeedShow"
            :class="['midea-confirm', pos]"
            :style="padStyle">
            <text class="confirm-title">{{title}}</text>
            <div class="confirm-content-wrapper">
                <text class="confirm-content">{{content}}</text>
            </div>
            <div class="confirm-buttons">
                <div class="confirm-button-left" @click="leftBtnClick"><text class="left-button">{{leftBtnText}}</text></div>
                <div class="confirm-button-right" @click="rightBtnClick"><text class="right-button">{{rightBtnText}}</text></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .midea-confirm {
        position: fixed;
        width: 750px;
    }

    .bottom {
        left: 0;
        right: 0;
    }

    .confirm-title {
        line-height: 88px;
        height: 88px;
        text-align: center;
        font-weight: 600;
        color: #020F13;
        font-size: 36px;
        background-color: #ffffff;
    }

    .confirm-content-wrapper {
        height: 233px;
        padding-top: 31px;
        padding-bottom: 31px;
        padding-left: 21px;
        padding-right: 21px;
        display: flex;
        justify-content: center;
    }

    .confirm-content {
        text-align: center;
        color: #020F13;
        font-size: 28px;
    }

    .confirm-buttons {
        overflow: hidden;
        position: relative;
        padding-top: 16px;
        background-color: #f2f2f2;
        text-align: center;
        font-size: 36px;
        flex-direction:row;
    }

    .confirm-button-left, .confirm-button-right {
        width: 375px;
        text-align: center;
        flex:1;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color: #fff;
    }

    .confirm-button-left {
        border-right-width: 1px;
        border-right-color: #d7dde4;
    }

    .left-button {
        line-height: 96px;
        font-size: 36px;
        color: #666666;
    }

    .right-button {
        line-height: 96px;
        font-size: 36px;
        color: #000000;
    }
</style>

<script>
    const animation = weex.requireModule('animation');
    const { platform } = weex.config.env;
    const isWeb = typeof (window) === 'object' && platform.toLowerCase() === 'web';
    import mideaOverlay from './overlay.vue';
    module.exports = {
        components: { mideaOverlay },
        props: {
            title: String,
            content: String,
            leftBtnText: {
                type: String,
                default: '取消'
            },
            rightBtnText: {
                type: String,
                default: '确定'
            },
            show: {
                type: Boolean,
                default: false
            },
            pos: {
                type: String,
                default: 'bottom'
            },
            popupColor: {
                type: String,
                default: '#FFFFFF'
            },
            overlayCfg: {
                type: Object,
                default: () => ({
                    hasAnimation: true,
                    timingFunction: ['ease-in', 'ease-out'],
                    duration: 300,
                    opacity: 0.6
                })
            },
            height: {
                type: [Number, String],
                default: 420
            },
            standOut: {
                type: [Number, String],
                default: 0
            },
            width: {
                type: [Number, String],
                default: 750
            },
            animation: {
                type: Object,
                default: () => ({
                    timingFunction: 'ease-in'
                })
            }
        },
        data: () => ({
            haveOverlay: true,
            isOverShow: true
        }),
        computed: {
            isNeedShow () {
                setTimeout(() => {
                    this.appearPopup(this.show);
                }, 50)
                return this.show;
            },
            _height () {
                this.appearPopup(this.show, 150);
                return this.height;
            },
            transformValue () {
                return this.getTransform(this.pos, this.width, this.height, true);
            },
            padStyle () {
                const { pos, width, height, popupColor } = this;
                let style = {
                    width: `${width}px`,
                    backgroundColor: popupColor
                };
                pos === 'bottom' && (style = {
                    ...style,
                    bottom: `${-height}px`,
                    height: `${height}px`
                });
                return style;
            }
        },
        methods: {
            leftBtnClick () {
                this.appearPopup(false);
                this.$emit('leftBtnClick');
            },
            rightBtnClick () {
                this.appearPopup(false);
                this.$emit('rightBtnClick');
            },
            handleTouchEnd (e) {
                // 在支付宝上面有点击穿透问题
                const { platform } = weex.config.env;
                platform === 'Web' && e.preventDefault && e.preventDefault();
            },
            hide () {
                this.appearPopup(false);
                this.$refs.overlay.appearOverlay(false);
            },
            mideaOverlayBodyClicking () {
                this.isShow && this.appearPopup(false);
            },
            appearPopup (bool, duration = 300) {
                this.isShow = bool;
                const popupEl = this.$refs['midea-confirm'];
                if (!popupEl) {
                    return;
                }
                animation.transition(popupEl, {
                        styles: {
                            transform: this.getTransform(this.pos, this.width, this.height, !bool)
                        },
                        duration,
                        delay: 0,
                        ...this.animation
                    }, () => {
                        if (!bool) {
                            this.$emit('mideaPopupOverlayClicked', { pos: this.pos });
                        }
                    });
            },
            getTransform (pos, width, height, bool) {
                let _size = pos === 'top' || pos === 'bottom' ? height : width;
                let _transform;
                if (isWeb) {
                    _size -= this.standOut;
                }
                bool && (_size = 0);
                switch (pos) {
                    case 'top':
                        _transform = `translateY(${_size}px)`;
                        break;
                    case 'bottom':
                        _transform = `translateY(-${_size}px)`;
                        break;
                    case 'left':
                        _transform = `translateX(${_size}px)`;
                        break;
                    case 'right':
                        _transform = `translateX(-${_size}px)`;
                        break;
                }
                return _transform;
            }
        }
    }
</script>
