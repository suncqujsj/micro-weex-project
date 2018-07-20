<template>
    <div :class="['smart-content', hasBottomBorder && 'cell-bottom-border']" @click="onClick">
        <div class="title-div">
            <text class="smart-title">{{data.title}}</text>
        </div>
        <div class="smart-detail">
            <div class="smart-detail-content-wrapper">
                <text class="smart-detail-content">{{data.detail}}</text>
            </div>
            <slot name="smart-action">
                <div class="smart-action">
                    <midea-switch v-if="showSwitchIcon" :checked="checked" @change="onMideachange" :width="width" :height="height"></midea-switch>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import mideaSwitch from '@/midea-component/switch2.vue'
export default {
    components: {
        mideaSwitch
    },
    props: {
        data: {
            type: Object
        },
        width: {
            type: String,
            default: '100',
        },
        height: {
            type: String,
            default: '48',
        },
        showDesc: {
            type: Boolean,
            default: true
        },
        checked: {
            type: Boolean,
            default: false
        },
        hasBottomBorder: {
            type: Boolean,
            default: true
        },
        showSwitchIcon: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            mideaChecked: true,
            icon_img_on: "./assets/img/smart_ic_yellow@2x.png",
            icon_img_off: "./assets/img/smart_ic_gray@2x.png"
        }
    },
    methods: {
        onMideachange(event) {
            // this.checked = event.value
            this.$emit('change', { value: event.value })
        },
        onClick(event) {
            this.$emit('click', event)
        }
    },
    computed: {

    }
}
</script>


<style>
.smart-content {
  padding-top: 20px;
  padding-bottom: 20px;
}
.index-img {
  width: 40px;
  height: 40px;
}
.title-div {
  flex-direction: row;
  align-items: center;
}
.smart-title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
.cell-bottom-border {
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
.smart-detail {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-items: center;
  padding-top: 10px;
}

.smart-detail-content-wrapper {
  flex: 1;
}
.smart-detail-content {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #8a8a8f;
}
.smart-action {
  margin-left: 32px;
}
</style>
