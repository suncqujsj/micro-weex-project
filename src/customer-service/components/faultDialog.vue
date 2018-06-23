<template>
    <div ref="container" v-if="show" class="container">
        <midea-mask @click="layoutClick"></midea-mask>
        <div ref="dialog" class="dialog-box" :style="{top:dialogTop+'px'}">
            <div class="dialog-content">
                <image class="dialog-close-icon" src="./assets/img/service_ic_cancel@3x.png" resize='contain' @click="layoutClick"></image>
                <slider class="fault-dialog" :index="currentIndex" @change="changeIndex">
                    <div v-for="(item,index) in data" :key="index">
                        <div class="fault-dialog-solution">
                            <div class="fault-dialog-row">
                                <image class="fault-dialog-icon" src="./assets/img/advise@3x.png" resize='contain'></image>
                                <text class="fault-dialog-title">故障排除建议</text>
                            </div>
                            <text class="fault-dialog-desc">{{item.faultServiceDesc + item.faultSolutionDesc}}</text>
                        </div>

                        <div class="fault-dialog-reason">
                            <div class="fault-dialog-row">
                                <image class="fault-dialog-icon" src="./assets/img/question@3x.png" resize='contain'></image>
                                <text class="fault-dialog-title">可能原因说明</text>
                            </div>
                            <text class="fault-dialog-desc">{{item.faultReason}}</text>
                        </div>
                        <div class="dialog-footer">
                            <div class="footer-btn cancel" @click="secondaryClicked">
                                <image class="fault-dialog-icon" src="./assets/img/service_ic_warming@3x.png" resize='contain'></image>
                                <text class="btn-text" :style="{ color: secondBtnColor }">没帮助</text>
                            </div>
                            <div class="footer-btn confirm" @click="primaryClicked">
                                <image class="fault-dialog-icon" src="./assets/img/service_ic_warming@3x.png" resize='contain'></image>
                                <text class="btn-text" :style="{ color: mainBtnColor }">有帮助</text>
                            </div>
                        </div>
                    </div>
                    <indicator v-if="data.length>1" class="indicator"></indicator>
                </slider>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
  width: 750px;
  align-items: center;
  justify-content: center;
}

.mask {
  top: 0;
  width: 750px;
  justify-content: center;
  align-items: center;
}

.dialog-box {
  background-color: #fff;
  width: 558px;
  border-radius: 10px;
  position: fixed;
  left: 96px;
  z-index: 100;
  top: 350px;
}

.dialog-content {
  padding-top: 36px;
  padding-bottom: 36px;
  /* padding-left: 36px;
  padding-right: 36px; */
}
.dialog-close-icon {
  height: 40px;
  width: 40px;
  position: absolute;
  right: 15px;
  top: 15px;
}
.content-title {
  color: #333333;
  font-size: 36px;
  text-align: center;
  margin-bottom: 24px;
}

.content-subtext {
  color: #666666;
  font-size: 26px;
  line-height: 36px;
  text-align: center;
}

.indicator {
  position: absolute;
  width: 558px;
  height: 30px;
  item-color: #c7c7cc;
  item-selected-color: #267aff;
  item-size: 10px;
  bottom: 60px;
  left: 0px;
}

.dialog-footer {
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.footer-btn {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* height: 90px; */
  margin-top: 18px;
  padding: 15px;
  border-radius: 4px;
}

.cancel {
  flex-direction: row;
  align-items: center;
  border-color: #f3f3f3;
  border-width: 1px;
}
.confirm {
  flex-direction: row;
  align-items: center;
  border-color: #f3f3f3;
  border-width: 1px;
}
.btn-text {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #666666;
}

.no-prompt {
  width: 486px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 24px;
}

.no-prompt-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}

.no-prompt-text {
  font-size: 24px;
  color: #a5a5a5;
}

.fault-dialog {
  position: relative;
  width: 558px;
  height: 530px;
  padding-left: 20px;
  padding-right: 20px;
}
.fault-dialog-solution {
  height: 220px;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding-left: 36px;
  padding-right: 36px;
}
.fault-dialog-reason {
  height: 220px;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding-left: 36px;
  padding-right: 36px;
}
.fault-dialog-row {
  flex-direction: row;
  align-items: center;
}
.fault-dialog-icon {
  height: 40px;
  width: 40px;
  margin-right: 5px;
}
.fault-dialog-title {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  text-align: left;
  padding-top: 16px;
  padding-bottom: 16px;
}
.fault-dialog-desc {
  width: 518px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  text-align: left;
}
</style>

<script>
import { MideaMask } from '@/index'
const dom = weex.requireModule('dom');
module.exports = {
    components: { MideaMask },
    props: {
        data: {
            type: Object,
            default: []
        },
        show: {
            type: Boolean,
            default: false
        },
        single: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        mainBtnColor: {
            type: String,
            default: '#00B9EF'
        },
        secondBtnColor: {
            type: String,
            default: '#666666'
        },
        showNoPrompt: {
            type: Boolean,
            default: true
        },
        noPromptText: {
            type: String,
            default: '不再提示'
        },
        isChecked: {
            type: Boolean,
            default: false
        },
        maskBgColor: {
            type: String,
            default: 'rgba(0,0,0,0.6)'
        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    created() {
        //var self=this;
        /* setTimeout(function(){
            self.checkDomHeight();
         },300);*/
        var env = weex.config.env;
        this.maskHeight = env.deviceHeight / env.deviceWidth * 750;
        this.dialogTop = (this.maskHeight - 300) / 2 - 150;
    },
    methods: {
        checkDomHeight() {
            var self = this;
            var wrapper = self.$refs.container;
            var dialog = self.$refs.dialog;
            dom.getComponentRect(wrapper, function (result) {
                var size = result.size || {};
                self.wrapperHeight = size.height;
                dom.getComponentRect(dialog, function (result) {
                    var size = result.size || {};
                    self.dialogHeight = size.height;
                    //weex.requireModule('modal').toast({"message":"3223",duration:5})
                    self.boxMarginTop = (self.wrapperHeight - self.dialogHeight) / 2;
                });
            });
        },
        changeIndex(event) {
            this.currentIndex = event.index
        },
        secondaryClicked() {
            this.$emit('dialogCancel', {
                type: 'cancel',
                index: this.currentIndex
            });
        },
        primaryClicked(e) {
            this.$emit('dialogConfirm', {
                type: 'confirm',
                index: this.currentIndex
            });
        },
        layoutClick() {
            this.$emit('close', {});
        }

    }
};
</script>
