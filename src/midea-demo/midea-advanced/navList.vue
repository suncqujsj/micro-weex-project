<template>
    <div>
        <midea-header title="Nav List" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller class="wrapper">
            <div style="padding:24px;">
                <text style="font-size:28px">居中，默认高度</text>
            </div>
            <div class="container">
                <m-nav-list :list="navList" :cols="4" @itemClicked="itemClicked">
                </m-nav-list>
            </div>
            <div style="padding:24px;">
                <text style="font-size:28px">两边对齐，自定义高度</text>
            </div>
            <div class="container">
                <m-nav-list :list="navList" type="spaceBetween" :cols="4" height="200" @itemClicked="itemClicked">
                </m-nav-list>
            </div>
            <div style="padding:24px;">
                <text style="font-size:28px">横向内容，默认高度</text>
            </div>
            <div class="container-h">
                <m-nav-list :list="hNavList" direction="h" :cols="3" @itemClicked="itemClicked">
                </m-nav-list>
            </div>
            <div style="padding:24px;">
                <text style="font-size:28px">横向内容，两边对齐，自定义高度</text>
            </div>
            <div class="container-h">
                <m-nav-list :list="hNavList" direction="h" type="spaceBetween" :cols="3" height="200" @itemClicked="itemClicked">
                </m-nav-list>
            </div>
        </scroller>
    </div>
</template>
<style scoped>
.wrapper {
  background-color: #f2f2f2;
}
.container {
  background-color: #ffffff;
}
.container-h {
  padding-left: 24px;
  padding-right: 24px;
  background-color: #ffffff;
}
</style>
<script>  

import base from '../base'
import mNavList from '@/midea-component/mNavList.vue'
import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal');

module.exports = {
    components: { mNavList },
    mixins: [base],
    data() {
        return {
            navList: [
                {
                    "title": "启动",
                    "img": "../assets/img/share/start.png",
                    "img_actived": "../assets/img/share/start_actived.png"
                },
                {
                    "title": "暂停",
                    "img": "../assets/img/share/pause.png",
                    "img_actived": "../assets/img/share/pause_actived.png"
                },
                {
                    "title": "取消",
                    "img": "../assets/img/share/pause.png",
                    "img_actived": "../assets/img/share/pause_actived.png"
                },
                {
                    "title": "自动菜单",
                    "img": "../assets/img/share/menu.png",
                    "img_actived": "../assets/img/share/menu_actived.png"
                },
                {
                    "title": "蒸汽模式",
                    "img": "../assets/img/share/steam.png",
                    "img_actived": "../assets/img/share/steam_actived.png"
                },
                {
                    "title": "加热模式",
                    "img": "../assets/img/share/warm.png",
                    "img_actived": "../assets/img/share/warm_actived.png"
                },
                {
                    "title": "清洁模式",
                    "img": "../assets/img/share/clean.png",
                    "img_actived": "../assets/img/share/clean_actived.png"
                },
                {
                    "title": "速热模式",
                    "img": "../assets/img/share/fastwarm.png",
                    "img_actived": "../assets/img/share/fastwarm_actived.png"
                }
            ],

            hNavList: [
                {
                    "title": "使用说明",
                    "img": "../assets/img/share/instruction.png"
                },
                {
                    "title": "在线服务",
                    "img": "../assets/img/share/service.png"
                },
                {
                    "title": "售后保修",
                    "img": "../assets/img/share/aftersale.png"
                },
                {
                    "title": "家电清洗",
                    "img": "../assets/img/share/wash.png"
                },
                {
                    "title": "原厂耗材",
                    "img": "../assets/img/share/supplies.png"
                },
                {
                    "title": "家电回收",
                    "img": "../assets/img/share/reclaim.png"
                }
            ]
        }
    },
    methods: {
        itemClicked(event) {
            nativeService.toast("点击了第" + event.index + "个选项。\n内容为：" + JSON.stringify(event.item))
        }
    },
    created() {
        //this.isIos = weex.config.env.platform == 'iOS' ? true : false;
    }
};
</script>