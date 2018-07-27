<template>
  <div class="wrapper" @viewappear="viewappear" @viewdisappear="viewdisappear">
     <div>
      <midea-header 
      title="选择程序" 
      :showSubTitle="false"
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="assets/img/home_btn_bace@2x.png" 
      rightImg="assets/img/home_btn_more@2x.png"
      rightText="智能助手"
      :showRightImg="false"  
      @leftImgClick="backClick" 
      @centerClick="centerClick"
      @rightImgClick="rightImgClick"></midea-header>
    </div>
    <div class="bg_section"><image class="bg_img" src="assets/assets/img/bg_program.gif"></image></div>
    
    <div class="select_section">
      
      <div class="select_item select_prev" @click="prevHandle">
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
            <!-- <div class="slider_prev"><image class="header-left-image" src="../src/assets/img/header/tab_back.png"></image></div> -->
            <slider class="slider" :index="index" interval="3000" auto-play="false" @change="changeSelect">
              <div class="slider_section" v-for="(mode, index) in selectContent" :key="index">
                <div class="select_content">
                  <image class="mode_img" :src="mode.src"></image>
                </div>
                <div class="flex_center"><text class="status_text">{{mode.text}}</text></div>
              </div>
            </slider>
            <!-- <div class="slider_next"><image class="header-right-image" src="../src/assets/img/arrow_right.png"></image></div> -->
        </div>
      </div>
        <div class="select_item select_prev" @click="index = (index + 1)%selectContent.length">
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
      <div class="flex_center"><text class="_detail" style="margin-top:5px">{{currentRecord.time}}</text><text class="_danwei _danwei_title">min</text></div>
      <div class="flex_center" style="margin-top:14px;margin-bottom:14px;"><text class="_danwei">/</text></div>
      <div class="flex_center"><text class="_detail">{{currentRecord.temp}}</text><text class="_danwei _danwei_title">℃</text></div>
      
    </div>
    
  <div class="footer_section">
  
      <div class="flex_center" style="margin-top: 20px">
      <text class="_tip" v-if="currentRecord.dec">{{currentRecord.dec}}</text>
      </div>
      <div class="flex_center" style="margin-top: 20px">
        <div class="example" v-if="currentRecord.showAdditional">
          <div class="flex_center other_section" @click="helpShow">
            <text class="info">{{additionalDec}}</text>
          </div>
          <!-- <div>
          <wxc-icon name="help" @wxcIconClicked="helpShow" style="color:#9b9b9b;font-size:50px;margin-left:20px;margin-top:6px;"></wxc-icon>
          </div> -->
        </div>
      </div>

      <div class="flex_center">
         <div class="footer_btn">
          <midea-button text="预约" :textStyle="textStyle" :btnStyle="orderBtnStyle"  @mideaButtonClicked="pickAttribute"></midea-button>
          <midea-button text="启动" :textStyle="startStyle" :btnStyle="startBtnStyle" @mideaButtonClicked="startBtnClick"></midea-button>
        </div>
      </div>
  </div>

  <midea-popup
               :show="isBottomShow"
               @mideaPopupOverlayClicked="popupOverlayBottomClick"
               pos="bottom"
               height="540">
         <div class="tip_box">
           <div class="other_header">
             <text class="other_btn" @click="cancleBtn">取消</text>
             <text class="other_btn" @click="makeSure">确定</text>
           </div>
            <div class="flex_center" style="margin-bottom:50px">
              <text class="popup_title">选择附加功能</text>
            </div>
            <div class="flex_center" v-for="(item,index) in currentRecord.additionalArr">
              <div :class="['other_item',item.isActive && 'other_item_active']"  @click="otherBtnClick(item)">
                <div class="flex_center">
                  <text :class="['other_title',item.isActive && 'title_active']">{{item.title}}</text>
                </div>
                 <div class="flex_center">
                  <text :class="['other_content',item.isActive && 'content_active']">{{item.dec}}</text>
                </div>
              </div>
            </div>
             <!-- <div class="flex_center">
              <div :class="['other_item',quikActive && 'other_item_active']" @click="otherQuikBtnClick">
                <div class="flex_center">
                  <text :class="['other_title',quikActive && 'title_active']">加速</text>
                </div>
                 <div class="flex_center">
                  <text :class="['other_content',quikActive && 'content_active']">轻度油污餐具，加速可以加快洗涤进度</text>
                </div>
              </div>
            </div> -->
            
         </div>
      </midea-popup>
    

     <midea-popup
               :show="isTopShow"
               @mideaPopupOverlayClicked="popupOverlayBottomClick"
               pos="top"
               height="1200">
         <div class="demo-content">
            <whole-mode @upClick="upClick" @modeItemClick="modeItemClick" :currentRecord="currentRecord"></whole-mode>
         </div>
      </midea-popup>
    <error-box :isBoxShow="isErrorBoxShow" :isDoorOpen='true' :errorContentList="errorContentList" :errorDec="errorDec"></error-box>
    
  </div>
</template>
<style scoped>
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.other_header{
  position: absolute;
  top: 0px;
  left: 40px;
  width: 670px;
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.other_btn{
  font-size: 32px;
  color: #3396f3;
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
  font-size: 34px;
  color: rgb(54, 54, 54);
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
.tip_box{
  position: relative;
}
.other_section{
  width: 250px;
  border-color: #ddd;
  border-width: 1px;
  border-radius: 80px;
}
.info {
  font-size: 30px;
  line-height: 60px;
  color: #9b9b9b;
  margin-left: 0px;
 
}
.other_item{
  width: 680px;
  height: 160px;
  border-color: #b2e0ff;
  border-width: 1px;
  border-radius: 80px;
  margin-top: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* box-shadow:20px  10px 5px #008B00; */
}
.help_img{
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
  color: #969494;
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

.select_prev{
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
.other_title{
  font-size: 32px;
  color: #3d95fa;
  font-weight: bold;
}
.title_active{
  font-size: 32px;
  color: #fff;
  font-weight: bold;
}
.other_content{
  font-size: 30px;
  color: #818181;
  margin-top: 10px;
}
.content_active{
  font-size: 30px;
  color: #fff;
  margin-top: 10px;
}
.other_item_active{
  background-color: #3cadf7;
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
  color: #4695f0;
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
    errorBox
    // WxcIcon
  },
  data() {
    return {
      checked: false,
      mideaChecked: false,
      iconOn: "assets/img/check/switch_on.png",
      iconOff: "assets/img/check/switch_off.png",
      value: 22,
      time: "",
      isTopShow: false,
      isBottomShow: false,
      index: 0,
      selectContent: [
        {
          src: "assets/img/sel_mode/program_all_icon_auto@2x.png",
          text: "智能洗",
          mode: 1,
           dec: "智能分析，自动选择，最佳的清洗方式",
          additionalMode: 0,
          time: '-:--',
          temp: 68
        },
        {
          src: "assets/img/sel_mode/program_all_icon_ECO@2x.png",
          text: "节能洗",
          mode: 4,
           dec: "更充分的浸泡，省水省电",
          additionalMode: 0,
          showAdditional: true,
          additionalTitle: "叠加少量",
           additionalArr:[
              {additionalMode:7,time:120,temp:65,title:'少量',dec:'餐具较少的情况下，叠加少量可以省水省电',isActive:false},
              {additionalMode:3,time:140,temp:68,title:'加速',dec:'轻度油污餐具，加速可以加快洗涤进度',isActive:false},
            ],
          time: 175,
          temp: 68
        },
        {
          src: "assets/img/sel_mode/90min@2x.png",
          text: "90min洗",
          mode: 9,
          additionalMode: 0,
          time: 90,
          temp: 65
        },
        {
          src: "assets/img/sel_mode/program_all_icon_glass@2x.png",
          text: "玻璃洗",
          mode: 5,
          dec: "精致玻璃器皿专用",
          additionalMode: 0,
          showAdditional: true,
           additionalArr:[
              {additionalMode:7,time:55,temp:62,title:'少量',dec:'餐具较少的情况下，叠加少量可以省水省电',isActive:false},
              {additionalMode:3,time:60,temp:65,title:'加速',dec:'轻度油污餐具，加速可以加快洗涤进度',isActive:false},
            ],
          time: 65,
          temp: 62
        },
        {
          src: "assets/img/sel_mode/program_all_icon_intensive@2x.png",
          text: "强力洗",
          mode: 2,
           dec: "重油污餐具清洗",
          additionalMode: 0,
          showAdditional: true,
           additionalArr:[
              {additionalMode:7,time:105,temp:68,title:'少量',dec:'餐具较少的情况下，叠加少量可以省水省电',isActive:false},
              {additionalMode:3,time:130,temp:68,title:'加速',dec:'轻度油污餐具，加速可以加快洗涤进度',isActive:false},
            ],
          time: 135,
          temp: 68
        },
        {
          src: "assets/img/sel_mode/program_all_icon_normal@2x.png",
          text: "即时洗",
          mode: 3,
           dec: "日常饭后及时清洗",
          additionalMode: 0,
          showAdditional: true,
            additionalArr:[
              {additionalMode:7,time:80,temp:68,title:'少量',dec:'餐具较少的情况下，叠加少量可以省水省电',isActive:false},
              {additionalMode:3,time:85,temp:68,title:'加速',dec:'轻度油污餐具，加速可以加快洗涤进度',isActive:false},
            ],
          time: 100,
          temp: 68
        },
        {
          src: "assets/img/sel_mode/program_all_icon_pre-wash_Soak@2x.png",
          text: "预冲洗",
          mode: 8,
          additionalMode: 0,
          time: 15,
          temp: '--'
        },
        {
          src: "assets/img/sel_mode/program_all_icon_rapid@2x.png",
          text: "超快洗",
          mode: 7,
          dec: "清污餐具，短时间洗涤",
          additionalMode: 0,
          time: 29,
          temp: 55
        },
        {
          src: "assets/img/sel_mode/program_all_icon_self-cleaning@2x.png",
          text: "自清洁洗",
          mode: 10,
          additionalMode: 0,
          time: 75,
          temp: 65
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
        width: "280px",
      },

      attribute: "请选择时间",
      dayIndex: 0,
      hourIndex: 0,
      minuteIndex: 0,
     
      currentAdditional:{},
      additionalDec:'+ 附加功能',
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
        //self.jumpNext("standby");
      }
       if (analysisObj.workingState.value == 2) {
        self.jumpNext("order");
      }
      if (analysisObj.workingState.value == 3) {
        self.jumpNext("working");
      }

      if(analysisObj.isError.value){
        self.isErrorBoxShow = true;
      }
       //door status
      if(analysisObj.displaySign.detail.doorSwitch.value==0){
        self.isErrorBoxShow = true;
        self.errorDec="温馨提示:门开";
        self.errorContentList = ["请关上门试试是否解决"];
      }
      if(analysisObj.errorCode.value==1){
        self.errorDec="E1:进水故障";
        self.errorContentList = ["请确认以下三点是否解决","1.水压太低","2.进水管堵塞/打折","3.水龙头未打开"];
      }
      if(analysisObj.errorCode.value==3){
         self.errorDec="E3:加热异常";
        self.errorContentList = ["请联系专业维修人员","400-0000-4008"];
      }
       if(analysisObj.errorCode.value==4){
         self.errorDec="E4:发生流溢";         
        self.errorContentList = ["请确认以下四点是否解决","1.使用清洁精","2.排水管堵塞/打折","3.地面不平","4.外部积水流入机器"];
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
          nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
    },
    sendCmd() {
      var self = this;
      var mode = this.currentRecord.mode;
      var additionalMode = this.currentRecord.additionalMode;
      var sendCmd = cmdFun.createControlMessage(mode, additionalMode);
      //nativeService.alert(sendCmd);
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
      var path = "standby.js";
      nativeService.goTo(path,false, true);
    },
    rightImgClick() {
      var path = "helper.js";
      nativeService.goTo(path,false, true);
    },
    popupOverlayBottomClick() {
      this.isTopShow = false;
      this.isBottomShow = false;
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
    helpShow() {
      this.isBottomShow = true;
    },
    Ikown() {
      this.isBottomShow = false;
    },
    cancleBtn(){
      this.isBottomShow = false;
    },
    otherBtnClick(item){
     var {currentRecord} = this;
     var additionalArr = currentRecord.additionalArr;
     for(var i=0; i<additionalArr.length; i++){
       if(item.additionalMode==additionalArr[i].additionalMode){
         if(additionalArr[i].isActive){
           additionalArr[i].isActive = false;
           this.currentAdditional.hasMode = false;
         }else{
           additionalArr[i].isActive = true;
           this.currentAdditional = additionalArr[i];
           this.currentAdditional.hasMode = true;
         }
       }else{
         additionalArr[i].isActive = false;
         //this.currentAdditional.hasMode = false;
       }
     }
     //this.currentRecord.additionalArr = additionalArr;
     
    },
    makeSure(){
      var {currentAdditional,currentRecord,selectContent} = this;
      if(currentAdditional.hasMode){
        this.additionalDec = currentAdditional.title;
        currentRecord.additionalMode = currentAdditional.additionalMode;
        currentRecord.time = currentAdditional.time;
        currentRecord.temp = currentAdditional.temp;
      }else{
        this.additionalDec = '+ 附加功能';
        currentRecord.additionalMode = 0;
        
        if(currentRecord.mode==2){
          currentRecord.time = 135;
          currentRecord.temp = 68;
          
        }
        if(currentRecord.mode==3){
           currentRecord.time = 100;
          currentRecord.temp = 68;
        }
        if(currentRecord.mode==4){
           currentRecord.time = 175;
          currentRecord.temp = 68;
        }
        if(currentRecord.mode==5){
           currentRecord.time = 65;
          currentRecord.temp = 62;
        }
         
      }
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
      this.currentRecord = this.selectContent[_index];
      this.selectPrevRecord = this.selectContent[prev_index];
      this.selectNextRecord = this.selectContent[next_index];

      this.additionalDec = '+ 附加功能';
        this.currentRecord.additionalMode = 0;
        
        if(this.currentRecord.mode==2){
          this.currentRecord.time = 135;
          this.currentRecord.temp = 68;
          
        }
        if(this.currentRecord.mode==3){
           this.currentRecord.time = 100;
          this.currentRecord.temp = 68;
        }
        if(this.currentRecord.mode==4){
           this.currentRecord.time = 175;
          this.currentRecord.temp = 68;
        }
        if(this.currentRecord.mode==5){
           this.currentRecord.time = 65;
          this.currentRecord.temp = 62;
        }

      var additionalArr = this.currentRecord.additionalArr||[];
      for(var i=0; i<additionalArr.length; i++){
        additionalArr[i].isActive = false;
      }
      this.currentAdditional.hasMode = false;
         
    },
     prevHandle(){
      var _index = this.index;
      if((_index-1) < 0){
        this.index = (_index - 1 + this.selectContent.length)%this.selectContent.length;
      }else{
        this.index = (_index - 1)%this.selectContent.length;
      }
      // nativeService.toast(this.index);
      
    },
    changeSelect(event) {
      var _index = event.index;
      this.index = _index;
      this.smartFuntion(_index);
      //nativeService.alert(self.selectNextRecord.text);
    },
    jumpNext(which) {
      var path = which + ".js";
      nativeService.goTo(path,false, true);
    },
     listenerFun(){
       var self = this;        
        globalEvent.addEventListener("receiveMessage", function(e) {
          var str = e.data;
          //nativeService.toast(str);
          var arr = str.split(",");
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
    startBtnClick() {
      this.sendCmd(); // 下发启动指令
    },
    pickAttribute() {
      var myDate = new Date();//获取系统当前时间,东8区相差8小时
      var currentHour = myDate.getHours();
      var currentMinute = myDate.getMinutes();

      //nativeService.alert(currentHour);
       //nativeService.alert(currentMinute);
        var itemsDay = ['今天','明天'];
        var itemsHour = [],itemsMinute = [];
        for(var i=0; i<24; i++){
          itemsHour.push(i+'');
        }
        for(var key=0; key<=59; key++){
          itemsMinute.push(key+'');
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
                max:20,
                min: 10,
                label: "时"
            },
            {
                index: that.minuteIndex,
                item: itemsMinute,
                label: "分"
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
            that.minuteIndex = dataArr[2];

            var day = 0;
            var sendAllMinutes = parseInt(itemsHour[that.hourIndex])*60+parseInt(itemsMinute[that.minuteIndex]);
            var currentAllMinutes = currentHour*60+currentMinute;
            if(itemsDay[that.dayIndex]=='今天'){
              day = 0;
              if(sendAllMinutes<=currentAllMinutes){
                nativeService.toast("选择的时间不能少于当前时间哦");
                return;
              }
            }
            if(itemsDay[that.dayIndex]=='明天'){
              day = 1;
              sendAllMinutes = day*24*60+parseInt(itemsHour[that.hourIndex])*60+parseInt(itemsMinute[that.minuteIndex]);
            }
            var sendHour = parseInt((sendAllMinutes - currentAllMinutes)/60);
            var sendMinute = (sendAllMinutes - currentAllMinutes)%60;
            //nativeService.toast(sendHour);
            //var allHour = day*24+parseInt(itemsHour[that.hourIndex]);

             var additionalMode = 0;
              if (that.mideaChecked) {
                additionalMode = that.currentRecord.additionalMode;
              } else {
                additionalMode = 0;
              }
           var sendCmd = cmdFun.cmdOrderWashing(that.currentRecord.mode, additionalMode, sendHour,sendMinute);
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
   
  },
  created() {
    this.isIos = weex.config.env.platform == "iOS" ? true : false;
    if (this.isIos){
      this.listenerFun();
    }
    this.smartFuntion(this.index);
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
