<template>
   <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
      <midea-button text="点击弹出底部面板"
        type="green" @mideaButtonClicked="show=true">
      </midea-button>

       <midea-confirm 
               :show="show"
               @mideaPopupOverlayClicked="popupOverlayBottomClick"
               :title="title" 
               :content="content"
               :leftBtnText="leftBtnText"
               :rightBtnText="rightBtnText"
               @leftBtnClick="leftBtnClick"
               @rightBtnClick="rightBtnClick">
      </midea-confirm>
  </div>
</template>
<style scoped>
 .btn-grp{
    padding-left:24px;padding-right:24px;height:72px;flex-direction:row;
    align-items:center;justify-content: space-between;background-color:#F7F7F7;
 }
 .btn-grp-text{
   color:#00B9EF;font-size:28px;
 }
</style>
<script>

  import mideaButton from '../midea-component/button.vue'
  import mideaConfirm from '../midea-component/confirm.vue'
  import nativeService from '../common/services/nativeService'
  const modal = weex.requireModule('modal');
  
  module.exports = {
    components: {mideaButton,mideaConfirm},
    data () {
        return{
          show:false,
          title: '这是标题',
          content: '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容 ',
          leftBtnText: '取消',
          rightBtnText: '确定'
        }
    },
    methods: {
      leftBtnClick () {

      },
      rightBtnClick () {

      },
      popupOverlayBottomClick(){
          this.show=false;
      },
      mideaCheckBoxListChecked(e){
         this.checkedList = e.checkedList;
      }
    },
    created () {
      //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
  };
</script>