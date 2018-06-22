<template>
  <div class="wrapper" @viewappear="viewappear" @viewdisappear="viewdisappear">
   <div>
      <midea-header 
      title="洗碗机" 
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="img/home_btn_bace@2x.png" 
      rightImg="img/home_btn_more@2x.png"
      :showRightImg="false"  
      @leftImgClick="backClick" 
      @rightImgClick="rightImgClick"></midea-header>
    </div>
    <div class="standby_section">
      
    </div>

    <image class="large_wave" src="img/large_wave.gif"></image>
    <div class="working_box" ref="modeBox">
        <image class="standby_icon" src="img/img_working_ball_2x.png"></image>
      <image class="working_icon" :src="modeImg"></image>
   
    </div>
     
     <div class="working_section">
        <div v-if="!workEnd" class="flex_center">
          <text v-if="pauseRecord" class="stop_title">已暂停</text>
          <text v-if="pauseRecord" class="stop_icon">|</text>
          <text class="_time">{{programHour}}:{{programMinute}}</text>
       </div>
       <div v-if="workEnd" class="flex_center">
          <text class="finish_title">清洗完成</text>
       </div>
        <div v-if="!workEnd" class="flex_center">
          <div class="dec_section">
            <text v-if="yuXi" :class="['_dec',preActive&&'_active']">预洗</text>
            <text v-if="yuXiNext" class="_shape">&#8594;</text>
            <text v-if="zhuXi" :class="['_dec',mainActive&&'_active']">灭菌煮洗</text>
             <text v-if="zhuXiNext" class="_shape">&#8594;</text>
            <text v-if="piaoXi" :class="['_dec',piaoActive&&'_active']">高温漂洗</text>
             <text v-if="piaoXiNext" class="_shape">&#8594;</text>
            <text v-if="gaoZao" :class="['_dec',endActive&&'_active']">干燥</text>
          </div>     
       </div>

       <div v-if="!workEnd" class="flex_center" style="margin-top:200px">
         <div class="btnSection">
           <midea-button text="结束" :textStyle="textStyle" :btnStyle="cancleBtnStyle"  @mideaButtonClicked="cancalClick"></midea-button>
           <midea-button :text="startPauseText" :textStyle="doneTextStyle" :btnStyle="doneBtnStyle"  @mideaButtonClicked="startPuaseClick"></midea-button>
         </div>
        
       </div>
     
      <div class="keeping_section flex_center">
       <div class="safe_keeping"> 
       <div class="keeping_dec" @click="pickAttribute">
         <text class="keeping_title">保管</text>
         <text class="lack_dec" style="margin-top:10px">{{keepDec}}</text>
       </div>
        <div class="">
        <midea-switch2 :checked="mideaChecked" @change="startSafeKeep" :width="90" :height="50"  :iconOn="iconOn" :iconOff="iconOff"  slot="value"></midea-switch2>
       </div>
       </div>
      </div>
     
     </div>

     <midea-dialog title="温馨提示"
                :show="show"
                @close="closeDialog"
                @mideaDialogCancelBtnClicked="mideaDialogCancelBtnClicked"
                @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked"
                content="结束工作，会造成水电的浪费哦"
                :single="false"
                confirmText="确定结束" >
    </midea-dialog>

    <error-box :isBoxShow="isErrorBoxShow" :errorContentList="errorContentList" :isDoorOpen='true' :errorDec="errorDec"></error-box>
    
     

      <!-- <midea-button text="水电统计" :btnStyle="sureBtnStyle"  @mideaButtonClicked="linkTo('chart')"></midea-button> -->
    
  </div>
</template>
<style scoped>
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.btnSection {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 560px;
}
.keeping_section {
  margin-top: 10px;
}
.safe_keeping {
  width: 580px;
  height: 150px;
  padding-left: 36px;
  padding-right: 36px;
  border-color: #ffffff;
  border-width: 1px;
  border-radius: 80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
._time {
  margin-top: 50px;
  font-size: 60px;
  color: #ffffff;
}
.stop_title {
  margin-top: 58px;
  font-size: 50px;
  color: #ffffff;
}
.finish_title{
  font-size: 48px;
  color: #ffffff;
  margin-bottom: 120px;
}
.stop_icon {
  margin-top: 52px;
  font-size: 54px;
  color: #d3d3d3;
  margin-left: 20px;
  margin-right: 20px;
}
.dec_section {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
._dec {
  font-size: 34px;
  color: #d0eaf7;
  margin-right: 10px;
}
._active {
  font-size: 40px;
  color: #ffffff;
}
._shape {
  color: #d0eaf7;
  margin-top: 10px;
  margin-right: 10px;
}
.standby_section {
  /* flex-direction: row;
  justify-content: center; */
  margin-top: 200px;
}
.working_shape {
  position: relative;
  top: -1000px;
}
.large_wave {
  width: 750px;
  height: 1000px;
  position: absolute;
  bottom: 0px;
}
.working_section {
  /* height: 800px;
  background-image: linear-gradient(to bottom, rgb(33, 148, 230), white); */
  position: absolute;
  bottom: 60px;
  width: 750px;
}
/* ._relative {
  position: relative;
} */
.working_box {
  position: absolute;
  top: 300px;
  left: 270px;
}
.working_icon {
  width: 120px;
  height: 90px;
  position: relative;
  top: -160px;
  left: 50px;
}
.standby_icon {
  width: 224px;
  height: 224px;
}
.standby_dec_section {
  position: absolute;
  top: 300px;
  left: 240px;
}
.standby_title {
  font-size: 60px;
  color: rgb(54, 54, 54);
}
.standby_tip {
  width: 300px;
  height: 106px;
  position: absolute;
  top: 350px;
  left: 180px;
}
.lack_section {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}
.item_section {
  width: 350px;
}
.item_dec {
  margin-left: 20px;
}
.left_item {
  border-right-color: #ddd;
  border-right-width: 2px;
}
.number_section {
  flex-direction: row;
}
.title_dec {
  margin-top: 20px;
  font-size: 24px;
  color: rgb(24, 154, 206);
}
.number_dec {
  font-size: 46px;
  color: rgb(24, 154, 206);
}
.lack_dec {
  font-size: 30px;
  color: #ffffff;
}
.keeping_dec{
  width: 400px;
}
.keeping_title {
  font-size: 38px;
  color: #ffffff;
}
</style>
<script>
import query from "../dummy/query";
import message from "../common/util/smartMessage";
import cmdFun from "./util.js"; //解析指令
import mideaCell from "../component/cell.vue";
import errorBox from "./errorBox.vue";
import mideaHeader from "../midea-component/header.vue";
import mideaSwitch2 from "../midea-component/switch.vue";
import mideaDialog from "../component/dialog.vue";
import nativeService from "../common/services/nativeService";
import mideaButton from "../midea-component/button.vue";
const globalEvent = weex.requireModule("globalEvent");
const modal = weex.requireModule("modal");
const animation = weex.requireModule("animation");
const picker = weex.requireModule("picker");
var stream = weex.requireModule('stream');

export default {
  components: {
    mideaSwitch2,
    mideaHeader,
    mideaCell,
    mideaButton,
    mideaDialog,
    errorBox
  },
  data() {
    return {
      mideaChecked: false,
      iconOn: "img/check/switch_on.png",
      iconOff: "img/check/switch_off.png",
      value: 22,
      val: 0,
      cancleBtnStyle: {
        backgroundColor: "transparent",
        borderRadius: "50px",
        width: "260px",
        borderColor: "#ffffff",
        borderWidth: "1px"
      },
      doneBtnStyle: {
        backgroundColor: "#ffffff",
        borderRadius: "50px",
        width: "260px",
        borderColor: "#ffffff",
        borderWidth: "1px"
      },
      textStyle: {
        color: "#ffffff"
      },
      doneTextStyle: {
        color: "#00a6ff"
      },
      show: false,
      startPauseText: "暂停",
      pauseRecord: 0,
      modeImg: "",
      programHour: "",
      programMinute: "",

      yuXi: false,
      yuXiNext: false,
      zhuXi: false,
      zhuXiNext: false,
      piaoXi: false,
      piaoXiNext: false,
      gaoZao: false,

      preActive: false,
      mainActive: false,
      piaoActive: false,
      endActive: false,

      workEnd: false,
      keepDec: "去设置保管",
        attribute: "请选择属性",
        dayIndex: 0,
        hourIndex: 0,
        setKeepTime: 0,
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
        self.jumpNext("order");
      }
      // if (analysisObj.workingState.value == 3) {
      //   self.jumpNext("working");
      // }
      if (analysisObj.displaySign.detail.startStop.value) {
        self.startPauseText = "暂停";
        self.pauseRecord = 0;
      } else {
        self.startPauseText = "继续";
        self.pauseRecord = 1;
      }
      //door status
      if(analysisObj.displaySign.detail.doorSwitch.value==0){
        self.isErrorBoxShow = true;
        self.errorDec="温馨提示:门开";
        self.errorContentList = ["请关上门试试是否解决"];
      }


      var program = analysisObj.program.value;
      switch (program) {
        case 1:
          self.modeImg = "img/sel_mode/program_all_icon_auto@2x.png";
          self.yuXi = self.yuXiNext = self.zhuXi = self.zhuXiNext = self.piaoXi = self.piaoXiNext = self.gaoZao = true;
          break;
        case 2:
          self.modeImg = "img/sel_mode/program_all_icon_intensive@2x.png";
          self.yuXi = self.yuXiNext = self.zhuXi = self.zhuXiNext = self.piaoXi = self.piaoXiNext = self.gaoZao = true;
          break;
        case 3:
          self.modeImg = "img/sel_mode/program_all_icon_normal@2x.png";
          self.zhuXi = self.zhuXiNext = self.piaoXi = self.piaoXiNext = self.gaoZao = true;
          self.yuXi = self.yuXiNext = false;
          break;
        case 4:
          self.modeImg = "img/sel_mode/program_all_icon_ECO@2x.png";
          self.yuXi = self.yuXiNext = self.zhuXi = self.zhuXiNext = self.piaoXi = self.piaoXiNext = self.gaoZao = true;
          break;
        case 5:
          self.modeImg = "img/sel_mode/program_all_icon_glass@2x.png";
          self.yuXi = self.yuXiNext = self.zhuXi = self.zhuXiNext = self.piaoXi = self.piaoXiNext = self.gaoZao = true;
          break;
        case 7:
          self.modeImg = "img/sel_mode/program_all_icon_rapid@2x.png";
          self.zhuXi = self.zhuXiNext = self.piaoXi = true;
          self.yuXi = self.yuXiNext = self.gaoZao = self.piaoXiNext = false;
          break;
        case 8:
          self.modeImg =
            "img/sel_mode/program_all_icon_pre-wash_Soak@2x.png";
          self.yuXi = true;
          self.yuXiNext = self.zhuXi = self.zhuXiNext = self.piaoXi = self.piaoXiNext = self.gaoZao = false;
          break;
        case 10:
          self.modeImg =
            "img/sel_mode/program_all_icon_self-cleaning@2x.png";
          self.zhuXi = self.zhuXiNext = self.piaoXi = self.piaoXiNext = self.gaoZao = true;
          self.yuXi = self.yuXiNext = false;
          break;
        case 9:
          self.modeImg = "img/sel_mode/90min@2x.png";
          self.zhuXi = self.zhuXiNext = self.piaoXi = self.piaoXiNext = self.gaoZao = true;
          self.yuXi = self.yuXiNext = false;
          break;
      }
      var programTime = analysisObj.programTimeRemaining.value;
      self.programHour = Math.floor(programTime / 60);
      self.programMinute = programTime % 60;
      if (self.programHour < 10) {
        self.programHour = "0" + self.programHour;
      }
      if (self.programMinute < 10) {
        self.programMinute = "0" + self.programMinute;
      }
      var step = analysisObj.washingStage.value;
      if (step == 1) {
        self.preActive = true;
        self.mainActive = self.piaoActive = self.endActive = false;
        if(program==1){
          self.programHour = '-';
          self.programMinute = '--';
        }
      }
      if (step == 2) {
        self.mainActive = true;
        self.preActive = self.piaoActive = self.endActive = false;
      }
      if (step == 3) {
        self.piaoActive = true;
        self.mainActive = self.preActive = self.endActive = false;
      }
      if (step == 4) {
        self.endActive = true;
        self.mainActive = self.piaoActive = self.preActive = false;
      }
      if (step == 5) {
        self.preActive = self.mainActive = self.piaoActive = self.endActive = false;
        self.modeImg = "img/working_icon_finish@2x.png";
        self.workEnd = true;

        //洗涤完成，新增经验值
         var POST_URL = 'http://121.43.198.16:8080/h3-exp/exp/add';
          nativeService.getItem("sn", function(snObj) {
            nativeService.getItem("userId", function(userid) {
                var requestData = {
                  userId: userid.data,
                  sn: snObj.data,
                  type: 3
                };
                stream.fetch({
                    method: 'POST',
                    url: POST_URL,
                    headers:{'Content-Type':'application/json'},
                    type:'json',
                    body:JSON.stringify(requestData)
                  }, function(ret) {
                    if(!ret.ok){
                      nativeService.toast("request failed");
                    }else{
                      
                    }
                  },function(response){
                    console.log('get in progress:'+response.length);
                  });
            })
          })
      }

      var keepFresh = analysisObj.displaySign.detail.keepFresh.value;
      if(keepFresh){
        self.mideaChecked = true;
      }else{
        self.mideaChecked = false;
      }
      self.setKeepTime = analysisObj.setKeepTime.value;//保管设定时间 
      self.keepTime = analysisObj.keepTime.value;//保管剩余时间
      if(self.keepTime<10){
        self.keepTime = "0"+self.keepTime;
      }
      if(self.setKeepTime){
        self.keepDec = "保管设定时间"+self.setKeepTime+"小时";        
      }else{
        self.keepDec = "去设置保管";        
      }
      // nativeService.toast(analysisObj);
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
    backClick() {
      nativeService.backToNative();
    },
    rightImgClick() {
      var path = "settingIndex.js";
      nativeService.goTo(path,false);
    },
     pickAttribute() {
      if(this.mideaChecked){
        return;
      }
            const itemsDay = ['0', '1', '2'];
            const itemsHour = ['0','1', '2', '3','4','5','6', '7', '8','9','10','11', '12', '13','14','15','16', '17', '18','19','20','21','22','23','24'];
            var that = this;
            var pickItem = [{
                    index: that.dayIndex,
                    item: itemsDay,
                    label: "天"
                },
                {
                    index: that.hourIndex,
                    item: itemsHour,
                    label: "时"
                },
            ]
            picker.pick({
                'items': pickItem,
                'title': '请选择时间', //取消和确定中间那标题
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#020F13', //取消颜色
                'confirmTxtColor': '#020F13', //标题颜色
                'titleColor': '#020F13', //标题颜色
                'titleBgColor': '#E7EDEF' //标题栏颜色
            }, event => {
                var data = event.data;
                var dataArr = data.replace("[", "").replace("]", "").split(",");
                that.dayIndex = dataArr[0];
                that.hourIndex = dataArr[1];
                that.attribute = itemsDay[dataArr[0]] + ',' + itemsHour[dataArr[1]];
                var allHour = parseInt(itemsDay[dataArr[0]])*24+parseInt(itemsHour[dataArr[1]]);

                var sendCmd = cmdFun.cmdSetSafeKeep(allHour);
                nativeService.startCmdProcess(
                  "control",
                  sendCmd,
                  function(result) {
                    //nativeService.toast(result);
                    //nativeService.hideLoading();
                    var result_arr = JSON.parse(result);
                    var analysisObj = cmdFun.analysisCmd(result_arr);
                    that.analysisFun(analysisObj);
                  },
                  function(result) {
                    //nativeService.hideLoading();
                    nativeService.toast("查询失败" + JSON.stringify(result));
                  }
                );
            });
        },
    startSafeKeep() {
      var self = this,iskeep = 0;
      if (this.mideaChecked) {
        iskeep = 0;
      }else{
        iskeep = 1;
      }
       var sendCmd = cmdFun.cmdSafeKeep(iskeep);
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
    jumpNext(which) {
      var path =  which + ".js";
      nativeService.goTo(path,false, true);
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
    moveTest(val) {
      var self = this;
      var testEl = this.$refs.modeBox;
      animation.transition(
        testEl,
        {
          styles: {
            color: "#FF0000",
            transform: "translateY(" + val + "px)"
          },
          duration: 3000, //ms
          timingFunction: "linear",
          delay: 0 //ms
        },
        function() {
          if (self.val <= 0) {
            self.val = self.val + 60;
          } else {
            self.val = self.val - 80;
          }

          self.moveTest(self.val);
        }
      );
    },
    cancalClick() {
      this.show = true;
    },
    mideaDialogCancelBtnClicked() {
      this.show = false;
    },
    mideaDialogConfirmBtnClicked() {
      //确定取消工作
      var self = this;
      this.show = false;
      var sendCmd = cmdFun.cmdCancelWash();
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
    startPuaseClick() {
      var self = this;
      if (this.startPauseText == "暂停") {
        this.pauseRecord = 0;
      } else {
        this.pauseRecord = 1;
      }
      var sendCmd = cmdFun.cmdStartPause(this.pauseRecord);
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
          nativeService.hideLoading();
          nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
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
  mounted() {
    var self = this;
    this.moveTest(0);
  },
  computed: {}
};
</script>
