<template>
<list class="list" @loadmore="onloading" >
    <refresh v-if="loadStatus"  class="refresh-view" @refresh="onrefresh" :display="refreshing">
       <loading-indicator class="indicator" ></loading-indicator>
    </refresh>
    <cell v-for="log in logArray" :class="[log.type=='date'?'bottom-border':'']">
          <div v-if="log.type=='date'">
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
    
    
   
 </list> 
 
</template>

<style scoped>
  .center-wrapper{
    width: 750px;
    text-align:center;
    padding-top:20px;
    align-items: center;
  }
  .list{
   
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
 import getDeviceStatus from '../dummy/getDeviceStatus'
 import nativeService from '../common/services/nativeService'
 import dateUtil from '../common/util/dateUtil'
 import config from '../common/config/configMapping'
 import deviceDataUtil from '../common/util/deviceDataUtil'
 const modal = weex.requireModule('modal');
 const globalEvent = weex.requireModule('globalEvent');
 
 var logResult=[];
 var currentDate;
 var pageSize = 20;
 var totalLogCount = 0;
 
 var currentPage = 0;
 export default {  
    data () {
      return {
         deviceDetail:{},
         showLoading:'hide',
         refreshing:'hide',
         loadMore:false,
         logArray:[],
         haveLoadLog:false,
         loadStatus:true,
         isMyHouse:false
      }
    },
    methods: {
      onrefresh (event) {
        var self=this;
        self.refreshing = 'show';
        setTimeout(function(){
          self.getLog();
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
                   logResult[i].content =  dateUtil.api.formatTime(logResult[i].report_ts) + " " + deviceDataUtil.parseEvent(modelid,logResult[i].info,deviceMapping);
                   logResult[i].type = "firstlog";
                    //如果只有一行数据
                    if(i==0 && length==1){
                       logResult[i].singleLog=true;
                    }
                    targetArray.push(logResult[i]);
                } else {
                    logResult[i].content = dateUtil.api.formatTime(logResult[i].report_ts) + " " + deviceDataUtil.parseEvent(modelid,logResult[i].info,deviceMapping);
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
            //modal.toast({message:JSON.stringify(jsonData), duration: 1 })
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
            //self.getLog();
        },function(){
          self.deviceDetail.loadStatus=true;
          nativeService.hideLoading();
        });
     },
     toSettting(event) {
        var path="device/device-setting.js";
        var self=this;
        if(self.deviceDetail.loadStatus){
          nativeService.setItem("deviceDetail",self.deviceDetail);
          nativeService.goTo(path);
        }else{
            nativeService.showLoading();
            var loadResult=setInterval(function(){
              if(self.deviceDetail.loadStatus){
                 clearInterval(loadResult);
                 nativeService.hideLoading();
                 nativeService.setItem("deviceDetail",self.deviceDetail);
                 nativeService.goTo(path);
              }
            },200);
        }
      },
      getDetailParams(){
          var self=this;
          nativeService.getDetailParams(function(details){
             self.deviceDetail.nodeid=details.nodeid;
             self.deviceDetail.modelid=details.modelid;
             self.deviceDetail.deviceName=details.deviceName;
             self.deviceDetail.houseId=details.houseId;
             self.deviceDetail.domainId=details.domainId;
             self.getDeviceStatus();
             self.getLog();
             nativeService.updateTitle(self.deviceDetail.deviceName,true,self.isMyHouse);
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
           modal.toast({message:event, duration: 5 })
           self.deviceDetail.devName=event.data;
           nativeService.updateTitle(self.deviceDetail.devName,true,self.isMyHouse);
        }
      },
      checkIsMyHouse(){
          var self=this;
          nativeService.isMyHouse(function(houseType){
            self.isMyHouse=houseType==0?true:false;
            self.getDetailParams();
          });
      }

    },
    created () {
       //modal.toast({ message:log.data.error_msg, duration: 1 })
       nativeService.initMockData({
          "getDeviceStatus":getDeviceStatus,
          "queryLog":log
       });
       var self=this;
       nativeService.showLoading();
       self.checkIsMyHouse();
       nativeService.getApplianceID(function(masterId){
           self.deviceDetail.masterId=masterId;
           self.checkIsMyHouse();
       });
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