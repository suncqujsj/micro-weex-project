<template>
    <div class="wrapper">
        <midea-header title="updateDeviceInfo" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="新设备名称"></midea-title-bar>

        <div style="background-color: #e2e2e2;">
            <input type="input" placeholder="请输入新的设备名称" class="input" :value="newValue" @input="oninput" />
        </div>
        <midea-button text="执行updateDeviceInfo" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <midea-title-bar title="代码"></midea-title-bar>
        <text class="display-block">
            mideaButtonClicked() {
                nativeService.updateDeviceInfo({ name: this.newValue }).then(
                    (resp) => {
                        this.result = resp
                    }
                ).catch((error) => {
                    nativeService.toast(error)
                })
            }
        </text>
        <midea-title-bar title="结果"></midea-title-bar>
        <text class="display-block">{{result}}</text>
    </div>
</template>
<style scoped>
.input {
  font-size: 30px;
  width: 750px;
  height: 60px;
  border-color: gray;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
  background-color: #fff;
}
.display-block {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
<script>
import base from '../base'

import mideaButton from '@/midea-component/button.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            newValue: '',
            result: ''
        }
    },
    methods: {
        oninput: function (event) {
            this.newValue = event.value
        },
        mideaButtonClicked() {
            if (this.newValue){
                nativeService.updateDeviceInfo({ name: this.newValue }).then(
                    (resp) => {
                        this.result = resp
                    }
                ).catch((error) => {
                    nativeService.toast(error)
                })
            }
        }
    },
    created() {
            nativeService.getDeviceInfo().then(
                (resp) => {
                    this.newValue = resp.deviceName
                }
            ).catch((error) => {
                nativeService.toast(error)
            })
    }
};
</script>