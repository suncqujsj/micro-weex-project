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

    .section-content {
    }

    .hot-section-content {
        height: 288px;
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


        <cell class="hot ">
            <div class="recipe-section">

                <div class="section-title">
                    <text class="section-title-text">人气推荐</text>

                </div>

                <scroller show-scrollbar="false" scroll-direction="horizontal"
                          class="section-content section-content__horizontal_slide hot-section-content">

                    <recipe-collection-item v-for="(item,index) in hotData" :title="item.name" :img-width="288"
                                            :img-height="192" :first="index===0"></recipe-collection-item>
                </scroller>
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
                collectionData: [],
                hotData: [{
                    name: "牛肉披萨",
                }, {
                    name: "牛肉披萨",
                }, {
                    name: "牛肉披萨",
                }, {
                    name: "牛肉披萨",
                }, {
                    name: "牛肉披萨",
                }]
            }
        },

        created() {


            this.loadHotMenus();
            // let self = this;
            // //测试接口
            // let _url = "http://120.25.95.38:8200/cloud-menu/home/midea/menu/collection/all";
            // let _body = JSON.stringify({});
            // let requestData = {url: _url, body: _body};
            // nativeService.sendHttpRequest(requestData).then(function (res) {
            //     self.collectionData = res.data;
            //     nativeService.alert(res);
            // }).catch((resp) => {
            //     nativeService.alert(resp);
            // });

        },
        methods: {

            loadHotMenus() {
                MikeNetwork.menu.getHotMenus().then(res => {
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
