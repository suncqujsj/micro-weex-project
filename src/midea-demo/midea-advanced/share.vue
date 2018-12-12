<template>
    <div class="wrapper">
        <midea-header title="Share" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="点击调用分享功能" @mideaButtonClicked="showSharePannel"></midea-button>
        <web style="flex:1; width: 750px;" :src="link"> </web>
    </div>
</template>


<script> 
import base from '../base'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'

export default {
    components: { mideaButton },
    mixins: [base],
    data() {
        return {
            link: "http://www.midea.com/cn/"
        }
    },
    methods: {
        showSharePannel() {
            let params = {
                title: '分享标题', // 分享标题
                desc: '分享描述', // 分享描述
                link: this.link, // 分享链接
                imgUrl: 'http://10.16.12.243/anonymous/json/weibo/1740248463_180.jpg', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            }
            nativeService.showSharePanel(params, function () {
                nativeService.toast("分享成功")
            }, function () {
                nativeService.toast("分享失败")
            })
        }
    },
    created() {

    }
}

</script>


<style>
.header {
}
</style>