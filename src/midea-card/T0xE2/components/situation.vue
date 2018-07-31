<template>
    <div class="smart">
        <div class="smart-title">
            <text class="smart-text">智能</text>
        </div>
        <midea-smart @change="switchEnable($event, situation1)" :checked="situation1.checked" :data="situation1"></midea-smart>
        <midea-smart @change="switchEnable($event, situation2)" :checked="situation2.checked" :data="situation2"></midea-smart>
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
        handlePageData(data) {
            //处理页面传递的信息
            if (data.deviceId == this.deviceId) {
                if (data.key == "situation") {
                    this.getSituationList()
                }
            }
        },
        goToSituation(path, situation) {
            nativeService.setItem("CARD_STORAGE_SITUATION", Object.assign(situation, { deviceId: this.deviceId }), () => {
                nativeService.goTo(path)
            })
        },
        getSituationList() {
            this.getSituationListService().then((resp) => {
                if (resp.code == 0 && resp.data) {
                    this.situationList = resp.data.list || []
                } else {
                    throw resp
                }
            }).catch((error) => {
                nativeService.toast(this.getErrorMessage(error))
            })
        },
        switchEnable(event, situation) {
            let enable = event.value ? "1" : "0"
            if (situation.isCreated) {
                //更新
                let index = this.situationList.findIndex((item) => (item.moduleCode == situation.moduleCode))
                this.updateSituationEnableService(situation.moduleCode, enable).then((resp) => {
                    if (resp.code == 0) {
                        situation.enable = enable
                        this.$set(this.situationList, index, situation)
                    } else {
                        throw resp
                    }
                }).catch((error) => {
                    this.$set(this.situationList, index, situation)
                    nativeService.toast(this.getErrorMessage(error))
                })
            } else {
                //新增
                this.addSituationService(situation.moduleCode, enable, situation).then((resp) => {
                    if (resp.code == 0) {
                        situation.enable = enable
                        this.situationList.push(situation)
                    } else {
                        throw resp
                    }
                }).catch((error) => {
                    nativeService.toast(this.getErrorMessage(error))
                })
            }
        },
        executeSituation(situation) {
            if (situation.isCreated) {
                //直接执行
                return nativeService.executeSituationService(situation).then((resp) => {
                    if (resp.code == 0) {
                        nativeService.toast("执行成功")
                    } else {
                        throw resp
                    }
                }).catch((error) => {
                    nativeService.toast(this.getErrorMessage(error))
                })
            } else {
                //先新增，再执行
                this.addSituationService(situation.moduleCode, enable, situation).then((resp) => {
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
        }
    },
    computed: {
        situation1() {
            let result = {
                "moduleCode": 1,
                "enable": "0",
                "props": {
                    "code": "R03"
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

            result.title = "镁棒更新提醒"
            result.detail = "开启后，启动镁棒更新提醒；关闭后，不再推送；"

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
