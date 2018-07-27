<template>
<div>
    <div>
      <midea-header 
      :title="instructionobj.name" 
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="assets/img/home_btn_bace@2x.png" 
      rightImg="assets/img/home_btn_more@2x.png"
      :showLeftImg="true"
      :showRightImg="false"  
      @leftImgClick="backClick" 
      @rightImgClick="jumpNext('settingIndex')"></midea-header>
    </div>
   <div class="demo_section">
      <image v-if="guideImg" :src="guideImg" class="guide_img"></image>
      <text class="demo_content">{{guideText}}</text>
   </div>
   
</div>
</template>
<style scoped>
.demo_section {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
}
.demo_title {
  font-size: 34px;
}
.demo_content {
  font-size: 28px;
}
.guide_img{
  width:700px;
  height: 300px;
  resize: contain;
}
</style>
<script>

import mideaHeader from '../midea-component/header.vue'
import nativeService from "../common/services/nativeService";
export default {
  components: { mideaHeader },
  data() {
    return {
      instructionobj: {},
      guideImg:'',
      guideText:''
    };
  },

  methods: {
    backClick(){
      var path = "weex.js";
      nativeService.goTo(path,false, true);
    }
  },
  created() { 
    var self = this;
    nativeService.getItem("firstInstruction", function(obj) {
        var _data = obj.data;
        var dataJson = JSON.parse(_data);
        //nativeService.toast(dataJson);
        self.instructionobj = dataJson;
         if(dataJson.whichInstruction=='selectInstruction'){
          self.guideImg = 'assets/img/setting/qiuck@2x.png';
        }
        if(dataJson.whichInstruction=='keepingInstruction'){
          self.guideImg = 'assets/img/setting/safeKeep@2x.png';
        }
        if(dataJson.whichInstruction=='helpInstruction'){
          self.guideImg = '';
          self.guideText = '用户输入就餐情况（餐具，油污程度，放置时长），智能助手将自动推荐出合适的洗涤程序。';

        }
      }); //注obj为字符串
  },
  mounted() {   
    
  }
};
</script>