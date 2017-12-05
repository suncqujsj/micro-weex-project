<template>
   <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
      <midea-button text="打开确认面板"
        type="green" @mideaButtonClicked="openConfirmModal">
      </midea-button>

      <midea-button text="打开提示面板"
        type="green" @mideaButtonClicked="toast">
      </midea-button>

      <midea-button text="打开警告面板"
        type="green" @mideaButtonClicked="openAlertModal">
      </midea-button>
  </div>
</template>
<script>
  import mideaButton from '../component/button.vue'
  import nativeService from '../common/services/nativeService'
  module.exports = {
    components: {mideaButton},
    data () {
        
    },
    methods: {
      openConfirmModal(){
       nativeService.confirm("是否删除记录",result => {
           nativeService.toast("您选择了"+result);//result为确认或者取消
        });
      },
      toast(){
        nativeService.toast("提示信息");
      },
      openAlertModal(){
        nativeService.alert("警告信息",()=>{
           nativeService.toast("知道了");
        });
      }
    },
    created () {
      this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
  };
</script>