<style lang="less" type="text/less">
  .recipe-bottom-bar{
    position: fixed;
    bottom: -2px;
    left: 0px;
  }
</style>
<template>
    <div class="recipe-bottom-bar">
      <midea-tab ref="mTab" :tabArray="tabData" @tabClicked="tabClicked">
      </midea-tab>
    </div>
</template>

<script>
  import mideaTab from '@/midea-component/mTab.vue'
  export default {
    props:{
       tabClickHandle: {
            type: Function,
            default: ()=>{}
        }
    },
    data () {
    
      return {
         tabData:[
            {"name":"菜谱","selected":true},
            {"name":"mike","selected":false},
            {"name":"我的","selected":false},
          ]
      }
    },
    components:{mideaTab},
    methods: {
     tabClicked(e){
       for(var i=0; i< this.tabData.length; i++){
         if(e==i){
            this.$emit("tabClickHandle",i);
         }
       }
     }
    }
  }
</script>