<template>
    <div class="wrapper">
        <midea-header title="uploadImgFile上传图片" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="接口参数:"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" :value="messageParamString" @input="dataChange" rows=4 />
        <midea-button text="选择照片" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <midea-button text="上传照片" :disabled="!messageParam.path" @mideaButtonClicked="submit">
        </midea-button>
        <midea-title-bar title="结果"></midea-title-bar>
        <scroller>
            <image :src="chooseResult.filePath" class="photo"></image>
            <text class="display-block">{{result?('上传返回类型:'+typeof result):''}}</text>
            <text class="display-block">{{result}}</text>
        </scroller>
    </div>
</template>
<style scoped>
.textarea {
  font-size: 30px;
  width: 750px;
  border-color: gray;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 30px;
  height: 250px;
}
.display-block {
  font-size: 30px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.photo {
  margin: 5px;
  width: 200px;
  height: 200px;
  border-color: #e2e2e2;
  border-width: 1px;
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
                path: "", //值为 图片在手机中的路径
                url: "https://i.mideav.com/familyphoto/v2/add.do", //值为服务器上传图片的url:https://i.mideav.com/familyphoto/v2/add.do
                compressRage: 40, //图片的压缩率，范围为0~100，数值越高保真率越高。默认值：100，不压缩，直接上传图片 ps: 压缩后的图片文件格式，固定为jpg 格式
                netParam: {
                    fridgeid: "1234", //weex需要原生填充给服务器的post 表单参数1
                    token: "eb209d70b7b9539773a7cd76c1fb60ad21e223e1e8deda3b9003ec43caa532503c005524093ce2274ebbf395420eadd5"
                },
                fileKey: "photos", //值为原生在post表单中传输图片文件的key值，缺省默认值为“file”
            },
            chooseResult: {},
            result: null
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
        mideaButtonClicked() {
            nativeService.choosePhoto({
                compressRage: 60,
                type: 'jpg',
                isNeedBase64: false
            }).then(
                (resp) => {
                    this.chooseResult = resp
                    this.messageParam.path = this.chooseResult.filePath
                }
            ).catch((error) => {
                this.result = "error: " + JSON.stringify(error || {})
            })
        },
        submit() {
            if (!this.messageParam.path) return

            nativeService.uploadImgFile(this.messageParam,
                (resp) => {
                    let result = resp
                    try {
                        result = JSON.parse(resp)
                    } catch (error) { }

                    if (result.progress >= 100 && result.msg) {
                        try {
                            this.result = JSON.parse(result.msg)
                        } catch (error) {
                            nativeService.toast("解析失败")
                            this.result = "error: " + JSON.stringify(error || {})
                        }
                    }
                }, (error) => {
                    nativeService.toast("上传失败")
                    this.result = "error: " + JSON.stringify(error || {})
                })
        }
    },
    created() {
    }
};
</script>