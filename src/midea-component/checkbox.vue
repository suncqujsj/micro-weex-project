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
            :src="checkIcon"
            slot="value"
            class="checkbox"
        ></image>
    </div>
</template>

<style scoped>
.checkbox {
    width: 32px;
    height: 32px;
}
.title-text {
    font-size: 30px;
    text-align: center;
}

.item-img {
    width: 80px;
    height: 80px;
    margin-right: 24px;
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
<<<<<<< HEAD
  import mideaCell from './cell.vue';
  const modal = weex.requireModule('modal');
  //to be changed
  var CHECKED="./img/check/public_ic_done@2x.png";
  var UNCHECKED="./img/check/unchecked.png";
  var CHECKED_DISABLED="./img/check/dischecked.png";
  var UNCHECKED_DISABLED="./img/check/disuncheked.png"
  export default {
=======
import mideaCell from './cell.vue';
const modal = weex.requireModule('modal');
//to be changed
var CHECKED = "./img/check/public_ic_done@2x.png";
var UNCHECKED = "./img/check/unchecked.png";
var CHECKED_DISABLED = "./img/check/dischecked.png";
var UNCHECKED_DISABLED = "./img/check/disuncheked.png"
export default {
>>>>>>> 8448141f304123a0a56f912431e28726a100840a
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
        checkIcon() {
            const { icon, disabled, innerChecked } = this;
            if (disabled) {
                return icon[innerChecked ? 2 : 3];
            } else {
                return icon[innerChecked ? 0 : 1];
            }
        }
    },
    created() {
        const { checked, disabled } = this;
        this.innerChecked = checked;
        this.color = checked && !disabled ? '#267aff' : '#3D3D3D';
    },
    methods: {
        mideaCellClick() {
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
