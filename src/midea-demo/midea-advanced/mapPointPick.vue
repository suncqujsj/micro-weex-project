<template>
    <div class="wrapper">
        <midea-header title="mapPointPick地图选点" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="接口参数:"></midea-title-bar>
        <text>{{mapData}}</text>
        <midea-map-view class="map" :data="mapData" @marker-pick="mapMarkerPick" @point-pick="mapPointPick"></midea-map-view>
        <text class="display-block">
            nativeService.launchMapApp(messageParam).then( (resp) => { this.result = resp } )
        </text>
    </div>
</template>
<style scoped>
.map {
  width: 750px;
  height: 750px;
}
</style>
<script>
import base from '../base'

import mideaButton from '@/midea-component/button.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            mapCenter: {
                latitude: '',
                longitude: '',
                zoom: 15 //地图显示范围 4-21级 （最大是21级）,非必选
            },
            mapMarkerList: [],
        }
    },
    computed: {
        mapData() {
            let tmp = {
                center: this.mapCenter,
                markers: [{
                    icon: {
                        normal: "",//正常的图片地址
                        click: "" //点击高亮的图片地址
                    },
                    list: this.mapMarkerList
                }]
            }
            return tmp
        }
    },
    methods: {
        mapMarkerPick(item) {
        },
        mapPointPick(item) {
            this.mapCenter.latitude = item.latitude
            this.mapCenter.longitude = item.longitude
            this.mapMarkerList = []
            this.mapMarkerList = [{ latitude: this.mapCenter.latitude, longitude: this.mapCenter.longitude, id: 1 }]
        }
    },
    created() {
        nativeService.getGPSInfo({
            desiredAccuracy: "10",
            distanceFilter: "10",
            alwaysAuthorization: "0"
        }).then((res) => {
            this.mapCenter.latitude = res.latitude || '39.92'
            this.mapCenter.longitude = res.longitude || '116.46'
            this.mapMarkerList = [{ latitude: this.mapCenter.latitude, longitude: this.mapCenter.longitude, id: 1 }]
        })
    }
};
</script>