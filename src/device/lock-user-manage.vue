<template>
 <div class="wrapper" :class="[userList.length==0&&loadList?'center':'']" :style="{ height:pageHeight +'px'}">
    
      <scroller v-if="userList.length>0" style="margin-top:20px" class="device-list">
          <midea-cell v-for="(user,index)  in userList" 
                :title="user.userContent"
                :has-top-border="index==0?true:false"
                :has-arrow="true"
                :rightText="(user.userRole!=undefined && user.userRole!='')?user.userRole:'未设置'"
                @mideaCellClick="setUserRole(user)">
         </midea-cell>


         <!-- <div :class="[index==0?'top-border':'']" v-for="(user,index)  in userList"  @click="setUserRole(user)" class="bottom-border device-item">
              <div>
                  <text class="left-text"> {{user.userContent}}</text>
              </div>
              <div class="row-direction">
                 <div>
                     <text class="right-text">{{(user.userRole!=undefined && user.userRole!='')?user.userRole:"未设置"}}</text>
                 </div>
                 <image class="arrow" src="../img/arrow_right.png"></image>
             </div>
         </div>
         -->
      </scroller>
      
      <div v-if="userList.length==0&&loadList" class="center-info-wrapper">
           <div>
              <text class="black-txt">暂无门锁账号</text>
           </div>
           <div style="padding-top:20px;">
              <text class="grey-txt">若已设置账号，请开启门锁，刷新页面重试</text>
           </div>
     </div>

     <div v-if="userList.length==0&&loadList">
         <!--<a @click="getUserList" class="btn-white">
            <text class="btn-white-txt">刷新</text>
         </a>
         -->
          <midea-button text="刷新" type="refresh"  @mideaButtonClicked="getUserList">
          </midea-button> 
      </div>
      
      <midea-promt :title="nameTitle"  ref="promt" :placeholder="namePlaceholder" :inputValue="inputRole" :show="show" @okClicked="confirmSettingUser" @onPromtClose="onPromtClose" @onPromtInput="onPromtInput">
    </midea-promt>
 </div>
  
</template>

<style scoped>
  .mask{
    top: 0;
    width: 750px;
    height: 1344px;
    align-items: center;
    background-color:#333;
    opacity:0.9;
    position:absolute;
    z-index:1000;
  }
  .operate-box {
    background-color: #F8F8F8;
    width: 558px;
    border-radius:10px;
  }
  .box-title-wrapper{
    padding-top:30px;padding-bottom:20px
  }
  .box-title-text{
   font-size:32px;color:#333;text-align:center
  }
  .box-input-wrapper{
    padding-left:20px;padding-right:20px;padding-top:10px;padding-bottom:20px;
  }
  .box-input{
    color:#333;background-color:#FFF;height:80px;font-size:24px;
  }
  .box-btn-group{
    flex-direction:row;border-top-style:solid;border-top-width:1px;border-top-color:#e5e5e5;height:84px;
  }
  .box-btn-wrapper{
  flex-direction:row;height:84px;flex:1;align-items:center;justify-content:center;border-right-style:solid;border-right-width:1px;border-right-color:#e5e5e5;
  }
  .box-btn-text{
    text-align:center;color:#387EF5;font-size:32px
  }
  .wrapper{
    background-color:#F7F7F7;
    position:relative;
  }

  .center{
    justify-content: center;
    align-items:center;
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
     padding-top:36px;
     padding-bottom:36px;
     background-color:#fff;
     flex-direction:row;
     width:750px;
     align-items: center;
     justify-content: space-between;
   }
   .left-text{
     color:#333;
     font-size:28px;
   }
   .right-text{
       color:#9FA0A0;
      font-size:24px;
   }
   .arrow{
    width:28px;
    height:28px;
    padding-left:12px;
  }
  .row-direction{
    flex-direction: row;
    align-items: center;
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
  .btn-white{
    border-radius: 8px;
    border-style: solid;
    border-color: #9FA0A0;
    background-color: #FFF;
    border-width: 1px;
    height:84px;
    align-items: center;
    justify-content: center;
  }
  .btn-white-txt{
    color: #9FA0A0;
    font-size:28px;
    font-weight: bold;
  }
  .btn-white:active {
    background-color:#9FA0A0;
  }
</style>
<script>
  import lockUserList from '../dummy/lockUserList'
  import updateLockUserRole from '../dummy/updateLockUserRole'
  import nativeService from '../common/services/nativeService'
  import config from '../common/config/configMapping'
  import mideaButton from '../component/button.vue'
  import mideaPromt from '../component/promt.vue'
  import mideaCell from '../component/cell.vue'
  const modal = weex.requireModule('modal');
  const globalEvent = weex.requireModule('globalEvent');

  export default {
    components: { mideaPromt,mideaButton,mideaCell},
    data () {
      return {
         deviceDetail:{},
         userList:[],
         show:false,
         inputRole:"",
         namePlaceholder:"请输入用户角色,如爸爸妈妈",
         nameTitle:"设置用户角色"
      }
    },
    methods:{
      onPromtClose(val){
         this.show=false;
      },
      onPromtInput(val){
         this.inputRole=val;
      },
      setUserRole(user){
         this.currentUser=user;
         if(user.userRole!=undefined && user.userRole!=""){
            this.inputRole=user.userRole;
         }else{
            this.inputRole="";
         }
         this.show=true;
      },
      getUserList(){
        var self=this;
        var parmas={
          "nodeid":self.deviceDetail.nodeid
        }
        nativeService.showLoading();
        nativeService.call("lockUserList", parmas,function(data) {
           nativeService.hideLoading();
           var data=data.data||{};
           var userInfos=data.userInfos||[];
           self.formatRoleList(userInfos);
           self.loadList=true;
          },function () {
          self.loadList=true;
           nativeService.hideLoading();
        }); 
      },
      formatRoleList(userInfos){
        var _modelEventConfig = config.deviceMapping[this.deviceDetail.modelid].event;
        var index=0;
        for(var i=0;i<userInfos.length;i++){
           var userObj=userInfos[i]||{};
           var _OpenRecord = _modelEventConfig.OpenRecord||{};
           var _lockTypeName =_OpenRecord[userObj.userType]||"";
           userInfos[i].userContent = _lockTypeName+"用户"+userObj.userNo;
           userInfos[i].index=index;
           index++;
        }
        this.userList=userInfos;
      },
      onRoleInput: function (event) {
        this.inputRole = event.value;
       
      },
      confirmSettingUser(){
         var self=this;
         var name=self.inputRole;
         var user=self.currentUser;
         self.show=false;//关闭弹窗
         if(name==""){
           modal.toast({ message:"用户角色不能为空！", duration: 1 });
           return;
         }
         if(name.length>12){
           modal.toast({ message:"用户角色只能输入十二位", duration: 1 });
           return;
         }
         if(!self.checkLimitChar(name)){
           modal.toast({ message:"只支持输入数字、字母、汉字、下划线！", duration: 1 });
           return;
         }
         var payload={
            "nodeid":self.deviceDetail.nodeid,
              "data":{
                "userNo":user.userNo, //用户编号
                "userRole":name, //用户角色
                "userType":user.userType
            }
         }
         nativeService.showLoading();
         nativeService.call("updateLockUserRole", payload, function(data) {
          if (data.errorCode == 0) {
            Vue.set(self.userList[user.index],"userRole",name);
            //window.userInfos[user.index].userRole=name;
            var userRoleChannel = new BroadcastChannel('userRoleUpdate');
            userRoleChannel.postMessage({"updated":true});
            nativeService.hideLoading();
            self.hideMask();
          } else {
            nativeService.hideLoading();
          }
         },function () {
           nativeService.hideLoading();
         });
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
      init(){
        var self=this;
        nativeService.updateTitle("用户管理",true,false);
        nativeService.getItem("deviceDetail",function(respData){
            respData=JSON.parse(respData.data);
            self.deviceDetail=respData;
            self.getUserList();
        });
      }
    },
    created () {
       var env=weex.config.env;
       var self=this;
       self.pageHeight=env.deviceHeight / env.deviceWidth * 750-150;
       self.maskHeight=env.deviceHeight / env.deviceWidth * 750;
       self.boxMarginTop=self.maskHeight/4;
       //self.deviceDetail.modelid="kaadas.doorlock.001";
       nativeService.initMockData({
           "lockUserList":lockUserList,
           "updateLockUserRole":updateLockUserRole
       });
       globalEvent.addEventListener('leftBtnClick', function (e) {
         nativeService.goBack();
       });
       self.init();
    }
  }
</script>