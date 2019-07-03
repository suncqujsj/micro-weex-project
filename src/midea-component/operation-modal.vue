<template>
  <div ref="container" v-if="show" class="container">
    <midea-mask @click="layoutClick"></midea-mask>
    <div class="operate-wrapper" :style="{height:pageHeight+'px'}">
      <div class="operate-box">
        <div @click="onDelete" class="operate-box-item">
            <text class="operate-box-item-text">{{delTitle}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    width: 750px;
    align-items: center;
    justify-content: center;
  }

  .operate-wrapper {
    position: fixed;
    top: 0px;
    width: 750px;
    align-items: center;
    justify-content: center;
  }

  .operate-box {
    background-color: #FFFFFF;
    width: 558px;
    z-index:100;
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
      var env = weex.config.env;
      this.pageHeight = env.deviceHeight / env.deviceWidth * 750;
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
