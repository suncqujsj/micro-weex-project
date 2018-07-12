<template>
    <div>
        <midea-mask v-if="show" @click="layoutClick"></midea-mask>
        <div v-if="show" class="midea-actionsheet-box" :style="{'bottom': '-'+bottom+'px'}" ref="actionsheetBox">
            <div class="midea-actionsheet-top">
                <text v-if="title" class="midea-actionsheet-title">{{title}}</text>
                <div class="midea-actionsheet-content">
                    <div v-bind:class="[index==0?'midea-actionsheet-list-first':'midea-actionsheet-list']" v-for="(item,index) in items" :key="index" @click="actionsheetItemClick(item,index)">
                        <slot :name="'item-'+index">
                            <text class="midea-actionsheet-text">{{item}}</text>
                        </slot>
                    </div>
                </div>
            </div>
            <div class="midea-actionsheet-bottom">
                <text class="midea-actionsheet-btn" @click="actionsheetBtnClick">{{button}}</text>
            </div>
        </div>
    </div>

</template>

<script>
import mideaMask from './mask.vue';
var animation = weex.requireModule('animation');
export default {
    components: { mideaMask },
    props: {
        title: {
            type: String,
            default: ""
        },
        items: {
            type: Array
        },
        show: {
            type: Boolean,
            default: false
        },
        button: {
            type: String,
            default: "取消"
        }
    },
    computed: {
        "bottom": function () {
            //根据下拉菜单内容计算bottom距离
            var length = this.items.length;
            var len = (length + 1) * 100 + 80;
            console.log(len);
            return len;
        }
    },
    methods: {
        animationFn: function (el, translate, timing, fn) {
            animation.transition(el, {
                styles: {
                    transform: translate,
                    transformOrigin: 'center center'
                },
                duration: 200, //ms
                timingFunction: timing,
                delay: 0 //ms
            }, function () {
                fn && fn();
            })
        },
        //打开上拉菜单
        "open": function () {
            var _this = this;
            var el = _this.$refs.actionsheetBox;
            var translate = 'translate(0px, -' + (_this.bottom) + 'px, 0px)';
            _this.animationFn(el, translate, 'ease-in')
        },
        //点击mask遮罩层
        "layoutClick": function () {
            var _this = this;
            var el = this.$refs.actionsheetBox;
            var translate = 'translate(0px, ' + (_this.bottom) + 'px, 0px)';
            _this.animationFn(el, translate, 'ease-in', function () {
                _this.show = false;
                _this.$emit("close");
            });
        },
        //菜单项点击事件
        "actionsheetItemClick": function (item, index) {
            var _this = this;
            var el = this.$refs.actionsheetBox;
            var translate = 'translate(0px, ' + (_this.bottom) + 'px, 0px)';
            _this.animationFn(el, translate, 'ease-in', function () {
                _this.show = false;
                _this.$emit('itemClick', { item, index });
            });
        },
        //按钮点击事件
        "actionsheetBtnClick": function () {
            var _this = this;
            var el = this.$refs.actionsheetBox;
            var translate = 'translate(0px, ' + (_this.bottom) + 'px, 0px)';
            _this.animationFn(el, translate, 'ease-in', function () {
                _this.show = false;
                _this.$emit('btnClick');
            });
        }
    }
}
</script>

<style scoped>
.midea-actionsheet-box {
  position: fixed;
  left: 0px;
  right: 0px;
  margin: 0px;
  margin-top: 0px;
  flex-direction: column;
  overflow: hidden;
  background-color: #f2f2f2;
}
.midea-actionsheet-top {
  border-radius: 0px;
  overflow: hidden;
  background-color: #fff;
}
.midea-actionsheet-bottom {
  margin-top: 15px;
}
.midea-actionsheet-title {
  padding: 30px;
  text-align: center;
  font-size: 28px;
  color: #000000;
}

.midea-actionsheet-content {
  flex-direction: column;
  flex: 1;
}
.midea-actionsheet-list-first {
}
.midea-actionsheet-list-first:active {
  background-color: #f5f5f5;
}
.midea-actionsheet-list {
  border-top-width: 1px;
  border-top-color: #d7dde4;
}
.midea-actionsheet-list:active {
  background-color: #f5f5f5;
}
.midea-actionsheet-text {
  font-family: PingFangSC-Regular;
  padding: 30px;
  text-align: center;
  font-size: 32px;
  color: #000000;
}
.midea-actionsheet-btn {
  font-size: 32px;
  color: #000000;
  background-color: #ffffff;
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
}
.midea-actionsheet-btn:active {
  background-color: #f5f5f5;
}
</style>