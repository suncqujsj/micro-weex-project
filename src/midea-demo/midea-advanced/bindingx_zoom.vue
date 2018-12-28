<template>
    <div>
        <midea-header title="bindingx" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div class="scroller" @touchstart="canvasTouchstart" @touchmove="canvasTouchmove" @touchend="canvasTouchend">
            <gcanvas ref="gcanvess" @touchstart="ontouchstartCanvas" style="width: 750;height: 600px;background-color: yellow;">
            </gcanvas>
            <div :ref="'box'" class="box" @touchstart="ontouchstart" @appear="onappear"></div>
        </div>
        <text>{{zoom}}</text>
        <text>{{x}}</text>
        <text>{{y}}</text>
        <text>{{x1}}</text>
        <text>{{y1}}</text>
        <text>{{dragObject}}</text>
    </div>
</template>

<style scoped>
.scroller {
    overflow: hidden;
    height: 600px;
    border-width: 2px;
    border-style: solid;
    border-color: #bbbbbb;
}
.box {
    position: absolute;
    top: 0px;
    left: 0px;
    border-width: 2px;
    border-style: solid;
    border-color: #bbbbbb;
    width: 250px;
    height: 250px;
    margin-top: 250px;
    margin-left: 250px;
    background-color: #eeeeee;
    margin-bottom: 500px;
}
</style>

<script>
import base from '../base'
import mideaHeader from '@/midea-component/header.vue'
import bindingx from 'weex-bindingx';

var GCanvas = require('weex-gcanvas')
var Image = require('weex-gcanvas/gcanvasimage');

function getEl(el) {
    if (typeof el === 'string' || typeof el === 'number') return el;
    return true ? el.ref : el instanceof HTMLElement ? el : el.$el;
}


export default {
    mixins: [base],
    data() {
        return {
            x: 0,
            y: 0,
            flag: 0,
            x1: 0,
            y1: 0,
            dragObject: {},
            starLine: 0,
            zoom: 0
        }
    },
    methods: {
        onappear() {
            this.bind();
        },
        bind() {
            var box = getEl(this.$refs.box);
            bindingx.bind({
                anchor: box,
                eventType: 'pan',
                props: [
                    {
                        element: box,
                        property: 'transform.translateX',
                        expression: {
                            origin: `x+${this.x}`,
                            transformed: `{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":\"${this.x}\"}]}`
                        }
                    },
                    {
                        element: box,
                        property: 'transform.translateY',
                        expression: {
                            origin: `y+${this.y}`,
                            transformed: `{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"y\"},{\"type\":\"NumericLiteral\",\"value\":\"${this.y}\"}]}`
                        }
                    }
                ]
            }, (e) => {
                if (e.state === 'end') {
                    this.x += e.deltaX;
                    this.y += e.deltaY;
                }
            });
        },
        ontouchstart(event) {
            this.bind();
        },

        bindCanvas() {
            var box = getEl(this.$refs.gcanvess);
            bindingx.bind({
                anchor: box,
                eventType: 'pan',
                props: [
                    {
                        element: box,
                        property: 'transform.translateX',
                        expression: {
                            origin: `x+${this.x1}`,
                            transformed: `{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":\"${this.x1}\"}]}`
                        }
                    },
                    {
                        element: box,
                        property: 'transform.translateY',
                        expression: {
                            origin: `y+${this.y1}`,
                            transformed: `{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"y\"},{\"type\":\"NumericLiteral\",\"value\":\"${this.y1}\"}]}`
                        }
                    }
                ]
            }, (e) => {
                if (e.state === 'end') {
                    this.x1 += e.deltaX;
                    this.y1 += e.deltaY;
                }
            });
        },
        ontouchstartCanvas(event) {
            this.bindCanvas();
        },
        canvasDraw() {
            // 第二部分canvas
            /*获取元素引用*/
            var ref = this.$refs.gcanvess
            /*通过元素引用获取canvas对象*/
            this.canvasObj = GCanvas.start(ref)
            /*获取绘图所需的上下文，目前不支持3d*/
            this.context = this.canvasObj.getContext('2d')
            /*设置字体大小*/
            this.context.font = '34px'
            /*在指定位置绘制文字*/
            this.context.fillText('Hello Word', 200, 100)
            /*指定绘制图形的线的宽度*/
            this.context.lineWidth = 10
            /*在指定位置绘制矩形*/
            this.context.strokeRect(200, 200, 200, 90)
            /*绘制三角形*/
            this.context.beginPath()
            this.context.moveTo(20, 20)
            this.context.lineTo(20, 100)
            this.context.lineTo(0, 100)
            this.context.closePath()
            this.context.stroke()
        },
        canvasTouchstart(e) {
            this.starLine = 0
            this.dragObject.zoom = this.zoom
        },
        canvasTouchmove(e) {
            if (e.changedTouches.length === 2) {
                // this.scrolling = true
                const gcanvessEl = this.$refs.gcanvess;
                const boxEl = this.$refs.box;
                const dragObject = this.dragObject
                const touch = e.changedTouches[0]
                const touch2 = e.changedTouches[1]
                const diffX = touch.pageX - touch2.pageX
                const diffY = touch.pageY - touch2.pageY
                const line = Math.pow((diffX * diffX + diffY * diffY), 0.5) - this.starLine
                let zoom = Number(dragObject.zoom + (line / 2 / 300))
                if (this.starLine == 0) {
                    this.starLine = line
                } else {
                    var box = gcanvessEl.ref;
                    if (zoom>=0 && zoom<=1){
                        this.zoom = zoom
                        bindingx.bind({
                            anchor: box,
                            eventType: 'timing',
                            exitExpression: {
                                origin: `t>0`
                            },
                            props: [
                                {
                                    element: gcanvessEl.ref,
                                    property: 'transform.scale',
                                    expression: {
                                    origin: `linear(t,${1},${1 + zoom},100)`
                                    }
                                },
                                {
                                    element: boxEl.ref,
                                    property: 'transform.scale',
                                    expression: {
                                    origin: `linear(t,${1},${1 + zoom},0)`
                                    }
                                }
                            ]
                        }, (e) => {
                            if (e.state === 'end') {
                                
                            }
                        });
                    }
                }
            }
        },
        canvasTouchend(e) {
            this.starLine = 0
            this.dragObject.zoom = this.zoom
        }
    },
    mounted() {
        this.canvasDraw()
    }
}
</script>