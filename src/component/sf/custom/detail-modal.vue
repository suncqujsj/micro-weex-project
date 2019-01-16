<template>
  <div ref="container" v-if="show" class="container">
    <midea-mask @click="layoutClick"></midea-mask>
    <div ref="dialog" class="dialog-box" :style="{top:dialogTop+'px'}">
      <div class="dialog-content">
        <slot name="title">
          <text v-if="title" class="content-title">{{title}}</text>
        </slot>
        <slot name="content">
          <text v-if="content" class="content-subtext">{{content}}</text>
        </slot>
      </div>
    </div>
  </div>
</template>

<style type="text/less" lang="less">
  @import "../../../common/less/component/sf-modal.less";
</style>

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
      },
      working: {
          type: Boolean,
          default: false
      },
      single: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      mainBtnColor: {
        type: String,
        default: '#00B9EF'
      },
      secondBtnColor: {
        type: String,
        default: '#666666'
      },
      showNoPrompt: {
        type: Boolean,
        default: true
      },
      noPromptText: {
        type: String,
        default: '不再提示'
      },
      isChecked: {
        type: Boolean,
        default: false
      },
      maskBgColor: {
        type: String,
        default: 'rgba(0,0,0,0.6)'
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
      this.dialogTop= (this.maskHeight-300)/2-150;
    },
    methods: {
      checkDomHeight(){
          var self=this;
          var wrapper=self.$refs.container;
          var dialog=self.$refs.dialog;
          dom.getComponentRect(wrapper, function(result){
              //nativeService.toast(result);
              var size=result.size||{};
              self.wrapperHeight=size.height;
              dom.getComponentRect(dialog, function(result){
                    var size=result.size||{};
                    self.dialogHeight=size.height;
                    //weex.requireModule('modal').toast({"message":"3223",duration:5})
                    self.boxMarginTop=(self.wrapperHeight- self.dialogHeight)/2; 
              });
          });
      },
      noPromptClicked (e) {
        const isChecked = !this.isChecked;
        this.noPromptIcon = isChecked ? icon.checked : icon.unChecked;
        this.$emit('mideaDialogNoPromptClicked', { isChecked });
      },
      layoutClick(){
         this.$emit('close', {});
      }
      
    }
  };
</script>
