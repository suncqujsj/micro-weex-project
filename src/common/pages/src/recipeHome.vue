<style lang="less" type="text/less">
    @import "../../less/recipeHome.less";
    .list {
    width: 750px;
    background-color: #EFEFEF;
  }
  .banner-image {
    width: 750px;
    height: 235px;
  }
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
    
    <list class="list" @loadmore="loadmore"  loadmoreoffset=50 show-scrollbar=false>
      <cell class="cell" v-for="num in lists">
        <div class="panel">
          <text class="text">{{num}}</text>
        </div>
      </cell>
    </list>

    <div class="recipe-bottom-bar">
      <midea-tab ref="mTab" :tabArray="tabData" @tabClicked="tabClicked">
      </midea-tab>
    </div>
  </div>
</template>

<script>
  import MideaHeader from '@/midea-component/header.vue'
  import mideaTab from '@/midea-component/mTab.vue'
  import recipeContent from './recipeContent.vue'
  import nativeService from "@/common/services/nativeService";
  export default {
    data () {
    
      return {
        lists: ['A', 'B', 'C', 'D', 'E',1,2,1,1,1,1,1,1,1,1,1,1,,1,1,1,1,11,1,88],
         tabData:[
            {"name":"菜谱","selected":true},
            {"name":"mike","selected":false},
            {"name":"我的","selected":false},
          ]
      }
    },
    components:{MideaHeader,mideaTab,recipeContent},
    methods: {
      loadmore(){
        let self = this;
        // setTimeout(() => {
        //   for(var i=0; i< 10; i++){
        //     self.lists.push(i+'dd');
        //   }
        // }, 100);
      }
    }
  }
</script>