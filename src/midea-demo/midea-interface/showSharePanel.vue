<template>
    <div class="wrapper">
        <midea-header title="打开分享界面" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="接口参数:"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" :value="messageParamString" @input="dataChange" rows=5 />
        <midea-button text="执行showSharePannel" @mideaButtonClicked="showSharePannel">
        </midea-button>
        <text class="display-text">
            let params = {
                title: '分享标题', // 分享标题
                desc: '分享描述', // 分享描述
                link: 'http://www.midea.com/cn/', // 分享链接
                imgUrl: 'http://10.16.12.243/anonymous/json/weibo/1740248463_180.jpg', // 分享图标
            }
            
            nativeService.showSharePanel(params).then(
                (resp) => {
                    nativeService.toast("分享调用成功")
                }
            ).catch((error) => {
                nativeService.toast("分享调用失败")
            })
        </text>
    </div>
</template>
<style scoped>
.textarea {
  font-size: 30px;
  width: 750px;
  border-color: gray;
  margin-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 30px;
}
.displayBtnStyle {
  display: inline-flex;
  border-radius: 0px;
}
.display-text {
  font-size: 30px;
}
</style>
<script>
import base from '../base'

import mideaHeader from '@/midea-component/header.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaHeader, mideaButton },
    mixins: [base],
    data() {
        return {
            messageParam: {
                title: '分享标题', // 分享标题
                desc: '分享描述', // 分享描述
                link: 'http://www.midea.com/cn/', // 分享链接
                imgUrl: 'http://10.16.12.243/anonymous/json/weibo/1740248463_180.jpg', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            }
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
        showSharePannel() {
            nativeService.showSharePanel(this.messageParam).then(
                (resp) => {
                    nativeService.toast("分享调用成功")
                }
            ).catch((error) => {
                nativeService.toast("分享调用失败")
            })
        }
    },
    created() {
        //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
};
</script>