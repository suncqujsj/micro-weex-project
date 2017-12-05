<template>
 <div class="wrapper" :class="[boundList.length==0&&loadLinked?'center-info-wrapper':'']" :style="{ height: pageHeight +'px'}">
    <div v-if="loadLinked&&boundList.length==0">
       <div class="center-info-wrapper">
          <div>
            <text class="black-txt">未关联其他开关</text>
         </div>
         <div style="padding-top:20px;">
            <text class="grey-txt">关联后,可实现多个开关控制相同灯光功能</text>
         </div>
        </div>
    </div>
    <div v-if="loadLinked&&boundList.length>0">
       <div class="added-info">
          <div  @click="toDeviceDetail" style="flex-direction:row;">
            <text style="color:#333;font-weight:bold;font-size:24px;">已关联开关</text>
          </div>
          <div>
            <text style="color:#9FA0A0;font-size:24px;">（最多可关联2路开关）</text>
         </div>
       </div>
    </div>
    <list  v-if="loadLinked&&boundList.length>0" class="device-list">
            <cell @delete="onItemSelect(device)" canEdit="true"  v-for="(device,index) in boundList" @longpress="onLongPressed(device)" class="bottom-border device-item" :class="[index==0?'top-border':'']" >
               <image class="device-img" :src="device.imgPath">
               </image>
               <div class="device-text-wrapper">
                   <text class="device-text">{{ device.devName}}</text>
                   <text style="color:#9FA0A0;font-size:24px;padding-top:10px">{{device.endpointName}}</text>
               </div>
            </cell>
       </list>
    <div  v-if="!(boundList.length>1)&&loadLinked" >
       <!--<div @click="toDeviceSelect" class="btn-rename">
          <text class="btn-rename-txt">添加关联</text>
       </div>-->
       <midea-button text="添加关联" type="green" @mideaButtonClicked="toDeviceSelect">
       </midea-button> 
    </div>
    <div  @click="hideMask" class="mask"
          v-if="show"
          :style="{height:maskHeight+'px'}">
       <div class="operate-box">
           <div @click="removeBoundRow" class="operate-box-item">
              <text class="operate-box-item-text">删除</text>
           </div>
       </div>
    </div>
 </div>
  
</template>

<style scoped>
 .mask{
    top: 0;
    width: 750px;
    height: 1344px;
    justify-content: center;
    align-items: center;
    background-color:#333;
    opacity:0.7;
    position:absolute;
    top:0px;
    left:0px;
 }
  .operate-box {
    background-color: #FFFFFF;
    width: 558px;
  }
  .operate-box-item{
     padding:36px;
     text-align:center;
  }
  .operate-box-item-text{
     color:#333;
     font-size:36px;
  }
 .wrapper{
    background-color:#F7F7F7;
    position:relative;
 }
 .added-info{
   flex-direction: row;
   padding:20px;
 }
 .center-info-wrapper{
   justify-content: center;
   align-items:center;
 }
 .black-txt{
   color:#333;
   font-weight:bold;
   font-size:28px;
 }
 .grey-txt{
   color:#9FA0A0;
   font-size:28px;
 }
 .btn-wrapper{
  padding-left:16px;
  padding-right:16px;
  padding-top:24px;
  padding-bottom:24px;
  position:absolute;
  bottom:0px;
  width:750px;
}
.btn-rename{
  border-radius: 8px;
  border-style: solid;
  border-color: #00B9EF;
  background-color: #00B9EF;
  border-width: 1px;
  height:84px;
  align-items: center;
  justify-content: center;
}
.btn-rename-txt{
  color: #FFF;
  font-size:28px;
  font-weight: bold;
}
.btn-rename:active {
  background-color:#00A9EF;
}
.bottom-border{
   border-bottom-style:solid;
   border-bottom-width: 1px;
   border-bottom-color:#E5E5E5;
}
.top-border{
   border-top-style:solid;
   border-top-width: 1px;
   border-top-color:#E5E5E5;
}
.device-list{
   width:750px;
   position: relative;
}
.device-item{
   padding-left:20px;
   padding-right:20px;
   padding-top:24px;
   padding-bottom:24px;
   background-color:#fff;
   flex-direction:row;
   width:750px;
   align-items: center;
}
.device-img{
  width:80px;
  height:80px;
}
.device-text-wrapper{
    padding-left:40px;
 }
.device-text{
   color:#3E3A39;
   font-size:28px;
 }
</style>
<script>
  import getDeviceStatus from '../dummy/getDeviceStatus'
  import getEndpointBoundDevice from '../dummy/getEndpointBoundDevice'
  import deviceList  from '../dummy/deviceList'
  import emptySwitchBound  from '../dummy/emptySwitchBound'
  import nativeService from '../common/services/nativeService'
  import config from '../common/config/configMapping'
  import mideaButton from '../component/button.vue'
  const modal = weex.requireModule('modal');
  const picker = weex.requireModule('picker');
  const globalEvent = weex.requireModule('globalEvent');

  export default {
    components:{mideaButton},
    data () {
      return {
         boundList:[],
         pageHeight:1000,
         show:false,
         deviceDetail:{},
         loadLinked:false
      }
    },
    methods:{
       onLongPressed(device){
          var os = weex.config.env.platform;
          if(os.toLowerCase()=='android'){
            this.show=true;
            this.selectDevice=device;
          }
       },
       onItemSelect(device){
          this.selectDevice=device;
          this.removeBoundRow();
       },
       hideMask(){
          this.show=false;
       },
       addLink(){
          const items = ["全部","客厅","厨房","阳台"]
          picker.pick({
            index: 0,
            items
          }, event => {
            if (event.result === 'success') {
               this.value = items[event.data]
               this.index = event.data
            }
          })
       },
       emptyLinkSwitch (event) {
          var self=this;
          modal.confirm({
            message: '确认清除开关关联，确认清除吗?',
            okTitle:"确定",
            cancelTitle :'取消',
            duration: 0.3
           }, function (data) {
              if(data=='确定'){
                self.confrimDelLinkSwitch();
              }
          })
       },
       removeBoundRow(){
           var self=this;
           var device=self.selectDevice;
           var paramObj = {
            "topic":"/bind/remove",
            "data": 
              {
                 "type":1,
                 "nodeid":device.nodeid,
                 "endpoint":parseInt(device.endpoint)
              }
             }
             //modal.toast({message:JSON.stringify(paramObj),duration:5});
             nativeService.showLoading();
             nativeService.call("emptySwitchBound", paramObj, function(data) {
                 nativeService.hideLoading();
                 self.hideMask();
                 if(data.errorCode==0){
                    var newLinkList = [];
                    var boundList=self.boundList;
                    for(var i=0;i<boundList.length;i++){
                      if(!(boundList[i].nodeid==device.nodeid && boundList[i].endpoint==device.endpoint)){
                        newLinkList.push(boundList[i]);
                      }
                    }
                    self.boundList=newLinkList;
                    self.isLinkUpdated=true;
                  }else{
                    modal.toast({message:"删除失败", duration:1});
                  }
               },function () {
                 self.hideMask();
                 modal.toast({message:"删除失败", duration:1});
                 nativeService.hideLoading();
             });  
       },
       confrimDelLinkSwitch(){
         var self=this;
         var paramObj = {
          "topic":"/bind/remove",
          "data": 
           {
              "type":1,
              "nodeid":self.deviceDetail.nodeid,
              "endpoint":self.deviceDetail.fromEndpoint
           }
         }
         nativeService.showLoading();
         nativeService.call("emptySwitchBound", paramObj, function(data) {
             nativeService.hideLoading();
             if(data.errorCode==0){
                self.boundList=[];
             }
         },function () {
            nativeService.hideLoading();
         });
       },
       queryEndpintBound() {
           var self=this;
           var paramObj = {
            "topic":"/bind/query",
            "data": 
              {
                 "type":1,
                 "nodeid":self.deviceDetail.nodeid,
                 "endpoint":self.deviceDetail.fromEndpoint
              }
           }
          nativeService.showLoading();
          nativeService.call("getEndpointBoundDevice", paramObj, function(data) {
             if(data.errorCode==0){
                var boundList=data.data.bound||[];
                if(boundList.length>0){
                   var domainArr=self.deviceDetail.domainArr||[];
                   if(domainArr.length>0){
                      nativeService.hideLoading();
                      self.buildBoundList(boundList);
                   }else{
                      self.getDeviceList(boundList);
                   }
                }else{
                  self.loadLinked=true;
                  self.deviceDetail.domainArr=[];
                  self.boundList=boundList;
                  nativeService.hideLoading();
                }
             }else{
               nativeService.hideLoading();
             }
          },function () {
             modal.toast({message:"数据获取错误！", duration:1});
             nativeService.hideLoading();
          });
      },
      getDeviceList(boundList){
        var self=this;
        var paramObj = {
          data : {
            "houseId": self.deviceDetail.houseId,
            "fields" : "idType,devId,devName,domain,house,devProps"
          }
        };
        nativeService.call("deviceList", paramObj, function(data) {
           nativeService.hideLoading();
           if(data.errorCode==0){
              self.buildDomainDevice(data.data);
              self.buildBoundList(boundList);
           }
         },function () {
           modal.toast({message:"数据获取错误！", duration:1});
           nativeService.hideLoading();
         });
      },
      buildBoundList(boundList) {
         var self=this;
         var boundArr=[];
         var switchDeviceArr=self.deviceDetail.switchDeviceArr;
         for (var i=0;i<boundList.length; i++)
         {
            var obj={};
            var boundObj=boundList[i];
            obj.nodeid=boundObj.nodeid;
            obj.endpoint=boundObj.endpoint;
            for (var j=0;j<switchDeviceArr.length;j++)
            {
              if(switchDeviceArr[j].devId==boundObj.nodeid){
                  var devProps=switchDeviceArr[j].devProps||{};
                  obj.modelid=devProps.modelid;
                  obj.devName=switchDeviceArr[j].devName;
                  obj.imgPath=self.getImgPath(devProps.modelid);
                  var endlist=devProps.endlist||[];
                  if(endlist.length>=boundObj.endpoint){
                     var objName=endlist[boundObj.endpoint-1]||{};
                     obj.endpointName=objName.name;
                  }else{
                    switch (boundObj.endpoint)
                    {
                     case 1:
                      obj.endpointName="一路";
                      break;
                     case 2:
                       obj.endpointName="二路";
                       break;
                     case 3:
                       obj.endpointName="三路";
                       break;
                     case 4:
                       obj.endpointName="四路";
                       break;
                     default:
                       break;
                    }
                  }
                  break;
              }//end if
            }//end for
            boundArr.push(obj);
         }//end for
         self.boundList=boundArr;
         self.loadLinked=true;
      },
      getImgPath(modelid){
          var imgPath="";
          var imgMapping=config.imgMapping;
          if(imgMapping[modelid]!=undefined){
             imgPath= "../img/icon/"+imgMapping[modelid]+".png";
          }
          return imgPath;
      },
      buildDomainDevice(domainDevice){
          var self=this;
          var devices=domainDevice.devices||[];
          var switchDevices=[];
          for(var i=0;i<devices.length;i++){
             var obj=devices[i];
             var devProps=obj.devProps||{};
             var modelid=devProps.modelid||"";
             switch (modelid) {
                case 'midea.switch.001':
                case 'jiayun.switch.001':
                case 'laffey.switch.001':
                case 'honyar.switch.001':
                case 'midea.switch.002':
                case 'jiayun.switch.002':
                case 'laffey.switch.002':
                case 'honyar.switch.002':
                case 'midea.switch.003':
                case 'jiayun.switch.003':
                case 'laffey.switch.003':
                case 'honyar.switch.003':
                case 'jiayun.switch.004':
                case 'laffey.switch.004':
                   if(obj.devId!=self.deviceDetail.nodeid){
                      switchDevices.push(obj);
                   }
                   break;
                 default:break;
              }
          }//end for
          var domains=[];
          var domainStr=",";
          for(var j=0;j<switchDevices.length;j++){
              var domain=switchDevices[j].domain;
              var str=","+domain.domainId+",";
              if(j==0){
                 domainStr+=domain.domainId+",";
                 domains.push(domain);
              }else{
                //找不到已有记录
                if(domainStr.indexOf(str)==-1){
                    domains.push(domain);
                    domainStr+=domain.domainId+",";
                }
             }
          }
          self.deviceDetail.domainArr=domains;
          self.deviceDetail.switchDeviceArr=switchDevices;
      },
      toDeviceSelect(event) {
         this.deviceDetail.boundList=this.boundList;
         var path="device/select-link-device.js";
         nativeService.setItem("deviceDetail",this.deviceDetail);
         nativeService.goTo(path);
      },
      toDeviceDetail(event) {
         var path="device/switch.js";
         this.deviceDetail.isLinkUpdated=this.isLinkUpdated;
         this.deviceDetail.fromLinkPage=true;
         nativeService.setItem("deviceDetail",this.deviceDetail);
         nativeService.goTo(path);
      },
      init(){
          var self=this;
          nativeService.updateTitle("开关关联",true,false);
          nativeService.getItem("deviceDetail",function(respData){
             respData=JSON.parse(respData.data);
             self.deviceDetail=respData;
             self.isLinkUpdated=self.deviceDetail.isLinkUpdated;
             self.queryEndpintBound();
          });
          
      }
    },
    created () {
      var env=weex.config.env;
      var self=this;
      self.pageHeight=env.deviceHeight / env.deviceWidth * 750-150; 
      self.maskHeight=env.deviceHeight / env.deviceWidth * 750-150;
      nativeService.initMockData({
          "getEndpointBoundDevice":getEndpointBoundDevice,
          "deviceList":deviceList,
          "emptySwitchBound":emptySwitchBound
      });
      globalEvent.addEventListener('leftBtnClick', function (e) {
         self.toDeviceDetail();
      });
      self.init();
    }
  }
</script>