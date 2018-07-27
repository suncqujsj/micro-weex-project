<template>
  <div class="wrapper">
     <div>
      <midea-header 
      title="智能助手" 
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="assets/img/home_btn_bace@2x.png" 
      rightImg="assets/img/home_btn_more@2x.png"
      :showRightImg="false"  
      @leftImgClick="backClick" 
      @rightImgClick="rightImgClick"></midea-header>
    </div>
    <div>
        <div class="step_bg">
            <image class="step_img" :src="stepImg"></image>
          </div>
    </div>
      <div class="step_section">
        <div class="step_item" v-for="(item,i) in stepObj">
          <text class="step_text">{{item.name}}</text>
        </div>
      </div>
      <div class="flex_center">
         <div class="step_list">
         <midea-nav-list
          :list="currentStepList"
          :cols="3"
          height="260"
          @itemClicked="itemClicked"
         >
         </midea-nav-list>
        </div>
      </div>

      <div class="btn_section">
         <div class="flex_center" v-if="currentStepIndex==1">
          <div class="footer_btn">
            <midea-button text="上一步" :textStyle="textStyle" :btnStyle="orderBtnStyle"  @mideaButtonClicked="prevGo"></midea-button>
            <midea-button text="下一步" :textStyle="startStyle" :btnStyle="startBtnStyle" @mideaButtonClicked="nextGo"></midea-button>
          </div>
        </div>
        <div class="flex_center" v-if="currentStepIndex==2">
          <div class="footer_btn">
            <midea-button text="上一步" :textStyle="textStyle" :btnStyle="orderBtnStyle"  @mideaButtonClicked="prevGo"></midea-button>
            <midea-button text="确定" :textStyle="startStyle" :btnStyle="sureBtnStyle" @mideaButtonClicked="sureSelect"></midea-button>
          </div>
        </div>
        <div v-if="currentStepIndex==0">
          <midea-button text="下一步" :textStyle="startStyle" :btnStyle="kownBtnStyle" @mideaButtonClicked="nextGo"></midea-button>
        </div>
        
      </div>
     
  </div>
</template>
<style scoped>
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.step_title{
  position: relative;
}
.step_bg{
  flex-direction: row;
  justify-content: center;
  width: 750px;
  margin-top: 50px;
  
}
.step_img{
  width: 570;
  height: 66px;
}
.step_section{
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 194px;
  width: 750px;
}
.step_item{
  flex-direction: row;
  justify-content: center;
  width: 190px;  
}
.step_text{
  font-size: 28px;
  color: #5f5f5f;
}
.step_list{
  margin-top: 60px;
  width: 640px;
}
.btn_section{
  position: absolute;
  bottom: 50px;
  width: 750px;
}
.footer_btn {
  width: 680px;
  /* height: 150px; */
  padding-left: 36px;
  padding-right: 36px;
  margin-top: 30px;
  border-radius: 80px;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
}

</style>
<script>
import mideaHeader from '../midea-component/header.vue'
import mideaButton from "../midea-component/button.vue";
import mideaNavList from '../component/navList.vue';
import nativeService from "../common/services/nativeService";

export default {
  components: { mideaHeader,mideaButton,mideaNavList },
  data() {
    return {
      startBtnStyle: {
        backgroundImage:
          "linear-gradient(to right, rgb(33, 148, 230),rgb(20, 180, 230))",
        borderRadius: "50px",
        width: "280px",
        opacity: 0.5
      },
      sureBtnStyle: {
        backgroundImage:
          "linear-gradient(to right, rgb(33, 148, 230),rgb(20, 180, 230))",
        borderRadius: "50px",
        width: "280px",
        opacity: 0.5
      },
      kownBtnStyle:{
        backgroundImage:
          "linear-gradient(to right, rgb(33, 148, 230),rgb(20, 180, 230))",
        borderRadius: "50px",
        width: "600px",
        height: "90px",
        marginTop: "36px",
        opacity: 0.5
      },
      clickSelRecord: 0,
      stepImg: 'assets/img/helper/assistant_step_bg_1@2x.png',
      stepObj:[
        {
          order:'step1',name:'污啧度',
          canGoToNext: false,
          stepIcon:[
            {"title":"轻度","hasBg": true,"bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_1_low@2x.png","img_actived":"assets/img/helper/assistant_1_low_sel@2x.png"},
            {"title":"中度","hasBg": true,"bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_1_middle@2x.png","img_actived":"assets/img/helper/assistant_1_middle_sel@2x.png"},
            {"title":"重度","hasBg": true,"bgColor":"#ffffff", "isActive":false,"img":"assets/img/helper/assistant_1_heavy@2x.png","img_actived":"assets/img/helper/assistant_1_heavy_sel@2x.png"},
          ],
          isHasPrevStepBtn:false
        },
         {
          order:'step2',name:'置放时间',  
          canGoToNext: false,         
          stepIcon:[
            {"title":"即时","hasBg": true,"bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_2_now@2x.png","img_actived":"assets/img/helper/assistant_2_now_sel@2x.png"},
            {"title":"半个小时内","hasBg": true,"bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_2_half-hour@2x.png","img_actived":"assets/img/helper/assistant_2_half-hour_sel@2x.png"},
            {"title":"半个小时以上","hasBg": true,"bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_2_half-hour2@2x.png","img_actived":"assets/img/helper/assistant_2_half-hour2_sel@2x.png"},
          ],
          isHasPrevStepBtn:true
        },
         {
          order:'step3',name:'选餐具',   
          canGoToNext: false,        
          stepIcon:[
           {"title":"碗","hasBg": true, "bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_3_bowl@2x.png","img_actived":"assets/img/helper/assistant_3_bowl_sel@2x.png"},
           {"title":"碟子","hasBg": true, "bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_3_plate@2x.png","img_actived":"assets/img/helper/assistant_3_plate _sel@2x.png"},
           {"title":"红酒杯","hasBg": true, "bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_3_wine-glass@2x.png","img_actived":"assets/img/helper/assistant_3_wine-glass_sel@2x.png"},
           {"title":"玻璃杯","hasBg": true, "bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_3_glass@2x.png","img_actived":"assets/img/helper/assistant_3_glass_sel@2x.png"},
           {"title":"炒菜锅","hasBg": true, "bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_3_pot@2x.png","img_actived":"assets/img/helper/assistant_3_pot_sel@2x.png"},
           {"title":"奶瓶","hasBg": true, "bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_3_feeding-bottle@2x.png","img_actived":"assets/img/helper/assistant_3_feeding-bottle_sel@2x.png"},
           {"title":"水果","hasBg": true, "bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_3_fruit@2x.png","img_actived":"assets/img/helper/assistant_3_fruit_sel@2x.png"},
          ],
          isHasPrevStepBtn:true
        },
      ],
      currentStepList:[
          {"title":"轻度","hasBg": true,"bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_1_low@2x.png","img_actived":"assets/img/helper/assistant_1_low_sel@2x.png"},
            {"title":"中度","hasBg": true,"bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_1_middle@2x.png","img_actived":"assets/img/helper/assistant_1_middle_sel@2x.png"},
            {"title":"重度","hasBg": true,"bgColor":"#ffffff", "isActive":false,"img":"assets/img/helper/assistant_1_heavy@2x.png","img_actived":"assets/img/helper/assistant_1_heavy_sel@2x.png"},
      ],
      currentStepIndex:0,
      isBowl: false, 
      isWineCup: false
      
    };
  },
  methods: {
    backClick(){
       var path="selectMode.js";
        nativeService.goTo(path,false, true);
    },
    rightImgClick(){
        var path="settingIndex.js";
       nativeService.goTo(path,false, true);
    },
     jumpNext(which) {
      var path = which + ".js";
      nativeService.goTo(path,false, true);
    },
    itemClicked(index,item){
        var {stepObj,currentStepIndex,currentStepList} = this;
        for(var i=0; i< currentStepList.length; i++){
          if(currentStepList[i].isActive){
            if(item.title=='红酒杯'&&currentStepList[i].title=='碗'){
               nativeService.toast('红酒杯不建议与碗一起清洗');
               return;
            }
             if(item.title=='碗'&&currentStepList[i].title=='红酒杯'){
               nativeService.toast('红酒杯不建议与碗一起清洗');
               return;
            }
          }
        }
        for(var key=0; key<currentStepList.length; key++){
          if(key==item.index){
             if(currentStepList[key].isActive){
              currentStepList[key].isActive = false;
              stepObj[currentStepIndex].canGoToNext = false;
               if(currentStepIndex==0){
                this.kownBtnStyle.opacity = 0.5;
              }
              if(currentStepIndex==1){
                this.startBtnStyle.opacity = 0.5;
              }
              if(currentStepIndex==2){
                this.sureBtnStyle.opacity = 0.5;
                this.clickSelRecord = this.clickSelRecord-1;
              }
              stepObj[currentStepIndex].stepIcon[key].isActive = false;
             }else{
              currentStepList[key].isActive = true;
              stepObj[currentStepIndex].canGoToNext = true;
              if(currentStepIndex==0){
                this.kownBtnStyle.opacity = 1;
              }
              if(currentStepIndex==1){
                this.startBtnStyle.opacity = 1;
              }
              if(currentStepIndex==2){
                this.sureBtnStyle.opacity = 1;
                this.clickSelRecord = this.clickSelRecord+1;
              }
              stepObj[currentStepIndex].stepIcon[key].isActive = true;
             }

             if(currentStepIndex==2 && this.clickSelRecord>0){
               this.sureBtnStyle.opacity = 1;
             }else{
               this.sureBtnStyle.opacity = 0.5;
             }
          }else{
            if(currentStepIndex==0||currentStepIndex==1){
              currentStepList[key].isActive = false;
              stepObj[currentStepIndex].stepIcon[key].isActive = false;
            }
          }
        }
        this.currentStepList = currentStepList;
        this.stepObj = stepObj;

    },
    nextGo(){
      //nativeService.alert(this.stepObj);
      var {stepObj} = this;
      if(this.currentStepIndex==1&&this.clickSelRecord>0){
        this.sureBtnStyle.opacity = 1;
      }
      if(stepObj[this.currentStepIndex].canGoToNext){               
        this.currentStepIndex = this.currentStepIndex+1;
        if(this.currentStepIndex==1){
           this.stepImg = 'assets/img/helper/assistant_step_bg_2@2x.png';
        }
        if(this.currentStepIndex==2){
           this.stepImg = 'assets/img/helper/assistant_step_bg_3@2x.png';
        }
        this.currentStepList = stepObj[this.currentStepIndex].stepIcon;
      }
    },
    prevGo(){
      var {stepObj} = this;
      this.currentStepIndex = this.currentStepIndex-1;
      if(this.currentStepIndex==0){
           this.stepImg = 'assets/img/helper/assistant_step_bg_1@2x.png';
      }
      if(this.currentStepIndex==1){
          this.stepImg = 'assets/img/helper/assistant_step_bg_2@2x.png';
      }
       this.currentStepList = stepObj[this.currentStepIndex].stepIcon;
    },
    sureSelect(){
      if(this.currentStepIndex==2 && this.clickSelRecord>0){
        var {stepObj} = this;
        var hasSelectList = [];
        for(var i=0; i<stepObj.length; i++){
          var stepIconList = stepObj[i].stepIcon;
          for(var key=0; key<stepIconList.length; key++){
            if(stepIconList[key].isActive){
              hasSelectList.push(stepIconList[key]);
            }
          }
        }
        var sendMode = 4, modeDec = '';
       
        for(var i=0; i<hasSelectList.length; i++){
          if(hasSelectList[i].title=='重度'||hasSelectList[i].title=='半个小时以上'||hasSelectList[i].title=='炒菜锅'){
            sendMode = 2;
            modeDec = '强力洗';
           // nativeService.toast(sendMode);
            nativeService.setItem("smartSelectedMode", {
              name: modeDec,
              sendMode: sendMode
            });
            this.jumpNext('smartSelectedMode'); 
            return;
          }
          if(hasSelectList[i].title=='红酒杯'||hasSelectList[i].title=='奶瓶'){
              sendMode = 5;
              modeDec = '玻璃洗';
            }
          if(hasSelectList[i].title=='水果'){
              sendMode = 11;
              modeDec = '水果洗';
            }
          if(hasSelectList[i].title=='中度' && hasSelectList[i+1].title=='即时'){
                sendMode = 3;
                modeDec = '即时洗';
              }
          if(hasSelectList[i].title=='轻度' && hasSelectList[i+1].title=='半个小时内'){
                sendMode = 4;
                modeDec = '节能洗';
              }
          if(hasSelectList[i].title=='轻度' && hasSelectList[i+1].title=='即时'){
                sendMode = 7;
                modeDec = '超快洗';
              }
        }
         
        nativeService.setItem("smartSelectedMode", {
            name: modeDec,
            sendMode: sendMode
          });
        this.jumpNext('smartSelectedMode'); 
        // nativeService.alert(hasSelectList);
        // nativeService.alert(sendMode);
        return;
      }
    }
   
  },
  created() {},
  computed: {
    orderBtnStyle() {
      return {
        backgroundColor: "transparent",
        borderRadius: "50px",
        width: "280px",
        borderColor: "rgb(33, 148, 230)",
        borderWidth: "1px"
      };
    },
    textStyle() {
      return {
        color: "rgb(33, 148, 230)"
      };
    },
    startStyle() {
      return {
        color: "#ffffff"
      };
    }
  }
};
</script>