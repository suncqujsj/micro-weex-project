<template>
    <div class="wrap" :style="wrapHeight">
        <div class="select-area"></div>
        <scroller class="scroller" show-scrollbar=false @scroll="scroll" @scrollend="scrollEnd">
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
        listArray: {
            type: Array,
            default: function(){
                return []
            }
        },
        itemIndex: {
            type: Number,
            default: 0
        },
        wrapHeight: {
            type: Number,
            default: 350
        }
    },
    computed: {
        wrapStyle(){
            return {
                height: this.wrapHeight
            }
        }
    },
    data() {
        return {
            itemHeight: 70
        }
    },
    methods: {
        scroll(event) {
            console.dir(event)
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
        },
    },
    mounted() {
    },
    created() {
    }
}
</script>

<style>
.wrap {
  width: 750px;
  height: 350px;
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
  font-size: 28px;
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
  opacity: 0.3;
}
.second-visible-item {
  opacity: 0.6;
}
.second-last-visible-item {
  opacity: 0.6;
}
.first-last-visible-item {
  opacity: 0.3;
}
.selected-item {
  opacity: 1;
  color: #000000;
}
.unselected-item {
  opacity: 0.6;
  color: #000000;
}
.select-area {
  position: absolute;
  top: 136px;
  left: 0px;
  width: 750px;
  height: 72px;
  padding-left: 120px;
  padding-right: 120px;
  border-top-color: #e2e2e2;
  border-top-width: 1px;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
  /* background-color: aquamarine; */
}
</style>
