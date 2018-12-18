<template>
    <div class="midea-actionsheet">
        <midea-mask v-if="show" @click="layoutClick"></midea-mask>
        <div v-if="show" class="midea-actionsheet-box" :style="{'bottom': '-'+bottom+'px'}" ref="actionsheetBox">
            <div class="midea-actionsheet-top">
                <text v-if="title" class="midea-actionsheet-title">{{title}}</text>
                <div class="midea-actionsheet-content">
                    <text class="midea-actionsheet-list" v-for="(item,index) in items" @click="actionsheetItemClick(item,index)">{{item}}</text>
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
        components: {mideaMask},
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
        computed:{
            "bottom":function () {
                //根据下拉菜单内容计算bottom距离
                var length = this.items.length;
                var len = (length+1)*100+80;
                console.log(len);
                return len;
            }
        },
        methods: {
            animationFn : function (el, translate, timing, fn) {
                animation.transition(el, {
                    styles:{
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
                var translate = 'translate(0px, -'+ (_this.bottom+20) +'px, 0px)';
                _this.animationFn(el, translate,  'ease-in')
            },
            //点击mask遮罩层
            "layoutClick": function () {
                var _this = this;
                var el = this.$refs.actionsheetBox;
                var translate = 'translate(0px, '+ (_this.bottom+20) +'px, 0px)';
                _this.animationFn(el, translate,  'ease-in', function () {
                    _this.show = false;
                    _this.$emit("close");
                });
            },
            //菜单项点击事件
            "actionsheetItemClick": function (item,index) {
                var _this = this;
                var el = this.$refs.actionsheetBox;
                var translate = 'translate(0px, '+ (_this.bottom+20) +'px, 0px)';
                _this.animationFn(el, translate,  'ease-in', function () {
                    _this.show = false;
                    _this.$emit('itemClick', {item,index});
                });
            },
            //按钮点击事件
            "actionsheetBtnClick": function () {
                var _this = this;
                var el = this.$refs.actionsheetBox;
                var translate = 'translate(0px, '+ (_this.bottom+20) +'px, 0px)';
                _this.animationFn(el, translate,  'ease-in', function () {
                    _this.show = false;
                    _this.$emit('btnClick');
                });
            }
        }
    }
</script>

<style scoped>
   .midea-actionsheet{
      //position: absolute;
      //left:0px;
      //right: 0px;
      //top: 0px;
      //bottom: 0px;
      //background-color: #00c277;
    }

    .midea-actionsheet-box{
      position: fixed;
      left: 0px;
      right: 0px;
      margin: 50px;
      margin-top: 0px;
      flex-direction: column;
      overflow: hidden;
    }
    .midea-actionsheet-top{
      border-radius: 10px;
      /* border-bottom-left-radius:10px; */
      overflow: hidden;
      background-color: #ffffff;
    }
    .midea-actionsheet-bottom{
      margin-top: 15px;
    }
    .midea-actionsheet-title{
      padding: 30px;
      text-align: center;
      font-size: 28px;
      color: #9ea7b4;
    }

    .midea-actionsheet-content{
      //padding: 30px;
      //margin-top: 50px;
      flex-direction: column;
      flex: 1;
    }
    .midea-actionsheet-list{
      border-top-width: 1px;
      border-top-color: #d7dde4;
      padding: 30px;
      text-align: center;
      font-size: 34px;
      color: #3399ff;
    }
    .midea-actionsheet-list:active{
      background-color: #f5f5f5;
    }
    .midea-actionsheet-btn{
      font-size: 34px;
      color: #3399ff;
      font-weight: bold;
      background-color: #ffffff;
      padding: 30px;
      text-align: center;
      border-radius: 10px;
    }
    .midea-actionsheet-btn:active{
      background-color: #f5f5f5;
    }
</style>