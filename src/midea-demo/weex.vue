<template>
    <div class="wrapper" ref="wrapper">
        <midea-header title="DolphinWeex" :isImmersion="false" @leftImgClick="back"></midea-header>
        <midea-tab ref="mTab" :tabArray="tabData" @tabClicked="tabClicked">
        </midea-tab>

        <slider :value="val" :index="index" @change="changeArea" class="slider" auto-play="false">
            <div class="sample-list">
                <list show-scrollbar="true">
                    <midea-cell :clickActivied="true" v-for="(item,index) in sortedBaseList" :key="'tab1'+index" :title="item.title" height="120" :has-arrow="true" @mideaCellClick="goToBase(item.link)">
                    </midea-cell>
                </list>
            </div>
            <div class="sample-list">
                <list show-scrollbar="true">
                    <midea-cell :clickActivied="true" v-for="(item,index) in sortedAdvancedlist" :key="'tab2'+index" :title="item.title" height="120" :has-arrow="true" @mideaCellClick="goToAdvanced(item.link)">
                    </midea-cell>
                </list>
            </div>
            <div class="sample-list">
                <list show-scrollbar="true">
                    <midea-cell :clickActivied="true" v-for="(item,index) in sortedInterfacelist" :key="'tab2'+index" :title="item.title" height="120" :has-arrow="true" @mideaCellClick="goToInterface(item.link)">
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
  height: 1050px;
}
</style>
<script>  
import base from './base'

import mideaTab from '@/midea-component/mTab.vue';
import mideaCell from '@/midea-component/item.vue';
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: {
        mideaTab,
        mideaCell
    },
    mixins: [base],
    data: () => ({
        tabData: [
            { "name": "基本组件", "selected": true },
            { "name": "高级组件", "selected": false },
            { "name": "Dolphin接口", "selected": false }
        ],
        val: 0,
        index: 0,
        baseList: [
            { title: 'Button按钮', link: "button" },
            { title: 'CheckBox', link: "checkbox" },
            { title: 'Cell', link: "cell" },
            { title: 'Confirm', link: "confirm" },
            { title: 'Dialog', link: "dialog" },
            { title: 'List', link: "list" },
            { title: 'Modal', link: "modal" },
            { title: 'Popup', link: "popup" },
            { title: 'Promt', link: "promt" },
            { title: 'Radio', link: "radio" },
            { title: 'Select', link: "select" },
            { title: 'Switch', link: "switch" },
        ],
        advancedlist: [
            { title: 'Action Sheet', link: "actionSheet" },
            { title: 'Barchart柱状图', link: "barchart" },
            { title: 'Grid Select', link: "gridSelect" },
            { title: 'Header', link: "header" },
            { title: 'IconFont字体图标', link: "iconFont" },
            { title: 'Linechart折线图', link: "linechart" },
            { title: 'Loading上拉加载', link: "loading" },
            { title: 'Nav List', link: "navList" },
            { title: 'Picker', link: "picker" },
            { title: 'Progress进度条', link: "progress" },
            { title: 'Refresh下拉刷新', link: "refresh" },
            { title: 'Share打开分享弹窗', link: "share" },
            { title: 'Slider拉动条', link: "slider" },
            { title: 'Swipe手势', link: "swipe" },
            { title: 'Tab', link: "tab" },
            { title: 'TimeCycle时间转盘', link: "timeCycle" },
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
            { title: 'navigator页面跳转', link: "navigatorPageA" },
            { title: 'openNativeSystemPage打开系统页面', link: "openNativeSystemPage" },
            { title: 'receiveMessageFromApp接收APP主动调用', link: "receiveMessageFromApp" },
            { title: 'sendHttpRequest直接发送网络请求', link: "sendHttpRequest" },
            { title: 'setBackHandle监听安卓返回键', link: "setBackHandle" },
            { title: 'shareMsg调用分享', link: "shareMsg" },
            { title: 'showLoading打开原生loading界面', link: "showLoading" },
            { title: 'showLoadingWithMsg打开原生loading界面', link: "showLoadingWithMsg" },
            { title: 'showSharePanel打开分享界面', link: "showSharePanel" },
            { title: 'updateDeviceInfo更新当前设备信息', link: "updateDeviceInfo" },
            { title: 'weex环境变量', link: "weexEnv" }
        ]
    }),
    computed: {
        sortedBaseList() {
            return this.baseList.sort(this.compare)
        },
        sortedAdvancedlist() {
            return this.advancedlist.sort(this.compare)
        },
        sortedInterfacelist() {
            return this.interfacelist.sort(this.compare)
        }
    },
    methods: {
        compare(a, b) {
            return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        },
        tabClicked(tabIndex) {
            this.index = tabIndex;
        },
        changeArea(sliObj) {
            var sliderIndex = sliObj.index;
            this.$refs.mTab.tabClicked(sliderIndex);
        },
        goToBase(link) {
            var path = "midea-base/" + link + ".js";
            nativeService.goTo(path);
        },
        goToAdvanced(link) {
            var path = "midea-advanced/" + link + ".js";
            nativeService.goTo(path);
        },
        goToInterface(link) {
            var path = "midea-interface/" + link + ".js";
            nativeService.goTo(path, {viewTag: link});
        }
    }
};
</script>