<template>
    <div class="wrapper">
        <midea-header title="思必驰语音识别" bgColor="transparent" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div class="icon-group">
            <textarea class="display-text" v-model="messageParam" rows="3"></textarea>
            <image class="icon-scan" src="../assets/img/service_ic_scan@3x.png" @click="scanParam"></image>
        </div>
        <div class="icon-group">
            <text class="display-block">执行回复结果：</text>
        </div>
        <scroller>
            <text class="display-block" v-for="(item, index) in result" :key="index">{{item}}</text>
        </scroller>
        <scroller>
            <div class="botton-group">
                <midea-cell label="是否自动执行" :hasArrow="false" :hasTopBorder="false" :hasBottomBorder="false" :hasSubBottomBorder="false">
                    <midea-switch2 ref="changeAuto" class="value" slot="value" @change="changeAuto"> </midea-switch2>
                </midea-cell>
                <midea-cell label="是否本地识别(否则是在线识别)" :hasArrow="false" :hasTopBorder="false" :hasBottomBorder="false" :hasSubBottomBorder="false">
                    <midea-switch2 ref="changeMode" class="value" slot="value" @change="changeMode"> </midea-switch2>
                </midea-cell>
            </div>
            <div class="botton-group">
                <midea-cell title="启动" :hasMargin="true" :hasArrow="true" :clickActivied="true" :hasTopBorder="false" :hasBottomBorder="true" :hasSubBottomBorder="false" @mideaCellClick="setParam('startSpeechMonitor')">
                </midea-cell>
                <midea-cell title="暂停" :hasMargin="true" :hasArrow="true" :clickActivied="true" :hasTopBorder="false" :hasBottomBorder="true" :hasSubBottomBorder="false" @mideaCellClick="setParam('pauseSpeechMonitor')">
                </midea-cell>
                <midea-cell title="恢复" :hasMargin="true" :hasArrow="true" :clickActivied="true" :hasTopBorder="false" :hasBottomBorder="true" :hasSubBottomBorder="false" @mideaCellClick="setParam('resumeSpeechMonitor')">
                </midea-cell>
                <midea-cell title="停止" :hasMargin="true" :hasArrow="true" :clickActivied="true" :hasTopBorder="false" :hasBottomBorder="true" :hasSubBottomBorder="false" @mideaCellClick="setParam('stopSpeechMonitor')">
                </midea-cell>
                <midea-cell title="语音播报" :hasMargin="true" :hasArrow="true" :clickActivied="true" :hasTopBorder="false" :hasBottomBorder="true" :hasSubBottomBorder="false" @mideaCellClick="setParam('textToSpeech')">
                </midea-cell>
            </div>
        </scroller>
        <midea-button text="按参数执行" @mideaButtonClicked="execute()"></midea-button>
    </div>
</template>

<style scoped>
.wrapper {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
}
.apngA {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    width: 750px;
    border-width: 6px;
    border-style: solid;
    border-color: #bbbbbb;
}
.apng-block {
    width: 750px;
    height: 300px;
    border-width: 1px;
    border-style: solid;
    border-color: #bbbbbb;
}
.botton-group {
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
    flex-wrap: wrap;
}
.button-group-sub {
    flex-direction: row;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
    flex-wrap: wrap;
}
.botton {
    width: 250px;
    margin-right: 24px;
}
.icon-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    padding-left: 26px;
    padding-right: 26px;
}
.icon-scan {
    height: 44px;
    width: 44px;
}
.display-text {
    width: 640px;
    font-size: 30px;
    margin: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: #bbbbbb;
}
</style>
<script>  
import base from '../base'
import mideaHeader from '@/midea-component/header.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'
import mideaCell from '@/midea-component/cell2.vue'
import MideaSwitch2 from '@/midea-component/switch2.vue'

const globalEvent = weex.requireModule('globalEvent')

export default {
    components: { mideaHeader, mideaButton, mideaCell, MideaSwitch2 },
    mixins: [base],
    data() {
        return {
            isAuto: true,
            isLocalMode: true,
            messageParam: JSON.stringify({
                api: "startSpeechMonitor",
                params: {
                    auto: true,
                    mode: "local"
                }
            }),
            result: []
        }
    },
    methods: {
        setParam(key) {
            switch (key) {
                case "startSpeechMonitor":
                    this.messageParam = JSON.stringify({
                        api: "startSpeechMonitor",
                        params: {
                            auto: this.isAuto,
                            mode: this.isLocalMode ? "local" : "online"
                        }
                    })
                    this.execute()
                    break;
                case "stopSpeechMonitor":
                    this.messageParam = JSON.stringify({
                        api: "stopSpeechMonitor",
                        params: {}
                    })
                    this.execute()
                    break;
                case "resumeSpeechMonitor":
                    this.messageParam = JSON.stringify({
                        api: "resumeSpeechMonitor",
                        params: {}
                    })
                    this.execute()
                    break;
                case "pauseSpeechMonitor":
                    this.messageParam = JSON.stringify({
                        api: "pauseSpeechMonitor",
                        params: {}
                    })
                    this.execute()
                    break;
                case "textToSpeech":
                    this.messageParam = JSON.stringify({
                        api: "textToSpeech",
                        params: {
                            content: "测试语音播报"
                        }
                    })
                    this.execute()
                    break;
                default:
                    break;
            }
        },
        execute() {
            nativeService.toast("接口：" + JSON.parse(this.messageParam).api + "\n参数:" + JSON.stringify(JSON.parse(this.messageParam).params));
            nativeService[JSON.parse(this.messageParam).api](
                JSON.parse(this.messageParam).params,
                function (success) {
                    nativeService.toast(JSON.stringify(success));
                },
                function (error) {
                    nativeService.toast(JSON.stringify(error));
                }
            )
        },
        changeAuto(event) {
            this.$nextTick(() => {
                this.isAuto = event.value

                let jsonParam = JSON.parse(this.messageParam)
                if (jsonParam && jsonParam.api == "startSpeechMonitor") {
                    jsonParam.params.auto = this.isAuto
                    this.messageParam = JSON.stringify(jsonParam)
                }
            })
        },
        changeMode(event) {
            this.$nextTick(() => {
                this.isLocalMode = event.value

                let jsonParam = JSON.parse(this.messageParam)
                if (jsonParam && jsonParam.api == "startSpeechMonitor") {
                    jsonParam.params.mode = this.isLocalMode ? "local" : "online"
                    this.messageParam = JSON.stringify(jsonParam)
                }
            })
        },
        scanParam() {
            nativeService.scanCode().then(
                (resp) => {
                    this.messageParam = resp.data
                }
            ).catch((error) => {
            })
        },
    },
    mounted() {
        this.$refs["changeAuto"].switchValue(this.isAuto)
        this.$refs["changeMode"].switchValue(this.isLocalMode)
    },
    created() {
        globalEvent.addEventListener('receiveMessageFromApp', (data) => {
            if (data.messageType == 'aiSpeechNotification') {
                this.result.unshift(data.messageBody)
            } else if (data.messageType == 'aiSpeechAcyionResult') {
                this.result.unshift(data.messageBody)
            }
        })
    },
    beforeDestory() {
        console.log('beforeDestroy:在页面被销毁前调用')
        nativeService.stopSpeechMonitor()
    }
}
</script>