<template>
   <midea-popup
               :show="isDiyTopShow"
               @mideaPopupOverlayClicked="popupOverlayBottomClick"
               pos="top"
               :height="maskHeight">
         <div class="demo-content">
            <div>
              <midea-title-bar title="程序" bgColor="#EEF4F7"></midea-title-bar>
              <div class="diySection">
              <midea-slider @slideEnd="slideEnd" @tipFormat="diyFormat" :max="diyMax" :min="diyMin" :value="diyData" :step="diyStep"
              :axisH="diyaxisH" :pointH="diypointH" :axisColor="axisColor" :pointColor="pointColor" :tipTxt="diyTip" ></midea-slider>
              </div>
           </div>
           <div v-if="isSetShow">
                <div>
                    <midea-title-bar title="主洗温度" bgColor="#EEF4F7"></midea-title-bar>
                    <div class="diySection">
                    <midea-slider @slideEnd="slideEnd" @tipFormat="mainTempFormat" :max="mainWashTempMax" :min="mainWashTempMin" :value="mainWashTemp" :step="tempStep"
                    :axisH="axisH" :pointH="pointH" :axisColor="axisColor" :pointColor="pointColor" :tipTxt="mainWashTempTip" ></midea-slider>
                    </div>
                </div>
                    <div>
                      <midea-title-bar title="漂洗温度" bgColor="#EEF4F7"></midea-title-bar>
                    <div class="diySection">
                    <midea-slider @slideEnd="slideEnd" @tipFormat="piaoTempFormat" :max="piaoWashTempMax" :min="piaoWashTempMin" :value="piaoWashTemp" :step="tempStep"
                    :axisH="axisH" :pointH="pointH" :axisColor="axisColor" :pointColor="pointColor" :tipTxt="piaoWashTempTip" ></midea-slider>
                    </div>
                </div>
           </div>      
         </div>
         <div class="flex_center saveBtn">
            <div class="footer_btn">
                <midea-button text="取消" :textStyle="textStyle" :btnStyle="orderBtnStyle"  @mideaButtonClicked="cancle"></midea-button>
                <midea-button text="保存设置" :textStyle="startStyle" :btnStyle="startBtnStyle" @mideaButtonClicked="save"></midea-button>
            </div>
        </div>
      </midea-popup>
</template>

<script>
import mideaButton from "../midea-component/button.vue";
import mideaPopup from "../component/popup.vue";
import mideaTitleBar from "../midea-component/title-bar.vue";
import mideaSlider from "../midea-component/slider.vue";
import nativeService from "../common/services/nativeService";
export default {
  data() {
    return {
      maskHeight: 1200,
      countMax: 6, //最大值
      countMin: 1, //最小值
      countStep: 1, //步长
      diyaxisH: 6, //轴高度(px)
      diypointH: 20, //圆球高度（px）
      axisH: 4, //轴高度(px)
      pointH: 16, //圆球高度（px）
      axisColor: "#DFE5E7", //滑条颜色
      pointColor: "#0E90FF", //圆球颜色
      showTip: true,
      countTip: "",
      diyTip: "",
      mainWashTempTip: "",
      piaoWashTempTip: "",

      diyMax: 6, //最大值
      diyMin: 1, //最小值
      diyStep: 1, //步长

      tempStep: 5,

      mainTemp: 60,
      piaoTemp: 50,

      mainWashTempMax: 65,
      mainWashTempMin: 45,

      piaoWashTempMax: 70,
      piaoWashTempMin: 50,

      isSetShow: false,
       startBtnStyle: {
        background:
          "linear-gradient(to right, rgb(33, 148, 230),rgb(20, 180, 230))",
        borderRadius: "50px",
        width: "280px",
      },
    };
  },
  props: {
    isDiyTopShow: {
      type: Boolean,
      default: false
    },
    diyData: {
      type: Number,
      default: 1
    },
    mainWashTemp: {
      type: Number,
      default: 60
    },
    piaoWashTemp: {
      type: Number,
      default: 55
    }
  },
  components: { mideaButton, mideaPopup, mideaTitleBar, mideaSlider },
  created() {
    var env = weex.config.env;
    this.maskHeight = env.deviceHeight / env.deviceWidth * 750;
  },
  methods: {
    popupOverlayBottomClick() {
      this.isDiyTopShow = false;
      return;
    },
    diyFormat(event) {
     this.diyData = event.value;
      this.diyTip = "DIY" + event.value;
      if (parseInt(event.value) > 2) {
        this.isSetShow = true;
      } else {
        this.isSetShow = false;
      }
    },
    mainTempFormat(event) {
     this.mainTemp = event.value;
      this.mainWashTempTip = event.value + "℃";
    },
    piaoTempFormat(event) {
      this.piaoTemp = event.value;
      this.piaoWashTempTip = event.value + "℃";
    },
     cancle() {
      this.isDiyTopShow = false;
      this.$emit("cancleDiy");
    },
    save() {
      this.isDiyTopShow = false;
      var obj = {"diyData":this.diyData,"mainWashTemp":this.mainTemp,"piaoWashTemp":this.piaoTemp};

      this.$emit("saveDiy", obj);
    }
  },
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
     kownBtnStyle() {
      return {
        backgroundImage:
          "linear-gradient(to right, rgb(33, 148, 230),rgb(20, 180, 230))",
        borderRadius: "50px",
        width: "560px",
        height: "90px",
        marginTop: "36px"
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
<style scoped>
.flex_center {
  flex-direction: row;
  justify-content: center;
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
.diySection {
  height: 280px;
  margin-top: -90px;
  margin-bottom: 10px;
}
.saveBtn{
    position: absolute;
    bottom: 80px;
    width: 750px;
    flex-direction: row;
    justify-content: center;
}
</style>