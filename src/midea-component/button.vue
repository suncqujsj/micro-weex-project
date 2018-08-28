<template>
    <div class="btn-wrapper">
        <div class="midea-btn" :class="[type]" :style="defaultBtnStyle" @click="onClicked">
            <text class="btn-text" :style="defaultTextStyle">{{text}}</text>
            <div v-if="!disabled" :class="['btn-cover', defaultConver]" @click="onClicked"></div>
        </div>
    </div>
</template>

<script>
import { STYLE_MAP, TEXT_STYLE_MAP } from './setting/btnType'
export default {
    props: {
        text: {
            type: String,
            default: '确认'
        },
        type: {
            type: String,
            default: 'primary'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        btnStyle: Object,
        textStyle: Object
    },
    computed: {
        defaultBtnStyle() {
            const { type, disabled, btnStyle } = this;
            const defaultBtnStyle = {
                ...STYLE_MAP[type],
                ...btnStyle,
                opacity: 1
            };
            return disabled ? {
                ...defaultBtnStyle,
                opacity: 0.2
            } : defaultBtnStyle;
        },
        defaultTextStyle() {
            const { type, disabled, textStyle } = this;
            const defaultTextStyle = { ...TEXT_STYLE_MAP[type], ...textStyle };
            return disabled ? { ...defaultTextStyle } : defaultTextStyle;
        },
        defaultConver() {
            return this.type + '-cover'
        }
    },
    methods: {
        onClicked(e) {
            const { type, disabled } = this;
            if (!disabled){
              this.$emit('mideaButtonClicked', { e, type, disabled })
            }
        }
    }
}
</script>

<style scoped>
.btn-wrapper {
  align-items: center;
}
.midea-btn {
  width: 686px;
  height: 84px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 32px;
  margin-bottom: 32px;
}
.btn-text {
  text-overflow: ellipsis;
  lines: 1;
  font-size: 32px;
  color: #ffffff;
}
.btn-cover {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
.primary-cover:active {
  background-color: rgba(0, 0, 0, 0.2);
}
.secondary-cover:active {
  background-color: rgba(38, 122, 255, 0.05);
}
.normal-cover:active {
  background-color: rgba(138, 138, 143, 0.05);
}
</style>
