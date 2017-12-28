<template>
    <scroller class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
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
</template>
<style scoped>
.wrapper {
  background-color: #f7f7f7;
}
.container {
  background-color: #fff;
}
.container-h {
  padding-left: 24px;
  padding-right: 24px;
  background-color: #fff;
}
</style>
<script>

import mNavList from '../midea-component/mNavList.vue'
import nativeService from '../common/services/nativeService'
const modal = weex.requireModule('modal');

module.exports = {

    components: { mNavList },
    data() {
        return {
            navList: [
                {
                    "title": "启动",
                    "img": "../img/share/qq.png"
                },
                {
                    "title": "暂停",
                    "img": "../img/share/wechat.png"
                },
                {
                    "title": "取消",
                    "img": "../img/share/messege.png"
                },
                {
                    "title": "自动菜单",
                    "img": "../img/share/qq.png"
                },
                {
                    "title": "蒸汽模式",
                    "img": "../img/share/wechat.png"
                },
                {
                    "title": "加热模式",
                    "img": "../img/share/messege.png"
                },
                {
                    "title": "清洁模式",
                    "img": "../img/share/qq.png"
                },
                {
                    "title": "速热模式",
                    "img": "../img/share/wechat.png"
                }
            ],

            hNavList: [
                {
                    "title": "使用说明",
                    "img": "../img/share/qq.png"
                },
                {
                    "title": "在线服务",
                    "img": "../img/share/wechat.png"
                },
                {
                    "title": "售后保修",
                    "img": "../img/share/messege.png"
                },
                {
                    "title": "家电清洗",
                    "img": "../img/share/qq.png"
                },
                {
                    "title": "原厂耗材",
                    "img": "../img/share/wechat.png"
                },
                {
                    "title": "家电回收",
                    "img": "../img/share/messege.png"
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
        this.isIos = weex.config.env.platform == 'iOS' ? true : false;
    }
};
</script>