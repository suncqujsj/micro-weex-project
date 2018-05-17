<template>
    <div class="wrapper">
        <midea-header :title="title" :showLeftImg='false'>
            <div slot="rightContent">
                <text class="header-right" @click="showHotLine">服务热线</text>
            </div>
        </midea-header>
        <div class="navigation-list">
            <div v-for="(item, index) in navList" :key="index" class="navigation-item">
                <div class="navigation-inner-item" @click="itemClicked(item)">
                    <image class="navigation-img" :src="item.img"></image>
                    <text class="navigation-desc">{{item.title}}</text>
                </div>
            </div>
        </div>
        <list>
            <midea-item title="网点查询" height="120" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('search')">
                <image slot="itemImg" src="./assets/img/progress.png" class="item-img" resize='contain'>
                </image>
            </midea-item>
            <midea-item title="服务与收费政策" itemImg="./assets/img/progress.png" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('help')">
                <image slot="itemImg" src="./assets/img/progress.png" class="item-img" resize='contain'>
                </image>
            </midea-item>
            <midea-item title="滤芯防伪" itemImg="./assets/img/progress.png" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('antifake')">
                <image slot="itemImg" src="./assets/img/progress.png" class="item-img" resize='contain'>
                </image>
            </midea-item>
        </list>

        <midea-actionsheet :items="actionsheetItems" :show="showBar" @close="closeActionsheet" @itemClick="actionsheetItemClick" @btnClick="actionsheetBtnClick" ref="actionsheet"></midea-actionsheet>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService';

import { MideaActionsheet, MideaItem } from '@/index'

export default {
    components: {
        MideaActionsheet,
        MideaItem
    },
    mixins: [base],
    data() {
        return {
            title: '服务',
            navList: [{
                title: '进度查询',
                img: './assets/img/progress.png',
                page: 'orderList'
            }, {
                title: '安装服务',
                img: './assets/img/progress.png',
                page: 'installation'
            }, {
                title: '维修服务',
                img: './assets/img/progress.png',
                page: 'maintenance'
            }],

            showBar: false,
            actionsheetItems: ['美的：400-899-935', '小天鹅：400-822-8228'],
            actionsheetItemsValue: ['400899935', '4008228228']
        }
    },
    methods: {
        itemClicked(item) {
            this.goTo(item.page)
        },
        showHotLine() {
            this.showBar = true;
            this.$nextTick(e => {
                this.$refs.actionsheet.open();
            });
        },
        closeActionsheet() {
            this.showBar = false
        },
        actionsheetItemClick(event) {
            this.showBar = false
            nativeService.callTel({
                tel: this.actionsheetItemsValue[event.index],
                title: '服务热线',
                desc: this.actionsheetItemsValue[event.index]
            }).then(
                (resp) => { }
            )
        },
        actionsheetBtnClick() {
            this.showBar = false
        }
    },
    created() {

    }
}
</script>

<style>
.header-right {
  right: 80px;
  width: 140px;
  color: #ffffff;
  font-size: 28px;
  text-align: right;
}
.navigation-list {
  flex-direction: row;
  justify-content: space-between;
  padding-top: 50px;
  padding-right: 80px;
  padding-bottom: 50px;
  padding-left: 80px;
}
.navigation-inner-item {
  flex-direction: column;
  align-content: center;
  align-items: center;
}
.navigation-img {
  height: 100px;
  width: 100px;
}
.navigation-desc {
  padding-top: 15px;
  font-size: 28px;
}
.item-img {
  height: 60px;
  width: 60px;
  margin-right: 24px;
}
</style>
