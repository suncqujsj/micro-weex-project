<template>
    <cell :class="['midea-cell',clickActivied&& 'active-cell', hasTopBorder && 'cell-top-border', hasBottomBorder && 'cell-bottom-border', hasMargin && 'cell-margin', desc && 'has-desc']" :style="outputCellStyle" @click="cellClicked" @delete="onDelete" :canEdit="canEdit" @longpress="showEdit">
        <slot name="itemImg">
            <image v-if="itemImg&&itemImg!=''" :src="itemImg" class="item-img" resize='contain'>
            </image>
        </slot>
        <div :class="['midea-sub-cell',hasSubTopBorder && 'cell-sub-top-border', hasSubBottomBorder && 'cell-sub-bottom-border', hasVerticalIndent && 'cell-indent']">
            <div class="midea-sub-cell-inner">
                <slot name="label">
                    <div v-if="label">
                        <text class="cell-label-text">{{label}}</text>
                    </div>
                </slot>
                <div class="cell-title">
                    <slot name="title">
                        <text class="cell-content">{{title}}</text>
                        <text class="cell-desc-text" v-if="desc">{{desc}}</text>
                    </slot>
                </div>

                <slot name="value"></slot>
                <slot name="text"></slot>
                <slot name="rightText">
                    <text v-if="rightText" class="right-text">{{rightText}}</text>
                    <text v-else-if="placeHolder" class="placeholder-text">{{placeHolder}}</text>
                </slot>
            </div>
            <image :src="arrowIcon" class="cell-arrow-icon" v-if="hasArrow"></image>
        </div>
    </cell>
</template>

<style scoped>
.midea-cell {
  position: relative;
  flex-direction: row;
  align-items: center;
  padding-left: 32px;
  background-color: #ffffff;
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

.has-desc {
  padding-bottom: 18px;
  padding-top: 18px;
}

.cell-top-border {
  border-top-color: #e5e5e8;
  border-top-width: 1px;
}

.cell-bottom-border {
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
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
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
}

.cell-label-text {
  font-size: 30px;
  color: #666666;
  width: 188px;
  margin-right: 10px;
}

.right-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
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
  font-size: 30px;
  color: #000000;
  line-height: 40px;
}

.cell-desc-text {
  color: #999999;
  font-size: 24px;
  line-height: 30px;
  margin-top: 4px;
}
.item-img {
  width: 80px;
  height: 80px;
  margin-right: 24px;
}
</style>

<script>
import util from './setting/util'
const icon = require('./setting/icon.base64.js');

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
            default: true
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
        canEdit: {
            type: Boolean,
            default: false
        },
        arrowIcon: {
            type: String,
            default: './img/public_ic_more@3x.png'
        },
    },
    computed: {
        outputCellStyle() {
            const { height, cellStyle } = this;
            let temp = { ...cellStyle }
            if (height) {
                temp["height"] = height + "px"
            }
            return temp
        }
    },
    data: () => ({

    }),
    methods: {
        cellClicked(e) {
            this.$emit('mideaCellClick', { e });
        },
        onDelete(e) {
            this.$emit('onDelete', { e });
        },
        showEdit(e) {
            this.$emit('onItemPress', { e });
        }
    }
};
</script>
