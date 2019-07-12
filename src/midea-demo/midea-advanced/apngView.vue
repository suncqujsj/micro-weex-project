<template>
    <div class="wrapper">
        <midea-header title="apngView动效视图(^5.10)" bgColor="transparent" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div>
            <midea-apng-view v-if="apngSrc" ref="apngView" :src="apngSrc" :loop="isLoop" :auto="isAuto" class="apng-block"></midea-apng-view>
            <div class="icon-group">
                <textarea class="display-text" v-model="apngSrc" rows="1"></textarea>
                <image class="icon-scan" src="../assets/img/service_ic_scan@3x.png" @click="scanUrl"></image>
            </div>
            <div class="icon-group">
                <textarea class="display-text" v-model="messageParam" rows="3"></textarea>
                <image class="icon-scan" src="../assets/img/service_ic_scan@3x.png" @click="scanParam"></image>
            </div>
        </div>
        <scroller>
            <div class="botton-group">
                <midea-cell title="启动play" :hasMargin="true" :hasArrow="true" :clickActivied="true" :hasTopBorder="false" :hasBottomBorder="true" :hasSubBottomBorder="false" @mideaCellClick="setParam('play')">
                </midea-cell>
                <midea-cell title="停止stop" :hasMargin="true" :hasArrow="true" :clickActivied="true" :hasTopBorder="false" :hasBottomBorder="true" :hasSubBottomBorder="false" @mideaCellClick="setParam('stop')">
                </midea-cell>
                <midea-cell title="暂停pause" :hasMargin="true" :hasArrow="true" :clickActivied="true" :hasTopBorder="false" :hasBottomBorder="true" :hasSubBottomBorder="false" @mideaCellClick="setParam('pause')">
                </midea-cell>
                <midea-cell title="恢复resume" :hasMargin="true" :hasArrow="true" :clickActivied="true" :hasTopBorder="false" :hasBottomBorder="true" :hasSubBottomBorder="false" @mideaCellClick="setParam('resume')">
                </midea-cell>
                <midea-cell title="goTo去到帧" :hasMargin="true" :hasArrow="true" :clickActivied="true" :hasTopBorder="false" :hasBottomBorder="true" :hasSubBottomBorder="false" @mideaCellClick="setParam('goTo')">
                </midea-cell>
                <midea-cell title="run运行帧" :hasMargin="true" :hasArrow="true" :clickActivied="true" :hasTopBorder="false" :hasBottomBorder="true" :hasSubBottomBorder="false" @mideaCellClick="setParam('run')">
                </midea-cell>
                <midea-cell label="切换远程/本地源" :hasArrow="false" :hasTopBorder="false" :hasBottomBorder="false" :hasSubBottomBorder="false">
                    <midea-switch2 class="value" slot="value" @change="changeSrc"> </midea-switch2>
                </midea-cell>
            </div>
        </scroller>
        <midea-button text="执行" @mideaButtonClicked="execute()"></midea-button>
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

const apngModule = weex.requireModule('apngModule');

export default {
    components: { mideaHeader, mideaButton, mideaCell, MideaSwitch2 },
    mixins: [base],
    data() {
        return {
            elRef: null,
            isAuto: true,
            isLoop: true,
            apngSrc: "",
            localUrl: "../assets/img/apng/intro_iSpt.png",
            url: "https://misc.aotu.io/ONE-SUNDAY/apng_spinfox.png",
            messageParam: JSON.stringify({
                api: "stop",
                params: {}
            })
        }
    },
    methods: {
        setParam(key) {
            switch (key) {
                case "play":
                    this.messageParam = JSON.stringify({
                        api: "play"
                    })
                    this.execute()
                    break;
                case "stop":
                    this.messageParam = JSON.stringify({
                        api: "stop"
                    })
                    this.execute()
                    break;
                case "pause":
                    this.messageParam = JSON.stringify({
                        api: "pause"
                    })
                    this.execute()
                    break;
                case "resume":
                    this.messageParam = JSON.stringify({
                        api: "resume"
                    })
                    this.execute()
                    break;
                case "goTo":
                    this.messageParam = JSON.stringify({
                        api: "goTo",
                        params: {
                            frame: 20 //动画的第x帧
                        }
                    })
                    this.execute()
                    break;
                case "run":
                    this.messageParam = JSON.stringify({
                        api: "run",
                        params: {
                            frame: 20 //动画的第x帧
                        }
                    })
                    this.execute()
                    break;
                default:
                    break;
            }
        },
        changeSrc(event) {
            this.$nextTick(() => {
                this.apngSrc = event.value ? this.url : this.localUrl
            })
        },
        execute() {
            nativeService.toast(this.messageParam);
            apngModule.apngInterface(
                this.elRef,
                JSON.parse(this.messageParam),
                function (success) {
                },
                function (error) {
                    nativeService.toast(JSON.stringify(error));
                }
            )
        },
        scanUrl() {
            nativeService.scanCode().then(
                (resp) => {
                    this.apngSrc = resp.data
                }
            ).catch((error) => {
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
        this.elRef = this.$refs.apngView;
    },
    created() {
        this.apngSrc = this.localUrl
    }
}
</script>