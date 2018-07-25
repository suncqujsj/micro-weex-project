<template>
    <div class="smart">
        <div class="smart-title">
            <text class="smart-text">智能</text>
        </div>
        <midea-smart @click="goToSituation('qingjing.js', situation1)" @change="onMideachange($event, situation1)" :checked="situation1.checked" :data="situation1"></midea-smart>
        <midea-smart @click="goToSituation('qingjing2.js', situation2)" :data="situation2">
            <div slot="smart-action">
                <text class="smart-action" @click="executeSituation(2)">立即启动</text>
            </div>
        </midea-smart>
        <midea-smart @change="onMideachange($event, situation3)" :checked="situation3.checked" :data="situation3"></midea-smart>
        <midea-smart @change="onMideachange($event, situation4)" :hasBottomBorder="false" :checked="situation4.checked" :data="situation4"></midea-smart>
    </div>
</template>

<script>
import nativeService from '@/common/services/nativeService.js'
import mideaSmart from '@/midea-card/midea-components/smart.vue'

export default {
    components: {
        mideaSmart
    },
    data() {
        return {
            uid: "",
            deviceId: "",
            situationList: [],
            isSituationListLoaded: false
        }
    },
    methods: {
        onMideachange(event, situation) {
            let enable = event.value ? "1" : "0"
            if (situation.isCreated) {
                this.updateSituation(situation.moduleCode, enable).then((resp) => {
                    if (resp.code == 0) {
                        nativeService.toast("更新成功")
                    } else {
                        throw resp
                    }
                }).catch((error) => {
                    let msg = "请求失败，请稍后重试。"
                    if (error.msg) {
                        msg = error.msg
                    }
                    if (error.code) {
                        msg += "(" + error.code + ")"
                    }
                    nativeService.toast(msg)
                })
            } else {
                this.addSituation(situation.moduleCode, enable, situation).then((resp) => {
                    if (resp.code == 0) {
                        nativeService.toast("更新成功")
                        situation.isCreated = true
                    } else {
                        throw resp
                    }
                }).catch((error) => {
                    let msg = "请求失败，请稍后重试。"
                    if (error.msg) {
                        msg = error.msg
                    }
                    if (error.code) {
                        msg += "(" + error.code + ")"
                    }
                    nativeService.toast(msg)
                })
            }
        },
        goToSituation(path, data) {
            nativeService.setItem("CARD_STORAGE_SITUATION", Object.assign(data, { deviceId: this.deviceId }), () => {
                nativeService.goTo(path)
            })
        },
        getSituationList() {
            nativeService.getUserInfo().then((data) => {
                let param = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    data: {
                        reqId: nativeService.genMessageId(),
                        uid: this.uid,
                        applianceCode: this.deviceId || "",
                        stamp: Math.round(new Date().getTime() / 1000) //时间戳
                    }
                }
                nativeService.isDummy = false
                nativeService.sendCentralCloundRequest("/v1/situation/list", param).then((resp) => {
                    if (resp.code == 0) {
                        this.situationList = resp.list || []
                        this.isSituationListLoaded = true
                    } else {
                        throw resp
                    }
                }).catch((error) => {
                    let msg = "请求失败，请稍后重试。"
                    if (error.msg) {
                        msg = error.msg
                    }
                    if (error.code) {
                        msg += "(" + error.code + ")"
                    }
                    nativeService.toast(msg)
                })
            })
        },
        addSituation(moduleCode, enable, situation) {
            let param = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                data: {
                    reqId: nativeService.genMessageId(),
                    uid: this.uid,
                    applianceCode: this.deviceId || "",
                    stamp: Math.round(new Date().getTime() / 1000), //时间戳
                    moduleCode: moduleCode,
                    enable: enable,
                    props: situation.props
                }
            }
            nativeService.isDummy = false
            return nativeService.sendCentralCloundRequest("/v1/situation/add", param)
        },
        updateSituation(moduleCode, enable) {
            let param = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                data: {
                    reqId: nativeService.genMessageId(),
                    uid: this.uid,
                    applianceCode: this.deviceId || "",
                    stamp: Math.round(new Date().getTime() / 1000), //时间戳
                    moduleCode: moduleCode,
                    enable: enable
                }
            }
            nativeService.isDummy = false
            return nativeService.sendCentralCloundRequest("/v1/situation/update", param)
        },
        executeSituation(moduleCode) {
            let param = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                data: {
                    reqId: nativeService.genMessageId(),
                    uid: this.uid,
                    applianceCode: this.deviceId || "",
                    stamp: Math.round(new Date().getTime() / 1000), //时间戳
                    moduleCode: moduleCode
                }
            }
            nativeService.isDummy = false
            return nativeService.sendCentralCloundRequest("/v1/situation/execute", param).then((resp) => {
                if (resp.code == 0) {
                    nativeService.toast("执行成功")
                } else {
                    throw resp
                }
            }).catch((error) => {
                let msg = "请求失败，请稍后重试。"
                if (error.msg) {
                    msg = error.msg
                }
                if (error.code) {
                    msg += "(" + error.code + ")"
                }
                nativeService.toast(msg)
            })
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
                            "attr": "temperature",
                            "value": "28",
                            "operator": "1"
                        }
                    ],
                    "logic": "1",
                    "target": {
                        "model": "cool",
                        "temperature": "26"
                    }
                },
                title: '',
                detail: '',
                isCreated: false
            }
            if (this.situationList) {
                let temp = this.situationList.filter((item) => {
                    return item.moduleCode == 1
                })
                if (temp && temp.length > 0) {
                    result = temp[0]
                    result["isCreated"] = true
                }
            }
            let conditions1 = (result.props.conditions[0].operator == 1 ? "高于" : "低于") + result.props.conditions[0].value
            result.title = "室内温度" + conditions1 + "°度时，自动开启"
            result.detail = "模式" + (result.props.target.model == 'cool' ? "制冷" : "制热") + "，温度" + result.props.target.temperature + "."
            result.checked = result.enable == '1' ? true : false

            return result
        },

        situation2() {
            let result = {
                "moduleCode": 2,
                "enable": "0",
                "props": {
                    model: "cool",
                    temperature: "27",
                    wind_speed: "1",
                    wind_swing_lr: "on",
                    wind_swing_ud: "on"
                },
                title: '宝宝最适合',
                detail: '',
                isCreated: false
            }
            if (this.situationList) {
                let temp = this.situationList.filter((item) => {
                    return item.moduleCode == 2
                })
                if (temp && temp.length > 0) {
                    result = temp[0]
                    result["isCreated"] = true
                }
            }

            let windSpeedDesc
            switch (result.wind_speed) {
                case "1":
                    windSpeedDesc = "最小"
                    break;
                case "50":
                    windSpeedDesc = "中"
                    break;
                case "100":
                    windSpeedDesc = "最大"
                    break;
                default:
                    windSpeedDesc = "中"
                    break;
            }
            result.detail = "模式" + (result.props.model == 'cool' ? "制冷" : "制热") + "，温度" + result.props.temperature + "°，风速" + windSpeedDesc + (result.props.wind_swing_ud == 'on' ? "，上下摆风" : "") + (result.props.wind_swing_lr == 'on' ? "，左右摆风" : "")
            result.checked = result.enable == '1' ? true : false

            return result
        },
        situation3() {
            let result = {
                "moduleCode": "3",
                "enable": "0",
                "props": {
                    "code": "R06"
                },
                title: "滤网保养",
                detail: "开启后，启动滤网推送；关闭后，不再推送；",
                isCreated: false
            }
            if (this.situationList) {
                let temp = this.situationList.filter((item) => {
                    return item.moduleCode == 3
                })
                if (temp && temp.length > 0) {
                    result = temp[0]
                    result["isCreated"] = true
                }
            }
            result.checked = result.enable == '1' ? true : false

            return result
        },
        situation4() {
            let result = {
                "moduleCode": "4",
                "enable": "0",
                "props": {
                    "code": "R00"
                },
                title: "故障推送",
                detail: "开启后，启动故障推送；关闭后，不再推送；",
                isCreated: false
            }
            if (this.situationList) {
                let temp = this.situationList.filter((item) => {
                    return item.moduleCode == 4
                })
                if (temp && temp.length > 0) {
                    result = temp[0]
                    result["isCreated"] = true
                }
            }
            result.checked = result.enable == '1' ? true : false

            return result
        }
    },
    created() {
        nativeService.getUserInfo().then((data) => {
            this.uid = data.uid
            nativeService.getDeviceInfo().then((data) => {
                this.deviceId = data.result.deviceId
                this.getSituationList()
            }, (error) => { })
        }).catch((error) => { })
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
  font-family: PingFangSC-Regular;
  font-size: 36px;
  color: #000000;
  letter-spacing: 0;
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
