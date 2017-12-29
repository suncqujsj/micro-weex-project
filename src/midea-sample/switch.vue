<template>
   <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
       <midea-switch :checked="true" :iconOn="iconOn" :iconOff="iconOff"  ></midea-switch>
  </div>
</template>
<style scoped>
 .link-text{
   color:#333;
   font-size:24px;
 }
 .wrapper{
   background-color:#F7F7F7;
    position:relative;
 }
</style>
<script>
  import mideaSwitch from '../midea-component/switch.vue'
  import nativeService from '../common/services/nativeService'
  const modal = weex.requireModule('modal');
  
  module.exports = {
    components: {mideaSwitch},
    data () {
      return {
        checked: true,
        iconOn: '../img/test.png',
        iconOff: '../img/switch_off.png'
      }
    },
    methods: {
      onchange (event) {
        this.checked = event.value;
        //nativeService.toast(this.checked);
      },
      onMideachange(event) {
        this.mideaChecked = event.value;
        //nativeService.toast(this.checked);
      },
    },
    created () {
      this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
  };
</script>