<template>
    <div class="wrapper">
        <midea-header title="recordAudio录音" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="接口参数:"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" :value="messageParamString" @input="dataChange" rows=2 />
        <midea-button :text="isRecording?'停止录音':'开始录音'" @mideaButtonClicked="recordAudio(isRecording?false:true)">
        </midea-button>
        <midea-title-bar title="代码"></midea-title-bar>
        <text class="display-block">
            nativeService.startRecordAudio(this.messageParam) nativeService.stopRecordAudio()
        </text>
        <midea-title-bar title="结果"></midea-title-bar>

        <scroller>
            <text class="display-block">{{result?('返回类型:'+typeof result):''}}</text>
            <text class="display-block">{{result}}</text>
        </scroller>
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
.display-block {
  font-size: 30px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
}
</style>
<script>
import base from '../base'

import mideaButton from '@/midea-component/button.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'

const globalEvent = weex.requireModule("globalEvent");

module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            messageParam: {
                max: 15, //最长录音时间, 单位为秒
                isSave: true, //是否保存语音录音文件
                isTransform: true, //是否需要转换语音成文字
            },
            actionDesc: "开始录音",
            isRecording: false,
            result: ''
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
        recordAudio(action) {
            if (action) {
                //没在录音，点击是开始操作
                nativeService.startRecordAudio(this.messageParam).then(
                    (resp) => {
                        nativeService.toast("开始录音回调"+JSON.stringify(resp))
                        if (resp.status == 0) {
                            this.isRecording = true
                        }
                        this.result = resp
                    }
                ).catch((error) => {
                    this.result = "error: " + JSON.stringify(error || {})
                })
            } else {
                //正在录音，点击是停止操作
                nativeService.stopRecordAudio().then(
                    (resp) => {
                        this.isRecording = false
                        this.result = resp
                    }
                ).catch((error) => {
                    this.result = "error: " + JSON.stringify(error || {})
                })
            }
        }
    },
    created() {
        globalEvent.addEventListener("receiveMessageFromApp", (data) => {
            nativeService.toast("receiveMessageFromApp 触发"+JSON.stringify(data))
            if (data.messageType == "stopRecordAudio") {
                this.recordAudio(false)
            }
        })
    }
};
</script>