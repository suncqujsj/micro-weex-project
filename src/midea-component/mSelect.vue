<template>
    <div class="midea-radiogroup">
        <midea-mask v-if="show" @click="layoutClick"></midea-mask>
        <div v-if="show" class="midea-radiogroup-box" :style="{'bottom': '-'+height+'px'}" ref="radiogroupBox">   
            <scroller class="midea-radiogroup-content" :style="{'height': (height - 28)+'px'}" show-scrollbar="false">
                <div class="midea-radiogroup-item-wrapper" :style="{'min-height': (height - 28)+'px'}">
                    <div class="midea-radiogroup-item" v-for="(item,i) in items" :key="i" :ref="'item'+i" v-on:click="radiogroupItemClick(item,i,item[keyField])">
                        <div class="icon-wrapper">
                            <image v-if="index==i && isShowIcon" class="item-icon" :src="radioIcon"></image>
                        </div>
                        <text class="item-text" :style="{color: color(item,i)}">{{display(item)}}</text>
                    </div>
                </div>
            </scroller>
            <div class="midea-radiogroup-bottom">
                <text class="btn-grp-text btn-cancel" @click="cancelClick">取消</text>
                <!-- <text class="midea-radiogroup-title">{{title}}</text> -->
                <text class="btn-grp-text btn-confirm" @click="confirmClick">确定</text>
            </div>
        </div>
    </div>
</template>

<script>
import mideaMask from "../midea-component/mask.vue";
import mideaCell from "../midea-component/cell.vue";
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
        },
        // 新加的参数是否显示图标
        isShowIcon: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        height: function () {
            let rows = this.rows > 9 ? 9 : this.rows
            rows = rows < 2 ? 2 : rows
            var len = rows * 90 + 88;
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
                        dom.scrollToElement(el, { offset: - this.height / 2 + 45 + 15 });
                    }
                    this.open();
                });
            }
        }
    },
    methods: {
        color(item, i) {
            return item.disabled ? '#b4b6cb' : (this.index == i ? '#267aff' : '#020f13')
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

        // 确定选择
        confirmClick() {
            const {items, index, keyField} = this;
            if (items[index].disabled) return

            var _this = this;
            var el = this.$refs.radiogroupBox;
            var translate = "translate(0px, " + _this.height + "px, 0px)";
            _this.animationFn(el, translate, "ease-in", function () {
                _this.show = false;
                _this.$emit("itemClick", { item: items[index], index, keyField });
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

.midea-radiogroup-bottom {
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  overflow: hidden;
}
.btn-grp-text {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  line-height: 96px;
  text-align: center;
}
.btn-grp-text:active {
  background-color: #9fa0a0;
}
.btn-cancel {
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: #d7dde4;
  color: #666666;
}
.btn-confirm {
  color: #000000;
}
.midea-radiogroup-title {
  width: 550px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  line-height: 36px;
  color: #020f13;
  text-align: center;
}

.midea-radiogroup-content {
  background-color: #f2f2f2;
  padding-bottom: 16px;
}
.midea-radiogroup-item-wrapper {
  height: auto;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #ffffff;
}
.midea-radiogroup-item {
  flex-direction: row;
  align-items: center;
  min-height: 90px;
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