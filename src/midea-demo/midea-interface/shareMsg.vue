<template>
    <div class="wrapper">
        <midea-header title="shareMsg" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <midea-title-bar title="接口参数:"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" :value="messageParamString" @input="dataChange" rows=5 />
        <midea-button text="微信分享" @mideaButtonClicked="mideaButtonClicked('wx')">
        </midea-button>
        <midea-button text="QQ分享" @mideaButtonClicked="mideaButtonClicked('qq')">
        </midea-button>
        <midea-button text="短信分享" @mideaButtonClicked="mideaButtonClicked('sms')">
        </midea-button>
        <midea-button text="新浪微博分享" @mideaButtonClicked="mideaButtonClicked('weibo')">
        </midea-button>
        <midea-button text="QQ空间分享" @mideaButtonClicked="mideaButtonClicked('qzone')">
        </midea-button>
        <midea-button text="微信朋友圈分享" @mideaButtonClicked="mideaButtonClicked('wxTimeline')">
        </midea-button>

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
        mideaButtonClicked(type) {
            let param = Object.assign(this.messageParam, {
                'type': type
            })
            nativeService.shareMsg(param).then(
                (resp) => {
                    // nativeService.toast(resp)
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