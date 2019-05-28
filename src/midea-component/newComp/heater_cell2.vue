<template>
<div :class="['midea-cell',clickActivied&& 'active-cell', hasTopBorder && 'cell-top-border', hasBottomBorder && 'cell-bottom-border', hasMargin && 'cell-margin']" :style="outputCellStyle" @click="cellClicked">

    <slot name="itemImg">
        <image v-if="itemImg&&itemImg!=''" :src="itemImg" class="item-img" resize='contain'>
        </image>
    </slot>
    <div :class="['midea-sub-cell',hasSubTopBorder && 'cell-sub-top-border', hasSubBottomBorder && 'cell-sub-bottom-border', hasVerticalIndent && 'cell-indent']">
        <div class="midea-sub-cell-inner">
            <slot name="label">
                <div v-if="label" style="flex:1;">
                    <text class="cell-label-text">{{label}}</text>
                </div>
            </slot>
            <slot name="value"></slot>
            <slot name="text"></slot>

            <div class="cell-title">
                <slot name="title">
                    <text class="cell-content">{{title}}</text>
                    <text class="cell-desc-text" v-if="desc">{{desc}}</text>
                </slot>
            </div>
            <slot name="rightText">
                <text v-if="rightText" class="right-text">{{rightText}}</text>
                <text v-else-if="placeHolder" class="placeholder-text">{{placeHolder}}</text>
            </slot>

        </div>
        <slot name="switch">
            <div v-if="hasSwitch" ref="switch" @click="clickSwitch" :class="['switch',switchActive&&'switch-active']">
                <div ref="switchDot" class='switch-dot'></div>
            </div>
        </slot>
        <image :src="arrowIcon" class="cell-arrow-icon" v-if="hasArrow"></image>
    </div>
</div>
</template>

<style scoped>
.midea-cell {
    position: relative;
    flex-direction: row;
    align-items: center;
    padding-left: 32px;
    background-color: #f9f9f9;
    height: 160px;
    margin-left: 32px;
    margin-right: 32px;
}

.active-cell:active {
    background-color: #f5f5f5;
}

.cell-margin {
    margin-bottom: 24px;
}

.cell-title {
    /* flex: 1; */
}

.cell-indent {
    padding-bottom: 28px;
    padding-top: 28px;
}

/* .has-desc {
  padding-bottom: 18px;
  padding-top: 18px;
} */

.cell-top-border {
    border-top-color: #e5e5e8;
    border-top-width: 1px;
}

.cell-bottom-border {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #e5e5e8;
}

.midea-sub-cell {
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-right: 18px;
}

.midea-sub-cell-inner {
    flex: 1;
    flex-direction: row;
    align-items: center;
}

.cell-sub-top-border {
    border-top-color: #e5e5e8;
    border-top-width: 1px;
}

.cell-sub-bottom-border {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #e5e5e8;
}

.cell-label-text {
    flex: 1;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #000000;
    margin-right: 10px;
}

.right-text {
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #000000;
    text-align: right;
    word-break: keep-all;
    flex: 1;
}

.placeholder-text {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #c7c7cc;
    text-align: right;
    flex: 1;
}

.cell-arrow-icon {
    width: 40px;
    height: 40px;
}

.cell-content {
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #000000;
}

.cell-desc-text {
    color: #8a8a8f;
    font-size: 24px;
    margin-top: 24px;
}

.item-img {
    width: 96px;
    height: 96px;
    margin-right: 24px;
}

.switch {
    width: 96px;
    height: 48px;
    border-style: solid;
    border-color: #8A8A8F;
    background-color: #ffffff;
    border-width: 4px;
    border-radius: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.switch-active {
    width: 96px;
    height: 48px;
    border-radius: 24px;
    border-width: 0px;
    background-color: #FFAA10;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.switch-dot {
    background-color: #8A8A8F;
    border-radius: 8px;
    width: 16px;
    height: 16px;
    position: relative;
    left: 12px;
    transition-property: all;
    transition-duration: 5s;
}
</style>

<script>
const animation = weex.requireModule('animation')

module.exports = {
    props: {
        height: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: ''
        },
        rightText: {
            type: String,
            default: ''
        },
        placeHolder: {
            type: String,
            default: ''
        },
        clickActivied: {
            type: Boolean,
            default: true
        },
        hasTopBorder: {
            type: Boolean,
            default: false
        },
        hasMargin: {
            type: Boolean,
            default: false
        },
        hasBottomBorder: {
            type: Boolean,
            default: false
        },
        hasSubTopBorder: {
            type: Boolean,
            default: false
        },
        hasSubBottomBorder: {
            type: Boolean,
            default: false
        },
        hasArrow: {
            type: Boolean,
            default: true
        },
        hasVerticalIndent: {
            type: Boolean,
            default: true
        },
        cellStyle: {
            type: Object,
            default: () => ({})
        },
        itemImg: {
            type: String,
            default: ''
        },
        arrowIcon: {
            type: String,
            default: './img/public_ic_more@3x.png'
        },
        hasSwitch: {
            type: Boolean,
            default: false
        },
        switchActive: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        outputCellStyle() {
            const {
                height,
                cellStyle
            } = this;
            let temp = { ...cellStyle
            }
            if (height) {
                temp["height"] = height + "px"
            }
            return temp
        }
    },
    data: () => ({}),
    methods: {
        cellClicked(e) {
            this.$emit('mideaCellClick', {
                e
            });
        },
        clickSwitch() {
            if (this.switchActive) {
                // animation.transition(this.$refs.switch,{
                //   styles:{
                //     backgroundColor:'#ffffff'
                //   },
                //   duration:500
                // })
                animation.transition(this.$refs.switchDot, {
                    styles: {
                        backgroundColor: '#8A8A8F',
                        transform: 'translateX(0px) scale(1)'
                    },
                    duration: 300,
                    timingFunction:'ease-out'
                })
            } else {
                // animation.transition(this.$refs.switch,{
                //   styles:{
                //     backgroundColor: '#FFAA10',
                //   },
                //   duration:500
                // })
                animation.transition(this.$refs.switchDot, {
                    styles: {
                        backgroundColor: '#ffffff',
                        transform: 'translateX(52px) scale(2.25)'
                    },
                    duration: 300,
                    timingFunction:'ease-out'
                })
            }

            this.$emit('clickSwitch')
        }
    },
    mounted() {
        if (this.switchActive) {
            animation.transition(this.$refs.switchDot, {
                styles: {
                    backgroundColor: '#ffffff',
                    transform: 'translateX(52px) scale(2.25)'
                },
                duration: 500
            })
        }
    }
};
</script>
