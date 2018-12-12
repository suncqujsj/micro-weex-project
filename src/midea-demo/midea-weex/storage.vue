<template>
    <div class="wrapper" @viewappear="viewappear" @viewdisappear="viewdisappear">
        <midea-header title="storage数据" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <!-- <midea-button text="获取storage数据" @mideaButtonClicked="getAll"></midea-button> -->
        <list class="list-item">
            <midea-item v-for="(item, index) in keys" :key="index" :hasTopBorder="true" :hasSubBottomBorder="false" :hasArrow="false" @mideaCellClick="getStorageItem([item])">
                <div slot="title" class="row">
                    <text class="title">{{item}}</text>
                    <text class="botton" @click="delStorageItem(index)">删除</text>
                    <text class="botton" @click="getStorageItem([item])">查看</text>
                </div>
            </midea-item>
        </list>
        <midea-title-bar title="结果"></midea-title-bar>
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
.list-item {
    height: 430px;
}
.row{
    width: 700px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.botton{
    width: 100px;
}
.title{
    flex:1;
}
</style>
<script>
import base from '../base'
import nativeService from '@/common/services/nativeService'

const storage = weex.requireModule('storage')
import mideaButton from '@/midea-component/button.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import MideaItem from '@/midea-component/item2.vue'

module.exports = {
    components: { mideaButton, mideaTitleBar, MideaItem },
    mixins: [base],
    data() {
        return {
            result: '',
            keys:[]
        }
    },
    methods: {
        getAll() {
            this.result = ''
            storage.getAllKeys(event => {
                if (event.result === 'success') {
                    this.keys = event.data
                }
            })
        },
        getStorageItem(keys) {
            if (keys.length > 0) {
                let key = keys.pop()
                storage.getItem(key, event => {
                    let data = event.data
                    try {
                        data = JSON.stringify(JSON.parse(event.data), null, 2)
                    } catch (error) {

                    }
                    this.result = key + ' : ' + data + '\n'
                    // this.getStorageItem(keys)
                })
            }
        },
        delStorageItem(index) {
            let key = this.keys.splice(index, 1)
            storage.removeItem(key, () => {
            })
        }
    },
    created() {
        weex.requireModule('common').getStatusBarHeight(function(statusBarHeight) {
            nativeService.alert(statusBarHeight)
        });
        this.getAll()
    }
};
</script>