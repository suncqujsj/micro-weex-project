<template>
    <div ref="wrapper" v-if="show" class="container">
        <div @click="onCancled" class="mask" :style="{height:maskHeight+'px'}">
        </div>
        <div ref="dialog" class="dialog-box">
            <div class="dialog-content">
                <slot name="title">
                    <text class="content-title">{{title}}</text>
                </slot>
                <text class="progress-text">{{value}}%</text>
                <midea-progress style="margin-top:30px" :value="value" :bar-width="500" :needGradient="false"></midea-progress>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
  width: 750px;
}

.mask {
  top: 0;
  width: 750px;
  height: 1344px;
  background-color: #333333;
  opacity: 0.3;
  position: fixed;
  z-index: 10;
}

.dialog-box {
  background-color: #fff;
  width: 540px;
  border-radius: 26px;
  position: fixed;
  left: 105px;
  z-index: 100;
  top: 454px;
}

.dialog-content {
  padding-top: 40px;
  padding-bottom: 80px;
  padding-left: 60px;
  padding-right: 60px;
  align-items: center;
}

.content-title {
  color: #020f13;
  font-size: 36px;
  text-align: center;
  margin-bottom: 40px;
}

.progress-text {
  color: #0e90ff;
  font-size: 28px;
  text-align: center;
}

.content-subtext {
  color: #666666;
  font-size: 26px;
  line-height: 36px;
  text-align: center;
}
</style>

<script>
import mideaProgress from './mProgress.vue';
const dom = weex.requireModule('dom');
export default {
    components: { mideaProgress },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        maskBgColor: {
            type: String,
            default: 'rgba(255,255,255,0.9)'
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: () => ({
        pageHeight: 1334
    }),
    created() {
        var self = this;
        var env = weex.config.env;
        self.pageHeight = env.deviceHeight / env.deviceWidth * 750 - 150;
        self.maskHeight = env.deviceHeight / env.deviceWidth * 750;
        //this.boxMarginTop=this.maskHeight/3; 
        /*setTimeout(function(){
           self.checkDomHeight();
        },300);*/
    },
    methods: {
        checkDomHeight() {
            var self = this;
            var wrapper = self.$refs.wrapper;
            var dialog = self.$refs.dialog;
            dom.getComponentRect(wrapper, function (result) {
                weex.requireModule('modal').toast({ "message": result, duration: 5 })
                var size = result.size || {};
                self.wrapperHeight = size.height;
                dom.getComponentRect(dialog, function (result) {
                    var size = result.size || {};
                    self.dialogHeight = size.height;
                    self.boxMarginTop = (self.wrapperHeight - self.dialogHeight) / 2;
                });
            });
        },
        onCancled(event) {
            this.$emit('onProgressDialogClose', event);
        }
    }
};
</script>
