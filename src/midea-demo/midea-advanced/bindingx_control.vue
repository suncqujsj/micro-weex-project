<template>
    <div>
        <midea-header title="方向控制" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div class="scroller">

            <div class="panel-area">
                <div class="panel-wrapper" ref="wrapper">
                    <image class="arrow" ref="arrow" :src="isMoving?'../assets/img/control/control_arrow.png':''" resize="contain"></image>
                    <image class="panel" ref="panel" src="../assets/img/control/control_panel.png" resize="contain"></image>
                    <image class="rod" ref="rod" src="../assets/img/control/control_rod.png" resize="contain" @touchstart="onRodTouchstart" @touchmove="onRodTouchmove" @touchend="onRodTouchend"></image>
                </div>
            </div>

            <midea-title-bar :title="'角度：'+angleDesc" bgColor=" #EEF4F7"></midea-title-bar>
        </div>
    </div>
</template>

<style scoped>
.scroller {
    flex: 1;
    overflow: hidden;
}
.panel-area {
    height: 750px;
    width: 750px;
    justify-content: center;
    align-items: center;
}
.panel-wrapper {
    height: 500px;
    width: 500px;
    justify-content: center;
    align-items: center;
}
.arrow {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 500px;
    width: 500px;
}
.panel {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 500px;
    width: 500px;
}
.rod {
    height: 150px;
    width: 150px;
}
</style>

<script>
import base from '../base'
import bindingx from 'weex-bindingx';
import mideaHeader from '@/midea-component/header.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'

import nativeService from '@/common/services/nativeService'

function getEl(el) {
    if (typeof el === 'string' || typeof el === 'number') return el;
    return true ? el.ref : el instanceof HTMLElement ? el : el.$el;
}

export default {
    components: {
        mideaTitleBar,
    },
    mixins: [base],
    data() {
        return {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,

            isMoving: false,
            timoutHandle: null,
            moveToken: undefined,
            resetToken: undefined,

            angleList: [
                // 12点方向逆时针算角度

                // { from: 0, to: 90, desc: "左上" },
                // { from: 91, to: 180, desc: "左下" },
                // { from: 181, to: 270, desc: "右下" },
                // { from: 271, to: 360, desc: "右上" }

                { from: 0, to: 45, desc: "上" },
                { from: 46, to: 135, desc: "左" },
                { from: 136, to: 225, desc: "下" },
                { from: 226, to: 315, desc: "右" },
                { from: 316, to: 360, desc: "上" }
            ]
        }
    },
    watch: {
        angleDesc(newName, oldName) {
            if (this.timoutHandle) {
                clearInterval(this.timoutHandle)
            }
            this.timoutHandle = setTimeout(() => {
                //停顿300ms才算变化,避免反方向控制时的跨越区域变化
                // nativeService.toast(`${newName}`)
            }, 300);
        }
    },
    computed: {
        angleDesc() {
            let result = ''
            if (this.startX > 0 || this.startY > 0 || this.currentX > 0 || this.currentY > 0) {
                let angle = Math.round(180 * Math.atan2(this.currentX - this.startX, this.currentY - this.startY) / Math.PI)
                let target = this.angleList.find((item) => {
                    return (angle + 180) >= item.from && (angle + 180) <= item.to
                })
                if (target) {
                    result = target.desc
                }
            }
            return result
        }
    },
    methods: {
        bind() {
            var rod = getEl(this.$refs.rod);
            var arrow = getEl(this.$refs.arrow);
            var PI = Math.PI
            var radius = 150
            this.moveToken = bindingx.bind({
                anchor: rod,
                eventType: 'pan',
                props: [
                    {
                        element: rod,
                        property: 'transform.translateX',
                        expression: `sqrt(abs(x*x) + abs(y*y))<=${radius}?x:${radius}*sin(atan2(x,y))` //半径内移动
                    },
                    {
                        element: rod,
                        property: 'transform.translateY',
                        expression: `sqrt(abs(x*x) + abs(y*y))<=${radius}?y:${radius}*cos(atan2(x,y))` //半径内移动
                    },
                    {
                        element: arrow,
                        property: 'transform.rotateZ',
                        expression: `180-180*atan2(x,y)/${PI}`  //旋转方向
                    }
                ]
            }, (e) => {
                if (!this.isMoving) this.isMoving = true
                if (e.state === 'end') {
                    this.isMoving = false
                    this.resetBind()
                }
            });
        },
        resetBind() {
            // 复位
            var wrapper = getEl(this.$refs.wrapper);
            var rod = getEl(this.$refs.rod);
            var arrow = getEl(this.$refs.arrow);
            var period = 300
            this.resetToken = bindingx.bind({
                anchor: wrapper,
                eventType: 'timing',
                exitExpression: `t>${period}`,
                props: [
                    {
                        element: rod,
                        property: 'transform.translateX',
                        expression: `easeOutElastic(t,0,0,${period})`
                    },
                    {
                        element: rod,
                        property: 'transform.translateY',
                        expression: `easeOutElastic(t,0,0,${period})`
                    },
                    {
                        element: arrow,
                        property: 'transform.rotateZ',
                        expression: `easeOutElastic(t,0,0,${period})`
                    }
                ]
            }, (e) => {
                if (e.state === 'end' || e.state === 'exit') {
                    this.startX = 0
                    this.startY = 0
                    this.currentX = 0
                    this.currentY = 0
                }
            });
        },
        onRodTouchstart(event) {
            this.startX = event.changedTouches[0].pageX;
            this.startY = event.changedTouches[0].pageY;
            if (this.moveToken) {
                bindingx.unbind({
                    eventType: 'pan',
                    token: this.moveToken
                });
                this.moveToken = undefined;
            }
            if (this.resetToken) {
                bindingx.unbind({
                    eventType: 'timing',
                    token: this.resetToken
                });
                this.resetToken = undefined;
            }
            this.bind();
        },
        onRodTouchmove(event) {
            this.currentX = event.changedTouches[0].pageX
            this.currentY = event.changedTouches[0].pageY
        },
        onRodTouchend(event) {

        }
    },
    mounted() {
        this.bind();
    }
}
</script>