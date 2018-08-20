<template>
    <div class="smart">
        <div class="smart-title">
            <text class="smart-text">智能</text>
        </div>
        <midea-smart @click="goToSituation('qingjing.js', situation1)" @change="switchEnable($event, situation1)" :checked="situation1.checked" :data="situation1"></midea-smart>
        <midea-smart @click="goToSituation('qingjing2.js', situation2)" :data="situation2">
            <div slot="smart-action">
                <text class="smart-action" @click="executeSituation(situation2)">立即启动</text>
            </div>
        </midea-smart>
        <midea-smart @change="switchEnable($event, situation3)" :checked="situation3.checked" :data="situation3"></midea-smart>
        <midea-smart @change="switchEnable($event, situation4)" :checked="situation4.checked" :data="situation4"></midea-smart>
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
            situationList: [],
            isSituationLoaded: false
        }
    },
    methods: {
        executeSituation(situation) {
            if (this.isSituationLoaded) {
                if (situation.isCreated) {
                    //直接执行
                    return this.executeSituationService(situation).then((resp) => {
                        if (resp.code == 0) {
                            this.$emit('statusChanged')
                            nativeService.toast("执行成功")
                        } else {
                            throw resp
                        }
                    }).catch((error) => {
                        nativeService.toast(this.getErrorMessage(error))
                    })
                } else {
                    //先新增，再执行
                    this.addSituationService(situation.moduleCode, "1", situation).then((resp) => {
                        if (resp.code == 0) {
                            this.situationList.push(situation)

                            situation.isCreated = true
                            this.executeSituation(situation)
                        } else {
                            throw resp
                        }
                    }).catch((error) => {
                        nativeService.toast(this.getErrorMessage(error))
                    })
                }
            } else {
                this.getSituationList()
            }
        }
    },
    computed: {
        situation1() {
            let result = {
                "moduleCode": 1,
                "enable": "0",
                "props": {
                    "conditions": [
                        {
                            "attr": "indoor_temperature",
                            "value": "28",
                            "operator": "1"
                        }
                    ],
                    "logic": "1",
                    "target": {
                        "mode": "cool",
                        "temperature": "26",
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
            result.checked = result.enable == '1' ? true : false

            let conditions1 = (result.props.conditions[0].operator == 1 ? "高于" : "低于") + result.props.conditions[0].value
            result.title = "室内温度" + conditions1 + "°时，自动开启"
            result.detail = "模式" + (result.props.target.mode == 'cool' ? "制冷" : "制热") + "，温度" + result.props.target.temperature + "°."

            return result
        },
        situation2() {
            let result = {
                "moduleCode": 2,
                "enable": "0",
                "props": {
                    mode: "cool",
                    temperature: "27",
                    wind_speed: "1",
                    wind_swing_lr: "on",
                    wind_swing_ud: "on",
                    "power": "on"
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

            let windSpeedDesc = ""
            switch (result.props.wind_speed) {
                case "1":
                    windSpeedDesc = "最小"
                    break;
                case "50":
                    windSpeedDesc = "中"
                    break;
                case "100":
                    windSpeedDesc = "最大"
                    break;
            }
            result.title = "我的最舒适"
            result.detail = "模式" + (result.props.mode == 'cool' ? "制冷" : "制热") + "，温度" + result.props.temperature + "°，风速" + windSpeedDesc + (result.props.wind_swing_ud == 'on' ? "，上下摆风" : "") + (result.props.wind_swing_lr == 'on' ? "，左右摆风" : "")

            return result
        },
        situation3() {
            let result = {
                "moduleCode": "3",
                "enable": "0",
                "props": {
                    "code": "R06"
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
            result.title = "滤网保养"
            result.detail = "开启后，启动滤网推送；关闭后，不再推送；"

            return result
        },
        situation4() {
            let result = {
                "moduleCode": "4",
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
