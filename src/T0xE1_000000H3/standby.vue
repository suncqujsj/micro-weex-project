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
      :showLeftImg="true"
      :showRightImg="true"  
      @leftImgClick="backClick" 
      @rightImgClick="jumpNext('memberIndex')"></midea-header>
    </div>

    <!-- <div class="member_icon">
       <div class="member_section" @click="jumpNext('memberIndex')">
        <text>会员积分</text>
      </div>
    </div> -->
   <div ref="swipeArea" class="swipe-area" v-on:swipe="onSwipe($event,item)">
    <div class="standby_section">
        <div class="" @click="jumpNext('selectMode')">
          <image class="standby_icon" src="img/standby.gif"></image>
          <div class="standby_dec_section">
            <div v-if="isKeepFresh">
               <div class="flex_center">
                <text class="standby_title">保管中</text>                
              </div>
            </div>
            <div v-else>
              <text class="standby_title">待机中</text>
            </div>
            
          </div>   
          <image v-if="!isKeepFresh" class="standby_tip" src="img/tips_first_time@2x.png"></image>
        </div>
        
    </div>
    <div v-if="isKeepFresh" class="standby_tip_section">
      <text class="standby_tip_dec">还剩{{keepTime}}小时</text>                
    </div>

    <div class="footer_section">
      <div class="lack_section">
        <div class="item_section left_item" @click="lackLink('brightDish','亮碟剂添加步骤')">
            <div class="flex_center">
               <image style="width:55px;height:76px;" :src="brightDishAgentImg"></image>
               <div class="item_dec">
                  <div class="number_section"><text class="title_dec">约</text><text class="number_dec">{{countBrightDishAgent}}%</text></div>
                  <text class="lack_dec">亮碟剂</text>
               </div>
            </div>
        </div>
        <div class="item_section" @click="lackLink('salt','软水盐添加步骤')">
           <div class="flex_center">
               <image style="width:55px;height:76px;" :src="saltImg"></image>
               <div class="item_dec">
                  <div class="number_section"><text class="title_dec">约</text><text class="number_dec">{{countSalt}}%</text></div>
                  <text class="lack_dec">软水盐</text>
               </div>
            </div>
        </div>
      </div>
      <div class="keeping_section flex_center">
       <div class="safe_keeping">
        <div class="keeping_dec"  @click="pickAttribute">
          <text class="keeping_title">保管</text>
          <text class="lack_dec" style="margin-top:10px">{{keepDec}}</text>
        </div>
        <midea-switch2 :checked="mideaChecked" @change="startSafeKeep" :width="90" :height="50"  :iconOn="iconOn" :iconOff="iconOff" slot="value"></midea-switch2>
        </div>

      </div>
    </div>
        <image class="up_icon" src="img/home_arrow_up@2x.png"></image>
    
      <!-- <midea-button text="水电统计" :btnStyle="sureBtnStyle"  @mideaButtonClicked="jumpNext('chart')"></midea-button> -->
    </div> 
  <error-box :isBoxShow="isErrorBoxShow" :errorContentList="errorContentList" :isDoorOpen='isDoorOpen' :errorDec="errorDec" @clickError="onClickError"></error-box>
       
  <midea-dialog title="童锁中"
                :show="showDialog"
                @close="closeDialog"
                @mideaDialogCancelBtnClicked="mideaDialogCancleBtnClicked"
                @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked"
                content="可以点击‘解锁’，进行解锁"
                confirmText="解锁"
                :single="false" >
 </midea-dialog>

  </div>
</template>
<style scoped>
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.swipe-area {
  display: flex;
  flex: 1;
}
.member_icon {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 30px;
}
.member_section {
  background-color: rgb(104, 104, 95);
  width: 60px;
  height: 60px;
  border-radius: 60px;
}
.footer_section {
  position: absolute;
  bottom: 80px;
  width: 750px;
}
.keeping_section {
  margin-top: 60px;
}
.safe_keeping {
  width: 600px;
  height: 150px;
  padding-left: 36px;
  padding-right: 36px;
  margin-top: 30px;
  border-color: #ddd;
  border-width: 1px;
  border-radius: 80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.standby_section {
  flex-direction: row;
  justify-content: center;
}
._relative {
  position: relative;
}
.standby_icon {
  width: 650px;
  height: 650px;
}
.standby_dec_section {
  position: absolute;
  top: 280px;
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
.standby_tip_section {
  position: absolute;
  top: 370px;
  width: 760px;
  flex-direction: row;
  justify-content: center;
}
.standby_tip_dec {
  font-size: 36px;
  color: rgb(97, 184, 235);
}
.up_icon{
  width: 32px;
  height: 18px;
  position: absolute;
  bottom: 10px;
  left: 370px;
}
.lack_section {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 170px;
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
  color: rgb(163, 163, 163);
}
.keeping_dec {
  width: 400px;
}
.keeping_title {
  font-size: 38px;
  color: rgb(163, 163, 163);
}
</style>
<script>
import query from "../dummy/query";
import message from "../common/util/smartMessage";
import cmdFun from "./util.js"; //解析指令
import mideaCell from "../component/cell.vue";
import mideaHeader from "../midea-component/header.vue";
import mideaSwitch2 from "../midea-component/switch.vue";
import nativeService from "../common/services/nativeService";
import mideaButton from "../midea-component/button.vue";
import errorBox from "./errorBox.vue";
import mideaDialog from '../component/dialog.vue';
const globalEvent = weex.requireModule("globalEvent");
const modal = weex.requireModule("modal");
const picker = weex.requireModule("picker");

export default {
  components: {
    mideaSwitch2,
    mideaHeader,
    mideaCell,
    mideaButton,
    errorBox,
    mideaDialog
  },
  data() {
    return {
      showDialog: false,
      isLock: 0,
      isKeepFresh: false,
      mideaChecked: false,
      isDoorOpen: false,
      iconOn: "img/check/switch_on.png",
      iconOff: "img/check/switch_off.png",
      value: 22,
      sendcmd: null,
      time: "",
      keepTime: null,
      keepDec: "去设置保管",
      attribute: "请选择属性",
      dayIndex: 0,
      hourIndex: 0,
      setKeepTime: 0,
      countSalt: 0, //投放盐次数百分比
      countBrightDishAgent: 0, //投放亮碟剂次数百分比,
      brightDishAgentImg: "img/percentage/10@2x.png",
      saltImg: "img/percentage/10@2x.png",
      isErrorBoxShow: false,
      errorContentList: [],
      errorDec: ""
    };
  },
  methods: {
    analysisFun(analysisObj) {
      var self = this;
      self.isErrorBoxShow = false;
      self.showDialog = false;
      if (
        analysisObj.workingState.value == 0 ||
        analysisObj.workingState.value == 1
      ) {
        //self.jumpNext("standby");
      }
      if (analysisObj.workingState.value == 2) {
        self.jumpNext("order");
      }
      if (analysisObj.workingState.value == 3) {
        self.jumpNext("working");
      }
      self.isLock = analysisObj.displaySign.detail.lockable.value;
      var keepFresh = analysisObj.displaySign.detail.keepFresh.value;
      self.setKeepTime = analysisObj.setKeepTime.value; //保管设定时间
      self.keepTime = analysisObj.keepTime.value; //保管剩余时间
      if (keepFresh) {
        self.mideaChecked = true;
      } else {
        self.mideaChecked = false;
      }
      if (self.keepTime > 0) {
        self.isKeepFresh = true;
      } else {
        self.isKeepFresh = false;
      }

      if (self.keepTime < 10) {
        self.keepTime = "0" + self.keepTime;
      }
      if (self.setKeepTime) {
        self.keepDec = "保管设定时间" + self.setKeepTime + "小时";
      } else {
        self.keepDec = "去设置保管";
      }

      if (analysisObj.isError.value) {
        self.isErrorBoxShow = true;
      }
      if (analysisObj.displaySign.detail.doorSwitch.value == 0) {
        self.isErrorBoxShow = true;
        self.isDoorOpen = true;
        self.errorDec = "温馨提示:门开";
        self.errorContentList = ["请关上门试试是否解决"];
      }

      if (analysisObj.errorCode.value == 1) {
        self.isDoorOpen = false;
        self.errorDec = "E1:进水故障";
        self.errorContentList = [
          "请确认以下三点是否解决",
          "1.水压太低",
          "2.进水管堵塞/打折",
          "3.水龙头未打开"
        ];
      }
      if (analysisObj.errorCode.value == 3) {
         self.isDoorOpen = false;
        self.errorDec = "E3:加热异常";
        self.errorContentList = ["请联系专业维修人员", "400-889-9315"];
      }
      if (analysisObj.errorCode.value == 4) {
         self.isDoorOpen = false;
        self.errorDec = "E4:发生流溢";
        self.errorContentList = [
          "请确认以下四点是否解决",
          "1.使用清洁精",
          "2.排水管堵塞/打折",
          "3.地面不平",
          "4.外部积水流入机器"
        ];
      }
      //  if(analysisObj.errorCode.value==8){
      //   self.errorContentList = ["请确认以下三点是否解决","1.水压太低","2.进水管堵塞/打折","3.水龙头未打开"];
      // }

      //nativeService.alert(analysisObj);
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
    //统计查询
    cmdCountQuery() {
      var self = this;
      var sendCmd = cmdFun.createCountQueryMessage();
      //nativeService.showLoading();
      nativeService.startCmdProcess(
        "query",
        sendCmd,
        function(result) {
          //nativeService.hideLoading();
          var result_arr = result.replace(/\[|]/g, ""); //去掉中括号
          var arr = result_arr.split(",");
          //nativeService.alert(arr);
          self.countFun(arr);
        },
        function(result) {
          //nativeService.hideLoading();
          nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
    },
    sendCmd() {
      var self = this;
      var sendCmd = cmdFun.createControlMessage(5, 0);
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
    backClick() {
      nativeService.backToNative();
    },
    onClickError(){
      var self = this;
      var sendCmd = cmdFun.cmdShutDown();
      //nativeService.toast(sendCmd);
      nativeService.startCmdProcess(
        "control",
        sendCmd,
        function(result) {
          //nativeService.toast(result);
          //nativeService.hideLoading();
          var result_arr = JSON.parse(result);
          var analysisObj = cmdFun.analysisCmd(result_arr);
          self.analysisFun(analysisObj);
          // self.isErrorBoxShow = false;
        },
        function(result) {
          //nativeService.hideLoading();
          nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
    },
    lackLink(type, name) {
      //亮碟剂和软水盐
      var path = "";
      if (type == "brightDish") {
        path = "lackBrightDishTip.js";
      }
      if (type == "salt") {
        path = "lackSaltTip.js";
      }
      nativeService.goTo(path, false, true);
    },
    jumpNext(which) {
      // if(this.mideaChecked){
      //   return;
      // }
      var path = which + ".js";
      nativeService.goTo(path, false, true);
    },
    listenerFun() {
      var self = this;
      globalEvent.addEventListener("receiveMessage", function(e) {
        var str = e.data;
        //nativeService.alert(str);
        var arr = str.split(",");
        if (
          (parseInt(arr[9]) == 3 || parseInt(arr[9]) == 4) &&
          parseInt(arr[10]) == 1
        ) {
          self.countFun(arr);
          //nativeService.alert(str);
          return;
        }
        var analysisObj = cmdFun.analysisCmd(arr); //解析04上行指令
        self.analysisFun(analysisObj);
      });
    },
    viewdisappear() {
      globalEvent.removeEventListener("receiveMessage");
    },
    viewappear() {
      this.listenerFun();
    },
    onSwipe(event, item) {
      this.eventObject = event;
      if (event.direction == "up") {
        var path = "chart.js";
        nativeService.goTo(path, false, true);
      }
    },
    countFun(arr) {
      let self = this;
      nativeService.getItem("saltRecord", function(str) {
        var saltValue = parseInt(arr[26]);
        str = str || {};
        var _str = str.data || 0;
        if (parseInt(_str) == 1) {
          //缺盐
          saltValue = 21;
        }
        self.countSalt = parseInt((1 - saltValue / 21) * 100);
        if (self.countSalt <= 0) {
          self.countSalt = 0;
        }
        var saltIndex = parseInt((21 - saltValue) / 21 * 10);
        self.saltImg = "img/percentage/" + saltIndex * 10 + "@2x.png";
        if (self.countSalt <= 0) {
          self.saltImg = "img/percentage/10@2x.png";
        }
        if (isNaN(self.countSalt)) {
          self.countSalt = 0;
        }
      });
      nativeService.getItem("brightDishAgentRecord", function(str) {
        var brightDishAgentValue = parseInt(arr[27]);
        str = str || {};
        var _str = str.data || 0;
        if (parseInt(_str) == 1) {
          //缺亮碟机
          brightDishAgentValue = 75;
        }
        self.countBrightDishAgent = parseInt(
          (1 - brightDishAgentValue / 75) * 100
        );
        if (self.countBrightDishAgent <= 0) {
          self.countBrightDishAgent = 0;
        }
        var brightDishAgentIndex = parseInt(
          (75 - brightDishAgentValue) / 75 * 10
        );
        self.brightDishAgentImg =
          "img/percentage/" + brightDishAgentIndex * 10 + "@2x.png";
        if (self.countBrightDishAgent <= 0) {
          self.brightDishAgentImg = "img/percentage/10@2x.png";
        }
        if (isNaN(self.countBrightDishAgent)) {
          self.countBrightDishAgent = 0;
        }
      });
    },
    pickAttribute() {
      if (this.mideaChecked) {
        return;
      }
      if(this.isLock){
        this.showDialog = true;
        return;
      }
      const itemsDay = ["0", "1", "2"];
      const itemsHour = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24"
      ];
      var that = this;
      var pickItem = [
        {
          index: that.dayIndex,
          item: itemsDay,
          label: "天"
        },
        {
          index: that.hourIndex,
          item: itemsHour,
          label: "时"
        }
      ];
      picker.pick(
        {
          items: pickItem,
          title: "请选择时间", //取消和确定中间那标题
          cancelTxt: "取消", //取消按钮文字
          confirmTxt: "确定", //确定按钮文字,
          cancelTxtColor: "#020F13", //取消颜色
          confirmTxtColor: "#020F13", //标题颜色
          titleColor: "#020F13", //标题颜色
          titleBgColor: "#E7EDEF" //标题栏颜色
        },
        event => {
          var data = event.data;
          var dataArr = data
            .replace("[", "")
            .replace("]", "")
            .split(",");
          that.dayIndex = dataArr[0];
          that.hourIndex = dataArr[1];
          that.attribute = itemsDay[dataArr[0]] + "," + itemsHour[dataArr[1]];
          var allHour =
            parseInt(itemsDay[dataArr[0]]) * 24 +
            parseInt(itemsHour[dataArr[1]]);
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
        }
      );
    },
    mideaDialogConfirmBtnClicked(){
      var sendCmd = cmdFun.cmdNotLock();
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
    mideaDialogCancleBtnClicked(){
      this.showDialog = false;
    },
    startSafeKeep() {
      var self = this,
        iskeep = 0;
      if(this.isLock){
        this.showDialog = true;
        return;
      }
      if (this.mideaChecked) {
        iskeep = 0;
      } else {
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
    }
  },
  created() {
    this.isIos = weex.config.env.platform == "iOS" ? true : false;
    if (this.isIos) {
      this.listenerFun();
    }
    //模拟设备数据
    nativeService.initMockData({
      query: query
    });
    this.queryStatus();
    this.cmdCountQuery();
  },
  computed: {
    mBtnStyle() {
      return {
        backgroundColor: "black",
        borderRadius: "20px",
        width: "580px",
        marginTop: "100px"
      };
    }
  },
  mounted() {}
};
</script>
