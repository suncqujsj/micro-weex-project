<template>

    <div class="recipe-video-swiper">

        <slider interval="3000" auto-play="true" infinite="true" class="swiper-slider">
            <div v-for="(item,index) in covers">
                <image class="slider-img"
                       :src="item.download_url"
                       resize="cover" placeholder="https://via.placeholder.com/750x900?text=Loading">

                </image>

                <!--                    TODO: in case need to add other component in one slide -->
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
                covers: []
            }
        },
        created() {

            this.loadCovers();
        },
        methods: {

            loadCovers() {
                stream.fetch({
                    url: 'https://picsum.photos/v2/list?limit=5&page=1',
                    method: 'GET',
                    type: 'json'
                }, response => {

                    this.covers = response.data;

                })
            },
        },
    }
</script>

<style scoped lang="less">

    .recipe-video-swiper {

        flex-direction: column;

    }

    .swiper-slider {
        width: 750px;
        height: 900px;

        position: relative;
        background-color: #808080;
    }

    .slider-img {
        width: 750px;
        height: 900px;
    }

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