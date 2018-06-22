<template>
<div v-if="isBoxShow" class="midea-mask">
  
     <midea-popup
               :show="isBoxShow"
               @mideaPopupOverlayClicked="popupOverlayBottomClick"
               pos="bottom"
               height="400">
         <div class="footer_section">
            <div class="flex_center">
                <text class="title">{{errorDec}}</text>
            </div>
            <div class="flex_center"  v-for="(item,i) in errorContentList">
                <text class="content">{{item}}</text>
            </div>
            <div class="btnSection flex_center" v-if="!isDoorOpen">
                <midea-button text="我知道了" :textStyle="startStyle" :btnStyle="kownBtnStyle" @mideaButtonClicked="Ikown"></midea-button>
            </div>
        </div>
      </midea-popup>
</div>
</template>

<script>
import mideaButton from "../midea-component/button.vue";
import mideaPopup from '../component/popup.vue'
import nativeService from '../common/services/nativeService';
   export default {
        props: {
            "opacity": {
                default: '0.2'
            },
            isBoxShow:{
                type:Boolean,
                default: false
            },
            isDoorOpen:{
                type:Boolean,
                default: false
            },
            errorContentList: {
                default: []
            },
            errorDec: {
                default: ''
            },
        },
        components:{mideaButton,mideaPopup},
        created(){
            var env=weex.config.env;
            this.maskHeight=env.deviceHeight / env.deviceWidth * 750;
        },
        methods:{
            popupOverlayBottomClick(){
                return;
            },
            Ikown(){
                this.$emit('clickError');
            }
        },
        computed: {
             kownBtnStyle() {
                return {
                    backgroundImage:
                    "linear-gradient(to right, rgb(33, 148, 230),rgb(20, 180, 230))",
                    borderRadius: "50px",
                    width: "560px",
                    height: "90px",
                    marginTop:"36px"
                };
                },
                startStyle() {
                return {
                    color: "#ffffff"
                };
            }
        }
    }
</script>
<style scoped>
.flex_center {
  flex-direction: row;
  justify-content: center;
}
    .midea-mask{
     position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      background-color: #000;
      opacity: 0.3;
      align-items: center;
    }
    .footer_section{
        position: fixed;
        bottom: 0px;
        width: 750px;
        height: 500px; 
        /* 这里的高度需要比popup的高 高，不然设置的border-raduis   （parker）*/
        padding-top: 40px;
        background-color: #ffffff;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }
    .title{
        color: red;
        font-size: 32px;
        margin-bottom: 10px;
    }
    .content{
        font-size: 28px;
        margin-top: 10px;
    }
    .btnSection{
        position: absolute;
        bottom: 20px;
        width: 750px;
    }
</style>