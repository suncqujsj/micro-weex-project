<template>
    <div class="scan-block">
        <input class="scan-input" type="text" :placeholder="placeholder" :autofocus=false :value="value" @input="oninput" @blur="onblur" />

        <div v-if="scan" class="scan-icon-wrapper" @click="scanCode">
            <image class="scan-icon" src="./assets/img/service_ic_scan@3x.png" resize='contain'></image>
        </div>
    </div>
</template>

<script>

import nativeService from '@/common/services/nativeService'
export default {
    components: {
    },
    mixins: [],
    props: {
        value: {
            type: String
        },
        placeholder: {
            type: String
        },
        scan: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {}
    },
    computed: {
    },
    methods: {
        oninput(event) {
            this.$emit('input', event.value)
        },
        onblur(event) {
            this.$emit('blur', event)
        },
        scanCode() {
            nativeService.scanCode().then(
                (resp) => {
                    if (resp.status == 0) {
                        this.$emit('scanCode', resp.data)
                    }
                }
            )
        }
    },
    created() {

    }
}
</script>

<style>
.scan-block {
  flex: 1;
  height: 72px;
}
.scan-input {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  border-radius: 4px;
  border-color: #e5e5e8;
  border-width: 1px;
  height: 72px;
  padding-left: 22px;
  padding-right: 60px;
  background-color: #fafafa;
}
.scan-icon-wrapper {
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 16px;
}
.scan-icon {
  height: 40px;
  width: 40px;
}
</style>
