<template>
<div  @viewappear="viewappear" @viewdisappear="viewdisappear">
    <div>
      <midea-header 
      title="亮碟剂档位" 
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
      <text class="title">亮碟剂作用</text>
      <text class="content">根据餐具的干燥效果而定，如果餐具又较多水分残留，则往高档位调；有白，蓝色附加物时，则往低档位调。</text>      
   </div>
  
  <div style="padding:24px">
  <text style="font-size:28px;font-weight:bold">当前档位 {{checkedInfo}} 档</text>
 </div>
 <midea-radio-list :list="list" :needShowTopBorder="true"  @mideaRadioItemChecked="itemChecked">
</midea-radio-list>
   
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
.slider_dec{
 position: relative;
 top: -50px;
}
.demo_section {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 40px;
  /* border-top-color: #ebf4ff;
  border-top-width: 20px; */
  margin-bottom: 60px;
}
.title{
  font-size: 28px;
  color: black;
  font-weight: bold;
}
.content{
  font-size: 24px;
  margin-top: 20px;
}
</style>
<script>
import mideaHeader from "../midea-component/header.vue";
import mideaRadioList from '../component/radioList.vue'
import query from "../dummy/query";
import message from "../common/util/smartMessage";
import cmdFun from "./util.js"; //解析指令
import nativeService from "../common/services/nativeService";
const globalEvent = weex.requireModule("globalEvent");
const modal = weex.requireModule("modal");
export default {
  components: { mideaHeader,mideaRadioList },
  data() {
    return {
       list: [
            { title: '1档', value: 1 },
            { title: '2档', value: 2, checked: true },
            { title: '3档', value: 3 },
            { title: '4档', value: 4 },
            { title: '5档', value: 5 },
         ],
         checkedInfo: 2,
    };
  },

  methods: {
     analysisFun(analysisObj) {
      var self = this;
      var leven = analysisObj.fenpeiqiLevel.value;
      var itemList = this.list;
      for(var i=0; i<itemList.length; i++){
        if(itemList[i].value == leven){
          itemList[i].checked = true;
        }else{
          itemList[i].checked = false;
        }
      }
      self.list = itemList;
      self.checkedInfo = leven;
    },
    queryStatus() {
      var self = this;
      var sendCmd = cmdFun.createQueryMessage();
      //nativeService.showLoading();
      nativeService.startCmdProcess(
        "query",
        sendCmd,
        function(result) {
          //nativeService.hideLoading();
          var result_arr = result.replace(/\[|]/g, ""); //去掉中括号
          var arr = result_arr.split(",");
          //nativeService.alert(arr);
          var analysisObj = cmdFun.analysisCmd(arr);
          self.analysisFun(analysisObj);
        },
        function(result) {
          //nativeService.hideLoading();
          nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
    },
     sendCmd(value) {
      var self = this;
      var sendCmd = cmdFun.cmdSetBrightDish(value);
      nativeService.startCmdProcess(
        "control",
        sendCmd,
        function(result) {
          //nativeService.toast(result);
          //nativeService.hideLoading();
          var result_arr = JSON.parse(result);
          var analysisObj = cmdFun.analysisCmd(result_arr);
          self.analysisFun(analysisObj);
        },
        function(result) {
          //nativeService.hideLoading();
          nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
    },
    listenerFun(){
       var self = this;        
        globalEvent.addEventListener("receiveMessage", function(e) {
          var str = e.data;
          //nativeService.alert(str);
          var arr = str.split(",");
          if((parseInt(arr[9])==3||parseInt(arr[9])==4) && parseInt(arr[10])==1){
            //self.countFun(arr);
            //nativeService.alert(str);
            return;
          }
          var analysisObj = cmdFun.analysisCmd(arr); //解析04上行指令
          self.analysisFun(analysisObj);
        });
    },
    viewdisappear(){
      globalEvent.removeEventListener("receiveMessage");
    },
    viewappear(){
      this.listenerFun();
    },
    backClick() {
      var path = "memberIndex.js";
      nativeService.goTo(path, false, true);
    },
     itemChecked(e){
       var val = parseInt(e.value);
       this.sendCmd(val);
      },
  },
  created() {
    var self = this;
    this.isIos = weex.config.env.platform == "iOS" ? true : false;
    if (this.isIos){
      this.listenerFun();
    }
     //模拟设备数据
    nativeService.initMockData({
        "query":query
      });
    this.queryStatus();
  },
  mounted() {}
};
</script>