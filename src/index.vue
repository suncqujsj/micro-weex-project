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
        { title: 'Button', link:"button" },
        { title: 'Cell', link:"cell" },
        { title: 'List', link:"list" },
        { title: 'Radio', link:"radio" },
        { title: 'RadioGroup', link:"radioGroup" },
        { title: 'CheckBox', link:"checkbox" },
        { title: 'Picker', link:"picker" },
        { title: 'Modal', link:"modal" },
        { title: 'Swiper', link:"swiper" },
        { title: 'Switch', link:"switch" },
        { title: 'Slider', link:"slider" },
        { title: 'Action Sheet', link:"actionSheet" },
        { title: 'Dialog', link:"dialog" },
        { title: 'Progress', link:"progress" },
        { title: 'Tab', link:"tab" },
        { title: 'Popup', link:"popup" },
        { title: 'Promt', link:"promt" },
        { title: 'Grid Select', link:"gridSelect" },
        { title: 'Nav List', link:"navList" }
      ]
    }),
    methods: {
      goTo(link) {
        var path="src/sample/"+link+".js";
        nativeService.goTo(path);
      }
    }
  };
</script>