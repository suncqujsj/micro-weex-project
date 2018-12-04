<template>
    <div class="wrapper">
        <midea-header title="Custom loading" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <scroller class="scroller-wrapper">
            <midea-title-bar title="默认样式" bgColor="#EEF4F7"></midea-title-bar>
            <midea-custom-loading></midea-custom-loading>
        </scroller>
    </div>
</template>

<script>  
import base from '../base'

import mideaTitleBar from '@/midea-component/title-bar.vue'
import mideaCustomLoading from '@/midea-component/customLoading.vue'

import nativeService from '@/common/services/nativeService'

export default {
  components: { 
    mideaTitleBar,
    mideaCustomLoading
  },
  mixins: [base],
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {}
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
</style>