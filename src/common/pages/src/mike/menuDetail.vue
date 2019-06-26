<style scoped lang="less">

    @import "../../../less/recipeHome.less";

    /* Customize menu detail header styles*/
    .menu-detail-header {

        position: fixed;

        width: 750px;

        height: '44wx';
        top: 0;
        left: 0;
        display: inline-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;

    }

    .menu-detail-font-color {

        color: #595959;
    }

    .header-left-image-wrapper {
        width: 88px;
        height: 88px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-left: 10px;
    }

    .header-left-image {
        height: 58px;
        width: 58px;
    }

    /* Detail page contents*/
    .menu-detail-page {

        width: 750px;
        flex: 1;
        flex-direction: column;

    }

    .content-scroller {

        flex: 1;

    }

    /* Cover mode style*/
    .cover-mode {

        position: relative;


    }

    .menu-cover-image {
        width: 750;
        flex: 1;

    }

    .cover-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.2);

    }

    .cover-information {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        padding: 30px 22px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

    }

    .cover-info-menu-name {
        color: #ffffff;
        font-size: 30px*2;
        margin-bottom: 9px;
    }

    .cover-info-rate-star {
        margin-bottom: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;

    }

    .rate-star-icon {
        width: 28px;
        height: 28px;

    }

    .cover-info-hashtags {

        margin-bottom: 66px;
        display: flex;
        flex-direction: row;
        align-items: center;

    }

    .cover-info-hashtag-item {
        color: #ffffff;
        font-size: 17px*2;


        margin-right: 4px;
    }

    .cover-info-cook-time, .cover-info-difficulty {
        color: #ffffff;
        font-size: 17px*2;
    }

    .cover-info-cook-time {
        margin-bottom: 5px;
    }


    /* Detail Mode Styles*/

    .detail-mode {


        display: flex;
        flex-direction: column;
    }

    .detail-mode-empty-content {
        width: 750;
        background-color: #f2f2f2;
    }

    .square-image {

        width: 750px;
        height: 242px;

    }

    .detail-mode-image-swiper {
        position: relative;
        padding-bottom: 40px;
    }

    /*轮播指引点*/
    .slider-indicator {
        width: 750px;
        height: 24px;
        position: absolute;
        bottom: 0;
        left: 0;
        item-color: rgba(199, 199, 199, 1);
        item-selectedColor: rgba(89, 87, 85, 1);
        item-size: 14px;
    }


    .detail-mode-content-wrapper {


    }

    .detail-mode-content-basic-info {
        padding: 60px 0;
        margin: 0 40px;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-bottom-color: #e1e1e1;

    }

    .basic-info-menu-name {
        color: #595959;
        font-size: 23px*2;
        margin-bottom: 9px;
    }

    .basic-info-rate-star {
        margin-bottom: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;

    }


    .basic-info-hashtags {

        margin-bottom: 66px;
        display: flex;
        flex-direction: row;
        align-items: center;

    }

    .basic-info-hashtag-item {
        color: #595959;
        font-size: 17px*2;


        margin-right: 4px;
    }

    .basic-info-others-item {
        margin-bottom: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;


    }

    .others-icon {

        width: 30px;
        height: 30px;
        margin-right: 10px;
    }

    .others-text {
        color: #595959;
        font-size: 17px*2;
    }


    .loadingbox {
        align-items: center;
        padding: 20px;
        height: 80px;
    }

    .loading {
        height: 40px;
        width: 40px;
    }

    .detail-mode-section {
        padding: 30px 0;
        margin: 0 40px;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-bottom-color: #e1e1e1;

    }

    .detail-mode-section-head {

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

    }

    .detail-mode-section-head__left {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .detail-mode-section-head__left__title {
        .menu-detail-font-color;
        font-size: 20px*2;


    }

    .ingredient-user-icon {
        width: 32px;
        height: 32px;
        margin-left: 10px;
        margin-right: 5px;
    }

    .ingredient-user-number {

        .menu-detail-font-color;
    }

    .detail-mode-section-head__right {

        display: flex;
        flex-direction: row;
        align-items: center;
        .menu-detail-font-color;
        font-size: 17px*2;
    }

    .head_arrow {
        width: 18px;
        height: 9px;
    }

    .arrow-right {
        transform: rotate(90deg);
    }

    .posting-num {
        margin-right: 5px;
        .menu-detail-font-color;
        font-size: 15px*2;
    }

    .ingredient-section-content {
        padding-top: 60px;
    }

    .ingredient-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .ingredient-item__left {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 63px;
    }

    .checkmark {
        width: 23px;
        height: 23px;
        margin-right: 5px;

    }

    .ingredient-name {
        .menu-detail-font-color;
        font-size: 20px*2;
    }

    .ingredient-item__right {
        padding-right: 63px;
    }

    .ingredient-amount {
        .menu-detail-font-color;
        font-size: 20px*2;
    }


</style>
<template>
    <div class="menu-detail-page" :style="{height: wrapHeight}">


        <div class="menu-detail-header" :style="headerStyleObj">


            <div class="header-left-image-wrapper">
                <image class="header-left-image" src="img/header/public_ic_back_white@3x.png"></image>
            </div>
        </div>


        <scroller class="content-scroller" :style="{height: wrapHeight}" @scroll="onScroll" @loadmore="onloadmore">


            <!--            Full screen cover image -->
            <div class="cover-mode" :style="{height: wrapHeight}" v-if="isShowCoverMode">

                <image src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                       resize="cover" class="menu-cover-image"></image>

                <div class="cover-mask">

                </div>

                <div class="cover-information">
                    <text class="cover-info-menu-name">芝士焗西兰花</text>

                    <div class="cover-info-rate-star">
                        <image class="rate-star-icon" resize="contain"
                               v-for="item in [0,1,2,3,4]"
                               :src="rateStarImgSrc(item)"></image>
                    </div>

                    <div class="cover-info-hashtags">
                        <text class="cover-info-hashtag-item">#清淡</text>
                        <text class="cover-info-hashtag-item">#塑身</text>
                    </div>

                    <text class="cover-info-cook-time">时间： 约5-10分钟</text>
                    <text class="cover-info-difficulty">难度： 零厨艺</text>

                </div>
            </div>


            <!--             Loading indicator between cover and detail mode -->
            <div class="loadingbox" v-if="loading">

                <image class="loading" src="https://img.alicdn.com/tfs/TB1CWnby7yWBuNjy0FpXXassXXa-32-32.gif"/>
            </div>


            <!--             Detail information mode -->
            <!--             TODO: with and without video -->
            <div class="detail-mode" v-if="isShowDetailMode" ref="detailMode">

                <slider interval="3000" auto-play="true" infinite="true" class="detail-mode-image-swiper">

                    <div class="detail-mode-image-swiper-item" v-for="item in [1,2,3,4]">
                        <image class="square-image"
                               src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                               resize="cover" :style="detailModeCoverStyle"></image>
                    </div>

                    <indicator class="slider-indicator"></indicator>

                </slider>


                <div class="detail-mode-empty-content" :style="{height:wrapHeight}" v-if="loading">

                </div>

                <div class="detail-mode-content-wrapper">

                    <div class="detail-mode-content-basic-info">
                        <text class="basic-info-menu-name">芝士焗西兰花</text>

                        <div class="basic-info-rate-star">
                            <image class="rate-star-icon" resize="contain"
                                   v-for="item in [0,1,2,3,4]"
                                   :src="rateStarImgSrc(item)"></image>
                        </div>

                        <div class="basic-info-hashtags">
                            <text class="basic-info-hashtag-item">#清淡</text>
                            <text class="basic-info-hashtag-item">#塑身</text>
                        </div>

                        <div class="basic-info-others">
                            <div class="basic-info-others-item">
                                <image class="others-icon" resize="contain" src="img/mike/clock_blue.png"></image>
                                <text class="others-text">时间： 约5-10分钟</text>
                            </div>
                            <div class="basic-info-others-item">
                                <image class="others-icon" resize="contain" src="img/mike/knife_blue.png"></image>

                                <text class="others-text">难度： 零厨艺</text>
                            </div>
                        </div>


                    </div>


                    <!--                    用料-->
                    <div class="detail-mode-section detail-mode-ingredient">

                        <div class="detail-mode-section-head ingredient-head ">

                            <div class="detail-mode-section-head__left">
                                <text class="detail-mode-section-head__left__title">用料</text>

                                <image resize="contain" class="ingredient-user-icon"
                                       src="img/mike/user_blue.png"></image>
                                <text class="ingredient-user-number">x2</text>
                            </div>
                            <div class="detail-mode-section-head__right">
                                <text class="ingredient-buy">购买</text>
                            </div>
                        </div>

                        <div class="detail-mode-section-content ingredient-section-content">

                            <div class="ingredient-item" v-for="item in [2,3,4,5]">
                                <div class="ingredient-item__left">
                                    <image class="checkmark" src="img/mike/checkmark_black.png"
                                           resize="contain"></image>
                                    <text class="ingredient-name">芝士</text>
                                </div>

                                <div class="ingredient-item__right">
                                    <text class="ingredient-amount">100g</text>
                                </div>

                            </div>

                        </div>
                    </div>
                    <!--                    步骤-->

                    <div class="detail-mode-section detail-mode-steps">

                        <div class="detail-mode-section-head ingredient-head ">

                            <div class="detail-mode-section-head__left">
                                <text class="detail-mode-section-head__left__title">步骤</text>


                            </div>
                            <div class="detail-mode-section-head__right">

                                <image class="head_arrow arrow-up" src="img/mike/arrow_up_blue.png"
                                       resize="contain"></image>
                            </div>
                        </div>
                    </div>


                    <!--                    评分-->
                    <div class="detail-mode-section detail-mode-scores">

                        <div class="detail-mode-section-head ingredient-head ">

                            <div class="detail-mode-section-head__left">
                                <text class="detail-mode-section-head__left__title">评分</text>


                            </div>
                            <div class="detail-mode-section-head__right">
                            </div>
                        </div>
                    </div>

                    <!--                    晒作品-->
                    <div class="detail-mode-section detail-mode-posting">

                        <div class="detail-mode-section-head ingredient-head ">

                            <div class="detail-mode-section-head__left">
                                <text class="detail-mode-section-head__left__title">晒作品</text>


                            </div>
                            <div class="detail-mode-section-head__right">

                                <text class="posting-num">全部24个作品</text>
                                <image class="head_arrow arrow-right" src="img/mike/arrow_up_blue.png"
                                       resize="contain"></image>
                            </div>
                        </div>
                    </div>


                    <!--                    推荐菜谱-->
                    <div class="detail-mode-section detail-mode-recommend-menus">

                        <div class="detail-mode-section-head ingredient-head ">

                            <div class="detail-mode-section-head__left">
                                <text class="detail-mode-section-head__left__title">推荐菜谱</text>


                            </div>
                            <div class="detail-mode-section-head__right">

                                <image class="head_arrow arrow-up" src="img/mike/arrow_up_blue.png"
                                       resize="contain"></image>
                            </div>
                        </div>
                    </div>

                    <!--                    TODO: bottom bar -->
                </div>
            </div>

        </scroller>


    </div>
</template>

<script>

    import commonMixin from "@/common/util/mixins/common"

    import MideaHeader from '@/midea-component/header.vue'

    const dom = weex.requireModule('dom')
    import nativeService from "@/common/services/nativeService";

    export default {
        name: "menuDetail",
        mixins: [commonMixin],
        components: {MideaHeader},
        data() {
            return {
                isImmersion: true,
                isShowDetailMode: false,
                isShowCoverMode: true,
                loading: true,

            }
        },
        computed: {

            detailModeCoverStyle() {

                return {
                    height: 750 / 1.7 + 'px'
                }
            },

            statusBarHeight: function () {
                let result = '20'
                if (weex.config.env.statusBarHeight) {
                    if (weex.config.env.platform == 'iOS') {
                        //iOS使用pt为单位
                        result = weex.config.env.statusBarHeight
                    } else {
                        //安卓使用px为单位
                        result = weex.config.env.statusBarHeight / weex.config.env.scale

                    }
                }
                return result
            },
            headerStyleObj: function () {
                let result, isImmersion
                if (this.isImmersion != null) {
                    isImmersion = this.isImmersion
                } else {
                    isImmersion = weex.config.env.isImmersion == "false" ? false : true
                }
                if (isImmersion) {
                    //全屏显示，weex自行处理状态栏高度
                    result = {
                        backgroundColor: 'transparent',
                        paddingTop: this.statusBarHeight + 'wx',
                        height: (+this.statusBarHeight + 44) + 'wx',
                    }
                } else {
                    //非全屏显示，APP已经处理状态栏高度
                    result = {
                        backgroundColor: 'transparent',
                        height: '44wx',
                    }
                }

                return result
            }
        },
        methods: {
            onloadmore() {

                if (this.isShowDetailMode) {
                    return;
                }

                this.loading = true;

                setTimeout(() => {
                    this.isShowCoverMode = false;

                    this.showDetailMode();
                }, 500)


            },
            showDetailMode() {
                setTimeout(() => {
                    this.isShowDetailMode = true;

                    this.loading = false;
                }, 500)
            },
            onScroll(e) {

                let contentOffset = e.contentOffset;
            },
            rateStarImgSrc(index) {
                return index < 3 ? './img/mike/star_yellow@3x.png' : './img/mike/star_gray@3x.png'
            },
        },
    }
</script>