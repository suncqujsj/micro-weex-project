<template>
<div class="btn-wrapper">
   <div class="midea-btn" :class="[type]"
       :style="defaultBtnStyle"
       @click="onClicked">
    <text class="btn-text"
          :style="defaultTextStyle">{{text}}</text>
   </div>
</div>
</template>

<script>
  import { STYLE_MAP, TEXT_STYLE_MAP } from './setting/btnType'
  export default {
    props: {
      text: {
        type: String,
        default: '确认'
      },
      type: {
        type: String,
        default: 'green'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      btnStyle: Object,
      textStyle: Object
    },
    computed: {
      defaultBtnStyle () {
        const { type, disabled, btnStyle } = this;
        const defaultBtnStyle = {
          ...STYLE_MAP[type],
          ...btnStyle
        };
        return disabled ? {
          ...defaultBtnStyle,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 0
        } : defaultBtnStyle;
      },
      defaultTextStyle () {
        const { type, disabled, textStyle } = this;
        const defaultTextStyle = { ...TEXT_STYLE_MAP[type], ...textStyle };
        return disabled ? { ...defaultTextStyle, color: '#FFFFFF' } : defaultTextStyle;
      }
    },
    methods: {
      onClicked (e) {
        const { type, disabled } = this;
        this.$emit('mideaButtonClicked', { e, type, disabled })
      }
    }
  }
</script>

<style scoped>
  .btn-wrapper{
    margin-top:20px;
    margin-bottom:20px;
  }
  .midea-btn {
    width: 702px;
    height: 84px;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
  }
 .btn-text {
    text-overflow: ellipsis;
    lines: 1;
    font-size: 32px;
    color: #FFFFFF;
  }
 .btn-wrapper{
    align-items: center;
 }
 .green:active {
    background-color:#00A9EF;
 }
 .delete:active {
    background-color:#EB6560;
 }
 .refresh:active {
    background-color:#9FA0A0;
 }
 .gray:active {
    background-color:#eeeeee;
 }
 .disabled:active{
    background-color:rgba(0, 0, 0, 0.1);
 }

</style>
