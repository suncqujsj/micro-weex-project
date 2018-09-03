<template>
    <div class="wrapper">
        <midea-header ref="header" :title="title" bgColor="#ffffff" :isImmersion="isImmersion" :showLeftImg="true" @leftImgClick="back">
        </midea-header>
        <scroller class="scroller">
            <div class="group-gap-top"></div>
            <div class="cell-item" v-for="(menu, index0) in menus" :key="menu.title">
                <div class="cell-block" :data-menu-title="menu.title" @click="handleSwitch">
                    <text class="cell-label">{{ menu.title }}</text>
                    <image v-if="activeMenu === menu.title" class="arrow-icon" src="./assets/img/service_ic_show@3x.png" resize="contain"></image>
                    <image v-else class="arrow-icon" src="./assets/img/service_ic_hide@3x.png" resize='contain'></image>
                </div>

                <div v-if="activeMenu === menu.title">
                    <div class="cell-sub-item" v-for="(subMenu, index1) in menu.subMenus" :key="subMenu.title" :data-subMenu-link="subMenu.link" @click="goToProblemDetail(subMenu)">
                        <div class="cell-sub-block">
                            <text class="cell-sub-label">{{ subMenu.title }}？</text>
                            <image class="arrow-icon" src="./assets/img/public_ic_more@3x.png" resize='contain'></image>
                        </div>
                    </div>
                </div>
            </div>
            <div class="group-gap-bottom"></div>
        </scroller>
    </div>
</template>

<script>
import base from './base'

import { MideaItem } from '@/index'

import menus from './menuData';

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
            menus: menus
        }
    },
    computed: {
    },
    methods: {
        // 展开和隐藏子菜单
        handleSwitch(e) {
            let curTitle = e.target.attr.dataMenuTitle;
            this.activeMenu = (this.activeMenu === curTitle) ? '' : curTitle;
        },

        // 前往问题详情
        goToProblemDetail(subMenu) {
            let link = subMenu.link;
            if (link.trim() === '') return;
            this.goTo(link, {}, { id: subMenu.id });
        },
    },
    mounted() {
    },
    created() {
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
  flex: 1;
}
.group-gap-top {
  height: 24px;
}
.group-gap-bottom {
  height: 100px;
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
