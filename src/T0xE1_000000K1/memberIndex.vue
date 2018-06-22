<template>
<div>
    <div>
      <midea-header 
      title="" 
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="img/home_btn_bace@2x.png" 
      rightImg="img/setting.png"
      :showRightImg="false"  
      @leftImgClick="backClick" 
      @rightImgClick="rightImgClick"></midea-header>
    </div>
    <div class="member_section">
      <image class="member_bg" src="img/member_bg.png"></image>
      <div class="member_item">
        <div class="flex_center">
          <image class="member_icon" :src="memberIcon"></image>
        </div>
        <div class="flex_center">
         <text class="member_title">{{memberName}}</text>
        </div>
        <div class="flex_center">
          <text class="member_sub_title">经验值  {{expValue}}</text>
        </div>
         <div class="flex_center">
          <text class="member_dec_title">查看用户指南可以升级资深用户喔</text>
        </div>
      </div>
     
    </div>
   <div class="demo_section">
      <div>
       <scroller class="guide_list">         
          <div class="guide_list_item" v-for="(item,i) in list" @click="jumpNext(item)" >
            <div class="icon_title">
               <image class="item_img" :src="item.icon"></image>
                  <text class="guide_item_text">
                    {{item.name}}
                  </text>
            </div>
           
           <div class="flex_center">
            <text v-if="item.subTitle" class="item_tel">{{item.subTitle}}</text>
            <image style="width:12px;height:23px;" src="img/arrow_right.png"></image>
           </div>
            
          </div>
        </scroller>
      </div>
   </div>
   
</div>
</template>
<style scoped>
.guide_list {
  height: 1000px;
  position: relative;
  /* margin-top: 30px; */
}
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.member_section{
  
}
.member_bg{
  width: 750px;
  height: 399px;
}
.member_item{
  position: absolute;
  top: 40px;
  width: 750px;
}
.member_icon{
  width: 148px;
  height: 148px;
}
.member_title{
  font-size: 32px;
  margin-top: 30px;
}
.member_sub_title{
  font-size: 26px;
  margin-top: 10px;
  color: #5aa6fd;
}
.member_dec_title{
  font-size: 26px;
  margin-top: 10px;
  color: #afafaf;
}
.item_tel{
  font-size: 28px;
  margin-right: 10px;
   color: #949494;
}
.icon_title{
   flex-direction: row;
  align-items: center;
}
.item_img{
  width: 40px;
  height: 40px;
}
.guide_list_item {
  height: 120px;
  border-bottom-color: #c7c7c7;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.guide_item_text {
  font-size: 30px;
  margin-left: -120px;
}
.demo_section {
  padding-left: 30px;
  padding-right: 30px;
  /* padding-top: 20px;
  border-top-color: #ebf4ff;
  border-top-width: 20px; */
}
.demo_title {
  font-size: 34px;
}
.demo_content {
  font-size: 28px;
}
.guide_img {
  resize: contain;
}
</style>
<script>
import mideaHeader from "../midea-component/header.vue";
import nativeService from "../common/services/nativeService";
var stream = weex.requireModule('stream');
export default {
  components: { mideaHeader },
  data() {
    return {
      guideObj: {},
      guideImg: "",
      guideWidth: "600px",
      guideHeight: "300px",
      guideText: "",
      list: [
        { name: "用户指南", type: "problem1",icon:'img/setting/setting_icon_guide@2x.png' },
          { name: "软水盐档位", type: "problem2",icon:'img/setting/setting_icon_ruanshuiyan@2x.png' },
          { name: "亮碟剂档位", type: "problem3",icon:'img/setting/setting_icon_liangdieji@2x.png' },
          { name: "联系客服",subTitle:'400-889-9315', type: "problem4",icon:'img/setting/setting_icon_contact@2x.png' },
          // { name: "水电统计", type: "problem5",icon:'img/share/warm_actived.png' },
      ],
      memberIcon: "img/setting/touxiang_new@2x.png",
      memberName: "小白用户",
      expValue: 0
    };
  },

  methods: {
    jumpNext(item) {
      var path = '';
      if(item.name=='用户指南'){
        path = "settingIndex.js";
        nativeService.goTo(path, false, true); 
      }
      if(item.name=='软水盐档位'){
        path = "settingSalt.js";
        nativeService.goTo(path, false, true); 
      }
      if(item.name=='亮碟剂档位'){
        path = "settingBrightDish.js";
        nativeService.goTo(path, false, true); 
      }
      if(item.name=='联系客服'){
        nativeService.callTel('400-889-9315').then(
          (resp) => {
          //nativeService.toast(resp)
          }
          ).catch((error) => {
            //nativeService.toast(error)
          })
      }
       if(item.name=='水电统计'){
        path = "chart.js";
        nativeService.goTo(path, false, true); 
      }
    },
    backClick() {
      var path = "standby.js";
      nativeService.goTo(path,false, true);
    }
  },
  created() {
    var self = this;
    var POST_URL = 'http://121.43.198.16:8080/h3-exp/exp/query';
    nativeService.getItem("sn", function(snObj) {
      nativeService.getItem("userId", function(userid) {
          var requestData = {
            userId: userid.data,
            sn: snObj.data
          };
          stream.fetch({
              method: 'POST',
              url: POST_URL,
              headers:{'Content-Type':'application/json'},
              type:'json',
              body:JSON.stringify(requestData)
            }, function(ret) {
              if(!ret.ok){
                //nativeService.toast("request failed");
              }else{
                var callbackData = ret.data.result;
                // nativeService.toast(callbackData);
                if(parseInt(callbackData.userLevel)==1){
                  self.memberName = "小白用户";
                  self.memberIcon = "img/setting/touxiang_new@2x.png";
                }
                if(parseInt(callbackData.userLevel)==2){
                  self.memberName = "资深用户";
                  self.memberIcon = "img/setting/touxiang_old@@2x.png";
                }
                self.expValue = callbackData.exp;
              }
            },function(response){
              console.log('get in progress:'+response.length);
            });

      })
    })
   
  },
  mounted() {}
};
</script>