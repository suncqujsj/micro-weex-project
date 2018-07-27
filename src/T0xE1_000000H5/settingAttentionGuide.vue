<template>
<div>
   <div>
      <midea-header 
      title= '注意事项'
      :showSubTitle="false"
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="assets/img/home_btn_bace@2x.png" 
      rightImg="assets/img/home_btn_more@2x.png"
      :showRightImg="false"  
      @leftImgClick="backClick" 
      @centerClick="centerClick"
      @rightImgClick="rightImgClick"></midea-header>
    </div>
    <div class="contain">
     
      <div class="">
        <slider class="slider" auto-play="false" infinite="false">
          <div v-for="item in posters" style="width:750px">
            
            <div class="flex_center">
              <image class="size" :style="{width:item.slideWidth,height:item.slideHeight}" :src="item.url"></image>
            </div>
          </div>
          <indicator class="indicator"></indicator>
        </slider>
      </div>
    </div>
   
   
</div>
</template>
<style scoped>
.contain{
  padding-top: 30px;
}
.title{
  font-size: 50px;
  color: #2e9eee;
}
.title_content{
  font-size: 30px;
  margin-left: 70px;
  position: relative;
  top: -46px;
}
.title_section{
  
}
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.img_section{
  align-items: center;
}
.size {
    padding-bottom: 100px;
    resize:contain;
  }
  .slider {
    position: relative;
    width: 750px;
    height: 1100px;
  }
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    /* background-color: rgba(0, 0, 0, 0.3); */

    itemColor: #DDDDDD;
    itemSelectedColor: rgb(0, 180, 255);
  }
</style>
<script>

import mideaHeader from '../midea-component/header.vue'
import nativeService from "../common/services/nativeService";
export default {
  components: { mideaHeader },
  data() {
    return {
      lackTypeObj: {},
      slideWidth: '628',
      slideHeight: '900',
       posters: [
          {url:'assets/img/tips/img_attention1@2x.png',order:'01',slideWidth:'628px',slideHeight:'910px'},
            {url:'assets/img/tips/img_attention2@2x.png',order:'02',slideWidth:'673px',slideHeight:'972px'},                   
        ]
    };
  },

  methods: {
    backClick() {
      var path = "settingIndex.js";
      nativeService.goTo(path,false, true);
    },
  },
  created() { 
  
  },
  mounted() {   
    
  }
};
</script>