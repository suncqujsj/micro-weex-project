<template>
   <div class="wrapper">
    <div style="padding:24px;">
        <text style="font-size:28px">两边对齐，默认高度</text>
    </div>
    <div class="container">
         <midea-nav-list
          :list="navList"
          type="spaceBetween"
          :cols="3"
           @itemClicked="itemClicked"
         >
         </midea-nav-list>
    </div>
     <div style="padding:24px;">
        <text style="font-size:28px">居中，自定义高度</text>
     </div>
     <div class="container">
         <midea-nav-list
          :list="navList"
          :cols="3"
          height="200"
          @itemClicked="itemClicked"
         >
         </midea-nav-list>
     </div>
  </div>
</template>
<style scoped>
  .wrapper{
     background-color:#f7f7f7
  }
  .container{
     padding-left:24px;
     padding-right:24px;
     background-color:#FFF;
  }
</style>
<script>  import base from './base'

  import mideaNavList from '@/component/navList.vue'
  import nativeService from '@/common/services/nativeService'
  const modal = weex.requireModule('modal');
  
  module.exports = {

    components: {mideaNavList},
    data () {
      return {
         navList:[
         {
           "title":"QQ",
           "img":"../img/share/qq.png"
         },
         {
           "title":"微信",
           "img":"../img/share/wechat.png"
         },
         {
           "title":"短信",
           "img":"../img/share/messege.png"
         },
         {
           "title":"电话",
           "img":"../img/share/qq.png"
         },
         {
           "title":"QQ",
           "img":"../img/share/qq.png" 
         }
       ],
       cols:3
      // type:'spaceBetween'//spaceBetween or center
      }
    },
    methods: {
       itemClicked(index){
           nativeService.toast("行"+index+"被点中")
       }
    },
    created () {
      this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
  };
</script>