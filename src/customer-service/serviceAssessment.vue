<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back"></midea-header>
        <scroller class="scroller">
            <order-block class="order-block" :data="order">
                <div slot="action-bar">
                    <div class="service-status-bar">
                        <text v-bind:class="['service-status-action',serviceStatus==1?'service-status-action-selected':'']" @click="switchServiceStatus(1)">服务未完成</text>
                        <text v-bind:class="['service-status-action',serviceStatus==0?'service-status-action-selected':'']" @click="switchServiceStatus(0)">服务已完成</text>
                    </div>
                </div>
            </order-block>

            <div class="assess-block">
                <div v-if="serviceStatus==0">
                    <div v-if="serviceStatus==0" class="navigation-list">
                        <div v-for="(item, index) in navList" :key="'level'+index" class="navigation-item">
                            <div class="navigation-inner-item" @click="selectLeve(item)">
                                <image class="navigation-img" :src="item.img + (serviceLevel==item.level?'on@3x.png':'off@3x.png')"></image>
                                <text v-bind:class="['navigation-desc',serviceLevel==item.level?'navigation-desc-selected':'']">{{item.title}}</text>
                            </div>
                        </div>
                    </div>
                    <div v-if="serviceLevel" class="search-history-block group-bottom-border">
                        <div class="search-history">
                            <text v-for="(item,index) in assessKeys" :key="index" v-bind:class="['search-history-item', item.isSelected?'search-history-item-selected':'']" @click="selectAssess(index)">{{item.title}}</text>
                        </div>
                    </div>

                    <div v-if="serviceLevel=='bad'" class="search-history-block">
                        <text class="search-history-title">是否有以下行为</text>
                        <div class="search-history">
                            <text v-for="(item,index) in assessBadKeys" :key="index" v-bind:class="['search-history-item', item.isSelected?'search-history-item-selected':'']" @click="selectBadAssess(index)">{{item.title}}</text>
                        </div>
                    </div>
                    <div v-if="serviceLevel" class="remark-group">
                        <textarea class="remark-textarea" placeholder="还想说点，将匿名并延迟告诉工程师" rows="4" @input="onInfoInput" @change="onInfoIChange"></textarea>
                    </div>
                </div>
                <div v-if="serviceStatus==1">
                    <div class="search-history-block">
                        <div class="search-history">
                            <text v-for="(item,index) in assessUncompletedKeys" :key="index" v-bind:class="['search-history-item', item.isSelected?'search-history-item-selected':'']" @click="selectUncompletedAssess(index)">{{item.title}}</text>
                        </div>
                    </div>
                </div>
                <text v-if="isDataReady" class="action-button" @click="submit">提交</text>
            </div>
        </scroller>

    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'
import OrderBlock from '@/customer-service/components/orderBlock.vue'
import { MideaDialog, MideaButton } from '@/index'

const clipboard = weex.requireModule('clipboard')

export default {
    components: {
        OrderBlock,
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
                imageUrl: './assets/img/service_midea@3x.png'
            },
            dialogShow: false,
            serviceStatus: null,
            serviceLevel: null,
            navList: [{
                title: '不满意',
                img: './assets/img/service_ic_bad_',
                level: 'bad'
            }, {
                title: '一般',
                img: './assets/img/service_ic_nobad_',
                level: 'normal'
            }, {
                title: '满意',
                img: './assets/img/service_ic_ok_',
                level: 'good'
            }],
            assessKeys: [
                {
                    'title': '守时守约',
                    'index': 0,
                    isSelected: false
                },
                {
                    'title': '诚信得体',
                    'index': 2,
                    isSelected: false

                },
                {
                    'title': '效率搞',
                    'index': 3,
                    isSelected: false

                },
                {
                    'title': '有礼貌',
                    'index': 4,
                    isSelected: false

                }
            ],
            assessBadKeys: [
                {
                    'title': '没有出示收费标准',
                    'index': 0,
                    isSelected: false
                },
                {
                    'title': '没有使用垫布盖布',
                    'index': 2,
                    isSelected: false

                },
                {
                    'title': '没现场试机',
                    'index': 3,
                    isSelected: false

                },
                {
                    'title': '没讲解使用方法',
                    'index': 4,
                    isSelected: false

                }
            ],
            assessUncompletedKeys: [
                {
                    'title': '没有出示收费标准',
                    'index': 0,
                    isSelected: false
                },
                {
                    'title': '没有使用垫布盖布',
                    'index': 2,
                    isSelected: false

                },
                {
                    'title': '没现场试机',
                    'index': 3,
                    isSelected: false

                },
                {
                    'title': '没讲解使用方法',
                    'index': 4,
                    isSelected: false

                }
            ]
        }
    },
    computed: {
        selectedAssess() {
            let result = []
            if (this.assessKeys) {
                result = this.assessKeys.filter((item) => {
                    return item.isSelected
                })
            }
            return result
        },
        selectedBadAssess() {
            let result = []
            if (this.assessBadKeys) {
                result = this.assessBadKeys.filter((item) => {
                    return item.isSelected
                })
            }
            return result
        },
        selectedUncompletedAssess() {
            let result = []
            if (this.assessUncompletedKeys) {
                result = this.assessUncompletedKeys.filter((item) => {
                    return item.isSelected
                })
            }
            return result
        },
        isDataReady() {
            let result = false
            if (this.serviceStatus == 0) {
                if (this.serviceLevel == 'good' && this.selectedAssess.length > 0) {
                    result = true
                } else if (this.serviceLevel == 'normal' && this.selectedAssess.length > 0) {
                    result = true
                } else if (this.serviceLevel == 'bad' && (this.selectedAssess.length > 0 || this.selectedBadAssess.length > 0)) {
                    result = true
                }
            } else if (this.serviceStatus == 1 && this.selectedUncompletedAssess.length > 0) {
                result = true
            }

            return result
        }
    },
    methods: {
        switchServiceStatus(type) {
            this.serviceStatus = type
        },
        selectLeve(item) {
            this.serviceLevel = item.level
        },
        selectAssess(index) {
            let item = this.assessKeys[index]
            item.isSelected = !item.isSelected
            this.$set(this.assessKeys, index, item)
        },
        selectBadAssess(index) {
            let item = this.assessBadKeys[index]
            item.isSelected = !item.isSelected
            this.$set(this.assessBadKeys, index, item)
        },
        selectUncompletedAssess(index) {
            let item = this.assessUncompletedKeys[index]
            item.isSelected = !item.isSelected
            this.$set(this.assessUncompletedKeys, index, item)
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
  background-color: #f2f2f2;
}
.scroller {
  background-color: #f2f2f2;
}

.order-block {
  margin-top: 24px;
  margin-right: 24px;
  margin-left: 24px;
}
.group-bottom-border {
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
.service-status-bar {
  /* width: 750px; */
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  padding-top: 32px;
  padding-left: 130px;
  padding-right: 130px;
}
.service-status-action {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  padding: 15px;
  width: 188px;
  text-align: center;
  border-radius: 80px;
  border-color: #c8c7cc;
  border-width: 1px;
}
.service-status-action-selected {
  color: #ffffff;
  background-color: #0078ff;
}
.assess-block {
  background-color: #ffffff;
  margin-top: 24px;
  margin-right: 24px;
  margin-left: 24px;
  margin-bottom: 48px;
  border-radius: 4px;
}
.navigation-list {
  flex-direction: row;
  justify-content: space-between;
  padding-top: 32px;
  padding-right: 130px;
  padding-left: 130px;
  padding-bottom: 32px;
}
.navigation-inner-item {
  flex-direction: column;
  align-content: center;
  align-items: center;
}
.navigation-img {
  height: 56px;
  width: 56px;
}
.navigation-desc {
  padding-top: 20px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #c8c7cc;
  text-align: center;
}
.navigation-desc-selected {
  color: #0078ff;
}

.search-history-block {
  padding-top: 32px;
  padding-right: 58px;
  padding-left: 58px;
  background-color: #ffffff;
}
.search-history-title {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  margin-bottom: 30px;
}
.search-history {
  flex-direction: row;
  flex-wrap: wrap;
}
.search-history-item {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #666666;
  background-color: #f6f6f6;
  text-align: center;
  padding-top: 8px;
  padding-right: 28px;
  padding-bottom: 8px;
  padding-left: 28px;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 32px;
  border-radius: 4px;
}
.search-history-item-selected {
  background-color: #e8f1ff;
  color: #267aff;
}
.remark-group {
  padding-top: 16px;
  padding-right: 32px;
  padding-left: 32px;
  padding-bottom: 48px;
  background-color: #ffffff;
}
.remark-textarea {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  border-radius: 6px;
  border-color: #e5e5e8;
  border-width: 1px;
  padding: 8px;
  background-color: #fafafa;
}
.action-button {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #ffffff;
  text-align: center;
  background-color: #267aff;
  text-align: center;
  margin-left: 24px;
  margin-right: 24px;
  border-radius: 4px;
  padding-top: 22px;
  padding-bottom: 22px;
  margin-bottom: 48px;
}
</style>
