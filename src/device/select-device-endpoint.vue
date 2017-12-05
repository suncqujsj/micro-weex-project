<template>
 <div  class="wrapper">
     
         <midea-cell v-for="(endpointObj,index) in endlist" 
                :title="endpointObj.name"
                :has-top-border="index==0?true:false"
                :has-arrow="endpointObj.selected==0?true:false"
                @mideaCellClick="linkSwitchEndpoint(endpointObj)">
                 <text class="link-text" slot="text" v-if="endpointObj.selected==1">不可关联</text>
                  <text class="link-text" slot="text" v-if="endpointObj.selected==2">已关联</text>
         </midea-cell>



          <!--
          <div class="device-list">
            <div :class="[index==0?'top-border':'']" v-for="(endpointObj,index) in endlist" class="bottom-border device-item" @click="linkSwitchEndpoint(endpointObj)">
                <div>
                  <text class="device-text">{{endpointObj.name}}</text>
                </div>
                <div v-if="endpointObj.selected==0">
                  <image class="arrow" src="../img/arrow_right.png"></image>
                </div>
                <div v-if="endpointObj.selected==1">
                     <text class="link-text">不可关联</text>
                </div>
                <div v-if="endpointObj.selected==2">
                     <text class="link-text">已关联</text>
                </div>
            </div>
          </div>
          -->
      
 </div>
</template>

<style scoped>
.wrapper {
   background-color:#F7F7F7;
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
   margin-top:40px;
   position: relative;
}
.device-item{
   padding-left:20px;
   padding-right:20px;
   padding-top:32px;
   padding-bottom:32px;
   background-color:#fff;
   flex-direction:row;
   width:750px;
   align-items: center;
   justify-content: space-between;
}
.device-img{
   width:80px;
   height:80px;
}
.device-text{
   color:#333;
   font-size:28px;
 }
 .link-text{
   color:#9FA0A0;
   font-size:24px;
 }
 .arrow{
  width:24px;
  height:24px;
  padding-left:12px;
}
.row-direction{
  flex-direction: row;
  align-items: center;
}
</style>
<script>
  import getSwitchBoundDevice from '../dummy/getSwitchBoundDevice'
  import selectSwitchBoundDevice from '../dummy/selectSwitchBoundDevice'
  import nativeService from '../common/services/nativeService'
  import config from '../common/config/configMapping'
  import mideaCell from '../component/cell.vue'
  const modal = weex.requireModule('modal');
  const picker = weex.requireModule('picker');
  const globalEvent = weex.requireModule('globalEvent');
  export default {
    components: {mideaCell},
    data () {
      return {
         deviceDetail:{},
         endlist:[]
      }
    },
    methods:{
    linkSwitchEndpoint(obj){
       var self=this;
       var selectSwitch=self.deviceDetail.toDevice||{};
       if(obj.selected==1 || obj.selected==2){
          return;
       }
       var paramObj = {
        "topic":"/bind/create",
        "data": 
          {
          "type":1,
          "srcdevice":{
            "nodeid":self.deviceDetail.nodeid,
            "endpoint":self.deviceDetail.fromEndpoint
          },
          "decdevice":{
             "nodeid":selectSwitch.devId,
             "endpoint":obj.endpoint
          }
        }
       }
      
      nativeService.showLoading();
      nativeService.call("selectSwitchBoundDevice", paramObj, function(data) {
          nativeService.hideLoading();
          if(data.errorCode==0){
              //$rootScope.go('link-switch', 'slideLeft');
              modal.toast({message:"关联成功", duration: 1 });
              self.toLinkDetailPage();
          }else{
             modal.toast({message:"关联失败", duration: 1 });
             nativeService.hideLoading();
          }
        },function () {
          modal.toast({message:"关联失败", duration: 1 });
          nativeService.hideLoading();
       });
     },
     toLinkDetailPage(event) {
        var path="device/link-switch-detail.js";
        this.deviceDetail.isLinkUpdated=true;
        nativeService.setItem("deviceDetail",this.deviceDetail);
        nativeService.goTo(path);
     },
     querySwitchBound(){
         var self=this;
        
         var selectSwitch=self.deviceDetail.toDevice||{};
          var modelid=selectSwitch.devProps.modelid;
         var currentBoundList=self.deviceDetail.boundList||[];
         var paramObj = {
            "topic":"/bind/select",
            "data": 
             { 
               "type":1,
               "nodeid":selectSwitch.devId
             }
          }
          var len;
          switch (modelid) {
          case 'midea.curtain.001':
          case 'midea.switch.001':
          case 'midea.light.001':
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
          var endlist=[];
          for(var ii=0;ii<len;ii++){
            var obj={};
            obj.endpoint=(ii+1);
            obj.selected=0;//0表示未选中，1表示已关联其他设备，2表示已关联当前设备
            var nameArr=selectSwitch.devProps.endlist||[];
            if(nameArr.length>ii){
               var nameObj=nameArr[ii]||{};
               obj.name=nameObj.name;
            }else{
               obj.name= obj.endpoint+"路开关";
            } 
            endlist.push(obj);
          }
          
          nativeService.showLoading();
          nativeService.call("getSwitchBoundDevice", paramObj, function(data) {
             nativeService.hideLoading();
             //alert("return data:"+JSON.stringify(data));
             if(data.errorCode==0){
               var state=data.data.state||[];
               if(state.length>0){
                 self.selectedEndpoint=-1;
                 for(var i=0;i<state.length;i++){
                   var endpointObj=state[i];
                   var endpoint=endpointObj.endpoint;
                   var endpointBound=endpointObj.bound||[];
                   if(endpointBound.length>0){
                        endlist[endpoint-1].selected=1;
                        for(var k=0;k<currentBoundList.length;k++){
                        var currObj=currentBoundList[k];
                        if(selectSwitch.devId==currObj.nodeid && endpointObj.endpoint==currObj.endpoint){
                            endlist[endpoint-1].selected=2;
                            self.selectedEndpoint=endpoint;
                            break;
                         }
                       }
                    }
                  }
                 }
                //只要有一路开关设置了开关关联，该设备的其他开关均不可关联
                if(self.selectedEndpoint!=undefined && self.selectedEndpoint!=-1){
                  for(var kk=0;kk<endlist.length;kk++){
                    var outputObj=endlist[kk];
                    if(outputObj.endpoint!=self.selectedEndpoint){
                       endlist[kk].selected=1;
                    }
                  }
                }
                self.endlist=endlist;
             }else{
                self.endlist=[];
             }
             //modal.toast({message:JSON.stringify(self.endlist), duration: 1 });
          },function () {
           nativeService.hideLoading();
         });
     },
     init(){         
         var self=this;
         nativeService.updateTitle("选择开关",true,false);
         nativeService.getItem("deviceDetail",function(respData){
           respData=JSON.parse(respData.data);
           self.deviceDetail=respData;
           self.querySwitchBound();
          
         });
     }
    },
    created () {
      nativeService.initMockData({
           "getSwitchBoundDevice":getSwitchBoundDevice,
           "selectSwitchBoundDevice":selectSwitchBoundDevice
      });
      globalEvent.addEventListener('leftBtnClick', function (e) {
         nativeService.goBack();
      });
      this.init();
    }
  }
</script>