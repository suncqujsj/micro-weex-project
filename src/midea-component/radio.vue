<template>
  <div
        :class="['midea-cell','active-cell', hasTopBorder && 'cell-top-border', hasBottomBorder && 'cell-bottom-border']"
        @click="mideaCellClick"
    >
        <image
            v-if="itemImg&&itemImg!=''"
            :src="itemImg"
            class="item-img"
        >
        </image>
        <div class="cell-title">
            <text
                :style="{color:color}"
                class="title-text"
                slot="title"
            >{{title}}</text>
        </div>
        <image
            :src="radioIcon"
            v-if="radioIcon"
            class="radio"
        ></image>
    </div>
</template>

<style scoped>
  .radio {
    width: 32px;
    height: 32px;
  }

  .title-text {
    font-size: 30px;
  }

  .midea-cell {
    height: 108px;
    position: relative;
    flex-direction: row;
    align-items: center;
    padding-left: 32px;
    padding-right: 32px;
    background-color: #ffffff;
}

.active-cell:active {
    background-color: #f5f5f5;
}

.cell-title {
    flex: 1;
}

.cell-top-border {
    border-top-color: #e2e2e2;
    border-top-width: 1px;
}

.cell-bottom-border {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #e2e2e2;
}
</style>

<script>
  import mideaCell from './cell.vue';
  var CHECKED="./img/check/public_ic_done@2x.png";
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
