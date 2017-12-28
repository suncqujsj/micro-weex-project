<template>
  <div class="wrapper" ref="wrapper">
  <list show-scrollbar="false">
     <midea-cell :clickActivied="true" v-for="item in list" 
                :title="item.title"
                height="120"
                :has-arrow="true"
                @mideaCellClick="goTo(item.link)"
               >
     </midea-cell>
  </list>
     
    </div>
</template>
<style scoped>
 
</style>
<script>

  import mideaCell from '../component/item.vue';
  import nativeService from '../common/services/nativeService'
  const modal = weex.requireModule('modal');
  
  module.exports = {
    components: {mideaCell},
    data: () => ({
      list: [
        { title: 'slider', link:"slider" },
        { title: 'switch', link:"switch" },
        { title: 'refresh', link:"refresh" },
         { title: 'loading', link:"loading" },
        { title: 'picker', link:"picker" },
          { title: 'cell', link:"cell" },
      ]
    }),
    methods: {
      goTo(link) {
        var path="midea-sample/"+link+".js";
        nativeService.goTo(path);
      }
    }
  };
</script>