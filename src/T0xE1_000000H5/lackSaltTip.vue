<template>
<div>
   <div>
      <midea-header 
      title= '软水盐添加步骤'
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
  width: 750px;
  height: 1100px;
}
.indicator {
  position: absolute;
  right: 90px;
  left: 0;
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
          url: "img/tips/step_ruanshuiyan_1@2x.png",
          slideWidth: "240px",
          slideHeight: "355px",
          order: "01",
          dec: "逆时针旋转,打开软水器盖"
        },
        {
          url: "img/tips/step_ruanshuiyan_2@2x.png",
          slideWidth: "492px",
          slideHeight: "396px",
          order: "02",
          dec:
            "插入盐斗,加入洗碗机专用盐,最好每次加满所需的容量,一次添加可多次使用"
        },
        {
          url: "img/tips/step_ruanshuiyan_3@2x.png",
          slideWidth: "461px",
          slideHeight: "424px",
          order: "03",
          dec: "加盐后,向软水器中加满水,不要溢出"
        },
        {
          url: "img/tips/step_ruanshuiyan_4@2x.png",
          slideWidth: "240px",
          slideHeight: "355px",
          order: "04",
          dec: "顺时针扭紧软水器盖,防止漏盐,漏盐会腐蚀内胆"
        },
        {
          url: "img/tips/step_ruanshuiyan_5@2x.png",
          slideWidth: "340px",
          slideHeight: "230px",
          order: "05",
          dec:
            "若有盐洒在内胆,必须运行程序洗一次,否则漏出的盐水可能腐蚀内胆,过滤网,电机等,造成洗碗机损坏"
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