<template>
    <div class="container" :style="finalLayoutStyle">
        <div class="dragBar-container" ref="container" :style="{width:width, backgroundColor: bgColor}" @touchstart="ontouchstart" @touchmove="ontouchmove" @touchend="ontouchend">
            <div class="precent" :style="{width:percentage, height:height, backgroundColor: color}" ref="box">
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    overflow: hidden;
}
.dragBar-container {
    overflow: hidden;
}
</style>

<script>
import nativeService from '@/common/services/nativeService'
const dom = weex.requireModule("dom");
import bindingx from 'weex-bindingx';

function getEl(el) {
    if (typeof el === 'string' || typeof el === 'number') return el;
    return true ? el.ref : el instanceof HTMLElement ? el : el.$el;
}

export default {
    props: {
        value: {
            type: [Number, String],
            default: 0
        },
        width: {
            type: [Number, String],
            default: 540
        },
        height: {
            type: [Number, String],
            default: 80
        },
        color: {
            type: String,
            default: '#FA8747'
        },
        bgColor: {
            type: String,
            default: '#EDEDED'
        },
        disable: {
            type: Boolean,
            default: false
        },
        clickable: {
            type: Boolean,
            default: true
        },
        radius: {
            type: [Number, String],
            default: 16
        },
        layoutStyle: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            percentage: 0,
            elStartX: 0,
            isChanged: false
        }
    },
    watch: {
        value(newValue) {
            if (newValue >= 0) {
                this.percentage = newValue
            }
        }
    },
    computed: {
        finalLayoutStyle() {
            return { 'borderRadius': this.radius + 'px', ...this.layoutStyle }
        }
    },
    methods: {
        onappear() {
            this.bind();
        },
        bind() {
            if (this.disable) return

            var container = getEl(this.$refs.container);
            var box = getEl(this.$refs.box);
            bindingx.bind({
                anchor: container,
                eventType: 'pan',
                props: [
                    {
                        element: box,
                        property: 'width',
                        expression: `max(x+${this.percentage}, 0)`
                    }
                ]
            }, (e) => {
                this.percentage += e.deltaX;
                if (this.percentage <= 0) {
                    this.percentage = 0
                } else if (this.percentage > this.width) {
                    this.percentage = this.width
                }
                this.percentage = Math.floor(this.percentage)
                if (e.state === 'end') {
                    this.$emit('onChange', this.percentage)
                }
            });
        },
        ontouchstart(event) {
            if (this.disable) return

            this.isChanged = false
            if (this.clickable) {
                this.percentage = Math.floor(event.changedTouches[0].screenX - this.elStartX)
            }

            if (this.moveToken) {
                bindingx.unbind({
                    eventType: 'pan',
                    token: this.moveToken
                });
                this.moveToken = undefined;
            }
            this.bind();
        },
        ontouchmove(event) {
            if (this.disable) return

            if (!this.isChanged) this.isChanged = true
        },
        ontouchend(event) {
            if (this.disable) return

            // 有点击没有滑动的情况
            if (this.clickable && !this.isChanged) {
                this.$emit('onChange', this.percentage)
            }
        }
    },
    mounted() {
        this.percentage = this.value || 0
        var el = this.$refs['container'];
        if (el) {
            let sid = setInterval(() => next(), 100)
            let next = () => {
                dom.getComponentRect(el, (options) => {
                    if (options.result && options.size.left) {
                        this.elStartX = options.size.left
                    } else {
                        setTimeout(() => next(), 100)
                    }
                })
                clearInterval(sid)
            }
        }

        this.bind();
    }
}
</script>

