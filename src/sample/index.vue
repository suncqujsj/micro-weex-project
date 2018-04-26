<template>
    <div class="wrapper" ref="wrapper">
        <midea-header title="DolphinWeex" :isImmersion="false" @leftImgClick="leftImgClick"></midea-header>
        <midea-tab ref="mTab" :tabArray="tabData" @tabClicked="tabClicked">
        </midea-tab>

        <slider :value="val" :index="index" @change="changeArea" class="slider" auto-play="false">
            <div class="sample-list">
                <list show-scrollbar="true">
                    <midea-cell :clickActivied="true" v-for="(item,index) in sortedMeijulist" :key="'tab2'+index" :title="item.title" height="120" :has-arrow="true" @mideaCellClick="goToMeiju(item.link)">
                    </midea-cell>
                </list>
            </div>
            <div class="sample-list">
                <list show-scrollbar="true">
                    <midea-cell :clickActivied="true" v-for="(item,index) in sortedInterfacelist" :key="'tab2'+index" :title="item.title" height="120" :has-arrow="true" @mideaCellClick="goToInterface(item.link)">
                    </midea-cell>
                </list>
            </div>
            <div class="sample-list">
                <list show-scrollbar="true" :style="{height:'1050px'}">
                    <midea-cell :clickActivied="true" v-for="(item,index) in sortedList" :key="'tab1'+index" :title="item.title" height="120" :has-arrow="true" @mideaCellClick="goTo(item.link)">
                    </midea-cell>
                </list>
            </div>
        </slider>
    </div>
</template>
<style scoped>
.wrapper {
  position: relative;
}
.sample-list {
  width: 750px;
  height: 1050px;
}
.slider {
  width: 750px;
}
</style>
<script>  import base from './base'

import mideaHeader from '@/midea-component/header.vue'
import mideaTab from '@/midea-component/mTab.vue';
import mideaCell from '@/midea-component/item.vue';
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: {
        mideaHeader,
        mideaTab,
        mideaCell
    },
    data: () => ({
        tabData: [
            { "name": "Dolphin组件", "selected": true },
            { "name": "Dolphin接口", "selected": false },
            { "name": "基本组件", "selected": false }
        ],
        val: 0,
        index: 0,
        meijulist: [
            { title: 'Button按钮', link: "button" },
            { title: 'Barchart柱状图', link: "barchart" },
            { title: 'CheckBox', link: "checkbox" },
            { title: 'Confirm', link: "confirm" },
            { title: 'Device Status', link: "device-status" },
            { title: 'Header', link: "header" },
            { title: 'Linechart折线图', link: "linechart" },
            { title: 'List', link: "list" },
            { title: 'Loading', link: "loading" },
            { title: 'Nav List', link: "navList" },
            { title: 'Picker', link: "picker" },
            { title: 'Popup', link: "popup" },
            { title: 'Progress', link: "progress" },
            { title: 'Refresh', link: "refresh" },
            { title: 'Select', link: "select" },
            { title: 'Share', link: "share" },
            { title: 'Slider', link: "slider" },
            { title: 'Switch', link: "switch" },
            { title: 'Tab', link: "tab" },
            { title: 'Video视频', link: "video" }
        ],
        interfacelist: [
            { title: 'callTel打电话', link: "callTel" },
            { title: 'getCurrentHomeInfo获取当前家庭信息', link: "getCurrentHomeInfo" },
            { title: 'getDeviceInfo获取当前设备信息', link: "getDeviceInfo" },
            { title: 'getNetworkStatus获取网络信息', link: "getNetworkStatus" },
            { title: 'getUserInfo获取用户信息', link: "getUserInfo" },
            { title: 'hapticFeedback手机震动', link: "hapticFeedback" },
            { title: 'interfaceForThirdParty第三方SDK接口', link: "interfaceForThirdParty" },
            { title: 'jumpNativePage打开原生页面', link: "jumpNativePage" },
            { title: 'openNativeSystemPage打开系统页面', link: "openNativeSystemPage" },
            { title: 'receiveMessageFromApp接收APP主动调用', link: "receiveMessageFromApp" },
            { title: 'shareMsg调用分享', link: "shareMsg" },
            { title: 'showLoading打开原生loading界面', link: "showLoading" },
            { title: 'showLoadingWithMsg打开原生loading界面', link: "showLoadingWithMsg" },
            { title: 'showSharePanel打开分享界面', link: "showSharePanel" },
            { title: 'updateDeviceInfo更新当前设备信息', link: "updateDeviceInfo" },
            { title: 'weex环境变量', link: "weexEnv" }
        ],
        list: [
            { title: 'Action Sheet', link: "actionSheet" },
            // { title: 'Button', link: "button" },
            // { title: 'Cell', link: "cell" },
            // { title: 'CheckBox', link: "checkbox" },
            { title: 'Dialog', link: "dialog" },
            { title: 'Grid Select', link: "gridSelect" },
            // { title: 'List', link: "list" },
            { title: 'Modal', link: "modal" },
            // { title: 'Nav List', link: "navList" },
            // { title: 'Picker', link: "picker" },
            // { title: 'Popup', link: "popup" },
            // { title: 'Progress', link: "progress" },
            { title: 'Promt', link: "promt" },
            { title: 'Radio', link: "radio" }
            // { title: 'Slider', link: "slider" },
            // { title: 'Swiper', link: "swiper" },
            // { title: 'Switch', link: "switch" },
            // { title: 'Tab', link: "tab" }
        ]
    }),
    computed: {
        deviceHeight() {
            return weex.config.env.deviceHeight
        },
        sortedMeijulist() {
            return this.meijulist.sort(this.compare)
        },
        sortedInterfacelist() {
            return this.interfacelist.sort(this.compare)
        },
        sortedList() {
            return this.list.sort(this.compare)
        }
    },
    methods: {
        compare(a, b) {
            return a.title > b.title ? 1 : -1
        },
        leftImgClick() {
            nativeService.goBack()
        },
        tabClicked(tabIndex) {
            this.index = tabIndex;
        },
        changeArea(sliObj) {
            var sliderIndex = sliObj.index;
            this.$refs.mTab.tabClicked(sliderIndex);
        },
        goToMeiju(link) {
            var path = "midea-sample/" + link + ".js";
            nativeService.goTo(path);
        },
        goToInterface(link) {
            var path = "midea-interface/" + link + ".js";
            nativeService.goTo(path);
        },
        goTo(link) {
            var path = "sample/" + link + ".js";
            nativeService.goTo(path);
        }
    }
};
</script>