<template>
    <div class="wrap" :style="wrapStyle">
        <div class="select-area" v-if="isShowIndicator" :style="indicatorStyle"></div>
        <scroller ref="scroller" class="scroller" :style="scrollerStyle" :show-scrollbar="false" @scroll="scroll" @scrollend="scrollEnd">
            <div v-for="(item, index) in listArray" :key="index" ref="item">
                <text v-bind:class="[
                    'list-item',
                    index==0?'first-item':'',
                    index==(listArray.length-1)?'last-item':'',
                    index==itemIndex-2 ? 'first-visible-item':'',
                    index==itemIndex-1 ? 'second-visible-item':'',
                    index==itemIndex   ? 'selected-item':'unselected-item',
                    index==itemIndex+1 ? 'second-last-visible-item':'',
                    index==itemIndex+2 ? 'first-last-visible-item':''
                ]">{{item}}</text>
            </div>
        </scroller>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';

const dom = weex.requireModule('dom')

export default {
    props: {
        listArray: {
            type: Array,
            default: function () {
                return []
            }
        },
        listItem: {
            type: Number,
            default: 10
        },
        target: {
            type: String,
            default: null
        },
        wrapHeight: {
            type: Number,
            default: 350
        },
        wrapWidth: {
            type: Number,
            default: 750
        },
        isShowIndicator: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        wrapStyle() {
            return {
                width: this.wrapWidth,
                height: this.wrapHeight
            }
        },
        scrollerStyle() {
            return {
                width: this.wrapWidth,
                height: this.wrapHeight
            }
        },
        indicatorStyle() {
            return {
                top: Math.floor((this.wrapHeight / this.itemHeight) / 2) * this.itemHeight + 8 + 'px',
                width: this.wrapWidth,
                height: this.itemHeight + 2
            }
        },
    },
    data() {
        return {
            isInit: false,
            itemHeight: 70,
            index: this.itemIndex
        }
    },
    watch: {
        itemIndex(value) {
            this.index = value
        }
    },
    methods: {
        scroll(event) {
            if (!this.isInit) return

            let offsetY = event.contentOffset.y || ''
            if (offsetY % this.itemHeight != 0) {
                let firstVisibleItemIndex = Math.abs(Math.round(offsetY / 70))
                this.itemIndex = firstVisibleItemIndex
            }
        },
        scrollEnd(event) {
            if (!this.isInit) return


            // let offsetY = event.contentOffset.y || ''
            // if (offsetY % this.itemHeight != 0) {
            //     let firstVisibleItemIndex = Math.abs(Math.round(offsetY / 70))
            //     this.itemIndex = firstVisibleItemIndex
            // }

            // const el = this.$refs['item'][0]
            // dom.scrollToElement(el, { offset: this.itemIndex * 70 })
            this.scrollToIndexItem(this.itemIndex);
            this.$emit('onChange', this.listArray[this.itemIndex])
        },
        scrollToIndexItem(index, animated = true) {
            let el = this.$refs.item[index]
            if (el) {
                let sid = setInterval(() => next(), 100)
                let next = () => {
                    dom.getComponentRect(el, (options) => {
                        if (options.result && options.size.bottom) {
                            dom.scrollToElement(el, { animated: animated, offset: index == 0 ? 0 : (- Math.floor((this.wrapHeight / this.itemHeight) / 2) * this.itemHeight) });
                            this.isInit = true
                        } else {
                            setTimeout(() => next(), 100)
                        }
                    })
                    clearInterval(sid)
                }
            }
        }
    },
    mounted() {
        if (this.itemIndex != null) {
            this.scrollToIndexItem(this.itemIndex, false)
        }
    },
    created() {
    //   var _listArray = this.listArray;
    //   for(var i=0; i< _listArray.length; i++){
    //       if(_listArray[i] == this.listItem){
    //           this.itemIndex = i;
    //       }
    //   }
    }
}
</script>

<style>
.wrap {
    position: relative;
    flex-direction: row;
    background-color: #ffffff;
}
.scroller {
    flex: 1;
    align-content: center;
    align-items: center;
    background-color: transparent;
}
.list-item {
    width: 300px;
    height: 70px;
    font-family: PingFangSC-Regular;
    font-size: 40px;
    color: #000000;
    text-align: center;
    padding: 8px;
}
.first-item {
    margin-top: 140px;
}
.last-item {
    margin-bottom: 140px;
}
.first-visible-item {
    opacity: 0.1;
    font-size: 40px;
}
.second-visible-item {
    opacity: 0.3;
    font-size: 40px;
}
.second-last-visible-item {
    opacity: 0.3;
    font-size: 40px;
}
.first-last-visible-item {
    opacity: 0.1;
    font-size: 40px;
}
.selected-item {
    opacity: 1;
    color: #000000;
    font-size: 48px;
}
.unselected-item {
    opacity: 0.3;
    color: #000000;
}
.select-area {
    position: absolute;
    left: 0px;
    border-top-color: #e5e5e5;
    border-top-width: 1px;
    border-bottom-color: #e5e5e5;
    border-bottom-width: 1px;
    /* background-color: aquamarine; */
}
</style>