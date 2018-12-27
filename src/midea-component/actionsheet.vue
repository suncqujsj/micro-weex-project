<template>
    <div>
        <midea-mask v-if="show" @click="layoutClick"></midea-mask>
        <div v-if="show" class="midea-actionsheet-box" :style="{'bottom': '-'+bottom+'px'}" ref="actionsheetBox">
            <div class="midea-actionsheet-top">
                <text v-if="title" class="midea-actionsheet-title">{{title}}</text>
                <div class="midea-actionsheet-content">
                    <div v-bind:class="[index==0?'midea-actionsheet-list-first':'midea-actionsheet-list']" v-for="(item,index) in items" :key="index" @click="actionsheetItemClick(item,index)">
                        <slot :name="'item-'+index">
                            <div class="midea-actionsheet-textWrapper">
                                <div v-if="selectedIndex==index" class="check-icon"></div>
                                <text class="midea-actionsheet-text">{{item}}</text>
                                <image v-if="selectedIndex==index" class="check-icon" src="./img/check/public_ic_done@3x.png" resize="contain"></image>
                            </div>
                        </slot>
                    </div>
                </div>
            </div>
            <div class="midea-actionsheet-bottom">
                <text class="midea-actionsheet-btn" @click="actionsheetBtnClick">{{button}}</text>
                <div :style="{height:isipx?'68px':'0px','background-color': '#ffffff'}"></div>
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
        index: null,
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
        isipx: function () {
            return weex && (
                weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
                || weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
                || weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
                || weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
                );
        },
        "bottom": function () {
            //根据下拉菜单内容计算bottom距离
            var length = this.items.length;
            var len = (length + 1) * 100 + 80;
            console.log(len);
            return len;
        },
        selectedIndex: function () {
            let result
            if (this.index != null) {
                result = this.index
            } else {
                let index = this.items.findIndex((item)=>{item.chekced == true})
                if (index >= -1){
                    result = index
                }
            }
            return result
        },
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
  background-color: #ffffff;
}
.midea-actionsheet-bottom {
  margin-top: 16px;
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
  border-top-color: #e5e5e8;
}
.midea-actionsheet-list:active {
  background-color: #f5f5f5;
}
.midea-actionsheet-textWrapper{
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.midea-actionsheet-text {
  font-family: PingFangSC-Regular;
  padding: 30px 16px;
  text-align: center;
  font-size: 32px;
  color: #000000;
}
.midea-actionsheet-btn {
  font-size: 32px;
  color: #666666;
  background-color: #ffffff;
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
}
.midea-actionsheet-btn:active {
  background-color: #f5f5f5;
}
.check-icon {
  height: 40px;
  width: 40px;
}
</style>