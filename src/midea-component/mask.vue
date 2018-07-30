<template>
    <div class="midea-mask" :style="{'opacity': opacity,height:maskHeight+'px'}" @click="_click"></div>
</template>

<script>
   export default {
        props: {
            "opacity": {
                default: '0.6'
            }
        },
        methods: {
            "_click": function () {
                this.$emit("click");
            }
        },
        created(){
            var env=weex.config.env;
            this.maskHeight=env.deviceHeight / env.deviceWidth * 750;
        }
    }
</script>
<style scoped>
    .midea-mask{
      position: fixed;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      background-color: #000;
      opacity: 0.6;
      align-items: center;
    }
</style>