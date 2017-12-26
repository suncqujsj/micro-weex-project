<template>
    <div class="midea-radiogroup">
        <midea-mask v-if="show" @click="layoutClick"></midea-mask>
        <div v-if="show" class="midea-radiogroup-box" :style="{'bottom': '-'+bottom+'px'}" ref="radiogroupBox">
            <div class="midea-radiogroup-top">
                    <text class="btn-grp-text" @click="cancelClick">取消</text>
                    <text class="midea-radiogroup-title">{{title}}</text>
            </div>
         <scroller class="midea-radiogroup-content" :style="{'height': (bottom - 28)+'px'}" show-scrollbar="false">
          <div class="midea-radiogroup-item" v-for="(item,i) in items" :key="i" :ref="'item'+i" v-on:click="radiogroupItemClick(item,i)">
                    <div class="icon-wrapper">
                        <image v-if="index==i" class="item-icon" :src="radioIcon"></image>
                    </div>
                    <text class="item-text" :class="[index==i?'actived':'']">{{item.value}}</text>
          </div>
          <div class="midea-radiogroup-item"></div>
         </scroller>
        </div>
    </div>

</template>

<script>
import mideaMask from "../component/mask.vue";
import mideaCell from "../component/cell.vue";
const CHECKED = "../img/check/checked.png";
// const CHECKED = "http://10.74.149.81:8080/dist/src/img/check/checked.png";
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
    bottom: function() {
      var len = this.rows * 92 + 88;
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
            dom.scrollToElement(el, { offset: -parseInt(this.rows / 2) * 92 });
          }
          this.open();
        });
      }
    }
  },
  methods: {
    animationFn: function(el, translate, timing, fn) {
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
        function() {
          fn && fn();
        }
      );
    },
    //打开上拉菜单
    open: function() {
      var _this = this;
      var el = _this.$refs.radiogroupBox;
      var translate = "translate(0px, -" + _this.bottom + "px, 0px)";
      _this.animationFn(el, translate, "ease-in");
    },
    //点击mask遮罩层
    layoutClick: function() {
      if (!this.hideOnMask) return;

      var _this = this;
      var el = this.$refs.radiogroupBox;
      var translate = "translate(0px, " + _this.bottom + "px, 0px)";
      _this.animationFn(el, translate, "ease-in", function() {
        _this.show = false;
        _this.$emit("close");
      });
    },
    //点击取消
    cancelClick: function() {
      var _this = this;
      var el = this.$refs.radiogroupBox;
      var translate = "translate(0px, " + _this.bottom + "px, 0px)";
      _this.animationFn(el, translate, "ease-in", function() {
        _this.show = false;
        _this.$emit("close");
      });
    },
    //菜单项点击事件
    radiogroupItemClick: function(item, index) {
      var _this = this;
      var el = this.$refs.radiogroupBox;
      var translate = "translate(0px, " + _this.bottom + "px, 0px)";
      _this.animationFn(el, translate, "ease-in", function() {
        _this.show = false;
        _this.$emit("itemClick", { item, index });
        _this.$emit("close");
      });
    },
    //按钮点击事件
    radiogroupBtnClick: function() {
      var _this = this;
      var el = this.$refs.radiogroupBox;
      var translate = "translate(0px, " + _this.bottom + "px, 0px)";
      _this.animationFn(el, translate, "ease-in", function() {
        _this.show = false;
        _this.$emit("btnClick");
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
  color: rgb(2, 15, 19);
}
.midea-radiogroup-top {
  flex-direction: row;
  align-items: center;
  background-color: #ede7ef;
  height: 88px;
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
}
.btn-grp-text {
  width: 100px;
  font-size: 28px;
  line-height: 28px;
  text-align: left;
}
.midea-radiogroup-title {
  width: 550px;
  font-size: 36px;
  line-height: 36px;
  text-align: center;
}

.midea-radiogroup-content {
  background-color: #fff;
  padding-top: 30px;
  padding-bottom: 30px;
  overflow: scroll;
}

.midea-radiogroup-item {
  flex-direction: row;
  align-items: center;
  height: 92px;
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
}

.icon-wrapper {
  height: 25px;
  line-height: 32px;
  width: 100px;
  text-align: left;
}
.item-icon {
  height: 25px;
  width: 25px;
}
.item-text {
  width: 550px;
  font-size: 32px;
  line-height: 32px;
  text-align: center;
  color: rgb(2, 15, 19);
}
.actived {
  font-size: 32px;
  color: rgb(14, 144, 255);
}
.disabled {
  font-size: 32px;
  color: rgb(180, 182, 203);
}
</style>