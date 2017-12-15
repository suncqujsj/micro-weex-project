<template>
<div class="wrapper">  
    <midea-title-bar title="触发条件" linkTxt="添加场景" @mideaLinkClick="addScene" padding="26"></midea-title-bar>
</div>


</template>

<style>

</style>
<script>
  import getDeviceStatus from '../dummy/getDeviceStatus'
  import operateDevice from '../dummy/operateDevice'
  import updateNode from '../dummy/updateNode'
  import getSwitchBoundDevice from '../dummy/getSwitchBoundDevice'
  import nativeService from '../common/services/nativeService'
  import config from '../common/config/configMapping'
  import mideaPromt from '../component/promt.vue'
  import mideaButton from '../component/button.vue'
  import mideaCell from '../component/cell.vue'
  import mideaTitleBar from '../component/title-bar.vue'


  const modal = weex.requireModule('modal');
  const globalEvent = weex.requireModule('globalEvent');
  export default {
    components: { mideaTitleBar},
    data () {
      return {
       } 
    },
    methods:{
      addScene(){
         nativeService.alert('sss');
      }
    },
    created () {
    
    },
    mounted: function () {
    

    }
  }
</script>