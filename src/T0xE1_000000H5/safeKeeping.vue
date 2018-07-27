<template>
  <div class="wrapper">
   <div>
      <midea-header 
      title="洗碗机" 
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="../assets/img/home_btn_bace@2x.png" 
      rightImg="../assets/img/home_btn_more@2x.png"
      :showRightImg="true"  
      @leftImgClick="backClick" 
      @rightImgClick="rightImgClick"></midea-header>
    </div>
        <div class="flex_center">
          <image class="standby_icon" src="../assets/img/standby.gif"></image>
        </div>
          <div class="standby_dec_section">
            <div class="flex_center">
            <text class="standby_title">保管中</text>
            </div>
            <div class="flex_center">
            <text class="standby_tip">还剩2天23小时</text>
            </div>
          </div>
      
  <div class="footer_section">
      <div class="lack_section">
        <div class="item_section left_item">
            <div class="flex_center">
               <image style="width:55px;height:76px;" src="../assets/img/40_2x.png"></image>
               <div class="item_dec">
                  <div class="number_section"><text class="title_dec">约</text><text class="number_dec">40%</text></div>
                  <text class="lack_dec">亮碟剂</text>
               </div>
            </div>
        </div>
        <div class="item_section">
           <div class="flex_center">
               <image style="width:55px;height:76px;" src="../assets/img/40_2x.png"></image>
               <div class="item_dec">
                  <div class="number_section"><text class="title_dec">约</text><text class="number_dec">40%</text></div>
                  <text class="lack_dec">软水盐</text>
               </div>
            </div>
        </div>
      </div>
      <div class="keeping_section flex_center">
       <div class="safe_keeping">
       <div class="keeping_dec">
         <text class="keeping_title">保管</text>
         <text class="lack_dec" style="margin-top:10px">去设置保管</text>
       </div>
        <div class="">
         <midea-switch :checked="mideaChecked"  @change="onMideachange" :width="70" :height="60" :iconOn="iconOn" :iconOff="iconOff"   slot="value"></midea-switch>
       </div>
      </div>
      </div>
     
  </div>
      <!-- <midea-button text="水电统计" :btnStyle="sureBtnStyle"  @mideaButtonClicked="linkTo('chart')"></midea-button> -->
    
  </div>
</template>
<style scoped>
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.footer_section{
  position: absolute;
  bottom: 40px;
  width: 750px;
}
.keeping_section {
  margin-top: 60px;
}
.safe_keeping {
  width: 600px;
  height: 150px;
  padding-left: 36px;
  padding-right: 36px;
  margin-top: 30px;
  border-color: #ddd;
  border-width: 1px;
  border-radius: 80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.standby_section {
  flex-direction: row;
  justify-content: center;
}
._relative {
  position: relative;
}
.standby_icon {
  width: 650px;
  height: 650px;
  margin-top: 60px;
}
.standby_dec_section {
  width: 750px;
  justify-content: center;
  position: absolute;
  top: 450px;
}
.standby_title {
  font-size: 60px;
  color: rgb(54, 54, 54);
}
.standby_tip {
  font-size: 36px;
  color: rgb(97, 184, 235);
}
.lack_section {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}
.item_section {
  width: 350px;
}
.item_dec {
  margin-left: 20px;
}
.left_item {
  border-right-color: #ddd;
  border-right-width: 2px;
}
.number_section {
  flex-direction: row;
}
.title_dec {
  margin-top: 20px;
  font-size: 24px;
  color: rgb(24, 154, 206);
}
.number_dec {
  font-size: 46px;
  color: rgb(24, 154, 206);
}
.lack_dec {
  font-size: 30px;
  color: rgb(163, 163, 163);
}
.keeping_title {
  font-size: 38px;
  color: rgb(163, 163, 163);
}
</style>
<script>
import mideaCell from "../component/cell.vue";
import mideaHeader from "../midea-component/header.vue";
import mideaSwitch from "../midea-component/switch.vue";
import nativeService from "../common/services/nativeService";
import mideaButton from "../midea-component/button.vue";
import mideaProgress from "../component/progress.vue";
const modal = weex.requireModule("modal");

export default {
  components: {
    mideaSwitch,
    mideaHeader,
    mideaCell,
    mideaButton,
    mideaProgress
  },
  data() {
    return {
      mideaChecked: true,
      iconOn: "../assets/img/check/switch_on.png",
      iconOff: "../assets/img/check/switch_off.png",
      value: 22,
      uploading: false,
      progressVisible: true,
      bgColorProgressVisible: false
    };
  },
  methods: {
    goBack() {
      nativeService.goBack();
    },
    backClick() {
      nativeService.goBack();
    },
    rightImgClick() {
      var path = "settingIndex.js";
      nativeService.goTo(path);
    },
    onMideachange(event) {
      this.mideaChecked = event.value;
    },
    linkTo(which) {
      var path = which + ".js";
      nativeService.goTo(path);
    }
  },
  created() {
    //  nativeService.toast('home');
  },
  computed: {
    mBtnStyle() {
      return {
        backgroundColor: "black",
        borderRadius: "20px",
        width: "580px",
        marginTop: "100px"
      };
    }
  },
  mounted() {}
};
</script>
