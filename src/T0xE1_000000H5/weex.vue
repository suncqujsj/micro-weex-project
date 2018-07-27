<template>
  <div class="first_bg" @viewappear="viewappear" @viewdisappear="viewdisappear">
    <div>
      <midea-header 
      :title="title" 
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
    <div v-if="isFirstEnter">
      <text class="_center_title">上手视频</text>
      <div style="position:relative">
        <midea-video class="video" :src="src" autoplay="true" controls @start="onstart" @pause="onpause" @finish="onfinish" @fail="onfail"></midea-video>
        
        <!-- <text class="info">state: {{state}}</text> -->
        <div class="_video_dec_section">
          <text class="_video_dec">基本原理 如何摆脱碗 快速启动</text>
        </div>
        <div class="_tag_section">
          <text class="_tag_list" @click="goTo('保管功能','keepingInstruction')">保管功能</text>
          <text class="_tag_list" @click="goTo('选择程序','selectInstruction')">快速开始</text>
          <text class="_tag_list" @click="goTo('智能助手','helpInstruction')">智能助手</text>
        </div>

        <text class="_link" @click="jumpNext('standby')">跳过</text>
      </div>
    </div>
  </div>
</template>
<style scoped>
.first_bg {
  /* width: 750px;
  height: 1000px; */
  /* background-image: linear-gradient(to bottom, #2194e6, rgb(145, 196, 238)); */
}
.demo_section {
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 80px;
}
.demo_title {
  font-size: 34px;
}
.demo_content {
  margin-top: 20px;
  font-size: 26px;
}
._center_title {
  text-align: center;
  margin: 60px;
  font-size: 40px;
}
.video {
  width: 630px;
  height: 350px;
  margin-top: 60px;
  margin-left: 60px;
}
.info {
  margin-top: 40px;
  font-size: 40px;
  text-align: center;
}
._video_dec_section {
  width: 600px;
  margin-left: 60px;
  margin-top: 30px;
  padding-bottom: 10px;
  border-bottom-color: #c7c7c7;
  border-bottom-width: 2px;
}
._video_dec {
  text-align: center;
  font-size: 30px;
  color: rgb(195, 195, 195);
}
._tag_section {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
}
._tag_list {
  width: 200px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  border-color: #bbb;
  border-radius: 34px;
  font-size: 26px;
  margin-right: 20px;
}
._link {
  align-self: flex-end;
  margin-top: 80px;
  margin-right: 60px;
  border-radius: 40px;
  background-color: #bbb;
  width: 140px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  color: #ffffff;
  font-size: 32px;
}
</style>
<script>
import query from "../dummy/query";
import nativeService from "../common/services/nativeService";
import mideaHeader from "../midea-component/header.vue";
import message from "../common/util/smartMessage";
import cmdFun from "./util.js"; //解析指令
const globalEvent = weex.requireModule("globalEvent");
var stream = weex.requireModule('stream');
export default {
  components: { mideaHeader },
  data() {
    return {
      state: "----",
      src:
        "https://chuyu-meiyun.oss-cn-shenzhen.aliyuncs.com/H3_video.mp4",
      isTopShow: false,
      sendcmd: null,
      title:'',
      isFirstEnter: false
    };
  },
  methods: {
    analysisFun(analysisObj) {
      var self = this;
      var isError = analysisObj.isError.value;
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
      if (analysisObj.workingState.value == 3) {
        self.jumpNext("working");
      }
      // 330先隐藏新手教程
      // var view_record = nativeService.getItem("viewRecord", function (str) {
      //   //已经浏览过了，下次进来就不会有新手介绍页面
      //   var _str = str.data;
      //   if (parseInt(_str) == 1) {
      //     self.title = '';
      //     self.isFirstEnter = false;

      //     var isError = analysisObj.isError.value;

      //     if (
      //       analysisObj.workingState.value == 0 ||
      //       analysisObj.workingState.value == 1 ||
      //       analysisObj.workingState.value == 4 || isError
      //     ) {
      //       self.jumpNext("standby");
      //     }
      //     if (analysisObj.workingState.value == 2) {
      //       self.jumpNext("order");
      //     }
      //     if (analysisObj.workingState.value == 3) {
      //       self.jumpNext("working");
      //     }
      //   } else {
      //     self.isFirstEnter = true;
      //     self.title = '新手教程';
      //     nativeService.setItem("viewRecord", 1);
      //   }
      // });
    },
    queryStatus() {
      var self = this;
      var sendCmd = cmdFun.createQueryMessage();
      //nativeService.showLoading();
      nativeService.startCmdProcess(
        "query",
        sendCmd,
        function (result) {
          //nativeService.hideLoading();
          var result_arr = result.replace(/\[|]/g, ""); //去掉中括号
          var arr = result_arr.split(",");
          //nativeService.alert(arr[11]);
          var analysisObj = cmdFun.analysisCmd(arr);
          self.analysisFun(analysisObj);
        },
        function (result) {
          //nativeService.hideLoading();
          nativeService.toast("查询失败" + JSON.stringify(result));
        }
      );
    },
     backClick() {
      nativeService.backToNative();
    },
    onstart(event) {
      this.state = "onstart";
    },
    onpause(event) {
      this.state = "onpause";
    },
    onfinish(event) {
      this.state = "onfinish";
       var self = this;
      var POST_URL = 'http://121.43.198.16:8080/h3-exp/exp/add';
      nativeService.getItem("sn", function(snObj) {
        nativeService.getItem("userId", function(userid) {
            var requestData = {
              userId: userid.data,
              sn: snObj.data,
              type: 1
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
    },
    onfail(event) {
      this.state = "onfail";
      // alert(JSON.stringify(event));
    },
    goTo(name, whichInstruction) {
      nativeService.setItem("firstInstruction", {
        name: name,
        whichInstruction: whichInstruction
      });
      var path = "firstTagDec.js";
      nativeService.goTo(path, false, true);
    },
    jumpNext(which) {
      var path = which + ".js";
      nativeService.goTo(path, false, true);
    },
    listenerFun() {
      var self = this;
      globalEvent.addEventListener("receiveMessage", function (e) {
        var str = e.data;
        //nativeService.toast(str);
        var arr = str.split(",");
        var analysisObj = cmdFun.analysisCmd(arr); //解析04上行指令
        //nativeService.toast(analysisObj);
        self.analysisFun(analysisObj);
      });
    },
    viewdisappear() {
      globalEvent.removeEventListener("receiveMessage");
    },
    viewappear() {
      this.listenerFun();
    },
  },
  created() {
    this.isIos = weex.config.env.platform == "iOS" ? true : false;
    if (this.isIos){
      this.listenerFun();
    }
    //var self = this;
    //模拟设备数据
    nativeService.initMockData({
      "query": query
    });
    this.queryStatus();
  },
  mounted() {

  }
};
</script>