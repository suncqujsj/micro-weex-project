<template>
  <div class="midea-progress"
       :style="progressWrapperStyle">
    <div class="progress"
         :style="progressStyle"></div>
  </div>
</template>

<style scoped>
  .midea-progress {
    position: relative;
    background-color:#DFE5EF;
    /*border-width:1px;*/
      
  }
  .progress {
    /*background-color:#01b9ee;
    background-image:linear-gradient(to right,#7ECEF4,#01b9ee);*/
   }
</style>

<script>
  export default {
    props: {
      barStartColor:{
        type: String,
        default: '#7ECEF4'
      },
      needGradient:{
        type: Boolean,
        default: true
      },
      barEndColor:{
        type: String,
        default: '#01b9ee'
      },
      barColor: {
        type: String,
        default: '#0e90ff'
      },
      barWidth: {
        type: Number,
        default: 600
      },
      barHeight: {
        type: Number,
        default: 20
      },
      value: {
        type: Number,
        default: 0
      }
    },
    computed: {
      progressWrapperStyle () {
        const { barWidth, barHeight } = this;
        return {
          width: barWidth + 'px',
          height: barHeight + 'px',
          borderRadius: barHeight/2+ 'px'
        }
      },
      progressStyle () {
        const { value, barWidth, barHeight, needGradient,barColor,barStartColor,barEndColor} = this;
        const newValue = value < 0 ? 0 : (value > 100 ? 100 : value);
        var obj={};
        if(needGradient){
          obj.backgroundImage="linear-gradient(to right,"+barStartColor+","+barEndColor+")";
        }else{
          obj.backgroundColor=barColor;
        }
        return {
          ...obj,
          borderRadius: barHeight/2+ 'px',
          height: barHeight + 'px',
          width: newValue / 100 * barWidth + 'px'
        }
      }
    }
  }
</script>
