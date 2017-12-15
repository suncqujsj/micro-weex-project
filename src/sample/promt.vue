<template>
   <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
      <midea-button text="打开带输入框的对话框"
        type="green" @mideaButtonClicked="openRenameDialog">
      </midea-button>
      
       <midea-promt :title="nameTitle"  ref="promt" :placeholder="namePlaceholder" :inputValue="inputName" :show="show" @okClicked="confirmRename" @onPromtClose="onPromtClose" @onPromtInput="onPromtInput">
       </midea-promt>

     
  </div>
</template>
<style scoped>
 
</style>
<script>

  import mideaButton from '../component/button.vue'
  import mideaPromt from '../component/promt.vue'
  import nativeService from '../common/services/nativeService'
 
  module.exports = {
    components: {mideaButton,mideaPromt},
    data () {
      return {
        show:false,
        inputName:"",
        namePlaceholder:"请输入设备名称",
        nameTitle:"设备重命名"
      }
    },
    methods: {
      onPromtClose(val){
         this.show=false;
      },
      onPromtInput(val){
         this.inputName=val;
      },
      openRenameDialog (event) {
         this.show=true;
         //this.inputName=this.deviceDetail.devName;
      },
      confirmRename(){
         this.show=false;
         nativeService.toast("输入值："+this.inputName);
      }
    },
    created () {
      this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
  };
</script>