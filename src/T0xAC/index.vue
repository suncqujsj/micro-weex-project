<template>
  <div class="wrapper">
  <midea-header title="空调" :isImmersion="false" :showRightImg="true" @leftImgClick="leftImgClick" @rightImgClick="rightImgClick"></midea-header>
  <scroller>
     <midea-button text="查询设备状态"
        type="green" @mideaButtonClicked="queryStatus">
      </midea-button>
      <midea-button text="LUA查询设备状态"
        type="green" @mideaButtonClicked="luaQueryStatus">
      </midea-button>
      <midea-button text="获取SN"
        type="green" @mideaButtonClicked="getDeviceSN">
      </midea-button>
      <midea-button text="获取家电ID"
        type="green" @mideaButtonClicked="getDevId">
      </midea-button>
      <midea-button text="获取家电子类型"
        type="green" @mideaButtonClicked="getDevSubtype">
      </midea-button>
      <midea-button text="显示原生loading"
        type="green" @mideaButtonClicked="showLoading">
      </midea-button>
      <midea-button text="隐藏原生loading"
        type="green" @mideaButtonClicked="hideLoading">
      </midea-button>
      <midea-button text="页面跳转"
        type="green" @mideaButtonClicked="goTo">
      </midea-button>
      <midea-button text="返回到原生页面"
        type="green" @mideaButtonClicked="backToNative">
      </midea-button>
      <midea-button text="获取页面路径"
        type="green" @mideaButtonClicked="getPath">
      </midea-button>
      </scroller>
  </div>
</template>
<style scoped>
 
</style>
<script>

  import mideaButton from '../midea-component/button.vue'
  import mideaHeader from '../midea-component/header.vue'
  import nativeService from '../common/services/nativeService'
  import message from '../common/util/smartMessage'
  import query from '../dummy/query'
  import luaQuery from '../dummy/luaQuery'
  const modal = weex.requireModule('modal');
  var frameCumulative = 1;
  
  export default {
    components: {mideaHeader,mideaButton},
    data () {
        return{
         
        }
    },
    methods: {
       createQueryMessage(){
          var messageBody = message.createMessageBody(25);
          message.setByte(messageBody, 0, 0x41);
          message.setByte(messageBody, 1, 0x81);
          message.setByte(messageBody, 2, 0x00);
          message.setByte(messageBody, 3, 0xFF);
          messageBody[4] = 3;
          messageBody[5] = 0xff;
          messageBody[7] = 2;
          //发送帧累加
          frameCumulative = frameCumulative + 1;
          if (frameCumulative > 0 && frameCumulative < 254) {
             message.setByte(messageBody, 23, frameCumulative);
          } else if (frameCumulative == 0 || frameCumulative == 254) {
              frameCumulative = 1;
              message.setByte(messageBody, 23, frameCumulative);
          }
          message.setByte(messageBody, 24, message.CRC8(messageBody));
          this.sendMessage = message.createMessage(0xAC, 0x03, messageBody);
          //nativeService.alert(sendMessage);
       },
       queryStatus(){
           this.createQueryMessage();
           nativeService.showLoading();
           nativeService.startCmdProcess("query",this.sendMessage,function(result){
           	   nativeService.hideLoading();
               nativeService.alert(JSON.stringify(result));
            },function(result){
               nativeService.hideLoading();
               nativeService.toast("查询失败"+JSON.stringify(result));
           });
       },
       luaQueryStatus(){
          var params={
              name:"luaQuery",
              operation:"luaQuery",
              data:{}
          }
          nativeService.showLoading();
          nativeService.sendLuaRequest(params,function(result){
          	   nativeService.hideLoading();
               nativeService.alert(JSON.stringify(result));
          },function(result){
          	   nativeService.hideLoading();
               nativeService.toast("查询失败"+JSON.stringify(result));
          });
       },
       getDeviceSN(){
          nativeService.getDeviceSN(function(result){
               nativeService.alert(result);
            },function(){
               nativeService.toast("获取失败");
          });
       },
       getDevId(){
          nativeService.getCurrentApplianceID(function(result){
               nativeService.alert(result);
            },function(){
               nativeService.toast("获取失败");
          });
       },
       getDevSubtype(){
          nativeService.getApplianceSubtype(function(result){
               nativeService.alert(result);
            },function(){
               nativeService.toast("获取失败");
          });
       },
       showLoading(){
          nativeService.showLoading();
          setTimeout(function(){
              nativeService.hideLoading();
          },2000);
       },
       hideLoading(){
         nativeService.hideLoading();
       },
       goTo(){
          var path="next.js";
          nativeService.goTo(path);
       },
       getPath(){
          nativeService.getPath(function(path){
            nativeService.alert(path);   
          });
       },
       backToNative(){
          nativeService.backToNative();
       },
       leftImgClick(){
       	  nativeService.backToNative();
       }

    },
    created () {
      nativeService.initMockData({
        "query":query,
        "luaQuery":luaQuery
      });
    }
  };
</script>