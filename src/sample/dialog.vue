<template>
   <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
      <midea-button text="打开对话框"
        type="green" @mideaButtonClicked="openDialog">
      </midea-button>

      <midea-button text="仅带确认按钮对话框"
        type="green" @mideaButtonClicked="openSingleDialog">
      </midea-button>

      <midea-dialog title="使用协议"
                :show="show"
                @close="closeDialog"
                @mideaDialogCancelBtnClicked="mideaDialogConfirmBtnClicked"
                @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked"
                content="美的智慧生活解决方案"
                :single="single"
                >
      </midea-dialog>
     
  </div>
</template>
<style scoped>
 .wrapper{
    align-items: center;
  }
</style>
<script>

  import mideaButton from '../component/button.vue'
  import mideaDialog from '../component/dialog.vue';
  import nativeService from '../common/services/nativeService'
  const modal = weex.requireModule('modal');
  
  module.exports = {
    components: {mideaButton,mideaDialog},
    data () {
        return {
          show: false,
          single: false
        }
    },
    methods: {
      openDialog(){
         this.single=false;
         this.show=true;
      },
      openSingleDialog(){
         this.single=true;
         this.show=true;
      },
      mideaDialogConfirmBtnClicked(){
         this.show=false;
      },
      mideaDialogConfirmBtnClicked(){
         this.show=false;
      },
      closeDialog(){
         this.show=false; 
      } 
    },
    created () {
      this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
  };
</script>