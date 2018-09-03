<template>
    <div class="smart" @viewappear="viewappear">
        <div class="smart-title">
            <text class="smart-text">智能</text>
        </div>
        <midea-smart @click="goToSituation('qingjing.js', situation1)" @change="switchEnable($event, situation1)" :checked="situation1.checked" :data="situation1"></midea-smart>
    </div>
</template>

<script>
import nativeService from '@/common/services/nativeService.js'
import situationBase from '@/midea-card/midea-components/situationBase'
import mideaSmart from '@/midea-card/midea-components/smart.vue'

export default {
    components: {
        mideaSmart
    },
    mixins: [situationBase],
    data() {
        return {
            deviceId: "",
            situationList: []
        }
    },
    methods: {
    },
    computed: {
        situation1() {
            let result = {
                "moduleCode": 1,
                "enable": "0",
                "props": {
                    "time": "2300",
                    "unit": "2",
                    "value": "1",
                    "target": {
                        "mode": "sleep",
                        "swing_angle": "90",
                        "swing": "on",
                        "power": "on"
                    }
                },
                title: '',
                detail: '',
                isCreated: false
            }
            if (this.situationList) {
                let temp = this.situationList.filter((item) => {
                    return item.moduleCode == result.moduleCode
                })
                if (temp && temp.length > 0) {
                    result = temp[0]
                    result["isCreated"] = true
                }
            }
            result.title = "睡觉时自动启用睡眠模式"
            result.detail = "睡眠风，摇头"
            result.checked = result.enable == '1' ? true : false

            return result
        }
    },
    created() {
        nativeService.getDeviceInfo().then((data) => {
            this.deviceId = data.result.deviceId
            this.getSituationList()
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
  margin-right: 32px;
}
.smart-title {
  flex-direction: row;
  justify-content: space-between;
}
.smart-text {
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 36px;
  color: #000000;
  letter-spacing: 0;
  padding-bottom: 20px;
}
.smart-action {
  font-family: PingFangSC-Medium;
  font-size: 28px;
  color: #267aff;
  width: 132px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: right;
}
</style>
