<template>
    <div class="wrap" :style="wrapStyle">
    <!-- <div v-if="isShow" class="wrap" :style="wrapStyle"> -->
        <div class="select-area"></div>
        <scroller class="scroller" :style="scrollerStyle" :show-scrollbar="false" @scroll="scroll" @scrollend="scrollEnd">
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
                ]">{{item.value}}</text>
            </div>
        </scroller>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';

const dom = weex.requireModule('dom')

export default {
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        listArray: {
            type: Array,
            default: function(){
                return []
            }
        },
        itemIndex: {
            type: Number,
            default: 999
        },
        wrapHeight: {
            type: Number,
            default: 350
        },
        wrapWidth: {
            type: Number,
            default: 750
        }
    },
    computed: {
        wrapStyle(){
            return {
                width: this.wrapWidth,
                height: this.wrapHeight
            }
        },
        scrollerStyle(){
            return {
                width: this.wrapWidth,
                height: this.wrapHeight
            }
        }
    },
    data() {
        return {
            itemHeight: 70
        }
    },
    watch: {
        isShow(value) {
            if (value) {
                this.$nextTick(() => {
                    // dom.scrollToElement(this.$refs.item[this.itemIndex], {})
                })
            }
        }
    },
    methods: {
        scroll(event) {
            let offsetY = event.contentOffset.y || ''
            if (offsetY % this.itemHeight != 0) {
                let firstVisibleItemIndex = Math.abs(Math.round(offsetY / 70))
                this.itemIndex = firstVisibleItemIndex
            }
        },
        scrollEnd(event) {
            const el = this.$refs['item'][0]
            dom.scrollToElement(el, { offset: this.itemIndex * 70 })
            this.$emit('onChange', this.listArray[this.itemIndex])
        }
    },
    mounted() {
    },
    created() {
    }
}
</script>

<style>
.wrap {
  flex-direction: row;
  background-color: #ffffff;
}
.scroller {
  flex: 1;
  align-content: center;
  align-items: center;
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
  top: 136px;
  left: 0px;
  height: 72px;
  border-top-color: #e2e2e2;
  border-top-width: 1px;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
  /* background-color: aquamarine; */
}
</style>