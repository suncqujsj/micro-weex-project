<template>
    <div class="wrapper" ref="wrapper">
        <midea-header title="DolphinWeex" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="./assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-tab ref="mTab" :tabArray="tabData" @tabClicked="tabClicked">
        </midea-tab>
        <slider ref="slider" :value="val" :index="index" @change="changeArea" :class="['slider', env.platform=='Web'&&'web-page']" auto-play="false">
            <div :class="['sample-div', env.platform=='Web'&&'web-page']">
                <list :class="['sample-list', env.platform=='Web'&&'web-page']" :style="{'height':containerHeight}" show-scrollbar="true">
                    <midea-cell :clickActivied="true" v-for="(item,index) in sortedBaseList" :key="'tab1'+index" :title="item.title" height="120" :has-arrow="true" @mideaCellClick="goToBase(item.link)">
                    </midea-cell>
                </list>
            </div>
            <div :class="['sample-div', env.platform=='Web'&&'web-page']">
                <list :class="['sample-list', env.platform=='Web'&&'web-page']" :style="{'height':containerHeight}" show-scrollbar="true">
                    <midea-cell :clickActivied="true" v-for="(item,index) in sortedAdvancedlist" :key="'tab2'+index" :title="item.title" height="120" :has-arrow="true" @mideaCellClick="goToAdvanced(item.link)">
                    </midea-cell>
                </list>
            </div>
            <div :class="['sample-div', env.platform=='Web'&&'web-page']">
                <list :class="['sample-list', env.platform=='Web'&&'web-page']" :style="{'height':containerHeight}" show-scrollbar="true">
                    <midea-cell :clickActivied="true" v-for="(item,index) in sortedInterfacelist" :key="'tab2'+index" :title="item.title" height="120" :has-arrow="true" @mideaCellClick="goToInterface(item.link)">
                    </midea-cell>
                </list>
            </div>
            <div :class="['sample-div', env.platform=='Web'&&'web-page']">
                <list :class="['sample-list', env.platform=='Web'&&'web-page']" :style="{'height':containerHeight}" show-scrollbar="true">
                    <midea-cell :clickActivied="true" v-for="(item,index) in sortedWeexlist" :key="'tab2'+index" :title="item.title" height="120" :has-arrow="true" @mideaCellClick="goToWeex(item.link)">
                    </midea-cell>
                </list>
            </div>
        </slider>
    </div>
</template>
<style scoped>
.wrapper {
  position: relative;
  flex: 1;
  flex-direction: column;
  background-color: #f2f2f2;
}
.slider {
  width: 750px;
  flex: 1;
}
.sample-div {
  width: 750px;
  flex: 1;
  position: relative;
}
.sample-list {
  width: 750px;
}
.web-page {
  height: 1200px;
  overflow: scroll;
}
</style>
<script>  
import base from './base'

import mideaTab from '@/midea-component/mTab.vue';
import mideaCell from '@/midea-component/item.vue';
import nativeService from '@/common/services/nativeService'
const dom = weex.requireModule('dom')

module.exports = {
    components: {
        mideaTab,
        mideaCell
    },
    mixins: [base],
    data: () => ({
        env: weex.config.env,
        tabData: [
            { "name": "基本组件", "selected": true },
            { "name": "高级组件", "selected": false },
            { "name": "Dolphin接口", "selected": false },
            { "name": "Weex接口", "selected": false }
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
            { title: 'Swiper', link: "swiper" },
            { title: 'Accordion', link: "accordion" },
            { title: 'confirmBox底部确认弹出框', link: "confirmBox" },
            { title: 'Web组件', link: "web" },
        ],
        advancedlist: [
            { title: 'Action Sheet', link: "actionSheet" },
            { title: 'BindingX动效(^5.2.0)', link: "bindingx" },
            { title: 'BindingX拖拽(^5.2.0)', link: "bindingx_Pan" },
            { title: 'Barchart柱状图', link: "barchart" },
            { title: 'GCanvas画布(^5.2.0)', link: "gcanvas" },
            { title: 'Grid Select', link: "gridSelect" },
            { title: 'Header', link: "header" },
            { title: 'IconFont字体图标', link: "iconFont" },
            { title: 'imageZoom', link: "imageZoom" },
            { title: 'Linechart折线图', link: "linechart" },
            { title: 'Loading上拉加载', link: "loading" },
            { title: 'lottieView动效视图', link: "lottieView" },
            { title: 'map地图', link: "map" },
            { title: 'mapPointPick地图选点', link: "mapPointPick" },
            { title: 'Nav List', link: "navList" },
            { title: 'Picker', link: "picker" },
            { title: 'ppVideo', link: "ppvideo" },
            { title: 'Progress进度条', link: "progress" },
            { title: 'Progresscycle环形进度条', link: "progresscycle" },
            { title: 'Refresh下拉刷新', link: "refresh" },
            { title: 'Refresh下拉刷新（非满屏可以下拉）', link: "refreshList" },
            { title: 'Share打开分享弹窗', link: "share" },
            { title: 'Slider拉动条', link: "slider" },
            { title: 'Swipe手势', link: "swipe" },
            { title: 'Tab', link: "tab" },
            // { title: 'TimeCycle时间转盘', link: "timeCycle" },
            { title: 'Video视频', link: "video" },
            { title: 'scrollPicker滚动选择器', link: "scrollPicker" },
            { title: 'customLoading自定义加载', link: 'customLoading'}
        ],
        interfacelist: [
            { title: 'callTel打电话', link: "callTel" },
            { title: 'choosePhoto选相片', link: "choosePhoto" },
            { title: 'chooseMulPhoto多选相片', link: "chooseMulPhoto" },
            { title: 'downloadImageWithCookie', link: "downloadImageWithCookie" },
            { title: 'getAuthToken获取智慧云的token', link: "getAuthToken" },
            { title: 'getCurrentHomeInfo获取当前家庭信息', link: "getCurrentHomeInfo" },
            { title: 'getUserInfo获取当前用户信息', link: "getUserInfo" },
            { title: 'getDeviceInfo获取当前设备信息', link: "getDeviceInfo" },
            { title: 'getGPSInfo获取GPS定位信息', link: "getGPSInfo" },
            { title: 'getLoginInfo获取登录态', link: "getLoginInfo" },
            { title: 'getNetworkStatus获取网络信息', link: "getNetworkStatus" },
            { title: 'getWeexPath获取weex页面根目录', link: "getWeexPath" },
            { title: 'hapticFeedback手机震动', link: "hapticFeedback" },
            { title: 'interfaceForThirdParty第三方SDK接口', link: "interfaceForThirdParty" },
            { title: 'jumpNativePage打开原生页面', link: "jumpNativePage" },
            { title: 'killKeyboard关闭键盘', link: "killKeyboard" },
            { title: 'launchMapApp打开地图软件', link: "launchMapApp" },
            { title: 'navigator页面跳转', link: "navigatorPageA" },
            { title: 'openNativeSystemPage打开系统页面', link: "openNativeSystemPage" },
            { title: 'receiveMessageFromApp接收APP主动调用', link: "receiveMessageFromApp" },
            { title: 'recordAudio录音', link: "recordAudio" },
            { title: 'scanCode扫描', link: "scanCode" },
            { title: 'searchMapAddress地图地址搜索', link: "searchMapAddress" },
            { title: 'sendHttpRequest直接发送网络请求', link: "sendHttpRequest" },
            { title: 'setBackHandle监听安卓返回键', link: "setBackHandle" },
            { title: 'shareMsg调用分享', link: "shareMsg" },
            { title: 'showLoading打开原生loading界面', link: "showLoading" },
            { title: 'showLoadingWithMsg打开原生loading界面', link: "showLoadingWithMsg" },
            { title: 'showSharePanel打开分享界面', link: "showSharePanel" },
            { title: 'startCmdProcess透传', link: "startCmdProcess" },
            { title: 'takePhoto照相', link: "takePhoto" },
            { title: 'updateDeviceInfo更新当前设备信息', link: "updateDeviceInfo" },
            { title: 'updateAutoList更新自动化列表', link: "updateAutoList" },
            { title: 'uploadImgFile上传图片', link: "uploadImgFile" },
            { title: 'weexBundleToWeb跳转web页面', link: "weexBundleToWeb" },
            { title: 'burialPoint美居埋点', link: "burialPoint" }
        ],
        weexList: [
            { title: 'BroadcastChannel示例', link: "broadcastChannelA" },
            { title: 'storage数据', link: "storage" },
            { title: 'weex环境变量', link: "weexEnv" },
            { title: 'remotePage测试页面', link: "remotePage" },
        ],
        containerHeight: 1200
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
        },
        sortedWeexlist() {
            return this.weexList.sort(this.compare)
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
            nativeService.goTo(path, { viewTag: link });
        },
        goToWeex(link) {
            var path = "midea-weex/" + link + ".js";
            nativeService.goTo(path, { viewTag: link });
        }
    },
    mounted() {
        dom.getComponentRect(this.$refs.slider, option => {
            this.containerHeight = option.size.height
        })
    }
};
</script>