<template>
    <div class="wrapper">
        <midea-header title="Custom loading" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <scroller class="scroller-wrapper">
            <midea-button text="默认样式" type="primary" @mideaButtonClicked="mideaButtonClicked1">
            </midea-button>

            <midea-button text="白色样式" type="primary" @mideaButtonClicked="mideaButtonClicked2">
            </midea-button>

            <div class="btn-box">
              <midea-button text="透明背景" type="primary" @mideaButtonClicked="mideaButtonClicked3">
              </midea-button>

              <midea-button text="带遮罩层" type="primary" @mideaButtonClicked="mideaButtonClicked4">
              </midea-button>
            </div>

            <midea-custom-loading :isMask="isMask" :display="display1" :bgColor="bgColor" :loadingColor="loadingColor" :opacity="opacity"></midea-custom-loading>
        </scroller>
    </div>
</template>

<script>  
import base from '../base'

import mideaTitleBar from '@/midea-component/title-bar.vue'
import mideaButton from '@/midea-component/button.vue'
import mideaCustomLoading from '@/midea-component/customLoading.vue'

import nativeService from '@/common/services/nativeService'

export default {
  components: { 
    mideaTitleBar,
    mideaButton,
    mideaCustomLoading
  },
  mixins: [base],
  data() {
    return {
      display1: false,
      isMask: false,
      bgColor: 'transparent',
      loadingColor: '#ffffff',
      opacity: 1
    }
  },
  methods: {
    mideaButtonClicked1() {
      this.display1 = true;
      this.bgColor = 'transparent';
      this.loadingColor = '#8a8a8f';
      this.opacity = 0.8;
      this.isMask = false;
    },

    mideaButtonClicked2() {
      this.display1 = true;
      this.bgColor = 'transparent';
      this.loadingColor = '#ffffff';
      this.opacity = 1;
      this.isMask = false;
    },

    mideaButtonClicked3() {
      this.display1 = true;
      this.bgColor = 'rgba(0, 0, 0, 0.5)';
      this.loadingColor = '#ffffff';
      this.opacity = 1;
      this.isMask = false;
    },

    mideaButtonClicked4() {
      this.display1 = true;
      this.bgColor = 'transparent';
      this.loadingColor = '#ffffff';
      this.opacity = 1;
      this.isMask = true;
    }
  }
}
</script>

<style scoped>
  .wrapper {
    flex: 1;
    background-color: #f2f2f2;
  }
  .scroller-wrapper {
    padding-bottom: 50px;
  }
  .btn-box {
    padding-top: 140px;
  }
</style>