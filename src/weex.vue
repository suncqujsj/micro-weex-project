<template>
    <div class="wrapper" ref="wrapper">
        <midea-header title="跳转页" :isImmersion="isImmersion" @leftImgClick="leftImgClick"></midea-header>

        <scroller>
            <div class="item-group">
                <text class="text-label">目标地址:</text>
                <input class="text-input" type="text" placeholder="请输入目标地址" v-model="host" @input="hostChange" />
                <midea-button text="选择" :btnStyle="{width: '120px', height: '60px'}" @mideaButtonClicked="showHostList">
                </midea-button>
                <input class="text-input-port" type="text" placeholder="端口" v-model="port" @input="portChange" />
            </div>
            <div class="item-group">
                <text class="text-label">测试模块:</text>
                <input class="text-input" type="text" placeholder="请输入测试模块" v-model="module" @input="moduleChange" />
                <midea-button text="选择" :btnStyle="{width: '120px', height: '60px'}" @mideaButtonClicked="showModuleList">
                </midea-button>
            </div>
            <div class="item-group" v-if="module == 'midea-card' || module=='plugin'">
                <text class="text-label">测试插件:</text>
                <input class="text-input" type="text" placeholder="请输入插件" v-model="card" @input="cardChange" />
                <midea-button text="选择" :btnStyle="{width: '120px', height: '60px'}" @mideaButtonClicked="showCardList">
                </midea-button>
            </div>
            <div class="item-group">
                <text class="text-label">模拟数据:</text>
                <text class="text-input" style="flex:1;">isDummy:{{isDummy}}</text>
                <midea-switch2 :checked="isDummy" @change="onIsDummyChange"></midea-switch2>
            </div>
            <div class="action-bar">
                <midea-title-bar title="输入远端目标页面地址"></midea-title-bar>
                <textarea placeholder="输入远端目标页面地址" class="textarea" v-model="url" rows=5 />
                <midea-button text="进入远端目标页面" @mideaButtonClicked="mideaButtonClicked"></midea-button>
            </div>

            <midea-title-bar title="历史记录"></midea-title-bar>

            <div v-for="(link, index) in history" :key="index" class="history-item" :class="[url==link?'history-item-selected':'']" @click="selectLInk(index)">
                <text class="history-link">{{link}}</text>
                <text class="history-action" @click="removeLink(index)">删除</text>
            </div>
        </scroller>

        <midea-select :show="isShowHostList" title="选择HOST" :items="hostList" :index="hostIndex" @close="isShowHostList=false" @itemClick="selectHost"></midea-select>

        <midea-select :show="isShowModuleList" title="选择模块" :items="moduleList" :index="moduleIndex" @close="isShowModuleList=false" @itemClick="selectModule" valueField="desc"></midea-select>

        <midea-select :show="isShowCardList" title="选择品类" :items="cardList" :index="cardIndex" @close="isShowCardList=false" @itemClick="selectCard"></midea-select>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService'

import { MideaHeader, MideaTitleBar, MideaButton, MideaSelect, MideaSwitch2 } from '@/index'

module.exports = {
    components: {
        MideaHeader,
        MideaTitleBar,
        MideaButton,
        MideaSelect,
        MideaSwitch2
    },
    data: () => ({
        host: '10.8.81.45',
        isShowHostList: false,
        hostIndex: null,
        hostList: [],
        port: "8080",
        module: 'plugin',
        isShowModuleList: false,
        moduleIndex: null,
        moduleList: [
            { key: 0, value: "midea-demo", desc: "midea-demo 美居Demo" },
            { key: 1, value: "plugin", desc: "plugin 插件" },
            // { key: 2, value: "midea-card", desc: "midea-card卡片页" },
            { key: 3, value: "community", desc: "community 社区模块" },
            { key: 4, value: "midea-rooms", desc: "midea-rooms场景" },
            { key: 5, value: "customer-service", desc: "customer-service 服务模块" }
        ],
        card: 'T0xAC',
        isShowCardList: false,
        cardIndex: null,
        cardList: [
            { key: "T0x0F", value: "T0x0F健康秤" },
            { key: "T0x10", value: "T0x10智能插座" },
            { key: "T0x13", value: "T0x13智能灯具" },
            { key: "T0x15", value: "T0x15电水壶" },
            { key: "T0x1B", value: "T0x1B智能路由" },
            { key: "T0x1D", value: "T0x1D空调伴侣" },
            { key: "T0x1F", value: "T0x1F燃气传感器" },
            { key: "T0x20", value: "T0x20zigbee子设备" },
            { key: "T0x2B", value: "T0x2B摄像头" },
            { key: "T0x9A", value: "T0x9A微波烤箱" },
            { key: "T0x9B", value: "T0x9B蒸汽烤箱" },
            { key: "T0xA1", value: "T0xA1除湿机" },
            { key: "T0xAC", value: "T0xAC空调" },
            { key: "T0xB0", value: "T0xB0微波炉" },
            { key: "T0xB1", value: "T0xB1大烤箱" },
            { key: "T0xB2", value: "T0xB2蒸汽炉" },
            { key: "T0xB3", value: "T0xB3消毒柜" },
            { key: "T0xB4", value: "T0xB4小烤箱" },
            { key: "T0xB6", value: "T0xB6抽油烟机" },
            { key: "T0xB7", value: "T0xB7燃气炉" },
            { key: "T0xB8", value: "T0xB8吸尘器" },
            { key: "T0xBF", value: "T0xBF微波蒸汽烤箱" },
            { key: "T0xBF", value: "T0xBF微波蒸汽烤箱" },
            { key: "T0xCA", value: "T0xCA冰箱" },
            { key: "T0xCC", value: "T0xCC中央空调" },
            { key: "T0xCD", value: "T0xCD空气能热水器" },
            { key: "T0xDA", value: "T0xDA波轮洗衣机" },
            { key: "T0xDB", value: "T0xDB滚筒洗衣机" },
            { key: "T0xDC", value: "T0xDC干衣机" },
            { key: "T0xE1", value: "T0xE1洗碗机" },
            { key: "T0xE2", value: "T0xE2电热水器" },
            { key: "T0xE3", value: "T0xE3燃热水器" },
            { key: "T0xE6", value: "T0xE6壁挂炉" },
            { key: "T0xE7", value: "T0xE7电磁炉" },
            { key: "T0xE8", value: "T0xE8电炖锅" },
            { key: "T0xE9", value: "T0xE9面包机" },
            { key: "T0xEA", value: "T0xEA电饭煲" },
            { key: "T0xEB", value: "T0xEB烹饪机" },
            { key: "T0xEC", value: "T0xEC压力锅" },
            { key: "T0xED", value: "T0xED净水机" },
            { key: "T0xEF", value: "T0xEF豆浆机" },
            { key: "T0xF1", value: "T0xF1破壁机" },
            { key: "T0xFA", value: "T0xFA风扇" },
            { key: "T0xFB", value: "T0xFB取暖器" },
            { key: "T0xFC", value: "T0xFC净化器" },
            { key: "T0xFD", value: "T0xFD加湿器" }
        ],
        isDummy: false,
        url: "",
        history: []
    }),
    computed: {
        isImmersion: function () {
            let result = true
            if (weex.config.env.isImmersion == "false") {
                result = false
            }
            return result
        }
    },
    methods: {
        leftImgClick() {
            nativeService.goBack()
        },
        showHostList() {
            nativeService.killKeyboard()
            this.isShowHostList = true
        },
        showModuleList() {
            nativeService.killKeyboard()
            this.isShowModuleList = true
        },
        showCardList() {
            nativeService.killKeyboard()
            this.isShowCardList = true
        },
        mideaButtonClicked() {
            if (this.history.indexOf(this.url) < 0) {
                this.history.push(this.url)
                nativeService.setItem('demo_target_history', this.history, () => {
                    nativeService.runGo(this.url)
                })
            } else {
                nativeService.runGo(this.url)
            }
        },
        selectLInk(index) {
            this.url = this.history[index]
        },
        removeLink(index) {
            this.history.splice(index, 1)
            nativeService.setItem('demo_target_history', this.history, () => { })
        },
        hostChange() {
            this.url = this.generateUrl()
        },
        selectHost(event) {
            this.host = event.item.value
            this.url = this.generateUrl()
        },
        portChange() {
            this.url = this.generateUrl()
        },
        moduleChange() {
            this.url = this.generateUrl()
        },
        selectModule(event) {
            this.module = event.item.value
            this.url = this.generateUrl()
        },
        cardChange() {
            this.url = this.generateUrl()
        },
        selectCard(event) {
            this.card = event.item.key
            this.url = this.generateUrl()
        },
        onIsDummyChange(event) {
            this.isDummy = event.value;
            this.url = this.generateUrl()
        },
        generateUrl() {
            let module = this.module
            let cardPath = ''
            let indexPath = '/weex.js'
            if (this.module == "midea-card") {
                cardPath = "/" + this.card + "/midea-card"
                indexPath = "/card.js"
            } else if (this.module == "plugin") {
                module = ""
                cardPath = this.card
            }
            return "http://" + this.host + ":" + this.port + "/dist/" + module + cardPath + indexPath + "?&isDummy=" + this.isDummy
        }
    },
    created() {
        nativeService.getItem('demo_target_history', (resp) => {
            if (resp.result == 'success' && resp.data) {
                this.history = JSON.parse(resp.data) || []
                if (this.history && this.history.length > 0) {
                    this.url = this.history[this.history.length - 1]

                    let temp = {}
                    for (let index = 0; index < this.history.length; index++) {
                        let element = this.history[index]
                        let host = element.substring(element.indexOf("://") + 3, element.indexOf(":80"))
                        if (!temp[host]) {
                            this.hostList.push(
                                {
                                    key: this.hostList.length,
                                    value: host
                                }
                            )
                            temp[host] = true
                        }
                    }
                }
            } else {
                this.history.push("http://qrcode.midea.com/test/weexDemo/weex.js?root=midea-demo&isDummay=false")
            }

            if (!this.url) {
                this.url = this.generateUrl()
            }
        })
    }
};
</script>

<style scoped>
.wrapper {
    position: relative;
}
.textarea {
    height: 120px;
    width: 750px;
    text-align: left;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom-color: #e2e2e2;
    border-bottom-width: 1px;
    margin-bottom: 10px;
    lines: 5;
}
.history-item {
    flex-direction: row;
    padding: 20px;
    align-content: center;
    align-items: center;
    border-bottom-color: #e2e2e2;
    border-bottom-width: 1px;
}
.history-item-selected {
    background-color: #e8f1ff;
}
.history-link {
    flex: 1;
    font-size: 26px;
}
.history-action {
    width: 100px;
    font-size: 28px;
    color: red;
    padding: 15px;
    background-color: #e2e2e2;
    text-align: center;
    align-self: stretch;
}

.item-group {
    padding-left: 32px;
    padding-right: 32px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-color: #e5e5e8;
    border-width: 1px;
}
.text-label {
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #000000;
    width: 140px;
    padding-top: 22px;
    padding-bottom: 22px;
}
.text-input {
    flex: 1;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #000000;
    padding: 22px;
}
.text-input-port {
    width: 140;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #000000;
    padding: 22px;
}
.action-bar {
    position: sticky;
    background-color: #ffffff;
    width: 750px;
}
</style>