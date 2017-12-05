<template>
 <div>
        <div v-if="loaded&&deviceList.length>0" class="txt-wrapper">
           <text class="txt-normal">设备</text>
           <text @click="openRoomFilter" class="right-text">{{currRoomName}}-筛选</text>
        </div>
        <div v-if="loaded&&deviceList.length==0" class="txt-wrapper">
           <text style="text-align:center" class="txt-normal">没有可选的设备</text>
        </div>

        <scroller class="device-list">
           
            <midea-cell height="120" v-for="(item,index) in deviceList" :title="item.devName"
                :desc="item.domain.domainName"
                :has-top-border="index==0?true:false"
                :has-arrow="true"
                :itemImg="item.imgPath"
                @mideaCellClick="toLinkSetting(item)">
            </midea-cell>

            <!--<div @click="toLinkSetting(item)" v-for="(item,index) in deviceList" :class="[index==0?'top-border':'']" class="bottom-border device-item">
              <div class="row-direction">
                 <image class="device-img" :src="item.imgPath">
                 </image>
                 <div class="device-text-wrapper">
                     <text class="device-text">{{item.devName}}</text>
                     <text style="color:#9FA0A0;font-size:24px;padding-top:10px">{{item.domain.domainName}}</text>
                 </div>
              </div>
              <div>
                  <image class="arrow" src="../img/arrow_right.png"></image>
              </div>
            </div>
            -->
        </scroller>
  </div>
  
</template>

<style scoped>
   .txt-normal{
       font-size:28px;
   }
  .txt-wrapper {
    flex-direction: row;
    justify-content: space-between;
    color:#9FA0A0;
    font-size:28px;
    padding:20px;
  }

  .right-text{
    color: #00B9EF;
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
     justify-content: space-between;
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
         rooms:[],
         deviceList:[],
         index:0,
         currRoomName:"全部",
         loaded:false
      }
    },
    methods:{
       openRoomFilter(){
          var self=this;
          var items = self.roomNameArr
          picker.pick({
            index: self.index,
            items
          },function(event){
             //nativeService.toast(JSON.stringify(event));
             if (event.result === 'success') {
              self.index=event.data;
              self.currRoomName=items[self.index];
              self.selDeviceByRoom(event.data);
             }
          })
          /*modal.toast({message:"2222",duration:1});
          var self=this;
          var items =["全部","房间","客厅"]
          picker.pick({
            index: self.index,
            items
          },function(event){
              modal.toast({message:JSON.stringify(event),duration:1});
             if (event.result === 'success') {
              self.index=event.data;
              //self.selDeviceByRoom(event.data);
             }
          });*/
       },
       selDeviceByRoom(index){
           var self=this;
           var domainId;
           if(index!=0){
             domainId=self.rooms[index-1].domainId;
           }
           var switchDeviceArr=self.deviceDetail.switchDeviceArr;
           var deviceList=[];
           for(var i=0;i<switchDeviceArr.length;i++){
             var domain=switchDeviceArr[i].domain;
             if(index==0||domain.domainId==domainId){
               deviceList.push(switchDeviceArr[i]);
             }
           }
           self.formatDeviceList(deviceList);
       },
       formatDeviceList(deviceList){
          var self=this;
          self.deviceList=[];
          for(var i=0;i<deviceList.length;i++){
             var obj=deviceList[i];
             var modelid=obj.devProps.modelid;
             obj.imgPath=self.getImgPath(modelid);
             self.deviceList.push(obj);
          }
       },
       formatDevice(){
          var self=this;
          //modal.toast({message:JSON.stringify(self.deviceDetail.domainArr), duration:3});
          self.loaded=true;
          self.rooms=self.deviceDetail.domainArr||[];
          var roomNameArr=["全部"];
          for(var i=0;i<self.rooms.length;i++){
             roomNameArr.push(self.rooms[i].domainName);
          }
          self.roomNameArr=roomNameArr;
          self.formatDeviceList(self.deviceDetail.switchDeviceArr);
       },
       getImgPath(modelid){
          var imgPath="";
          var imgMapping=config.imgMapping;
          if(imgMapping[modelid]!=undefined){
             imgPath= "../img/icon/"+imgMapping[modelid]+".png";
          }
          return imgPath;
       },
       getDeviceList(){
            var self=this;
            var paramObj = {
              data : {
                "houseId": self.deviceDetail.houseId,
                "fields" : "idType,devId,devName,domain,house,devProps"
              }
            };
            nativeService.showLoading();
            nativeService.call("deviceList", paramObj, function(data) {
               nativeService.hideLoading();
               if(data.errorCode==0){
                  self.buildDomainDevice(data.data);
               }
             },function () {
               modal.toast({message:"数据获取错误！", duration:1});
               nativeService.hideLoading();
             });
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
                case 'midea.switch.004':
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
          nativeService.setItem("deviceDetail",self.deviceDetail);
          self.formatDevice();
       },
       init(){
           var self=this;
           nativeService.updateTitle("选择开关面板",true,false);
           nativeService.getItem("deviceDetail",function(respData){
              respData=JSON.parse(respData.data);
              self.deviceDetail=respData;
              var domainArr=self.deviceDetail.domainArr||[];
              if(domainArr.length>0){
                 self.formatDevice();
               }else{
                 self.getDeviceList();
               }
             
           });
       },
       toLinkSetting(item){
          var path="device/select-device-endpoint.js";
          this.deviceDetail.toDevice=item;
          nativeService.setItem("deviceDetail",this.deviceDetail);
          nativeService.goTo(path);
       }
    },
    created () {
      var env=weex.config.env;
      var self=this;
      //modal.toast({message:env.deviceHeight / env.deviceWidth * 750, duration: 5 })
      self.maskHeight=env.deviceHeight / env.deviceWidth * 750;
      globalEvent.addEventListener('leftBtnClick', function (e) {
         nativeService.goBack();
      });
      self.init();
      /*nativeService.initMockData({
          "getEndpointBoundDevice":getEndpointBoundDevice
       });*/
       
    }
  }
</script>