<template>
    <div class="wrapper">
        <midea-header :title="title" :isImmersion="isImmersion" @headerClick="headerClick" titleText="#000000" @leftImgClick="back" :showRightText="true" :rightText="isListMode?'地图模式':'列表模式'" @rightTextClick="switchMode">
        </midea-header>
        <div v-if="!serviceOrderNo" class="info-bar">
            <text class="info-address" @click="changeArea">{{areaObject.county?(areaObject.cityName+ ' '+areaObject.countyName):'请选择位置'}}</text>
            <image class="arraw-down-icon" src="./assets/img/service_ic_hide@3x.png" resize='contain' @click="changeArea">
            </image>
            <div class="info-product">
                <midea-rich-text class="search-result-desc" :hasTextMargin="false" :config-list="richDesc"></midea-rich-text>
            </div>
        </div>

        <template v-if="sortedBranchList && sortedBranchList.length >0">
            <scroller v-if="isListMode" class="scroller">
                <div v-for="(branch, index) in sortedBranchList" :key="index">
                    <branch-block class="branch-block" :data="branch" :index="index" @navigate="navigate(branch)">
                    </branch-block>
                </div>
                <div class="gap-bottom"></div>
            </scroller>
            <div v-if="!isListMode" class="map-scroller">
                <midea-map-view class="map" :data="mapData"></midea-map-view>
                <slider class="slider" :index="currentAddressIndex" @change="changeBranch" auto-play="false">
                    <div v-for="(branch, index) in sortedBranchList" :key="index">
                        <branch-block class="branch-slider-block" ellipsis=true :data="branch" :index="index" @navigate="navigate(branch)">
                        </branch-block>
                    </div>
                </slider>
            </div>
        </template>
        <div class="empty-page" v-else-if="isLoaded && sortedBranchList.length == 0">
            <image class="empty-page-icon" src="./assets/img/default_ic_nobranch@3x.png" resize='contain'>
            </image>
            <text class="empty-page-text">抱歉，亲查询的网点不存在{{'\n'}}您可以拨打24小时服务热线咨询</text>
            <text class="empty-page-text phone" @click="makeCall('4008899315')">400-8899-315</text>
        </div>
        <div class="empty-page" v-else-if="isSearchByGPS && locateFailed">
            <image class="empty-page-icon" src="./assets/img/service_ic_dingwei@3x.png" resize='contain'>
            </image>
            <text class="empty-page-text">无法获取地址，请手动定位</text>
            <text class="empty-page-refresh" @click="initPage">刷新</text>
            <!-- <text class="empty-page-relocate">重新定位</text> -->
        </div>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService'
import BranchBlock from '@/customer-service/components/branchBlock.vue'

import MideaDialog from '@/component/dialog.vue'
import MideaRichText from '@/midea-component/wxc-rich-text';

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
            gpsInfo: null,
            locateFailed: false,
            areaObject: {
                province: '',
                provinceName: '',
                city: '',
                cityName: '',
                county: '',
                countyName: '',
            },
            serviceOrderNo: null,
            isSearchByGPS: true,
            order: null,
            selectedProduct: null,
            branchList: [],
            isLoaded: false,
            currentAddressIndex: 0,
            dialogShow: false
        }
    },
    computed: {
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
                    value: this.selectedProduct ? this.selectedProduct.prodName : '',
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
            let result
            if (this.branchList) {
                result = this.branchList.map((item) => {
                    let distance = 0, distanceDesc = ''
                    if (this.gpsInfo && this.gpsInfo.longitude && this.gpsInfo.latitude && item.nuitLongitude && item.unitLatitude) {
                        distance = nativeService.distanceByLnglat(this.gpsInfo.longitude, this.gpsInfo.latitude, item.nuitLongitude, item.unitLatitude) //单位：米
                        if (distance >= 1000) {
                            distanceDesc = Math.round(distance / 1000 * 100) / 100 + "km"
                        } else {
                            distanceDesc = distance + "m"
                        }
                    }
                    return Object.assign({
                        'distance': distance,
                        'distanceDesc': distanceDesc
                    }, item)
                })
                result = result.sort(function (a, b) {
                    return a.distance - b.distance
                })
            }
            return result
        },
        mapData() {
            let result
            if (this.sortedBranchList && this.currentAddressIndex > -1) {
                let unitLatitude = this.sortedBranchList[this.currentAddressIndex].unitLatitude
                let nuitLongitude = this.sortedBranchList[this.currentAddressIndex].nuitLongitude
                result = {
                    center: {
                        latitude: unitLatitude,
                        longitude: nuitLongitude,
                        zoom: 18 //地图显示范围 4-21级 （最大是21级）,非必选
                    },
                    markers: []
                }
                for (let index = 0; index < this.sortedBranchList.length; index++) {
                    const element = this.sortedBranchList[index];
                    result.markers.push({
                        icon: {
                            normal: "./assets/img/service_ic_pin@3x.png",//正常的图片地址
                            click: "./assets/img/service_ic_pin@3x.png" //点击高亮的图片地址
                        },
                        list: [
                            {
                                latitude: this.sortedBranchList[index].unitLatitude,
                                longitude: this.sortedBranchList[index].nuitLongitude,
                                id: index + 1
                            }
                        ]
                    })
                }
            }
            return result
        }
    },
    methods: {
        initPage() {
            if (this.serviceOrderNo) {
                this.isSearchByGPS = false
                this.getGPSInfo().then(() => { })
                //订单中查看网点
                nativeService.getItem(this.SERVICE_STORAGE_KEYS.currentOrder, (resp) => {
                    if (resp.result == 'success') {
                        this.order = JSON.parse(resp.data) || {}

                        let param = {
                            prodCode: this.order.serviceUserDemandVOs[0].prodCode,
                            brandCode: this.order.serviceUserDemandVOs[0].brandCode,
                            unitCode: this.order.unitCode
                        }
                        this.getUnitList(param)
                    }
                })
            } else {
                //首页网点查询
                nativeService.getItem(this.SERVICE_STORAGE_KEYS.selectedProductArray, (resp) => {
                    if (resp.result == 'success') {
                        this.selectedProduct = JSON.parse(resp.data)[0] || {}
                        this.getGPSInfo().then(() => {
                            this.getAreaCodeByName(this.gpsInfo.province, this.gpsInfo.city, this.gpsInfo.district).then((areaResp) => {
                                this.areaObject = areaResp
                                let param = {
                                    brandCode: this.selectedProduct.brandCode,
                                    prodCode: this.selectedProduct.prodCode,
                                    areaCode: this.areaObject.county
                                }
                                this.getUnitList(param)
                            })
                        })
                    }
                })
            }
        },
        handlePageData(data) {
            if (data.page == "branchList") {
                if (data.key == "areaSelection") {
                    //改变地区后刷新列表
                    nativeService.getItem(this.SERVICE_STORAGE_KEYS.selectedAreaObject, (resp) => {
                        if (resp.result == 'success') {
                            this.areaObject = JSON.parse(resp.data) || {}

                            let param = {
                                prodCode: this.selectedProduct.prodCode,
                                areaCode: this.areaObject.county
                            }
                            this.getUnitList(param)
                        }
                    })
                }
            }
        },
        switchMode() {
            this.isListMode = !this.isListMode
        },
        changeArea() {
            this.goTo('areaSelection', {}, { from: 'branchList' })
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
        },
        getGPSInfo() {
            return new Promise((resolve, reject) => {
                let gpsParam = {
                    desiredAccuracy: "10",  //定位的精确度，单位：米
                    alwaysAuthorization: "0",  //是否开启实时定位功能，0: 只返回一次GPS信息（默认），1:APP在前台时，每移动distanceFilter的距离返回一次回调。2:无论APP在前后台，每移动distanceFilter的距离返回一次回调（注意耗电）
                    distanceFilter: "10", //alwaysAuthorization为1或2时有效，每移动多少米回调一次定位信息
                }
                nativeService.showLoadingWithMsg("正在获取位置信息...")
                nativeService.getGPSInfo(gpsParam).then((data) => {
                    this.locateFailed = false
                    nativeService.hideLoadingWithMsg()
                    this.gpsInfo = data
                    resolve(data)
                }).catch((error) => {
                    this.locateFailed = true
                    nativeService.hideLoadingWithMsg()
                    reject(error)
                })
            })
        },
        getAreaCodeByName(province, city, county) {
            let temp, provinceObj, cityObj, countyObj
            return new Promise((resolve, reject) => {
                let param = {
                    regionCode: '0'
                }
                nativeService.getAreaList(param).then((data) => {
                    temp = data.content.children.filter((provinceItem) => {
                        return province == provinceItem.regionName
                    })
                    if (temp && temp.length > 0) {
                        provinceObj = temp[0]
                    } else {
                    }
                    nativeService.getAreaList({
                        regionCode: provinceObj.regionCode
                    }).then((data) => {
                        temp = data.content.children.filter((cityItem) => {
                            return city == cityItem.regionName
                        })
                        if (temp && temp.length > 0) {
                            cityObj = temp[0]
                        } else {
                            throw { msg: '地域定位失败' }
                        }
                        nativeService.getAreaList({
                            regionCode: cityObj.regionCode
                        }).then((data) => {
                            temp = data.content.children.filter((countyItem) => {
                                return county == countyItem.regionName
                            })
                            if (temp && temp.length > 0) {
                                countyObj = temp[0]
                            } else {
                                throw { msg: '地域定位失败' }
                            }
                            resolve({
                                province: provinceObj.regionCode,
                                provinceName: provinceObj.regionName,
                                city: cityObj.regionCode,
                                cityName: cityObj.regionName,
                                county: countyObj.regionCode,
                                countyName: countyObj.regionName,
                            })
                        }).catch((error) => {
                            nativeService.toast(nativeService.getErrorMessage(error))
                        })
                    }).catch((error) => {
                        nativeService.toast(nativeService.getErrorMessage(error))
                    })
                }).catch((error) => {
                    nativeService.toast(nativeService.getErrorMessage(error))
                })
            })
        },
        getUnitList(param) {
            nativeService.queryunitarchives(param).then((data) => {
                let result = data.list || []
                this.branchList = result
                //GCJ-02(火星)转BD-09（百度地图）
                this.branchList = result.map((item) => {
                    if (item.unitLatitude && item.nuitLongitude) {
                        let point = nativeService.mapabcEncryptToBdmap(item.unitLatitude, item.nuitLongitude)
                        item.unitLatitude = point.lat
                        item.nuitLongitude = point.lng
                    }
                    return item
                })

                this.currentAddressIndex = 0
                this.isLoaded = true
            }).catch((error) => {
                nativeService.toast(nativeService.getErrorMessage(error))
            })
        },
        navigate(item) {
            if (this.gpsInfo) {
                nativeService.baiduGeocoder({ //当前用户地点
                    latitude: this.gpsInfo.latitude, //纬度
                    longitude: this.gpsInfo.longitude //经度
                }).then((addressData) => {
                    let currentAddress = "当前位置"
                    if (addressData.status == 0) {
                        if (addressData.result.poiRegions.length > 0) {
                            currentAddress = addressData.result.poiRegions[0].name
                        }
                        if (!currentAddress) {
                            currentAddress = addressData.result.formatted_address
                        }
                    }
                    let param = {
                        from: { //当前用户地点
                            latitude: this.gpsInfo.latitude, //纬度
                            longitude: this.gpsInfo.longitude, //经度
                            name: currentAddress + ",", //起点的名称
                        },
                        to: { //目的地地点
                            latitude: item.unitLatitude, //纬度
                            longitude: item.nuitLongitude, //经度
                            name: item.unitName, //起点的名称
                        }
                    }
                    nativeService.launchMapApp(param).then((resp) => { }
                    ).catch((error) => {
                        if (error.errorCode == -1) {
                            nativeService.toast("没有打开地图权限")
                        }
                    })
                })
            } else {
                nativeService.toast("没有当前定位信息")
            }
        },
        makeCall(telNo) {
            nativeService.callTel({
                tel: telNo,
                title: '服务热线',
                desc: telNo
            }).then(
                (resp) => { }
            )
        }
    },
    created() {
        this.serviceOrderNo = nativeService.getParameters('id') || null
        this.initPage()
    }
}
</script>

<style>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
  flex-direction: column;
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
  height: 220px;
  bottom: 0px;
  left: 0px;
}
.branch-slider-block {
  width: 750px;
}

.empty-page {
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 272px;
}
.empty-page-icon {
  width: 240px;
  height: 240px;
}
.empty-page-text {
  padding-top: 36px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #888888;
  text-align: center;
}
.phone {
  margin-top: 100px;
  color: #267aff;
}
.empty-page-refresh {
  margin-top: 36px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #267aff;
  text-align: center;
  width: 182px;
  padding: 10px;
  border-color: #267aff;
  border-width: 1px;
  border-radius: 4px;
}
.empty-page-relocate {
  padding-top: 36px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #267aff;
  text-align: center;
}
</style>
