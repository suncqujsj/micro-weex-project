<style lang="less" type="text/less">


    .swiper {
        flex-direction: column;
    }

    .hot {
        flex-direction: column;
    }

    .search-tag {
        height: 200px;
        width: 750px;
    }


    .recipe-section {

        display: flex;
        flex-direction: column;
        padding-top: 65px;

    }

    .section-title {
        padding-left: 55px;
        padding-bottom: 28px;

    }

    .section-title-text {
        font-size: '18wx';
        color: #333333;
        font-weight: bold;
    }


    .section-content__horizontal_slide {
        flex-direction: row;
        display: flex;
        align-items: center;
    }


    .hot-section-content {
        height: 288px;
    }

    .hot-section-item {
        margin-right: 30px;
    }

    .pros-section-content {

        height: 411px;
    }

    .pro-swiper-item {
        padding: 0 56px;
        height: 376px;
    }

    .menu-collection-content {
        padding: 0 56px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;

    }

    .menu-collection-item {
        margin-bottom: 30px;

    }

    .menu-collection-item__odd {
        margin-right: 30px;
    }

    /*轮播指引点*/
    .slider-indicator {
        width: 750px;
        height: 14px;
        position: absolute;
        bottom: 0;
        left: 0;
        item-color: #d1d1d1; //rgba(255, 255, 255, .5);
        item-selectedColor: #808080; //rgba(255, 255, 255, 1);
        item-size: 14px;
    }

    .bottom-cell {

    }

    .bottom-cell-content {
        width: 750px;
        height: 200px;
    }


</style>
<template>

    <list class="list" @loadmore="loadmore" loadmoreoffset=50 show-scrollbar=false>


        <header>

            <recipe-search-bar></recipe-search-bar>

        </header>
        <cell class="tags">

            <recipe-tags :tags="tags"></recipe-tags>
        </cell>
        <cell class="swiper">

            <recipe-video-swiper></recipe-video-swiper>

        </cell>


        <cell class="hot" v-if="hotData && hotData.length>0">
            <div class="recipe-section">

                <div class="section-title">
                    <text class="section-title-text">人气推荐</text>

                </div>

                <scroller show-scrollbar="false" scroll-direction="horizontal"
                          class="section-content section-content__horizontal_slide hot-section-content">

                    <div class="hot-section-item" v-for="(item,index) in hotData">
                        <recipe-collection-item :title="item.name" :img-width="288" :cover="item.picUrl"
                                                :img-height="192" :first="index===0"></recipe-collection-item>
                    </div>

                </scroller>
            </div>

        </cell>

        <cell class="pro">

            <div class="recipe-section">
                <div class="section-title">
                    <text class="section-title-text">达人菜谱</text>

                </div>

                <slider interval="3000" auto-play="true" infinite="true"
                        class="section-content section-content-swiper pros-section-content">


                    <div class="pro-swiper-item" v-for="(item,index) in proData">
                        <recipe-collection-item :title="item.name" :img-width="638" :info-display-style="'Cover'"
                                                :play-btn-shown="true"
                                                :img-height="366"></recipe-collection-item>
                    </div>


                    <indicator class="slider-indicator"></indicator>
                </slider>
            </div>
        </cell>


        <cell class="menu-collection" v-if="menuCollectData && menuCollectData.length>0">

            <div class="recipe-section">
                <div class="section-title">
                    <text class="section-title-text">食谱合集</text>

                </div>

                <div class="section-content menu-collection-content">


                    <div class="menu-collection-item" v-for="(item,index) in menuCollectData"
                         :class="[(index%2)===0 && 'menu-collection-item__odd']">
                        <recipe-collection-item :title="item.collectionName" :img-width="303"
                                                :info-display-style="'Cover'" :collection-id="item.id"
                                                :img-height="192" :title-font-size="15*2"></recipe-collection-item>
                    </div>

                </div>
            </div>

        </cell>

        <cell class="bottom-cell">

            <div class="bottom-cell-content"></div>
        </cell>
        <!--        <cell class="cell" v-for="item in collectionData">-->
        <!--            <div class="recipe-section">-->
        <!--                <text class="recipe-section-title">人气推荐</text>-->
        <!--                <image src="http://121.41.75.163:8000/source/image/20180905/1536112973897g364.jpg"-->
        <!--                       style="width:100px;height:200px"></image>-->
        <!--                <text>{{item.collectionName}}</text>-->
        <!--            </div>-->
        <!--        </cell>-->
    </list>


</template>

<script>
    import nativeService from "@/common/services/nativeService";

    import MikeNetwork from "@/common/services/mikeNetwork/network"
    import RecipeSearchBar from "@/common/pages/src/mike/component/recipeSearchBar.vue";
    import RecipeTags from "@/common/pages/src/mike/component/recipeTags.vue";
    import RecipeVideoSwiper from "@/common/pages/src/mike/component/recipeVideoSwiper.vue";
    import RecipeCollectionItem from "@/common/pages/src/mike/component/recipeCollectionItem.vue";

    export default {
        components: {RecipeCollectionItem, RecipeVideoSwiper, RecipeTags, RecipeSearchBar},
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
                hotData: [],
                proData: [
                    {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }, {
                        name: "牛肉披萨",
                    }
                ],
                menuCollectData: []
            }
        },

        created() {


            this.loadHotMenus();
            this.loadCollections();


        },

        methods: {

            loadHotMenus() {
                MikeNetwork.menu.getHotMenus().then(res => {
                    this.hotData.push(...res);
                })
            },
            loadCollections() {

                MikeNetwork.menu.getAllCollections().then(res => {
                    this.menuCollectData.push(...res)
                })
            },

            loadmore() {
                // let self = this;
                // setTimeout(() => {
                //   for(var i=0; i< 10; i++){
                //     self.lists.push(i+'dd');
                //   }
                // }, 100);
            }
        }

    }

</script>
