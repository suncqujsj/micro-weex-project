<style lang="less" type="text/less">
    .wrapper {
        width: 750px;
        display: flex;
        flex-direction: column;
    }

    .list {

    }

    .search-tag {
        height: 200px;
        width: 750px;
    }


    .panel {
        width: 600px;
        height: 300px;
        margin-left: 75px;
        margin-top: 35px;
        margin-bottom: 35px;
        flex-direction: column;
        justify-content: center;
        border-width: 2px;
        border-style: solid;
        border-color: rgb(162, 217, 192);
        background-color: rgba(162, 217, 192, 0.2);
    }

    .text {
        font-size: 88px;
        text-align: center;
        color: #41B883;
    }

    .swiper {
        flex-direction: column;
    }

    .swiper-slider {
        width: 750px;
        height: 900px;

        position: relative;
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
<template>

    <list class="list" @loadmore="loadmore" loadmoreoffset=50 show-scrollbar=false>


        <header>

            <recipe-search-bar></recipe-search-bar>
            <!--                <div class="search-tag">-->
            <!--                    <text class="text">我会吸附在顶部</text>-->
            <!--                </div>-->
        </header>
        <cell class="tags">

            <recipe-tags :tags="tags"></recipe-tags>
        </cell>
        <cell class="swiper" v-if="covers && covers.length>0">

            <!--            :style="sliderStyle" :interval="interval" :auto-play="autoplay" :infinite="infinite"
                                @change="_change"-->
            <slider interval="3000" auto-play="true" infinite="true" class="swiper-slider">
                <div v-for="(item,index) in covers">
                    <image class="slider-img"
                           resize="cover" placeholder="https://via.placeholder.com/750x900?text=Loading">

                    </image>

                    <!--                    TODO: in case need to add other component in one slide -->
                </div>
                <!--                :style="indicatorStyle"-->
                <indicator class="slider-indicator"></indicator>
            </slider>
        </cell>
        <cell class="cell" v-for="num in lists">
            <div class="panel">
                <text class="text">{{num}}</text>
            </div>
        </cell>
    </list>
</template>

<script>
    import nativeService from "@/common/services/nativeService";

    const stream = weex.requireModule('stream');
    import RecipeSearchBar from "@/common/pages/src/mike/component/recipeSearchBar.vue";
    import RecipeTags from "@/common/pages/src/mike/component/recipeTags.vue";

    export default {
        components: {RecipeTags, RecipeSearchBar},
        props: [],
        data() {
            return {
                tags: [{
                    text: '快手菜',
                    selected: true,
                }, {
                    text: '轻食塑身',
                    selected: false,
                }, {
                    text: '烘焙/甜点',
                    selected: false,
                }, {
                    text: '西式烹饪',
                    selected: false,
                }, {
                    text: '健康饮食',
                    selected: false,
                }, {
                    text: '川香麻辣',
                    selected: false,
                }],
                covers: [],
                lists: ['A', 'B', 'C', 'D', 'E', 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 11, 1, 88],
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
            loadmore() {
                let self = this;
                // setTimeout(() => {
                //   for(var i=0; i< 10; i++){
                //     self.lists.push(i+'dd');
                //   }
                // }, 100);
            }
        }
    }
</script>
