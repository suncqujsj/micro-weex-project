<template>
<div>
   <div>
      <midea-header 
      title= '使用贴士'
      :showSubTitle="false"
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="img/home_btn_bace@2x.png" 
      rightImg="img/home_btn_more@2x.png"
      :showRightImg="false"  
      @leftImgClick="backClick" 
      @centerClick="centerClick"
      @rightImgClick="rightImgClick"></midea-header>
    </div>
    <div class="contain">
     
      <div class="">
        <slider class="slider" auto-play="false" infinite="false">
          <div v-for="item in posters">
            
            <div class="">
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
  padding-left: 20px;
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
    right: 60px;
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
      slideWidth: '600',
      slideHeight: '800',
       posters: [
          {url:'img/tips/img_tips1@2x.png',order:'01',slideWidth:'720px',slideHeight:'800px'},
            {url:'img/tips/img_tips2@2x.png',order:'02',slideWidth:'520px',slideHeight:'742px'},
            {url:'img/tips/img_tips3@2x.png',order:'03',slideWidth:'750px',slideHeight:'682px'},
            {url:'img/tips/img_tips4@2x.png',order:'04',slideWidth:'750px',slideHeight:'987px'},
            {url:'img/tips/img_tips5@2x.png',order:'05',slideWidth:'600px',slideHeight:'750px'},    
            {url:'img/tips/img_tips6@2x.png',order:'06',slideWidth:'750px',slideHeight:'750px'},                    
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