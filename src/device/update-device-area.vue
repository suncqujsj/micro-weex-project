<template>
  <div class="wrapper" ref="wrapper">
    <div class="img-wrapper" ref="imgWrapper">
        <image class="device-img" :src="deviceDetail.imgPath"></image>
        <div class="device-title">
          <text class="device-title-text">{{deviceDetail.devName}}</text>
        </div>
        <div class="device-area-name">
           <text class="device-area-name-text">{{deviceDetail.domain.domainName}}</text>
        </div>
    </div>
    <div class="rename-info" ref="renameInfo">
        <text class="rename-info-text">选择所属区域</text>
    </div>
    <scroller show-scrollbar="false"  scroll-direction="horizontal" class="scroller">
       <div v-for="(domain,index) in domains">
          <a @click="updateSelectArea(domain.domain_id)" class="btn-area" 
          :class="[domain.selected?'selected':'',index==0?'btn-area-first':'',index==domains.length-1?'btn-area-last':'']">
              <text class="btn-area-text" :class="[domain.selected?'btn-area-text-selected':'']">{{currDomainId==domain.domain_id?domain.domain_name+'-当前':domain.domain_name}}</text>
          </a>
        </div>
    </scroller>
    <midea-button text="确认更改" 
              type="green" style="margin-top:40px;"
              @mideaButtonClicked="showConfirm"></midea-button> 
    <div class="empty-box" :style="{height:boxHeight}">
    </div>
  
     <!-- <a @click="showConfirm" class="btn-rename">
          <text class="btn-rename-txt">确认更改</text>
       </a>-->
      
      
  </div>
</template>

<style>
.empty-box{
  width:750px;
}
.scroller {
    height:100px;
    display: flex;
    flex-direction: row;
    border-top-width: 1px;
    border-top-style: solid; 
    border-top-color: #e5e5e5;
    border-bottom-width: 1px;
    border-bottom-style: solid; 
    border-bottom-color: #e5e5e5;
    background:#fff;
    align-items: center;
}

.btn-area{
  margin-left:32px;
  padding-left:24px;
  padding-right:24px;
  padding-top:10px;
  padding-bottom:10px;
  border-radius: 8px;
  border-style: solid;
  border-color: #00B9EF;
  border-width: 1px;
  align-items: center;
  flex-direction: column;

 }
 .btn-area-first{
   margin-left:16px;
 }
 .btn-area-last{
   margin-right:16px;
 }
.selected{
   background-color: #00B9EF;
}
.btn-area-text{
  color:#00B9EF;
  font-size:24px;
}
.btn-area-text-selected{
   color:#FFF;
   font-size:24px;
}
.wrapper {
    background-color:#F7F7F7;
}
.img-wrapper{
  display: flex;
  align-items: center;
  justify-content:center;
  margin-top:80px;
}
.device-img{
   width:300px;
   height:300px;
}
.device-title{
  
  padding-top:40px;
}
.device-title-text{
  font-size:34px;
  color:#3E3A39;
}
.device-area-name{
  padding-top:20px;
}
.device-area-name-text{
  color:#727171;
  font-size:22px;
}
.rename-info{
  padding-top:48px;
  padding-bottom:30px;
  padding-left:16px;
}
.rename-info-text{
  color:#727171;
  font-size:22px;
}
</style>

<script>

 import getDomainList from '../dummy/getDomainList'
 import nativeService from '../common/services/nativeService'
 import getDeviceStatus from '../dummy/getDeviceStatus'
 import config from '../common/config/configMapping'
 import mideaButton from '../component/button.vue'
 const modal = weex.requireModule('modal');
 const globalEvent = weex.requireModule('globalEvent');
 const dom= weex.requireModule('dom');

 export default {  
   components:{mideaButton},
    methods: {
      showConfirm (event) {
          var self=this;
          modal.confirm({
            message: '确定更改设备所属区域?',
            okTitle:"确定",
            cancelTitle :'取消',
            duration: 0.3
          }, function (result) {
            if(result=='确定'){
               self.updateDeviceArea();
            }
          })
      },
      updateAreaView () {
         var self=this;
         if(self.domains!=undefined &&self.domains.length>0){
           for(var i=0;i<self.domains.length;i++){
               var obj=self.domains[i];
               if(obj.domain_id==self.selectDomainId){
                 Vue.set(self.domains[i],"selected",true);
               }else{
                 Vue.set(self.domains[i],"selected",false); 
               }
           }
         }
        //modal.toast({ message:JSON.stringify(self.domains), duration:10 })
      },
      updateSelectArea(selectedId) {
         var self=this;
         self.selectDomainId=selectedId;
         self.updateAreaView();
      },
      formatAreaData() {
         var self=this;
         var currentIndex;
         for(var i=0;i<self.domains.length;i++){
            if(self.domains[i].domain_id==self.currDomainId){
              currentIndex=i;
              break;
            }
         }
         var showDomainList=[];
         showDomainList.push(self.domains[currentIndex]);
         for(var i=0;i<self.domains.length;i++){
            if(i!=currentIndex){
               var domainObj=self.domains[i];
               showDomainList.push(domainObj);
            }
         }
         self.domains=showDomainList;
      },
      getDomainList(){
         var self=this;
         var params = {
          "houseid":self.deviceDetail.houseId
         }
         nativeService.call("getDomainList", params, function(data) {
            //modal.toast({ message:JSON.stringify(data), duration: 3 });
            if(data.errorCode == '0') {
                self.domains=data.data.domains||[];
                var currDomain= self.deviceDetail.domain;
                self.selectDomainId=currDomain.domainId;
                self.currDomainId=currDomain.domainId;
                self.formatAreaData();
                self.updateAreaView();
            } 
         },function () {
            modal.toast({ message:"获取房间列表失败", duration: 1 });
         });
      },
      getDomainNameById(domainId){
          var domainName="";
          for(var i=0;i<this.domains.length;i++){
            if(this.domains[i].domain_id==domainId){
               domainName=this.domains[i].domain_name;
               break;
            }
          }
          return domainName;
      },
      updateDeviceArea(){
         var self=this;
         if(self.selectDomainId==self.currDomainId){
              modal.toast({ message:"区域没有变更", duration: 1 });    
              return;
         }
         var params = {
          "data": {
               "old_domain_id":self.currDomainId,
               "domain_id": self.selectDomainId,
               "devid":self.deviceDetail.nodeid,
               "nodetype":1
            },
            houseid:self.deviceDetail.houseId
          }
          nativeService.showLoading();
          nativeService.call("addDeviceToDomain", params, function(data) {
            //modal.toast({ message:JSON.stringify(data), duration: 3 });
            nativeService.hideLoading();
            if(data.errorCode == '0') {
                var domainName=self.getDomainNameById(self.selectDomainId);
                self.deviceDetail.domain.domainId=self.selectDomainId;
                self.deviceDetail.domain.domainName=domainName;
                self.deviceDetail.domainId=self.selectDomainId;
                //modal.toast({ message:"更新成功", duration: 1 });
                var areaChannel = new BroadcastChannel('areaUpdate');
                areaChannel.postMessage(self.deviceDetail.domain)
                self.toSetting();
                nativeService.updateAreaDevice(params.data);
            } 
           },function () {
              nativeService.hideLoading();
              modal.toast({ message:"更新失败", duration: 1 });
           });
      },
      toSetting() {
         nativeService.setItem("deviceDetail",this.deviceDetail);
         //nativeService.goTo("device/device-setting.js");
         nativeService.goBack();
      },
      getImgPath(modelid){
          var imgPath="";
          var imgMapping=config.imgMapping;
          if(imgMapping[modelid]!=undefined){
             imgPath= "../img/icon/"+imgMapping[modelid]+".png";
          }
          this.deviceDetail.imgPath=imgPath;
      },
      init(){
         var self=this;
         nativeService.getItem("deviceDetail",function(respData){
            respData=JSON.parse(respData.data);
            self.deviceDetail=respData;
            self.getImgPath(self.deviceDetail.modelid);
            nativeService.updateTitle(self.deviceDetail.devName,true,false);
            self.getDomainList();
         });
         //nativeService.toast("new page");
        setTimeout(function(){
          self.checkDomHeight();
        },300);
      },
      checkDomHeight(){
          var self=this;
          var wrapper=self.$refs.wrapper;
          var imgWrapper=self.$refs.imgWrapper;
          var renameInfo=self.$refs.renameInfo;
          dom.getComponentRect(wrapper, function(result){
              var size=result.size||{};
              self.wrapperHeight=size.height;
              //nativeService.toast(size);
              dom.getComponentRect(imgWrapper, function(result){
                   var size=result.size||{};
                   self.imgWrapperHeight=size.height;
                   dom.getComponentRect(renameInfo, function(result){
                     var size=result.size||{};
                      self.renameInfoHeight=size.height;
                      var otherHight=88+80+84;
                      self.boxHeight=self.wrapperHeight-self.imgWrapperHeight-self.renameInfoHeight-otherHight-100;

                   });
              });
          });
      }
    },
    data:function () {
      return {
         deviceDetail: {},
         domains:[],
         boxHeight:0
      }
    },
    created () {
        nativeService.initMockData({
           "getDomainList":getDomainList
        });
        globalEvent.addEventListener('leftBtnClick', function (e) {
          nativeService.goBack();
        });
        this.init();
    }
  }
</script>

