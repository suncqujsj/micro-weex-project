<template>
    <div class="wrapper" v-if="isShow">
        <midea-mask @click="layoutClick"></midea-mask>
        <div class="zoom-outer" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
            <scroller class="scroller-h" scroll-direction="horizontal">
                <div class="scroller-v-wrapper" :style="{'width':(zoomSize>750?zoomSize:750)+'px'}">
                    <scroller class="scroller-v" scroll-direction="vertical" :style="{'width':(zoomSize>750?zoomSize:750)+'px'}">
                        <div class="imgage-wrapper" :style="{'width':(zoomSize>750?zoomSize:750)+'px','height':(zoomSize>750?zoomSize:750)+'px'}">
                            <image ref="img" class="zoom-img" :src="img" resize="contain"></image>
                        </div>
                    </scroller>
                </div>
            </scroller>
        </div>
    </div>
</template>
<script>  
const animation = weex.requireModule('animation')

import nativeService from '@/common/services/nativeService'

import MideaMask from './mask.vue'

export default {
    components: { MideaMask },
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        overlayCfg: {
            type: Object,
            default: () => ({
                hasAnimation: true,
                timingFunction: ['ease-in', 'ease-out'],
                duration: 300,
                opacity: 0.6
            })
        },
        img: {
            type: String,
            default: ''
        },
        minScale: {
            type: Number,
            default: 0.2
        },
        maxScale: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            imgSize: 750,
            dragObject: {},
            zoom: 1,
            starLine: 0
        }
    },
    computed: {
        zoomSize() {
            return this.imgSize * this.zoom
        }
    },
    methods: {
        layoutClick() {
            this.isShow = false
            this.$emit('mideaZoomOverlayClicked', {})
        },
        touchstart(e) {
            this.starLine = 0
            this.dragObject.zoom = this.zoom
        },
        touchmove(e) {
            if (e.changedTouches.length === 2) {
                // this.scrolling = true
                const imgEl = this.$refs.img;
                const dragObject = this.dragObject
                const touch = e.changedTouches[0]
                const touch2 = e.changedTouches[1]
                const diffX = touch.pageX - touch2.pageX
                const diffY = touch.pageY - touch2.pageY
                const line = Math.pow((diffX * diffX + diffY * diffY), 0.5) - this.starLine
                if (this.starLine == 0) {
                    this.starLine = line
                } else {
                    let zoom = Number(dragObject.zoom + (line / 2 / 300))
                    if (zoom < this.minScale) {
                        nativeService.toast("已经缩小到最小范围")
                    } else if (zoom > this.maxScale) {
                        nativeService.toast("已经放大到最大范围")
                    } else {
                        this.zoom = zoom
                        animation.transition(imgEl, {
                            styles: {
                                transform: 'scale(' + zoom + ')',
                                transformOrigin: 'center center'
                            },
                            duration: 0, //ms
                            timingFunction: 'linear',
                            delay: 0 //ms
                        })
                    }
                }
            }
        },
        touchend(e) {
            this.starLine = 0
            this.dragObject.zoom = this.zoom
        }
    },
    created() {
        //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
};
</script>

<style scoped>
.wrapper {
  position: fixed;
  width: 750px;
}
.zoom-outer {
  position: fixed;
  top: 300px;
  left: 0px;
  width: 750px;
  height: 750px;
}
.scroller-h {
  width: 750px;
  height: 750px;
}
.scroller-v {
  width: 750px;
  height: 750px;
  background-color: #ffffff;
}
.imgage-wrapper {
  justify-content: center;
  align-items: center;
}
.zoom-img {
  width: 750px;
  height: 750px;
}
</style>