<template>
  <div class="wrapper">
    <midea-header title="Cell" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
    <midea-cell title="仅标题且带底部边距" :hasArrow="true" :hasMargin="true" :hasTopBorder="false" :hasBottomBorder="false" :hasSubBottomBorder="false" :clickActivied="true" style="margin-top:24px" @mideaCellClick="itemClicked">
    </midea-cell>
    <midea-cell title="标题附带描述" desc="描述" :hasMargin="true" :hasArrow="true" :clickActivied="true" :hasTopBorder="false" :hasBottomBorder="false" :hasSubBottomBorder="false" @mideaCellClick="itemClicked">
    </midea-cell>
    <midea-cell title="带右边文字" rightText="设置" :hasTopBorder="false" :hasMargin="true" :hasBottomBorder="false" :hasSubBottomBorder="false" @mideaCellClick="itemClicked">
    </midea-cell>
    <midea-cell title="带右边文字和导航" rightText="设置" :hasTopBorder="false" :hasBottomBorder="false" :hasArrow="true" :clickActivied="true" @mideaCellClick="itemClicked">
    </midea-cell>
    <midea-cell title="带图标且自动设置高度" desc="描述" rightText="设置" :hasArrow="true" :hasBottomBorder="false" :hasTopBorder="false" :clickActivied="true" itemImg="../img/check/checked.png" @mideaCellClick="itemClicked">
    </midea-cell>

    <midea-cell label="动态插入文本" @mideaCellClick="itemClicked" :hasTopBorder="false" :hasBottomBorder="false" :hasArrow="false">
      <text class="link-text" slot="text" v-if="selected==1"> 不可关联</text>
      <text class="link-text" slot="text" v-if="selected==2"> 已关联</text>
    </midea-cell>

    <midea-cell label="动态插入切换按键" @mideaCellClick="itemClicked" :hasArrow="false" :hasTopBorder="false" :hasBottomBorder="false" :hasSubBottomBorder="false">
      <midea-switch2 class="value" slot="value"> </midea-switch2>
    </midea-cell>

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
import MideaSwitch2 from '@/midea-component/switch2.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
  components: { mideaCell, MideaSwitch2 },
  mixins: [base],
  data() {
    return {
      selected: 1
    }
  },
  methods: {
    itemClicked() {
      nativeService.toast("button clicked");
    }
  },
  created() {
    this.isIos = weex.config.env.platform == 'iOS' ? true : false;
  }
};
</script>