<template>
    <div>
        <image :src="icon" class="item-img" @click="onchange" :style="{'width':width,'height':height}"></image>
    </div>
</template>

<script>
import nativeService from '../common/services/nativeService'
export default {
    props: {
        value: {
            type: Number,
            default: -1
        },
        // 是否选中
        iconOn: {
            type: String,
            default: './img/check/switch_on.png'
        },
        iconOff: {
            type: String,
            default: './img/check/switch_off.png'
        },
        width: {
            type: String,
            default: '70',
        },
        height: {
            type: String,
            default: '38',
        },
        checked: {
            type: Boolean,
            default: false
        }

    },
    computed: {
        icon() {
            return this.checked ? this.iconOn : this.iconOff;
        }
    },
    methods: {
        onchange(event) {
            this.checked = !this.checked;
            this.$emit('change', { value: this.checked })
        },
    }
}
</script>

<style scoped>
.grid-option {
  justify-content: center;
  border-radius: 8px;
  border-width: 2px;
  padding-left: 6px;
  padding-right: 6px;
}

.text-title {
  lines: 2;
  line-height: 30px;
  text-overflow: ellipsis;
  text-align: center;
  font-size: 26px;
}

.image-checked {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 38px;
  height: 34px;
}
</style>
