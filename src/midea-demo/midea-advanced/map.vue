<template>
    <div>
        <midea-header title="map" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-map-view class="map" :data="mapData" @marker-pick="markerPick" @point-pick="pointPick"></midea-map-view>
        <midea-button text="刷新数据" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <text class="display-text">
            {{JSON.stringify(mapData)}}
        </text>
    </div>
</template>

<style scoped>
.map {
  width: 730px;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  height: 500px;
}
.display-text {
  font-size: 30px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
<script>  
import base from '../base'
import mideaHeader from '@/midea-component/header.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'
export default {
    components: { mideaHeader, mideaButton },
    mixins: [base],
    data() {
        return {
            mapData: {
                center: {
                    latitude: 23.54,
                    longitude: 113.13,
                    zoom: 10 //地图显示范围 4-21级 （最大是21级）,非必选
                },
                markers: [
                    {
                        icon: {
                            normal: "./assets/img/service_ic_pin@3x.png",//正常的图片地址
                            click: "./assets/img/service_ic_pin@3x.png" //点击高亮的图片地址
                        },
                        list: [
                            { latitude: 23.14, longitude: 113.3, id: 1 },
                            { latitude: 23.74, longitude: 113.73, id: 2 }
                        ]
                    },
                    { //第二组坐标，可换不同坐标
                        icon: {
                            normal: "./assets/img/service_ic_pin@3x.png",//正常的图片地址
                            click: "./assets/img/service_ic_pin@3x.png" //点击高亮的图片地址
                        },
                        list: [
                            { latitude: 23.24, longitude: 113.53, id: 3 },
                            { latitude: 23.4, longitude: 113.93, id: 4 }
                        ]
                    }
                ]
            }
        }
    },
    methods: {
        markerPick(item) {
            /* item: {
                status: 0, //0获取成功
                id: xxx //weex设置覆盖物的id值
            } */
            nativeService.toast("点击了marker id:" + item.id)
        },
        pointPick(item) {
            /* item: {
                status: 0, //0获取成功
                platform: baidu  //默认是百度地图返回的信息，非必选
                province: 省名字，
                city: 城市名字，
                cityCode: 城市编号,
                district: 区域名字
                latitude: string， //纬度
                longitude: string， //经度
            } */
            nativeService.toast("点击了地图位置:" + JSON.stringify(item))
        }
    },
}
</script>