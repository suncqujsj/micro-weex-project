<template>
    <div class="wrapper">
        <div class="tab-wrapper" ref="tabItem">
            <div v-for="(item,index) in tabArray" :key="index" class="tab-item" @click="tabClicked(index)">
                <text class="tab-txt" :class="[item.selected?'tab-txt-selected':'']">{{item.name}}</text>
            </div>
        </div>
        <div class="indicator-wrapper" ref="indicator" :style="{width:indicatorWrapperWidth}">
            <div class="tab-indicator" :style="{width:indicatorWidth}">
            </div>
        </div>
    </div>
</template>

<style lang="less" type="text/less">
    @import (reference) "../../../common/less/common";
    @tabHeight:24*2px;
    @tabsWidth:103*2px;

.wrapper {
  padding: 0px;
  margin: 0px;
  display: flex;
    width: @tabsWidth;
    background-color: transparent;
}
.tab-wrapper {
  flex-direction: row;
  height: @tabHeight;
    .radius(3*2px);
    .border(1px, @white);
}
.tab-item {
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.tab-txt {
  font-family: PingFangSC-Medium;
  font-size: 14*2px;
  line-height: 45px;
  .white;
}
.tab-txt-selected {
  color: #FFBD00;
}
.tab-indicator {
  /*border-top-style: solid;*/
  /*border-top-color: #000;*/
  /*border-top-width: 2px;*/
  /*position: relative;*/
  /*align-items: center;*/
    .bg-white;
    height: @tabHeight;
    width: @tabsWidth;
}
.indicator-wrapper {
  /*width: 375px;*/
  align-items: center;
  justify-content: center;
    .pos(a);
  top: 0px;
    z-index:0;
}
</style>

<script>
const wrapperWidth = 104*2;

const modal = weex.requireModule('modal');
const animation = weex.requireModule('animation');
const dom = weex.requireModule('dom');
export default {
    name: 'mideaTab',
    props: {
        tabArray: {
            type: Array
        }
    },
    methods: {
        tabClicked(index) {
            var len = this.tabArray.length;
            for (var i = 0; i < this.tabArray.length; i++) {
                this.tabArray[i].selected = false;
            }
            Vue.set(this.tabArray[index], "selected", true);
            var strLen = this.tabArray[index].name.length;
            this.setIndicatorWidth(index)
            var xDis = index * (wrapperWidth / len) + "px";
            var ref = this.$refs.indicator;
            animation.transition(ref, {
                styles: {
                    transform: 'translate(' + xDis + ',0px)',
                    transformOrigin: 'center center'
                },
                duration: 250, //ms
                timingFunction: 'ease',
                delay: 0 //ms
            }, function () {

            });
            this.$emit('tabClicked', index)
        },
        setIndicatorWidth(index) {
            let tabItem = this.$refs.tabItem;
            dom.getComponentRect(tabItem.children[index].children[0], (result) => {
                let size = result.size || {};
                this.indicatorWidth = size.width + "px";
            });
        }
    },
    data: function () {
        return {
            indicatorWrapperWidth: 0,
            indicatorWidth: 0,
        }
    },
    created() {
        var len = this.tabArray.length;
        this.indicatorWrapperWidth = (wrapperWidth / len) + "px";
    },
    mounted() {
        this.setIndicatorWidth(0)
        if(this.tabArray[1].selected) this.tabClicked(1);
    }

}
</script>

