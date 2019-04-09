<template>
    <div class="wrapper">
        <midea-header title="showControlPanelPage" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <midea-title-bar title="接口参数:"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" :value="messageParamString" @input="dataChange" rows=5 />
        <midea-button text="选择设备" @mideaButtonClicked="showDeviceList">
        </midea-button>
        <midea-button text="执行showControlPanelPage" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <midea-title-bar title="代码"></midea-title-bar>
        <text class="display-block">
            nativeService.showControlPanelPage({
                deviceId: '2199023365613', 
            }).then(
                (resp) => {
                    this.result = resp
                }
            ).catch((error) => {
                nativeService.toast(error)
            })
        </text>
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
</style>
<script>
import base from '../base'

import mideaButton from '@/midea-component/button.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'
const picker = weex.requireModule('picker')

module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            messageParam: {
                deviceId: '2199023365613', // 分享标题
            },
            deviceIndex: 0,
            result: ''
        }
    },
    computed: {
        messageParamString() {
            return JSON.stringify(this.messageParam)
        }
    },
    methods: {
        dataChange(event) {
            try {
                this.messageParam = JSON.parse(event.value)
            } catch (error) {
            }
        },
        showDeviceList() {
            nativeService.getCurrentHomeInfo().then(
                (resp) => {
                    const items = resp.deviceList.map((item) => {
                        return item.deviceName + "-" + item.deviceId
                    })
                    var pickItem = [{
                        index: this.deviceIndex,
                        item: items,
                        label: ""
                    }]
                    picker.pick({
                        'items': pickItem,
                        'title': '选择设备', //取消和确定中间那标题
                        'cancelTxt': '取消', //取消按钮文字
                        'confirmTxt': '确定', //确定按钮文字,
                        'cancelTxtColor': '#666666', //取消颜色
                        'confirmTxtColor': '#000000', //标题颜色
                        'titleColor': '#000000', //标题颜色
                        'titleBgColor': '#E7EDEF' //标题栏颜色
                    }, event => {
                        if (event.result == 'success') {
                            var dataArr = event.data.replace("[", "").replace("]", "").split(",");
                            this.deviceIndex = dataArr[0]
                            this.messageParam.deviceId = resp.deviceList[this.deviceIndex].deviceId;
                        }
                    });
                }
            ).catch((error) => {
                nativeService.toast(error)
            })
        },
        mideaButtonClicked() {
            nativeService.showControlPanelPage(this.messageParam).then(
                (resp) => {
                    this.result = resp
                }
            ).catch((error) => {
                nativeService.toast(error)
            })
        }
    },
    created() {
    }
};
</script>