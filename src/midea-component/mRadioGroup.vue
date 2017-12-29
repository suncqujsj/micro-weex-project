<template>
    <div class="midea-radiogroup">
        <midea-mask v-if="show" @click="layoutClick"></midea-mask>
        <div v-if="show" class="midea-radiogroup-box" :style="{'bottom': '-'+height+'px'}" ref="radiogroupBox">
            <div class="midea-radiogroup-top">
                <text class="btn-grp-text" @click="cancelClick">取消</text>
                <text class="midea-radiogroup-title">{{title}}</text>
            </div>
            <scroller class="midea-radiogroup-content" :style="{'height': (height - 28)+'px'}" show-scrollbar="false">
                <div class="midea-radiogroup-item-wrapper" :style="{'min-height': (height - 28)+'px'}">
                    <div class="midea-radiogroup-item" v-for="(item,i) in items" :key="i" :ref="'item'+i" v-on:click="radiogroupItemClick(item,i,item[keyField])">
                        <div class="icon-wrapper">
                            <image v-if="index==i" class="item-icon" :src="radioIcon"></image>
                        </div>
                        <text class="item-text" :style="{color: color(item,i)}">{{display(item)}}</text>
                    </div>
                </div>
            </scroller>
        </div>
    </div>
</template>

<script>
import mideaMask from "../component/mask.vue";
import mideaCell from "../component/cell.vue";
const CHECKED = "../img/check/radio_checked.png";
const dom = weex.requireModule("dom");
const animation = weex.requireModule("animation");
export default {
    components: {
        mideaMask,
        mideaCell
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: "请选择"
        },
        items: {
            type: Array
        },
        index: {
            type: [String, Number],
            default: null
        },
        keyField: {
            type: String,
            default: "key"
        },
        valueField: {
            type: [String, Array],
            default: "value"
        },
        button: {
            type: String,
            default: "取消"
        },
        rows: {
            type: Number,
            default: 5
        },
        hideOnMask: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        height: function () {
            let rows = this.rows > 8 ? 8 : this.rows
            rows = rows < 2 ? 2 : rows
            var len = rows * 92 + 88;
            return len;
        },
        radioIcon() {
            return CHECKED;
        }
    },
    watch: {
        show(value) {
            if (value) {
                this.$nextTick(e => {
                    if (this.index && this.index >= 0) {
                        var elName = "item" + this.index;
                        var el = this.$refs[elName][0];
                        //滚动至选中值，并调整至中间
                        dom.scrollToElement(el, { offset: - this.height / 2 + 46 + 15 });
                    }
                    this.open();
                });
            }
        }
    },
    methods: {
        color(item, i) {
            return item.disabled ? '#b4b6cb' : (this.index == i ? '#0e90ff' : '#020f13')
        },
        display(item) {
            let result = ""
            if (typeof (this.valueField) == "string") {
                result = item[this.valueField]
            } else if (Array.isArray(this.valueField)) {
                for (let index = 0; index < this.valueField.length; index++) {
                    const field = this.valueField[index];
                    result += item[field] || field || ""
                }
            }
            return result
        },
        animationFn: function (el, translate, timing, fn) {
            animation.transition(
                el,
                {
                    styles: {
                        transform: translate,
                        transformOrigin: "center center"
                    },
                    duration: 200, //ms
                    timingFunction: timing,
                    delay: 0 //ms
                },
                function () {
                    fn && fn();
                }
            );
        },
        //打开上拉菜单
        open: function () {
            var _this = this;
            var el = _this.$refs.radiogroupBox;
            var translate = "translate(0px, -" + _this.height + "px, 0px)";
            _this.animationFn(el, translate, "ease-in");
        },
        //点击mask遮罩层
        layoutClick: function () {
            if (!this.hideOnMask) return;

            var _this = this;
            var el = this.$refs.radiogroupBox;
            var translate = "translate(0px, " + _this.height + "px, 0px)";
            _this.animationFn(el, translate, "ease-in", function () {
                _this.show = false;
                _this.$emit("close");
            });
        },
        //点击取消
        cancelClick: function () {
            var _this = this;
            var el = this.$refs.radiogroupBox;
            var translate = "translate(0px, " + _this.height + "px, 0px)";
            _this.animationFn(el, translate, "ease-in", function () {
                _this.show = false;
                _this.$emit("close");
            });
        },
        //菜单项点击事件
        radiogroupItemClick: function (item, index, key) {
            if (item.disabled) return

            var _this = this;
            var el = this.$refs.radiogroupBox;
            var translate = "translate(0px, " + _this.height + "px, 0px)";
            _this.animationFn(el, translate, "ease-in", function () {
                _this.show = false;
                _this.$emit("itemClick", { item, index, key });
                _this.$emit("close");
            });
        }
    }
};
</script>

<style scoped>
.midea-radiogroup-box {
  position: fixed;
  left: 0px;
  right: 0px;
  flex-direction: column;
  overflow: hidden;
}

.midea-radiogroup-top {
  flex-direction: row;
  align-items: center;
  background-color: #ede7ef;
  height: 88px;
  overflow: hidden;
  padding-right: 20px;
}
.btn-grp-text {
  width: 100px;
  font-size: 28px;
  line-height: 88px;
  color: #020f13;
  text-align: left;
  padding-left: 20px;
}
.btn-grp-text:active {
  background-color: #9fa0a0;
}
.midea-radiogroup-title {
  width: 550px;
  font-size: 36px;
  line-height: 36px;
  color: #020f13;
  text-align: center;
}

.midea-radiogroup-content {
  background-color: #fff;
}
.midea-radiogroup-item-wrapper {
  height: auto;
  padding-top: 30px;
  padding-bottom: 30px;
}
.midea-radiogroup-item {
  flex-direction: row;
  align-items: center;
  min-height: 92px;
  padding-right: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
}
.midea-radiogroup-item:active {
  background-color: #f5f5f5;
}
.icon-wrapper {
  height: 25px;
  width: 100px;
  text-align: left;
  padding-left: 20px;
}
.item-icon {
  height: 25px;
  width: 25px;
}
.item-text {
  width: 550px;
  font-size: 32px;
  line-height: 36px;
  text-align: center;
}
</style>