<template>
  <div>
    <midea-image-slider :sliderStyle="{height:'750px'}" imgHeight="750px" :items="items" @change="onchange">
    </midea-image-slider>
  </div>
</template>
<style>
</style>
<script>  import base from '../base'
  import mideaImageSlider from '@/component/image-slider.vue'
  import nativeService from '@/common/services/nativeService'
  export default {
    components: {mideaImageSlider},
    data () {
      return {
        items: [
          { title: 'item A', url: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
          { title: 'item B', url: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
          { title: 'item C', url: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'}
        ]
      }
    },
    methods: {
      onchange (event) {
        console.log('changed:', event.index)
      }
    },
    created () {
      this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
  }
</script>