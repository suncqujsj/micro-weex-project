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
                        <div class="fault-dialog-footer">
                            <div class="footer-btn" @click="secondaryClicked">
                                <div v-bind:class="['footer-btn-bg', item.helpfulChecked=='N'?'btn-checked':'']"></div>
                                <image class="fault-dialog-icon" :src="'./assets/img/service_ic_nohelp_'+(item.helpfulChecked=='N'?'on':'off')+'@3x.png'" resize='contain'></image>
                                <text v-bind:class="['btn-text', item.helpfulChecked=='N'?'btn-checked-text':'']">没帮助</text>
                            </div>
                            <div class="footer-btn" @click="primaryClicked">
                                <div v-bind:class="['footer-btn-bg', item.helpfulChecked=='Y'?'btn-checked':'']"></div>
                                <image class="fault-dialog-icon" :src="'./assets/img/service_ic_helpful_'+(item.helpfulChecked=='Y'?'on':'off')+'@3x.png'" resize='contain'></image>
                                <text v-bind:class="['btn-text', item.helpfulChecked=='Y'?'btn-checked-text':'']">有帮助</text>
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
  padding-bottom: 36px;
}
.dialog-close-icon {
  height: 40px;
  width: 40px;
  position: absolute;
  right: 20px;
  top: 20px;
}

.fault-dialog {
  position: relative;
  width: 558px;
  height: 580px;
  margin-top: 70px;
  padding-left: 20px;
  padding-right: 20px;
}
.fault-dialog-solution {
  height: 250px;
  padding-left: 36px;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  margin-bottom: 16px;
}
.fault-dialog-reason {
  height: 210px;
  padding-left: 36px;
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
  font-size: 32px;
  color: #000000;
  text-align: left;
  padding-left: 8px;
}
.fault-dialog-desc {
  width: 518px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  text-align: left;
  padding-top: 32px;
  padding-right: 36px;
}
.indicator {
  position: absolute;
  width: 558px;
  height: 30px;
  item-color: #c7c7cc;
  item-selected-color: #267aff;
  item-size: 10px;
  bottom: 65px;
  left: 0px;
}

.fault-dialog-footer {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 558px;
  padding-left: 36px;
  padding-right: 36px;
  margin-top: 50px;
}

.footer-btn {
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 222px;
  height: 56px;
  border-radius: 4px;
}
.footer-btn-bg {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 222px;
  height: 56px;
  background-color: #e5e5e8;
}
.btn-checked {
  opacity: 0.2;
  background-color: #267aff;
}
.btn-checked-text {
  color: #267aff;
}

.btn-text {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  padding: 12px;
}
</style>

<script>
import MideaMask from '@/midea-component/mask.vue'
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
