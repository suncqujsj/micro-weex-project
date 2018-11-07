<template>
  <midea-cell :has-top-border="hasTopBorder"
            :hasBottomBorder="hasBottomBorder"
            :itemImg="itemImg"
            v-on:mideaCellClick="mideaCellClick">
    <text :style="{color:color}"
          class="title-text"
          slot="title">{{title}}</text>
    <image :src="radioIcon"
           v-if="radioIcon"
           slot="value"
           class="radio"></image>
  </midea-cell>
</template>

<style scoped>
  .radio {
    width: 32px;
    height: 32px;
  }

  .title-text {
    font-size: 30px;
  }
</style>

<script>
  import mideaCell from './cell.vue';
  var CHECKED="../img/check/public_ic_done@2x.png";
  //import { CHECKED, UNCHECKED } from './icon.base64.js'
  export default {
    components: { mideaCell },
    props: {
      hasTopBorder: {
        type: Boolean,
        default: false
      },
      hasBottomBorder: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        require: true
      },
      value: {
        type: [String, Number, Object],
        require: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      checked: {
        type: Boolean,
        default: false
      },
      itemImg: {
        type: String,
        default: ''
      }
    },
    data: () => ({
     // icon: [CHECKED, UNCHECKED]
    }),
    computed: {
      radioIcon () {
        const { icon, disabled, checked } = this;
        return checked ? CHECKED : '';
      },
      backgroundColor () {
        const { disabled } = this;
        return disabled ? '#F2F3F4' : '#FFFFFF';
      },
      color () {
        const { disabled, checked } = this;
        return checked && !disabled ? '#267aff' : '#3D3D3D';
      }
    },
    methods: {
      mideaCellClick () {
        const { disabled, value } = this;
        if (!disabled) {
          this.$emit('mideaRadioItemChecked', { value, disabled })
        }
      }
    }
  }
</script>
