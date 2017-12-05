<template>
<div>
   <midea-tab ref="mTab" :tabArray="tabData" @tabClicked="tabClicked">
   </midea-tab>
   <div v-if="tabIndex==0">
    
    <div style="margin-top:40px">
        <div style="padding-bottom:16px">
           <text style="text-align:center;" class="small-text">{{(showPwd&&!waiting)?"有效期: "+expireText:""}}</text>
        </div>
        <div style="position:relative;" class="pwd-wrapper">
            <text v-if="!showPwd" class="no-pwd-text">6位数字密码</text>
            <text v-if="showPwd&&!waiting" style="color:#0DB9F0;font-size:36px;text-align:center;">{{deviceDetail.passcode}}#</text>
            <image v-if="showPwd&&waiting" ref="countDown" style="width:80px;height:80px" src="../img/card_refresh.png"></image>
            <div v-if="showPwd&&waiting" class="countdown-wrapper">
               <text style="color:#C9CACA;font-size:28px;text-align:center;">{{countDown}}</text>
            </div>
        </div>
      </div>
      <div  v-if="showPwd&&!waiting" @click="copyPwd" style="position:relative;top:-40px;width:750px;height:40px">
          <text style="color:#C9CACA;font-size:24px;text-align:center;">点击复制</text>
      </div>
      <div v-if="showPwd&&!waiting" >
        <div>
          <div style="padding-bottom:16px">
             <text style="text-align:center;color:#333;font-size:28px">选择发送方式：</text>
          </div>
        </div>
        <div class="share-wrapper">
            <div  class="share-inner-wrapper">
               <image @click="shareMsg('qq')" class="share-img" src="../img/qq.png"></image>
               <text  @click="shareMsg('qq')" class="share-txt">QQ</text>
            </div>
            <div class="share-inner-wrapper">
               <image  @click="shareMsg('wx')" class="share-img" src="../img/wechat.png"></image>
               <text  @click="shareMsg('wx')" class="share-txt">微信</text>
            </div>
            <div class="share-inner-wrapper">
               <image @click="shareMsg('sms')" class="share-img" src="../img/messege.png"></image>
               <text @click="shareMsg('sms')" class="share-txt">短信</text>
             </div>
        </div> 
      </div>
       <div class="tips-wrapper" style="margin-top:20px">
          <text class="small-text">【注意】</text>
        </div>
        <div class="tips-wrapper">
          <text class="small-text">输入密码前，请重新点亮门锁键盘。</text>
        </div>
        <div class="tips-wrapper">
          <text class="small-text">生成新密码后，原临时密码均失效。</text>
       </div>
    <div>
       <midea-button text="生成一次性密码" 
              :type="waiting==true?'disabled':'green'"
              @mideaButtonClicked="genPwd"></midea-button> 
    </div>

    
    <div>
      <text @click="setExpriedTime" style="text-align:center;padding:20px;color:#00B9EF;font-size:28px">密码有效期: {{settedExpired}}分钟</text>
    </div>
  </div>
<list v-if="tabIndex==1" class="list" @loadmore="onloading" style="position:relative;top:6px;">
    <refresh v-if="loadStatus"  class="refresh-view" @refresh="onrefresh" :display="refreshing">
       <loading-indicator class="indicator"></loading-indicator>
    </refresh>
    <cell v-for="log in logArray" :class="[log.type=='date'?'bottom-border':'']">
          <div v-if="log.type=='date'" @click="toSettting">
            <text class="date-wrapper">{{log.date}}</text>
          </div>
          <div :class="[log.singleLog?'bottom-border':'']" class="wrapper-row" v-else-if="log.type=='firstlog'"> 
              <div v-if="!log.singleLog" class="bottom-half-line">
              </div>
              <image class="log-first" src="../img/log-first.png"></image>
              <text class="first-info-wrapper">
                  {{log.content}}
              </text>
           </div>
          <div  v-else-if="log.type=='log'" class="wrapper-row">
              <div class="all-line">
              </div>
              <image class="log-center" src="../img/log.png"></image>
              <text class="info-wrapper">
                  {{log.content}}
              </text>
          </div>
          <div  v-else-if="log.type=='lastlog'" class="wrapper-row bottom-border">
              <div class="top-half-line">
              </div>
              <image class="log-center" src="../img/log.png"></image>
               <text class="info-wrapper">
                  {{log.content}}
              </text>
           </div>
      </cell>

      <cell class="center-wrapper" v-if="haveLoadLog&&logArray.length==0">
          <text class="info-wrapper">
                  暂时没有记录
          </text>
      </cell>
    <!--<loading class="loading-view" @loading="onloading" :display="showLoading">
        <loading-indicator  v-if="loadMore"  class="indicator" ></loading-indicator>
        <text v-if="!loadMore" class="text-indicator">已加载完所有记录</text>
    </loading>-->
  </list> 

 </div>
</template>

<style scoped>
  .share-wrapper{
    margin-left:20px;flex-direction:row;width:710px;
  }
  .share-inner-wrapper{
    flex:1;flex-direction:column;align-items:center;justify-content:center
  }
  .share-img{ 
    height:88px;width:88px;
  }
  .share-txt{
    padding-top:10px;font-size:24px;color:#333;text-align:center;
  }
 
  .tips-wrapper{
    padding-left:24px;
    padding-right:24px;
    padding-top:10px;
    padding-bottom:10px;
  }
  .small-text{
    font-size:24px;
    color:#999;
  }
  .center-wrapper{
    width: 750px;
    text-align:center;
    padding-top:20px;
    align-items: center;

  }
  .pwd-wrapper{
    background-color:#eee;
    height:160px;
    align-items:center;
    border-radius:10px;
    margin-left:20px;
    width:710px;
    justify-content: center;
  }
  .no-pwd-text{
    color:#999;
    font-size:28px;
  }
  .pwd-show{
    color:#0DB9F0;
    font-size:48px;
  }
  .countdown-wrapper{
    z-index:1000;top:80px;margin-top:-15px;width:30px;height:30px;position:absolute;left:355px;
    margin-left:-15px;
  }
  .list{
     margin-top:-5px;
  }
  .wrapper {
     width:750px;
     margin-top:0px;
     padding-top:0px;
     background-color:#FAFAFA;
  }
  .inner-wrapper {
     background-color:#FFF
   }
  .date-wrapper{
     margin-left:0px;padding-left:16px;
     padding-top:24px;background-color:#FAFAFA;
     padding-bottom:24px;
     color:#999;font-size:32px;
  }
  .info-wrapper{
     color:#999;font-size:28px;
     left:-50px;position:relative;
  }
  .first-info-wrapper{
     color:#00B9EF;font-size:28px;
     left:-50px;position:relative;
  }
  .wrapper-row{
     height:72px;justify-content: center;background-color:#fff;
  }
  .bottom-half-line{
     height:36px; position:absolute; bottom:0px;
     left:16px;  z-index:1;
     border-left-style:solid;border-left-width:1px;border-left-color:#999;margin-left:15px;
  }
  .top-half-line{
     height:36px; position:absolute; top:0px;
     left:16px;  z-index:1;
     border-left-style:solid;border-left-width:1px;border-left-color:#999;margin-left:15px;
  }
  .all-line{
     height:72px; position:absolute; bottom:0px;
     left:16px;  z-index:1;
     border-left-style:solid;border-left-width:1px;border-left-color:#999;margin-left:15px;
  }

  .bottom-border{
     border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:#dcdcdc;
  }

  .log-first{
     position:absolute;
     top:21px;
     left:16px;
     width:30px;
     height:30px;
     z-index:10;
  }

  .log-center{
     position:absolute;
     top:28px;
     left:23px;
     width:16px;
     height:16px;
  }
  .indicator {
    height: 60;
    width: 60;
    color: #00B9EF;
  }
  .text-indicator{
    width:750;
    color: #999;
    font-size:28px;
    text-align:center;
  }
  .refresh-view {
    height: 120px;
    width: 750px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loading-view {
    width: 750;
    height: 120;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<script>
 import log from '../dummy/log'
 import generateLockPwd from '../dummy/generateLockPwd'
 import getDeviceStatus from '../dummy/getDeviceStatus'
 import lockUserList from '../dummy/lockUserList'
 import nativeService from '../common/services/nativeService'
 import dateUtil from '../common/util/dateUtil'
 import config from '../common/config/configMapping'
 import deviceDataUtil from '../common/util/deviceDataUtil'
 import mideaTab from '../component/tab.vue'
 import mideaButton from '../component/button.vue'
 const clipboard = weex.requireModule('clipboard');
 const modal = weex.requireModule('modal');
 const globalEvent = weex.requireModule('globalEvent');
 const picker = weex.requireModule('picker');
 var reqInterval;
 var countInterval;
 var logResult=[];
 var currentDate;
 var pageSize = 20;
 var totalLogCount = 0;
 
 var currentPage = 0;
 export default {  
    components: { mideaTab,mideaButton},
    data () {
      return {
         deviceDetail:{},
         showLoading:'hide',
         refreshing:'hide',
         loadMore:false,
         logArray:[],
         haveLoadLog:false,
         loadStatus:true,
         tabData:[
            {"name":"一次性密码","selected":true},
            {"name":"日志","selected":false}
         ],
         current_rotate:0,
         tabIndex:0,
         showPwd:false,
         waiting:false,
         countDown:4,
         expireText:"",
         roleUpdated:false,
         settedExpired:10,
         isMyHouse:false
      }
    },
    methods: {
      copyPwd(){
         clipboard.setString(this.deviceDetail.passcode);
         nativeService.toast("复制密码成功");
      },
      tabClicked(tabIndex) {
          var self=this;
         if(tabIndex!=self.tabIndex){
            self.tabIndex=tabIndex;
            if(self.tabIndex==1){
                var userInfos = self.deviceDetail.userInfos || [];
                var roleUpdated=self.roleUpdated;
                if (userInfos.length > 0 && self.roleUpdated!=true) {
                    self.getLog();
                } else {
                    self.roleUpdated=false;
                    self.getUserLockInfo();
                }
            }
         }
      },
      setExpriedTime(){
          var self=this;
          var items = [];
          for(var i=0;i<30;i++){
            items.push(i+1);
          }
          picker.pick({
            index: self.settedExpired-1,
            items
          }, event => {
            if (event.result === 'success') {
               self.settedExpired=event.data+1;
               nativeService.setItem("settedExpired",self.settedExpired);
            }
          })
      },
      genPwd(){
        var self=this;
        if (self.waiting) {
          return;
        }
        var settedExpired=self.settedExpired||10;
        var params = {
            "nodeid": self.deviceDetail.nodeid,
            "username": "johoson",
            "expire": settedExpired*60
        }
        nativeService.showLoading();
        clearInterval(reqInterval);
        clearInterval(countInterval);
        nativeService.call("generateLockPwd", params, function(jsonData) {
            nativeService.hideLoading();
            if (jsonData.errorCode == 0) {
                var passcode = jsonData.data.passcode;
                var expire = jsonData.data.expire;
                self.deviceDetail.showPwd = true;
                self.deviceDetail.passcode = passcode;
                self.waiting=true;
                self.showPwd=true;
                self.countime(expire);
                setTimeout(function(){
                   self.sendTime(4);
                },200);
            }else{
                nativeService.hideLoding();
            }
        }, function() {
            nativeService.hideLoading();
        });
        //this.rotate();
      },
      countime(countTime){
          if (countInterval != undefined) {
            clearInterval(countInterval);
          }
          var self=this;
          self.expireText=self.outputTime(countTime);
          countInterval = setInterval(function() {
              countTime--;
              self.expireText=self.outputTime(countTime);
              if (countTime == 0) {
                self.showPwd=false;
                self.waiting=false;
                clearInterval(countInterval);
              }
          }, 1000);
      },
      outputTime(countTime) {
            var self=this;
            self.expTime = countTime;
            var min = Math.floor(countTime / 60);
            var minStr = min > 9 ? min : "0" + min;
            var sec = countTime - min * 60;
            var secStr = sec > 9 ? sec : "0" + sec;
            return minStr + "分" + secStr + "秒";
      },
      sendTime(leaveTime){
          var self=this;
          self.rotate();
          self.countDown=leaveTime;
          self.beginTimeStamp = Math.round(new Date() / 1000);
          reqInterval = setInterval(function() {
             leaveTime--;
             self.countDown=leaveTime;
             if (leaveTime == 0) {
                self.waiting=false;
                clearInterval(reqInterval);
             }
          }, 1000);
      },
      rotate() {
          var self = this;
          var element= self.$refs.countDown;
          self.current_rotate=1200;
          weex.requireModule('animation').transition(element, {
              styles: {
                  transform: 'rotate(' + self.current_rotate + 'deg)',
                  transformOrigin: 'center center'
              },
              duration:4000, //ms
              timingFunction: 'linear',
              delay: 0 //ms
          },function () {

          })
      },
      getUserLockInfo() {
            var self=this;
            var params = {
                "nodeid": self.deviceDetail.nodeid
            }
            nativeService.call("lockUserList", params, function(data) {
                //alert("return data:"+JSON.stringify(data));
                var data = data.data || {};
                self.deviceDetail.userInfos = data.userInfos || [];
                self.getLog();
            }, function() {
                //$rootScope.showTimeout();
                nativeService.hideLoading();
            });
      },
      onrefresh (event) {
        var self=this;
        self.refreshing = 'show';
        setTimeout(function(){
          self.getLog();
          if (self.roleUpdated==true) {
              self.roleUpdated=false;
              self.getLog();
          } else {
              self.getUserLockInfo();
          }
          self.refreshing = 'hide';
        }, 100)
      },
      onloading (event) {
         var self=this;
         self.showLoading = 'show';
         setTimeout(function(){
            if (self.loadMore) {
                var stratIndex = currentPage * pageSize;
                currentPage++;
                var resultLength = currentPage * pageSize;
                if (currentPage * pageSize >= totalLogCount) {
                    resultLength = totalLogCount;
                    self.loadMore = false;
                } else {
                    self.loadMore = true;
                }
                self.buildLogArray(stratIndex, resultLength, self.logArray);
            }
            self.showLoading = 'hide';
         }, 100);
      },
      buildLogArray(startIndex,length,targetArray){
              var modelid=this.deviceDetail.modelid
              var deviceMapping = config.deviceMapping;
              for (var i = startIndex; i < length; i++) {
               var date = dateUtil.api.getDate(logResult[i].report_ts);
               if (i == 0 || date != currentDate) {
                   if(i!=0){
                      var currentLogLength=targetArray.length;
                      //如果上一个日期不是只有一条记录
                      if(targetArray[currentLogLength-1].type!='firstlog'){
                        targetArray[currentLogLength-1].type='lastlog';
                      }else{
                        targetArray[currentLogLength-1].singleLog=true;
                      }
                   }
                   currentDate = date;
                   var obj = new Object();
                   obj.type = "date";
                   obj.date =  dateUtil.api.formatDate(logResult[i].report_ts);
                   obj.content = "";
                   targetArray.push(obj);
                   logResult[i].content =  dateUtil.api.formatTime(logResult[i].report_ts) + " " + deviceDataUtil.parseEvent(modelid,logResult[i].info,deviceMapping,this.deviceDetail.userInfos);
                   logResult[i].type = "firstlog";
                    //如果只有一行数据
                    if(i==0 && length==1){
                       logResult[i].singleLog=true;
                    }
                    targetArray.push(logResult[i]);
                } else {
                    logResult[i].content = dateUtil.api.formatTime(logResult[i].report_ts) + " " + deviceDataUtil.parseEvent(modelid,logResult[i].info,deviceMapping,this.deviceDetail.userInfos);
                    logResult[i].type = "log";
                    targetArray.push(logResult[i]);
                }
                //最后一条记录
                if(i==(logResult.length-1)){
                    var currentLogLength=targetArray.length;
                    if(targetArray[currentLogLength-1].type!='firstlog'){
                      targetArray[currentLogLength-1].type='lastlog';
                    }else{
                      targetArray[currentLogLength-1].singleLog=true;
                    }
                }
             }
      },
      getLog(){
        var self=this;
        totalLogCount = 0;
        self.loadMore = false;
        currentPage = 0;
        currentDate=null;
        var params = {
            "data": {},
            "nodeid": self.deviceDetail.nodeid,
            "count":50,
            "loggingType":2
        }
        nativeService.call("queryLog",params, function(jsonData){
            nativeService.hideLoading();
            self.haveLoadLog=true;
            //modal.toast({message:"log"+JSON.stringify(jsonData), duration: 1 })
            logResult=jsonData.data.logs||[];
            var targetArray=[];
            totalLogCount = logResult.length;
            var resultLength = logResult.length;
            if (totalLogCount > pageSize) {
                resultLength = pageSize;
                currentPage = 1;
                self.loadMore = true;
            } else {
                self.loadMore = false;
            }
            self.buildLogArray(0, resultLength, targetArray);
            self.logArray=targetArray;
        },function(){
            nativeService.hideLoading();
        });
     },
     toggleStatus(){
        if(this.loadStatus==true){
          this.loadStatus=false;
          modal.toast({message:"log"+this.loadStatus, duration: 1 })
        }else{
           this.loadStatus=true;
           modal.toast({message:"log"+this.loadStatus, duration: 1 })
        }
     },
     getDeviceStatus(){
        var self=this;
        var paramObj = {
          "data": {
              "idType":"1",
              "devId": self.deviceDetail.nodeid,
              "masterId":self.deviceDetail.masterId,
              "fields":"devName,domain,house,devProps,devStats"
            }
        }
        nativeService.call("getDeviceStatus",paramObj, function(jsonData){
           // modal.alert({message:JSON.stringify(jsonData), duration: 1 })
            
            var masterId=self.deviceDetail.masterId;
            var modelid=self.deviceDetail.modelid;
            var nodeid=self.deviceDetail.nodeid;
            var houseId=self.deviceDetail.houseId;
            var domainId=self.deviceDetail.domainId;
            self.deviceDetail=jsonData.data;
            self.deviceDetail.loadStatus=true;
            self.deviceDetail.masterId=masterId;
            self.deviceDetail.modelid=modelid;
            self.deviceDetail.nodeid=nodeid;
            self.deviceDetail.houseId=houseId;
            self.deviceDetail.domainId=domainId;
            if(self.isNeedGeneratePwd){
            //if(true){
               self.genPwd();
            }else{
               nativeService.hideLoading();
            }
            //self.getLog();
        },function(){
          self.deviceDetail.loadStatus=true;
          nativeService.hideLoading();
        });
     },
     toSettting(event) {
        var path="device/device-setting.js";
        var self=this;
        nativeService.setItem("deviceDetail",self.deviceDetail);
        nativeService.goTo(path);
      },
      getDetailParams(){
          var self=this;
          nativeService.getDetailParams(function(details){
             self.deviceDetail.nodeid=details.nodeid;
             self.deviceDetail.modelid=details.modelid;
             self.deviceDetail.deviceName=details.deviceName;
             self.deviceDetail.houseId=details.houseId;
             self.deviceDetail.domainId=details.domainId;
             self.isNeedGeneratePwd=details.isNeedGeneratePwd==1?true:false;
             self.getDeviceStatus();
             //self.getLog();
             nativeService.updateTitle(self.deviceDetail.deviceName,true,self.isMyHouse);
           });
      },
      getSettedExpired(){
         var self=this;
         nativeService.getItem("settedExpired",function(respData){
            var data=respData.data;
            if(data==undefined||data==""||data=="undefined"){
              self.settedExpired=10
            }else{
              self.settedExpired=data;
            }
         });
      },
      receiveDeviceUpdateMessage(){
        var self=this;
        var areaChannel = new BroadcastChannel('areaUpdate');
        areaChannel.onmessage = function (event) {
           var domainObj=event.data;
           self.deviceDetail.domain.domainName=domainObj.domainName;
           self.deviceDetail.domain.domainId=domainObj.domainId;
        }
        var lowbatteryChannel = new BroadcastChannel('lowbatterUpdate');
        lowbatteryChannel.onmessage = function (event) {
           self.deviceDetail.devStats.lowBattery=event.data.lowBattery;
        }
        var deviceNameChannel = new BroadcastChannel('deviceNamUpdate');
        deviceNameChannel.onmessage = function (event) {
           //modal.toast({message:event, duration: 5 })
           self.deviceDetail.devName=event.data;
           nativeService.updateTitle(self.deviceDetail.devName,true,self.isMyHouse);
        }
        var userRoleChannel = new BroadcastChannel('userRoleUpdate');
        userRoleChannel.onmessage = function (event) {
           var result=event.data;
           if(result.updated==true){
             self.roleUpdated=true;
           }
        }

      },
      checkIsMyHouse(){
          var self=this;
          nativeService.isMyHouse(function(houseType){
            self.isMyHouse=houseType==0?true:false;
            self.getDetailParams();
          });
      },
      shareMsg(type){
         var self=this;
         var endTimeStamp = self.beginTimeStamp + 60 * self.settedExpired;
         var messegeStamp = self.praseLimitTimestamp(endTimeStamp);
         var param = {
            "type": type,
            "msg": messegeStamp
         }
         nativeService.shareMsg(param);
      },
      praseLimitTimestamp(timestamp) {
        var self=this;
        timestamp = timestamp * 1000;
        var unixTimestamp = new Date(timestamp);
        var d = new Date(timestamp);
        var jstimestamp;
        var mou = d.getMonth() + 1;
        var day = d.getDate();
        var hours = d.getHours();
        var min = d.getMinutes();
        var sec = d.getSeconds();
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (mou < 10) {
            mou = "0" + mou;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        return "门锁密码：" + self.deviceDetail.passcode + "#" + "," + "请于" + (d.getFullYear()) + "年" + (mou) + "月" +
            (day) + "日" + (hours) + "时" + (min) + "分" + "前使用。"
            +"【注意】输入密码前，请重新点亮门锁键盘。";
      }

   },
    created () {
       //modal.toast({ message:log.data.error_msg, duration: 1 })
       nativeService.initMockData({
          "getDeviceStatus":getDeviceStatus,
          "queryLog":log,
          "generateLockPwd":generateLockPwd,
          "lockUserList":lockUserList
       });
       var self=this;
       nativeService.showLoading();
       nativeService.getApplianceID(function(masterId){
           self.deviceDetail.masterId=masterId;
           self.checkIsMyHouse();
       });
       self.getSettedExpired();
       self.receiveDeviceUpdateMessage();
       //this.getLog();
       //this.onOff=0;
    },
    mounted: function () {
      var self = this;
      globalEvent.addEventListener('rightBtnClick', function (e) {
         self.toSettting();
      });
      globalEvent.addEventListener('leftBtnClick', function (e) {
         nativeService.backToNative();
      });
    }

  }
</script>