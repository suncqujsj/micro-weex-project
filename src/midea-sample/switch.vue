<template>
   <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
   
      <midea-cell title="Midea切换按钮">
         <midea-switch2 :checked="mideaChecked"  @change="onMideachange" :width="70" :height="38"  slot="value"></midea-switch2>
      </midea-cell>
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
  import mideaCell from '../component/cell.vue'
  import mideaSwitch2 from '../midea-component/switch.vue'
  import nativeService from '../common/services/nativeService'
  const modal = weex.requireModule('modal');
  
  module.exports = {
    components: {mideaSwitch2,mideaCell},
    data () {
      return {
        checked: true,
        mideaChecked: true,
        iconOn: '../img/check/switch_on.png',
        iconOff: '../img/check/switch_off.png'
      }
    },
    methods: {

      onchange (event) {
        this.checked = event.value;
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