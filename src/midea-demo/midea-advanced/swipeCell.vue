<template>
  <div class="wrapper">
    <midea-header title="SwipeCell" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
    <midea-swipe-cell :left-width="130" :right-width="130" @click="onClick">
      <text slot="left" style="font-size: 32px; color: #ffffff">选择</text>
      <midea-cell title="左右操作" :hasArrow="true" :hasMargin="true" :hasTopBorder="false" :hasBottomBorder="false" :hasSubBottomBorder="false" :clickActivied="true" :cell-style="{marginTop: '24px', width: '750px'}" @mideaCellClick="itemClicked">
      </midea-cell>
      <text slot="right" style="font-size: 32px; color: #ffffff">删除</text>
    </midea-swipe-cell>

    <midea-swipe-cell :left-width="130" :right-width="130" :disabled="true" @longpress="onLongPress">
      <text slot="left" style="font-size: 32px; color: #ffffff">选择</text>
      <midea-cell title="禁用侧滑" :hasArrow="true" :hasMargin="true" :hasTopBorder="false" :hasBottomBorder="false" :hasSubBottomBorder="false" :clickActivied="true" :cell-style="{width: '750px'}" @mideaCellClick="itemClicked">
      </midea-cell>
      <text slot="right" style="font-size: 32px; color: #ffffff">删除</text>
    </midea-swipe-cell>

    <midea-swipe-cell :right-width="150" @click="onClick">
      <midea-cell title="准带右侧操作" :hasArrow="true" :hasTopBorder="false" :hasBottomBorder="false" :hasSubBottomBorder="false" :clickActivied="true" :cell-style="{width: '750px'}" @mideaCellClick="itemClicked">
      </midea-cell>
      <text slot="right" style="font-size: 32px; color: #ffffff">取消收藏</text>
    </midea-swipe-cell>

    <midea-swipe-cell :left-width="130" :right-width="130" :disabled="!isIos" @click="onClick" @longpress="onLongPress">
      <text slot="left" style="font-size: 32px; color: #ffffff">选择</text>
      <midea-cell title="andorid长按/ios侧滑" :hasArrow="true" :hasMargin="true" :hasTopBorder="false" :hasBottomBorder="false" :hasSubBottomBorder="false" :clickActivied="true" :cell-style="{marginTop: '24px', width: '750px'}" @mideaCellClick="itemClicked">
      </midea-cell>
      <text slot="right" style="font-size: 32px; color: #ffffff">删除</text>
    </midea-swipe-cell>

  </div>
</template>
<style scoped>
.link-text {
  color: #333333;
  font-size: 28px;
}
.value {
}
.wrapper {
  background-color: #f2f2f2;
  position: relative;
}
</style>
<script>  
import base from '../base'

import mideaCell from '@/midea-component/cell2.vue'
import mideaSwipeCell from '@/midea-component/swipe-cell.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
  components: { mideaCell, mideaSwipeCell },
  mixins: [base],
  data() {
    return {
      selected: 1
    }
  },
  methods: {
    itemClicked() {
      nativeService.toast("button clicked");
    },

    onClick(pos) {
      nativeService.toast(pos)
    },

    onLongPress() {
      nativeService.toast('longPress')
    }
  },
  created() {
    this.isIos = weex.config.env.platform == 'iOS' ? true : false;
  }
};
</script>