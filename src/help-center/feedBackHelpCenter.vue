<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" :showLeftImg="true">
        </midea-header>
        <list>
            <cell class="group-gap-top"></cell>
            <midea-item height="96" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('deviceHelpCenter')">
                <text slot="title" class="service-item-title">智能设备</text>
            </midea-item>
            <midea-item height="96" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('mallHelpCenter')">
                <text slot="title" class="service-item-title">商城</text>
            </midea-item>
            <cell class="group-gap-top"></cell>
            <midea-item height="96" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('feedBackHelpCenter')">
                <text slot="title" class="service-item-title">问题反馈</text>
            </midea-item>
        </list>
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
            title: '帮助中心'
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
  height: 24px;
}
.service-item-title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
</style>
