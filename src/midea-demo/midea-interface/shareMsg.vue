<template>
    <div class="wrapper">
        <midea-header title="shareMsg" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <div class="icon-group">
            <textarea type="text" placeholder="Input Text" class="display-text" :value="messageParamString" @input="dataChange" rows=5 />
            <image class="icon-scan" src="../assets/img/service_ic_scan@3x.png" @click="scanParam"></image>
        </div>
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
.icon-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
}
.icon-scan {
    height: 44px;
    width: 44px;
}
.display-text {
    width: 640px;
    font-size: 30px;
    margin: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: #bbbbbb;
}
.textarea {
    font-size: 30px;
    width: 640px;
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
        },
        scanParam() {
            nativeService.scanCode().then(
                (resp) => {
                    try {
                        this.messageParam = JSON.parse(resp.data)
                    } catch (error) {
                    }
                }
            ).catch((error) => {
            })
        }
    },
    created() {
    }
};
</script>