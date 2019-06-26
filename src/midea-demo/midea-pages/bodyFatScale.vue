<template>
  <div class="wrapper">
    <midea-header
      bg-color="#07c160"
      title-text="#ffffff"
      title="体脂秤"
      @leftImgClick="back"
      :showRightImg="true"
      leftImg="./img/header/ic_back@3x.png"
      rightImg="../assets/img/smart_ic_reline@3x.png"
      @rightImgClick="reload">
    </midea-header>
    <list class="list" :show-scrollbar="false">
      <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
      </refresh>
      <cell class="status-wrapper">
        <div class="status" v-if="!refreshing">
          <div class="weight-wrapper">
            <text class="weight">{{weight}}</text>
            <text class="unit">斤</text>
          </div>
          <text class="tip">下拉链接体脂秤</text>
        </div>
        <div class="status" v-if="refreshing">
          <image class="indicator" src="../assets/img/loading.gif" resize="container"></image>
        </div>
      </cell>
    </list>
    <list class="content-wrapper" :show-scrollbar="false">
      <cell class="main-cell">
        <midea-collapse title="BMI 19.1" desc="标准" height="108">
          <div slot="left-icon" class="collapse-icon"></div>
          <div slot="content" class="collapse-content">
            <div class="collapse-content-main">
              <text class="collapse-text">
                身体质量指数, 等于体重(kg)除以身高(m)的平方.MBI越大, 身材距离超模和明星们就越远(专业运动员除外)
              </text>
            </div>
          </div>
        </midea-collapse>

        <midea-collapse title="体脂 22.8%" height="108">
          <div slot="left-icon" class="collapse-icon"></div>
          <text slot="desc" class="desc1">偏低</text>
          <div slot="content" class="collapse-content">
            <div class="collapse-content-main">
              <text class="collapse-text">
                身体质量指数, 等于体重(kg)除以身高(m)的平方.MBI越大, 身材距离超模和明星们就越远(专业运动员除外)
              </text>
            </div>
          </div>
        </midea-collapse>

        <midea-collapse title="水分 52.1%" desc="正常" height="108">
          <div slot="left-icon" class="collapse-icon"></div>
          <div slot="content" class="collapse-content">
            <div class="collapse-content-main">
              <text class="collapse-text">
                身体质量指数, 等于体重(kg)除以身高(m)的平方.MBI越大, 身材距离超模和明星们就越远(专业运动员除外)
              </text>
            </div>
          </div>
        </midea-collapse>

        <midea-collapse title="肌肉 75%" desc="正常" height="108">
          <div slot="left-icon" class="collapse-icon"></div>
          <div slot="content" class="collapse-content">
            <div class="collapse-content-main">
              <text class="collapse-text">
                身体质量指数, 等于体重(kg)除以身高(m)的平方.MBI越大, 身材距离超模和明星们就越远(专业运动员除外)
              </text>
            </div>
          </div>
        </midea-collapse>

        <midea-collapse title="骨骼 10%" desc="正常" height="108">
          <div slot="left-icon" class="collapse-icon"></div>
          <div slot="content" class="collapse-content">
            <div class="collapse-content-main">
              <text class="collapse-text">
                身体质量指数, 等于体重(kg)除以身高(m)的平方.MBI越大, 身材距离超模和明星们就越远(专业运动员除外)
              </text>
            </div>
          </div>
        </midea-collapse>

        <midea-collapse title="基础消耗 1140千卡" height="108">
          <div slot="left-icon" class="collapse-icon"></div>
          <text slot="desc" class="desc1">偏低</text>
          <div slot="content" class="collapse-content">
            <div class="collapse-content-main">
              <text class="collapse-text">
                身体质量指数, 等于体重(kg)除以身高(m)的平方.MBI越大, 身材距离超模和明星们就越远(专业运动员除外)
              </text>
            </div>
          </div>
        </midea-collapse>
      </cell>
    </list>

    <div :class="['footer', isipx && 'ipx-b']">
      <div class="footer-item">
        <div class="icon-wrapper"></div>
        <text class="item-title">手动计体重</text>
      </div>
      <div class="footer-item" @click="goToRecord">
        <div class="icon-wrapper"></div>
        <text class="item-title">记录统计</text>
      </div>
      <div class="footer-item">
        <div class="icon-wrapper"></div>
        <text class="item-title">健康信息</text>
      </div>
    </div>
  </div>
</template>

<script>
import base from '../base'
import MideaCollapse from '@/midea-component/collapse.vue'
import nativeService from '../../common/services/nativeService';
export default {
  mixins: [base],
  components: {
    MideaCollapse
  },
  data() {
    return {
      refreshing: false,
      weight: 102
    }
  },
  
  computed: {
    isipx: function () {
      return weex && (
        weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
        || weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
        || weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
        || weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
        );
    },
  },

  methods: {
    onrefresh() {
      this.refreshing = true;
      setTimeout(()=> {
        this.refreshing = false;
      }, 3000);
    },

    goToRecord() {
      let path = "midea-pages/record.js";
      nativeService.goTo(path);
    }
  }
}
</script>

<style scoped>
  .wrapper {
    align-items: center;
    background-color: #f5f5f5;
  }
  .list {
    width: 750px;
    height: 420px;
    background-color: #07c160;
  }
   
   .refresh {
     justify-content: center;
     align-items: center;
   }
  .indicator {
    margin-top: 32px;
    width: 80px;
    height: 80px;
    color: #ffffff;
  }

  .status-wrapper {
    justify-content: center;
    align-items: center;
    width: 750px;
    height: 420px;
  }

  .status {
    justify-content: center;
    align-items: center;
    margin-top: -32px;
    width: 750px;
  }

  .weight-wrapper {
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
  }
  .weight {
    font-family: PingFangSC-Regular;
    font-size: 180px;
    color: #ffffff;
  }

  .unit {
    font-family: PingFangSC-Regular;
    padding-bottom: 36px;
    font-size: 28px;
    color: #ffffff;
  }

  .tip {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #ffffff;
  }

  .content-wrapper {
    margin-top: -60px;
    width: 686px;
    height: 626px;
    background-color: #ffffff;
    border-radius: 10px;
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-top: 20px;
    width: 750px;
    background-color: #ffffff;
  }

  .ipx-b {
    padding-bottom: 68px;
  }

  .footer-item {
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .icon-wrapper {
    width: 72px;
    height: 72px;
    background-color: #e5e5e8;
    border-radius: 72px;
  }

  .item-title {
    padding-top: 20px;
    padding-bottom: 20px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #000000;
  }

  .collapse-icon {
    margin-right: 32px;
    width: 72px;
    height: 72px;
    background-color: #07c160;
    border-radius: 72px;
  }

  .collapse-content {
    padding-left: 104px;
  }

  .collapse-content-main {
    border-bottom-width: 1px;
    border-bottom-color: #e5e5e8;
  }

  .collapse-text {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #666666;
  }

  .desc1 {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #ff5566;
  }
</style>
