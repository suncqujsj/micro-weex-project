<template>
  <div class="wrapper">
    <midea-cell style="margin-top:24px" title="名称"
                :rightText="deviceDetail.devName"
                :has-top-border="true"
                :has-arrow="true"
                :has-margin="true"
                @mideaCellClick="reName">
     </midea-cell>

    <midea-cell title="区域"
                :rightText="deviceDetail.domain.domainName"
                :has-top-border="true"
                :has-arrow="true"
                :has-margin="true"
                @mideaCellClick="toArea">
     </midea-cell>

     <midea-cell  v-if="isLock && lockUserManageShow" title="用户管理"
                :has-top-border="true"
                :has-arrow="true"
                :has-margin="true"
                @mideaCellClick="toLockUserManage">
     </midea-cell>

     <midea-cell  v-if="showBatteryConfig" title="电量低时发送通知"
                :has-top-border="true"
                :has-margin="true">
          <midea-switch slot="value" @change="toggleBatterConfig" :checked="tempLowBattery"></midea-switch>
     </midea-cell>

     <midea-cell v-if="alertInfo!=undefined&&alertInfo!=''" :title="alertInfo"
                :has-top-border="true"
                :has-margin="true">
          <midea-switch slot="value" disabled="true" checked="true"></midea-switch>
     </midea-cell>

     <midea-cell v-if="deviceDetail.devStats.version!=undefined&&deviceDetail.devStats.version!=''" title="固件版本"
                :has-top-border="true"
                :has-margin="true"
                :rightText="deviceDetail.devStats.version"
              >
     </midea-cell>

    
   <!--
    <div class="box" @click="reName">
      <div>
          <text class="txt-left">名称</text>
      </div>
      <div class="box-right">
          <text class="txt-right">{{deviceDetail.devName}}</text>
          <image class="arrow" src="../img/arrow_right.png"></image>
      </div>
    </div>
    <div class="box" @click="toArea">
      <div>
          <text class="txt-left">区域</text>
      </div>
      <div class="box-right">
           <text class="txt-right">{{deviceDetail.domain.domainName}}</text>
           <image class="arrow" src="../img/arrow_right.png"></image>
      </div>
    </div>

    <div v-if="isLock" class="box" @click="toLockUserManage()">
      <div>
          <text class="txt-left">用户管理</text>
      </div>
      <div class="box-right">
          <image class="arrow" src="../img/arrow_right.png"></image>
      </div>
    </div>

 
    <div class="box" v-if="showBatteryConfig">
      <div>
          <text class="txt-left">电量低时发送通知</text>
      </div>
       <div class="box-right">
           <smartSwitch class="ui-switch" @change="toggleBatterConfig" :checked="tempLowBattery"></smartSwitch>
      </div>
    </div>

     <div class="box"  v-if="alertInfo!=undefined&&alertInfo!=''">
      <div>
          <text class="txt-left">{{alertInfo}}</text>
      </div>
       <div class="box-right">
           <smartSwitch class="ui-switch" disabled="true" checked="true"></smartSwitch>
      </div>
    </div>

    <div class="box" v-if="deviceDetail.devStats.version!=undefined&&deviceDetail.devStats.version!=''">
      <div>
          <text class="txt-left">固件版本</text>
      </div>
      <div  class="box-right">
          <text class="txt-right">{{deviceDetail.devStats.version}}</text>
          <image class="arrow" src="../img/arrow_right.png"></image>
      </div>
    </div>
    -->

    <midea-button text="删除设备" type="delete"  @mideaButtonClicked="delDevice">
    </midea-button> 

    <midea-promt :title="nameTitle"  ref="promt" :maxlength="12" :placeholder="namePlaceholder" :inputValue="inputName" :show="show" @okClicked="confirmRename" @onPromtClose="onPromtClose" @onPromtInput="onPromtInput">
    </midea-promt>
  </div>
</template>

<style>
.wrapper {
    background-color:#F7F7F7;
    position:relative;
}
.ui-switch{
  color:#0DB9F0;
}
.box{
  margin-top:32px;
  border-top-style: solid;
  border-top-color: #e5e5e5;
  border-top-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left:16px;
  padding-right:16px;
  flex-direction: row;
  background-color:#FFF;
  padding-top:40px;
  padding-bottom:40px;
}
.box-right{
  flex-direction: row;
}
.txt-left{
  color:#333;
  font-size:28px;
}
.txt-right{
  color:#9FA0A0;
  font-size:24px;
  padding-right:24px;
}
.arrow{
  width:12px;
  height:23px;
}
.btn-wrapper{
  margin-top:40px;
  padding-left:16px;
  padding-right:16px;
  padding-top:24px;
  padding-bottom:24px;
}
.btn-del{
  border-radius: 8px;
  border-style: solid;
  border-color: #EB6560;
  border-width: 1px;
  height:84px;
  align-items: center;
  justify-content: center;
}
.btn-del-txt{
  color: #EB6560;
  font-size:28px;
  font-weight: bold;
}
.btn-del:active {
  background-color:#EB6560;
}

</style>

<script>
 const modal = weex.requireModule('modal');
 const globalEvent = weex.requireModule('globalEvent');
 //const navigator = weex.requireModule('navigator');
 import nativeService from '../common/services/nativeService'
 import getDeviceStatus from '../dummy/getDeviceStatus'
 import config from '../common/config/configMapping'
 import updateNode from '../dummy/updateNode'
 import delDevice from '../dummy/delDevice'
 import subDeviceConfigSpecific from '../dummy/subDeviceConfigSpecific'
 import mideaPromt from '../component/promt.vue'
 import mideaButton from '../component/button.vue'
 import mideaCell from '../component/cell.vue'

 export default {  
    components: { mideaPromt,mideaButton,mideaCell},
    methods: {
      onPromtClose(val){
         this.show=false;
      },
      onPromtInput(val){
         this.inputName=val;
      },
      reName (event) {
         /*var self=this;
         modal.prompt({
           message: '设备重命名',
           duration: 0.3,
           okTitle:"确定",
           cancelTitle :'取消'
         }, function (data) {
            if(data.result=='确定'){
              self.confirmRename(data.data);
            }
         })*/
         //this.$refs.promt.showPromt=true;
         this.show=true;
         this.inputName=this.deviceDetail.devName;
      },
     delDevice (event) {
          var self=this;
          modal.confirm({
            message: '设备将从网关中删除，确认删除吗?',
            okTitle:"确定",
            cancelTitle :'取消',
            duration: 0.3
          }, function (data) {
              if(data=='确定'){
                self.confrimDeleteDevice();
              }
          })
      },
      confirmRename() {
        var self=this;
        self.show=false;
        var name=self.inputName;
        var payload = {
          "nodeid": self.deviceDetail.nodeid,
          "data": {
             "nodename": name,
             "modelid":  self.deviceDetail.modelid
          }
        }
        //modal.toast({ message:JSON.stringify(name), duration: 1 });
        if(self.deviceDetail.devName==name){
           modal.toast({ message:"名字没有修改", duration: 1 });
           return;
        }
        if(name==""){
           modal.toast({ message:"名称不能为空！", duration: 1 });
           return;
        }
        if(name.length>12){
           modal.toast({ message:"名称只能输入十二位", duration: 1 });
           return;
        }
        if(!self.checkLimitChar(name)){
          modal.toast({ message:"只支持输入数字、字母、汉字、下划线！", duration: 1 });
          return;
        }
        nativeService.showLoading();
        nativeService.call("updateNode", payload, function(data) {
           nativeService.hideLoading();
           //modal.toast({ message:JSON.stringify(data), duration: 1 })
           if (data.errorCode == 0) {
             self.haveUpdate=true;
             self.deviceDetail.devName=name;
             var deviceNameChannel = new BroadcastChannel('deviceNamUpdate');
             deviceNameChannel.postMessage(name);
             self.nativeUpdate();
           }else{
             nativeService.toast("更改失败");
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
         var endList=this.deviceDetail.endList||[];
         if(endList.length>0){
           for(var i=0;i<this.deviceDetail.endList.length;i++){
              var nameObj={};
              nameObj.name=this.deviceDetail.endList[i].name;
              nameArr.push(nameObj);
           }
           obj.endlist=nameArr;
         }
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
      confrimDeleteDevice(){
           var self=this;
           var params = {
            "data": {
                "idType":1,
                "devId":self.deviceDetail.nodeid,
                "houseId":self.deviceDetail.houseId
             }
           }
           nativeService.showLoading();
           nativeService.call("delDevice", params, function(data) {
              nativeService.hideLoading();
              if(data.errorCode == '0') {
                 modal.toast({ message:"删除成功", duration: 1 });
                 nativeService.b2bDelGateway(self.deviceDetail.nodeid);
                 nativeService.backToNative();
              } else {
                 modal.toast({ message:"删除失败", duration: 1 });
              }
           },function () {
                 nativeService.hideLoading();
                 modal.toast({ message:"删除失败", duration: 1 });
           });
      },
      toArea(event) {
        var path="device/update-device-area.js";
        nativeService.setItem("deviceDetail",this.deviceDetail);
        nativeService.goTo(path);
      },
      toLockUserManage(event) {
        var path="device/lock-user-manage.js";
        nativeService.setItem("deviceDetail",this.deviceDetail);
        nativeService.goTo(path);
      },
      checkIsSupportLowBattery(){
           var self=this;
           var lowBattery=self.deviceDetail.devStats.lowBattery;
           if(lowBattery!=undefined){
              self.showBatteryConfig=true;
              self.tempLowBattery=(lowBattery==1?true:false);
           }
      },
      getConfigAlert(modelid){
        var alertConfig=config.guideImgMapping;
        if(alertConfig[modelid]!=undefined&&alertConfig[modelid].alertInfo!=undefined){
          this.alertInfo=alertConfig[modelid].alertInfo;
        }
      },
      toggleVal (val) {
        var self=this;
        self.tempLowBattery=(val==true?false:true);
      },
      toggleBatterConfig(event){
         var self=this;
         var currentVal = event.value;
         var params = {
            "topic":"/subdevice/config",
            "data": {
               "nodeid":self.deviceDetail.nodeid,
               "msgtype":"lowBattery",
               "lowBattery":(currentVal==true?1:0)
            }
          }
          //setTimeout(function(){
            nativeService.call("subDeviceConfigSpecific", params, function(data) { 
                  if(data.errorCode!=0){
                     //self.tempLowBattery=(currentVal==true?false:true);
                     self.toggleVal(currentVal);
                     modal.toast({message:'设置失败'+self.tempLowBattery, duration: 1 })
                  }else{
                     self.deviceDetail.devStats.lowBattery=(currentVal==true?1:0);
                     self.tempLowBattery=currentVal;
                     var lowbatteryChannel = new BroadcastChannel('lowbatterUpdate');
                     lowbatteryChannel.postMessage({"lowBattery":self.deviceDetail.devStats.lowBattery});
                  }
             },function() {
                   self.tempLowBattery=(self.tempLowBattery==1?0:1);
             })
          //},1000);
      },
      init() {
        var self=this;
        //var respData=getDeviceStatus;
        nativeService.getItem("deviceDetail",function(respData){
          //  modal.alert({ message:JSON.stringify(respData), duration: 3 });
            respData=JSON.parse(respData.data);
            self.deviceDetail=respData;
            self.checkIsSupportLowBattery();
            var modelid=self.deviceDetail.modelid;
            self.getConfigAlert(modelid);
            //self.getImgPath(self.deviceDetail.modelid);
            if(modelid=='kaadas.doorlock.001'||modelid=='midea.doorlock.001'||modelid=='hutlon.doorlock.001'){
                self.isLock=true;
             }
              
             if(typeof self.deviceDetail.devStats.version == 'string') {
                 var deviceVersion = parseInt(self.deviceDetail.devStats.version.replace(/\.+/g,''));
                 if((modelid=='kaadas.doorlock.001' && deviceVersion >= 28) || (modelid=='hutlon.doorlock.001' && deviceVersion >= 6)) {
                    self.lockUserManageShow = true;
                 }
             }

            nativeService.updateTitle(self.deviceDetail.devName,true,false);
        });
        //modal.toast({ message:self.deviceDetail.house.houseName, duration: 1 })
        //nativeService.setItem("deviceDetail",dd);
        /*var self =this;
        nativeService.getItem("deviceDetail",function(respData){
            self.deviceDetail=JSON.parse(respData.data);
        });*/
      },
      receiveAreaUpdateMessage(){
        var self=this;
        var areaChannel = new BroadcastChannel('areaUpdate');
        areaChannel.onmessage = function (event) {
           //modal.toast({ message:event.data.domainId, duration: 3 });
           var domainObj=event.data;
           self.deviceDetail.domain.domainName=domainObj.domainName;
           self.deviceDetail.domain.domainId=domainObj.domainId;
        }
      }
    },
    data:function () {
      return {
        deviceDetail: {},
        showBatteryConfig:false,
        tempLowBattery:false,
        updateName:"",
        isLock:false,
        show:false,
        inputName:"",
        namePlaceholder:"请输入设备名称",
        nameTitle:"设备重命名",
        lockUserManageShow:false
      }
    },
    created () {
       nativeService.initMockData({
          "delDevice":delDevice,
          "updateNode":updateNode,
          "subDeviceConfigSpecific":subDeviceConfigSpecific
       });
       //modal.toast({ message:"start do it", duration: 5 });
       var self=this;
       globalEvent.addEventListener('leftBtnClick', function (e) {
          nativeService.goBack();
       });
       self.init();
       self.receiveAreaUpdateMessage();
    }
    /*,
    mounted: function () {
      var self = this;
      globalEvent.addEventListener('leftBtnClick', function (e) {
         nativeService.toast("aaaaaaaa",5);
         nativeService.goBack();
      });
    }*/
  }
</script>

