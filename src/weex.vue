<template>
    <div class="wrapper" ref="wrapper">
        <midea-header title="跳转页" :isImmersion="false" @leftImgClick="leftImgClick"></midea-header>
        <midea-title-bar title="输入远端目标页面地址"></midea-title-bar>
        <textarea type="text" placeholder="输入远端目标页面地址" class="textarea" :value="url" @input="urlChange" rows=3 />
        <midea-button text="进入远端目标页面" type="green" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>

        <midea-title-bar title="历史记录"></midea-title-bar>

        <scroller>
            <div class="history-item" v-for="(link, index) in history" :key="index" @click="selectLInk(index)">
                <text class="history-link">{{link}}</text>
                <text class="history-action" @click="removeLink(index)">删除</text>
            </div>
        </scroller>
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
</style>
<script>
import mideaHeader from '@/midea-component/header.vue'
import mideaTitleBar from '@/component/title-bar.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: {
        mideaHeader,
        mideaTitleBar,
        mideaButton
    },
    data: () => ({
        // url: "http://10.8.81.38:8080/dist/midea-demo/weex.js?root=midea-demo&ip=10.8.81.38",
        url: "http://10.8.81.45:8080/dist/midea-demo/weex.js?root=midea-demo&ip=10.8.81.45",
        history: []
    }),
    methods: {
        leftImgClick() {
            nativeService.goBack()
        },
        urlChange(event) {
            this.url = event.value
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
        })
    }
};
</script>