<template>

    <div class="recipe-video-swiper">


        <slider interval="3000" auto-play="true" infinite="true" class="swiper-slider">
            <div v-for="(item,index) in covers" class="slider-img-wrapper">
                <image class="slider-img"
                       :src="item.download_url"
                       resize="cover" placeholder="https://via.placeholder.com/750x900?text=Loading">

                </image>
                <!--                TODO: need to check if it's workable mask layer in Andriod stystem-->
                <div class="slider-img-mask"></div>

                <div class="slider-item-play">

                    <image class="play-icon" resize="contain" src="./img/mike/video_play.png"></image>
                </div>

                <div class="slider-item-controls">


                    <div class="slider-item-info">
                        <div class="slider-item-info__detail">
                            <text class="info-detail-name">海鲜烩意面</text>

                            <div class="info-detail-rating">

                                <image class="rate-star-icon" resize="contain"
                                       v-for="item in [0,1,2,3,4]"
                                       :src="rateStarImgSrc(item)"></image>
                            </div>

                            <div class="info-detail-line">

                            </div>
                            <text class="info-detail-desc">海鲜赋予意面浓浓的鲜味，这样一份意面很让人满足</text>
                        </div>

                        <div class="slider-item-info__fav">

                            <image src="./img/mike/heart_white.png" resize="contain" class="fav-icon"></image>
                            <text class="fav-text">2.3M</text>
                        </div>
                    </div>
                </div>

            </div>
            <indicator class="slider-indicator"></indicator>
        </slider>

    </div>
</template>

<script>

    import nativeService from "@/common/services/nativeService";

    const stream = weex.requireModule('stream');
    export default {
        name: "recipeVideoSwiper",
        data() {
            return {
                covers: [],
                loading: false,
            }
        },
        created() {

            this.loadCovers();
        },

        methods: {
            rateStarImgSrc(index) {
                return index < 3 ? './img/mike/star_yellow@3x.png' : './img/mike/star_gray@3x.png'
            },

            loadCovers() {
                this.loading = true;

                stream.fetch({
                    // 'https://api.unsplash.com/search/photos/?client_id=d21ba57d8242976d132b325b947e9bcc41068dc8e682aa9c01da311f72887387&query=noodles&per_page=5',
                    url: 'https://picsum.photos/v2/list?limit=5&page=1',
                    method: 'GET',
                    type: 'json'
                }, response => {
                    this.loading = false;
                    this.covers = response.data;

                })
            },
        },
    }
</script>

<style scoped lang="less">

    @slider-img-height: 900px;
    .recipe-video-swiper {
        flex-direction: column;
    }

    .swiper-slider {
        width: 750px;
        height: 900px;

        position: relative;
        background-color: #808080;
    }

    .slider-img-wrapper {
        position: relative;
    }

    .slider-img {
        width: 750px;
        height: @slider-img-height;
    }

    /*覆盖阴影层*/
    .slider-img-mask {
        position: absolute;
        width: 750px;
        z-index: 333;
        left: 0;
        top: @slider-img-height - 243px;
        height: 243px;

        background-image: linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent);
        background-repeat: no-repeat;
        background-size: contain;
    }

    /*单个轮播图信息展示*/
    .slider-item-controls {
        position: absolute;
        width: 750px;
        height: @slider-img-height;
        left: 0;
        top: 0;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

    }

    .slider-item-info {
        display: flex;
        padding: 0 55px 90px 55px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

    }

    .info-detail-name {
        color: #ffffff;
        font-size: 21px*2;


    }

    .info-detail-rating {

        margin: 20px 0 35px 0;
        display: flex;
        flex-direction: row;
        align-items: center;

    }


    .rate-star-icon {
        width: 28px;
        height: 28px;

    }

    .info-detail-line {
        width: 360px;
        height: 2px;
        background-color: rgba(255, 255, 255, 0.5);
        margin-bottom: 33px;
    }

    .info-detail-desc {
        color: #ffffff;
        font-size: 13px*2;
        max-width: 360px;
    }

    .slider-item-info__fav {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .fav-text {
        color: #ffffff;
        font-size: 12px *2;
    }

    .fav-icon {
        width: 33px*2;
        height: 30px*2;
        margin-right: 14px;
    }


    .slider-item-info {

    }

    /*播放按钮*/
    .slider-item-play {
        position: absolute;
        width: 750px;
        height: @slider-img-height;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

    }

    .play-icon {
        width: 144px;
        height: 144px;
    }


    /*轮播指引点*/
    .slider-indicator {
        width: 750px;
        height: 100px;
        position: absolute;
        bottom: 0;
        left: 0;
        item-color: rgba(255, 255, 255, .5);
        item-selectedColor: rgba(255, 255, 255, 1);
        item-size: 12px;
    }


</style>