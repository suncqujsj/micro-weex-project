<template>
  <midea-cell :has-top-border="hasTopBorder"
            :hasBottomBorder="hasBottomBorder"
            :itemImg="itemImg"
            @mideaCellClick="mideaCellClick">
    <image :src="checkIcon"
           slot="value"
           class="checkbox"></image>
    <text :style="{color:color}"
          class="title-text"
          slot="title">{{title}}</text>
  </midea-cell>
</template>

<style scoped>
  .checkbox {
    width: 32px;
    height: 32px;
  }
  .title-text{
    font-size: 30px;
    text-align: center;
  }
</style>

<script>
  import mideaCell from './cell.vue';
  const modal = weex.requireModule('modal');
  //to be changed
  var CHECKED="../img/check/public_ic_done@2x.png";
  var UNCHECKED="../img/check/unchecked.png";
  var CHECKED_DISABLED="../img/check/dischecked.png";
  var UNCHECKED_DISABLED="../img/check/disuncheked.png"
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
      icon: [CHECKED, UNCHECKED, CHECKED_DISABLED, UNCHECKED_DISABLED],
      color: '#3D3D3D',
      innerChecked: false
    }),
    computed: {
      checkIcon () {
        const { icon, disabled, innerChecked } = this;
        if (disabled) {
          return icon[innerChecked ? 2 : 3];
        } else {
          return icon[innerChecked ? 0 : 1];
        }
      }
    },
    created () {
      const { checked, disabled } = this;
      this.innerChecked = checked;
      this.color = checked && !disabled ? '#267aff' : '#3D3D3D';
    },
    methods: {
      mideaCellClick () {
        const { disabled, innerChecked, value } = this;
        if (!disabled) {
          this.innerChecked = !innerChecked;
          this.color = (this.innerChecked ? '#267aff' : '#3D3D3D');
          this.$emit('mideaCheckBoxItemChecked', { value, checked: this.innerChecked })
        }
      }
    }
  }
</script>
