<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
            <div slot="customerContent" class="header-right">
                <text class="header-right-text" @click="switchMode">{{isListMode?'地图模式':'列表模式'}}</text>
            </div>
        </midea-header>
        <div class="info-bar">
            <text class="info-address" @click="changeArea">{{areaDesc}}</text>
            <image class="arraw-down-icon" src="./assets/img/service_ic_hide@3x.png" resize='contain' @click="changeArea">
            </image>
            <div class="info-product">
                <midea-rich-text class="search-result-desc" :hasTextMargin="false" :config-list="richDesc"></midea-rich-text>
            </div>
        </div>
        <scroller v-if="isListMode" class="scroller">
            <div v-for="(branch, index) in sortedBranchList" :key="index">
                <branch-block class="branch-block" :data="branch" :index="index">
                </branch-block>
            </div>
            <div class="gap-bottom"></div>
        </scroller>
        <div v-else class="map-scroller">
            <web class="map" :src="mapSrc"></web>
            <slider class="slider" :index="currentAddressIndex" @change="changeBranch" interval="3000" auto-play="false">
                <div v-for="(branch, index) in sortedBranchList" :key="index">
                    <branch-block class="branch-slider-block" ellipsis=true :data="branch" :index="index">
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
            areaList: [{
                regionDesc: '广东'
            },
            {
                regionDesc: '佛山市'
            },
            {
                regionDesc: '顺德区'
            }],
            keyword: '',
            branchList: [],
            currentAddressIndex: 0,
            dialogShow: false
        }
    },
    computed: {
        areaDesc() {
            return this.areaList.map((item) => {
                return item.regionDesc
            }).join(' ')
        },
        richDesc() {
            return [
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
                    value: this.keyword,
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
        },
        sortedBranchList() {
            return this.branchList.map((item) => {
                return Object.assign({}, item)
            })
        },
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
        changeArea() {
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
        nativeService.getItem(this.SERVICE_STORAGE_KEYS.selectedProductArray, (resp) => {
            if (resp.result == 'success') {
                this.keyword = JSON.parse(resp.data)[0].prodName || ''
            }
        })

        let param = {
        }
        nativeService.queryunitarchives(param).then((data) => {
            this.branchList = data.list
        })
    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
  flex-direction: column;
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
  font-weight: 600;
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
.map-scroller {
  flex: 1;
  background-color: #f2f2f2;
  flex-direction: column;
}
.branch-block {
  margin-top: 24px;
}
.gap-bottom {
  margin-bottom: 80px;
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
  width: 750px;
}
</style>
