<template>
<div>
    <div>
      <midea-header 
      :title="guideObj.name" 
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="img/home_btn_bace@2x.png" 
      rightImg="img/home_btn_more@2x.png"
      :showRightImg="false"  
      @leftImgClick="backClick" 
      @rightImgClick="rightImgClick"></midea-header>
    </div>
   <div class="demo_section">
      <div class="flex_center">
        <image v-if="guideImg" :src="guideImg" :style="{width:guideWidth,height:guideHeight}" class="guide_img"></image>
      </div>
      <text v-if="guideText" class="demo_content">{{guideText}}</text>

      <div>
       <scroller class="guide_list">
          <div class="guide_list_item" v-for="(item,i) in list" @click="jumpNext(item)" >
            <div class="">
               <text class="item_section" v-if="item.title">{{item.title}}</text>
                <text class="guide_item_text">
                  {{item.name}}
                </text>
            </div>
           
            <image style="width:12px;height:23px;" src="img/arrow_right.png"></image>
          </div>
        </scroller>
      </div>
   </div>
   
</div>
</template>
<style scoped>
.guide_list {
  height: 1000px;
  position: relative;
  /* margin-top: 30px; */
}
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.guide_list_item {
  height: 120px;
  border-bottom-color: #c7c7c7;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: -100px;
  position: relative;
}
.guide_item_text {
  font-size: 30px;
}
.item_section {
  position: absolute;
  top: 34px;
  left: 100px;
  font-size: 34px;
  color: #4abbfc;
  font-weight: bold;
}
.demo_section {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  border-top-color: #ebf4ff;
  border-top-width: 20px;
}
.demo_title {
  font-size: 34px;
}
.demo_content {
  font-size: 28px;
}
.guide_img {
  resize: contain;
}
</style>
<script>
import mideaHeader from "../midea-component/header.vue";
import nativeService from "../common/services/nativeService";
export default {
  components: { mideaHeader },
  data() {
    return {
      guideObj: {},
      guideImg: "",
      guideWidth: "600px",
      guideHeight: "300px",
      guideText: "",
      list: []
    };
  },

  methods: {
    jumpNext(item) {
      nativeService.setItem("problemObj", {
        name: item.name,
        type: item.type
      });
      var path = "settingProblemPage.js";
      nativeService.goTo(path, false, true);
    },
    backClick() {
      var path = "settingIndex.js";
      nativeService.goTo(path, false, true);
    }
  },
  created() {
    var self = this;
    nativeService.getItem("guideObj", function(obj) {
      var _data = obj.data;
      var dataJson = JSON.parse(_data);
      //nativeService.toast(dataJson);
      self.guideObj = dataJson;
      if (dataJson.type == "quickGuide") {
        self.guideImg = "img/setting/qiuck@2x.png";
        self.guideWidth = "680px";
        self.guideHeight = "1100px";
      }
      if (dataJson.type == "safeKeepGuide") {
        self.guideImg = "img/setting/safeKeep@2x.png";
        self.guideWidth = "682px";
        self.guideHeight = "226px";
      }
      if (dataJson.type == "helperGuide") {
        self.guideImg = "";
        self.guideText =
          "用户输入就餐情况（餐具，油污程度，放置时长），智能助手将自动推荐出合适的洗涤程序。";
      }
      if (dataJson.type == "howWorkGuide") {
        self.guideImg = "img/tips/howWork@2x.png";
        self.guideWidth = "668px";
        self.guideHeight = "1076px";
      }
      if (dataJson.type == "problemGuide") {
        self.guideImg = "";
        self.guideText = "";
        self.list = [
          { name: "洗碗机不通电", type: "problem1" },
          { name: "洗碗机排水不畅", type: "problem2" },
          { name: "内碗里有泡沫", type: "problem3" },
          { name: "机器内胆有撞击声", type: "problem4" },
          { name: "内胆内壁有水珠", type: "problem5" },
          { name: "餐具洗不干净", type: "problem6" },
          { name: "餐具没有完全干燥", type: "problem7" },
          { name: "粉盒内有洗碗粉残留", type: "problem8" }
        ];
      }
      if (dataJson.type == "fualtGuide") {
        self.guideImg = "";
        self.guideText = "";
        self.list = [
          { name: "进水异常", type: "faultProblem1", title: "E1" },
          { name: "加热异常", type: "faultProblem2", title: "E3" },
          { name: "发生溢流", type: "faultProblem3", title: "E4" },
          { name: "通讯提示", type: "faultProblem4", title: "Ed" }
        ];
      }

      if (dataJson.type == "connectGuide") {
        self.guideImg = "";
        self.guideText = "客服热线：400-889-9315";
      }
    }); //注obj为字符串
  },
  mounted() {}
};
</script>