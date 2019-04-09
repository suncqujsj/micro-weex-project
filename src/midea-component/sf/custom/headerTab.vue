<template>
    <div class="wrapper">
        <!--<div class="indicator-wrapper" ref="indicator" :style="{width:indicatorWrapperWidth}">
            <div class="tab-indicator" :style="{width:indicatorWidth}">
            </div>
        </div>-->
        <div class="tab-wrapper">
            <div v-for="(item,index) in tabArray" :key="index" class="tab-item" @click="tabClicked(index)">
                <div>
                    <text class="tab-txt" :class="[item.selected?'tab-txt-selected':'']">{{item.name}}</text>
                </div>
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
    width: @tabsWidth;
    background-color: transparent;
}
.tab-wrapper {
  display: flex;
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
  line-height: 48px;
  .white;
  display: block;
  width: 103px;
  text-align: center;
  .radius(3*2px);
}
.tab-txt-selected {
  color: #FFBD00;
  background-color: white;
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
            this.tabArray[index].selected = true;
            this.$emit('tabClicked', index);
        }
    },
    data: function () {
        return {
          
        }
    },
    created() {
       
    },
    mounted() {
        if(this.tabArray[1].selected) this.tabClicked(1);
    }

}
</script>

