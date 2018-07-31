<template>
  <div class="wrapper">
      <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" :showLeftImg="true" @leftImgClick="back">
      </midea-header>
      <scroll>
          <cell class="group-gap-top"></cell>
          <div class="detail-content">
              <div>
                  <text class="detail-title">添加家庭</text>
              </div>
              <div class="detail-step">
                  <text class="detail-title">设置 - 家庭管理 - 添加家庭</text>
              </div>

              <div>
                  <text class="tip-title">提示条款</text>
              </div>

              <div>
                  <text class="tip-info">美的提醒您：在使用美的平台各项服务前，请您务必仔细阅读并透彻理解本声明。如对本声明内容有任何疑问，您可向美的平台客服咨询。阅读本声明的过程中，如果您不同意本声明或其中任何内容，您应立即停止使用美的平台服务。如果您使用美的平台服务的，即意味着您认可本声明全部内容。</text>
              </div>
          </div>
      </scroll>
  </div>
</template>

<script>
  import base from '../base'
  import nativeService from '../settings/nativeService'
  import debugUtil from '@/common/util/debugUtil'
  import util from '@/common/util/util'

  export default {
    mixins: [base],
    data() {
      return {
        title: '如何添加家庭'
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    flex: 1;
    background-color: #f2f2f2;
  }

  .group-gap-top {
    height: 24px;
  }

  .detail-content {
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    background-color: #fff;
  }

  .detail-title {
    font-family: PingFangSC-Medium;
    font-size: 28px;
    font-weight: 600;
    color: #000;
  }

  .detail-step {
    padding-top: 24px;
    padding-bottom: 46px;
  }

  .tip-title {
    font-family: PingFangSC-Medium;
    line-height: 36px;
    font-size: 24px;
    font-weight: 600;
    color: #000;
  }

  .tip-info {
      padding-top: 8px;
      font-family: PingFangSC-Regular;
      line-height: 36px;
      font-size: 24px;
      color: #666;
  }

</style>


