<template>
    <div class="smart" v-if="cockbookList">
        <div class="smart-title">
            <text class="smart-text">{{title}}</text>
        </div>

        <div class="cookbook-list">
            <div v-for="(item,index) in cockbookList" :key="index" @click="gotoCookbookDetail(item)">
                <cookbook :data="item"></cookbook>
            </div>
        </div>
    </div>
</template>

<script>
import nativeService from '@/common/services/nativeService.js'
import util from '@/common/util/util'

import cookbook from './cookbook.vue'
export default {
    components: {
        cookbook
    },
    props: {
        title: {
            type: String,
            default: "推荐食谱"
        },
        count: {
            type: Number,
            default: 4
        }
    },
    data() {
        return {
            deviceSn: "",
            cockbookList: null
        }
    },
    methods: {
        gotoCookbookDetail(item) {
            nativeService.jumpNativePage({
                pageName: "CookbookDetail",
                data: {
                    recipeId: item.recipeId
                }
            })
        }
    },
    created() {
        nativeService.getDeviceInfo().then((data) => {
            this.deviceSn = data.result.deviceSn
            let requestParam = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                data: {
                    reqId: nativeService.generateUUID(),
                    sn: this.deviceSn,
                    deviceId: data.result.deviceId,
                    deviceName: data.result.deviceName,
                    size: this.count,
                    stamp: util.dateFormat(new Date(), "yyyyMMddhhmmss") //时间戳
                }
            }
            nativeService.sendCentralCloundRequest("/smart-recipe/api/v1/recipe/devicerecommend", requestParam, { isShowLoading: false }).then((resp) => {
                if (resp.code == 0 && resp.data) {
                    this.cockbookList = resp.data.healthData || []
                }
            }).catch((error) => { })
        }, (error) => { })
    }
}
</script>

<style>
.smart {
  flex-direction: column;
  justify-content: space-between;
  margin-top: 60px;
  margin-left: 32px;
}
.smart-title {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 32px;
  margin-right: 18px;
}
.smart-text {
  flex: 1;
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 36px;
  color: #000000;
  letter-spacing: 0;
}
.smart-display-all {
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.smart-display-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
}
.arrow-icon {
  width: 40px;
  height: 40px;
}
.cookbook-list {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  margin-right: 32px;
}
</style>
