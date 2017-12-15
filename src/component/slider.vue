<template>
  <div>
    <midea-seek-bar :max="max" :min="min"  :value="value" :step="step" :index="index" :attr="attr" @stopChange="slideEnd"  ></midea-seek-bar>
  </div>
</template>
<style scoped>
</style>
<script>
  export default {
    components: { },
    props: {
      max: {
        type: String,
        default: '100'
      },
      min: {
        type: String,
        default: '0'
      },
      value: {
        type: String,
        default: '50'
      },
      step: {
        type: String,
        default: '1'
      },
      index: {
        type: String,
        default: '0'
      },
      attr: {
        type: String,
        default: 'level'
      },
      
    },
    data: () => ({
    }),
    computed: {

    },
    methods: {
      slideEnd (event) {
          let value = event.value
          const { min,max,step,index, attr } = this;
          this.$emit('slideEnd',{min,max,value,step,index, attr})
      }
    }
  }
</script>
