<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" :showLeftImg="true">
        </midea-header>
        <scroll>
            <cell class="group-gap-top"></cell>
            <div class="cell-item">
                <div class="cell-block">
                    <text class="cell-label">智能配网</text>
                    <image class="arrow-icon" src="./assets/img/service_ic_hide@3x.png" resize='contain'></image>
                </div>
            </div>
            <div class="cell-item" @click="showSubItem=!showSubItem">
                <div class="cell-block">
                    <text class="cell-label">家庭管理</text>
                    <image class="arrow-icon" src="./assets/img/service_ic_hide@3x.png" resize='contain'></image>
                </div>
            </div>
            <template v-if="showSubItem">
                <div class="cell-sub-item">
                    <div class="cell-block">
                        <text class="cell-sub-label">如何添加家庭？</text>
                        <image class="arrow-icon" src="./assets/img/public_ic_more@3x.png" resize='contain'></image>
                    </div>
                </div>
                <div class="cell-sub-item">
                    <div class="cell-block">
                        <text class="cell-sub-label">如何邀请新用户？</text>
                        <image class="arrow-icon" src="./assets/img/public_ic_more@3x.png" resize='contain'></image>
                    </div>
                </div>
            </template>
            <div class="cell-item">
                <div class="cell-block">
                    <text class="cell-label">用户管理</text>
                    <image class="arrow-icon" src="./assets/img/service_ic_hide@3x.png" resize='contain'></image>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService'
import debugUtil from '@/common/util/debugUtil'
import util from '@/common/util/util'

import { MideaItem } from '@/index'

export default {
    components: {
        MideaItem
    },
    mixins: [base],
    data() {
        return {
            title: '帮助中心',
            showSubItem: false
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
        }
    },
    beforeCreate() {
        console.log('beforeCreate:在初始化内部变量，并且添加了事件功能后被触发')
    },
    created() {
        debugUtil.cleanDebugLog()
    }
}
</script>

<style src='./assets/css/base.css' />

<style>
.wrapper {
  flex: 1;
  background-color: #f2f2f2;
}
.group-gap-top {
  height: 40px40;
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
.cell-sub-item {
  background-color: #f6f6f6;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
}
.cell-block {
  flex-direction: row;
  align-items: center;
  padding-top: 24px;
  padding-left: 24px;
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
