<template>
   <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
     <midea-title-bar title="切换按钮"></midea-title-bar>
     <midea-cell title="Weex自带切换按钮"
                hasTopBorder="true"
                >
            <switch :checked="checked" @change="onchange" slot="value"> </switch>
      </midea-cell>
      <midea-cell title="Midea切换按钮">
         <midea-switch :checked="mideaChecked"  @change="onMideachange" slot="value"></midea-switch>
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
  import mideaTitleBar from '../component/title-bar.vue'
  import nativeService from '../common/services/nativeService'
  const modal = weex.requireModule('modal');
  
  module.exports = {
    components: {mideaCell,mideaTitleBar},
    data () {
      return {
        checked: true,
        mideaChecked:false
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