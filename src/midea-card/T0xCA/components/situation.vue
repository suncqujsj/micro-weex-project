<template>
    <div class="smart" @viewappear="viewappear">
        <div class="smart-title">
            <text class="smart-text">智能</text>
        </div>
        <midea-smart @click="goToSituation('qingjing.js', situation1)" @change="switchEnable($event, situation1)" :checked="situation1.checked" :data="situation1"></midea-smart>
        <midea-smart @change="switchEnable($event, situation2)" :checked="situation2.checked" :data="situation2"></midea-smart>
        <midea-smart @change="switchEnable($event, situation3)" :checked="situation3.checked" :data="situation3"></midea-smart>
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
                    "time": "1900",
                    "unit": "3",
                    "value": "3",
                    "target": {
                        "code": "L01"
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
            result.checked = result.enable == '1' ? true : false

            result.title = "每" + result.props.value + "周提醒清洁冰箱内侧"
            result.detail = "开启后， 每" + result.props.value + "周提醒一次待清洁信息；关闭后，不再显示"

            return result
        },
        situation2() {
            let result = {
                "moduleCode": "2",
                "enable": "0",
                "props": {
                    "code": "R00"
                },
                title: "",
                detail: "",
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
            result.checked = result.enable == '1' ? true : false
            result.title = "故障推送"
            result.detail = "开启后，启动故障推送；关闭后，不再推送；"

            return result
        },
        situation3() {
            let result = {
                "moduleCode": "3",
                "enable": "0",
                "props": {
                    "code": "R01"
                },
                title: "",
                detail: "",
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
            result.checked = result.enable == '1' ? true : false
            result.title = "长时间未使用提醒"
            result.detail = "开启后，启动长时间未使用提醒；关闭后，不再推送；"

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
