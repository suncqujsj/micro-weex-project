<template>
    <div class="wrapper" ref="wrapper">
        <midea-tab ref="mTab" :tabArray="tabData" @tabClicked="tabClicked">
        </midea-tab>

        <slider :value="val" :index="index" @change="changeArea" class="slider" auto-play="false">
            <div class="sample-list">
                <list show-scrollbar="false">
                    <midea-cell :clickActivied="true" v-for="(item,index) in meijulist" :key="'tab2'+index" :title="item.title" height="120" :has-arrow="true" @mideaCellClick="goToMeiju(item.link)">
                    </midea-cell>
                </list>
            </div>
            <div class="sample-list">
                <list show-scrollbar="false" :style="{height:'1050px'}">
                    <midea-cell :clickActivied="true" v-for="(item,index) in list" :key="'tab1'+index" :title="item.title" height="120" :has-arrow="true" @mideaCellClick="goTo(item.link)">
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
}
.slider {
  width: 750px;
}
</style>
<script>

import mideaTab from '../midea-component/mTab.vue';
import mideaCell from '../midea-component/item.vue';
import nativeService from '../common/services/nativeService'

module.exports = {
    components: {
        mideaTab,
        mideaCell
    },
    data: () => ({
        tabData: [
            { "name": "美居组件", "selected": true },
            { "name": "基本组件", "selected": false }
        ],
        val: 0,
        index: 0,
        meijulist: [
            { title: 'Button', link: "button" },
            { title: 'CheckBox', link: "checkbox" },
            { title: 'Confirm', link: "confirm" },
            { title: 'Device Status', link: "device-status" },
            { title: 'Header', link: "header" },
            { title: 'List', link: "list" },
            { title: 'Loading', link: "loading" },
            { title: 'Nav List', link: "navList" },
            { title: 'Picker', link: "picker" },
            { title: 'Popup', link: "popup" },
            { title: 'Progress', link: "progress" },
            { title: 'Refresh', link: "refresh" },
            { title: 'Select', link: "select" },
            { title: 'Slider', link: "slider" },
            { title: 'Switch', link: "switch" },
            { title: 'Tab', link: "tab" }
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
        }
    },
    methods: {
        tabClicked(tabIndex) {
            this.index = tabIndex;
        },
        changeArea(sliObj) {
            var sliderIndex = sliObj.index;
            this.$refs.mTab.tabClicked(sliderIndex);
        },
        goToMeiju(link) {
            var path = "src/midea-sample/" + link + ".js";
            nativeService.goTo(path);
        },
        goTo(link) {
            var path = "src/sample/" + link + ".js";
            nativeService.goTo(path);
        }
    }
};
</script>