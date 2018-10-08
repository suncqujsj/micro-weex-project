<template>
    <div class="wrapper" @viewappear="viewappear" @viewdisappear="viewdisappear">
        <midea-header title="storage数据" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <midea-button text="获取storage数据" @mideaButtonClicked="getAll"></midea-button>
        <scroller>
            <text class="display-block">{{result}}</text>
        </scroller>
    </div>
</template>
<style scoped>
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
import nativeService from '@/common/services/nativeService'

const storage = weex.requireModule('storage')
import mideaButton from '@/midea-component/button.vue'

module.exports = {
    components: { mideaButton },
    mixins: [base],
    data() {
        return {
            result: ''
        }
    },
    methods: {
        getAll() {
            this.result = ''
            storage.getAllKeys(event => {
                if (event.result === 'success') {
                    this.getStorageItem(event.data)
                }
            })
        },
        getStorageItem(keys) {
            if (keys.length > 0) {
                let key = keys.pop()
                storage.getItem(key, event => {
                    let data = event.data
                    try {
                        // data = JSON.stringify(JSON.parse(event.data), null, 2)
                    } catch (error) {

                    }
                    this.result += key + ' : ' + data + '\n'
                    this.getStorageItem(keys)
                })
            }
        }
    },
    created() {
        this.appendLog('created:完成数据绑定之后，模板编译之前被触发')
    }
};
</script>