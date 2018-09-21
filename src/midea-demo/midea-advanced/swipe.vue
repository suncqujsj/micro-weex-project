<template>
    <div class="wrapper" :style="{paddingTop:isIos?'0px':'0px'}">
        <midea-header title="手势" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <div ref="swipeArea" class="swipe-area" v-on:swipe="onSwipe($event,item)">
            <div ref="swipeInnerArea" class="swipe-inner-area">
                <div v-for="index in pagesCount" :key="index" class="page-content" :style="{height: blockSize.height+'px'}">
                    <text class="swipe-block">Page{{index}}</text>
                    <text class="swipe-block">在页面中向上下滑动手势</text>
                    <text class="swipe-value">方向：{{eventObject.direction}}</text>
                    <text class="swipe-value">changedTouches:{{eventObject.changedTouches}}</text>
                </div>
            </div>
        </div>

    </div>
</template>

<style>
.swipe-area {
  flex: 1;
  overflow: hidden;
}
.swipe-inner-area {
  position: relative;
  background-color: gainsboro;
}
.page-content {
  width: 750px;
  justify-content: center;
  background-color: aliceblue;
  overflow: hidden;
  padding: 20px;
}
.swipe-block {
  text-align: center;
}
.swipe-value {
  text-align: left;
}
</style>

<script>  
import base from '../base'
import nativeService from '@/common/services/nativeService'
const animation = weex.requireModule('animation')
const dom = weex.requireModule('dom')

export default {
    components: {},
    mixins: [base],
    data() {
        return {
            pagesCount: 5,
            currentPage: 0,
            blockSize: {
                height: (750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight) - 88
            },
            offset: 0,
            eventObject: ''
        }
    },
    methods: {
        onSwipe(event, item) {
            this.eventObject = event
            if (event.direction == 'up') {
                if (this.currentPage >= this.pagesCount - 1) return
                this.move(event.direction)
            } else if (event.direction == 'down') {
                if (this.currentPage <= 0) return
                this.move(event.direction)
            }
        },
        move(direction) {
            let pageEl = this.$refs['swipeInnerArea'];
            if (direction == 'up') {
                this.offset = this.offset - this.blockSize.height
            } else if (direction == 'down') {
                this.offset = this.offset + this.blockSize.height
            }
            animation.transition(pageEl, {
                styles: {
                    transform: 'translate(0px, ' + this.offset + 'px)',
                    transformOrigin: 'center center'
                },
                duration: 500, //ms
                timingFunction: 'linear',
                delay: 0 //ms
            }, () => {
                if (direction == 'up') {
                    this.currentPage++
                } else if (direction == 'down') {
                    this.currentPage--
                }
                // nativeService.toast('move finished.' + this.offset)
            })
        }
    },
    mounted() {
        let swipeAreaEl = this.$refs['swipeArea']
        setTimeout(() => {
            dom.getComponentRect(swipeAreaEl, (result) => {
                this.blockSize = result.size || {};
            });
        }, 100);
    },
    created() {
    }
}
</script>