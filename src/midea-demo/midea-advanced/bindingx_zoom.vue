<template>
    <div>
        <midea-header :title="'bindingx'+length" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div class="scroller">
            <div :ref="'box'" class="box" @panstart="ontouchstart" @panmove="ontouchmove" @panend="ontouchend" style="background-color: green;">
                <gcanvas ref="gcanvas" style="width: 750;height: 600px;background-color: yellow;"></gcanvas>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scroller {
    flex: 1;
    overflow: hidden;
}
.box {
    border-width: 2px;
    border-style: solid;
    border-color: #bbbbbb;
    background-color: #eeeeee;
}
</style>

<script>
import base from '../base'
import mideaHeader from '@/midea-component/header.vue'
import bindingx from 'weex-bindingx';
const animation = weex.requireModule('animation')
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
            dragToken: null,
            x1: 0,
            y1: 0,
            zoomObject: {
                zoom: 1
            },
            starLine: 0,
            zoom: 0,
            length: 0,
            canvasObj: null,
            context: null
        }
    },
    methods: {
        bindDrag() {
            var box = getEl(this.$refs.box);
            let dragObj = bindingx.bind({
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

            this.dragToken = dragObj.token
        },
        bindZoom(e) {
            var box = getEl(this.$refs.box);
            const zoomObject = this.zoomObject
            const touch = e.changedTouches[0]
            const touch2 = e.changedTouches[1]
            const diffX = touch.pageX - touch2.pageX
            const diffY = touch.pageY - touch2.pageY
            const line = Math.sqrt(diffX * diffX + diffY * diffY) - this.starLine
            let zoom = Number(+zoomObject.zoom + (line / 2 / 300))
            if (zoom) zoom = zoom.toFixed(4)
            if (this.starLine == 0) {
                this.starLine = line
            } else {
                if (zoom >= 0 && zoom <= 3) {
                    this.zoom = zoom
                    let self = this
                    console.log("zoom" + zoom)
                    animation.transition(this.$refs.box, {
                        styles: {
                            transform: 'scale(' + self.zoom + ')',
                            transformOrigin: 'center center'
                        },
                        duration: 0, //ms
                        timingFunction: 'linear',
                        delay: 0 //ms
                    }, function () {
                        self.starLine = 0
                        self.zoomObject.zoom = self.zoom
                    })
                }
            }
        },
        ontouchstart(event) {
            console.log("ontouchstart")
            this.starLine = 0
            this.zoomObject.zoom = this.zoom
            this.bindDrag();
        },
        ontouchmove(e) {
            if (e.changedTouches.length === 2) {
                if (this.dragToken) {
                    bindingx.unbind({
                        eventType: 'pan',
                        token: this.dragToken
                    });
                    this.dragToken = undefined;
                }

                this.bindZoom(e)
            }
        },
        ontouchend(e) {
            bindingx.unbindAll()
        },
        test1() {
            // 第一部分canvas
            //1、初始化 GCanvas

            //2、执行渲染操作
            //rect
            this.context.fillStyle = 'red';
            this.context.fillRect(0, 0, 100, 100);

            //rect
            this.context.fillStyle = 'black';
            this.context.fillRect(100, 100, 100, 100);
            this.context.fillRect(25, 210, 700, 5);

            //circle
            this.context.arc(450, 200, 100, 0, Math.PI * 2, true);
            this.context.fill();

            //drawImage
            var image = new Image();
            image.onload = function () {
                this.context.drawImage(image, 100, 330);
                this.context.drawImage(image, 100, 330, 225, 75);
            }
            image.src = 'https://www.khronos.org/assets/uploads/ceimg/made/assets/uploads/apis/OpenGL-ES_100px_May16_225_75.png';
        }
    },
    mounted() {
        this.bindDrag();
        /*获取元素引用*/
        var ref = this.$refs.gcanvas
        /*通过元素引用获取canvas对象*/
        this.canvasObj = GCanvas.start(ref)
        /*获取绘图所需的上下文，目前不支持3d*/
        this.context = this.canvasObj.getContext('2d')
        this.test1()
    }
}
</script>