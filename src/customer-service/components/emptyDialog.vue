<template>
    <div ref="container" v-if="show" class="container">
        <midea-mask @click="layoutClick"></midea-mask>
        <div ref="dialog" class="dialog-box" :style="{top:dialogTop+'px'}">
            <div class="dialog-content">
                <slot name="content">
                </slot>
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

.dialog-box {
  background-color: #fff;
  width: 558px;
  border-radius: 10px;
  position: fixed;
  left: 96px;
  z-index: 100;
  top: 350px;
}
</style>

<script>
import { MideaMask } from '@/index'
const dom = weex.requireModule('dom');
module.exports = {
    components: { MideaMask },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        }
    },
    created() {
        var env = weex.config.env;
        this.maskHeight = env.deviceHeight / env.deviceWidth * 750;
        this.dialogTop = (this.maskHeight - 300) / 2 - 150;
    },
    methods: {
        checkDomHeight() {
            var self = this;
            var wrapper = self.$refs.container;
            var dialog = self.$refs.dialog;
            dom.getComponentRect(wrapper, function (result) {
                var size = result.size || {};
                self.wrapperHeight = size.height;
                dom.getComponentRect(dialog, function (result) {
                    var size = result.size || {};
                    self.dialogHeight = size.height;
                    self.boxMarginTop = (self.wrapperHeight - self.dialogHeight) / 2;
                });
            });
        },
        layoutClick() {
            this.$emit('close', {});
        }

    }
};
</script>
