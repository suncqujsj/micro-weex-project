<template>
  <div ref="container" v-if="show" class="container">
    <midea-mask @click="layoutClick"></midea-mask>
    <div class="content">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <slot name="content">123</slot>
    </div>
  </div>
</template>

<style lang="less" type="text/less" scoped>
  @import (reference) "../../../common/less/common";
  .container {
    width: 750px;
    align-items: center;
    justify-content: center;
  }

  .content{
    width: 750px;
    .pos(f);
    top:0;
    left: 0;
    z-index:1;
  }

  .header{
    width: 750px;
    .pos(f);
    left: 0;
    top: 0;
    z-index:2;
  }
</style>
f
<script>
  //const icon = require('./icon.base64.js');
  import  mideaMask from '@/midea-component/mask.vue'
  const dom= weex.requireModule('dom');
  module.exports = {
    components: { mideaMask },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      
    }),
    created () {
      //var self=this;
      /* setTimeout(function(){
          self.checkDomHeight();
       },300);*/
      var env=weex.config.env;
      this.maskHeight=env.deviceHeight / env.deviceWidth * 750;
    },
    methods: {
      layoutClick(){
         this.$emit('close', {});
      }
      
    }
  };
</script>
