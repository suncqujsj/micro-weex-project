<template>
    <div class="wrapper">
        <midea-header :title="title" :isImmersion="isipx?false:true" @headerClick="headerClick" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <div class="search-bar">
            <div class="search-bar-content">
                <image class="search-bar-img" :src="'./assets/img/service_ic_sreach@3x.png'" resize="contain"></image>
                <input class="search-bar-input" placeholder="查询关键字" v-model="queryParam.content" maxlength="20" @return="search" return-key-type="search"></input>
            </div>
            <text v-if="isIos" class="search-action" @click="back">取消</text>
            <text v-if="!isIos" class="search-action" @click="search">搜索</text>
        </div>
        <list>
            <cell v-for="(itemA, indexA) in sortedFreePlocy" :key="indexA">
                <div class="cell-item">
                    <div class="cell-sub-item level-one" @click="levelAClicked(itemA, indexA)">
                        <text class="cell-item-title">{{itemA.classAProject}}</text>
                        <image class="cell-arrow-icon" :src="expandedAIndex==indexA?'./assets/img/service_ic_show@3x.png':'./assets/img/service_ic_hide@3x.png'" resize="contain"></image>
                    </div>
                </div>
                <div v-if="expandedAIndex==indexA" class="cell-expand-item" v-for="(itemB, indexB) in itemA.children" :key="indexB">
                    <div class="cell-sub-item level-two" @click="levelBClicked(itemB, indexB)">
                        <text class="cell-item-sub-title">{{itemB.classBProject}}</text>
                        <image class="cell-arrow-icon" :src="expandedBIndex==indexB?'./assets/img/service_ic_hide_s@3x.png':'./assets/img/service_ic_show_s@3x.png'" resize="contain"></image>
                    </div>
                    <div v-if="expandedBIndex==indexB" class="level-three" v-for="(itemC, indexC) in itemB.children" :key="indexC">
                        <div class="cell-sub-item">
                            <text class="cell-item-final-title">{{itemC.classCProject}}</text>
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
import nativeService from './settings/nativeService';

export default {
    components: {
    },
    mixins: [base],
    data() {
        return {
            title: '', //收费政策
            selectedProduct: null,
            queryParam: {
                prodCode: '',
                content: '',
                pageSize: 10000,
                pageNum: 1,
                classA: '',
                classB: '',
                classC: ''
            },
            chargeStandardList: [],
            expandedAIndex: -1,
            expandedBIndex: -1
        }
    },
    computed: {
        sortedFreePlocy() {
            let result = []
            let classAIndexs = {}, classBIndexs = {}
            if (this.chargeStandardList && this.chargeStandardList.length > 0) {
                for (let index = 0; index < this.chargeStandardList.length; index++) {
                    const item = this.chargeStandardList[index];
                    let Aindex = classAIndexs[item.classA]
                    if (!Aindex) {
                        result.push({
                            "classA": item.classA,
                            "classAProject": item.classAProject,
                            "children": []
                        })
                        Aindex = String(result.length - 1)
                        classAIndexs[item.classA] = String(result.length - 1)
                    }

                    let Bindex = classBIndexs[item.classB]
                    if (!Bindex) {
                        result[Aindex]["children"].push({
                            "classB": item.classB,
                            "classBProject": item.classBProject,
                            "children": []
                        })
                        Bindex = String(result[Aindex]["children"].length - 1)
                        classBIndexs[item.classB] = String(result[Aindex]["children"].length - 1)
                    }

                    result[Aindex]["children"][Bindex]["children"].push({
                        "classC": item.classC,
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
        search() {
            nativeService.getChargeStandardList(this.queryParam).then((data) => {
                let result = data.data || []
                this.chargeStandardList = result.sort(function (a, b) {
                    if (a.classA === b.classA) {
                        if (a.classB === b.classB) {
                            return b.classC - a.classC
                        } else {
                            return a.classB - b.classB
                        }
                    } else {
                        return a.classA - b.classA
                    }
                })
            }).catch((error) => {
                nativeService.toast(nativeService.getErrorMessage(error))
            })
        },
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
        nativeService.getItem(this.SERVICE_STORAGE_KEYS.selectedProductArray, (resp) => {
            if (resp.result == 'success') {
                this.selectedProduct = JSON.parse(resp.data)[0] || {}
                this.title = this.selectedProduct.prodName
                this.queryParam.prodCode = this.selectedProduct.prodCode
                this.search()
            }
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
  background-color: #ffffff;
}
.search-bar-content {
  flex: 1;
  width: 586px;
  height: 64px;
  border-radius: 4px;
  background-color: #f2f2f2;
  flex-direction: row;
  align-items: center;
  margin-left: 32px;
}
.search-bar-img {
  height: 40px;
  width: 40px;
  margin-left: 10px;
  margin-right: 10px;
}
.search-bar-input {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  height: 40px;
}
.search-action {
  width: 120px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #000000;
  text-align: center;
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
.cell-item-final-title {
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 28px;
  color: #000000;
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
