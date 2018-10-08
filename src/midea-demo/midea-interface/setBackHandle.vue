<template>
    <div class="wrapper">
        <midea-header title="setBackHandle监听安卓返回键" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="设置安卓返回键监听" @mideaButtonClicked="setBackHandle('on')">
        </midea-button>
        <midea-button text="去除安卓返回键监听" @mideaButtonClicked="setBackHandle('off')">
        </midea-button>

        <midea-title-bar title="当前状态"></midea-title-bar>
        <text class="display-block">{{status}}</text>

        <midea-title-bar title="监听代码"></midea-title-bar>
        <text class="display-block">
            methods: {
                setBackHandle(status) {
                    nativeService.setBackHandle(status)
                }
            },
            created() {
                this.setBackHandle('on')
                globalEvent.addEventListener('receiveMessageFromApp', function (data) {
                    if (data.messageType == 'hardwareBackClick') {
                        nativeService.toast("你按了物理返回键！")
                    }
                });
            }
        </text>
    </div>
</template>
<style scoped>
.display-block {
  font-size: 30px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
<script>
import base from '../base'

import mideaButton from '@/midea-component/button.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'

const globalEvent = weex.requireModule('globalEvent')
module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            status: 'off'
        }
    },
    methods: {
        setBackHandle(status) {
            this.status = status
            nativeService.setBackHandle(status)
        }
    },
    created() {
        this.setBackHandle('on')
        globalEvent.addEventListener('receiveMessageFromApp', function (data) {
            if (data.messageType == 'hardwareBackClick') {
                nativeService.toast("你按了物理返回键！")
            }
        });
    }
};
</script>