<template>
    <div class="wrapper">
        <midea-header ref="header" :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" :showLeftImg="true" @leftImgClick="back">
        </midea-header>
        <scroller class="scroller" :style="{height: scrollHeight + 'px'}">
            <div class="group-gap-top"></div>
            <div class="cell-item" 
              v-for="(menu, index0) in menus" 
              :key="menu.title">
                <div class="cell-block" :data-menu-title="menu.title" @click="handleSwitch">
                    <text class="cell-label">{{ menu.title }}</text>
                    <image v-if="activeMenu === menu.title" class="arrow-icon" src="./assets/img/service_ic_show@3x.png" resize="contain"></image>
                    <image v-else class="arrow-icon" src="./assets/img/service_ic_hide@3x.png" resize='contain'></image>
                </div>

                <div v-if="activeMenu === menu.title">
                    <div class="cell-sub-item" 
                      v-for="(subMenu, index1) in menu.subMenus"
                      :key="subMenu.title"
                      :data-subMenu-link="subMenu.link"
                      @click="goToProblemDetail(subMenu)">
                        <div class="cell-sub-block">
                            <text class="cell-sub-label">{{ subMenu.title }}？</text>
                            <image class="arrow-icon" src="./assets/img/public_ic_more@3x.png" resize='contain'></image>
                        </div>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService'
import debugUtil from '@/common/util/debugUtil'
import util from '@/common/util/util'

import { MideaItem } from '@/index'

import menus from './menuData';

const dom = weex.requireModule('dom');

export default {
    components: {
        MideaItem
    },
    mixins: [base],
    data() {
        return {
            title: '智能设备',
            showSubItem: false,
            activeMenu: '',
            menus: menus,
            scrollHeight: 1238
        }
    },
    computed: {
    },
    methods: {
        itemClicked(item) {
            nativeService.getUserInfo().then((data) => {
                if (data.uid) {
                    //已经登录
                    this.goTo(item.page)
                } else {
                    //未登录
                    nativeService.jumpNativePage({
                        "pageName": "login", //跳转到登录界面
                        "data": {}
                    })
                }
            })
        },

        // 展开和隐藏子菜单
        handleSwitch(e) {
            // console.log(e);
            let curTitle = e.target.attr.dataMenuTitle;
            this.activeMenu = (this.activeMenu === curTitle) ? '' : curTitle;
        },

        // 前往问题详情
        goToProblemDetail(subMenu) {
            // console.log(e);
            // let link = e.target.attr.dataSubMenuLink;
            // if (link.trim() === '') return;
            // this.goTo(link);
            // console.log(subMenu);
            let link = subMenu.link;
            if (link.trim() === '') return;
            nativeService.setItem('deviceProblemDetail', subMenu, (res)=> {
                // console.log(res);
                if (res.result === 'success') {
                    this.goTo(link);
                }
            });
        },

        // 获取滚动区高度
        getScrollHeight() {
            let height = weex.config.env.deviceHeight/weex.config.env.deviceWidth * 750;
            dom.getComponentRect(this.$refs['header'].$el, (res)=> {
                // console.log(res);
                let headHeight = res.size ? res.size.height : 96;
                this.scrollHeight = height - headHeight;
                // console.log(this.scrollHeight);
            });
        }
    },
    beforeCreate() {
        console.log('beforeCreate:在初始化内部变量，并且添加了事件功能后被触发')
    },
    created() {
        debugUtil.cleanDebugLog()
    },
    mounted() {
        this.getScrollHeight();
    }
}
</script>

<style src='./assets/css/base.css' />

<style>
.wrapper {
  flex: 1;
  background-color: #f2f2f2;
}
.scroller {
    height: 1270px;
}
.group-gap-top {
  height: 24px;
}
.service-item-title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}

.cell-item {
  background-color: #ffffff;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
}

.cell-block {
  flex-direction: row;
  align-items: center;
  padding-top: 24px;
  padding-left: 32px;
  padding-right: 24px;
  padding-bottom: 24px;
  height: 95px;
}

.cell-sub-item {
  background-color: #f6f6f6;
  padding-left: 32px;
  /* height: 96px; */
}
.cell-sub-block {
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
  flex-direction: row;
  align-items: center;
  padding-top: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
}

.cell-label {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
.cell-sub-label {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
}
.arrow-icon {
  height: 40px;
  width: 40px;
}
</style>
