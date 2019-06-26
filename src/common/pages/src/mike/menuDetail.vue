<style scoped lang="less">

    @import "../../../less/recipeHome.less";

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

    .menu-detail-page {

        width: 750px;
        flex: 1;
        flex-direction: column;

    }

    .content-scroller {

        flex: 1;

    }

    .cover-mode {

        background-color: #fff6d6;
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

    .loadingbox {
        align-items: center;
        padding: 20px;
        height: 80px;
    }

    .loading {
        height: 40px;
        width: 40px;
    }


</style>
<template>
    <div class="menu-detail-page" :style="{height: wrapHeight}">

        <!--        leftImg="img/header/public_ic_gray@3x.png"-->

        <!--        <midea-header bg-color="transparent" :isImmersion="true" :showLeftImg="true" @leftImgClick="back2Native">-->
        <!--            <div slot="customerContent" class="header-top-wrapper">-->
        <!--                <div class="header-top-inner-wrapper">-->
        <!--                    <div class="header-right-image-wrapper" @click="onCloudMenuIconClicked">-->
        <!--                        <image class="header-right-image" :src="'img/header/public_ic_cloud_recipe@3x.png'"></image>-->
        <!--                    </div>-->
        <!--                    <div class="header-right-image-wrapper" @click="childLock(true)">-->
        <!--                        <image class="header-right-image" :src="'img/header/public_ic_babylock@3x.png'"></image>-->
        <!--                    </div>-->
        <!--                    <div class="header-right-image-wrapper" @click="openMorePage">-->
        <!--                        <image class="header-right-image" :src="'img/header/me_ic_set@3x.png'"></image>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </midea-header>-->

        <div class="menu-detail-header" :style="headerStyleObj">


            <div class="header-left-image-wrapper">
                <image class="header-left-image" src="img/header/public_ic_back_white@3x.png"></image>
            </div>
        </div>


        <scroller class="content-scroller" :style="{height: wrapHeight}" @scroll="onScroll" @loadmore="onloadmore">


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


            <div class="loadingbox" v-if="loading">

                <image class="loading" src="https://img.alicdn.com/tfs/TB1CWnby7yWBuNjy0FpXXassXXa-32-32.gif"/>
            </div>


            <div class="detail-mode" v-if="isShowDetailMode" ref="detailMode">

                <image class="square-image"
                       src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                       resize="cover" :style="detailModeCoverStyle"></image>


                <div class="detail-mode-empty-content" :style="{height:wrapHeight}" v-if="loading">

                </div>

                <div class="detail-mode-content-wrapper">


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
                }, 1000)


            },
            showDetailMode() {
                setTimeout(() => {
                    this.isShowDetailMode = true;

                    this.loading = false;
                }, 1000)
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