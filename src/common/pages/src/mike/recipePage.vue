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

    .search-tag {
        height: 200px;
        width: 750px;
    }


    .recipe-section {
        width: 650px;
        height: 300px;
        margin-left: 50px;
        margin-top: 35px;
        margin-bottom: 35px;
        flex-direction: column;
        justify-content: center;
        // border-width: 2px;
        // border-style: solid;
        // border-color: rgb(162, 217, 192);
        background-color: rgba(162, 217, 192, 0.2);
    }

    .text {
        font-size: 50px;
        text-align: center;
        color: #333;
    }

    .recipe-section-title {
        font-size: 40px;
        text-align: left;
        color: #333;
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
        <cell class="cell" v-for="item in collectionData">
            <div class="recipe-section">
                <text class="recipe-section-title">人气推荐</text>
                <image src="http://121.41.75.163:8000/source/image/20180905/1536112973897g364.jpg"
                       style="width:100px;height:200px"></image>
                <text>{{item.collectionName}}</text>
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
                collectionData: [],
            }
        },
        created() {
            let self = this;
            //测试接口
            let _url = "http://120.25.95.38:8200/cloud-menu/home/midea/menu/collection/all";
            let _body = JSON.stringify({});
            let requestData = {url: _url, body: _body};
            nativeService.sendHttpRequest(requestData).then(function (res) {
                self.collectionData = res.data;
                nativeService.alert(res);
            }).catch((resp) => {
                nativeService.alert(resp);
            })

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
