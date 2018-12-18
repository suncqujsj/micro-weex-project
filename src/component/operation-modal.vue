<template>
  <div ref="container" v-if="show" class="container">
    <midea-mask @click="layoutClick"></midea-mask>
    <div class="operate-box">
       <div @click="onDelete" class="operate-box-item">
          <text class="operate-box-item-text">{{delTitle}}</text>
       </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    width: 750px;
  }

  .operate-box {
    background-color: #FFFFFF;
    width: 558px;
    position:fixed;
    left:96px;
    z-index:100;
    top:400px;
  }
  .operate-box-item{
     padding:36px;
     text-align:center;
  }
  .operate-box-item-text{
     color:#333333;
     font-size:36px;
  }
</style>

<script>
  import  mideaMask from './mask.vue'
  import nativeService from '../common/services/nativeService'
  const dom= weex.requireModule('dom');
  module.exports = {
    components: { mideaMask },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      delTitle: {
        type: String,
        default: '删除'
      }
    },
    data: () => ({
      
    }),
    created () {
      var self=this;
      /* setTimeout(function(){
          self.checkDomHeight();
       },300);*/

    },
    methods: {
      onDelete(){
        this.$emit('onDelete', {});
      },
      layoutClick(){
        this.$emit('close', {});
      }
    }
  };
</script>
