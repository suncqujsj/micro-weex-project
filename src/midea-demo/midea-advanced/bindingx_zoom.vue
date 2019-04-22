<template>
    <div>
        <midea-header title="bindingx" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div class="scroller">
            <div :ref="'box'" class="box" @touchstart="ontouchstart" @touchmove="ontouchmove" @touchend="ontouchend"></div>
        </div>
    </div>
</template>

<style scoped>
.scroller {
    flex: 1;
    overflow: hidden;
    background-color: yellow;
}
.box {
    border-width: 2px;
    border-style: solid;
    border-color: #bbbbbb;
    width: 450px;
    height: 450px;
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
const animation = weex.requireModule('animation')


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
            dragObject: {},
            starLine: 0,
            zoom: 0
        }
    },
    methods: {
        bindDrag() {
            var box = getEl(this.$refs.box);
            this.dragToken = bindingx.bind({
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
        bindZoom(e) {
            // this.scrolling = true
            var box = getEl(this.$refs.box);
            const dragObject = this.dragObject
            const touch = e.changedTouches[0]
            const touch2 = e.changedTouches[1]
            const diffX = touch.pageX - touch2.pageX
            const diffY = touch.pageY - touch2.pageY
            const line = Math.pow((diffX * diffX + diffY * diffY), 0.5) - this.starLine
            let zoom = Number(dragObject.zoom + (line / 2 / 300))
            console.log("zoom" + zoom)
            if (this.starLine == 0) {
                this.starLine = line
            } else {
                if (zoom >= 0 && zoom <= 1) {
                    let self = this
                    self.zoom = zoom
                    animation.transition(this.$refs.box, {
                        styles: {
                            transform: 'scale(' + 1 + self.zoom + ')',
                            transformOrigin: 'center center'
                        },
                        duration: 0, //ms
                        timingFunction: 'linear',
                        delay: 0 //ms
                    }, function () {
                    })
                }
            }
        },
        ontouchstart(event) {
            console.log("ontouchstart")
            this.starLine = 0
            this.dragObject.zoom = this.zoom
            bindingx.unbindAll()
            this.bindDrag();
        },
        ontouchmove(e) {
            console.log("" + e.changedTouches.length)
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
            this.starLine = 0
            this.dragObject.zoom = this.zoom
        }
    },
    mounted() {
    }
}
</script>