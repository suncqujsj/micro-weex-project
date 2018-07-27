<template>
  <div class="wrapper">
     <div>
      <midea-header 
      title="洗碗机" 
      showSubTitle="true"
      subUpIcon="true"
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="../assets/img/home_btn_bace@2x.png" 
      rightImg="../assets/img/home_btn_more@2x.png"
      :showRightImg="true"  
      @leftImgClick="backClick" 
      @centerClick="centerClick"
      @rightImgClick="rightImgClick"></midea-header>
    </div>
    
    <midea-nav-list
          :list="currentList"
          :cols="3"
          height="260"
          @itemClicked="itemClicked"
         >
         </midea-nav-list>
  </div>
</template>
<style scoped>
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.wrapper{ 
}
</style>
<script>
import mideaHeader from "../midea-component/header.vue";
import mideaNavList from '../component/navList.vue';
import nativeService from "../common/services/nativeService";

export default {
   props: {
     currentRecord: {
        type: Object,
        default: () => ({})
      },
   },
  components: { mideaHeader,mideaNavList },
  data() {
    return {
      navList:[
         {
           "title":"智能洗",
           "hasBg": true,
           "bgColor":"#ffffff",
           "isActive":false,
           "img":"../assets/img/auto@2x.png",
           "activeImg":"../assets/img/program_all_icon_auto_sel@2x.png"
         },
         {
           "title":"节能洗",
           "hasBg": true,
           "bgColor":"#ffffff",
           "isActive":false,
           "img":"../assets/img/ECO@2x.png",
           "activeImg":"../assets/img/program_all_icon_ECO_sel@2x.png"
         },
         {
           "title":"水果洗",
           "hasBg": true,
           "isActive":false,
           "bgColor":"#ffffff",
           "img":"../assets/img/fruits@2x.png",
           "activeImg":"../assets/img/program_all_icon_fruits_sel@2x.png"
         },
         {
           "title":"玻璃洗",
           "hasBg": true,
           "isActive":false,
           "bgColor":"#ffffff",
           "img":"../assets/img/glass@2x.png",
           "activeImg":"../assets/img/program_all_icon_glass_sel@2x.png"
         },
         {
           "title":"强力洗",
           "hasBg": true,
           "bgColor":"#ffffff",
           "isActive":false,
           "img":"../assets/img/intensive@2x.png",
           "activeImg":"../assets/img/program_all_icon_intensive_sel@2x.png"
         },
          {
           "title":"正常洗",
           "hasBg": true,
           "bgColor":"#ffffff",
           "isActive":false,
           "img":"../assets/img/normal@2x.png",
           "activeImg":"../assets/img/program_all_icon_normal_sel@2x.png"
         },
         {
           "title":"1/2洗",
           "hasBg": true,
           "bgColor":"#ffffff",
           "isActive":false,
           "img":"../assets/img/pre-wash_Soak@2x.png",
           "activeImg":"../assets/img/program_all_icon_self-cleaning_sel@2x.png"
         },
       ],
       cols:3,
      // type:'spaceBetween'//spaceBetween or center
    };
  },
  methods: {
   backClick() {
      nativeService.goBack();
    },
    rightImgClick() {
      var path = "settingIndex.js";
      nativeService.goTo(path);
    },
    centerClick() {
      this.$emit('upClick');
    },
    itemClicked(index,item){
        this.$emit('modeItemClick',item);
    }
  }, 
  computed: {
    currentList(){
      var {currentRecord,navList} = this;
      for(var i = 0; i<navList.length;i++){
        if(navList[i].title==currentRecord.text){
          navList[i].bgColor = '#429ef3';
          navList[i].isActive = true;
        }else{
           navList[i].bgColor = '#ffffff';
           navList[i].isActive = false;
        }
      }
      return navList;
    }
  }
};
</script>
