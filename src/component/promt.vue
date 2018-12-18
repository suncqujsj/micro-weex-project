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
          <div @click="onCancled" class="box-btn-wrapper btn-border-r">
            <text class="box-btn-text" :style="{color: cancelColor}">取消</text>
          </div>
          <div  @click="onOkClicked" class="box-btn-wrapper">
            <text  class="box-btn-text" :style="{color: cancelColor}">确定</text>
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
    background-color:#333333;
    opacity:0.3;
    position:fixed;
    z-index:1000;
  }
  .operate-box {
    background-color: rgba(255, 255, 255, 0.9);
    width: 540px;
    border-radius:26px;
    position:fixed;
    left:105px;
  }
  .box-title-wrapper{
    padding-top:30px;padding-bottom:20px
  }
  .box-title-text{
   font-family: PingFangSC-Medium;font-size:32px;color:#000000;text-align:center
  }
  .box-input-wrapper{
    padding-left:32px;padding-right:32px;padding-top:10px;padding-bottom:24px;
  }
  .box-input{
    border-width: 1px;
    border-style: solid;
    border-color: #9F9F9F;
    color:#333333;
    background-color:#FFFFFF;
    height: 48px;
    font-size:24px;
    padding-left: 16px;
  }
  .box-btn-group{
    flex-direction:row;border-top-style:solid;border-top-width:1px;border-top-color:#e5e5e5;height:84px;overflow-x: hidden; overflow-y: hidden;
  }
  .box-btn-wrapper{
  flex-direction:row;height:84px;flex:1;align-items:center;justify-content:center;
  }
  .btn-border-r {
    border-right-style:solid;border-right-width:1px;border-right-color:#e5e5e5;
  }
  .box-btn-text{
    text-align:center;font-family:PingFangSC-Regular;font-size:32px
  }
  .cancel-text {
    color: #666666;
  }
  .confirm-text {
    color: #000000;
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
        },
        cancelColor: {
          type: String,
          default: '#267aff'
        },
        confirmColor: {
          type: String,
          default: '#267aff'
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

