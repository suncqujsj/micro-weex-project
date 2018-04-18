<template>
    <div class="wrapper">
        <midea-header title="打开分享界面" :isImmersion="false" @leftImgClick="leftImgClick"></midea-header>
        <midea-button text="执行showSharePannel" type="green" @mideaButtonClicked="showSharePannel">
        </midea-button>
        <text>
            let params = {
                title: '分享标题', // 分享标题
                desc: '分享描述', // 分享描述
                link: 'http://www.midea.com/cn/', // 分享链接
                imgUrl: 'http://10.16.12.243/anonymous/json/weibo/1740248463_180.jpg', // 分享图标
            }
            
            nativeService.showSharePanel(params).then(
                (resp) => {
                    nativeService.toast("分享成功")
                }
            ).catch((error) => {
                nativeService.toast("分享失败")
            })
        </text>
    </div>
</template>
<style scoped>
.displayBtnStyle {
  display: inline-flex;
  border-radius: 0px;
}
</style>
<script>

import mideaHeader from '@/midea-component/header.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaHeader, mideaButton },
    data() {

    },
    methods: {
        showSharePannel() {
            let params = {
                title: '分享标题', // 分享标题
                desc: '分享描述', // 分享描述
                link: 'http://www.midea.com/cn/', // 分享链接
                imgUrl: 'http://10.16.12.243/anonymous/json/weibo/1740248463_180.jpg', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            }
            nativeService.showSharePanel(params).then(
                (resp) => {
                    nativeService.toast("分享成功")
                }
            ).catch((error) => {
                nativeService.toast("分享失败")
            })
        },
        leftImgClick() {
            nativeService.goBack()
        }
    },
    created() {
        //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
};
</script>