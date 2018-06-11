<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <div class="search-bar">
            <div class="search-bar-content">
                <image class="search-bar-img" :src="'./assets/img/service_ic_sreach@3x.png'" resize="contain"></image>
                <text class="search-bar-desc">查询关键字</text>
            </div>
        </div>
        <list>
            <cell v-for="(itemA, indexA) in sortedFreePlocy" :key="indexA">
                <div class="cell-item">
                    <div class="cell-sub-item level-one" @click="levelAClicked(itemA, indexA)">
                        <text class="cell-item-title">{{itemA.classAProject}}</text>
                        <image class="cell-arrow-icon" :src="expandedAIndex==indexA?'./assets/img/service_ic_hide@3x.png':'./assets/img/service_ic_show@3x.png'" resize="contain"></image>
                    </div>
                </div>
                <div v-if="expandedAIndex==indexA" class="cell-expand-item" v-for="(itemB, indexB) in itemA.children" :key="indexB">
                    <div class="cell-sub-item level-two" @click="levelBClicked(itemB, indexB)">
                        <text class="cell-item-sub-title">{{itemB.classBProject}}</text>
                        <image class="cell-arrow-icon" :src="expandedBIndex==indexB?'./assets/img/service_ic_hide_s@3x.png':'./assets/img/service_ic_show_s@3x.png'" resize="contain"></image>
                    </div>
                    <div v-if="expandedBIndex==indexB" class="level-three" v-for="(itemC, indexC) in itemB.children" :key="indexC">
                        <div class="cell-sub-item">
                            <text class="cell-item-sub-title">{{itemC.classCProject}}</text>
                            <text class="cell-item-price">{{itemC.chargeStandard}}{{itemC.unit}}</text>
                        </div>
                        <div>
                            <text class="cell-item-desc" :style="{'width':'700px'}">{{itemC.pubRemark}}</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>

<script>
import base from './base'
import nativeService from '@/common/services/nativeService';

export default {
    components: {
    },
    mixins: [base],
    data() {
        return {
            title: '家用空调',
            feePlocy: [],
            expandedAIndex: -1,
            expandedBIndex: -1
        }
    },
    computed: {
        sortedFreePlocy() {
            let result = []
            let classACodeIndexs = {}, classBCodeIndexs = {}
            if (this.feePlocy && this.feePlocy.length > 0) {
                for (let index = 0; index < this.feePlocy.length; index++) {
                    const item = this.feePlocy[index];
                    let Aindex = classACodeIndexs[item.classACode]
                    if (!Aindex) {
                        result.push({
                            "classACode": item.classACode,
                            "classAProject": item.classAProject,
                            "children": []
                        })
                        Aindex = classACodeIndexs[item.classACode] = result.length - 1
                    }

                    let Bindex = classBCodeIndexs[item.classBCode]
                    if (!Bindex) {
                        result[Aindex]["children"].push({
                            "classBCode": item.classBCode,
                            "classBProject": item.classBProject,
                            "children": []
                        })
                        Bindex = classBCodeIndexs[item.classBCode] = result[Aindex]["children"].length - 1
                    }

                    result[Aindex]["children"][Bindex]["children"].push({
                        "classCCode": item.classCCode,
                        "classCProject": item.classCProject,
                        "unit": item.unit,
                        "chargeStandard": item.chargeStandard,
                        "pubRemark": item.pubRemark
                    })
                }
            }

            return result
        }
    },
    methods: {
        levelAClicked(item, index) {
            if (this.expandedAIndex == index) {
                this.expandedAIndex = -1
                this.expandedBIndex = -1
            } else {
                this.expandedAIndex = index
                this.expandedBIndex = -1
            }
        },
        levelBClicked(item, index) {
            if (this.expandedBIndex == index) {
                this.expandedBIndex = -1
                this.expandedCIndex = -1
            } else {
                this.expandedBIndex = index
                this.expandedCIndex = -1
            }
        }
    },
    created() {
        nativeService.getFeePlocy().then((data) => {
            this.feePlocy = data
        })
    }
}
</script>

<style>
.wrapper {
  background-color: #f6f6f6;
  position: relative;
}

.search-bar {
  width: 750px;
  height: 96px;
  justify-content: center;
  align-items: center;
  padding-top: 16px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 16px;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
  background-color: #ffffff;
}
.search-bar-content {
  width: 686px;
  height: 64px;
  border-radius: 4px;
  background-color: #f2f2f2;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.search-bar-img {
  height: 40px;
  width: 40px;
  margin-right: 10px;
}
.search-bar-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #c8c7cc;
}
.cell-item {
  padding-left: 32px;
  padding-right: 24px;
  background-color: #ffffff;
}
.cell-expand-item {
  padding-left: 32px;
  padding-right: 24px;
  background-color: #f6f6f6;
  transition: 500ms;
}
.cell-item-title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
.cell-arrow-icon {
  height: 40px;
  width: 40px;
}
.cell-sub-item {
  height: 95px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.level-one {
  background-color: #ffffff;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
.level-two {
  background-color: #f6f6f6;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
.cell-item-sub-title {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
}
.cell-item-price {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #ff8f00;
}
.level-three {
  background-color: #f6f6f6;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
}
.cell-item-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
  margin-bottom: 24px;
}
</style>
