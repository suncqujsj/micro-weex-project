<template>
    <div class="wrap" :style="wrapStyle">
    <!-- <div v-if="isShow" class="wrap" :style="wrapStyle"> -->
        <div class="select-area"></div>
        <scroller class="scroller" :style="scrollerStyle" :show-scrollbar="false" @scroll="scroll" @scrollend="scrollEnd">
            <div v-for="(item, index) in listArray" :key="index" :ref="ref">
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
        <text class="unit">{{unit}}</text>
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
        pickerIndex: {
            type: Number,
            default: 0
        },
        listArray: {
            type: Array,
            default: function(){
                return []
            }
        },
        listItem: {
            type: Number,
            default: 10
        },
        unit: {
            type: String,
            default: ''
        },
        target: {
            type: String,
            default: ''
        },
        wrapHeight: {
            type: Number,
            default: 350
        },
        wrapWidth: {
            type: Number,
            default: 450
        }
    },
    computed: {
        ref(){
            return `item${this.pickerIndex}`
        },
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
            itemHeight: 70,
            itemIndex: 0
        }
    },
    watch: {
        isShow(value) {
            if (value) {
                this.$nextTick(() => {
                    //dom.scrollToElement(this.$refs.item[this.itemIndex], {})
                })
            }
        },
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
            const el = this.$refs[this.ref][0]
            dom.scrollToElement(el, { offset: this.itemIndex * 70 })
            this.$emit('onChange', {index: this.pickerIndex, value: this.listArray[this.itemIndex], ref: this.ref})
        }
    },
    mounted() {
        const el = this.$refs[this.ref][0]

        var _listArray = this.listArray;
        for(var i=0; i< _listArray.length; i++){
            if(_listArray[i] == this.listItem){
                this.itemIndex = i;
            }
        }
        dom.scrollToElement(el, { offset: this.itemIndex * 70 })
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
  flex-direction: row;
    justify-content: center;
    align-items: center;
  background-color: #ffffff;
}
.scroller {
  flex: 3;
  align-content: center;
  align-items: center;
}
.unit{
    font-size: 40px;
    flex:1;
    margin-left: -100px;
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