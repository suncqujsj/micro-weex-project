<template>
  <div class="wrapper" @viewappear="viewappear" @viewdisappear="viewdisappear">
     <div>
      <midea-header 
      title="选择程序" 
      :showSubTitle="false"
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="img/home_btn_bace@2x.png" 
      rightImg="img/home_btn_more@2x.png"
      rightText=""
      :showRightImg="false"  
      @leftImgClick="backClick" 
      @centerClick="centerClick"
      @rightImgClick="rightImgClick"></midea-header>
    </div>
    <div class="bg_section"><image class="bg_img" src="img/bg_program.gif"></image></div>
    
    <!-- 不要用阿里的slider组件和美居的slider组件，不然出现图标重叠的问题 ，直接通过swipe手势事件判断操作（parker） -->
    <div class="select_section"  @swipe="changeSelect" >
      
      <div class="select_item select_prev"  @click="prevHandle">
        <div class="prev_section">
          <div class="flex_center">
          <image class="prev_img" :src="selectPrevRecord.src"></image>
          </div>
          <div class="">
             <text class="_text_dec">
              {{selectPrevRecord.text}}
              </text>
          </div>
        </div>
        
      </div>
      <div class="select_item select_bg">
        <div class="status_section">
            <!-- <div class="slider_prev"><image class="header-left-image" src="../src/img/header/tab_back.png"></image></div> -->
            <div class="slider">
              <div class="slider_section">
                <div class="select_content">
                  <image class="mode_img" :src="currentRecord.src"></image>
                </div>
                <div class="flex_center"><text class="status_text">{{currentRecord.text}}</text></div>
              </div>
            </div>
            <!-- <div class="slider_next"><image class="header-right-image" src="../src/img/arrow_right.png"></image></div> -->
        </div>
      </div>
        <div class="select_item select_prev" @click="nextHandle">
        <div class="prev_section">
            <div class="flex_center">
            <image class="prev_img" :src="selectNextRecord.src"></image>
            </div>
            <div class="">
              <text class="_text_dec">
                {{selectNextRecord.text}}
                </text>
            </div>
          </div>
        
        </div>
    </div>
    <div class="number_box">
      <div>
         <div class="flex_center"><text class="_detail" style="margin-top:5px">{{currentRecord.time}}</text><text class="_danwei _danwei_title">min</text></div>
        <div class="flex_center" style="margin-top:14px;margin-bottom:14px;"><text class="_danwei">/</text></div>
        <div class="flex_center"><text class="_detail">{{currentRecord.temp}}</text><text class="_danwei _danwei_title">℃</text></div>
      </div>
      
    </div>
    
  <div class="footer_section">
  
      <div class="flex_center" style="margin-top: 20px">
      <text class="_tip" v-if="currentRecord.dec">{{currentRecord.dec}}</text>
      </div>
      <div class="flex_center" style="margin-top: 20px">
        <div class="example" v-if="currentRecord.showAdditional">
          <text class="info">{{currentRecord.additionalTitle}}</text>
          <div style="margin-top:10px;margin-left:5px;">
            <midea-switch2 :checked="mideaChecked"  @change="onMideachange" width="70" height="38" :iconOn="iconOn" :iconOff="iconOff"   slot="value"></midea-switch2>                               
          </div>
          <image class="help_img" @click="helpShow" src="img/program_help@2x.png"></image>
          <!-- <div>
          <wxc-icon name="help" @wxcIconClicked="helpShow" style="color:#9b9b9b;font-size:50px;margin-left:20px;margin-top:6px;"></wxc-icon>
          </div> -->
        </div>
      </div>

       <div class="flex_center" v-if="currentRecord.isDiyMode">
         <div class="diySetting" @click="setDiy"><text class="diyBtn">设置自定义</text></div>
       </div>
     

      <div class="flex_center">
         <div class="footer_btn">
          <midea-button text="预约" :textStyle="textStyle" :btnStyle="orderBtnStyle"  @mideaButtonClicked="pickAttribute"></midea-button>
          <midea-button text="启动" :textStyle="startStyle" :btnStyle="startBtnStyle" @mideaButtonClicked="startBtnClick"></midea-button>
        </div>
      </div>
  </div>

   <!-- 设置自定义 -->
   <diy-box :isDiyTopShow="isDiyTopShow" :diyData="diyData"
            :mainWashTemp="mainWashTemp" :piaoWashTemp="piaoWashTemp"
            @cancleDiy="cancleDiy" @saveDiy="saveDiy"
   ></diy-box>

 <!-- 附加功能 -->
  <midea-popup
               :show="isBottomShow"
               @mideaPopupOverlayClicked="popupOverlayBottomClick"
               pos="bottom"
               height="300">
         <div class="tip_box">
            <div class="flex_center">
              <text class="popup_title">少量</text>
            </div>
            <div class="flex_center">
              <text class="popup_content">餐具较少的情况下，叠加少量功能可以省水省电</text>
            </div>
            <div class="flex_center">
              <midea-button text="我知道了" :textStyle="startStyle" :btnStyle="kownBtnStyle" @mideaButtonClicked="Ikown"></midea-button>
            </div>
         </div>
      </midea-popup>
    

    <!-- 全部程序 -->
     <midea-popup
               :show="isTopShow"
               @mideaPopupOverlayClicked="popupOverlayBottomClick"
               pos="top"
               height="1200">
         <div class="demo-content">
            <whole-mode @upClick="upClick" @modeItemClick="modeItemClick" :currentRecord="currentRecord"></whole-mode>
         </div>
      </midea-popup>
    <error-box :isBoxShow="isErrorBoxShow" :errorContentList="errorContentList" :isDoorOpen='isDoorOpen' :errorDec="errorDec" @clickError="onClickError"></error-box>
    
     <midea-dialog title="童锁中"
                    :show="showDialog"
                    @close="closeDialog"
                    @mideaDialogCancelBtnClicked="cancleClicked"
                    @mideaDialogConfirmBtnClicked="cancleLockClicked"
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
.demo-content {
  width: 750px;
  height: 1200px;
  background-color: #ecf1f3;
}
.footer_section {
  position: absolute;
  bottom: 80px;
  width: 750px;
}
.popup_title {
  font-size: 38px;
  color: #444343;
  margin-top: 30px;
}
.popup_content {
  margin-top: 30px;
  font-size: 28px;
  color: #444343;
}
.prev_section {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
.example {
  flex-direction: row;
  justify-content: flex-start;
}

.info {
  font-size: 30px;
  line-height: 60px;
  color: #9b9b9b;
  margin-left: 0px;
}
.help_img {
  width: 45px;
  height: 45px;
  margin-left: 20px;
  margin-top: 6px;
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
._tip {
  /* margin-top: 100px; */
  font-size: 30px;
  color: rgb(150, 148, 148);
}
.diySetting {
  width: 200px;
  height: 70px;
  border-color: #9b9b9b;
  border-width: 1px;
  border-radius: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.diyBtn {
  color: #9b9b9b;
  font-size: 26px;
}

.subStatus {
  color: #020f13;
  font-size: 24px;
  align-self: flex-start;
}
.select_bg {
  /* position: relative; */
  /* background-image: linear-gradient(to right, rgb(33, 148, 230), #fff); */
}
.bg_section {
  position: absolute;
  top: 190px;
  left: 240px;
  /* background-image: linear-gradient(to top, #e2f0fa, white); */
}
.bg_img {
  width: 260px;
  height: 730px;
  resize: contain;
}
.prev_img {
  width: 90px;
  height: 70px;
  opacity: 0.5;
  resize: contain;
}
._text_dec {
  font-size: 30px;
  text-align: center;
  color: rgb(181, 210, 247);
  position: relative;
  left: -50px;
}

.select_section {
  flex-direction: row;
  justify-content: center;
  margin-top: 70px;
  position: relative;
}
.select_item {
  width: 250px;
  height: 300px;
  /* border-width: 1px;
  border-color: #020f13; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.number_box {
  position: relative;
  top: 120px;
}

.select_prev {
  /* position: absolute; */
}

.select_content {
  width: 600px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
._detail {
  font-size: 60px;
  color: #ffffff;
}
._danwei {
  color: #ffffff;
  font-size: 36px;
}
._danwei_title {
  margin-top: 20px;
}

.status_section {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
}
.slider {
  width: 600px;
  height: 400px;
  border-style: none;
}

.header-left-image {
  height: 44px;
  width: 24px;
}
.header-right-image {
  height: 44px;
  width: 44px;
}

.number_bg {
  width: 250px;
  height: 300px;
  background-image: linear-gradient(
    to bottom,
    rgb(33, 148, 230),
    rgb(130, 196, 243)
  );
}
/* .small_wave {
  width: 264px;
  height: 550px;
  position: relative;
  top: -20px;
} */
.status_text {
  margin-top: 20px;
  font-size: 30px;
  color: rgb(70, 149, 240);
}
.status_dec {
  font-size: 70px;
  color: aliceblue;
  text-align: center;
}
.mode_img {
  margin-top: 150px;
  width: 110px;
  height: 86px;
  resize: contain;
}
._status_text {
  color: rgb(0, 0, 0);
}
.order_time {
  color: red;
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
import mideaPopup from "../component/popup.vue";
import mideaSwitch2 from "../midea-component/switch.vue";
import wholeMode from "./wholeMode.vue";
import errorBox from "./errorBox.vue";
import mideaDialog from "../component/dialog.vue";
import diyBox from "./diyBox.vue";

// import { WxcIcon } from "weex-ui";
const globalEvent = weex.requireModule("globalEvent");
const modal = weex.requireModule("modal");
const picker = weex.requireModule("picker");

export default {
  components: {
    mideaCell,
    mideaHeader,
    mideaButton,
    mideaPopup,
    mideaSwitch2,
    wholeMode,
    errorBox,
    mideaDialog,
    diyBox
    // WxcIcon
  },
  data() {
    return {
      showDialog: false,
      isLock: 0,
      checked: false,
      mideaChecked: false,
      iconOn: "img/check/switch_on.png",
      iconOff: "img/check/switch_off.png",
      value: 22,
      time: "",
      isTopShow: false,
      isBottomShow: false,
      index: 0,
      selectContent: [
        {
          src: "img/sel_mode/program_all_icon_ECO@2x.png",
          text: "节能洗",
          mode: 4,
          dec: "更充分的浸泡，省水省电",
          additionalMode: 7,
          showAdditional: true,
          additionalTitle: "叠加少量",
          time: 178,
          temp: 70,
          isDiyMode: false
        },
        {
          src: "img/sel_mode/program_all_icon_intensive@2x.png",
          text: "强力洗",
          mode: 2,
          dec: "重油污餐具清洗",
          additionalMode: 0,
          time: 110,
          temp: 70,
          isDiyMode: false
        },
        {
          src: "img/sel_mode/program_all_icon_rapid@2x.png",
          text: "超快洗",
          mode: 7,
          dec: "清污餐具，短时间洗涤",
          additionalMode: 0,
          time: 29,
          temp: 66,
          isDiyMode: false
        },
        {
          src: "img/sel_mode/setting_diy.png",
          text: "自定义洗",
          mode: 12,
          additionalMode: 0,
          time: "-:--",
          temp: "",
          isDiyMode: true
        }
      ],
      selectPrevRecord: {},
      currentRecord: {},
      selectNextRecord: {},

      time: "",
      day_dec: "",
      startBtnStyle: {
        background:
          "linear-gradient(to right, rgb(33, 148, 230),rgb(20, 180, 230))",
        borderRadius: "50px",
        width: "280px"
      },

      attribute: "请选择时间",
      dayIndex: 0,
      hourIndex: 0,
      minuteIndex: 0,
      isErrorBoxShow: false,
      errorContentList: [],
      errorDec: "",
      isDoorOpen: false,

      isDiyTopShow: false,
      diyData: 3,
      mainWashTemp: 55,
      piaoWashTemp: 60
    };
  },
  methods: {
    analysisFun(analysisObj) {
      // nativeService.alert(analysisObj);
      var self = this;
      self.isErrorBoxShow = false;
      self.showDialog = false;
      if (
        analysisObj.workingState.value == 0 ||
        analysisObj.workingState.value == 1
      ) {
        //self.jumpNext("standby");
      }

      self.diyData = analysisObj.washingTimes.value;
      self.mainWashTemp = analysisObj.mainWashingTemperature.value;
      self.piaoWashTemp = analysisObj.piaoWashTemperature.value;

      self.isLock = analysisObj.displaySign.detail.lockable.value;
      if (analysisObj.workingState.value == 2) {
        self.jumpNext("order");
      }
      if (analysisObj.workingState.value == 3) {
        self.jumpNext("working");
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
        self.errorContentList = ["请联系专业维修人员", "400-0000-4008"];
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
          //nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
    },
    sendCmd() {
      var self = this;
      var mode = this.currentRecord.mode;
      var additionalMode = 0;
      if (this.mideaChecked && mode != 12) {
        additionalMode = this.currentRecord.additionalMode;
      } else {
        additionalMode = 0;
      }
      var sendCmd = cmdFun.createControlMessage(mode, additionalMode);
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
          //nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
    },
    backClick() {
      var path = "standby.js";
      nativeService.goTo(path, false, true);
    },
    rightImgClick() {
      var path = "helper.js";
      nativeService.goTo(path, false, true);
    },
    popupOverlayBottomClick() {
      this.isTopShow = false;
      this.isBottomShow = false;
      this.isDiyTopShow = false;
    },
    centerClick() {
      this.isTopShow = true;
    },
    upClick() {
      this.isTopShow = false;
    },
    hideClick() {
      this.popupOverlayBottomClick();
    },
    onMideachange(event) {
      this.mideaChecked = !event;
      if (this.mideaChecked) {
        if (this.currentRecord.mode == 4) {
          //节能洗
          this.currentRecord.time = 126;
        }
      } else {
        this.currentRecord.time = 178;
      }
    },
    helpShow() {
      this.isBottomShow = true;
    },
    Ikown() {
      this.isBottomShow = false;
    },
    modeItemClick(item) {
      //点击全部选择程序得回调
      var self = this;
      //nativeService.toast(item);
      var { selectContent } = this;
      for (var i = 0; i < selectContent.length; i++) {
        if (item.title == selectContent[i].text) {
          self.smartFuntion(i);
        }
      }
    },
    mideaButtonClicked() {},
    smartFuntion(_index) {
      var prev_index = _index - 1;
      var next_index = _index + 1;
      if (prev_index < 0) {
        prev_index = this.selectContent.length - 1;
      }
      
      if (next_index > this.selectContent.length - 1) {
        next_index = 0;
      }

      this.selectPrevRecord = null;
      this.selectNextRecord = null;
      this.currentRecord = null;

      if (this.selectContent[_index].mode == 12) {
        if (this.diyData == 1) {
          this.selectContent[_index].temp = "--";
          this.selectContent[_index].time = 18;
        }
        if (this.diyData == 2) {
          this.selectContent[_index].temp = 35;
          this.selectContent[_index].time = 29;
        }
        if (this.diyData == 3) {
          this.selectContent[_index].time = 100;
          this.selectContent[_index].temp = this.piaoWashTemp;
        }
        if (this.diyData == 4) {
          this.selectContent[_index].time = 110;
          this.selectContent[_index].temp = this.piaoWashTemp;
        }
        if (this.diyData == 5) {
          this.selectContent[_index].time = 120;
          this.selectContent[_index].temp = this.piaoWashTemp;
        }
        if (this.diyData == 6) {
          this.selectContent[_index].time = 130;
          this.selectContent[_index].temp = this.piaoWashTemp;
        }
      }
      this.currentRecord = this.selectContent[_index];
      this.selectPrevRecord = this.selectContent[prev_index];
      this.selectNextRecord = this.selectContent[next_index];
    },
    prevHandle() {
      var _index = this.index;
      if (_index - 1 < 0) {
        this.index =
          (_index - 1 + this.selectContent.length) % this.selectContent.length;
      } else {
        this.index = (_index - 1) % this.selectContent.length;
      }
      this.smartFuntion(this.index);
      // nativeService.toast(this.index);
    },
    nextHandle(){
      var _index = this.index;
      this.index = (_index + 1) % this.selectContent.length;
      this.smartFuntion(this.index);
    },
    changeSelect(event) {
      if (event.direction == "left") {
        this.nextHandle();
      }
      if (event.direction == "right") {
        this.prevHandle();
      }
      //this.smartFuntion(this.index);
      //nativeService.alert(self.selectNextRecord.text);
    },
    jumpNext(which) {
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
          //self.countFun(arr);
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
    // onappear (event) {
    //   this.index = 0;
    // },
    // ondisappear (event) {
    //   this.index = 0;
    // },
    startBtnClick() {
      if (this.isLock) {
        this.showDialog = true;
        return;
      }
      this.sendCmd(); // 下发启动指令
    },
    cancleLockClicked() {
      var self = this;
      var sendCmd = cmdFun.cmdNotLock();
      nativeService.startCmdProcess(
        "control",
        sendCmd,
        function(result) {
          //nativeService.toast(result);
          //nativeService.hideLoading();
          var result_arr = JSON.parse(result);
          var analysisObj = cmdFun.analysisCmd(result_arr);
          self.showDialog = false;
          self.analysisFun(analysisObj);
        },
        function(result) {
          //nativeService.hideLoading();
          //nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
    },
    cancleClicked() {
      this.showDialog = false;
    },
    onClickError() {
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
          //nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
    },
    pickAttribute() {
      if (this.isLock) {
        this.showDialog = true;
        return;
      }
      var myDate = new Date(); //获取系统当前时间,东8区相差8小时
      var currentHour = myDate.getHours();
      var currentMinute = myDate.getMinutes();

      // nativeService.alert(currentHour);
      //  nativeService.alert(currentMinute);
      var itemsDay = ["今天", "明天"];
      var itemsHour = [],
        itemsMinute = [];
      for (var i = 0; i < 24; i++) {
        itemsHour.push(i + "");
      }
      for (var key = 0; key <= 59; key++) {
        itemsMinute.push(key + "");
      }
      var that = this;
      var pickItem = [
        {
          index: that.dayIndex,
          item: itemsDay,
          label: ""
        },
        {
          index: that.hourIndex,
          item: itemsHour,
          max: 20,
          min: 10,
          label: "时"
        },
        {
          index: that.minuteIndex,
          item: itemsMinute,
          label: "分"
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
          that.minuteIndex = dataArr[2];

          var day = 0;
          var sendAllMinutes =
            parseInt(itemsHour[that.hourIndex]) * 60 +
            parseInt(itemsMinute[that.minuteIndex]);
          var currentAllMinutes = currentHour * 60 + currentMinute;
          if (itemsDay[that.dayIndex] == "今天") {
            day = 0;
            if (sendAllMinutes <= currentAllMinutes) {
              nativeService.toast("选择的时间不能少于当前时间哦");
              return;
            }
          }
          if (itemsDay[that.dayIndex] == "明天") {
            day = 1;
            sendAllMinutes =
              day * 24 * 60 +
              parseInt(itemsHour[that.hourIndex]) * 60 +
              parseInt(itemsMinute[that.minuteIndex]);
          }
          var sendHour = parseInt((sendAllMinutes - currentAllMinutes) / 60);
          var sendMinute = (sendAllMinutes - currentAllMinutes) % 60;
          //nativeService.toast(sendHour);
          //var allHour = day*24+parseInt(itemsHour[that.hourIndex]);

          var additionalMode = 0;
          if (that.mideaChecked) {
            additionalMode = that.currentRecord.additionalMode;
          } else {
            additionalMode = 0;
          }

          var sendCmd = cmdFun.cmdOrderWashing(
            that.currentRecord.mode,
            additionalMode,
            sendHour,
            sendMinute
          );
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
              //nativeService.toast("查询失败" + JSON.stringify(result));
            }
          );
        }
      );
    },
    setDiy() {
      this.isDiyTopShow = true;
    },
    cancleDiy() {
      this.isDiyTopShow = false;
    },
    saveDiy(responeData) {
      // nativeService.alert(responeData);
      this.currentRecord.temp = responeData.piaoWashTemp;
      switch (parseInt(responeData.diyData)) {
        case 1:
          this.currentRecord.time = 18;
          this.currentRecord.temp = "--";
          break;
        case 2:
          this.currentRecord.time = 29;
          this.currentRecord.temp = 35;
          break;
        case 3:
          this.currentRecord.time = 100;
          break;
        case 4:
          this.currentRecord.time = 110;
          break;
        case 5:
          this.currentRecord.time = 120;
          break;
        case 6:
          this.currentRecord.time = 130;
          break;
      }
      this.isDiyTopShow = false;
      var self = this;
      var sendCmd = cmdFun.cmdStartDiyWashing(
        parseInt(responeData.diyData),
        parseInt(responeData.mainWashTemp),
        parseInt(responeData.piaoWashTemp)
      );
      // nativeService.alert(sendCmd);
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
          //nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
    }
  },
  created() {
    this.isIos = weex.config.env.platform == "iOS" ? true : false;
    this.smartFuntion(0);
    if (this.isIos) {
      this.listenerFun();
    }
    //模拟设备数据
    nativeService.initMockData({
      query: query
    });
    this.queryStatus();
  },
  mounted() {
    
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

    kownBtnStyle() {
      return {
        backgroundImage:
          "linear-gradient(to right, rgb(33, 148, 230),rgb(20, 180, 230))",
        borderRadius: "50px",
        width: "560px",
        height: "90px",
        marginTop: "36px"
      };
    },
    startStyle() {
      return {
        color: "#ffffff"
      };
    }
  }
};
</script>
