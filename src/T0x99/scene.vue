<template>
    <div>
        <midea-header bgColor="#ffffff" titleText="#333333" :title="title" @leftImgClick="leftImgClick" :showRightImg="showRightImg"></midea-header>
        <!-- <div  @swipe="swipeScene">
            <scroller class="scroller" scroll-direction="horizontal">
                <div v-for="(item,index) in sceneItem" :key="item.name"  ref="item" :class="['panel', index==scenceNum ? 'last-panel': '']" :data-index="index">
                    <text>{{item.name}}</text>
                    <image :src="item.imgPath"></image>
                </div>
            </scroller>
        </div> -->
        <div class="slider-floor">
            <slider class="slider" interval="3000" auto-play="false" @change="swipeScene">
                <div class="scene-item" v-for="item in sceneList">
                    <image class="scene-img" resize="cover" :src="item.imgPath"></image>
                </div>
            </slider>
        </div>
        <div class="edit-floor">
            <text class="scene-name" @click="showConfirm">{{sceneName}}</text>
        </div>
        <midea-confirm :show="isShowConfirm" :title="confirmTitle"  :content="confirmContent" @mideaPopupOverlayClicked="popupOverlayBottomClick" @leftBtnClick="leftBtnClick" @rightBtnClick="rightBtnClick"></midea-confirm>
        
    </div>
</template>

<script>
    const dom = weex.requireModule('dom')
    import base from './base'

    import nativeService from '@/common/services/nativeService';
    import mideaHeader from '@/midea-component/header.vue'
    import mideaConfirm from '@/midea-component/confirm.vue'
    export default {
        components: {
            mideaHeader,
            mideaConfirm
        },
        mixins: [base],
        data(){
            return {
                showRightImg: true,
                title: '编辑场景',
                sceneList: [
                    {
                        name: '早晨',
                        imgPath: 'https://about.canva.com/wp-content/uploads/sites/3/2017/02/congratulations_-banner.png',
                    },
                    {
                        name: '中午',
                        imgPath: 'http://www.plslogistics.com/wp-content/uploads/2015/06/orange-triangle-banner.jpg'
                        
                    },
                    {
                        name: '傍晚',
                        imgPath: 'https://about.canva.com/wp-content/uploads/sites/3/2017/02/congratulations_-banner.png',
                        
                    },
                    {
                        name: '睡觉',
                        imgPath: 'http://www.plslogistics.com/wp-content/uploads/2015/06/orange-triangle-banner.jpg'
                        
                    }
                ],
                sceneName: '场景一',
                isShowConfirm: false,
                confirmTitle: 'confirmTitle',
                confirmContent: 'confirmContent'
            }
        },
        computed:{
             scenceNum(){
                 return this.sceneItem.length - 1
             },
             sceneTransform(){
                 return 'transform:translateX('+ this.sceneTransX + 'px)'
             }
        },
        methods:{
            leftImgClick(){
            },
            swipeScene(event) {
                console.dir(event)
            },
            showConfirm(){
                this.isShowConfirm = true
            },
            
            leftBtnClick(){
                this.isShowConfirm = false
            },
            rightBtnClick(){
                this.isShowConfirm = false
            },
            popupOverlayBottomClick(){
                this.isShowConfirm = false
            }
        },
        created(){

        }
    }
</script>

<style>
.slider-floor{
    justify-content: center;
    flex-direction: row;
    padding-top: 30px;
    background-color: #EFF4F7;
}
.slider{
    width: 700px;
    height: 300px;
    justify-content: center;
}
.scene-item{
    width: 700px;
    height: 300px;
    position: relative;
    justify-content: center;
}
.scene-img{
    width: 700px;
    height: 300px;
}

.edit-floor{
    background-color: #EFF4F7;
}
.scene-name{
    justify-content: center;
    text-align: center;
    padding: 30px;
    margin-top: 10px;
    margin-bottom: 30px;
    margin-left: 50px;
    margin-right: 50px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #888888;
}
</style>


