<template>
    <div class="wrapper" @viewappear="viewappear" @viewdisappear="viewdisappear">
        <midea-header title="weex.config.env变量" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller>
            <div class="group">
                <text class="text key">生命周期钩子和事件</text>
                <text class="text type"></text>
                <text class="text value">{{lifeCycleLog}}</text>
            </div>
            <div class="group">
                <text class="text key">bundleUrl</text>
                <text class="text type">string</text>
                <text class="text value">{{configObj.bundleUrl}}</text>
            </div>
            <div class="group" v-for="(obj, index) in sortedEnv" :key="index">
                <text class="text key">{{obj.key}}</text>
                <text class="text type">{{obj.type}}</text>
                <text class="text value">{{obj.value}}</text>
            </div>
            <!-- <div class="group" v-for="(value, key) in configObj.env" :key="key">
                <text class="text key">{{key}}</text>
                <text class="text type">{{typeof value}}</text>
                <text class="text value">{{value}}</text>
            </div> -->
        </scroller>
    </div>
</template>
<style scoped>
.group {
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
}
.text {
  font-size: 30px;
}
.key {
  width: 180px;
  text-align: right;
  color: #00b4ff;
}
.type {
  width: 120px;
  text-align: center;
  color: #a0a0a0;
}
.value {
  width: 420px;
  color: #525252;
}
</style>
<script>
import base from '../base'
import nativeService from '@/common/services/nativeService'


module.exports = {
    mixins: [base],
    data() {
        return {
            configObj: weex.config,
            lifeCycleLog: '',
            leftLog: '',
            today: new Date()
        }
    },
    computed: {
        sortedEnv() {
            let result = []
            for (const key in this.configObj.env) {
                if (this.configObj.env.hasOwnProperty(key)) {
                    const element = this.configObj.env[key];
                    result.push({ 'key': key, value: element, type: typeof element })
                }
            }

            result.sort((a, b) => {
                return a.key > b.key ? 1 : -1
            })
            return result
        }
    },
    methods: {
        viewdisappear() {
            this.leftLog = "页面消失" + '\n'
            nativeService.toast(this.leftLog)
        },
        viewappear() {
            this.appendLog('viewappear:页面展现')
        },
        appendLog(msg) {
            this.lifeCycleLog = this.lifeCycleLog + msg + '\n\r'
        }
    },
    beforeCreate() {
        console.log('beforeCreate:在初始化内部变量，并且添加了事件功能后被触发')
    },
    created() {
        this.appendLog('created:完成数据绑定之后，模板编译之前被触发')
    },
    beforeMount() {
        this.appendLog('beforeMount:模板挂载前触发')
    },
    mounted() {
        this.appendLog('mounted:模板已经编译并且生成了 Virtual DOM 之后被触发')
    },
    beforeUpdate() {
        // 不可用于修改页面，否则死循环
        console.log('beforeUpdate:更新前状态')
    },
    updated() {
        // 不可用于修改页面，否则死循环
        console.log('updated:更新完成状态')
    },
    beforeDestory() {
        console.log('beforeDestroy:在页面被销毁前调用')
    },
    destroyed() {
        console.log('destroyed:在页面被销毁时调用')
    }
};
</script>