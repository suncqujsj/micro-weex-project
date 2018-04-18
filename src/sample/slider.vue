<template>
   <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
        
       <midea-title-bar title="暖度:ColorTemp"></midea-title-bar>
       <midea-slider :max="100" :min="20" :value="50" :step="5" :index="1" :unit="unit"  attr="ColorTemp"  @slideEnd="slideEnd"></midea-slider>
       
       <midea-title-bar title="亮度:Level" style="margin-top:120px;"></midea-title-bar>
       <midea-slider :max="100" :min="20" :value="70" :step="1" :index="2" :unit="unit2" attr="Level"  @slideEnd="slideEnd"></midea-slider>

  </div>
</template>
<style scoped>
 .wrapper{
    background-color:#F7F7F7;
    position:relative;
 }
</style>
<script>  import base from './base'
  import mideaSlider from '@/component/slider.vue'
  import mideaTitleBar from '@/component/title-bar.vue'
  import nativeService from '@/common/services/nativeService'
  const modal = weex.requireModule('modal');
  
  module.exports = {
    components: {mideaSlider, mideaTitleBar},
    data () {
      return {
        selected:1,
        unit:'%',
        unit2:'度'
      }
    },
    methods: {
      slideEnd(event){
        nativeService.toast("滑动结束," + event.attr + ":" + event.value + ',step:' + event.step);
      }
    },
    created () {
       
    }
  };
</script>