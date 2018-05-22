<template>
    <div class="wrapper">
        <midea-header :title="title" @leftImgClick="back"></midea-header>
        <scroller class="scroller">
            <div class="order-detail-header group-bottom-border">
                <image class="order-detail-img" :src="order.imageUrl" resize='contain'>
                </image>
                <div class="order-detail-content">
                    <text class="order-detail-label">{{order.label}}</text>
                </div>
            </div>
            <div class="service-status-bar group-bottom-border">
                <text class="service-status-action" @click="switchServiceStatus(0)">服务已完成</text>
                <text class="service-status-action" @click="switchServiceStatus(1)">服务未完成</text>
            </div>

            <div v-if="serviceStatus==0 || serviceStatus==1" class="assess-block">
                <div v-if="serviceStatus==0" class="navigation-list">
                    <div v-for="(item, index) in navList" :key="index" class="navigation-item">
                        <div class="navigation-inner-item" @click="itemClicked(item)">
                            <image class="navigation-img" :src="item.img"></image>
                            <text class="navigation-desc">{{item.title}}</text>
                        </div>
                    </div>
                </div>

                <div class="search-history-block">
                    <div class="search-history">
                        <text class="search-history-item" v-for="(item,index) in assessKeys" :key="index" @click="aeessSelected(item)">{{item.title}}</text>
                    </div>

                    <text class="search-history-title">是否有以下行为</text>
                    <div class="search-history">
                        <text class="search-history-item" v-for="(item,index) in assessKeys" :key="index" @click="aeessSelected(item)">{{item.title}}</text>
                    </div>
                </div>

                <div class="remark-group group-bottom-border">
                    <textarea class="remark-textarea" placeholder="还想说点，将匿名并延迟告诉工程师" rows="4" @input="onInfoInput" @change="onInfoIChange"></textarea>
                </div>
            </div>
        </scroller>

        <div class="action-bar">
            <midea-button text="提交" type="green" @mideaButtonClicked="submit">
            </midea-button>
        </div>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'
import { MideaDialog, MideaButton } from '@/index'

const clipboard = weex.requireModule('clipboard')

export default {
    components: {
        MideaDialog,
        MideaButton
    },
    mixins: [base],
    data() {
        return {
            title: '评价服务',
            order: {
                time: '2018-05-11',
                type: '京东接入',
                status: 6,
                statusDesc: '待服务',
                label: '维修净水器',
                desc: '工程师即将上门为您服务',
                price: '',
                imageUrl: './assets/img/progress.png'
            },
            dialogShow: false,
            serviceStatus: null,
            navList: [{
                title: '满意',
                img: './assets/img/progress.png',
                reslut: 'good'
            }, {
                title: '一般',
                img: './assets/img/progress.png',
                reslut: 'normal'
            }, {
                title: '不满意',
                img: './assets/img/progress.png',
                reslut: 'bad'
            }],
            assessKeys: [
                {
                    'title': '守时守约',
                    'index': 0
                },
                {
                    'title': '诚信得体',
                    'index': 1

                },
                {
                    'title': '效率搞',
                    'index': 1

                },
                {
                    'title': '有礼貌',
                    'index': 1

                }
            ],
        }
    },
    methods: {
        switchServiceStatus(type) {
            this.serviceStatus = type
        },
        itemClicked() {

        },
        aeessSelected() {

        },
        onInfoInput() {

        },
        onInfoIChange() {

        },
        submit() {
            this.back()
        }
    },
    created() {

    }
}
</script>

<style>
.wrapper {
  background-color: #ffffff;
  position: relative;
  padding-bottom: 120px;
}
.group-bottom-border {
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
.order-detail-header {
  width: 750px;
  height: 200px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.order-detail-img {
  flex: 1;
  height: 150px;
  width: 100px;
  margin: 20px;
}
.order-detail-content {
  flex: 2;
  justify-content: center;
}
.order-detail-label {
  font-size: 28px;
}
.order-detail-desc {
  color: gray;
  font-size: 26px;
}
.service-status-bar {
  width: 750px;
  height: 88px;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
}
.service-status-action {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 15px;
  width: 250px;
  color: blue;
  font-size: 28px;
  text-align: center;
  border-radius: 6px;
  border-color: #e2e2e2;
  border-width: 1px;
}
.assess-block {
}
.navigation-list {
  flex-direction: row;
  justify-content: space-between;
  padding-top: 50px;
  padding-right: 80px;
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

.search-history-block {
  padding-top: 50px;
  padding-right: 80px;
  padding-left: 80px;
}
.search-history-title {
  font-size: 32px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.search-history {
  flex-direction: row;
  flex-wrap: wrap;
}
.search-history-item {
  font-size: 32px;
  padding-top: 8px;
  padding-right: 18px;
  padding-bottom: 8px;
  padding-left: 18px;
  margin-right: 30px;
  margin-bottom: 30px;
  border-radius: 6px;
  border-color: #e2e2e2;
  border-width: 1px;
}
.remark-group {
  padding-top: 50px;
  padding-right: 80px;
  padding-bottom: 50px;
  padding-left: 80px;
}
.remark-textarea {
  flex: 1;
  font-size: 28px;
  border-color: #e2e2e2;
  border-width: 1px;
  padding: 8px;
}
.action-bar {
  position: fixed;
  bottom: 0px;
  width: 750px;
  text-align: center;
}
</style>
