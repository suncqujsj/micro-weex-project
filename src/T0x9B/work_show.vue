<template>
    <div class="wrapper">
        <midea-header title="秀一秀" :isImmersion="false"  :bgColor="bgColor" @leftImgClick="goBack"></midea-header>
        <div class="vote-div">
        	<text class="vote-text">评分</text>
            <midea-vote :styles="voteStyle" :defaulSelectd='3' @itemClicked="selected"></midea-vote>
        </div>
        <div class="grey-line"></div>
        <div style="background-color: white">
        	 <textarea 
        	 	rows=8
        	 	placeholder="写下你对菜谱的感受吧，对他人帮助很大哦~"
        	 	class="textarea" 
        	 	@input="oninput" 
        	 	@change="onchange" 
        	 	@focus="onfocus" 
        	 	@blur="onblur">
        	 </textarea>
        </div>
        <div class="add-img">
        	<image src="../img/icon/add.png" @click="showBottom" class="add-img-detail"></image>
        </div>
        <div style="margin-top:120px">
        	<midea-button text="发布" type="gray" :btn-style="btnStyle" @mideaButtonClicked="mideaButtonClicked">
       		</midea-button>
        </div>
         <midea-popup :show="isBottomShow" @mideaPopupOverlayClicked="popupOverlayBottomClick" pos="bottom" height="240">
           <div style="background-color: #f7f7f7;">
                <div class="btn-grp"><text class="btn-grp-text" @click="camera"> 拍照</text></div>
                <div class="btn-grp"><text class="btn-grp-text" @click="selectPhoto"> 从手机相册中选择</text></div>
                <div class="btn-grp" style="margin-top:20px"><text style="margin-top:25px" class="btn-grp-text" @click="cancel">取消</text></div>
            </div>
        </midea-popup>
        
    </div>
</template>
<style scoped>
.wrapper {
  position: relative;
  background-color: #f7f7f7;
  width:750px;
  height:2048px;
}
.grey-line {
	background-color: #f7f7f7;
	height:10px;
	width:750px
},
.btnStyle {
	width:200px;
	text-align: center;
},
.vote-div {
	flex-direction: row;
	background-color: white
},
.vote-text {
	margin-top:48px;
	margin-left:30px
},
.add-img {
	background-color:white;
	width:750px;
	height: 120px;
},
.add-img-detail {
	width:100px;
	height: 100px;
	margin-top:10px;
	margin-left:10px
},
.btn-grp {
	background-color: white;
	text-align: center;
	margin-top:4px;
	height:60px
},
.btn-grp-text {
  font-size: 28px;
  margin-top:10px;
  text-align: center;
},
 .textarea {
    font-size: 30px;
    width: 700px;
    margin-top:10px;
    margin-bottom: 10px;
    margin-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    color: #666666;
    border-width: 0px;
    border-style: solid;
    border-color: #41B883;
  }
</style>
<script>  
import base from '../midea-demo/base'
import mideaVote from '@/midea-component/mVote.vue'
import mideaButton from '@/midea-component/button.vue'
import mideaPopup from '@/midea-component/popup.vue'
import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal')
module.exports = {
    components: {mideaVote,mideaButton,mideaPopup },
    mixins: [base],
    data() {
        return {
            currentSelected:'',
            bgColor: '#111',
            isDisabled:true,
            isBottomShow:false,
            voteStyle: {
              box: {
                  width: '500px'
              }
          }
        }
    },
    methods: {
        goBack(){
          nativeService.goBack()
        },
        selected(event) {
            //set selected index to local field
            this.currentSelected = event.selected;
        },
        oninput (event) {
	        console.log('oninput:', event.value)
	        // modal.toast({
	        //   message: `oninput: ${event.value}`,
	        //   duration: 0.8
	        // })
	      },
	      onchange (event) {
	        console.log('onchange:', event.value)
	        // modal.toast({
	        //   message: `onchange: ${event.value}`,
	        //   duration: 0.8
	        // })
	      },
	      onfocus (event) {
	        console.log('onfocus:', event.value)
	        // modal.toast({
	        //   message: `onfocus: ${event.value}`,
	        //   duration: 0.8
	        // })
	      },
	      onblur (event) {
	        console.log('onblur:', event.value)
	        // modal.toast({
	        //   message: `input blur: ${event.value}`,
	        //   duration: 0.8
	        // })
     	 },
     	 mideaButtonClicked() {
            nativeService.toast("button clicked");
       },
       showBottom() {
       	this.isBottomShow = true;
       },
       popupOverlayBottomClick() {
       	this.isBottomShow = false;
       }
    },
    computed: {
      btnStyle () {
      	const { width, height} = this;
        const customStyle = {};

        customStyle.width = "300px";
        customStyle.height = "60px";
        
        return customStyle;
      }
    },
    created() {
        //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
};
</script>