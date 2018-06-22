<template>
  <div class="wrapper" @viewappear="viewappear" @viewdisappear="viewdisappear">
   <div>
      <midea-header 
      title="预约中" 
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="img/home_btn_bace@2x.png" 
      rightImg="img/home_btn_more@2x.png"
      :showRightImg="false"  
      @leftImgClick="backClick" 
      @rightImgClick="rightImgClick"></midea-header>
    </div>
    <div class="standby_section _relative">
        <div class="">
          <image class="standby_icon" :src="orderImg"></image>
          <image class="standby_icon_next" v-for="item in imgList" :src="item"></image>
          <div class="standby_dec_section">
            <div class="flex_center">
            <text class="standby_title">{{orderHour}}小时{{orderMinute}}分</text>
            </div>
            <div class="flex_center">
              <text class="sub_title">后启动</text>
            </div>
          </div>
        </div>
    </div>
     <div class="flex_center">
        <image class="mode_icon" :src="modeImg"></image>
        <text class="mode_text">{{modeDec}}</text>
        <text class="mode_text">{{modeTime}}min</text>
      </div>

    <div class="footer_section">
       <div class="flex_center">
        <div class="footer_btn">
        <midea-button text="取消" :textStyle="textStyle" :btnStyle="orderBtnStyle"  @mideaButtonClicked="cancle"></midea-button>
        <midea-button text="直接启动" :textStyle="startStyle" :btnStyle="startBtnStyle" @mideaButtonClicked="startBtnClick"></midea-button>
      </div>
     </div>
    </div>
    <error-box :isBoxShow="isErrorBoxShow" :isDoorOpen='true' :errorContentList="errorContentList" :errorDec="errorDec"></error-box>
  
  </div>
</template>
<style scoped>
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.footer_section{
  position: absolute;
  bottom: 80px;
  width: 750px;
}

.footer_btn {
  width: 680px;
  /* height: 150px; */
  padding-left: 36px;
  padding-right: 36px;
  margin-top: 30px;
  border-radius: 80px;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
}
.standby_section {
  flex-direction: row;
  justify-content: center;
  margin-top: 100px;
}
._relative{
  position: relative;
}
.standby_icon{
width:650px;
height:650px;
}
.standby_icon_next{
  width:650px;
height:650px;
position: absolute;
top: 0px;
}
.standby_dec_section{
  position: absolute;
  width: 660px;
  top: 280px;
  
}
.standby_title{
  font-size: 54px;
  color: #429ef3;
}
.sub_title{
  color: #429ef3;
}
.mode_icon{
  width:110px;
  height: 86px;
  resize: contain;
}
.mode_text{
  position: relative;
  top: 30px;
  margin-right: 10px;
  color: #a5a3a3;
  font-size: 30px;
}
</style>
<script>
import query from "../dummy/query";
import message from "../common/util/smartMessage";
import cmdFun from "./util.js"; //解析指令
import mideaCell from "../component/cell.vue";
import mideaHeader from "../midea-component/header.vue";
import nativeService from "../common/services/nativeService";
import mideaButton from "../midea-component/button.vue";
import errorBox from "./errorBox.vue";
const globalEvent = weex.requireModule("globalEvent");
const modal = weex.requireModule("modal");

export default {
  components: {
    mideaHeader,
    mideaCell,
    mideaButton,
    errorBox
  },
  data() {
    return {
      iconOn: "img/check/switch_on.png",
      iconOff: "img/check/switch_off.png",
      value: 22,
      orderImg: 'img/order/1@2x.png',
      imgList:[],
      orderHour: "0",
      orderMinute: "00",
      wholeOrderTime: 0,
      mode: 0,
      additionalMode: 0,
      modeImg: '',
      modeDec: '',
      modeTime: null,
      isFirstView: true,
      orderIndex: 1,
       isErrorBoxShow: false,
      errorContentList: [],
      errorDec: '' ,
    };
  },
  methods: {
     analysisFun(analysisObj) {
      var self = this;
      var isError = analysisObj.isError.value;
      self.isErrorBoxShow = false; 
      if (
        analysisObj.workingState.value == 0 ||
        analysisObj.workingState.value == 1 ||
        analysisObj.workingState.value == 4 || isError
      ) {
        self.jumpNext("standby");
      }
      if (analysisObj.workingState.value == 2) {
        //self.jumpNext("order");
      }
      if (analysisObj.workingState.value == 3) {
        self.jumpNext("working");
      }
      var hour = analysisObj.appointmentHour.value;
      var minute = analysisObj.appointmentMinute.value;
      self.wholeOrderTime = hour*60+minute;
      var orderImgChangeMinute = Math.floor(self.wholeOrderTime/61);//有61张预约倒计图片，除以61就为一张图片改变所需要的时间
      self.orderMinute = minute;
      self.orderHour = hour+"";
      if(self.orderMinute<10){
        self.orderMinute = "0"+self.orderMinute;
      }

      if(analysisObj.displaySign.detail.doorSwitch.value==0){
        self.isErrorBoxShow = true;
        self.errorDec="温馨提示:门开";
        self.errorContentList = ["请关上门试试是否解决"];
      }

       var program = analysisObj.program.value;
       self.mode = program;
      switch (program) {
        case 1:
          self.modeImg = "img/mode_icon/delay_auto@2x.png";
          self.modeDec = '智能洗';
          self.modeTime = '-:--';
          break;
        case 2:
          self.modeImg = "img/mode_icon/delay_intensive@2x.png";
          self.modeDec = '强力洗';  
          self.modeTime = 106;        
          break;
        case 3:
          self.modeImg = "img/mode_icon/delay_normal@2x.png";
          self.modeDec = '即时洗'; 
          self.modeTime = 50;         
          break;
        case 4:
          self.modeImg = "img/mode_icon/delay_ECO@2x.png";
          self.modeDec = '节能洗';
          self.modeTime = 168;
          if(analysisObj.functionOptions.value==7){
            self.modeTime = 126;
          }
          break;
        case 5:
          self.modeImg = "img/mode_icon/delay_glass@2x.png";
          self.modeDec = '玻璃洗';
          self.modeTime = 56;
          break;
        case 7:
          self.modeImg = "img/mode_icon/delay_rapid@2x.png";
          self.modeDec = '超快洗';
          self.modeTime = 29;
          break;
        case 8:
          self.modeImg ="img/mode_icon/delay_pre-wash_Soak@2x.png";
          self.modeDec = '预冲洗';
           self.modeTime = 12; 
          break;
        case 10:
          self.modeImg ="img/mode_icon/delay_self-cleaning@2x.png";
          self.modeDec = '自清洁洗';
          self.modeTime = 75;
          break;
        case 11:
          self.modeImg = "img/mode_icon/delay_fruits@2x.png";
          self.modeDec = '水果洗';
          self.modeTime = 12;
          break;
      }
      self.additionalMode = analysisObj.functionOptions.value;

      var orderAllMinute = analysisObj.setAppointmentHour.value*60+analysisObj.setAppointmentMinute.value;

      var orderIndex = parseInt(((orderAllMinute - self.wholeOrderTime)/orderAllMinute)*61);
      //nativeService.toast(orderIndex);

      // if(self.isFirstView){
      //   self.isFirstView = false;
      self.imgList.push("img/order/"+orderIndex+"@2x.png");

      //}
      

      //nativeService.toast(analysisObj);
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
          //nativeService.alert(arr[11]);
          var analysisObj = cmdFun.analysisCmd(arr);
          self.analysisFun(analysisObj);
        },
        function(result) {
          //nativeService.hideLoading();
          nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
    },
    sendCmd() {
      var self = this;
      var mode = this.mode;
      var additionalMode = this.additionalMode;
      // if (this.mideaChecked) {
      //   additionalMode = this.currentRecord.additionalMode;
      // } else {
      //   additionalMode = 0;
      // }
      var sendCmd = cmdFun.createOrderControlMessage(mode, additionalMode);
      nativeService.startCmdProcess(
        "control",
        sendCmd,
        function(result) {
          //nativeService.toast(result);
         // nativeService.hideLoading();
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
    backClick() {
      nativeService.backToNative();
    },
    rightImgClick() {
      var path = "settingIndex.js";
      nativeService.goTo(path,false);
    },
    startBtnClick(){
      this.sendCmd();
    },
    jumpNext(which) {
      var path = which + ".js";
      nativeService.goTo(path,false, true);
    },
    cancle(){
      var self = this;
      var sendCmd = cmdFun.cmdCancelOrderWashing();
      nativeService.startCmdProcess(
        "control",
        sendCmd,
        function(result) {
          //nativeService.alert(result);
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
        if (
          (parseInt(arr[9]) == 3 || parseInt(arr[9]) == 4) &&
          parseInt(arr[10]) == 1
        ) {
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
    linkTo(which) {
      var path = which + ".js";
      nativeService.goTo(path);
    }
  },
  created() {
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
  computed: {
   orderBtnStyle() {
      return {
        backgroundColor: "transparent",
        borderRadius: "50px",
        width: "280px",
        borderColor: "rgb(33, 148, 230)",
        borderWidth: "1px"
      };
    },
    textStyle() {
      return {
        color: "rgb(33, 148, 230)"
      };
    },
    startBtnStyle() {
      return {
        background:
          "linear-gradient(to right, rgb(33, 148, 230),rgb(20, 180, 230))",
        borderRadius: "50px",
        width: "280px"
      };
    },
     kownBtnStyle() {
      return {
        backgroundImage:
          "linear-gradient(to right, rgb(33, 148, 230),rgb(20, 180, 230))",
        borderRadius: "50px",
        width: "560px",
        height: "90px",
        marginTop:"36px"
      };
    },
    startStyle() {
      return {
        color: "#ffffff"
      };
    }
  },
  mounted() {
   //  nativeService.toast('home');
     //测试order，倒计时图片
    // var self = this,index = 1;
    // var intTime = setInterval(() => {
    //   index++;
    //    if(index>=20){
    //       clearInterval(intTime);
    //       return;
    //     }
    //   self.orderImg = "img/order/"+index+"@2x.png";
    // }, 5000);
  }
};
</script>
