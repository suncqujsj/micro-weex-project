<template>
    <div class="wrapper">
        <midea-header :title="title" bgColor="#ffffff" :isImmersion="isipx?false:true" @headerClick="headerClick" leftImg="./img/header/tab_back_black.png" titleText="#000000" @leftImgClick="back">
        </midea-header>
        <list>
            <cell class="top-gap"></cell>
            <midea-item v-for="(item, index) in areaList" :key="index" height="96" :hasArrow="true" :clickActivied="true" @mideaCellClick="selectItem(item)">
                <text slot="title" class="address-item-title">{{item.regionName}}</text>
            </midea-item>
        </list>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService'
import { MideaItem } from '@/index'

export default {
    components: {
        MideaItem
    },
    mixins: [base],
    data() {
        return {
            title: '选择地址',
            regionCode: '',
            selectedAreaObject: {},
            areaList: []
        }
    },
    methods: {
        selectItem(item) {
            let regionData = {
                regionCode: item.regionCode,
                regionName: item.regionName
            }
            if (item.level == 3) {
                this.selectedAreaObject = Object.assign(this.selectedAreaObject, {
                    county: item.regionCode,
                    countyName: item.regionName
                })
                nativeService.setItem(this.SERVICE_STORAGE_KEYS.selectedAreaObject, this.selectedAreaObject,
                    () => {
                        this.appPageDataChannel.postMessage({ page: this.fromPage, key: "addressList", data: "" })
                        this.back({ viewTag: 'branchList' })
                    })
            } else if (item.level == 2) {
                this.selectedAreaObject = Object.assign(this.selectedAreaObject, {
                    city: item.regionCode,
                    cityName: item.regionName
                })
                nativeService.setItem(this.SERVICE_STORAGE_KEYS.selectedAreaObject, this.selectedAreaObject,
                    () => {
                        this.goTo('addressList', {}, { from: 'branchList', regionCode: item.regionCode })
                    })
            } else if (item.level == 1) {
                this.selectedAreaObject = {
                    province: item.regionCode,
                    provinceName: item.regionName
                }
                nativeService.setItem(this.SERVICE_STORAGE_KEYS.selectedAreaObject, this.selectedAreaObject,
                    () => {
                        this.goTo('addressList', {}, { from: 'branchList', regionCode: item.regionCode })
                    })
            }
        }
    },
    created() {
        nativeService.getItem(this.SERVICE_STORAGE_KEYS.selectedAreaObject, (resp) => {
            if (resp.result == 'success') {
                this.selectedAreaObject = JSON.parse(resp.data) || {}
            }

            this.regionCode = nativeService.getParameters('regionCode') || "0"
            let param = {
                regionCode: this.regionCode
            }
            nativeService.getAreaListCache(param).then((data) => {
                this.areaList = data.children
            })
        })
    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
}
.top-gap {
  background-color: #f2f2f2;
  height: 28px;
}
.address-item-title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
}
</style>
