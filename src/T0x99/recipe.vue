<template>
    <div class="main">
        <midea-header :title="title" @leftImgClick="leftImgClick"></midea-header>
        <list>
            <midea-item :title="dishName" :hasArrow="true" :clickActivied="true" @mideaCellClick="showRecipeName"></midea-item>
            <midea-item :title="sensorName">
                <switch slot="value"></switch>
            </midea-item>
        </list>
        <midea-select :show="isShowSelect" title="选择设备" :items="recipeItems" :index="index" @close="isShowSelect=false" @itemClick="itemClick"></midea-select>
        <midea-title-bar title="工作温度℃" bgColor="#EEF4F7"></midea-title-bar>
        <div style="height:320px;">
            <midea-slider :max="temp.max" :min="temp.min" :value="temp.value" :step="sliderStep" :axisH="sliderAxisH" :pointH="sliderPointH" :axisColor="sliderAxisColor" :pointColor="sliderPointColor" :tipTxt="temp.tip" @slideEnd="slideEnd" @tipFormat="tempFormat"></midea-slider>
        </div>
        <midea-title-bar title="工作时长" bgColor="#EEF4F7"></midea-title-bar>
        <div style="height:380px;">
            <midea-slider :max="duration.max" :min="duration.min" :value="duration.value" :step="sliderStep" :axisH="sliderAxisH" :pointH="sliderPointH" :axisColor="sliderAxisColor" :pointColor="sliderPointColor" :tipTxt="duration.tip" @slideEnd="slideEnd" @tipFormat="durationFormat"></midea-slider>
        </div>
        <midea-dual-button class="footer-btn" leftBtnText="立即开始" rightBtnText="预约启动" leftBtnType="green" rightBtnType="green" defaultLeftBtnStyle="displayBtnStyle" defaultRightBtnStyle="displayBtnStyle" @leftBtnClicked="mideaButtonClicked" @rightBtnClicked="mideaButtonClicked"></midea-dual-button>
    </div>
</template>

<script>
    import base from './base'
    import nativeService from '@/common/services/nativeService';
    
    import mideaHeader from '@/midea-component/header.vue'
    import mideaItem from '@/midea-component/item.vue'
    import mideaSelect from "@/midea-component/mSelect.vue"
    import mideaSlider from "@/midea-component/slider.vue"
    import mideaTitleBar from '@/midea-component/title-bar.vue'
    import mideaDualButton from '@/midea-component/dualButton.vue'

    export default {
        components: {
            mideaHeader,
            mideaItem,
            mideaSelect,
            mideaSlider,
            mideaTitleBar,
            mideaDualButton
        },
        mixins: [base],
        data(){
            return {
                title: '自动菜单',
                dishName: '请选择菜谱',
                sensorName: '温度探针',
                isShowSelect: false,
                recipeItems: [
                    { value: "清蒸鱼", key: 0, otherKey: "other0", otherValue: "清蒸鱼" },
                    { value: "蒜蓉虾", key: 1, otherKey: "other1", otherValue: "蒜蓉虾" },
                    { value: "大闸蟹", key: 2, otherKey: "other2", otherValue: "大闸蟹" },
                    // { value: "扇贝", key: 3, otherKey: "other3", otherValue: "扇贝", disabled: true },
                    { value: "蒸排骨", key: 4, otherKey: "other4", otherValue: "蒸排骨" },
                    { value: "粉蒸肉", key: 5, otherKey: "other5", otherValue: "粉蒸肉" },
                    { value: "香菇鸡", key: 6, otherKey: "other6", otherValue: "香菇鸡" },
                    { value: "蒸氺蛋", key: 7, otherKey: "other7", otherValue: "蒸氺蛋" },
                    { value: "蒸米饭", key: 8, otherKey: "other8", otherValue: "蒸米饭" }
                ],
                temp: {
                    max: 300, //最大值
                    min: 0, //最小值
                    value: 210, //初始化值
                    tip: '210'
                },
                duration: {
                    max: 300, //最大值
                    min: 0, //最小值
                    value: 110, //初始化值
                    tip: 110
                },
                sliderStep: 5, //步长
                sliderAxisH: 3, //轴高度(px)
                sliderPointH: 26, //圆球高度（px）
                sliderAxisColor: '#DFE5E7',//滑条颜色
                sliderPointColor: '#0E90FF', //圆球颜色 
                sliderShowTip: false
            }
        },
        methods: {
            leftImgClick: function(){
            },
            showRecipeName: function(){
                this.isShowSelect = true
            },
            itemClick(event) {
                this.isShowSelect = false;
                this.dishName = event.item.value.split('"')[1]
            },
            tempFormat(event) {
                this.temp.tip = event.value + '℃';
            },
            durationFormat(event) {
                let minute = parseInt(event.value / 60);
                let seconds = event.value - minute * 60;
                this.duration.tip = (minute > 9 ? minute : '0' + minute) + ':' + (seconds > 9 ? seconds : '0' + seconds);
            },
            mideaButtonClicked(){
                nativeService.toast('点击了开始按钮')
            },
            mideaButtonClicked(){
                nativeService.toast('点击了预约按钮')
            }
        }
    }
</script>

<style>
    .main{
        padding-bottom: 0;
    }
    .footer-btn{
        position: fixed;
        bottom: -20px;
    }

    .displayBtnStyle {
        display: inline-flex;
        border-radius: 0px;
    }
</style>

