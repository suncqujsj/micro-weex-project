<template>
    <div class="wrapper">
        <midea-header title="第三方SDK接口" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="接口参数:"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" :value="messageParamString" @input="dataChange" rows=3 />
        <midea-title-bar title="调用第三方SDK接口"></midea-title-bar>
        <midea-button text="没有参数和回调" @mideaButtonClicked="methodWithNoArg">
        </midea-button>
        <midea-button text="只有参数" @mideaButtonClicked="methodWithArg">
        </midea-button>
        <midea-button text="只有一个回调" @mideaButtonClicked="methodWithCallback">
        </midea-button>
        <midea-button text="只有两个回调" @mideaButtonClicked="methodWithCallback2">
        </midea-button>
        <midea-button text="一个参数一个回调" @mideaButtonClicked="methodWithArgAndCallback">
        </midea-button>
        <midea-button text="参数和两个回调" @mideaButtonClicked="methodWithArgAndCallback2">
        </midea-button>
        <text class="display-block">

        </text>
        <!-- <midea-title-bar title="结果"></midea-title-bar>
        <text class="display-block">{{result}}</text> -->
    </div>
</template>
<style scoped>
.textarea {
  font-size: 30px;
  width: 750px;
  border-color: gray;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 100px;
}
.display-block {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
<script>

import base from '../base'
import mideaButton from '@/midea-component/button.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            messageParam: {
                messageType: 'getUserInfo'
            },
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
        methodWithNoArg() {
            nativeService.interfaceForThirdParty()
        },
        methodWithArg() {
            nativeService.interfaceForThirdParty(
                this.messageParam
            )
        },
        methodWithCallback() {
            nativeService.interfaceForThirdParty(
                function (resp) {
                    nativeService.toast(resp)
                }
            )
        },
        methodWithCallback2() {
            nativeService.interfaceForThirdParty(
                function (resp) {
                    nativeService.toast(resp)
                },
                function (error) {
                    nativeService.toast(error)
                }
            )
        },
        methodWithArgAndCallback() {
            nativeService.interfaceForThirdParty(
                this.messageParam,
                function (resp) {
                    nativeService.toast(resp)
                }
            )
        },
        methodWithArgAndCallback2() {
            nativeService.interfaceForThirdParty(
                this.messageParam,
                function (resp) {
                    nativeService.toast(resp)
                },
                function (error) {
                    nativeService.toast(error)
                }
            )
        }
    },
    created() {
    }
};
</script>