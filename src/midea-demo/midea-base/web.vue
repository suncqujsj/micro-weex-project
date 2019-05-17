<template>
    <div class="wrapper">
        <midea-header title="Web" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="false">
            <div slot="customerContent" class="header-top-wrapper">
                <div class="header-top-inner-wrapper">
                    <image class="address-go" src="../assets/img/smart_ic_reline@3x.png" @click="changeUrl"></image>
                    <input class="address" type="url" placeholder="输入网页地址" v-model="address" singleline=true return-key-type="go" @return="changeUrl" />
                    <image class="address-go" src="../assets/img/service_ic_scan@3x.png" @click="scanUrl"></image>
                </div>
            </div>
        </midea-header>
        <web v-if="isShow" @message="onMessage" style="flex:1; width: 750px;" :src="url"> </web>
    </div>
</template>
<style scoped>
.wrapper {
    background-color: #f2f2f2;
}
.header-top-wrapper {
    position: absolute;
    right: 0px;
    bottom: 0px;
    height: 88px;
}
.header-top-inner-wrapper {
    position: relative;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 660px;
    height: 88px;
    margin-right: 18px;
}
.address {
    flex: 1;
    height: 64px;
    background-color: #f2f2f2;
    border-radius: 2px;
    padding-left: 10px;
    margin-left: 18px;
    margin-right: 18px;
    overflow: hidden;
}
.address-go {
    height: 44px;
    width: 44px;
}
</style>
<script>  
import base from '../base'

import mideaTitleBar from '@/midea-component/title-bar.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'
// const defaultUrl = "http://10.8.81.30:8082/index.html?title=aaa&content=bbb"
// const defaultUrl = "../static/htmlEditor/index.html"
const defaultUrl = "http://living.midea.com/v1/foodRecipes/enterMdotMenu?userId=1741829&menuId=11001&deviceId=28587302423321&deviceType=0xEA&modelNo=00000027&openId=1741829&flag=mSmartControl&targetInt=rice_detail&riceCode=6957901500358"
module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            isShow: true,
            address: defaultUrl,
            url: defaultUrl
        }
    },
    methods: {
        changeUrl() {
            this.isShow = false
            this.$nextTick(() => {
                this.url = this.address
                this.isShow = true
            })
        },
        scanUrl() {
            nativeService.scanCode().then(
                (resp) => {
                    this.isShow = false
                    this.address = resp.data
                    this.$nextTick(() => {
                        this.url = this.address
                        this.isShow = true
                    })
                }
            ).catch((error) => {
            })
        },
        onMessage(data) {
            if (!data) return
            if (data.data.action == "goBack") {
                nativeService.goBack()
            }
            else if (data.data.action == "submit") {
                nativeService.alert(data.data)
            }
        }
    },
    created() {
    }
};
</script>