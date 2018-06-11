<template>
    <div class="wrapper" @viewappear="viewappear" @viewdisappear="viewdisappear">
        <midea-header :title="'Debug信息'+buildTime" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <div class="header-action">
            <text class="action" @click="clean">清空</text>
            <text class="action" @click="refresh">刷新</text>
            <text class="action" @click="copyLog">拷贝日志</text>
            <text class="action" @click="getConfig">信息({{plugin_version}})</text>
            <text class="action" @click="showAppData">全局数据</text>
            <text class="action" @click="testfunc">测试</text>
        </div>
        <scroller class="info-box">
            <text class="note">{{content}}</text>
        </scroller>
    </div>
</template>
<script>

import base from './base'
import appConfig from './settings/config'
import nativeService from '@/common/services/nativeService'
import debugUtil from '@/common/util/debugUtil'
const storage = weex.requireModule('storage');
const clipboard = weex.requireModule('clipboard')
const BUILD_TIME = process.env.BUILD_TIME

export default {
    components: {
    },
    mixins: [base],
    data() {
        return {
            plugin_version: appConfig.plugin_version,
            content: '',
            buildTime: BUILD_TIME
        }
    },
    methods: {
        getLogData() {
            debugUtil.getDebugLog().then((data) => {
                this.content = data
            })
        },
        clean() {
            debugUtil.cleanDebugLog().then(() => { })
            this.content = ''
        },
        refresh() {
            this.getLogData()
        },
        copyLog() {
            clipboard.setString(this.content)
            nativeService.toast("已拷贝日志到粘贴板")
        },
        getConfig() {
            nativeService.alert(JSON.stringify(weex.config, null, 4))
        },
        getItemsSync(keys, blackListRegx) {
            return new Promise((resolve, reject) => {
                let result = {}
                let key = keys.pop()
                storage.getItem(key, resp => {
                    if (!blackListRegx || !blackListRegx.test(key)) {
                        let temp = resp.data
                        if (typeof temp == 'string') {
                            try {
                                temp = JSON.parse(temp)
                            } catch (error) { }
                        }
                        result[key] = temp
                    }
                    if (keys.length > 0) {
                        this.getItemsSync(keys, blackListRegx).then((data) => {
                            result = Object.assign(result, data)
                            resolve(result)
                        })
                    } else {
                        resolve(result)
                    }
                })
            })
        },
        showAppData() {
            storage.getAllKeys(event => {
                if (event.result === 'success') {
                    this.getItemsSync(event.data, /.*(debugInfo|photoBase64)+$/).then((data) => {
                        nativeService.alert(JSON.stringify(data, null, 4))
                    })
                }
            })
        },
        testfunc() {
            this.pushDataChannel.postMessage({
                content: 'pro2base/msg/push;405871;{"applianceId":"1099511629097","pushTips":"这是一个提示信息。","pushTime":"1517469807978","tips":"冰箱已经24小时没有操作。"};2018-02-03 07:23:27',
                id: 5, isRead: 1
                // 'content': 'appliance/vital/data/report;1000;{"applianceId":"2000","msg":"dfjdfug2834jslf8Kf834#dfk"};2014-07-10 15:21:52.532',
                // 'content': 'meiju/fault/push;1000;{"applianceId":"1099511629098","applianceSn":"ddcrser5e5d14344dfdf454d","isRepair": false,"faultCode":"E5","applianceName":"我的家电","productCode":"","faultType":"e643","faultDesc":"我的家电我的家电我的家电"};2017-07-01 11:39:01',
                // 'isRead': 0
            })
        }
    },
    created() {
        this.getLogData()
    }
};
</script>
<style scoped>
.wrapper {
  background-color: #efeff4;
}
.note {
  color: #333333;
  font-size: 32px;
  line-height: 38px;
  margin-left: 30px;
  margin-right: 30px;
}

.header-action {
  position: relative;
  width: 750px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;

  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.action {
  font-size: 32px;
  line-height: 48px;
  padding-top: 20px;
  padding-left: 30px;
  color: #157efb;
}
</style>