<template>
    <div class="wrapper" ref="wrapper">
        <midea-header title="跳转页" :isImmersion="false" @leftImgClick="leftImgClick"></midea-header>

        <div class="item-group">
            <text class="text-label">目标地址:</text>
            <input class="text-input" type="text" placeholder="请输入目标地址" v-model="host" @input="hostChange" />
        </div>
        <div class="item-group">
            <text class="text-label">测试模块:</text>
            <text class="text-input" @click="isShowModuleList=true">{{module}}</text>
        </div>
        <midea-title-bar title="输入远端目标页面地址"></midea-title-bar>
        <textarea type="text" placeholder="输入远端目标页面地址" class="textarea" v-model="url" rows=3 />
        <midea-button text="进入远端目标页面" type="green" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>

        <midea-title-bar title="历史记录"></midea-title-bar>

        <scroller>
            <div class="history-item" v-for="(link, index) in history" :key="index" @click="selectLInk(index)">
                <text class="history-link">{{link}}</text>
                <text class="history-action" @click="removeLink(index)">删除</text>
            </div>
        </scroller>

        <midea-select :show="isShowModuleList" title="选择模块" :items="moduleList" :index="moduleIndex" @close="isShowModuleList=false" @itemClick="selectModule"></midea-select>
    </div>
</template>
<style scoped>
.wrapper {
  position: relative;
}
.textarea {
  padding-left: 20px;
  padding-right: 20px;
}
.history-item {
  flex-direction: row;
  padding: 20px;
  align-content: center;
  align-items: center;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
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
  padding-top: 20px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 20px;
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
</style>
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
        module: 'midea-demo',
        isShowModuleList: false,
        moduleIndex: null,
        moduleList: [
            { key: 0, value: "midea-demo" },
            { key: 1, value: "customer-service" },
            { key: 2, value: "midea-rooms" },
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
        selectModule(event) {
            this.module = event.item.value
            this.url = this.generateUrl()
        },
        generateUrl() {
            return "http://" + this.host + ":8080/dist/" + this.module + "/weex.js?root=" + this.module + "&ip=" + this.host
        }
    },
    created() {
        nativeService.getItem('demo_target_history', (resp) => {
            if (resp.result == 'success' && resp.data) {
                this.history = JSON.parse(resp.data)
                if (this.history && this.history.length > 0) {
                    this.url = this.history[0]
                }
            }

            if (!this.url) {
                this.url = this.generateUrl()
            }
        })
    }
};
</script>