<template>
    <midea-seek-bar :max="max" :min="min"  :value="value" :step="step" :unit="unit"  @stopChange="slideEnd"  ></midea-seek-bar>
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
      unit: {
        type: String,
        default: '%'
      },
      
    },
    data: () => ({
    }),
    computed: {

    },
    methods: {
      slideEnd (event) {
          let value = event.value
          const { min,max,step,unit,attr,index } = this;
          this.$emit('slideEnd',{min,max,value,step,unit,attr,index})
      }
    }
  }
</script>
