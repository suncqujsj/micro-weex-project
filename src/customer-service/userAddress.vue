<template>
    <div class="wrapper">
        <midea-header :title="title" :isImmersion="isipx?false:true" @headerClick="headerClick" titleText="#000000" @leftImgClick="back">
            <div slot="customerContent" class="header-right" v-if="!isCreate">
                <text class="header-right-text" @click="deleteAddress">删除</text>
            </div>
        </midea-header>
        <scroller>
            <cell class="group-gap-top"></cell>
            <div class="item-group">
                <text class="text-label">姓名</text>
                <input class="text-input" type="text" placeholder="请输入姓名" v-model="userAddress.receiverName" maxlength="20" />
                <image class="text-img" src="./assets/img/me_ic_addresslist@3x.png" resize='contain' @click="getAddressBookPerson"></image>
            </div>
            <div class="item-group">
                <text class="text-label">手机号码</text>
                <input class="text-input" type="tel" placeholder="请输入手机号码" v-model="userAddress.receiverMobile" maxlength="11" />
            </div>
            <div class="item-group">
                <text class="text-label">所在区域</text>
                <text class="text-desc" v-bind:class="[areaDesc=='请选择所在区域'?'empty-text':'']" @click="isShowAddressPicker=true">{{areaDesc}}</text>
                <image class="text-img" src="./assets/img/me_ic_area@3x.png" resize='contain' @click="getPosition"></image>
            </div>
            <div class="item-group">
                <text class="text-label">详细地址</text>
                <input class="text-input" type="text" placeholder="请输入详细地址" v-model="userAddress.addr" maxlength="200" />
            </div>
            <div class="item-group">
                <text class="text-label">默认地址</text>
                <midea-switch2 :checked="userAddress.defaultAddr" @change="changeDefaultAddr"></midea-switch2>
            </div>
        </scroller>

        <div class="action-bar">
            <midea-button :text="isCreate?'新增':'保存'" :disabled="!isDataReady" @mideaButtonClicked="submit"></midea-button>
        </div>

        <address-picker :isShow="isShowAddressPicker" :data="gpsAddress || userAddress" @oncancel="servieAddressCancel" @onchanged="servieAddressSelected">
        </address-picker>
    </div>
</template>

<script>
import base from './base'
import nativeService from './settings/nativeService';

import { MideaButton, MideaSwitch2 } from '@/index'

import AddressPicker from './components/addressPicker.vue'

export default {
    components: {
        MideaButton,
        AddressPicker,
        MideaSwitch2
    },
    mixins: [base],
    data() {
        return {
            title: '我的地址',
            isCreate: true,
            userAddress: {
                receiverName: '',
                receiverMobile: '',
                province: '',
                provinceName: '',
                city: '',
                cityName: '',
                county: '',
                countyName: '',
                street: '',
                streetName: '',
                addr: '',
                defaultAddr: false
            },
            gpsAddress: {
                province: '',
                provinceName: '',
                city: '',
                cityName: '',
                county: '',
                countyName: '',
                street: '',
                streetName: ''
            },
            isShowAddressPicker: false
        }
    },
    computed: {
        areaDesc() {
            return this.userAddress.province ? (this.userAddress.provinceName + ' ' + this.userAddress.cityName + ' ' + this.userAddress.countyName + ' ' + this.userAddress.streetName) : '请选择所在区域'
        },
        isDataReady() {
            let result = true
            if (this.userAddress.receiverName == '' ||
                this.userAddress.receiverMobile == '' ||
                this.userAddress.province == '' ||
                this.userAddress.provinceName == '' ||
                this.userAddress.city == '' ||
                this.userAddress.cityName == '' ||
                this.userAddress.county == '' ||
                this.userAddress.countyName == '' ||
                this.userAddress.street == '' ||
                this.userAddress.streetName == '' ||
                this.userAddress.addr == '') {
                result = false
            }

            return result
        }
    },
    methods: {
        getPosition() {
            nativeService.showLoadingWithMsg("正在获取位置信息...")
            let gpsParam = {
                desiredAccuracy: "10",  //定位的精确度，单位：米
                alwaysAuthorization: "0",  //是否开启实时定位功能，0: 只返回一次GPS信息（默认），1:APP在前台时，每移动distanceFilter的距离返回一次回调。2:无论APP在前后台，每移动distanceFilter的距离返回一次回调（注意耗电）
                distanceFilter: "10", //alwaysAuthorization为1或2时有效，每移动多少米回调一次定位信息
            }
            nativeService.getGPSInfo(gpsParam).then((data) => {
                nativeService.hideLoadingWithMsg()
                this.getAreaCodeByName(data.province, data.city, data.district).then((areaResp) => {
                    this.gpsAddress = areaResp
                    this.isShowAddressPicker = true
                })
            }).catch((error) => {
                nativeService.hideLoadingWithMsg()
                if (typeof error == 'string') {
                    try {
                        error = JSON.parse(error)
                    } catch (e) { }
                }
                if (error.errorCode == '-1') {
                    nativeService.toast("获取权限失败，请设置权限")
                } else {
                    nativeService.toast("定位失败")
                }
            })
        },
        getAreaCodeByName(province, city, county) {
            let provinceObj, cityObj, countyObj
            return new Promise((resolve, reject) => {
                let param = {
                    regionCode: 0
                }
                nativeService.getAreaList(param).then((data) => {
                    provinceObj = data.content.children.filter((provinceItem) => {
                        return province == provinceItem.regionName
                    })[0]
                    nativeService.getAreaList({
                        regionCode: provinceObj.regionCode
                    }).then((data) => {
                        cityObj = data.content.children.filter((cityItem) => {
                            return city == cityItem.regionName
                        })[0]
                        nativeService.getAreaList({
                            regionCode: cityObj.regionCode
                        }).then((data) => {
                            countyObj = data.content.children.filter((countyItem) => {
                                return county == countyItem.regionName
                            })[0]
                            resolve({
                                province: provinceObj.regionCode,
                                provinceName: provinceObj.regionName,
                                city: cityObj.regionCode,
                                cityName: cityObj.regionName,
                                county: countyObj.regionCode,
                                countyName: countyObj.regionName,
                            })
                        })
                    })
                })
            })
        },
        getAddressBookPerson() {
            nativeService.getAddressBookPerson().then((resp) => {
                if (resp.status == 0) {
                    let name = ""
                    if (resp.lastname || resp.firstname) {
                        name = (resp.lastname || "") + (resp.firstname || "")
                    } else {
                        name = resp.fullname || ""
                    }
                    this.userAddress.receiverName = name
                    this.userAddress.receiverMobile = resp.phone.replace(/[^0-9]/g, "")
                }
            }).catch((error) => {
                if (typeof error == 'string') {
                    try {
                        error = JSON.parse(error)
                    } catch (e) {

                    }
                }
                if (error.errorCode == '-1') {
                    nativeService.toast("获取权限失败，请设置权限")
                }
            })
        },
        servieAddressCancel(event) {
            this.isShowAddressPicker = false
            this.gpsAddress = null
        },
        servieAddressSelected(event) {
            this.userAddress = Object.assign({}, this.userAddress, event)
            this.gpsAddress = null
        },
        changeDefaultAddr(event) {
            this.userAddress.defaultAddr = event.value
        },
        deleteAddress() {
            nativeService.userAddrDelete({ userAddrId: this.userAddress.userAddrId }).then(() => {
                this.appPageDataChannel.postMessage({ page: this.fromPage, key: "userAddress" })
                this.back()
            }).catch((error) => {
                nativeService.toast(nativeService.getErrorMessage(error))
            })
        },
        submit() {
            if (!this.isDataReady) return

            if (this.userAddress.userAddrId) {
                //地址修改
                nativeService.userAddrUpdate(this.userAddress).then((resp) => {
                    this.appPageDataChannel.postMessage({ page: this.fromPage, key: "userAddress" })
                    this.back()
                }).catch((error) => {
                    nativeService.toast(nativeService.getErrorMessage(error))
                })
            } else {
                //地址新增
                nativeService.userAddrAdd(this.userAddress).then(() => {
                    this.appPageDataChannel.postMessage({ page: this.fromPage, key: "userAddress" })
                    this.back()
                }).catch((error) => {
                    nativeService.toast(nativeService.getErrorMessage(error))
                })
            }
        }
    },
    created() {
        this.userAddress.userAddrId = nativeService.getParameters('id') || null

        if (this.userAddress.userAddrId) {
            //地址修改
            this.isCreate = false
            nativeService.getItem(this.SERVICE_STORAGE_KEYS.userAddress, (resp) => {
                if (resp.result == 'success') {
                    this.userAddress = JSON.parse(resp.data)
                }
            })
        }
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
.group-gap-top {
  height: 24px;
}
.item-group {
  padding-top: 30px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 30px;
  background-color: #ffffff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.text-label {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #000000;
  width: 130px;
}
.text-input {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #333333;
  height: 72px;
  padding-left: 22px;
  padding-right: 50px;
}
.text-desc {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #333333;
  padding-left: 22px;
  padding-right: 50px;
}
.text-img {
  height: 40px;
  width: 40px;
}
.info-textarea {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #333333;
}
.action-bar {
  position: fixed;
  bottom: 0px;
  width: 750px;
  text-align: center;
  padding-bottom: 20px;
}
.empty-text {
  color: #9a9a9a;
}
</style>
