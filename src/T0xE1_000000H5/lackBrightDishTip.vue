<template>
<div>
   <div>
      <midea-header 
      title= '亮碟剂添加步骤'
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
          <div v-for="item in posters" style="width:700px">
             <div class="title_section">
              <text class="title">{{item.order}}</text>
              <text class="title_content">{{item.dec}}</text>
            </div>
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
.contain {
  padding-left: 36px;
  padding-top: 20px;
}
.title {
  font-size: 50px;
  color: #2e9eee;
}
.title_content {
  font-size: 30px;
  margin-left: 70px;
  position: relative;
  top: -46px;
}
.title_section {
}
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.img_section {
  align-items: center;
}
.size {
  resize: contain;
  padding-bottom: 100px;
  margin-top: 100px;
}
.slider {
  position: relative;
  width: 700px;
  height: 1100px;
}
.indicator {
  position: absolute;
  left: 0;
  right: 10px;
  bottom: 0;
  height: 60px;
  /* background-color: rgba(0, 0, 0, 0.3); */

   itemColor: #DDDDDD;
   itemSelectedColor: rgb(0, 180, 255);
}
</style>
<script>
import mideaHeader from "../midea-component/header.vue";
import nativeService from "../common/services/nativeService";
export default {
  components: { mideaHeader },
  data() {
    return {
      lackTypeObj: {},
      posters: [
        {
          url: "img/tips/step_liangdieji_1@2x.png",
          slideWidth: "449px",
          slideHeight: "381px",
          order: "01",
          dec: "按箭头方向扮开亮碟剂盒盖"
        },
        {
          url: "img/tips/step_liangdieji_2@2x.png",
          slideWidth: "501px",
          slideHeight: "409px",
          order: "02",
          dec: "添加亮碟剂到容器中"
        },
        {
          url: "img/tips/step_liangdieji_3@2x.png",
          slideWidth: "490px",
          slideHeight: "371px",
          order: "03",
          dec: "关闭亮碟剂盒盖"
        }
      ]
    };
  },

  methods: {
    backClick() {
      var path = "standby.js";
      nativeService.goTo(path, false, true);
    }
  },
  created() {},
  mounted() {}
};
</script>