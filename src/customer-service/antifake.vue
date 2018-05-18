<template>
  <div class="wrapper">
    <midea-header :title="title" @leftImgClick="back"></midea-header>
    <image class="advertisement" src="./assets/img/progress.png" resize='contain'></image>

    <div class="item-group">
      <text class="info-title">滤芯防伪查询</text>
    </div>

    <div class="item-group scan-group group-bottom-border">
      <input class="scan-input" type="text" placeholder="请输入编号或扫描二维码" :autofocus=false value="" @change="onchange" @input="oninput" />

      <image class="scan-icon" src="./assets/img/progress.png" resize='contain'></image>
    </div>

    <div class="item-group scan-group group-bottom-border">
      <input class="scan-input" type="text" placeholder="请输入4位验证码" :autofocus=false value="" @change="onchange" @input="oninput" />
    </div>
    <div class="item-group info-group">
      <text class="info-label">适用于生产日期2017年7月1日之后的滤芯</text>
    </div>

    <div class="action-bar">
      <midea-button text="提交" type="green" @mideaButtonClicked="submit">
      </midea-button>
    </div>
  </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService';

import mideaButton from '@/midea-component/button.vue'

export default {
  components: {
    mideaButton
  },
  mixins: [base],
  data() {
    return {
      title: '滤芯防伪'
    }
  },
  methods: {
    onchange() {

    },
    oninput() {

    },
    submit() {

    }
  },
  created() {

  }
}
</script>

<style>
.wrapper {
  background-color: #ffffff;
  position: relative;
}
.advertisement {
  width: 750px;
  height: 700px;
  margin-bottom: 30px;
}
.item-group {
  padding: 24px;
}

.group-bottom-border {
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}

.info-title {
  font-size: 32px;
  font-weight: bold;
}
.scan-group {
  flex-direction: row;
}
.scan-input {
  flex: 1;
  font-size: 28px;
  margin-right: 20px;
}
.scan-icon {
  height: 40px;
  width: 40px;
}
.info-group {
  flex-direction: row;
}
.info-label {
  flex: 1;
  font-size: 26px;
  margin-right: 20px;
  text-align: left;
  color: #e2e2e2;
}
.action-bar {
  position: fixed;
  bottom: 0px;
  width: 750px;
  text-align: center;
}
</style>
