<template>
<div class="bg">
  <div>
   <text class="_center_title" @click="jumpNext('standby')">欢迎进到洗碗机h3</text>
   <text class="_center_title" @click="sendCmd">测试下发指令</text>
  </div>

  <div  class="test">
   <div class="_btn_display" ref="tests">徽章</div>

  </div>
   <div>
<wxc-button text="确定"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
   </div>
    
</div>
</template>
<style scoped>
._center_title {
  text-align: center;
  margin: 60px;
  font-size: 40px;
}
.bg {
  background-image: linear-gradient(to bottom, #2194e6, white);
}
._btn_display {
  width: 100px;
  height: 100px;
  background-color: antiquewhite;
  border-radius: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
}
.test {
  flex-direction: row;
  justify-content: center;
}
</style>
<script>
import nativeService from "../common/services/nativeService";
import message from "../common/util/smartMessage";
import cmdFun from "./util.js"; //解析指令
// import query from '../dummy/query';
const globalEvent = weex.requireModule("globalEvent");
const animation = weex.requireModule("animation");
const modal = weex.requireModule("modal");
import { WxcButton } from "weex-ui";
export default {
  components: { WxcButton },
  data() {
    return {
      degVal: 360,
      sendcmd: null
    };
  },
  methods: {
    createQueryMessage() {
      var messageBody = message.createMessageBody(34); //测试洗碗机查询指令
      message.setByte(messageBody, 0);
      this.sendMessage = message.createMessage(0xe1, 0x03, messageBody);
      // nativeService.toast(this.sendMessage);
    },
    createControlMessage(mode, additionalMode) {
      var messageBody = message.createMessageBody(24); //测试洗碗机查询指令
      message.setByte(messageBody, 0, 0x08);
      message.setByte(messageBody, 1, 0x03);
      message.setByte(messageBody, 2, mode);
      message.setByte(messageBody, 3, additionalMode);
      message.setBit(messageBody, 5, 3, 0x01);
      this.sendcmd = message.createMessage(0xe1, 0x02, messageBody);
    },
    queryStatus() {
      var self = this;
      this.createQueryMessage();
      nativeService.showLoading();
      nativeService.startCmdProcess(
        "query",
        this.sendMessage,
        function(result) {
          nativeService.hideLoading();
          var result_arr = result.replace(/\[|]/g, ""); //去掉中括号
          var arr = result_arr.split(",");
          //nativeService.alert(arr[11]);
          var analysisObj = cmdFun.analysisCmd(arr);
          if (
            analysisObj.statusObj.status == "standby" ||
            analysisObj.statusObj.status == "shutdown"
          ) {
            self.jumpNext("standby");
          }
          if (analysisObj.statusObj.status == "working") {
            self.jumpNext("working");
          }
          nativeService.toast(analysisObj);
        },
        function(result) {
          nativeService.hideLoading();
          nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
    },
    sendCmd() {
      this.createControlMessage(5, 0);
      nativeService.startCmdProcess(
        "control",
        this.sendcmd,
        function(result) {
          nativeService.toast(result);
          nativeService.hideLoading();
          var result_arr = JSON.parse(result);
          var analysisObj = cmdFun.analysisCmd(result_arr);
          if (
            analysisObj.statusObj.status == "standby" ||
            analysisObj.statusObj.status == "shutdown"
          ) {
            self.jumpNext("standby");
          }
          if (analysisObj.statusObj.status == "working") {
            self.jumpNext("working");
          }
          nativeService.toast(analysisObj);
        },
        function(result) {
          nativeService.hideLoading();
          nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
    },
    jumpNext(which) {
      var path = which + ".js";
      nativeService.goTo(path);
    },
    wxcButtonClicked(e) {
      nativeService.toast(e);
    },

    moveTest(degVal) {
      var self = this;
      var testEl = this.$refs.test;
      animation.transition(
        testEl,
        {
          styles: {
            color: "#FF0000",
            transform: "rotate(" + degVal + "deg)",
            transformOrigin: "center center"
          },
          duration: 1000, //ms
          timingFunction: "linear",
          delay: 0 //ms
        },
        function() {
          self.degVal = self.degVal + 360;
          self.moveTest(self.degVal);
        }
      );
    }
  },
  created() {
    var self = this;
    globalEvent.addEventListener("receiveMessage", function(e) {
      var str = e.data;
      //nativeService.toast(str);
      var arr = str.split(",");
      var analysisObj = cmdFun.analysisCmd(arr); //解析04上行指令
      nativeService.toast(analysisObj);
       if (
            analysisObj.statusObj.status == "standby" ||
            analysisObj.statusObj.status == "shutdown"
          ) {
            self.jumpNext("standby");
          }
        if (analysisObj.statusObj.status == "working") {
          self.jumpNext("working");
        }
    });
    // 模拟设备数据
    // nativeService.initMockData({
    //     "query":query
    //   });
    this.queryStatus();
  },
  mounted() {
    var self = this;
    this.moveTest(this.degVal);
  }
};
</script>
