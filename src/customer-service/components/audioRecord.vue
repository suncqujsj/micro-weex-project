<template>
    <midea-popup :show="show" @mideaPopupOverlayClicked="layoutClick" pos="bottom" height="700">
        <image class="mic-close-icon" src="./assets/img/service_ic_cancel@3x.png" resize='contain' @click="closeMicPannel"></image>
        <text class="mic-result">{{micResult}}</text>
        <div class="mic-record-wrapper">
            <text v-if="micResult" class="mic-result-clean" @click="micResult=''">清空</text>
            <div class="mic-record-icon-wrapper" @touchstart="startRecordAudio" @touchend="stopRecordAudio">
                <image v-if="!isRecording" class="mic-record-icon" src="./assets/img/voice@3x.png" resize='contain'></image>
                <image v-if="isRecording" class="mic-record-on-icon" src="./assets/img/voice_on@3x.png" resize='contain'></image>
            </div>
            <text v-if="micResult" class="mic-result-confirm" @click="confirmMicResult">确定</text>
        </div>
        <text class="mic-result-desc">按住说话</text>
    </midea-popup>
</template>


<script>
const globalEvent = weex.requireModule('globalEvent')
import nativeService from '@/common/services/nativeService'
import { MideaPopup } from '@/index'
module.exports = {
    components: { MideaPopup },
    props: {
        show: {
            type: Boolean,
            default: false
        },

        max: {
            type: Number,
            default: 30
        }
    },
    data() {
        return {
            micResult: '',
            isRecording: false
        }
    },
    methods: {
        startRecordAudio() {
            this.isRecording = true
            nativeService.startRecordAudio({
                max: this.max, //最长录音时间, 单位为秒
                isSave: false, //是否保存语音录音文件
                isTransform: true, //是否需要转换语音成文字
            }).then(
                (resp) => {
                    nativeService.toast(resp)
                    if (resp.status == 0) {
                    }
                }
            ).catch((error) => {
                nativeService.toast(error)
                this.isRecording = false
            })
        },
        stopRecordAudio() {
            if (!this.isRecording) return

            nativeService.stopRecordAudio().then(
                (resp) => {
                    this.isRecording = false
                    if (this.isMicPanelShow) {
                        this.micResult += (resp.data || resp.speakData || '')
                    }
                }
            ).catch((error) => {
            })
        },
        confirmMicResult() {
            this.$emit('cancel', {
                result: this.micResult
            })
        },
        closeMicPannel(e) {
            this.$emit('close', {});
        },
        layoutClick() {
            this.$emit('close', {});
        }
    },
    mounted() {
    },
    created() {
        globalEvent.addEventListener("receiveMessageFromApp", (data) => {
            nativeService.toast(111111)
            if (data.messageType == "stopRecordAudio") {
                this.stopRecordAudio()
            }
        })
    }
};
</script>

<style scoped>
.container {
  width: 750px;
  align-items: center;
  justify-content: center;
}
.mic-close-icon {
  height: 40px;
  width: 40px;
  position: absolute;
  right: 20px;
  top: 20px;
}
.mic-result {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  height: 400px;
  margin-top: 60px;
  padding-left: 36px;
  padding-right: 36px;
}
.mic-record-wrapper {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 160px;
}
.mic-result-clean {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #666666;
  padding: 20px;
}
.mic-record-icon-wrapper {
  height: 160px;
  width: 160px;
  margin-left: 110px;
  margin-right: 110px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.mic-record-icon {
  height: 120px;
  width: 120px;
}
.mic-record-on-icon {
  height: 160px;
  width: 160px;
}
.mic-result-confirm {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #267aff;
  padding: 20px;
}
.mic-result-desc {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  text-align: center;
  padding-top: 10px;
}
</style>