<template>
<div>
    <div>
      <midea-header 
      :title="problemObj.name" 
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="assets/img/home_btn_bace@2x.png" 
      rightImg="assets/img/home_btn_more@2x.png"
      :showRightImg="false"  
      @leftImgClick="backClick" 
      @rightImgClick="rightImgClick"></midea-header>
    </div>
   <div class="demo_section">
      <div>
       <scroller class="guide_list">
          <div class="" v-for="(item,i) in list" >
            <div class="guide_list_item">
               <text class="guide_item_text">
                  {{i+1}}. {{item.name}}
                </text>
            </div>
            <text class="sub_dec">{{item.dec}}</text>
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
.guide_list_item {
  height: 120px;
  border-bottom-color: #c7c7c7;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: -120px;
}
.guide_item_text {
  font-size: 30px;
}
.sub_dec {
  color: #afaeae;
  font-size: 30px;
  margin-left: 46px;
  margin-top: 15px;
  margin-bottom: 15px;
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
  width: 700px;
  height: 300px;
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
      problemObj: {},
      list: []
    };
  },

  methods: {
    backClick() {
      var path = "settingPage.js";
      nativeService.goTo(path, false, true);
    }
  },
  created() {
    var self = this;
    nativeService.getItem("problemObj", function(obj) {
      var _data = obj.data;
      var dataJson = JSON.parse(_data);
      //nativeService.toast(dataJson);
      self.problemObj = dataJson;
      if (dataJson.type == "problem1") {
        self.list = [
          { name: "没有连接电源", dec: "确保电源线插头和插座连接好" }
        ];
      }
      if (dataJson.type == "problem2") {
        self.list = [
          { name: "排水管打结", dec: "检查排水管" },
          { name: "过滤网阻塞", dec: "检查过滤器系统" },
          { name: "厨房下水道堵塞", dec: "检查厨房下水道确保排水畅通" },
          { name: "排水塞子未拔掉", dec: "检查洗碗机排水管口确保塞子拔掉" }
        ];
      }
      if (dataJson.type == "problem3") {
        self.list = [
          {
            name: "洗碗粉使用不正确",
            dec:
              "为了避免泡沫的产生，请使用洗碗机专用的洗碗粉，如果发生这种情况，请打开洗碗机让泡沫挥发掉，在内胆里面添加2～3升水，关上洗碗机门，运行任洗涤程序约20～30秒后关掉电源可将水排出，反复进行以上操作，直到泡沫清除为止"
          },
          { name: "洗碗粉过期，发霉", dec: "使用有效期内的洗碗粉" }
        ];
      }
      if (dataJson.type == "problem4") {
        self.list = [
          {
            name: "喷臂可能被餐具卡住",
            dec: "中断正在运行的程序，重新摆放阻碍喷臂转到的餐具"
          }
        ];
      }
      if (dataJson.type == "problem5") {
        self.list = [
          {
            name: "属于正常现象",
            dec: "程序运行结束后将洗碗机微微打开有利于内部干燥"
          }
        ];
      }
      if (dataJson.type == "problem6") {
        self.list = [
          { name: "餐具摆放不正确", dec: "参考‘餐具摆放’" },
          {
            name: "洗碗粉的量不够",
            dec: "增加洗碗粉的使用量，使用专门的洗碗粉"
          },
          {
            name: "餐具的摆放影响喷臂的转动",
            dec: "重新摆放餐具，让喷臂能自由转动"
          },
          {
            name: "过滤网堵塞或者洗碗机太久不清洗",
            dec: "清洁过滤器，定期清洁洗碗机"
          }
        ];
      }
      if (dataJson.type == "problem7") {
        self.list = [
          { name: "不正确的装载", dec: "按摆放指导中的摆放建议摆放餐具" },
          {
            name: "餐具取出过早",
            dec:
              "程序运行结束后不要立即取出餐具，轻轻打开机门放出蒸汽，等餐具不再烫手再取出"
          },
          {
            name: "使用的餐具表面处理不佳",
            dec: "附着在这种喷涂表面的水很难沥干，这种类型的刀叉碗碟不适合机洗"
          },
          { name: "光亮剂太少", dec: "增加光亮剂的用量，或者重新装满光亮剂" },
          {
            name: "洗涤程序选择不正确",
            dec: "‘预洗’程序无干燥功能，请选择其他程序"
          }
        ];
      }
      if (dataJson.type == "problem8") {
        self.list = [
          {
            name: "餐具阻碍了洗碗粉盒的打开",
            dec: "重新正确地把碗碟摆放在碗蓝上"
          },
          { name: "喷臂转动不顺畅", dec: "检查喷臂是否碑餐具卡住不能转动" },
          { name: "‘预洗’程序投放洗碗粉不正确", dec: "参考添加洗碗粉" }
        ];
      }

      // 故障
       if (dataJson.type == "faultProblem1") {
        self.list = [
          {
            name: "水压太低",
            dec: "检查清理"
          },
          { name: "进水管堵塞或者打折", dec: "检查清理" },
          { name: "水龙头未打开", dec: "检查清理" },
          { name: "其他", dec: "请专业的维修人员维修" },
        ];
      }
       if (dataJson.type == "faultProblem2") {
        self.list = [
          {
            name: "加热回路发生故障",
            dec: "请专业的维修人员维修"
          },
        ];
      }
       if (dataJson.type == "faultProblem3") {
        self.list = [
          {
            name: "使用清洁精",
            dec: "检查清理"
          },
          { name: "进水管堵塞或者打折", dec: "检查清理" },
          { name: "地面不平", dec: "检查清理" },
          { name: "外部积水流入机器", dec: "检查清理" },
          { name: "洗碗机某部件漏水", dec: "请专业的维修人员维修" }
        ];
      }
       if (dataJson.type == "faultProblem4") {
        self.list = [
          {
            name: "通讯异常",
            dec: "请专业的维修人员维修"
          },
        ];
      }
    }); //注obj为字符串
  },
  mounted() {}
};
</script>