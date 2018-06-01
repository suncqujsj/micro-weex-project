<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="true" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
            <div slot="customerContent" class="header-right">
                <text class="header-right-text" @click="switchMode">地图模式</text>
            </div>
        </midea-header>
        <div class="info-bar">
            <text class="info-address" @click="changeAddress">深圳</text>
            <image class="arraw-down-icon" src="./assets/img/service_ic_hide@3x.png" resize='contain' @click="changeAddress">
            </image>
            <div class="info-product">
                <midea-rich-text class="search-result-desc" :hasTextMargin="false" :config-list="richDesc"></midea-rich-text>
            </div>
        </div>
        <scroller v-if="isListMode" class="scroller">
            <div v-for="(order, index) in branchList" :key="index">
                <branch-block class="branch-block" :data="order">
                </branch-block>
            </div>
        </scroller>
        <div v-else class="scroller">
            <web class="map" :src="mapSrc"></web>
            <slider class="slider" :index="currentAddressIndex" @change="changeBranch" interval="3000" auto-play="false">
                <div v-for="(order, index) in branchList" :key="index">
                    <branch-block class="branch-slider-block" :data="order">
                    </branch-block>
                </div>
            </slider>
        </div>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService'
import BranchBlock from '@/customer-service/components/branchBlock.vue'

import { MideaDialog, MideaRichText } from '@/index'

export default {
    components: {
        BranchBlock,
        MideaDialog,
        MideaRichText
    },
    mixins: [base],
    data() {
        return {
            title: '网点查询',
            isListMode: true,
            branchList: [
                {
                    id: '1',
                    label: '美的总部大楼',
                    desc: '业务范围：家用空调、洗衣机、热水器，净水器',
                    address: "广东省佛山市顺德区伦教街道128号",
                    x: '12604424.88',
                    y: '2608019.27'
                },
                {
                    id: '1',
                    label: '美的全球创新中心',
                    desc: '业务范围：家用空调、洗衣机、热水器，净水器',
                    address: "广东省佛山市顺德区伦教街道128号",
                    x: '12604435.08',
                    y: '2608005.12'
                },
                {
                    id: '1',
                    label: '美的总部大楼',
                    desc: '业务范围：家用空调、洗衣机、热水器，净水器',
                    address: "广东省佛山市顺德区伦教街道128号",
                    x: '12604424.88',
                    y: '2608019.27'
                },
                {
                    id: '1',
                    label: '美的全球创新中心',
                    desc: '业务范围：家用空调、洗衣机、热水器，净水器',
                    address: "广东省佛山市顺德区伦教街道128号",
                    x: '12604435.08',
                    y: '2608005.12'
                },
                {
                    id: '1',
                    label: '美的总部大楼',
                    desc: '业务范围：家用空调、洗衣机、热水器，净水器',
                    address: "广东省佛山市顺德区伦教街道128号",
                    x: '12604424.88',
                    y: '2608019.27'
                },
                {
                    id: '1',
                    label: '美的全球创新中心',
                    desc: '业务范围：家用空调、洗衣机、热水器，净水器',
                    address: "广东省佛山市顺德区伦教街道128号",
                    x: '12604435.08',
                    y: '2608005.12'
                },
                {
                    id: '1',
                    label: '美的总部大楼',
                    desc: '业务范围：家用空调、洗衣机、热水器，净水器',
                    address: "广东省佛山市顺德区伦教街道128号",
                    x: '12604424.88',
                    y: '2608019.27'
                },
                {
                    id: '1',
                    label: '美的全球创新中心',
                    desc: '业务范围：家用空调、洗衣机、热水器，净水器',
                    address: "广东省佛山市顺德区伦教街道128号",
                    x: '12604435.08',
                    y: '2608005.12'
                }
            ],
            currentAddressIndex: 0,
            dialogShow: false,
            richDesc: [
                {
                    type: 'text',
                    value: '附近“',
                    style: {
                        fontSize: 28,
                        color: '#000000'
                    }
                },
                {
                    type: 'text',
                    value: '热水器',
                    style: {
                        fontSize: 28,
                        color: '#FF8F00'
                    }
                },
                {
                    type: 'text',
                    value: '”网点',
                    style: {
                        fontSize: 28,
                        color: '#000000'
                    }
                }
            ]
        }
    },
    computed: {
        addressPoint() {
            let result = {
                desc: '',
                x: '12604424.88',
                y: '2608019.27'
            }
            if (this.branchList && this.currentAddressIndex > -1) {
                result.desc = encodeURIComponent(this.branchList[this.currentAddressIndex].label)
                result.x = this.branchList[this.currentAddressIndex].x
                result.y = this.branchList[this.currentAddressIndex].y
            }
            return result
        },
        mapSrc() {
            let result = "http://www.baidu.com"
            if (this.addressPoint) {
                result = 'https://map.baidu.com/mobile/webapp/place/detail/qt=ninf&wd=' + this.addressPoint.desc + '&c=138&searchFlag=bigBox&version=5&exptype=dep&src_from=webapp_all_bigbox&sug_forward=&src=0&nb_x=' + this.addressPoint.x + '&nb_y=' + this.addressPoint.y + '&center_rank=1&uid=7db1a57b62a5bfe11d580018&industry=enterprise&qid=2807510703245347137/showall=1&pos=0&da_ref=listclk&da_qrtp=36&vt=map'
            }
            return result
        }
    },
    methods: {
        switchMode() {
            this.isListMode = !this.isListMode
        },
        changeAddress() {
            this.goTo('addressList', {}, { from: 'branchList' })
        },
        changeBranch(event) {
            this.currentAddressIndex = event.index
        },
        showDialog(index) {
            this.dialogShow = true
            this.selectedOrderIndex = index
        },
        dialogCancel() {
            this.dialogShow = false
        },
        dialogConfirm() {
            this.dialogShow = false
            let oldOrder = this.orderList[this.selectedOrderIndex]
            oldOrder.status = 3
            this.$set(this.orderList, this.selectedOrderIndex, oldOrder)
        }
    },
    created() {

    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
}
.header-right {
  position: absolute;
  right: 0px;
  width: 160px;
  height: 88px;
  display: flex;
  justify-content: center;
}
.header-right-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  padding-left: 20px;
  padding-right: 20px;
  text-align: right;
}
.info-bar {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  padding: 14px;
  padding-left: 24px;
  border-top-color: #e2e2e2;
  border-top-width: 1px;
}
.info-address {
  font-family: PingFangSC-Medium;
  font-size: 28px;
  color: #000000;
}
.arraw-down-icon {
  height: 50px;
  width: 50px;
}
.info-product {
  border-left-color: #e2e2e2;
  border-left-width: 1px;
  padding-left: 20px;
}
.scroller {
  flex: 1;
  background-color: #f2f2f2;
}
.branch-block {
  margin-top: 24px;
}
.map {
  flex: 1;
  width: 750px;
  padding-bottom: 200px;
}
.slider {
  position: absolute;
  width: 750px;
  height: 200px;
  bottom: 0px;
  left: 0px;
}
.branch-slider-block {
}
</style>
