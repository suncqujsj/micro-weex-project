<template>
   <div v-if="show" class="container">
    <div @click="onCancled" class="mask"
            :style="{height:maskHeight+'px'}">
    </div>
    <div :style="{top:boxMarginTop+'px'}" class="operate-box">
       <div class="box-title-wrapper">
         <text class="box-title-text">{{title}}</text>
       </div>
       <div class="box-input-wrapper">
          <input  @input="onInput" :value="inputName" class="box-input" type="text" :placeholder="placeholder" />
       </div>
       <div class="box-btn-group">
          <div  @click="onOkClicked" class="box-btn-wrapper">
            <text  class="box-btn-text">确定</text>
          </div>
          <div @click="onCancled" class="box-btn-wrapper">
            <text class="box-btn-text">取消</text>
          </div>
       </div>
     </div>
  </div>
</template>

<style>
  .container{
    position:absolute;
    top:0px;
    left:0px;
  }
  .mask{
    top: 0;
    width: 750px;
    height: 1344px;
    align-items: center;
    background-color:#333;
    opacity:0.3;
    position:fixed;
    z-index:1000;
  }
  .operate-box {
    background-color: #F8F8F8;
    width: 558px;
    border-radius:10px;
    position:fixed;
    left:96px;
  }
  .box-title-wrapper{
    padding-top:30px;padding-bottom:20px
  }
  .box-title-text{
   font-size:32px;color:#333;text-align:center
  }
  .box-input-wrapper{
    padding-left:20px;padding-right:20px;padding-top:10px;padding-bottom:20px;
  }
  .box-input{
    color:#333;background-color:#FFF;height:80px;font-size:24px;
  }
  .box-btn-group{
    flex-direction:row;border-top-style:solid;border-top-width:1px;border-top-color:#e5e5e5;height:84px;
  }
  .box-btn-wrapper{
  flex-direction:row;height:84px;flex:1;align-items:center;justify-content:center;border-right-style:solid;border-right-width:1px;border-right-color:#e5e5e5;
  }
  .box-btn-text{
    text-align:center;color:#387EF5;font-size:32px
  }
  .wrapper{
    background-color:#F7F7F7;
    position:relative;
  }
</style>

<script>
//import propsync from '../common/util/propsync'
const modal = weex.requireModule('modal');
  export default {
    name: 'mideaPromt',
    //mixins: [propsync],
    props: {
        show : {
           type: Boolean
        },
        inputValue: {
           type: String
        },
        placeholder:{
           type: String
        },
        title:{
          type: String
        }
    },
    watch:{
        inputValue:function (val) {
          this.inputName=val;
        }
     },
    methods: {
      onInput: function (event) {
          this.inputName = event.value;
          this.$emit('onPromtInput',event.value);
      },
      onOkClicked(event) {
          this.$emit('okClicked',event);
      },
      onCancled(event) {
          this.$emit('onPromtClose',event);
      }
    },
    computed: {
       /*isNeedShow () {
         return this.show;
       }*/
    }, 
    data:function () {
      return {
         inputName:""
      }
    },
    created () {
       var env=weex.config.env;
       this.pageHeight=env.deviceHeight / env.deviceWidth * 750-150;
       this.maskHeight=env.deviceHeight / env.deviceWidth * 750;
       this.boxMarginTop=this.maskHeight/4; 
    }
  }
</script>

