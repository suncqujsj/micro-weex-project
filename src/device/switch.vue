<template>
<div class="wrapper">
  
   <div class="switch-wrapper" v-for="(childObj,index) in deviceDetail.endList">
      <div class="txt-wrapper">

        <div style="flex-direction:row">
          <text style="color:green;font-size:24px;color:#9fa0a0;">{{childObj.name}}</text>
          <div style="width:60px;" v-if="isMyHouse" @click="reName(childObj.endpoint,childObj.name)">
           <image src="../img/edit.png" class="edit-img"></image>
          </div>
        </div>
        <text v-if="!hideLinkSwitch&&getCount==true&&isMyHouse" @click="toLinkSwitch(childObj.endpoint)" style="font-size:24px;" class="right-text">{{childObj.boundCount>0?'已关联('+childObj.boundCount+')':'添加关联'}}</text>
      </div>


      <div :title="count" :style="{backgroundColor:(childObj.event.OnOff==1?onColor:offColor)}" class="button" @click="toggleDevice(childObj)">
         <div v-if="!isCurtain">
           <div class="img-wrapper">
             <image  class="image" :src="childObj.event.OnOff==1?onPath:offPath"></image>
           </div>
           <text class="text" :style="{color:(childObj.event.OnOff==1?'#fff':'#333')}">{{childObj.event.OnOff==1?'点击关闭':'点击打开'}}</text>
         </div>

         <div class="inner-wrapper" v-if="isCurtain" :style="{backgroundColor:(childObj.event.OnOff==1?greenColor:offColor)}">
           <text class="curtain-text" :style="{color:(childObj.event.OnOff==1?'#fff':'#333')}">{{childObj.event.OnOff==1?'点击关闭':'点击打开'}} </text>
         </div>

      </div>

      <div style="height:100px;margin-top:40px;" v-if="isLight && childObj.event.OnOff==1">
                <midea-seek-bar  :max="100" :min="20" style="margin-bottom:30px;" :value="childObj.event.Level" :step="1" :index="index" attr="Level" @stopChange="slideChange"  ></midea-seek-bar>
      </div> 

      <div style="height:100px;" v-if="isLight && deviceDetail.modelid == 'midea.light.003' && childObj.event.OnOff==1"> 
      <midea-seek-bar  :max="100" :min="20" :value="childObj.event.ColorTemp" :step="1" :index="index" attr="ColorTemp"  @stopChange="slideChange"></midea-seek-bar>
      </div> 
   

    </div>


    

    <midea-promt :title="nameTitle"   ref="promt" :placeholder="namePlaceholder" :inputValue="inputName" :show="show" @okClicked="confirmRename" @onPromtClose="onPromtClose" @onPromtInput="onPromtInput">
    </midea-promt>

    <!--
    <midea-button text="getGatewayCurrentVersion" type="delete"  @mideaButtonClicked="getGatewayCurrentVersion">
    </midea-button> 
    <midea-button text="setGatewayCurrentVersion" type="delete"  @mideaButtonClicked="setGatewayCurrentVersion">
    </midea-button> 
  -->
  

  </div>


</template>

<style>
  .wrapper {
    background-color:#F7F7F7;
    position:relative;
  }
  .switch-wrapper {
    width: 718px;
    margin-left: 16px;
  }

  .inner-wrapper{
      margin-left:30px;
      width:658px;
      height:178px;
      justify-content: center;
  }

 .txt-wrapper {
     flex-direction: row;
     justify-content: space-between;
     font-size:13px;
     height:82px;
     align-items: center;
  }

  .right-text{
     color: #00B9EF;
  }
  .button {
    width: 718px;
    margin-top: 0px;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #00B9EF;
    height:178px;
    border-radius: 8px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .text {
    font-size: 24px;
    color: #FFF;
    text-align: center;
    margin-top:20px;
  }
  .curtain-text{
    font-size: 32px;
    text-align: center;
  }
  .textView {
    font-size: 24px;
    color: #333;
    text-align: center;
  }
  .img-wrapper{
    flex-direction: column;
    justify-content: center;
  }
  .image {
    width: 68px;
    height: 68px;
    margin-left:325px;
  }
  .edit-img{
    width: 22px;
    height: 24px;
    margin-left:8px;
    margin-top:4px;
  }
</style>
<script>
  import getDeviceStatus from '../dummy/getDeviceStatus'
  import operateDevice from '../dummy/operateDevice'
  import updateNode from '../dummy/updateNode'
  import getSwitchBoundDevice from '../dummy/getSwitchBoundDevice'
  import nativeService from '../common/services/nativeService'
  import config from '../common/config/configMapping'
  import mideaPromt from '../component/promt.vue'
  import mideaButton from '../component/button.vue'

  const modal = weex.requireModule('modal');
  const globalEvent = weex.requireModule('globalEvent');
  export default {
    components: { mideaPromt,mideaButton},
    data () {
      return {
         deviceDetail:{},
         count:1,
         offColor:"#E5E5E5",
         onColor:"#00B9EF",
         greenColor:"#00B9EF",
         onPath:"../img/light_open@2x.png",
         offPath:"../img/light_close@2x.png",
         hideLinkSwitch:false,
         getCount:false,
         show:false,
         inputName:"",
         namePlaceholder:"请输入设备名称",
         isMyHouse:false,
         nameTitle:"设备重命名",
         isCurtain: false,
         isLight: false

      }
    },
    methods:{
      change(event){

      },
      stopChange(event){
        modal.toast({message:event, duration: 5 })
      },
      onPromtClose(val){
         this.show=false;
      },
      onPromtInput(val){
         this.inputName=val;
      },
      reName (endpoint,name) {
         var self=this;
         if(!self.isMyHouse){
            return;
         }
         self.currentName=name;
         self.currentEndpoint=endpoint;
         self.show=true; //打开弹窗
         self.inputName=name;//默认值
      },
      confirmRename() {
        var self=this;
        self.show=false;
        var endpoint=self.currentEndpoint;
        var name=self.inputName;
        var endpointList=[];
        var curEndList=self.deviceDetail.endList||[];
        if(curEndList.length<1){
          modal.toast({ message:"数据获取错误！", duration: 1 });
          return;
        }
        for(var i=0;i<curEndList.length;i++){
           var endpointName=curEndList[i].name;
           var obj={};
           if(i==endpoint-1){
             obj.name=name;
           }else{
             obj.name=endpointName;
           }
           endpointList.push(obj);
        }
        //nativeService.toast(JSON.stringify(endpointList),10);
        var payload = {
          "nodeid": self.deviceDetail.nodeid,
          "data": {
             "nodename": self.deviceDetail.devName,
             "modelid":  self.deviceDetail.modelid,
             "endlist":endpointList
          }
        }
        
        if(self.currentName==name){
           modal.toast({ message:"名称没有改变", duration: 1 });
           return;
        }
        if(name==""){
           modal.toast({ message:"名称不能为空！", duration: 1 });
           return;
        }
        if(name.length>5){
           modal.toast({ message:"名称只能输入五位", duration: 1 });
           return;
        }
        if(!self.checkLimitChar(name)){
          modal.toast({ message:"只支持输入数字、字母、汉字、下划线！", duration: 1 });
          return;
        }
        nativeService.showLoading();
        nativeService.call("updateNode", payload, function(data) {
           //modal.toast({ message:JSON.stringify(data), duration: 1 });
           nativeService.hideLoading();
           if (data.errorCode == 0) {
               var index=endpoint-1;
               Vue.set(self.deviceDetail.endList[index],"name",name);
               self.count++;
              self.nativeUpdate();
           }
        },function(){
            nativeService.hideLoading();
        });
      },
      nativeUpdate(){
         var obj={};
         obj.nodeid=this.deviceDetail.nodeid;
         obj.nodename=this.deviceDetail.devName;
         var nameArr=[];
         for(var i=0;i<this.deviceDetail.endList.length;i++){
            var nameObj={};
            nameObj.name=this.deviceDetail.endList[i].name;
            nameArr.push(nameObj);
         }
         obj.endlist=nameArr;
         nativeService.b2bUpdateGateway(obj);
      },
      checkLimitChar(_text){
         //字母数字汉字下划线
          var regx = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
          if(regx.test(_text))
          {
              return true;
          } else {
              return false;
          }
      },
      querySwitchBound(){
        var self=this;
        var paramObj = {
           "topic":"/bind/select",
           "data": {
               "type":1,
               "nodeid":self.deviceDetail.nodeid
            }
          }
        nativeService.call("getSwitchBoundDevice", paramObj, function(data) {
           if(data.errorCode==0){
              var boundState=data.data.state||[];
              self.boundState=boundState;
              var count=0;
              if(self.deviceDetail.endList!=undefined &&self.deviceDetail.endList.length>0){
                self.buildState();
              }else{
                var interval= setInterval(function() {
                  count++;
                  if(self.deviceDetail.endList!=undefined &&self.deviceDetail.endList.length>0){
                    clearInterval(interval);
                    self.buildState();
                  }
                  if(count>600){
                    clearInterval(interval);
                  }
                }, 100);
              }
          }
        },function(){
          //$rootScope.hideLoading();
        });
      },
      buildState(){
        var self=this;
        var  state=self.boundState;
        for(var j=0;j<self.deviceDetail.endList.length;j++){
           self.deviceDetail.endList[j].boundCount=0;
        }
        if(state.length>0){
         for(var i=0;i<state.length;i++){
           var endpointObj=state[i];
           var endpoint=endpointObj.endpoint;
           var endpointBound=endpointObj.bound||[];
           if(endpointBound.length>0){
             self.deviceDetail.endList[endpoint-1].boundCount=endpointBound.length;
            }
         }
         self.getCount=true;
        }
      },
      toLinkSwitch(endpoint){
        var self=this;
        self.deviceDetail.fromEndpoint=endpoint;
        var path="device/link-switch-detail.js";
        nativeService.setItem("deviceDetail",self.deviceDetail);
        nativeService.goTo(path);
      },
      toggleDevice(obj) {
          var self=this;
          var tempObj={
              "endpoint":parseInt(obj.endpoint),
              "event": {
                "OnOff": 1
              }
          }
          console.log(obj)
          if(obj.event.OnOff==1){
            tempObj.event.OnOff=0;
          }
          var tempDetail={};
          var templist=[];
          templist.push(tempObj);
          tempDetail.endlist=templist;
          tempDetail.nodeid=self.deviceDetail.nodeid;
          var params = {
             "topic":"/subdevice/control",
             "data": tempDetail
          }
          nativeService.showLoading();
          nativeService.call("operateDevice", params, function(data) {
            nativeService.hideLoading();
            if(data.errorCode==0){
              var currentIndex=obj.index;
              //var modelid=self.deviceDetail.modelid;
              /*if(modelid=self.deviceDetail.modelid=="midea.light.001" || modelid=="midea.light.002"  || modelid=="midea.light.003" ||modelid=="jiayun.light.001" || modelid=="jiayun.light.002"){
                 if(obj.event.OnOff==0){
                    
                 }
              }*/
              Vue.set(self.deviceDetail.endList[currentIndex].event,"OnOff",tempObj.event.OnOff);
              
            }
            else{
               modal.toast({message:"控制失败", duration: 1 });
               nativeService.hideLoading();
            }
           },function () {
              modal.toast({message:"控制失败", duration: 1 });
              nativeService.hideLoading();
        });
      },
      toSettting(event) {
        var self=this;
        var path="device/device-setting.js";
        nativeService.setItem("deviceDetail",self.deviceDetail);
        nativeService.goTo(path);
      },
      getDetailParams(){
          var self=this;
          nativeService.getDetailParams(function(details){
             self.deviceDetail.nodeid=details.nodeid;
             self.deviceDetail.modelid=details.modelid;
             self.deviceDetail.devName=details.deviceName;
             self.deviceDetail.houseId=details.houseId;
             self.deviceDetail.domainId=details.domainId;
             var nameArr=details.endlist;
             if(typeof details.endlist =="string" && details.endlist!=""){
                 nameArr=JSON.parse(nameArr);
             }
             self.deviceDetail.nameArr=nameArr;
             self.checkTypeAndUpdateTitle();
             self.getDeviceStatus();
             self.querySwitchBound();
          });
      },
      checkTypeAndUpdateTitle(){
          var self=this;
          var modelid=self.deviceDetail.modelid;
         if(modelid=="midea.curtain.001" || modelid=="midea.curtain.002"||modelid=="jiayun.curtain.001"|| modelid=="jiayun.curtain.002"|| modelid=="laffey.curtain.001"|| modelid=="laffey.curtain.002"|| modelid=="honyar.curtain.001")
          {
             self.isCurtain=true;
             self.onColor="#E5E5E5";
          }
          //非开关面板隐藏开关关联链接
          if(modelid=="midea.light.001" || modelid=="midea.light.002" || modelid=="midea.light.003" || modelid=="jiayun.light.001" || modelid=="jiayun.light.002" ||modelid=="midea.curtain.001"|| modelid=="midea.curtain.002"||modelid=="jiayun.curtain.001"||modelid=="jiayun.curtain.002"|| modelid=="laffey.curtain.001"||modelid=="laffey.curtain.002"|| modelid=="honyar.curtain.001" || modelid == 'midea.relay.001')
          {
              self.hideLinkSwitch=true;
          }

          if(modelid=="midea.light.001" || modelid=="midea.light.002" || modelid=="midea.light.003" || modelid=="jiayun.light.001" || modelid=="jiayun.light.002") {
              this.isLight = true;
          }
          nativeService.updateTitle(self.deviceDetail.devName,true,self.isMyHouse);
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
           
            setTimeout(function(){
              nativeService.hideLoading();
            },300);
            var masterId=self.deviceDetail.masterId;
            var modelid=self.deviceDetail.modelid;
            var nodeid=self.deviceDetail.nodeid;
            var houseId=self.deviceDetail.houseId;
            var domainId=self.deviceDetail.domainId;
            var nameArr=self.deviceDetail.nameArr;
            self.deviceDetail=jsonData.data;
            self.deviceDetail.masterId=masterId;
            self.deviceDetail.modelid=modelid;
            self.deviceDetail.nodeid=nodeid;
            self.deviceDetail.houseId=houseId;
            self.deviceDetail.domainId=domainId;
            self.deviceDetail.nameArr=nameArr;
            self.formatDetail();
            //self.getLog();
        },function(){
           nativeService.hideLoading();
        });
      },
      formatDetail(){
           var self=this;
           var deviceDetail=self.deviceDetail.devStats;
           var resultList = self.deviceDetail.devStats.endlist || [];
           var modelid=self.deviceDetail.modelid;

          
            

           var defaultEventObj={
            "event": {
               "OnOff": 0
            }
           }
          //调光面板
          if(modelid=="midea.light.001" || modelid=="midea.light.002"||modelid=="jiayun.light.001" || modelid=="jiayun.light.002"){
             defaultEventObj.event.Level= 20;
          }
          if(modelid=="midea.light.003"){
             defaultEventObj.event.Level=1;
             defaultEventObj.event.ColorTemp=4;
          }
          var len;
          switch (modelid) {
           case 'midea.curtain.001':
           case 'midea.switch.001':
           case 'midea.light.001':
           case 'midea.light.003':
           case 'jiayun.curtain.001':
           case 'jiayun.switch.001':
           case 'jiayun.light.001':
           case 'laffey.curtain.001':
           case 'laffey.switch.001':
           case 'laffey.light.001':
           case 'honyar.switch.001':
           case 'midea.curtain.001':
              len=1;
              break;
           case 'midea.curtain.002':
           case 'midea.switch.002':
           case 'midea.light.002':
           case 'jiayun.curtain.002':
           case 'jiayun.switch.002':
           case 'jiayun.light.002':
           case 'laffey.curtain.002':
           case 'laffey.switch.002':
           case 'laffey.light.002':
           case 'honyar.switch.002':
              len=2;
              break;
           case 'midea.switch.003':
           case 'jiayun.switch.003':
           case 'laffey.switch.003':
           case 'honyar.switch.003':
              len=3;
              break;
           case 'midea.switch.004':
           case 'jiayun.switch.004':
           case 'laffey.switch.004':
              len=4;
              break;
           default:
             len=1;
             break;
           }
          var endList=[];
          for(var i=0;i<len;i++){
            var targetEndpoint=i+1;
            var foundRecord=false;
            for (var j=0;j<resultList.length;j++)
            {
              var comObj=resultList[j];
              if(comObj.endpoint==targetEndpoint){
                endList[i]=comObj;
                foundRecord=true;
                break;
              }
            }
            //找不到目标记录
            if(foundRecord==false){
               //var tempObj=angular.merge({}, defaultEventObj);
               var tempObj=JSON.parse(JSON.stringify(defaultEventObj));
               tempObj.endpoint=targetEndpoint;
               endList[i]=tempObj;
            }
          }
          
          var nameArr=self.deviceDetail.nameArr||[];
          for(var i = 0; i < endList.length; i++) {
            var endPointObj=endList[i];
            if(endPointObj.event.OnOff==undefined){
              endList[i].event.OnOff=0;
            }
            endList[i].index=i;
            //处理调光面板缺失或者Leve大于100异常案例
            if(modelid=="midea.light.001" ||modelid=="midea.light.002"||modelid=="jiayun.light.001" || modelid=="jiayun.light.002") {
              var level=endPointObj.event.Level;
              if(level==undefined){
                level=20;
                endList[i].event.Level=20;
              } else if(level>100){
                level=Math.floor((level/255)*100);
                endList[i].event.Level=level;
              } else if(level < 20){
                 level= 20;
                 endList[i].event.Level=level;
              }
              endList[i].event.tempLevel=level;
            }

            if(modelid=="midea.light.003"){
              var level = endPointObj.event.Level;
              var colorTemp = endPointObj.event.ColorTemp;
              if(level==undefined){
                level = 1;
                endList[i].event.Level = 1;
              }else if(level>100){
                level=Math.floor((level/255)*100);
                endList[i].event.Level=level;
              }
              if(colorTemp==undefined){
                colorTemp = 1;
                endList[i].event.ColorTemp = 1;
              }else if(colorTemp>100){
                level=Math.floor((colorTemp/255)*100);
                endList[i].event.ColorTemp=colorTemp;
              }
              endList[i].event.tempLevel=level;
              endList[i].event.tempColorTemp=colorTemp;
            }
            //nativeService.toast("ssss"+modelid+"!!"+nameArr[i]);
            if(nameArr[i]==undefined||nameArr[i]==""||typeof nameArr[i]!='object'){
               switch (modelid) {
                case 'jiayun.curtain.001':
                case 'jiayun.curtain.002':
                case 'laffey.curtain.001':
                case 'laffey.curtain.002':
                case 'midea.curtain.001':
                case 'midea.curtain.002':
                case 'honyar.curtain.001':
                   endList[i].name="窗帘"+(i+1);
                   break;
                case 'jiayun.switch.001':
                case 'jiayun.switch.002':
                case 'jiayun.switch.003':
                case 'jiayun.switch.004':
                case 'laffey.switch.001':
                case 'laffey.switch.002':
                case 'laffey.switch.003':
                case 'laffey.switch.004':
                case 'midea.switch.001':
                case 'midea.switch.002':
                case 'midea.switch.003':
                case 'honyar.switch.001':
                case 'honyar.switch.002':
                case 'honyar.switch.003':
                  endList[i].name="开关"+(i+1);
                  break;
                case 'midea.relay.001':
                  endList[i].name="开关";
                default:
                  endList[i].name="灯光控制"+(i+1);
                  break;
                }
            }else{
              endList[i].name=nameArr[i].name;
            } 
          }//enf for
          self.deviceDetail.endList=endList;
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
      },
      getGatewayCurrentVersion() {
          nativeService.getGatewayCurrentVersion(function(data){
            //  nativeService.alert(JSON.stringify(data));
            modal.alert({ message:JSON.stringify(data), duration: 3 });
          });
      },
      setGatewayCurrentVersion() {
           nativeService.setGatewayCurrentVersion({
                currentVersion: '00000000000325'
           });
      },
      init(){
           var self=this;
           nativeService.showLoading();
           nativeService.getApplianceID(function(masterId){
               self.deviceDetail.masterId=masterId;
               self.checkIsMyHouse();
           });
      },
      stopChange(event){
        
      },
      slideChange(event) {
        var self = this;
        var data = {};
        var params = {};
        var eventObj = {};
        var index = event.target.attr.index;
        if (event.target.attr.attr == 'Level') {
            eventObj.Level = event.value;
        } else if(event.target.attr.attr == 'ColorTemp') {
            eventObj.ColorTemp = event.value;
        }
        data.nodeid = this.deviceDetail.nodeid;
        data.endlist = [];
        data.endlist.push({
          "endpoint":  index + 1,
          "event": eventObj
        });
        params.data = data;
        params.topic = "/subdevice/control";
      //  modal.alert({message:JSON.stringify(event), duration: 2 })
        nativeService.showLoading();
        
        nativeService.call("operateDevice", params, function(data) {
            nativeService.hideLoading();
                if(data.errorCode==0){
                   Vue.set(self.deviceDetail.endList[index].event,event.target.attr.attr,event.value);
                }
                else{
                   nativeService.toast('控制失败');
                }
           },function () {
              nativeService.hideLoading();
              nativeService.toast('控制失败');
        });
        
      }

    },
    created () {
       var self=this;   
       nativeService.initMockData({
           "getDeviceStatus":getDeviceStatus,
           "operateDevice":operateDevice,
           "updateNode":updateNode,
           "getSwitchBoundDevice":getSwitchBoundDevice
       });
      /* nativeService.getItem("deviceDetail",function(respData){
          var result;
          //modal.toast({message:respData.data, duration: 1 })
          if(typeof respData.data =='object'){
              result=JSON.parse(respData.data);
              var deviceDetail=result||{};
              //从绑定页面回到详情页
              if(deviceDetail.fromLinkPage==true){
                    modal.toast({message:"log  log ", duration: 1 })
                    self.deviceDetail=deviceDetail;
                    self.checkTypeAndUpdateTitle();
                    self.deviceDetail.fromLinkPage=false;//重置
                    //如果在绑定设置页面编辑了绑定关系
                    if(self.deviceDetail.isLinkUpdated){
                       self.deviceDetail.isLinkUpdated=false;//重置
                       //nativeService.setItem("deviceDetail",self.deviceDetai);
                       self.querySwitchBound();
                    }else{
                      //已加载完绑定关系
                       nativeService.setItem("deviceDetail",self.deviceDetai);
                       self.getCount=true;
                    }
              }else{
                 self.init();
              }
          }else{
            self.init();
          }
          
       });*/
       self.init();
       self.receiveDeviceUpdateMessage();
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