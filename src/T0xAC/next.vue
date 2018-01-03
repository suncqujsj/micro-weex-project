<template>
  <div class="wrapper">
  <scroller>
     <midea-button text="返会上一页"
        type="green" @mideaButtonClicked="goBack">
      </midea-button>
      
      </scroller>
  </div>
</template>
<style scoped>
 
</style>
<script>

  import mideaButton from '../component/button.vue'
  import nativeService from '../common/services/nativeService'
  const modal = weex.requireModule('modal');
 
  
  export default {
    components: {mideaButton},
    data () {
        return{
         
        }
    },
    methods: {
      goBack(){
        nativeService.goBack();
      }

    },
    created () {
      
    }
  };
</script>