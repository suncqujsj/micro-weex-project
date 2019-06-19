<style lang="less" type="text/less">
    @import "../../../less/recipeHome.less";
</style>
<template>
  <div>
     <midea-header bgColor="transparent" leftImg="img/header/public_ic_gray@3x.png" title="mike" titleText="black" :isImmersion="true" :showLeftImg="true" @leftImgClick="back2Native" >
        <div slot="customerContent" class="header-top-wrapper">
            <div class="header-top-inner-wrapper">
                <div  class="header-right-image-wrapper" @click="onCloudMenuIconClicked">
                    <image class="header-right-image" :src="'img/header/public_ic_cloud_recipe@3x.png'"></image>
                </div>
                <div class="header-right-image-wrapper" @click="childLock(true)">
                    <image class="header-right-image" :src="'img/header/public_ic_babylock@3x.png'"></image>
                </div>
                <div class="header-right-image-wrapper" @click="openMorePage">
                    <image class="header-right-image" :src="'img/header/me_ic_set@3x.png'"></image>
                </div>
            </div>
        </div>
    </midea-header>
    
    <recipe-page v-if="recipePageShow" />

    <mike-page v-if="mikePageShow" />

    <me-page v-if="mePageShow" />

    <mike-home-footer-bar @tabClickHandle="_tabClickHandle" />
  </div>
</template>

<script>
  import MideaHeader from '@/midea-component/header.vue'
  import recipePage from './recipePage.vue'
  import mikePage from './mikePage.vue'
  import mePage from './mePage.vue'
  import mikeHomeFooterBar from './component/mikeHomeFooterBar.vue'
  import nativeService from "@/common/services/nativeService";

  export default {
    mixins: [],
    data () {
      return {
          recipePageShow: true,
          mikePageShow: false,
          mePageShow: false,
      }
    },
    components:{MideaHeader,recipePage,mikeHomeFooterBar,mikePage,mePage},
    methods: {
      back2Native(){
          nativeService.backToNative()
      },
      _tabClickHandle(data){
        this.recipePageShow = false;
        this.mikePageShow = false;
        this.mePageShow = false;
        switch (data) {
          case 0:
            this.recipePageShow = true;
            break;
          case 1:
            this.mikePageShow = true;
            break;
          case 2:
            this.mePageShow = true;
            break;
          default:
            break;
        }
      }
    }
  }
</script>