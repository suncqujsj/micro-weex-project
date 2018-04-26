<template>
    <div class="wrapper">
        <midea-header title="weex.config.env变量" :isImmersion="false" @leftImgClick="back"></midea-header>
        <div>
            {{today}}
        </div>
        <scroller>
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
  width: 280px;
  text-align: right;
  color: #00b4ff;
}
.type {
  width: 120px;
  text-align: center;
  color: #a0a0a0;
}
.value {
  width: 320px;
  color: #525252;
}
</style>
<script>
import base from './base'


module.exports = {
    mixins: [base],
    data() {
        return {
            configObj: weex.config,
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
    }
};
</script>