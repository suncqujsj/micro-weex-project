<template>
 <div class="dual-btn-wrapper">
    <midea-button :text="leftBtnText" 
          :type="leftBtnType" 
          :btnStyle="defaultLeftBtnStyle"
          :textStyle="leftTextStyle"
          @mideaButtonClicked="onLeftBtnClicked">
    </midea-button> 

    <midea-button :text="rightBtnText"
          :type="rightBtnType"
          :textStyle="rightTextStyle"
          :btnStyle="defaultRightBtnStyle"
          @mideaButtonClicked="onRightBtnClicked">
    </midea-button> 
 </div>
</template>

<script>
  import  mideaButton from './button.vue'
  export default {
    components: { mideaButton },
    props: {
      leftBtnText: {
        type: String,
        default: ''
      },
      rightBtnText: {
        type: String,
        default: ''
      },
      leftBtnType: {
        type: String,
        default: 'green'
      },
      rightBtnType: {
        type: String,
        default: 'green'
      },
      leftBtnStyle: Object,
      rightBtnStyle: Object,
      leftTextStyle: Object,
      rightTextStyle:Object
    },
    computed: {
      defaultLeftBtnStyle () {
        return {
           width:'374px',
           ...this.leftBtnStyle
        }
      },
      defaultRightBtnStyle () {
        return {
          ...this.rightBtnStyle,
          width:'375px'
        }
      }
    },
    methods: {
      onLeftBtnClicked (e) {
        const { type} = this;
        this.$emit('leftBtnClicked', { e, type})
      },
      onRightBtnClicked (e) {
        const { type } = this;
        this.$emit('rightBtnClicked', { e, type})
      }
    }
  }
</script>

<style scoped>
 .dual-btn-wrapper{
   flex-direction:row;
   align-items:center;
   justify-content:space-between;
 }

</style>
