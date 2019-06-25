<style lang="less" type="text/less">

    @header-height: 580px;
    .me-page-container {

        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;

    }

    .hearder-section {
        height: @header-height;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
    }


    .scroller {
        position: relative;
    }

    .head-bg {
        position: absolute;
        width: 750px;
        height: @header-height;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
    }

    .header-icon {
        border-radius: 100px;

    }

    .header-name {
        color: #fefefe;
        font-size: 40px;
        margin-top: 20px;
    }

    .header-sub-name {
        color: #fefefe;
        margin-top: 10px;
    }

    .select-tags {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding-top: 55px;
        padding-bottom: 28px;
    }


    .tag-item {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 200px;
    }

    .yellow-item {
        color: #ffbc05;
    }

    .tag-item-icon {
        height: 50px;
        width: 50px;
    }


    .tag-item-number {
        margin-top: 24px;
        color: rgba(254, 254, 254, 0.3);
        font-size: 10.5px*2;
    }

    .segment-content {
        flex: 3;
        flex-grow: 3;

    }

    .favorite-segment-content {

        position: relative;

        flex-direction: column;


    }

    .favorite-waterfall {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 750px;
        padding: 100px 39px;
    }

    .share-segement-content {

    }

    .share-list-cell {
        padding: 50px 57px;
    }

    .section {

        padding: 66px 40px;
    }

    .section-title {
        margin-bottom: 27px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .section-title-text {
        font-size: 16px*2;
        color: #333333;
        font-weight: bold;
    }

    .more {
        padding-right: 30px;
        font-size: 11px*2;
        color: #1a1a1a;
    }

</style>
<template>
    <div class="me-page-container">
        <div class="hearder-section" ref="header">

            <image class="head-bg" src="./img/mike/mike_me_bg.png" resize="cover"></image>
            <image class="header-icon"
                   :src="user.avatar"
                   style="width:200px;height:200px"></image>
            <text class="header-name">{{user.nickName}}</text>
            <text class="header-sub-name">ID：</text>
            <div class="select-tags">
                <div class="tag-item" @click="clickOnTagItem(0)">
                    <image class="tag-item-icon eat-icon" resize="contain"
                           :src="eatenImg"></image>
                    <text class="tag-item-number" :class="[isEatenShown && 'yellow-item']">264</text>
                </div>
                <div class="tag-item" @click="clickOnTagItem(1)">
                    <image class="tag-item-icon heart-icon" resize="contain"
                           :src="favImg"></image>
                    <text class="tag-item-number" :class="[isFavShown && 'yellow-item']">264</text>
                </div>
                <div class="tag-item" @click="clickOnTagItem(2)">
                    <image class="tag-item-icon share-icon" resize="contain"
                           :src="shareImg"></image>
                    <text class="tag-item-number" :class="[isSharedShown && 'yellow-item']">264</text>
                </div>
            </div>
        </div>
        <!--        烹饪过的/看过的/用过的模式 -->

        <div class="segment-content eaten-segment-content" v-if="isEatenShown">

            <scroller class="eaten-scroller" show-scrollbar="false">
                <div class="section">
                    <div class="section-title">

                        <text class="section-title-text">烹饪过的食谱</text>
                        <text class="more">more</text>
                    </div>

                    <image-grid :images="images"></image-grid>
                </div>
                <div class="section">
                    <div class="section-title">

                        <text class="section-title-text">使用过的模式</text>
                        <text class="more">more</text>
                    </div>

                    <commend-list-item v-for="item in commends" :type="item.type" :degree="item.degree"
                                       :time="item.time"></commend-list-item>

                </div>


                <div class="section">
                    <div class="section-title">

                        <text class="section-title-text">我看过的</text>
                        <text class="more">more</text>
                    </div>

                    <image-grid :images="images"></image-grid>
                </div>


            </scroller>

        </div>

        <!--        分享过的 -->
        <div class="segment-content share-segement-content" v-if="isSharedShown">


            <list class="share-list ">

                <cell class="share-list-cell" v-for="item in shareList">
                    <recipe-share-list-item :menu="item"></recipe-share-list-item>

                </cell>
            </list>
        </div>

        <!--        收藏的 -->
        <div class="segment-content favorite-segment-content" v-if="isFavShown">
            <!--            <my-favorite-waterfall></my-favorite-waterfall>-->

            <waterfall column-count="2" column-width="322" column-gap="28" show-scrollbar="false" scrollable="true"
                       class="favorite-waterfall">
                <cell v-for="(item,index) in favoriteData" class="cell">

                    <my-favorite-waterfall-item :img-height="index%2===0?500:250"></my-favorite-waterfall-item>

                    <!--          -->
                </cell>
            </waterfall>
        </div>


    </div>


</template>

<script>

    import ImageGrid from "@/common/pages/src/mike/component/imageGrid.vue";

    const dom = weex.requireModule('dom');
    import nativeService from "@/common/services/nativeService";
    import CommendListItem from "@/common/pages/src/mike/component/commendListItem.vue";
    import RecipeShareListItem from "@/common/pages/src/mike/component/recipeShareListItem.vue";
    import MyFavoriteWaterfallItem from "@/common/pages/src/mike/component/myFavoriteWaterfallItem.vue";


    export default {
        props: [],
        data() {
            return {
                selectingTag: 0, // 0 : eaten 1 : hearted/faved 2 : shared

                user: {},
                headerSize: undefined,
                isHeaderFixed: false,
                commends: [
                    {
                        type: '发酵',
                        degree: '100度',
                        time: '01分 00秒'

                    },
                    {
                        type: '发酵',
                        degree: '100度',
                        time: '01分 00秒'

                    }, {
                        type: '发酵',
                        degree: '100度',
                        time: '01分 00秒'

                    }
                ],
                shareList: [
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
                favoriteData: [
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
                    },
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
                    },
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
                    },
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
                    },
                ],
                images: [
                    {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    },
                    {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    },
                    {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    },
                    {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    },
                    {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    },
                    {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    },
                    {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    }, {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    }, {
                        src: 'https://via.placeholder.com/215?text=Loading'
                    }
                ]
            }
        },
        components: {
            MyFavoriteWaterfallItem,
            RecipeShareListItem,
            CommendListItem,
            ImageGrid
        },

        computed: {
            isEatenShown() {
                return this.selectingTag === 0;
            },
            isFavShown() {
                return this.selectingTag === 1;
            },
            isSharedShown() {
                return this.selectingTag === 2;
            },
            eatenImg() {
                return this.isEatenShown ? './img/mike/eat_yellow.png' : './img/mike/eat_light_gray.png'
            },
            favImg() {
                return this.isFavShown ? './img/mike/heart_yellow.png' : './img/mike/heart_light_gray.png'
            },
            shareImg() {
                return this.isSharedShown ? './img/mike/share_yellow.png' : './img/mike/share_light_gray.png'
            }

        },
        created() {

            this.loadUserInfo();


        },


        methods: {


            // onScroll(e) {
            //
            //     let contentOffset = e.contentOffset;
            //
            //     if (!this.headerSize) {
            //         dom.getComponentRect(this.$refs.header, (res) => {
            //             this.headerSize = res.size;
            //         })
            //         return;
            //     }
            //
            //     if (-contentOffset.y > this.headerSize.height - 200) {
            //         this.isHeaderFixed = true;
            //     } else {
            //         this.isHeaderFixed = false;
            //     }
            //     // TODO: need more testing on the scrolling
            //
            //
            // },
            clickOnTagItem(index) {

                this.selectingTag = index;

            },

            loadUserInfo() {
                nativeService.getUserInfo().then(res => {
                    this.user = res;
                })
            }

        }
    }
</script>