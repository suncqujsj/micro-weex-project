<template>
    <div class="wrapper" ref="wrapper">
        <midea-header title="跳转页" :isImmersion="false" @leftImgClick="leftImgClick"></midea-header>

        <scroller>
            <div class="item-group">
                <text class="text-label">目标地址:</text>
                <input class="text-input" type="text" placeholder="请输入目标地址" v-model="host" @input="hostChange" />
                <midea-button text="选择" :btnStyle="{width: '120px', height: '60px'}" @mideaButtonClicked="isShowHostList=true">
                </midea-button>
            </div>
            <div class="item-group">
                <text class="text-label">测试模块:</text>
                <input class="text-input" type="text" placeholder="请输入测试模块" v-model="module" @input="moduleChange" />
                <midea-button text="选择" :btnStyle="{width: '120px', height: '60px'}" @mideaButtonClicked="isShowModuleList=true">
                </midea-button>
            </div>
            <div class="item-group" v-if="module == 'midea-card'">
                <text class="text-label">测试插件:</text>
                <input class="text-input" type="text" placeholder="请输入插件" v-model="card" @input="cardChange" />
                <midea-button text="选择" :btnStyle="{width: '120px', height: '60px'}" @mideaButtonClicked="isShowCardList=true">
                </midea-button>
            </div>
            <div class="action-bar">
                <midea-title-bar title="输入远端目标页面地址"></midea-title-bar>
                <textarea type="text" placeholder="输入远端目标页面地址" class="textarea" v-model="url" rows=3 />
                <midea-button text="进入远端目标页面" @mideaButtonClicked="mideaButtonClicked"></midea-button>
            </div>

            <midea-title-bar title="历史记录"></midea-title-bar>

            <div v-for="(link, index) in history" :key="index" class="history-item" :class="[url==link?'history-item-selected':'']" @click="selectLInk(index)">
                <text class="history-link">{{link}}</text>
                <text class="history-action" @click="removeLink(index)">删除</text>
            </div>
        </scroller>

        <midea-select :show="isShowHostList" title="选择HOST" :items="hostList" :index="hostIndex" @close="isShowHostList=false" @itemClick="selectHost"></midea-select>

        <midea-select :show="isShowModuleList" title="选择模块" :items="moduleList" :index="moduleIndex" @close="isShowModuleList=false" @itemClick="selectModule"></midea-select>

        <midea-select :show="isShowCardList" title="选择模块" :items="cardList" :index="cardIndex" @close="isShowCardList=false" @itemClick="selectCard"></midea-select>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService'

import { MideaHeader, MideaTitleBar, MideaButton, MideaSelect } from '@/index'

module.exports = {
    components: {
        MideaHeader,
        MideaTitleBar,
        MideaButton,
        MideaSelect
    },
    data: () => ({
        host: '10.8.81.45',
        isShowHostList: false,
        hostIndex: null,
        hostList: [],

        module: 'midea-demo',
        isShowModuleList: false,
        moduleIndex: null,
        moduleList: [
            { key: 0, value: "midea-demo" },
            { key: 1, value: "customer-service" },
            { key: 2, value: "midea-rooms" },
            { key: 3, value: "midea-card" }
        ],
        card: 'T0xAC',
        isShowCardList: false,
        cardIndex: null,
        cardList: [
            { key: "T0xAC", value: "空调T0xAC" },
            { key: "T0xCA", value: "冰箱T0xCA" },
            { key: "T0xFA", value: "风扇T0xFA" },
            { key: "T0xFC", value: "净化器T0xFC" }
        ],
        url: "",
        history: []
    }),
    methods: {
        leftImgClick() {
            nativeService.goBack()
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
        generateUrl() {
            let cardPath = ''
            let indexPath = '/weex.js'
            if (this.module == "midea-card") {
                cardPath = "/" + this.card
                indexPath = "/card.js"
            }
            return "http://" + this.host + ":8080/dist/" + this.module + cardPath + indexPath + "?root=" + this.module + cardPath + "&ip=" + this.host
        }
    },
    created() {
        nativeService.getItem('demo_target_history', (resp) => {
            if (resp.result == 'success' && resp.data) {
                this.history = JSON.parse(resp.data)
                if (this.history && this.history.length > 0) {
                    this.url = this.history[this.history.length - 1]

                    let temp = {}
                    for (let index = 0; index < this.history.length; index++) {
                        let element = this.history[index]
                        let host = element.substring(element.indexOf("://") + 3, element.indexOf(":8080"))
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
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
  margin-bottom: 20px;
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
  /* padding-top: 10px; */
  padding-left: 32px;
  padding-right: 32px;
  /* padding-bottom: 10px; */
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
}
.text-input {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  padding-left: 22px;
  padding-right: 50px;
}
.action-bar {
  position: sticky;
  background-color: #ffffff;
  width: 750px;
}
</style>