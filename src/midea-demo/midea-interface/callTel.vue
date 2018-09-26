<template>
    <div class="wrapper">
        <midea-header title="callTel" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <midea-title-bar title="接口参数:"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" :value="messageParamString" @input="dataChange" rows=3 />
        <midea-button text="执行callTel" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <text class="display-block">
            let messageParam = {
                tel: '10086',
                title: '客户服务',
                desc: '拨打热线电话：'
            }
            nativeService.callTel(messageParam).then(
                (resp) => {}
            ).catch((error) => {
                nativeService.toast(error)
            })
        </text>
    </div>
</template>
<style scoped>
.textarea {
  font-size: 30px;
  width: 750px;
  border-color: gray;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 100px;
}
.displayBtnStyle {
  display: inline-flex;
  border-radius: 0px;
}
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

import mideaTitleBar from '@/midea-component/title-bar.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            messageParam: {
                tel: '10086',
                title: '客户服务',
                desc: '拨打热线电话：10086'
            },
            
        }
    },
    computed: {
        messageParamString() {
            return JSON.stringify(this.messageParam)
        }
    },
    methods: {
        dataChange(event) {
            try {
                this.messageParam = JSON.parse(event.value)
            } catch (error) {
            }
        },
        mideaButtonClicked() {
            nativeService.callTel(this.messageParam).then(
                (resp) => {}
            ).catch((error) => {
                nativeService.toast(error)
            })
        }
    },
    created() {
    }
};
</script>